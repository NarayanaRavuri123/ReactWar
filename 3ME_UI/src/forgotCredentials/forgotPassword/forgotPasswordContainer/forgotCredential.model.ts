import {
  ForgotPasswordChannel,
  ForgotPasswordOption,
} from "./forgotCredentialPages.enum";
import { ForgotPasswordInfo } from "./forgotCredential.interface";

export let defaultForgotPassordInfoData: ForgotPasswordInfo = {
  userName: "",
  choosedOption: ForgotPasswordOption.NONE,
  emailId: "",
  maskedEmailId: "",
  mobileNumber: "",
  maksedMobileNumber: "",
  isForgotPasswordFlow: true,
  isResendSuccess: false,
  channel: ForgotPasswordChannel.NONE,
};
