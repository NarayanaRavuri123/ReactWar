import { SecondaryWoundInfo } from "./../../clinicalInformation/secondaryWoundInfo/secondaryWoundInfo.component";
import {
  getInvalidObj,
  getUntouchedObj,
} from "./../../../../util/utilityFunctions";
import { Validator } from "./../../../../util/order.validations";
import _ from "underscore";
import { ValidationStatus } from "../../../../core/interfaces/input.interface";
import { IFacility } from "../../../manageProfile/facilityInformation/facility.interface";
import {
  Question,
  WoundQuestionaries,
} from "../../clinicalInformation/clinicalInfo.interface";
import { ISecondaryWoundInfo } from "../../clinicalInformation/secondaryWoundInfo/secondaryWoundInfo.interface";
import { comorbiditiesData } from "../../comorbodities/comorbodities.data";
import { exposedStructuresData } from "../../exposedStructures/exposedStructures.data";
import { IInsuranceInformation } from "../../insuranceInformation/insuranceInformation/insuranceInformation.interface";
import {
  defaultInsuranceData,
  ShowAdditionalFields,
} from "../../insuranceInformation/insuranceInformation/insuranceInformation.model";
import {
  ICanister,
  IDeliveryInformation,
  IDressingKit,
  INewOrder,
  IProductAccessory,
  IProductInfo,
  IRequesterInfo,
} from "../../newOrder.interface";
import { NewOrderValidator } from "../../newOrder.validator";
import { INewOrderWoundInfo } from "../../newOrderWoundInfoStepper/newOrderWoundInfo.interface";
import { nutriActionData } from "../../nutrition/nutritionAction.data";
import {
  osteomyelitisies,
  previousTherapy,
  previousTherapyCause,
} from "../../previousTherapies/previousTherapiesData";
import { Wound } from "../newOrderRequestMapper.interface";
import { VacOrderSummaryData } from "./newOrderResponseMapper.interface";
import { InsuranceInformationValidator } from "../../insuranceInformation/insuranceInformation/insuranceInformation.validator";

export const mapVacOrderResponse = async (
  vacOrderSummarInfo: VacOrderSummaryData,
  insuranceTypes: any,
  setShowAdditionalObject: any,
  providerTypes: any,
  Validator = new NewOrderValidator(),
  ValidatorInsurance = new InsuranceInformationValidator()
) => {
  let newOrder: INewOrder;
  newOrder = {
    address1: {
      valid: Validate(
        Validator,
        "address1",
        vacOrderSummarInfo.permanentAddress.addressLine1
      )!,
      value: vacOrderSummarInfo.permanentAddress.addressLine1,
    },
    address2: {
      valid: ValidationStatus.VALID,
      value: vacOrderSummarInfo.permanentAddress.addressLine2,
      isDefaultValid: true,
    },
    city: {
      valid: Validate(
        Validator,
        "city",
        vacOrderSummarInfo.permanentAddress.city
      )!,
      value: vacOrderSummarInfo.permanentAddress.city,
    },
    dob: {
      valid: Validate(Validator, "dob", vacOrderSummarInfo.customerDOB)!,
      value: vacOrderSummarInfo.customerDOB,
      minimumRequired: true,
    },
    email: {
      valid: Validate(
        Validator,
        "email",
        vacOrderSummarInfo.customerEmailAddress
      )!,
      value: vacOrderSummarInfo.customerEmailAddress,
      isDefaultValid: true,
    },
    firstName: {
      valid: Validate(
        Validator,
        "patientinfofirstName",
        vacOrderSummarInfo.customerFirstName
      )!,
      value: vacOrderSummarInfo.customerFirstName,
      minimumRequired: true,
    },
    lastName: {
      valid: Validate(
        Validator,
        "patientinfolastName",
        vacOrderSummarInfo.customerLastName
      )!,
      value: vacOrderSummarInfo.customerLastName,
      minimumRequired: true,
    },
    phone: {
      valid: Validate(Validator, "phone", vacOrderSummarInfo.customerPhoneNo)!,
      value: vacOrderSummarInfo.customerPhoneNo,
    },
    state: {
      valid: Validate(
        Validator,
        "state",
        vacOrderSummarInfo.permanentAddress.stateCode
      )!,
      value: vacOrderSummarInfo.permanentAddress.stateCode,
    },
    zip: {
      valid: Validate(
        Validator,
        "zip",
        vacOrderSummarInfo.permanentAddress.postalCode
      )!,
      value: vacOrderSummarInfo.permanentAddress.postalCode,
    },

    // Emergency Contact Info
    emergencyContactFirstName: {
      valid: Validate(
        Validator,
        "emergencyContactFirstName",
        vacOrderSummarInfo.emergencyContactFirstName
      )!,
      value: vacOrderSummarInfo.emergencyContactFirstName,
      isDefaultValid: true,
    },
    emergencyContactLastName: {
      valid: Validate(
        Validator,
        "emergencyContactLastName",
        vacOrderSummarInfo.emergencyContactLastName
      )!,
      value: vacOrderSummarInfo.emergencyContactLastName,
      isDefaultValid: true,
    },
    emergencyContactPhoneNumber: {
      valid: Validate(
        Validator,
        "emergencyContactPhoneNumber",
        vacOrderSummarInfo.emergencyContactPhoneNumber
      )!,
      value: vacOrderSummarInfo.emergencyContactPhoneNumber,
      isDefaultValid: true,
    },

    // Contributing Cause
    contributingCause: {
      value:
        vacOrderSummarInfo.contributingCause === null
          ? ""
          : vacOrderSummarInfo.contributingCause === true
          ? "yes"
          : "no",
      valid:
        vacOrderSummarInfo.contributingCause === null
          ? ValidationStatus.UNTOUCHED
          : ValidationStatus.VALID,
    },
    dateOfAccident: {
      valid: Validate(
        Validator,
        "dateOfAccident",
        vacOrderSummarInfo.clinicalInformation.contributingCauseAccidentDate
      )!,
      value:
        vacOrderSummarInfo.clinicalInformation.contributingCauseAccidentDate,
    },
    accidentType: {
      valid: Validate(
        Validator,
        "accidentType",
        vacOrderSummarInfo.clinicalInformation.contributingCauseAccidentType ??
          ""
      )!,
      value:
        vacOrderSummarInfo.clinicalInformation.contributingCauseAccidentType ??
        "",
    },

    // HomeCareProvider Cause
    homeCareProvider: {
      valid: ValidationStatus.VALID,
      value:
        vacOrderSummarInfo.administeringDressingChanges === null
          ? ""
          : vacOrderSummarInfo.administeringDressingChanges === true
          ? "yes"
          : "no",
    },
    addedCaregiverName: {
      valid: ValidationStatus.VALID,
      value: vacOrderSummarInfo.hcp.facilityName,
      required: false,
    },
    addedCaregiverAddress1: {
      valid: ValidationStatus.VALID,
      value: vacOrderSummarInfo.hcp.address.addressLine1,
      required: false,
    },
    addedCaregiverAddress2: {
      valid: ValidationStatus.VALID,
      value: vacOrderSummarInfo.hcp.address.addressLine2,
      required: false,
    },
    addedCaregiverCity: {
      valid: ValidationStatus.VALID,
      value: vacOrderSummarInfo.hcp.address.city,
      required: false,
    },
    addedCaregiverState: {
      valid: ValidationStatus.VALID,
      value: vacOrderSummarInfo.hcp.address.stateCode,
      required: false,
    },
    addedCaregiverPhone: {
      valid: ValidationStatus.VALID,
      value: vacOrderSummarInfo.hcp.phoneNo,
      required: false,
    },
    addedCaregiverZip: {
      valid: ValidationStatus.VALID,
      value: vacOrderSummarInfo.hcp.address.postalCode,
      required: false,
    },
    addedCaregiverFacilityType: {
      valid: ValidationStatus.VALID,
      value: getHcpFacilityName(providerTypes, vacOrderSummarInfo),
      required: false,
    },

    // Submit a valid prescription
    submitPrescription: {
      valid: Validate(
        Validator,
        "submitPrescription",
        vacOrderSummarInfo.prescriptionMethod.toString() === "0"
          ? ""
          : vacOrderSummarInfo.prescriptionMethod.toString()
      )!,
      value: getSubmitPrescription(
        vacOrderSummarInfo.prescriptionMethod.toString()
      ),
    },
    prescriptionDoc: [],

    deliveryContactFirstName: {
      valid: Validate(
        Validator,
        "deliveryContactFirstName",
        vacOrderSummarInfo.deliveryFirstName
      )!,
      value: vacOrderSummarInfo.deliveryFirstName,
    },
    deliveryContactLastName: {
      valid: Validate(
        Validator,
        "deliveryContactLastName",
        vacOrderSummarInfo.deliveryLastName
      )!,
      value: vacOrderSummarInfo.deliveryLastName,
    },
    deliveryContactPhone: {
      valid: Validate(
        Validator,
        "deliveryContactPhone",
        vacOrderSummarInfo.deliveryPhoneNumber
      )!,
      value: vacOrderSummarInfo.deliveryPhoneNumber,
    },
    deliveryInstructions: {
      valid: Validate(
        Validator,
        "deliveryInstructions",
        vacOrderSummarInfo.deliveryInstructions
      )!,
      value: vacOrderSummarInfo.deliveryInstructions,
      isDefaultValid: true,
    },

    // Therapy Information
    lengthOfTherapy: {
      valid: Validate(
        Validator,
        "lengthOfTherapy",
        vacOrderSummarInfo.therapyDuration === 0
          ? ""
          : vacOrderSummarInfo.therapyDuration.toString()
      )!,
      value:
        vacOrderSummarInfo.therapyDuration === 0
          ? ""
          : vacOrderSummarInfo.therapyDuration.toString(),
    },
    goalOfTherapy: {
      valid: Validate(
        Validator,
        "goalOfTherapy",
        vacOrderSummarInfo.therapyGoal === null
          ? ""
          : vacOrderSummarInfo.therapyGoal.toString()
      )!,
      value:
        vacOrderSummarInfo.therapyGoal === null
          ? ""
          : vacOrderSummarInfo.therapyGoal.toString(),
    },

    // Inpatient Transition
    wasNPWTInitiated: {
      valid: ValidationStatus.VALID,
      value: vacOrderSummarInfo.isTransition === true ? "yes" : "no",
      isDefaultValid: true,
    },
    dateInitiated: {
      valid:
        vacOrderSummarInfo.isTransition === true
          ? Validate(
              Validator,
              "dateInitiated",
              vacOrderSummarInfo.transitionFromFacility.transitionInitaiatedDate
            )!
          : ValidationStatus.VALID,
      value: vacOrderSummarInfo.transitionFromFacility.transitionInitaiatedDate,
    },

    inpatientFacility: getInpatientFacility(vacOrderSummarInfo),
    inpatientFacilityAsDefault: false,

    // Print Common Docs
    commonDocs: {
      valid: ValidationStatus.VALID,
      value: "",
      isDefaultValid: true,
    },

    uploadDocument: [],

    // Patient Current Address
    IsSamePermanentAddress: {
      valid: ValidationStatus.VALID,
      value: compareAddress(
        vacOrderSummarInfo.permanentAddress,
        vacOrderSummarInfo.currentAddress
      ),
      isDefaultValid: true,
    },
    patientCurrentAddressPhone: {
      valid: Validate(
        Validator,
        "patientCurrentAddressPhone",
        vacOrderSummarInfo.currentPhoneNumber
      )!,
      value: vacOrderSummarInfo.currentPhoneNumber,
    },
    patientCurrentAddress1: {
      valid: Validate(
        Validator,
        "patientCurrentAddress1",
        vacOrderSummarInfo.currentAddress.addressLine1
      )!,
      value: vacOrderSummarInfo.currentAddress.addressLine1,
    },
    patientCurrentAddress2: {
      valid: Validate(
        Validator,
        "patientCurrentAddress2",
        vacOrderSummarInfo.currentAddress.addressLine2
      )!,
      value: vacOrderSummarInfo.currentAddress.addressLine2,
      isDefaultValid: true,
    },
    patientCurrentAddressState: {
      valid: Validate(
        Validator,
        "patientCurrentAddressState",
        vacOrderSummarInfo.currentAddress.stateCode
      )!,
      value: vacOrderSummarInfo.currentAddress.stateCode,
    },
    patientCurrentAddressCity: {
      valid: Validate(
        Validator,
        "patientCurrentAddressCity",
        vacOrderSummarInfo.currentAddress.city
      )!,
      value: vacOrderSummarInfo.currentAddress.city,
    },
    patientCurrentAddressZip: {
      valid: Validate(
        Validator,
        "patientCurrentAddressZip",
        vacOrderSummarInfo.currentAddress.postalCode
      )!,
      value: vacOrderSummarInfo.currentAddress.postalCode,
    },

    // Primary Insurance Information
    primaryInsurance: primaryInsurace(
      vacOrderSummarInfo.primaryInsurance,
      insuranceTypes,
      setShowAdditionalObject,
      "primary",
      ValidatorInsurance
    ),

    // Secondary Insurance Information
    isSecondaryInsurancePresent: {
      valid: ValidationStatus.VALID,
      value: checkIsSecondaryPresent(vacOrderSummarInfo),

      isDefaultValid: true,
    },
    secondaryInsurance:
      vacOrderSummarInfo.secondaryInsurance === null
        ? defaultInsuranceData
        : primaryInsurace(
            vacOrderSummarInfo.secondaryInsurance,
            insuranceTypes,
            setShowAdditionalObject,
            "secondary",
            ValidatorInsurance
          ),

    updatedPrescriberEmail: {
      valid: ValidationStatus.VALID,
      value: vacOrderSummarInfo.prescriberEmailAddress,
    },

    loggedInUserSiteUseID: {
      valid: ValidationStatus.VALID,
      value: "",
      isOptional: true,
    },

    addedCaregiverPhoneExtension: {
      valid: ValidationStatus.VALID,
      value: vacOrderSummarInfo.hcp.extension,
      required: false,
    },
    addedCaregiverFacilityTypeCode: {
      valid: ValidationStatus.VALID,
      value: vacOrderSummarInfo.hcp.facilityType.toString(),
      required: false,
    },
    addedCaregiverSiteUseID: {
      valid: ValidationStatus.VALID,
      value: vacOrderSummarInfo.hcp.hcpSiteUseID,
      required: false,
    },
    addedCaregiverID: {
      valid: ValidationStatus.VALID,
      value: vacOrderSummarInfo.hcp.caregiverID ?? "",
      required: false,
    },
    addedCaregiverAccountNumber: {
      valid: ValidationStatus.VALID,
      value: vacOrderSummarInfo.hcp.accountNumber,
      required: false,
    },
  };

  return newOrder;
};

