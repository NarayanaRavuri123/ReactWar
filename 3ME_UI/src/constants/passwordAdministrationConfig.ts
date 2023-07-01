import { IPasswordAdministrationConfig } from "../components/manageProfile/passwordAdministration/passwordAdministration.interface";

export const passwordAdministrationConfigForManageProfile: IPasswordAdministrationConfig =
  {
    isTitleRequired: true,
    title: "Password administration",
    isShowPassword: true,
    isChangePasswordRequired: true,
    changePasswordTitle: "Change password",
    isCurrentPasswordRequired: true,
    currentPasswordFieldTitle: "Current password",
    isNewPasswordSetUpRequired: true,
    newPasswordFieldTitle: "New password",
    confirmPasswordFieldTitle: "Password confirmation",
  };

export const passwordAdministrationConfigForRegistration: IPasswordAdministrationConfig =
  {
    isTitleRequired: true,
    title: "Password administration",
    isShowPassword: false,
    isChangePasswordRequired: false,
    changePasswordTitle: "",
    isCurrentPasswordRequired: false,
    currentPasswordFieldTitle: "",
    isNewPasswordSetUpRequired: true,
    newPasswordFieldTitle: "New password",
    confirmPasswordFieldTitle: "Password confirmation",
  };
