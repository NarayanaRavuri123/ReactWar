import { ValidationStatus } from "../../../core/interfaces/input.interface";
import { IContactUs } from "./contactUs.interface";

export let defaultContactData: IContactUs = {
  email: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
  firstName: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
  subject: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
  lastName: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
  phone: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
  extension: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: false,
  },
  country: {
    valid: ValidationStatus.VALID,
    value: "",
    required: false,
  },
  message: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
  shouldContact: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
};
