import "./woundBedReviewOrder.css";
import { Button, Grid } from "@mui/material";
import { IWoundBedReviewOrder } from "./woundBedReviewOrder.interface";

export const WoundBedReviewOrder = ({
  editButtonClicked,
  isOrderSummary,
  woundInfoData,
}: IWoundBedReviewOrder) => {
  const getDigits = (value: string): string => {
    const output = value.match(/\d/g)?.join("").replace(/^0+/, "") ?? "0";
    return output.length > 0 ? `${output}%` : "0%";
  };

  return (
    <div className="wound-bed-review-order">
      <div className="wound-bed-review-order-header">
        <h2
          className="wound-bed-review-order-title"
          data-testid="wound-bed-review-order-title"
        >
          Wound Bed Description
        </h2>
        {!isOrderSummary && (
          <Button
            classes={{ root: "wound-bed-review-order-edit-button" }}
            data-testid="wound-bed-review-order-edit-button"
            onClick={editButtonClicked}
          >
            Edit
          </Button>
        )}
      </div>
      <Grid
        className="wound-bed-review-order-grid-container"
        container
        spacing={2}
      >
        <Grid className="wound-bed-review-order-grid-item" item xs={7}>
          <h5
            className="wound-bed-review-order-content-title"
            data-testid="granulation"
          >
            Beefy, bright red granulation tissue
          </h5>
        </Grid>
        <Grid className="wound-bed-review-order-grid-item" item xs={1}>
          <h5
            className="wound-bed-review-order-content-value"
            data-testid="granulation-value"
          >
            {getDigits(woundInfoData.granulationValue.value)}
          </h5>
        </Grid>
        <Grid className="wound-bed-review-order-grid-item" item xs={7}>
          <h5
            className="wound-bed-review-order-content-title"
            data-testid="epthilization"
          >
            Dull, pink/red, no or minimal granulation tissue
          </h5>
        </Grid>
        <Grid className="wound-bed-review-order-grid-item" item xs={1}>
          <h5
            className="wound-bed-review-order-content-value"
            data-testid="epthilization-value"
          >
            {getDigits(woundInfoData.epthilizationValue.value)}
          </h5>
        </Grid>
        <Grid className="wound-bed-review-order-grid-item" item xs={7}>
          <h5
            className="wound-bed-review-order-content-title"
            data-testid="slough"
          >
            White, grey, yellow, or brown non-viable tissue
          </h5>
        </Grid>
        <Grid className="wound-bed-review-order-grid-item" item xs={1}>
          <h5
            className="wound-bed-review-order-content-value"
            data-testid="slough-value"
          >
            {getDigits(woundInfoData.sloughValue.value)}
          </h5>
        </Grid>
        <Grid className="wound-bed-review-order-grid-item" item xs={7}>
          <h5
            className="wound-bed-review-order-content-title"
            data-testid="eschar"
          >
            Black eschar
          </h5>
        </Grid>
        <Grid className="wound-bed-review-order-grid-item" item xs={1}>
          <h5
            className="wound-bed-review-order-content-value"
            data-testid="eschar-value"
          >
            {getDigits(woundInfoData.escharValue.value)}
          </h5>
        </Grid>
        <Grid className="wound-bed-review-order-grid-item" item xs={7}>
          <h5
            className="wound-bed-review-order-total-title"
            data-testid="wound-bed-total"
          >
            Total percentage of wound described
          </h5>
        </Grid>
        <Grid className="wound-bed-review-order-grid-item" item xs={1}>
          <h5
            className="wound-bed-review-order-total-value"
            data-testid="wound-bed-total-value"
          >
            {getDigits(woundInfoData.woundBedTotal.value)}
          </h5>
        </Grid>
      </Grid>
    </div>
  );
};
