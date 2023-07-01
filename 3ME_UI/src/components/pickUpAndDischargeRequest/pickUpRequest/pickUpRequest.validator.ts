import {
  Validation,
  ValidationStatus,
} from "../../../core/interfaces/input.interface";
import { Validator } from "../../../util/order.validations";
import { getValidObj } from "../../../util/utilityFunctions";
import { getDeepClone } from "../../../util/ObjectFunctions";

export class PickUpRequestValidator {
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
      ["reasonForDischarge", this._validator.emptyCheck],
      ["placementDate", this._validator.emptyCheck],
      ["therapyDischargeDate", this._validator.emptyCheck],
      ["stopBillDate", this._validator.emptyCheck],
      ["returnMethod", this._validator.emptyCheck],
      ["specialInstructions", this._validator.noValidation],
      ["injuryCauseBy3MDevice", this._validator.emptyCheck],
      ["describeTheInjury", this._validator.emptyCheck],
      ["problemWith3MDevice", this._validator.emptyCheck],
      ["describeTheProblem", this._validator.emptyCheck],
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
    const ifAllValidEntered = Object.keys(temp).every(
      (x: string) => data[x].valid !== ValidationStatus.INVALID
    );
    const ifAllValid = Object.keys(temp)
      .filter((x) => data[x].required)
      .every((x: string) => data[x].valid === ValidationStatus.VALID);
    return ifAllValid && ifAllValidEntered;
  }
}
