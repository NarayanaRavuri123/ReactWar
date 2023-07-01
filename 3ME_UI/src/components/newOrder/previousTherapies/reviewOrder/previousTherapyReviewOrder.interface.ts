import { INewOrderWoundInfo } from "../../newOrderWoundInfoStepper/newOrderWoundInfo.interface";

export interface IPreviousTherapiesReviewOrder {
  editButtonClicked: any;
  isOrderSummary?: boolean;
  woundInfoData: INewOrderWoundInfo;
}
