import { MouseEventHandler } from "react";

export interface IProfileCancel {
  stayHandler: MouseEventHandler<HTMLButtonElement>;
  redirectTo: string;
}
