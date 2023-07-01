import { IInputField } from "../../../core/interfaces/input.interface";
import { SendNoteValidator } from "../sendNote.validator";

export interface IChangeAddressProps {
  data: IChangeAddress;
  setData: Function;
  Validator?: SendNoteValidator;
  currentAddress?: PatientAddress | null;
  permanentAddress?: PatientAddress | null;
}

export interface IChangeAddress {
  addressType: IInputField;
  phone: IInputField;
  address1: IInputField;
  address2: IInputField;
  city: IInputField;
  state: IInputField;
  zip: IInputField;
  comment: IInputField;
}

export interface PatientAddress {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zipCode: string;
}
