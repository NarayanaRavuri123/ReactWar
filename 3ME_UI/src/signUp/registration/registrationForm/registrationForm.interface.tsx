import { Dispatch, SetStateAction } from "react";
import { IManageProfile } from "../../../components/manageProfile/manageProfile.interface";
import { ManageProfileValidator } from "../../../components/manageProfile/manageProfile.validator";

export interface IRegistrationInterface {
  defaultRegistrationData?: IManageProfile;
  Validator?: ManageProfileValidator;
  setProgbarVal: Dispatch<SetStateAction<number>>;
}
