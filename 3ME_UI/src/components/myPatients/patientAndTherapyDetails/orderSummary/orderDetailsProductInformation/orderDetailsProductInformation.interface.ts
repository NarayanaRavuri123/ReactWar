import { IInputField } from "../../../../../core/interfaces/input.interface";

export interface IOrderOverviewProductInformation {
  productInfo: IOrderOverviewProductInfo;
}
export interface IOrderOverviewProductInfo {
  isReadyCare: IInputField;
  productValue: IInputField;
  serialNumber?: IInputField;
}
