import { ValidationStatus } from "../../../core/interfaces/input.interface";
import { MultipleActionsProps } from "../newOrderWoundInfoStepper/newOrderWoundInfo.interface";

export const previousTherapy: MultipleActionsProps[] = [
  { value: "Saline Gauze", label: "Saline Gauze", selected: false },
  { value: "Hydrogel", label: "Hydrogel", selected: false },
  { value: "Alginate", label: "Alginate", selected: false },
  { value: "Hydrocolloid", label: "Hydrocolloid", selected: false },
  { value: "Absorptive", label: "Absorptive", selected: false },
  { value: "None", label: "None", selected: false },
  { value: "Other", label: "Other", selected: false },
];

export const previousTherapyCause: MultipleActionsProps[] = [
  {
    value: "Presence of comorbidities",
    label: "Presence of comorbidities",
    selected: false,
  },
  {
    value: "High risk of infections",
    label: "High risk of infections",
    selected: false,
  },
  {
    value: "Need for accelerated granulation tissue",
    label: "Need for accelerated granulation tissue",
    selected: false,
  },
  {
    value: "Prior history of delayed wound healing",
    label: "Prior history of delayed wound healing",
    selected: false,
  },
  { value: "Other", label: "Other", selected: false },
];

export const osteomyelitisies = [
  {
    value: "Antibiotic",
    label: "Antibiotic",
    selected: false,
    isRequiredTextBox: true,
    textBoxLabel: "antibiotic-text",
    textBoxValue: null,
    textBoxPlaceHolder: "Enter antibiotic name",
    isTextBoxValueValid: ValidationStatus.UNTOUCHED,
  },
  {
    value: "IV Antibiotics",
    label: "IV Antibiotics",
    selected: false,
    isRequiredTextBox: true,
    textBoxLabel: "ivAntibiotics-text",
    textBoxValue: null,
    textBoxPlaceHolder: "Enter antibiotic name",
    isTextBoxValueValid: ValidationStatus.UNTOUCHED,
  },
  {
    value: "Hyperbaric Oxygen",
    label: "Hyperbaric Oxygen",
    selected: false,
    isRequiredTextBox: false,
    textBoxLabel: null,
    textBoxValue: null,
    textBoxPlaceHolder: null,
    isTextBoxValueValid: ValidationStatus.UNTOUCHED,
  },
];

export const mockOsteomyelitisies = [
  {
    value: "Antibiotic",
    label: "Antibiotic",
    selected: true,
    isRequiredTextBox: true,
    textBoxLabel: "antibiotic-text",
    textBoxValue: "Rahul",
    textBoxPlaceHolder: "Enter antibiotic name",
    isTextBoxValueValid: ValidationStatus.UNTOUCHED,
  },
  {
    value: "IV Antibiotics",
    label: "IV Antibiotics",
    selected: false,
    isRequiredTextBox: true,
    textBoxLabel: "ivAntibiotics-text",
    textBoxValue: null,
    textBoxPlaceHolder: "Enter antibiotic name",
    isTextBoxValueValid: ValidationStatus.UNTOUCHED,
  },
  {
    value: "Hyperbaric Oxygen",
    label: "Hyperbaric Oxygen",
    selected: true,
    isRequiredTextBox: false,
    textBoxLabel: null,
    textBoxValue: null,
    textBoxPlaceHolder: null,
    isTextBoxValueValid: null,
  },
];
