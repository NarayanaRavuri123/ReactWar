import { InputBase } from "@mui/material";
import React, { useState } from "react";
import { InputWithLabel } from "../../../../../../core/inputWithLabel/inputWithLabel.component";
import { ValidationStatus } from "../../../../../../core/interfaces/input.interface";
import { AddWoundAssessmentValidator } from "../addWoundAssessment.validator";
import { IAdditionalWoundInfo } from "./AdditionalWoundInfo.interface";
import "./woundProvideAdditionalNote.css";

const WoundProvideAdditionalInfo = ({
  data,
  setData,
  Validator = new AddWoundAssessmentValidator(),
}: IAdditionalWoundInfo) => {
  const [validator] = useState<AddWoundAssessmentValidator>(Validator!);
  const validateAndSetData = (e: any) => {
    const isValid = validator.validate(e.target.value, e.target.name);
    setData({
      ...data,
      [e.target.name]: { value: e.target.value, valid: isValid?.status },
    });
  };
  return (
    <div style={{ width: "560px" }}>
      <InputWithLabel
        labelClassName="woundAdditionalInfoLabel"
        label="Additional Notes"
        isRequired={false}
        testId="additionalWoundInfolabelTest"
      >
        <div
          className={
            data?.provideAdditionalWoundInfo.valid === ValidationStatus.INVALID
              ? "provideAdditionalWoundInfoError"
              : "noProvideAdditionalWoundError"
          }
        >
          Additional notes must contain only uppercase and lowercase letters,
          numbers and special characters . , -
        </div>
        <InputBase
          className="additionalWoundInfoTextarea"
          name="provideAdditionalWoundInfo"
          value={data?.provideAdditionalWoundInfo.value}
          onChange={validateAndSetData}
          data-testid="additionalWoundInfoTest"
          multiline={true}
          rows={3}
          inputProps={{
            maxLength: 100,
          }}
        />
      </InputWithLabel>
    </div>
  );
};
export default WoundProvideAdditionalInfo;
