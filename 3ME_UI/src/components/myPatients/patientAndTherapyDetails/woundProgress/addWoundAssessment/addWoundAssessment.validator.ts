import { IAttestationAndSign } from "../../../../../core/attestationAndSignature/attestationAndSign.interface";
import {
  Validation,
  ValidationStatus,
} from "../../../../../core/interfaces/input.interface";
import { getDeepClone } from "../../../../../util/ObjectFunctions";
import { Validator } from "../../../../../util/order.validations";
import { getValidObj } from "../../../../../util/utilityFunctions";
import { IAddWoundAssessment } from "./addWoundAssessment.interface";

export class AddWoundAssessmentValidator {
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
      // Patient information
      ["firstName", this._validator.nameValidation],
      [
        "woundDiscontinuedDate",
        this._validator.woundTherapyDiscontinuedDateValidation,
      ],
      ["woundMeasurementDate", this._validator.dateValidation],
      ["woundMeasurementLenght", this._validator.woundDimension],
      ["woundMeasurementWidth", this._validator.woundDimension],
      ["woundMeasurementDepth", this._validator.woundDimension],

      //WoundAssessor
      ["woundAssessorName", this._validator.woundAssessorNameValidation],
      [
        "woundAssessorFacilityName",
        this._validator.woundAssessorFacilityNameValidation,
      ],
      ["woundAssessorPhoneNumber", this._validator.phoneValidation],
      [
        "provideAdditionalWoundInfo",
        this._validator.woundAdditionalInfoValidation,
      ],
      //WoundDebridement
      ["woundDebridementDate", this._validator.dateValidation],
      // wound exudate
      ["exudateAmount", this._validator.emptyCheck],
      ["exudateAppearance", this._validator.emptyCheck],
      // Infection
      ["selectedInfectionTypeOther", this._validator.previousTherapyOther],
      ["infectionRegimenItemText", this._validator.infectionRegimenText],
      // Holds Or Hospitalization
      ["vacHoldStartDate", this._validator.transferDateValidation],
      ["vacResumeDate", this._validator.transferDateValidation],
      ["resumptionMeasureLenght", this._validator.woundDimension],
      ["resumptionMeasureWidth", this._validator.woundDimension],
      ["resumptionMeasureDepth", this._validator.woundDimension],
      // Attestation and Signature
      ["phoneNumber", this._validator.phoneValidation],
      ["firstNameLastName", this._validator.woundAssessorNameValidation],
      ["_3MRepresentativeName", this._validator.woundAssessorNameValidation],

      // woundUndermining
      ["woundUndermining", this._validator.emptyCheck],
      ["underminingLocation1Depth", this._validator.woundDimension],
      ["underminingLocation2Depth", this._validator.woundDimension],
      ["underminingLocation1PositionFrom", this._validator.emptyCheck],
      ["underminingLocation2PositionFrom", this._validator.emptyCheck],
      ["underminingLocation1PositionTo", this._validator.emptyCheck],
      ["underminingLocation2PositionTo", this._validator.emptyCheck],
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
    woundAssessmentData: IAddWoundAssessment,
    updatewoundAssessmentDataIfUntouchedAndValidated: Function
  ) {
    let temp = getDeepClone(woundAssessmentData);
    Object.keys(temp).forEach((x: string) => {
      if (x === "treatmentRegimen") {
        let isNotValid = false;
        temp[x].value.forEach((item: any) => {
          if (item.selected) {
            if (
              item.isRequiredTextBox &&
              item.isTextBoxValueValid !== ValidationStatus.VALID
            ) {
              item.isTextBoxValueValid = ValidationStatus.INVALID;
              isNotValid = true;
            }
          }
        });
        if (!isNotValid) {
          isNotValid = temp[x].value.every((item: any) => !item.selected);
        }
        if (isNotValid) {
          temp[x].valid = ValidationStatus.INVALID;
        }
      } else if (temp[x].required) {
        if (temp[x].valid === ValidationStatus.UNTOUCHED) {
          temp[x].valid = ValidationStatus.INVALID;
        }
      }
    });
    const valid = temp?.woundAssessComorbodities.value.every(
      (x: any) => x.selected === false
    );
    temp.woundAssessComorbodities.valid = valid
      ? ValidationStatus.INVALID
      : ValidationStatus.VALID;
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
    if (temp["selectedInfectionTypeOther"].valid === ValidationStatus.INVALID) {
      temp.selectedInfectionType.valid = ValidationStatus.INVALID;
    }
    updatewoundAssessmentDataIfUntouchedAndValidated(temp);
    const ifAllValid = Object.keys(temp)
      .filter((x) => temp[x].valid)
      .every((x: string) => temp[x].valid === ValidationStatus.VALID);
    return ifAllValid ? ValidationStatus.VALID : ValidationStatus.INVALID;
  }

  public validateAllAttestationForm(
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
