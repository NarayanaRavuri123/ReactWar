import { ValidationStatus } from "../../../../core/interfaces/input.interface";
import { IInsuranceInformation } from "../insuranceInformation/insuranceInformation.interface";

export const insuranceTestData: IInsuranceInformation = {
  insuranceType: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
  insuranceTypeCode: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
  medicare: {
    memberID: {
      valid: ValidationStatus.VALID,
      value: "",
      required: false,
      isOptional: true,
    },
    relationShipInsured: {
      valid: ValidationStatus.VALID,
      value: "",
      required: false,
      isOptional: true,
    },
  },
  medicareAdvantage: {
    payerName: {
      valid: ValidationStatus.VALID,
      value: "",
      required: false,
      isOptional: true,
    },
    groupID: {
      valid: ValidationStatus.VALID,
      value: "",
      required: false,
      isOptional: true,
    },
    memberID: {
      valid: ValidationStatus.VALID,
      value: "",
      required: false,
      isOptional: true,
    },
    relationShipInsured: {
      valid: ValidationStatus.VALID,
      value: "",
      required: false,
      isOptional: true,
    },
    extension: {
      valid: ValidationStatus.VALID,
      value: "",
      required: false,
      isOptional: true,
    },
    payerContactNumber: {
      valid: ValidationStatus.VALID,
      value: "",
      required: false,
      isOptional: true,
    },
  },
  managedMedicaid: {
    payerName: {
      valid: ValidationStatus.VALID,
      value: "",
      required: false,
      isOptional: true,
    },
    groupID: {
      valid: ValidationStatus.VALID,
      value: "",
      required: false,
      isOptional: true,
    },
    memberID: {
      valid: ValidationStatus.VALID,
      value: "",
      required: false,
      isOptional: true,
    },
    relationShipInsured: {
      valid: ValidationStatus.VALID,
      value: "",
      required: false,
      isOptional: true,
    },
    extension: {
      valid: ValidationStatus.VALID,
      value: "",
      required: false,
      isOptional: true,
    },
    payerContactNumber: {
      valid: ValidationStatus.VALID,
      value: "",
      required: false,
      isOptional: true,
    },
  },
  commercialInsurance: {
    payerName: {
      valid: ValidationStatus.VALID,
      value: "",
      required: false,
      isOptional: true,
    },
    groupID: {
      valid: ValidationStatus.VALID,
      value: "",
      required: false,
      isOptional: true,
    },
    memberID: {
      valid: ValidationStatus.VALID,
      value: "",
      required: false,
      isOptional: true,
    },
    relationShipInsured: {
      valid: ValidationStatus.VALID,
      value: "",
      required: false,
      isOptional: true,
    },
    extension: {
      valid: ValidationStatus.VALID,
      value: "",
      required: false,
      isOptional: true,
    },
    payerContactNumber: {
      valid: ValidationStatus.VALID,
      value: "",
      required: false,
      isOptional: true,
    },
  },
  medicaid: {
    memberID: {
      valid: ValidationStatus.VALID,
      value: "",
      required: false,
      isOptional: true,
    },
    relationShipInsured: {
      valid: ValidationStatus.VALID,
      value: "",
      required: false,
      isOptional: true,
    },
  },
  charityCare: {
    valid: ValidationStatus.VALID,
    value: "",
    required: false,
  },
  privatePay: {
    valid: ValidationStatus.VALID,
    value: "",
    required: false,
  },
  otherAdditionalDetails: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
};
