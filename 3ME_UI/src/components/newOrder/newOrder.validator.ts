import {
  Validation,
  ValidationStatus,
} from "../../core/interfaces/input.interface";
import { getDeepClone } from "../../util/ObjectFunctions";
import { Validator } from "../../util/order.validations";
import { getValidObj } from "../../util/utilityFunctions";
import {
  Question,
  QuestionTypes,
  WoundQuestionaries,
} from "./clinicalInformation/clinicalInfo.interface";
import { ShowAdditionalFields } from "./insuranceInformation/insuranceInformation/insuranceInformation.model";
import { InsuranceInformationValidator } from "./insuranceInformation/insuranceInformation/insuranceInformation.validator";

export class NewOrderValidator {
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
      ["firstName", this._validator.patientInfonameValidation],
      ["middleName", this._validator.middleNameValidation],
      ["lastName", this._validator.nameValidation],
      ["patientinfofirstName", this._validator.patientInfonameValidation],
      ["patientinfolastName", this._validator.patientInfonameValidation],
      ["userName", this._validator.userNameValidation],
      ["dob", this._validator.dobValidation],
      ["language", this._validator.emptyCheck],
      ["phone", this._validator.phoneValidation],
      ["phoneType", this._validator.emptyCheck],
      ["email", this._validator.emailValidation],
      ["address1", this._validator.addressLine1],
      ["address2", this._validator.addressValidationWithEmpty],
      ["city", this._validator.cityValidation],
      ["state", this._validator.emptyCheck],
      ["zip", this._validator.facilityZipcodeValidation],

      // Emergency Contact Info
      ["emergencyContactFirstName", this._validator.nameValidationWithEmpty],
      ["emergencyContactLastName", this._validator.nameValidationWithEmpty],
      [
        "emergencyContactPhoneNumber",
        this._validator.phoneValidationForOptional,
      ],

      // Contributing Cause
      ["contributingCause", this._validator.emptyCheck],
      ["dateOfAccident", this._validator.dateValidation],
      ["accidentType", this._validator.emptyCheck],

      // Submit a valid prescription
      ["submitPrescription", this._validator.emptyCheck],

      //prod info
      ["productInformation", this._validator.emptyCheck],

      ["deliveryContactFirstName", this._validator.patientInfonameValidation],
      ["deliveryContactLastName", this._validator.patientInfonameValidation],
      ["deliveryContactPhone", this._validator.phoneValidation],
      ["deliveryInstructions", this._validator.additionalInfoValidation],

      // Therapy Information
      ["lengthOfTherapy", this._validator.emptyCheck],
      ["goalOfTherapy", this._validator.emptyCheck],

      // Prescriber Search
      ["nationalRegistryNumber", this._validator.physicianNumberValidation],
      ["nationalRegistryState", this._validator.emptyCheck],
      ["filterNPIList", this._validator.emptyCheck],
      ["NPIFirstName", this._validator.nameValidationWithEmpty],
      ["NPILastName", this._validator.nameValidation],

      // Inpatient Transition
      ["wasNPWTInitiated", this._validator.emptyCheck],
      ["dateInitiated", this._validator.dateValidation],

      // Print Common Docs
      ["commonDocs", this._validator.emptyCheck],

      // Patient Current Address
      ["IsSamePermanentAddress", this._validator.noValidation],
      ["patientCurrentAddressPhone", this._validator.phoneValidation],
      ["patientCurrentAddress1", this._validator.addressLine1],
      ["patientCurrentAddress2", this._validator.addressValidationWithEmpty],
      ["patientCurrentAddressCity", this._validator.cityValidation],
      ["patientCurrentAddressState", this._validator.emptyCheck],
      ["patientCurrentAddressZip", this._validator.facilityZipcodeValidation],

      // Verify Requester Info
      ["IsRequesterSameasSubmitter", this._validator.noValidation],
      ["requesterFirstName", this._validator.nameValidation],
      ["requesterLastName", this._validator.nameValidation],
      ["requesterEmail", this._validator.emailValidation],

