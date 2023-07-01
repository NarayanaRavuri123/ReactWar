import { IFacilitySettingPermission } from "../facilitySettings.interface";

export interface IFacilityPermissions {
  originalPermissions: IFacilitySettingPermission[];
  permissions: IFacilitySettingPermission[];
  setPermissions: any;
}
