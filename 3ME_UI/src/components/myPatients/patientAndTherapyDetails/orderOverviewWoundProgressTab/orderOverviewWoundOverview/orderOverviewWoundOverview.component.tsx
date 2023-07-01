import LineCharts from "../../customCharts/lineCharts.component";
import {
  IWoundAssesmentsMap,
  IWoundDetail,
} from "../../orderOverview/orderOverview.interface";
import "./orderOverviewWoundOverview.css";

type Props = {
  assesmentList: IWoundAssesmentsMap[];
  interval: number;
  woundAssessmentDetails?: IWoundDetail;
};
export const OrderOverviewWoundOverview = ({
  assesmentList,
  interval,
  woundAssessmentDetails,
}: Props) => {
  return (
    <div className="wound-overview-info-info">
      <div className="wound-overview-info-component-title">
        <h2
          className="wound-overview-info-info-title"
          data-testid="wound-overview-info-info-title"
        >
          Wound Overview
        </h2>
      </div>
      <div className="all-content-div-wound-info">
        <p
          className="wound-overview-info-info-content-title"
          data-testId="static-text-test-id-first"
        >
          <span className="class-bold">Note:</span> Information shown represents
          data collected by 3M Medical Solutions from multiple sources and
          health care professionals. Refer to the manufacturer's instructions
          for use and V.A.C.® Therapy Clinical Guidelines for guidance on
          therapy application. Information requested is required by Medicare,
          Medicaid, and/or private insurance.
        </p>
      </div>
      <div className="all-content-div-wound-info">
        <p
          className="wound-overview-info-info-content-title-last"
          data-testId="static-text-test-id-second"
        >
          This patient requires wound measurements be submitted monthly to
          justify the insurance billing process for a patient on V.A.C.®
          Therapy.
        </p>
      </div>
      <div className="content-column-style" data-testId="line-chart-component">
        <LineCharts assesmentList={assesmentList} interval={interval} />
        <div className="div-wound-assesment-details">
          <div className="sub-content-vol-div-header">
            <h5 className="wound-volume-header" data-testid="wound-volume">
               Wound Volume
            </h5>
          </div>
          <div className="sub-content-vol-div">
            <span className="wound-volume-title" data-testid="initial-volume">
              Initial Volume
            </span>
            <span
              className="wound-volume-value"
              data-testid="initial-volume-value"
            >
              {woundAssessmentDetails?.initialVolume ?? "--"}
              <span> cm³</span>
            </span>
          </div>
          <div className="sub-content-vol-div">
            <span className="wound-volume-title" data-testid="last-volume">
              Last Volume
            </span>
            <span
              className="wound-volume-value"
              data-testid="last-volume-value"
            >
              {woundAssessmentDetails?.latestVolume ?? "--"}
              <span> cm³</span>
            </span>
          </div>
          <div className="sub-content-vol-div">
            <span className="wound-volume-title" data-testid="wound-volume">
              Change in Volume
            </span>
            <span className="wound-volume-value" data-testid="wound-volume">
              {woundAssessmentDetails?.changeInVolume ?? "--"}
              <span className="wound-volume-value"> cm³</span>
            </span>
          </div>
          <div className="sub-content-vol-div">
            <span className="wound-volume-title" data-testid="days-on-therapy">
              Days on Therapy
            </span>
            <span
              className="wound-volume-value"
              data-testid="days-on-therapy-value"
            >
              {woundAssessmentDetails?.daysOnVACTherapy ?? "--"}
              <span className="wound-volume-value"> days</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
