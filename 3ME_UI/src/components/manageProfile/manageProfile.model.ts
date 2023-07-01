import { IManageProfile } from "./manageProfile.interface";
import { ValidationStatus } from "../../core/interfaces/input.interface";

export let defaultProfileData: IManageProfile = {
  // account information
  firstName: {
    valid: ValidationStatus.VALID,
    value: "",
    required: true,
  },
  lastName: {
    valid: ValidationStatus.VALID,
    value: "",
    required: true,
  },
  userName: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: false,
    errorMessage: null,
  },
  licenseType: {
    valid: ValidationStatus.VALID,
    value: "",
    required: true,
  },
  department: {
    valid: ValidationStatus.VALID,
    value: "",
    required: true,
  },
  title: {
    valid: ValidationStatus.VALID,
    value: "",
    required: true,
  },

  // contact information
  email: {
    valid: ValidationStatus.VALID,
    value: "",
    required: true,
  },
  phone: {
    valid: ValidationStatus.VALID,
    value: "",
    required: true,
  },
  phoneType: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
  extension: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  },

  // communication preference
  preferenceType: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
  emailPreference: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: false,
  },
  smsPreference: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: false,
  },
  smsTnCAccept: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: false,
  },

  // password administration
  password: {
    valid: ValidationStatus.VALID,
    value: "",
  },
  currentPassword: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  },
  newPassword: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  },
  confirmPassword: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  },

  // email notification preference
  rentalActivity: {
    valid: ValidationStatus.VALID,
    value: "no",
  },
  salesActivity: {
    valid: ValidationStatus.VALID,
    value: "no",
  },
  pickUpRequest: {
    valid: ValidationStatus.VALID,
    value: "no",
  },
};
