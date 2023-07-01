import {
  ForgotCredentialPages,
  ForgotPasswordChannel,
  ForgotPasswordOption,
} from "./forgotCredentialPages.enum";

export interface ForgotPasswordInfo {
  userName: string;
  choosedOption: ForgotPasswordOption;
  emailId: string;
  maskedEmailId: string;
  mobileNumber: string;
  maksedMobileNumber: string;
  isForgotPasswordFlow: boolean;
  isResendSuccess: boolean;
  channel: ForgotPasswordChannel;
}

export interface IForgotCredentialContainer {
  defaultPageSection?: ForgotCredentialPages;
}
