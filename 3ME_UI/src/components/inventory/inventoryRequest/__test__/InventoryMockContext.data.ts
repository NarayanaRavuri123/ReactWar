import { IInventoryRequest } from "../inventoryRequest.interface";
import { InventoryContextType } from "../../../../context/InventoryContext";
import { ValidationStatus } from "../../../../core/interfaces/input.interface";

export const mockInputFields = (
  inputValue: string = "",
  isRequired: boolean = true
) => {
  return {
    valid: ValidationStatus.UNTOUCHED,
    value: inputValue,
    required: isRequired,
  };
};

export const mockData = (
  requestTypeValue: string = "",
  quantityValue: string = "",
  nameValue: string = "",
  phoneValue: string = "",
  extensionValue: string = "",
  emailValue: string = ""
): IInventoryRequest => {
  return {
    requestType: mockInputFields(requestTypeValue),
    quantity: mockInputFields(quantityValue),
    name: mockInputFields(nameValue),
    phone: mockInputFields(phoneValue),
    extension: mockInputFields(extensionValue, false),
    email: mockInputFields(emailValue),
  };
};

export const getMockInventoryRequestData = (
  requestTypeValue: string = "",
  quantityValue: string = "",
  nameValue: string = "",
  phoneValue: string = "",
  extensionValue: string = "",
  emailValue: string = ""
): InventoryContextType => ({
  data: mockData(
    requestTypeValue,
    quantityValue,
    nameValue,
    phoneValue,
    extensionValue,
    emailValue
  ),
  setData: () => {},
  resetInventoryData: () => {},
});
