import moment from "moment";
import "./debridementReviewOrder.css";
import { Button, Grid } from "@mui/material";
import { IDebridementReviewOrder } from "./debridementReviewOrder.interface";
import { makeCapitalEachWordInString } from "../../../../util/utilityFunctions";

export const DebridementReviewOrder = ({
  editButtonClicked,
  isOrderSummary,
  woundInfoData,
}: IDebridementReviewOrder) => {
  return (
    <div className="debridement-review-order">
      <div className="debridement-review-order-header">
        <h2
          className="debridement-review-order-title"
          data-testid="debridement-review-order-title"
        >
          Debridement
        </h2>
        {!isOrderSummary && (
          <Button
            classes={{ root: "debridement-review-order-edit-button" }}
            data-testid="debridement-review-order-edit-button"
            onClick={editButtonClicked}
          >
            Edit
          </Button>
        )}
      </div>
      <Grid
        className="debridement-review-order-grid-container"
        container
        spacing={2}
      >
        <Grid className="debridement-review-order-grid-item" item xs={12}>
          <h5
            className="debridement-review-order-content-title"
            data-testid="debridement-attempted"
          >
            Has debridement been attempted in the last 10 days?
          </h5>
          <h5
            className="debridement-review-order-content-value"
            data-testid="debridement-attempted-value"
          >
            {woundInfoData?.debridementAttempted.value === ""
              ? "--"
              : makeCapitalEachWordInString(
                  woundInfoData?.debridementAttempted.value
                )}
          </h5>
        </Grid>
        {woundInfoData?.debridementAttempted.value === "Yes" && (
          <>
            <Grid className="debridement-review-order-grid-item" item xs={4}>
              <h5
                className="debridement-review-order-content-title"
                data-testid="debridement-type"
              >
                Debridement Type
              </h5>
              <h5
                className="debridement-review-order-content-value"
                data-testid="debridement-type-value"
              >
                {makeCapitalEachWordInString(
                  woundInfoData.debridementType.value
                )}
              </h5>
            </Grid>
            <Grid className="debridement-review-order-grid-item" item xs={4}>
              <h5
                className="debridement-review-order-content-title"
                data-testid="debridement-date"
              >
                Debridement Date
              </h5>
              <h5
                className="debridement-review-order-content-value"
                data-testid="debridement-date-value"
              >
                {moment(woundInfoData.debridementDate.value).format(
                  "MM/DD/YYYY"
                )}
              </h5>
            </Grid>
          </>
        )}
        <Grid
          className="debridement-review-order-grid-item"
          item
          xs={woundInfoData?.debridementAttempted.value === "Yes" ? 4 : 12}
        >
          <h5
            className="debridement-review-order-content-title"
            data-testid="serial-debridement-required"
          >
            Are serial debridements required?
          </h5>
          <h5
            className="debridement-review-order-content-value"
            data-testid="serial-debridement-required-value"
          >
            {makeCapitalEachWordInString(
              woundInfoData.serialDebridementRequired.value !== ""
                ? woundInfoData.serialDebridementRequired.value
                : "--"
            )}
          </h5>
        </Grid>
      </Grid>
    </div>
  );
};
