import { ValidationStatus } from "../../../../../core/interfaces/input.interface";
import { getDeepClone } from "../../../../../util/ObjectFunctions";
import { exposedStructuresData } from "../../../../newOrder/exposedStructures/exposedStructures.data";
import { IAddWoundAssessment } from "./addWoundAssessment.interface";
import { woundAssessComorboditiesData } from "./woundAssessComorbidities/woundAssessComorbodities.data";
import { treatmentRegimenData } from "./woundAssessmentInfection/woundInfection.data";
import { WoundAssessmentType } from "./woundAssessmentPageSection.enum";

export const woundTherapyStatusYesReset = (
  data: IAddWoundAssessment,
  setData: React.Dispatch<React.SetStateAction<IAddWoundAssessment>>
) => {
  let tempData: IAddWoundAssessment = {
    ...data,
    woundTherapyStatus: {
      value: "yes",
      valid: ValidationStatus.VALID,
      required: true,
    },
    woundDiscontinuedDate: {
      value: "",
      valid: ValidationStatus.VALID,
      required: false,
    },
    woundDiscontinuedReason: {
      value: "",
      valid: ValidationStatus.VALID,
      required: false,
    },
    woundMeasurementTaken: {
      value: "yes",
      valid: ValidationStatus.VALID,
      required: true,
    },
    woundMeasurementDate: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: true,
    },
    woundMeasurementLenght: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: true,
    },
    woundMeasurementDepth: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: true,
    },
    woundMeasurementWidth: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: true,
    },
    woundAssessorStatus: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: true,
    },
    woundEscharStatus: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: true,
    },
    woundDebridementStatus: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required:
        data.assessmentType.value !== WoundAssessmentType.MWP ? true : false,
    },
    woundInfectionInLast30Days: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: true,
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
      value: getDeepClone(treatmentRegimenData),
      valid: ValidationStatus.UNTOUCHED,
      required: false,
    },
    vacTherapyBeenHold: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: true,
    },
    exudateAmount: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required:
        data.assessmentType.value !== WoundAssessmentType.MWP ? true : false,
    },
    exudateAppearance: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: false,
    },
    exposedStructures: {
      value: getDeepClone(exposedStructuresData),
      valid: ValidationStatus.UNTOUCHED,
      required: false,
    },
    woundUndermining: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: data.assessmentType.value !== WoundAssessmentType.MWP,
    },
    woundTunneling: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: data.assessmentType.value !== WoundAssessmentType.MWP,
    },
    granulationValue: {
      valid: ValidationStatus.UNTOUCHED,
      value: "",
      required: false,
    },
    epthilizationValue: {
      valid: ValidationStatus.UNTOUCHED,
      value: "",
      required: false,
    },
    sloughValue: {
      valid: ValidationStatus.UNTOUCHED,
      value: "",
      required: false,
    },
    escharValue: {
      valid: ValidationStatus.UNTOUCHED,
      value: "",
      required: false,
    },
    woundBedTotal: {
      valid: ValidationStatus.UNTOUCHED,
      value: "",
      required: data.assessmentType.value !== WoundAssessmentType.MWP,
    },
    woundAssessComorbodities: {
      valid: ValidationStatus.UNTOUCHED,
      value: getDeepClone(woundAssessComorboditiesData),
      required: data.assessmentType.value !== WoundAssessmentType.MWP,
    },
  };
  resetWoundUndermining(tempData, setData, false);
};

export const woundTherapyStatusNoReset = (
  data: IAddWoundAssessment,
  setData: React.Dispatch<React.SetStateAction<IAddWoundAssessment>>
) => {
  let tempData: IAddWoundAssessment = {
    ...data,
    woundTherapyStatus: {
      value: "no",
      valid: ValidationStatus.VALID,
      required: true,
    },
    woundDiscontinuedDate: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: true,
    },
    woundDiscontinuedReason: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: true,
    },
    woundMeasurementTaken: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: true,
    },
    woundMeasurementDate: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: true,
    },
    woundMeasurementLenght: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: true,
    },
    woundMeasurementDepth: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: true,
    },
    woundMeasurementWidth: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: true,
    },
    woundAssessorStatus: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: true,
    },
    woundEscharStatus: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: false,
    },
    woundDebridementStatus: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: false,
    },
    woundDebridementDate: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: false,
    },
    woundDebridementType: {
      value: "",
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
      value: getDeepClone(treatmentRegimenData),
      valid: ValidationStatus.UNTOUCHED,
      required: false,
    },
    vacTherapyBeenHold: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: false,
    },
    vacHoldStartDate: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: false,
    },
    vacHoldReason: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: false,
    },
    exudateAmount: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: false,
    },
    exudateAppearance: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: false,
    },
    exposedStructures: {
      value: getDeepClone(exposedStructuresData),
      valid: ValidationStatus.UNTOUCHED,
      required: false,
    },
    woundUndermining: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: false,
    },
    woundTunneling: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: false,
    },
    granulationValue: {
      valid: ValidationStatus.UNTOUCHED,
      value: "",
      required: false,
    },
    epthilizationValue: {
      valid: ValidationStatus.UNTOUCHED,
      value: "",
      required: false,
    },
    sloughValue: {
      valid: ValidationStatus.UNTOUCHED,
      value: "",
      required: false,
    },
    escharValue: {
      valid: ValidationStatus.UNTOUCHED,
      value: "",
      required: false,
    },
    woundBedTotal: {
      valid: ValidationStatus.UNTOUCHED,
      value: "",
      required: false,
    },
    woundAssessComorbodities: {
      valid: ValidationStatus.UNTOUCHED,
      value: getDeepClone(woundAssessComorboditiesData),
      required: false,
    },
  };
  resetWoundUndermining(tempData, setData, false);
};

