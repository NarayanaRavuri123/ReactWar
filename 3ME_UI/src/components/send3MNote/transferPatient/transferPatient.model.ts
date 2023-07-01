import { ValidationStatus } from "../../../core/interfaces/input.interface";
import { ITransferPatient } from "./transferPatient.interface";

export let defaultTransferPatientData: ITransferPatient = {
  lastVisitDate: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: false,
  },
  phone: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: false,
  },
  facilityName: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: false,
  },
  careGiverName: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: false,
  },
  comment: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
};
