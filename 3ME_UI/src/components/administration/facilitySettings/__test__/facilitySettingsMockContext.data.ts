import { FacilitySettingsContextType } from "../../../../context/FacilitySettingsContext";
import { facilityMockData } from "../../../manageProfile/facilityInformation/facilityFound/facilityFound.interface";

export const getMockFacilitySettingsData = (): FacilitySettingsContextType => ({
  permissions: [],
  setPermissions: () => {},
  originalPermissions: [],
  setOriginalPermissions: () => {},
  isFacilityPermissionChanged: false,
  setIsFacilityPermissionChanged: () => {},
  selectedFacility: facilityMockData,
  setSelectedFacility: () => {},
  userName: "Rahul",
  setUserName: () => {},
  resetFacilitySettings: () => {},
});
