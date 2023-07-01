import { IInputField } from "../../../../core/interfaces/input.interface";
import { INewOrder } from "../../../newOrder/newOrder.interface";
import { IPatient } from "../../patient.interface";
import { IOrderDetailResponse } from "../orderDetailsTracking/orderDetailsTracking.interface";
import {
  IOrderSupplies,
  ISupplyOrdersInfo,
} from "../orderSupplyDetail/orderSupplyDetails.interface";
import {
  ISupplyOrderAccessory,
  ISupplyOrderCanister,
  ISupplyOrderDressingKit,
  ISupplyOrderInfoMapper,
} from "../supplyOrderDetails/supplyOrderResponseInterface";
export interface IOrderOverviewProps {
  patientData: IPatient;
  orderDetailsTrackingData: IOrderDetailResponse;
  pdfUrl: string;
  isOrderFlow: boolean;
  alertsForRO?: IPatient;
}
export interface ISeletedPatient {
  firstName: IInputField;
  lastName: IInputField;
  dob: IInputField;
  dropDownMenuOption: string[];
}
export interface IOrderCurrentTherapy {
  patientData: IPatient;
  orderDetailsTrackingData: IOrderDetailResponse;
  supplyOrderSuppliesDetail?: IOrderSupplies;
  alertsForRO?: IPatient;
}
export interface IOrderedSupplies {
  dressing: ISupplyOrderDressingKit;
  canister: ISupplyOrderCanister;
  accessory: ISupplyOrderAccessory;
}
export interface ISupplyOrderTracking {
  patientData: IPatient;
  supplyOrderTrackingData: ISupplyOrderInfoMapper | undefined;
  selectedSupplyOrderData: ISupplyOrdersInfo;
  therapyStartDate?: any;
  alertsForRO?: IPatient;
}
export interface IPatientFinInfo {
  patientData?: IPatient;
  newOrderData: INewOrder;
}
export interface IPatientFinResponsbility {
  patientData?: IPatient;
  newOrderData: INewOrder;
}
export interface IWoundDetail {
  assessments?: IWoundAssesments[];
  initialVolume: string;
  latestVolume: string;
  changeInVolume: string;
  daysOnVACTherapy: string;
  upcomingCycles?: IUpcomingAssessments[];
  pendingCycles?: IUpcomingAssessments[];
  assessmentType?: string;
}

export interface IUpcomingAssessments {
  from: string | null;
  to: string | null;
}
export interface IWoundAssesments {
  status?: string;
  color?: string;
  images?: [];
  volume?: string | null;
  assessmentType?: string;
  volumeDifference: number | null;
  evaluationDate?: string;
  boneExposed: string | null;
  comorbidities: string[];
  cycleDateRangeFrom: string;
  cycleDateRangeTo: string;
  debridementDate: string | null;
  debridementDone: string | null;
  debridementType: string | null;
  exudateAppearance: string;
  holdVacTherapyDate: string | null;
  isEschar: string | null;
  isTherapyInUSe: string | null;
  isTunnelingPresent: string | null;
  isUnderMiningPresent: string | null;
  muscelExposed: string | null;
  otherComorbidities: string | null;
  subcutaneousTissueExposed: string | null;
  tissueExposed: string | null;
  tunnelingLength1: string;
  tunnelingLength2: string;
  tunnelingLocation1: string;
  tunnelingLocation2: string;
  underMiningLocation1From: string;
  underMiningLocation1Size: string;
  underMiningLocation1To: string;
  underMiningLocation2From: string;
  underMiningLocation2Size: string;
  underMiningLocation2To: string;
  woundDepth: string;
  woundDescriptionBeefyRed: string;
  woundDescriptionBlackEschar: string;
  woundDescriptionDullPink: string | null;
  woundDescriptionWhite: string | null;
  woundExudate: string;
  woundLength: string | null;
  woundWidth: string | null;
  discontinueDate?: string;
  discontinuedReason?: string;
  woundAssessorName?: string;
  woundAssessorLicenseTypeJobRole?: string;
  woundAssessorFacilityName?: string;
  woundAssessorPhoneNumber?: string;
  reasonForHold?: string;
  resumeVacTherapyDate?: string;
  reasonForResume?: string;
  isMeasurementTakenDuringResumption?: string;
  resumedMeasurementWoundLength?: string;
  resumedMeasurementWoundWidth?: string;
  resumedMeasurementWoundDepth?: string;
  resumedVolume?: string;
  isAssessmentPerformByOthers?: string;
}
export interface IWoundAssesmentsMap {
  evaluationDate: string | null;
  Volume: string | null;
}
export interface IAlertsForRO {
  status: any;
  OrderId: any;
  RON: string;
  ConfirmPlacementAlert?: IConfirmPlacementAlert;
  DischargePendingAlert?: IDischargePendingAlert;
  MeasurementDueAlert?: IMeasurementDueAlert[];
  MissingDocumentAlert: IMissingDocumentAlert[] | undefined;
  MissinRxAlert?: IMissinRxAlert;
  ProofOfDeliveryAlert?: IProofOfDeliveryAlert[];
}
export interface IConfirmPlacementAlert {}
export interface IDischargePendingAlert {}
export interface IMeasurementDueAlert {
  ron: string;
  assessmentCode: string;
  Wounds: IWounds[];
}
export interface IWounds {
  id: string;
  pendingcycles: IPendingCycles;
}
export interface IPendingCycles {
  from: string;
  to: string;
}
export interface IMissingDocumentAlert {
  statusDelayReason: string;
}
export interface IMissinRxAlert {
  ron: string;
  prescriberFirstName: string;
  prescriberLastName: string;
  prescriberEmailAddress: string;
  prescriptionUploadMode: string;
}
export interface IProofOfDeliveryAlert {
  ron: string;
  status: string;
  lastUpdated: string;
  data: string | null;
}
