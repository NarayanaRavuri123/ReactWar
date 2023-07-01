import { Box } from "@mui/material";
import "./addPatient.css";
import {
  ISearchPatientByRentalOrder,
  ISearchPatientByName,
} from "./searchPatient.interface";
import {
  defaultPatientDataForRental,
  defaultPatientDataForNameSearch,
} from "./searchPatient.model";
import { useContext, useEffect, useState } from "react";
import { getDeepClone } from "../../../util/ObjectFunctions";
import { ExpressButton } from "../../../core/expressButton/expressButton.component";
import { IAddPatient } from "./addPatient.interface";
import { PageSection } from "../addPatientContainer/addPatientContainer.enum";
import {
  Validation,
  ValidationStatus,
} from "../../../core/interfaces/input.interface";
import { SearchByRO } from "./searchByRo/searchByRo.component";
import { AddPatientContext } from "../addPatientContainer/addPatientContainer.context";
import { SearchByName } from "./searchByName/searchByName.component";
import { getPatientSearch } from "../../../util/3meService";
import moment from "moment";
import { IPatient } from "../patient.interface";
import { getInvalidObj } from "../../../util/utilityFunctions";

export const AddPatient = ({ redirectHandler }: IAddPatient) => {
  const { patientSearchValidator } = useContext(AddPatientContext);
  const [patientSearchForRental, setPatientSearchForRental] =
    useState<ISearchPatientByRentalOrder>(
      getDeepClone(defaultPatientDataForRental)
    );
  const [patientSearchForName, setPatientSearchForName] =
    useState<ISearchPatientByName>(
      getDeepClone(defaultPatientDataForNameSearch)
    );
  const [isFormValid, setIsFormValid] = useState<ValidationStatus>(
    ValidationStatus.INVALID
  );
  const [searchPatientResult, setSearchPatientResult] = useState<IPatient>();

  useEffect(() => {
    validate();
  }, [patientSearchForRental, patientSearchForName]);

  const validate = () => {
    let isValid: Validation = getInvalidObj(null);
    if (patientSearchForName.search.value === "true") {
      isValid =
        patientSearchValidator.validateAllSearchFields(patientSearchForName);
    } else if (patientSearchForRental.search.value === "true") {
      isValid = patientSearchValidator.validateAllSearchFields(
        patientSearchForRental
      );
    }
    setIsFormValid(isValid.status);
  };

  const onSubmit = () => {
    let reqParams = {
      ron:
        patientSearchForRental.search.value === "true"
          ? patientSearchForRental.ro.value
          : "",
      dob:
        patientSearchForRental.search.value === "true"
          ? moment(patientSearchForRental.dob.value).format("DD-MMM-yyyy")
          : moment(patientSearchForName.dob1.value).format("DD-MMM-yyyy"),
      lastName:
        patientSearchForName.search.value === "true"
          ? patientSearchForName.lastName.value
          : "",
      zipCode:
        patientSearchForName.search.value === "true"
          ? patientSearchForName.zip.value
          : "",
    };
    fetchPatientSearchResult(reqParams);
  };

  const fetchPatientSearchResult = async (reqParams: any) => {
    try {
      const data = await getPatientSearch(reqParams);
      if (data) {
        let searchedPatientResult = {
          dob: moment(reqParams.dob).format("DD-MM-yyyy"),
          roNumber: data?.ron,
          firstName: data?.firstName.toLowerCase(),
          lastName: data?.lastName.toLowerCase(),
          facilityName: data?.homecareFacilityname,
          orderCreationDate: data?.orderDate,
          siteUseId: data?.siteUseId,
          careGiverId: data?.careGiverId,
          alerts: [],
          status: data?.orderStatus,
        };
        setSearchPatientResult(searchedPatientResult);
        redirectHandler(PageSection.FOUND, searchedPatientResult);
      } else {
        redirectHandler(PageSection.NOT_FOUND);
      }
    } catch (error) {}
  };

  return (
    <div className="dialogSpace">
      <div className="addPatient">Add Patient</div>
      <div className="addPatientIntro">
        To add patient to your list, search with either of the criteria below
      </div>
      <Box sx={{ flexGrow: 1, margin: "0 -4px" }}>
        <SearchByRO
          patientSearchDataForName={patientSearchForName}
          patientSearchDataForRo={patientSearchForRental}
          setPatientSearchDataForName={setPatientSearchForName}
          setPatientSearchDataForRo={setPatientSearchForRental}
        />
        <div className="or">or</div>
        <SearchByName
          patientSearchDataForName={patientSearchForName}
          patientSearchDataForRo={patientSearchForRental}
          setPatientSearchDataForName={setPatientSearchForName}
          setPatientSearchDataForRo={setPatientSearchForRental}
        />
      </Box>
      <div>
        <ExpressButton
          disabled={isFormValid === ValidationStatus.VALID ? false : true}
          parentClass="search-patient"
          variant="contained"
          clickHandler={onSubmit}
        >
          Search
        </ExpressButton>
      </div>
    </div>
  );
};