const getSubmitPrescription = (value: string) => {
  switch (value) {
    case "1":
      return "RxImage";
    case "2":
      return "EPrescription";
    case "3":
      return "Fax";
    default:
      return "";
  }
};

const checkIsSecondaryPresent = (vacOrderSummary: VacOrderSummaryData) => {
  if (vacOrderSummary.secondaryInsurance !== null) {
    return true;
  }
  return false;
};

const getAccessoriesObj = (value: any) => {
  return value.map((element: any) => {
    return {
      id: element.sku,
      code: element.sku.toString(),
      value: element.productName.toString(),
    };
  });
};

const Validate = (
  Validator: NewOrderValidator,
  Name: string,
  Value: string
) => {
  let notNullValue = Value === null ? "" : Value;
  const Status = Validator?.validate(notNullValue, Name)?.status;
  return Status === ValidationStatus.INVALID
    ? ValidationStatus.UNTOUCHED
    : Status;
};

const ValidateInsurance = (
  Validator: InsuranceInformationValidator,
  Name: string,
  Value: string
) => {
  let notNullValue = Value === null ? "" : Value;
  const Status = Validator?.validate(notNullValue, Name)?.status;
  return Status === ValidationStatus.INVALID
    ? ValidationStatus.UNTOUCHED
    : Status;
};

const ValidateArray = (
  Validator: NewOrderValidator,
  Name: string,
  Value: any
) => {
  const Status = Validator?.validateArray(Value, Name)?.status;
  return Status === ValidationStatus.INVALID
    ? ValidationStatus.UNTOUCHED
    : Status;
};

const ValidateArrayValues = (Values: any) => {
  var selectedLength = Values.filter(
    (e: { selected: boolean }) => e.selected === true
  ).length;
  return selectedLength > 0
    ? ValidationStatus.VALID
    : ValidationStatus.UNTOUCHED;
};

const ValidateNestedArrayValues = (Values: any) => {
  var selectedLength = Values.filter(
    (e: { selected: boolean; isTextBoxValueValid: boolean }) =>
      e.selected === true && e.isTextBoxValueValid === true
  ).length;
  return selectedLength > 0
    ? ValidationStatus.VALID
    : ValidationStatus.UNTOUCHED;
};

const getHcpFacilityName = (
  providerTypes: any,
  vacOrderSummary: VacOrderSummaryData
) => {
  const selectedType = providerTypes.filter(
    (x: any) => parseInt(x.code) === vacOrderSummary.hcp.facilityType
  )[0];
  if (selectedType) {
    return selectedType.text;
  }
  return vacOrderSummary.hcp.facilityTypeName;
};

const getInpatientFacility = (vacOrderSummary: VacOrderSummaryData) => {
  let reqFacility: IFacility;

  reqFacility = {
    accountId:
      vacOrderSummary.transitionFromFacility.facilityNumber?.toString(),
    accountName: vacOrderSummary.transitionFromFacility.name,
    facilityAddressID:
      vacOrderSummary.transitionFromFacility.facilityNumber?.toString(),
    address1: vacOrderSummary.transitionFromFacility.address.addressLine1,
    address2: vacOrderSummary.transitionFromFacility.address.addressLine2,
    state: vacOrderSummary.transitionFromFacility.address.stateCode,
    city: vacOrderSummary.transitionFromFacility.address.city,
    zip: parseInt(vacOrderSummary.transitionFromFacility.address.postalCode),
    typeName: vacOrderSummary.transitionFromFacility.facilityType,
    accountNumber: vacOrderSummary.transitionFromFacility.facilityNumber,
    addressId: "",
    typeCode: "",
    facilityMode: 0,
    siteUseId: vacOrderSummary.transitionFromFacility.transitionSiteUseID,
  };
  return reqFacility;
};

const requestorFacility = (vacOrderSummary: VacOrderSummaryData) => {
  let reqFacility: IFacility;

  reqFacility = {
    accountId: vacOrderSummary.requestor.facilityNumber?.toString(),
    accountName: vacOrderSummary.requestor.facilityName,
    facilityAddressID: vacOrderSummary.requestor.facilityNumber?.toString(),
    address1: vacOrderSummary.requestor.address.addressLine1,
    address2: vacOrderSummary.requestor.address.addressLine2,
    state: vacOrderSummary.requestor.address.stateCode,
    city: vacOrderSummary.requestor.address.city,
    zip: parseInt(vacOrderSummary.requestor.address.postalCode),
    typeName: vacOrderSummary.requestor.facilityType,
    accountNumber: parseInt(vacOrderSummary.requestor.facilityNumber),
    addressId: "",
    typeCode: "",
    facilityMode: 0,
    siteUseId: vacOrderSummary.requestor.siteUseID,
  };
  return reqFacility;
};

const primaryInsurace = (
  vacOrderSummaryInsurance: any,
  insuranceTypes: any,
  setShowAdditionalObject: any,
  type: string,
  Validator: InsuranceInformationValidator
) => {
  if (vacOrderSummaryInsurance.type) {
    let obj: IInsuranceInformation;
    let insuranceTypeName = insuranceTypes.filter(
      (x: any) => parseInt(x.code) === vacOrderSummaryInsurance.type
    )[0]?.text;

    obj = {
      ...defaultInsuranceData,
      insuranceType: {
        valid: ValidationStatus.VALID,
        value: insuranceTypeName,
        required: true,
      },
      insuranceTypeCode: {
        valid: ValidationStatus.VALID,
        value: vacOrderSummaryInsurance.type.toString(),
        required: true,
      },
    };

    if (vacOrderSummaryInsurance.type === 1) {
      obj = {
        ...obj,
        medicare: insurancePayerDetails(vacOrderSummaryInsurance, Validator),
      };
    }
    if (vacOrderSummaryInsurance.type === 5) {
      obj = {
        ...obj,
        medicareAdvantage: insurancePayerAllDetails(
          vacOrderSummaryInsurance,
          Validator
        ),
      };
    }
    if (vacOrderSummaryInsurance.type === 2) {
      obj = {
        ...obj,
        medicaid: insurancePayerDetails(vacOrderSummaryInsurance, Validator),
      };
    }
    if (vacOrderSummaryInsurance.type === 7) {
      obj = {
        ...obj,
        managedMedicaid: insurancePayerAllDetails(
          vacOrderSummaryInsurance,
          Validator
        ),
      };
    }
    if (vacOrderSummaryInsurance.type === 3) {
      obj = {
        ...obj,
        commercialInsurance: insurancePayerAllDetails(
          vacOrderSummaryInsurance,
          Validator
        ),
      };
    }
    if (vacOrderSummaryInsurance.type === 4) {
      obj = {
        ...obj,
        privatePay: {
          valid: ValidationStatus.VALID,
          value: "",
          required: false,
          isOptional: true,
        },
      };
    }
    if (vacOrderSummaryInsurance.type === 6) {
      obj = {
        ...obj,
        charityCare: {
          valid: ValidationStatus.VALID,
          value: "",
          required: false,
          isOptional: true,
        },
      };
    }
    if (vacOrderSummaryInsurance.type === 99) {
      obj = {
        ...obj,
        otherAdditionalDetails: {
          valid:
            vacOrderSummaryInsurance.additionalInfo === null
              ? ValidationStatus.UNTOUCHED
              : ValidationStatus.VALID,
          value:
            vacOrderSummaryInsurance.additionalInfo === null
              ? ""
              : vacOrderSummaryInsurance.additionalInfo,
          required: true,
          isOptional: true,
        },
      };
    }
    if (type === "primary") {
      setShowAdditionalObject((dt: ShowAdditionalFields) => ({
        typePrimary: {
          medicare: "Medicare" === insuranceTypeName ? true : false,
          medicareAdvantage:
            "Medicare Advantage" === insuranceTypeName ? true : false,
          managedMedicaid:
            "Managed Medicaid" === insuranceTypeName ? true : false,
          commercialInsurance:
            "Commercial Insurance" === insuranceTypeName ? true : false,
          medicaid: "Medicaid" === insuranceTypeName ? true : false,
          charityCare: "Charity Care" === insuranceTypeName ? true : false,
          privatePay: "Private Pay" === insuranceTypeName ? true : false,
          otherAdditionalDetails: "Other" === insuranceTypeName ? true : false,
          workerCompensation:
            "Workers' Compensation" === insuranceTypeName ? true : false,
        },
        typeSecondary: dt.typeSecondary,
      }));
    } else {
      setShowAdditionalObject((dt: ShowAdditionalFields) => ({
        typeSecondary: {
          medicare: "Medicare" === insuranceTypeName ? true : false,
          medicareAdvantage:
            "Medicare Advantage" === insuranceTypeName ? true : false,
          managedMedicaid:
            "Managed Medicaid" === insuranceTypeName ? true : false,
          commercialInsurance:
            "Commercial Insurance" === insuranceTypeName ? true : false,
          medicaid: "Medicaid" === insuranceTypeName ? true : false,
          charityCare: "Charity Care" === insuranceTypeName ? true : false,
          privatePay: "Private Pay" === insuranceTypeName ? true : false,
          otherAdditionalDetails: "Other" === insuranceTypeName ? true : false,
          workerCompensation:
            "Workers' Compensation" === insuranceTypeName ? true : false,
        },
        typePrimary: dt.typePrimary,
      }));
    }

    return obj;
  }

  return defaultInsuranceData;
};

