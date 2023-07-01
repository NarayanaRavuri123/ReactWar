import { INewOrderWoundInfo } from "../../newOrderWoundInfoStepper/newOrderWoundInfo.interface";
import { ISecondaryWoundInfo } from "../../clinicalInformation/secondaryWoundInfo/secondaryWoundInfo.interface";

export interface IClinicalInformationReviewOrder {
  editButtonClicked: any;
  isOrderSummary?: boolean;
  isSecondaryWoundInfo?: boolean;
  woundInfoData: INewOrderWoundInfo | ISecondaryWoundInfo;
  woundLocations: never[];
  woundDirections: never[];
  woundOrientations: never[];
  newOrderObj?: any;
}
