import {
  IInputField,
  ValidationStatus,
} from "../../../../../core/interfaces/input.interface";

export let defaultNationalRegistryFilterBox: IFilterNationalRegistry = {
  filterNPIList: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  },
};

export interface IFilterNationalRegistry {
  filterNPIList: IInputField;
}
