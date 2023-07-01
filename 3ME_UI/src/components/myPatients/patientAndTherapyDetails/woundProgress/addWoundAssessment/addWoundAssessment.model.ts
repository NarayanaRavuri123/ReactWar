import { ValidationStatus } from "../../../../../core/interfaces/input.interface";
import { getDeepClone } from "../../../../../util/ObjectFunctions";
import { exposedStructuresData } from "../../../../newOrder/exposedStructures/exposedStructures.data";
import { IAddWoundAssessment } from "./addWoundAssessment.interface";
import { woundAssessComorboditiesData } from "./woundAssessComorbidities/woundAssessComorbodities.data";
import { treatmentRegimenData } from "./woundAssessmentInfection/woundInfection.data";

export let defaultAddWoundAssessment: IAddWoundAssessment = {
  patientFirstName: {
    value: "",
    valid: ValidationStatus.VALID,
    required: false,
  },
  patientLastName: {
    value: "",
    valid: ValidationStatus.VALID,
    required: false,
  },
  woundID: { value: "", valid: ValidationStatus.VALID, required: false },
  rentalOrderNumber: {
    value: "",
    valid: ValidationStatus.VALID,
    required: false,
  },
  dateOfBirth: {
    value: "",
    valid: ValidationStatus.VALID,
    required: false,
  },
  productName: {
    value: "",
    valid: ValidationStatus.VALID,
    required: false,
  },
  placementDate: {
    value: "",
    valid: ValidationStatus.VALID,
    required: false,
  },
  woundLocation: {
    value: "",
    valid: ValidationStatus.VALID,
    required: false,
  },
  woundType: {
    value: "",
    valid: ValidationStatus.VALID,
    required: false,
  },
  woundDirection: {
    value: "",
    valid: ValidationStatus.VALID,
    required: false,
  },
  woundOrientation: {
    value: "",
    valid: ValidationStatus.VALID,
    required: false,
  },
  assessmentType: { value: "", valid: ValidationStatus.VALID, required: false },
  woundAssessmentDateTo: {
    value: "",
    valid: ValidationStatus.VALID,
    required: false,
  },
  woundAssessmentDateFrom: {
    value: "",
    valid: ValidationStatus.VALID,
    required: false,
  },
  previousEvaluationDate: {
    value: "",
    valid: ValidationStatus.VALID,
    required: false,
  },
  previousWoundDepth: {
    value: "",
    valid: ValidationStatus.VALID,
    required: false,
  },
  previousWoundLength: {
    value: "",
    valid: ValidationStatus.VALID,
    required: false,
  },
  previousWoundWidth: {
    value: "",
    valid: ValidationStatus.VALID,
    required: false,
  },
  woundTherapyStatus: {
    value: "",
    valid: ValidationStatus.UNTOUCHED,
    required: true,
  },
  woundDiscontinuedDate: {
    value: "",
    valid: ValidationStatus.UNTOUCHED,
    required: false,
  },
  woundDiscontinuedReason: {
    value: "",
    valid: ValidationStatus.UNTOUCHED,
    required: false,
  },
  woundMeasurementTaken: {
    value: "",
    valid: ValidationStatus.UNTOUCHED,
    required: false,
  },
  woundMeasurementDate: {
    value: "",
    valid: ValidationStatus.UNTOUCHED,
    required: false,
  },
  woundMeasurementLenght: {
    value: "",
    valid: ValidationStatus.UNTOUCHED,
    required: false,
  },
  woundMeasurementDepth: {
    value: "",
    valid: ValidationStatus.UNTOUCHED,
    required: false,
  },
  woundMeasurementWidth: {
    value: "",
    valid: ValidationStatus.UNTOUCHED,
    required: false,
  },
  woundAssessorStatus: {
    value: "",
    valid: ValidationStatus.UNTOUCHED,
    required: false,
  },
  woundAssessorName: {
    value: "",
    valid: ValidationStatus.UNTOUCHED,
    required: false,
  },
  woundAssessorFacilityName: {
    value: "",
    valid: ValidationStatus.UNTOUCHED,
    required: false,
  },
  woundAssessorPhoneNumber: {
    value: "",
    valid: ValidationStatus.UNTOUCHED,
    required: false,
  },
  woundAssessorLicenseType: {
    value: "",
    valid: ValidationStatus.UNTOUCHED,
    required: false,
  },
  provideAdditionalWoundInfo: {
    value: "",
    valid: ValidationStatus.UNTOUCHED,
    required: false,
  },
  woundEscharStatus: {
    value: "",
    valid: ValidationStatus.UNTOUCHED,
    required: false,
  },
  woundDebridementStatus: {
    value: "",
    valid: ValidationStatus.UNTOUCHED,
    required: false,
  },
  woundDebridementDate: {
    value: "",
    valid: ValidationStatus.UNTOUCHED,
    required: false,
  },
  woundDebridementType: {
    value: "",
    valid: ValidationStatus.UNTOUCHED,
    required: false,
  },
  woundInfectionInLast30Days: {
    value: "",
    valid: ValidationStatus.UNTOUCHED,
    required: false,
  },
  selectedInfectionType: {
    value: "",
    valid: ValidationStatus.UNTOUCHED,
    required: false,
  },
  selectedInfectionTypeOther: {
    value: "",
    valid: ValidationStatus.UNTOUCHED,
    required: false,
  },
  treatmentRegimen: {
    value: treatmentRegimenData,
    valid: ValidationStatus.UNTOUCHED,
    required: false,
  },
  vacTherapyBeenHold: {
    value: "",
    valid: ValidationStatus.UNTOUCHED,
    required: false,
  },
  vacHoldStartDate: {
    value: "",
    valid: ValidationStatus.UNTOUCHED,
    required: false,
  },
  vacHoldReason: {
    value: "",
    valid: ValidationStatus.UNTOUCHED,
    required: false,
  },
  vacResumeStatus: {
    value: "",
    valid: ValidationStatus.UNTOUCHED,
    required: false,
  },
  vacResumeDate: {
    value: "",
    valid: ValidationStatus.UNTOUCHED,
    required: false,
  },
  resumptionMeasureStatus: {
    value: "",
    valid: ValidationStatus.UNTOUCHED,
    required: false,
  },
  resumptionMeasureLenght: {
    value: "",
    valid: ValidationStatus.UNTOUCHED,
    required: false,
  },
  resumptionMeasureWidth: {
    value: "",
    valid: ValidationStatus.UNTOUCHED,
    required: false,
  },
  resumptionMeasureDepth: {
    value: "",
    valid: ValidationStatus.UNTOUCHED,
    required: false,
  },
  exudateAmount: {
    value: "",
    valid: ValidationStatus.UNTOUCHED,
    required: false,
  },
  exudateAppearance: {
    value: "",
    valid: ValidationStatus.UNTOUCHED,
  },
  // exposed structures
  exposedStructures: {
    valid: ValidationStatus.UNTOUCHED,
    value: exposedStructuresData,
    required: false,
  },
  // Wound Undermining
  woundUndermining: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: false,
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
    required: false,
  },
  // woundTunneling
  woundTunneling: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: false,
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
  woundAssessComorbodities: {
    valid: ValidationStatus.UNTOUCHED,
    value: getDeepClone(woundAssessComorboditiesData),
    required: false,
  },
};
