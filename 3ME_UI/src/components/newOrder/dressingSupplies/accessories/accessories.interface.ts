import { IProductAccessory } from "../../newOrder.interface";

export interface IAccessories {
  accessoriesList: DropdownValueWithOrder[];
  data: IProductAccessory;
  orderId?: string;
  setData: Function;
}

export interface IAccessory {
  id: number;
  index: number;
  code: string;
  value: string;
}

export interface DropdownValueWithOrder {
  order: number;
  code: string;
  text: string;
  id: number;
}
