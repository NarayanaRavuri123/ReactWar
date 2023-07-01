import {
  IInputField,
  ValidationStatus,
} from "../../../../core/interfaces/input.interface";

export let defaultNationalRegistrySearchBox: INationalRegistrySearch = {
  nationalRegistryNumber: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  },
};

export let defaultNationalRegistrySearchByDetails: INationalRegistrySearchByDetails =
  {
    state: {
      valid: ValidationStatus.UNTOUCHED,
      value: "",
    },
    NPIFirstName: {
      valid: ValidationStatus.UNTOUCHED,
      value: "",
    },
    NPILastName: {
      valid: ValidationStatus.UNTOUCHED,
      value: "",
    },
  };

export interface INationalRegistrySearch {
  nationalRegistryNumber: IInputField;
}

export interface INationalRegistrySearchByDetails {
  state: IInputField;
  NPILastName: IInputField;
  NPIFirstName: IInputField;
}
