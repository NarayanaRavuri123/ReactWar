import { Checkbox, FormControlLabel, Grid, InputBase } from "@mui/material";
import "./passwordAdministration.css";
import React, { useCallback, useEffect, useState } from "react";
import { IManageProfile } from "../manageProfile.interface";
import { ManageProfileValidator } from "../manageProfile.validator";
import {
  Validation,
  ValidationStatus,
} from "../../../core/interfaces/input.interface";
import { ReactComponent as CheckBoxIcon } from "../../../assets/checkBox.svg";
import { IPasswordAdministrationInterface } from "./passwordAdministration.interface";
import { InputWithLabel } from "../../../core/inputWithLabel/inputWithLabel.component";
import { ReactComponent as SelectedCheckBoxIcon } from "../../../assets/selectedCheckBox.svg";
import { passwordAdministrationConfigForManageProfile } from "../../../constants/passwordAdministrationConfig";
import { isStringNullOrEmpty } from "../../../util/utilityFunctions";
import { UNMATCHED_PASSWORD } from "../../../util/staticText";

export const PasswordAdministration = ({
  data,
  configurationData = passwordAdministrationConfigForManageProfile,
  Validator,
  setData,
}: IPasswordAdministrationInterface) => {
  const [validator] = React.useState<ManageProfileValidator>(Validator!);
  const resetData: IManageProfile = data!;
  const [isChangePassword, setIsChangePassword] = useState(false);

  const validateAndSetData = (e: any) => {
    const isValid = validator.validate(e.target.value, e.target.name);
    setData(
      Object.assign({}, data, {
        [e.target.name]: {
          value: e.target.value,
          valid: isValid?.status,
          required: e.target.required,
          errorMessage: isValid?.message,
        },
      })
    );
  };

  const handleChangePasswordCheckbox = () => {
    setIsChangePassword(!isChangePassword);
    if (isChangePassword) {
      setData(resetData);
    }
  };

  const isShowTitle = (): boolean => {
    return configurationData.isTitleRequired!;
  };

  const isShowCurrentPassword = (): boolean => {
    return !isChangePassword && configurationData.isShowPassword;
  };

  const isShowChangePasswordWithCheckbox = (): boolean => {
    return (
      configurationData.isChangePasswordRequired &&
      configurationData.isChangePasswordRequired
    );
  };

  const isShowCurrentPasswordInputField = (): boolean => {
    return configurationData.isCurrentPasswordRequired && isChangePassword;
  };

  const isShowNewPasswordSetUpInputFields = (): boolean => {
    return (
      configurationData.isNewPasswordSetUpRequired &&
      ((configurationData.isChangePasswordRequired && isChangePassword) ||
        !configurationData.isChangePasswordRequired)
    );
  };

  const isShowPasswordRule = (): boolean => {
    return (
      configurationData.isChangePasswordRequired ||
      configurationData.isNewPasswordSetUpRequired
    );
  };

  const validatePasswords = useCallback(() => {
    const isValid = data?.newPassword?.value === data?.confirmPassword?.value;
    const isUntouched =
      data?.confirmPassword?.valid === ValidationStatus.UNTOUCHED;
    const newPasswordValid = data?.newPassword.valid === ValidationStatus.VALID;
    if (!isUntouched) {
      const isConfValid = validator.validate(
        data?.confirmPassword.value!,
        "confirmPassword"
      );
      if (
        newPasswordValid &&
        isConfValid?.status === ValidationStatus.VALID &&
        !isValid
      ) {
        setData({
          ...data,
          confirmPassword: {
            value: data?.confirmPassword?.value,
            valid: ValidationStatus.INVALID,
            required: true,
            errorMessage: UNMATCHED_PASSWORD,
          },
        });
      } else {
        setData({
          ...data,
          confirmPassword: {
            value: data?.confirmPassword?.value,
            valid: isConfValid?.status,
            required: true,
            errorMessage: null,
          },
        });
      }
    }
  }, [data?.confirmPassword?.value, data?.newPassword?.value]);

  useEffect(() => {
    validatePasswords();
  }, [data?.confirmPassword?.value, data?.newPassword?.value]);

  return (
    <div
      className="password-administation"
      data-testid="password-administation"
    >
      {isShowTitle() && (
        <h2
          className="manage-profile-password-header-more-margin"
          data-testid="manage-profile-header-password-administration"
        >
          {configurationData.title}
        </h2>
      )}
      <div className="manage-profile-password">
        {isShowCurrentPassword() && (
          <div className="password">
            <h5
              className="manage-profile-password-title"
              data-testid="manage-profile-password-title"
            >
              Password
            </h5>
            <h5
              className="manage-profile-password-value"
              data-testid="manage-profile-password-value"
            >
              {data?.password?.value.split("").map(() => {
                return "*";
              })}
            </h5>
          </div>
        )}
        <div className="password-input">
          {isShowChangePasswordWithCheckbox() && (
            <div className="change-password">
              <FormControlLabel
                classes={{
                  root: "checkbox-option-txt",
                }}
                data-testid="change-password-header"
                value="changePassword"
                label={configurationData.changePasswordTitle!}
                control={
                  <Checkbox
                    className="left-padding-checkbox"
                    checkedIcon={<SelectedCheckBoxIcon />}
                    data-testid="change-password-checkbox"
                    icon={<CheckBoxIcon />}
                    onChange={handleChangePasswordCheckbox}
                    value={isChangePassword}
                  />
                }
              />
            </div>
          )}
          {isShowCurrentPasswordInputField() && (
            <div className="current-password-input">
              <Grid
                container
                spacing={1}
                classes={{ root: "password-component" }}
              >
                <Grid item xs={12}>
                  <InputWithLabel
                    label={configurationData.currentPasswordFieldTitle!}
                    isRequired={true}
                    error={
                      data?.currentPassword?.valid === ValidationStatus.INVALID
                    }
                    testId="current-password"
                  >
                    <InputBase
                      autoFocus
                      className="manage-profile-password-input"
                      inputProps={{
                        "data-testid": "current-password-value",
                      }}
                      name="currentPassword"
                      onChange={validateAndSetData}
                      value={data?.currentPassword?.value}
                      type="password"
                    />
                  </InputWithLabel>
                </Grid>
              </Grid>
            </div>
          )}
          {isShowNewPasswordSetUpInputFields() && (
            <div className="new-password-input">
              <Grid
                container
                spacing={1}
                classes={{
                  root:
                    configurationData.isCurrentPasswordRequired &&
                    isChangePassword
                      ? "password-component-profile"
                      : "password-component",
                }}
              >
                <Grid item xs={6}>
                  <InputWithLabel
                    label={configurationData.newPasswordFieldTitle!}
                    isRequired={data?.newPassword.required}
                    error={data?.newPassword.valid === ValidationStatus.INVALID}
                    testId="new-password"
                    errorMessage={data?.newPassword?.errorMessage}
                  >
                    <InputBase
                      required={data?.newPassword.required}
                      className="manage-profile-password-input"
                      inputProps={{
                        "data-testid": "new-password-value",
                      }}
                      onChange={validateAndSetData}
                      name="newPassword"
                      value={data?.newPassword.value}
                      type="password"
                    />
                  </InputWithLabel>
                </Grid>
                <Grid item xs={6}>
                  <InputWithLabel
                    label={configurationData.confirmPasswordFieldTitle!}
                    isRequired={data?.confirmPassword.required}
                    error={
                      data?.confirmPassword.valid === ValidationStatus.INVALID
                    }
                    testId="confirm-password"
                    errorMessage={data?.confirmPassword?.errorMessage}
                  >
                    <InputBase
                      required={data?.confirmPassword.required}
                      className="manage-profile-password-input"
                      inputProps={{
                        "data-testid": "confirm-password-value",
                      }}
                      onChange={validateAndSetData}
                      name="confirmPassword"
                      value={data?.confirmPassword.value}
                      type="password"
                    />
                  </InputWithLabel>
                </Grid>
              </Grid>
            </div>
          )}
          {isShowPasswordRule() && (
            <h5
              className="password-rule-description"
              data-testid="password-rule-description"
            >
              Password must be at least 10 characters and contain numbers,
              uppercase and lowercase letters, and special characters only
              allowed as +-_.@!#$,;:
            </h5>
          )}
        </div>
      </div>
    </div>
  );
};
