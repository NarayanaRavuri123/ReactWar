import { Validation, ValidationStatus } from "../interfaces/input.interface";
import { Validator } from "../../util/order.validations";
import { getDeepClone } from "../../util/ObjectFunctions";

export class CaregiverFacilitySearchValidator {
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
      // facility
      ["facilityName", this._validator.facilityNameValidation],
      ["facilityState", this._validator.emptyCheck],
      ["facilityID", this._validator.facilityIDValidation],
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

  public validateRequiredFields(data: any) {
    let temp = getDeepClone(data);
    const valid = Object.keys(temp)
      .filter((x) => temp[x].required)
      .every((x: string) => temp[x].valid === ValidationStatus.VALID);
    return valid;
  }

  public validateNonRequiredFields(data: any) {
    let temp = getDeepClone(data);
    const valid = Object.keys(temp)
      .filter((x) => !temp[x].required)
      .every(
        (x: string) =>
          temp[x].valid === ValidationStatus.VALID ||
          temp[x].valid === ValidationStatus.UNTOUCHED
      );
    return valid;
  }
}