      // Home Care Provider
      ["homeCareName", this._validator.addressValidation],
      ["addressLine1", this._validator.addressValidation],
      ["addressLine2", this._validator.addressValidationWithEmpty],
      ["city", this._validator.cityValidation],
      ["state", this._validator.emptyCheck],
      ["zipCode", this._validator.facilityZipcodeValidation],
      ["extension", this._validator.extensionValidation],
      ["providerType", this._validator.emptyCheck],
      ["contactNumber", this._validator.phoneValidation],

      // Delivery Information
      ["deliveryProductNeedByDate", this._validator.deliveryDateValidation],
      ["deliveryProductNeedByTime", this._validator.emptyCheck],
      ["deliverySiteType", this._validator.emptyCheck],
      ["deliveryFacilityName", this._validator.facilityNameValidation],
      ["deliveryAddressLine1", this._validator.addressLine1],
      ["deliveryAddressLine2", this._validator.addressValidationWithEmpty],
      ["deliveryCity", this._validator.cityValidation],
      ["deliveryState", this._validator.emptyCheck],
      ["deliveryZipCode", this._validator.facilityZipcodeValidation],

      // Previous Therapies details
      ["previousTherapies", this._validator.previousTherapies],
      ["previousTherapyOther", this._validator.previousTherapyOther],
      ["previousTherapiesCausesOther", this._validator.previousTherapyOther],

      // Comorbodities
      ["wndInfocomorbodities", this._validator.previousTherapies],
      ["wndInfoComorbiditiesOther", this._validator.previousTherapyOther],
      ["payerType", this._validator.emptyCheck],
      ["payerName", this._validator.previousTherapyOther],
      ["payerContactNumber", this._validator.phoneValidation],

      // New Order Nutrion section
      ["nutriStatusCompromized", this._validator.emptyCheck],
      ["nutritionActions", this._validator.noCheckboxSelection],

      // Osteomyelitis
      ["isOsteomyelitisPresent", this._validator.emptyCheck],
      ["osteomyelitisies", this._validator.osteomyelitisies],
      ["osteomyelitisItemText", this._validator.osteomyelitis],
      ["isTreatemenForResolveBoneInfection", this._validator.emptyCheck],
      ["antibioticName", this._validator.nameValidation],

      // Debridement
      ["debridementAttempted", this._validator.emptyCheck],
      ["debridementType", this._validator.emptyCheck],
      ["debridementDate", this._validator.dateValidation],
      ["serialDebridementRequired", this._validator.emptyCheck],

      // woundTunneling
      ["woundTunneling", this._validator.emptyCheck],
      ["location1Position", this._validator.emptyCheck],
      ["location2Position", this._validator.emptyCheck],
      ["location1Depth", this._validator.woundDimension],
      ["location2Depth", this._validator.woundDimension],

      // woundDimension
      ["woundMeasurementDate", this._validator.measurementDateValidation],
      ["woundThickness", this._validator.emptyCheck],
      ["woundLength", this._validator.woundDimension],
      ["woundWidth", this._validator.woundDimension],
      ["woundDepth", this._validator.woundDimension],

      // wound exudate
      ["exudateAmount", this._validator.emptyCheck],
      ["exudateAppearance", this._validator.emptyCheck],

      // Clinical Information
      [
        "shortNarrativeOfPossibleConsequences",
        this._validator.additionalInfoValidation,
      ],
      ["woundAge", this._validator.woundAgeValidation],
      ["woundLocation", this._validator.emptyCheck],
      ["woundDirection", this._validator.emptyCheck],
      ["woundOrientation", this._validator.emptyCheck],
      ["isTissuePresent", this._validator.emptyCheck],

      // woundUndermining
      ["woundUndermining", this._validator.emptyCheck],
      ["underminingLocation1PositionFrom", this._validator.emptyCheck],
      ["underminingLocation2PositionFrom", this._validator.emptyCheck],
      ["underminingLocation1PositionTo", this._validator.emptyCheck],
      ["underminingLocation2PositionTo", this._validator.emptyCheck],
      ["underminingLocation1Depth", this._validator.woundDimension],
      ["underminingLocation2Depth", this._validator.woundDimension],
      ["woundType", this._validator.emptyCheck],
      ["productName", this._validator.emptyCheck],
      ["secProductName", this._validator.emptyCheck],
      ["productSizeName", this._validator.emptyCheck],
      ["secProductSizeName", this._validator.emptyCheck],

