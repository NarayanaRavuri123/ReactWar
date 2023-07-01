import {
  IInputField,
  ValidationStatus,
} from "../../../../core/interfaces/input.interface";

export let defaultPrescriberSearchBox: IPrescriberSearch = {
  prescriberSearch: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  },
};

export interface IPrescriberSearch {
  prescriberSearch: IInputField;
}

export interface IPrescriberModal {
  firstName: string;
  lastName: string;
  npi: string;
  city: string;
  state: string;
  telephoneNumber: string;
  zipCode: string;
  address1: string;
  address2: string;
  faxNumber?: string | null;
  email?: string | null;
  eScript?: string | null;
}
