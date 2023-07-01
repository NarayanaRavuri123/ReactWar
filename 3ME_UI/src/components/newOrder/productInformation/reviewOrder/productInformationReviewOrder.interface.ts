import { IProductInfo } from "../../newOrder.interface";

export interface IProductInformationReviewOrder {
  productInfo: IProductInfo;
  editButtonClicked: any;
  productValues: never[];
  isReadyCare: boolean;
  isOrderSummary?: boolean;
}
