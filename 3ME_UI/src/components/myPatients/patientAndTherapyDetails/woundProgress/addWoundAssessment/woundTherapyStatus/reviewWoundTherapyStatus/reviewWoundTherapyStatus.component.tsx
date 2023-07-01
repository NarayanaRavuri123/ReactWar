import React from "react";
import "./reviewWoundTherapyStatus.css";
import WoundTitleValue from "../../woundReviewAssessment/woundTitleValue/woundTitleValue.component";
import { formatYesOrNo } from "../../../../../../../util/utilityFunctions";
import { IAddWoundAssessment } from "../../addWoundAssessment.interface";
import { Button } from "@mui/material";

type Props = {
  data: IAddWoundAssessment;
  editButtonClicked?: any;
  isWoundAssessmentSummary: any;
};

const ReviewWoundTherapyStatus = ({
  data,
  editButtonClicked,
  isWoundAssessmentSummary,
}: Props) => {
  return (
    <div className="review-therapyStatus">
      <div className="review-therapyStatus-titlediv ">
        <div
          className="review-therapyStatus-title"
          data-testid="review-therapystatus"
        >
          Therapy Status
        </div>
        {!isWoundAssessmentSummary && (
          <div className="review-therapyStatus-edit">
            <Button
              classes={{ root: "review-therapyStatus-edit-button" }}
              data-testid="review-therapyStatus-edit-button"
              onClick={editButtonClicked}
            >
              Edit
            </Button>
          </div>
        )}
      </div>
      <WoundTitleValue
        title="Is the V.A.C.® Therapy unit currently in use?"
        value={
          data?.woundTherapyStatus.value !== ""
            ? formatYesOrNo(data?.woundTherapyStatus.value)
            : "--"
        }
      />
      {data.woundTherapyStatus.value.toLowerCase() === "no" && (
        <div className="review-therapyStatus-row">
          <WoundTitleValue
            title="Discontinue Date"
            value={data?.woundDiscontinuedDate.value}
          />
          <WoundTitleValue
            title="Reason for discontinuation "
            value={data?.woundDiscontinuedReason.value}
          />
        </div>
      )}
    </div>
  );
};

export default ReviewWoundTherapyStatus;
