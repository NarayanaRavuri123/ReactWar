import { INewOrder } from "../newOrder.interface";
import { NewOrderValidator } from "../newOrder.validator";

export interface ITherapyInformation {
  data: INewOrder;
  Validator?: NewOrderValidator;
  setData: Function;
  isReviewOrder?: boolean;
  editButtonClicked?: any;

  isOrderSummary?: boolean;
}
