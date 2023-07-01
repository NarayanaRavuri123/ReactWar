import { MouseEventHandler } from "react";
import { IAuthProfile } from "../../../authenticateProfile/saveProfile/authprofile.interface";
import { IManageProfile } from "../../manageProfile.interface";

export interface IAuthenticateViaEmailModal {
  code: IAuthProfile;
  data: IManageProfile | undefined;
  error?: string;
  instanceId?: string;
  resendBtnAction?: MouseEventHandler<HTMLButtonElement>;
  setCode: any;
  showLoader?: boolean;
  submitBtnAction?: any;
}

export enum CommunicationPreferences {
  NONE = "none",
  EMAIL = "email",
  SMS = "sms",
  BOTH = "both",
}
