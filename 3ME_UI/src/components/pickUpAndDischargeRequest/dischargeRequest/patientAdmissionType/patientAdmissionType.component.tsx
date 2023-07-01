import { useContext } from "react";
import { Box, Grid } from "@mui/material";
import "./patientAdmissionType.css";
import { InputWithLabel } from "../../../../core/inputWithLabel/inputWithLabel.component";
import { ValidationStatus } from "../../../../core/interfaces/input.interface";
import {
  DischargeRequestContext,
  DischargeRequestContextType,
} from "../../../../context/DischargeRequestContext";
import { PatientAdmissionInfo } from "../../admission/patientAdmissionInfo/patientAdmissionInfo.component";
import { IDischargeRequest } from "../../dischargeRequest/dischargeRequest.interface";
import { AdmissionFacilityType } from "../../admission/admissionFacilityType/admissionFacilityType.component";
import { AdmissionScheduleInfo } from "../../admission/admissionScheduleInfo/admissionScheduleInfo.component";
import { AdmissionWoundInfo } from "../../admission/admissionWoundInfo/admissionWoundInfo.component";
import { RadioGroupButton } from "../../../../core/radioButton/radioGroupButton.component";
import { PatientAdmissionTypeReview } from "./patientAdmissionTypeReview/patientAdmissionType.review.component";
import { MobileDisplayContext } from "../../../../context/MobileDisplayContext";

interface Props {
  dischargeData: IDischargeRequest;
  setDischargeData: Function;
  isReviewDischargePage?: Boolean;
  dischargeRequestEditBtnClick?: () => void;
  isSummaryDischargePage?: boolean;
}
export const PatientAdmissionType = ({
  dischargeData,
  setDischargeData,
  isReviewDischargePage = false,
  dischargeRequestEditBtnClick,
  isSummaryDischargePage = false,
}: Props) => {
  const { isMobileScreen } = useContext(MobileDisplayContext);
  const DischargeReqObj = useContext<DischargeRequestContextType | null>(
    DischargeRequestContext
  );

  const validationStatusSet = (ValStatus: any) => {
    dischargeData.patientAdmissionInfo = {
      value: "",
      valid: ValStatus,
    };
    dischargeData.TypeOfFacility = {
      value: "",
      valid: ValStatus,
    };
    dischargeData.AdmissionScheduleInfo = {
      value: "",
      valid: ValStatus,
    };
    dischargeData.AdmissionWoundInfo = {
      value: "",
      valid: ValStatus,
    };
  };

  const validateAndSetData = (e: any) => {
    if (e.target.name === "patientAdmissionType") {
      let isValid = ValidationStatus.VALID;
      if (e.target.value === "yes") {
        DischargeReqObj?.setPatientAdmissionTypeActive(true);
        validationStatusSet(ValidationStatus.UNTOUCHED);
      } else if (e.target.value === "no") {
        DischargeReqObj?.setPatientAdmissionTypeActive(false);
        validationStatusSet(ValidationStatus.VALID);
      }
      dischargeData.facilityname = { value: "", valid: ValidationStatus.VALID };
      setDischargeData((dischargeData: IDischargeRequest) => ({
        ...dischargeData,
        [e.target.name]: {
          value: e.target.value,
          valid: isValid,
          required: true,
        },
      }));
    }
  };

  return !isReviewDischargePage ? (
    <div
      className="patientadmissiontype"
      data-testid="patientadmissiontypeTest"
    >
      <h2
        className="patientadmissiontype-title"
        data-testid="patientadmissiontype-title"
      >
        Admission or Readmission to Higher Level of Care
      </h2>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={isMobileScreen ? 8 : 4}>
            <InputWithLabel
              labelClassName="patient-admissiontype-label-item"
              label="Was the patient admitted to a higher level of care?"
              isRequired={true}
              error={
                dischargeData.patientAdmissionType.valid ===
                ValidationStatus.INVALID
              }
              testId="patientadmissiontype-higherlevel-care"
            >
              <RadioGroupButton
                name="patientAdmissionType"
                labelYes="Yes"
                labelNo="No"
                dataTestIdYes="patientadmissiontype-higherlevel-care-yes"
                dataTestIdNo="patientadmissiontype-higherlevel-care-no"
                value={dischargeData.patientAdmissionType.value}
                handleChange={validateAndSetData}
              />
            </InputWithLabel>
          </Grid>
        </Grid>
      </Box>
      <div>
        {DischargeReqObj?.patientAdmissionTypeActive === true && (
          <PatientAdmissionInfo
            dischargeData={dischargeData}
            setDischargeData={setDischargeData}
          />
        )}
        {DischargeReqObj?.patientAdmissionTypeActive === true && (
          <AdmissionFacilityType
            dischargeData={dischargeData}
            setDischargeData={setDischargeData}
          />
        )}
        {DischargeReqObj?.patientAdmissionTypeActive === true && (
          <AdmissionScheduleInfo
            dischargeData={dischargeData}
            setDischargeData={setDischargeData}
          />
        )}
        {DischargeReqObj?.patientAdmissionTypeActive === true && (
          <AdmissionWoundInfo
            dischargeData={dischargeData}
            setDischargeData={setDischargeData}
          />
        )}
      </div>
    </div>
  ) : (
    <PatientAdmissionTypeReview
      dischargeRequestEditBtnClick={dischargeRequestEditBtnClick}
      isSummaryDischargePage={isSummaryDischargePage}
    />
  );
};
