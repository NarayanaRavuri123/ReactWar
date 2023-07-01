import { useContext, useState } from "react";
import {
  WoundAssessmentContext,
  WoundAssessmentContextType,
} from "../../../../../../context/WoundAssessmentContext";
import { IAddWoundAssessment } from "../addWoundAssessment.interface";
import { Grid } from "@mui/material";
import "./woundAssessmentSummary.css";
import WoundAssessmentSummaryHeader from "./woundAssessmentSummaryHeader";
import { ExpressButton } from "../../../../../../core/expressButton/expressButton.component";
import { ReactComponent as DownloadIcon } from "../../../../../../assets/download.svg";
import WoundTherapyStatus from "../woundTherapyStatus/woundTherapyStatus.component";
import WoundTitleValue from "../woundReviewAssessment/woundTitleValue/woundTitleValue.component";
import {
  formatDate,
  handleEmptyValue,
} from "../../../../../../util/utilityFunctions";
import AttestationAndSignature from "../../../../../../core/attestationAndSignature/attestationAndSignature.component";
import { IDropZoneDocumentSelect } from "../../../../../../core/customDropZone/dropZoneDocumentSelect.interface";
import { WoundAssessmentType } from "../woundAssessmentPageSection.enum";
import WoundMeasurement from "../woundMeasurement/woundMeasurement.component";
import WoundMeasurementEschar from "../woundMeasurementEschar/woundMeasurementEschar.component";
import { HoldOrHospitalization } from "../holdOrHospitalization/holdOrHospitalization.component";
import WoundDebridement from "../woundDebridement/woundDebridement.component";
import WoundAssessmentInfection from "../woundAssessmentInfection/woundAssessmentInfection.component";
import WoundAssessor from "../woundAssessor/woundAssessor.component";
import React from "react";
import { WoundAssessmentBed } from "../woundAssessmentBed/woundAssessmentBed.component";
import { WoundExudate } from "../woundExudate/woundExudate.component";
import WoundAssessmentUndermining from "../woundAssessmentUndermining/woundAssessmentUndermining.component";
import WoundTunneling from "../../../../../newOrder/woundTunneling/woundTunneling.component";
import { ExposedWoundStructures } from "../exposedWoundStructures/exposedWoundStructures.component";
import WoundAssessComorbidities from "../woundAssessComorbidities/woundAssessComorbidities.component";
import SnackBar from "../../../../../../core/snackBar/snackBar.component";

type Props = {
  woundAssessmentContextObj: WoundAssessmentContextType | null;
  pdfUrl: string;
};

