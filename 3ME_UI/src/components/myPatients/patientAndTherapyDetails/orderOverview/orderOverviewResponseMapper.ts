import moment from "moment";
import _ from "underscore";
import { ValidationStatus } from "../../../../core/interfaces/input.interface";
import {
  makeCapitalEachOfWordInString,
  makeCapitalEachWordInString,
} from "../../../../util/utilityFunctions";
import { IFacility } from "../../../manageProfile/facilityInformation/facility.interface";
import {
  Question,
  WoundQuestionaries,
} from "../../../newOrder/clinicalInformation/clinicalInfo.interface";
import { ISecondaryWoundInfo } from "../../../newOrder/clinicalInformation/secondaryWoundInfo/secondaryWoundInfo.interface";
import { comorbiditiesData } from "../../../newOrder/comorbodities/comorbodities.data";
import { ProductInformation } from "../../../newOrder/dressingSupplies/vacDressingKit/vacDressingKit.interface";
import { exposedStructuresData } from "../../../newOrder/exposedStructures/exposedStructures.data";
import { IInsuranceInformation } from "../../../newOrder/insuranceInformation/insuranceInformation/insuranceInformation.interface";
import {
  ShowAdditionalFields,
  defaultInsuranceData,
} from "../../../newOrder/insuranceInformation/insuranceInformation/insuranceInformation.model";
import { InsuranceInformationValidator } from "../../../newOrder/insuranceInformation/insuranceInformation/insuranceInformation.validator";
import {
  VacOrderSummaryData,
  Wound,
} from "../../../newOrder/mapper/VacOrderSummary/newOrderResponseMapper.interface";
import { getSelectedVacProduct } from "../../../newOrder/mapper/VacOrderSummary/vacProductsMapper";
import {
  ICanister,
  IDeliveryInformation,
  IDressingKit,
  INewOrder,
  IProductAccessory,
  IRequesterInfo,
} from "../../../newOrder/newOrder.interface";
import { NewOrderValidator } from "../../../newOrder/newOrder.validator";
import {
  INewOrderWoundInfo,
  MultipleActionsProps,
} from "../../../newOrder/newOrderWoundInfoStepper/newOrderWoundInfo.interface";
import { nutriActionData } from "../../../newOrder/nutrition/nutritionAction.data";
import {
  osteomyelitisies,
  previousTherapy,
  previousTherapyCause,
} from "../../../newOrder/previousTherapies/previousTherapiesData";
import { IOrderOverviewProductInfo } from "../orderSummary/orderDetailsProductInformation/orderDetailsProductInformation.interface";
import {
  IFinancialInsurenceResponse,
  IFinancialResponse,
  IInsurenceDetail,
} from "../orderSupplyDetail/orderSupplyDetails.interface";
import { IWoundAssesments } from "./orderOverview.interface";
import { IAddWoundAssessment } from "../woundProgress/addWoundAssessment/addWoundAssessment.interface";
import { woundAssessComorboditiesData } from "../woundProgress/addWoundAssessment/woundAssessComorbidities/woundAssessComorbodities.data";

export const mapVacOrderOverviewResponse = async (
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
      valid: ValidationStatus.VALID,
      value: getBlankForNullValue(
        vacOrderSummarInfo.permanentAddress?.addressLine1
      ),
    },
    address2: {
      valid: ValidationStatus.VALID,
      value: getBlankForNullValue(
        vacOrderSummarInfo.permanentAddress?.addressLine2
      ),
    },
    city: {
      valid: ValidationStatus.VALID,
      value: getBlankForNullValue(vacOrderSummarInfo?.permanentAddress?.city),
    },
    dob: {
      valid: ValidationStatus.VALID,
      value: getBlankForNullValue(
        vacOrderSummarInfo.customerDOB.replace(/'/g, "")
      ),
    },
    email: {
      valid: ValidationStatus.VALID,
      value: getBlankForNullValue(vacOrderSummarInfo.customerEmailAddress),
    },
    firstName: {
      valid: ValidationStatus.VALID,
      value: makeCapitalEachOfWordInString(
        getBlankForNullValue(vacOrderSummarInfo.customerFirstName)
      ),
    },
    lastName: {
      valid: ValidationStatus.VALID,
      value: makeCapitalEachOfWordInString(
        getBlankForNullValue(
          makeCapitalEachOfWordInString(vacOrderSummarInfo.customerLastName)
        )
      ),
    },
    phone: {
      valid: ValidationStatus.VALID,
      value: getBlankForNullValue(vacOrderSummarInfo.customerPhoneNo),
    },
    state: {
      valid: ValidationStatus.VALID,
      value: getBlankForNullValue(
        vacOrderSummarInfo.permanentAddress?.stateCode
      ),
    },
    zip: {
      valid: ValidationStatus.VALID,
      value: getBlankForNullValue(
        vacOrderSummarInfo.permanentAddress?.postalCode
      ),
    },

    // Emergency Contact Info
    emergencyContactFirstName: {
      valid: ValidationStatus.VALID,
      value: getBlankForNullValue(vacOrderSummarInfo.emergencyContactFirstName),
    },
    emergencyContactLastName: {
      valid: ValidationStatus.VALID,
      value: getBlankForNullValue(vacOrderSummarInfo.emergencyContactLastName),
    },
    emergencyContactPhoneNumber: {
      valid: ValidationStatus.VALID,
      value: getBlankForNullValue(
        vacOrderSummarInfo.emergencyContactPhoneNumber
      ),
    },
    // Contributing Cause
    contributingCause: {
      value:
        getBlankForNullValue(vacOrderSummarInfo.contributingCause) === ""
          ? ""
          : vacOrderSummarInfo.contributingCause === true
          ? "yes"
          : "no",
      valid: ValidationStatus.UNTOUCHED,
    },
    dateOfAccident: {
      valid: ValidationStatus.VALID,
      value: getBlankForNullValue(
        vacOrderSummarInfo.clinicalInformation.contributingCauseAccidentDate
      ),
    },
    accidentType: {
      valid: ValidationStatus.VALID,
      value: getBlankForNullValue(
        vacOrderSummarInfo.clinicalInformation.contributingCauseAccidentType
      ),
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
      value: getBlankForNullValue(vacOrderSummarInfo.hcp?.facilityName),
    },
    addedCaregiverAddress1: {
      valid: ValidationStatus.VALID,
      value: getBlankForNullValue(
        vacOrderSummarInfo.hcp?.address?.addressLine1
      ),
    },
    addedCaregiverAddress2: {
      valid: ValidationStatus.VALID,
      value: getBlankForNullValue(
        vacOrderSummarInfo.hcp?.address?.addressLine2
      ),
    },
    addedCaregiverCity: {
      valid: ValidationStatus.VALID,
      value: getBlankForNullValue(vacOrderSummarInfo.hcp?.address?.city),
    },
    addedCaregiverState: {
      valid: ValidationStatus.VALID,
      value: getBlankForNullValue(vacOrderSummarInfo.hcp?.address?.stateCode),
    },
    addedCaregiverPhone: {
      valid: ValidationStatus.VALID,
      value: getBlankForNullValue(vacOrderSummarInfo.hcp?.phoneNo),
    },
    addedCaregiverZip: {
      valid: ValidationStatus.VALID,
      value: getBlankForNullValue(vacOrderSummarInfo.hcp?.address?.postalCode),
    },
    addedCaregiverFacilityType: {
      valid: ValidationStatus.VALID,
      value: getBlankForNullValue(vacOrderSummarInfo.hcp?.facilityTypeName),
    },

    // Submit a valid prescription
    submitPrescription: {
      valid: ValidationStatus.VALID,
      value:
        getBlankForNullValue(vacOrderSummarInfo.prescriptionMethod) === ""
          ? "EPrescription"
          : vacOrderSummarInfo.prescriptionMethod.toString(),
    },
    prescriptionDoc: [],

    deliveryContactFirstName: {
      valid: ValidationStatus.VALID,
      value:
        getBlankForNullValue(vacOrderSummarInfo.deliveryFirstName) === ""
          ? ""
          : makeCapitalEachWordInString(vacOrderSummarInfo.deliveryFirstName),
    },
    deliveryContactLastName: {
      valid: ValidationStatus.VALID,
      value:
        getBlankForNullValue(vacOrderSummarInfo.deliveryLastName) === ""
          ? ""
          : makeCapitalEachWordInString(vacOrderSummarInfo.deliveryLastName),
    },
    deliveryContactPhone: {
      valid: ValidationStatus.VALID,
      value: getBlankForNullValue(vacOrderSummarInfo.deliveryPhoneNumber),
    },
    deliveryInstructions: {
      valid: ValidationStatus.VALID,
      value: getBlankForNullValue(vacOrderSummarInfo.deliveryInstructions),
    },

    // Therapy Information
    lengthOfTherapy: {
      valid: ValidationStatus.VALID,
      value: getBlankForNullValue(vacOrderSummarInfo.therapyDuration),
    },
    goalOfTherapy: {
      valid: ValidationStatus.VALID,
      value: getBlankForNullValue(vacOrderSummarInfo.therapyGoal),
    },

    // Inpatient Transition
    wasNPWTInitiated: {
      valid: ValidationStatus.VALID,
      value:
        vacOrderSummarInfo.isTransition === null
          ? "--"
          : vacOrderSummarInfo.isTransition === true
          ? "yes"
          : "no",
    },
    dateInitiated: {
      valid: ValidationStatus.VALID,
      value:
        vacOrderSummarInfo.transitionFromFacility === null
          ? "--"
          : vacOrderSummarInfo.transitionFromFacility
              .transitionInitaiatedDate === null
          ? "--"
          : vacOrderSummarInfo.transitionFromFacility.transitionInitaiatedDate,
    },

    inpatientFacility: getInpatientFacility(vacOrderSummarInfo),
    inpatientFacilityAsDefault: false,

    // Print Common Docs
    commonDocs: {
      valid: ValidationStatus.VALID,
      value: "",
    },

    uploadDocument: [],

    // Patient Current Address
    IsSamePermanentAddress: {
      valid: ValidationStatus.VALID,
      value: compareAddress(
        vacOrderSummarInfo.permanentAddress,
        vacOrderSummarInfo.currentAddress
      ),
    },
    patientCurrentAddressPhone: {
      valid: ValidationStatus.VALID,
      value: getBlankForNullValue(vacOrderSummarInfo.currentPhoneNumber),
    },
    patientCurrentAddress1: {
      valid: ValidationStatus.VALID,
      value: getBlankForNullValue(
        makeCapitalEachWordInString(
          vacOrderSummarInfo.currentAddress?.addressLine1
        )
      ),
    },
    patientCurrentAddress2: {
      valid: ValidationStatus.VALID,
      value: getBlankForNullValue(
        vacOrderSummarInfo.currentAddress?.addressLine2
      ),
    },
    patientCurrentAddressState: {
      valid: ValidationStatus.VALID,
      value: getBlankForNullValue(vacOrderSummarInfo.currentAddress?.stateCode),
    },
    patientCurrentAddressCity: {
      valid: ValidationStatus.VALID,
      value: getBlankForNullValue(vacOrderSummarInfo.currentAddress?.city),
    },
    patientCurrentAddressZip: {
      valid: ValidationStatus.VALID,
      value: getBlankForNullValue(
        vacOrderSummarInfo.currentAddress?.postalCode
      ),
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
      value: getBlankForNullValue(vacOrderSummarInfo.prescriberEmailAddress),
    },

    loggedInUserSiteUseID: {
      valid: ValidationStatus.VALID,
      value: "",
      isOptional: true,
    },

    addedCaregiverPhoneExtension: {
      valid: ValidationStatus.VALID,
      value: getBlankForNullValue(vacOrderSummarInfo.hcp?.extension),
    },
    addedCaregiverFacilityTypeCode: {
      valid: ValidationStatus.VALID,
      value: getBlankForNullValue(vacOrderSummarInfo.hcp?.facilityType),
    },
    addedCaregiverSiteUseID: {
      valid: ValidationStatus.VALID,
      value: getBlankForNullValue(vacOrderSummarInfo.hcp?.hcpSiteUseID),
    },
    addedCaregiverID: {
      valid: ValidationStatus.VALID,
      value: getBlankForNullValue(vacOrderSummarInfo.hcp?.caregiverID),
    },
    addedCaregiverAccountNumber: {
      valid: ValidationStatus.VALID,
      value: getBlankForNullValue(vacOrderSummarInfo.hcp?.accountNumber),
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
  if (getBlankForNullValue(vacOrderSummary.secondaryInsurance?.name) !== "") {
    return true;
  }
  return false;
};

const getAccessoriesObj = (value: any) => {
  if (value) {
    return value.map((element: any) => {
      return {
        id: getBlankForNullValue(element.sku),
        code: getBlankForNullValue(element.sku),
        value: getBlankForNullValue(element.productName),
      };
    });
  }
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
      vacOrderSummary.transitionFromFacility === null
        ? "--"
        : vacOrderSummary.transitionFromFacility.facilityNumber === null
        ? "--"
        : vacOrderSummary.transitionFromFacility.facilityNumber.toString(),
    accountName:
      vacOrderSummary.transitionFromFacility === null
        ? "--"
        : vacOrderSummary.transitionFromFacility.name === null
        ? "--"
        : vacOrderSummary.transitionFromFacility.name,
    facilityAddressID:
      vacOrderSummary.transitionFromFacility === null
        ? "--"
        : vacOrderSummary.transitionFromFacility.facilityNumber === null
        ? "--"
        : vacOrderSummary.transitionFromFacility.facilityNumber.toString(),
    address1:
      vacOrderSummary.transitionFromFacility === null
        ? "--"
        : vacOrderSummary.transitionFromFacility.address === null
        ? "--"
        : vacOrderSummary.transitionFromFacility.address.addressLine1 === null
        ? "--"
        : vacOrderSummary.transitionFromFacility?.address?.addressLine1,
    address2:
      vacOrderSummary.transitionFromFacility === null
        ? "--"
        : vacOrderSummary.transitionFromFacility.address === null
        ? "--"
        : vacOrderSummary.transitionFromFacility.address?.addressLine2 === null
        ? "--"
        : vacOrderSummary.transitionFromFacility?.address?.addressLine2,
    state:
      vacOrderSummary.transitionFromFacility === null
        ? "--"
        : vacOrderSummary.transitionFromFacility.address === null
        ? "--"
        : vacOrderSummary.transitionFromFacility.address?.stateCode === null
        ? "--"
        : vacOrderSummary.transitionFromFacility.address.stateCode,
    city:
      vacOrderSummary.transitionFromFacility === null
        ? "--"
        : vacOrderSummary.transitionFromFacility.address === null
        ? "--"
        : vacOrderSummary.transitionFromFacility.address.city === null
        ? "--"
        : vacOrderSummary.transitionFromFacility.address.city,
    zip:
      vacOrderSummary.transitionFromFacility === null
        ? 0
        : vacOrderSummary.transitionFromFacility.address === null
        ? 0
        : parseInt(vacOrderSummary.transitionFromFacility.address.postalCode) ??
          0,
    typeName:
      vacOrderSummary.transitionFromFacility === null
        ? "--"
        : vacOrderSummary.transitionFromFacility.facilityType === null
        ? "--"
        : vacOrderSummary.transitionFromFacility.facilityType.toString(),
    accountNumber:
      vacOrderSummary.transitionFromFacility === null
        ? 0
        : vacOrderSummary.transitionFromFacility.facilityNumber === null
        ? 0
        : vacOrderSummary.transitionFromFacility?.facilityNumber,
    addressId: "",
    typeCode: "",
    facilityMode: 0,
    siteUseId:
      vacOrderSummary.transitionFromFacility === null
        ? "--"
        : vacOrderSummary.transitionFromFacility.transitionSiteUseID === null
        ? "--"
        : vacOrderSummary.transitionFromFacility.transitionSiteUseID,
  };
  return reqFacility;
};

