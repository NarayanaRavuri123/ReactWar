import {
  IInputField,
  ValidationStatus,
} from "../../../../core/interfaces/input.interface";

export let defaultHomeCareProviderSearchBox: IHomeCareProviderSearch = {
  homeCareProviderSearch: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  },
};

export interface IHomeCareProviderSearch {
  homeCareProviderSearch: IInputField;
}
