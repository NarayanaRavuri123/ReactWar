import {
  IInputField,
  MultiCheckbox,
} from "../../../core/interfaces/input.interface";
import { DischargeRequestValidator } from "./dischargeRequest.validator";
export interface IDischargeRequestProps {
  Validator?: DischargeRequestValidator;
  woundInfoDetails?:any
}
export interface IDischargeRequest {
  // Submitter Information
  submitterFirstName: IInputField;
  submitterLastName: IInputField;
  submitterTitle: IInputField;
  submitterPhoneNumber: IInputField;
  submitterEmployer: IInputField;
  //Patient Admission Type
  patientAdmissionType: IInputField;
  //Patient Admission Info
  patientAdmissionInfo: IInputField;
  TypeOfFacility: IInputField;
  AdmissionScheduleInfo: IInputField;
  AdmissionWoundInfo: IInputField;
  facilityname: IInputField;
  //patient died info
  patientDied: IInputField;
  therapyGoalsAchieved: MultiCheckbox;
  therapyGoalsNotAchieved: MultiCheckbox;
  woundFinalMeasurementDate1: IInputField;
  woundMeasurementLenght1: IInputField;
  woundMeasurementWidth1: IInputField;
  woundMeasurementDepth1: IInputField;
  woundFinalMeasurementDate2: IInputField;
  woundMeasurementLenght2: IInputField;
  woundMeasurementWidth2: IInputField;
  woundMeasurementDepth2: IInputField;
}
export type MultipleActionsProps = {
  value: string;
  label: string;
  selected: boolean;
};
