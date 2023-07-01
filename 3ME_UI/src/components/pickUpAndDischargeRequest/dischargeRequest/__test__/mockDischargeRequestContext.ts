import { DischargeRequestContextType } from "../../../../context/DischargeRequestContext";
import { IAttestationAndSign } from "../../../../core/attestationAndSignature/attestationAndSign.interface";
import {
  IInputField,
  ValidationStatus,
} from "../../../../core/interfaces/input.interface";
import { IDischargeRequest } from "../dischargeRequest.interface";
import { DischargeRequestionPageSection } from "../dischargeRequestPageSection.enum";
import {
  therapyGoalsAchieved,
  therapyGoalsNotAchieved,
} from "../therapyOutcomes/therapyOutcomesData";
const mockInputFields = (): IInputField => {
  return {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
    errorMessage: "",
    isDefaultValid: false,
  };
};
const mockData = (): IDischargeRequest => ({
  submitterFirstName: mockInputFields(),
  submitterLastName: mockInputFields(),
  submitterEmployer: mockInputFields(),
  submitterPhoneNumber: mockInputFields(),
  submitterTitle: mockInputFields(),
  patientAdmissionType: {
    value: "yes",
    valid: ValidationStatus.VALID,
  },
  patientAdmissionInfo: mockInputFields(),
  TypeOfFacility: mockInputFields(),
  AdmissionScheduleInfo: mockInputFields(),
  AdmissionWoundInfo: mockInputFields(),
  facilityname: mockInputFields(),
  patientDied: mockInputFields(),
  woundFinalMeasurementDate1: mockInputFields(),
  woundFinalMeasurementDate2: mockInputFields(),
  woundMeasurementDepth1: mockInputFields(),
  woundMeasurementDepth2: mockInputFields(),
  woundMeasurementLenght1: mockInputFields(),
  woundMeasurementLenght2: mockInputFields(),
  woundMeasurementWidth1: mockInputFields(),
  woundMeasurementWidth2: mockInputFields(),
  therapyGoalsAchieved: {
    valid: ValidationStatus.UNTOUCHED,
    value: therapyGoalsAchieved,
    required: false,
  },
  therapyGoalsNotAchieved: {
    valid: ValidationStatus.UNTOUCHED,
    value: therapyGoalsNotAchieved,
    required: false,
  },
});

const mockSignAndAttestaion = (): IAttestationAndSign => {
  return {
    firstNameLastName: {
      value: "",
      valid: ValidationStatus.VALID,
      required: true,
      minimumRequired: true,
      errorMessage: null,
      isDefaultValid: true,
      isOptional: true,
    },
    employer: {
      value: "",
      valid: ValidationStatus.VALID,
      required: true,
      minimumRequired: true,
      errorMessage: null,
      isDefaultValid: true,
      isOptional: true,
    },
    phoneNumber: {
      value: "",
      valid: ValidationStatus.VALID,
      required: true,
      minimumRequired: true,
      errorMessage: null,
      isDefaultValid: true,
      isOptional: true,
    },
    confirmationData: {
      value: "",
      valid: ValidationStatus.VALID,
      required: true,
      minimumRequired: true,
      errorMessage: null,
      isDefaultValid: true,
      isOptional: true,
    },
    _3MRepresentativeName: {
      value: "",
      valid: ValidationStatus.VALID,
      required: true,
      minimumRequired: true,
      errorMessage: null,
      isDefaultValid: true,
      isOptional: true,
    },
    attestationDate: {
      value: "",
      valid: ValidationStatus.VALID,
      required: true,
      minimumRequired: true,
      errorMessage: null,
      isDefaultValid: true,
      isOptional: true,
    },
  };
};

const mockWoundInfoDetails = {
  wounds: [
    {
      id: 8457177,
      type: "Pressure Ulcer - Stage four",
      location: "Buttock",
      orientation: null,
      direction: "001",
      evaluationDate: "2023-04-17T00:00:00",
      length: 4.0,
      width: 3.7,
      depth: 1.4,
      therapyResumptionDate: null,
      therapyHoldDate: null,
    },
    {
      id: 8457177,
      type: "Pressure Ulcer - Stage five",
      location: "Buttock 2",
      orientation: null,
      direction: "001",
      evaluationDate: "2023-04-18T00:00:00",
      length: 4.0,
      width: 3.7,
      depth: 1.4,
      therapyResumptionDate: null,
      therapyHoldDate: null,
    },
  ],
};

export const getMockDischargeRequestContextData = (
  setPageSection?: any
): DischargeRequestContextType => {
  return {
    dischargeRequestData: mockData(),
    setDischargeRequestData: () => {},
    resetData: () => {},
    patientAdmissionTypeActive: false,
    setPatientAdmissionTypeActive: () => {},
    dischargeRequestDocuments: [],
    setDischargeRequestDocuments: () => {},
    deletedDischargeRequestDocuments: [],
    setDeletedDischargeRequestDocuments: () => {},
    isHandleChangeTriggered: false,
    setIsHandleChangeTriggered: () => {},
    errorInUploadFiles: false,
    setErrorInUploadFiles: () => {},
    dischargeRequestPageSection:
      DischargeRequestionPageSection.DISCHARGE_REQUEST_FORM,
    setDischargeRequestPageSection: setPageSection,
    scrollableDischargeComponentClassName: "",
    setScrollableDischargeComponentClassName: () => {},
    isPreviousClicked: false,
    setIsPreviousClicked: () => {},
    dischargeReqAttestation: mockSignAndAttestaion(),
    setDischargeReqAttestation: () => {},
    setWoundInfoDetails: () => {},
    woundInfoDetails: mockWoundInfoDetails,
    pdfUrls: [],
    setPdfUrls: () => {},
  };
};
