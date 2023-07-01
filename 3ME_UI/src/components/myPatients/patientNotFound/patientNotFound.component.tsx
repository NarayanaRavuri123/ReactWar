import { ExpressButton } from "../../../core/expressButton/expressButton.component";
import { PageSection } from "../addPatientContainer/addPatientContainer.enum";
import "./patientNotFound.css";
import { IPatientNotFound } from "./patientNotFound.interface";

export const PatientNotFound = ({ redirectHandler }: IPatientNotFound) => {
  return (
    <div className="patient-not-found">
      <h3 className="header">Patient Not Found</h3>
      <div className="not-found-msg">
        <b>
          We were unable to locate a patient matching the search criteria
          provided.
        </b>
        <p className="sub-text">
          Please ‘Search Again’ or tap the X to return to My Patients list.
        </p>
      </div>
      <ExpressButton
        parentClass="search-again"
        variant="outlined"
        clickHandler={() => redirectHandler(PageSection.SEARCH_FORM)}
      >
        Search Again
      </ExpressButton>
    </div>
  );
};
