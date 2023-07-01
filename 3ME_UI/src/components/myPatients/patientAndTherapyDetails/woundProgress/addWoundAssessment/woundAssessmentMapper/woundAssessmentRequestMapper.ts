import { format } from "react-string-format";
import { WoundAssessmentContextType } from "../../../../../../context/WoundAssessmentContext";
import { ValidationStatus } from "../../../../../../core/interfaces/input.interface";
import { getdropDownContent } from "../../../../../../util/dropDownService";
import { DD_WOUND_TYPE } from "../../../../../../util/staticText";
import {
  getCodeFromText,
  makeCapitalEachWordInString,
} from "../../../../../../util/utilityFunctions";
import { IAddWoundAssessment } from "../addWoundAssessment.interface";
import { IWoundAssessmentRequest } from "./woundAssessmentRequest.interface";
import moment from "moment";
import { getPatientAddresses } from "../../../../../../util/3meService";

export const mapWoundAssessmentRequestObj = async (
  woundAssessmentContextObj: WoundAssessmentContextType,
  isSalesRole: boolean,
  woundImagesDocID: any[],
  woundDocID: any[],
  siteUseIdData: string,
  facilityName: string
) => {
  let woundTypeList;
  let patientZip;
  let WAData = woundAssessmentContextObj.addWoundAssessment!;
  let WAAttestationData = woundAssessmentContextObj.woundAssessAttestation!;

  try {
    const reqParams = {
      RentalOrderNumber: WAData.rentalOrderNumber.value,
      DOB: moment(WAData.dateOfBirth.value).format("MM/DD/yyyy"),
    };
    const response = await getPatientAddresses(reqParams);
    if (response.succeeded) {
      patientZip = response.item.permanentAddress.zipCode;
    }
  } catch (error) {
    console.log("error", error);
  }

  try {
    const ddContent = format("{0}", DD_WOUND_TYPE);
    const data = await getdropDownContent(ddContent);
    if (data.items.length > 0) {
      const woundTypesObject = data.items.filter(
        (item: { name: string }) => item.name === DD_WOUND_TYPE
      );
      const woundTypesData = woundTypesObject[0].data.sort(
        (a: { order: number }, b: { order: number }) =>
          a.order > b.order ? 1 : -1
      );
      woundTypeList = woundTypesData;
    }
  } catch (error) {
    console.log("error", error);
  }

  let requestBody: IWoundAssessmentRequest;
  requestBody = {
    providerFacilityName: facilityName,
    patientLastName: WAData.patientLastName.value,
    patientFirstName: WAData.patientFirstName.value,
    patientDOB: formatISODate(
      WAData.dateOfBirth.value,
      WAData.dateOfBirth.valid
    ),
    patientZipCode: patientZip,
    patientRentalOrderNo: WAData.rentalOrderNumber.value,
    vacSerialNo: WAData.productName.value,
    DiscontinuationDate: formatISODate(
      WAData.woundDiscontinuedDate.value,
      WAData.woundDiscontinuedDate.valid
    ),
    DiscontinuationReason: WAData.woundDiscontinuedReason.value,
    holdDate: formatISODate(
      WAData.vacHoldStartDate.value,
      WAData.vacHoldStartDate.valid
    ),
    holdReason: WAData.vacHoldReason.value,
    resumeDate: formatISODate(
      WAData.vacResumeDate.value,
      WAData.vacResumeDate.valid
    ),
    woundDetail: {
      woundID: Number(WAData.woundID.value),
      woundType: Number(
        getCodeFromText(woundTypeList, WAData.woundType.value).toString()
      ),
      location: WAData.woundLocation.value,
      orientation: WAData.woundOrientation.value,
      direction: WAData.woundDirection.value,
      escharPresent: checkBooleanValue(WAData.woundEscharStatus.value),
      debridementDone: checkBooleanValue(WAData.woundDebridementStatus.value),
      debridementDate: formatISODate(
        WAData.woundDebridementDate.value,
        WAData.woundDebridementDate.valid
      ),
      debridementType:
        WAData.woundDebridementStatus.value.toLocaleLowerCase() === "yes"
          ? WAData.woundDebridementType.value
          : null,
      measurementDate:
        WAData.woundMeasurementDate.value !== ""
          ? formatISODate(
              WAData.woundMeasurementDate.value,
              WAData.woundMeasurementDate.valid
            )
          : formatISODate(
              moment().format("MM/DD/YYYY").toString(),
              ValidationStatus.VALID
            ),
      length: checkFloatValue(WAData.woundMeasurementLenght.value),
      width: checkFloatValue(WAData.woundMeasurementWidth.value),
      depth: checkFloatValue(WAData.woundMeasurementDepth.value),
      underminingPresent: checkBooleanValue(WAData.woundUndermining.value),
      underminingLocation1:
        WAData.woundUndermining.value.toLowerCase() === "yes"
          ? {
              depth: checkFloatValue(WAData.underminingLocation1Depth.value),
              areaFrom: Number(
                WAData.underminingLocation1PositionFrom.value.split(":")[0]
              ),
              areaTo: Number(
                WAData.underminingLocation1PositionTo.value.split(":")[0]
              ),
            }
          : null,
      underminingLocation2:
        WAData.underminingLocation2Depth.value !== ""
          ? {
              depth: checkFloatValue(WAData.underminingLocation2Depth.value),
              areaFrom: Number(
                WAData.underminingLocation2PositionFrom.value.split(":")[0]
              ),
              areaTo: Number(
                WAData.underminingLocation2PositionTo.value.split(":")[0]
              ),
            }
          : null,
      tunnelingPresent: checkBooleanValue(WAData.woundTunneling.value),
      tunnelingLocation1: {
        depth: checkFloatValue(WAData.location1Depth.value),
        area:
          WAData.woundTunneling.value.toLowerCase() === "yes"
            ? Number(WAData.location1Position.value.split(":")[0]).toString()
            : null,
      },
      tunnelingLocation2:
        WAData.location2Depth.value !== ""
          ? {
              depth: checkFloatValue(WAData.location2Depth.value),
              area:
                WAData.woundTunneling.value.toLowerCase() === "yes"
                  ? Number(
                      WAData.location2Position.value.split(":")[0]
                    ).toString()
                  : null,
            }
          : null,
      brightRedTissue:
        WAData.granulationValue.value !== ""
          ? parseInt(WAData.granulationValue.value.substring(3, 6))
          : null,
      dullTissue:
        WAData.epthilizationValue.value !== ""
          ? parseInt(WAData.epthilizationValue.value.substring(3, 6))
          : null,
      whiteTissue:
        WAData.sloughValue.value !== ""
          ? parseInt(WAData.sloughValue.value.substring(3, 6))
          : null,
      blackEschar:
        WAData.escharValue.value !== ""
          ? parseInt(WAData.escharValue.value.substring(3, 6))
          : null,
      bedTotal: parseInt(WAData.woundBedTotal.value),
      exudateAmount:
        WAData.exudateAmount.value === "" ? null : WAData.exudateAmount.value,
      exudateAppearance:
        WAData.exudateAppearance.value === ""
          ? null
          : WAData.exudateAppearance.value,
      tissueExposed: getExposedStructure(WAData, "Subcutaneous Tissue"),
      muscleExposed: getExposedStructure(WAData, "Muscle"),
      tendonExposed: getExposedStructure(WAData, "Tendon"),
      boneExposed: getExposedStructure(WAData, "Bone"),
      InfectionPresent: checkBooleanValue(
        WAData.woundInfectionInLast30Days.value
      ),
      InfectionType:
        WAData.selectedInfectionType.value.toLowerCase() === "other"
          ? `${WAData.selectedInfectionType.value} : ${WAData.selectedInfectionTypeOther.value}`
          : WAData.selectedInfectionType.value,
      InfectionIndicateTreatmentRegime: getInfectionTreatmentRegimen(WAData),
      IsMeasurementsPresent: checkBooleanValue(
        WAData.woundMeasurementTaken.value
      ),
    },
    isTherapyInUse: checkBooleanValue(WAData.woundTherapyStatus.value),
    isVACTherapyOnHold: checkBooleanValue(WAData.vacTherapyBeenHold.value),
    isVACTherapyResumed: checkBooleanValue(WAData.vacResumeStatus.value),
    assessmentType: WAData.assessmentType.value,
    cycleDateRangeFrom: formatISODate(
      WAData.woundAssessmentDateFrom.value,
      WAData.woundAssessmentDateFrom.valid
    ),
    cycleDateRangeTo: formatISODate(
      WAData.woundAssessmentDateTo.value,
      WAData.woundAssessmentDateTo.valid
    ),
    resumedWoundLength: checkFloatValue(WAData.resumptionMeasureLenght.value),
    resumedWoundWidth: checkFloatValue(WAData.resumptionMeasureWidth.value),
    resumedWoundDepth: checkFloatValue(WAData.resumptionMeasureDepth.value),
    comorbidities: getComorbiditiesData(WAData),
    otherComorbidities: "",
    performAssessmentBySomeOne: checkBooleanValue(
      WAData.woundAssessorStatus.value
    ),
    woundAssessor: WAData.woundAssessorName.value,
    notes: WAData.provideAdditionalWoundInfo.value,
    woundAssessorLicenseType: WAData.woundAssessorLicenseType.value,
    woundAssessorFacilityName: WAData.woundAssessorFacilityName.value,
    woundAssessorPhoneNumber: formatPhoneNumber(
      WAData.woundAssessorPhoneNumber.value
    ),
    documentIds: woundDocID,
    Images: woundImagesDocID,
    IsMeasurementTakenDuringResumption: checkBooleanValue(
      WAData.resumptionMeasureStatus.value
    ),
    SignatureName: isSalesRole
      ? WAAttestationData._3MRepresentativeName.value
      : "",
    Attestation: {
      Name: isSalesRole
        ? WAAttestationData.firstNameLastName.value
        : WAAttestationData._3MRepresentativeName.value,
      Employer: isSalesRole ? WAAttestationData.employer.value : "",
      PhoneNumber: isSalesRole
        ? formatPhoneNumber(WAAttestationData.phoneNumber.value)
        : "",
      ConfirmationDate: isSalesRole
        ? formatISODate(
            WAAttestationData.confirmationData.value,
            ValidationStatus.VALID
          )
        : null,
    },
    SiteUseId: siteUseIdData ?? "",
  };
  return requestBody;
};

