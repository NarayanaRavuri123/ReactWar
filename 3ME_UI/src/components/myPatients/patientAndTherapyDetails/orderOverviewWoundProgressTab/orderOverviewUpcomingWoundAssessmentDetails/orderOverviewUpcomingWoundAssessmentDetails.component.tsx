import { Grid } from "@mui/material";
import moment from "moment";
import { WoundDetails, WoundListDetail } from "../WoundProgressTab.interface";
import "./orderOverviewUpcomingWoundAssessmentDetails.css";
import { getSeverity } from "../../../../../util/alertFunctions";
import { ISeverityTypes } from "../../../patient.interface";
type Props = {
  woundDetails: WoundDetails | undefined;
  selectedWoundId: string | null;
  woundIndex?: string | null;
  upcomingCycle?: any;
  pendingCycle?: any;
};
const OrderOverviewUpcomingWoundAssessmentDetails = ({
  woundDetails,
  selectedWoundId,
  woundIndex,
  upcomingCycle,
  pendingCycle,
}: Props) => {
  // Filter pendingCycle based on severity
  const filteredPendingCycle = pendingCycle?.filter((item: any) => {
    const from = moment(item.from);
    const to = moment(item.to);
    const severity = getSeverity(from.toDate(), to.toDate());
    return (
      severity === ISeverityTypes.MEDIUM || severity === ISeverityTypes.LOW
    );
  });

  const upcomingAssessment = pendingCycle
    ? [...filteredPendingCycle, ...upcomingCycle]
    : upcomingCycle;

  return (
    <>
      <div className="orderOverviewWoundProgress-container">
        <Grid container className="wound-assessment-detail-tab-container">
          {woundDetails &&
            selectedWoundId &&
            woundDetails?.wounds
              .filter(
                (item: any) => item.id.toString() === selectedWoundId.toString()
              )
              .map((woundDetail: WoundListDetail, index: number) => {
                return (
                  <Grid
                    item
                    xs={12}
                    className="wound-assessment-detail-tab-item"
                  >
                    <div className={`wound-assessment-detail-tab-parent-div`}>
                      <h5
                        className="wound-assessment-details-tab-wound-number-heading"
                        data-testid="wound-assessment-details-tab-wound-number-heading"
                      >
                         {`Wound ${woundIndex ? ` #${woundIndex} ` : ""}Detail`}
                      </h5>
                      <p
                        className="wound-assessment-details-tab-wound-location"
                        data-testid="wound-assessment-details-tab-wound-location"
                      >
                        {`${
                          woundDetail.location === null
                            ? "--,"
                            : `${woundDetail.location},`
                        } ${
                          woundDetail.direction === null
                            ? "--"
                            : woundDetail.direction
                        } ${
                          woundDetail.orientation === null
                            ? "--"
                            : woundDetail.orientation
                        }`}
                      </p>
                      <p
                        className="wound-assessment-details-tab-wound-type"
                        data-testid="wound-assessment-details-tab-wound-type"
                      >
                        {woundDetail.type === null ? "--" : woundDetail.type}
                      </p>
                      <p
                        className="wound-assessment-details-tab-wound-assessed-on"
                        data-testid="wound-assessment-details-tab-wound-assessed-on"
                      >
                        {`Last Assessed on ${
                          woundDetail.evaluationDate === null
                            ? "--"
                            : moment(woundDetail.evaluationDate).format(
                                "MMM DD, yyyy"
                              )
                        }`}
                      </p>
                    </div>
                  </Grid>
                );
              })}
        </Grid>
        <>
          {upcomingAssessment && upcomingAssessment.length > 0 && (
            <>
              <h5
                className="upcoming-assessment-title"
                data-testid="upcoming-assessment-title-text"
              >
                Upcoming Assessments
              </h5>
              <Grid
                container
                className="wound-assessment-detail-tab-container"
                data-testid="upcoming-assessment-container"
              >
                <UpcomingAssessmentAlert alertData={upcomingAssessment} />
              </Grid>
            </>
          )}
        </>
      </div>
    </>
  );
};
export default OrderOverviewUpcomingWoundAssessmentDetails;
type UpcomingAlertProps = {
  alertData: {
    from: string;
    to: string;
  }[];
};

export const UpcomingAssessmentAlert = ({ alertData }: UpcomingAlertProps) => {
  return (
    <>
      <div
        className="upcoming-assessment-box-buttons-container"
        data-testid="upcoming-assessment-date"
      >
        {alertData.map((data, index) => {
          const fromDate = new Date(data.from);
          const toDate = new Date(data.to);

          const formattedFromDate = fromDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });

          const formattedToDate = toDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });

          return (
            <div key={index} className="upcoming-assessment-box">
              <div className="upcoming-assessment-box-headingtext">
                {formattedFromDate} - {formattedToDate}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
