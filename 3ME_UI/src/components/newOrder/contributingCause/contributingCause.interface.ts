import { INewOrder } from "../newOrder.interface";
import { NewOrderValidator } from "../newOrder.validator";

export interface IContributingCause {
  data: INewOrder;
  Validator?: NewOrderValidator;
  setData: Function;
  isReviewOrder?: boolean;
  editButtonClicked?: any;

  isOrderSummary?: boolean;
}
