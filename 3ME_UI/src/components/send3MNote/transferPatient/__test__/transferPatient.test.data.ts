import { ValidationStatus } from "../../../../core/interfaces/input.interface";
import { ITransferPatient } from "../transferPatient.interface";

export let transferPatientTestData: ITransferPatient = {
  lastVisitDate: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  },
  facilityName: {
    valid: ValidationStatus.VALID,
    value: "",
  },
  careGiverName: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  },
  phone: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  },
  comment: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  },
};