const insurancePayerDetails = (
  vacOrderSummary: any,
  Validator: InsuranceInformationValidator
) => {
  return {
    memberID: {
      valid: ValidateInsurance(
        Validator,
        "memberID",
        vacOrderSummary.memberID === null ? "" : vacOrderSummary.memberID
      )!,
      value: vacOrderSummary.memberID,
      required: true,
      isOptional: false,
    },
    relationShipInsured: {
      valid: ValidateInsurance(
        Validator,
        "relationShipInsured",
        vacOrderSummary.relationshipToPatient === null
          ? ""
          : vacOrderSummary.relationshipToPatient
      )!,
      value: vacOrderSummary.relationshipToPatient,
      required: true,
      isOptional: false,
    },
  };
};

const insurancePayerAllDetails = (
  vacOrderSummary: any,
  Validator: InsuranceInformationValidator
) => {
  return {
    payerName: {
      valid: ValidateInsurance(
        Validator,
        "payerName",
        vacOrderSummary.name === null ? "" : vacOrderSummary.name
      )!,
      value: vacOrderSummary.name,
      required: true,
      isOptional: false,
    },
    groupID: {
      valid: ValidateInsurance(
        Validator,
        "groupID",
        vacOrderSummary.groupID === null ? "" : vacOrderSummary.groupID
      )!,
      value: vacOrderSummary.groupID,
      required: true,
      isOptional: true,
    },
    memberID: {
      valid: ValidateInsurance(
        Validator,
        "memberID",
        vacOrderSummary.memberID === null ? "" : vacOrderSummary.memberID
      )!,
      value: vacOrderSummary.memberID,
      required: true,
      isOptional: false,
    },
    relationShipInsured: {
      valid: ValidateInsurance(
        Validator,
        "relationShipInsured",
        vacOrderSummary.relationshipToPatient === null
          ? ""
          : vacOrderSummary.relationshipToPatient
      )!,
      value: vacOrderSummary.relationshipToPatient,
      required: true,
      isOptional: false,
    },
    extension: {
      valid: ValidationStatus.VALID,
      value:
        vacOrderSummary.providerContactNumberExtension === null
          ? ""
          : vacOrderSummary.providerContactNumberExtension,
      required: true,
      isOptional: false,
    },
    payerContactNumber: {
      valid:
        vacOrderSummary.providerContactNumber === null
          ? ValidationStatus.UNTOUCHED
          : ValidationStatus.VALID,
      value:
        vacOrderSummary.providerContactNumber === null
          ? ""
          : vacOrderSummary.providerContactNumber.toString(),
      required: true,
      isOptional: false,
    },
  };
};

const compareAddress = (address1: any, address2: any) => {
  var address1_json = JSON.stringify(address1);
  var address2_json = JSON.stringify(address2);
  return _.isEqual(address1_json, address2_json) ? "true" : "false";
};

