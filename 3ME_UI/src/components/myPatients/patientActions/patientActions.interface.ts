import { IMenuAction } from "../patient.interface";

export interface IPatientActionsInterface {
  clickedOutside: (event: MouseEvent | TouchEvent) => void;
  setSelectedValue: (
    event: React.MouseEvent<HTMLElement>,
    selectedVal: string
  ) => void;
  menuData: Array<IMenuAction> | undefined;
}
