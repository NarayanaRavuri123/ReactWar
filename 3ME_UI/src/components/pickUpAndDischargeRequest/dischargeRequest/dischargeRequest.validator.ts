import { IAttestationAndSign } from "../../../core/attestationAndSignature/attestationAndSign.interface";
import { IDropZoneDocumentSelect } from "../../../core/customDropZone/dropZoneDocumentSelect.interface";
import {
  Validation,
  ValidationStatus,
} from "../../../core/interfaces/input.interface";
import { getDeepClone } from "../../../util/ObjectFunctions";
import { Validator } from "../../../util/order.validations";
import { getValidObj } from "../../../util/utilityFunctions";
import { IFacility } from "../../manageProfile/facilityInformation/facility.interface";
import { IUser } from "../../manageProfile/user.interface";
import { IDischargeRequest } from "./dischargeRequest.interface";

export class DischargeRequestValidator {
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
      ["submitterFirstName", this._validator.nameValidation],
      ["submitterLastName", this._validator.nameValidation],
      ["submitterTitle", this._validator.titleValidation],
      ["submitterPhoneNumber", this._validator.phoneValidation],
      ["submitterEmployer", this._validator.facilityNameValidation],
      ["TypeOfFacility", this._validator.emptyCheck],
      ["facilityname", this._validator.facilityNameValidationEmpty],
      ["woundMeasurementLenght1", this._validator.woundDimension],
      ["woundMeasurementWidth1", this._validator.woundDimension],
      ["woundMeasurementDepth1", this._validator.woundDimension],
      ["woundMeasurementLenght2", this._validator.woundDimension],
      ["woundMeasurementWidth2", this._validator.woundDimension],
      ["woundMeasurementDepth2", this._validator.woundDimension],
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
    dischargeRequestData: IDischargeRequest,
    updateDischargeRequestIfUntouchedAndValidated: Function
  ) {
    let temp = getDeepClone(dischargeRequestData);
    Object.keys(temp).forEach((x: string) => {
      if (temp[x].required === false) {
        temp[x].valid = ValidationStatus.VALID;
      }
      if (temp[x].valid === ValidationStatus.UNTOUCHED) {
        temp[x].valid = ValidationStatus.INVALID;
      }
    });
    updateDischargeRequestIfUntouchedAndValidated(temp);
    const ifAllValid = Object.keys(temp)
      .filter((x) => temp[x].valid)
      .every((x: string) => temp[x].valid === ValidationStatus.VALID);
    return ifAllValid ? ValidationStatus.VALID : ValidationStatus.INVALID;
  }

  public validateUserEnteredAnyDataOrNot = (
    dischargeRequestData: IDischargeRequest,
    submitterInfo: IUser | undefined,
    registeredFacility: IFacility | undefined,
    dischargeRequestDocuments: IDropZoneDocumentSelect[]
  ): boolean => {
    let temp = getDeepClone(dischargeRequestData);
    const keys = Object.keys(temp);
    for (let x of keys) {
      if (x === "patientAdmissionType") {
        if (temp[x].valid !== ValidationStatus.UNTOUCHED) {
          return true;
        }
      } else if (x === "submitterFirstName") {
        if (
          submitterInfo &&
          submitterInfo.firstName &&
          temp[x].value !== submitterInfo.firstName
        ) {
          return true;
        }
      } else if (x === "submitterLastName") {
        if (
          submitterInfo &&
          submitterInfo.lastName &&
          temp[x].value !== submitterInfo.lastName
        ) {
          return true;
        }
      } else if (x === "submitterTitle") {
        if (
          submitterInfo &&
          submitterInfo.title &&
          temp[x].value !== submitterInfo.title
        ) {
          return true;
        }
      } else if (x === "submitterPhoneNumber") {
        if (
          submitterInfo &&
          submitterInfo.mobilePhoneNo &&
          temp[x].value !== submitterInfo.mobilePhoneNo
        ) {
          return true;
        }
      } else if (x === "submitterEmployer") {
        if (
          registeredFacility &&
          registeredFacility.accountName &&
          temp[x].value !== registeredFacility.accountName
        ) {
          return true;
        }
      }
      if (x === "patientDied") {
        if (temp[x].valid !== ValidationStatus.UNTOUCHED) {
          return true;
        }
      }
      if (x === "woundFinalMeasurementDate1") {
        if (temp[x].valid !== ValidationStatus.UNTOUCHED) {
          return true;
        }
      }
      if (x === "woundMeasurementDepth1") {
        if (temp[x].valid !== ValidationStatus.UNTOUCHED) {
          return true;
        }
      }
      if (x === "woundMeasurementLenght1") {
        if (temp[x].valid !== ValidationStatus.UNTOUCHED) {
          return true;
        }
      }
      if (x === "woundMeasurementWidth1") {
        if (temp[x].valid !== ValidationStatus.UNTOUCHED) {
          return true;
        }
      }
      if (x === "woundFinalMeasurementDate2") {
        if (temp[x].required && temp[x].valid !== ValidationStatus.UNTOUCHED) {
          return true;
        }
      }
      if (x === "woundMeasurementDepth2") {
        if (temp[x].required && temp[x].valid !== ValidationStatus.UNTOUCHED) {
          return true;
        }
      }
      if (x === "woundMeasurementLenght2") {
        if (temp[x].required && temp[x].valid !== ValidationStatus.UNTOUCHED) {
          return true;
        }
      }
      if (x === "woundMeasurementWidth2") {
        if (temp[x].required && temp[x].valid !== ValidationStatus.UNTOUCHED) {
          return true;
        }
      }
      if (x === "therapyGoalsAchieved") {
        if (temp[x].valid !== ValidationStatus.UNTOUCHED) {
          return true;
        }
      }
      if (x === "therapyGoalsNotAchieved") {
        if (temp[x].valid !== ValidationStatus.UNTOUCHED) {
          return true;
        }
      }
      if (dischargeRequestDocuments.length > 0) {
        return true;
      }
    }
    return false;
  };
  public dischargeRequestValidateAttestation(
    attestationData: IAttestationAndSign,
    updateattestationDataIfUntouchedAndValidated: Function
  ) {
    let temp = getDeepClone(attestationData);
    Object.keys(temp).forEach((x: string) => {
      if (
        temp[x].required === false &&
        temp[x].valid !== ValidationStatus.VALID
      ) {
        temp[x].valid = ValidationStatus.VALID;
      } else if (temp[x].valid === ValidationStatus.UNTOUCHED) {
        temp[x].valid = ValidationStatus.INVALID;
      }
    });
    updateattestationDataIfUntouchedAndValidated(temp);
    const ifAllValid = Object.keys(temp)
      .filter((x) => temp[x].valid)
      .every((x: string) => temp[x].valid === ValidationStatus.VALID);
    return ifAllValid ? ValidationStatus.VALID : ValidationStatus.INVALID;
  }
}
