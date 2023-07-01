import { MouseEventHandler, ReactNode } from "react";

export interface IExpressBtn {
  children: ReactNode;
  variant: "text" | "outlined" | "contained";
  clickHandler?: MouseEventHandler<HTMLButtonElement>;
  parentClass?: string;
  disabled?: boolean;
  testId?: string;
  startIcon?: React.ReactNode;
  id?: string;
}
