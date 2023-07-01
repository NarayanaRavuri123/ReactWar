import {
  IInputField,
  ValidationStatus,
} from "../../../../../core/interfaces/input.interface";

export interface IPrescriberDetailInterface {
  prescriberName: IInputField;
  updatedPrescriberEmail: IInputField;
}

export let defaultPrescriberDetail: IPrescriberDetailInterface = {
  prescriberName: {
    value: "",
    valid: ValidationStatus.VALID,
    required: false,
  },
  updatedPrescriberEmail: {
    value: "",
    valid: ValidationStatus.VALID,
    required: false,
  },
};
