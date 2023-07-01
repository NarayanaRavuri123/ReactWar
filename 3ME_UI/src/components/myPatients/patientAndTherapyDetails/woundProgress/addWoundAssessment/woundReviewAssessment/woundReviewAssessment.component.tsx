import React, { useContext } from "react";
import {
  WoundAssessmentContext,
  WoundAssessmentContextType,
} from "../../../../../../context/WoundAssessmentContext";
import AddWoundFooterButtonGroup from "../addWoundFooterButtonGroup/addWoundFooterButtonGroup.component";
import "./woundReviewAssessment.css";
import WoundTitleValue from "./woundTitleValue/woundTitleValue.component";
import { IAddWoundAssessment } from "../addWoundAssessment.interface";
import {
  formatDate,
  handleEmptyValue,
} from "../../../../../../util/utilityFunctions";
import {
  WoundAssessmentPageSection,
  WoundAssessmentType,
} from "../woundAssessmentPageSection.enum";
import WoundMeasurement from "../woundMeasurement/woundMeasurement.component";
import WoundMeasurementEschar from "../woundMeasurementEschar/woundMeasurementEschar.component";
import { HoldOrHospitalization } from "../holdOrHospitalization/holdOrHospitalization.component";
import WoundDebridement from "../woundDebridement/woundDebridement.component";
import WoundAssessmentInfection from "../woundAssessmentInfection/woundAssessmentInfection.component";
import WoundAssessor from "../woundAssessor/woundAssessor.component";
import WoundTherapyStatus from "../woundTherapyStatus/woundTherapyStatus.component";
import { IDropZoneDocumentSelect } from "../../../../../../core/customDropZone/dropZoneDocumentSelect.interface";
import AttestationAndSignature from "../../../../../../core/attestationAndSignature/attestationAndSignature.component";
import { WoundExudate } from "../woundExudate/woundExudate.component";
import WoundUndermining from "../../../../../newOrder/woundUndermining/woundUndermining.component";
import WoundAssessmentUndermining from "../woundAssessmentUndermining/woundAssessmentUndermining.component";
import { ExposedWoundStructures } from "../exposedWoundStructures/exposedWoundStructures.component";
import WoundAssessComorbidities from "../woundAssessComorbidities/woundAssessComorbidities.component";
import { WoundAssessmentBed } from "../woundAssessmentBed/woundAssessmentBed.component";
import { Button } from "@mui/material";
import WoundTunneling from "../../../../../newOrder/woundTunneling/woundTunneling.component";
type Props = { woundAssessmentContextObj: WoundAssessmentContextType | null };

