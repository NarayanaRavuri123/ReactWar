import {
  ICanister,
  IDressingKit,
  IProductAccessory,
} from "../../newOrder.interface";

export interface IDressingSuppliesReviewOrder {
  dressing: IDressingKit;
  canister: ICanister;
  accesssory: IProductAccessory;
  editButtonClicked: any;
  isOrderSummary?: boolean;
  newOrderObj?: any;
}
