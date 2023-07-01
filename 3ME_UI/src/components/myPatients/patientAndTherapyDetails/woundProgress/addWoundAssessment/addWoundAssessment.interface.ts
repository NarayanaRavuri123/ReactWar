import {
  IInputField,
  MultiCheckbox,
} from "../../../../../core/interfaces/input.interface";

export interface IAddWoundAssessment {
  patientFirstName: IInputField;
  patientLastName: IInputField;
  woundType: IInputField;
  woundID: IInputField;
  woundLocation: IInputField;
  woundDirection: IInputField;
  woundOrientation: IInputField;
  dateOfBirth: IInputField;
  rentalOrderNumber: IInputField;
  productName: IInputField;
  placementDate: IInputField;
  assessmentType: IInputField;
  previousEvaluationDate: IInputField;
  previousWoundLength: IInputField;
  previousWoundWidth: IInputField;
  previousWoundDepth: IInputField;
  // Wound Assessment Data Range
  woundAssessmentDateTo: IInputField;
  woundAssessmentDateFrom: IInputField;
  // Wound Assessment Therapy Status
  woundTherapyStatus: IInputField;
  woundDiscontinuedDate: IInputField;
  woundDiscontinuedReason: IInputField;
  //WoundAssessor
  woundAssessorStatus: IInputField;
  woundAssessorName: IInputField;
  woundAssessorFacilityName: IInputField;
  woundAssessorPhoneNumber: IInputField;
  woundAssessorLicenseType: IInputField;
  // Wound Measurement
  woundMeasurementTaken: IInputField;
  woundMeasurementDate: IInputField;
  woundMeasurementLenght: IInputField;
  woundMeasurementWidth: IInputField;
  woundMeasurementDepth: IInputField;
  //Additional Notes
  provideAdditionalWoundInfo: IInputField;
  //Eschar
  woundEscharStatus: IInputField;
  //Debridement
  woundDebridementStatus: IInputField;
  woundDebridementType: IInputField;
  woundDebridementDate: IInputField;
  // Infection
  woundInfectionInLast30Days: IInputField;
  selectedInfectionType: IInputField;
  selectedInfectionTypeOther: IInputField;
  treatmentRegimen: MultiCheckbox;
  // Holds Or Hospitalization
  vacTherapyBeenHold: IInputField;
  vacHoldStartDate: IInputField;
  vacHoldReason: IInputField;
  vacResumeStatus: IInputField;
  vacResumeDate: IInputField;
  resumptionMeasureStatus: IInputField;
  resumptionMeasureLenght: IInputField;
  resumptionMeasureWidth: IInputField;
  resumptionMeasureDepth: IInputField;
  // Exudate
  exudateAmount: IInputField;
  exudateAppearance: IInputField;
  // exposed structures
  exposedStructures: MultiCheckbox;
  // woundbed
  granulationValue: IInputField;
  epthilizationValue: IInputField;
  sloughValue: IInputField;
  escharValue: IInputField;
  woundBedTotal: IInputField;
  //wound undermining
  woundUndermining: IInputField;
  underminingLocation1Depth: IInputField;
  underminingLocation1PositionFrom: IInputField;
  underminingLocation1PositionTo: IInputField;
  underminingLocation2Depth: IInputField;
  underminingLocation2PositionFrom: IInputField;
  underminingLocation2PositionTo: IInputField;
  // wound Tunneling
  woundTunneling: IInputField;
  location1Depth: IInputField;
  location1Position: IInputField;
  location2Depth: IInputField;
  location2Position: IInputField;
  // Comorbodities
  woundAssessComorbodities: MultiCheckbox;
}
