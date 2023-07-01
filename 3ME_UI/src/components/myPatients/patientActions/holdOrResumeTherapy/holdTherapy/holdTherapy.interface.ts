import { IPatient } from "../../../patient.interface";
import { WoundDetails } from "../main/holdOrResumeTherapy.interface";

export interface IHoldTherapy {
  closePopup: any;
  patient: IPatient;
  showWarningPopup: any;
  therapyStartDate: Date | null;
  wounds: [WoundDetails];
}
