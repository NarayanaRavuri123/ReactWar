import { INewOrder } from "../newOrder.interface";
import { NewOrderValidator } from "../newOrder.validator";

export interface IPatientCurrentAddress {
  data: INewOrder;
  Validator?: NewOrderValidator;
  setData: Function;
  states: never[];
  statesText: never[];
  isReviewOrder?: boolean;
  editButtonClicked?: any;
  isOrderSummary?: boolean;
}
