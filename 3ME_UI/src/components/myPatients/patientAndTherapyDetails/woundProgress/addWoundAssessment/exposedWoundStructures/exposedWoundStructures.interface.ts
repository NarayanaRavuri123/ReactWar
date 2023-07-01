import { IAddWoundAssessment } from "../addWoundAssessment.interface";

export type WoundExposedStructuresProps = {
  exposedWoundInfoData: IAddWoundAssessment;
  setExposedWoundInfoData: Function;
  isReviewAssessment?: boolean;
  editButtonClicked?: any;
  isWoundAssessmentSummary?: any;
};
