import { INewOrder } from "../newOrder.interface";
import { NewOrderValidator } from "../newOrder.validator";

export interface IEmergencyContactInfo {
  data: INewOrder;
  Validator?: NewOrderValidator;
  setData: Function;
  isReviewOrder?: boolean;
  editButtonClicked?: any;

  isOrderSummary?: boolean;
}
