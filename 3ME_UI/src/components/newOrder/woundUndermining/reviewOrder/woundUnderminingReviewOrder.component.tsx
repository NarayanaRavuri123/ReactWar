import "./woundUnderminingReviewOrder.css";
import {
  formatedWoundValue,
  makeCapitalEachWordInString,
} from "../../../../util/utilityFunctions";
import { Button, Grid } from "@mui/material";
import { IWoundUnderminingReviewOrder } from "./woundUnderminingReviewOrder.interface";

export const WoundUnderminingReviewOrder = ({
  editButtonClicked,
  isOrderSummary,
  woundInfoData,
}: IWoundUnderminingReviewOrder) => {
  return (
    <div className="wound-undermining-review-order">
      <div className="wound-undermining-review-order-header">
        <h2
          className="wound-undermining-review-order-title"
          data-testid="wound-undermining-review-order-title"
        >
          Wound Undermining
        </h2>
        {!isOrderSummary && (
          <Button
            classes={{ root: "wound-undermining-review-order-edit-button" }}
            data-testid="wound-undermining-review-order-edit-button"
            onClick={editButtonClicked}
          >
            Edit
          </Button>
        )}
      </div>
      <Grid
        className="wound-undermining-review-order-grid-container"
        container
        spacing={2}
      >
        <Grid className="wound-undermining-review-order-grid-item" item xs={12}>
          <h5
            className="wound-undermining-review-order-content-title"
            data-testid="wound-undermining-present"
          >
            Undermining Present
          </h5>
          <h5
            className="wound-undermining-review-order-content-value"
            data-testid="wound-undermining-present-value"
          >
            {woundInfoData.woundUndermining.value !== ""
              ? makeCapitalEachWordInString(
                  woundInfoData.woundUndermining.value
                )
              : "--"}
          </h5>
        </Grid>
        {woundInfoData.woundUndermining.value === "Yes" && (
          <>
            <Grid
              className="wound-undermining-review-order-grid-item"
              item
              xs={6}
            >
              <h5
                className="wound-undermining-review-order-content-title"
                data-testid="location-1-undermining"
              >
                Location 1 Undermining
              </h5>
              <h5
                className="wound-undermining-review-order-content-value"
                data-testid="location-1-undermining-value"
              >
                {woundInfoData.underminingLocation1Depth.value &&
                woundInfoData.underminingLocation1Depth.value !== "--"
                  ? `${formatedWoundValue(
                      woundInfoData.underminingLocation1Depth.value
                    )} cm ${
                      (woundInfoData.underminingLocation1PositionFrom.value &&
                        woundInfoData.underminingLocation1PositionFrom.value !==
                          "--") ||
                      (woundInfoData.underminingLocation1PositionTo.value &&
                        woundInfoData.underminingLocation1PositionTo.value !==
                          "--")
                        ? `from ${
                            woundInfoData.underminingLocation1PositionFrom.value.split(
                              ":"
                            )[0]
                          }  o’clock to ${
                            woundInfoData.underminingLocation1PositionTo.value.split(
                              ":"
                            )[0]
                          } o’clock`
                        : "--"
                    }`
                  : "--"}
              </h5>
            </Grid>
            <Grid
              className="wound-undermining-review-order-grid-item"
              item
              xs={6}
            >
              <h5
                className="wound-undermining-review-order-content-title"
                data-testid="location-2-undermining"
              >
                Location 2 Undermining
              </h5>
              <h5
                className="wound-undermining-review-order-content-value"
                data-testid="location-2-undermining-value"
              >
                {woundInfoData.underminingLocation2Depth.value &&
                woundInfoData.underminingLocation2Depth.value !== "--"
                  ? `${formatedWoundValue(
                      woundInfoData.underminingLocation2Depth.value
                    )} cm ${
                      (woundInfoData.underminingLocation2PositionFrom.value &&
                        woundInfoData.underminingLocation2PositionFrom.value !==
                          "--") ||
                      (woundInfoData.underminingLocation2PositionTo.value &&
                        woundInfoData.underminingLocation2PositionTo.value !==
                          "--")
                        ? `from ${
                            woundInfoData.underminingLocation2PositionFrom.value.split(
                              ":"
                            )[0]
                          }  o’clock to ${
                            woundInfoData.underminingLocation2PositionTo.value.split(
                              ":"
                            )[0]
                          } o’clock`
                        : "--"
                    }`
                  : "--"}
              </h5>
            </Grid>
          </>
        )}
      </Grid>
    </div>
  );
};
