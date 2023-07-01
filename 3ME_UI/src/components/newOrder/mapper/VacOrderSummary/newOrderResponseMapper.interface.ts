export interface VacOrderSummaryData {
  customerFirstName: string;
  customerLastName: string;
  customerDOB: string;
  customerPhoneNo: string;
  customerEmailAddress: string;
  permanentAddress: Address;
  currentAddress: Address;
  currentPhoneNumber: string;
  emergencyContactFirstName: string;
  emergencyContactLastName: string;
  emergencyContactPhoneNumber: string;
  requestor: Requestor;
  primaryInsurance: Insurance;
  secondaryInsurance: Insurance;

  deliveryAddress: Address;

  contributingCause: boolean;
  therapyGoal: string;
  therapyDuration: number;
  prescriptionMethod: number;
  prescriberFirstName: string;
  prescriberLastName: string;
  prescriberEmailAddress: string;
  prescriberNPI: string;
  isFromReadyCare: boolean;
  serialNumber: string;
  vacUnit: number;
  mainDressing: Product;
  additionalDressing: Product;
  canister: Product;
  accessories: Product[];
  isTransition: boolean;
  transitionFromFacility: TransitionFromFacility;

  hcp: Hcp;
  administeringDressingChanges: boolean;
  hcpDressing: Hcp;
  deliveryDueDate: string;
  deliveryNeedByTime: string;
  deliverySiteType: number;
  deliverySiteName: string;
  deliveryInstructions: string;
  deliveryFirstName: string;
  deliveryLastName: string;
  deliveryPhoneNumber: string;
  vacNotUsedConsequences: any;
  clinicalInformation: ClinicalInformation;
  primaryWound: Wound;
  secondaryWound: Wound;
  document: any[];
  lockedOrder: LockedOrder;
  sharedDetails: SharedDetails;
}

export interface Requestor {
  email: string;
  facilityName: string;
  facilityType: string;
  facilityNumber: string;
  name: string;
  lastName: string;
  siteUseID: string;
  address: Address;
}

export interface Address {
  addressLine1: string;
  addressLine2: string;
  city: string;
  stateCode: string;
  postalCode: string;
}

export interface Insurance {
  isPrimary: boolean;
  type: number;
  name: string;
  memberID: string;
  relationshipToPatient: string;
  groupID: string;
  additionalInfo: any;
  providerContactNumber: any;
  providerContactNumberExtension: any;
  insuranceEmailAddress: any;
}

export interface Product {
  productID: number;
  productName: string;
  productCode: string;
  quantity: number;
  sku: string;
}

export interface TransitionFromFacility {
  name: string;
  facilityType: string;
  facilityNumber: number;
  transitionInitaiatedDate: string;
  transitionSiteUseID: any;
  address: Address;
}

export interface Hcp {
  phoneNo: string;
  facilityName: string;
  accountNumber: string;
  facilityType: number;
  facilityTypeName: string;
  hcpSiteUseID: string;
  caregiverID: string;
  address: Address;
  extension: any;
  mode: any;
}

export interface ClinicalInformation {
  nutritionStatus: boolean;
  nutritionAction: any;
  previousTherapies: any;
  otherTherapiesConditionPrevented: any;
  comorbititiesApply: any;
  osteomyelitisPresent: boolean;
  osteomyelitisTreatmentRegimen: any;
  isComorbititiesDiabeticProgram: number;
  osteomyelitisRegimenResolve: boolean;
  contributingCauseAccidentDate: string;
  contributingCauseAccidentType: string;
}

export interface Wound {
  isPrimary: boolean;
  type: any;
  stageTurnedorPositioned: boolean;
  stageUlcerLocation: boolean;
  stageMoistureManagement: boolean;
  stageGreaterThanThirtyDays: boolean;
  diabeticUlcer: boolean;
  neuropathicUlcerPressureReduction: boolean;
  venousStatisUlcerBandagesApplied: boolean;
  venousStatisElevationEncouraged: boolean;
  arterialUlcerPressureRelieved: boolean;
  surgicallyCreated: boolean;
  surgicalProcedure: any;
  surgicalProcedureDate: any;
  age: number;
  location: any;
  locationWritten: any;
  eschar: boolean;
  debridementAttempt: boolean;
  debridementDate: any;
  debridementType: any;
  debridementRequired: boolean;
  measurementDate: any;
  length: number;
  width: number;
  depth: number;
  thickness: boolean;
  underminingPresent: boolean;
  underminingLocation1: Location;
  underminingLocation2: Location;
  tunnelingPresent: boolean;
  tunnelingSinusLocation1: Location;
  tunnelingSinusLocation2: Location;
  brightRedTissue: number;
  dullTissue: number;
  whiteTissue: number;
  blackEschar: number;
  bedTotal: number;
  exudateAmount: any;
  exudateAppearance: any;
  tissueExposed: boolean;
  muscleExposed: boolean;
  tendonExposed: boolean;
  boneExposed: boolean;
}

export interface Location {
  depth: number;
  area: string;
}

export interface LockedOrder {
  isLocked: boolean;
  lockedByFirstName: string;
  lockedByLastName: string;
  orderStatus: number;
}

export interface SharedDetails {
  from: string;
  to: string;
  notes: string;
}
