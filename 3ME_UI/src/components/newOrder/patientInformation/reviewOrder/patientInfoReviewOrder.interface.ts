import { INewOrder } from "../../newOrder.interface";

export interface IPatientInfoReviewOrder {
  data: INewOrder;
  editButtonClicked: any;
  isOrderSummary?: boolean;
}
