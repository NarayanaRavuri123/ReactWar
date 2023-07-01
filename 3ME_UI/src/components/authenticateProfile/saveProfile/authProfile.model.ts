import { ValidationStatus } from "../../../core/interfaces/input.interface";
import { IAuthProfile } from "./authprofile.interface";

export let defaultAuthProfile: IAuthProfile = {
  verifycode: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  },
};
