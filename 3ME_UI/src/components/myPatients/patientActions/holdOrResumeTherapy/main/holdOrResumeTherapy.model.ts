import { IHoldOrResumeTherapyData } from "./holdOrResumeTherapy.interface";
import { ValidationStatus } from "../../../../../core/interfaces/input.interface";

export let defaultHoldOrResumeTherapyData: IHoldOrResumeTherapyData = {
  holdDate1: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: false,
  },
  resumeDate1: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: false,
  },
  holdDate2: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: false,
  },
  resumeDate2: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: false,
  },
  reasonForHold: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
  comments: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
  wounds: [],
  therapyDate: [],
  isWoundSelected: true,
};
