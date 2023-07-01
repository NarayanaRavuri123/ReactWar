import { MouseEventHandler } from "react";
import { IInputField } from "../../../../core/interfaces/input.interface";

export interface IUserProfileProps {
  isAddingNewUser?: boolean;
  selectedUserName?: string | null;
}
export interface IUserAccountInformationProps {
  data: IUserProfile;
  department?: any;
  licenseType?: any;
  setData: Function;
  isAddingNewUser?: any;
  addFacilityButtonClick?: any;
}

export interface IUserSiteAccessProps {
  addFacilityButtonClick: MouseEventHandler<HTMLButtonElement>;
  facilities: IUserFacilityData[];
  isAddingNewUser: boolean;
  setData: Function;
}

export interface IUserProfile {
  // account info
  firstName: IInputField;
  lastName: IInputField;
  userName: IInputField;
  licenseType: IInputField;
  department: IInputField;
  title: IInputField;

  // contact information
  email: IInputField;
  phone: IInputField;
  extension: IInputField;
  phoneType: IInputField;

  //siteAccess information
  facilities: IUserFacilityData[];
}

export interface IUserFacilityData {
  activityStauts: number;
  accountName: string;
  accountNumber: number;
  address1: string;
  address2: string | null;
  facilityAddressID: number;
  city: string;
  state: string;
  zip: string;
  userRole: string;
  status: string;
  siteUseId: string;
  permissions: IUserPermissionsData[] | null;
  enabledPermissionsCount?: number;
}
export interface IUserPermissionsData {
  name: string;
  status: string | boolean;
}
