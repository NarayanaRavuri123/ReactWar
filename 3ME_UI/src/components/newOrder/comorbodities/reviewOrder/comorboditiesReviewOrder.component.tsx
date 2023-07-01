import "./comorboditiesReviewOrder.css";
import { useEffect, useState } from "react";
import { Button, Grid } from "@mui/material";
import { IComorboditiesReviewOrder } from "./comorboditiesReviewOrder.interface";

export const ComorboditiesReviewOrder = ({
  editButtonClicked,
  isOrderSummary,
  woundInfoData,
}: IComorboditiesReviewOrder) => {
  const [isComorbiditiesHasOther, setIsComorbiditiesHasOther] =
    useState<boolean>(false);

  const getComorbidities = (): string => {
    let output = woundInfoData.wndInfoComorbidities.value
      .filter((x: any) => x.selected)
      .map((x: any) => x.label)
      .join(", ");
    return output.length > 0 ? output : "--";
  };

  const checkComorbiditiesHasOther = () => {
    let other = woundInfoData.wndInfoComorbidities.value.filter(
      (x: any) => x.selected && x.label.toLowerCase() === "other"
    );
    setIsComorbiditiesHasOther(other.length > 0);
  };

  useEffect(() => {
    checkComorbiditiesHasOther();
  }, []);

  return (
    <div className="comorbodities-review-order">
      <div className="comorbodities-review-order-header">
        <h2
          className="comorbodities-review-order-title"
          data-testid="comorbodities-review-order-title"
        >
          Comorbidities
        </h2>
        {!isOrderSummary && (
          <Button
            classes={{ root: "comorbodities-review-order-edit-button" }}
            data-testid="comorbodities-review-order-edit-button"
            onClick={editButtonClicked}
          >
            Edit
          </Button>
        )}
      </div>
      <Grid
        className="comorbodities-review-order-grid-container"
        container
        spacing={2}
      >
        <Grid
          className="comorbodities-review-order-grid-item"
          item
          xs={isComorbiditiesHasOther ? 6 : 12}
        >
          <h5
            className="comorbodities-review-order-content-title"
            data-testid="applicable-comorbidities"
          >
            Applicable comorbidities
          </h5>
          <h5
            className="comorbodities-review-order-content-value"
            data-testid="applicable-comorbidities-value"
          >
            {getComorbidities()}
          </h5>
        </Grid>
        {isComorbiditiesHasOther && (
          <Grid className="comorbodities-review-order-grid-item" item xs={6}>
            <h5
              className="comorbodities-review-order-content-title"
              data-testid="applicable-comorbidities-other"
            >
              If other
            </h5>
            <h5
              className="comorbodities-review-order-content-value"
              data-testid="applicable-comorbidities-other-value"
            >
              {woundInfoData.wndInfoComorbiditiesOther.value}
            </h5>
          </Grid>
        )}
      </Grid>
    </div>
  );
};
