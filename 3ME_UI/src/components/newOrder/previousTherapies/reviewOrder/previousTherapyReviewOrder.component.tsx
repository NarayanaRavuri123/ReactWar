import "./previousTherapyReviewOrder.css";
import { useEffect, useState } from "react";
import { Button, Grid } from "@mui/material";
import { IPreviousTherapiesReviewOrder } from "./previousTherapyReviewOrder.interface";

export const PreviousTherapiesReviewOrder = ({
  editButtonClicked,
  isOrderSummary,
  woundInfoData,
}: IPreviousTherapiesReviewOrder) => {
  const [isPreviousTherapiesHasOther, setIsPreviousTherapiesHasOther] =
    useState<boolean>(false);
  const [
    isPreviousTherapiesCauseHasOther,
    setIsPreviousTherapiesCauseHasOther,
  ] = useState<boolean>(false);

  const getPreviousTherapies = (): string => {
    let output = woundInfoData.previousTherapies.value
      .filter((x: any) => x.selected)
      .map((x: any) => x.label)
      .join(", ");
    return output.length > 0 ? output : "--";
  };

  const checkPreviousTherapiesHasOther = () => {
    let other = woundInfoData.previousTherapies.value.filter(
      (x: any) => x.selected && x.label.toLowerCase() === "other"
    );
    setIsPreviousTherapiesHasOther(other.length > 0);
  };

  const getPreviousTherapiesCauses = (): string => {
    let output = woundInfoData.previousTherapiesCauses.value
      .filter((x: any) => x.selected)
      .map((x: any) => x.label)
      .join(", ");
    return output.length > 0 ? output : "--";
  };

  const checkPreviousTherapiesCausesHasOther = () => {
    let other = woundInfoData.previousTherapiesCauses.value.filter(
      (x: any) => x.selected && x.label.toLowerCase() === "other"
    );
    setIsPreviousTherapiesCauseHasOther(other.length > 0);
  };

  useEffect(() => {
    checkPreviousTherapiesHasOther();
    checkPreviousTherapiesCausesHasOther();
  }, []);

  return (
    <div className="previous-therapy-review-order">
      <div className="previous-therapy-review-order-header">
        <h2
          className="previous-therapy-review-order-title"
          data-testid="previous-therapy-review-order-title"
        >
          Previous Therapies
        </h2>
        {!isOrderSummary && (
          <Button
            classes={{ root: "previous-therapy-review-order-edit-button" }}
            data-testid="previous-therapy-review-order-edit-button"
            onClick={editButtonClicked}
          >
            Edit
          </Button>
        )}
      </div>
      <Grid
        className="previous-therapy-review-order-grid-container"
        container
        spacing={2}
      >
        <Grid
          className="previous-therapy-review-order-grid-item"
          item
          xs={isPreviousTherapiesHasOther ? 6 : 12}
        >
          <h5
            className="previous-therapy-review-order-content-title"
            data-testid="previous-therapies"
          >
            Previous therapies
          </h5>
          <h5
            className="previous-therapy-review-order-content-value"
            data-testid="previous-therapies-value"
          >
            {getPreviousTherapies()}
          </h5>
        </Grid>
        {isPreviousTherapiesHasOther && (
          <Grid className="previous-therapy-review-order-grid-item" item xs={6}>
            <h5
              className="previous-therapy-review-order-content-title"
              data-testid="previous-therapies-other"
            >
              If other
            </h5>
            <h5
              className="previous-therapy-review-order-content-value"
              data-testid="previous-therapies-other-value"
            >
              {woundInfoData.previousTherapyOther.value === ""
                ? "--"
                : woundInfoData.previousTherapyOther.value}
            </h5>
          </Grid>
        )}
        <Grid
          className="previous-therapy-review-order-grid-item"
          item
          xs={isPreviousTherapiesCauseHasOther ? 6 : 12}
        >
          <h5
            className="previous-therapy-review-order-content-title"
            data-testid="previous-therapies-causes"
          >
            Conditions preventing previous therapies
          </h5>
          <h5
            className="previous-therapy-review-order-content-value"
            data-testid="previous-therapies-causes-value"
          >
            {getPreviousTherapiesCauses()}
          </h5>
        </Grid>
        {isPreviousTherapiesCauseHasOther && (
          <Grid className="previous-therapy-review-order-grid-item" item xs={6}>
            <h5
              className="previous-therapy-review-order-content-title"
              data-testid="previous-therapies-causes-other"
            >
              If other
            </h5>
            <h5
              className="previous-therapy-review-order-content-value"
              data-testid="previous-therapies-causes-other-value"
            >
              {woundInfoData.previousTherapiesCausesOther.value === ""
                ? "--"
                : woundInfoData.previousTherapiesCausesOther.value}
            </h5>
          </Grid>
        )}
      </Grid>
    </div>
  );
};