const requestorFacility = (vacOrderSummary: VacOrderSummaryData) => {
  let reqFacility: IFacility;

  reqFacility = {
    accountId: getBlankForNullValue(vacOrderSummary.requestor?.facilityNumber),
    accountName: getBlankForNullValue(vacOrderSummary.requestor?.facilityName),
    facilityAddressID: getBlankForNullValue(
      vacOrderSummary.requestor?.facilityNumber
    ),
    address1: getBlankForNullValue(
      vacOrderSummary.requestor?.address?.addressLine1
    ),
    address2: getBlankForNullValue(
      vacOrderSummary.requestor?.address?.addressLine2
    ),
    state: getBlankForNullValue(vacOrderSummary.requestor?.address?.stateCode),
    city: getBlankForNullValue(vacOrderSummary.requestor?.address?.city),
    zip:
      getBlankForNullValue(vacOrderSummary.requestor?.address?.postalCode) !==
      ""
        ? parseInt(vacOrderSummary.requestor?.address?.postalCode)
        : 0,
    typeName: getBlankForNullValue(vacOrderSummary.requestor.facilityType),
    accountNumber:
      getBlankForNullValue(vacOrderSummary.requestor.facilityNumber) !== ""
        ? parseInt(vacOrderSummary.requestor.facilityNumber)
        : 0,
    addressId: "",
    typeCode: "",
    facilityMode: 0,
    siteUseId: getBlankForNullValue(vacOrderSummary.requestor.siteUseID),
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
  let insuranceTypeName = getBlankForNullValue(vacOrderSummaryInsurance.name);
  if (vacOrderSummaryInsurance.name) {
    let obj: IInsuranceInformation;

    obj = {
      ...defaultInsuranceData,
      insuranceType: {
        valid: ValidationStatus.VALID,
        value: getBlankForNullValue(vacOrderSummaryInsurance.name),
        required: true,
      },
      insuranceTypeCode: {
        valid: ValidationStatus.VALID,
        value: getBlankForNullValue(vacOrderSummaryInsurance.type),
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
    } else {
      obj = {
        ...obj,
        orderPayerDetails: insurancePayerAllDetails(
          vacOrderSummaryInsurance,
          Validator
        ),
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
          orderPayerDetails: true,
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
          orderPayerDetails: true,
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
      valid: ValidationStatus.VALID,
      value: getBlankForNullValue(vacOrderSummary.memberID),
    },
    relationShipInsured: {
      valid: ValidationStatus.VALID,
      value: getBlankForNullValue(vacOrderSummary.relationshipToPatient),
    },
  };
};

const insurancePayerAllDetails = (
  vacOrderSummary: any,
  Validator: InsuranceInformationValidator
) => {
  return {
    payerName: {
      valid: ValidationStatus.VALID,
      value: getBlankForNullValue(vacOrderSummary.name),
    },
    groupID: {
      valid: ValidationStatus.VALID,
      value: getBlankForNullValue(vacOrderSummary.groupID),
    },
    memberID: {
      valid: ValidationStatus.VALID,
      value: getBlankForNullValue(vacOrderSummary.memberID),
    },
    relationShipInsured: {
      valid: ValidationStatus.VALID,
      value: getBlankForNullValue(vacOrderSummary.relationshipToPatient),
    },
    extension: {
      valid: ValidationStatus.VALID,
      value: getBlankForNullValue(
        vacOrderSummary.providerContactNumberExtension
      ),
    },
    payerContactNumber: {
      valid: ValidationStatus.VALID,
      value: getBlankForNullValue(vacOrderSummary.providerContactNumber),
    },
  };
};

const compareAddress = (address1: any, address2: any) => {
  var address1_json = JSON.stringify(address1);
  var address2_json = JSON.stringify(address2);
  return _.isEqual(address1_json, address2_json) ? "true" : "false";
};

export const mapClinicalInformationData = (
  vacOrderSummary: VacOrderSummaryData
) => {
  let woundDetails: INewOrderWoundInfo;
  let locationWritten = vacOrderSummary.primaryWound?.locationWritten;
  let woundDirectionStr = "--";
  let woundOrientationStr = "--";
  if (locationWritten) {
    const array = vacOrderSummary.primaryWound?.locationWritten
      ?.toString()
      .split(",");
    if (array.count === 2) {
      woundOrientationStr = array[1].toString();
    } else if (array.count > 0) {
      woundDirectionStr = array[0].toString();
    }
  }
  woundDetails = {
    nutriStatusCompromized: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(
          vacOrderSummary.clinicalInformation.nutritionStatus
        ) === ""
          ? "--"
          : vacOrderSummary.clinicalInformation.nutritionStatus === true
          ? "Yes"
          : "No",
    },
    nutritionActions: {
      valid: ValidationStatus.UNTOUCHED,
      value: nutriActionData.map((obj) => {
        if (
          vacOrderSummary.clinicalInformation.nutritionAction &&
          (vacOrderSummary.clinicalInformation.nutritionAction
            ?.toString()
            .split(",")
            .includes(obj.value.toUpperCase()) ||
            vacOrderSummary.clinicalInformation.nutritionAction
              .split(",")
              .includes(obj.value))
        ) {
          return { ...obj, selected: true };
        }
        return obj;
      }),
    },

    previousTherapies: {
      valid: ValidationStatus.UNTOUCHED,
      value: previousTherapy.map((obj) => {
        if (
          vacOrderSummary.clinicalInformation.previousTherapies &&
          (vacOrderSummary.clinicalInformation.previousTherapies
            ?.toString()
            .split(",")
            .includes(obj.value.toUpperCase()) ||
            vacOrderSummary.clinicalInformation.previousTherapies
              ?.toString()
              .split(",")
              .filter((e: string) => e.includes("Other"))
              .toString()
              .split(":")[0]
              .includes(obj.value))
        ) {
          return { ...obj, selected: true };
        }
        return { obj };
      }),
    },
    previousTherapyOther: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(
          vacOrderSummary.clinicalInformation.previousTherapies
        ) === ""
          ? ""
          : vacOrderSummary.clinicalInformation.previousTherapies
              ?.toString()
              .split(",")
              .filter((e: string) => e.includes("Other"))
              .toString()
              .split(":")[1] ?? "",
    },
    previousTherapiesCauses: {
      valid: ValidationStatus.UNTOUCHED,
      value: previousTherapyCause.map((obj) => {
        if (
          vacOrderSummary.clinicalInformation
            .otherTherapiesConditionPrevented &&
          (vacOrderSummary.clinicalInformation?.otherTherapiesConditionPrevented
            ?.toString()
            .split(",")
            .includes(obj.value.toUpperCase()) ||
            vacOrderSummary.clinicalInformation?.otherTherapiesConditionPrevented
              ?.toString()
              .split(",")
              .filter((e: string) => e.includes("Other"))
              .toString()
              .split(":")[0]
              .includes(obj.value))
        ) {
          return { ...obj, selected: true };
        }
        return obj;
      }),
    },
    previousTherapiesCausesOther: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(
          vacOrderSummary.clinicalInformation.otherTherapiesConditionPrevented
        ) === ""
          ? "--"
          : vacOrderSummary.clinicalInformation.otherTherapiesConditionPrevented
              ?.toString()
              .split(",")
              .filter((e: string) => e.includes("Other"))
              .toString()
              .split(":")[1] ?? "--",
    },
    wndInfoComorbidities: {
      valid: ValidationStatus.UNTOUCHED,
      value: comorbiditiesData.map((obj) => {
        if (
          vacOrderSummary.clinicalInformation.comorbititiesApply &&
          (vacOrderSummary.clinicalInformation.comorbititiesApply
            ?.toString()
            .split(",")
            .includes(obj.value.toUpperCase()) ||
            vacOrderSummary.clinicalInformation.comorbititiesApply
              ?.toString()
              .split(",")
              .filter((e: string) => e.includes("Other"))
              .toString()
              .split(":")[0]
              .includes(obj.value))
        ) {
          return { ...obj, selected: true };
        }
        return obj;
      }),
    },
    wndInfoComorbiditiesOther: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(
          vacOrderSummary.clinicalInformation.comorbititiesApply
        ) === ""
          ? "--"
          : vacOrderSummary.clinicalInformation.comorbititiesApply
              ?.toString()
              .split(",")
              .filter((e: string) => e.includes("Other"))
              .toString()
              .split(":")[1] ?? "--",
    },
    isOsteomyelitisPresent: mapIsOsteomyelitisPresent(vacOrderSummary),
    osteomyelitisies: mapOsteomyelitisies(vacOrderSummary),
    isTreatemenForResolveBoneInfection: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(
          vacOrderSummary.clinicalInformation.osteomyelitisRegimenResolve
        ) === ""
          ? "--"
          : vacOrderSummary.clinicalInformation.osteomyelitisRegimenResolve ===
            true
          ? "Yes"
          : "No",
    },
    debridementAttempted: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(vacOrderSummary.primaryWound) === ""
          ? "--"
          : getBlankForNullValue(
              vacOrderSummary.primaryWound?.debridementAttempt
            ) === ""
          ? "--"
          : vacOrderSummary.primaryWound?.debridementAttempt === true
          ? "Yes"
          : "No",
    },
    debridementDate: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(vacOrderSummary.primaryWound) === ""
          ? "--"
          : getBlankForNullValue(
              vacOrderSummary.primaryWound?.debridementDate
            ) === ""
          ? "--"
          : vacOrderSummary.primaryWound?.debridementDate,
    },
    debridementType: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(vacOrderSummary.primaryWound) === ""
          ? "--"
          : getBlankForNullValue(
              vacOrderSummary.primaryWound?.debridementType
            ) === ""
          ? "--"
          : vacOrderSummary.primaryWound?.debridementType,
    },
    serialDebridementRequired: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(vacOrderSummary.primaryWound) === ""
          ? "--"
          : getBlankForNullValue(
              vacOrderSummary.primaryWound?.debridementRequired
            ) === ""
          ? "--"
          : vacOrderSummary.primaryWound?.debridementRequired === true
          ? "Yes"
          : "No",
    },
    woundMeasurementDate: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(vacOrderSummary.primaryWound) === ""
          ? "--"
          : getBlankForNullValue(
              vacOrderSummary.primaryWound?.measurementDate
            ) === ""
          ? ""
          : vacOrderSummary.primaryWound?.measurementDate,
    },
    woundLength: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(vacOrderSummary.primaryWound?.length) === ""
          ? "0"
          : vacOrderSummary.primaryWound?.length?.toString() === ""
          ? "0"
          : vacOrderSummary.primaryWound?.length?.toString(),
    },
    woundWidth: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(vacOrderSummary.primaryWound?.width) === ""
          ? "0"
          : vacOrderSummary.primaryWound?.width?.toString() === ""
          ? "0"
          : vacOrderSummary.primaryWound?.width?.toString(),
    },
    woundDepth: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(vacOrderSummary.primaryWound?.depth) === ""
          ? "0"
          : vacOrderSummary.primaryWound?.depth?.toString() === ""
          ? "0"
          : vacOrderSummary.primaryWound?.depth?.toString(),
    },
    woundThickness: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(vacOrderSummary.primaryWound) === ""
          ? "--"
          : getBlankForNullValue(vacOrderSummary.primaryWound?.thickness) === ""
          ? "--"
          : vacOrderSummary.primaryWound?.thickness === true
          ? "Yes"
          : "No",
    },
    woundTunneling: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(vacOrderSummary.primaryWound) === ""
          ? "--"
          : getBlankForNullValue(
              vacOrderSummary.primaryWound?.tunnelingPresent
            ) === ""
          ? "--"
          : vacOrderSummary.primaryWound?.tunnelingPresent === true
          ? "Yes"
          : "No",
    },
    location1Depth: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(vacOrderSummary.primaryWound) === ""
          ? "--"
          : getBlankForNullValue(
              vacOrderSummary.primaryWound?.tunnelingSinusLocation1?.depth
            ) === ""
          ? "--"
          : vacOrderSummary.primaryWound?.tunnelingSinusLocation1?.depth?.toString(),
    },
    location1Position: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(
          vacOrderSummary.primaryWound?.tunnelingSinusLocation1?.area
        ) === ""
          ? "--"
          : vacOrderSummary.primaryWound?.tunnelingSinusLocation1?.area?.toString(),
    },
    location2Depth: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(
          vacOrderSummary.primaryWound?.tunnelingSinusLocation2?.depth
        ) === ""
          ? "--"
          : vacOrderSummary.primaryWound?.tunnelingSinusLocation2?.depth?.toString(),
    },
    location2Position: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(
          vacOrderSummary.primaryWound?.tunnelingSinusLocation2?.area
        ) === ""
          ? "--"
          : vacOrderSummary.primaryWound?.tunnelingSinusLocation2?.area?.toString(),
    },
    exudateAmount: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(vacOrderSummary.primaryWound?.exudateAmount) === ""
          ? "--"
          : vacOrderSummary.primaryWound?.exudateAmount ?? null,
    },
    exudateAppearance: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(
          vacOrderSummary.primaryWound?.exudateAppearance
        ) === ""
          ? "--"
          : vacOrderSummary.primaryWound?.exudateAppearance ?? null,
    },
    granulationValue: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(vacOrderSummary.primaryWound?.brightRedTissue) ===
        ""
          ? "--"
          : "GRA" + vacOrderSummary.primaryWound?.brightRedTissue,
    },
    epthilizationValue: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(vacOrderSummary.primaryWound?.dullTissue) === ""
          ? "--"
          : "EPH" + vacOrderSummary.primaryWound?.dullTissue,
    },
    sloughValue: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(vacOrderSummary.primaryWound?.whiteTissue) === ""
          ? "--"
          : "SLO" + vacOrderSummary.primaryWound?.whiteTissue,
    },
    escharValue: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(vacOrderSummary.primaryWound?.blackEschar) === ""
          ? "--"
          : "ESC" + vacOrderSummary.primaryWound?.blackEschar,
    },
    woundBedTotal: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(vacOrderSummary.primaryWound?.bedTotal) === ""
          ? "0"
          : vacOrderSummary.primaryWound?.bedTotal?.toString() === ""
          ? "0"
          : vacOrderSummary.primaryWound?.bedTotal?.toString(),
    },
    exposedStructures: {
      valid: ValidationStatus.UNTOUCHED,
      value: exposedStructuresData.map((obj) => {
        if (
          vacOrderSummary.primaryWound?.muscleExposed &&
          obj.label === "Muscle"
        ) {
          return { ...obj, selected: true };
        }
        if (vacOrderSummary.primaryWound?.boneExposed && obj.label === "Bone") {
          return { ...obj, selected: true };
        }
        if (
          vacOrderSummary.primaryWound?.tendonExposed &&
          obj.label === "Tendon"
        ) {
          return { ...obj, selected: true };
        }
        if (
          vacOrderSummary.primaryWound?.tissueExposed &&
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
        getBlankForNullValue(vacOrderSummary.vacNotUsedConsequences) === ""
          ? "--"
          : vacOrderSummary.vacNotUsedConsequences?.toString(),
    },
    woundType: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(vacOrderSummary.primaryWound?.type) === ""
          ? "--"
          : vacOrderSummary.primaryWound?.type?.toString(),
      required: true,
    },
    woundAge: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(vacOrderSummary.primaryWound?.age) === ""
          ? "--"
          : vacOrderSummary.primaryWound?.age?.toString(),
      required: true,
    },
    woundLocation: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(vacOrderSummary.primaryWound?.location) === ""
          ? "--"
          : vacOrderSummary.primaryWound?.location?.toString(),
      required: true,
    },
    woundDirection: {
      valid: ValidationStatus.UNTOUCHED,
      value: woundDirectionStr,
      required: true,
    },
    woundOrientation: {
      valid: ValidationStatus.UNTOUCHED,
      value: woundOrientationStr,
      required: true,
    },
    isTissuePresent: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(vacOrderSummary.primaryWound) === ""
          ? "--"
          : getBlankForNullValue(vacOrderSummary.primaryWound?.eschar) === ""
          ? "--"
          : vacOrderSummary.primaryWound?.eschar === true
          ? "Yes"
          : "No",
      required: true,
    },
    //wound undermining
    woundUndermining: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(vacOrderSummary.primaryWound) === ""
          ? "--"
          : getBlankForNullValue(
              vacOrderSummary.primaryWound?.underminingPresent
            ) === ""
          ? "--"
          : vacOrderSummary.primaryWound?.underminingPresent === true
          ? "Yes"
          : "No",
      required: true,
    },
    underminingLocation1Depth: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(vacOrderSummary.primaryWound) === ""
          ? "--"
          : getBlankForNullValue(
              vacOrderSummary.primaryWound?.underminingLocation1?.depth
            ) === ""
          ? "--"
          : vacOrderSummary.primaryWound?.underminingLocation1?.depth?.toString(),
      required: vacOrderSummary.primaryWound?.underminingPresent,
    },
    underminingLocation1PositionFrom: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(
          vacOrderSummary.primaryWound?.underminingLocation1?.area
        ) === ""
          ? "--"
          : vacOrderSummary.primaryWound?.underminingLocation1?.area?.length > 0
          ? vacOrderSummary.primaryWound?.underminingLocation1?.area
              ?.split(" to ")[0]
              .toString()
          : "0",
      required: vacOrderSummary.primaryWound?.underminingPresent,
    },
    underminingLocation1PositionTo: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(
          vacOrderSummary.primaryWound?.underminingLocation1?.area
        ) === ""
          ? "--"
          : vacOrderSummary.primaryWound?.underminingLocation1?.area?.length > 0
          ? vacOrderSummary.primaryWound?.underminingLocation1?.area
              .split(" to ")[1]
              .toString()
          : "--",
      required: vacOrderSummary.primaryWound?.underminingPresent,
    },
    underminingLocation2Depth: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(
          vacOrderSummary.primaryWound?.underminingLocation2?.depth
        ) === ""
          ? "--"
          : vacOrderSummary.primaryWound?.underminingLocation2?.depth?.toString(),
    },
    underminingLocation2PositionFrom: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(
          vacOrderSummary.primaryWound?.underminingLocation2?.area
        ) === ""
          ? "--"
          : vacOrderSummary.primaryWound?.underminingLocation2?.area?.length > 0
          ? vacOrderSummary.primaryWound?.underminingLocation2?.area
              .split(" to ")[0]
              .toString()
          : "--",
    },
    underminingLocation2PositionTo: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(
          vacOrderSummary.primaryWound?.underminingLocation2?.area
        ) === ""
          ? "--"
          : vacOrderSummary.primaryWound?.underminingLocation2?.area?.length > 0
          ? vacOrderSummary.primaryWound?.underminingLocation2?.area
              .split(" to ")[1]
              .toString()
          : "--",
    },
    // Secondary Wound Info
    isShowSecondaryWoundInfo: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(vacOrderSummary.secondaryWound) === ""
          ? "--"
          : getBlankForNullValue(vacOrderSummary.secondaryWound?.type) === ""
          ? "--"
          : vacOrderSummary.secondaryWound?.type?.length > 0
          ? "Yes"
          : "No",
    },
  };
  return woundDetails;
};

