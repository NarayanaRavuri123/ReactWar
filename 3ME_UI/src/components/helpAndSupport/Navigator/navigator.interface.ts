import { MouseEventHandler } from "react";

export interface INavigator {
  array: IRouter[];
  className?: string;
  title: string;
  isStateDataPresent?: boolean;
  stateData?: any;
}

export interface IRouter {
  onLinkClick?: any;
  pageName: string;
  route: string;
}
