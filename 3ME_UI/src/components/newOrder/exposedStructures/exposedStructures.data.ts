import { MultipleActionsProps } from "../newOrderWoundInfoStepper/newOrderWoundInfo.interface";

export const exposedStructuresData : MultipleActionsProps[]= [
  {
    value: "Subcutaneous Tissue",
    label: "Subcutaneous Tissue",
    selected: false,
  },
  { value: "Muscle", label: "Muscle", selected: false },
  { value: "Tendon", label: "Tendon", selected: false },
  { value: "Bone", label: "Bone", selected: false },
];

export const mockExposedStructuresData : MultipleActionsProps[]= [
  {
    value: "Subcutaneous Tissue",
    label: "Subcutaneous Tissue",
    selected: true,
  },
  { value: "Muscle", label: "Muscle", selected: false },
  { value: "Tendon", label: "Tendon", selected: true },
  { value: "Bone", label: "Bone", selected: false },
];