export const mapSecondaryWoundIformationData = (
  vacOrderSummary: VacOrderSummaryData
) => {
  let secondaryWoundDetails: ISecondaryWoundInfo;
  secondaryWoundDetails = {
    shortNarrativeOfPossibleConsequences: {
      valid: ValidationStatus.UNTOUCHED,
      value: "--",
    },
    debridementAttempted: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(vacOrderSummary.secondaryWound) === ""
          ? "--"
          : getBlankForNullValue(
              vacOrderSummary.secondaryWound?.debridementAttempt
            ) === ""
          ? "--"
          : vacOrderSummary.secondaryWound?.debridementAttempt === true
          ? "Yes"
          : "No",
    },
    debridementDate: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(vacOrderSummary.secondaryWound) === ""
          ? "--"
          : getBlankForNullValue(
              vacOrderSummary.secondaryWound?.debridementDate
            ) === ""
          ? "--"
          : vacOrderSummary.secondaryWound?.debridementDate,
    },
    debridementType: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(vacOrderSummary.secondaryWound) === ""
          ? "--"
          : getBlankForNullValue(
              vacOrderSummary.secondaryWound?.debridementType
            ) === ""
          ? "--"
          : vacOrderSummary.secondaryWound?.debridementType,
    },
    serialDebridementRequired: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(vacOrderSummary.secondaryWound) === ""
          ? "--"
          : getBlankForNullValue(
              vacOrderSummary.secondaryWound?.debridementRequired
            ) === ""
          ? "--"
          : vacOrderSummary.secondaryWound?.debridementRequired === true
          ? "Yes"
          : "No",
    },
    woundMeasurementDate: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(vacOrderSummary.secondaryWound) === ""
          ? "--"
          : getBlankForNullValue(
              vacOrderSummary.secondaryWound?.measurementDate
            ) === ""
          ? ""
          : vacOrderSummary.secondaryWound?.measurementDate,
    },
    woundLength: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(vacOrderSummary.secondaryWound?.length) === ""
          ? "0"
          : vacOrderSummary.secondaryWound?.length?.toString(),
    },
    woundWidth: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(vacOrderSummary.secondaryWound?.width) === ""
          ? "0"
          : vacOrderSummary.secondaryWound?.width?.toString() === ""
          ? "0"
          : vacOrderSummary.secondaryWound?.width?.toString(),
    },
    woundDepth: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(vacOrderSummary.secondaryWound?.depth) === ""
          ? "0"
          : vacOrderSummary.secondaryWound?.depth?.toString(),
    },
    woundThickness: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(vacOrderSummary.secondaryWound) === ""
          ? "--"
          : getBlankForNullValue(vacOrderSummary.secondaryWound?.thickness) ===
            ""
          ? "--"
          : vacOrderSummary.secondaryWound?.thickness === true
          ? "Yes"
          : "No",
    },
    woundTunneling: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(vacOrderSummary.secondaryWound) === ""
          ? "--"
          : getBlankForNullValue(
              vacOrderSummary.secondaryWound?.tunnelingPresent
            ) === ""
          ? "--"
          : vacOrderSummary.secondaryWound?.tunnelingPresent === true
          ? "Yes"
          : "No",
    },
    location1Depth: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(
          vacOrderSummary.secondaryWound?.tunnelingSinusLocation1?.depth
        ) === ""
          ? "--"
          : vacOrderSummary.secondaryWound?.tunnelingSinusLocation1?.depth?.toString(),
    },
    location1Position: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(
          vacOrderSummary.secondaryWound?.tunnelingSinusLocation1?.area
        ) === ""
          ? "--"
          : vacOrderSummary.secondaryWound?.tunnelingSinusLocation1?.area?.toString(),
    },
    location2Depth: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(
          vacOrderSummary.secondaryWound?.tunnelingSinusLocation2?.depth
        ) === ""
          ? "--"
          : vacOrderSummary.secondaryWound?.tunnelingSinusLocation2?.depth?.toString(),
    },
    location2Position: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(
          vacOrderSummary.secondaryWound?.tunnelingSinusLocation2?.area
        ) === ""
          ? "--"
          : vacOrderSummary.secondaryWound?.tunnelingSinusLocation2?.area?.toString(),
    },
    exudateAmount: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(vacOrderSummary.secondaryWound?.exudateAmount) ===
        ""
          ? "--"
          : vacOrderSummary.secondaryWound?.exudateAmount?.toString(),
    },
    exudateAppearance: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(
          vacOrderSummary.secondaryWound?.exudateAppearance
        ) === ""
          ? "--"
          : vacOrderSummary.secondaryWound?.exudateAppearance?.toString(),
    },
    granulationValue: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(vacOrderSummary.secondaryWound?.brightRedTissue) ==
        ""
          ? "--"
          : "GRA" + vacOrderSummary.secondaryWound?.brightRedTissue,
    },
    epthilizationValue: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(vacOrderSummary.secondaryWound?.dullTissue) === ""
          ? "--"
          : "EPH" + vacOrderSummary.secondaryWound?.dullTissue,
    },
    sloughValue: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(vacOrderSummary.secondaryWound?.whiteTissue) === ""
          ? "--"
          : "SLO" + vacOrderSummary.secondaryWound?.whiteTissue,
    },
    escharValue: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(vacOrderSummary.secondaryWound?.blackEschar) === ""
          ? ""
          : "ESC" + vacOrderSummary.secondaryWound?.blackEschar,
    },
    woundBedTotal: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(vacOrderSummary.secondaryWound?.bedTotal) === ""
          ? "0"
          : vacOrderSummary.secondaryWound?.bedTotal?.toString(),
    },
    exposedStructures: {
      valid: ValidationStatus.UNTOUCHED,
      value: exposedStructuresData.map((obj) => {
        if (
          vacOrderSummary.secondaryWound?.muscleExposed &&
          obj.label === "Muscle"
        ) {
          return { ...obj, selected: true };
        }
        if (
          vacOrderSummary.secondaryWound?.boneExposed &&
          obj.label === "Bone"
        ) {
          return { ...obj, selected: true };
        }
        if (
          vacOrderSummary.secondaryWound?.tendonExposed &&
          obj.label === "Tendon"
        ) {
          return { ...obj, selected: true };
        }
        if (
          vacOrderSummary.secondaryWound?.tissueExposed &&
          obj.label === "Subcutaneous Tissue"
        ) {
          return { ...obj, selected: true };
        }
        return obj;
      }),
    },
    woundType: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(vacOrderSummary.secondaryWound?.type) === ""
          ? "--"
          : vacOrderSummary.secondaryWound?.type?.toString(),
    },
    woundAge: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(vacOrderSummary.secondaryWound?.age) === ""
          ? "--"
          : vacOrderSummary.secondaryWound?.age?.toString(),
    },
    woundLocation: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(vacOrderSummary.secondaryWound?.location) === ""
          ? "--"
          : vacOrderSummary.secondaryWound?.location?.toString(),
    },
    woundDirection: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(
          vacOrderSummary.secondaryWound?.locationWritten
        ) === ""
          ? "--"
          : vacOrderSummary.secondaryWound?.locationWritten
              ?.toString()
              .split(",")[0]
              .toString(),
    },
    woundOrientation: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(
          vacOrderSummary.secondaryWound?.locationWritten
        ) === ""
          ? "--"
          : vacOrderSummary.secondaryWound?.locationWritten
              ?.toString()
              .split(",")[1]
              .toString(),
    },
    isTissuePresent: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(vacOrderSummary.secondaryWound) === ""
          ? "--"
          : getBlankForNullValue(vacOrderSummary.secondaryWound?.eschar) === ""
          ? "--"
          : vacOrderSummary.secondaryWound?.eschar === true
          ? "Yes"
          : "No",
    },
    //wound undermining
    woundUndermining: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(vacOrderSummary.secondaryWound) === ""
          ? "--"
          : getBlankForNullValue(
              vacOrderSummary.secondaryWound?.underminingPresent
            ) === ""
          ? "--"
          : vacOrderSummary.secondaryWound?.underminingPresent === true
          ? "Yes"
          : "No",
    },
    underminingLocation1Depth: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(
          vacOrderSummary.secondaryWound?.underminingLocation1?.depth
        ) === ""
          ? "--"
          : vacOrderSummary.secondaryWound?.underminingLocation1?.depth?.toString(),
    },
    underminingLocation1PositionFrom: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(
          vacOrderSummary.secondaryWound?.underminingLocation1?.area
        ) === ""
          ? "--"
          : vacOrderSummary.secondaryWound?.underminingLocation1?.area?.length >
            0
          ? vacOrderSummary.secondaryWound?.underminingLocation1?.area
              ?.split(" to ")[0]
              .toString()
          : "--",
    },
    underminingLocation1PositionTo: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(
          vacOrderSummary.secondaryWound?.underminingLocation1?.area
        ) === ""
          ? "--"
          : vacOrderSummary.secondaryWound?.underminingLocation1?.area?.length >
            0
          ? vacOrderSummary.secondaryWound?.underminingLocation1?.area
              .split(" to ")[1]
              .toString()
          : "--",
    },
    underminingLocation2Depth: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(
          vacOrderSummary.secondaryWound?.underminingLocation2?.depth
        ) === ""
          ? "--"
          : vacOrderSummary.secondaryWound?.underminingLocation2?.depth?.toString(),
    },
    underminingLocation2PositionFrom: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(
          vacOrderSummary.secondaryWound?.underminingLocation2?.area
        ) === ""
          ? "--"
          : vacOrderSummary.secondaryWound?.underminingLocation2?.area?.length >
            0
          ? vacOrderSummary.secondaryWound?.underminingLocation2?.area
              .split(" to ")[0]
              .toString()
          : "--",
    },
    underminingLocation2PositionTo: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(
          vacOrderSummary.secondaryWound?.underminingLocation2?.area
        ) === ""
          ? "--"
          : vacOrderSummary.secondaryWound?.underminingLocation2?.area?.length >
            0
          ? vacOrderSummary.secondaryWound?.underminingLocation2?.area
              .split(" to ")[1]
              .toString()
          : "--",
    },
  };
  return secondaryWoundDetails;
};
export const mapWoundQuestionariesData = (
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

export const mapRequesterInfoData = (
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
    },
    requesterFirstName: {
      valid: ValidationStatus.VALID,
      value: getBlankForNullValue(vacOrderSummarInfo.requestor?.name),
    },
    requesterLastName: {
      valid: ValidationStatus.VALID,
      value: getBlankForNullValue(vacOrderSummarInfo.requestor?.lastName),
    },
    requesterEmail: {
      valid: ValidationStatus.VALID,
      value: getBlankForNullValue(vacOrderSummarInfo.requestor?.email),
    },
    requesterFacility: requestorFacility(vacOrderSummarInfo),
    requesterFacilityAsDefault: false,
  };
  return requestor;
};