const WoundAssessmentSummary = ({
  woundAssessmentContextObj,
  pdfUrl,
}: Props) => {
  const data: IAddWoundAssessment | undefined =
    woundAssessmentContextObj?.addWoundAssessment;
  const setData:
    | React.Dispatch<React.SetStateAction<IAddWoundAssessment>>
    | undefined = woundAssessmentContextObj?.setAddWoundAssessment!;
  const addWoundAssessment: IAddWoundAssessment | undefined =
    woundAssessmentContextObj?.addWoundAssessment;
  const WoundAssessmentObj = useContext<WoundAssessmentContextType | null>(
    WoundAssessmentContext
  );
  woundAssessmentContextObj?.setWoundAssessmentPageTitle(
    "Review Wound Summary"
  );
  const [reviewOrderToastFlag, setReviewOrderToastFlag] = useState(false);

  const assessmentTypeBasedFlow = () => {
    if (data?.assessmentType.value === WoundAssessmentType.MWP) {
      return (
        <>
          {data.woundTherapyStatus.value !== "" && (
            <>
              <WoundMeasurement
                data={data}
                setData={setData}
                isReviewAssessment={true}
                isWoundAssessmentSummary={true}
              />
              {data.woundTherapyStatus.value === "yes" && (
                <>
                  <WoundMeasurementEschar
                    isReviewAssessment={true}
                    data={data}
                    setData={setData}
                    isWoundAssessmentSummary={true}
                  />
                  <HoldOrHospitalization
                    data={data}
                    setData={setData}
                    isReviewAssessment={true}
                    isWoundAssessmentSummary={true}
                  />
                  {data.resumptionMeasureStatus.value === "yes" && (
                    <WoundDebridement
                      data={data}
                      setData={setData}
                      isReviewAssessment={true}
                      isWoundAssessmentSummary={true}
                      debridementTypeHeading="Has debridement been attempted in the last 10 days?"
                    />
                  )}
                  <WoundAssessmentInfection
                    data={data}
                    setData={setData}
                    isReviewAssessment={true}
                    isWoundAssessmentSummary={true}
                  />
                </>
              )}
              <WoundAssessor
                data={data}
                setData={setData}
                isReviewAssessment={true}
                isWoundAssessmentSummary={true}
              />
            </>
          )}
        </>
      );
    } else {
      return (
        <>
          {data?.woundTherapyStatus.value !== "" && (
            <>
              {data?.woundTherapyStatus.value !== "yes" && (
                <WoundMeasurement
                  data={data!}
                  setData={setData}
                  isReviewAssessment={true}
                  isWoundAssessmentSummary={true}
                />
              )}
              {data?.woundTherapyStatus.value === "yes" && (
                <>
                  <WoundDebridement
                    data={data}
                    setData={setData}
                    isReviewAssessment={true}
                    debridementTypeHeading="Was the wound recently debrided?"
                    isWoundAssessmentSummary={true}
                  />
                  <WoundAssessmentInfection
                    data={data}
                    setData={setData}
                    isReviewAssessment={true}
                    isWoundAssessmentSummary={true}
                  />
                  <WoundMeasurement
                    data={data!}
                    setData={setData}
                    isReviewAssessment={true}
                    isWoundAssessmentSummary={true}
                  />
                  <WoundMeasurementEschar
                    isReviewAssessment={true}
                    data={data}
                    setData={setData}
                    isWoundAssessmentSummary={true}
                  />
                  <WoundAssessmentBed
                    data={data}
                    setData={setData}
                    isReviewAssessment={true}
                    isWoundAssessmentSummary={true}
                  />
                  <WoundExudate
                    data={data}
                    setData={setData}
                    isReviewAssessment={true}
                    isWoundAssessmentSummary={true}
                  />
                  <WoundAssessmentUndermining
                    data={data}
                    setData={setData}
                    isReviewAssessment={true}
                    isWoundAssessmentSummary={true}
                  />
                  <WoundTunneling
                    setWoundInfoData={setData}
                    woundInfoData={data}
                    isReviewOrder={true}
                    isWoundAssessmentSummary={true}
                  />
                  <ExposedWoundStructures
                    exposedWoundInfoData={data}
                    setExposedWoundInfoData={setData}
                    isReviewAssessment={true}
                    isWoundAssessmentSummary={true}
                  />
                  <WoundAssessComorbidities
                    data={data}
                    setData={setData}
                    isReviewAssessment={true}
                    isWoundAssessmentSummary={true}
                  />
                  <HoldOrHospitalization
                    data={data}
                    setData={setData}
                    isReviewAssessment={true}
                    isWoundAssessmentSummary={true}
                  />
                </>
              )}
              <WoundAssessor
                data={data!}
                setData={setData}
                isReviewAssessment={true}
                isWoundAssessmentSummary={true}
              />
            </>
          )}
        </>
      );
    }
  };

  const handleClickPdfDownload = async () => {
    if (pdfUrl) window.open(pdfUrl, "_blank");
    else {
      setReviewOrderToastFlag(true);
      setTimeout(() => {
        setReviewOrderToastFlag(false);
      }, 5000);
    }
  };

  return (
    <div className="woundAssessmentSummary-container">
      <SnackBar
        toastStyle="reviewOrderToast"
        handleCloseAlert={() => {
          setReviewOrderToastFlag(false);
        }}
        msg="File does not yet exist. Please try again in a few minutes"
        openFlag={reviewOrderToastFlag}
      />
      <div className="wound-assessment-summary-header">
        <Grid className="wound-assessment-summary">
          <WoundAssessmentSummaryHeader />
        </Grid>
        <Grid container display="flex" flexDirection="row">
          <Grid item xs={8.6}>
            <div className="summarypage-title" data-testId="summarypage-title">
              Wound Assessment Summary
            </div>
          </Grid>
          <Grid className="saveOrderDiv">
            <div>
              <ExpressButton
                clickHandler={() => {
                  handleClickPdfDownload();
                }}
                parentClass="wound-assessment-save-order-btn"
                testId="acc-cancel-test"
                variant="text"
                startIcon={<DownloadIcon />}
              >
                Save & Print Assessment Summary
              </ExpressButton>
            </div>
          </Grid>
        </Grid>
      </div>
      <div className="wound-assessment-page-summary">
        <div className="summarypage-patient-info">Patient Information</div>
        <WoundTitleValue
          title="Patient Name"
          value={`${addWoundAssessment?.patientLastName.value} ${addWoundAssessment?.patientFirstName.value}`}
        />
        <div className="summarypage-patient-info-div">
          <WoundTitleValue
            title="Wound Type"
            formatValue={false}
            value={`${handleEmptyValue(
              addWoundAssessment?.woundLocation.value!
            )} , ${handleEmptyValue(
              addWoundAssessment?.woundDirection.value!
            )} ${handleEmptyValue(
              addWoundAssessment?.woundOrientation.value!
            )}`}
          />
          <WoundTitleValue
            title="Date of Birth"
            value={addWoundAssessment?.dateOfBirth.value!}
          />
          <WoundTitleValue
            title="Product"
            formatValue={false}
            value={addWoundAssessment?.productName.value!}
          />
          <WoundTitleValue
            title="Wound Assessment Date Range"
            value={`${formatDate(
              addWoundAssessment?.woundAssessmentDateFrom.value!
            )} – ${formatDate(
              addWoundAssessment?.woundAssessmentDateTo.value!
            )}`}
          />
          <WoundTitleValue
            title="Wound Category"
            formatValue={false}
            value={addWoundAssessment?.woundType.value!}
          />
          <WoundTitleValue
            title="Rental Order #"
            value={addWoundAssessment?.rentalOrderNumber.value!}
            valueClassName="reviewpage-ro-no"
          />
          <WoundTitleValue
            title="Placement Date"
            value={addWoundAssessment?.placementDate.value!}
          />
        </div>
        <WoundTherapyStatus
          data={data!}
          setData={setData}
          isReviewAssessment={true}
          isWoundAssessmentSummary={true}
        />
        {assessmentTypeBasedFlow()}
        <div className="summary-additional-titlediv">
          <div className="additional-info">Additional Information</div>
        </div>
        {WoundAssessmentObj?.woundImagesUpload?.length! > 0 && (
          <>
            <div className="additional-doc-title">Wound Images</div>
            <div>
              {WoundAssessmentObj?.woundImagesUpload &&
                WoundAssessmentObj?.woundImagesUpload.map(
                  (obj: IDropZoneDocumentSelect) => (
                    <h5 className="listDocs" data-testid="order-upload-value">
                      <span className="dot-with-space">&bull; </span>
                      {obj.documentName}
                      <br></br>
                    </h5>
                  )
                )}
            </div>
          </>
        )}
        {WoundAssessmentObj?.woundDocsUpload?.length! > 0 && (
          <>
            <div className="additional-doc-title2">Additional Documents</div>
            <div>
              {WoundAssessmentObj?.woundDocsUpload &&
                WoundAssessmentObj?.woundDocsUpload.map(
                  (obj: IDropZoneDocumentSelect) => (
                    <h5 className="listDocs" data-testid="order-upload-value">
                      <span className="dot-with-space">&bull; </span>
                      {obj.documentName}
                      <br></br>
                    </h5>
                  )
                )}
            </div>
          </>
        )}
        <div className="additional-notes">
          <WoundTitleValue
            title="Additional Notes"
            formatValue={false}
            value={addWoundAssessment?.provideAdditionalWoundInfo.value!}
          />
        </div>
        <AttestationAndSignature
          attestationData={woundAssessmentContextObj?.woundAssessAttestation!}
          setAttestationData={
            woundAssessmentContextObj?.setWoundAssessAttestation!
          }
          isReviewAssessment={true}
        />
      </div>
    </div>
  );
};

export default WoundAssessmentSummary;
