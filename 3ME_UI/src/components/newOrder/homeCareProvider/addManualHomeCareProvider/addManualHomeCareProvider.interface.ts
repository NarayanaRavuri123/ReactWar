import {
  IInputField,
  ValidationStatus,
} from "../../../../core/interfaces/input.interface";

export let defaultAddManualHomeCareProvider: IAddManualHomeCareProvider = {
  homeCareName: {
    value: "",
    valid: ValidationStatus.UNTOUCHED,
    required: true,
  },
  addressLine1: {
    value: "",
    valid: ValidationStatus.UNTOUCHED,
    required: true,
  },
  addressLine2: {
    value: "",
    valid: ValidationStatus.VALID,
    required: false,
  },
  city: {
    value: "",
    valid: ValidationStatus.UNTOUCHED,
    required: true,
  },
  state: {
    value: "",
    valid: ValidationStatus.UNTOUCHED,
    required: true,
  },
  zipCode: {
    value: "",
    valid: ValidationStatus.UNTOUCHED,
    required: true,
  },
  contactNumber: {
    value: "",
    valid: ValidationStatus.UNTOUCHED,
    required: true,
  },
  extension: {
    value: "",
    valid: ValidationStatus.VALID,
    required: false,
  },
  providerType: {
    value: "",
    valid: ValidationStatus.UNTOUCHED,
    required: true,
  },
};

export interface IAddManualHomeCareProvider {
  homeCareName: IInputField;
  addressLine1: IInputField;
  addressLine2: IInputField;
  city: IInputField;
  state: IInputField;
  zipCode: IInputField;
  contactNumber: IInputField;
  extension: IInputField;
  providerType: IInputField;
}
