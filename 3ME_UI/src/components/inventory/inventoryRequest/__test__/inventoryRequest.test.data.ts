import { IInventoryRequest } from "../inventoryRequest.interface";
import { ValidationStatus } from "../../../../core/interfaces/input.interface";

export let mockInventoryRequestData: IInventoryRequest = {
  requestType: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
  quantity: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
  name: {
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
  email: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
};
