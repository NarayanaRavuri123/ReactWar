import { INewOrderWoundInfo } from "../../newOrderWoundInfoStepper/newOrderWoundInfo.interface";
import { ISecondaryWoundInfo } from "../../clinicalInformation/secondaryWoundInfo/secondaryWoundInfo.interface";

export interface IWoundBedReviewOrder {
  editButtonClicked: any;
  isOrderSummary?: boolean;
  woundInfoData: INewOrderWoundInfo | ISecondaryWoundInfo;
}