export const mapClinicalInformation = (
  vacOrderSummary: VacOrderSummaryData,
  Validator = new NewOrderValidator()
) => {
  let woundDetails: INewOrderWoundInfo;
  woundDetails = {
    nutriStatusCompromized: {
      valid: Validate(
        Validator,
        "nutriStatusCompromized",
        vacOrderSummary.clinicalInformation.nutritionStatus === null
          ? ""
          : vacOrderSummary.clinicalInformation.nutritionStatus === true
          ? "Yes"
          : "No"
      )!,
      value:
        vacOrderSummary.clinicalInformation.nutritionStatus === null
          ? ""
          : vacOrderSummary.clinicalInformation.nutritionStatus === true
          ? "Yes"
          : "No",
      required: true,
    },
    nutritionActions: {
      valid: ValidateArray(
        Validator,
        "nutritionActions",
        nutriActionData.map((obj) => {
          if (
            vacOrderSummary.clinicalInformation.nutritionAction
              ?.split(",")
              .includes(obj.value)
          ) {
            return { ...obj, selected: true };
          }
          return obj;
        })
      )!,
      value: nutriActionData.map((obj) => {
        if (
          vacOrderSummary.clinicalInformation.nutritionAction
            ?.split(",")
            .includes(obj.value)
        ) {
          return { ...obj, selected: true };
        }
        return obj;
      }),
      required: vacOrderSummary.clinicalInformation.nutritionStatus,
    },
    previousTherapies: {
      valid: ValidateArrayValues(
        previousTherapy.map((obj) => {
          if (
            vacOrderSummary.clinicalInformation.previousTherapies
              ?.toString()
              .split(",")
              .includes(obj.value) ||
            vacOrderSummary.clinicalInformation.previousTherapies
              ?.toString()
              .split(",")
              .filter((e: string) => e.includes("Other"))
              .toString()
              .split(":")[0]
              .includes(obj.value)
          ) {
            return { ...obj, selected: true };
          }
          return obj;
        })
      )!,
      value: previousTherapy.map((obj) => {
        if (
          vacOrderSummary.clinicalInformation.previousTherapies
            ?.toString()
            .split(",")
            .includes(obj.value) ||
          vacOrderSummary.clinicalInformation.previousTherapies
            ?.toString()
            .split(",")
            .filter((e: string) => e.includes("Other"))
            .toString()
            .split(":")[0]
            .includes(obj.value)
        ) {
          return { ...obj, selected: true };
        }
        return obj;
      }),
      required: true,
    },
    previousTherapyOther: {
      valid: Validate(
        Validator,
        "previousTherapyOther",
        vacOrderSummary.clinicalInformation.previousTherapies
          ?.toString()
          .split(",")
          .filter((e: string) => e.includes("Other"))
          .toString()
          .split(":")[1] ?? ""
      )!,
      value:
        vacOrderSummary.clinicalInformation.previousTherapies
          ?.toString()
          .split(",")
          .filter((e: string) => e.includes("Other"))
          .toString()
          .split(":")[1] ?? "",
      required:
        vacOrderSummary.clinicalInformation.previousTherapies
          ?.toString()
          .split(",")
          .filter((e: string) => e.includes("Other")).length > 0
          ? true
          : false,
    },
    previousTherapiesCauses: {
      valid: ValidateArrayValues(
        previousTherapyCause.map((obj) => {
          if (
            vacOrderSummary.clinicalInformation.otherTherapiesConditionPrevented
              ?.toString()
              .split(",")
              .includes(obj.value) ||
            vacOrderSummary.clinicalInformation.otherTherapiesConditionPrevented
              ?.toString()
              .split(",")
              .filter((e: string) => e.includes("Other"))
              .toString()
              .split(":")[0]
              .includes(obj.value)
          ) {
            return { ...obj, selected: true };
          }
          return obj;
        })
      ),
      value: previousTherapyCause.map((obj) => {
        if (
          vacOrderSummary.clinicalInformation.otherTherapiesConditionPrevented
            ?.toString()
            .split(",")
            .includes(obj.value) ||
          vacOrderSummary.clinicalInformation.otherTherapiesConditionPrevented
            ?.toString()
            .split(",")
            .filter((e: string) => e.includes("Other"))
            .toString()
            .split(":")[0]
            .includes(obj.value)
        ) {
          return { ...obj, selected: true };
        }
        return obj;
      }),
      required: true,
    },
    previousTherapiesCausesOther: {
      valid: Validate(
        Validator,
        "previousTherapiesCausesOther",
        vacOrderSummary.clinicalInformation.otherTherapiesConditionPrevented
          ?.toString()
          .split(",")
          .filter((e: string) => e.includes("Other"))
          .toString()
          .split(":")[1] ?? ""
      )!,
      value:
        vacOrderSummary.clinicalInformation.otherTherapiesConditionPrevented
          ?.toString()
          .split(",")
          .filter((e: string) => e.includes("Other"))
          .toString()
          .split(":")[1] ?? "",
      required:
        vacOrderSummary.clinicalInformation.otherTherapiesConditionPrevented
          ?.toString()
          .split(",")
          .filter((e: string) => e.includes("Other")).length > 0
          ? true
          : false,
    },
    wndInfoComorbidities: {
      valid: ValidateArrayValues(
        comorbiditiesData.map((obj) => {
          if (
            vacOrderSummary.clinicalInformation.comorbititiesApply
              ?.toString()
              .split(",")
              .includes(obj.value) ||
            vacOrderSummary.clinicalInformation.comorbititiesApply
              ?.toString()
              .split(",")
              .filter((e: string) => e.includes("Other"))
              .toString()
              .split(":")[0]
              .includes(obj.value)
          ) {
            return { ...obj, selected: true };
          }
          return obj;
        })
      ),
      value: comorbiditiesData.map((obj) => {
        if (
          vacOrderSummary.clinicalInformation.comorbititiesApply
            ?.toString()
            .split(",")
            .includes(obj.value) ||
          vacOrderSummary.clinicalInformation.comorbititiesApply
            ?.toString()
            .split(",")
            .filter((e: string) => e.includes("Other"))
            .toString()
            .split(":")[0]
            .includes(obj.value)
        ) {
          return { ...obj, selected: true };
        }
        return obj;
      }),
      required: true,
    },
    wndInfoComorbiditiesOther: {
      valid: Validate(
        Validator,
        "wndInfoComorbiditiesOther",
        vacOrderSummary.clinicalInformation.comorbititiesApply
          ?.toString()
          .split(",")
          .filter((e: string) => e.includes("Other"))
          .toString()
          .split(":")[1] ?? ""
      )!,
      value:
        vacOrderSummary.clinicalInformation.comorbititiesApply
          ?.toString()
          .split(",")
          .filter((e: string) => e.includes("Other"))
          .toString()
          .split(":")[1] ?? "",
      required:
        vacOrderSummary.clinicalInformation.comorbititiesApply
          ?.toString()
          .split(",")
          .filter((e: string) => e.includes("Other")).length > 0
          ? true
          : false,
    },
    isOsteomyelitisPresent: mapIsOsteomyelitisPresent(
      vacOrderSummary,
      Validator
    ),
    osteomyelitisies: mapOsteomyelitisies(vacOrderSummary, Validator),
    isTreatemenForResolveBoneInfection: {
      valid: Validate(
        Validator,
        "isTreatemenForResolveBoneInfection",
        vacOrderSummary.clinicalInformation.osteomyelitisRegimenResolve === null
          ? ""
          : vacOrderSummary.clinicalInformation.osteomyelitisRegimenResolve ===
            true
          ? "Yes"
          : "No"
      )!,
      value:
        vacOrderSummary.clinicalInformation.osteomyelitisRegimenResolve === null
          ? ""
          : vacOrderSummary.clinicalInformation.osteomyelitisRegimenResolve ===
            true
          ? "Yes"
          : "No",
      required: vacOrderSummary.clinicalInformation.osteomyelitisPresent
        ? true
        : false,
    },
    debridementAttempted: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        vacOrderSummary.primaryWound.debridementAttempt === null
          ? ""
          : vacOrderSummary.primaryWound.debridementAttempt === true
          ? "Yes"
          : "No",
    },
    debridementDate: {
      valid: Validate(
        Validator,
        "debridementDate",
        vacOrderSummary.primaryWound.debridementDate
      )!,
      value:
        vacOrderSummary.primaryWound.debridementDate === null
          ? ""
          : vacOrderSummary.primaryWound.debridementDate,
      required: vacOrderSummary.primaryWound.debridementAttempt,
    },
    debridementType: {
      valid: Validate(
        Validator,
        "debridementType",
        vacOrderSummary.primaryWound.debridementType === null
          ? ""
          : vacOrderSummary.primaryWound.debridementType
      )!,
      value:
        vacOrderSummary.primaryWound.debridementType === null
          ? ""
          : vacOrderSummary.primaryWound.debridementType,
      required: vacOrderSummary.primaryWound.debridementAttempt,
    },
    serialDebridementRequired: {
      valid: Validate(
        Validator,
        "serialDebridementRequired",
        vacOrderSummary.primaryWound.debridementRequired === null
          ? ""
          : vacOrderSummary.primaryWound.debridementRequired === true
          ? "Yes"
          : "No"
      )!,
      value:
        vacOrderSummary.primaryWound.debridementRequired === null
          ? ""
          : vacOrderSummary.primaryWound.debridementRequired === true
          ? "Yes"
          : "No",
      required: true,
    },
    woundMeasurementDate: {
      valid: Validate(
        Validator,
        "woundMeasurementDate",
        vacOrderSummary.primaryWound.measurementDate === null
          ? ""
          : vacOrderSummary.primaryWound.measurementDate
      )!,
      value:
        vacOrderSummary.primaryWound.measurementDate === null
          ? ""
          : vacOrderSummary.primaryWound.measurementDate,
      required: true,
    },
    woundLength: mapWoundDimensionLength(
      vacOrderSummary.primaryWound,
      Validator
    ),
    woundWidth: mapWoundDimensionWidth(vacOrderSummary.primaryWound, Validator),
    woundDepth: mapWoundDimensionDepth(vacOrderSummary.primaryWound, Validator),
    woundThickness: {
      valid: Validate(
        Validator,
        "woundThickness",
        vacOrderSummary.primaryWound.thickness === null
          ? ""
          : vacOrderSummary.primaryWound.thickness === true
          ? "Yes"
          : "No"
      )!,
      value:
        vacOrderSummary.primaryWound.thickness === null
          ? ""
          : vacOrderSummary.primaryWound.thickness === true
          ? "Yes"
          : "No",
      required: true,
    },
    woundTunneling: {
      valid: Validate(
        Validator,
        "woundTunneling",
        vacOrderSummary.primaryWound.tunnelingPresent === null
          ? ""
          : vacOrderSummary.primaryWound.tunnelingPresent === true
          ? "Yes"
          : "No"
      )!,
      value:
        vacOrderSummary.primaryWound.tunnelingPresent === null
          ? ""
          : vacOrderSummary.primaryWound.tunnelingPresent === true
          ? "Yes"
          : "No",
      required: true,
    },
    location1Depth: mapWoundTunneling(vacOrderSummary, Validator),

    location1Position: mapWoundTunnelingLocation1(vacOrderSummary, Validator),

    location2Depth: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        vacOrderSummary.primaryWound.tunnelingSinusLocation2?.depth === null
          ? ""
          : vacOrderSummary.primaryWound.tunnelingSinusLocation2?.depth?.toString(),
    },
    location2Position: mapWoundTunnelingLocation2(vacOrderSummary, Validator),
    exudateAmount: {
      valid: Validate(
        Validator,
        "exudateAmount",
        vacOrderSummary.primaryWound.exudateAmount === null
          ? ""
          : vacOrderSummary.primaryWound.exudateAmount?.toString()
      )!,
      value:
        vacOrderSummary.primaryWound.exudateAmount === null
          ? ""
          : vacOrderSummary.primaryWound.exudateAmount?.toString(),
      required: true,
    },
    exudateAppearance: {
      valid: Validate(
        Validator,
        "exudateAppearance",
        vacOrderSummary.primaryWound.exudateAppearance === null
          ? ""
          : vacOrderSummary.primaryWound.exudateAppearance?.toString()
      )!,
      value:
        vacOrderSummary.primaryWound.exudateAppearance === null
          ? ""
          : vacOrderSummary.primaryWound.exudateAppearance?.toString(),
      required: true,
    },
    granulationValue: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        vacOrderSummary.primaryWound.brightRedTissue === null
          ? ""
          : "GRA" + vacOrderSummary.primaryWound.brightRedTissue,
    },
    epthilizationValue: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        vacOrderSummary.primaryWound.dullTissue === null
          ? ""
          : "EPH" + vacOrderSummary.primaryWound.dullTissue,
    },
    sloughValue: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        vacOrderSummary.primaryWound.whiteTissue === null
          ? ""
          : "SLO" + vacOrderSummary.primaryWound.whiteTissue,
    },
    escharValue: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        vacOrderSummary.primaryWound.blackEschar === null
          ? ""
          : "ESC" + vacOrderSummary.primaryWound.blackEschar,
    },
    woundBedTotal: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        vacOrderSummary.primaryWound.bedTotal === null
          ? "0"
          : vacOrderSummary.primaryWound.bedTotal?.toString(),
    },
    exposedStructures: {
      valid: ValidationStatus.UNTOUCHED,
      value: exposedStructuresData.map((obj) => {
        if (
          vacOrderSummary.primaryWound.muscleExposed &&
          obj.label === "Muscle"
        ) {
          return { ...obj, selected: true };
        }
        if (vacOrderSummary.primaryWound.boneExposed && obj.label === "Bone") {
          return { ...obj, selected: true };
        }
        if (
          vacOrderSummary.primaryWound.tendonExposed &&
          obj.label === "Tendon"
        ) {
          return { ...obj, selected: true };
        }
        if (
          vacOrderSummary.primaryWound.tissueExposed &&
          obj.label === "Subcutaneous Tissue"
        ) {
          return { ...obj, selected: true };
        }
        return obj;
      }),
    },
    shortNarrativeOfPossibleConsequences: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        vacOrderSummary.vacNotUsedConsequences === null
          ? ""
          : vacOrderSummary.vacNotUsedConsequences?.toString(),
    },
    woundType: {
      valid: Validate(
        Validator,
        "woundType",
        vacOrderSummary.primaryWound.type === null
          ? ""
          : vacOrderSummary.primaryWound.type?.toString()
      )!,
      value:
        vacOrderSummary.primaryWound.type === null
          ? ""
          : vacOrderSummary.primaryWound.type?.toString(),
      required: true,
    },
    woundAge: {
      valid: Validate(
        Validator,
        "woundAge",
        vacOrderSummary.primaryWound.age === null ||
          vacOrderSummary.primaryWound.age?.toString() === "0"
          ? ""
          : vacOrderSummary.primaryWound.age?.toString()
      )!,
      value:
        vacOrderSummary.primaryWound.age === null
          ? ""
          : vacOrderSummary.primaryWound.age?.toString(),
      required: true,
    },
    woundLocation: {
      valid: Validate(
        Validator,
        "woundLocation",
        vacOrderSummary.primaryWound.location === null
          ? ""
          : vacOrderSummary.primaryWound.location?.toString()
      )!,
      value:
        vacOrderSummary.primaryWound.location === null
          ? ""
          : vacOrderSummary.primaryWound.location?.toString(),
      required: true,
    },
    woundDirection: {
      valid: Validate(
        Validator,
        "woundDirection",
        vacOrderSummary.primaryWound.locationWritten === null
          ? ""
          : vacOrderSummary.primaryWound.locationWritten
              ?.toString()
              .split(",")[0]
              .toString()
      )!,
      value:
        vacOrderSummary.primaryWound.locationWritten === null
          ? ""
          : vacOrderSummary.primaryWound.locationWritten
              ?.toString()
              .split(",")[0]
              .toString(),
      required: true,
    },
    woundOrientation: {
      valid: Validate(
        Validator,
        "woundOrientation",
        vacOrderSummary.primaryWound.locationWritten === null
          ? ""
          : vacOrderSummary.primaryWound.locationWritten
              ?.toString()
              .split(",")[1]
              .toString()
      )!,
      value:
        vacOrderSummary.primaryWound.locationWritten === null
          ? ""
          : vacOrderSummary.primaryWound.locationWritten
              ?.toString()
              .split(",")[1]
              .toString(),
      required: true,
    },
    isTissuePresent: {
      valid: Validate(
        Validator,
        "isTissuePresent",
        vacOrderSummary.primaryWound.eschar === null
          ? ""
          : vacOrderSummary.primaryWound.eschar === true
          ? "Yes"
          : "No"
      )!,
      value:
        vacOrderSummary.primaryWound.eschar === null
          ? ""
          : vacOrderSummary.primaryWound.eschar === true
          ? "Yes"
          : "No",
      required: true,
    },
    //wound undermining
    woundUndermining: {
      valid: Validate(
        Validator,
        "woundUndermining",
        vacOrderSummary.primaryWound.underminingPresent === null
          ? ""
          : vacOrderSummary.primaryWound.underminingPresent === true
          ? "Yes"
          : "No"
      )!,
      value:
        vacOrderSummary.primaryWound.underminingPresent === null
          ? ""
          : vacOrderSummary.primaryWound.underminingPresent === true
          ? "Yes"
          : "No",
      required: true,
    },
    underminingLocation1Depth: mapWoundUnderminingLocationDepth(
      vacOrderSummary,
      Validator
    ),

    underminingLocation1PositionFrom: mapunderminingLocation1PositionFrom(
      vacOrderSummary,
      Validator
    ),

    underminingLocation1PositionTo: mapunderminingLocation1PositionTo(
      vacOrderSummary,
      Validator
    ),

    underminingLocation2Depth: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        vacOrderSummary.primaryWound.underminingLocation2?.depth === null
          ? ""
          : vacOrderSummary.primaryWound.underminingLocation2?.depth?.toString(),
    },
    underminingLocation2PositionFrom: mapunderminingLocation2PositionFrom(
      vacOrderSummary,
      Validator
    ),

    underminingLocation2PositionTo: mapunderminingLocation2PositionTo(
      vacOrderSummary,
      Validator
    ),

    // Secondary Wound Info
    isShowSecondaryWoundInfo: {
      valid: ValidationStatus.UNTOUCHED,
      value: vacOrderSummary.secondaryWound?.type?.length > 0 ? "Yes" : "No",
    },
  };
  return woundDetails;
};

