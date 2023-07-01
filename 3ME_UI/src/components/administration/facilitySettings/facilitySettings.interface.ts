import { IFacility } from "../../manageProfile/facilityInformation/facility.interface";

export interface IFacilitySettings {
  selectedFacility: IFacility;
  permissions: [];
}

export interface IFacilitySettingPermission {
  isSelected: boolean;
  permissionName: string;
}
