export interface IWoundAssessmentRequest {
  providerFacilityName: string;
  patientLastName: string;
  patientFirstName: string;
  patientDOB: string | null;
  patientZipCode: string;
  patientRentalOrderNo: string;
  vacSerialNo: string;
  holdDate: string | null;
  holdReason: string;
  resumeDate: string | null;
  DiscontinuationDate: string | null;
  DiscontinuationReason: string;
  woundDetail: WoundDetail;
  isTherapyInUse: boolean | null;
  isVACTherapyOnHold: boolean | null;
  isVACTherapyResumed: boolean | null;
  IsMeasurementTakenDuringResumption: boolean | null;
  assessmentType: string;
  cycleDateRangeFrom: string | null;
  cycleDateRangeTo: string | null;
  resumedWoundLength: number | null;
  resumedWoundWidth: number | null;
  resumedWoundDepth: number | null;
  comorbidities: string;
  otherComorbidities: string;
  performAssessmentBySomeOne: boolean | null;
  woundAssessor: string;
  notes: string;
  woundAssessorLicenseType: string;
  woundAssessorFacilityName: string;
  woundAssessorPhoneNumber: string;
  documentIds: any[];
  SignatureName: string;
  Images: any[];
  Attestation: Attestation;
  SiteUseId: string;
}

export interface WoundDetail {
  woundID: number;
  woundType: number;
  location: string;
  orientation: string;
  direction: string;
  escharPresent: boolean | null;
  IsMeasurementsPresent: boolean | null;
  debridementDone: boolean | null;
  debridementDate: string | null;
  debridementType: string | null;
  measurementDate: string | null;
  length: number | null;
  width: number | null;
  depth: number | null;
  underminingPresent: boolean | null;
  underminingLocation1: UnderminingLocation1 | null;
  underminingLocation2: UnderminingLocation2 | null;
  tunnelingPresent: boolean | null;
  tunnelingLocation1: TunnelingLocation1 | null;
  tunnelingLocation2: TunnelingLocation2 | null;
  brightRedTissue: number | null;
  dullTissue: number | null;
  whiteTissue: number | null;
  blackEschar: number | null;
  bedTotal: number;
  exudateAmount: string | null;
  exudateAppearance: string | null;
  tissueExposed: boolean | null;
  muscleExposed: boolean | null;
  tendonExposed: boolean | null;
  boneExposed: boolean | null;
  InfectionPresent: boolean | null;
  InfectionType: string;
  InfectionIndicateTreatmentRegime: string;
}

export interface UnderminingLocation1 {
  depth: number | null;
  areaFrom: number;
  areaTo: number;
}

export interface UnderminingLocation2 {
  depth: number | null;
  areaFrom: number;
  areaTo: number;
}

export interface TunnelingLocation1 {
  depth: number | null;
  area: string | null;
}

export interface TunnelingLocation2 {
  depth: number | null;
  area: string | null;
}

export interface Attestation {
  Name: string;
  Employer: string;
  PhoneNumber: string;
  ConfirmationDate: string | null;
}
