import {
  Validation,
  ValidationStatus,
} from "../../../core/interfaces/input.interface";
import { getDeepClone } from "../../../util/ObjectFunctions";
import { Validator } from "../../../util/order.validations";

export class ContactUsValidator {
  private _validator;
  constructor(defValidator = new Validator()) {
    this._validator = defValidator;
  }
  private fieldToMethodMapping(
    field: string
  ): ((txt: string) => Validation) | undefined {
    const mapping = new Map<string, (txt: string) => Validation>([
      ["firstName", this._validator.nameValidation],
      ["lastName", this._validator.nameValidation],
      ["phone", this._validator.phoneValidation],
      ["extension", this._validator.extensionValidation],
      ["subject", this._validator.emptyCheck],
      ["message", this._validator.emptyCheck],
      ["shouldContact", this._validator.emptyCheck],
      ["email", this._validator.mandatoryEmailValidation],
    ]);
    const validator = mapping.get(field);
    return validator ? validator : this._validator.noValidation;
  }
  public validate(input: string, field: string) {
    try {
      const validator = this.fieldToMethodMapping(field)!;
      return validator(input);
    } catch (error) {
      console.log(`validator method for field ${field} is not configured`);
    }
  }
  private dbValidateFieldToMethodMapping(
    field: string
  ): ((txt: string) => Promise<Validation>) | undefined {
    const mapping = new Map<string, (txt: string) => Promise<Validation>>([
      // contact information
      ["email", this._validator.mandatoryEmailDbValidation],
      ["verifyEmail", this._validator.mandatoryEmailDbValidation],
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
  public validateAll(
    patientData: any,
    updatePatientDataIfUntouchedAndValidated: Function
  ) {
    let temp = getDeepClone(patientData);
    Object.keys(temp).forEach((x: string) => {
      if (temp[x].valid === ValidationStatus.UNTOUCHED && temp[x].required) {
        temp[x].valid = ValidationStatus.INVALID;
      }
      temp[x].value = temp[x].value.trim();
    });
    updatePatientDataIfUntouchedAndValidated(temp);
    const allReqValid = Object.keys(temp)
      .filter((x) => temp[x].required)
      .every((x: string) => temp[x].valid === ValidationStatus.VALID);
    const allNonReqValid = Object.keys(temp)
      .filter((x) => !temp[x].required)
      .every(
        (x: string) =>
          temp[x].valid === ValidationStatus.VALID ||
          temp[x].valid === ValidationStatus.UNTOUCHED
      );
    return allReqValid && allNonReqValid
      ? { status: ValidationStatus.VALID, message: null }
      : { status: ValidationStatus.INVALID, message: null };
  }
}
