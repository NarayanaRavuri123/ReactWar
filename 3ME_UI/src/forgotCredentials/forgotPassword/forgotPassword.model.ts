import { ValidationStatus } from "../../core/interfaces/input.interface";
import { IForgotPassword } from "./forgotPassword.interface";

export let defaultForgotPasswordData: IForgotPassword = {
  userName: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  },
};
