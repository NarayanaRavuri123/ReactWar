import "./exudateReviewOrder.css";
import { Button, Grid } from "@mui/material";
import { makeCapitalEachWordInString } from "../../../../util/utilityFunctions";
import { IExudateReviewOrder } from "./exudateReviewOrder.interface";

export const ExudateReviewOrder = ({
  editButtonClicked,
  isComingFromOrderOverview = false,
  isOrderSummary,
  woundInfoData,
}: IExudateReviewOrder) => {
  return (
    <div className="exudate-review-order">
      <div className="exudate-review-order-header">
        <h2
          className="exudate-review-order-title"
          data-testid="exudate-review-order-title"
        >
          Wound Exudate
        </h2>
        {!isOrderSummary && (
          <Button
            classes={{ root: "exudate-review-order-edit-button" }}
            data-testid="exudate-review-order-edit-button"
            onClick={editButtonClicked}
          >
            Edit
          </Button>
        )}
      </div>
      <Grid
        className="exudate-review-order-grid-container"
        container
        spacing={2}
      >
        <Grid
          className="exudate-review-order-grid-item"
          item
          xs={isComingFromOrderOverview ? 12 : 6}
        >
          <h5
            className="exudate-review-order-content-title"
            data-testid="exudate-amounts"
          >
            Exudate Amount
          </h5>
          <h5
            className="exudate-review-order-content-value"
            data-testid="exudate-amounts-value"
          >
            {woundInfoData.exudateAmount.value &&
            woundInfoData.exudateAmount.value !== "--"
              ? makeCapitalEachWordInString(woundInfoData.exudateAmount.value)
              : "--"}
          </h5>
        </Grid>
        <Grid
          className="exudate-review-order-grid-item"
          item
          xs={isComingFromOrderOverview ? 12 : 6}
        >
          <h5
            className="exudate-review-order-content-title"
            data-testid="exudate-appearance"
          >
            Exudate Appearance
          </h5>
          <h5
            className="exudate-review-order-content-value"
            data-testid="exudate-appearance-value"
          >
            {woundInfoData.exudateAppearance.value &&
            woundInfoData.exudateAppearance.value !== "--"
              ? makeCapitalEachWordInString(
                  woundInfoData.exudateAppearance.value
                )
              : "--"}
          </h5>
        </Grid>
      </Grid>
    </div>
  );
};
