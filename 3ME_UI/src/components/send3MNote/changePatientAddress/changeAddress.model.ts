import { ValidationStatus } from "../../../core/interfaces/input.interface";
import { IChangeAddress } from "./changeAddress.interface";

export let defaultAddressData: IChangeAddress = {
  addressType: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
  address1: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
  address2: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: false,
  },
  city: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
  phone: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: false,
  },
  state: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
  zip: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
  comment: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
};
