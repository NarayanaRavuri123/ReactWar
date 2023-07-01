import {
  IInputField,
  ValidationStatus,
} from "../../core/interfaces/input.interface";
import { NewOrderValidator } from "./newOrder.validator";
import { IAccessory } from "./dressingSupplies/accessories/accessories.interface";
import { IFacility } from "../manageProfile/facilityInformation/facility.interface";
import { IDropZoneDocumentSelect } from "../../core/customDropZone/dropZoneDocumentSelect.interface";
import { IInsuranceInformation } from "./insuranceInformation/insuranceInformation/insuranceInformation.interface";

export interface INewOrder {
  firstName: IInputField;
  lastName: IInputField;
  dob: IInputField;
  phone: IInputField;
  email: IInputField;
  address1: IInputField;
  address2: IInputField;
  city: IInputField;
  state: IInputField;
  zip: IInputField;

  // Emergency Contact Info
  emergencyContactFirstName: IInputField;
  emergencyContactLastName: IInputField;
  emergencyContactPhoneNumber: IInputField;

  // Contributing Cause
  contributingCause: IInputField;
  dateOfAccident: IInputField;
  accidentType: IInputField;

  // Submit a valid prescription
  submitPrescription: IInputField;
  prescriptionDoc: IDropZoneDocumentSelect[];

  //DeliveryContact Info
  deliveryContactFirstName: IInputField;
  deliveryContactLastName: IInputField;
  deliveryContactPhone: IInputField;
  deliveryInstructions: IInputField;

  // Therapy Information
  lengthOfTherapy: IInputField;
  goalOfTherapy: IInputField;

  // Inpatient Transition
  wasNPWTInitiated: IInputField;
  dateInitiated: IInputField;
  inpatientFacility?: IFacility;
  inpatientFacilityAsDefault?: boolean;

  // Print Common Docs
  commonDocs: IInputField;

  //upload Documents
  uploadDocument: any[];

  // Patient Current Address
  IsSamePermanentAddress: IInputField;
  patientCurrentAddressPhone: IInputField;
  patientCurrentAddress1: IInputField;
  patientCurrentAddress2: IInputField;
  patientCurrentAddressCity: IInputField;
  patientCurrentAddressState: IInputField;
  patientCurrentAddressZip: IInputField;

  // HomeCareProvider
  homeCareProvider: IInputField;
  addedCaregiverName: IInputField;
  addedCaregiverAddress1: IInputField;
  addedCaregiverAddress2: IInputField;
  addedCaregiverCity: IInputField;
  addedCaregiverState: IInputField;
  addedCaregiverZip: IInputField;
  addedCaregiverPhone: IInputField;
  addedCaregiverFacilityType: IInputField;
  addedCaregiverFacilityTypeCode: IInputField;
  addedCaregiverPhoneExtension: IInputField;
  addedCaregiverSiteUseID: IInputField;
  addedCaregiverID: IInputField;
  addedCaregiverAccountNumber: IInputField;

  // Primary Insurance Information
  primaryInsurance: IInsuranceInformation | any;

  // Secondary Insurance Information
  isSecondaryInsurancePresent: IRadioGroup;
  secondaryInsurance: IInsuranceInformation;

  updatedPrescriberEmail: IInputField;

  loggedInUserSiteUseID: IInputField;
}

export interface IRadioGroup {
  value: boolean;
  valid: ValidationStatus;
  isDefaultValid?: boolean;
}

export interface ICheckboxGroup {
  value: boolean;
  valid: ValidationStatus;
}

export interface INewOrderProps {
  DefaultNewOrderData?: INewOrder;
  Validator?: NewOrderValidator;
}

export interface IAddedPayerInfo {
  addedPayerName: string;
  addedPayerType: string;
  addedPayerNumber: string;
  status?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
}

export interface IAddedSecondaryPayerInfo {
  addedSecondaryPayerName: string;
  addedSecondaryPayerType: string;
  addedSecondaryPayerNumber: string;
  secStatus?: string;
  secAddress1?: string;
  secAddress2?: string;
  secCity?: string;
  secState?: string;
  secCountry?: string;
  secZipCode?: string;
}

export interface IRequesterInfo {
  IsRequesterSameasSubmitter: IInputField;
  requesterFirstName: IInputField;
  requesterLastName: IInputField;
  requesterEmail: IInputField;
  requesterFacility?: IFacility;
  requesterFacilityAsDefault?: boolean;
}

export interface IProductInfo {
  productInformation: IInputField;
  productValue: IInputField;
}

export interface IDressingKit {
  //primary Vac Dressing KIT
  productId: IInputField;
  productCode: IInputField;
  productSizeCode: IInputField;
  productQuantity: IInputField;
  productName: IInputField;
  productSizeName: IInputField;
  productSizeID: IInputField;

  //secondary Vac Dressing KIT
  secProductName: IInputField;
  secProductSizeName: IInputField;
  secProductId: IInputField;
  secProductCode: IInputField;
  secProductSizeCode: IInputField;
  secProductQuantity: IInputField;
  secProductSizeID: IInputField;
}

export interface ICanister {
  // Canister
  canisterProductName: IInputField;
  canisterProductCode: IInputField;
  canisterProductQuantity: IInputField;
  canisterProductID: IInputField;
}

export interface IProductAccessory {
  // Accessory
  accessories: IAccessory[];
}

export interface IDeliveryInformation {
  deliveryProductNeedByDate: IInputField;
  deliveryProductNeedByTime: IInputField;
  deliverySiteType: IInputField;
  deliveryFacilityName: IInputField;
  deliveryAddressLine1: IInputField;
  deliveryAddressLine2: IInputField;
  deliveryCity: IInputField;
  deliveryState: IInputField;
  deliveryZipCode: IInputField;
}
