import { ISupplyOrder } from "../supplyOrder.interface";
import { ValidationStatus } from "../../../core/interfaces/input.interface";

export let supplyOrderTestData: ISupplyOrder = {
  typeOfOrder: {
    valid: ValidationStatus.UNTOUCHED,
    value: "Yes",
    required: true,
  },
  currentSuppliesVacDressingQuantity: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
  currentSuppliesVacCannisterQuantity: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
  dressingChangeFrequency: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
  provideAdditionalInfo: {
    valid: ValidationStatus.VALID,
    value: "",
    required: false,
  },
  sameAsCurrentAddress: {
    valid: ValidationStatus.UNTOUCHED,
    value: "No",
    required: false,
  },
  caAddressLine1: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
    isDefaultValid: true,
  },
  caAddressLine2: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: false,
    isDefaultValid: true,
  },
  caCity: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
    isDefaultValid: true,
  },
  caState: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
    isDefaultValid: true,
  },
  caZipCode: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
    isDefaultValid: true,
  },
  addressLine1: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
    isDefaultValid: true,
  },
  addressLine2: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
    isDefaultValid: true,
  },
  city: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
    isDefaultValid: true,
  },
  state: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
    isDefaultValid: true,
  },
  zipCode: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
    isDefaultValid: true,
  },
  resupplyJustification: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
};
