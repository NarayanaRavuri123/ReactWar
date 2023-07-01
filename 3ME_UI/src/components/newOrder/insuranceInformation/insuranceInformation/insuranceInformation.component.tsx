import { useContext, useEffect, useState } from "react";
import "./insuranceInformation.css";
import { Grid } from "@mui/material";
import { InsuranceInformationValidator } from "./insuranceInformation.validator";
import { ValidationStatus } from "../../../../core/interfaces/input.interface";
import {
  IInsuranceInformation,
  IInsuranceInformationInterface,
} from "./insuranceInformation.interface";
import { CustomDropDown } from "../../../../core/customDropdown/customDropdown.component";
import { InputWithLabel } from "../../../../core/inputWithLabel/inputWithLabel.component";
import { ShowAdditionalFields } from "./insuranceInformation.model";
import {
  NewOrderContext,
  NewOrderContextType,
} from "../../../../context/NewOrderContext";
import { INewOrder } from "../../newOrder.interface";
import { getDeepClone } from "../../../../util/ObjectFunctions";
import { isObject } from "@okta/okta-auth-js";

export const InsuranceInformation = ({
  data,
  setData,
  Validator = new InsuranceInformationValidator(),
  isPrimaryComponent,
  dropDownDataArray,
  dropDownTextArray,
}: IInsuranceInformationInterface) => {
  const [validator] = useState<InsuranceInformationValidator>(Validator!);
  const NewOrderObj = useContext<NewOrderContextType | null>(NewOrderContext);
  const componentName = isPrimaryComponent ? "primary" : "secondary";
  let insuranceType = isPrimaryComponent
    ? data.primaryInsurance.insuranceType
    : data.secondaryInsurance.insuranceType;

  const getCodeFromText = (input: string): string => {
    return dropDownDataArray
      .filter((item: { text: string; code: string }) => item.text === input)
      .map((x: { code: string }) => x.code)[0];
  };

  const validateAndSetData = (e: any) => {
    NewOrderObj?.setIsHandleChangeTriggered(true);
    let value = e.target.value;
    if (e.target.name === `${componentName}-insurance-type`) {
      value = e.target.value;
      setFieldsToShow(value, isPrimaryComponent);
    }
    const isValid = validator.validate(value, e.target.name);
    const updatedInsurance = {
      value: value,
      valid: isValid!.status,
      required: true,
    };
    const updatedInsuranceCode = {
      value: getCodeFromText(value),
      valid: isValid!.status,
      required: true,
    };
    if (isPrimaryComponent) {
      setData((dt: any) => ({
        ...dt,
        primaryInsurance: {
          ...dt.primaryInsurance,
          insuranceType: updatedInsurance,
          insuranceTypeCode: updatedInsuranceCode,
        },
      }));
    } else {
      setData((dt: any) => ({
        ...dt,
        secondaryInsurance: {
          ...dt.secondaryInsurance,
          insuranceType: updatedInsurance,
          insuranceTypeCode: updatedInsuranceCode,
        },
      }));
    }
  };

  const updateExcept = (propName: string, obj: IInsuranceInformation) => {
    const temp = getDeepClone(obj);
    Object.keys(temp).forEach((x: string) => {
      Object.keys(temp[x]).forEach((element: any) => {
        if (isObject(temp[x][element])) {
          if (element !== propName) {
            temp[x][element].value = "";
            temp[x][element].valid = ValidationStatus.UNTOUCHED;
            temp[x][element].required = true;
            temp[x][element].isOptional = true;
          }
          if (propName === "") {
            temp[x][element].value = "";
            temp[x][element].valid = ValidationStatus.UNTOUCHED;
            temp[x][element].required = true;
            temp[x][element].isOptional = true;
          }
        }
      });
      if (x !== propName) {
        temp[x].value = "";
        temp[x].valid = ValidationStatus.UNTOUCHED;
        temp[x].required = true;
        temp[x].isOptional = true;
      }
      if (propName === "") {
        temp[x].value = "";
        temp[x].valid = ValidationStatus.UNTOUCHED;
        temp[x].required = true;
        temp[x].isOptional = true;
      }
    });
    return temp;
  };

  const updateFieldsToShowVar = (
    selectInsurance: string,
    isPrimary: boolean
  ) => {
    if (isPrimary) {
      NewOrderObj?.setShowAdditionalObject((dt: ShowAdditionalFields) => ({
        typePrimary: {
          medicare: "Medicare" === selectInsurance ? true : false,
          medicareAdvantage:
            "Medicare Advantage" === selectInsurance ? true : false,
          managedMedicaid:
            "Managed Medicaid" === selectInsurance ? true : false,
          commercialInsurance:
            "Commercial Insurance" === selectInsurance ? true : false,
          medicaid: "Medicaid" === selectInsurance ? true : false,
          charityCare: "Charity Care" === selectInsurance ? true : false,
          privatePay: "Private Pay" === selectInsurance ? true : false,
          otherAdditionalDetails: "Other" === selectInsurance ? true : false,
          workerCompensation:
            "Workers' Compensation" === selectInsurance ? true : false,
        },
        typeSecondary: dt.typeSecondary,
      }));
    } else {
      NewOrderObj?.setShowAdditionalObject((dt: ShowAdditionalFields) => ({
        typeSecondary: {
          medicare: "Medicare" === selectInsurance ? true : false,
          medicareAdvantage:
            "Medicare Advantage" === selectInsurance ? true : false,
          managedMedicaid:
            "Managed Medicaid" === selectInsurance ? true : false,
          commercialInsurance:
            "Commercial Insurance" === selectInsurance ? true : false,
          medicaid: "Medicaid" === selectInsurance ? true : false,
          charityCare: "Charity Care" === selectInsurance ? true : false,
          privatePay: "Private Pay" === selectInsurance ? true : false,
          otherAdditionalDetails: "Other" === selectInsurance ? true : false,
          workerCompensation:
            "Workers' Compensation" === selectInsurance ? true : false,
        },
        typePrimary: dt.typePrimary,
      }));
    }
  };

  const setFieldsToShow = (insuranceType: string, isPrimary: boolean) => {
    switch (insuranceType) {
      case "Medicare":
        if (isPrimary) {
          updateFieldsToShowVar("Medicare", isPrimary);
          setData((dt: INewOrder) => ({
            ...dt,
            primaryInsurance: {
              ...updateExcept("medicare", dt.primaryInsurance),
              medicare: {
                memberID: {
                  value: "",
                  valid: ValidationStatus.UNTOUCHED,
                  required: true,
                  isOptional: false,
                },
                relationShipInsured: {
                  value: "",
                  valid: ValidationStatus.UNTOUCHED,
                  required: true,
                  isOptional: false,
                },
              },
            },
          }));
        } else {
          updateFieldsToShowVar("Medicare", isPrimary);
          setData((dt: INewOrder) => ({
            ...dt,
            secondaryInsurance: {
              ...updateExcept("medicare", dt.secondaryInsurance),
              medicare: {
                memberID: {
                  value: "",
                  valid: ValidationStatus.UNTOUCHED,
                  required: true,
                  isOptional: false,
                },
                relationShipInsured: {
                  value: "",
                  valid: ValidationStatus.UNTOUCHED,
                  required: true,
                  isOptional: false,
                },
              },
            },
          }));
        }
        break;
      case "Medicare Advantage":
        if (isPrimary) {
          updateFieldsToShowVar("Medicare Advantage", isPrimary);
          setData((dt: INewOrder) => ({
            ...dt,
            primaryInsurance: {
              ...updateExcept("medicareAdvantage", dt.primaryInsurance),
              medicareAdvantage: {
                payerName: {
                  valid: ValidationStatus.UNTOUCHED,
                  value: "",
                  required: true,
                  isOptional: false,
                },
                groupID: {
                  valid: ValidationStatus.VALID,
                  value: "",
                  required: false,
                  isOptional: true,
                  isDefaultValid: true,
                },
                memberID: {
                  valid: ValidationStatus.UNTOUCHED,
                  value: "",
                  required: true,
                  isOptional: false,
                },
                relationShipInsured: {
                  valid: ValidationStatus.UNTOUCHED,
                  value: "",
                  required: true,
                  isOptional: false,
                },
                extension: {
                  valid: ValidationStatus.VALID,
                  value: "",
                  required: false,
                  isOptional: true,
                  isDefaultValid: true,
                },
                payerContactNumber: {
                  valid: ValidationStatus.UNTOUCHED,
                  value: "",
                  required: true,
                  isOptional: false,
                },
              },
            },
          }));
        } else {
          updateFieldsToShowVar("Medicare Advantage", isPrimary);
          setData((dt: INewOrder) => ({
            ...dt,
            secondaryInsurance: {
              ...updateExcept("medicareAdvantage", dt.secondaryInsurance),
              medicareAdvantage: {
                payerName: {
                  valid: ValidationStatus.UNTOUCHED,
                  value: "",
                  required: true,
                  isOptional: false,
                },
                groupID: {
                  valid: ValidationStatus.VALID,
                  value: "",
                  required: false,
                  isOptional: true,
                  isDefaultValid: true,
                },
                memberID: {
                  valid: ValidationStatus.UNTOUCHED,
                  value: "",
                  required: true,
                  isOptional: false,
                },
                relationShipInsured: {
                  valid: ValidationStatus.UNTOUCHED,
                  value: "",
                  required: true,
                  isOptional: false,
                },
                extension: {
                  valid: ValidationStatus.VALID,
                  value: "",
                  required: false,
                  isOptional: true,
                  isDefaultValid: true,
                },
                payerContactNumber: {
                  valid: ValidationStatus.UNTOUCHED,
                  value: "",
                  required: true,
                  isOptional: false,
                },
              },
            },
          }));
        }
        break;
      case "Managed Medicaid":
        if (isPrimary) {
          updateFieldsToShowVar("Managed Medicaid", isPrimary);
          setData((dt: INewOrder) => ({
            ...dt,
            primaryInsurance: {
              ...updateExcept("managedMedicaid", dt.primaryInsurance),
              managedMedicaid: {
                payerName: {
                  valid: ValidationStatus.UNTOUCHED,
                  value: "",
                  required: true,
                  isOptional: false,
                },
                groupID: {
                  valid: ValidationStatus.VALID,
                  value: "",
                  required: false,
                  isOptional: true,
                  isDefaultValid: true,
                },
                memberID: {
                  valid: ValidationStatus.UNTOUCHED,
                  value: "",
                  required: true,
                  isOptional: false,
                },
                relationShipInsured: {
                  valid: ValidationStatus.UNTOUCHED,
                  value: "",
                  required: true,
                  isOptional: false,
                },
                extension: {
                  valid: ValidationStatus.VALID,
                  value: "",
                  required: false,
                  isOptional: true,
                  isDefaultValid: true,
                },
                payerContactNumber: {
                  valid: ValidationStatus.UNTOUCHED,
                  value: "",
                  required: true,
                  isOptional: false,
                },
              },
            },
          }));
        } else {
          updateFieldsToShowVar("Managed Medicaid", isPrimary);
          setData((dt: INewOrder) => ({
            ...dt,
            secondaryInsurance: {
              ...updateExcept("managedMedicaid", dt.secondaryInsurance),
              managedMedicaid: {
                payerName: {
                  valid: ValidationStatus.UNTOUCHED,
                  value: "",
                  required: true,
                  isOptional: false,
                },
                groupID: {
                  valid: ValidationStatus.VALID,
                  value: "",
                  required: false,
                  isOptional: true,
                  isDefaultValid: true,
                },
                memberID: {
                  valid: ValidationStatus.UNTOUCHED,
                  value: "",
                  required: true,
                  isOptional: false,
                },
                relationShipInsured: {
                  valid: ValidationStatus.UNTOUCHED,
                  value: "",
                  required: true,
                  isOptional: false,
                },
                extension: {
                  valid: ValidationStatus.VALID,
                  value: "",
                  required: false,
                  isOptional: true,
                  isDefaultValid: true,
                },
                payerContactNumber: {
                  valid: ValidationStatus.UNTOUCHED,
                  value: "",
                  required: true,
                  isOptional: false,
                },
              },
            },
          }));
        }
        break;
      case "Commercial Insurance":
        if (isPrimary) {
          updateFieldsToShowVar("Commercial Insurance", isPrimary);
          setData((dt: INewOrder) => ({
            ...dt,
            primaryInsurance: {
              ...updateExcept("commercialInsurance", dt.primaryInsurance),
              commercialInsurance: {
                payerName: {
                  valid: ValidationStatus.UNTOUCHED,
                  value: "",
                  required: true,
                  isOptional: false,
                },
                groupID: {
                  valid: ValidationStatus.VALID,
                  value: "",
                  required: false,
                  isOptional: true,
                  isDefaultValid: true,
                },
                memberID: {
                  valid: ValidationStatus.UNTOUCHED,
                  value: "",
                  required: true,
                  isOptional: false,
                },
                relationShipInsured: {
                  valid: ValidationStatus.UNTOUCHED,
                  value: "",
                  required: true,
                  isOptional: false,
                },
                extension: {
                  valid: ValidationStatus.VALID,
                  value: "",
                  required: false,
                  isOptional: true,
                  isDefaultValid: true,
                },
                payerContactNumber: {
                  valid: ValidationStatus.UNTOUCHED,
                  value: "",
                  required: true,
                  isOptional: false,
                },
              },
            },
          }));
        } else {
          updateFieldsToShowVar("Commercial Insurance", isPrimary);
          setData((dt: INewOrder) => ({
            ...dt,
            secondaryInsurance: {
              ...updateExcept("commercialInsurance", dt.secondaryInsurance),
              commercialInsurance: {
                payerName: {
                  valid: ValidationStatus.UNTOUCHED,
                  value: "",
                  required: true,
                  isOptional: false,
                },
                groupID: {
                  valid: ValidationStatus.VALID,
                  value: "",
                  required: false,
                  isOptional: true,
                  isDefaultValid: true,
                },
                memberID: {
                  valid: ValidationStatus.UNTOUCHED,
                  value: "",
                  required: true,
                  isOptional: false,
                },
                relationShipInsured: {
                  valid: ValidationStatus.UNTOUCHED,
                  value: "",
                  required: true,
                  isOptional: false,
                },
                extension: {
                  valid: ValidationStatus.VALID,
                  value: "",
                  required: false,
                  isOptional: true,
                  isDefaultValid: true,
                },
                payerContactNumber: {
                  valid: ValidationStatus.UNTOUCHED,
                  value: "",
                  required: true,
                  isOptional: false,
                },
              },
            },
          }));
        }
        break;
      case "Medicaid":
        if (isPrimary) {
          updateFieldsToShowVar("Medicaid", isPrimary);
          setData((dt: INewOrder) => ({
            ...dt,
            primaryInsurance: {
              ...updateExcept("medicaid", dt.primaryInsurance),
              medicaid: {
                memberID: {
                  value: "",
                  valid: ValidationStatus.UNTOUCHED,
                  required: true,
                  isOptional: false,
                },
                relationShipInsured: {
                  value: "",
                  valid: ValidationStatus.UNTOUCHED,
                  required: true,
                  isOptional: false,
                },
              },
            },
          }));
        } else {
          updateFieldsToShowVar("Medicaid", isPrimary);
          setData((dt: INewOrder) => ({
            ...dt,
            secondaryInsurance: {
              ...updateExcept("medicaid", dt.secondaryInsurance),
              medicaid: {
                memberID: {
                  value: "",
                  valid: ValidationStatus.UNTOUCHED,
                  required: true,
                  isOptional: false,
                },
                relationShipInsured: {
                  value: "",
                  valid: ValidationStatus.UNTOUCHED,
                  required: true,
                  isOptional: false,
                },
              },
            },
          }));
        }
        break;
      case "Charity Care":
        if (isPrimary) {
          updateFieldsToShowVar("Charity Care", isPrimary);
          setData((dt: INewOrder) => ({
            ...dt,
            primaryInsurance: {
              ...updateExcept("charityCare", dt.primaryInsurance),
              charityCare: {
                value: "",
                valid: ValidationStatus.VALID,
                required: true,
                isOptional: false,
                isDefaultValid: true,
              },
            },
          }));
        } else {
          updateFieldsToShowVar("Charity Care", isPrimary);
          setData((dt: INewOrder) => ({
            ...dt,
            secondaryInsurance: {
              ...updateExcept("charityCare", dt.secondaryInsurance),
              charityCare: {
                value: "",
                valid: ValidationStatus.VALID,
                required: true,
                isOptional: false,
                isDefaultValid: true,
              },
            },
          }));
        }
        break;
      case "Private Pay":
        if (isPrimary) {
          updateFieldsToShowVar("Private Pay", isPrimary);
          setData((dt: INewOrder) => ({
            ...dt,
            primaryInsurance: {
              ...updateExcept("privatePay", dt.primaryInsurance),
              privatePay: {
                value: "",
                valid: ValidationStatus.VALID,
                required: true,
                isOptional: false,
                isDefaultValid: true,
              },
            },
          }));
        } else {
          updateFieldsToShowVar("Private Pay", isPrimary);
          setData((dt: INewOrder) => ({
            ...dt,
            secondaryInsurance: {
              ...updateExcept("privatePay", dt.secondaryInsurance),
              privatePay: {
                value: "",
                valid: ValidationStatus.VALID,
                required: true,
                isOptional: false,
                isDefaultValid: true,
              },
            },
          }));
        }
        break;
      case "Other":
        if (isPrimary) {
          updateFieldsToShowVar("Other", isPrimary);
          setData((dt: INewOrder) => ({
            ...dt,
            primaryInsurance: {
              ...updateExcept("otherAdditionalDetails", dt.primaryInsurance),
              otherAdditionalDetails: {
                value: "",
                valid: ValidationStatus.UNTOUCHED,
                required: true,
                isOptional: false,
              },
            },
          }));
        } else {
          updateFieldsToShowVar("Other", isPrimary);
          setData((dt: INewOrder) => ({
            ...dt,
            secondaryInsurance: {
              ...updateExcept("otherAdditionalDetails", dt.secondaryInsurance),
              otherAdditionalDetails: {
                value: "",
                valid: ValidationStatus.UNTOUCHED,
                required: true,
                isOptional: false,
              },
            },
          }));
        }
        break;
      default:
        if (isPrimary) {
          NewOrderObj?.setShowAdditionalObject((dt: ShowAdditionalFields) => ({
            typePrimary: {
              medicare: false,
              medicareAdvantage: false,
              managedMedicaid: false,
              commercialInsurance: false,
              medicaid: false,
              charityCare: false,
              privatePay: false,
              otherAdditionalDetails: false,
              workerCompensation: true,
            },
            typeSecondary: dt.typeSecondary,
          }));
          setData((dt: INewOrder) => ({
            ...dt,
            primaryInsurance: {
              ...updateExcept("", dt.primaryInsurance),
            },
          }));
        } else {
          NewOrderObj?.setShowAdditionalObject((dt: ShowAdditionalFields) => ({
            typePrimary: dt.typePrimary,
            typeSecondary: {
              medicare: false,
              medicareAdvantage: false,
              managedMedicaid: false,
              commercialInsurance: false,
              medicaid: false,
              charityCare: false,
              privatePay: false,
              otherAdditionalDetails: false,
              workerCompensation: true,
            },
          }));
          setData((dt: INewOrder) => ({
            ...dt,
            secondaryInsurance: {
              ...updateExcept("", dt.secondaryInsurance),
            },
          }));
        }
        break;
    }
  };

  useEffect(() => {
    insuranceType = isPrimaryComponent
      ? data.primaryInsurance.insuranceType
      : data.secondaryInsurance.insuranceType;
  }, [
    data.primaryInsurance.insuranceType,
    data.secondaryInsurance.insuranceType,
  ]);

  return (
    <div className="insurance-informantion">
      <h2
        className="insurance-informantion-title"
        data-testid="insurance-informantion-title"
      >
        {`${
          isPrimaryComponent ? "Primary" : "Secondary"
        } Insurance Information`}
      </h2>
      <Grid
        className="insurance-informantion-grid-container"
        container
        spacing={2}
      >
        <Grid className="insurance-informantion-item" item xs={6}>
          <InputWithLabel
            label="Insurance Type"
            labelClassName="insurance-type-title"
            isRequired={insuranceType.required}
            error={insuranceType.valid === ValidationStatus.INVALID}
            testId={`${componentName}-insurance-type`}
          >
            <CustomDropDown
              handleChange={validateAndSetData}
              menuItem={dropDownTextArray}
              name={`${componentName}-insurance-type`}
              placeHolder="Select"
              selectpropsClassName={
                insuranceType.value
                  ? "insurance-informantion-select"
                  : "placeHolder"
              }
              selectClassName={
                insuranceType.value
                  ? "insurance-informantion-input"
                  : "placeHolder"
              }
              testId={`${componentName}-insurance-type-value`}
              value={insuranceType.value}
            />
          </InputWithLabel>
        </Grid>
      </Grid>
    </div>
  );
};
