import { MouseEventHandler } from "react";

export interface IAddPatientButton {
  isBtnVisible: boolean;
  onClickHandler: MouseEventHandler<HTMLButtonElement>;
  isBtnDisabled?: boolean;
  testId?: string;
}
