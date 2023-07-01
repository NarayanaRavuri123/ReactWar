import { INewOrder } from "../../newOrder.interface";

export interface IContributingCauseReviewOrder {
  accidentTypes: never[];
  data: INewOrder;
  editButtonClicked?: any;
  isOrderSummary?: boolean;
}
