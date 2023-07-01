import { NewOrderValidator } from "../newOrder.validator";
import { INewOrderWoundInfo } from "../newOrderWoundInfoStepper/newOrderWoundInfo.interface";
import { ISecondaryWoundInfo } from "../clinicalInformation/secondaryWoundInfo/secondaryWoundInfo.interface";

export type ExudateProps = {
  editButtonClicked?: any;
  isOrderSummary?: boolean;
  isReviewOrder?: boolean;
  isSecondaryWoundInfo?: boolean;
  setWoundInfoData: Function;
  woundInfoData: INewOrderWoundInfo | ISecondaryWoundInfo;
  Validator?: NewOrderValidator;
};
