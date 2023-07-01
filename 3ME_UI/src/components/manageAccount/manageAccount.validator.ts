import {
  Validation,
  ValidationStatus,
} from "../../core/interfaces/input.interface";
import { getDeepClone } from "../../util/ObjectFunctions";
import { Validator } from "../../util/order.validations";
import { getInvalidObj, getValidObj } from "../../util/utilityFunctions";

export class ManageAccountValidator {
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
      ["manageAccountUserName", this._validator.userNameValidation],
      ["manageAccountNewPassword", this._validator.resetPasswordValidation],
      ["manageAccountConfirmPassword", this._validator.resetPasswordValidation],
    ]);
    const validator = mapping.get(field);
    return validator ? validator : this.noValidation;
  }
  private dbValidateFieldToMethodMapping(
    field: string
  ): ((txt: string) => Promise<Validation>) | undefined {
    const mapping = new Map<string, (txt: string) => Promise<Validation>>([
      // account information
      ["manageAccountUserName", this._validator.userNameDbValidation],
      // contact information
      ["email", this._validator.mandatoryEmailDbValidation],
    ]);
    const validator = mapping.get(field);
    return validator;
  }
  public validateWithDb(input: string, field: string) {
    try {
      const validator = this.dbValidateFieldToMethodMapping(field)!;
      return validator(input);
    } catch (error) {
      console.log(`validator method for field ${field} is not configured`);
    }
  }
  public validate(input: string, field: string) {
    try {
      const trimmedValue = input;
      const validator = this.fieldToMethodMapping(field)!;
      return validator(trimmedValue);
    } catch (error) {
      console.log(`validator method for field ${field} is not configured`);
    }
  }
  public validateAll(
    patientData: any,
    updatePatientDataIfUntouchedAndValidated: Function
  ) {
    let temp = getDeepClone(patientData);
    Object.keys(temp).forEach((x: string) => {
      if (temp[x].valid === ValidationStatus.UNTOUCHED) {
        temp[x].valid = ValidationStatus.INVALID;
      }
      temp[x].value = temp[x].value;
    });
    updatePatientDataIfUntouchedAndValidated(temp);
    const ifAllValid = Object.keys(temp).every(
      (x: string) => temp[x].valid === ValidationStatus.VALID
    );
    return ifAllValid ? getValidObj() : getInvalidObj(null);
  }
}
