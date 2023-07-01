import { IInputField } from "../../../core/interfaces/input.interface";
import { SendNoteValidator } from "../sendNote.validator";

export interface ITransferPatientProps {
  data: ITransferPatient;
  setData: Function;
  Validator?: SendNoteValidator;
}
export interface ITransferPatient {
  lastVisitDate: IInputField;
  facilityName: IInputField;
  careGiverName: IInputField;
  phone: IInputField;
  comment: IInputField;
}
