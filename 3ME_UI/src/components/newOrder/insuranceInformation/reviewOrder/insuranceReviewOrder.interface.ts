import { INewOrder } from "../../newOrder.interface";
import { IInsuranceInformation } from "../insuranceInformation/insuranceInformation.interface";

export interface IInsuranceReviewOrder {
  data: IInsuranceInformation;
  editButtonClicked: any;
  insuranceTypes: never[];
  isPrimaryComponent: boolean;
  newOrderData: INewOrder;
  type: any;
  isOrderSummary?: boolean;
}
