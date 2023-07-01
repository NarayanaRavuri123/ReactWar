import { Dispatch, SetStateAction } from "react";
import { IInputField } from "../../core/interfaces/input.interface";
import { ManageProfileValidator } from "./manageProfile.validator";

export interface IManageProfile {
  // account info
  firstName: IInputField;
  lastName: IInputField;
  userName: IInputField;
  licenseType: IInputField;
  department: IInputField;
  title: IInputField;

  // contact information
  email: IInputField;
  verifyEmail?: IInputField;
  phone: IInputField;
  extension: IInputField;
  phoneType: IInputField;

  // password administration
  password?: IInputField;
  currentPassword?: IInputField;
  newPassword: IInputField;
  confirmPassword: IInputField;

  // email notification preference
  rentalActivity: IInputField;
  salesActivity: IInputField;
  pickUpRequest: IInputField;

  // communication Preference
  preferenceType: IInputField;
  emailPreference: IInputField;
  smsPreference: IInputField;
  smsTnCAccept: IInputField;

  // facility
  facilityRegistered?: IInputField;

  // message to admin
  adminMessage?: IInputField;
}

export interface IManageProfileProps {
  DefaultManageProfileData?: IManageProfile;
  Validator?: ManageProfileValidator;
  setProgbarVal: Dispatch<SetStateAction<number>>;
}
export interface ITerritoryData {
  roleType: string;
  regionDistrict: string;
  name: string;
  code: string;
  assignedFrom: string;
  assignedTo: string;
  isPrimary: boolean;
}
