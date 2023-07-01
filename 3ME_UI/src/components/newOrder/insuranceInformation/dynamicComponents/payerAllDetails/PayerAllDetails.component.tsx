import { InputBase } from "@mui/material";
import InputMask from "react-input-mask";
import React, { useState } from "react";
import { CustomDropDown } from "../../../../../core/customDropdown/customDropdown.component";
import { InputWithLabel } from "../../../../../core/inputWithLabel/inputWithLabel.component";
import { ValidationStatus } from "../../../../../core/interfaces/input.interface";
import { INewOrder } from "../../../newOrder.interface";
import { InsuranceInformationValidator } from "../../insuranceInformation/insuranceInformation.validator";
import "./payerAllDetails.css";

type Props = {
  data: INewOrder;
  setData: Function;
  isPrimaryComponent: boolean;
  insuranceTypeSelected: string;
  insuredRelation: any;
};

const PayerAllDetails = ({
  data,
  setData,
  isPrimaryComponent,
  insuranceTypeSelected,
  insuredRelation,
}: Props) => {
  const [validator] = useState<InsuranceInformationValidator>(
    new InsuranceInformationValidator()
  );
  const componentType =
    insuranceTypeSelected === "medicareAdvantage"
      ? "medicareAdvantage"
      : insuranceTypeSelected === "managedMedicaid"
      ? "managedMedicaid"
      : "commercialInsurance";
  const insuranceTypeText = isPrimaryComponent
    ? "primaryInsurance"
    : "secondaryInsurance";

  const [focusClasses, setFocusClasses] = useState({
    payerContactNumber: "",
  });

  const setClasses = (e: any, classname: string) => {
    setFocusClasses(
      Object.assign({}, focusClasses, { [e.target.name]: classname })
    );
  };

  const validateAndSetInsuranceData = (e: any) => {
    const { value, name } = e.target;
    const isValid = validator.validate(value, name);
    if (
      name === "payerContactNumber" &&
      data[insuranceTypeText][componentType].payerContactNumber.value ===
        "(___) ___-____" &&
      (value === "(___) ___-____" || value === "")
    ) {
      return;
    }
    let tempData = {
      ...data,
      [insuranceTypeText]: {
        insuranceType: data[insuranceTypeText].insuranceType,
        insuranceTypeCode: data[insuranceTypeText].insuranceTypeCode,
        [insuranceTypeSelected]: {
          ...data[insuranceTypeText][componentType],
          [name]: {
            value: value,
            valid: isValid?.status,
            required: true,
            isOptional: false,
          },
        },
      },
    };
    setData(tempData);
  };

  return (
    <div className="payerAllDetail-container">
      <InputWithLabel
        label="Payer Name"
        testId="PayerNameID"
        isRequired={data[insuranceTypeText][componentType].payerName.required}
        error={
          data[insuranceTypeText][componentType].payerName.valid ===
          ValidationStatus.INVALID
            ? true
            : false
        }
      >
        <InputBase
          className="payer-information-input"
          name="payerName"
          value={data[insuranceTypeText][componentType].payerName.value}
          onChange={(e: any) => validateAndSetInsuranceData(e)}
          data-testid="medicare-information-memberid"
        />
      </InputWithLabel>
      <div className="member-group-id">
        <InputWithLabel
          label="Member ID"
          testId="memberTestID"
          isRequired={data[insuranceTypeText][componentType].memberID.required}
          error={
            data[insuranceTypeText][componentType].memberID.valid ===
            ValidationStatus.INVALID
              ? true
              : false
          }
        >
          <InputBase
            className="payer-information-input"
            name="memberID"
            value={data[insuranceTypeText][componentType].memberID.value}
            onChange={(e: any) => validateAndSetInsuranceData(e)}
            data-testid="medicare-information-memberid"
          />
        </InputWithLabel>
        <InputWithLabel
          label="Group ID"
          testId="groupTestID"
          isRequired={false}
          error={
            data[insuranceTypeText][componentType].groupID.valid ===
            ValidationStatus.INVALID
              ? true
              : false
          }
        >
          <InputBase
            className="payer-information-input"
            name="groupID"
            value={data[insuranceTypeText][componentType].groupID.value}
            onChange={(e: any) => validateAndSetInsuranceData(e)}
            data-testid="medicare-information-memberid"
          />
        </InputWithLabel>
      </div>
      <div className="member-group-id">
        <div className="payer-number-div">
          <div className="payerContactNumberDiv">
            <InputWithLabel
              label="Payer Contact Number"
              isRequired={
                data[insuranceTypeText][componentType].payerContactNumber
                  .required
              }
              error={
                data[insuranceTypeText][componentType].payerContactNumber
                  .valid === ValidationStatus.INVALID
              }
              labelClassName={focusClasses.payerContactNumber}
              testId="payerContactNumberID"
            >
              <InputMask
                className="payerContactNumber"
                data-testid="payer-number-value"
                mask="(999) 999-9999"
                name="payerContactNumber"
                onBlur={(e) => setClasses(e, "")}
                onChange={validateAndSetInsuranceData}
                onFocus={(e) => setClasses(e, "Mui-focused")}
                placeholder="(___) ___-____"
                value={
                  data[insuranceTypeText][componentType].payerContactNumber
                    .value
                }
              />
            </InputWithLabel>
          </div>
          <InputWithLabel
            label="Extension"
            testId="extensionID"
            isRequired={false}
            error={
              data[insuranceTypeText][componentType].extension.valid ===
              ValidationStatus.INVALID
            }
          >
            <InputBase
              className="contact-information-input"
              name="extension"
              value={data[insuranceTypeText][componentType].extension.value}
              onChange={validateAndSetInsuranceData}
            />
          </InputWithLabel>
        </div>
        <InputWithLabel
          label="Relationship to Insured"
          labelClassName="insurance-type-title"
          isRequired={
            data[insuranceTypeText][componentType].relationShipInsured.required
          }
          error={
            data[insuranceTypeText][componentType].relationShipInsured.valid ===
            ValidationStatus.INVALID
              ? true
              : false
          }
          testId="relationshiptypeLabel"
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
    </div>
  );
};

export default PayerAllDetails;
