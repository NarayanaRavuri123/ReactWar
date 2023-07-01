import {
  IInputField,
  ValidationStatus,
} from "../../../../../core/interfaces/input.interface";

export let defaultShareOrderInivte: IshareOrderInvite = {
  shareOrderInviteFName: {
    value: "",
    valid: ValidationStatus.UNTOUCHED,
    required: true,
  },
  shareOrderInviteLName: {
    value: "",
    valid: ValidationStatus.UNTOUCHED,
    required: true,
  },
  shareOrderInviteEmail: {
    value: "",
    valid: ValidationStatus.UNTOUCHED,
    required: true,
  },
  shareOrderInviteNote: {
    value: "",
    valid: ValidationStatus.VALID,
    required: false,
  },
};

export interface IshareOrderInvite {
  shareOrderInviteFName: IInputField;
  shareOrderInviteLName: IInputField;
  shareOrderInviteEmail: IInputField;
  shareOrderInviteNote: IInputField;
}
