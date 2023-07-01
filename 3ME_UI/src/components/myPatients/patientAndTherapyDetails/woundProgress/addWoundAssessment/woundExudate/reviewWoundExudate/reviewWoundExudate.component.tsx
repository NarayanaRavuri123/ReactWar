import { Button } from "@mui/material";
import { getTextFromCode } from "../../../../../../../util/utilityFunctions";
import { IAddWoundAssessment } from "../../addWoundAssessment.interface";
import WoundTitleValue from "../../woundReviewAssessment/woundTitleValue/woundTitleValue.component";
import "./reviewWoundExudate.css";
type Props = {
  data: IAddWoundAssessment;
  exudateAppearanceData: any;
  exudateAmountData: any;
  editButtonClicked?: any;
  isWoundAssessmentSummary?: any;
};

const ReviewWoundExudate = ({
  data,
  exudateAppearanceData,
  exudateAmountData,
  editButtonClicked,
  isWoundAssessmentSummary,
}: Props) => {
  return (
    <div className="review-exudate">
      <div className="review-exudate-titlediv">
        <div
          className="review-exudate-title"
          data-testId="review-woundExudate-title"
        >
          Wound Exudate
        </div>
        {!isWoundAssessmentSummary && (
          <div className="review-woundexudate-edit">
            <Button
              classes={{ root: "review-woundExudate-edit-button" }}
              data-testid="review-woundExudate-edit-button"
              onClick={editButtonClicked}
            >
              Edit
            </Button>
          </div>
        )}
      </div>
      <div className="review-exudate-row" data-testId="review-woundExudate-row">
        <WoundTitleValue
          title="Wound Exudate"
          value={getTextFromCode(exudateAmountData, data.exudateAmount.value)}
        />
        <WoundTitleValue
          title="Exudate Appearence"
          value={getTextFromCode(
            exudateAppearanceData,
            data.exudateAppearance.value
          )}
        />
      </div>
    </div>
  );
};
export default ReviewWoundExudate;