export const mapProductInfoData = (vacOrderSummarInfo: VacOrderSummaryData) => {
  let product: IOrderOverviewProductInfo;
  product = {
    // Product Information
    isReadyCare: {
      valid: ValidationStatus.VALID,
      value:
        getBlankForNullValue(vacOrderSummarInfo?.isFromReadyCare) === ""
          ? "--"
          : vacOrderSummarInfo?.isFromReadyCare === true
          ? "Yes"
          : "No",
    },
    productValue: {
      valid: ValidationStatus.VALID,
      value:
        getBlankForNullValue(vacOrderSummarInfo.vacUnit) === ""
          ? "--"
          : vacOrderSummarInfo.vacUnit.toString(),
    },
    serialNumber: {
      valid: ValidationStatus.VALID,
      value:
        getBlankForNullValue(vacOrderSummarInfo.serialNumber) === ""
          ? "--"
          : vacOrderSummarInfo.serialNumber.toString(),
    },
  };
  return product;
};

export const mapDressingKitData = () => {
  let dressing: IDressingKit;
  dressing = {
    //primary Vac Dressing KIT
    productId: {
      valid: ValidationStatus.UNTOUCHED,
      value: "",
    },
    productCode: {
      valid: ValidationStatus.VALID,
      value: "",
      isOptional: true,
    },
    productName: {
      valid: ValidationStatus.UNTOUCHED,
      value: "",
    },
    productSizeCode: {
      valid: ValidationStatus.VALID,
      value: "",
      isOptional: true,
    },
    productSizeName: {
      valid: ValidationStatus.UNTOUCHED,
      value: "",
    },
    productQuantity: {
      valid: ValidationStatus.VALID,
      value: "1",
      isOptional: true,
    },
    productSizeID: {
      valid: ValidationStatus.VALID,
      value: "",
    },
    //secondary Vac Dressing KIT
    secProductId: {
      valid: ValidationStatus.VALID,
      value: "",
    },
    secProductCode: {
      valid: ValidationStatus.VALID,
      value: "",
      isOptional: true,
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
    },
    secProductSizeID: {
      valid: ValidationStatus.VALID,
      value: "",
    },
  };
  return dressing;
};
export const vacPrimaryDressingKitMapperData = (
  vacOrderSummary: VacOrderSummaryData,
  dressingMapperRes: IDressingKit,
  vacAllProducts: any,
  NewOrderObj: any
) => {
  let selectedProduct = getSelectedVacProduct(
    vacOrderSummary.mainDressing.sku,
    vacAllProducts
  )! as ProductInformation;
  dressingMapperRes = {
    ...dressingMapperRes,
    productId: {
      valid: ValidationStatus.VALID,
      value: vacOrderSummary.mainDressing?.sku,
    },
    productCode: {
      valid: ValidationStatus.VALID,
      value: vacOrderSummary.mainDressing?.sku,
    },
    productName: {
      valid: ValidationStatus.VALID,
      value: vacOrderSummary.mainDressing?.productName,
    },
    productQuantity: {
      valid: ValidationStatus.VALID,
      value: vacOrderSummary.mainDressing.quantity.toString(),
    },
  };
  NewOrderObj?.setShowSize(false);
  if (
    selectedProduct &&
    selectedProduct.sizes &&
    selectedProduct.hasMultipleSize
  ) {
    const selectedSizeProduct = selectedProduct.sizes.filter(
      (x) => x.sku === vacOrderSummary.mainDressing.sku
    )[0];
    dressingMapperRes = {
      ...dressingMapperRes,
      productSizeID: {
        valid: ValidationStatus.VALID,
        value: selectedSizeProduct.sku,
      },
      productSizeCode: {
        valid: ValidationStatus.VALID,
        value: selectedSizeProduct.sku,
      },
      productSizeName: {
        valid: ValidationStatus.VALID,
        value: selectedSizeProduct.name,
      },
    };
    NewOrderObj?.setShowSize(true);
  } else {
    dressingMapperRes = {
      ...dressingMapperRes,
      productSizeID: {
        valid: ValidationStatus.VALID,
        value: "",
      },
      productSizeCode: {
        valid: ValidationStatus.VALID,
        value: "",
      },
      productSizeName: {
        valid: ValidationStatus.VALID,
        value: "",
      },
    };
  }
  if (vacOrderSummary.mainDressing.quantity === 3) {
    NewOrderObj?.setIsPrimaryVacKitDressingPlusDisabled(true);
    NewOrderObj?.setIsPrimaryVacKitDressingMinusDisabled(false);
  }
  if (vacOrderSummary.mainDressing.quantity === 1) {
    NewOrderObj?.setIsPrimaryVacKitDressingMinusDisabled(true);
    NewOrderObj?.setIsPrimaryVacKitDressingPlusDisabled(false);
  }

  NewOrderObj?.setshowQunatity(true);

  return dressingMapperRes;
};
export const vacCannisterMapperData = (
  vacOrderSummary: VacOrderSummaryData,
  NewOrderObj: any
) => {
  if (!vacOrderSummary.isFromReadyCare) {
    if (vacOrderSummary.canister && vacOrderSummary.canister.quantity === 2) {
      NewOrderObj?.setIsCannisterProductPlusDisabled(true);
      NewOrderObj?.setIsCannisterProductMinusDisabled(false);
    }
    if (vacOrderSummary.canister && vacOrderSummary.canister.quantity === 1) {
      NewOrderObj?.setIsCannisterProductPlusDisabled(false);
      NewOrderObj?.setIsCannisterProductMinusDisabled(true);
    }
  }
};
export const mapCanisterData = (vacOrderSummarInfo: VacOrderSummaryData) => {
  let canister: ICanister;
  canister = {
    // Canister
    canisterProductName: {
      valid: ValidationStatus.VALID,
      value:
        vacOrderSummarInfo.canister === null
          ? "--"
          : vacOrderSummarInfo.canister?.productName,
    },
    canisterProductCode: {
      valid: ValidationStatus.VALID,
      value:
        vacOrderSummarInfo.canister === null
          ? "--"
          : vacOrderSummarInfo.canister.sku,
    },
    canisterProductQuantity: {
      valid: ValidationStatus.VALID,
      value:
        vacOrderSummarInfo.canister === null
          ? "--"
          : vacOrderSummarInfo.canister.quantity.toString(),
      isOptional: true,
    },
    canisterProductID: {
      valid: ValidationStatus.VALID,
      value:
        vacOrderSummarInfo.canister === null
          ? "--"
          : vacOrderSummarInfo.canister.sku,
    },
  };
  return canister;
};

