import { IPatient } from "../../../patient.interface";
import { WoundDetails } from "../main/holdOrResumeTherapy.interface";

export interface IResumeTherapy {
  closePopup: any;
  patient: IPatient;
  showWarningPopup: any;
  therapyStartDate: Date | null;
  wounds: [WoundDetails];
}

export interface IHoldAndResumeDate {
  holdMinAndMaxDates: IMinAndMaxDate;
  resumeMinAndMaxDates: IMinAndMaxDate;
}

export interface IMinAndMaxDate {
  minDate: any | null;
  maxDate: any | null;
}
