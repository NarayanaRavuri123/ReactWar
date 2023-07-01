import React from "react";
import { IAddWoundAssessment } from "../../addWoundAssessment.interface";
import "./reviewWoundDebridement.css";
import WoundTitleValue from "../../woundReviewAssessment/woundTitleValue/woundTitleValue.component";
import {
  formatYesOrNo,
  getTextFromCode,
} from "../../../../../../../util/utilityFunctions";
import { Button } from "@mui/material";
import { IReviewWoundDebridement } from "./reviewWoundDebridement.interface";

const ReviewWoundDebridement = ({
  data,
  editButtonClicked,
  woundDebridementTypeCode,
  isWoundAssessmentSummary,
  isComingFromOrderOverview = false,
}: IReviewWoundDebridement) => {
  return (
    <div className="review-debridement">
      <div className="review-debridement-titlediv ">
        <div
          className="review-debridement-title"
          data-testid="review-debridement-title"
        >
          Debridement
        </div>
        {!isWoundAssessmentSummary && (
          <div className="review-debridement-edit">
            <Button
              classes={{ root: "review-debridement-edit-button" }}
              data-testid="review-debridement-edit-button"
              onClick={editButtonClicked}
            >
              Edit
            </Button>
          </div>
        )}
      </div>
      <WoundTitleValue
        title="Was the wound debrided?"
        value={
          data?.woundDebridementStatus.value !== "--"
            ? formatYesOrNo(data?.woundDebridementStatus.value)
            : "--"
        }
      />
      {data &&
        data.woundDebridementStatus &&
        data.woundDebridementStatus.value &&
        data.woundDebridementStatus.value.toLocaleLowerCase() === "yes" && (
          <div
            className={`review-debridement-row${
              isComingFromOrderOverview ? " order-overview" : ""
            }`}
            data-testid="review-Wounddebridement-row"
          >
            <WoundTitleValue
              title="Debridement Type"
              value={getTextFromCode(
                woundDebridementTypeCode,
                data.woundDebridementType.value
              )}
            />
            <WoundTitleValue
              title="Debridement Date"
              value={data?.woundDebridementDate.value}
            />
          </div>
        )}
    </div>
  );
};

export default ReviewWoundDebridement;
