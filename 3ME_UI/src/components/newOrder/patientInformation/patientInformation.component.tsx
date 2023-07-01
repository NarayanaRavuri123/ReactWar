import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Box, Grid, InputBase, TextField, Tooltip } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import { useContext, useRef, useState } from "react";
import InputMask from "react-input-mask";
import { ReactComponent as CalendarIcon } from "../../../assets/calendar.svg";
import {
  NewOrderContext,
  NewOrderContextType,
} from "../../../context/NewOrderContext";
import { CustomDropDown } from "../../../core/customDropdown/customDropdown.component";
import { InputWithLabel } from "../../../core/inputWithLabel/inputWithLabel.component";
import { ValidationStatus } from "../../../core/interfaces/input.interface";
import { getDeepClone } from "../../../util/ObjectFunctions";
import {
  convertStringToDate,
  getCodeFromText,
  getTextFromCode,
} from "../../../util/utilityFunctions";
import { validateUpsAddress } from "../../../util/validateUpsAddressService";
import { INewOrder } from "../newOrder.interface";
import { NewOrderValidator } from "../newOrder.validator";
import "./patientInformation.css";
import { IAddress, IPatientInformation } from "./patientInformation.interface";
import { PatientInfoReviewOrder } from "./reviewOrder/patientInfoReviewOrder.component";
import { ValidateUPSAddressInfo } from "./validateUPSAddressInfo.component";
export const PatientInformation = ({
  data,
  Validator = new NewOrderValidator(),
  setData,
  phoneTypes,
  states,
  statesText,
  vacTherapyInformationData,
  isReviewOrder = false,
  editButtonClicked,
  isOrderSummary = false,
}: IPatientInformation) => {
  var ref = useRef<any>(null);
  const [message, setMessage] = useState("");
  const [loading, setIsLoading] = useState(false);
  const [openAddress, setOpenAddress] = useState(false);
  const [address, setAddress] = useState<IAddress | null>();
  const [noAddressFound, setNoAddressFound] = useState(false);
  const [selectedUPSAddress, setSelectedUPSAddress] = useState("");
  const [validator] = useState<NewOrderValidator>(Validator!);
  const [validateAddress, setValidateUPSAddress] = useState<any>([]);
  const [focusClasses, setFocusClasses] = useState({ phone: "", dob: "" });
  const NewOrderObj = useContext<NewOrderContextType | null>(NewOrderContext);
  const validateUPSAddress = async (obj: INewOrder) => {
    if (
      obj.address1.valid === ValidationStatus.VALID &&
      obj.city.valid === ValidationStatus.VALID &&
      obj.state.valid === ValidationStatus.VALID &&
      obj.zip.valid === ValidationStatus.VALID &&
      obj.address2.valid === ValidationStatus.VALID
    ) {
      document.getElementById("patientCurrentAddressPhone")?.focus();
      const reqParams = {
        AddressLine1: obj.address1.value,
        AddressLine2: obj.address2.value,
        City: obj.city.value,
        State: obj.state.value,
        zipCode: obj.zip.value,
      };
      const address: IAddress = {
        address1: obj.address1.value,
        address2: obj.address2.value,
        city: obj.city.value,
        state: obj.state.value,
        zip: obj.zip.value,
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
    }
  };

  const validateAndSetData = async (e: any) => {
    NewOrderObj?.setIsHandleChangeTriggered(true);
    let value = e.target.value;
    let isValid = validator.validate(e.target.value, e.target.name);
    if (
      e.target.name === "phone" &&
      data.phone.valid === ValidationStatus.UNTOUCHED &&
      (e.target.value === "(___) ___-____" || e.target.value === "")
    ) {
      return;
    } else if (e.target.name === "state") {
      value = getCodeFromText(states, e.target.value);
      isValid = validator.validate(value, e.target.name);
    }
    setData(
      Object.assign({}, data, {
        [e.target.name]: { value: value, valid: isValid?.status },
      })
    );
    if (
      data?.IsSamePermanentAddress.value === "true" &&
      e.target.name === "phone"
    ) {
      setData(
        Object.assign({}, data, {
          [e.target.name]: { value: value, valid: isValid?.status },
          patientCurrentAddressPhone: {
            value: value,
            valid: isValid?.status,
          },
        })
      );
    }
    const sa = Object.assign({}, data, {
      [e.target.name]: { value: value, valid: isValid?.status },
    });
    const obj = getDeepClone(sa);
    if (e.target.name === "zip") {
      setTimeout(() => {
        validateUPSAddress(obj);
      }, 50);
    }
  };

  const validateMinimumAndSetData = (e: any) => {
    NewOrderObj?.setIsHandleChangeTriggered(true);
    const isValid = validator.validate(e.target.value, e.target.name);
    setData(
      Object.assign({}, data, {
        [e.target.name === "patientinfofirstName" ? "firstName" : "lastName"]: {
          value: e.target.value,
          valid: isValid?.status,
          minimumRequired: true,
        },
      })
    );
  };

  const validateAndSetDate = (date: string | null | undefined) => {
    const formatteddate = convertStringToDate(date);
    NewOrderObj?.setIsHandleChangeTriggered(true);
    const isValid = validator.validate(formatteddate!, "dob");
    setData(
      Object.assign({}, data, {
        dob: {
          value: formatteddate,
          valid: isValid?.status,
          minimumRequired: true,
        },
      })
    );
  };

  const setClasses = (e: any, classname: string) => {
    setFocusClasses(
      Object.assign({}, focusClasses, { [e.target.name]: classname })
    );
  };

  const handleAddressConitnueButton = () => {
    let upsValidateAddr;
    if (selectedUPSAddress.includes("enteredAddress")) {
      upsValidateAddr = JSON.parse(selectedUPSAddress.split("-")[1]);
    } else {
      upsValidateAddr = JSON.parse(selectedUPSAddress);
    }
    setData(
      Object.assign({}, data, {
        address1: {
          value: upsValidateAddr.addressLine1,
          valid: ValidationStatus.VALID,
        },
        address2: {
          value:
            upsValidateAddr.addressLine2 === null
              ? ""
              : upsValidateAddr.addressLine2,
          valid: ValidationStatus.VALID,
        },
        city: {
          value: upsValidateAddr.city,
          valid: ValidationStatus.VALID,
        },
        state: {
          value: upsValidateAddr.state,
          valid: ValidationStatus.VALID,
        },
        zip: {
          value: upsValidateAddr.zipCode,
          valid: ValidationStatus.VALID,
        },
      })
    );
    setOpenAddress(false);
  };

  return (
    <div className="patient-info-component">
      {!isReviewOrder && (
        <div className="patient-info">
          <div className="patient-info-header">
            <div className="patient-info-title-div">
              <h2 className="patient-info-title"> Patient Information</h2>
              <Tooltip
                classes={{ tooltip: "tooltip", popper: "popper" }}
                title={
                  <>
                    <div className="tooltip-content">
                      <div className="tooltip-header">
                        {vacTherapyInformationData &&
                          vacTherapyInformationData?.bubbleInfo[0]
                            ?.sectionHeader}
                      </div>
                      <div className="tooltip-body">
                        {vacTherapyInformationData &&
                          vacTherapyInformationData?.bubbleInfo[0]
                            ?.sectionContent}
                      </div>
                    </div>
                  </>
                }
              >
                <InfoOutlinedIcon
                  color="primary"
                  classes={{ root: "tooltipRoot" }}
                />
              </Tooltip>
            </div>
            <h5 className="patient-info-description">
              The patient's legal name and permanent residence.
            </h5>
          </div>
          <Box className="patient-info-box-container" sx={{ flexGrow: 1 }}>
            <Grid className="patient-info-grid-container" container spacing={2}>
              <Grid item md={6} xs={12}>
                <InputWithLabel
                  testId="newOrder-First-Name"
                  label="Patient First Name"
                  isRequired={true}
                  error={data?.firstName.valid === ValidationStatus.INVALID}
                >
                  <InputBase
                    autoFocus={
                      !isReviewOrder &&
                      data &&
                      data.firstName.valid === ValidationStatus.UNTOUCHED
                    }
                    className="patient-info-input"
                    name="patientinfofirstName"
                    onChange={validateMinimumAndSetData}
                    value={data?.firstName.value}
                  />
                </InputWithLabel>
              </Grid>
              <Grid item md={6} xs={12}>
                <InputWithLabel
                  label="Patient Last Name"
                  isRequired={true}
                  error={data?.lastName.valid === ValidationStatus.INVALID}
                >
                  <InputBase
                    className="patient-info-input"
                    name="patientinfolastName"
                    onChange={validateMinimumAndSetData}
                    value={data?.lastName.value}
                  />
                </InputWithLabel>
              </Grid>
            </Grid>
          </Box>
          <Box className="patient-info-box-container" sx={{ flexGrow: 1 }}>
            <Grid className="patient-info-grid-container" container spacing={2}>
              <Grid item md={6} xs={12}>
                <InputWithLabel
                  labelClassName={focusClasses.dob}
                  label="Date of Birth"
                  isRequired={true}
                  error={data?.dob.valid === ValidationStatus.INVALID}
                >
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DatePicker
                      InputAdornmentProps={{
                        classes: {
                          root: "adornedRoot",
                        },
                      }}
                      InputProps={{
                        classes: {
                          root: `dob ${
                            data?.dob.valid === ValidationStatus.INVALID
                              ? "showError"
                              : "noError"
                          }`,
                          input: "input",
                          notchedOutline: "outline",
                        },
                      }}
                      components={{ OpenPickerIcon: CalendarIcon }}
                      value={data?.dob.value}
                      onChange={(value) => validateAndSetDate(value)}
                      renderInput={(params) => {
                        params.error = false;
                        params.inputProps!.placeholder = "__/__/____";
                        return (
                          <TextField
                            name="dob"
                            onFocus={(e) => setClasses(e, "Mui-focused")}
                            onBlur={(e) => setClasses(e, "")}
                            {...params}
                          />
                        );
                      }}
                    />
                  </LocalizationProvider>
                </InputWithLabel>
              </Grid>
              <Grid item md={6} xs={12}>
                <InputWithLabel
                  labelClassName={focusClasses.phone}
                  label="Phone Number"
                  isRequired={true}
                  error={data?.phone.valid === ValidationStatus.INVALID}
                >
                  <InputMask
                    className="phone"
                    mask="(999) 999-9999"
                    name="phone"
                    onBlur={(e) => setClasses(e, "")}
                    onChange={validateAndSetData}
                    onFocus={(e) => setClasses(e, "Mui-focused")}
                    placeholder="(___) ___-____"
                    value={data.phone.value}
                  />
                </InputWithLabel>
              </Grid>
            </Grid>
          </Box>
          <Box className="patient-info-box-container" sx={{ flexGrow: 1 }}>
            <Grid className="patient-info-grid-container" container spacing={2}>
              <Grid item xs={12}>
                <InputWithLabel
                  label="Patient Email Address"
                  isRequired={false}
                  error={data?.email.valid === ValidationStatus.INVALID}
                >
                  <InputBase
                    className="patient-info-input"
                    name="email"
                    onChange={validateAndSetData}
                    value={data?.email.value}
                  />
                </InputWithLabel>
              </Grid>
            </Grid>
          </Box>
          <Box className="patient-info-box-container" sx={{ flexGrow: 1 }}>
            <Grid className="patient-info-grid-container" container spacing={2}>
              <Grid item md={6} xs={12}>
                <InputWithLabel
                  label="Address Line 1"
                  isRequired={true}
                  error={data?.address1.valid === ValidationStatus.INVALID}
                >
                  <InputBase
                    className="patient-info-input"
                    name="address1"
                    onChange={validateAndSetData}
                    value={data?.address1.value}
                  />
                </InputWithLabel>
              </Grid>
              <Grid item md={6} xs={12}>
                <InputWithLabel
                  label="Address Line 2"
                  isRequired={false}
                  error={data?.address2.valid === ValidationStatus.INVALID}
                >
                  <InputBase
                    className="patient-info-input"
                    name="address2"
                    onChange={validateAndSetData}
                    value={data?.address2.value}
                    inputRef={ref}
                  />
                </InputWithLabel>
              </Grid>
            </Grid>
          </Box>
          <Box className="patient-info-box-container" sx={{ flexGrow: 1 }}>
            <Grid className="patient-info-grid-container" container spacing={2}>
              <Grid item md={6} xs={12}>
                <InputWithLabel
                  label="City"
                  isRequired={true}
                  error={data?.city.valid === ValidationStatus.INVALID}
                >
                  <InputBase
                    className="patient-info-input"
                    name="city"
                    onChange={validateAndSetData}
                    value={data?.city.value}
                  />
                </InputWithLabel>
              </Grid>
              <Grid item md={3} xs={6}>
                <InputWithLabel
                  label="State"
                  isRequired={true}
                  error={data?.state.valid === ValidationStatus.INVALID}
                >
                  <CustomDropDown
                    handleChange={validateAndSetData}
                    menuItem={statesText}
                    name="state"
                    selectpropsClassName={
                      data.state.value ? "patient-info-select" : "placeHolder"
                    }
                    selectClassName={
                      data.state.value ? "patient-info-input" : "placeHolder"
                    }
                    value={
                      data.state.value
                        ? getTextFromCode(states, data.state.value)
                        : null
                    }
                  />
                </InputWithLabel>
              </Grid>
              <Grid item md={3} xs={6}>
                <InputWithLabel
                  label="ZIP Code"
                  isRequired={true}
                  error={data?.zip.valid === ValidationStatus.INVALID}
                >
                  <InputBase
                    className="patient-info-input"
                    id="patient-info-input"
                    name="zip"
                    onChange={validateAndSetData}
                    value={data?.zip.value}
                    inputProps={{
                      maxLength: 5,
                    }}
                  />
                </InputWithLabel>
              </Grid>
            </Grid>
          </Box>
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
        </div>
      )}
      {isReviewOrder && (
        <PatientInfoReviewOrder
          data={data}
          editButtonClicked={editButtonClicked}
          isOrderSummary={isOrderSummary}
        />
      )}
    </div>
  );
};
