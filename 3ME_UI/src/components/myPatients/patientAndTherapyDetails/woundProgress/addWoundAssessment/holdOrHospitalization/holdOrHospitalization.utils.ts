import { ValidationStatus } from "../../../../../../core/interfaces/input.interface";
import { IAddWoundAssessment } from "../addWoundAssessment.interface";
import { WoundAssessmentType } from "../woundAssessmentPageSection.enum";

export const holdOrHospitalizationYesReset = (
  data: IAddWoundAssessment,
  setData: React.Dispatch<React.SetStateAction<IAddWoundAssessment>>
) => {
  let tempData: IAddWoundAssessment = {
    ...data,
    vacTherapyBeenHold: {
      value: "yes",
      valid: ValidationStatus.VALID,
      required: true,
    },
    vacHoldStartDate: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: true,
    },
    vacHoldReason: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: true,
    },
    vacResumeStatus: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: true,
    },
    vacResumeDate: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: false,
    },
    resumptionMeasureStatus: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: false,
    },
    resumptionMeasureLenght: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: false,
    },
    resumptionMeasureWidth: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: false,
    },
    resumptionMeasureDepth: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: false,
    },
  };
  setData(tempData);
};

export const holdOrHospitalizationNoReset = (
  data: IAddWoundAssessment,
  setData: React.Dispatch<React.SetStateAction<IAddWoundAssessment>>
) => {
  let tempData: IAddWoundAssessment = {
    ...data,
    vacTherapyBeenHold: {
      value: "no",
      valid: ValidationStatus.VALID,
      required: true,
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
    vacResumeStatus: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: false,
    },
    vacResumeDate: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: false,
    },
    resumptionMeasureStatus: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: false,
    },
    resumptionMeasureLenght: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: false,
    },
    resumptionMeasureWidth: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: false,
    },
    resumptionMeasureDepth: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: false,
    },
  };
  setData(tempData);
};

export const vacResumeStatusYesReset = (
  data: IAddWoundAssessment,
  setData: React.Dispatch<React.SetStateAction<IAddWoundAssessment>>
) => {
  let tempData: IAddWoundAssessment = {
    ...data,
    vacResumeStatus: {
      value: "yes",
      valid: ValidationStatus.VALID,
      required: true,
    },
    vacResumeDate: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: true,
    },
    resumptionMeasureStatus: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: true,
    },
  };
  setData(tempData);
};

export const vacResumeStatusNoReset = (
  data: IAddWoundAssessment,
  setData: React.Dispatch<React.SetStateAction<IAddWoundAssessment>>
) => {
  let tempData: IAddWoundAssessment = {
    ...data,
    vacResumeStatus: {
      value: "no",
      valid: ValidationStatus.VALID,
      required: true,
    },
    vacResumeDate: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: false,
    },
    resumptionMeasureStatus: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: false,
    },
  };
  setData(tempData);
};

export const resumptionMeasureStatusYesReset = (
  data: IAddWoundAssessment,
  setData: React.Dispatch<React.SetStateAction<IAddWoundAssessment>>
) => {
  let isMWP =
    data.assessmentType.value === WoundAssessmentType.MWP ? true : false;
  let tempData: IAddWoundAssessment = {
    ...data,
    resumptionMeasureStatus: {
      value: "yes",
      valid: ValidationStatus.VALID,
      required: true,
    },
    resumptionMeasureLenght: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: true,
    },
    resumptionMeasureWidth: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: true,
    },
    resumptionMeasureDepth: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: true,
    },
    woundDebridementStatus: {
      value: isMWP ? "" : data.woundDebridementStatus.value,
      valid: isMWP
        ? ValidationStatus.UNTOUCHED
        : data.woundDebridementStatus.valid,
      required: isMWP ? true : data.woundDebridementStatus.required,
    },
  };
  setData(tempData);
};

export const resumptionMeasureStatusNoReset = (
  data: IAddWoundAssessment,
  setData: React.Dispatch<React.SetStateAction<IAddWoundAssessment>>
) => {
  let isMWP =
    data.assessmentType.value === WoundAssessmentType.MWP ? true : false;
  let tempData: IAddWoundAssessment = {
    ...data,
    resumptionMeasureStatus: {
      value: "no",
      valid: ValidationStatus.VALID,
      required: true,
    },
    resumptionMeasureLenght: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: false,
    },
    resumptionMeasureWidth: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: false,
    },
    resumptionMeasureDepth: {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: false,
    },
    woundDebridementStatus: {
      value: isMWP ? "" : data.woundDebridementStatus.value,
      valid: isMWP
        ? ValidationStatus.UNTOUCHED
        : data.woundDebridementStatus.valid,
      required: isMWP ? false : true,
    },
    woundDebridementDate: {
      value: isMWP ? "" : data.woundDebridementDate.value,
      valid: isMWP
        ? ValidationStatus.UNTOUCHED
        : data.woundDebridementDate.valid,
      required: isMWP ? false : true,
    },
    woundDebridementType: {
      value: isMWP ? "" : data.woundDebridementType.value,
      valid: isMWP
        ? ValidationStatus.UNTOUCHED
        : data.woundDebridementType.valid,
      required: isMWP ? false : true,
    },
  };
  setData(tempData);
};
