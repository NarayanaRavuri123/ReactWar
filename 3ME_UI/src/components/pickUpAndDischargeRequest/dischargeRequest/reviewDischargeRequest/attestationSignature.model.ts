import moment from "moment";
import { IAttestationAndSign } from "../../../../core/attestationAndSignature/attestationAndSign.interface";
import { ValidationStatus } from "../../../../core/interfaces/input.interface";

export let dischargeRequestAttest: IAttestationAndSign = {
  firstNameLastName: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: false,
  },
  employer: {
    valid: ValidationStatus.VALID,
    value: "",
    required: false,
  },
  phoneNumber: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: false,
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
    value: moment(Date()).format("MM/DD/YYYY"),
    required: false,
  },
};
