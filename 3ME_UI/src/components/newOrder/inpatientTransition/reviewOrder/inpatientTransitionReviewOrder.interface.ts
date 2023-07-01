import { INewOrder } from "../../newOrder.interface";
import { IFacility } from "../../../manageProfile/facilityInformation/facility.interface";

export interface IInpatientTransitionReviewOrder {
  data: INewOrder;
  facility: IFacility | undefined;
  editButtonClicked: any;
  isOrderSummary?: boolean;
}
