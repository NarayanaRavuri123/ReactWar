import { MouseEventHandler } from "react";

export interface IConfirmLeaveModal {
  updatePopUp: any;
  leaveBtnAction?: MouseEventHandler<HTMLButtonElement>;
  continueBtnAction?: MouseEventHandler<HTMLButtonElement>;
}
