import {
  ICanister,
  IDressingKit,
  IProductAccessory,
  IProductInfo,
} from "../newOrder.interface";
import { NewOrderValidator } from "../newOrder.validator";

export interface IDressingSuppliesInfo {
  dressingKit: IDressingKit;
  canister: ICanister;
  accessory: IProductAccessory;
  productInfo: IProductInfo;
  editButtonClicked?: any;
  isReviewOrder?: boolean;
  isOrderSummary?: boolean;
  orderId: string;
  setDressingKit: Function;
  setCanister: Function;
  setAccessory: Function;
  Validator?: NewOrderValidator;
}
