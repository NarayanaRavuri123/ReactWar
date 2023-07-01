import React from "react";
import { InputBase } from "@mui/material";
import { IAddWoundAssessment } from "../../addWoundAssessment.interface";
import { AddWoundAssessmentValidator } from "../../addWoundAssessment.validator";
import { ValidationStatus } from "../../../../../../../core/interfaces/input.interface";
import { InputWithLabel } from "../../../../../../../core/inputWithLabel/inputWithLabel.component";
import { CustomCheckBox } from "../../../../../../../core/checkBox/checkBox.component";
import "./treatmentRegimen.css";
import { getDeepClone } from "../../../../../../../util/ObjectFunctions";
import { treatmentRegimenData } from "../woundInfection.data";

type Props = {
  data: IAddWoundAssessment;
  setData: React.Dispatch<React.SetStateAction<IAddWoundAssessment>>;
  Validator?: AddWoundAssessmentValidator;
};

const TreatmentRegimen = ({
  data,
  setData,
  Validator = new AddWoundAssessmentValidator(),
}: Props) => {
  const [validator] = React.useState<AddWoundAssessmentValidator>(Validator);

  const validateAndSetData = (e: any) => {
    data?.treatmentRegimen.value.map((item: any) => {
      if (item.textBoxLabel === e.target.name) {
        item.textBoxValue = e.target.value;
        item.isTextBoxValueValid = validator.validate(
          e.target.value,
          "infectionRegimenItemText"
        )?.status;
      }
    });
    updateWoundData();
  };

  const validateTreatmentRegimen = (e: any) => {
    let itemRemoved = false;
    let lastUntouchedItem = false;
    if (e.target.name === "Untreated") {
      data.treatmentRegimen.value = getDeepClone(treatmentRegimenData);
    } else {
      data?.treatmentRegimen.value.map((x: any) => {
        if (x.label === "Untreated") {
          x.selected = false;
          x.isRequiredTextBox = false;
        }
      });
    }
    data?.treatmentRegimen.value.map((item: any) => {
      if (item.value === e.target.name) {
        item.selected = e.target.checked;
        if (item.selected === false) {
          updateItemToDefault(item);
          itemRemoved = true;
        }
      }
    });
    if (itemRemoved) {
      const selectedCheckBox = data?.treatmentRegimen.value.filter(
        (item: any) => item.selected
      );
      if (selectedCheckBox.length > 0) {
        const checkBoxWithTextBoxUntouched = selectedCheckBox.filter(
          (item: any) =>
            item.isRequiredTextBox &&
            item.isTextBoxValueValid === ValidationStatus.UNTOUCHED
        );
        lastUntouchedItem =
          checkBoxWithTextBoxUntouched.length > 0 ? false : true;
      }
    }
    updateWoundData(lastUntouchedItem);
  };

  const updateItemToDefault = (item: any) => {
    item.textBoxValue = null;
    item.isTextBoxValueValid = ValidationStatus.UNTOUCHED;
  };

  const updateWoundData = (isUserUpdated: boolean = false) => {
    const isValid = validator.validate(
      data?.treatmentRegimen.value,
      "treatmentRegimen"
    );
    const oldStatus = data?.treatmentRegimen.valid;
    if (isValid!.message !== null && isValid!.message === "null") {
      if (oldStatus !== ValidationStatus.UNTOUCHED) {
        data.treatmentRegimen.valid = ValidationStatus.INVALID;
      } else {
        data.treatmentRegimen.valid = isUserUpdated
          ? ValidationStatus.INVALID
          : oldStatus;
      }
    } else {
      data.treatmentRegimen.valid = isValid!.status!;
    }
    setData(Object.assign({}, data));
  };

  const validateAndDisable = () => {
    let result = false;
    data?.treatmentRegimen.value.map((x: any) => {
      if (x.label === "Untreated" && x.selected === true) {
        result = true;
      }
    });
    return result;
  };

  return (
    <div className="treatmentRegimen">
      <InputWithLabel
        label="Indicate Treatment Regimen"
        isRequired={true}
        error={data?.treatmentRegimen.valid === ValidationStatus.INVALID}
        labelClassName="treatmentRegimen-treatment-regimen-header"
        testId="treatment-regimen-header"
      >
        <div className="treatmentRegimen-treatment-regimen">
          {data?.treatmentRegimen.value.map((x: any, index: any) => (
            <div className="treatmentRegimen-checkbox-with-textbox">
              <CustomCheckBox
                name={x.value}
                selectClassName="treatmentRegimen-checkbox"
                selectpropsClassName="treatmentRegimen-checkbox-root"
                handleChange={validateTreatmentRegimen}
                labelClassName={
                  x.value !== "Untreated" && validateAndDisable()
                    ? "treatmentRegimen-checkbox-description-text-disable"
                    : x.selected
                    ? "treatmentRegimen-checkbox-description-text-active"
                    : "treatmentRegimen-checkbox-description-text"
                }
                checked={x.selected}
                value={x.value}
                key={index}
                required={false}
                labelText={x.label}
                testId={x.value}
                isDisabled={x.value !== "Untreated" && validateAndDisable()}
              />
              {x.selected && x.isRequiredTextBox && (
                <InputBase
                  autoFocus={x.textBoxValue === ""}
                  className="treatmentRegimen-input"
                  name={x.textBoxLabel}
                  onChange={validateAndSetData}
                  placeholder={x.textBoxPlaceHolder}
                  value={x.textBoxValue}
                  error={x.isTextBoxValueValid === ValidationStatus.INVALID}
                />
              )}
            </div>
          ))}
        </div>
      </InputWithLabel>
    </div>
  );
};

export default TreatmentRegimen;
