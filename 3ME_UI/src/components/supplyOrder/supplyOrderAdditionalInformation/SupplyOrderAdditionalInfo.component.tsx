import { InputBase } from "@mui/material";
import React, { useState } from "react";
import { InputWithLabel } from "../../../core/inputWithLabel/inputWithLabel.component";
import { ValidationStatus } from "../../../core/interfaces/input.interface";
import { SupplyOrderValidator } from "../supplyOrder.validator";
import { IAdditionalInfo } from "./AdditionalInfo.interface";
import AdditionalInformationReviewOrder from "./reviewOrder/additonalInformationReviewOrder";
import "./SupplyOrderAdditionalInfo.css";

const SupplyOrderAdditionalInfo = ({
  data,
  setData,
  Validator,
  isReviewOrder,
  openSupplyOrderPageEdit,
}: IAdditionalInfo) => {
  const [validator] = useState<SupplyOrderValidator>(Validator!);
  const validateAndSetData = (e: any) => {
    const isValid = validator.validate(e.target.value, e.target.name);
    setData(
      Object.assign({}, data, {
        [e.target.name]: { value: e.target.value, valid: isValid?.status },
      })
    );
  };
  return (
    <div className="provideAdditionalInfo">
      {!isReviewOrder && (
        <>
          <div
            className="provideAdditionalInfoTitle"
            data-testid="addtional-title-test"
          >
            Provide Additional Information
          </div>
          <div style={{ width: "560px" }}>
            <InputWithLabel
              labelClassName="additionalInfoLabel"
              label="Additional Notes"
              isRequired={false}
              testId="additionalInfolabelTest"
            >
              <div className={data?.provideAdditionalInfo.valid === ValidationStatus.INVALID
                    ? "provideAdditionalInfoError" : "noProvideAdditionalError"}
              >Additional notes must contain only uppercase and lowercase letters, numbers and special characters . , -</div>
              <InputBase
                className=  "additionalInfoTextarea"
                name="provideAdditionalInfo"
                value={data?.provideAdditionalInfo.value}
                onChange={validateAndSetData}
                data-testid="additionalInfoTest"
                multiline={true}
                rows={3}
                inputProps = {{
                    maxLength: 100
                }}
              />
            </InputWithLabel>
          </div>
        </>
      )}
      {isReviewOrder && (
        <AdditionalInformationReviewOrder
          data={data}
          openSupplyOrderPageEdit={openSupplyOrderPageEdit}
        />
      )}
    </div>
  );
};

export default SupplyOrderAdditionalInfo;
