import { IAddWoundAssessment } from "../addWoundAssessment.interface";
import { AddWoundAssessmentValidator } from "../addWoundAssessment.validator";

export interface IAdditionalWoundInfo {
  data: IAddWoundAssessment;
  setData: any;
  Validator?: AddWoundAssessmentValidator;
}
