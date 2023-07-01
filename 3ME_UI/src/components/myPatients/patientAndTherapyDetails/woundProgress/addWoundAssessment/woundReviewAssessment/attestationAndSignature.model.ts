import { IAttestationAndSign } from "../../../../../../core/attestationAndSignature/attestationAndSign.interface";
import { ValidationStatus } from "../../../../../../core/interfaces/input.interface";

export let woundAssessmentAttest: IAttestationAndSign = {
  firstNameLastName: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
  employer: {
    valid: ValidationStatus.VALID,
    value: "",
    required: false,
  },
  phoneNumber: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
  confirmationData: {
    valid: ValidationStatus.VALID,
    value: "",
    required: false,
  },
  _3MRepresentativeName: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
  attestationDate: {
    valid: ValidationStatus.VALID,
    value: "",
    required: false,
  },
};
