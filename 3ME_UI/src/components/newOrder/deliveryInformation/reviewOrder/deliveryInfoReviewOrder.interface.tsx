import { IDeliveryInformation, INewOrder } from "../../newOrder.interface";

export interface IDeliveryInfoReviewOrder {
  data: IDeliveryInformation;
  deliverySites: never[];
  editButtonClicked: any;
  isOrderSummary?: boolean;
}
