import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { getDeepClone } from "../../../../../../util/ObjectFunctions";
import { WoundTunnelingReviewOrder } from "../../../../../newOrder/woundTunneling/reviewOrder/woundTunnelingReviewOrder.component";
import { IWoundAssesments } from "../../../orderOverview/orderOverview.interface";
import { mapWoundDetailsToAddWoundAssesmentType } from "../../../orderOverview/orderOverviewResponseMapper";
import { IAddWoundAssessment } from "../../../woundProgress/addWoundAssessment/addWoundAssessment.interface";
import ReviewWoundExposedStructures from "../../../woundProgress/addWoundAssessment/exposedWoundStructures/reviewWoundExposedStructures/reviewWoundExposedStructures.component";
import ReviewHoldOrHospitalization from "../../../woundProgress/addWoundAssessment/holdOrHospitalization/reviewHoldOrHospitalization/reviewHoldOrHospitalization.component";
import ReviewWoundComorbidities from "../../../woundProgress/addWoundAssessment/woundAssessComorbidities/reviewWoundAssessmentComorbidities/reviewWoundAssessmentComorbidities.component";
import ReviewWoundAssessmentBed from "../../../woundProgress/addWoundAssessment/woundAssessmentBed/reviewWoundAssessmentBed/reviewWoundAssessmentBed.component";
import { WoundAssessmentType } from "../../../woundProgress/addWoundAssessment/woundAssessmentPageSection.enum";
import ReviewWoundAssessor from "../../../woundProgress/addWoundAssessment/woundAssessor/reviewWoundAssessor/reviewWoundAssessor.component";
import ReviewWoundDebridement from "../../../woundProgress/addWoundAssessment/woundDebridement/reviewWoundDebridement/reviewWoundDebridement.component";
import ReviewWoundExudate from "../../../woundProgress/addWoundAssessment/woundExudate/reviewWoundExudate/reviewWoundExudate.component";
import ReviewWoundMeasurement from "../../../woundProgress/addWoundAssessment/woundMeasurement/reviewWoundMeasurement/reviewWoundMeasurement.component";
import ReviewWoundMeasurementEschar from "../../../woundProgress/addWoundAssessment/woundMeasurementEschar/reviewWoundMeasurementEschar/reviewWoundMeasurementEschar.component";
import ReviewWoundTherapyStatus from "../../../woundProgress/addWoundAssessment/woundTherapyStatus/reviewWoundTherapyStatus/reviewWoundTherapyStatus.component";
import "./orderOverviewWoundSummaryReview.css";
import OrderOverviewReviewWoundUndermining from "./orderOverviewReviewWoundUndermining.component";

type Props = {
  assesmentDetails: IWoundAssesments;
  assesmentType: string;
  index: number;
};

