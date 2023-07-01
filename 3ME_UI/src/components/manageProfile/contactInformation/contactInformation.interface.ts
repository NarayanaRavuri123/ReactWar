import { IManageProfile } from "../manageProfile.interface";
import { ManageProfileValidator } from "../manageProfile.validator";

export interface IContactInformationInterface {
  isRegistrationFlow?: boolean;
  Validator?: ManageProfileValidator;
  data: IManageProfile | undefined;
  setData: any;
  tempData?: any;
  setTempData?: any;
}
