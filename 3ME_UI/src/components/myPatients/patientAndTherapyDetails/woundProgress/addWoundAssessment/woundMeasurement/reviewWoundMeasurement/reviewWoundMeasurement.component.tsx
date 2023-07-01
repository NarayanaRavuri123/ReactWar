import React from "react";
import WoundTitleValue from "../../woundReviewAssessment/woundTitleValue/woundTitleValue.component";
import "./reviewWoundMeasurement.css";
import { IAddWoundAssessment } from "../../addWoundAssessment.interface";
import { formatYesOrNo } from "../../../../../../../util/utilityFunctions";
import { Button } from "@mui/material";

type Props = {
  data: IAddWoundAssessment;
  editButtonClicked?: any;
  isWoundAssessmentSummary?: any;
};

const ReviewWoundMeasurement = ({
  data,
  editButtonClicked,
  isWoundAssessmentSummary,
}: Props) => {
  return (
    <div className="review-woundMeasure">
      <div className="review-woundMeasure-titlediv ">
        <div
          className="review-woundMeasure-title"
          data-testid="review-woundMeasure"
        >
          Wound Measurements
        </div>
        {!isWoundAssessmentSummary && (
          <div className="review-woundMeasure-edit">
            <Button
              classes={{ root: "review-woundMeasure-edit-button" }}
              data-testid="review-woundMeasure-edit-button"
              onClick={editButtonClicked}
            >
              Edit
            </Button>
          </div>
        )}
      </div>
      {data.woundTherapyStatus.value.toLowerCase() === "no" && (
        <WoundTitleValue
          title="Have measurements been taken?"
          value={formatYesOrNo(data?.woundMeasurementTaken.value)}
        />
      )}
      {data.woundMeasurementTaken.value.toLowerCase() === "yes" && (
        <>
          <WoundTitleValue
            title="Wound Measurement Date"
            value={data?.woundMeasurementDate.value}
          />
          <div
            className="review-woundMeasure-row"
            data-testId="review-woundMeasurement-row"
          >
            <WoundTitleValue
              formatValue={false}
              title="Length"
              value={data?.woundMeasurementLenght.value + " cm"}
            />
            <WoundTitleValue
              formatValue={false}
              title="Width"
              value={data?.woundMeasurementWidth.value + " cm"}
            />
            <WoundTitleValue
              formatValue={false}
              title="Depth"
              value={data?.woundMeasurementDepth.value + " cm"}
            />
            <WoundTitleValue
              formatValue={false}
              title="Volume"
              value={
                (
                  Number(data?.woundMeasurementLenght.value) *
                  Number(data?.woundMeasurementWidth.value) *
                  Number(data?.woundMeasurementDepth.value)
                )
                  .toFixed(1)
                  .toString() + " cm³"
              }
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ReviewWoundMeasurement;
