import moment from "moment";
import {
  IHoldOrResumeTherapyData,
  WoundDetails,
} from "../holdOrResumeTherapy.interface";
import { IPatient } from "../../../../patient.interface";
import { IHoldOrResumeTherapyRequest } from "./holdOrResumeRequestMapper.interface";

export const mapHoldOrResumeRequest = async (
  currentDate: string,
  data: IHoldOrResumeTherapyData,
  isHoldTherapy: boolean,
  patient: IPatient,
  siteUseId: string,
  therapyStartDate: string | null,
  woundLocation: any,
  woundType: any
) => {
  const getWoundDetails = (woundArray: []): any => {
    let woundsRequest = woundArray
      .map((wound: WoundDetails, index: number) => {
        if (wound.isChecked) {
          let selectedWoundLocation = woundLocation.filter(
            (x: any) => x.text === wound.location
          )[0].code;
          let selectedWoundType = woundType.filter(
            (x: any) => x.text === wound.type
          )[0].code;
          let holdDate =
            index === 0 ? data.holdDate1.value : data.holdDate2.value;
          let resumeDate =
            index === 0 ? data.resumeDate1.value : data.resumeDate2.value;
          if (isHoldTherapy) {
            return {
              evaluationDate: moment(currentDate).format("yyyy-MM-DD"),
              holdDate: holdDate ? moment(holdDate).format("yyyy-MM-DD") : null,
              id: wound.id,
              location: selectedWoundLocation,
              resumeDate: resumeDate
                ? moment(resumeDate).format("yyyy-MM-DD")
                : null,
              therapyHoldDate: wound.therapyHoldDate,
            };
          } else {
            return {
              depth: wound.depth,
              evaluationDate: moment(currentDate).format("yyyy-MM-DD"),
              holdDate: holdDate ? moment(holdDate).format("yyyy-MM-DD") : null,
              id: wound.id,
              length: wound.length,
              location: selectedWoundLocation,
              resumeDate: resumeDate
                ? moment(resumeDate).format("yyyy-MM-DD")
                : null,
              therapyHoldDate: wound.therapyHoldDate,
              therapyResumptionDate: wound.therapyResumptionDate,
              type: selectedWoundType,
              width: wound.width,
            };
          }
        }
        return null;
      })
      .filter((x) => x !== null);
    return woundsRequest;
  };

  let requestBody: IHoldOrResumeTherapyRequest;
  requestBody = {
    assessmentStatus: isHoldTherapy ? 2 : 1, // 1 for resume, 2 for hold
    comments: data.comments.value,
    dob: moment(patient.dob).format("yyyy-MM-DD"),
    reason: data.reasonForHold?.value !== "" ? data.reasonForHold?.value : null,
    rentalOrderNumber: patient.roNumber.toString(),
    siteUseId: siteUseId,
    therapyStartDate: therapyStartDate,
    woundDetails: getWoundDetails(data.wounds),
  };
  return requestBody;
};