      // Accessory
      ["accessories", this._validator.emptyArrayCheck],
      ["updatedPrescriberEmail", this._validator.mandatoryEmailValidation],

      //Homecare Provider Search
      ["homeCareProviderSearch", this._validator.payerNameValidation],

      //share order invite validation
      ["shareOrderInviteFName", this._validator.nameValidation],
      ["shareOrderInviteLName", this._validator.nameValidation],
      ["shareOrderInviteEmail", this._validator.emailValidation],
      ["shareOrderInviteNote", this._validator.additionalInfoValidation],

      ["length", this._validator.woundDimension],
      ["width", this._validator.woundDimension],
      ["depth", this._validator.woundDimension],
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

  public validateArray(input: any, field: string) {
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
      ["email", this._validator.emailDbValidation],
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
    newOrderData: any,
    requesterData: any,
    dressingKit: any,
    deliveryInformation: any,
    updateNewOrderDataIfUntouchedAndValidated: Function,
    updateRequesterDataIfUntouchedAndValidated: Function,
    updateDressingDataIfUntouchedAndValidated: Function,
    updateDeliveryInformationDataIfUntouchedAndValidated: Function
  ) {
    let temp = getDeepClone(newOrderData);
    let requesterTemp = getDeepClone(requesterData);
    let dressingTemp = getDeepClone(dressingKit);
    let deliveryInformationTemp = getDeepClone(deliveryInformation);
    const primaryInsurance = temp["primaryInsurance"];
    const secondaryInsurance = temp["secondaryInsurance"];
    if (temp["IsSamePermanentAddress"].value === "true") {
      temp["patientCurrentAddress1"].valid = ValidationStatus.VALID;
      temp["patientCurrentAddress2"].valid = ValidationStatus.VALID;
      temp["patientCurrentAddressCity"].valid = ValidationStatus.VALID;
      temp["patientCurrentAddressState"].valid = ValidationStatus.VALID;
      temp["patientCurrentAddressZip"].valid = ValidationStatus.VALID;
    }
    if (temp["contributingCause"].value === "no") {
      temp["dateOfAccident"].valid = ValidationStatus.VALID;
      temp["accidentType"].valid = ValidationStatus.VALID;
    }
    if (temp["wasNPWTInitiated"].value === "no") {
      temp["dateInitiated"].valid = ValidationStatus.VALID;
    }
    if (
      deliveryInformationTemp["deliverySiteType"].value === "101" ||
      deliveryInformationTemp["deliverySiteType"].value === "102" ||
      deliveryInformationTemp["deliverySiteType"].value === "103"
    ) {
      deliveryInformationTemp["deliveryFacilityName"].valid =
        ValidationStatus.VALID;
      deliveryInformationTemp["deliveryAddressLine1"].valid =
        ValidationStatus.VALID;
      deliveryInformationTemp["deliveryAddressLine2"].valid =
        ValidationStatus.VALID;
      deliveryInformationTemp["deliveryCity"].valid = ValidationStatus.VALID;
      deliveryInformationTemp["deliveryState"].valid = ValidationStatus.VALID;
      deliveryInformationTemp["deliveryZipCode"].valid = ValidationStatus.VALID;
    }
    if (temp["homeCareProvider"].value === "no") {
      temp["addedCaregiverName"].valid = ValidationStatus.VALID;
      temp["addedCaregiverAddress1"].valid = ValidationStatus.VALID;
      temp["addedCaregiverAddress2"].valid = ValidationStatus.VALID;
      temp["addedCaregiverCity"].valid = ValidationStatus.VALID;
      temp["addedCaregiverState"].valid = ValidationStatus.VALID;
      temp["addedCaregiverPhone"].valid = ValidationStatus.VALID;
      temp["addedCaregiverZip"].valid = ValidationStatus.VALID;
      temp["addedCaregiverFacilityType"].valid = ValidationStatus.VALID;
    }
    if (
      temp["submitPrescription"].value === "EPrescription" &&
      !temp["updatedPrescriberEmail"].value
    ) {
      temp["updatedPrescriberEmail"].valid = ValidationStatus.INVALID;
    } else {
      temp["updatedPrescriberEmail"].valid = ValidationStatus.VALID;
    }

    Object.keys(temp).forEach((x: string) => {
      if (
        temp[x].isOptional === true &&
        temp[x].valid !== ValidationStatus.VALID
      ) {
        temp[x].valid = ValidationStatus.VALID;
      } else if (temp[x].valid === ValidationStatus.UNTOUCHED) {
        temp[x].valid = ValidationStatus.INVALID;
      }
    });

    Object.keys(requesterTemp).forEach((x: string) => {
      if (
        requesterTemp[x].isOptional === true &&
        requesterTemp[x].valid !== ValidationStatus.VALID
      ) {
        requesterTemp[x].valid = ValidationStatus.VALID;
      } else if (requesterTemp[x].valid === ValidationStatus.UNTOUCHED) {
        requesterTemp[x].valid = ValidationStatus.INVALID;
      }
    });

    Object.keys(dressingTemp).forEach((x: string) => {
      if (
        dressingTemp[x].isOptional === true &&
        dressingTemp[x].valid !== ValidationStatus.VALID
      ) {
        dressingTemp[x].valid = ValidationStatus.VALID;
      } else if (dressingTemp[x].valid === ValidationStatus.UNTOUCHED) {
        dressingTemp[x].valid = ValidationStatus.INVALID;
      }
    });
    Object.keys(deliveryInformationTemp).forEach((x: string) => {
      if (
        deliveryInformationTemp[x].isOptional === true &&
        deliveryInformationTemp[x].valid !== ValidationStatus.VALID
      ) {
        deliveryInformationTemp[x].valid = ValidationStatus.VALID;
      } else if (
        deliveryInformationTemp[x].valid === ValidationStatus.UNTOUCHED
      ) {
        deliveryInformationTemp[x].valid = ValidationStatus.INVALID;
      }
    });
    updateNewOrderDataIfUntouchedAndValidated(temp);
    updateRequesterDataIfUntouchedAndValidated(requesterTemp);
    updateDressingDataIfUntouchedAndValidated(dressingTemp);

    updateDeliveryInformationDataIfUntouchedAndValidated(
      deliveryInformationTemp
    );
    const ifAllValid = Object.keys(temp)
      .filter((x) => temp[x].valid)
      .every((x: string) => temp[x].valid === ValidationStatus.VALID);

    const ifRequesterValid = Object.keys(requesterTemp)
      .filter((x) => requesterTemp[x].valid)
      .every((x: string) => requesterTemp[x].valid === ValidationStatus.VALID);

    const ifDressingValid = Object.keys(dressingTemp)
      .filter((x) => dressingTemp[x].valid)
      .every((x: string) => dressingTemp[x].valid === ValidationStatus.VALID);

    const ifDeliveryInformationValid = Object.keys(deliveryInformationTemp)
      .filter((x) => deliveryInformationTemp[x].valid)
      .every(
        (x: string) =>
          deliveryInformationTemp[x].valid === ValidationStatus.VALID
      );
    let isPrimaryInsuranceValid = false;
    let secondaryInsuranceValid = false;
    const isSecondaryOpen = temp["isSecondaryInsurancePresent"].value === true;
    const insuranceValidator = new InsuranceInformationValidator();
    isPrimaryInsuranceValid = insuranceValidator.validateAll(
      primaryInsurance,
      true,
      updateNewOrderDataIfUntouchedAndValidated
    );
    if (isSecondaryOpen) {
      secondaryInsuranceValid = insuranceValidator.validateAll(
        secondaryInsurance,
        false,
        updateNewOrderDataIfUntouchedAndValidated
      );
    }

    const isFinalValid =
      ifAllValid &&
      ifRequesterValid &&
      ifDressingValid &&
      ifDeliveryInformationValid &&
      isPrimaryInsuranceValid &&
      ((isSecondaryOpen && secondaryInsuranceValid) || !isSecondaryOpen);
    return isFinalValid ? ValidationStatus.VALID : ValidationStatus.INVALID;
  }

