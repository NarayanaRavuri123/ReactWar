import { ReactNode, useState } from "react";
import { AddPatient } from "../addPatient/addPatient.component";
import { IPatient } from "../patient.interface";
import { PatientFound } from "../patientFound/patientFound.component";
import { PatientNotFound } from "../patientNotFound/patientNotFound.component";
import { PageSection } from "./addPatientContainer.enum";
import { IAddPatientContainer } from "./addPatientContainer.interface";

export const AddPatientContainer = ({
  defaultPageSection = PageSection.SEARCH_FORM,
}: IAddPatientContainer) => {
  const [currentSection, setCurrentSection] =
    useState<PageSection>(defaultPageSection);
  const [foundPatientData, setFoundPatientData] = useState<IPatient>();
  const redirectHandler = (
    changeSectionTo: PageSection,
    patientData?: IPatient
  ): void => {
    if (patientData) {
      setFoundPatientData(patientData);
    }
    setCurrentSection(changeSectionTo);
  };
  const sectionToDisplay = () => {
    let page: ReactNode;
    switch (currentSection) {
      case PageSection.FOUND:
        page = (
          <PatientFound
            patient={foundPatientData!}
            redirectHandler={redirectHandler}
          />
        );
        break;
      case PageSection.NOT_FOUND:
        page = <PatientNotFound redirectHandler={redirectHandler} />;
        break;
      case PageSection.SEARCH_FORM:
        page = <AddPatient redirectHandler={redirectHandler} />;
        break;
    }
    return page;
  };
  return sectionToDisplay();
};