export const mapAccessoryData = (vacOrderSummarInfo: VacOrderSummaryData) => {
  let accessory: IProductAccessory;
  accessory = {
    // Accessory
    accessories: getAccessoriesObj(vacOrderSummarInfo.accessories),
  };
  return accessory;
};

export const mapDeliveryInformationData = (
  vacOrderSummarInfo: VacOrderSummaryData
) => {
  let delieveryInformationData: IDeliveryInformation;
  let dateAndTime =
    vacOrderSummarInfo.deliveryNeedByTime === null
      ? "--"
      : moment(vacOrderSummarInfo.deliveryNeedByTime).format(
          "MM/DD/yyyy  hh:mm A"
        );
  const dateStr =
    dateAndTime === "--" ? dateAndTime : dateAndTime.split("  ")[0];
  const timeStr =
    dateAndTime === "--" ? dateAndTime : dateAndTime.split("  ")[1];
  delieveryInformationData = {
    // Product Information
    // Delivery Information
    deliveryProductNeedByDate: {
      valid: ValidationStatus.UNTOUCHED,
      value: dateStr,
    },
    deliveryProductNeedByTime: {
      valid: ValidationStatus.UNTOUCHED,
      value: timeStr,
    },
    //Since the value is not coming exactly as while saving
    deliverySiteType: {
      valid: ValidationStatus.UNTOUCHED,
      value: getBlankForNullValue(vacOrderSummarInfo.deliverySiteType),
    },
    deliveryFacilityName: {
      valid: ValidationStatus.UNTOUCHED,
      value: getBlankForNullValue(vacOrderSummarInfo.deliverySiteName),
    },
    deliveryAddressLine1: {
      valid: ValidationStatus.UNTOUCHED,
      value: getBlankForNullValue(
        vacOrderSummarInfo.deliveryAddress?.addressLine1
      ),
    },
    deliveryAddressLine2: {
      valid: ValidationStatus.UNTOUCHED,
      value: getBlankForNullValue(
        vacOrderSummarInfo.deliveryAddress?.addressLine2
      ),
    },
    deliveryCity: {
      valid: ValidationStatus.UNTOUCHED,
      value: getBlankForNullValue(vacOrderSummarInfo.deliveryAddress?.city),
    },
    deliveryState: {
      valid: ValidationStatus.UNTOUCHED,
      value: getBlankForNullValue(
        vacOrderSummarInfo.deliveryAddress?.stateCode
      ),
    },
    deliveryZipCode: {
      valid: ValidationStatus.UNTOUCHED,
      value: getBlankForNullValue(
        vacOrderSummarInfo.deliveryAddress?.postalCode
      ),
    },
  };
  return delieveryInformationData;
};

