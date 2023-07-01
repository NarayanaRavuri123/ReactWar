import { IInventoryRequest } from "./inventoryRequest.interface";
import { ValidationStatus } from "../../../core/interfaces/input.interface";

export let defaultInventoryRequestData: IInventoryRequest = {
  requestType: {
    valid: ValidationStatus.VALID,
    value: "Add Inventory",
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
