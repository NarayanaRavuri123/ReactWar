import { ValidationStatus } from "../../core/interfaces/input.interface";
import { defaultInsuranceData } from "./insuranceInformation/insuranceInformation/insuranceInformation.model";
import {
  ICanister,
  IDeliveryInformation,
  IDressingKit,
  INewOrder,
  IProductAccessory,
  IProductInfo,
  IRequesterInfo,
} from "./newOrder.interface";

export let defaultNewOrderData: INewOrder = {
  address1: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  },
  address2: {
    valid: ValidationStatus.VALID,
    value: "",
    isDefaultValid: true,
  },
  city: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  },
  dob: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    minimumRequired: true,
  },
  email: {
    valid: ValidationStatus.VALID,
    value: "",
    isDefaultValid: true,
  },
  firstName: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    minimumRequired: true,
  },
  lastName: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    minimumRequired: true,
  },
  phone: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  },
  state: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  },
  zip: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  },

  // Emergency Contact Info
  emergencyContactFirstName: {
    valid: ValidationStatus.VALID,
    value: "",
    isDefaultValid: true,
  },
  emergencyContactLastName: {
    valid: ValidationStatus.VALID,
    value: "",
    isDefaultValid: true,
  },
  emergencyContactPhoneNumber: {
    valid: ValidationStatus.VALID,
    value: "",
    isDefaultValid: true,
  },

  // Contributing Cause
  contributingCause: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  },
  dateOfAccident: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  },
  accidentType: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  },

  // HomeCareProvider Cause
  homeCareProvider: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  },
  addedCaregiverName: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: false,
  },
  addedCaregiverAddress1: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: false,
  },
  addedCaregiverAddress2: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: false,
  },
  addedCaregiverCity: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: false,
  },
  addedCaregiverState: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: false,
  },
  addedCaregiverPhone: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: false,
  },
  addedCaregiverZip: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: false,
  },
  addedCaregiverFacilityType: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: false,
  },
  addedCaregiverPhoneExtension: {
    valid: ValidationStatus.VALID,
    value: "",
    required: false,
    isDefaultValid: true,
  },
  addedCaregiverFacilityTypeCode: {
    valid: ValidationStatus.VALID,
    value: "",
    required: false,
    isDefaultValid: true,
  },
  addedCaregiverSiteUseID: {
    valid: ValidationStatus.VALID,
    value: "",
    required: false,
    isDefaultValid: true,
  },
  addedCaregiverID: {
    valid: ValidationStatus.VALID,
    value: "",
    required: false,
    isDefaultValid: true,
  },
  addedCaregiverAccountNumber: {
    valid: ValidationStatus.VALID,
    value: "",
    required: false,
    isDefaultValid: true,
  },

  // Submit a valid prescription
  submitPrescription: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  },
  prescriptionDoc: [],

  deliveryContactFirstName: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  },
  deliveryContactLastName: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  },
  deliveryContactPhone: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  },
  deliveryInstructions: {
    valid: ValidationStatus.VALID,
    value: "",
    isDefaultValid: true,
  },

  // Therapy Information
  lengthOfTherapy: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  },
  goalOfTherapy: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  },

  // Inpatient Transition
  wasNPWTInitiated: {
    valid: ValidationStatus.VALID,
    value: "no",
    isDefaultValid: true,
  },
  dateInitiated: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  },

  // Print Common Docs
  commonDocs: {
    valid: ValidationStatus.VALID,
    value: "",
    isDefaultValid: true,
  },

  uploadDocument: [],

  // Patient Current Address
  IsSamePermanentAddress: {
    valid: ValidationStatus.VALID,
    value: "true",
    isDefaultValid: true,
  },
  patientCurrentAddressPhone: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  },
  patientCurrentAddress1: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  },
  patientCurrentAddress2: {
    valid: ValidationStatus.VALID,
    value: "",
    isDefaultValid: true,
  },
  patientCurrentAddressState: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  },
  patientCurrentAddressCity: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  },
  patientCurrentAddressZip: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  },

  // Primary Insurance Information
  primaryInsurance: defaultInsuranceData,

  // Secondary Insurance Information
  isSecondaryInsurancePresent: {
    valid: ValidationStatus.VALID,
    value: false,
    isDefaultValid: true,
  },
  secondaryInsurance: defaultInsuranceData,

  updatedPrescriberEmail: {
    valid: ValidationStatus.VALID,
    value: "",
    isDefaultValid: true,
  },

  loggedInUserSiteUseID: {
    valid: ValidationStatus.VALID,
    value: ""
  },
};

export let defaultRequesterInfo: IRequesterInfo = {
  // Verify Requester Info
  IsRequesterSameasSubmitter: {
    valid: ValidationStatus.VALID,
    value: "yes",
    isDefaultValid: true,
  },
  requesterFirstName: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  },
  requesterLastName: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  },
  requesterEmail: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  },
};

export let defaultProductInfo: IProductInfo = {
  productInformation: {
    valid: ValidationStatus.VALID,
    value: "",
    isDefaultValid: true,
  },
  productValue: {
    valid: ValidationStatus.VALID,
    value: "",
    isDefaultValid: true,
  },
};

export let defaultDressingKit: IDressingKit = {
  //primary Vac Dressing KIT
  productId: {
    valid: ValidationStatus.VALID,
    value: "",
    isDefaultValid: true,
  },
  productCode: {
    valid: ValidationStatus.VALID,
    value: "",
    isOptional: true,
    isDefaultValid: true,
  },
  productName: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  },
  productSizeCode: {
    valid: ValidationStatus.VALID,
    value: "",
    isOptional: true,
    isDefaultValid: true,
  },
  productSizeName: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  },
  productQuantity: {
    valid: ValidationStatus.VALID,
    value: "1",
    isOptional: true,
    isDefaultValid: true,
  },
  productSizeID: {
    valid: ValidationStatus.VALID,
    value: "",
    isDefaultValid: true,
  },
  //secondary Vac Dressing KIT
  secProductId: {
    valid: ValidationStatus.VALID,
    value: "",
    isDefaultValid: true,
  },
  secProductCode: {
    valid: ValidationStatus.VALID,
    value: "",
    isOptional: true,
    isDefaultValid: true,
  },
  secProductName: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    isOptional: true,
  },
  secProductSizeCode: {
    valid: ValidationStatus.VALID,
    value: "",
    isOptional: true,
    isDefaultValid: true,
  },
  secProductSizeName: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    isOptional: true,
  },
  secProductQuantity: {
    valid: ValidationStatus.VALID,
    value: "1",
    isOptional: true,
    isDefaultValid: true,
  },
  secProductSizeID: {
    valid: ValidationStatus.VALID,
    value: "",
    isDefaultValid: true,
  },
};

export let defaultCanister: ICanister = {
  // Canister
  canisterProductName: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  },
  canisterProductCode: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  },
  canisterProductQuantity: {
    valid: ValidationStatus.VALID,
    value: "1",
    isOptional: true,
    isDefaultValid: true,
  },
  canisterProductID: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  },
};

export let defaultAccessories: IProductAccessory = {
  // Accessory
  accessories: [],
};

export let defaultDeliveryInformation: IDeliveryInformation = {
  // Accessory
  // Delivery Information
  deliveryProductNeedByDate: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  },
  deliveryProductNeedByTime: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  },
  deliverySiteType: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  },
  deliveryFacilityName: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  },
  deliveryAddressLine1: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  },
  deliveryAddressLine2: {
    valid: ValidationStatus.VALID,
    value: "",
    isDefaultValid: true,
  },
  deliveryCity: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  },
  deliveryState: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  },
  deliveryZipCode: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  },
};
