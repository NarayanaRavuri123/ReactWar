import { INewOrderWoundInfo } from "../../newOrderWoundInfoStepper/newOrderWoundInfo.interface";
import { ISecondaryWoundInfo } from "../../clinicalInformation/secondaryWoundInfo/secondaryWoundInfo.interface";
import { IWoundExudateOrderOverviewSummary } from "../../woundDimension/reviewOrder/woundDimensionReviewOrder.interface";

export interface IExudateReviewOrder {
  editButtonClicked: any;
  isComingFromOrderOverview?: boolean;
  isOrderSummary?: boolean;
  woundInfoData:
    | INewOrderWoundInfo
    | ISecondaryWoundInfo
    | IWoundExudateOrderOverviewSummary;
}
