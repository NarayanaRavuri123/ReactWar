import { Grid, InputBase } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import {
  SupplyOrderContext,
  SupplyOrderContextType,
} from "../../../context/SupplyOrderContext";
import { CustomCheckBox } from "../../../core/checkBox/checkBox.component";
import { CustomDropDown } from "../../../core/customDropdown/customDropdown.component";
import { InputWithLabel } from "../../../core/inputWithLabel/inputWithLabel.component";
import { ValidationStatus } from "../../../core/interfaces/input.interface";
import { getPatientAddresses } from "../../../util/3meService";
import { getdropDownContent } from "../../../util/dropDownService";
import { getDeepClone } from "../../../util/ObjectFunctions";
import { DD_US_STATES_CONTENT } from "../../../util/staticText";
import {
  getCodeFromText,
  getTextFromCode,
  makeCapitalEachWordInString,
} from "../../../util/utilityFunctions";
import { validateUpsAddress } from "../../../util/validateUpsAddressService";
import { IAddress } from "../../newOrder/patientInformation/patientInformation.interface";
import { ValidateUPSAddressInfo } from "../../newOrder/patientInformation/validateUPSAddressInfo.component";
import { ISupplyOrder } from "../supplyOrder.interface";
import { SupplyOrderValidator } from "../supplyOrder.validator";
import "./deliveryAddress.css";
import DeliveryAddressReviewOrder from "./reviewOrder/deliveryAddressReviewOrder.component";

export interface IDeliveryAddress {
  data: ISupplyOrder;
  setData: any;
  Validator?: SupplyOrderValidator;
  isReviewOrder: boolean;
  openSupplyOrderPageEdit: any;
}

