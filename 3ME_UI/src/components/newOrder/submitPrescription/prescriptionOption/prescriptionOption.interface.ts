import { MouseEvent } from "react";

export interface IPrescriptionOption {
  id: string;
  title: string;
  description: string;
  isOptionSelected: boolean;
  prescriptionClassName: string;
  buttonOnClick?: (e: MouseEvent<HTMLElement>) => void;
  isFaxLater?: boolean;
  phoneNumber?: string;
}
