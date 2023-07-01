import { ExpressButton } from "../../../core/expressButton/expressButton.component";
import { IPatientFound } from "./patientFound.interface";
import "./patientFound.css";
import { PageSection } from "../addPatientContainer/addPatientContainer.enum";
import { useContext, MouseEvent } from "react";
import { AddPatientContext } from "../addPatientContainer/addPatientContainer.context";
import { format } from "react-string-format";
import moment from "moment";
import { addPatientSearch } from "../../../util/3meService";
import {
  MyPatientContext,
  MyPatientContextType,
} from "../../../context/MyPatientContext";

export const PatientFound = ({ patient, redirectHandler }: IPatientFound) => {
  const { closePopup, addPatientToList } = useContext(AddPatientContext);
  const MyPatientObj = useContext<MyPatientContextType | null>(
    MyPatientContext
  );
  const addPatientHandler = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    let formatDOB = moment(patient.dob, "DD/MM/YYYY").format("YYYY-MM-DD");

    let reqParams = {
      FirstName: patient.firstName,
      LastName: patient.lastName,
      RentalOrderNumber: patient.roNumber,
      DOB: formatDOB,
      FacilityName: patient.facilityName,
      OrderCreationDate: patient.orderCreationDate,
      OrderStatus: patient.status,
      SiteUseId: patient.siteUseId,
      CareGiverId: patient.careGiverId,
    };
    addPatientSearchToMyPatients(reqParams);
    closePopup(e);
  };
  const addPatientSearchToMyPatients = async (reqParams: any) => {
    const data = await addPatientSearch(reqParams);
    if (data.succeeded) {
      MyPatientObj?.setReloadMyPatient(true);
    }
  };

  return (
    <div className="patient-found">
      <h3 className="header">Patient Found</h3>
      <div className="found-patient">
        <b className="found-patient-name">
          {format("{0}, {1}", patient.lastName, patient.firstName)}
        </b>
        <p className="sub-text">
          DOB: {moment(patient.dob, "DD-MM-YYYY").format("MM/DD/YYYY")}
        </p>
      </div>
      <div className="button-section">
        <ExpressButton
          parentClass="search-again"
          variant="outlined"
          clickHandler={() => redirectHandler(PageSection.SEARCH_FORM)}
        >
          Search Again
        </ExpressButton>
        <ExpressButton
          parentClass="add-patient"
          variant="contained"
          clickHandler={(e) => addPatientHandler(e)}
        >
          Add Patient
        </ExpressButton>
      </div>
    </div>
  );
};
