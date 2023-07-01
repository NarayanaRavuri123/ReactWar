import { IUserRolesPermission } from "../myPatients/userRolesPermission.interface";
import { FacilityMode } from "./facilityInformation/facility.interface";

export interface IUserFacility {
  number: string | null;
  typeCode: string;
  typeName: string;
  zipCode: string;
  msAddressId?: number;
  facilityName: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  mode?: FacilityMode;
  facilityAddressID?: string;
  siteUseId: string | null;
  careGiverId?: string | null;
}

export interface IUser {
  emailAddress: string;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  title: string;
  departmentName: string;
  licenceType: string;
  phoneNo: string;
  extension: string;
  mobilePhoneNo: string;
  emailContactPreference: boolean;
  smsContactPreference: boolean;
  smsTnCAcceptedDate: Date | null;
  keepMeUpdated: boolean;
  messageToFacilityAdmin: string;
  facilities: IUserFacility[];
  userPermissions?: IUserRolesPermission;
  userID?: string;
}

export interface IUserUpdate {
  firstName: string;
  lastName: string;
  userName: string;
  title: string;
  departmentName: string;
  licenceType: string;
  emailContactPreference: boolean;
  smsContactPreference: boolean;
  updateSMSTnCAcceptedDate: boolean;
  smsTnCAcceptedDate: Date | null | undefined;
  keepMeUpdated: boolean;
  emailNotifications: EmailCommunicationPreference[];
  facilities: IUserFacility[];
}
export interface EmailCommunicationPreference {
  name: string;
  value: boolean;
}
export interface ITerritoryData {
  roleType: string;
  regionDistrict: string;
  name: string;
  code: string;
  assignedFrom: string;
  assignedTo: string;
}