export const mapIsOsteomyelitisPresent = (
  vacOrderSummarInfo: VacOrderSummaryData
) => {
  const value =
    vacOrderSummarInfo.clinicalInformation.osteomyelitisPresent === null
      ? "--"
      : vacOrderSummarInfo.clinicalInformation.osteomyelitisPresent === true
      ? "Yes"
      : "No";
  return {
    valid: ValidationStatus.UNTOUCHED,
    value: value,
  };
};

export const mapOsteomyelitisies = (
  vacOrderSummarInfo: VacOrderSummaryData
) => {
  const osteomyelitisiesLocal =
    vacOrderSummarInfo.clinicalInformation.osteomyelitisTreatmentRegimen;
  if (!osteomyelitisies) {
    return {
      valid: ValidationStatus.UNTOUCHED,
      value: "--",
    };
  }
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
        osteomyelitis.isTextBoxValueValid = ValidationStatus.UNTOUCHED;
      }
    });
    return osteomyelitis;
  });
  return {
    valid: ValidationStatus.UNTOUCHED,
    value: finalOsteomyelitisies,
  };
};
export const vacSecondaryDressingKitMapperData = (
  vacOrderSummary: VacOrderSummaryData,
  dressingMapperRes: IDressingKit,
  vacAllProducts: any,
  NewOrderObj: any
) => {
  let selectedProduct = getSelectedVacProduct(
    vacOrderSummary.additionalDressing.sku,
    vacAllProducts
  )! as ProductInformation;

  dressingMapperRes = {
    ...dressingMapperRes,
    secProductId: {
      valid: ValidationStatus.VALID,
      value: selectedProduct.sku,
    },
    secProductCode: {
      valid: ValidationStatus.VALID,
      value: selectedProduct.sku,
    },
    secProductName: {
      valid: ValidationStatus.VALID,
      value: selectedProduct.productName,
    },
    secProductQuantity: {
      valid: ValidationStatus.VALID,
      value: vacOrderSummary.additionalDressing.quantity.toString(),
    },
  };
  NewOrderObj?.setShowSecSize(false);
  if (selectedProduct.sizes && selectedProduct.hasMultipleSize) {
    const selectedSizeProduct = selectedProduct.sizes.filter(
      (x) => x.sku === vacOrderSummary.additionalDressing.sku
    )[0];
    dressingMapperRes = {
      ...dressingMapperRes,
      secProductSizeID: {
        valid: ValidationStatus.VALID,
        value: selectedSizeProduct.sku,
      },
      secProductSizeCode: {
        valid: ValidationStatus.VALID,
        value: selectedSizeProduct.sku,
      },
      secProductSizeName: {
        valid: ValidationStatus.VALID,
        value: selectedSizeProduct.name,
      },
    };
    NewOrderObj?.setShowSecSize(true);
  }
  if (vacOrderSummary.additionalDressing.quantity === 3) {
    NewOrderObj?.setIsSecondaryVacKitDressingPlusDisabled(true);
    NewOrderObj?.setIsSecondaryVacKitDressingMinusDisabled(false);
  }
  if (vacOrderSummary.additionalDressing.quantity === 1) {
    NewOrderObj?.setIsSecondaryVacKitDressingMinusDisabled(true);
    NewOrderObj?.setIsSecondaryVacKitDressingPlusDisabled(false);
  }
  NewOrderObj?.setShowSecondaryDressingKit(true);

  NewOrderObj?.setshowSecQunatity(true);

  return dressingMapperRes;
};
export const getBlankForNullValue = (fieldValue: any | null | undefined) => {
  if (fieldValue === undefined) return "";
  else if (fieldValue === null) return "";
  else return fieldValue.toString();
};
export const mapPatientFinancialData = (
  patientFinApiResponse: IFinancialInsurenceResponse | null
) => {
  let returnResponse: IFinancialResponse;
  if (patientFinApiResponse) {
    returnResponse = {
      coPay: patientFinApiResponse.coPay,
      deductableAmount: getBlankForNullValue(
        patientFinApiResponse.deductableAmount
      ),
      estimatedRentalAmount: getBlankForNullValue(
        patientFinApiResponse.estimatedRentalAmount
      ),
      estimatedSuppliesAmount: getBlankForNullValue(
        patientFinApiResponse.estimatedSuppliesAmount
      ),
      outOfPocket: getBlankForNullValue(patientFinApiResponse.outOfPocket),
      patientResponsibility: getBlankForNullValue(
        patientFinApiResponse.patientResponsibility
      ),
      payerResponsibility: getBlankForNullValue(
        patientFinApiResponse.payerResponsibility
      ),
    };
  } else {
    returnResponse = {
      coPay: "",
      deductableAmount: "",
      estimatedRentalAmount: "",
      estimatedSuppliesAmount: "",
      outOfPocket: "",
      patientResponsibility: "",
      payerResponsibility: "",
    };
  }
  return returnResponse;
};
export const mapPatientInsurenceData = (
  patientFinApiResponse: IInsurenceDetail | null
) => {
  let returnResponse: IInsurenceDetail;
  if (patientFinApiResponse) {
    returnResponse = {
      payor: getBlankForNullValue(patientFinApiResponse.payor),
      policyId: getBlankForNullValue(patientFinApiResponse.policyId),
      groupId: getBlankForNullValue(patientFinApiResponse.groupId),
      relationship: getBlankForNullValue(patientFinApiResponse.relationship),
      deductible: getBlankForNullValue(patientFinApiResponse.deductible),
      patientPercent: getBlankForNullValue(
        patientFinApiResponse.patientPercent
      ),
      coveragePercent: getBlankForNullValue(
        patientFinApiResponse.coveragePercent
      ),
      outOfPocket: getBlankForNullValue(patientFinApiResponse.outOfPocket),
    };
  } else {
    returnResponse = {
      payor: "",
      policyId: "",
      groupId: "",
      relationship: "",
      deductible: "",
      patientPercent: "",
      coveragePercent: "",
      outOfPocket: "",
    };
  }
  return returnResponse;
};

