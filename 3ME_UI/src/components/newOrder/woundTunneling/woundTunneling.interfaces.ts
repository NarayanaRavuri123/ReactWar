import { NewOrderValidator } from "../newOrder.validator";
import { INewOrderWoundInfo } from "../newOrderWoundInfoStepper/newOrderWoundInfo.interface";
import { ISecondaryWoundInfo } from "../clinicalInformation/secondaryWoundInfo/secondaryWoundInfo.interface";
import { IAddWoundAssessment } from "../../myPatients/patientAndTherapyDetails/woundProgress/addWoundAssessment/addWoundAssessment.interface";
import { AddWoundAssessmentValidator } from "../../myPatients/patientAndTherapyDetails/woundProgress/addWoundAssessment/addWoundAssessment.validator";

export type woundTunnelingProps = {
  editButtonClicked?: any;
  isOrderSummary?: boolean;
  isReviewOrder?: boolean;
  isSecondaryWoundInfo?: boolean;
  positionDropDownData?: any;
  positionDropDownDataText?: any;
  setWoundInfoData: Function;
  woundInfoData: INewOrderWoundInfo | ISecondaryWoundInfo | IAddWoundAssessment;
  Validator?: NewOrderValidator;
  isWoundAssessmentSummary?: any;
};