  public validateMinimumFields(
    newOrderData: any,
    updateNewOrderDataIfUntouchedAndValidated: Function
  ) {
    let temp = getDeepClone(newOrderData);
    Object.keys(temp).forEach((x: string) => {
      if (temp[x].minimumRequired) {
        if (temp[x].valid === ValidationStatus.UNTOUCHED) {
          temp[x].valid = ValidationStatus.INVALID;
        }
      }
    });
    updateNewOrderDataIfUntouchedAndValidated(temp);
    const ifAllValid = Object.keys(temp)
      .filter((x) => temp[x].minimumRequired)
      .every((x: string) => temp[x].valid === ValidationStatus.VALID);
    return ifAllValid ? ValidationStatus.VALID : ValidationStatus.INVALID;
  }

  public validateUserEnteredAnyDataOrNot(
    newOrderData: any,
    newOrderDocuments: any,
    requesterData: any,
    dressingKit: any,
    accessory: any,
    insuranceShowingDetails: ShowAdditionalFields
  ) {
    let temp = getDeepClone(newOrderData);
    const keys = Object.keys(temp);
    const insuranceValidator = new InsuranceInformationValidator();
    for (let x of keys) {
      if (
        x === "inpatientFacility" ||
        x === "inpatientFacilityAsDefault" ||
        x === "requesterFacility" ||
        x === "requesterFacilityAsDefault"
      ) {
        if (temp[x] === false) {
          return true;
        }
      } else if (
        x === "accessories" ||
        x === "prescriptionDoc" ||
        x === "uploadDocument"
      ) {
        if (temp[x].length > 0) {
          return true;
        }
      } else if (x === "primaryInsurance" || x === "secondaryInsurance") {
        if (
          insuranceValidator.validateUserEnteredAnyDataOrNot(
            temp[x],
            x === "primaryInsurance",
            insuranceShowingDetails
          )
        ) {
          return true;
        }
      } else if (
        temp[x].isDefaultValid !== true &&
        temp[x].isOptional !== true &&
        temp[x].valid !== ValidationStatus.UNTOUCHED
      ) {
        return true;
      }
    }
    let requesterTemp = getDeepClone(requesterData);
    const requesterKeys = Object.keys(requesterTemp);
    for (let x of requesterKeys) {
      if (x === "IsRequesterSameasSubmitter") {
        if (temp["IsRequesterSameasSubmitter"].value !== "yes") {
          return true;
        }
      } else if (
        x === "requesterFirstName" ||
        x === "requesterLastName" ||
        x === "requesterEmail"
      ) {
        if (
          temp["IsRequesterSameasSubmitter"].value !== "yes" &&
          temp[x].valid !== ValidationStatus.UNTOUCHED
        ) {
          return true;
        }
      } else if (
        temp[x].isDefaultValid !== true &&
        temp[x].isOptional !== true &&
        temp[x].valid !== ValidationStatus.UNTOUCHED
      ) {
        return true;
      }
    }
    let dressingTemp = getDeepClone(dressingKit);
    const dressingKeys = Object.keys(dressingTemp);
    for (let x of dressingKeys) {
      if (
        temp[x].isDefaultValid !== true &&
        temp[x].isOptional !== true &&
        temp[x].valid !== ValidationStatus.UNTOUCHED
      ) {
        return true;
      }
    }
    let accessoryTemp = getDeepClone(accessory);
    const accessoryKeys = Object.keys(accessoryTemp);
    for (let x of accessoryKeys) {
      if (x === "accessories") {
        if (temp[x].length > 0) {
          return true;
        }
      } else if (
        temp[x].isDefaultValid !== true &&
        temp[x].isOptional !== true &&
        temp[x].valid !== ValidationStatus.UNTOUCHED
      ) {
        return true;
      }
    }
    if (newOrderDocuments.length > 0) {
      return true;
    }
    return false;
  }

