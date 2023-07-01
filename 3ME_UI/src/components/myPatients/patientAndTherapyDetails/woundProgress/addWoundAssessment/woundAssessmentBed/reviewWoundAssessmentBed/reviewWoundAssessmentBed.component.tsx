import { Button, Grid } from "@mui/material";
import { IAddWoundAssessment } from "../../addWoundAssessment.interface";
import WoundTitleValue from "../../woundReviewAssessment/woundTitleValue/woundTitleValue.component";
import "./reviewWoundAssessmentBed.css";
import WoundTitleBedValue from "./woundTitleBedValue.component";
type Props = {
  data: IAddWoundAssessment;
  editButtonClicked?: any;
  isWoundAssessmentSummary?: any;
};
const ReviewWoundAssessmentBed = ({
  data,
  editButtonClicked,
  isWoundAssessmentSummary,
}: Props) => {
  const getDigits = (value: string): string => {
    const output = value.match(/\d/g)?.join("").replace(/^0+/, "") ?? "0";
    return output.length > 0 ? `${output}%` : "0%";
  };
  return (
    <div className="review-woundBed">
      <div className="review-woundBed-titlediv">
        <div className="review-woundBed-title" data-testid="review-woundBed">
          Wound Bed Description
        </div>
        {!isWoundAssessmentSummary && (
          <div className="review-woundAssessmentBed-edit">
            <Button
              classes={{ root: "review-woundAssessmentBed-edit-button" }}
              data-testid="review-woundAssessmentBed-edit-button"
              onClick={editButtonClicked}
            >
              Edit
            </Button>
          </div>
        )}
      </div>
      <div className="review-woundBed-row" data-testid="review-woundBed-row">
        <WoundTitleBedValue
          title="Beefy, bright red granulation tissue"
          value={getDigits(data.granulationValue.value)}
        />
        <WoundTitleBedValue
          title="Dull, pink/red, no or minimal granulation tissue"
          value={getDigits(data.epthilizationValue.value)}
        />
        <WoundTitleBedValue
          title="White, grey, yellow, or brown non-viable tissue"
          value={getDigits(data.sloughValue.value)}
        />
        {data.woundEscharStatus.value === "yes" && (
          <WoundTitleBedValue
            title="Black eschar"
            value={getDigits(data.escharValue.value)}
          />
        )}
        <WoundTitleBedValue
          title="Total percentage of wound described"
          value={getDigits(data.woundBedTotal.value)}
          woundTitleClassName="review-WoundBed-value"
          titleClassName="review-WoundBedtitle"
          valueClassName="review-WoundBedtitle"
        />
      </div>
    </div>
  );
};
export default ReviewWoundAssessmentBed;
