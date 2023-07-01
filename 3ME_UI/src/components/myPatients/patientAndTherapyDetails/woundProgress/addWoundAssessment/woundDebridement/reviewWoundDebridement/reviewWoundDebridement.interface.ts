import { IInputField } from "../../../../../../../core/interfaces/input.interface";
import { IAddWoundAssessment } from "../../addWoundAssessment.interface";

export interface IReviewWoundDebridement {
  data: IAddWoundAssessment | IDebridementOrderOverview;
  editButtonClicked?: any;
  woundDebridementTypeCode: any;
  isWoundAssessmentSummary?: any;
  isComingFromOrderOverview?: boolean;
}

export interface IDebridementOrderOverview {
  woundDebridementDate: IInputField;
  woundDebridementStatus: IInputField;
  woundDebridementType: IInputField;
}
