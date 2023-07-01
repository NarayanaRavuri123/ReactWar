import { IFacility } from "../../../manageProfile/facilityInformation/facility.interface";

export interface IFacilitySettingsHeader {
  selectedFacility: IFacility;
  setSelectedFacility: Function;
  userName?: string;
}
