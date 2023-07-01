import { ValidationStatus } from "../../../../../../core/interfaces/input.interface";

export const woundInfectionData: any[] = [
  { value: "Osteomyelitis", label: "Osteomyelitis" },
  { value: "Bacterial", label: "Bacterial" },
  { value: "Viral", label: "Viral" },
  { value: "Fungal", label: "Fungal" },
  { value: "Other", label: "Other" },
];
export const treatmentRegimenData = [
  {
    value: "Antibiotic",
    label: "Antibiotic",
    selected: false,
    isRequiredTextBox: true,
    textBoxLabel: "antibiotic",
    textBoxValue: "",
    textBoxPlaceHolder: "Name of antibiotic",
    isTextBoxValueValid: ValidationStatus.UNTOUCHED,
  },
  {
    value: "IV Antibiotics",
    label: "IV Antibiotics",
    selected: false,
    isRequiredTextBox: true,
    textBoxLabel: "ivantibiotics",
    textBoxValue: "",
    textBoxPlaceHolder: "Name of antibiotic",
    isTextBoxValueValid: ValidationStatus.UNTOUCHED,
  },
  {
    value: "Hyperbaric Oxygen",
    label: "Hyperbaric Oxygen",
    selected: false,
    isRequiredTextBox: false,
    textBoxLabel: "hyperbaricoxygen",
    textBoxValue: "",
    textBoxPlaceHolder: null,
    isTextBoxValueValid: ValidationStatus.UNTOUCHED,
  },
  {
    value: "Untreated",
    label: "Untreated",
    selected: false,
    isRequiredTextBox: false,
    textBoxLabel: "untreated",
    textBoxValue: "",
    textBoxPlaceHolder: null,
    isTextBoxValueValid: ValidationStatus.UNTOUCHED,
  },
];
