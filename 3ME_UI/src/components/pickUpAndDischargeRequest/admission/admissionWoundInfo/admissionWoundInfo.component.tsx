import { Box, Grid } from "@mui/material";
import "./admissionWoundInfo.css";
import { InputWithLabel } from "../../../../core/inputWithLabel/inputWithLabel.component";
import { ValidationStatus } from "../../../../core/interfaces/input.interface";
import { IDischargeRequest } from "../../dischargeRequest/dischargeRequest.interface";
import { RadioGroupButton } from "../../../../core/radioButton/radioGroupButton.component";

interface Props {
  dischargeData: IDischargeRequest;
  setDischargeData: Function;
}
export const AdmissionWoundInfo = ({
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
      <div className="admissionwoundinfo">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputWithLabel
                label="Was the admission related to a wound?"
                isRequired={true}
                error={
                  dischargeData.AdmissionWoundInfo.valid ===
                  ValidationStatus.INVALID
                }
                testId="admissionwoundinfo-type"
              >
                <RadioGroupButton
                  name="AdmissionWoundInfo"
                  labelYes="Non Wound Related"
                  labelNo="Wound Related"
                  dataTestIdYes="admissionwoundinfo-type-yes"
                  dataTestIdNo="admissionwoundinfo-type-no"
                  value={dischargeData.AdmissionWoundInfo.value}
                  handleChange={validateAndSetDataRadio}
                  valueYes="Non Wound Related"
                  valueNo="Wound Related"
                />
              </InputWithLabel>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
};
