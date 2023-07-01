import { NewOrderValidator } from "../newOrder.validator";
import { INewOrderWoundInfo } from "../newOrderWoundInfoStepper/newOrderWoundInfo.interface";
import { ISecondaryWoundInfo } from "../clinicalInformation/secondaryWoundInfo/secondaryWoundInfo.interface";

export type ExposedStructuresProps = {
  editButtonClicked?: any;
  isOrderSummary?: boolean;
  isSecondaryWoundInfo?: boolean;
  isReviewOrder?: boolean;
  setWoundInfoData: Function;
  woundInfoData: INewOrderWoundInfo | ISecondaryWoundInfo;
  Validator?: NewOrderValidator;
};
