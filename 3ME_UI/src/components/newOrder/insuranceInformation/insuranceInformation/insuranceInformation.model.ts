import { IInsuranceInformation } from "./insuranceInformation.interface";
import { ValidationStatus } from "../../../../core/interfaces/input.interface";

export const defaultInsuranceData: IInsuranceInformation = {
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
      required: true,
      isOptional: true,
      isDefaultValid: true,
    },
    relationShipInsured: {
      valid: ValidationStatus.VALID,
      value: "",
      required: true,
      isOptional: true,
      isDefaultValid: true,
    },
  },
  medicaid: {
    memberID: {
      valid: ValidationStatus.VALID,
      value: "",
      required: true,
      isOptional: true,
      isDefaultValid: true,
    },
    relationShipInsured: {
      valid: ValidationStatus.VALID,
      value: "",
      required: true,
      isOptional: true,
      isDefaultValid: true,
    },
  },
  medicareAdvantage: {
    payerName: {
      valid: ValidationStatus.VALID,
      value: "",
      required: true,
      isOptional: true,
      isDefaultValid: true,
    },
    groupID: {
      valid: ValidationStatus.VALID,
      value: "",
      required: true,
      isOptional: true,
      isDefaultValid: true,
    },
    memberID: {
      valid: ValidationStatus.VALID,
      value: "",
      required: true,
      isOptional: true,
      isDefaultValid: true,
    },
    relationShipInsured: {
      valid: ValidationStatus.VALID,
      value: "",
      required: true,
      isOptional: true,
      isDefaultValid: true,
    },
    extension: {
      valid: ValidationStatus.VALID,
      value: "",
      required: true,
      isOptional: true,
      isDefaultValid: true,
    },
    payerContactNumber: {
      valid: ValidationStatus.VALID,
      value: "",
      required: true,
      isOptional: true,
      isDefaultValid: true,
    },
  },
  managedMedicaid: {
    payerName: {
      valid: ValidationStatus.VALID,
      value: "",
      required: true,
      isOptional: true,
      isDefaultValid: true,
    },
    groupID: {
      valid: ValidationStatus.VALID,
      value: "",
      required: true,
      isOptional: true,
      isDefaultValid: true,
    },
    memberID: {
      valid: ValidationStatus.VALID,
      value: "",
      required: true,
      isOptional: true,
      isDefaultValid: true,
    },
    relationShipInsured: {
      valid: ValidationStatus.VALID,
      value: "",
      required: true,
      isOptional: true,
      isDefaultValid: true,
    },
    extension: {
      valid: ValidationStatus.VALID,
      value: "",
      required: true,
      isOptional: true,
      isDefaultValid: true,
    },
    payerContactNumber: {
      valid: ValidationStatus.VALID,
      value: "",
      required: true,
      isOptional: true,
      isDefaultValid: true,
    },
  },
  commercialInsurance: {
    payerName: {
      valid: ValidationStatus.VALID,
      value: "",
      required: true,
      isOptional: true,
      isDefaultValid: true,
    },
    groupID: {
      valid: ValidationStatus.VALID,
      value: "",
      required: true,
      isOptional: true,
      isDefaultValid: true,
    },
    memberID: {
      valid: ValidationStatus.VALID,
      value: "",
      required: true,
      isOptional: true,
      isDefaultValid: true,
    },
    relationShipInsured: {
      valid: ValidationStatus.VALID,
      value: "",
      required: true,
      isOptional: true,
      isDefaultValid: true,
    },
    extension: {
      valid: ValidationStatus.VALID,
      value: "",
      required: true,
      isOptional: true,
      isDefaultValid: true,
    },
    payerContactNumber: {
      valid: ValidationStatus.VALID,
      value: "",
      required: true,
      isOptional: true,
      isDefaultValid: true,
    },
  },
  privatePay: {
    valid: ValidationStatus.VALID,
    value: "",
    required: false,
    isOptional: true,
    isDefaultValid: true,
  },
  charityCare: {
    valid: ValidationStatus.VALID,
    value: "",
    required: false,
    isOptional: true,
    isDefaultValid: true,
  },
  otherAdditionalDetails: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
    isOptional: true,
  },
};

export type ShowAdditionalFields = {
  typePrimary: {
    medicare: boolean;
    medicareAdvantage: boolean;
    managedMedicaid: boolean;
    commercialInsurance: boolean;
    medicaid: boolean;
    charityCare: boolean;
    privatePay: boolean;
    otherAdditionalDetails: boolean;
    workerCompensation: boolean;
  };
  typeSecondary: {
    medicare: boolean;
    medicareAdvantage: boolean;
    managedMedicaid: boolean;
    commercialInsurance: boolean;
    medicaid: boolean;
    charityCare: boolean;
    privatePay: boolean;
    otherAdditionalDetails: boolean;
    workerCompensation: boolean;
  };
};
