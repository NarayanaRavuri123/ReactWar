import React from "react";
import { IAddWoundAssessment } from "../../addWoundAssessment.interface";
import "./reviewWoundAssessor.css";
import WoundTitleValue from "../../woundReviewAssessment/woundTitleValue/woundTitleValue.component";
import { formatYesOrNo } from "../../../../../../../util/utilityFunctions";
import { Button } from "@mui/material";

type Props = {
  data: IAddWoundAssessment;
  editButtonClicked?: any;
  isWoundAssessmentSummary?: any;
};

const ReviewWoundAssessor = ({
  data,
  editButtonClicked,
  isWoundAssessmentSummary,
}: Props) => {
  return (
    <div className="review-woundAssessor">
      <div className="review-woundAssessor-titlediv ">
        <div
          className="review-woundAssessor-title"
          data-testid="review-woundAssessor"
        >
          Wound Assessor
        </div>
        {!isWoundAssessmentSummary && (
          <div className="review-woundAssessor-edit">
            <Button
              classes={{ root: "review-woundAssessor-edit-button" }}
              data-testid="review-woundAssessor-edit-button"
              onClick={editButtonClicked}
            >
              Edit
            </Button>
          </div>
        )}
      </div>
      <WoundTitleValue
        title="Did someone other than yourself perform this assessment?"
        value={
          data?.woundAssessorStatus.value !== ""
            ? formatYesOrNo(data?.woundAssessorStatus.value)
            : "--"
        }
      />
      {data.woundAssessorStatus.value.toLowerCase() === "yes" && (
        <>
          <div className="review-woundAssessor-row">
            <WoundTitleValue
              title="Name of Wound Assessor"
              value={data?.woundAssessorName.value}
            />
            <WoundTitleValue
              formatValue={false}
              title="License Type / Job Role"
              value={data?.woundAssessorLicenseType.value}
            />
          </div>
          <div className="review-woundAssessor-row">
            <WoundTitleValue
              title="Facility Name"
              value={data?.woundAssessorFacilityName.value}
            />
            <WoundTitleValue
              title="Phone Number"
              value={data?.woundAssessorPhoneNumber.value}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ReviewWoundAssessor;
