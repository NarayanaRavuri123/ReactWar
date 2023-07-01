import { IInputField } from "../../core/interfaces/input.interface";
import { SendNoteValidator } from "./sendNote.validator";

export interface ISendNoteProps {
  testData?: ISendNote;
  Validator?: SendNoteValidator;
}

export interface ISendNote {
  contactResason: IInputField;
}
