import { ValidationStatus } from "../../../core/interfaces/input.interface";
import { IManageProfile } from "../../../components/manageProfile/manageProfile.interface";

export let defaultRegistrationFormData: IManageProfile = {
  // account information
  firstName: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
  lastName: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
  userName: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
    errorMessage: null,
  },
  licenseType: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
  department: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
  title: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },

  // contact information
  email: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
    errorMessage: null,
  },
  verifyEmail: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
    errorMessage: null,
  },
  phone: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
  extension: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: false,
  },
  phoneType: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
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
  newPassword: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
    errorMessage: null,
  },
  confirmPassword: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
    errorMessage: null,
  },

  // email notification preference
  rentalActivity: {
    valid: ValidationStatus.VALID,
    value: "no",
    required: false,
  },
  salesActivity: {
    valid: ValidationStatus.VALID,
    value: "no",
    required: false,
  },
  pickUpRequest: {
    valid: ValidationStatus.VALID,
    value: "no",
    required: false,
  },
  facilityRegistered: {
    valid: ValidationStatus.VALID,
    value: "no",
    required: false,
  },
  // message to admin
  adminMessage: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: false,
  },
};