  public validateAllWoundInfo(
    woundInfo: any,
    updateWoundInfoIfUntouchedAndValidated: Function,
    secondaryWoundInfo: any,
    updateSecondaryWoundInfoIfUntouchedAndValidated: Function,
    primaryQuestData: any,
    updatePriamryQuestData: Function,
    secondaryQuestData: any,
    updateSecondaryQuestData: Function
  ) {
    let temp = getDeepClone(woundInfo);
    Object.keys(temp).forEach((x: string) => {
      if (x === "osteomyelitisies") {
        let isNotValid = false;
        temp[x].value.forEach((item: any) => {
          if (item.selected) {
            if (
              item.isRequiredTextBox &&
              item.isTextBoxValueValid === ValidationStatus.UNTOUCHED
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
      if (!Array.isArray(temp[x].value)) {
        if (temp[x].value !== null && temp[x].value !== "") {
          temp[x].value = temp[x].value.trim();
        }
      }
    });
    updateWoundInfoIfUntouchedAndValidated(temp);
    const ifAllValid = Object.keys(temp)
      .filter((x) => temp[x].required)
      .every((x: string) => temp[x].valid === ValidationStatus.VALID);
    const isShowSecondaryWoundInfo =
      temp["isShowSecondaryWoundInfo"].value === "Yes" ?? false;
    let secondaryWoundDataValid = false;
    let secondaryAdditionalsValid = false;
    // update error in additional questions if any
    const primaryAdditionalsValid = this.validateAllAdditionalQuestions(
      primaryQuestData,
      updatePriamryQuestData
    );
    if (isShowSecondaryWoundInfo) {
      secondaryAdditionalsValid =
        this.validateAllAdditionalQuestions(
          secondaryQuestData,
          updateSecondaryQuestData
        ) ?? false;
      secondaryWoundDataValid = this.validateSecondaryWoundData(
        secondaryWoundInfo,
        updateSecondaryWoundInfoIfUntouchedAndValidated
      );
    }
    const checkForSecondary =
      (isShowSecondaryWoundInfo &&
        secondaryWoundDataValid &&
        secondaryAdditionalsValid) ||
      !isShowSecondaryWoundInfo;

    return ifAllValid && primaryAdditionalsValid && checkForSecondary
      ? ValidationStatus.VALID
      : ValidationStatus.INVALID;
  }

  public validateAdditionalQuestions(question: Question, type: QuestionTypes) {
    try {
      if (type === QuestionTypes.RADIO) {
        if (!question.value || question.value === "") {
          return ValidationStatus.INVALID;
        } else {
          return ValidationStatus.VALID;
        }
      } else if (type === QuestionTypes.TEXT) {
        if (!question.value || question.value?.length < 5) {
          return ValidationStatus.INVALID;
        } else {
          return ValidationStatus.VALID;
        }
      } else if (type === QuestionTypes.DATE) {
        const valStatus = this._validator.dateValidation(question.value);
        return valStatus.status;
      }
    } catch (error) {
      console.log(`validator method for field is not configured`);
    }
  }

  public validateAllAdditionalQuestions(
    questionaries: WoundQuestionaries,
    updateData: Function
  ) {
    try {
      const quests = questionaries.additionalQuestion.map((quest) => {
        const valStatus = this.validateAdditionalQuestions(quest, quest.type);
        return { ...quest, valid: valStatus } as Question;
      });
      updateData((data: any) => ({
        ...data,
        additionalQuestion: quests!,
      }));
      const isAllValid = quests
        .filter((x) => Boolean(x.required))
        .every((x) => x.valid === ValidationStatus.VALID);
      return isAllValid;
    } catch (error) {
      console.log(error);
    }
  }

  public validateSecondaryWoundData(
    data: any,
    updateSecondaryWoundInfoIfUntouchedAndValidated: Function
  ): boolean {
    let temp = getDeepClone(data);
    Object.keys(temp).forEach((x: string) => {
      if (temp[x].required && temp[x].valid === ValidationStatus.UNTOUCHED) {
        temp[x].valid = ValidationStatus.INVALID;
      }
    });
    updateSecondaryWoundInfoIfUntouchedAndValidated(temp);
    const ifAllValid = Object.keys(temp)
      .filter((x) => temp[x].required)
      .every((x: string) => temp[x].valid === ValidationStatus.VALID);
    return ifAllValid;
  }

  public validateSecondaryWoundForUserEnteredAnyDataOrNot(data: any) {
    let temp = getDeepClone(data);
    let result = false;
    Object.keys(temp).forEach((x: string) => {
      if (
        x !== "woundBedTotal" &&
        temp[x].isDefaultValid !== true &&
        temp[x].valid !== ValidationStatus.UNTOUCHED
      ) {
        result = true;
        return;
      }
    });
    return result;
  }
}
