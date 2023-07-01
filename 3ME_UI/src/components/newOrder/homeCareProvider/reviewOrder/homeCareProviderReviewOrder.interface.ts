import { INewOrder } from "../../newOrder.interface";

export interface IHomeCareProviderReviewOrder {
  data: INewOrder;
  editButtonClicked: any;
  isOrderSummary?: boolean;
}
