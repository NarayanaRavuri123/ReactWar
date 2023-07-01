import moment from "moment";
import "./patientDetails.css";
import { Grid } from "@mui/material";
import { useContext } from "react";
import { IPatientDetails } from "./patientDetails.interface";
import { makeCapitalEachWordInString } from "../../../../util/utilityFunctions";
import { useHistory } from "react-router-dom";
import {
  DischargeRequestContext,
  DischargeRequestContextType,
} from "../../../../context/DischargeRequestContext";

export const PatientDetails = ({ patient }: IPatientDetails) => {
  const DischargeReqObj = useContext<DischargeRequestContextType | null>(
    DischargeRequestContext
  );
  const history = useHistory();
  const openOrderDetail = () => {
    DischargeReqObj?.setIsPreviousClicked(true);
    if (patient) {
      history.push({
        pathname: "/home/orderOverview",
        state: {
          stateData: patient,
        },
      });
    }
  };
  return (
    <>
      <div
        className="patient-details-component"
        data-testid="patient-details-component"
      >
        <Grid
          container
          spacing={2}
          classes={{ root: "patient-details-grid-container" }}
        >
          <Grid item xs={12}>
            <h4 className="patient-name" data-testid="patient-name">
              {makeCapitalEachWordInString(patient.firstName) +
                " " +
                makeCapitalEachWordInString(patient.lastName)}
            </h4>
          </Grid>
          <Grid item xs={6} className="patient-details-grid-item">
            <div className="date-of-birth" data-testid="date-of-birth">
              <h5
                className="patient-details-title"
                data-testid="patient-details-title-dob"
              >
                Date of Birth
              </h5>
              <h5
                className="patient-details-value"
                data-testid="patient-details-value-dob"
              >
                {patient.dob ? moment(patient.dob).format("MM/DD/YYYY") : null}
              </h5>
            </div>
          </Grid>
          <Grid item xs={6} className="patient-details-grid-item">
            <div className="rental-order" data-testid="rental-order">
              <h5
                className="patient-details-title"
                data-testid="patient-details-title-ro-number"
              >
                Rental Order #
              </h5>
              <h5
                className="patient-ro-value"
                data-testid="patient-details-value-ro-number"
                onClick={openOrderDetail}
              >
                {patient.roNumber.toString()}
              </h5>
            </div>
          </Grid>
          {patient.productName && (
            <Grid item xs={6} className="patient-details-grid-item">
              <div className="product-name" data-testid="product-name">
                <h5
                  className="patient-details-title"
                  data-testid="patient-details-title-product-name"
                >
                  Product
                </h5>
                <h5
                  className="patient-details-value"
                  data-testid="patient-details-value-product-name"
                >
                  {patient.productName ?? ""}
                  {patient.productSerialNumber &&
                  patient.productSerialNumber !== ""
                    ? `- ${patient.productSerialNumber}`
                    : ""}
                </h5>
              </div>
            </Grid>
          )}
          {patient.placementDate && (
            <Grid item xs={6} className="patient-details-grid-item">
              <div className="placement-date" data-testid="placement-date">
                <h5
                  className="patient-details-title"
                  data-testid="patient-details-title-placement-date"
                >
                  Placement Date
                </h5>
                <h5
                  className="patient-details-value"
                  data-testid="patient-details-value-placement-date"
                >
                  {patient.placementDate
                    ? moment(patient.placementDate).format("MM/DD/YYYY")
                    : null}
                </h5>
              </div>
            </Grid>
          )}
        </Grid>
      </div>
    </>
  );
};
