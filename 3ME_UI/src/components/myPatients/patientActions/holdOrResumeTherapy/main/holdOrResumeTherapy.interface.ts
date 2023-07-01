import { IPatient } from "../../../patient.interface";
import { IInputField } from "../../../../../core/interfaces/input.interface";
import { IHoldAndResumeDate } from "../resumeTherapy/resumeTherapy.interface";

export interface IHoldOrResumeTherapy {
  data: IHoldOrResumeTherapyData;
  holdAndResumeMinMaxDates: Array<IHoldAndResumeDate>;
  isHoldTherapy: boolean;
  origionalWounds: WoundDetails[];
  patient?: IPatient;
  setData: any;
  submitBtnTitle: String;
  submitBtnAction: any;
  title: String;
  woundQuestion: string;
}

export interface IHoldOrResumeTherapyData {
  holdDate1: IInputField;
  resumeDate1: IInputField;
  holdDate2: IInputField;
  resumeDate2: IInputField;
  reasonForHold: IInputField;
  comments: IInputField;
  wounds: [];
  therapyDate: [];
  isWoundSelected: boolean;
}

export interface WoundDetails {
  depth: number | null;
  direction: string;
  evaluationDate: string;
  id: string;
  isChecked: boolean;
  length: number | null;
  location: string;
  orientation: string;
  type: string;
  therapyHoldDate?: string;
  therapyResumptionDate?: string;
  width: number | null;
  isValid?: boolean | undefined;
}
