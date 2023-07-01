import { INewOrder } from "../../newOrder.interface";

export interface ITherapyInformationReviewOrder {
  data: INewOrder;
  editButtonClicked: any;
  therapyLengths: never[];
  therapyGoals: never[];
  isOrderSummary?: boolean;
  isOrderOverviewFlow?: boolean;
}
