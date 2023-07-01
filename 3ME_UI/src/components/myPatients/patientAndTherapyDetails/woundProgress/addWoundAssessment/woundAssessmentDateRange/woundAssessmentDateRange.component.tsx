import React from "react";
import "./WoundAssessmentDateRange.css";
import { IAddWoundAssessment } from "../addWoundAssessment.interface";
import { formatDate } from "../../../../../../util/utilityFunctions";

type Props = { data: IAddWoundAssessment };

const WoundAssessmentDateRange = ({ data }: Props) => {
  return (
    <div>
      <div className="woundAssess-header" data-testid="woundAssess-header">
        Wound Assessment Date Range
      </div>
      <div
        className="woundAssess-dates"
        data-testid="woundAssess-dates"
      >{`${formatDate(data.woundAssessmentDateFrom.value)} – ${formatDate(
        data.woundAssessmentDateTo.value
      )}`}</div>
    </div>
  );
};

export default WoundAssessmentDateRange;
