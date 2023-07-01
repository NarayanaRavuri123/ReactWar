import { IInputField } from "../../core/interfaces/input.interface";
import { ForgotPasswordOption } from "./forgotPasswordContainer/forgotCredentialPages.enum";
export interface IForgotPasswordProps {
  errorMessage: string | null;
  preferedOption: ForgotPasswordOption;
  resetPasswordAction: Function;
  setErrorMessage: Function;
  setPreferedOption: Function;
}

export interface IForgotPassword {
  userName: IInputField;
}
