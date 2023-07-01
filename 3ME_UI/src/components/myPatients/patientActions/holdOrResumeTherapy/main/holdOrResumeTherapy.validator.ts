import {
  Validation,
  ValidationStatus,
} from "../../../../../core/interfaces/input.interface";
import { getDeepClone } from "../../../../../util/ObjectFunctions";
import { Validator } from "../../../../../util/order.validations";
import { WoundDetails } from "./holdOrResumeTherapy.interface";

export class HoldOrResumeTherapyValidator {
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
      // For Hold and Resume Therapy
      ["holdDate1", this._validator.emptyCheck],
      ["resumeDate1", this._validator.emptyCheck],
      ["holdDate2", this._validator.emptyCheck],
      ["resumeDate2", this._validator.emptyCheck],
      ["reasonForHold", this._validator.emptyCheck],
      ["comments", this._validator.noValidation],
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
    therapyData: any,
    updateTherapyDataIfUntouchedAndValidated: Function
  ) {
    let temp = getDeepClone(therapyData);
    Object.keys(temp).forEach((x: string) => {
      if (temp[x].required) {
        if (temp[x].valid === ValidationStatus.UNTOUCHED) {
          temp[x].valid = ValidationStatus.INVALID;
        }
        temp[x].value = temp[x].value.trim();
      }
    });
    let wounds: [WoundDetails] = temp["wounds"];
    let selectedWounds = wounds.filter((x) => x.isChecked);
    const isWoundSelected =
      selectedWounds.length > 0 &&
      selectedWounds.every((x) => x.length && x.width && x.depth);
    if (!isWoundSelected) {
      selectedWounds.map((wound: WoundDetails) => {
        wound.isValid =
          wound.length && wound.width && wound.depth ? true : false;
        return wound;
      });
    }
    temp["isWoundSelected"] = isWoundSelected;
    updateTherapyDataIfUntouchedAndValidated(temp);
    const ifAllValid = Object.keys(temp)
      .filter((x) => temp[x].required)
      .every((x: string) => temp[x].valid === ValidationStatus.VALID);
    return ifAllValid && isWoundSelected;
  }
}
