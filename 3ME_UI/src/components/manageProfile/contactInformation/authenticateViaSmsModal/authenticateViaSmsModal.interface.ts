import { MouseEventHandler } from "react";
import { IManageProfile } from "../../manageProfile.interface";
import { IAuthProfile } from "../../../authenticateProfile/saveProfile/authprofile.interface";

export interface IAuthenticateViaSmsModal {
  code: IAuthProfile;
  data: IManageProfile | undefined;
  error?: string;
  isOnlyEmailPreference?: boolean;
  instanceId?: string;
  resendBtnAction?: MouseEventHandler<HTMLButtonElement>;
  setCode: any;
  showLoader?: boolean;
  submitBtnAction?: any;
  startPolling?: any;
  stopPolling?: any;
}
