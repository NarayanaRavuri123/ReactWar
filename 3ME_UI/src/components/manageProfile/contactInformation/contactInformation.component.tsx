import {
  FormControlLabel,
  Grid,
  InputBase,
  Radio,
  RadioGroup,
} from "@mui/material";
import "./contactInformation.css";
import InputMask from "react-input-mask";
import { useCallback, useContext, useEffect, useState } from "react";
import {
  ProfileFormContext,
  ProfileFormContextType,
} from "../../../context/ProfileFormContext";
import { useLocation } from "react-router-dom";
import { ManageProfileValidator } from "../manageProfile.validator";
import { ValidationStatus } from "../../../core/interfaces/input.interface";
import { IContactInformationInterface } from "./contactInformation.interface";
import { ReactComponent as RadioButtonIcon } from "../../../assets/radioButton.svg";
import { InputWithLabel } from "../../../core/inputWithLabel/inputWithLabel.component";
import { ReactComponent as SelectedRadioButtonIcon } from "../../../assets/selectedRadioButton.svg";
import { isStringNullOrEmpty } from "../../../util/utilityFunctions";
import { UNMATCHED_EMAIL } from "../../../util/staticText";

export const ContactInformation = ({
  isRegistrationFlow,
  Validator,
  data,
  setData,
}: IContactInformationInterface) => {
  const [validator] = useState<ManageProfileValidator>(Validator!);
  const [focusClasses, setFocusClasses] = useState({ message: "", phone: "" });
  const profileForm = useContext<ProfileFormContextType | null>(
    ProfileFormContext
  );
  const location = useLocation();

  const setClasses = (e: any, classname: string) => {
    setFocusClasses(
      Object.assign({}, focusClasses, { [e.target.name]: classname })
    );
  };

  const onBlurValidateAndSetData = async (e: any) => {
    if (location.pathname !== "/manageProfile") {
      const valResp = await validator.validateWithDb(
        e.target.value,
        e.target.name
      );
      setData((prevData: any) => ({
        ...prevData,
        [e.target.name]: {
          value: e.target.value,
          valid: valResp?.status,
          required: e.target.required,
          errorMessage: valResp?.message,
        },
      }));
    }
  };

  const validateAndSetData = (e: any) => {
    if (
      e.target.name === "phone" &&
      data?.phone.valid === ValidationStatus.UNTOUCHED &&
      (e.target.value === "(___) ___-____" || e.target.value === "")
    ) {
      return;
    }
    if (e.target.name === "phoneType") {
      profileForm?.setContInfoSmsDisabled(
        e.target.value !== "" && e.target.value === "phone"
      );
      profileForm?.setIsLandlineSelected(e.target.value === "phone");
      profileForm?.setSmsAcceptDisabled(
        profileForm?.smsAcceptDisabled || profileForm?.contInfoSmsDisabled
      );
      if (e.target.value === "phone") {
        updatePreferenceForLandline();
      } else {
        data!.extension.value = "";
        data!.extension.valid = ValidationStatus.UNTOUCHED;
      }
    }
    const isValid = validator.validate(e.target.value, e.target.name);
    setData(
      Object.assign({}, data, {
        [e.target.name]: {
          value: e.target.value,
          valid: isValid?.status,
          required: e.target.required,
        },
      })
    );
  };

  const updatePreferenceForLandline = () => {
    if (profileForm) {
      profileForm!.profileDetails.smsPreference = {
        value: "false",
        valid: ValidationStatus.UNTOUCHED,
        required: false,
      };
      profileForm!.profileDetails.smsTnCAccept = {
        value: "false",
        valid: ValidationStatus.UNTOUCHED,
        required: false,
      };
      profileForm!.setProfileDetails(
        Object.assign({}, profileForm!.profileDetails)
      );
    }
  };

  const validateEmails = useCallback(() => {
    const isValid = data?.email?.value === data?.verifyEmail?.value;
    const isUntouched = data?.verifyEmail?.valid === ValidationStatus.UNTOUCHED;
    const emailValid = data?.email.valid === ValidationStatus.VALID;
    if (!isUntouched) {
      const isVerifyEmailValid = validator.validate(
        data?.verifyEmail?.value!,
        "verifyEmail"
      );
      if (
        emailValid &&
        isVerifyEmailValid?.status === ValidationStatus.VALID &&
        !isValid
      ) {
        setData({
          ...data,
          verifyEmail: {
            value: data?.verifyEmail?.value,
            valid: ValidationStatus.INVALID,
            required: true,
            errorMessage: UNMATCHED_EMAIL,
          },
        });
      } else {
        setData({
          ...data,
          verifyEmail: {
            value: data?.verifyEmail?.value,
            valid: isVerifyEmailValid?.status,
            required: true,
            errorMessage: null,
          },
        });
      }
    }
  }, [data?.email?.value, data?.verifyEmail?.value]);

  useEffect(() => {
    validateEmails();
  }, [data?.email?.value, data?.verifyEmail?.value]);
  return (
    <div className="contact-information" data-testid="contact-information">
      <h2 className="contact-information-header">Contact information</h2>
      <Grid
        container
        spacing={1}
        classes={{ root: "contact-information-component" }}
      >
        <Grid item xs={6}>
          <InputWithLabel
            label="Email address"
            isRequired={data?.email.required}
            error={data?.email.valid === ValidationStatus.INVALID}
            errorMessage={data?.email.errorMessage}
          >
            <InputBase
              required={data?.email.required}
              className="contact-information-input"
              name="email"
              value={data?.email.value}
              onChange={validateAndSetData}
              onBlur={onBlurValidateAndSetData}
            />
          </InputWithLabel>
        </Grid>
        <Grid item xs={6}>
          {isRegistrationFlow && (
            <InputWithLabel
              label="Verify email"
              isRequired={data?.verifyEmail?.required}
              error={data?.verifyEmail?.valid === ValidationStatus.INVALID}
              errorMessage={data?.verifyEmail?.errorMessage}
            >
              <InputBase
                required={data?.verifyEmail?.required}
                className="contact-information-input"
                name="verifyEmail"
                value={data?.verifyEmail?.value}
                onChange={validateAndSetData}
              />
            </InputWithLabel>
          )}
        </Grid>
        <Grid item xs={data?.phoneType.value === "phone" ? 5 : 6}>
          <InputWithLabel
            label="Phone Number"
            isRequired={data?.phone.required}
            error={data?.phone.valid === ValidationStatus.INVALID}
            labelClassName={focusClasses.phone}
          >
            <InputMask
              required={data?.phone.required}
              placeholder="(___) ___-____"
              className="phone"
              name="phone"
              mask="(999) 999-9999"
              value={data?.phone.value}
              onChange={validateAndSetData}
              onFocus={(e) => setClasses(e, "Mui-focused")}
              onBlur={(e) => setClasses(e, "")}
            />
          </InputWithLabel>
        </Grid>
        <Grid item xs={data?.phoneType.value === "phone" ? 7 : 6}>
          <div className="phone-type-container">
            <div className="radio-group">
              {data?.phoneType.value === "phone" && (
                <div className="extension">
                  <InputWithLabel
                    label="Extension"
                    isRequired={false}
                    error={data?.extension.valid === ValidationStatus.INVALID}
                  >
                    <InputBase
                      className="contact-information-input"
                      name="extension"
                      value={data?.extension.value}
                      onChange={validateAndSetData}
                    />
                  </InputWithLabel>
                </div>
              )}
              <InputWithLabel
                label="Phone type"
                isRequired={data?.phoneType.required}
                error={data?.phoneType.valid === ValidationStatus.INVALID}
                labelClassName="radio-title-label"
              >
                <RadioGroup
                  name="phoneType"
                  classes={{ root: "radioRoot" }}
                  value={data?.phoneType.value}
                  onChange={validateAndSetData}
                >
                  <FormControlLabel
                    classes={{ root: "optionRoot-mobile" }}
                    componentsProps={{
                      typography: { classes: { root: "optiontxt" } },
                    }}
                    value="mobile"
                    control={
                      <Radio
                        required={data?.phoneType.required}
                        icon={<RadioButtonIcon />}
                        checkedIcon={<SelectedRadioButtonIcon />}
                      />
                    }
                    label="Mobile"
                  />
                  <FormControlLabel
                    classes={{ root: "optionRoot-landline" }}
                    componentsProps={{
                      typography: { classes: { root: "optiontxt" } },
                    }}
                    value="phone"
                    control={
                      <Radio
                        required={data?.phoneType.required}
                        icon={<RadioButtonIcon />}
                        checkedIcon={<SelectedRadioButtonIcon />}
                      />
                    }
                    label="Landline"
                  />
                </RadioGroup>
              </InputWithLabel>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
