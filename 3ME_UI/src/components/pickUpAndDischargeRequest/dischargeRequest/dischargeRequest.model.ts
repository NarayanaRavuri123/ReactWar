import { ValidationStatus } from "../../../core/interfaces/input.interface";
import { IDischargeRequest } from "./dischargeRequest.interface";
import {
  therapyGoalsAchieved,
  therapyGoalsNotAchieved,
} from "./therapyOutcomes/therapyOutcomesData";
export let defaultDischargeRequestData: IDischargeRequest = {
  submitterFirstName: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
  submitterLastName: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
  submitterTitle: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
  submitterPhoneNumber: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
  submitterEmployer: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
  patientAdmissionType: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
  patientAdmissionInfo: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
  TypeOfFacility: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
  AdmissionScheduleInfo: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
  AdmissionWoundInfo: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
  facilityname: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
  patientDied: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
  therapyGoalsAchieved: {
    valid: ValidationStatus.UNTOUCHED,
    value: therapyGoalsAchieved,
    required: false,
  },
  therapyGoalsNotAchieved: {
    valid: ValidationStatus.UNTOUCHED,
    value: therapyGoalsNotAchieved,
    required: false,
  },
  woundFinalMeasurementDate1: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
  woundMeasurementDepth1: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
  woundMeasurementLenght1: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
  woundMeasurementWidth1: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
  woundFinalMeasurementDate2: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: false,
  },
  woundMeasurementDepth2: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: false,
  },
  woundMeasurementLenght2: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: false,
  },
  woundMeasurementWidth2: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: false,
  },
};
