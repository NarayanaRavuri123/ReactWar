import { IInputField } from "../../../core/interfaces/input.interface";
import { InventoryRequestValidator } from "./inventoryRequest.validator";

export interface IInventoryRequestProps {
  cancelBtnAction?: Function;
  decrementButtonDisabled?: boolean;
  incrementButtonDisabled?: boolean;
  submitBtnAction?: Function;
  Validator?: InventoryRequestValidator;
}

export interface IInventoryRequest {
  requestType: IInputField;
  quantity: IInputField;
  name: IInputField;
  phone: IInputField;
  extension: IInputField;
  email: IInputField;
}
