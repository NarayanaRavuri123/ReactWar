import { Box, Grid } from "@mui/material";
import "./admissionScheduleInfo.css";
import { InputWithLabel } from "../../../../core/inputWithLabel/inputWithLabel.component";
import { ValidationStatus } from "../../../../core/interfaces/input.interface";
import { IDischargeRequest } from "../../dischargeRequest/dischargeRequest.interface";
import { RadioGroupButton } from "../../../../core/radioButton/radioGroupButton.component";

interface Props {
  dischargeData: IDischargeRequest;
  setDischargeData: Function;
}
export const AdmissionScheduleInfo = ({
  dischargeData,
  setDischargeData,
}: Props) => {
  const validateAndSetDataRadio = (e: any) => {
    setDischargeData((dischargeData: IDischargeRequest) => ({
      ...dischargeData,
      [e.target.name]: {
        value: e.target.value,
        valid: ValidationStatus.VALID,
        required: true,
      },
    }));
  };

  return (
    <div>
      <div className="admissionscheduleinfo">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputWithLabel
                label="Was the admission scheduled or unscheduled?"
                isRequired={true}
                error={
                  dischargeData.AdmissionScheduleInfo.valid ===
                  ValidationStatus.INVALID
                }
                testId="admissionscheduleinfo-type"
              >
                <RadioGroupButton
                  name="AdmissionScheduleInfo"
                  labelYes="Scheduled"
                  labelNo="Unscheduled"
                  dataTestIdYes="admissionscheduleinfo-type-yes"
                  dataTestIdNo="admissionscheduleinfo-type-no"
                  value={dischargeData.AdmissionScheduleInfo.value}
                  handleChange={validateAndSetDataRadio}
                  valueYes="Scheduled"
                  valueNo="Unscheduled"
                />
              </InputWithLabel>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
};
