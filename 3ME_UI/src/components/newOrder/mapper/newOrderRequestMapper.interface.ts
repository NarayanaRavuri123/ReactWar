export interface ISaveVacOrderRequest {
  isSaveAndExit: boolean;
  orderID: string | null;
  loggedInUserSiteUseID: string;
  customer: Customer;
  deliveryAddress: ShippingAddress;
  emergencyContact: EmergencyContact;
  requestor: Requestor;
  insurance: Insurance[] | null;
  contributingCauseWoundResult: boolean | null;
  contributingCauseAccidentDate: string | null;
  contributingCauseAccidentType: string;
  therapyDuration: number;
  therapyGoal: string;
  prescriber: Prescriber;
  prescriptionMethod: number | null;
  isUpdatePrescriberEmailId: boolean | undefined;
  isFromReadyCare: boolean | null;
  vacUnit: number;
  mainDressing: Product | null;
  additionalDressing: Product | null;
  canister: Product | null;
  accessories: Product;
  isTransition: boolean | null;
  transitionFromFacility: TransitionFromFacility | null;
  administeringDressingChanges: boolean | null;
  hcp: Hcp;
  deliveryDueDate: string | null;
  needByTime: string;
  deliveryFirstName: string;
  deliveryLastname: string;
  deliveryPhoneNumber: string;
  orderNotes: string;
  woundDetail: WoundDetail;
}

export interface Product {
  id: string | null;
  sizeID?: string;
  quantity: number | null;
  sku: string;
}

export interface Customer {
  firstName: string;
  lastName: string;
  dob: string | null;
  phoneNo: string;
  currentPhoneNo: string;
  email: string;
  permanentAddress: Address;
  currentAddress: Address;
}

export interface Address {
  addressLine1: string;
  addressLine2: string;
  city: string;
  stateCode: string;
  postalCode: string;
}

export interface EmergencyContact {
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface Hcp {
  facilityName: string;
  accountNumber: string;
  facilityType: number;
  hcpSiteUseID: string;
  caregiverID: string;
  address: Address;
  phoneNo: string;
  extension: string | null;
  mode: number;
}

export interface Insurance {
  isPrimary: boolean;
  type: string | null;
  name: string;
  memberID: string;
  groupID: string;
  relationshipToPatient: string;
  additionalInfo: string;
  providerContactNumber: string | null;
  providerContactNumberExtension: string | null;
  insuranceEmailAddress: string;
}

export interface Prescriber {
  npi: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  city: string;
  state: string;
}

export interface Requestor {
  email: string;
  facilityName: string;
  facilityNumber: string | undefined;
  name: string;
  lastName: string;
  siteUseID: string | null;
  address: Address;
}

export interface ShippingAddress {
  addressType: number;
  name: string;
  address: Address;
}

export interface TransitionFromFacility {
  name: string;
  transitionSiteUseID: string | null;
  transitionInitaiatedDate: string | null;
  facilityNumber: string | null;
  address: Address;
}

export interface WoundDetail {
  vacNotUsedConsequences: string;
  nutritionStatus: boolean | null;
  nutritionAction: string;
  previousTherapies: string;
  otherTherapiesConditionPrevented: string;
  comorbititiesApply: string;
  osteomyelitisPresent: boolean | null;
  osteomyelitisTreatmentRegimen: string;
  osteomyelitisRegimenResolve: boolean | null;
  wounds: Wound[];
}

export interface Wound {
  isPrimary: boolean;
  type: string | null;
  stageTurnedorPositioned: boolean | null;
  stageUlcerLocation: boolean | null;
  stageMoistureManagement: boolean | null;
  stageGreaterThanThirtyDays: boolean | null;
  diabeticUlcer: boolean | null;
  neuropathicUlcerPressureReduction: boolean | null;
  venousStatisUlcerBandagesApplied: boolean | null;
  venousStatisElevationEncouraged: boolean | null;
  arterialUlcerPressureRelieved: boolean | null;
  surgicallyCreated: boolean | null;
  surgicalProcedure: null | string;
  surgicalProcedureDate: string | null;
  age: Age;
  location: string;
  locationWritten: string | null;
  debridementAttempt: boolean | null;
  debridementType: string;
  debridementDate: string | null;
  debridementRequired: boolean | null;
  measurementDate: string | null;
  length: number | null;
  width: number | null;
  depth: number | null;
  thickness: boolean | null;
  underminingPresent: boolean | null;
  underminingLocation1: TunnelingSinusLocation1;
  underminingLocation2: TunnelingSinusLocation1;
  tunnelingPresent: boolean | null;
  tunnelingSinusLocation1: TunnelingSinusLocation1;
  tunnelingSinusLocation2: TunnelingSinusLocation1;
  brightRedTissue: number | null;
  dullTissue: number | null;
  whiteTissue: number | null;
  blackEschar: number | null;
  bedTotal: number;
  exudateAmount: string;
  exudateAppearance: string;
  tissueExposed: boolean | null;
  muscleExposed: boolean | null;
  tendonExposed: boolean | null;
  boneExposed: boolean | null;
  eschar?: boolean | null;
}

export type Age = number | string | null;

export interface TunnelingSinusLocation1 {
  depth: number | null;
  area: string;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toWelcome(json: string): ISaveVacOrderRequest {
    return JSON.parse(json);
  }

  public static welcomeToJson(value: ISaveVacOrderRequest): string {
    return JSON.stringify(value);
  }
}
