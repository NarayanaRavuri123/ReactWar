import moment from "moment";
import {
  DD_DELIVERY_SITE_TYPE_CONTENT,
  DD_NEED_BY_TIME_CONTENT,
} from "../../../util/staticText";
import "./deliveryInformation.css";
import {
  convertStringToDate,
  getCodeFromText,
  getTextFromCode,
  makeCapitalEachWordInString,
} from "../../../util/utilityFunctions";
import { Tooltip, Typography } from "@mui/material";
import { format } from "react-string-format";
import { IDeliveryInformation, INewOrder } from "../newOrder.interface";
import { useContext, useEffect, useState } from "react";
import { NewOrderValidator } from "../newOrder.validator";
import { getDeepClone } from "../../../util/ObjectFunctions";
import { Box, Grid, InputBase, TextField } from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { getdropDownContent } from "../../../util/dropDownService";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AuthContext, AuthContextType } from "../../../context/AuthContext";
import { ValidationStatus } from "../../../core/interfaces/input.interface";
import { validateUpsAddress } from "../../../util/validateUpsAddressService";
import { ReactComponent as CalendarIcon } from "../../../assets/calendar.svg";
import { IAddress } from "../patientInformation/patientInformation.interface";
import { IFacility } from "../../manageProfile/facilityInformation/facility.interface";
import { InputWithLabel } from "../../../core/inputWithLabel/inputWithLabel.component";
import { CustomDropDown } from "../../../core/customDropdown/customDropdown.component";
import { DeliveryInfoReviewOrder } from "./reviewOrder/deliveryInfoReviewOrder.component";
import { ValidateUPSAddressInfo } from "../patientInformation/validateUPSAddressInfo.component";
import { FacilityInfoDetail } from "../../manageProfile/facilityInformation/facilityInfoDetail.component";
import { getCurrentServerDateTime } from "../../../util/3meService";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {
  NewOrderContext,
  NewOrderContextType,
} from "../../../context/NewOrderContext";
import { IDeliveryInformationProps } from "./deliveryInformation.interface";

