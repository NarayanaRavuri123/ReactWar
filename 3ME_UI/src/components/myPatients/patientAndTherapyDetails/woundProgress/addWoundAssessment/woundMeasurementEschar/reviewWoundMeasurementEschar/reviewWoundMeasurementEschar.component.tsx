import React from "react";
import { IAddWoundAssessment } from "../../addWoundAssessment.interface";
import "./reviewWoundMeasurementEschar.css";
import WoundTitleValue from "../../woundReviewAssessment/woundTitleValue/woundTitleValue.component";
import { formatYesOrNo } from "../../../../../../../util/utilityFunctions";
import { Button } from "@mui/material";
type Props = {
  data: IAddWoundAssessment;
  editButtonClicked?: any;
  isWoundAssessmentSummary?: any;
};

const ReviewWoundMeasurementEschar = ({
  data,
  editButtonClicked,
  isWoundAssessmentSummary,
}: Props) => {
  return (
    <div className="review-woundEschar">
      <div className="review-woundEschar-titlediv ">
        <div
          className="review-woundEschar-title"
          data-testid="review-woundEschar"
        >
          Eschar
        </div>
        {!isWoundAssessmentSummary && (
          <div className="review-woundEschar-edit">
            <Button
              classes={{ root: "review-woundEschar-edit-button" }}
              data-testid="review-woundEschar-edit-button"
              onClick={editButtonClicked}
            >
              Edit
            </Button>
          </div>
        )}
      </div>
      <div className="review-eschar-row" data-testId="review-eschar-row">
        <WoundTitleValue
          title="Is eschar tissue present in the wound?"
          value={
            data?.woundEscharStatus.value !== ""
              ? formatYesOrNo(data?.woundEscharStatus.value)
              : "--"
          }
        />
      </div>
    </div>
  );
};

export default ReviewWoundMeasurementEschar;
