import {
  IInputField,
  MultiCheckbox,
} from "../../../core/interfaces/input.interface";

export interface INewOrderWoundInfo {
  nutriStatusCompromized: IInputField;
  nutritionActions: MultiCheckbox;
  previousTherapies: MultiCheckbox;
  previousTherapiesCauses: MultiCheckbox;
  previousTherapyOther: IInputField;
  previousTherapiesCausesOther: IInputField;

  // Comorbodities
  wndInfoComorbidities: MultiCheckbox;
  wndInfoComorbiditiesOther: IInputField;

  // Osteomyelitis
  isOsteomyelitisPresent: IInputField;
  osteomyelitisies: MultiCheckbox;
  isTreatemenForResolveBoneInfection: IInputField;

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

  // woundbed
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

  // Secondary Wound Info
  isShowSecondaryWoundInfo: IInputField;
};

export type MultipleActionsProps = {
  value: string;
  label: string;
  selected: boolean;
};
