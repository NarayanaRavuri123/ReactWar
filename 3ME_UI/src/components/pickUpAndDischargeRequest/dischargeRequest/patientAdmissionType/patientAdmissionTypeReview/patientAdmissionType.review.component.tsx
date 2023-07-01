import { useContext } from "react";
import { Button } from "@mui/material";
import "./patientAdmissionType.review.css";
import {
  DischargeRequestContext,
  DischargeRequestContextType,
} from "../../../../../context/DischargeRequestContext";
import WoundTitleValue from "../../../../myPatients/patientAndTherapyDetails/woundProgress/addWoundAssessment/woundReviewAssessment/woundTitleValue/woundTitleValue.component";

interface Props {
  dischargeRequestEditBtnClick?: () => void;
  isSummaryDischargePage?: boolean;
}

export const PatientAdmissionTypeReview = ({
  dischargeRequestEditBtnClick,
  isSummaryDischargePage,
}: Props) => {
  const DischargeReqObj = useContext<DischargeRequestContextType | null>(
    DischargeRequestContext
  );

  const discharge = DischargeReqObj?.dischargeRequestData!;

  return (
    <>
      <div
        className="review-admission-title"
        data-testId="admission-type-title"
      >
        <div className="review-admission-sub-title">
          <>
            Admisson or Readmission to Higher level of Care
            {!isSummaryDischargePage && (
              <Button
                classes={{ root: "admission-edit-button" }}
                data-testId="review-submitter-edit-test"
                onClick={dischargeRequestEditBtnClick}
              >
                Edit
              </Button>
            )}
          </>
        </div>
      </div>
      <div
        className="review-admisson-info-div"
        data-testId="review-admisson-info"
      >
        <WoundTitleValue
          title="Was the patient admitted to higher level of care?"
          value={discharge.patientAdmissionType.value}
        />
        {discharge.patientAdmissionType.value === "yes" && (
          <WoundTitleValue
            title="Was this a first admission or readmission?"
            value={discharge.patientAdmissionInfo.value}
            formatValue={false}
          />
        )}
      </div>
      {discharge.patientAdmissionType.value === "yes" && (
        <div className="review-facililty-info-div" data-testId="facility-info">
          <WoundTitleValue
            title="Facility type admitted to"
            value={discharge.TypeOfFacility.value}
            formatValue={false}
          />

          <WoundTitleValue
            title="Facility Name"
            value={discharge.facilityname.value}
            formatValue={false}
          />
        </div>
      )}
      {discharge.patientAdmissionType.value === "yes" && (
        <div
          className="review-woundadmission-related-info-div"
          data-testId="review-woundadmission"
        >
          <WoundTitleValue
            title=" Was the admission scheduled or unscheduled?"
            value={discharge.AdmissionScheduleInfo.value}
            formatValue={false}
          />

          <WoundTitleValue
            title="Was the admission related to a wound?"
            value={discharge.AdmissionWoundInfo.value}
            formatValue={false}
          />
        </div>
      )}
    </>
  );
};
