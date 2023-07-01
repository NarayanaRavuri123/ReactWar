import { INewOrder } from "../newOrder.interface";
import { NewOrderValidator } from "../newOrder.validator";

export interface IInpatientTransition {
  data: INewOrder;
  newValidator?: NewOrderValidator;
  setData: Function;
  isReviewOrder?: boolean;
  editButtonClicked?: any;

  isOrderSummary?: boolean;
}