const formatISODate = (value: string, valid: string) => {
  if (
    value === "" ||
    value === null ||
    value === "Invalid date" ||
    valid !== ValidationStatus.VALID
  ) {
    return null;
  } else {
    let datestring = null;
    if (value && value.includes("T")) {
      return value;
    } else {
      datestring = value + " 00:00 UTC";
    }
    const event = new Date(datestring);
    return event.toISOString();
  }
};

const checkBooleanValue = (value: string) => {
  return value.toLowerCase() === "yes"
    ? true
    : value.toLowerCase() === "no"
    ? false
    : null;
};
const checkFloatValue = (value: string) => {
  if (value === "") {
    return null;
  } else {
    return parseFloat(value);
  }
};

const formatPhoneNumber = (inputNumber: any) => {
  if (inputNumber === null || inputNumber === "") {
    return null;
  }
  return inputNumber.replace(/[^0-9]/g, "");
};

const getExposedStructure = (
  addWoundAssessmentData: IAddWoundAssessment,
  key: string
) => {
  let checkValue = null;
  addWoundAssessmentData.exposedStructures.value.map((element: any) => {
    if (element.label === key && element.selected) {
      checkValue = true;
    }
  });
  return checkValue;
};
const getInfectionTreatmentRegimen = (data: IAddWoundAssessment) => {
  const selectedValues = data?.treatmentRegimen.value.filter(
    (x: any) => x.selected
  );
  let values = selectedValues.map((x: any) => {
    if (x.selected === true) {
      if (
        x.textBoxLabel === "antibiotic" ||
        x.textBoxLabel === "ivantibiotics"
      ) {
        return `${x.label} : ${makeCapitalEachWordInString(x.textBoxValue)}`;
      } else {
        return x.label;
      }
    }
  });
  return values.join(", ").replace(/,(\s+)?$/, "");
};

const getComorbiditiesData = (data: IAddWoundAssessment) => {
  const selectedValues = data?.woundAssessComorbodities.value.filter(
    (x: any) => x.selected
  );
  let values = selectedValues.map((x: any) => {
    if (x.selected === true) {
      return x.label;
    }
  });
  return values.join(", ").replace(/,(\s+)?$/, "");
};
