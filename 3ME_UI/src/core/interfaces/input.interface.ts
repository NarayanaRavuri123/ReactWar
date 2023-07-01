export interface IInputField {
  value: string;
  valid: ValidationStatus;
  required?: boolean;
  minimumRequired?: boolean;
  errorMessage?: string | null;
  isDefaultValid?: boolean;
  isOptional?: boolean;
}

export interface IInputFieldNullable {
  value: string | null;
  valid: ValidationStatus;
}

export type Validation = {
  status: ValidationStatus;
  message?: string | null;
};
export enum ValidationStatus {
  UNTOUCHED = "untouched",
  VALID = "valid",
  INVALID = "invalid",
}

export interface MultiCheckbox {
  value: any;
  valid: ValidationStatus;
  required?: boolean;
  defaultRequired?: boolean;
}
