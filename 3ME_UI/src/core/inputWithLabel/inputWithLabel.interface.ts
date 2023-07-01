import { SxProps, Theme } from "@mui/material";
import { ReactNode } from "react";

export interface IInputWithLabel {
  label?: string;
  isRequired?: boolean | undefined;
  children: ReactNode;
  sx?: SxProps<Theme> | undefined;
  error?: boolean;
  labelClassName?: string | undefined;
  testId?: string | undefined;
  errorMessage?: string | null;
  showLabel?: boolean;
}
