import {
  FormControlLabel,
  Grid,
  InputBase,
  Radio,
  RadioGroup,
} from "@mui/material";
import "./changeAddress.css";
import {
  getCodeFromText,
  getTextFromCode,
  getUntouchedObj,
  makeCapitalEachWordInString,
} from "../../../util/utilityFunctions";
import InputMask from "react-input-mask";
import { useEffect, useState } from "react";
import { format } from "react-string-format";
import { SendNoteValidator } from "../sendNote.validator";
import { DD_US_STATES_CONTENT } from "../../../util/staticText";
import { IChangeAddress, IChangeAddressProps } from "./changeAddress.interface";
import { getdropDownContent } from "../../../util/dropDownService";
import { ValidationStatus } from "../../../core/interfaces/input.interface";
import { CustomDropDown } from "../../../core/customDropdown/customDropdown.component";
import { ReactComponent as RadioButtonIcon } from "../../../assets/radioButton.svg";
import { InputWithLabel } from "../../../core/inputWithLabel/inputWithLabel.component";
import { ReactComponent as SelectedRadioButtonIcon } from "../../../assets/selectedRadioButton.svg";

const ChangeAddress = ({
  currentAddress,
  data,
  permanentAddress,
  setData,
  Validator = new SendNoteValidator(),
}: IChangeAddressProps) => {
  const [validator] = useState<SendNoteValidator>(Validator!);
  const [active, setActive] = useState<boolean | null>(null);
  const [focusClasses, setFocusClasses] = useState({ phone: "" });
  const [states, setStates] = useState([]);
  const [statesText, setStatesText] = useState([]);

  const setClasses = (e: any, classname: string) => {
    setFocusClasses(
      Object.assign({}, focusClasses, { [e.target.name]: classname })
    );
  };

  const validateAndSetData = (e: any) => {
    let { value, name, required } = e.target;
    let isValid = validator.validate(value, name);
    if (name === "state") {
      value = getCodeFromText(states, value);
      required = data.state.required;
    } else if (
      name === "phone" &&
      (value === "(___) ___-____" || value === "")
    ) {
      if (data.phone.valid === ValidationStatus.UNTOUCHED) {
        return;
      } else {
        isValid = getUntouchedObj();
      }
    } else if (name === "addressType") {
      required = data.addressType.required;
      if (value === "Permanent address") {
        setActive(true);
      } else if (value === "Current address") {
        setActive(false);
      } else {
        setActive(null);
      }
    }
    setData((dt: IChangeAddressProps) => ({
      ...dt,
      [name]: {
        value: value,
        valid: isValid?.status,
        required: required,
      },
    }));
  };

  const fetchAllStates = async () => {
    try {
      const ddContent = format("{0}", DD_US_STATES_CONTENT);
      const data = await getdropDownContent(ddContent);
      if (data.items.length > 0) {
        const commonDocObject = data.items.filter(
          (item: { name: string }) => item.name === DD_US_STATES_CONTENT
        );
        const stateObj = commonDocObject[0].data.sort(
          (a: { order: number }, b: { order: number }) =>
            a.order > b.order ? 1 : -1
        );
        const stateText = stateObj.map((x: { text: any }) => x.text);
        setStatesText(stateText);
        setStates(stateObj);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchAllStates();
  }, []);

  return (
    <div
      className="change-address-component"
      data-testid="change-address-component"
    >
      <div className="short-form">
        <div className="address-div">
          <div className="sub-address-div">
            <h5
              className="change-address-content-title"
              data-testid="permanent-address-title"
            >
              Patient’s Permanent Address
            </h5>
            <h5
              className="change-address-content-value"
              data-testid="permanent-address-line1"
            >
              {permanentAddress &&
              permanentAddress.addressLine1 &&
              permanentAddress.addressLine1 !== ""
                ? makeCapitalEachWordInString(permanentAddress.addressLine1)
                : "--"}
            </h5>
            {permanentAddress &&
              permanentAddress.addressLine2 &&
              permanentAddress.addressLine2 !== "" && (
                <h5
                  className="change-address-content-value"
                  data-testid="permanent-address-line2"
                >
                  {makeCapitalEachWordInString(permanentAddress.addressLine2)}
                </h5>
              )}
            <h5
              className="change-address-content-value"
              data-testid="permanent-address-city-state-zip"
            >
              {permanentAddress &&
              permanentAddress.city &&
              permanentAddress.city !== "" &&
              permanentAddress.state &&
              permanentAddress.state !== "" &&
              permanentAddress.zipCode &&
              permanentAddress.zipCode !== ""
                ? `${makeCapitalEachWordInString(permanentAddress.city)}` +
                  "," +
                  " " +
                  `${permanentAddress.state}` +
                  " " +
                  `${permanentAddress.zipCode.split("-")[0]}`
                : ""}
            </h5>
          </div>
          <div className="sub-address-div">
            <h5
              className="change-address-content-title"
              data-testid="current-address-title"
            >
              Patient’s Current Address
            </h5>
            <h5
              className="change-address-content-value"
              data-testid="current-address-line1"
            >
              {currentAddress &&
              currentAddress.addressLine1 &&
              currentAddress.addressLine1 !== ""
                ? makeCapitalEachWordInString(currentAddress.addressLine1)
                : "--"}
            </h5>
            {currentAddress &&
              currentAddress.addressLine2 &&
              currentAddress.addressLine2 !== "" && (
                <h5
                  className="change-address-content-value"
                  data-testid="current-address-line2"
                >
                  {makeCapitalEachWordInString(currentAddress.addressLine2)}
                </h5>
              )}
            <h5
              className="change-address-content-value"
              data-testid="current-address-city-state-zip"
            >
              {currentAddress &&
              currentAddress.city &&
              currentAddress.city !== "" &&
              currentAddress.state &&
              currentAddress.state !== "" &&
              currentAddress.zipCode &&
              currentAddress.zipCode !== ""
                ? `${makeCapitalEachWordInString(currentAddress.city)}` +
                  "," +
                  " " +
                  `${currentAddress.state}` +
                  " " +
                  `${currentAddress.zipCode.split("-")[0]}`
                : ""}
            </h5>
          </div>
        </div>
        <div className="address-type">
          <InputWithLabel
            error={data.addressType.valid === ValidationStatus.INVALID}
            isRequired={data.addressType.required}
            label="Address to change"
            labelClassName="address-info-input-label"
            testId="address-to-change"
          >
            <RadioGroup
              classes={{ root: "radioRoot" }}
              name="addressType"
              onChange={validateAndSetData}
              value={data.addressType.value}
            >
              <FormControlLabel
                classes={{
                  root: active === true ? "optionRoot-active" : "optionRoot",
                }}
                componentsProps={{
                  typography: {
                    classes: {
                      root: active === true ? "optiontxtSelect" : "optiontxt",
                    },
                  },
                }}
                control={
                  <Radio
                    icon={<RadioButtonIcon className="radio-button-icon" />}
                    checkedIcon={
                      <SelectedRadioButtonIcon className="radio-button-icon" />
                    }
                  />
                }
                label="Permanent address"
                value="Permanent address"
                data-testid="addressType-yes"
                className="radio-button-value"
              />
              <FormControlLabel
                classes={{
                  root: active === false ? "optionRoot-active" : "optionRoot",
                }}
                componentsProps={{
                  typography: {
                    classes: {
                      root: active === false ? "optiontxtSelect" : "optiontxt",
                    },
                  },
                }}
                control={
                  <Radio
                    icon={<RadioButtonIcon className="radio-button-icon" />}
                    checkedIcon={
                      <SelectedRadioButtonIcon className="radio-button-icon" />
                    }
                  />
                }
                data-testid="addressType-no"
                label="Current address"
                value="Current address"
                className="radio-button-value"
              />
            </RadioGroup>
          </InputWithLabel>
        </div>
        <div className="address-info">
          <h4 className="address-info-title" data-testid="address-info-title">
            Patient’s New Address
          </h4>
          <Grid className="address-info-grid-container" container spacing={2}>
            <Grid className="address-info-grid-item" item xs={6}>
              <InputWithLabel
                error={data.address1.valid === ValidationStatus.INVALID}
                isRequired={data.address1.required}
                label="Address Line 1 (No P.O. Boxes)"
                labelClassName="address-info-input-label"
                testId="addressline1-input-label"
              >
                <InputBase
                  className="address-info-input"
                  name="address1"
                  onChange={validateAndSetData}
                  required={data.address1.required}
                  value={data.address1.value}
                />
              </InputWithLabel>
            </Grid>
            <Grid className="address-info-grid-item" item xs={6}>
              <InputWithLabel
                error={data.address2.valid === ValidationStatus.INVALID}
                isRequired={data.address2.required}
                label="Address Line 2"
                labelClassName="address-info-input-label"
                testId="addressline2-input-label"
              >
                <InputBase
                  className="address-info-input"
                  name="address2"
                  onChange={validateAndSetData}
                  required={data.address2.required}
                  value={data.address2.value}
                />
              </InputWithLabel>
            </Grid>
          </Grid>
          <Grid className="address-info-grid-container" container spacing={2}>
            <Grid className="address-info-grid-item" item xs={6}>
              <InputWithLabel
                error={data.city.valid === ValidationStatus.INVALID}
                isRequired={data.city.required}
                label="City"
                labelClassName="address-info-input-label"
                testId="city-input-label"
              >
                <InputBase
                  className="address-info-input"
                  name="city"
                  onChange={validateAndSetData}
                  required={data.city.required}
                  value={data.city.value}
                />
              </InputWithLabel>
            </Grid>
            <Grid className="address-info-grid-item" item xs={3}>
              <InputWithLabel
                error={data.state.valid === ValidationStatus.INVALID}
                isRequired={data.state.required}
                label="State"
                labelClassName="address-info-input-label"
                testId="state-label"
              >
                <CustomDropDown
                  handleChange={validateAndSetData}
                  menuItem={statesText}
                  name="state"
                  selectpropsClassName={
                    data.state.value
                      ? "address-info-address-select "
                      : "placeHolder"
                  }
                  selectClassName={
                    data.state.value ? "address-info-input" : "placeHolder"
                  }
                  value={
                    data.state.value
                      ? getTextFromCode(states, data.state.value)
                      : null
                  }
                />
              </InputWithLabel>
            </Grid>
            <Grid className="address-info-grid-item" item xs={3}>
              <InputWithLabel
                error={data.zip.valid === ValidationStatus.INVALID}
                isRequired={data.zip.required}
                label="ZIP Code"
                labelClassName="address-info-input-label"
                testId="zip-input-label"
              >
                <InputBase
                  className="address-info-input"
                  id="address-info-input"
                  inputProps={{
                    maxLength: 5,
                  }}
                  name="zip"
                  onChange={validateAndSetData}
                  required={data.zip.required}
                  value={data.zip.value}
                />
              </InputWithLabel>
            </Grid>
          </Grid>
          <Grid className="address-info-grid-container" container spacing={2}>
            <Grid className="address-info-grid-item" item xs={6}>
              <InputWithLabel
                error={data.phone.valid === ValidationStatus.INVALID}
                isRequired={false}
                label="Contact Phone Number"
                labelClassName="address-info-input-label"
                testId="phone-input-label"
              >
                <InputMask
                  placeholder="(___) ___-____"
                  className="phone"
                  name="phone"
                  mask="(999) 999-9999"
                  onChange={validateAndSetData}
                  onBlur={(e) => setClasses(e, "")}
                  onFocus={(e) => setClasses(e, "Mui-focused")}
                  required={data.phone.required}
                  value={data.phone.value}
                />
              </InputWithLabel>
            </Grid>
          </Grid>
          <Grid className="address-info-grid-container" container>
            <Grid className="address-info-grid-item" item xs={12}>
              <InputWithLabel
                error={data.comment.valid === ValidationStatus.INVALID}
                isRequired={data.comment.required}
                label="Comments"
                labelClassName="address-info-input-label"
                testId="comment-input-label"
              >
                <InputBase
                  className="address-info-input"
                  data-testid="changeAddressCommentTest"
                  error={data.comment.valid === ValidationStatus.INVALID}
                  inputProps={{
                    minLength: 5,
                    className:
                      data.comment.valid === ValidationStatus.INVALID
                        ? "showCommentError"
                        : "noCommentError",
                  }}
                  name="comment"
                  onChange={validateAndSetData}
                  multiline={true}
                  required={data.comment.required}
                  rows={3}
                  value={data.comment.value}
                />
              </InputWithLabel>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};
export default ChangeAddress;
