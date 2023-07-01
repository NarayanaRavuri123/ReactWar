import { NewOrderValidator } from "../newOrder.validator";
import { INewOrderWoundInfo } from "../newOrderWoundInfoStepper/newOrderWoundInfo.interface";

export type NutrionProps = {
  editButtonClicked?: any;
  isOrderSummary?: boolean;
  isReviewOrder?: boolean;
  setWoundInfoData: Function;
  woundInfoData: INewOrderWoundInfo;
  Validator?: NewOrderValidator;
};