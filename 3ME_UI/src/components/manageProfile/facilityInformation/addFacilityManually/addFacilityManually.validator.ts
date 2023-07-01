import { Validator } from "../../../../util/order.validations";
import { getDeepClone } from "../../../../util/ObjectFunctions";
import {
  Validation,
  ValidationStatus,
} from "../../../../core/interfaces/input.interface";
import { IAddFacility } from "./addFacilityManually.interface";

export class AddFacilityManuallyValidator {
  private _validator;
  constructor(defValidator = new Validator()) {
    this._validator = defValidator;
  }
  private fieldToMethodMapping(
    field: string
  ): ((txt: string) => Validation) | undefined {
    const mapping = new Map<string, (txt: string) => Validation>([
      ["name", this._validator.facilityNameValidation],
      ["type", this._validator.emptyCheck],
      ["addressLine1", this._validator.addressValidation],
      ["addressLine2", this._validator.addressValidationWithEmpty],
      ["city", this._validator.facilityCityValidation],
      ["state", this._validator.emptyCheck],
      ["zipCode", this._validator.facilityZipcodeValidation],
    ]);
    const validator = mapping.get(field);
    return validator ? validator : this._validator.noValidation;
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
  public validateAll(
    facility: IAddFacility,
    updateFacilityDataIfUntouchedAndValidated: Function
  ) {
    let temp = getDeepClone(facility);
    Object.keys(temp).forEach((x: string) => {
      if (temp[x].valid === ValidationStatus.UNTOUCHED) {
        temp[x].valid = ValidationStatus.INVALID;
      }
      temp[x].value = temp[x].value.trim();
    });
    updateFacilityDataIfUntouchedAndValidated(temp);
    const ifAllValid = Object.keys(temp).every(
      (x: string) => temp[x].valid === ValidationStatus.VALID
    );
    return ifAllValid ? ValidationStatus.VALID : ValidationStatus.INVALID;
  }

  public validateAddFacilityForm(facility: any) {
    const ifAllValid = Object.keys(facility).every((x: string) => {
      return x === "addressLine2" || x === "typeCode"
        ? ValidationStatus.VALID
        : facility[x].valid === ValidationStatus.VALID;
    });
    return ifAllValid ? ValidationStatus.VALID : ValidationStatus.INVALID;
  }
}
