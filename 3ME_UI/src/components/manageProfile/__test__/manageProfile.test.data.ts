import { IManageProfile } from "../manageProfile.interface";
import { ValidationStatus } from "../../../core/interfaces/input.interface";

export let profileTestData: IManageProfile = {
  // account information
  firstName: {
    valid: ValidationStatus.UNTOUCHED,
    value: "Frank",
    required: false,
  },
  lastName: {
    valid: ValidationStatus.UNTOUCHED,
    value: "Darcy",
    required: false,
  },
  userName: {
    valid: ValidationStatus.UNTOUCHED,
    value: "DarcyBro925",
    required: false,
  },
  licenseType: {
    valid: ValidationStatus.VALID,
    value: "MD",
    required: false,
  },
  department: {
    valid: ValidationStatus.VALID,
    value: "Administration",
    required: false,
  },
  title: {
    valid: ValidationStatus.UNTOUCHED,
    value: "Home health overload",
    required: false,
  },

  // contact information
  email: {
    valid: ValidationStatus.UNTOUCHED,
    value: "Dunbrother@gmail.com",
    required: false,
  },
  verifyEmail: {
    valid: ValidationStatus.UNTOUCHED,
    value: "Dunbrother@gmail.com",
    required: false,
  },
  phone: {
    valid: ValidationStatus.UNTOUCHED,
    value: "6513466510",
    required: false,
  },
  phoneType: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: false,
  },
  extension: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: false,
  },

  // communication preference
  preferenceType: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: false,
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
    valid: ValidationStatus.UNTOUCHED,
    value: "Acelity@1234567",
    required: false,
  },
  currentPassword: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: false,
  },
  newPassword: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: false,
  },
  confirmPassword: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: false,
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
};