export const mapSecondaryWoundIformation = (
  vacOrderSummary: VacOrderSummaryData,
  Validator = new NewOrderValidator()
) => {
  let secondaryWoundDetails: ISecondaryWoundInfo;
  secondaryWoundDetails = {
    shortNarrativeOfPossibleConsequences: {
      valid: ValidationStatus.UNTOUCHED,
      value: "",
    },
    debridementAttempted: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        vacOrderSummary.secondaryWound.debridementAttempt === null
          ? ""
          : vacOrderSummary.secondaryWound.debridementAttempt === true
          ? "Yes"
          : "No",
    },
    debridementDate: {
      valid: Validate(
        Validator,
        "debridementDate",
        vacOrderSummary.secondaryWound.debridementDate
      )!,
      value:
        vacOrderSummary.secondaryWound.debridementDate === null
          ? ""
          : vacOrderSummary.secondaryWound.debridementDate,
      required: vacOrderSummary.secondaryWound.debridementAttempt,
    },
    debridementType: {
      valid: Validate(
        Validator,
        "debridementType",
        vacOrderSummary.secondaryWound.debridementType === null
          ? ""
          : vacOrderSummary.secondaryWound.debridementType
      )!,
      value:
        vacOrderSummary.secondaryWound.debridementType === null
          ? ""
          : vacOrderSummary.secondaryWound.debridementType,
      required: vacOrderSummary.secondaryWound.debridementAttempt,
    },
    serialDebridementRequired: {
      valid: Validate(
        Validator,
        "serialDebridementRequired",
        vacOrderSummary.secondaryWound.debridementRequired === null
          ? ""
          : vacOrderSummary.secondaryWound.debridementRequired === true
          ? "Yes"
          : "No"
      )!,
      value:
        vacOrderSummary.secondaryWound.debridementRequired === null
          ? ""
          : vacOrderSummary.secondaryWound.debridementRequired === true
          ? "Yes"
          : "No",
      required: true,
    },
    woundMeasurementDate: {
      valid: Validate(
        Validator,
        "woundMeasurementDate",
        vacOrderSummary.secondaryWound.measurementDate === null
          ? ""
          : vacOrderSummary.secondaryWound.measurementDate
      )!,
      value:
        vacOrderSummary.secondaryWound.measurementDate === null
          ? ""
          : vacOrderSummary.secondaryWound.measurementDate,
      required: true,
    },
    woundLength: mapWoundDimensionLength(
      vacOrderSummary.secondaryWound,
      Validator
    ),
    woundWidth: mapWoundDimensionWidth(
      vacOrderSummary.secondaryWound,
      Validator
    ),

    woundDepth: mapWoundDimensionDepth(
      vacOrderSummary.secondaryWound,
      Validator
    ),

    woundThickness: {
      valid: Validate(
        Validator,
        "woundThickness",
        vacOrderSummary.secondaryWound.thickness === null
          ? ""
          : vacOrderSummary.secondaryWound.thickness === true
          ? "Yes"
          : "No"
      )!,
      value:
        vacOrderSummary.secondaryWound.thickness === null
          ? ""
          : vacOrderSummary.secondaryWound.thickness === true
          ? "Yes"
          : "No",
      required: true,
    },
    woundTunneling: {
      valid: Validate(
        Validator,
        "woundTunneling",
        vacOrderSummary.secondaryWound.tunnelingPresent === null
          ? ""
          : vacOrderSummary.secondaryWound.tunnelingPresent === true
          ? "Yes"
          : "No"
      )!,
      value:
        vacOrderSummary.secondaryWound.tunnelingPresent === null
          ? ""
          : vacOrderSummary.secondaryWound.tunnelingPresent === true
          ? "Yes"
          : "No",
      required: true,
    },
    location1Depth: mapSecondaryWoundTunneling(vacOrderSummary, Validator),

    location1Position: mapWoundTunnelingSecondaryLocation1(
      vacOrderSummary,
      Validator
    ),

    location2Depth: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        vacOrderSummary.secondaryWound.tunnelingSinusLocation2?.depth === null
          ? ""
          : vacOrderSummary.secondaryWound.tunnelingSinusLocation2?.depth?.toString(),
    },
    location2Position: mapWoundTunnelingSecondaryLocation2(
      vacOrderSummary,
      Validator
    ),

    exudateAmount: {
      valid: Validate(
        Validator,
        "exudateAmount",
        vacOrderSummary.secondaryWound.exudateAmount === null
          ? ""
          : vacOrderSummary.secondaryWound.exudateAmount?.toString()
      )!,
      value:
        vacOrderSummary.secondaryWound.exudateAmount === null
          ? ""
          : vacOrderSummary.secondaryWound.exudateAmount?.toString(),
      required: true,
    },
    exudateAppearance: {
      valid: Validate(
        Validator,
        "exudateAppearance",
        vacOrderSummary.secondaryWound.exudateAppearance === null
          ? ""
          : vacOrderSummary.secondaryWound.exudateAppearance?.toString()
      )!,
      value:
        vacOrderSummary.secondaryWound.exudateAppearance === null
          ? ""
          : vacOrderSummary.secondaryWound.exudateAppearance?.toString(),
      required: true,
    },
    granulationValue: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        vacOrderSummary.secondaryWound.brightRedTissue == null
          ? ""
          : "GRA" + vacOrderSummary.secondaryWound.brightRedTissue,
    },
    epthilizationValue: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        vacOrderSummary.secondaryWound.dullTissue == null
          ? ""
          : "EPH" + vacOrderSummary.secondaryWound.dullTissue,
    },
    sloughValue: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        vacOrderSummary.secondaryWound.whiteTissue == null
          ? ""
          : "SLO" + vacOrderSummary.secondaryWound.whiteTissue,
    },
    escharValue: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        vacOrderSummary.secondaryWound.blackEschar == null
          ? ""
          : "ESC" + vacOrderSummary.secondaryWound.blackEschar,
    },
    woundBedTotal: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        vacOrderSummary.secondaryWound.bedTotal === null
          ? "0"
          : vacOrderSummary.secondaryWound.bedTotal?.toString(),
    },
    exposedStructures: {
      valid: ValidationStatus.UNTOUCHED,
      value: exposedStructuresData.map((obj) => {
        if (
          vacOrderSummary.secondaryWound.muscleExposed &&
          obj.label === "Muscle"
        ) {
          return { ...obj, selected: true };
        }
        if (
          vacOrderSummary.secondaryWound.boneExposed &&
          obj.label === "Bone"
        ) {
          return { ...obj, selected: true };
        }
        if (
          vacOrderSummary.secondaryWound.tendonExposed &&
          obj.label === "Tendon"
        ) {
          return { ...obj, selected: true };
        }
        if (
          vacOrderSummary.secondaryWound.tissueExposed &&
          obj.label === "Subcutaneous Tissue"
        ) {
          return { ...obj, selected: true };
        }
        return obj;
      }),
    },
    woundType: {
      valid: Validate(
        Validator,
        "woundType",
        vacOrderSummary.secondaryWound.type === null
          ? ""
          : vacOrderSummary.secondaryWound.type?.toString()
      )!,
      value:
        vacOrderSummary.secondaryWound.type === null
          ? ""
          : vacOrderSummary.secondaryWound.type?.toString(),
      required: true,
    },
    woundAge: {
      valid: Validate(
        Validator,
        "woundAge",
        vacOrderSummary.secondaryWound.age === null ||
          vacOrderSummary.secondaryWound.age?.toString() === "0"
          ? ""
          : vacOrderSummary.secondaryWound.age?.toString()
      )!,
      value:
        vacOrderSummary.secondaryWound.age === null
          ? ""
          : vacOrderSummary.secondaryWound.age?.toString(),
      required: true,
    },
    woundLocation: {
      valid: Validate(
        Validator,
        "woundLocation",
        vacOrderSummary.secondaryWound.location === null
          ? ""
          : vacOrderSummary.secondaryWound.location?.toString()
      )!,
      value:
        vacOrderSummary.secondaryWound.location === null
          ? ""
          : vacOrderSummary.secondaryWound.location?.toString(),
      required: true,
    },
    woundDirection: {
      valid: Validate(
        Validator,
        "woundDirection",
        vacOrderSummary.secondaryWound.locationWritten === null
          ? ""
          : vacOrderSummary.secondaryWound.locationWritten
              ?.toString()
              .split(",")[0]
              .toString()
      )!,
      value:
        vacOrderSummary.secondaryWound.locationWritten === null
          ? ""
          : vacOrderSummary.secondaryWound.locationWritten
              ?.toString()
              .split(",")[0]
              .toString(),
      required: true,
    },
    woundOrientation: {
      valid: Validate(
        Validator,
        "woundOrientation",
        vacOrderSummary.secondaryWound.locationWritten === null
          ? ""
          : vacOrderSummary.secondaryWound.locationWritten
              ?.toString()
              .split(",")[1]
              .toString()
      )!,
      value:
        vacOrderSummary.secondaryWound.locationWritten === null
          ? ""
          : vacOrderSummary.secondaryWound.locationWritten
              ?.toString()
              .split(",")[1]
              .toString(),
      required: true,
    },
    isTissuePresent: {
      valid: Validate(
        Validator,
        "isTissuePresent",
        vacOrderSummary.secondaryWound.eschar === null
          ? ""
          : vacOrderSummary.secondaryWound.eschar === true
          ? "Yes"
          : "No"
      )!,
      value:
        vacOrderSummary.secondaryWound.eschar === null
          ? ""
          : vacOrderSummary.secondaryWound.eschar === true
          ? "Yes"
          : "No",
      required: true,
    },
    //wound undermining
    woundUndermining: {
      valid: Validate(
        Validator,
        "woundUndermining",
        vacOrderSummary.secondaryWound.underminingPresent === null
          ? ""
          : vacOrderSummary.secondaryWound.underminingPresent === true
          ? "Yes"
          : "No"
      )!,
      value:
        vacOrderSummary.secondaryWound.underminingPresent === null
          ? ""
          : vacOrderSummary.secondaryWound.underminingPresent === true
          ? "Yes"
          : "No",
      required: true,
    },
    underminingLocation1Depth: mapWoundSecondaryUndermining(
      vacOrderSummary,
      Validator
    ),

    underminingLocation1PositionFrom:
      mapunderminingSecondaryLocation1PositionFrom(vacOrderSummary, Validator),

    underminingLocation1PositionTo: mapunderminingSecondaryLocation1PositionTo(
      vacOrderSummary,
      Validator
    ),

    underminingLocation2Depth: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        vacOrderSummary.secondaryWound.underminingLocation2?.depth === null
          ? ""
          : vacOrderSummary.secondaryWound.underminingLocation2?.depth?.toString(),
    },
    underminingLocation2PositionFrom:
      mapunderminingSecondaryLocation2PositionFrom(vacOrderSummary, Validator),

    underminingLocation2PositionTo: mapunderminingSecondaryLocation2PositionTo(
      vacOrderSummary,
      Validator
    ),
  };
  return secondaryWoundDetails;
};

export const mapWoundQuestionaries = (
  wound: Wound,
  woundQuestionary: WoundQuestionaries
) => {
  let additionalQuestion: any = woundQuestionary.additionalQuestion.map(
    (element: Question) => {
      if (element.text === "Is pressure over the wound being relieved?") {
        let returnValue =
          getBlankForNullValue(wound.arterialUlcerPressureRelieved) === ""
            ? "--"
            : wound.arterialUlcerPressureRelieved === true
            ? "Yes"
            : "No";
        return {
          ...element,
          value: returnValue,
          required: true,
          valid: ValidationStatus.VALID,
        };
      }
      if (element.text === "Is the patient being turned/positioned?") {
        let returnValue =
          getBlankForNullValue(wound.stageTurnedorPositioned) === ""
            ? "--"
            : wound.stageTurnedorPositioned === true
            ? "Yes"
            : "No";
        return {
          ...element,
          value: returnValue,
          required: true,
          valid: ValidationStatus.VALID,
        };
      }
      if (
        element.text ===
        "Has a group 2 or 3 surface been used for ulcer located on the posterior trunk or pelvis?"
      ) {
        let returnValue =
          getBlankForNullValue(wound.stageUlcerLocation) === ""
            ? "--"
            : wound.stageUlcerLocation === true
            ? "Yes"
            : "No";
        return {
          ...element,
          value: returnValue,
          required: true,
          valid: ValidationStatus.VALID,
        };
      }
      if (element.text === "Are moisture and/or incontinence being managed?") {
        let returnValue =
          getBlankForNullValue(wound.stageMoistureManagement) === ""
            ? "--"
            : wound.stageMoistureManagement === true
            ? "Yes"
            : "No";
        return {
          ...element,
          value: returnValue,
          required: true,
          valid: ValidationStatus.VALID,
        };
      }
      if (element.text === "Is pressure ulcer greater than 30 days?") {
        let returnValue =
          getBlankForNullValue(wound.stageGreaterThanThirtyDays) === ""
            ? "--"
            : wound.stageGreaterThanThirtyDays === true
            ? "Yes"
            : "No";
        return {
          ...element,
          value: returnValue,
          required: true,
          valid: ValidationStatus.VALID,
        };
      }
      if (
        element.text ===
        "Has a reduction of pressure on the foot ulcer been accomplished with appropriate modalities?"
      ) {
        let returnValue =
          getBlankForNullValue(wound.diabeticUlcer) === ""
            ? "--"
            : wound.diabeticUlcer === true
            ? "Yes"
            : "No";
        return {
          ...element,
          value: returnValue,
          required: true,
          valid: ValidationStatus.VALID,
        };
      }
      if (
        element.text ===
        "Has a reduction of pressure on the foot ulcer been accomplished with appropriate modalities?"
      ) {
        let returnValue =
          getBlankForNullValue(wound.neuropathicUlcerPressureReduction) === ""
            ? "--"
            : wound.neuropathicUlcerPressureReduction === true
            ? "Yes"
            : "No";
        return {
          ...element,
          value: returnValue,
          required: true,
          valid: ValidationStatus.VALID,
        };
      }
      if (
        element.text ===
        "Are compression bandages and/or garments being consistently applied?"
      ) {
        let returnValue =
          getBlankForNullValue(wound.venousStatisUlcerBandagesApplied) === ""
            ? "--"
            : wound.venousStatisUlcerBandagesApplied === true
            ? "Yes"
            : "No";
        return {
          ...element,
          value: returnValue,
          required: true,
          valid: ValidationStatus.VALID,
        };
      }
      if (element.text === "Is elevation/ambulation being encouraged?") {
        let returnValue =
          getBlankForNullValue(wound.venousStatisElevationEncouraged) === ""
            ? "--"
            : wound.venousStatisElevationEncouraged === true
            ? "Yes"
            : "No";
        return {
          ...element,
          value: returnValue,
          required: true,
          valid: ValidationStatus.VALID,
        };
      }
      if (
        element.text ===
        "Was the wound surgically created and not represented by descriptions above?"
      ) {
        let returnValue =
          getBlankForNullValue(wound.surgicallyCreated) === ""
            ? "--"
            : wound.surgicallyCreated === true
            ? "Yes"
            : "No";
        return {
          ...element,
          value: returnValue,
          required: true,
          valid: ValidationStatus.VALID,
        };
      }
      if (
        element.text ===
        "Description of surgical procedure (At least 5 characters)"
      ) {
        let returnValue =
          getBlankForNullValue(wound.surgicalProcedure) === ""
            ? "--"
            : wound.surgicalProcedure;
        return {
          ...element,
          value: returnValue,
          required: true,
          valid: ValidationStatus.VALID,
        };
      }
      if (element.text === "Date of surgical procedure") {
        let returnValue =
          getBlankForNullValue(wound.surgicalProcedureDate) === ""
            ? "--"
            : wound.surgicalProcedureDate;
        return {
          ...element,
          value: returnValue,
          required: true,
          valid: ValidationStatus.VALID,
        };
      }
    }
  );
  let woundQuestionaries: WoundQuestionaries = {
    woundType: woundQuestionary.woundType,
    category: woundQuestionary.category,
    additionalQuestion: additionalQuestion,
  };
  return woundQuestionaries;
};

