import "./nutritionReviewOrder.css";
import { Button, Grid } from "@mui/material";
import { INutritionReviewOrder } from "./nutritionReviewOrder.interface";
import { makeCapitalEachWordInString } from "../../../../util/utilityFunctions";
import { MultipleActionsProps } from "../../newOrderWoundInfoStepper/newOrderWoundInfo.interface";

export const NutritionReviewOrder = ({
  editButtonClicked,
  isOrderSummary,
  woundInfoData,
}: INutritionReviewOrder) => {
  return (
    <div className="nutrition-review-order">
      <div className="nutrition-review-order-header">
        <h2
          className="nutrition-review-order-title"
          data-testid="nutrition-review-order-title"
        >
          Nutrition
        </h2>
        {!isOrderSummary && (
          <Button
            classes={{ root: "nutrition-review-order-edit-button" }}
            data-testid="nutrition-review-order-edit-button"
            onClick={editButtonClicked}
          >
            Edit
          </Button>
        )}
      </div>
      <Grid
        className="nutrition-review-order-grid-container"
        container
        spacing={2}
      >
        <Grid className="nutrition-review-order-grid-item" item xs={12}>
          <h5
            className="nutrition-review-order-content-title"
            data-testid="nutritional-status"
          >
            Is the patient’s nutritional status compromised?
          </h5>

          <h5
            className="nutrition-review-order-content-value"
            data-testid="nutritional-status-value"
          >
            {makeCapitalEachWordInString(
              woundInfoData.nutriStatusCompromized.value !== ""
                ? woundInfoData.nutriStatusCompromized.value
                : "--"
            )}
          </h5>
        </Grid>
        {woundInfoData.nutriStatusCompromized.value.toLowerCase() === "yes" && (
          <Grid className="nutrition-review-order-grid-item" item xs={12}>
            <h5
              className="nutrition-review-order-content-title"
              data-testid="nutrition-actions"
            >
              Action taken to address nutritional status
            </h5>
            <h5
              className="nutrition-review-order-content-value"
              data-testid="nutrition-actions-value"
            >
              {woundInfoData.nutritionActions.value
                .filter((act: MultipleActionsProps) => act.selected)
                .map((act: MultipleActionsProps) => act.label)
                .join(", ")}
            </h5>
          </Grid>
        )}
      </Grid>
    </div>
  );
};
