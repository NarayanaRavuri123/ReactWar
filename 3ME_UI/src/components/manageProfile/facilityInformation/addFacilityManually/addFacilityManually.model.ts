import { ValidationStatus } from "../../../../core/interfaces/input.interface";
import { FacilityMode } from "../facility.interface";
import { IAddFacility } from "./addFacilityManually.interface";

export let defaultFaciltyData: IAddFacility = {
  name: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  },
  type: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  },
  addressLine1: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  },
  addressLine2: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  },
  city: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  },
  state: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  },
  zipCode: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  },
  typeCode: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  },
  facilityMode: {
    valid: ValidationStatus.VALID,
    value: "1",
  },
  siteUseId: {
    valid: ValidationStatus.VALID,
    value: "",
  },
};
