import { ValidationStatus } from "../../../core/interfaces/input.interface";
import { ISendNote } from "../sendNote.interface";

export let mockSendNoteData: ISendNote = {
  contactResason: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
};

export let mockSendNoteDataForChangeAddress: ISendNote = {
  contactResason: {
    valid: ValidationStatus.UNTOUCHED,
    value: "1",
    required: true,
  },
};

export let mockSendNoteDataForTransferPatient: ISendNote = {
  contactResason: {
    valid: ValidationStatus.UNTOUCHED,
    value: "2",
    required: true,
  },
};

export let mockSendNoteDataForAskQuestion: ISendNote = {
  contactResason: {
    valid: ValidationStatus.UNTOUCHED,
    value: "3",
    required: true,
  },
};