export const DeliveryInformation = ({
  data,
  Validator = new NewOrderValidator(),
  setData,
  states,
  statesText,
  nextOrderOpen,
  isReviewOrder = false,
  editButtonClicked,
  isOrderSummary = false,
  deliveryInformation,
  setDeliveryInformation,
  NewOrderObj,
}: IDeliveryInformationProps) => {
  const [message, setMessage] = useState("");
  const [needTimes, setNeedTimes] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [openAddress, setOpenAddress] = useState(false);
  const [needTimesText, setNeedTimesText] = useState([]);
  const [deliverySites, setDeliverySites] = useState([]);
  const [address, setAddress] = useState<IAddress | null>();
  const [noAddressFound, setNoAddressFound] = useState(false);
  const [validator] = useState<NewOrderValidator>(Validator!);
  const [facility, setFacility] = useState<IFacility | null>();
  const [deliverySitesText, setDeliverySitesText] = useState([]);
  const authObj = useContext<AuthContextType | null>(AuthContext);
  const [selectedUPSAddress, setSelectedUPSAddress] = useState("");
  const [validateAddress, setValidateUPSAddress] = useState<any>([]);
  const [isDeliverySiteTypeForDefault, setIsDeliverySiteTypeForDefault] =
    useState(false);
  const [focusClasses, setFocusClasses] = useState({
    deliveryProductNeedByDate: "",
  });
  const [loadUI, setLoadUI] = useState<boolean>(false);
  const maxDate = NewOrderObj?.maxDate;
  const setMaxDate = NewOrderObj?.setMaxDate;
  // const newOrderObj = useContext<NewOrderContextType | null>(NewOrderContext);
  const [currentServerDate, setCurrentServerDate] = useState<any>();
  useEffect(() => {
    if (!nextOrderOpen) {
      fetchDropDownContent();
      const type = checkDeliverySiteType();
      const isDefaultType = checkDeliverySiteTypeValue(type);
      if (isDefaultType === true) {
        setIsDeliverySiteTypeForDefault(true);
        setAddress(null);
      }
    }
    handleCurrentServerDateTime();
  }, []);

  const handleCurrentServerDateTime = async () => {
    const currentDateRes = await getCurrentServerDateTime();
    if (currentDateRes) {
      setCurrentServerDate(currentDateRes);
    }
  };

  useEffect(() => {
    if (!NewOrderObj?.IsLoadCustomDeliveryDate && needTimes.length > 0) {
      setDatetime();
    }
  }, [needTimes, currentServerDate]);

  const setDatetime = async () => {
    // const currentDateRes = await getCurrentServerDateTime();
    if (currentServerDate) {
      const formatMaxDate = moment(currentServerDate.currentCstTime).add(
        7,
        "days"
      );
      NewOrderObj?.setMaxDate(formatMaxDate);
      const dateTime = moment(currentServerDate.currentCstTime)
        .add(30, "hours")
        .toDate();
      const formatteddate = moment(dateTime).format("MM/DD/YYYY");
      var time = moment(RoundToNearestMinutes(dateTime)).format("h:mm A");
      let updateTime;

      if (
        (dateTime.getHours() == 21 && dateTime.getMinutes() == 0) ||
        (dateTime.getHours() == 6 && dateTime.getMinutes() == 0)
      ) {
        updateTime = {
          ...deliveryInformation,
          deliveryProductNeedByDate: {
            value: formatteddate,
            valid: ValidationStatus.VALID,
          },
          deliveryProductNeedByTime: {
            value: getCodeFromText(needTimes, time),
            valid: ValidationStatus.VALID,
          },
        };
      } else if (dateTime.getHours() >= 21 || dateTime.getHours() < 6) {
        if (dateTime.getHours() <= 5) {
          updateTime = {
            ...deliveryInformation,
            deliveryProductNeedByDate: {
              value: formatteddate,
              valid: ValidationStatus.VALID,
            },
            deliveryProductNeedByTime: {
              value: getCodeFromText(needTimes, needTimesText[0]),
              valid: ValidationStatus.VALID,
            },
          };
        } else {
          //assign to next day first slot
          const addedExtraDay = moment(dateTime)
            .add(1, "days")
            .format("MM/DD/YYYY");
          updateTime = {
            ...deliveryInformation,
            deliveryProductNeedByDate: {
              value: addedExtraDay,
              valid: ValidationStatus.VALID,
            },
            deliveryProductNeedByTime: {
              value: getCodeFromText(needTimes, needTimesText[0]),
              valid: ValidationStatus.VALID,
            },
          };
        }
      } else {
        updateTime = {
          ...deliveryInformation,
          deliveryProductNeedByDate: {
            value: formatteddate,
            valid: ValidationStatus.VALID,
          },
          deliveryProductNeedByTime: {
            value: getCodeFromText(needTimes, time),
            valid: ValidationStatus.VALID,
          },
        };
      }
      setDeliveryInformation(updateTime);
    }
  };

  const RoundToNearestMinutes = (input: Date) => {
    if (input.getMinutes() >= 0 && input.getMinutes() <= 15) {
      return moment(input).add(-input.getMinutes(), "m");
    }
    if (input.getMinutes() >= 16 && input.getMinutes() <= 44) {
      if (input.getMinutes() < 30) {
        return moment(input).add(30 - input.getMinutes(), "m");
      } else if (input.getMinutes() > 30) {
        return moment(input).add(30 - input.getMinutes(), "m");
      } else {
        return input;
      }
    }
    if (input.getMinutes() >= 45 && input.getMinutes() <= 59) {
      return moment(input).add(60 - input.getMinutes(), "m");
    }
    return input;
  };

  useEffect(() => {
    if (
      !loadUI &&
      deliveryInformation.deliverySiteType.value !== "" &&
      !isReviewOrder
    ) {
      setLoadUI(true);
      const type = checkDeliverySiteType();
      const isDefaultType = checkDeliverySiteTypeValue(type);

      updateUIBasedOnDeliveryType(
        type,
        isDefaultType! && type !== "101" ? false : true
      );
      if (isDefaultType === true) {
        setIsDeliverySiteTypeForDefault(true);
        setAddress(null);
      }
      if (!NewOrderObj?.IsLoadCustomDeliveryDate) {
        setDatetime();
      }
    }
  }, [deliveryInformation.deliverySiteType.value, currentServerDate]);

  useEffect(() => {
    if (!isReviewOrder && !NewOrderObj?.IsLoadCustomDeliveryDate) {
      setDatetime();
    }
  }, [deliveryInformation.deliveryProductNeedByDate.value, currentServerDate]);

  useEffect(() => {
    if (!nextOrderOpen && address) {
      const type = checkDeliverySiteType();
      if (type === "102") {
        if (data.IsSamePermanentAddress.value === "true") {
          const isAddressChanged = checkParmanentAddressChanged();
          if (!isAddressChanged) {
            getAddressFromPatientPermanentAddress(true);
          }
        } else {
          const isAddressChanged = checkCurrentAddressChanged();
          if (!isAddressChanged) {
            getAddressFromPatientCurrentAddress(true);
          }
        }
      } else if (type === "103") {
        const isAddressChanged = checkParmanentAddressChanged();
        if (!isAddressChanged) {
          getAddressFromPatientPermanentAddress(true);
        }
      }
    }
  }, [data.address1, data.address2, data.city, data.state, data.zip]);

  useEffect(() => {
    if (!nextOrderOpen && address) {
      const type = checkDeliverySiteType();
      if (type === "102") {
        const isAddressChanged = checkCurrentAddressChanged();
        if (!isAddressChanged) {
          getAddressFromPatientCurrentAddress(true);
        }
      }
    }
  }, [
    data.patientCurrentAddress1,
    data.patientCurrentAddress2,
    data.patientCurrentAddressCity,
    data.patientCurrentAddressState,
    data.patientCurrentAddressZip,
  ]);

  useEffect(() => {
    if (!nextOrderOpen) {
      const type = checkDeliverySiteType();
      if (type === "102") {
        checkCurrentAddressChanged();
      }
    }
  }, [data.IsSamePermanentAddress]);

  useEffect(() => {
    if (!nextOrderOpen) {
      if (
        deliveryInformation.deliverySiteType.valid === ValidationStatus.VALID
      ) {
        const type = checkDeliverySiteType();
        updateUIBasedOnDeliveryType(type, false);
      }
    }
  }, [deliverySites]);

  const fetchDropDownContent = async () => {
    //async and await
    try {
      const ddContent = format(
        "{0},{1}",
        DD_NEED_BY_TIME_CONTENT,
        DD_DELIVERY_SITE_TYPE_CONTENT
      );
      const data = await getdropDownContent(ddContent);
      if (data.items.length > 0) {
        const needTimeObject = data.items.filter(
          (item: { name: string }) => item.name === DD_NEED_BY_TIME_CONTENT
        );
        const needTimeData = needTimeObject[0].data.sort(
          (a: { order: number }, b: { order: number }) =>
            a.order > b.order ? 1 : -1
        );
        setNeedTimes(needTimeData);
        setNeedTimesText(needTimeData.map((x: { text: string }) => x.text));
        const deliverySiteObject = data.items.filter(
          (item: { name: string }) =>
            item.name === DD_DELIVERY_SITE_TYPE_CONTENT
        );
        const deliverySiteData = deliverySiteObject[0].data.sort(
          (a: { order: number }, b: { order: number }) =>
            a.order > b.order ? 1 : -1
        );
        setDeliverySites(deliverySiteData);
        setDeliverySitesText(
          deliverySiteData.map((x: { text: string }) => x.text)
        );
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const validateUPSAddress = async (obj: IDeliveryInformation) => {
    const reqParams = {
      AddressLine1: obj.deliveryAddressLine1.value,
      AddressLine2: obj.deliveryAddressLine2.value,
      City: obj.deliveryCity.value,
      State: obj.deliveryState.value,
      zipCode: obj.deliveryZipCode.value,
    };
    setOpenAddress(true);
    setIsLoading(true);
    const response = await validateUpsAddress(reqParams);
    if (response.item) {
      if (response.item.status !== "ExactMatch") {
        if (response.item.addresses.length > 0) {
          setNoAddressFound(false);
          setValidateUPSAddress(response.item.addresses);
          if (
            JSON.stringify(response.item.addresses[0]) ===
            JSON.stringify(reqParams)
          ) {
          } else {
            setSelectedUPSAddress(JSON.stringify(response.item.addresses[0]));
          }
        } else {
          setMessage("No address found.");
          setNoAddressFound(true);
        }
        setIsLoading(false);
      } else {
        setOpenAddress(false);
      }
    } else {
      setMessage("Unable to process address validation. Please continue.");
      setIsLoading(false);
      setNoAddressFound(true);
    }
  };

  const updateUIBasedOnDeliveryType = (
    type: string | null,
    canReset: boolean
  ) => {
    if (type) {
      const isDefaultType = checkDeliverySiteTypeValue(type);
      setIsDeliverySiteTypeForDefault(isDefaultType ?? false);
      updateDeliveryAddress(type, canReset);
    }
  };

  const checkDeliverySiteType = (): string | null => {
    const input = deliveryInformation.deliverySiteType.value;
    return input;
  };

  const checkDeliverySiteTypeValue = (input: string | null): boolean | null => {
    if (input) {
      // "My Facility" - 101
      // "Patient’s Current Residence" - 102
      // "Patient’s Permanent Residence" - 103
      return !(input === "101" || input === "102" || input === "103");
    }
    return null;
  };

  const updateDeliveryAddress = (type: string, canReset: boolean) => {
    // "My Facility" - 101
    // "Patient’s Current Residence" - 102
    // "Patient’s Permanent Residence" - 103
    switch (type) {
      case "101":
        showFacilityDetails();
        break;
      case "102":
        getAddressFromPatientCurrentAddress(false);
        break;
      case "103":
        getAddressFromPatientPermanentAddress(false);
        break;
      default:
        if (canReset) {
          resetFacilityDetails();
        }
        setAddress(null);
        break;
    }
  };

  const showFacilityDetails = () => {
    setAddress(null);
    if (
      authObj?.userProfile?.facilities.length !== 0 &&
      authObj?.registeredFaciltyAddress
    ) {
      const facility = authObj?.registeredFaciltyAddress!;
      setFacility(facility);
      manualPopulateFacilityDetails(facility!, null, true);
    } else {
      setFacility(null);
    }
  };

  const getAddressFromPatientCurrentAddress = (
    isUpdatingFromDataChange: boolean
  ) => {
    if (data.IsSamePermanentAddress.value === "true") {
      getAddressFromPatientPermanentAddress(isUpdatingFromDataChange);
    } else {
      if (
        data.patientCurrentAddress1.valid &&
        data.patientCurrentAddress1.value !== "" &&
        data.patientCurrentAddress2.valid &&
        data.patientCurrentAddressCity.valid &&
        data.patientCurrentAddressCity.value !== "" &&
        data.patientCurrentAddressState.valid &&
        data.patientCurrentAddressState.value !== "" &&
        data.patientCurrentAddressZip.valid &&
        data.patientCurrentAddressZip.value !== "" &&
        data.patientCurrentAddressZip.value.length === 5
      ) {
        const currentAddress: IAddress = {
          address1: data.patientCurrentAddress1.value,
          address2: data.patientCurrentAddress2.value,
          city: data.patientCurrentAddressCity.value,
          state: data.patientCurrentAddressState.value,
          zip: data.patientCurrentAddressZip.value,
        };
        setAddress(currentAddress);
        manualPopulateFacilityDetails(null, currentAddress!, false);
      } else {
        if (isUpdatingFromDataChange) {
          resetDeliverySiteType();
        }
        setAddress(null);
      }
    }
  };

  const getAddressFromPatientPermanentAddress = (
    isUpdatingFromDataChange: boolean
  ) => {
    if (
      data.address1.valid &&
      data.address1.value !== "" &&
      data.address2.valid &&
      data.city.valid &&
      data.city.value !== "" &&
      data.state.valid &&
      data.state.value !== "" &&
      data.zip.valid &&
      data.zip.value !== "" &&
      data.zip.value.length === 5
    ) {
      const permanentAddress: IAddress = {
        address1: data.address1.value,
        address2: data.address2.value,
        city: data.city.value,
        state: data.state.value,
        zip: data.zip.value,
      };
      setAddress(permanentAddress);
      manualPopulateFacilityDetails(null, permanentAddress!, false);
    } else {
      if (isUpdatingFromDataChange) {
        resetDeliverySiteType();
      }
      setAddress(null);
    }
  };

  const handleAddressConitnueButton = () => {
    let upsValidateAddr: any;
    if (selectedUPSAddress.includes("enteredAddress")) {
      upsValidateAddr = JSON.parse(selectedUPSAddress.split("-")[1]);
    } else {
      upsValidateAddr = JSON.parse(selectedUPSAddress);
    }
    setDeliveryInformation((deliveryInformation: IDeliveryInformation) => ({
      ...deliveryInformation,
      deliveryAddressLine1: {
        value: upsValidateAddr.addressLine1,
        valid: ValidationStatus.VALID,
      },
      deliveryAddressLine2: {
        value:
          upsValidateAddr.addressLine2 === null
            ? ""
            : upsValidateAddr.addressLine2,
        valid: ValidationStatus.VALID,
      },
      deliveryCity: {
        value: upsValidateAddr.city,
        valid: ValidationStatus.VALID,
      },
      deliveryState: {
        value: upsValidateAddr.state,
        valid: ValidationStatus.VALID,
      },
      deliveryZipCode: {
        value: upsValidateAddr.zipCode,
        valid: ValidationStatus.VALID,
      },
    }));
    setAddress(null);
    setOpenAddress(false);
  };

  const resetFacilityDetails = () => {
    const defaultValue = { valid: ValidationStatus.UNTOUCHED, value: "" };
    setDeliveryInformation((deliveryInformation: IDeliveryInformation) => ({
      ...deliveryInformation,
      deliveryFacilityName: defaultValue,
      deliveryAddressLine1: defaultValue,
      deliveryAddressLine2: {
        valid: ValidationStatus.VALID,
        value: "",
        isDefaultValid: true,
      },
      deliveryCity: defaultValue,
      deliveryState: defaultValue,
      deliveryZipCode: defaultValue,
    }));
  };

  const manualPopulateFacilityDetails = (
    facility: IFacility | null,
    address: IAddress | null,
    isMyFacility: boolean
  ) => {
    if (isMyFacility) {
      setDeliveryInformation((deliveryInformation: IDeliveryInformation) => ({
        ...deliveryInformation,
        deliveryFacilityName: valueObj(facility?.accountName),
        deliveryAddressLine1: valueObj(facility?.address1),
        deliveryAddressLine2: valueObj(facility?.address2),
        deliveryCity: valueObj(facility?.city),
        deliveryState: valueObj(facility?.state),
        deliveryZipCode: valueObj(facility?.zip),
      }));
    } else {
      deliveryInformation.deliveryFacilityName = valueObj(
        `${data.firstName.value} ${data.lastName.value}`
      );
      deliveryInformation.deliveryAddressLine1 = valueObj(address?.address1);
      deliveryInformation.deliveryAddressLine2 = valueObj(address?.address2);
      deliveryInformation.deliveryCity = valueObj(address?.city);
      deliveryInformation.deliveryState = valueObj(address?.state);
      deliveryInformation.deliveryZipCode = valueObj(address?.zip);
    }
  };

  const valueObj = (facilityObj: any) => {
    return {
      valid: ValidationStatus.VALID,
      value: facilityObj ? facilityObj : "",
    };
  };

  const checkCurrentAddressChanged = (): boolean => {
    if (data.IsSamePermanentAddress.value === "true") {
      return checkParmanentAddressChanged();
    } else {
      if (address && checkCurrentAddressValid()) {
        if (
          data.patientCurrentAddress1.value !== address.address1 ||
          data.patientCurrentAddress2.value !== address.address2 ||
          data.patientCurrentAddressCity.value !== address.city ||
          data.patientCurrentAddressState.value !== address.state ||
          data.patientCurrentAddressZip.value !== address.zip
        ) {
          resetDeliverySiteType();
          return true;
        }
      }
      return false;
    }
  };

  const checkCurrentAddressValid = (): boolean => {
    return (
      data.patientCurrentAddress1.valid === ValidationStatus.VALID &&
      data.patientCurrentAddress2.valid === ValidationStatus.VALID &&
      data.patientCurrentAddressCity.valid === ValidationStatus.VALID &&
      data.patientCurrentAddressState.valid === ValidationStatus.VALID &&
      data.patientCurrentAddressZip.valid === ValidationStatus.VALID
    );
  };

  const checkParmanentAddressChanged = (): boolean => {
    if (address && checkPermanentAddressValid()) {
      if (
        data.address1.value !== address.address1 ||
        data.address2.value !== address.address2 ||
        data.city.value !== address.city ||
        data.state.value !== address.state ||
        data.zip.value !== address.zip
      ) {
        resetDeliverySiteType();
        return true;
      }
    }
    return false;
  };

  const checkPermanentAddressValid = (): boolean => {
    return (
      data.address1.valid === ValidationStatus.VALID &&
      data.address2.valid === ValidationStatus.VALID &&
      data.city.valid === ValidationStatus.VALID &&
      data.state.valid === ValidationStatus.VALID &&
      data.zip.valid === ValidationStatus.VALID
    );
  };

  const resetDeliverySiteType = () => {
    setAddress(null);
    setDeliveryInformation(
      Object.assign({}, deliveryInformation, {
        deliverySiteType: { value: "", valid: ValidationStatus.UNTOUCHED },
      })
    );
  };

  const validateAndSetData = (e: any) => {
    NewOrderObj?.setIsHandleChangeTriggered(true);
    let value = e.target.value;
    if (e.target.name === "deliveryProductNeedByTime") {
      NewOrderObj?.setIsLoadCustomDeliveryDate(true);
      value = getCodeFromText(needTimes, e.target.value);
    } else if (e.target.name === "deliverySiteType") {
      resetFacilityDetails();
      value = getCodeFromText(deliverySites, e.target.value);
      if (value !== "101") {
        setFacility(null);
      }
      const isDefaultType = checkDeliverySiteTypeValue(value);
      updateUIBasedOnDeliveryType(
        value,
        isDefaultType! && isDeliverySiteTypeForDefault && value !== "101"
          ? false
          : true
      );
    } else if (e.target.name === "deliveryState") {
      value = getCodeFromText(states, e.target.value);
    }
    const isValid = validator.validate(value, e.target.name);
    setDeliveryInformation((data: IDeliveryInformation) => ({
      ...data,
      [e.target.name]: { value: value, valid: isValid?.status },
    }));
    const sa = Object.assign({}, deliveryInformation, {
      [e.target.name]: { value: value, valid: isValid?.status },
    });
    const obj = getDeepClone(sa);
    if (e.target.name === "deliveryZipCode") {
      if (
        obj.deliveryAddressLine1.valid === ValidationStatus.VALID &&
        obj.deliveryAddressLine2.valid === ValidationStatus.VALID &&
        obj.deliveryCity.valid === ValidationStatus.VALID &&
        obj.deliveryState.valid === ValidationStatus.VALID &&
        obj.deliveryZipCode.valid === ValidationStatus.VALID
      ) {
        e.target.blur();
        const address: IAddress = {
          address1: obj.deliveryAddressLine1.value,
          address2: obj.deliveryAddressLine2.value,
          city: obj.deliveryCity.value,
          state: obj.deliveryState.value,
          zip: obj.deliveryZipCode.value,
        };
        setAddress(address);
        manualPopulateFacilityDetails(null, address!, false);
        validateUPSAddress(obj);
      }
    }
  };

  function removeAllBefore(array: any, time: string) {
    const index = needTimesText.findIndex((x: string) => x === time);
    if (index !== -1) {
      return array.splice(index, array.length - 1);
    }
    return array;
  }

  const validateAndSetDate = async (date: string | null | undefined) => {
    NewOrderObj?.setIsHandleChangeTriggered(true);
    NewOrderObj?.setIsLoadCustomDeliveryDate(true);
    const formatteddate = convertStringToDate(date);
    const isValid = validator.validate(
      formatteddate!,
      "deliveryProductNeedByDate"
    );
    const currentDateRes = await getCurrentServerDateTime();
    if (currentDateRes) {
      if (
        formatteddate === convertStringToDate(currentDateRes.currentCstTime)
      ) {
        const dateTime = moment(currentDateRes.currentCstTime)
          .add(5, "hours")
          .toDate();
        const time = moment(RoundToNearestMinutes(dateTime)).format("h:mm A");
        const arr = removeAllBefore(needTimesText, time);
        setNeedTimesText(arr);
      } else {
        const arr: any = needTimes.map((x: { text: string }) => x.text);
        setNeedTimesText(arr);
      }
    }

    setDeliveryInformation((data: IDeliveryInformation) => ({
      ...data,
      deliveryProductNeedByDate: {
        value: formatteddate,
        valid: isValid?.status,
      },
      deliveryProductNeedByTime: {
        value: "",
        valid: ValidationStatus.UNTOUCHED,
      },
    }));
  };

  const setClasses = (e: any, classname: string) => {
    setFocusClasses(
      Object.assign({}, focusClasses, { [e.target.name]: classname })
    );
  };

  return (
    <div className="delivery-information-component">
      {!isReviewOrder && (
        <div className="delivery-information">
          <div className="delivery-info-header">
            {" "}
            <h2
              className="delivery-information-title"
              data-testid="delivery-information-title"
            >
              Delivery Information
            </h2>
            <Tooltip
              classes={{
                tooltip: "deliveryInfotooltip",
                popper: "deliveryInfopopper",
              }}
              title={
                <>
                  <div className="tooltip-content">
                    <div className="tooltip-header">
                      Please note
                      <div className="tooltip-body">
                        Release times may vary based on payer requirements and
                        availability of necessary components needed for order
                        release.
                      </div>
                    </div>
                  </div>
                </>
              }
              data-testid="deliveryInfoTooltipTest"
            >
              <InfoOutlinedIcon
                color="primary"
                classes={{ root: "tooltipRoot" }}
              />
            </Tooltip>
          </div>

          <Box
            className="delivery-information-box-container"
            sx={{ flexGrow: 1 }}
          >
            <Grid
              className="delivery-information-grid-container"
              container
              spacing={2}
            >
              <Grid className="delivery-information-grid-item" item xs={6}>
                <InputWithLabel
                  labelClassName={focusClasses.deliveryProductNeedByDate}
                  label="Product Need By Date"
                  isRequired={true}
                  error={
                    deliveryInformation?.deliveryProductNeedByDate.valid ===
                    ValidationStatus.INVALID
                  }
                  testId="delivery-information-product-need-date"
                >
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DatePicker
                      components={{ OpenPickerIcon: CalendarIcon }}
                      InputAdornmentProps={{
                        classes: {
                          root: "adornedRoot",
                        },
                      }}
                      InputProps={{
                        classes: {
                          root: `deliveryProductNeedByDate ${
                            deliveryInformation?.deliveryProductNeedByDate
                              .valid === ValidationStatus.INVALID
                              ? "showError"
                              : "noError"
                          }`,
                          input: "input",
                          notchedOutline: "outline",
                        },
                      }}
                      onChange={(value: any) => validateAndSetDate(value)}
                      renderInput={(params) => {
                        params.error = false;
                        params.inputProps!.placeholder = "__/__/____";
                        return (
                          <TextField
                            name="deliveryProductNeedByDate"
                            onFocus={(e) => setClasses(e, "Mui-focused")}
                            onBlur={(e) => setClasses(e, "")}
                            {...params}
                          />
                        );
                      }}
                      value={
                        deliveryInformation?.deliveryProductNeedByDate.value
                      }
                      maxDate={maxDate}
                    />
                  </LocalizationProvider>
                </InputWithLabel>
              </Grid>
              <Grid className="delivery-information-grid-item" item xs={6}>
                <InputWithLabel
                  label="Need by Time"
                  isRequired={true}
                  error={
                    deliveryInformation?.deliveryProductNeedByTime.valid ===
                    ValidationStatus.INVALID
                  }
                  testId="delivery-information-need-by-time"
                >
                  <CustomDropDown
                    handleChange={validateAndSetData}
                    menuItem={needTimesText}
                    name="deliveryProductNeedByTime"
                    placeHolder="Select Time"
                    selectpropsClassName={
                      deliveryInformation.deliveryProductNeedByTime.value
                        ? "delivery-information-select"
                        : "placeHolder"
                    }
                    selectClassName={
                      deliveryInformation.deliveryProductNeedByTime.value
                        ? "delivery-information-input"
                        : "placeHolder"
                    }
                    testId="delivery-information-deliveryProductNeedByTime"
                    value={
                      deliveryInformation?.deliveryProductNeedByTime.value
                        ? getTextFromCode(
                            needTimes,
                            deliveryInformation.deliveryProductNeedByTime.value
                          )
                        : null
                    }
                  />
                </InputWithLabel>
              </Grid>
              <Grid className="delivery-information-grid-item" item xs={12}>
                <InputWithLabel
                  label="Delivery Site Type"
                  isRequired={true}
                  error={
                    deliveryInformation?.deliverySiteType.valid ===
                    ValidationStatus.INVALID
                  }
                  testId="delivery-information-delivery-site-type"
                >
                  <CustomDropDown
                    handleChange={validateAndSetData}
                    menuItem={deliverySitesText}
                    name="deliverySiteType"
                    placeHolder="Select Address Type"
                    selectpropsClassName={
                      deliveryInformation.deliverySiteType.value
                        ? "delivery-information-select"
                        : "placeHolder"
                    }
                    selectClassName={
                      deliveryInformation.deliverySiteType.value
                        ? "delivery-information-input"
                        : "placeHolder"
                    }
                    testId="delivery-information-deliverySiteType"
                    value={
                      deliveryInformation?.deliverySiteType.value
                        ? getTextFromCode(
                            deliverySites,
                            deliveryInformation.deliverySiteType.value
                          )
                        : null
                    }
                  />
                </InputWithLabel>
              </Grid>
            </Grid>
          </Box>
          {isDeliverySiteTypeForDefault && (
            <Box
              className="delivery-information-box-container"
              sx={{ flexGrow: 1 }}
            >
              <Grid
                className="delivery-information-grid-container"
                container
                spacing={2}
              >
                <Grid className="delivery-information-grid-item" item xs={12}>
                  <InputWithLabel
                    label="Facility Name"
                    isRequired={true}
                    error={
                      deliveryInformation.deliveryFacilityName.valid ===
                      ValidationStatus.INVALID
                    }
                    testId="delivery-information-facilityName"
                  >
                    <InputBase
                      className="delivery-information-input"
                      inputProps={{
                        "data-testid":
                          "delivery-information-facilityName-value",
                      }}
                      name="deliveryFacilityName"
                      onChange={validateAndSetData}
                      value={deliveryInformation.deliveryFacilityName.value}
                    />
                  </InputWithLabel>
                </Grid>
                <Grid className="delivery-information-grid-item" item xs={6}>
                  <InputWithLabel
                    label="Address Line 1 (No P.O. Boxes)"
                    isRequired={true}
                    error={
                      deliveryInformation.deliveryAddressLine1.valid ===
                      ValidationStatus.INVALID
                    }
                    testId="delivery-information-addressline1"
                  >
                    <InputBase
                      className="delivery-information-input"
                      inputProps={{
                        "data-testid":
                          "delivery-information-addressline1-value",
                      }}
                      name="deliveryAddressLine1"
                      onChange={validateAndSetData}
                      value={deliveryInformation.deliveryAddressLine1.value}
                    />
                  </InputWithLabel>
                </Grid>
                <Grid className="delivery-information-grid-item" item xs={6}>
                  <InputWithLabel
                    label="Address Line 2"
                    isRequired={false}
                    error={
                      deliveryInformation.deliveryAddressLine2.valid ===
                      ValidationStatus.INVALID
                    }
                    testId="delivery-information-addressline2"
                  >
                    <InputBase
                      className="delivery-information-input"
                      inputProps={{
                        "data-testid":
                          "delivery-information-addressline2-value",
                      }}
                      name="deliveryAddressLine2"
                      onChange={validateAndSetData}
                      value={deliveryInformation.deliveryAddressLine2.value}
                    />
                  </InputWithLabel>
                </Grid>
                <Grid className="delivery-information-grid-item" item xs={6}>
                  <InputWithLabel
                    label="City"
                    isRequired={true}
                    error={
                      deliveryInformation.deliveryCity.valid ===
                      ValidationStatus.INVALID
                    }
                    testId="delivery-information-city"
                  >
                    <InputBase
                      className="delivery-information-input"
                      inputProps={{
                        "data-testid": "delivery-information-city-value",
                      }}
                      name="deliveryCity"
                      onChange={validateAndSetData}
                      value={deliveryInformation.deliveryCity.value}
                    />
                  </InputWithLabel>
                </Grid>
                <Grid className="delivery-information-grid-item" item xs={3}>
                  <InputWithLabel
                    label="State"
                    isRequired={true}
                    error={
                      deliveryInformation.deliveryState.valid ===
                      ValidationStatus.INVALID
                    }
                    testId="delivery-information-state"
                  >
                    <CustomDropDown
                      handleChange={validateAndSetData}
                      menuItem={statesText}
                      name="deliveryState"
                      selectpropsClassName={
                        deliveryInformation.deliveryState.value
                          ? "delivery-information-select"
                          : "placeHolder"
                      }
                      selectClassName={
                        deliveryInformation.deliveryState.value
                          ? "delivery-information-input"
                          : "placeHolder"
                      }
                      testId="delivery-information-state-value"
                      value={
                        deliveryInformation.deliveryState.value
                          ? getTextFromCode(
                              states,
                              deliveryInformation.deliveryState.value
                            )
                          : null
                      }
                    />
                  </InputWithLabel>
                </Grid>
                <Grid className="delivery-information-grid-item" item xs={3}>
                  <InputWithLabel
                    label="ZIP Code"
                    isRequired={true}
                    error={
                      deliveryInformation.deliveryZipCode.valid ===
                      ValidationStatus.INVALID
                    }
                    testId="delivery-information-zip-code"
                  >
                    <InputBase
                      className="delivery-information-input"
                      inputProps={{
                        "data-testid": "delivery-information-zip-code-value",
                        maxLength: 5,
                      }}
                      name="deliveryZipCode"
                      onChange={validateAndSetData}
                      value={deliveryInformation.deliveryZipCode.value}
                    />
                  </InputWithLabel>
                </Grid>
              </Grid>
            </Box>
          )}
          {facility && (
            <Box
              className="delivery-information-box-container"
              sx={{ flexGrow: 1 }}
            >
              <Grid
                className="delivery-information-grid-container"
                container
                spacing={2}
              >
                <Grid className="delivery-information-grid-item" item xs={12}>
                  <div className="facilityDetail">
                    <FacilityInfoDetail
                      facilityInfo={facility}
                      index={0}
                      key={0}
                      openConfirmationBox={null}
                      showTrash={false}
                    />
                  </div>
                </Grid>
              </Grid>
            </Box>
          )}
          {address && !isDeliverySiteTypeForDefault && (
            <Box
              className="delivery-information-box-container"
              sx={{ flexGrow: 1 }}
            >
              <Grid
                className="delivery-information-grid-container"
                container
                spacing={2}
              >
                <Grid className="delivery-information-grid-item" item xs={12}>
                  <div className="facilityAddress">
                    <Typography
                      className="facilitytitle"
                      data-testid="delivery-address"
                    >
                      Delivery Address
                    </Typography>
                    <Typography
                      className="facilityvalue"
                      data-testid="address1"
                    >
                      {makeCapitalEachWordInString(address.address1)}
                      {","}
                    </Typography>
                    <Typography
                      className="facilityvalue"
                      data-testid="address2"
                    >
                      {makeCapitalEachWordInString(address.address2)}
                      {address.address2.length > 0 ? "," : ""}
                    </Typography>
                    <Typography
                      className="facilityvalue"
                      data-testid="city-state-zip"
                    >
                      {makeCapitalEachWordInString(address.city)},{" "}
                      {address.state}
                      {", "}
                      {address.zip}
                    </Typography>
                  </div>
                </Grid>
              </Grid>
            </Box>
          )}
          <ValidateUPSAddressInfo
            address={address!}
            openAddress={openAddress}
            setOpenAddress={setOpenAddress}
            loading={loading}
            setSelectedUPSAddress={setSelectedUPSAddress}
            selectedUPSAddress={selectedUPSAddress}
            validateAddress={validateAddress}
            handleAddressConitnueButton={handleAddressConitnueButton}
            noAddressFound={noAddressFound}
            message={message}
            title=" Please confirm facility address "
          />
        </div>
      )}
      {isReviewOrder && (
        <DeliveryInfoReviewOrder
          data={deliveryInformation}
          deliverySites={deliverySites}
          editButtonClicked={editButtonClicked}
          isOrderSummary={isOrderSummary}
        />
      )}
    </div>
  );
};
