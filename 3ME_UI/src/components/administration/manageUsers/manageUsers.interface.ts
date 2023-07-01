import { MouseEventHandler } from "react";

export interface IManageUser {}

export interface IAddNewUserButton {
  isUserBtnVisible?: boolean;
  onClickHandler?: MouseEventHandler<HTMLButtonElement>;
  isUserBtnDisabled?: boolean;
  testId?: string;
}
