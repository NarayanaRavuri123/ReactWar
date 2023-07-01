import { createContext, MouseEventHandler } from "react";
import { Validator } from "../../../util/order.validations";
import { IPatient } from "../patient.interface";

interface IAddPatientContextContext {
  closePopup: MouseEventHandler<HTMLButtonElement>,
  patientSearchValidator: Validator,
  addPatientToList: (newPatient: IPatient) => void
}

export const AddPatientContext = createContext<IAddPatientContextContext>({ closePopup: () => { }, patientSearchValidator: new Validator(), addPatientToList: () => { } });