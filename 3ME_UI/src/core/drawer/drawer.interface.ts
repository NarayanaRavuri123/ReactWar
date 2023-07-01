import { ReactNode } from "react";

export interface IExpressDrawer {
  direction: Anchor,
  children: ReactNode,
  openFlag: boolean
}
type Anchor = 'top' | 'left' | 'bottom' | 'right';