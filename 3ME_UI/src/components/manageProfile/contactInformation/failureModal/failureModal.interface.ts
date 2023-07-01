import { MouseEventHandler } from "react";

export interface IFailureModal {
  message: string;
  returnBtnAction?: MouseEventHandler<HTMLButtonElement>;
}
