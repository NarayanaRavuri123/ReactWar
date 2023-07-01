import { useContext, useState } from "react";
import "./patientCurrentAddress.css";
import {
  getCodeFromText,
  getTextFromCode,
} from "../../../util/utilityFunctions";
import InputMask from "react-input-mask";
import { Box, Grid, InputBase } from "@mui/material";
import { NewOrderValidator } from "../newOrder.validator";
import { CustomCheckBox } from "../../../core/checkBox/checkBox.component";
import { IPatientCurrentAddress } from "./patientCurrentAddress.interface";
import { ValidationStatus } from "../../../core/interfaces/input.interface";
import { InputWithLabel } from "../../../core/inputWithLabel/inputWithLabel.component";
import { CustomDropDown } from "../../../core/customDropdown/customDropdown.component";
import { PatientCurrentAddressReviewOrder } from "./reviewOrder/partientCurrentAddressReviewOrder.component";
import {
  NewOrderContext,
  NewOrderContextType,
} from "../../../context/NewOrderContext";

export const PatientCurrentAddress = ({
  data,
  Validator = new NewOrderValidator(),
  setData,
  states,
  statesText,
  isReviewOrder = false,
  editButtonClicked,
  isOrderSummary = false,
}: IPatientCurrentAddress) => {
  const [validator] = useState<NewOrderValidator>(Validator!);
  const [focusClasses, setFocusClasses] = useState({
    phone: "",
  });
  const NewOrderObj = useContext<NewOrderContextType | null>(NewOrderContext);
  const validateAndSetData = (e: any) => {
    NewOrderObj?.setIsHandleChangeTriggered(true);
    let value = e.target.value;
    let isValid = validator.validate(e.target.value, e.target.name);
    if (
      e.target.name === "patientCurrentAddressPhone" &&
      data.patientCurrentAddressPhone.valid === ValidationStatus.UNTOUCHED &&
      (e.target.value === "(___) ___-____" || e.target.value === "")
    ) {
      return;
    } else if (e.target.name === "patientCurrentAddressState") {
      value = getCodeFromText(states, e.target.value);
      isValid = validator.validate(value, e.target.name);
    }
    setData(
      Object.assign({}, data, {
        [e.target.name]: { value: value, valid: isValid?.status },
      })
    );
  };

  const handlecheckBoxChange = (e: any) => {
    NewOrderObj?.setIsHandleChangeTriggered(true);
    if (e.target.checked === false) {
      setData(
        Object.assign({}, data, {
          [e.target.name]: {
            value:
              e.target.checked !== undefined
                ? e.target.checked.toString()
                : null,
            valid: ValidationStatus.VALID,
          },
          patientCurrentAddress1: {
            value: "",
            valid: ValidationStatus.UNTOUCHED,
          },
          patientCurrentAddress2: {
            value: "",
            valid: ValidationStatus.VALID,
          },
          patientCurrentAddressCity: {
            value: "",
            valid: ValidationStatus.UNTOUCHED,
          },
          patientCurrentAddressState: {
            value: "",
            valid: ValidationStatus.UNTOUCHED,
          },
          patientCurrentAddressZip: {
            value: "",
            valid: ValidationStatus.UNTOUCHED,
          },
          patientCurrentAddressPhone: {
            value: "",
            valid: ValidationStatus.UNTOUCHED,
          },
        })
      );
    } else {
      setData(
        Object.assign({}, data, {
          [e.target.name]: {
            value:
              e.target.checked !== undefined
                ? e.target.checked.toString()
                : null,
            valid: ValidationStatus.VALID,
          },
          patientCurrentAddress1: {
            value: data.address1.value,
            valid: ValidationStatus.UNTOUCHED,
          },
          patientCurrentAddress2: {
            value: data.address2.value,
            valid: ValidationStatus.VALID,
          },
          patientCurrentAddressCity: {
            value: data.city.value,
            valid: ValidationStatus.UNTOUCHED,
          },
          patientCurrentAddressState: {
            value: data.state.value,
            valid: ValidationStatus.UNTOUCHED,
          },
          patientCurrentAddressZip: {
            value: data.zip.value,
            valid: ValidationStatus.UNTOUCHED,
          },
          patientCurrentAddressPhone: {
            value: data.phone.value,
            valid: ValidationStatus.VALID,
          },
        })
      );
    }
  };

  const setClasses = (e: any, classname: string) => {
    setFocusClasses(
      Object.assign({}, focusClasses, { [e.target.name]: classname })
    );
  };

  return (
    <div className="patient-current-address-info-component">
      {!isReviewOrder && (
        <div className="patient-current-address-info">
          <div className="patient-current-address-header">
            <div className="patient-current-address-title-div">
              <h2
                className="patient-current-address-title"
                data-testid="patientCurrentAddressHeaderTest"
              >
                Patient’s Current Address
              </h2>
            </div>
            <h5
              className="patient-current-address-description"
              data-testid="patientCurrentAddressDescTest"
            >
              The address where the 3M Product will be used. The patient's
              current address may be used to determine: 1) eligibility, 2) the
              delivery of supplies. Please ensure the address is accurate. The
              current address must be a physical address; P.O. Boxes are not
              acceptable.
            </h5>
          </div>
          <Box
            className="patient-current-address-box-container"
            sx={{ flexGrow: 1 }}
          >
            <Grid
              className="patient-current-address-grid-container"
              container
              spacing={1}
            >
              <Grid>
                <CustomCheckBox
                  value={JSON.parse(data?.IsSamePermanentAddress.value)}
                  checked={JSON.parse(data?.IsSamePermanentAddress.value)}
                  handleChange={handlecheckBoxChange}
                  selectClassName="patientCurrentAddrCheckBox"
                  selectpropsClassName="patientCurrentAddrChkBoxRoot"
                  labelClassName="chkBoxDescriptionLabel"
                  labelText="Same as Permanent Address"
                  name="IsSamePermanentAddress"
                  testId="patientCurrentAddressCheckBoxTest"
                />
              </Grid>
            </Grid>
          </Box>
          {!JSON.parse(data?.IsSamePermanentAddress.value) && (
            <>
              <Box
                className="patient-current-address-box-container"
                sx={{ flexGrow: 1 }}
              >
                <Grid
                  className="patient-current-address-grid-container"
                  container
                  spacing={2}
                >
                  <Grid item md={6} xs={12}>
                    <InputWithLabel
                      label="Address Line 1 (No P.O.Boxes)"
                      isRequired={true}
                      error={
                        data?.patientCurrentAddress1.valid ===
                        ValidationStatus.INVALID
                      }
                    >
                      <InputBase
                        data-testid="patientCurrentAddress1Test"
                        className="patient-current-address-input"
                        name="patientCurrentAddress1"
                        onChange={validateAndSetData}
                        value={data?.patientCurrentAddress1.value}
                      />
                    </InputWithLabel>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <InputWithLabel
                      label="Address Line 2"
                      isRequired={false}
                      error={
                        data?.patientCurrentAddress2.valid ===
                        ValidationStatus.INVALID
                      }
                    >
                      <InputBase
                        className="patient-current-address-input"
                        data-testid="patientCurrentAddress2Test"
                        name="patientCurrentAddress2"
                        onChange={validateAndSetData}
                        value={data?.patientCurrentAddress2.value}
                      />
                    </InputWithLabel>
                  </Grid>
                </Grid>
              </Box>
              <Box
                className="patient-current-address-box-container"
                sx={{ flexGrow: 1 }}
              >
                <Grid
                  className="patient-current-address-grid-container"
                  container
                  spacing={2}
                >
                  <Grid item md={6} xs={12}>
                    <InputWithLabel
                      label="City"
                      isRequired={true}
                      error={
                        data?.patientCurrentAddressCity.valid ===
                        ValidationStatus.INVALID
                      }
                    >
                      <InputBase
                        className="patient-current-address-input"
                        name="patientCurrentAddressCity"
                        data-testid="patientCurrentAddressCityTest"
                        onChange={validateAndSetData}
                        value={data?.patientCurrentAddressCity.value}
                      />
                    </InputWithLabel>
                  </Grid>
                  <Grid item md={3} xs={6}>
                    <InputWithLabel
                      label="State"
                      isRequired={true}
                      error={
                        data?.patientCurrentAddressState.valid ===
                        ValidationStatus.INVALID
                      }
                    >
                      <CustomDropDown
                        handleChange={validateAndSetData}
                        menuItem={statesText}
                        name="patientCurrentAddressState"
                        selectpropsClassName={
                          data.patientCurrentAddressState.value
                            ? "patient-current-address-select"
                            : "placeHolder"
                        }
                        selectClassName={
                          data.patientCurrentAddressState.value
                            ? "patient-current-address-input"
                            : "placeHolder"
                        }
                        value={
                          data.patientCurrentAddressState.value
                            ? getTextFromCode(
                                states,
                                data.patientCurrentAddressState.value
                              )
                            : null
                        }
                      />
                    </InputWithLabel>
                  </Grid>
                  <Grid item md={3} xs={6}>
                    <InputWithLabel
                      label="ZIP Code"
                      isRequired={true}
                      error={
                        data?.patientCurrentAddressZip.valid ===
                        ValidationStatus.INVALID
                      }
                    >
                      <InputBase
                        className="patient-current-address-input"
                        name="patientCurrentAddressZip"
                        onChange={validateAndSetData}
                        data-testid="patientCurrentAddressZipTest"
                        value={data?.patientCurrentAddressZip.value}
                        inputProps={{
                          maxLength: 5,
                        }}
                      />
                    </InputWithLabel>
                  </Grid>
                </Grid>
              </Box>
            </>
          )}
          <Box className="patient-info-box-container" sx={{ flexGrow: 1 }}>
            <Grid className="patient-info-grid-container" container spacing={2}>
              <Grid item xs={6}>
                <InputWithLabel
                  labelClassName={focusClasses.phone}
                  label="Phone Number"
                  isRequired={true}
                  error={
                    data?.patientCurrentAddressPhone.valid ===
                    ValidationStatus.INVALID
                  }
                >
                  <InputMask
                    key="phonecurrent"
                    className="patientCurrentAddressPhone"
                    mask="(999) 999-9999"
                    name="patientCurrentAddressPhone"
                    onBlur={(e) => setClasses(e, "")}
                    onChange={validateAndSetData}
                    onFocus={(e) => setClasses(e, "Mui-focused")}
                    placeholder="(___) ___-____"
                    value={data.patientCurrentAddressPhone.value}
                    id="patientCurrentAddressPhone"
                  />
                </InputWithLabel>
              </Grid>
            </Grid>
          </Box>
        </div>
      )}
      {isReviewOrder && (
        <PatientCurrentAddressReviewOrder
          data={data}
          editButtonClicked={editButtonClicked}
          isOrderSummary={isOrderSummary}
        />
      )}
    </div>
  );
};
