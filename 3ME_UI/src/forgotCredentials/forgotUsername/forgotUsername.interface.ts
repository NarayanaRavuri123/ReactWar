import { IInputField } from "../../core/interfaces/input.interface";
import { ForgotCredentialValidator } from "../forgotCredentialContainer/forgotCredential.validator";

export interface IForgotUserName {
  email: IInputField;
}

export interface ForgotUsernameInterface {
  data?: IForgotUserName;
  Validator?: ForgotCredentialValidator;
}
