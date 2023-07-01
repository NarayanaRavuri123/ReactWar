import { IAskQuestion } from "./askQuestion.interface";
import { ValidationStatus } from "../../../core/interfaces/input.interface";

export let defaultAskQuestionData: IAskQuestion = {
  question: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
};
