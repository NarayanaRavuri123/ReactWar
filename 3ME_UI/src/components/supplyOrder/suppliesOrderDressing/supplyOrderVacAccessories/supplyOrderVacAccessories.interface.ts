import { DropdownValueWithOrder } from "../../../newOrder/dressingSupplies/accessories/accessories.interface";
import { IProductAccessory } from "../../../newOrder/newOrder.interface";
import { SupplyOrderValidator } from "../../supplyOrder.validator";

export interface ISupplyOrderVacDressingAccessories {
  accessoriesList: DropdownValueWithOrder[];
  accessoriesDetails: IProductAccessory;
  loadAccesory: boolean;
  setAccessoriesDetails: Function;
  setLoadAccesory: any;
  Validator?: SupplyOrderValidator;
}
