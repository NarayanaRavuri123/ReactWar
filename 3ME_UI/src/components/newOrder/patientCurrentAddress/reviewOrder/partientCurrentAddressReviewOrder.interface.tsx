import { INewOrder } from "../../newOrder.interface";

export interface IPatientCurrentAddressReviewOrder {
  data: INewOrder;
  editButtonClicked: any;
  isOrderSummary?: boolean;
}
