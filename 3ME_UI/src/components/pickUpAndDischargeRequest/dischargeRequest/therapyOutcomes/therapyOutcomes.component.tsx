import "./therapyOutcomes.css";

import { Box, Grid } from "@mui/material";
import { InputWithLabel } from "../../../../core/inputWithLabel/inputWithLabel.component";
import { ValidationStatus } from "../../../../core/interfaces/input.interface";

import { IDischargeRequest } from "../../dischargeRequest/dischargeRequest.interface";
import { RadioGroupButton } from "../../../../core/radioButton/radioGroupButton.component";
import { CustomCheckBox } from "../../../../core/checkBox/checkBox.component";
import { TherapyOutcomeReview } from "./therapyOutcomesReview/therapyOutcomes.review.component";
import { MobileDisplayContext } from "../../../../context/MobileDisplayContext";
import { useContext } from "react";
interface Props {
  dischargeData: IDischargeRequest;
  setDischargeData: Function;
  isReviewDischargePage?: Boolean;
  dischargeRequestEditBtnClick?: () => void;
  isSummaryDischargePage?: boolean;
}
export const TherapyOutcomes = ({
  dischargeData,
  setDischargeData,
  isReviewDischargePage = false,
  dischargeRequestEditBtnClick,
  isSummaryDischargePage = false,
}: Props) => {
  const { isMobileScreen } = useContext(MobileDisplayContext);
  const validateAndSetData = (e: any) => {
    if (e.target.name === "patientDied") {
      setDischargeData((dischargeData: IDischargeRequest) => ({
        ...dischargeData,
        [e.target.name]: {
          value: e.target.value,
          valid: ValidationStatus.VALID,
          required: true,
        },
      }));
    }
  };
  const handleGoalAchievedSelect = (e: any) => {
    dischargeData.therapyGoalsAchieved.value.map((item: any) => {
      if (item.value === e.target.name) {
        item.selected = e.target.checked;
        dischargeData.therapyGoalsAchieved.valid = ValidationStatus.VALID;
      }
      setDischargeData((dischargeData: IDischargeRequest) => ({
        ...dischargeData,
      }));
    });
  };
  const handleGoalNotAchievedSelect = (e: any) => {
    dischargeData.therapyGoalsNotAchieved.value.map((item: any) => {
      if (item.value === e.target.value) {
        item.selected = e.target.checked;
        dischargeData.therapyGoalsNotAchieved.valid = ValidationStatus.VALID;
      }
      setDischargeData((dischargeData: IDischargeRequest) => ({
        ...dischargeData,
      }));
    });
  };
  return !isReviewDischargePage ? (
    <div className="therapyoutcome-type">
      <h2 className="therapyoutcome-title" data-testId="therapyoutcome-title">
        Please select the Therapy Outcome(s) applicable
      </h2>
      <h2 className="therapygoalachieved" data-testId="therapygoalachieved">
        Therapy Goal Achieved
      </h2>
      <div className="therapyoutcome-data">
        {Array.isArray(dischargeData.therapyGoalsAchieved.value) &&
          dischargeData.therapyGoalsAchieved.value.map((x: any, index: any) => (
            <div className="checkboxmain">
              <CustomCheckBox
                key={`pt${index.toString()}`}
                name={x.value}
                handleChange={handleGoalAchievedSelect}
                labelClassName={
                  x.selected
                    ? "chkBoxDescriptiononeText-active"
                    : "chkBoxDescriptiononeText"
                }
                checked={x.selected}
                value={x.value}
                labelText={x.label}
                testId={x.value}
              />
            </div>
          ))}
      </div>
      <h2
        className="therapygoalnotachieved"
        data-testId="therapygoalnotachieved"
      >
        Therapy Goal Not Achieved
      </h2>
      <div className="therapyoutcome-data">
        {Array.isArray(dischargeData.therapyGoalsNotAchieved.value) &&
          dischargeData.therapyGoalsNotAchieved.value.map(
            (x: any, index: any) => (
              <CustomCheckBox
                key={`pt${index.toString()}`}
                name={x.value}
                handleChange={handleGoalNotAchievedSelect}
                labelClassName={
                  x.selected
                    ? "chkBoxDescriptionText-active"
                    : "chkBoxDescriptionText"
                }
                checked={x.selected}
                value={x.value}
                labelText={x.label}
                testId={x.value}
              />
            )
          )}
      </div>
      <div className="patientDied">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={isMobileScreen ? 8 : 4}>
              <InputWithLabel
                labelClassName="patient-admissiontype-label-item"
                label="Did the patient expire?"
                isRequired={true}
                error={
                  dischargeData.patientDied.valid === ValidationStatus.INVALID
                }
                testId="therapy-type-patient-died"
              >
                <RadioGroupButton
                  name="patientDied"
                  labelYes="Yes"
                  labelNo="No"
                  dataTestIdYes="therapy-type-patient-died-yes"
                  dataTestIdNo="therapy-type-patient-died-no"
                  value={dischargeData.patientDied.value}
                  handleChange={validateAndSetData}
                />
              </InputWithLabel>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  ) : (
    <TherapyOutcomeReview
      dischargeRequestEditBtnClick={dischargeRequestEditBtnClick}
      isSummaryDischargePage={isSummaryDischargePage}
    />
  );
};
