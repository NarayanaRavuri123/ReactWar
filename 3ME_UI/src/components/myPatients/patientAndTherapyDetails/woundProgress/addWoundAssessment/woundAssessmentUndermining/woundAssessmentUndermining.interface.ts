import { IAddWoundAssessment } from "../addWoundAssessment.interface";
import { AddWoundAssessmentValidator } from "../addWoundAssessment.validator";

export type woundAssessmentUnderminingProps = {
  editButtonClicked?: any;
  isOrderSummary?: boolean;
  isReviewOrder?: boolean;
  isSecondaryWoundInfo?: boolean;
  positionDropDownData?: any;
  setData: React.Dispatch<React.SetStateAction<IAddWoundAssessment>>;
  data: IAddWoundAssessment;
  Validator?: AddWoundAssessmentValidator;
  isReviewAssessment?: boolean;
  isWoundAssessmentSummary?: any;
};
