import moment from "moment";
import {
  getInvalidObj,
  getUntouchedObj,
  getValidObj,
} from "./utilityFunctions";
import {
  Validation,
  ValidationStatus,
} from "../core/interfaces/input.interface";
import { validateUserNameAndEmail } from "./userService";
import { INVALID_EMAIL, INVALID_USERNAME } from "./staticText";

export class Validator {
  public facilityNameValidation(txt: string): Validation {
    if (txt.trim().length === 0 && Array.from(txt)[0] === " ") {
      return getInvalidObj(null);
    }
    const regex = /^[a-zA-Z ]{1,100}$/i;
    return regex.test(txt) ? getValidObj() : getInvalidObj(null);
  }
  public facilityZipcodeValidation(txt: string): Validation {
    const regex = /^[0-9]{5}$/;
    return regex.test(txt) ? getValidObj() : getInvalidObj(null);
  }
  public facilityStateValidation(txt: string): Validation {
    if (txt === "") {
      return getInvalidObj(null);
    } else return getValidObj();
  }
  public facilityIDValidation(txt: string): Validation {
    const regex = /^[0-9]{1,15}$/i;
    return regex.test(txt) ? getValidObj() : getInvalidObj(null);
  }
  public facilityCityValidation(txt: string): Validation {
    return /^[a-zA-Z\s.]+$/.test(txt) ? getValidObj() : getInvalidObj(null);
  }
  public patientInfonameValidation(txt: string): Validation {
    if (txt.trim().length === 0) {
      return getInvalidObj(null);
    }
    const regex = /^[A-Za-z -\s]*$/;
    return regex.test(txt) ? getValidObj() : getInvalidObj(null);
  }
  public nameValidation(txt: string): Validation {
    if (txt.trim().length === 0) {
      return getInvalidObj(null);
    }
    const regex = /^[a-z]+$/i;
    return regex.test(txt) ? getValidObj() : getInvalidObj(null);
  }
  public middleNameValidation(txt: string): Validation {
    if (txt === "") {
      return getValidObj();
    }
    const regex = /^[a-z]+$/i;
    return regex.test(txt) ? getValidObj() : getInvalidObj(null);
  }
  public messageValidation(txt: string): Validation {
    if (txt === "") {
      return getValidObj();
    }
    if (txt.trim() === "") {
      return getInvalidObj(null);
    }
    const regex = /^[a-zA-Z ]+$/i;
    return regex.test(txt) ? getValidObj() : getInvalidObj(null);
  }
  public addressValidation(txt: string): Validation {
    return /^[a-zA-Z0-9\s]+$/.test(txt) ? getValidObj() : getInvalidObj(null);
  }
  public addressValidationWithEmpty(txt: string): Validation {
    if (txt.trim().length === 0) {
      return getValidObj();
    }
    return /^[a-zA-Z0-9\s]+$/.test(txt) ? getValidObj() : getInvalidObj(null);
  }
  public additionalInfoValidation(txt: string): Validation {
    if (txt === "") {
      return getValidObj();
    }
    return /^[a-zA-Z0-9\s.,-]+$/.test(txt)
      ? getValidObj()
      : getInvalidObj(null);
  }
  public commentsValidation(txt: string): Validation {
    if (txt.trim() === "") {
      return getInvalidObj(null);
    }
    return /^[a-zA-Z0-9\s.,-]{5,}$/.test(txt)
      ? getValidObj()
      : getInvalidObj(null);
  }
  public supplyAdditionalInfoValidation(txt: string): Validation {
    if (txt === "") {
      return getValidObj();
    }
    return /^[\sa-zA-Z0-9.,-]{0,100}$/.test(txt)
      ? getValidObj()
      : getInvalidObj(null);
  }
  public alphaNumericWithEmpty(txt: string): Validation {
    if (txt === "") {
      return getInvalidObj(null);
    }
    return /^\d*[a-zA-Z]{1,}\d*/.test(txt)
      ? getValidObj()
      : getInvalidObj(null);
  }
  public physicianNumberValidation(txt: string): Validation {
    if (txt === "") {
      return getInvalidObj(null);
    }
    const regex = /^[0-9]{10}$/;
    return regex.test(txt) ? getValidObj() : getInvalidObj(null);
  }
  public nameValidationWithEmpty(txt: string): Validation {
    if (txt.trim().length === 0) {
      return getValidObj();
    }
    const regex = /^[a-z ]+$/i;
    return regex.test(txt) ? getValidObj() : getInvalidObj(null);
  }
  public cityValidation(txt: string): Validation {
    if (txt.trim().length === 0) {
      return getInvalidObj(null);
    }
    const regex = /^[A-Za-z -\s]*$/;
    return regex.test(txt) ? getValidObj() : getInvalidObj(null);
  }
  public emailValidation(txt: string, allowEmpty: boolean = true): Validation {
    if (txt === "") {
      return allowEmpty ? getValidObj() : getInvalidObj(INVALID_USERNAME);
    }
    let regex = /^[a-zA-Z0-9+-._@]+$/;
    const indexOfAt = txt.indexOf("@");
    const email = indexOfAt === -1 ? txt : txt.substring(0, indexOfAt);
    if (regex.test(email)) {
      regex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const isValid = regex.test(txt.toLowerCase());
      if (isValid) {
        return getValidObj();
      } else {
        return getInvalidObj(INVALID_EMAIL);
      }
    }
    return getInvalidObj(INVALID_EMAIL);
  }
  public async emailDbValidation(
    txt: string,
    allowEmpty: boolean = true
  ): Promise<Validation> {
    if (txt === "") {
      return allowEmpty
        ? Promise.resolve(getValidObj())
        : Promise.resolve(getInvalidObj(null));
    }
    let regex = /^[a-zA-Z0-9+-._@]+$/;
    const indexOfAt = txt.indexOf("@");
    const email = indexOfAt === -1 ? txt : txt.substring(0, indexOfAt);
    if (regex.test(email)) {
      regex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const isValid = regex.test(txt.toLowerCase());
      if (isValid) {
        const reqBody = {
          Type: 1,
          Data: txt,
        };
        const response = await validateUserNameAndEmail(
          JSON.stringify(reqBody)
        );
        if (response.error) {
          return Promise.resolve(
            getInvalidObj(response.error.errorMessages[0])
          );
        }
        return Promise.resolve(getValidObj());
      } else {
        return Promise.resolve(
          getInvalidObj(txt.trim() !== "" ? INVALID_EMAIL : null)
        );
      }
    }
    return Promise.resolve(
      getInvalidObj(txt.trim() !== "" ? INVALID_EMAIL : null)
    );
  }
  public passwordValidation(txt: string): Validation {
    if (txt === "") {
      return getInvalidObj(null);
    }
    let regex =
      /^(?=(.*?[A-Z]){1,})(?=(.*[a-z]){1,})(?=(.*[0-9]){1,})(?=(.*[;,$#!:+._@-]){1,})[a-zA-Z0-9;,$#!:+._@-]{10,}$/;
    return regex.test(txt) ? getValidObj() : getInvalidObj(null);
  }
  public resetPasswordValidation(txt: string): Validation {
    if (txt === "") {
      return getInvalidObj(null);
    }
    let regex =
      /^(?=(.*?[A-Z]){1,})(?=(.*[a-z]){1,})(?=(.*[0-9]){1,})(?=(.*[;,$#!:+._@-]){1,})[a-zA-Z0-9;,$#!:+._@-]{10,}$/;
    return regex.test(txt) ? getValidObj() : getInvalidObj(null);
  }
  public dobValidation(txt: string): Validation {
    const formatteddate = moment(txt);
    const tomorrow = moment().add(1, "days");
    if (
      formatteddate.year() >= 1900 &&
      formatteddate.isSameOrBefore(tomorrow)
    ) {
      return getValidObj();
    }
    return getInvalidObj(null);
  }
  public emptyCheck(txt: string) {
    if (txt !== "" && txt.trim() === "") {
      return getInvalidObj(null);
    }
    return txt === "" ? getInvalidObj(null) : getValidObj();
  }

  public noCheckboxSelection(values: any[]) {
    return values.filter((x) => x.selected).length === 0
      ? getInvalidObj(null)
      : getValidObj();
  }
  public noValidation(txt: string): Validation {
    return getValidObj();
  }
  public userNameValidation(txt: string): Validation {
    const regex = /^[a-zA-Z0-9\-+_.@]+$/i;
    const isValid = regex.test(txt);
    return isValid
      ? getValidObj()
      : getInvalidObj(txt.trim() !== "" ? INVALID_USERNAME : null);
  }
  public payerNameValidation(txt: string): Validation {
    if (txt.trim().length === 0) {
      return getInvalidObj(null);
    }
    const regex = /^[A-Za-z -\s]*$/;
    return regex.test(txt) ? getValidObj() : getInvalidObj(null);
  }
  public addressLine1(txt: string): Validation {
    if (txt.trim().length === 0) {
      return getInvalidObj(null);
    }
    return /^[a-zA-Z0-9\s]+$/.test(txt) ? getValidObj() : getInvalidObj(null);
  }
  public memberIDValidation(txt: string): Validation {
    if (txt.trim().length === 0) {
      return getInvalidObj(null);
    }
    const regex = /^[a-zA-Z0-9\s]+$/i;
    const isValid = regex.test(txt);
    return isValid ? getValidObj() : getInvalidObj(null);
  }
  public groupIDValidation(txt: string): Validation {
    if (txt.length === 0) {
      return getValidObj();
    }
    const regex = /^[a-zA-Z0-9]+$/i;
    const isValid = regex.test(txt);
    return isValid ? getValidObj() : getInvalidObj(null);
  }
  public facilityNameValidationEmpty(txt: string): Validation {
    if (txt.length === 0) {
      return getValidObj();
    }
    const regex = /^[a-zA-Z0-9 ]+$/i;
    const isValid = regex.test(txt);
    return isValid ? getValidObj() : getInvalidObj(null);
  }
  public async userNameDbValidation(txt: string): Promise<Validation> {
    const regex = /^[a-zA-Z0-9\-+_.@]+$/i;
    const isValid = regex.test(txt);

    if (isValid) {
      const reqBody = {
        Type: 0,
        Data: txt,
      };
      const response = await validateUserNameAndEmail(JSON.stringify(reqBody));
      if (response.error) {
        return Promise.resolve(getInvalidObj(response.error.errorMessages[0]));
      }
      return Promise.resolve(getValidObj());
    } else {
      return Promise.resolve(
        getInvalidObj(txt.trim() !== "" ? INVALID_USERNAME : null)
      );
    }
  }
  public fieldToMethodMapping(
    field: string
  ): ((txt: string) => Validation) | undefined {
    const mapping = new Map<string, (txt: string) => Validation>([
      ["firstName", this.nameValidation],
      ["lastName", this.nameValidation],
      ["patientinfofirstName", this.patientInfonameValidation],
      ["patientinfolastName", this.patientInfonameValidation],
      ["middleName", this.nameValidationWithEmpty],
      ["address1", this.addressLine1],
      ["address2", this.addressValidationWithEmpty],
      ["city", this.nameValidation],
      ["dob", this.dobValidation],
      ["phone", this.phoneValidation],
      ["zip", this.facilityZipcodeValidation],
      ["ro", this.ROValidation],
      ["dob1", this.dobValidation],
      ["verifycode", this.validateVerificationCode],
    ]);
    const validator = mapping.get(field);
    return validator ? validator : this.noValidation;
  }
  public phoneValidation(txt: string): Validation {
    const phone = txt.replace(/[^0-9]/g, "");
    return phone.length === 10
      ? { status: ValidationStatus.VALID, message: null }
      : { status: ValidationStatus.INVALID, message: null };
  }
  private dbValidateFieldToMethodMapping(
    field: string
  ): ((txt: string) => Promise<Validation>) | undefined {
    const mapping = new Map<string, (txt: string) => Promise<Validation>>([
      // contact information
      ["email", this.emailDbValidation],
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
  public ROValidation(txt: string): Validation {
    const regex = /^\d+$/;
    return regex.test(txt) ? getValidObj() : getInvalidObj(null);
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
    patientData: any,
    updatePatientDataIfUntouchedAndValidated: Function
  ) {
    let temp = { ...patientData };
    Object.keys(temp).forEach((x: string) => {
      if (temp[x].valid === ValidationStatus.UNTOUCHED) {
        temp[x].valid = ValidationStatus.INVALID;
      }
      temp[x].value = temp[x].value.trim();
    });
    updatePatientDataIfUntouchedAndValidated(temp);
    const ifAllValid = Object.keys(patientData).every(
      (x: string) => patientData[x].valid === ValidationStatus.VALID
    );
    return ifAllValid ? getValidObj() : getInvalidObj(null);
  }
  public validateAllSearchFields(patientData: any) {
    const ifAllValid = Object.keys(patientData).every(
      (x: string) => patientData[x].valid === ValidationStatus.VALID
    );
    return ifAllValid ? getValidObj() : getInvalidObj(null);
  }
  public validateVerificationCode(code: string): Validation {
    const regex = /^\d+$/;
    return regex.test(code) && code.length === 6
      ? getValidObj()
      : getInvalidObj(null);
  }
  public titleValidation(txt: string): Validation {
    if (txt.length > 0 && Array.from(txt)[0] === " ") {
      return getInvalidObj(null);
    }
    const regex = /^[a-zA-Z ]+$/i;
    return regex.test(txt) ? getValidObj() : getInvalidObj(null);
  }
  public extensionValidation(txt: string): Validation {
    if (txt === "") {
      return getValidObj();
    }
    const regex = /^[0-9]{0,10}$/;
    return regex.test(txt) ? getValidObj() : getInvalidObj(null);
  }
  public mandatoryEmailValidation(txt: string): Validation {
    return new Validator().emailValidation(txt, false);
  }
  public mandatoryEmailDbValidation(txt: string): Promise<Validation> {
    return new Validator().emailDbValidation(txt, false);
  }
  public dateValidation(txt: string): Validation {
    const formatteddate = moment(txt);
    const today = moment();
    if (
      formatteddate.isValid() &&
      formatteddate.year() >= 1900 &&
      formatteddate.isSameOrBefore(today)
    ) {
      return getValidObj();
    }
    return getInvalidObj(null);
  }

  public deliveryDateValidation(txt: string): Validation {
    const formatteddate = moment(txt);
    const today = moment();
    if (formatteddate.isValid() && !formatteddate.isBefore(today, "day")) {
      return getValidObj();
    }
    return getInvalidObj(null);
  }

  public phoneValidationForOptional(txt: string): Validation {
    const phone = txt.replace(/[^0-9]/g, "");
    if (phone.length === 0) {
      return getValidObj();
    }
    return phone.length === 10 ? getValidObj() : getInvalidObj(null);
  }

  public insuranceMemberIdValidation(txt: string): Validation {
    const regex = /^[a-zA-Z0-9]{1,20}$/i;
    return regex.test(txt) ? getValidObj() : getInvalidObj(null);
  }

  public insuranceGroupIdValidation(txt: string): Validation {
    if (txt === "") {
      return getValidObj();
    }
    const regex = /^[a-zA-Z0-9]{1,20}$/i;
    return regex.test(txt) ? getValidObj() : getInvalidObj(null);
  }

  public previousTherapies(inputList: any): Validation {
    return inputList.some((item: any) => item.selected === true)
      ? getValidObj()
      : getInvalidObj(null);
  }

  public previousTherapyOther(input: string): Validation {
    if (input.trim().length === 0) {
      return getInvalidObj(null);
    }
    const regex = /^[a-zA-Z0-9 ,.-\s]{1,30}$/i;
    return regex.test(input) ? getValidObj() : getInvalidObj(null);
  }

  public payerSearchValidation(input: string): Validation {
    const regex = /^[a-zA-Z0-9 ]{1,30}$/i;
    return regex.test(input) ? getValidObj() : getInvalidObj(null);
  }

  public osteomyelitisies(inputList: any): Validation {
    let selectedCheckBox = Array<any>();
    let onlyCheckBoxSelected = Array<any>();
    let checkBoxWithTextBoxValid = Array<any>();
    let checkBoxWithTextBoxInvalid = Array<any>();
    let checkBoxWithTextBoxUntouched = Array<any>();
    inputList.forEach((item: any) => {
      if (item.selected === true) {
        selectedCheckBox.push(item);
        if (item.isRequiredTextBox === false) {
          onlyCheckBoxSelected.push(item);
        } else {
          if (item.isTextBoxValueValid === ValidationStatus.VALID) {
            checkBoxWithTextBoxValid.push(item);
          } else if (item.isTextBoxValueValid === ValidationStatus.UNTOUCHED) {
            checkBoxWithTextBoxUntouched.push(item);
          } else {
            checkBoxWithTextBoxInvalid.push(item);
          }
        }
      }
    });
    if (selectedCheckBox.length > 0) {
      if (checkBoxWithTextBoxInvalid.length > 0) {
        return getInvalidObj(null);
      } else if (checkBoxWithTextBoxUntouched.length > 0) {
        return getUntouchedObj();
      } else if (
        selectedCheckBox.length ===
        onlyCheckBoxSelected.length + checkBoxWithTextBoxValid.length
      ) {
        return getValidObj();
      } else {
        return getInvalidObj(null);
      }
    } else {
      return getInvalidObj("null");
    }
  }

  public osteomyelitis(input: string): Validation {
    if (input.trim().length === 0) {
      return getInvalidObj(null);
    }
    const regex = /^[a-zA-Z0-9 ]{1,30}$/i;
    return regex.test(input) ? getValidObj() : getInvalidObj(null);
  }
  public infectionRegimenText(input: string): Validation {
    if (input.trim().length === 0) {
      return getInvalidObj(null);
    }
    const regex = /^[a-zA-Z0-9 ,.-\s]{1,30}$/i;
    return regex.test(input) ? getValidObj() : getInvalidObj(null);
  }

  public woundDimension(txt: string): Validation {
    const twoZeroPointerZero = /^([0-9]?[0-9]?)(([.]?)|([.]{1}[0-9]?)?)$/;
    if (twoZeroPointerZero.test(txt)) {
      return getValidObj();
    } else {
      return getInvalidObj(null);
    }
  }

  public measurementDateValidation(txt: string): Validation {
    const formatteddate = moment(txt);
    const today = moment();
    if (
      formatteddate.isValid() &&
      formatteddate.isSameOrBefore(today) &&
      formatteddate.isBetween(
        moment().subtract(60, "d").format("MM/DD/YYYY"),
        moment().add(1, "d").format("MM/DD/YYYY")
      )
    ) {
      return getValidObj();
    }
    return getInvalidObj(null);
  }

  public woundAgeValidation(txt: string): Validation {
    const regex = /^[0-9]{1,2}$/i;
    return regex.test(txt) ? getValidObj() : getInvalidObj(null);
  }

  public emptyArrayCheck(array: [] | null) {
    if (array) {
      return array.length > 0 ? getInvalidObj(null) : getValidObj();
    }
    return getInvalidObj(null);
  }

  public holdDateValidation(txt: string): Validation {
    const formattedDate = moment(txt);
    const maxPastDate = moment().subtract(13, "d").format("MM/DD/YYYY");
    const maxFutureDate = moment().add(13, "d").format("MM/DD/YYYY");
    if (
      formattedDate.isValid() &&
      formattedDate.isSameOrAfter(maxPastDate) &&
      formattedDate.isSameOrBefore(maxFutureDate)
    ) {
      return getValidObj();
    }
    return getInvalidObj(null);
  }

  public resumeDateValidation(txt: string): Validation {
    // Considered hold date is todays date.
    const today = moment(moment().format("MM/DD/YYYY"));
    const formattedDate = moment(moment(txt).format("MM/DD/YYYY"));
    const maxFutureDate = moment(moment().add(13, "d").format("MM/DD/YYYY"));
    if (
      formattedDate.isValid() &&
      today.isSameOrBefore(formattedDate) &&
      formattedDate.isSameOrBefore(maxFutureDate)
    ) {
      return getValidObj();
    }
    return getInvalidObj(null);
  }

  public woundTherapyDiscontinuedDateValidation(txt: string): Validation {
    const formatteddate = moment(txt);
    const today = moment();
    if (
      formatteddate.isValid() &&
      formatteddate.isSameOrBefore(today) &&
      formatteddate.isBetween(
        moment().subtract(61, "d").format("MM/DD/YYYY"),
        moment().add(1, "d").format("MM/DD/YYYY")
      )
    ) {
      return getValidObj();
    }
    return getInvalidObj(null);
  }
  public woundAssessorNameValidation(text: string): Validation {
    if (text.trim().length === 0) {
      return getInvalidObj(null);
    }
    const regex = /^[a-z ]+$/i;
    return regex.test(text) ? getValidObj() : getInvalidObj(null);
  }
  public woundAssessorFacilityNameValidation(txt: string): Validation {
    if (txt.trim().length === 0) {
      return getInvalidObj(null);
    }
    const regex = /^(?![0-9]*$)[\sa-zA-Z0-9-]{0,100}$/;
    return regex.test(txt) ? getValidObj() : getInvalidObj(null);
  }
  public woundAdditionalInfoValidation(txt: string): Validation {
    if (txt === "") {
      return getValidObj();
    }
    return /^[\sa-zA-Z0-9.,-]{0,100}$/.test(txt)
      ? getValidObj()
      : getInvalidObj(null);
  }
  public transferDateValidation(txt: string): Validation {
    const formatteddate = moment(txt);
    const today = moment();
    if (
      formatteddate.isValid() &&
      formatteddate.year() >= 1900 &&
      formatteddate.isSameOrBefore(today)
    ) {
      return getValidObj();
    } else if (txt === "") {
      return getUntouchedObj();
    }
    return getInvalidObj(null);
  }
  public requesterNameValidation(txt: string): Validation {
    if (txt.trim().length === 0) {
      return getInvalidObj(null);
    }
    const regex = /^[A-Za-z \s]*$/;
    return regex.test(txt) ? getValidObj() : getInvalidObj(null);
  }
}
