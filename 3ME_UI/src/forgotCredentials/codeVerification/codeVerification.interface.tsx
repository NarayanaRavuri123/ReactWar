import { IInputField } from "../../core/interfaces/input.interface";
import { ForgotPasswordInfo } from "../forgotPassword/forgotPasswordContainer/forgotCredential.interface";

export interface ICodeVerification {
  data: ForgotPasswordInfo;
  setData: Function;
  errorMessage: string | null;
  backButtonAction: Function;
  resendCodeAction: Function;
  verifyCodeAction: Function;
}

export interface ICode {
  code: IInputField;
}
