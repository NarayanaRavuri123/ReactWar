import React from "react";
import "./reviewHoldOrHospitalization.css";
import { IAddWoundAssessment } from "../../addWoundAssessment.interface";
import WoundTitleValue from "../../woundReviewAssessment/woundTitleValue/woundTitleValue.component";
import { formatYesOrNo } from "../../../../../../../util/utilityFunctions";
import { Button } from "@mui/material";

type Props = {
  data: IAddWoundAssessment;
  editButtonClicked?: any;
  isWoundAssessmentSummary?: any;
};

const ReviewHoldOrHospitalization = ({
  data,
  editButtonClicked,
  isWoundAssessmentSummary,
}: Props) => {
  return (
    <div className="review-holdOrHospital">
      <div className="review-holdOrHospital-titlediv ">
        <div
          className="review-holdOrHospital-title"
          data-testid="review-holdOrHospital"
        >
          Holds and Hospitalizations
        </div>
        {!isWoundAssessmentSummary && (
          <div className="review-holdOrHospital-edit">
            <Button
              classes={{ root: "review-holdOrHospital-edit-button" }}
              data-testid="review-holdOrHospital-edit-button"
              onClick={editButtonClicked}
            >
              Edit
            </Button>
          </div>
        )}
      </div>
      <WoundTitleValue
        title="Has V.A.C.® Therapy been placed on hold?"
        value={formatYesOrNo(data?.vacTherapyBeenHold.value)}
      />
      {data?.vacTherapyBeenHold.value.toLowerCase() === "yes" && (
        <>
          <div className="review-holdOrHospital-row">
            <WoundTitleValue
              title="Hold Start Date"
              value={data?.vacHoldStartDate.value}
            />
            <WoundTitleValue
              title="Reason for Hold"
              value={data?.vacHoldReason.value}
            />
          </div>
          <WoundTitleValue
            title="Has V.A.C.® Therapy been resumed?"
            value={formatYesOrNo(data?.vacResumeStatus.value)}
          />
        </>
      )}
      {data?.vacResumeStatus.value.toLowerCase() === "yes" && (
        <>
          <div className="review-holdOrHospital-row">
            <WoundTitleValue
              title="Resumption Start Date"
              value={data?.vacResumeDate.value}
            />
            <WoundTitleValue
              title="Were measurements taken at resumption?"
              value={formatYesOrNo(data?.resumptionMeasureStatus.value)}
            />
          </div>
        </>
      )}
      {data?.resumptionMeasureStatus.value.toLowerCase() === "yes" && (
        <>
          <div className="review-holdOrHospital-row">
            <WoundTitleValue
              formatValue={false}
              title="Length"
              value={data?.resumptionMeasureLenght.value + " cm"}
            />
            <WoundTitleValue
              formatValue={false}
              title="Width"
              value={data?.resumptionMeasureWidth.value + " cm"}
            />
            <WoundTitleValue
              formatValue={false}
              title="Depth"
              value={data?.resumptionMeasureDepth.value + " cm"}
            />
            <WoundTitleValue
              formatValue={false}
              title="Volume"
              value={
                (
                  Number(data?.resumptionMeasureLenght.value) *
                  Number(data?.resumptionMeasureWidth.value) *
                  Number(data?.resumptionMeasureDepth.value)
                )
                  .toFixed(3)
                  .toString() + " cm³"
              }
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ReviewHoldOrHospitalization;
