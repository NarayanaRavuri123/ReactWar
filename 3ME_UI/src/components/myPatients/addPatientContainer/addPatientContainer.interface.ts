import { IPatient } from "../patient.interface";
import { PageSection } from "./addPatientContainer.enum";

export interface IAddPatientRedirect {
  redirectHandler: (changeSectionTo: PageSection, patientData?: IPatient) => void
}

export interface IAddPatientContainer {
  defaultPageSection?: PageSection
}