import { IManageProfile } from "../manageProfile.interface";
import { ManageProfileValidator } from "../manageProfile.validator";

export interface IAdminMessage {
  data: IManageProfile | undefined;
  Validator: ManageProfileValidator;
  setData: any;
}
