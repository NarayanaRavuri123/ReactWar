import { IManageProfile } from "../manageProfile.interface";
import { IInputField } from "../../../core/interfaces/input.interface";
import { ManageProfileValidator } from "../manageProfile.validator";

export interface IPasswordAdministrationConfig {
  isTitleRequired: boolean;
  title: string;
  isShowPassword: boolean;
  isChangePasswordRequired: boolean;
  changePasswordTitle: string;
  isCurrentPasswordRequired: boolean;
  currentPasswordFieldTitle: string;
  isNewPasswordSetUpRequired: boolean;
  newPasswordFieldTitle: string;
  confirmPasswordFieldTitle: string;
}

export interface IPasswordAdministration {
  password: IInputField;
  currentPassword: IInputField;
  newPassword: IInputField;
  confirmPassword: IInputField;
}

export interface IPasswordAdministrationInterface {
  data: IManageProfile | undefined;
  configurationData?: IPasswordAdministrationConfig;
  Validator?: ManageProfileValidator;
  setData: any;
}
