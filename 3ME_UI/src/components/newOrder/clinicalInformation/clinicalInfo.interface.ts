import { NewOrderValidator } from "../newOrder.validator";
import { ValidationStatus } from "../../../core/interfaces/input.interface";
import { INewOrderWoundInfo } from "../newOrderWoundInfoStepper/newOrderWoundInfo.interface";

export enum QuestionTypes {
  RADIO = "RadioButton",
  TEXT = "Text",
  DATE = "Date",
}
export type ClinicalInforProps = {
  woundInfoData: INewOrderWoundInfo;
  setWoundInfoData: Function;
  Validator?: NewOrderValidator;
};

export type Question = {
  text: string;
  type: QuestionTypes;
  required: string;
  value: string;
  valid: ValidationStatus;
};

export type WoundQuestionaries = {
  woundType: string;
  category: string;
  additionalQuestion: Question[];
};
