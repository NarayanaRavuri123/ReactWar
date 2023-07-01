import { IPatient, IPatientAlert } from "../../patient.interface";

export interface IAlertsInterface {
  closePopUpAction?: any;
  data: IPatientAlert;
  patient: IPatient;
}
