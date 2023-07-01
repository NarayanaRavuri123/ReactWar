
import { ValidationStatus } from "../../core/interfaces/input.interface";
import { ISalesRole } from "./salesRole.interface";


export let defaultSalesRoleTestData: ISalesRole = {
  FacilityClassification: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
  CareSetting: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
}
  