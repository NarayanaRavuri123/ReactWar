import "./exposedStructuresReviewOrder.css";
import { Button, Grid } from "@mui/material";
import { IExposedStructuresReviewOrder } from "./exposedStructuresReviewOrder.interface";

export const ExposedStructuresReviewOrder = ({
  editButtonClicked,
  isOrderSummary,
  woundInfoData,
}: IExposedStructuresReviewOrder) => {
  const getExposedStructures = (): string => {
    const output = woundInfoData.exposedStructures.value
      .filter((x: any) => x.selected)
      .map((x: any) => x.label)
      .join(", ");
    return output === "" ? "--" : output;
  };

  return (
    <div className="exposed-structures-review-order">
      <div className="exposed-structures-review-order-header">
        <h2
          className="exposed-structures-review-order-title"
          data-testid="exposed-structures-review-order-title"
        >
          Exposed Structures
        </h2>
        {!isOrderSummary && (
          <Button
            classes={{ root: "exposed-structures-review-order-edit-button" }}
            data-testid="exposed-structures-review-order-edit-button"
            onClick={editButtonClicked}
          >
            Edit
          </Button>
        )}
      </div>
      <Grid
        className="exposed-structures-review-order-grid-container"
        container
        spacing={2}
      >
        <Grid
          className="exposed-structures-review-order-grid-item"
          item
          xs={12}
        >
          <h5
            className="exposed-structures-review-order-content-title"
            data-testid="exposed-structures"
          >
            Exposed Structures
          </h5>
          <h5
            className="exposed-structures-review-order-content-value"
            data-testid="exposed-structures-value"
          >
            {getExposedStructures()}
          </h5>
        </Grid>
      </Grid>
    </div>
  );
};
