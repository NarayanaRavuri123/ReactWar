import { ValidationStatus } from "../../core/interfaces/input.interface";
import { IManageAccount } from "./manageAccount.interface";

export let defaultAccountData: IManageAccount = {
  manageAccountUserName: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
  manageAccountNewPassword: {
    valid: ValidationStatus.VALID,
    value: "",
    required: true,
  },
  manageAccountConfirmPassword: {
    valid: ValidationStatus.VALID,
    value: "",
    required: false,
    errorMessage: null,
  },
};
