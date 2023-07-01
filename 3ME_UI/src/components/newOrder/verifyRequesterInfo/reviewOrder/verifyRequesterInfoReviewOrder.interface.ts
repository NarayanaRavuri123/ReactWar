import { INewOrder, IRequesterInfo } from "../../newOrder.interface";
import { IFacility } from "../../../manageProfile/facilityInformation/facility.interface";

export interface IVerifyRequesterInfoReviewOrder {
  data: IRequesterInfo;
  facility?: IFacility;
  editButtonClicked: any;
  isOrderSummary?: boolean;
}
