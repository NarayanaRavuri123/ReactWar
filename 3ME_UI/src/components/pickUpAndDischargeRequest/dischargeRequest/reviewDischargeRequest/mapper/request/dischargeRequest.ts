import moment from "moment";
import {
  IAttestation,
  IDischargeRequestWound,
  ISaveDischargeRequest,
  ISubmitter,
} from "./dischargeRequest.interface";
import {
  DD_FACILITY_TYPE_CONTENT,
  DD_WOUND_TYPE,
} from "../../../../../../util/staticText";
import { format } from "react-string-format";
import { IPatient } from "../../../../../myPatients/patient.interface";
import { IDischargeRequest } from "../../../dischargeRequest.interface";
import { getPatientAddresses } from "../../../../../../util/3meService";
import {
  formatPhoneNumber,
  getTextFromCode,
} from "../../../../../../util/utilityFunctions";
import { getdropDownContent } from "../../../../../../util/dropDownService";
import { IAttestationAndSign } from "../../../../../../core/attestationAndSignature/attestationAndSign.interface";

export const mapSaveDischargeRequest = async (
  attestationData: IAttestationAndSign,
  dischargeData: IDischargeRequest,
  facilityName: string,
  isSalesRole: boolean,
  patient: IPatient,
  userName: string,
  woundInfoDetails: any
) => {
  let requestBody: ISaveDischargeRequest;
  let facilityType;
  let patientZip: string = "";
  let woundType: any[] = [];
  try {
    const reqParams = {
      RentalOrderNumber: patient.roNumber,
      DOB: moment(patient.dob).format("MM/DD/yyyy"),
    };
    const response = await getPatientAddresses(reqParams);
    if (response.succeeded) {
      patientZip = response.item.permanentAddress.zipCode;
    }
  } catch (error) {
    console.log("error", error);
  }

  try {
    const ddContent = format(
      "{0},{1}",
      DD_FACILITY_TYPE_CONTENT,
      DD_WOUND_TYPE
    );
    const data = await getdropDownContent(ddContent);
    if (data.items.length > 0) {
      const facilityTypeObject = data.items.filter(
        (item: { name: string }) => item.name === DD_FACILITY_TYPE_CONTENT
      );
      facilityType = facilityTypeObject[0].data.sort(
        (a: { order: number }, b: { order: number }) =>
          a.order > b.order ? 1 : -1
      );
      const woundTypeObject = data.items.filter(
        (item: { name: string }) => item.name === DD_WOUND_TYPE
      );
      woundType = woundTypeObject[0].data;
    }
  } catch (error) {
    console.log("error", error);
  }

  const therapyGoalAchieved = dischargeData.therapyGoalsAchieved.value
    .filter((item: any) => item.selected)
    .map((item: any) => item.value)
    .join(",");
  const therapyGoalNotAchieved = dischargeData.therapyGoalsNotAchieved.value
    .filter((item: any) => item.selected)
    .map((item: any) => item.value)
    .join(",");

  const submitter: ISubmitter = {
    FirstName: dischargeData.submitterFirstName.value,
    LastName: dischargeData.submitterLastName.value,
    FacilityName: dischargeData.submitterEmployer.value,
    PhoneNumber: dischargeData.submitterPhoneNumber.value,
    Title: dischargeData.submitterTitle.value,
  };

  let primaryWoundType = woundType.filter(
    (x: { text: string; code: string }) =>
      x.text === woundInfoDetails.wounds[0].type
  )[0];

  const primaryWound: IDischargeRequestWound = {
    IsPrimary: true,
    MeasurementDate: moment(
      dischargeData.woundFinalMeasurementDate1.value
    ).format("YYYY-MM-DD"),
    Length: parseFloat(dischargeData?.woundMeasurementLenght1.value),
    Width: parseFloat(dischargeData?.woundMeasurementWidth1.value),
    Depth: parseFloat(dischargeData?.woundMeasurementDepth1.value),
    WoundID: woundInfoDetails.wounds[0].id,
    WoundType: primaryWoundType.code,
    WoundLocation: woundInfoDetails.wounds[0].location,
    WoundDirection: woundInfoDetails.wounds[0].direction,
    WoundOrientation: woundInfoDetails.wounds[0].orientation,
  };
  let wounds: IDischargeRequestWound[] = [primaryWound];
  if (woundInfoDetails.wounds.length > 1) {
    let secondaryWoundType = woundType.filter(
      (x: { text: string; code: string }) =>
        x.text === woundInfoDetails.wounds[1].type
    )[0];

    const secondaryWound: IDischargeRequestWound = {
      IsPrimary: false,
      MeasurementDate: moment(
        dischargeData.woundFinalMeasurementDate2.value
      ).format("YYYY-MM-DD"),
      Length: parseFloat(dischargeData?.woundMeasurementLenght2.value),
      Width: parseFloat(dischargeData?.woundMeasurementWidth2.value),
      Depth: parseFloat(dischargeData?.woundMeasurementDepth2.value),
      WoundID: woundInfoDetails.wounds[1].id,
      WoundType: secondaryWoundType.code,
      WoundLocation: woundInfoDetails.wounds[1].location,
      WoundDirection: woundInfoDetails.wounds[1].direction,
      WoundOrientation: woundInfoDetails.wounds[1].orientation,
    };
    wounds.push(secondaryWound);
  }
  const attestationDetails: IAttestation = {
    Name: isSalesRole
      ? attestationData.firstNameLastName.value
      : attestationData._3MRepresentativeName.value,
    Employer: isSalesRole ? attestationData.employer.value : "",
    PhoneNumber: isSalesRole
      ? attestationData.phoneNumber.value.replace(/[^0-9]/g, "")
      : "",
    ConfirmationDate: moment().format("YYYY-MM-DD"),
  };
  const patientAdmissionType =
    dischargeData.patientAdmissionType.value.toLowerCase() === "yes";
  requestBody = {
    userName: userName,
    patientFirstName: patient.firstName,
    patientLastName: patient.lastName,
    patientDOB: patient.dob,
    patientZipCode: patientZip,
    patientRentalOrderNo: patient.roNumber.toString(),
    vacSerialNo: patient.productSerialNumber ?? "",

    ProviderFacilityName: facilityName,
    DiscontinuationDate: moment().format("YYYY-MM-DD"),
    Submitter: submitter,

    wounds: wounds,

    TherapyGoalAchieved: therapyGoalAchieved,
    TherapyGoalNotAchieved: therapyGoalNotAchieved,

    IsPatientExpired:
      dischargeData.patientDied.value.toLowerCase() === "yes" ? true : false,
    IsPatientAdmittedToHigherLevelCare: patientAdmissionType,
    IsReadmission: patientAdmissionType
      ? dischargeData.patientAdmissionInfo.value === "Readmission"
        ? true
        : false
      : null,
    AdmittedToFacilityName: dischargeData.facilityname.value,
    AdmittedToFacilityType: getTextFromCode(
      facilityType,
      dischargeData.TypeOfFacility.value
    ),

    IsUnsceduledAdmission: patientAdmissionType
      ? dischargeData.AdmissionScheduleInfo.value === "Unscheduled"
        ? true
        : false
      : null,
    IsAdmissionRelatedToWound: patientAdmissionType
      ? dischargeData.AdmissionWoundInfo.value === "Wound Related"
        ? true
        : false
      : null,

    SignatureName: isSalesRole
      ? attestationData._3MRepresentativeName.value
      : "",
    SignatureOn: moment().format("YYYY-MM-DD"),
    Attestation: attestationDetails,
  };
  return requestBody;
};
