import { IInputField, ValidationStatus } from "../interfaces/input.interface";

export interface IAttestationAndSign {
  firstNameLastName: IInputField;
  employer: IInputField;
  phoneNumber: IInputField;
  confirmationData: IInputField;
  _3MRepresentativeName: IInputField;
  attestationDate: IInputField;
}
