import { INewOrderWoundInfo } from "../../newOrderWoundInfoStepper/newOrderWoundInfo.interface";

export interface IComorboditiesReviewOrder {
  editButtonClicked: any;
  isOrderSummary?: boolean;
  woundInfoData: INewOrderWoundInfo;
}
