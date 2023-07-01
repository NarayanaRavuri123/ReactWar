import { InputBase } from "@mui/material";
import React, { useState } from "react";
import { CustomDropDown } from "../../../../../core/customDropdown/customDropdown.component";
import { InputWithLabel } from "../../../../../core/inputWithLabel/inputWithLabel.component";
import { ValidationStatus } from "../../../../../core/interfaces/input.interface";
import { INewOrder } from "../../../newOrder.interface";
import { InsuranceInformationValidator } from "../../insuranceInformation/insuranceInformation.validator";
import "./payerDetails.css";

type Props = {
  data: INewOrder;
  setData: Function;
  isPrimaryComponent: boolean;
  insuranceTypeSelected: string;
  insuredRelation: any;
};

const PayerDetails = ({
  data,
  setData,
  isPrimaryComponent,
  insuranceTypeSelected,
  insuredRelation,
}: Props) => {
  const [validator] = useState<InsuranceInformationValidator>(
    new InsuranceInformationValidator()
  );
  const insuranceTypeText = isPrimaryComponent
    ? "primaryInsurance"
    : "secondaryInsurance";
  const componentType =
    insuranceTypeSelected === "medicare" ? "medicare" : "medicaid";
  
  const validateAndSetInsuranceData = (e: any) => {
    const { value, name } = e.target;
    const isValid = validator.validate(value, name);
    let tempData = {
      ...data,
      [insuranceTypeText]: {
        insuranceType: data[insuranceTypeText].insuranceType,
        insuranceTypeCode: data[insuranceTypeText].insuranceTypeCode,
        [insuranceTypeSelected]: {
          ...data[insuranceTypeText][componentType],
          [name]: {
            value: value,
            valid: isValid!.status,
            required: true,
            isOptional: false,
          },
        },
      },
    };
    setData(tempData);
  };
  
  return (
    <div className="medicare-container">
      <InputWithLabel
        label="Member ID"
        testId="payer-memberid"
        isRequired={true}
        error={
          data[insuranceTypeText][componentType].memberID.valid ===
          ValidationStatus.INVALID
            ? true
            : false
        }
      >
        <InputBase
          className="medicare-information-input"
          name="memberID"
          value={data[insuranceTypeText][componentType].memberID.value}
          onChange={(e: any) => validateAndSetInsuranceData(e)}
          data-testid="medicare-information-memberid"
        />
      </InputWithLabel>
      <InputWithLabel
        label="Relationship to Insured"
        labelClassName="insurance-type-title"
        isRequired={true}
        error={
          data[insuranceTypeText][componentType].relationShipInsured.valid ===
          ValidationStatus.INVALID
            ? true
            : false
        }
        testId="payer-relationshiptype"
      >
        <CustomDropDown
          handleChange={(e: any) => validateAndSetInsuranceData(e)}
          menuItem={insuredRelation}
          name={"relationShipInsured"}
          placeHolder="Select"
          selectpropsClassName={
            data[insuranceTypeText][componentType].relationShipInsured?.value
              ? "insurance-informantion-select"
              : "placeHolder"
          }
          selectClassName={
            data[insuranceTypeText][componentType].relationShipInsured.value
              ? "insurance-informantion-input"
              : "placeHolder"
          }
          testId={`relationship-type`}
          value={
            data[insuranceTypeText][componentType].relationShipInsured.value
          }
        />
      </InputWithLabel>
    </div>
  );
};

export default PayerDetails;
