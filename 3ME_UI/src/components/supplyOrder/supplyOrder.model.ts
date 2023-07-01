import { ISupplyOrder } from "./supplyOrder.interface";
import { ValidationStatus } from "../../core/interfaces/input.interface";
import { VacDressingKitModel } from "../newOrder/dressingSupplies/vacDressingKit/vacDressingKit.interface";

export let defaultSupplyOrderData: ISupplyOrder = {
  typeOfOrder: {
    valid: ValidationStatus.VALID,
    value: "Yes",
    required: true,
  },
  currentSuppliesVacDressingQuantity: {
    valid: ValidationStatus.VALID,
    value: "0",
    required: true,
  },
  currentSuppliesVacCannisterQuantity: {
    valid: ValidationStatus.VALID,
    value: "0",
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
    valid: ValidationStatus.VALID,
    value: "No",
    required: false,
  },
  caAddressLine1: {
    valid: ValidationStatus.VALID,
    value: "",
    required: true,
    isDefaultValid: true,
  },
  caAddressLine2: {
    valid: ValidationStatus.VALID,
    value: "",
    required: false,
    isDefaultValid: true,
  },
  caCity: {
    valid: ValidationStatus.VALID,
    value: "",
    required: true,
    isDefaultValid: true,
  },
  caState: {
    valid: ValidationStatus.VALID,
    value: "",
    required: true,
    isDefaultValid: true,
  },
  caZipCode: {
    valid: ValidationStatus.VALID,
    value: "",
    required: true,
    isDefaultValid: true,
  },
  addressLine1: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
    isDefaultValid: true,
    isOptional: false,
  },
  addressLine2: {
    valid: ValidationStatus.VALID,
    value: "",
    required: false,
    isDefaultValid: true,
    isOptional: false,
  },
  city: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
    isDefaultValid: true,
    isOptional: false,
  },
  state: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
    isDefaultValid: true,
    isOptional: false,
  },
  zipCode: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
    isDefaultValid: true,
    isOptional: false,
  },
  resupplyJustification: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
};

export type showSupplyOrderVacDressing = {
  showSize: boolean;
  showQunatity: boolean;
  showPrimaryDressingKit: boolean;
  isPrimaryVacKitDressingDisabled: boolean;
  isPrimaryVacKitDressingMinusDisabled: boolean;
  showAddDressingBtn: boolean;
};

export type showSupplyOrderSecondaryVacDressing = {
  showSecSize: boolean;
  showSecQunatity: boolean;
  showSecondaryDressingKit: boolean;
  isSecondaryVacKitDressingDisabled: boolean;
  isSecondaryVacKitDressingMinusDisabled: boolean;
};
export const defaultShowSupplySecondaryVacDressing: showSupplyOrderSecondaryVacDressing =
  {
    showSecSize: false,
    showSecQunatity: false,
    showSecondaryDressingKit: false,
    isSecondaryVacKitDressingDisabled: false,
    isSecondaryVacKitDressingMinusDisabled: true,
  };

export const defaultShowSupplyVacDressing: showSupplyOrderVacDressing = {
  showSize: false,
  showQunatity: false,
  showPrimaryDressingKit: false,
  isPrimaryVacKitDressingDisabled: false,
  isPrimaryVacKitDressingMinusDisabled: true,
  showAddDressingBtn: true,
};

export type showSupplyOrderVacCanister = {
  showSize: boolean;
  showQunatity: boolean;
  showCanisterKit: boolean;
  isVacKitCanisterDisabled: boolean;
  isVacKitCanisterMinusDisabled: boolean;
  showAddDressingBtn: boolean;
};

export const defaultShowSupplyVacCanister: showSupplyOrderVacCanister = {
  showSize: false,
  showQunatity: false,
  showCanisterKit: false,
  isVacKitCanisterDisabled: false,
  isVacKitCanisterMinusDisabled: true,
  showAddDressingBtn: true,
};

export const defaultVacDressingKitModel: VacDressingKitModel = {
  items: [],
};
