import {
  Validation,
  ValidationStatus,
} from "../../core/interfaces/input.interface";
import { Validator } from "../../util/order.validations";
import { getDeepClone } from "../../util/ObjectFunctions";
import { UNMATCHED_EMAIL, UNMATCHED_PASSWORD } from "../../util/staticText";

export class ManageProfileValidator {
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
      // account information
      ["firstName", this._validator.nameValidation],
      ["lastName", this._validator.nameValidation],
      ["userName", this._validator.userNameValidation],
      ["licenseType", this._validator.emptyCheck],
      ["department", this._validator.emptyCheck],
      ["title", this._validator.titleValidation],

      // contact information
      ["phone", this._validator.phoneValidation],
      ["email", this._validator.mandatoryEmailValidation],
      ["verifyEmail", this._validator.mandatoryEmailValidation],
      ["phoneType", this._validator.emptyCheck],
      ["extension", this._validator.extensionValidation],

      // communication preference
      ["preferenceType", this._validator.emptyCheck],
      ["emailPreference", this._validator.emptyCheck],
      ["smsPreference", this._validator.emptyCheck],
      ["smsTnCAccept", this._validator.emptyCheck],

      // password administration
      ["password", this._validator.passwordValidation],
      ["currentPassword", this._validator.passwordValidation],
      ["newPassword", this._validator.passwordValidation],
      ["confirmPassword", this._validator.passwordValidation],

      // email notification preference
      ["rentalActivity", this._validator.emptyCheck],
      ["salesActivity", this._validator.emptyCheck],
      ["pickUpRequest", this._validator.emptyCheck],

      // email notification preference
      ["adminMessage", this._validator.messageValidation],
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

  private dbValidateFieldToMethodMapping(
    field: string
  ): ((txt: string) => Promise<Validation>) | undefined {
    const mapping = new Map<string, (txt: string) => Promise<Validation>>([
      // account information
      ["userName", this._validator.userNameDbValidation],
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

  public validateAll(
    patientData: any,
    updatePatientDataIfUntouchedAndValidated: Function,
    profileForm?: any
  ) {
    let temp = getDeepClone(patientData);
    Object.keys(temp).forEach((x: string) => {
      if (temp[x].required) {
        if (temp[x].valid === ValidationStatus.UNTOUCHED) {
          temp[x].valid = ValidationStatus.INVALID;
        }
        temp[x].value = temp[x].value.trim();
      }
    });
    updatePatientDataIfUntouchedAndValidated(temp);
    const ifAllValid = Object.keys(temp)
      .filter((x) => temp[x].required)
      .every((x: string) => temp[x].valid === ValidationStatus.VALID);

    let extensionValid = true;
    if (profileForm?.isLandlineSelected) {
      if (patientData.extension.valid !== ValidationStatus.VALID) {
        temp.extension.valid = ValidationStatus.INVALID;
        extensionValid = false;
      }
    }
    let contInfoTerms = true;
    if (profileForm?.commPrefSMSVal) {
      if (patientData.smsTnCAccept?.valid !== ValidationStatus.VALID) {
        temp.smsTnCAccept.valid = ValidationStatus.INVALID;
        temp.smsTnCAccept.required = true;
        updatePatientDataIfUntouchedAndValidated(temp);
        contInfoTerms = false;
      }
    }
    let validateConfirmEmail = true;
    if (temp.verifyEmail?.value) {
      if (temp.email.value !== temp.verifyEmail.value) {
        validateConfirmEmail = false;
        temp.verifyEmail.valid = ValidationStatus.INVALID;
        temp.verifyEmail.errorMessage = UNMATCHED_EMAIL;
        updatePatientDataIfUntouchedAndValidated(temp);
      }
    }
    let validateConfirmPassword = true;
    if (temp.newPassword.value !== temp.confirmPassword.value) {
      validateConfirmPassword = false;
      temp.confirmPassword.valid = ValidationStatus.INVALID;
      temp.confirmPassword.errorMessage = UNMATCHED_PASSWORD;
      updatePatientDataIfUntouchedAndValidated(temp);
    }
    let validateFacilityRegistered = true;
    if (profileForm?.registeredFacility.length === 0) {
      temp.facilityRegistered.valid = ValidationStatus.INVALID;
      updatePatientDataIfUntouchedAndValidated(temp);
      validateFacilityRegistered = false;
    }
    return ifAllValid &&
      contInfoTerms &&
      validateConfirmEmail &&
      validateConfirmPassword &&
      validateFacilityRegistered &&
      extensionValid
      ? ValidationStatus.VALID
      : ValidationStatus.INVALID;
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

  public allFieldsValid(data: any, required: boolean) {
    let temp = getDeepClone(data);
    const untouched = this.isFormUntouched(temp);
    if (untouched) {
      const ifAllValid = Object.keys(temp)
        .filter((x) => temp[x].required === required)
        .every((x: string) => temp[x].valid === ValidationStatus.UNTOUCHED);
      return ifAllValid;
    } else {
      const reqValid = this.validateRequiredFields(temp);
      const nonReqValid = this.validateNonRequiredFields(temp);
      return reqValid && nonReqValid;
    }
  }
  public isFormUntouched(data: any) {
    let untouched = true;
    let temp = getDeepClone(data);
    Object.keys(temp).every((x) => {
      if (temp[x].required) {
        if (temp[x].valid !== ValidationStatus.UNTOUCHED) {
          untouched = false;
          return false;
        }
      }
      return true;
    });
    return untouched;
  }
}
