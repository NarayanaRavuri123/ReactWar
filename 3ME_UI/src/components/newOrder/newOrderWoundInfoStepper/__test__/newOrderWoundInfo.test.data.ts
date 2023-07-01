import {
  osteomyelitisies,
  previousTherapy,
  previousTherapyCause,
} from "../../previousTherapies/previousTherapiesData";
import { INewOrderWoundInfo } from "../newOrderWoundInfo.interface";
import { nutriActionData } from "../../nutrition/nutritionAction.data";
import { comorbiditiesData } from "../../comorbodities/comorbodities.data";
import { ValidationStatus } from "../../../../core/interfaces/input.interface";
import { exposedStructuresData } from "../../exposedStructures/exposedStructures.data";

export let newOrderWoundInfoTestData: INewOrderWoundInfo = {
  previousTherapies: {
    value: previousTherapy,
    valid: ValidationStatus.UNTOUCHED,
    required: true,
  },
  previousTherapiesCauses: {
    value: previousTherapyCause,
    valid: ValidationStatus.UNTOUCHED,
    required: true,
  },
  previousTherapyOther: {
    value: "",
    valid: ValidationStatus.UNTOUCHED,
    required: false,
  },
  previousTherapiesCausesOther: {
    value: "",
    valid: ValidationStatus.UNTOUCHED,
    required: false,
  },

  // Comorbodities
  wndInfoComorbidities: {
    value: comorbiditiesData,
    valid: ValidationStatus.UNTOUCHED,
    required: true,
  },
  wndInfoComorbiditiesOther: {
    value: "",
    valid: ValidationStatus.UNTOUCHED,
    required: false,
  },

  // Nutrition
  nutriStatusCompromized: {
    value: "",
    valid: ValidationStatus.UNTOUCHED,
    required: true,
  },
  nutritionActions: {
    value: nutriActionData,
    valid: ValidationStatus.UNTOUCHED,
    defaultRequired: false,
    required: true,
  },

  // Osteomyelitis
  isOsteomyelitisPresent: {
    value: "Yes",
    valid: ValidationStatus.VALID,
    required: false,
  },
  osteomyelitisies: {
    value: osteomyelitisies,
    valid: ValidationStatus.UNTOUCHED,
    required: true,
  },
  isTreatemenForResolveBoneInfection: {
    value: "",
    valid: ValidationStatus.VALID,
    required: true,
  },
  debridementAttempted: {
    value: "",
    valid: ValidationStatus.UNTOUCHED,
    required: true,
  },
  serialDebridementRequired: {
    value: "",
    valid: ValidationStatus.UNTOUCHED,
    required: false,
  },
  debridementDate: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  },
  debridementType: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: false,
  },
  woundTunneling: {
    valid: ValidationStatus.UNTOUCHED,
    value: "Yes",
    required: true,
  },
  location1Depth: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: false,
  },
  location1Position: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: false,
  },
  location2Depth: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: false,
  },
  location2Position: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: false,
  },
  woundMeasurementDate: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
  woundLength: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
  woundWidth: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
  woundDepth: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
  woundThickness: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
  // wound exudate
  exudateAmount: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
  exudateAppearance: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
  // exposed structures
  exposedStructures: {
    valid: ValidationStatus.UNTOUCHED,
    value: exposedStructuresData,
    defaultRequired: false,
    required: false,
  },

  // woundbed
  granulationValue: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: false,
  },
  epthilizationValue: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: false,
  },
  sloughValue: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: false,
  },
  escharValue: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: false,
  },
  woundBedTotal: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },

  // Clinical Information
  shortNarrativeOfPossibleConsequences: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: false,
  },
  woundType: {
    value: "",
    valid: ValidationStatus.UNTOUCHED,
    required: false,
  },
  woundAge: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
  woundLocation: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
  woundDirection: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
  woundOrientation: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
  isTissuePresent: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
  woundUndermining: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
  underminingLocation1Depth: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: false,
  },
  underminingLocation1PositionFrom: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: false,
  },
  underminingLocation1PositionTo: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: false,
  },
  underminingLocation2Depth: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: false,
  },
  underminingLocation2PositionFrom: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: false,
  },
  underminingLocation2PositionTo: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: false,
  },
  isShowSecondaryWoundInfo: {
    valid: ValidationStatus.VALID,
    value: "No",
    isDefaultValid: true,
  },
};
