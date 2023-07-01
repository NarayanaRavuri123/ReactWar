import { IAddPatientRedirect } from "../addPatientContainer/addPatientContainer.interface";
import { IPatient } from "../patient.interface";

export interface IPatientFound extends IAddPatientRedirect {
  patient: IPatient;
}