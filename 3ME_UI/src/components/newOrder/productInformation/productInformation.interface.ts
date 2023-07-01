import { IProductInfo } from "../newOrder.interface";

export interface IProductInformationInfo {
  productInfo: IProductInfo;
  setProductInfo: Function;
  isReviewOrder?: boolean;
  editButtonClicked?: any;
  isOrderSummary?: boolean;
}
