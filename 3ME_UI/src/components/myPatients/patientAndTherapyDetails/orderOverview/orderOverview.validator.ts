import {
  Validation,
  ValidationStatus,
} from "../../../../core/interfaces/input.interface";
import { getDeepClone } from "../../../../util/ObjectFunctions";
import { Validator } from "../../../../util/order.validations";
import { getValidObj } from "../../../../util/utilityFunctions";

export class OrderOverviewValidator {
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
      ["patientfirstname", this._validator.emptyCheck],
      ["documentType", this._validator.emptyCheck],
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

  public validateAll(data: any, setData: Function) {
    let temp = getDeepClone(data);
    const ifAllValid = Object.keys(temp)
      .filter((x) => data[x].required)
      .every((x: string) => data[x].valid === ValidationStatus.VALID);
    return ifAllValid;
  }
}
