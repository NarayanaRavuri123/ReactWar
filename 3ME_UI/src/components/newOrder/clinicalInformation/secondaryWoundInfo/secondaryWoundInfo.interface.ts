import { NewOrderValidator } from "../../newOrder.validator";
import {
  IInputField,
  MultiCheckbox,
} from "../../../../core/interfaces/input.interface";
import { INewOrderWoundInfo } from "../../newOrderWoundInfoStepper/newOrderWoundInfo.interface";
import { IVacTherapyInformation } from "../../woundBed/vacTherapyInformation.interface";

export interface ISecondaryWoundInfoComponent {
  data: INewOrderWoundInfo;
  editButtonClicked?: any;
  isOrderSummary?: boolean;
  isReviewOrder?: boolean;
  newValidator?: NewOrderValidator;
  setData: Function;
  setWoundInfoData: Function;
  woundInfoData: ISecondaryWoundInfo;
  vacTherapyInformationData?: IVacTherapyInformation;
}

export interface ISecondaryWoundInfo {
  // Debridement
  debridementAttempted: IInputField;
  serialDebridementRequired: IInputField;
  debridementDate: IInputField;
  debridementType: IInputField;

  // wound Dimension
  woundMeasurementDate: IInputField;
  woundLength: IInputField;
  woundWidth: IInputField;
  woundDepth: IInputField;
  woundThickness: IInputField;

  // wound Tunneling
  woundTunneling: IInputField;
  location1Depth: IInputField;
  location1Position: IInputField;
  location2Depth: IInputField;
  location2Position: IInputField;

  // wound exudate
  exudateAmount: IInputField;
  exudateAppearance: IInputField;

  //woundbed
  granulationValue: IInputField;
  epthilizationValue: IInputField;
  sloughValue: IInputField;
  escharValue: IInputField;
  woundBedTotal: IInputField;

  // exposed structures
  exposedStructures: MultiCheckbox;

  // Clinical Information
  shortNarrativeOfPossibleConsequences: IInputField;
  woundType: IInputField;
  woundAge: IInputField;
  woundLocation: IInputField;
  woundDirection: IInputField;
  woundOrientation: IInputField;
  isTissuePresent: IInputField;

  //wound undermining
  woundUndermining: IInputField;
  underminingLocation1Depth: IInputField;
  underminingLocation1PositionFrom: IInputField;
  underminingLocation1PositionTo: IInputField;
  underminingLocation2Depth: IInputField;
  underminingLocation2PositionFrom: IInputField;
  underminingLocation2PositionTo: IInputField;
}
