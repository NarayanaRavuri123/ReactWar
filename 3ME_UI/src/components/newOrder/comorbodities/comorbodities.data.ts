import { MultipleActionsProps } from "../newOrderWoundInfoStepper/newOrderWoundInfo.interface";

export const comorbiditiesData : MultipleActionsProps[]= [
  { value: "Diabetes", label: "Diabetes", selected: false },
  { value: "Immobility", label: "Immobility", selected: false },
  { value: "Immunocompromised", label: "Immunocompromised", selected: false },
  {
    value: "End-Stage Renal Disease (ESRD)",
    label: "End-Stage Renal Disease (ESRD)",
    selected: false,
  },
  {
    value: "Peripheral vascular disease (PVD)",
    label: "Peripheral vascular disease (PVD)",
    selected: false,
  },
  {
    value: "Peripheral arterial disease (PAD)",
    label: "Peripheral arterial disease (PAD)",
    selected: false,
  },
  { value: "Obesity", label: "Obesity", selected: false },
  { value: "Smoking", label: "Smoking", selected: false },
  { value: "Depression", label: "Depression", selected: false },
  { value: "Other", label: "Other", selected: false },
];

export const mockComorbiditiesData : MultipleActionsProps[]= [
  { value: "Diabetes", label: "Diabetes", selected: false },
  { value: "Immobility", label: "Immobility", selected: true },
  { value: "Immunocompromised", label: "Immunocompromised", selected: false },
  {
    value: "End-Stage Renal Disease (ESRD)",
    label: "End-Stage Renal Disease (ESRD)",
    selected: true,
  },
  {
    value: "Peripheral vascular disease (PVD)",
    label: "Peripheral vascular disease (PVD)",
    selected: false,
  },
  {
    value: "Peripheral arterial disease (PAD)",
    label: "Peripheral arterial disease (PAD)",
    selected: true,
  },
  { value: "Obesity", label: "Obesity", selected: false },
  { value: "Smoking", label: "Smoking", selected: true },
  { value: "Depression", label: "Depression", selected: false },
  { value: "Other", label: "Other", selected: true },
];
