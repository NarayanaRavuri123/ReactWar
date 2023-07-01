import { ValidationStatus } from "../../../../core/interfaces/input.interface";
import {
  ISearchFacilityByID,
  ISearchFacilityByName,
} from "./searchFacility.interface";

export let defaultSearchDataForName: ISearchFacilityByName = {
  facilityName: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  },
  facilityState: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  },
  search: {
    valid: ValidationStatus.UNTOUCHED,
    value: "false",
  },
};

export let defaultSearchDataForID: ISearchFacilityByID = {
  facilityID: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  },
  search: {
    valid: ValidationStatus.UNTOUCHED,
    value: "false",
  },
};