export const mapWoundDetails = (woundAssesmentsArray: IWoundAssesments[]) => {
  let assesmentList: Array<IWoundAssesments> = [];

  woundAssesmentsArray
    .sort((a: any, b: any) =>
      a.evaluationDate > b.evaluationDate ? 1 : a.volume > b.volume ? 1 : -1
    )
    .map((x: any) => {
      if (x.evaluationDate) {
        let assesmentData: IWoundAssesments = {
          evaluationDate: x.evaluationDate.toString(),
          volume: x.volume,
          images: x.images,
          volumeDifference: x.volumeDifference,
          status: x.status,
          color: x.color,
          boneExposed: x.boneExposed,
          comorbidities: x.comorbidities,
          cycleDateRangeFrom: x.cycleDateRangeFrom,
          cycleDateRangeTo: x.cycleDateRangeTo,
          debridementDate: x.debridementDate,
          debridementDone: x.debridementDone,
          debridementType: x.debridementType,
          exudateAppearance: x.exudateAppearance,
          holdVacTherapyDate: x.holdVacTherapyDate,
          isEschar: x.isEschar,
          isTherapyInUSe: x.isTherapyInUSe,
          isTunnelingPresent: x.isTunnelingPresent,
          isUnderMiningPresent: x.isUnderMiningPresent,
          muscelExposed: x.muscelExposed,
          otherComorbidities: x.otherComorbidities,
          subcutaneousTissueExposed: x.subcutaneousTissueExposed,
          tissueExposed: x.tissueExposed,
          tunnelingLength1: x.tunnelingLength1,
          tunnelingLength2: x.tunnelingLength2,
          tunnelingLocation1: x.tunnelingLocation1,
          tunnelingLocation2: x.tunnelingLocation2,
          underMiningLocation1From: x.underMiningLocation1From,
          underMiningLocation1Size: x.underMiningLocation1Size,
          underMiningLocation1To: x.underMiningLocation1To,
          underMiningLocation2From: x.underMiningLocation2From,
          underMiningLocation2Size: x.underMiningLocation2Size,
          underMiningLocation2To: x.underMiningLocation2To,
          woundDepth: x.woundDepth,
          woundDescriptionBeefyRed: x.woundDescriptionBeefyRed,
          woundDescriptionBlackEschar: x.woundDescriptionBlackEschar,
          woundDescriptionDullPink: x.woundDescriptionDullPink,
          woundDescriptionWhite: x.woundDescriptionWhite,
          woundExudate: x.woundExudate,
          woundLength: x.woundLength,
          woundWidth: x.woundWidth,
          discontinueDate: x.discontinueDate,
          discontinuedReason: x.discontinuedReason,
          isAssessmentPerformByOthers: x.isAssessmentPerformByOthers,
          isMeasurementTakenDuringResumption:
            x.isMeasurementTakenDuringResumption,
          reasonForHold: x.reasonForHold,
          reasonForResume: x.reasonForResume,
          resumeVacTherapyDate: x.resumeVacTherapyDate,
          resumedMeasurementWoundDepth: x.resumedMeasurementWoundDepth,
          resumedMeasurementWoundLength: x.resumedMeasurementWoundLength,
          resumedMeasurementWoundWidth: x.resumedMeasurementWoundWidth,
          resumedVolume: x.resumedVolume,
          woundAssessorFacilityName: x.woundAssessorFacilityName,
          woundAssessorLicenseTypeJobRole: x.woundAssessorLicenseTypeJobRole,
          woundAssessorName: x.woundAssessorName,
          woundAssessorPhoneNumber: x.woundAssessorPhoneNumber,
          assessmentType: "",
        };

        assesmentList.push(assesmentData);
      }
    });

  return assesmentList;
};