export const getBlankForNullValue = (fieldValue: any | null | undefined) => {
  if (fieldValue === undefined) return "";
  else if (fieldValue === null) return "";
  else return fieldValue.toString();
};

export const mapRequesterInfo = (
  vacOrderSummarInfo: VacOrderSummaryData,
  loggedInUserFirstName: any,
  Validator = new NewOrderValidator()
) => {
  let requestor: IRequesterInfo;
  requestor = {
    // Verify Requester Info
    IsRequesterSameasSubmitter: {
      valid: ValidationStatus.VALID,
      value:
        vacOrderSummarInfo.requestor.name === loggedInUserFirstName
          ? "yes"
          : "no",
      isDefaultValid: true,
    },
    requesterFirstName: {
      valid:
        vacOrderSummarInfo.requestor.name === loggedInUserFirstName
          ? ValidationStatus.VALID
          : Validate(
              Validator,
              "requesterFirstName",
              vacOrderSummarInfo.requestor.name
            )!,
      value: vacOrderSummarInfo.requestor.name,
    },
    requesterLastName: {
      valid:
        vacOrderSummarInfo.requestor.name === loggedInUserFirstName
          ? ValidationStatus.VALID
          : Validate(
              Validator,
              "requesterLastName",
              vacOrderSummarInfo.requestor.lastName
            )!,
      value: vacOrderSummarInfo.requestor.lastName,
    },
    requesterEmail: {
      valid:
        vacOrderSummarInfo.requestor.name === loggedInUserFirstName
          ? ValidationStatus.VALID
          : Validate(
              Validator,
              "requesterEmail",
              vacOrderSummarInfo.requestor.email
            )!,
      value: vacOrderSummarInfo.requestor.email,
    },
    requesterFacility: requestorFacility(vacOrderSummarInfo),
    requesterFacilityAsDefault: false,
  };
  return requestor;
};

export const mapProductInfo = (vacOrderSummarInfo: VacOrderSummaryData) => {
  let product: IProductInfo;
  product = {
    // Product Information
    productInformation: {
      valid: ValidationStatus.VALID,
      value: vacOrderSummarInfo.isFromReadyCare === true ? "yes" : "no",
      isDefaultValid: true,
    },
    productValue: {
      valid: ValidationStatus.VALID,
      value: vacOrderSummarInfo.vacUnit.toString(),
      isDefaultValid: true,
    },
  };
  return product;
};

export const mapDressingKit = () => {
  let dressing: IDressingKit;
  dressing = {
    //primary Vac Dressing KIT
    productId: {
      valid: ValidationStatus.UNTOUCHED,
      value: "",
      isDefaultValid: true,
    },
    productCode: {
      valid: ValidationStatus.VALID,
      value: "",
      isOptional: true,
      isDefaultValid: true,
    },
    productName: {
      valid: ValidationStatus.UNTOUCHED,
      value: "",
      isDefaultValid: true,
    },
    productSizeCode: {
      valid: ValidationStatus.VALID,
      value: "",
      isOptional: true,
      isDefaultValid: true,
    },
    productSizeName: {
      valid: ValidationStatus.UNTOUCHED,
      value: "",
      isDefaultValid: true,
    },
    productQuantity: {
      valid: ValidationStatus.VALID,
      value: "1",
      isOptional: true,
      isDefaultValid: true,
    },
    productSizeID: {
      valid: ValidationStatus.VALID,
      value: "",
      isDefaultValid: true,
    },
    //secondary Vac Dressing KIT
    secProductId: {
      valid: ValidationStatus.VALID,
      value: "",
      isDefaultValid: true,
    },
    secProductCode: {
      valid: ValidationStatus.VALID,
      value: "",
      isOptional: true,
      isDefaultValid: true,
    },
    secProductName: {
      valid: ValidationStatus.UNTOUCHED,
      value: "",
      isOptional: true,
    },
    secProductSizeCode: {
      valid: ValidationStatus.VALID,
      value: "",
      isOptional: true,
      isDefaultValid: true,
    },
    secProductSizeName: {
      valid: ValidationStatus.UNTOUCHED,
      value: "",
      isOptional: true,
    },
    secProductQuantity: {
      valid: ValidationStatus.VALID,
      value: "",
      isOptional: true,
      isDefaultValid: true,
    },
    secProductSizeID: {
      valid: ValidationStatus.VALID,
      value: "",
      isDefaultValid: true,
    },
  };
  return dressing;
};

export const mapCanister = (vacOrderSummarInfo: VacOrderSummaryData) => {
  let canister: ICanister;
  canister = {
    // Canister
    canisterProductName: {
      valid: ValidationStatus.VALID,
      value: vacOrderSummarInfo.canister.productName,
    },
    canisterProductCode: {
      valid: ValidationStatus.VALID,
      value: vacOrderSummarInfo.canister.sku,
    },
    canisterProductQuantity: {
      valid: ValidationStatus.VALID,
      value: vacOrderSummarInfo.canister.quantity.toString(),
      isOptional: true,
      isDefaultValid: true,
    },
    canisterProductID: {
      valid: ValidationStatus.VALID,
      value: vacOrderSummarInfo.canister.sku,
    },
  };
  return canister;
};

export const mapAccessory = (vacOrderSummarInfo: VacOrderSummaryData) => {
  let accessory: IProductAccessory;
  accessory = {
    // Accessory
    accessories: getAccessoriesObj(vacOrderSummarInfo.accessories),
  };
  return accessory;
};

export const mapDeliveryInformation = (
  vacOrderSummarInfo: VacOrderSummaryData,
  Validator = new NewOrderValidator()
) => {
  let delieveryInformationData: IDeliveryInformation;
  delieveryInformationData = {
    // Product Information
    // Delivery Information
    deliveryProductNeedByDate: {
      valid: ValidationStatus.UNTOUCHED,
      value: "",
    },
    deliveryProductNeedByTime: {
      valid: ValidationStatus.UNTOUCHED,
      value: "",
    },
    //Since the value is not coming exactly as while saving
    deliverySiteType: {
      valid: Validate(
        Validator,
        "deliverySiteType",
        vacOrderSummarInfo.deliverySiteType === 0
          ? ""
          : vacOrderSummarInfo.deliverySiteType?.toString()
      )!,
      value:
        vacOrderSummarInfo.deliverySiteType === 0
          ? ""
          : vacOrderSummarInfo.deliverySiteType?.toString(),
    },
    deliveryFacilityName: {
      valid: Validate(
        Validator,
        "deliveryFacilityName",
        vacOrderSummarInfo.deliverySiteType === 0
          ? ""
          : vacOrderSummarInfo.deliverySiteName
      )!,
      value: vacOrderSummarInfo.deliverySiteName,
    },
    deliveryAddressLine1: {
      valid: Validate(
        Validator,
        "deliveryAddressLine1",
        vacOrderSummarInfo.deliverySiteType === 0
          ? ""
          : vacOrderSummarInfo.deliveryAddress.addressLine1
      )!,
      value: vacOrderSummarInfo.deliveryAddress.addressLine1,
    },
    deliveryAddressLine2: {
      valid: Validate(
        Validator,
        "deliveryAddressLine2",
        vacOrderSummarInfo.deliverySiteType === 0
          ? ""
          : vacOrderSummarInfo.deliveryAddress.addressLine2
      )!,
      value: vacOrderSummarInfo.deliveryAddress.addressLine2,
      isDefaultValid: true,
    },
    deliveryCity: {
      valid: Validate(
        Validator,
        "deliveryCity",
        vacOrderSummarInfo.deliverySiteType === 0
          ? ""
          : vacOrderSummarInfo.deliveryAddress.city
      )!,
      value: vacOrderSummarInfo.deliveryAddress.city,
    },
    deliveryState: {
      valid: Validate(
        Validator,
        "deliveryState",
        vacOrderSummarInfo.deliverySiteType === 0
          ? ""
          : vacOrderSummarInfo.deliveryAddress.stateCode
      )!,
      value: vacOrderSummarInfo.deliveryAddress.stateCode,
    },
    deliveryZipCode: {
      valid: Validate(
        Validator,
        "deliveryZipCode",
        vacOrderSummarInfo.deliverySiteType === 0
          ? ""
          : vacOrderSummarInfo.deliveryAddress.postalCode
      )!,
      value: vacOrderSummarInfo.deliveryAddress.postalCode,
    },
  };
  return delieveryInformationData;
};

export const mapIsOsteomyelitisPresent = (
  vacOrderSummarInfo: VacOrderSummaryData,
  Validator: NewOrderValidator
) => {
  const value =
    vacOrderSummarInfo.clinicalInformation.osteomyelitisPresent === null
      ? ""
      : vacOrderSummarInfo.clinicalInformation.osteomyelitisPresent === true
      ? "Yes"
      : "No";
  const isValid = Validator?.validate(value, "isOsteomyelitisPresent");
  return {
    valid:
      isValid!.status === ValidationStatus.INVALID
        ? ValidationStatus.UNTOUCHED
        : isValid!.status,
    value: value,
    required: true,
  };
};

