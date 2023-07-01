import {
  Validation,
  ValidationStatus,
} from "../../core/interfaces/input.interface";
import { getDeepClone } from "../../util/ObjectFunctions";
import { Validator } from "../../util/order.validations";
import { getValidObj } from "../../util/utilityFunctions";

export class ForgotCredentialValidator {
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
      // forgot username
      ["email", this._validator.mandatoryEmailValidation],
      // forgot password
      ["username", this._validator.userNameValidation],
    ]);
    const validator = mapping.get(field);
    return validator;
  }

  public validate(input: string, field: string) {
    try {
      const trimmedValue = input.trim();
      const validator = this.fieldToMethodMapping(field)!;
      return validator(trimmedValue);
    } catch (error) {
      console.log(`validator method for field ${field} is not configured`);
    }
  }
  private dbValidateFieldToMethodMapping(
    field: string
  ): ((txt: string) => Promise<Validation>) | undefined {
    const mapping = new Map<string, (txt: string) => Promise<Validation>>([
      // forgot username
      ["email", this._validator.mandatoryEmailDbValidation],
      // forgot password
      ["username", this._validator.userNameDbValidation],
    ]);
    const validator = mapping.get(field);
    return validator;
  }

  public validateWithDb(input: string, field: string) {
    try {
      const trimmedValue = input.trim();
      const validator = this.dbValidateFieldToMethodMapping(field)!;
      return validator(trimmedValue);
    } catch (error) {
      console.log(`validator method for field ${field} is not configured`);
    }
  }

  public validateAll(data: any, updateDataIfUntouchedAndValidated: Function) {
    let temp = getDeepClone(data);
    Object.keys(temp).forEach((x: string) => {
      if (temp[x].valid === ValidationStatus.UNTOUCHED) {
        temp[x].valid = ValidationStatus.INVALID;
      }
      temp[x].value = temp[x].value.trim();
    });
    updateDataIfUntouchedAndValidated(temp);
    const ifAllValid = Object.keys(temp).every(
      (x: string) => temp[x].valid === ValidationStatus.VALID
    );
    return ifAllValid ? ValidationStatus.VALID : ValidationStatus.INVALID;
  }
}
