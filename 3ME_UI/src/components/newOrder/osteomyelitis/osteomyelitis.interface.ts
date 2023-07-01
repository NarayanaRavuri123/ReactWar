import { NewOrderValidator } from "../newOrder.validator";
import { INewOrderWoundInfo } from "../newOrderWoundInfoStepper/newOrderWoundInfo.interface";

export interface IOsteomyelitis {
  editButtonClicked?: any;
  isOrderSummary?: boolean;
  isReviewOrder?: boolean;
  setWoundInfoData: Function;
  woundInfoData: INewOrderWoundInfo;
  Validator?: NewOrderValidator;
}
