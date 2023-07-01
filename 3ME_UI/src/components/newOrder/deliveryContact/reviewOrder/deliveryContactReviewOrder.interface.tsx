import { INewOrder } from "../../newOrder.interface";

export interface IDeliveryContactReviewOrder {
  data: INewOrder;
  editButtonClicked: any;
  isOrderSummary?: boolean;
}
