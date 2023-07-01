import { ValidationStatus } from "../interfaces/input.interface";
import { IFacilitySearch } from "./caregiverFacilitySearchAndAdd.model";

export const defaultFacilityData: IFacilitySearch = {
  facilityID: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
  facilityName: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
  facilityState: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
};
