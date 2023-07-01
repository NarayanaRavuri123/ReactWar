import { ReactNode } from "react";

export interface IAlertDetailInterface {
  title: string;
  titleClassName: string;
  body: string;
  footer: string;
  buttonIcon?: ReactNode;
  buttonOnClick?: () => void;
  showCallForAssistance: boolean;
  showEmptyPopUp?: boolean;
}
