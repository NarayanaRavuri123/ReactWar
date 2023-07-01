import { IForgotUserName } from "./forgotUsername.interface";
import { ValidationStatus } from "../../core/interfaces/input.interface";

export let defaultUsernameData: IForgotUserName = {
  email: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  },
};
