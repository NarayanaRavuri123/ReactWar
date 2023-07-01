import { Box, Grid } from "@mui/material";
import "./patientAdmissionInfo.css";
import { InputWithLabel } from "../../../../core/inputWithLabel/inputWithLabel.component";
import { ValidationStatus } from "../../../../core/interfaces/input.interface";
import { IDischargeRequest } from "../../dischargeRequest/dischargeRequest.interface";
import { RadioGroupButton } from "../../../../core/radioButton/radioGroupButton.component";

interface Props {
  dischargeData: IDischargeRequest;
  setDischargeData: Function;
}
export const PatientAdmissionInfo = ({
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
      <div
        className="patientadmissioninfo"
        data-testid="patientadmissioninfoTest"
      >
        <h4
          className="patientadmissioninfo-title"
          data-testid="patientadmissioninfo-title"
        >
          Please provide information about the patient's admission
        </h4>
        <Box sx={{ flexGrow: 1 }}>
          <Grid xs={12} container spacing={2}>
            <Grid item xs={12}>
              <InputWithLabel
                labelClassName="patient-admissioninfo-label-item"
                label=" Was this a first admission or a readmission?"
                isRequired={true}
                error={
                  dischargeData.patientAdmissionInfo.valid ===
                  ValidationStatus.INVALID
                }
                testId="patientadmissioninfo-type"
              >
                <RadioGroupButton
                  name="patientAdmissionInfo"
                  labelYes="First Admission"
                  labelNo="Readmission"
                  dataTestIdYes="patientadmissioninfo-type-yes"
                  dataTestIdNo="patientadmissioninfo-type-no"
                  value={dischargeData.patientAdmissionInfo.value}
                  handleChange={validateAndSetDataRadio}
                  valueYes="First Admission"
                  valueNo="Readmission"
                />
              </InputWithLabel>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
};
