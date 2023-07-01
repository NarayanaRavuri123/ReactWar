import { IPatient, IPatientAlert } from "../patient.interface";

export interface IPatientAlertInterface {
  alertData: IPatientAlert;
  patient: IPatient;
  patientAnalytics?: any;
}
