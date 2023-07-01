import { useContext } from "react";
import { Button, Grid } from "@mui/material";
import {
  DischargeRequestContext,
  DischargeRequestContextType,
} from "../../../../../context/DischargeRequestContext";

import "./therapyOutcomes.review.css";
import WoundTitleValue from "../../../../myPatients/patientAndTherapyDetails/woundProgress/addWoundAssessment/woundReviewAssessment/woundTitleValue/woundTitleValue.component";

interface Props {
  dischargeRequestEditBtnClick?: () => void;
  isSummaryDischargePage?: boolean;
}

export const TherapyOutcomeReview = ({
  dischargeRequestEditBtnClick,
  isSummaryDischargePage,
}: Props) => {
  const DischargeReqObj = useContext<DischargeRequestContextType | null>(
    DischargeRequestContext
  );
  const discharge = DischargeReqObj!.dischargeRequestData;
  const therapyGoalNotAchievedHandler = (): any => {
    const output = discharge.therapyGoalsNotAchieved.value
      .filter((x: any) => x.selected)
      .map((x: any) => x.value)
      .join(", ");
    return output === "" ? "-" : output;
  };
  const therapyGoalAchievedHandler = (): any => {
    const output = discharge.therapyGoalsAchieved.value
      .filter((x: any) => x.selected)
      .map((x: any) => x.value)
      .join(", ");
    return output === "" ? "-" : output;
  };
  return (
    <>
      <Grid container spacing={2}>
        <div className="review-therapy-title" data-testId="review-therapy">
          <>
            Therapy Outcomes Applicable
            {!isSummaryDischargePage && (
              <Button
                classes={{ root: "review-therapy-edit-button" }}
                data-testId="review-therapy-edit-test"
                onClick={dischargeRequestEditBtnClick}
              >
                Edit
              </Button>
            )}
          </>
        </div>
        <div
          className="review-therapy-info-div"
          data-testId="review-therapy-info"
        >
          <WoundTitleValue
            title="Therapy Goal Achieved"
            value={therapyGoalAchievedHandler()}
            formatValue={false}
          />

          <WoundTitleValue
            title="Therapy Goal Not Achieved"
            value={therapyGoalNotAchievedHandler()}
            formatValue={false}
          />

          <WoundTitleValue
            title="Did the patient expire?"
            value={discharge.patientDied.value}
          />
        </div>
      </Grid>
    </>
  );
};
