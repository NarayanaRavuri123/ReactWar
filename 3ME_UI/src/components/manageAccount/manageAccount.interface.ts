import { Dispatch, SetStateAction } from "react";
import { IInputField } from "../../core/interfaces/input.interface";
import { ManageAccountValidator } from "./manageAccount.validator";

export interface IManageAccount {
  manageAccountUserName: IInputField;
  manageAccountNewPassword: IInputField;
  manageAccountConfirmPassword: IInputField;
}

export interface IManageAccountProps {
  DefaultManageAccountData?: IManageAccount;
  Validator?: ManageAccountValidator;
  setProgbarVal: Dispatch<SetStateAction<number>>;
}