export const OrderOverviewWoundSummaryReview = ({
  assesmentDetails,
  assesmentType,
  index,
}: Props) => {
  const [woundDebridementTypeCode, setWoundDebridementTypeCode] = useState([]);
  const [data, setData] = useState<IAddWoundAssessment>();
  useEffect(() => {
    callMapperToMapWoundData();
  }, []);

  const callMapperToMapWoundData = async () => {
    let mappedWoundObject: IAddWoundAssessment =
      await mapWoundDetailsToAddWoundAssesmentType(assesmentDetails);
    setData(getDeepClone(mappedWoundObject));
  };

  const assessmentTypeBasedFlow = () => {
    if (index === 0) {
      return (
        <Grid
          className="order-overview-wound-summary-review-grid-container"
          container
        >
          <Grid className="order-overview-wound-summary-review-grid-item" item>
            <ReviewWoundMeasurement
              data={data!}
              editButtonClicked={false}
              isWoundAssessmentSummary={true}
            />
          </Grid>
          <Grid className="order-overview-wound-summary-review-grid-item" item>
            <ReviewWoundMeasurementEschar
              data={data!}
              editButtonClicked={false}
              isWoundAssessmentSummary={true}
            />
          </Grid>
          <Grid
            className="order-overview-wound-summary-review-grid-item"
            item
            xs={6}
          >
            <ReviewWoundDebridement
              data={data!}
              editButtonClicked={false}
              woundDebridementTypeCode={woundDebridementTypeCode}
              isWoundAssessmentSummary={true}
            />
            <ReviewWoundExudate
              data={data!}
              exudateAppearanceData={data?.exudateAppearance}
              exudateAmountData={data?.exudateAmount}
              editButtonClicked={false}
              isWoundAssessmentSummary={true}
            />
            <OrderOverviewReviewWoundUndermining
              data={data!}
              editButtonClicked={false}
              isWoundAssessmentSummary={true}
            />
            <WoundTunnelingReviewOrder
              editButtonClicked={false}
              isOrderSummary={true}
              woundInfoData={data}
              isWoundAssessmentSummary={true}
              isComingFromOrderOverview={true}
            />
            <ReviewWoundExposedStructures
              data={data!}
              editButtonClicked={false}
              isWoundAssessmentSummary={true}
            />
            <ReviewWoundComorbidities
              data={data!}
              editButtonClicked={false}
              isWoundAssessmentSummary={true}
            />
          </Grid>
        </Grid>
      );
    } else if (index > 0 && data && data?.woundTherapyStatus.value === "") {
      return (
        <Grid
          className="order-overview-wound-summary-review-grid-container"
          container
        >
          <Grid className="order-overview-wound-summary-review-grid-item" item>
            <ReviewWoundTherapyStatus
              data={data}
              editButtonClicked={false}
              isWoundAssessmentSummary={true}
            />
            <ReviewWoundMeasurementEschar
              data={data!}
              editButtonClicked={false}
              isWoundAssessmentSummary={true}
            />
          </Grid>
          <Grid
            className="order-overview-wound-summary-review-grid-item"
            item
            xs={6}
          >
            <ReviewWoundDebridement
              data={data!}
              editButtonClicked={false}
              woundDebridementTypeCode={woundDebridementTypeCode}
              isWoundAssessmentSummary={true}
            />
            <ReviewWoundExudate
              data={data!}
              exudateAppearanceData={data?.exudateAppearance}
              exudateAmountData={data?.exudateAmount}
              editButtonClicked={false}
              isWoundAssessmentSummary={true}
            />
            <OrderOverviewReviewWoundUndermining
              data={data!}
              editButtonClicked={false}
              isWoundAssessmentSummary={true}
            />
            <WoundTunnelingReviewOrder
              editButtonClicked={false}
              isOrderSummary={true}
              woundInfoData={data}
              isWoundAssessmentSummary={true}
              isComingFromOrderOverview={true}
            />
            <ReviewWoundExposedStructures
              data={data!}
              editButtonClicked={false}
              isWoundAssessmentSummary={true}
            />
            <ReviewWoundComorbidities
              data={data!}
              editButtonClicked={false}
              isWoundAssessmentSummary={true}
            />
          </Grid>
        </Grid>
      );
    } else if (assesmentType === WoundAssessmentType.MWP) {
      return (
        <>
          {data && data.woundTherapyStatus.value !== "" && (
            <>
              <Grid
                className="order-overview-wound-summary-review-grid-container"
                container
              >
                <Grid
                  className="order-overview-wound-summary-review-grid-item"
                  item
                >
                  <ReviewWoundTherapyStatus
                    data={data}
                    editButtonClicked={false}
                    isWoundAssessmentSummary={true}
                  />
                </Grid>

                <Grid
                  className="order-overview-wound-summary-review-grid-item"
                  item
                >
                  <ReviewWoundMeasurement
                    data={data}
                    editButtonClicked={false}
                    isWoundAssessmentSummary={true}
                  />
                </Grid>
              </Grid>
              {data.woundTherapyStatus.value === "yes" && (
                <>
                  <Grid
                    className="order-overview-wound-summary-review-grid-item"
                    item
                    xs={6}
                  >
                    <ReviewWoundMeasurementEschar
                      data={data}
                      editButtonClicked={false}
                      isWoundAssessmentSummary={true}
                    />
                  </Grid>

                  <Grid
                    className="order-overview-wound-summary-review-grid-item"
                    item
                    xs={6}
                  >
                    <ReviewHoldOrHospitalization
                      data={data}
                      editButtonClicked={false}
                      isWoundAssessmentSummary={true}
                    />
                  </Grid>
                  {data.resumptionMeasureStatus.value === "yes" && (
                    <Grid
                      className="order-overview-wound-summary-review-grid-item"
                      item
                      xs={6}
                    >
                      <ReviewWoundDebridement
                        data={data}
                        editButtonClicked={false}
                        woundDebridementTypeCode={woundDebridementTypeCode}
                        isWoundAssessmentSummary={true}
                      />
                    </Grid>
                  )}
                  <Grid
                    className="order-overview-wound-summary-review-grid-item"
                    item
                    xs={6}
                  ></Grid>
                </>
              )}
              <Grid
                className="order-overview-wound-summary-review-grid-item"
                item
                xs={6}
              >
                <ReviewWoundAssessor
                  data={data}
                  editButtonClicked={false}
                  isWoundAssessmentSummary={true}
                />
              </Grid>
            </>
          )}
        </>
      );
    } else {
      return (
        <>
          {data && data?.woundTherapyStatus.value !== "" && (
            <>
              <ReviewWoundTherapyStatus
                data={data}
                editButtonClicked={false}
                isWoundAssessmentSummary={true}
              />

              {data?.woundTherapyStatus.value !== "yes" && (
                <ReviewWoundMeasurement
                  data={data!}
                  editButtonClicked={false}
                  isWoundAssessmentSummary={true}
                />
              )}
              {data?.woundTherapyStatus.value === "yes" && (
                <>
                  <ReviewWoundDebridement
                    data={data}
                    editButtonClicked={false}
                    woundDebridementTypeCode={woundDebridementTypeCode}
                    isWoundAssessmentSummary={true}
                  />

                  <ReviewWoundMeasurement
                    data={data}
                    editButtonClicked={false}
                    isWoundAssessmentSummary={true}
                  />
                  <ReviewWoundMeasurementEschar
                    data={data}
                    editButtonClicked={false}
                    isWoundAssessmentSummary={true}
                  />
                  <ReviewWoundAssessmentBed
                    data={data}
                    editButtonClicked={false}
                    isWoundAssessmentSummary={true}
                  />
                  <ReviewWoundExudate
                    data={data}
                    exudateAppearanceData={data.exudateAppearance}
                    exudateAmountData={data.exudateAmount}
                    editButtonClicked={false}
                    isWoundAssessmentSummary={true}
                  />
                  <OrderOverviewReviewWoundUndermining
                    data={data}
                    editButtonClicked={false}
                    isWoundAssessmentSummary={true}
                  />
                  <WoundTunnelingReviewOrder
                    editButtonClicked={false}
                    isOrderSummary={true}
                    woundInfoData={data}
                    isWoundAssessmentSummary={true}
                    isComingFromOrderOverview={true}
                  />
                  <ReviewWoundExposedStructures
                    data={data}
                    editButtonClicked={false}
                    isWoundAssessmentSummary={true}
                  />
                  <ReviewWoundComorbidities
                    data={data}
                    editButtonClicked={false}
                    isWoundAssessmentSummary={true}
                  />
                  <ReviewHoldOrHospitalization
                    data={data}
                    editButtonClicked={false}
                    isWoundAssessmentSummary={true}
                  />
                </>
              )}
              <ReviewWoundAssessor
                data={data!}
                editButtonClicked={false}
                isWoundAssessmentSummary={true}
              />
            </>
          )}
        </>
      );
    }
  };

  return <>{data && assessmentTypeBasedFlow()}</>;
};