export const woundMeasurementTakenYesReset = (
  data: IAddWoundAssessment,
  setData: React.Dispatch<React.SetStateAction<IAddWoundAssessment>>
) => {
  let tempData: IAddWoundAssessment = {
    ...data,
    woundMeasurementTaken: {
      value: "yes",
      valid: ValidationStatus.VALID,
      required: true,
    },
    woundMeasurementDate: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: true,
    },
    woundMeasurementLenght: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: true,
    },
    woundMeasurementDepth: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: true,
    },
    woundMeasurementWidth: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: true,
    },
  };
  setData(tempData);
};

export const woundMeasurementTakenNoReset = (
  data: IAddWoundAssessment,
  setData: React.Dispatch<React.SetStateAction<IAddWoundAssessment>>
) => {
  let tempData: IAddWoundAssessment = {
    ...data,
    woundMeasurementTaken: {
      value: "no",
      valid: ValidationStatus.VALID,
      required: true,
    },
    woundMeasurementDate: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: false,
    },
    woundMeasurementLenght: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: false,
    },
    woundMeasurementDepth: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: false,
    },
    woundMeasurementWidth: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: false,
    },
  };
  setData(tempData);
};

export const updateWoundAssessorStatus = (
  data: IAddWoundAssessment,
  required: boolean,
  setData: React.Dispatch<React.SetStateAction<IAddWoundAssessment>>,
  value: string
) => {
  let tempData: IAddWoundAssessment = {
    ...data,
    woundAssessorStatus: {
      value: value,
      valid: ValidationStatus.VALID,
      required: true,
    },
    woundAssessorName: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: required,
    },
    woundAssessorFacilityName: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: required,
    },
    woundAssessorLicenseType: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: required,
    },
    woundAssessorPhoneNumber: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: required,
    },
  };
  setData(tempData);
};

export const woundAssessInfectionYesReset = (
  data: IAddWoundAssessment,
  setData: React.Dispatch<React.SetStateAction<IAddWoundAssessment>>
) => {
  let tempData: IAddWoundAssessment = {
    ...data,
    woundInfectionInLast30Days: {
      value: "yes",
      valid: ValidationStatus.VALID,
      required: true,
    },
    selectedInfectionType: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: true,
    },
    selectedInfectionTypeOther: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: false,
    },
    treatmentRegimen: {
      value: getDeepClone(treatmentRegimenData),
      valid: ValidationStatus.UNTOUCHED,
      required: true,
    },
  };
  setData(tempData);
};

export const woundAssessInfectionNoReset = (
  data: IAddWoundAssessment,
  setData: React.Dispatch<React.SetStateAction<IAddWoundAssessment>>
) => {
  let tempData: IAddWoundAssessment = {
    ...data,
    woundInfectionInLast30Days: {
      value: "no",
      valid: ValidationStatus.VALID,
      required: true,
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
      value: getDeepClone(treatmentRegimenData),
      valid: ValidationStatus.UNTOUCHED,
      required: false,
    },
  };
  setData(tempData);
};

export const woundDebridementYesReset = (
  data: IAddWoundAssessment,
  setData: React.Dispatch<React.SetStateAction<IAddWoundAssessment>>
) => {
  let tempData: IAddWoundAssessment = {
    ...data,
    woundDebridementStatus: {
      value: "yes",
      valid: ValidationStatus.VALID,
      required: true,
    },
    woundDebridementType: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: true,
    },
    woundDebridementDate: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: true,
    },
  };
  setData(tempData);
};

export const woundDebridementNoReset = (
  data: IAddWoundAssessment,
  setData: React.Dispatch<React.SetStateAction<IAddWoundAssessment>>
) => {
  let tempData: IAddWoundAssessment = {
    ...data,
    woundDebridementStatus: {
      value: "no",
      valid: ValidationStatus.VALID,
      required: true,
    },
    woundDebridementType: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: false,
    },
    woundDebridementDate: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: false,
    },
  };
  setData(tempData);
};

export const resetWoundUndermining = (
  data: IAddWoundAssessment,
  setData: React.Dispatch<React.SetStateAction<IAddWoundAssessment>>,
  requiredStatus: boolean,
  woundUnderminingValue?: string
) => {
  let tempData: IAddWoundAssessment = {
    ...data,
    underminingLocation1Depth: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: requiredStatus,
    },
    underminingLocation1PositionFrom: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: requiredStatus,
    },
    underminingLocation1PositionTo: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: requiredStatus,
    },
    underminingLocation2Depth: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: false,
    },
    underminingLocation2PositionFrom: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: false,
    },
    underminingLocation2PositionTo: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: false,
    },
  };
  if (woundUnderminingValue && woundUnderminingValue !== "") {
    tempData.woundUndermining = {
      value: woundUnderminingValue,
      valid: ValidationStatus.VALID,
      required: true,
    };
  }
  setData(tempData);
};
