import { NewOrderValidator } from "../newOrder.validator";
import { ValidationStatus } from "../../../core/interfaces/input.interface";
import { ISecondaryWoundInfo } from "./secondaryWoundInfo/secondaryWoundInfo.interface";
import { INewOrderWoundInfo } from "../newOrderWoundInfoStepper/newOrderWoundInfo.interface";

export interface IClinicalInformation {
  editButtonClicked?: any;
  isOrderSummary?: boolean;
  isReviewOrder?: boolean;
  isSecondaryWoundInfo?: boolean;
  newValidator?: NewOrderValidator;
  setWoundInfoData: Function;
  woundInfoData: INewOrderWoundInfo | ISecondaryWoundInfo;
  newOrderObj?: any;
}

export type ModelObject = {
  value: string;
  valid: ValidationStatus;
  required: boolean;
};
export type NewModel = {
  [field: string]: ModelObject;
};
