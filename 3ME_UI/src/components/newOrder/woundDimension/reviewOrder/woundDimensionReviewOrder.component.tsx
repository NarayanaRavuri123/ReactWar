import moment from "moment";
import { isNaN } from "underscore";
import "./woundDimensionReviewOrder.css";
import {
  formatedWoundValue,
  makeCapitalEachWordInString,
} from "../../../../util/utilityFunctions";
import { Button, Grid } from "@mui/material";
import { IWoundDimensionReviewOrder } from "./woundDimensionReviewOrder.interface";

export const WoundDimensionReviewOrder = ({
  editButtonClicked,
  isOrderSummary,
  woundInfoData,
}: IWoundDimensionReviewOrder) => {
  const getWoundVolume = (): string => {
    const lengthValue = woundInfoData.woundLength.value;
    const widthValue = woundInfoData.woundWidth.value;
    const depthValue = woundInfoData.woundDepth.value;
    if (
      isNaN(parseFloat(lengthValue)) ||
      isNaN(parseFloat(widthValue)) ||
      isNaN(parseFloat(depthValue))
    ) {
      return "--";
    }
    const length = parseFloat(lengthValue);
    const width = parseFloat(widthValue);
    const depth = parseFloat(depthValue);
    const volume = (length * width * depth).toFixed(1);
    return `${formatedWoundValue(volume.toString())} cm³`;
  };

  return (
    <div className="wound-dimensions-review-order">
      <div className="wound-dimensions-review-order-header">
        <h2
          className={`wound-dimensions-review-order-title${
            woundInfoData.woundThickness ? "" : " order-overview"
          }`}
          data-testid="wound-dimensions-review-order-title"
        >
          Wound Dimensions
        </h2>
        {!isOrderSummary && (
          <Button
            classes={{ root: "wound-dimensions-review-order-edit-button" }}
            data-testid="wound-dimensions-review-order-edit-button"
            onClick={editButtonClicked}
          >
            Edit
          </Button>
        )}
      </div>
      <Grid
        className="wound-dimensions-review-order-grid-container"
        container
        spacing={2}
      >
        <Grid className="wound-dimensions-review-order-grid-item" item xs={12}>
          <h5
            className="wound-dimensions-review-order-content-title"
            data-testid="wound-measurement-date"
          >
            Wound Measurement Date
          </h5>
          <h5
            className="wound-dimensions-review-order-content-value"
            data-testid="wound-measurement-date-value"
          >
            {woundInfoData.woundMeasurementDate.value !== "" &&
            woundInfoData.woundMeasurementDate.value !== "--"
              ? moment(woundInfoData.woundMeasurementDate.value).format(
                  "MM/DD/YYYY"
                )
              : "--"}
          </h5>
        </Grid>
        <Grid className="wound-dimensions-review-order-grid-item" item xs={3}>
          <h5
            className="wound-dimensions-review-order-content-title"
            data-testid="wound-length"
          >
            Length
          </h5>
          <h5
            className="wound-dimensions-review-order-content-value"
            data-testid="wound-length-value"
          >
            {formatedWoundValue(woundInfoData.woundLength.value) === ""
              ? "--"
              : `${formatedWoundValue(woundInfoData.woundLength.value)} cm`}
          </h5>
        </Grid>
        <Grid className="wound-dimensions-review-order-grid-item" item xs={3}>
          <h5
            className="wound-dimensions-review-order-content-title"
            data-testid="wound-width"
          >
            Width
          </h5>
          <h5
            className="wound-dimensions-review-order-content-value"
            data-testid="wound-width-value"
          >
            {formatedWoundValue(woundInfoData.woundWidth.value) === ""
              ? "--"
              : `${formatedWoundValue(woundInfoData.woundWidth.value)} cm`}
          </h5>
        </Grid>
        <Grid className="wound-dimensions-review-order-grid-item" item xs={3}>
          <h5
            className="wound-dimensions-review-order-content-title"
            data-testid="wound-depth"
          >
            Depth
          </h5>
          <h5
            className="wound-dimensions-review-order-content-value"
            data-testid="wound-depth-value"
          >
            {formatedWoundValue(woundInfoData.woundDepth.value) === ""
              ? "--"
              : `${formatedWoundValue(woundInfoData.woundDepth.value)} cm`}
          </h5>
        </Grid>
        <Grid className="wound-dimensions-review-order-grid-item" item xs={3}>
          <h5
            className="wound-dimensions-review-order-content-title"
            data-testid="wound-volume"
          >
            Volume
          </h5>
          <h5
            className="wound-dimensions-review-order-content-value"
            data-testid="wound-volume-value"
          >
            {getWoundVolume()}
          </h5>
        </Grid>
        {woundInfoData.woundThickness && (
          <Grid
            className="wound-dimensions-review-order-grid-item"
            item
            xs={12}
          >
            <h5
              className="wound-dimensions-review-order-content-title"
              data-testid="wound-thickness"
            >
              Is the wound full thickness?
            </h5>
            <h5
              className="wound-dimensions-review-order-content-value"
              data-testid="wound-thickness-value"
            >
              {woundInfoData.woundThickness.value &&
              woundInfoData.woundThickness.value !== ""
                ? makeCapitalEachWordInString(
                    woundInfoData.woundThickness.value
                  )
                : "--"}
            </h5>
          </Grid>
        )}
      </Grid>
    </div>
  );
};
