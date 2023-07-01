import { IManageProfile } from "../manageProfile.interface";
import { ManageProfileValidator } from "../manageProfile.validator";

export interface IAccountInformationProps {
  data: IManageProfile | undefined;
  Validator?: ManageProfileValidator;
  setData: any;
  licenseType?: any;
  department?: any;
}
