import { Button } from "@mui/material";
import { IAddWoundAssessment } from "../../addWoundAssessment.interface";
import WoundTitleValue from "../../woundReviewAssessment/woundTitleValue/woundTitleValue.component";
import "./reviewWoundExposedStructures.css";
type Props = {
  data: IAddWoundAssessment;
  editButtonClicked?: any;
  isWoundAssessmentSummary?: any;
};
const ReviewWoundExposedStructures = ({
  data,
  editButtonClicked,
  isWoundAssessmentSummary,
}: Props) => {
  const getExposedStructures = (): string => {
    const output = data.exposedStructures.value
      .filter((x: any) => x.selected)
      .map((x: any) => x.label)
      .join(", ");
    return output === "" ? "-" : output;
  };

  return (
    <div className="review-exposed-structure">
      <div className="review-exposedstr-titlediv">
        <div
          className="review-exposedstr-title"
          data-testid="review-expstr-title"
        >
          Exposed Structures
        </div>
        {!isWoundAssessmentSummary && (
          <div className="review-woundExposedstructures-edit">
            <Button
              classes={{ root: "review-woundExposedstructures-edit-button" }}
              data-testid="review-woundExposedstructures-edit-button"
              onClick={editButtonClicked}
            >
              Edit
            </Button>
          </div>
        )}
      </div>
      <div className="review-exposedstr-row" data-testid="review-expstr-val">
        <WoundTitleValue
          title="Exposed Structures"
          value={getExposedStructures()}
        />
      </div>
    </div>
  );
};
export default ReviewWoundExposedStructures;
