import { INewOrder } from "../newOrder.interface";
import { NewOrderValidator } from "../newOrder.validator";

export interface IDeliveryInformationProps {
  data: INewOrder;
  Validator?: NewOrderValidator;
  setData: Function;
  states: never[];
  statesText: never[];
  nextOrderOpen: boolean;
  isReviewOrder?: boolean;
  editButtonClicked?: any;
  isOrderSummary?: boolean;
  deliveryInformation?: any;
  setDeliveryInformation?: any;
  NewOrderObj?: any;
}

export interface IDeliveryAddress {
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: number;
}