export const mapWoundDetailsToAddWoundAssesmentType = (
  woundAssesmentsObject: IWoundAssesments
) => {
  let woundAssesmentSummaryData: IAddWoundAssessment = {
    patientFirstName: {
      value: "",
      valid: ValidationStatus.VALID,
      required: false,
    },
    patientLastName: {
      value: "",
      valid: ValidationStatus.VALID,
      required: false,
    },
    woundID: {
      value: "",
      valid: ValidationStatus.VALID,
      required: false,
    },
    rentalOrderNumber: {
      value: "",
      valid: ValidationStatus.VALID,
      required: false,
    },
    dateOfBirth: {
      value: "",
      valid: ValidationStatus.VALID,
      required: false,
    },
    productName: {
      value: "",
      valid: ValidationStatus.VALID,
      required: false,
    },
    placementDate: {
      value: "",
      valid: ValidationStatus.VALID,
      required: false,
    },
    woundLocation: {
      value: "",
      valid: ValidationStatus.VALID,
      required: false,
    },
    woundType: {
      value: "",
      valid: ValidationStatus.VALID,
      required: false,
    },
    woundDirection: {
      value: "",
      valid: ValidationStatus.VALID,
      required: false,
    },
    woundOrientation: {
      value: "",
      valid: ValidationStatus.VALID,
      required: false,
    },
    assessmentType: {
      value: "",
      valid: ValidationStatus.VALID,
      required: false,
    },
    woundAssessmentDateTo: {
      value:
        getBlankForNullValue(woundAssesmentsObject?.cycleDateRangeTo) === ""
          ? "--"
          : woundAssesmentsObject?.cycleDateRangeTo,
      valid: ValidationStatus.VALID,
      required: false,
    },
    woundAssessmentDateFrom: {
      value:
        getBlankForNullValue(woundAssesmentsObject?.cycleDateRangeFrom) === ""
          ? "--"
          : woundAssesmentsObject?.cycleDateRangeFrom,
      valid: ValidationStatus.VALID,
      required: false,
    },
    previousEvaluationDate: {
      value: "",
      valid: ValidationStatus.VALID,
      required: false,
    },
    previousWoundDepth: {
      value: "",
      valid: ValidationStatus.VALID,
      required: false,
    },
    previousWoundLength: {
      value: "",
      valid: ValidationStatus.VALID,
      required: false,
    },
    previousWoundWidth: {
      value: "",
      valid: ValidationStatus.VALID,
      required: false,
    },
    woundTherapyStatus: {
      value:
        getBlankForNullValue(woundAssesmentsObject?.isTherapyInUSe) === ""
          ? ""
          : woundAssesmentsObject?.isTherapyInUSe === "Y"
          ? "yes"
          : "no",
      valid: ValidationStatus.UNTOUCHED,
      required: true,
    },
    woundDiscontinuedDate: {
      value:
        moment(woundAssesmentsObject?.discontinueDate).format("MM/DD/YYYY") ??
        "--",
      valid: ValidationStatus.UNTOUCHED,
      required: false,
    },
    woundDiscontinuedReason: {
      value: woundAssesmentsObject?.discontinuedReason ?? "--",
      valid: ValidationStatus.UNTOUCHED,
      required: false,
    },
    woundMeasurementTaken: {
      value:
        getBlankForNullValue(woundAssesmentsObject?.woundLength) !== ""
          ? "yes"
          : "no",
      valid: ValidationStatus.UNTOUCHED,
      required: false,
    },
    woundMeasurementDate: {
      value:
        getBlankForNullValue(woundAssesmentsObject?.evaluationDate) === ""
          ? "--"
          : moment(woundAssesmentsObject?.evaluationDate).format("MM/DD/YYYY"),
      valid: ValidationStatus.UNTOUCHED,
      required: false,
    },
    woundMeasurementLenght: {
      value: `${woundAssesmentsObject?.woundLength}` ?? "0",
      valid: ValidationStatus.UNTOUCHED,
      required: false,
    },
    woundMeasurementDepth: {
      value: `${woundAssesmentsObject?.woundDepth}` ?? "0",
      valid: ValidationStatus.UNTOUCHED,
      required: false,
    },
    woundMeasurementWidth: {
      value: `${woundAssesmentsObject?.woundWidth}` ?? "0",
      valid: ValidationStatus.UNTOUCHED,
      required: false,
    },
    woundAssessorStatus: {
      value:
        getBlankForNullValue(
          woundAssesmentsObject?.isAssessmentPerformByOthers
        ) !== ""
          ? woundAssesmentsObject?.isAssessmentPerformByOthers === "Y"
            ? "yes"
            : "no"
          : "",
      valid: ValidationStatus.UNTOUCHED,
      required: false,
    },
    woundAssessorName: {
      value: woundAssesmentsObject?.woundAssessorName ?? "--",
      valid: ValidationStatus.UNTOUCHED,
      required: false,
    },
    woundAssessorFacilityName: {
      value: woundAssesmentsObject?.woundAssessorFacilityName ?? "--",
      valid: ValidationStatus.UNTOUCHED,
      required: false,
    },
    woundAssessorPhoneNumber: {
      value: woundAssesmentsObject?.woundAssessorPhoneNumber ?? "--",
      valid: ValidationStatus.UNTOUCHED,
      required: false,
    },
    woundAssessorLicenseType: {
      value:
        getBlankForNullValue(
          woundAssesmentsObject?.woundAssessorLicenseTypeJobRole
        ) ?? "--",
      valid: ValidationStatus.UNTOUCHED,
      required: false,
    },
    provideAdditionalWoundInfo: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: false,
    },
    woundEscharStatus: {
      value:
        getBlankForNullValue(woundAssesmentsObject?.isEschar) !== ""
          ? woundAssesmentsObject?.isEschar === "Y"
            ? "yes"
            : "no"
          : "",
      valid: ValidationStatus.UNTOUCHED,
      required: false,
    },
    woundDebridementStatus: {
      value:
        getBlankForNullValue(woundAssesmentsObject?.debridementDone) !== ""
          ? woundAssesmentsObject?.debridementDone === "Y"
            ? "yes"
            : "no"
          : "--",

      valid: ValidationStatus.UNTOUCHED,
      required: false,
    },
    woundDebridementDate: {
      value:
        moment(woundAssesmentsObject?.debridementDate).format("MM/DD/YYYY") ??
        "--",
      valid: ValidationStatus.UNTOUCHED,
      required: false,
    },
    woundDebridementType: {
      value: woundAssesmentsObject?.debridementType ?? "--",
      valid: ValidationStatus.UNTOUCHED,
      required: false,
    },
    woundInfectionInLast30Days: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: false,
    },
    selectedInfectionType: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: false,
    },
    selectedInfectionTypeOther: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: false,
    },
    treatmentRegimen: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: false,
    },
    vacTherapyBeenHold: {
      value:
        getBlankForNullValue(woundAssesmentsObject?.reasonForHold) !== ""
          ? "yes"
          : "no",
      valid: ValidationStatus.UNTOUCHED,
      required: false,
    },
    vacHoldStartDate: {
      value:
        moment(woundAssesmentsObject?.holdVacTherapyDate).format(
          "MM/DD/YYYY"
        ) ?? "--",
      valid: ValidationStatus.UNTOUCHED,
      required: false,
    },
    vacHoldReason: {
      value: woundAssesmentsObject?.reasonForHold ?? "--",
      valid: ValidationStatus.UNTOUCHED,
      required: false,
    },
    vacResumeStatus: {
      value:
        getBlankForNullValue(woundAssesmentsObject?.resumeVacTherapyDate) !== ""
          ? "yes"
          : "no",
      valid: ValidationStatus.UNTOUCHED,
      required: false,
    },
    vacResumeDate: {
      value:
        moment(woundAssesmentsObject?.resumeVacTherapyDate).format(
          "MM/DD/YYYY"
        ) ?? "--",
      valid: ValidationStatus.UNTOUCHED,
      required: false,
    },
    resumptionMeasureStatus: {
      value:
        getBlankForNullValue(
          woundAssesmentsObject?.isMeasurementTakenDuringResumption
        ) !== ""
          ? woundAssesmentsObject?.isMeasurementTakenDuringResumption === "Y"
            ? "yes"
            : "no"
          : "--",
      valid: ValidationStatus.UNTOUCHED,
      required: false,
    },
    resumptionMeasureLenght: {
      value: `${woundAssesmentsObject?.resumedMeasurementWoundLength}` ?? "--",
      valid: ValidationStatus.UNTOUCHED,
      required: false,
    },
    resumptionMeasureWidth: {
      value: `${woundAssesmentsObject?.resumedMeasurementWoundWidth}` ?? "--",
      valid: ValidationStatus.UNTOUCHED,
      required: false,
    },
    resumptionMeasureDepth: {
      value: `${woundAssesmentsObject?.resumedMeasurementWoundDepth}` ?? "--",
      valid: ValidationStatus.UNTOUCHED,
      required: false,
    },
    exudateAmount: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(woundAssesmentsObject?.woundExudate) === ""
          ? "--"
          : woundAssesmentsObject?.woundExudate,
    },
    exudateAppearance: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(woundAssesmentsObject?.exudateAppearance) === ""
          ? "--"
          : woundAssesmentsObject?.exudateAppearance,
    },
    // exposed structures
    exposedStructures: {
      valid: ValidationStatus.UNTOUCHED,
      value: exposedStructuresData.map((obj) => {
        if (
          woundAssesmentsObject?.muscelExposed === "Y" &&
          obj.label === "Muscle"
        ) {
          return { ...obj, selected: true };
        }
        if (
          woundAssesmentsObject?.boneExposed === "Y" &&
          obj.label === "Bone"
        ) {
          return { ...obj, selected: true };
        }
        if (
          woundAssesmentsObject?.muscelExposed === "Y" &&
          obj.label === "Tendon"
        ) {
          return { ...obj, selected: true };
        }
        if (
          woundAssesmentsObject?.subcutaneousTissueExposed === "Y" &&
          obj.label === "Subcutaneous Tissue"
        ) {
          return { ...obj, selected: true };
        }
        return obj;
      }),
      required: false,
    },
    // Wound Undermining
    woundUndermining: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(woundAssesmentsObject?.isUnderMiningPresent) !== ""
          ? woundAssesmentsObject?.isUnderMiningPresent === "Y"
            ? "yes"
            : "no"
          : "",
      required: false,
    },
    underminingLocation1Depth: {
      valid: ValidationStatus.UNTOUCHED,
      value: `${woundAssesmentsObject?.underMiningLocation1Size}` ?? "--",
      required: false,
    },
    underminingLocation1PositionFrom: {
      valid: ValidationStatus.UNTOUCHED,
      value: woundAssesmentsObject?.underMiningLocation1From ?? "--",
      required: false,
    },
    underminingLocation1PositionTo: {
      valid: ValidationStatus.UNTOUCHED,
      value: woundAssesmentsObject?.underMiningLocation1To ?? "--",
      required: false,
    },
    underminingLocation2Depth: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(
          woundAssesmentsObject?.underMiningLocation2Size
        ) === ""
          ? "--"
          : woundAssesmentsObject?.underMiningLocation2Size?.toString(),
      required: false,
    },
    underminingLocation2PositionFrom: {
      valid: ValidationStatus.UNTOUCHED,
      value: woundAssesmentsObject?.underMiningLocation2From ?? "--",
      required: false,
    },
    underminingLocation2PositionTo: {
      valid: ValidationStatus.UNTOUCHED,
      value: woundAssesmentsObject?.underMiningLocation2To ?? "--",
      required: false,
    },
    // woundbed
    granulationValue: {
      valid: ValidationStatus.UNTOUCHED,
      value: `${woundAssesmentsObject?.woundDescriptionBeefyRed}` ?? "0",
      required: false,
    },
    epthilizationValue: {
      valid: ValidationStatus.UNTOUCHED,
      value: `${woundAssesmentsObject?.woundDescriptionDullPink}` ?? "0",
      required: false,
    },
    sloughValue: {
      valid: ValidationStatus.UNTOUCHED,
      value: `${woundAssesmentsObject?.woundDescriptionWhite}` ?? "0",
      required: false,
    },
    escharValue: {
      valid: ValidationStatus.UNTOUCHED,
      value: `${woundAssesmentsObject?.woundDescriptionBlackEschar}` ?? "0",
      required: false,
    },
    woundBedTotal: {
      valid: ValidationStatus.UNTOUCHED,
      value: "100",
      required: false,
    },
    // woundTunneling
    woundTunneling: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(woundAssesmentsObject?.isTunnelingPresent) !== ""
          ? woundAssesmentsObject?.isTunnelingPresent === "Y"
            ? "Yes"
            : "no"
          : "",
      required: false,
    },
    location1Depth: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(woundAssesmentsObject?.tunnelingLength1) === ""
          ? "--"
          : `${woundAssesmentsObject?.tunnelingLength1}`,
      required: false,
    },
    location1Position: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(woundAssesmentsObject?.tunnelingLocation1) === ""
          ? "--"
          : woundAssesmentsObject?.tunnelingLocation1,
      required: false,
    },
    location2Depth: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(woundAssesmentsObject?.tunnelingLength2) === ""
          ? "--"
          : `${woundAssesmentsObject?.tunnelingLength2}`,
      required: false,
    },
    location2Position: {
      valid: ValidationStatus.UNTOUCHED,
      value:
        getBlankForNullValue(woundAssesmentsObject?.tunnelingLocation2) === ""
          ? "--"
          : woundAssesmentsObject?.tunnelingLocation2,
      required: false,
    },
    woundAssessComorbodities: {
      valid: ValidationStatus.UNTOUCHED,
      value: getComorboditiesData(woundAssesmentsObject?.comorbidities),

      required: false,
    },
  };

  return woundAssesmentSummaryData;
};

const getComorboditiesData = (comorbiditiesData: any) => {
  if (comorbiditiesData && comorbiditiesData.length > 0) {
    let valueObyArry: MultipleActionsProps[] = [];
    comorbiditiesData.forEach((obj: any) => {
      let valueObj = {
        value: obj,
        label: obj,
        selected: true,
      };
      valueObyArry.push(valueObj);
    });
    return valueObyArry;
  }
  return comorbiditiesData;
};
