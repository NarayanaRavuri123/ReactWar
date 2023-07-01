import { MultipleActionsProps } from "../newOrderWoundInfoStepper/newOrderWoundInfo.interface";

export const nutriActionData: MultipleActionsProps[] = [
  { value: "Protein Supplements", label: "Protein Supplements", selected: false },
  { value: "Vitamin Therapy", label: "Vitamin Therapy", selected: false },
  { value: "Enteral/NG Feeding", label: "Enteral/NG Feeding", selected: false },
  { value: "Special Diet", label: "Special Diet", selected: false },
  { value: "TPN", label: "TPN", selected: false },
];

export const mockNutriActionData: MultipleActionsProps[] = [
  { value: "Protein Supplements", label: "Protein Supplements", selected: false },
  { value: "Vitamin Therapy", label: "Vitamin Therapy", selected: true },
  { value: "Enteral/NG Feeding", label: "Enteral/NG Feeding", selected: false },
  { value: "Special Diet", label: "Special Diet", selected: true },
  { value: "TPN", label: "TPN", selected: false },
];
