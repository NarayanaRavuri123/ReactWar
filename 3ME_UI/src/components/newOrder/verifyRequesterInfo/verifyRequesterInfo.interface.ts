import { INewOrder, IRequesterInfo } from "../newOrder.interface";
import { NewOrderValidator } from "../newOrder.validator";

export interface IVerifyRequesterInfo {
  requesterInfo: IRequesterInfo;
  requestValidator?: NewOrderValidator;
  setRequesterInfo: Function;
  isReviewOrder?: boolean;
  editButtonClicked?: any;
  isOrderSummary?: boolean;
}