export const DeliveryAddress = ({
  data,
  setData,
  Validator,
  isReviewOrder,
  openSupplyOrderPageEdit,
}: IDeliveryAddress) => {
  const [validator] = useState<SupplyOrderValidator>(Validator!);
  const SupplyOrderObj = useContext<SupplyOrderContextType | null>(
    SupplyOrderContext
  );
  const [showCurrent, setShowCurrent] = useState(
    data.sameAsCurrentAddress.value.toLowerCase() === "yes" ? true : false
  );
  const [address, setAddress] = useState<IAddress | null>();
  const [noAddressFound, setNoAddressFound] = useState(false);
  const [selectedUPSAddress, setSelectedUPSAddress] = useState("");
  const [validateAddress, setValidateUPSAddress] = useState<any>([]);
  const [openAddress, setOpenAddress] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setIsLoading] = useState(false);
  const [ddStates, setDDStates] = useState([]);
  const [allStates, setAllStates] = useState([]);
  const [showValidateUPSAddress, setShowValidateUPSAddress] = useState<
    boolean | null
  >(null);
  const handleAddressConitnueButton = () => {
    let upsValidateAddr: any;
    if (selectedUPSAddress.includes("enteredAddress")) {
      upsValidateAddr = JSON.parse(selectedUPSAddress.split("-")[1]);
    } else {
      upsValidateAddr = JSON.parse(selectedUPSAddress);
    }
    setData((data: ISupplyOrder) => ({
      ...data,
      addressLine1: {
        value: upsValidateAddr.addressLine1,
        valid: ValidationStatus.VALID,
        required: true,
      },
      addressLine2: {
        value:
          upsValidateAddr.addressLine2 === null
            ? ""
            : upsValidateAddr.addressLine2,
        valid: ValidationStatus.VALID,
        required: false,
      },
      city: {
        value: upsValidateAddr.city,
        valid: ValidationStatus.VALID,
        required: true,
      },
      state: {
        value: upsValidateAddr.state,
        valid: ValidationStatus.VALID,
        required: true,
      },
      zipCode: {
        value: upsValidateAddr.zipCode,
        valid: ValidationStatus.VALID,
        required: true,
      },
    }));
    setOpenAddress(false);
  };

  const validateUPSAddress = async (obj: ISupplyOrder) => {
    const reqParams = {
      AddressLine1: obj.addressLine1.value,
      AddressLine2: obj.addressLine2.value,
      City: obj.city.value,
      State: obj.state.value,
      zipCode: obj.zipCode.value,
    };
    const address: IAddress = {
      address1: obj.addressLine1.value,
      address2: obj.addressLine2.value,
      city: obj.city.value,
      state: obj.state.value,
      zip: obj.zipCode.value,
    };
    setAddress(address);
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

  const validateAndSetData = (e: any) => {
    let val = e.target.value;
    const required = e.target.required;
    let isValid = validator.validate(val, e.target.name);
    if (e.target.name === "sameAsCurrentAddress") {
      const checked = e.target.checked;
      setShowCurrent(checked);
      setData(
        Object.assign({}, data, {
          [e.target.name]: {
            value: checked ? "Yes" : "No",
            valid: ValidationStatus.VALID,
            required: required,
          },
        })
      );
    } else if (e.target.name === "state") {
      val = getCodeFromText(allStates, e.target.value);
      isValid = validator.validate(val, e.target.name);
      setData(
        Object.assign({}, data, {
          [e.target.name]: {
            value: val,
            valid: isValid?.status,
            required: required,
          },
        })
      );
    } else {
      if (e.target.name === "zipCode" && !showValidateUPSAddress) {
        setShowValidateUPSAddress(true);
      }
      setData(
        Object.assign({}, data, {
          [e.target.name]: {
            value: val,
            valid: isValid?.status,
            required: required,
          },
        })
      );
    }
  };

  const validateAndSetCheckboxData = (e: any) => {
    const val = e.target.value;
    const checked = e.target.checked;
    setShowCurrent(checked);
    setData((data: ISupplyOrder) => ({
      ...data,
      sameAsCurrentAddress: {
        value: checked ? "Yes" : "No",
        valid: ValidationStatus.VALID,
        required: false,
        isOptional: true,
      },
      addressLine1: {
        value: "",
        valid: ValidationStatus.UNTOUCHED,
        required: true,
        isOptional: checked ? true : false,
      },
      addressLine2: {
        value: "",
        valid: ValidationStatus.VALID,
        required: false,
        isOptional: true,
      },
      state: {
        value: "",
        valid: ValidationStatus.UNTOUCHED,
        required: true,
        isOptional: checked ? true : false,
      },
      city: {
        value: "",
        valid: ValidationStatus.UNTOUCHED,
        required: true,
        isOptional: checked ? true : false,
      },
      zipCode: {
        value: "",
        valid: ValidationStatus.UNTOUCHED,
        required: true,
        isOptional: checked ? true : false,
      },
    }));
  };

  const getAndSetPatientCurrentAddress = async (reqParams: any) => {
    try {
      const caData = await getPatientAddresses(reqParams);
      if (caData.succeeded) {
        setData((dt: ISupplyOrder) => ({
          ...dt,
          caAddressLine1: {
            value: caData.item.currentAddress.addressLine1,
            valid: ValidationStatus.VALID,
            required: true,
          },
          caAddressLine2: {
            value: caData.item.currentAddress.addressLine2,
            valid: ValidationStatus.VALID,
            required: true,
          },
          caCity: {
            value: caData.item.currentAddress.city,
            valid: ValidationStatus.VALID,
            required: true,
          },
          caState: {
            value: caData.item.currentAddress.state,
            valid: ValidationStatus.VALID,
            required: true,
          },
          caZipCode: {
            value: caData.item.currentAddress.zipCode,
            valid: ValidationStatus.VALID,
            required: true,
          },
        }));
      }
    } catch (error) {
      console.log("error occurred ", error);
    }
  };

  const fetchStates = async () => {
    getdropDownContent(DD_US_STATES_CONTENT).then((resp) => {
      const sortedData = resp.items[0].data.sort((a: any, b: any) =>
        a.order > b.order ? 1 : -1
      );
      setAllStates(sortedData);
      const ddSortedData = resp.items[0].data
        .sort((a: any, b: any) => (a.order > b.order ? 1 : -1))
        .map((x: any) => x.text);
      setDDStates(ddSortedData);
    });
  };

  useEffect(() => {
    const reqParams = {
      RentalOrderNumber: SupplyOrderObj?.selectedPatient.roNumber,
      dob: SupplyOrderObj?.selectedPatient.dob,
    };
    getAndSetPatientCurrentAddress(reqParams);
    fetchStates();
    if (SupplyOrderObj && SupplyOrderObj.isBackFromReviewPage) {
      setShowValidateUPSAddress(false);
    } else {
      setShowValidateUPSAddress(true);
    }
  }, []);

  useEffect(() => {
    const obj = getDeepClone(data);
    if (
      obj.addressLine1.valid === ValidationStatus.VALID &&
      obj.city.valid === ValidationStatus.VALID &&
      obj.state.valid === ValidationStatus.VALID &&
      obj.zipCode.valid === ValidationStatus.VALID &&
      obj.addressLine2.valid === ValidationStatus.VALID &&
      data.sameAsCurrentAddress.value.toLowerCase() === "no" &&
      showValidateUPSAddress
    ) {
      validateUPSAddress(obj);
    }
  }, [data.zipCode.value]);

  return (
    <Grid
      container
      className="delivery-address-container"
      classes={{ root: "delivery-address-container-root" }}
    >
      {!isReviewOrder && (
        <>
          <Grid item>
            <div className="address-header" data-testid="deliveryAddress">
              Delivery Address
            </div>
            <InputWithLabel
              isRequired={data.sameAsCurrentAddress.required}
              error={
                data.sameAsCurrentAddress.valid === ValidationStatus.INVALID
              }
              testId="sameAsCurrentAddress"
            >
              <CustomCheckBox
                handleChange={validateAndSetCheckboxData}
                labelClassName="current-address-label"
                value={data.sameAsCurrentAddress.value}
                checked={data.sameAsCurrentAddress.value === "Yes"}
                labelText="Same as Current Address"
                selectClassName="current-address-chkbox"
                name="sameAsCurrentAddress"
                required={data.sameAsCurrentAddress.required}
                testId="sameAsCurrentAddressChkbox"
              />
            </InputWithLabel>
          </Grid>
          {showCurrent ? (
            <Grid item className="current-address-container">
              <div
                className="patient-current-address"
                data-testid="currentAddressHeader"
              >
                Current Address
              </div>
              <div className="address-lines" data-testid="addressLines">
                {data.caAddressLine1.value !== ""
                  ? `${makeCapitalEachWordInString(
                      data.caAddressLine1.value
                    )}${makeCapitalEachWordInString(data.caAddressLine2.value)}`
                  : "--"}
              </div>
              <div className="address-lines">
                {`${makeCapitalEachWordInString(data.caCity.value)}` +
                  "," +
                  " " +
                  `${data.caState.value}` +
                  " " +
                  `${data.caZipCode.value.split("-")[0]}`}
              </div>
            </Grid>
          ) : (
            <>
              <Grid container className="address-line-container">
                <Grid item className="address-line1-item">
                  <InputWithLabel
                    label="Address Line 1 (No P.O. Boxes)"
                    isRequired={data.addressLine1.required}
                    error={data.addressLine1.valid === ValidationStatus.INVALID}
                  >
                    <InputBase
                      className="address-line1"
                      required={data.addressLine1.required}
                      name="addressLine1"
                      onChange={validateAndSetData}
                      value={data.addressLine1.value}
                      inputProps={{ "data-testid": "addressLine1" }}
                    />
                  </InputWithLabel>
                </Grid>
                <Grid item className="address-line2-item">
                  <InputWithLabel
                    label="Address Line 2"
                    isRequired={data.addressLine2.required}
                    error={data.addressLine2.valid === ValidationStatus.INVALID}
                  >
                    <InputBase
                      required={data.addressLine2.required}
                      name="addressLine2"
                      className="address-line2"
                      onChange={validateAndSetData}
                      value={data.addressLine2.value}
                      inputProps={{ "data-testid": "addressLine2" }}
                    />
                  </InputWithLabel>
                </Grid>
              </Grid>
              <Grid className="city-state-container" container>
                <Grid item className="city-item">
                  <InputWithLabel
                    label="City"
                    isRequired={data.city.required}
                    error={data.city.valid === ValidationStatus.INVALID}
                  >
                    <InputBase
                      className="city"
                      required={data.city.required}
                      name="city"
                      onChange={validateAndSetData}
                      value={data.city.value}
                      inputProps={{ "data-testid": "city" }}
                    />
                  </InputWithLabel>
                </Grid>
                <Grid item className="state-item">
                  <InputWithLabel
                    label="State"
                    isRequired={true}
                    error={data.state.valid === ValidationStatus.INVALID}
                  >
                    <CustomDropDown
                      handleChange={validateAndSetData}
                      menuItem={ddStates}
                      name="state"
                      selectpropsClassName="muistate-select"
                      selectClassName="state"
                      value={
                        data.state.value
                          ? getTextFromCode(allStates, data.state.value)
                          : null
                      }
                      testId="state"
                    />
                  </InputWithLabel>
                </Grid>
                <Grid item className="zipcode-item">
                  <InputWithLabel
                    label="ZIP Code"
                    isRequired={data.zipCode.required}
                    error={data.zipCode.valid === ValidationStatus.INVALID}
                  >
                    <InputBase
                      className="zipcode"
                      required={data.zipCode.required}
                      name="zipCode"
                      onChange={validateAndSetData}
                      value={data.zipCode.value}
                      inputProps={{ "data-testid": "zipCode", maxLength: 5 }}
                    />
                  </InputWithLabel>
                </Grid>
              </Grid>
            </>
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
            title=" Please confirm patient address "
          />
        </>
      )}
      {isReviewOrder && (
        <DeliveryAddressReviewOrder
          data={data}
          openSupplyOrderPageEdit={openSupplyOrderPageEdit}
        />
      )}
    </Grid>
  );
};
