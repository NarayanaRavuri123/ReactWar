import { INewOrderWoundInfo } from "../../newOrderWoundInfoStepper/newOrderWoundInfo.interface";
import { ISecondaryWoundInfo } from "../../clinicalInformation/secondaryWoundInfo/secondaryWoundInfo.interface";
import { IAddWoundAssessment } from "../../../myPatients/patientAndTherapyDetails/woundProgress/addWoundAssessment/addWoundAssessment.interface";
import { IWoundTunnelingOrderOverviewSummary } from "../../woundDimension/reviewOrder/woundDimensionReviewOrder.interface";

export interface IWoundTunnelingReviewOrder {
  editButtonClicked: any;
  isOrderSummary?: boolean;
  woundInfoData:
    | INewOrderWoundInfo
    | ISecondaryWoundInfo
    | IAddWoundAssessment
    | IWoundTunnelingOrderOverviewSummary;
  isSecondaryWoundInfo?: boolean;
  isWoundAssessmentSummary?: any;
  isComingFromOrderOverview?: boolean;
}
