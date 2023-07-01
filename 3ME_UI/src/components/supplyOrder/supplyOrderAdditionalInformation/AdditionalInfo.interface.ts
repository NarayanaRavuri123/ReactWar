import { ISupplyOrder } from "../supplyOrder.interface";
import { SupplyOrderValidator } from "../supplyOrder.validator";

export interface IAdditionalInfo {
  data: ISupplyOrder;
  setData: any;
  Validator?: SupplyOrderValidator;
  isReviewOrder: boolean;
  openSupplyOrderPageEdit: any;
}