const WoundAssessmentReview = ({ woundAssessmentContextObj }: Props) => {
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
    "Review Wound Assessment"
  );
  woundAssessmentContextObj?.setWoundAssessmentProgress(60);

  const openPageEdit = (ref: any) => {
    window.scrollTo(0, 0);
    WoundAssessmentObj?.setWoundAssessmentProgress(50);
    WoundAssessmentObj?.setWoundAssessmentPageSection(
      WoundAssessmentPageSection.WOUND_ASSESSMENT_FORM
    );
    WoundAssessmentObj?.setScrollableComponentClassName(ref);
  };

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
                editButtonClicked={() =>
                  openPageEdit("wound-measurement-component")
                }
              />
              {data.woundTherapyStatus.value === "yes" && (
                <>
                  <WoundMeasurementEschar
                    isReviewAssessment={true}
                    data={data}
                    setData={setData}
                    editButtonClicked={() =>
                      openPageEdit("wound-eschar-component")
                    }
                  />
                  <HoldOrHospitalization
                    data={data}
                    setData={setData}
                    isReviewAssessment={true}
                    editButtonClicked={() =>
                      openPageEdit("holdOrHospitalization-component")
                    }
                  />
                  {data.resumptionMeasureStatus.value === "yes" && (
                    <WoundDebridement
                      data={data}
                      setData={setData}
                      isReviewAssessment={true}
                      debridementTypeHeading="Has debridement been attempted in the last 10 days?"
                      editButtonClicked={() =>
                        openPageEdit("woundDebridement-component")
                      }
                    />
                  )}
                  <WoundAssessmentInfection
                    data={data}
                    setData={setData}
                    isReviewAssessment={true}
                    editButtonClicked={() =>
                      openPageEdit("woundAssess-infection-component")
                    }
                  />
                </>
              )}
              <WoundAssessor
                data={data}
                setData={setData}
                isReviewAssessment={true}
                editButtonClicked={() =>
                  openPageEdit("wound-assessor-component")
                }
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
                  editButtonClicked={() =>
                    openPageEdit("wound-measurement-component")
                  }
                />
              )}
              {data?.woundTherapyStatus.value === "yes" && (
                <>
                  <WoundDebridement
                    data={data}
                    setData={setData}
                    isReviewAssessment={true}
                    debridementTypeHeading="Was the wound recently debrided?"
                    editButtonClicked={() =>
                      openPageEdit("woundDebridement-component")
                    }
                  />
                  <WoundAssessmentInfection
                    data={data}
                    setData={setData}
                    isReviewAssessment={true}
                    editButtonClicked={() =>
                      openPageEdit("woundAssess-infection-component")
                    }
                  />

                  <WoundMeasurement
                    data={data!}
                    setData={setData}
                    isReviewAssessment={true}
                    editButtonClicked={() =>
                      openPageEdit("wound-measurement-component")
                    }
                  />

                  <WoundMeasurementEschar
                    isReviewAssessment={true}
                    data={data}
                    setData={setData}
                    editButtonClicked={() =>
                      openPageEdit("wound-eschar-component")
                    }
                  />
                  <WoundAssessmentBed
                    data={data}
                    setData={setData}
                    isReviewAssessment={true}
                    editButtonClicked={() =>
                      openPageEdit("assess-woundbed-component")
                    }
                  />
                  <WoundExudate
                    data={data}
                    setData={setData}
                    isReviewAssessment={true}
                    editButtonClicked={() =>
                      openPageEdit("wound-exudate-component")
                    }
                  />
                  <WoundAssessmentUndermining
                    data={data}
                    setData={setData}
                    isReviewAssessment={true}
                    editButtonClicked={() =>
                      openPageEdit("wound-undermining-component")
                    }
                  />
                  <WoundTunneling
                    setWoundInfoData={setData}
                    woundInfoData={data}
                    isReviewOrder={true}
                    editButtonClicked={() =>
                      openPageEdit("wound-tunneling-main-container")
                    }
                  />
                  <ExposedWoundStructures
                    exposedWoundInfoData={data}
                    setExposedWoundInfoData={setData}
                    isReviewAssessment={true}
                    editButtonClicked={() =>
                      openPageEdit("wound-exposed-component")
                    }
                  />
                  <WoundAssessComorbidities
                    data={data}
                    setData={setData}
                    isReviewAssessment={true}
                    editButtonClicked={() =>
                      openPageEdit("assess-comorbidities-component")
                    }
                  />
                  <HoldOrHospitalization
                    data={data}
                    setData={setData}
                    isReviewAssessment={true}
                    editButtonClicked={() =>
                      openPageEdit("holdOrHospitalization-component")
                    }
                  />
                </>
              )}
              <WoundAssessor
                data={data!}
                setData={setData}
                isReviewAssessment={true}
                editButtonClicked={() =>
                  openPageEdit("wound-assessor-component")
                }
              />
            </>
          )}
        </>
      );
    }
  };

  return (
    <>
      <div className="woundAssessmentReview-container">
        <div className="wound-assessment-page-review">
          <div className="reviewpage-title">Review Wound Assessment</div>
          <div className="reviewpage-desp">
            Please review and confirm the information entered for this wound
            assessment is an accurate reflection of the patient's medical
            record.
          </div>
          <div className="reviewpage-patient-info">Patient Information</div>
          <WoundTitleValue
            title="Patient Name"
            value={`${addWoundAssessment?.patientLastName.value} ${addWoundAssessment?.patientFirstName.value}`}
          />
          <div className="reviewpage-patient-info-div">
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
            editButtonClicked={() => openPageEdit("therapy-status-component")}
          />
          {assessmentTypeBasedFlow()}
          <div className="review-additional-titlediv">
            <div className="additional-info">Additional Information</div>
            <div className="review-additional-edit">
              <Button
                classes={{ root: "review-additional-edit-button" }}
                data-testid="review-additional-edit-button"
                onClick={() => openPageEdit("newWoundImg")}
              >
                Edit
              </Button>
            </div>
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
          />
        </div>
      </div>
    </>
  );
};

export default WoundAssessmentReview;
