import { useContext, useState } from "react";
import {
  OrderDetailContext,
  OrderDetailContextType,
} from "../../../../../context/OrderDetailsContext";
import { Navigator } from "../../../../helpAndSupport/Navigator/navigator.component";
import { IPatient } from "../../../patient.interface";
import { WoundDetails } from "../WoundProgressTab.interface";
import OrderOverviewUpcomingWoundAssessmentDetails from "../orderOverviewUpcomingWoundAssessmentDetails/orderOverviewUpcomingWoundAssessmentDetails.component";
import { OrderOverviewWoundDetailAssessment } from "../orderOverviewWoundAssessmentDetail/OrderOverviewWoundDetailAssessment.component";
import { WoundProgressAlert } from "../orderOverviewWoundProgressAlertComponent/orderOverviewWoundProgressAlert.component";
import "./orderOverviewWoundDetail.css";
import { OrderOverviewWoundOverview } from "../orderOverviewWoundOverview/orderOverviewWoundOverview.component";
import {
  IWoundAssesmentsMap,
  IWoundDetail,
} from "../../orderOverview/orderOverview.interface";

type Props = {
  woundDetails: WoundDetails | undefined;
  selectedPatientAlertData: IPatient;
  selectedWoundId?: string | null;
  woundIndex?: string | null;
  woundAssessmentDetails: IWoundDetail;
  assesmentList: IWoundAssesmentsMap[];
  interval: number;
  alertsForRO?: IPatient;
};
const WoundDetail = ({
  woundDetails,
  selectedPatientAlertData,
  selectedWoundId,
  woundIndex,
  woundAssessmentDetails,
  assesmentList,
  interval,
  alertsForRO,
}: Props) => {
  const orderOverviewObj = useContext<OrderDetailContextType | null>(
    OrderDetailContext
  );

  return (
    <>
      <div className="orderOverviewWoundDetails-container">
        {orderOverviewObj?.isWoundProgressFlow && (
          <div className="Wound-details-navigator-main">
            <div className="order-wound-details-navigator">
              <Navigator
                array={[
                  {
                    route: "/home/orderOverview",
                    onLinkClick: () => {
                      orderOverviewObj?.setWoundProgressTabTitle(
                        "Wound Progress"
                      );
                      orderOverviewObj?.resetWoundData();
                    },
                    pageName: "Wound Progress",
                  },
                ]}
                className="wound-detail-route-section"
                title="Wound Detail"
                isStateDataPresent={true}
                stateData={selectedPatientAlertData}
              />
            </div>
          </div>
        )}
        {woundDetails?.wounds && woundDetails?.wounds.length > 0 ? (
          <div>
            <WoundProgressAlert
              selectedPatientData={selectedPatientAlertData}
              selectedWoundId={selectedWoundId}
              alertsForRO={alertsForRO}
            />
            <OrderOverviewUpcomingWoundAssessmentDetails
              woundDetails={woundDetails}
              selectedWoundId={selectedWoundId!}
              woundIndex={woundIndex}
              // upcomingAssessment={woundAssessmentDetails?.upcomingCycles}
              upcomingCycle={woundAssessmentDetails?.upcomingCycles}
              pendingCycle={woundAssessmentDetails?.pendingCycles}
            />
            {assesmentList.length > 0 ? (
              <>
                <OrderOverviewWoundOverview
                  assesmentList={assesmentList}
                  interval={interval}
                  woundAssessmentDetails={woundAssessmentDetails}
                />
                <OrderOverviewWoundDetailAssessment
                  woundAssessmentDetails={woundAssessmentDetails!}
                />
              </>
            ) : (
              <div className="wound-details-not-present">
                <p className="wound-details-not-present-error-text">
                  The Wound Assesments are unavailable at this time. Please try
                  again or contact 3M for assistance 1-800-275-4524
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="wound-details-not-present">
            <p className="wound-details-not-present-error-text">
              The Wound Details are unavailable at this time. Please try again
              or contact 3M for assistance 1-800-275-4524
            </p>
          </div>
        )}
      </div>
    </>
  );
};
export default WoundDetail;
