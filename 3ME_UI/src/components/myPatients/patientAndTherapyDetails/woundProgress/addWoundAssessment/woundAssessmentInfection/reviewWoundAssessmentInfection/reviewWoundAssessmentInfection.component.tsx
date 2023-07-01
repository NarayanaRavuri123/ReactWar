import React from "react";
import { IAddWoundAssessment } from "../../addWoundAssessment.interface";
import "./reviewWoundAssessmentInfection.css";
import WoundTitleValue from "../../woundReviewAssessment/woundTitleValue/woundTitleValue.component";
import {
  formatYesOrNo,
  makeCapitalEachWordInString,
} from "../../../../../../../util/utilityFunctions";
import { Button } from "@mui/material";

type Props = {
  data: IAddWoundAssessment;
  editButtonClicked?: any;
  isWoundAssessmentSummary?: any;
};

const ReviewWoundAssessmentInfection = ({
  data,
  editButtonClicked,
  isWoundAssessmentSummary,
}: Props) => {
  const getInfectionTreatmentRegimen = () => {
    const selectedValues = data?.treatmentRegimen.value.filter(
      (x: any) => x.selected
    );
    let values = selectedValues.map((x: any) => {
      if (x.selected === true) {
        if (
          x.textBoxLabel === "antibiotic" ||
          x.textBoxLabel === "ivantibiotics"
        ) {
          return `${x.label} - ${makeCapitalEachWordInString(x.textBoxValue)}`;
        } else {
          return x.label;
        }
      }
    });
    return values.join(", ").replace(/,(\s+)?$/, "");
  };
  return (
    <div className="review-woundInfection">
      <div className="review-woundInfection-titlediv ">
        <div
          className="review-woundInfection-title"
          data-testid="review-woundInfection"
        >
          Infection
        </div>
        {!isWoundAssessmentSummary && (
          <div className="review-woundInfection-edit">
            <Button
              classes={{ root: "review-woundInfection-edit-button" }}
              data-testid="review-woundInfection-edit-button"
              onClick={editButtonClicked}
            >
              Edit
            </Button>
          </div>
        )}
      </div>
      <div className="review-woundInfection-row ">
        <WoundTitleValue
          title="Infection present in the last 30 days?"
          value={formatYesOrNo(data?.woundInfectionInLast30Days.value)}
        />
        {data?.woundInfectionInLast30Days.value.toLowerCase() === "yes" && (
          <WoundTitleValue
            formatValue={false}
            title="Infection Type"
            value={
              data.selectedInfectionType.value.toLowerCase() === "other"
                ? `${data.selectedInfectionType.value} - ${data.selectedInfectionTypeOther.value}`
                : data.selectedInfectionType.value
            }
          />
        )}
      </div>
      {data?.woundInfectionInLast30Days.value.toLowerCase() === "yes" && (
        <WoundTitleValue
          title="Indicate Treatment Regimen"
          formatValue={false}
          value={getInfectionTreatmentRegimen()}
        />
      )}
    </div>
  );
};

export default ReviewWoundAssessmentInfection;
