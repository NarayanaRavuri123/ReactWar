import "./osteomyelitisReviewOrder.css";
import { Button, Grid } from "@mui/material";
import { makeCapitalEachWordInString } from "../../../../util/utilityFunctions";
import { IOsteomyelitisReviewOrder } from "./osteomyelitisReviewOrder.interface";

export const OsteomyelitisReviewOrder = ({
  editButtonClicked,
  isOrderSummary,
  woundInfoData,
}: IOsteomyelitisReviewOrder) => {
  const getOsteomyelitisies = (): string => {
    let output = woundInfoData.osteomyelitisies.value
      .filter((x: any) => x.selected)
      .map(
        (x: any) => `${x.label} ${x.textBoxValue ? `- ${x.textBoxValue}` : ""}`
      )
      .join(", ");
    return output.length > 0 ? output : "--";
  };

  return (
    <div className="osteomyelitis-review-order">
      <div className="osteomyelitis-review-order-header">
        <h2
          className="osteomyelitis-review-order-title"
          data-testid="osteomyelitis-review-order-title"
        >
          Osteomyelitis
        </h2>
        {!isOrderSummary && (
          <Button
            classes={{ root: "osteomyelitis-review-order-edit-button" }}
            data-testid="osteomyelitis-review-order-edit-button"
            onClick={editButtonClicked}
          >
            Edit
          </Button>
        )}
      </div>
      <Grid
        className="osteomyelitis-review-order-grid-container"
        container
        spacing={2}
      >
        <Grid className="osteomyelitis-review-order-grid-item" item xs={12}>
          <h5
            className="osteomyelitis-review-order-content-title"
            data-testid="osteomyelitis-is-present"
          >
            Is osteomyelitis present in the wound?
          </h5>
          <h5
            className="osteomyelitis-review-order-content-value"
            data-testid="osteomyelitis-is-present-value"
          >
            {makeCapitalEachWordInString(
              woundInfoData.isOsteomyelitisPresent.value !== ""
                ? woundInfoData.isOsteomyelitisPresent.value
                : "--"
            )}
          </h5>
        </Grid>
        {woundInfoData.isOsteomyelitisPresent.value === "Yes" && (
          <>
            <Grid className="osteomyelitis-review-order-grid-item" item xs={12}>
              <h5
                className="osteomyelitis-review-order-content-title"
                data-testid="indicate-treatment-regimen"
              >
                Indicate Treatment Regimen
              </h5>
              <h5
                className="osteomyelitis-review-order-content-value"
                data-testid="indicate-treatment-regimen-value"
              >
                {getOsteomyelitisies()}
              </h5>
            </Grid>
            <Grid className="osteomyelitis-review-order-grid-item" item xs={12}>
              <h5
                className="osteomyelitis-review-order-content-title"
                data-testid="is-treatement-for-resolve-bone-infection"
              >
                Is the above treatment administered to the patient with the
                intention to completely resolve the underlying bone infection?
              </h5>
              <h5
                className="osteomyelitis-review-order-content-value"
                data-testid="is-treatement-for-resolve-bone-infection-value"
              >
                {makeCapitalEachWordInString(
                  woundInfoData.isTreatemenForResolveBoneInfection.value
                )}
              </h5>
            </Grid>
          </>
        )}
      </Grid>
    </div>
  );
};
