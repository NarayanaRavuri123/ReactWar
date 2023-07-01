import {
  Validation,
  ValidationStatus,
} from "../../../../core/interfaces/input.interface";
import { getDeepClone } from "../../../../util/ObjectFunctions";
import { Validator } from "../../../../util/order.validations";

export class UserProfileValidator {
  private _validator;
  constructor(defValidator = new Validator()) {
    this._validator = defValidator;
  }

  private noValidation(txt: string): Validation {
    return { status: ValidationStatus.VALID, message: null };
  }

  private fieldToMethodMapping(
    field: string
  ): ((txt: string) => Validation) | undefined {
    const mapping = new Map<string, (txt: string) => Validation>([
      // account information
      ["firstName", this._validator.nameValidationWithEmpty],
      ["lastName", this._validator.nameValidationWithEmpty],
      ["userName", this._validator.userNameValidation],
      ["licenseType", this._validator.emptyCheck],
      ["department", this._validator.emptyCheck],
      ["title", this._validator.titleValidation],

      // contact information
      ["phone", this._validator.phoneValidation],
      ["email", this._validator.mandatoryEmailValidation],
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

  public validateAll(
    userData: any,
    updateUserDataIfUntouchedAndValidated: Function
  ) {
    let temp = getDeepClone(userData);
    Object.keys(temp).forEach((x: string) => {
      if (x !== "facilities" && temp[x].required) {
        if (temp[x].valid === ValidationStatus.UNTOUCHED) {
          temp[x].valid = ValidationStatus.INVALID;
        }
        temp[x].value = temp[x].value.trim();
      }
    });
    updateUserDataIfUntouchedAndValidated(temp);
    const ifAllValid = Object.keys(temp)
      .filter((x) => temp[x].required)
      .every((x: string) => temp[x].valid === ValidationStatus.VALID);

    return ifAllValid ? ValidationStatus.VALID : ValidationStatus.INVALID;
  }

  public validateRequiredFields(data: any) {
    let temp = getDeepClone(data);
    const valid = Object.keys(temp)
      .filter((x) => temp[x].required)
      .every((x: string) => temp[x].valid === ValidationStatus.VALID);
    return valid;
  }

  public allFieldsValid(data: any, required: boolean) {
    let temp = getDeepClone(data);
    const untouched = this.isFormUntouched(temp);
    if (untouched) {
      const ifAllValid = Object.keys(temp)
        .filter((x) => temp[x].required === required)
        .every((x: string) => temp[x].valid === ValidationStatus.UNTOUCHED);
      return ifAllValid;
    } else {
      const reqValid = this.validateRequiredFields(temp);
      return reqValid;
    }
  }
  public isFormUntouched(data: any) {
    let untouched = true;
    let temp = getDeepClone(data);
    Object.keys(temp).every((x) => {
      if (temp[x].required) {
        if (temp[x].valid !== ValidationStatus.UNTOUCHED) {
          untouched = false;
          return false;
        }
      }
      return true;
    });
    return untouched;
  }
}
