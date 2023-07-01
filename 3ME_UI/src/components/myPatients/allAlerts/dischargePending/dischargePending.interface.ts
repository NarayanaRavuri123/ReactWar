import { IPatient } from "../../patient.interface";

export interface IDischargePendingInterface {
  completeDischarge?: any;
  closePopUpAction?: any;
  patient: IPatient;
}
