import {
  ICanister,
  IDressingKit,
  INewOrder,
  IProductAccessory,
  IProductInfo,
  IRequesterInfo,
} from "../newOrder.interface";
import { ValidationStatus } from "../../../core/interfaces/input.interface";
import { insuranceTestData } from "../insuranceInformation/__test__/insuranceInformation.test.data";

export let newOrderTestData: INewOrder = {
  address1: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  },
  address2: {
    valid: ValidationStatus.VALID,
    value: "",
  },
  city: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  },
  dob: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  },
  email: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  },
  firstName: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  },
  lastName: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
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
  },
  emergencyContactLastName: {
    valid: ValidationStatus.VALID,
    value: "",
  },
  emergencyContactPhoneNumber: {
    valid: ValidationStatus.VALID,
    value: "",
  },

  // Contributing Cause
  contributingCause: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  },
  dateOfAccident: {
    valid: ValidationStatus.VALID,
    value: "",
  },
  accidentType: {
    valid: ValidationStatus.VALID,
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
  },
  addedCaregiverFacilityTypeCode: {
    valid: ValidationStatus.VALID,
    value: "",
    required: false,
  },
  addedCaregiverSiteUseID: {
    valid: ValidationStatus.VALID,
    value: "",
    required: false,
  },
  addedCaregiverID: {
    valid: ValidationStatus.VALID,
    value: "",
    required: false,
  },
  addedCaregiverAccountNumber: {
    valid: ValidationStatus.VALID,
    value: "",
    required: false,
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
    valid: ValidationStatus.UNTOUCHED,
    value: "",
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
    value: "yes",
  },
  dateInitiated: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  },

  // Print Common Docs
  commonDocs: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  },

  //upload Document
  uploadDocument: [],

  // Patient Current Address
  IsSamePermanentAddress: {
    valid: ValidationStatus.VALID,
    value: "false",
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
  primaryInsurance: insuranceTestData,

  // Secondary Insurance Information
  isSecondaryInsurancePresent: {
    valid: ValidationStatus.VALID,
    value: false,
    isDefaultValid: true,
  },
  secondaryInsurance: insuranceTestData,

  updatedPrescriberEmail: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    isOptional: true,
  },

  loggedInUserSiteUseID: {
    valid: ValidationStatus.VALID,
    value: "",
  },
};

export let requesterTestData: IRequesterInfo = {
  // Verify Requester Info
  IsRequesterSameasSubmitter: {
    valid: ValidationStatus.VALID,
    value: "no",
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

export let productTestData: IProductInfo = {
  // Product Information
  productInformation: {
    valid: ValidationStatus.VALID,
    value: "",
  },
  productValue: {
    valid: ValidationStatus.VALID,
    value: "",
  },
};

export let dressingTestData: IDressingKit = {
  //primary Vac Dressing KIT
  productId: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    isOptional: true,
  },
  productCode: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    isOptional: true,
  },
  productSizeCode: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    isOptional: true,
  },
  productSizeName: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    isOptional: true,
  },
  productName: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    isOptional: true,
  },
  productQuantity: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    isOptional: true,
  },
  productSizeID: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    isOptional: true,
  },

  //secondary Vac Dressing KIT
  secProductName: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    isOptional: true,
  },
  secProductCode: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    isOptional: true,
  },
  secProductSizeName: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    isOptional: true,
  },
  secProductId: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    isOptional: true,
  },
  secProductSizeCode: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    isOptional: true,
  },
  secProductQuantity: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    isOptional: true,
  },
  secProductSizeID: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    isOptional: true,
  },
};

export let canisterTestData: ICanister = {
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
    isOptional: true,
  },
};

export let accessoryTestData: IProductAccessory = {
  // Accessory
  accessories: [],
};
