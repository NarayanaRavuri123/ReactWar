import { MouseEventHandler, ReactNode } from "react";

export interface IPopup {
  openFlag: any;
  children: ReactNode;
  closeIconClass?: string;
  closeHandler: () => {} | void;
  dialogParentClass?: string;
  hideCloseButton?: boolean;
  onClickHandler?: MouseEventHandler<HTMLDivElement>;
}
