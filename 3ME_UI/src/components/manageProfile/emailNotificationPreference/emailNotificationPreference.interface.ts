import { IManageProfile } from "../manageProfile.interface";
import { ManageProfileValidator } from "../manageProfile.validator";
export interface IEmailNotificationPreferencesInterface {
  manageProfileData: IManageProfile | undefined;
  Validator?: ManageProfileValidator;
  setManageProfileData: any;
}
