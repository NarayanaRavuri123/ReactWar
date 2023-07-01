import { Button } from "@mui/material";
import { IAddWoundAssessment } from "../../addWoundAssessment.interface";
import WoundTitleValue from "../../woundReviewAssessment/woundTitleValue/woundTitleValue.component";
import "./reviewWoundAssessmentComorbidities.css";
import { isArray } from "underscore";
type Props = {
  data: IAddWoundAssessment;
  editButtonClicked?: any;
  isWoundAssessmentSummary?: any;
};
const ReviewWoundComorbidities = ({
  data,
  editButtonClicked,
  isWoundAssessmentSummary,
}: Props) => {
  const getComorbidities = (): string => {
    let output;
    if (isArray(data.woundAssessComorbodities.value)) {
      output = data.woundAssessComorbodities.value
        .filter((x: any) => x.selected === true)
        .map((x: any) => x.label)
        .join(", ");
      return output === "" ? "--" : output;
    } else return "--";
  };
  return (
    <div className="review-comorbidities">
      <div className="review-comobidities-titlediv ">
        <div
          className="review-comobidities-title"
          data-testid="review-comobidities-title"
        >
          Comorbidities
        </div>
        {!isWoundAssessmentSummary && (
          <div className="review-woundComorbidities-edit">
            <Button
              classes={{ root: "review-woundComorbidities-edit-button" }}
              data-testid="review-woundComorbidities-edit-button"
              onClick={editButtonClicked}
            >
              Edit
            </Button>
          </div>
        )}
      </div>
      <div
        className="review-comobidities-row"
        data-testid="review-woundComorbidities-value"
      >
        <WoundTitleValue
          formatValue={false}
          title="Applicable comorbidities"
          value={getComorbidities()}
        />
      </div>
    </div>
  );
};
export default ReviewWoundComorbidities;
