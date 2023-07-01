import { Grid, InputBase, TextField } from "@mui/material";
import moment from "moment";
import React, { useContext } from "react";
import {
  RolesPermissionContextType,
  RolesPermissionContext,
} from "../../../context/RolesPermissionContext";
import { IAttestationAndSign } from "../attestationAndSign.interface";
import WoundTitleValue from "../../../components/myPatients/patientAndTherapyDetails/woundProgress/addWoundAssessment/woundReviewAssessment/woundTitleValue/woundTitleValue.component";
import "./attestationAndSignatureSummary.css";

type Props = {
  attestationData: IAttestationAndSign;
};

const AttestationAndSignatureSummary = ({ attestationData }: Props) => {
  let currentDate = moment(Date()).format("MM/DD/YYYY");
  let currentTime = moment(Date()).format("hh:mm:ss");

  const permissionObj = useContext<RolesPermissionContextType | null>(
    RolesPermissionContext
  );
  return (
    <div
      className="attest-summary-container"
      data-testid="attest-summary-container"
    >
      <div className="attest-summary-title" data-testid="attest-summary-title">
        Attestation & Signature
      </div>
      <div className="attest-summary">
        {permissionObj?.mappedRolesPermissionData.IsSalesRole ||
        permissionObj?.mappedRolesPermissionData.IsSalesManagerRole ? (
          <>
            <Grid
              container
              spacing={2}
              classes={{ root: "attest-summary-container-component" }}
            >
              <Grid item xs={6}>
                <div
                  className="summary-woundAssessment-sales-info"
                  data-testid="summary-woundAssessment-sales-info"
                >
                  <div className="confirmation-summary-title">
                    <span>Assessment Confirmation Contact</span>
                  </div>
                  <div className="confirmation-summary-value">
                    <div>{attestationData?.firstNameLastName.value}</div>
                    <div>{attestationData?.employer.value}</div>
                    <div>{attestationData?.phoneNumber.value}</div>
                  </div>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div
                  className="confirmation-date"
                  data-testid="confirmation-date"
                >
                  <WoundTitleValue
                    title="Confirmation Date"
                    value={currentDate}
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className="e-signature" data-testid="e-signature">
                  <WoundTitleValue
                    title="3M Representative E-Signature"
                    value={attestationData?._3MRepresentativeName.value}
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div
                  className="electronic-date-stamp"
                  data-testid="electronic-date-stamp"
                >
                  <WoundTitleValue
                    formatValue={false}
                    title="Electronic Date Stamp (Automated)"
                    value={currentDate + " at " + currentTime}
                  />
                </div>
              </Grid>
            </Grid>
          </>
        ) : (
          <>
            <Grid
              container
              classes={{ root: "attest-summary-container-component" }}
            >
              <Grid item xs={6}>
                <div
                  className="attest-summary-non-sales-name"
                  data-testid="attest-summary-non-sales-name"
                >
                  <WoundTitleValue
                    title="E-Signature"
                    value={attestationData?._3MRepresentativeName.value}
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div
                  className="attest-summary-non-sales-date"
                  data-testid="attest-summary-non-sales-date"
                >
                  <WoundTitleValue
                    formatValue={false}
                    title="Electronic Date Stamp (Automated)"
                    value={currentDate + " at " + currentTime}
                  />
                </div>
              </Grid>
            </Grid>
          </>
        )}
      </div>
    </div>
  );
};

export default AttestationAndSignatureSummary;
