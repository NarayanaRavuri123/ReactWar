import { Validator } from "../../../../util/order.validations";
import { getValidObj } from "../../../../util/utilityFunctions";
import {
  Validation,
  ValidationStatus,
} from "../../../../core/interfaces/input.interface";
import { getDeepClone } from "../../../../util/ObjectFunctions";
import { isObject } from "@okta/okta-auth-js";
import { ShowAdditionalFields } from "./insuranceInformation.model";

export class InsuranceInformationValidator {
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
      // Insurance Information
      ["insuranceType", this._validator.emptyCheck],
      ["otherAdditionalDetails", this._validator.emptyCheck],
      ["memberID", this._validator.memberIDValidation],
      ["relationShipInsured", this._validator.emptyCheck],
      ["payerName", this._validator.payerNameValidation],
      ["groupID", this._validator.groupIDValidation],
      ["payerContactNumber", this._validator.phoneValidation],
      ["extension", this._validator.extensionValidation],
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

  public validateUserEnteredAnyDataOrNot(
    insuranceData: any,
    isPrimary: boolean,
    insuranceShowingDetails: ShowAdditionalFields
  ) {
    let temp = getDeepClone(insuranceData);
    const keys = Object.keys(temp);
    for (let xOut of keys) {
      if (
        xOut === "charityCare" ||
        xOut === "insuranceType" ||
        xOut === "insuranceTypeCode" ||
        xOut === "otherAdditionalDetails" ||
        xOut === "privatePay"
      ) {
        if (
          temp[xOut].isDefaultValid !== true &&
          temp[xOut].isOptional !== true &&
          temp[xOut].valid !== ValidationStatus.UNTOUCHED
        ) {
          return true;
        }
      } else {
        const innerTemp = getDeepClone(temp[xOut]);
        const innerKeys = Object.keys(innerTemp);
        for (let x of innerKeys) {
          if (
            this.checkSelectedInsuranceType(
              insuranceShowingDetails,
              isPrimary,
              x
            ) &&
            innerTemp[x].isDefaultValid !== true &&
            innerTemp[x].isOptional !== true &&
            innerTemp[x].valid !== ValidationStatus.UNTOUCHED
          ) {
            return true;
          }
        }
      }
    }
    return false;
  }

  public validateAll(
    insurance: any,
    isPrimaryComponent: boolean,
    updateInsuranceDataIfUntouchedAndValidated: Function
  ) {
    let temp = getDeepClone(insurance);
    Object.keys(temp).forEach((x: string) => {
      Object.keys(temp[x]).forEach((element: any) => {
        if (
          temp[x][element].valid === ValidationStatus.UNTOUCHED &&
          !temp[x][element].isOptional
        ) {
          temp[x][element].valid = ValidationStatus.INVALID;
        }
      });
      if (temp[x].valid === ValidationStatus.UNTOUCHED && !temp[x].isOptional) {
        temp[x].valid = ValidationStatus.INVALID;
      }
    });
    if (isPrimaryComponent) {
      updateInsuranceDataIfUntouchedAndValidated((dt: any) => ({
        ...dt,
        primaryInsurance: temp,
      }));
    } else {
      updateInsuranceDataIfUntouchedAndValidated((dt: any) => ({
        ...dt,
        secondaryInsurance: temp,
      }));
    }
    const ifAllValid = Object.keys(temp)
      .filter((x) => temp[x].required && !temp[x].isOptional)
      .every((x: string) => temp[x].valid === ValidationStatus.VALID);

    let validResult = true;
    Object.keys(temp).forEach((x: string) => {
      Object.keys(temp[x]).forEach((element: any) => {
        if (isObject(temp[x][element])) {
          if (temp[x][element].required && !temp[x][element].isOptional) {
            if (temp[x][element].valid !== ValidationStatus.VALID) {
              return (validResult = false);
            }
          }
        }
      });
      return validResult;
    });
    return ifAllValid && validResult;
  }

  public checkSelectedInsuranceType(
    insuranceShowingDetails: ShowAdditionalFields,
    isPrimary: boolean,
    type: String
  ) {
    const selectedInsuranceType = isPrimary
      ? insuranceShowingDetails.typePrimary
      : insuranceShowingDetails.typeSecondary;
    switch (type) {
      case "medicare":
        return selectedInsuranceType.medicare;
      case "medicareAdvantage":
        return selectedInsuranceType.medicareAdvantage;
      case "managedMedicaid":
        return selectedInsuranceType.medicareAdvantage;
      case "managedMedicaid":
        return selectedInsuranceType.managedMedicaid;
      case "commercialInsurance":
        return selectedInsuranceType.commercialInsurance;
      case "charityCare":
        return selectedInsuranceType.charityCare;
      case "otherAdditionalDetails":
        return selectedInsuranceType.otherAdditionalDetails;
      case "workerCompensation":
        return selectedInsuranceType.workerCompensation;
      default:
        return false;
    }
  }
}
