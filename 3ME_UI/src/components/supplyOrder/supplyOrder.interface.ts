import { SupplyOrderValidator } from "./supplyOrder.validator";
import { IInputField } from "../../core/interfaces/input.interface";

export interface ISupplyOrderProps {
  DefaultSupplyOrderData?: ISupplyOrder;
  Validator?: SupplyOrderValidator;
}

export interface ISupplyOrder {
  typeOfOrder: IInputField;
  currentSuppliesVacDressingQuantity: IInputField;
  currentSuppliesVacCannisterQuantity: IInputField;
  dressingChangeFrequency: IInputField;
  provideAdditionalInfo: IInputField;
  sameAsCurrentAddress: IInputField;
  caAddressLine1: IInputField;
  caAddressLine2: IInputField;
  caCity: IInputField;
  caState: IInputField;
  caZipCode: IInputField;
  addressLine1: IInputField;
  addressLine2: IInputField;
  city: IInputField;
  state: IInputField;
  zipCode: IInputField;
  resupplyJustification: IInputField;
}
