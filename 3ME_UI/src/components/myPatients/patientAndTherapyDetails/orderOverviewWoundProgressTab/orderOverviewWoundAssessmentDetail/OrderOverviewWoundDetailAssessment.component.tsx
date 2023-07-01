import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import "./orderOverviewWoundAssessmentDetail.css";
import Moment from "moment";
import { useEffect, useState } from "react";
import greendownarrow from "../../../../../assets/greendownarrow.png";
import reduparrow from "../../../../../assets/reduparrow.png";
import { ExpandMoreIcon } from "../../../../../core/radioDropdown/radioDropdown.style";
import {
  IWoundAssesments,
  IWoundAssesmentsMap,
  IWoundDetail,
} from "../../orderOverview/orderOverview.interface";
import { ReactComponent as DownarrowImage } from "../../../../../assets/DownarrowImage.svg";
import { TherapyStatus } from "../../orderOverview/orderOverviewContainer.enum";
import { ImageWindowViewer } from "./imageViewer.component";
import "./orderOverviewWoundAssessmentDetail.css";
import { OrderOverviewWoundSummaryReview } from "./orderOverviewWoundSummaryReview/orderOverviewWoundSummaryReview.component";
import { mapWoundDetails } from "../../orderOverview/orderOverviewResponseMapper";

type Props = {
  woundAssessmentDetails: IWoundDetail;
};

export const OrderOverviewWoundDetailAssessment = ({
  woundAssessmentDetails,
}: Props) => {
  const [assesmentList, setAssesmentList] = useState<IWoundAssesments[]>([]);
  useEffect(() => {
    if (woundAssessmentDetails?.assessments) {
      const res = mapWoundDetails(woundAssessmentDetails?.assessments);
      setAssesmentList(res);
    }
  }, [woundAssessmentDetails]);

  return (
    <div className="woundAssessment-main" data-testid="woundAssessment-main">
      <Box>
        <div
          className="woundAssessment-header"
          data-testid="woundAssessment-header"
        >
          <h4>Wound Assessments</h4>
        </div>

        {Array.isArray(assesmentList) &&
          assesmentList?.map((item: any, index: number) => (
            <div className="accordation-div">
              <>
                <Accordion>
                  <AccordionSummary
                    className="accr"
                    expandIcon={<DownarrowImage className="expandIcon" />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className="accr">
                      <Grid container spacing={2} className="btnGridMain">
                        <Grid item xs={4}>
                          <div className="main-div">
                            <div
                              className="assessed-on-lable"
                              data-testid="assessed-on-lable"
                            >
                              Assessed on{" "}
                              <span className="assessedDate">
                                {item.evaluationDate
                                  ? Moment.utc(item.evaluationDate)
                                      .local()
                                      .format("ll")
                                  : null}
                              </span>
                            </div>

                            {woundAssessmentDetails && (
                              <div className="volumeCalc">
                                <div
                                  className="hyphen-class"
                                  data-testid="assessedVolume"
                                >
                                  {item.volume === null ? "___" : item.volume}
                                </div>
                                <div
                                  className={
                                    item.volume === null
                                      ? "volumecube"
                                      : "volumeSpace"
                                  }
                                  data-testid="assessedVolume"
                                >
                                  <span>cm³</span>
                                </div>
                                <div>
                                  {item.volumeDifference ? (
                                    item.volumeDifference < 0 ? (
                                      <img
                                        className="arrowSpace"
                                        data-testid="greenarrow-image"
                                        src={greendownarrow}
                                        alt=""
                                      />
                                    ) : (
                                      <img
                                        className="arrowSpace"
                                        data-testid="reduparrow-image"
                                        src={reduparrow}
                                        alt=""
                                      />
                                    )
                                  ) : !item.volumeDifference && index === 0 ? (
                                    <div className="hypen" data-testid="hypen">
                                      ___
                                    </div>
                                  ) : (
                                    <div className="hypen"></div>
                                  )}
                                </div>
                              </div>
                            )}

                            <div
                              className={
                                item?.volumeDifference === 0 ||
                                !item.volumeDifference
                                  ? "noChangeVolume"
                                  : "increaseDecreseVolume"
                              }
                              data-testid="increasedVolume"
                            >
                              {item.volumeDifference
                                ? item.volumeDifference < 0
                                  ? "Decrease in Volume"
                                  : "Increase in Volume"
                                : item.volumeDifference === 0
                                ? "No change in volume"
                                : !item.volumeDifference && index === 0
                                ? "Initial Measurement"
                                : ""}
                            </div>
                          </div>
                        </Grid>
                        <Grid item xs={0.3}>
                          {item.status === TherapyStatus.CONTINUE && (
                            <div className="greencircle"></div>
                          )}
                          {item.status === TherapyStatus.ONHOLD && (
                            <div className="yellowcircle"></div>
                          )}
                          {item.status === TherapyStatus.DISCONTINUE && (
                            <div className="redcircle"></div>
                          )}
                        </Grid>
                        <Grid item xs={1.7}>
                          <div
                            className="therapy-status"
                            data-testid="therapy-status"
                          >
                            {item.status}
                          </div>
                        </Grid>

                        <Grid item xs={6}>
                          <div
                            className="wound-image-div"
                            data-testid="wound-image-div"
                          >
                            <ImageWindowViewer
                              Images={item.images}
                              woundAssessmentDate={item.evaluationDate}
                            />
                          </div>
                        </Grid>
                      </Grid>
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      <OrderOverviewWoundSummaryReview
                        assesmentDetails={item}
                        assesmentType={woundAssessmentDetails?.assessmentType!}
                        index={index}
                      />
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </>
            </div>
          ))}
      </Box>
    </div>
  );
};
