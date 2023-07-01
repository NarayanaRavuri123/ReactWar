import { IUserProfile } from "./userProfile.interface";
import { ValidationStatus } from "../../../../core/interfaces/input.interface";

export let defaultUserProfileData: IUserProfile = {
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
  phone: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
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
  facilities: [],
};

export let mockUserProfileData: IUserProfile = {
  // account information
  firstName: {
    valid: ValidationStatus.UNTOUCHED,
    value: "rahul",
    required: true,
  },
  lastName: {
    valid: ValidationStatus.UNTOUCHED,
    value: "dravid",
    required: true,
  },
  userName: {
    valid: ValidationStatus.UNTOUCHED,
    value: "rakshitha_cs",
    required: true,
    errorMessage: null,
  },
  licenseType: {
    valid: ValidationStatus.UNTOUCHED,
    value: "CNA",
    required: true,
  },
  department: {
    valid: ValidationStatus.UNTOUCHED,
    value: "Administration",
    required: true,
  },
  title: {
    valid: ValidationStatus.UNTOUCHED,
    value: "Admin",
    required: true,
  },

  // contact information
  email: {
    valid: ValidationStatus.UNTOUCHED,
    value: "abc@gmail.com",
    required: true,
    errorMessage: null,
  },
  phone: {
    valid: ValidationStatus.UNTOUCHED,
    value: "102-345-6789",
    required: true,
  },
  phoneType: {
    valid: ValidationStatus.UNTOUCHED,
    value: "phone",
    required: false,
  },
  extension: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: false,
  },
  facilities: [
    {
      activityStauts: 1,
      accountName: "Hope Home Health ",
      accountNumber: 300145,
      address1: "23 App1le Ave east side",
      address2: null,
      facilityAddressID: 1,
      city: "Bareburn",
      state: "TX",
      zip: "78205",
      userRole: "Admin",
      siteUseId: "1",
      status: "Active",
      permissions: [
        { name: "3M_REP_ACCESS", status: "Enabled" },
        { name: "RENTAL_ORDERS", status: "Disabled" },
        { name: "SALES_ORDERS", status: "Disabled" },
        { name: "ALL_FACILITY_PATIENTS", status: "Enabled" },
        { name: "WOUND_MEASUREMENTS", status: "Enabled" },
        { name: "INVENTORY", status: "Enabled" },
        { name: "MFA", status: "Enabled" },
      ],
    },
    {
      activityStauts: 1,
      accountName: "Hope Home Health 1",
      accountNumber: 300146,
      address1: "23 App1le Ave west side",
      address2: null,
      facilityAddressID: 123,
      city: "Texas",
      state: "TX",
      zip: "78217",
      userRole: "Clinician",
      siteUseId: "2",
      status: "Inactive",
      permissions: [
        { name: "3M_REP_ACCESS", status: "Disabled" },
        { name: "RENTAL_ORDERS", status: "Disabled" },
        { name: "SALES_ORDERS", status: "Disabled" },
        { name: "ALL_FACILITY_PATIENTS", status: "Enabled" },
        { name: "WOUND_MEASUREMENTS", status: "Disabled" },
        { name: "INVENTORY", status: "Enabled" },
        { name: "MFA", status: "Enabled" },
      ],
    },
  ],
};