export const mapOsteomyelitisies = (
  vacOrderSummarInfo: VacOrderSummaryData,
  Validator: NewOrderValidator
) => {
  const osteomyelitisiesLocal =
    vacOrderSummarInfo.clinicalInformation.osteomyelitisTreatmentRegimen;
  const selectedOsteomyelitisies =
    osteomyelitisiesLocal && osteomyelitisiesLocal !== ""
      ? vacOrderSummarInfo.clinicalInformation.osteomyelitisTreatmentRegimen.split(
          ","
        )
      : [];
  const sortedArrayData = selectedOsteomyelitisies.map(
    (osteomyelitis: string) => {
      let output = osteomyelitis.split(":");
      return { title: output[0], value: output[1] };
    }
  );
  const finalOsteomyelitisies = osteomyelitisies.map((osteomyelitis: any) => {
    sortedArrayData.filter((dict: { title: string; value: string }) => {
      if (osteomyelitis.label === dict.title && dict.value) {
        osteomyelitis.selected = true;
        osteomyelitis.isRequiredTextBox = dict.value.length > 0;
        osteomyelitis.textBoxValue = dict.value;
        const isValid = Validator.validate(dict.value, "osteomyelitisItemText");
        osteomyelitis.isTextBoxValueValid =
          isValid!.status === ValidationStatus.INVALID
            ? ValidationStatus.UNTOUCHED
            : isValid!.status;
      }
    });
    return osteomyelitis;
  });

  const isValid =
    selectedOsteomyelitisies.length > 1
      ? finalOsteomyelitisies.some(
          (dt: any) =>
            dt.textBoxValue &&
            dt.textBoxValue !== "" &&
            dt.isTextBoxValueValid === ValidationStatus.UNTOUCHED
        )
        ? ValidationStatus.UNTOUCHED
        : ValidationStatus.VALID
      : ValidationStatus.UNTOUCHED;

  return {
    valid: isValid,
    value: finalOsteomyelitisies,
  };
};

export const mapWoundTunneling = (
  vacOrderSummarInfo: VacOrderSummaryData,
  Validator: NewOrderValidator
) => {
  const woundTunnelingLocal =
    vacOrderSummarInfo.primaryWound.tunnelingSinusLocation1.depth === null ||
    vacOrderSummarInfo.primaryWound.tunnelingSinusLocation1.depth.toString() ===
      "0"
      ? ""
      : vacOrderSummarInfo.primaryWound.tunnelingSinusLocation1.depth.toString();
  let isValid =
    woundTunnelingLocal === ""
      ? getUntouchedObj()
      : Validator.validate(woundTunnelingLocal, "location1Depth");
  return {
    valid:
      isValid!.status === ValidationStatus.INVALID
        ? ValidationStatus.UNTOUCHED
        : isValid!.status,
    value:
      vacOrderSummarInfo.primaryWound.tunnelingSinusLocation1.depth === null
        ? ""
        : vacOrderSummarInfo.primaryWound.tunnelingSinusLocation1.depth.toString(),
    required: vacOrderSummarInfo.primaryWound.tunnelingPresent ?? false,
  };
};

//secondary wound tunneling
export const mapSecondaryWoundTunneling = (
  vacOrderSummarInfo: VacOrderSummaryData,
  Validator: NewOrderValidator
) => {
  const woundTunnelingLocal =
    vacOrderSummarInfo.secondaryWound.tunnelingSinusLocation1.depth === null ||
    vacOrderSummarInfo.secondaryWound.tunnelingSinusLocation1.depth.toString() ===
      "0"
      ? ""
      : vacOrderSummarInfo.secondaryWound.tunnelingSinusLocation1.depth.toString();
  let isValid =
    woundTunnelingLocal === ""
      ? getUntouchedObj()
      : Validator.validate(woundTunnelingLocal, "location1Depth");
  return {
    valid:
      isValid!.status === ValidationStatus.INVALID
        ? ValidationStatus.UNTOUCHED
        : isValid!.status,
    value:
      vacOrderSummarInfo.secondaryWound.tunnelingSinusLocation1.depth === null
        ? ""
        : vacOrderSummarInfo.secondaryWound.tunnelingSinusLocation1.depth.toString(),
    required: vacOrderSummarInfo.secondaryWound.tunnelingPresent ?? false,
  };
};

//mapWoundSecondaryUndermining

const mapWoundSecondaryUndermining = (
  vacOrderSummarInfo: VacOrderSummaryData,
  Validator: NewOrderValidator
) => {
  const woundUnderminigLocal =
    vacOrderSummarInfo.secondaryWound.underminingLocation1?.depth === null ||
    vacOrderSummarInfo.secondaryWound.underminingLocation1?.depth.toString() ===
      "0"
      ? ""
      : vacOrderSummarInfo.secondaryWound.underminingLocation1?.depth.toString();
  let isValid =
    woundUnderminigLocal === ""
      ? getUntouchedObj()
      : Validator.validate(woundUnderminigLocal, "underminingLocation1Depth");
  return {
    valid:
      isValid!.status === ValidationStatus.INVALID
        ? ValidationStatus.UNTOUCHED
        : isValid!.status,
    value:
      vacOrderSummarInfo.secondaryWound.underminingLocation1?.depth === null
        ? ""
        : vacOrderSummarInfo.secondaryWound.underminingLocation1?.depth.toString(),
    required: vacOrderSummarInfo.secondaryWound.underminingPresent ?? false,
  };
};

const mapunderminingSecondaryLocation1PositionFrom = (
  vacOrderSummary: VacOrderSummaryData,
  Validator: NewOrderValidator
) => {
  const woundSecondaryLocal =
    vacOrderSummary.secondaryWound.underminingLocation1?.area?.length > 0
      ? vacOrderSummary.secondaryWound.underminingLocation1?.area
          ?.split(" to ")[0]
          .toString()
      : "";

  if (
    woundSecondaryLocal ===
    vacOrderSummary.secondaryWound.underminingLocation2?.area
      ?.split(" to ")[0]
      .toString()
  ) {
    return {
      valid: ValidationStatus.UNTOUCHED,
      value:
        vacOrderSummary.secondaryWound.underminingLocation1?.area?.length > 0
          ? vacOrderSummary.secondaryWound.underminingLocation1?.area
              ?.split(" to ")[0]
              .toString()
          : "",
      required: true,
    };
  }
  return {
    valid: ValidationStatus.UNTOUCHED,

    value:
      vacOrderSummary.secondaryWound.underminingLocation1?.area?.length > 0
        ? vacOrderSummary.secondaryWound.underminingLocation1?.area
            ?.split(" to ")[0]
            .toString()
        : "",
    required: true,
  };
};

const mapunderminingSecondaryLocation2PositionFrom = (
  vacOrderSummary: VacOrderSummaryData,
  Validator: NewOrderValidator
) => {
  let underminingLocation2from =
    vacOrderSummary.secondaryWound.underminingLocation2?.area?.length > 0
      ? vacOrderSummary.secondaryWound.underminingLocation2?.area
          ?.split(" to ")[0]
          .toString()
      : "";

  let isValid = Validator.validate(
    underminingLocation2from,
    "underminingLocation2PositionFrom"
  );
  if (
    underminingLocation2from ===
    vacOrderSummary.secondaryWound.underminingLocation1?.area
      ?.split(" to ")[0]
      .toString()
  ) {
    return {
      valid: ValidationStatus.UNTOUCHED,
      value:
        vacOrderSummary.secondaryWound.underminingLocation1?.area?.length > 0
          ? vacOrderSummary.secondaryWound.underminingLocation1?.area
              ?.split(" to ")[0]
              .toString()
          : "",
      required: true,
    };
  }
  return {
    valid: ValidationStatus.UNTOUCHED,

    value:
      vacOrderSummary.secondaryWound.underminingLocation2?.area?.length > 0
        ? vacOrderSummary.secondaryWound.underminingLocation2?.area
            ?.split(" to ")[0]
            .toString()
        : "",
    reuired: true,
  };
};

const mapunderminingSecondaryLocation1PositionTo = (
  vacOrderSummary: VacOrderSummaryData,
  Validator: NewOrderValidator
) => {
  let underminingLocation1To =
    vacOrderSummary.secondaryWound.underminingLocation2?.area?.length > 0
      ? vacOrderSummary.secondaryWound.underminingLocation2?.area
          ?.split(" to ")[1]
          .toString()
      : "";
  let isValid = Validator.validate(
    underminingLocation1To,
    "underminingLocation1PositionTo"
  );
  if (
    underminingLocation1To ===
    vacOrderSummary.secondaryWound.underminingLocation2?.area
      ?.split(" to ")[1]
      .toString()
  ) {
    return {
      valid: ValidationStatus.UNTOUCHED,
      value:
        vacOrderSummary.secondaryWound.underminingLocation2?.area?.length > 0
          ? vacOrderSummary.secondaryWound.underminingLocation2?.area
              ?.split(" to ")[1]
              .toString()
          : "",
      required: true,
    };
  }
  return {
    valid: ValidationStatus.UNTOUCHED,

    value:
      vacOrderSummary.secondaryWound.underminingLocation2?.area?.length > 0
        ? vacOrderSummary.secondaryWound.underminingLocation2?.area
            ?.split(" to ")[1]
            .toString()
        : "",
    required: true,
  };
};

const mapunderminingSecondaryLocation2PositionTo = (
  vacOrderSummary: VacOrderSummaryData,
  Validator: NewOrderValidator
) => {
  let underminingLocation2To =
    vacOrderSummary.secondaryWound.underminingLocation1?.area?.length > 0
      ? vacOrderSummary.secondaryWound.underminingLocation1?.area
          ?.split(" to ")[1]
          .toString()
      : "";
  let isValid = Validator.validate(
    underminingLocation2To,
    "underminingLocation2PositionTo"
  );
  if (
    underminingLocation2To ===
    vacOrderSummary.secondaryWound.underminingLocation1?.area
      ?.split(" to ")[1]
      .toString()
  ) {
    return {
      valid: ValidationStatus.UNTOUCHED,
      value:
        vacOrderSummary.secondaryWound.underminingLocation1?.area?.length > 0
          ? vacOrderSummary.secondaryWound.underminingLocation1?.area
              ?.split(" to ")[1]
              .toString()
          : "",
      required: true,
    };
  }
  return {
    valid: ValidationStatus.UNTOUCHED,

    value:
      vacOrderSummary.secondaryWound.underminingLocation1?.area?.length > 0
        ? vacOrderSummary.secondaryWound.underminingLocation1?.area
            ?.split(" to ")[1]
            .toString()
        : "",
    required: true,
  };
};

//Primary Undermining

export const mapWoundUnderminingLocationDepth = (
  vacOrderSummarInfo: VacOrderSummaryData,
  Validator: NewOrderValidator
) => {
  const woundUnderminigLocal =
    vacOrderSummarInfo.primaryWound.underminingLocation1?.depth === null ||
    vacOrderSummarInfo.primaryWound.underminingLocation1?.depth.toString() ===
      "0"
      ? ""
      : vacOrderSummarInfo.primaryWound.underminingLocation1?.depth.toString();
  let isValid =
    woundUnderminigLocal === ""
      ? getUntouchedObj()
      : Validator.validate(woundUnderminigLocal, "underminingLocation1Depth");

  return {
    valid:
      isValid!.status === ValidationStatus.INVALID
        ? ValidationStatus.UNTOUCHED
        : isValid!.status,
    value:
      vacOrderSummarInfo.primaryWound.underminingLocation1?.depth === null
        ? ""
        : vacOrderSummarInfo.primaryWound.underminingLocation1?.depth.toString(),
    required: vacOrderSummarInfo.primaryWound.underminingPresent ?? false,
  };
};

export const mapWoundDimensionLength = (
  dimension: Wound,
  Validator: NewOrderValidator
) => {
  const woundDimensionLength =
    dimension?.length === null
      ? ""
      : dimension?.length?.toString() === "0"
      ? ""
      : dimension?.length?.toString();
  let isValid =
    woundDimensionLength === ""
      ? getUntouchedObj()
      : Validator.validate(woundDimensionLength!, "woundLength");

  return {
    valid:
      isValid!.status === ValidationStatus.INVALID
        ? ValidationStatus.UNTOUCHED
        : isValid!.status,
    value: dimension?.length === null ? "" : dimension?.length.toString(),
    required: true,
  };
};

