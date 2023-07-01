import { SendNoteValidator } from "../sendNote.validator";
import { IInputField } from "../../../core/interfaces/input.interface";

export interface IAskQuestionProps {
  data: IAskQuestion;
  setData: Function;
  Validator?: SendNoteValidator;
}

export interface IAskQuestion {
  question: IInputField;
}
