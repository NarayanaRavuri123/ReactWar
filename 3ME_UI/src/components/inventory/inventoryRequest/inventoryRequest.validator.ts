import {
  Validation,
  ValidationStatus,
} from "../../../core/interfaces/input.interface";
import { getDeepClone } from "../../../util/ObjectFunctions";
import { Validator } from "../../../util/order.validations";
import { getValidObj } from "../../../util/utilityFunctions";

export class InventoryRequestValidator {
  private _validator;
  constructor(defValidator = new Validator()) {
    this._validator = defValidator;
  }

  private noValidation(txt: string): Validation {
    return getValidObj();
  }

  private fieldToMethodMapping(
    field: string
  ): ((txt: string) => Validation) | undefined {
    const mapping = new Map<string, (txt: string) => Validation>([
      ["requestType", this._validator.emptyCheck],
      ["name", this._validator.requesterNameValidation],
      ["phone", this._validator.phoneValidation],
      ["extension", this._validator.extensionValidation],
      ["email", this._validator.emailValidation],
    ]);
    const validator = mapping.get(field);
    return validator ? validator : this.noValidation;
  }

  public validate(input: string, field: string) {
    try {
      const validator = this.fieldToMethodMapping(field)!;
      return validator(input);
    } catch (error) {
      console.log(`validator method for field ${field} is not configured`);
    }
  }

  public validateAll(data: any, updateDataIfUntouchedAndValidated: Function) {
    let temp = getDeepClone(data);
    Object.keys(temp).forEach((x: string) => {
      if (temp[x].required && temp[x].valid === ValidationStatus.UNTOUCHED) {
        temp[x].valid = ValidationStatus.INVALID;
      }
      temp[x].value = temp[x].value.trim();
    });
    updateDataIfUntouchedAndValidated(temp);
    const ifAllValid = Object.keys(temp)
      .filter((x) => data[x].required)
      .every((x: string) => data[x].valid === ValidationStatus.VALID);
    return ifAllValid;
  }
}