export const mapWoundDimensionWidth = (
  wound: Wound,
  Validator: NewOrderValidator
) => {
  const woundDimensionWidth =
    wound?.width === null
      ? ""
      : wound?.width?.toString() === "0"
      ? ""
      : wound?.width?.toString();
  let isValid =
    woundDimensionWidth === ""
      ? getUntouchedObj()
      : Validator.validate(woundDimensionWidth!, "woundWidth");
  return {
    valid:
      isValid!.status === ValidationStatus.INVALID
        ? ValidationStatus.UNTOUCHED
        : isValid!.status,
    value: wound?.width === null ? "" : wound?.width.toString(),
    required: true,
  };
};

export const mapWoundDimensionDepth = (
  wound: Wound,
  Validator: NewOrderValidator
) => {
  const woundDimensionDepth =
    wound?.depth === null
      ? ""
      : wound?.depth?.toString() === "0"
      ? ""
      : wound?.depth?.toString();
  let isValid =
    woundDimensionDepth === ""
      ? getUntouchedObj()
      : Validator.validate(woundDimensionDepth!, "woundDepth");
  return {
    valid:
      isValid!.status === ValidationStatus.INVALID
        ? ValidationStatus.UNTOUCHED
        : isValid!.status,
    value: wound?.depth === null ? "" : wound?.depth?.toString(),
    required: true,
  };
};

const mapunderminingLocation1PositionFrom = (
  vacOrderSummary: VacOrderSummaryData,
  Validator: NewOrderValidator
) => {
  let underminingLocation1from =
    vacOrderSummary.primaryWound.underminingLocation1?.area?.length > 0
      ? vacOrderSummary.primaryWound.underminingLocation1?.area
          ?.split(" to ")[0]
          .toString()
      : "";

  let isValid = Validator.validate(
    underminingLocation1from,
    "underminingLocation1PositionFrom"
  );
  if (
    underminingLocation1from ===
    vacOrderSummary.primaryWound.underminingLocation2?.area
      ?.split(" to ")[0]
      .toString()
  ) {
    return {
      valid: ValidationStatus.UNTOUCHED,
      value:
        vacOrderSummary.primaryWound.underminingLocation1?.area?.length > 0
          ? vacOrderSummary.primaryWound.underminingLocation1?.area
              ?.split(" to ")[0]
              .toString()
          : "",
      required: true,
    };
  }
  return {
    valid: ValidationStatus.UNTOUCHED,

    value:
      vacOrderSummary.primaryWound.underminingLocation1?.area?.length > 0
        ? vacOrderSummary.primaryWound.underminingLocation1?.area
            ?.split(" to ")[0]
            .toString()
        : "",
    reuired: true,
  };
};

const mapunderminingLocation2PositionFrom = (
  vacOrderSummary: VacOrderSummaryData,
  Validator: NewOrderValidator
) => {
  let underminingLocation2from =
    vacOrderSummary.primaryWound.underminingLocation2?.area?.length > 0
      ? vacOrderSummary.primaryWound.underminingLocation2?.area
          ?.split(" to ")[0]
          .toString()
      : "";

  let isValid = Validator.validate(
    underminingLocation2from,
    "underminingLocation2PositionFrom"
  );
  if (
    underminingLocation2from ===
    vacOrderSummary.primaryWound.underminingLocation1?.area
      ?.split(" to ")[0]
      .toString()
  ) {
    return {
      valid: ValidationStatus.UNTOUCHED,
      value:
        vacOrderSummary.primaryWound.underminingLocation1?.area?.length > 0
          ? vacOrderSummary.primaryWound.underminingLocation1?.area
              ?.split(" to ")[0]
              .toString()
          : "",
      required: true,
    };
  }
  return {
    valid: ValidationStatus.UNTOUCHED,

    value:
      vacOrderSummary.primaryWound.underminingLocation2?.area?.length > 0
        ? vacOrderSummary.primaryWound.underminingLocation2?.area
            ?.split(" to ")[0]
            .toString()
        : "",
    reuired: true,
  };
};
const mapunderminingLocation1PositionTo = (
  vacOrderSummary: VacOrderSummaryData,
  Validator: NewOrderValidator
) => {
  let underminingLocation1To =
    vacOrderSummary.primaryWound.underminingLocation1?.area?.length > 0
      ? vacOrderSummary.primaryWound.underminingLocation1?.area
          ?.split(" to ")[1]
          .toString()
      : "";
  let isValid = Validator.validate(
    underminingLocation1To,
    "underminingLocation1PositionTo"
  );
  if (
    underminingLocation1To ===
    vacOrderSummary.primaryWound.underminingLocation1?.area
      ?.split(" to ")[1]
      .toString()
  ) {
    return {
      valid: ValidationStatus.UNTOUCHED,
      value:
        vacOrderSummary.primaryWound.underminingLocation1?.area?.length > 0
          ? vacOrderSummary.primaryWound.underminingLocation1?.area
              ?.split(" to ")[1]
              .toString()
          : "",
      required: true,
    };
  }
  return {
    valid: ValidationStatus.UNTOUCHED,

    value:
      vacOrderSummary.primaryWound.underminingLocation1?.area?.length > 0
        ? vacOrderSummary.primaryWound.underminingLocation1?.area
            ?.split(" to ")[1]
            .toString()
        : "",
    required: true,
  };
};
const mapunderminingLocation2PositionTo = (
  vacOrderSummary: VacOrderSummaryData,
  Validator: NewOrderValidator
) => {
  let underminingLocation2To =
    vacOrderSummary.primaryWound.underminingLocation2?.area?.length > 0
      ? vacOrderSummary.primaryWound.underminingLocation2?.area
          ?.split(" to ")[1]
          .toString()
      : "";
  let isValid = Validator.validate(
    underminingLocation2To,
    "underminingLocation1PositionTo"
  );
  if (
    underminingLocation2To ===
    vacOrderSummary.primaryWound.underminingLocation2?.area
      ?.split(" to ")[1]
      .toString()
  ) {
    return {
      valid: ValidationStatus.UNTOUCHED,
      value:
        vacOrderSummary.primaryWound.underminingLocation2?.area?.length > 0
          ? vacOrderSummary.primaryWound.underminingLocation2?.area
              ?.split(" to ")[1]
              .toString()
          : "",
      required: true,
    };
  }
  return {
    valid: ValidationStatus.UNTOUCHED,

    value:
      vacOrderSummary.primaryWound.underminingLocation2?.area?.length > 0
        ? vacOrderSummary.primaryWound.underminingLocation2?.area
            ?.split(" to ")[0]
            .toString()
        : "",
    required: true,
  };
};

//Wound tunneling

const mapWoundTunnelingLocation1 = (
  vacOrderSummary: VacOrderSummaryData,
  Validator: NewOrderValidator
) => {
  let tunnelingLocation1 =
    vacOrderSummary.primaryWound.tunnelingSinusLocation1?.area?.length > 0
      ? vacOrderSummary.primaryWound.tunnelingSinusLocation1?.area
          ?.split(" to ")[0]
          .toString()
      : "";

  if (
    tunnelingLocation1 ===
    vacOrderSummary.primaryWound.tunnelingSinusLocation2?.area
      ?.split(" to ")[0]
      .toString()
  ) {
    return {
      valid: ValidationStatus.UNTOUCHED,
      value:
        vacOrderSummary.primaryWound.tunnelingSinusLocation1?.area?.length > 0
          ? vacOrderSummary.primaryWound.tunnelingSinusLocation1?.area
              ?.split(" to ")[0]
              .toString()
          : "",
      required: true,
    };
  }
  return {
    valid: ValidationStatus.UNTOUCHED,

    value:
      vacOrderSummary.primaryWound.tunnelingSinusLocation1?.area?.length > 0
        ? vacOrderSummary.primaryWound.tunnelingSinusLocation1?.area
            ?.split(" to ")[0]
            .toString()
        : "",
    required: true,
  };
};

const mapWoundTunnelingLocation2 = (
  vacOrderSummary: VacOrderSummaryData,
  Validator: NewOrderValidator
) => {
  let tunnelingLocation2 =
    vacOrderSummary.primaryWound.tunnelingSinusLocation2?.area?.length > 0
      ? vacOrderSummary.primaryWound.tunnelingSinusLocation2?.area
          ?.split(" to ")[0]
          .toString()
      : "";

  if (
    tunnelingLocation2 ===
    vacOrderSummary.primaryWound.tunnelingSinusLocation1?.area
      ?.split(" to ")[0]
      .toString()
  ) {
    return {
      valid: ValidationStatus.UNTOUCHED,
      value:
        vacOrderSummary.primaryWound.tunnelingSinusLocation2?.area?.length > 0
          ? vacOrderSummary.primaryWound.tunnelingSinusLocation2?.area
              ?.split(" to ")[0]
              .toString()
          : "",
      required: true,
    };
  }
  return {
    valid: ValidationStatus.UNTOUCHED,

    value:
      vacOrderSummary.primaryWound.tunnelingSinusLocation2?.area?.length > 0
        ? vacOrderSummary.primaryWound.tunnelingSinusLocation2?.area
            ?.split(" to ")[0]
            .toString()
        : "",
    required: true,
  };
};
const mapWoundTunnelingSecondaryLocation1 = (
  vacOrderSummary: VacOrderSummaryData,
  Validator: NewOrderValidator
) => {
  let tunnelingLocation1 =
    vacOrderSummary.secondaryWound.tunnelingSinusLocation1?.area?.length > 0
      ? vacOrderSummary.secondaryWound.tunnelingSinusLocation1?.area
          ?.split(" to ")[0]
          .toString()
      : "";

  if (
    tunnelingLocation1 ===
    vacOrderSummary.secondaryWound.tunnelingSinusLocation2?.area
      ?.split(" to ")[0]
      .toString()
  ) {
    return {
      valid: ValidationStatus.UNTOUCHED,
      value:
        vacOrderSummary.secondaryWound.tunnelingSinusLocation1?.area?.length > 0
          ? vacOrderSummary.secondaryWound.tunnelingSinusLocation1?.area
              ?.split(" to ")[0]
              .toString()
          : "",
      required: true,
    };
  }
  return {
    valid: ValidationStatus.UNTOUCHED,

    value:
      vacOrderSummary.secondaryWound.tunnelingSinusLocation1?.area?.length > 0
        ? vacOrderSummary.secondaryWound.tunnelingSinusLocation1?.area
            ?.split(" to ")[0]
            .toString()
        : "",
    required: true,
  };
};
const mapWoundTunnelingSecondaryLocation2 = (
  vacOrderSummary: VacOrderSummaryData,
  Validator: NewOrderValidator
) => {
  let tunnelingLocation2 =
    vacOrderSummary.secondaryWound.tunnelingSinusLocation2?.area?.length > 0
      ? vacOrderSummary.secondaryWound.tunnelingSinusLocation2?.area
          ?.split(" to ")[0]
          .toString()
      : "";

  if (
    tunnelingLocation2 ===
    vacOrderSummary.secondaryWound.tunnelingSinusLocation1?.area
      ?.split(" to ")[0]
      .toString()
  ) {
    return {
      valid: ValidationStatus.UNTOUCHED,
      value:
        vacOrderSummary.secondaryWound.tunnelingSinusLocation2?.area?.length > 0
          ? vacOrderSummary.secondaryWound.tunnelingSinusLocation2?.area
              ?.split(" to ")[0]
              .toString()
          : "",
      required: true,
    };
  }
  return {
    valid: ValidationStatus.UNTOUCHED,

    value:
      vacOrderSummary.secondaryWound.tunnelingSinusLocation2?.area?.length > 0
        ? vacOrderSummary.secondaryWound.tunnelingSinusLocation2?.area
            ?.split(" to ")[0]
            .toString()
        : "",
    required: true,
  };
};
