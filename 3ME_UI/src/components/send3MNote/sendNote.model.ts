import { ValidationStatus } from "../../core/interfaces/input.interface";
import { ISendNote } from "./sendNote.interface";

export let defaultSendNoteData: ISendNote = {
  contactResason: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
};
