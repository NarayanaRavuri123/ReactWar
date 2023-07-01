import { INewOrder } from "../../newOrder.interface";

export interface IEmergencyContactReviewOrder {
  data: INewOrder;
  editButtonClicked?: any;
  isOrderSummary?: boolean;
}
