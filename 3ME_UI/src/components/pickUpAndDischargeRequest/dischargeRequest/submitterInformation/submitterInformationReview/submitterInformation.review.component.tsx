import { Button } from "@mui/material";
import { IDischargeRequest } from "../../dischargeRequest.interface";
import "./submitterInformation.review.css";
import WoundTitleValue from "../../../../myPatients/patientAndTherapyDetails/woundProgress/addWoundAssessment/woundReviewAssessment/woundTitleValue/woundTitleValue.component";
import { formatPhoneNumber } from "../../../../../util/utilityFunctions";

interface Props {
  discharge: IDischargeRequest;
  dischargeRequestEditBtnClick?: () => void;
  isSummaryDischargePage?: boolean;
}
export const SubmitterInformationReview = ({
  discharge,
  dischargeRequestEditBtnClick,
  isSummaryDischargePage,
}: Props) => {
  return (
    <>
      <div className="review-submitter-title" data-testId="title-submitter">
        <>
          Submitter Information
          {!isSummaryDischargePage && (
            <Button
              className="review-submitter-edit"
              data-testId="review-submitter-edit-test"
              onClick={dischargeRequestEditBtnClick}
            >
              Edit
            </Button>
          )}
        </>
      </div>
      <div className="review-submitter-info-div">
        <div className="submitter-name" data-testid="submitter-name">
          <WoundTitleValue
            title="Submitter Name"
            value={`${discharge.submitterFirstName.value} ${discharge.submitterLastName.value}`}
          />
        </div>

        <div className="submitter-number" data-testid="submitter-number">
          <WoundTitleValue
            title="Phone Number"
            value={
              discharge.submitterPhoneNumber.value !== ""
                ? `${formatPhoneNumber(discharge.submitterPhoneNumber.value)}`
                : "--"
            }
          />
        </div>

        <div className="title" data-testid="Title">
          <WoundTitleValue
            title="Title"
            value={discharge.submitterTitle.value}
          />
        </div>

        <div className="employer" data-testid="employer">
          <WoundTitleValue
            title="Employer"
            value={discharge.submitterEmployer.value}
          />
        </div>
      </div>
    </>
  );
};
