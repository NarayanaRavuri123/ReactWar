import "./woundTunnelingReviewOrder.css";
import {
  formatYesOrNo,
  formatedWoundValue,
  makeCapitalEachWordInString,
} from "../../../../util/utilityFunctions";
import { Button, Grid } from "@mui/material";
import { IWoundTunnelingReviewOrder } from "./woundTunnelingReviewOrder.interface";

export const WoundTunnelingReviewOrder = ({
  editButtonClicked,
  isOrderSummary,
  woundInfoData,
  isWoundAssessmentSummary,
  isComingFromOrderOverview = false,
}: IWoundTunnelingReviewOrder | any) => {
  return (
    <div className="wound-tunneling-review-order">
      <div className="wound-tunneling-review-order-header">
        <h2
          className="wound-tunneling-review-order-title"
          data-testid="wound-tunneling-review-order-title"
        >
          Wound Tunneling
        </h2>
        {!isOrderSummary && !isWoundAssessmentSummary && (
          <Button
            classes={{ root: "wound-tunneling-review-order-edit-button" }}
            data-testid="wound-tunneling-review-order-edit-button"
            onClick={editButtonClicked}
          >
            Edit
          </Button>
        )}
      </div>
      <Grid
        className="wound-tunneling-review-order-grid-container"
        container
        spacing={2}
      >
        <Grid className="wound-tunneling-review-order-grid-item" item xs={12}>
          <h5
            className="wound-tunneling-review-order-content-title"
            data-testid="wound-tunneling-present"
          >
            Tunneling Present
          </h5>
          <h5
            className="wound-tunneling-review-order-content-value"
            data-testid="wound-tunneling-present-value"
          >
            {woundInfoData.woundTunneling.value !== ""
              ? formatYesOrNo(woundInfoData.woundTunneling.value)
              : "--"}
          </h5>
        </Grid>
        {woundInfoData.woundTunneling.value === "Yes" && (
          <>
            <Grid
              className="wound-tunneling-review-order-grid-item"
              item
              xs={6}
            >
              <h5
                className="wound-tunneling-review-order-content-title"
                data-testid="wound-location-1-tunneling"
              >
                Location 1 Tunneling
              </h5>
              {isComingFromOrderOverview ? (
                <h5
                  className="wound-tunneling-review-order-content-value"
                  data-testid="wound-location-1-tunneling-value"
                >
                  {woundInfoData.location1Depth.value &&
                  woundInfoData.location1Depth.value !== "--"
                    ? `${formatedWoundValue(
                        woundInfoData.location1Depth.value
                      )} cm ${
                        woundInfoData.location1Position.value &&
                        woundInfoData.location1Position.value !== "--"
                          ? `at ${woundInfoData.location1Position.value}  o’clock`
                          : "--"
                      }`
                    : "--"}
                </h5>
              ) : (
                <h5
                  className="wound-tunneling-review-order-content-value"
                  data-testid="wound-location-1-tunneling-value"
                >
                  {woundInfoData.location1Depth.value &&
                  woundInfoData.location1Depth.value !== "--"
                    ? `${formatedWoundValue(
                        woundInfoData.location1Depth.value
                      )} cm ${
                        woundInfoData.location1Position.value &&
                        woundInfoData.location1Position.value !== "--"
                          ? `at ${
                              woundInfoData.location1Position.value.split(
                                ":"
                              )[0]
                            }  o’clock`
                          : "--"
                      }`
                    : "--"}
                </h5>
              )}
            </Grid>
            <Grid
              className="wound-tunneling-review-order-grid-item"
              item
              xs={6}
            >
              <h5
                className="wound-tunneling-review-order-content-title"
                data-testid="wound-location-2-tunneling"
              >
                Location 2 Tunneling
              </h5>
              {isComingFromOrderOverview ? (
                <h5
                  className="wound-tunneling-review-order-content-value"
                  data-testid="wound-location-2-tunneling-value"
                >
                  {woundInfoData.location2Depth.value &&
                  woundInfoData.location2Depth.value !== "--"
                    ? `${formatedWoundValue(
                        woundInfoData.location2Depth.value
                      )} cm ${
                        woundInfoData.location2Position.value &&
                        woundInfoData.location2Position.value !== "--"
                          ? `at ${woundInfoData.location2Position.value}  o’clock`
                          : "--"
                      }`
                    : "--"}
                </h5>
              ) : (
                <h5
                  className="wound-tunneling-review-order-content-value"
                  data-testid="wound-location-2-tunneling-value"
                >
                  {woundInfoData.location2Depth.value &&
                  woundInfoData.location2Depth.value !== "--"
                    ? `${formatedWoundValue(
                        woundInfoData.location2Depth.value
                      )} cm ${
                        woundInfoData.location2Position.value &&
                        woundInfoData.location2Position.value !== "--"
                          ? `at ${
                              woundInfoData.location2Position.value.split(
                                ":"
                              )[0]
                            }  o’clock`
                          : "--"
                      }`
                    : "--"}
                </h5>
              )}
            </Grid>
          </>
        )}
      </Grid>
    </div>
  );
};
