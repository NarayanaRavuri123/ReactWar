import {
  Validation,
  ValidationStatus,
} from "../../core/interfaces/input.interface";
import { getDeepClone } from "../../util/ObjectFunctions";
import { Validator } from "../../util/order.validations";
import { getValidObj } from "../../util/utilityFunctions";

export class SendNoteValidator {
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
      ["contactResason", this._validator.emptyCheck],
      ["address1", this._validator.addressLine1],
      ["address2", this._validator.addressValidationWithEmpty],
      ["city", this._validator.cityValidation],
      ["state", this._validator.emptyCheck],
      ["phone", this._validator.phoneValidation],
      ["zip", this._validator.facilityZipcodeValidation],
      ["addressType", this._validator.emptyCheck],
      ["comment", this._validator.commentsValidation],
      // Transfer Patient
      ["lastVisitDate", this._validator.transferDateValidation],
      ["facilityName", this._validator.alphaNumericWithEmpty],
      ["careGiverName", this._validator.alphaNumericWithEmpty],
      ["facilityPhone", this._validator.phoneValidation],

      // Ask Question
      ["question", this._validator.commentsValidation],
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
