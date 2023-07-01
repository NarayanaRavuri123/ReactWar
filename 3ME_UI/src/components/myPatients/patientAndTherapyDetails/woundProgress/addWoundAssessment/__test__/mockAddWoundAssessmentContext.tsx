import { WoundAssessmentContextType } from "../../../../../../context/WoundAssessmentContext";
import { WoundAssessmentPageSection } from "../woundAssessmentPageSection.enum";
import { IAddWoundAssessment } from "../addWoundAssessment.interface";
import {
  IInputField,
  ValidationStatus,
  MultiCheckbox,
} from "../../../../../../core/interfaces/input.interface";
import { IDropZoneDocumentSelect } from "../../../../../../core/customDropZone/dropZoneDocumentSelect.interface";
import { IAttestationAndSign } from "../../../../../../core/attestationAndSignature/attestationAndSign.interface";
const mockInputFields = (): IInputField => ({
  valid: ValidationStatus.UNTOUCHED,
  value: "",
});
const MultiCheckboxField = (): MultiCheckbox => {
  return {
    value: "",
    valid: ValidationStatus.VALID,
    required: true,
    defaultRequired: true,
  };
};
const mockResponse = (): IAddWoundAssessment => {
  return {
    patientFirstName: mockInputFields(),
    patientLastName: mockInputFields(),
    woundType: mockInputFields(),
    woundLocation: mockInputFields(),
    woundDirection: mockInputFields(),
    woundOrientation: mockInputFields(),
    dateOfBirth: mockInputFields(),
    rentalOrderNumber: mockInputFields(),
    productName: mockInputFields(),
    placementDate: mockInputFields(),
    assessmentType: mockInputFields(),
    previousEvaluationDate: mockInputFields(),
    previousWoundLength: mockInputFields(),
    previousWoundWidth: mockInputFields(),
    previousWoundDepth: mockInputFields(),
    // Wound Assessment Data Range
    woundAssessmentDateTo: mockInputFields(),
    woundAssessmentDateFrom: mockInputFields(),
    // Wound Assessment Therapy Status
    woundTherapyStatus: mockInputFields(),
    woundDiscontinuedDate: mockInputFields(),
    woundDiscontinuedReason: mockInputFields(),
    //WoundAssessor
    woundAssessorStatus: mockInputFields(),
    woundAssessorName: mockInputFields(),
    woundAssessorFacilityName: mockInputFields(),
    woundAssessorPhoneNumber: mockInputFields(),
    woundAssessorLicenseType: mockInputFields(),
    // Wound Measurement
    woundMeasurementTaken: mockInputFields(),
    woundMeasurementDate: mockInputFields(),
    woundMeasurementLenght: mockInputFields(),
    woundMeasurementWidth: mockInputFields(),
    woundMeasurementDepth: mockInputFields(),
    //Additional Notes
    provideAdditionalWoundInfo: mockInputFields(),
    //Eschar
    woundEscharStatus: mockInputFields(),
    //Debridement
    woundDebridementStatus: mockInputFields(),
    woundDebridementType: mockInputFields(),
    woundDebridementDate: mockInputFields(),
    // Infection
    woundInfectionInLast30Days: mockInputFields(),
    selectedInfectionType: mockInputFields(),
    selectedInfectionTypeOther: mockInputFields(),
    treatmentRegimen: mockInputFields(),
    // Holds Or Hospitalization
    vacTherapyBeenHold: mockInputFields(),
    vacHoldStartDate: mockInputFields(),
    vacHoldReason: mockInputFields(),
    vacResumeStatus: mockInputFields(),
    vacResumeDate: mockInputFields(),
    resumptionMeasureStatus: mockInputFields(),
    resumptionMeasureLenght: mockInputFields(),
    resumptionMeasureWidth: mockInputFields(),
    resumptionMeasureDepth: mockInputFields(),
    // Exudate
    exudateAmount: mockInputFields(),
    exudateAppearance: mockInputFields(),
    // exposed structures
    exposedStructures: MultiCheckboxField(),
    // woundbed
    granulationValue: mockInputFields(),
    epthilizationValue: mockInputFields(),
    sloughValue: mockInputFields(),
    escharValue: mockInputFields(),
    woundBedTotal: mockInputFields(),
    //wound undermining
    woundUndermining: mockInputFields(),
    underminingLocation1Depth: mockInputFields(),
    underminingLocation1PositionFrom: mockInputFields(),
    underminingLocation1PositionTo: mockInputFields(),
    underminingLocation2Depth: mockInputFields(),
    underminingLocation2PositionFrom: mockInputFields(),
    underminingLocation2PositionTo: mockInputFields(),
    woundAssessComorbodities: MultiCheckboxField(),
    woundTunneling: MultiCheckboxField(),
    location1Depth: MultiCheckboxField(),
    location1Position: MultiCheckboxField(),
    location2Depth: MultiCheckboxField(),
    location2Position: MultiCheckboxField(),
    woundID: mockInputFields(),
  };
};
const mockDropZoneSelect = (): IDropZoneDocumentSelect[] => {
  return [
    {
      documentName: "",
      documentBase64: "",
      succeeded: true,
      errorMessage: "",
      documentId: "",
      isFetchingBase64: true,
    },
  ];
};
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

export const mockWoundAssessmentData = (): WoundAssessmentContextType => {
  return {
    addWoundAssessment: mockResponse(),
    setAddWoundAssessment: () => {},
    woundImagesUpload: mockDropZoneSelect(),
    setwoundImagesUpload: () => {},
    woundDocsUpload: mockDropZoneSelect(),
    setwoundDocsUpload: () => {},
    resetAddWoundAssessmentData: () => {},
    errorInImgUploadFiles: false,
    setErrorInImgUploadFiles: () => {},
    errorInDocUploadFiles: false,
    setErrorInDocUploadFiles: () => {},
    woundAssessmentPageSection:
      WoundAssessmentPageSection.WOUND_ASSESSMENT_REVIEW,
    setWoundAssessmentPageSection: () => {},
    woundAssessmentPageTitle: "",
    setWoundAssessmentPageTitle: () => {},
    woundAssessmentProgress: 50,
    setWoundAssessmentProgress: () => {},
    directToWoundAssessment: false,
    setDirectToWoundAssessment: () => {},
    isBackFromWoundPage: false,
    setIsBackFromWoundPage: () => {},
    showDialogWA: true,
    setShowDialogWA: () => {},
    WAPage: WoundAssessmentPageSection.WOUND_ASSESSMENT_REVIEW,
    setWAPage: () => {},
    isHandleChangeTriggered: false,
    setIsHandleChangeTriggered: () => {},
    woundAssessAttestation: mockSignAndAttestaion(),
    setWoundAssessAttestation: () => {},
    scrollableComponentClassName: "",
    setScrollableComponentClassName: () => {},
    saveWoundAssessmentLoader: true,
    setSaveWoundAssessmentLoader: () => {},
    deletedWoundImagesDocuments: [],
    setDeletedWoundImagesDocuments: () => {},
    deletedWoundDocuments: [],
    setDeletedWoundDocuments: () => {},
    guid: "",
    setGuid: () => {},
  };
};
