import { Button } from "@mui/material";
import "./orderOverviewReviewWoundUndermining.css";
import {
  formatYesOrNo,
  formatedWoundValue,
} from "../../../../../../util/utilityFunctions";
import { IAddWoundAssessment } from "../../../woundProgress/addWoundAssessment/addWoundAssessment.interface";
import WoundTitleValue from "../../../woundProgress/addWoundAssessment/woundReviewAssessment/woundTitleValue/woundTitleValue.component";
type Props = {
  data: IAddWoundAssessment;
  editButtonClicked?: any;
  isWoundAssessmentSummary?: any;
};

const OrderOverviewReviewWoundUndermining = ({
  data,
  editButtonClicked,
  isWoundAssessmentSummary,
}: Props) => {
  return (
    <div className="review-undermining">
      <div className="review-undermining-titlediv">
        <div
          className="review-undermining-title"
          data-testid="review-undermining"
        >
          Wound Undermining
        </div>
        {!isWoundAssessmentSummary && (
          <div className="review-woundUndermining-edit">
            <Button
              classes={{ root: "review-woundUndermining-edit-button" }}
              data-testid="review-woundUndermining-edit-button"
              onClick={editButtonClicked}
            >
              Edit
            </Button>
          </div>
        )}
      </div>
      <WoundTitleValue
        title="Undermining Present"
        value={
          data?.woundUndermining.value !== ""
            ? formatYesOrNo(data?.woundUndermining.value)
            : "--"
        }
      />
      {data.woundUndermining.value.toLowerCase() === "yes" && (
        <>
          <div className="review-woundUndermining-locations">
            <div
              className="review-woundUnderminingloc1-row"
              data-testId="review-WoundUnderminingloc1-row"
            >
              <WoundTitleValue
                formatValue={false}
                title="Location 1 undermining"
                value={
                  data.underminingLocation1Depth.value &&
                  data.underminingLocation1Depth.value !== "--"
                    ? `${formatedWoundValue(
                        data.underminingLocation1Depth.value
                      )} cm ${
                        (data.underminingLocation1PositionFrom.value &&
                          data.underminingLocation1PositionFrom.value !==
                            "--") ||
                        (data.underminingLocation1PositionTo.value &&
                          data.underminingLocation1PositionTo.value !== "--")
                          ? `from ${data.underminingLocation1PositionFrom.value} to ${data.underminingLocation1PositionTo.value} o’clock`
                          : "--"
                      }`
                    : "--"
                }
              />
            </div>
            <div className="review-woundUnderminingloc2-row">
              <WoundTitleValue
                formatValue={false}
                title="Location 2 undermining"
                value={
                  data.underminingLocation2Depth.value &&
                  data.underminingLocation2Depth.value !== "--"
                    ? `${formatedWoundValue(
                        data.underminingLocation2Depth.value
                      )} cm ${
                        (data.underminingLocation2PositionFrom.value &&
                          data.underminingLocation2PositionFrom.value !==
                            "--") ||
                        (data.underminingLocation2PositionTo.value &&
                          data.underminingLocation2PositionTo.value !== "--")
                          ? `from ${data.underminingLocation2PositionFrom.value} to ${data.underminingLocation2PositionTo.value} o’clock`
                          : "--"
                      }`
                    : "--"
                }
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default OrderOverviewReviewWoundUndermining;
