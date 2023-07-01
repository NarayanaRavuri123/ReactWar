import { IPickUpRequest } from "./pickUpRequest.interface";
import { ValidationStatus } from "../../../core/interfaces/input.interface";

export let defaultPickUpRequestData: IPickUpRequest = {
  reasonForDischarge: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
  placementDate: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: false,
  },
  therapyDischargeDate: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
  stopBillDate: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: false,
  },
  returnMethod: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
  specialInstructions: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: false,
  },
  // Device Information
  injuryCauseBy3MDevice: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
  describeTheInjury: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: false,
  },
  problemWith3MDevice: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
  describeTheProblem: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: false,
  },
};
