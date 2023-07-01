import { IAddWoundAssessment } from "../addWoundAssessment.interface";
import { AddWoundAssessmentValidator } from "../addWoundAssessment.validator";

export type IWoundExudateProps = {
  setData: Function;
  data: IAddWoundAssessment;
  Validator?: AddWoundAssessmentValidator;
  isReviewAssessment?: boolean;
  isWoundAssessmentSummary?: any;
  editButtonClicked?: any;
};
