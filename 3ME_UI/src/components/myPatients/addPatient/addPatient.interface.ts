import { IAddPatientRedirect } from "../addPatientContainer/addPatientContainer.interface";
import { Dispatch, SetStateAction } from "react";
import { ISearchPatientByName, ISearchPatientByRentalOrder } from "./searchPatient.interface";

export interface IAddPatient extends IAddPatientRedirect { }

export interface ISearchByProps {
  patientSearchDataForRo: ISearchPatientByRentalOrder,
  setPatientSearchDataForRo: Dispatch<SetStateAction<ISearchPatientByRentalOrder>>,
  setPatientSearchDataForName: Dispatch<SetStateAction<ISearchPatientByName>>,
  patientSearchDataForName: ISearchPatientByName
}