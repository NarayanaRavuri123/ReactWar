import React from "react";
import { InputBase } from "@mui/material";
import { IAddWoundAssessment } from "../../addWoundAssessment.interface";
import { AddWoundAssessmentValidator } from "../../addWoundAssessment.validator";
import { ValidationStatus } from "../../../../../../../core/interfaces/input.interface";
import { InputWithLabel } from "../../../../../../../core/inputWithLabel/inputWithLabel.component";
import { woundInfectionData } from "../woundInfection.data";
import { ReactComponent as SelectedRadioButtonIcon } from "../../../../../../../assets/selectedRadioButton.svg";
import { ReactComponent as RadioButtonIcon } from "../../../../../../../assets/radioButton.svg";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import "./infectionTypes.css";

type Props = {
  data: IAddWoundAssessment;
  setData: React.Dispatch<React.SetStateAction<IAddWoundAssessment>>;
  Validator?: AddWoundAssessmentValidator;
};

const InfectionTypes = ({
  data,
  setData,
  Validator = new AddWoundAssessmentValidator(),
}: Props) => {
  const [validator] = React.useState<AddWoundAssessmentValidator>(Validator);
  const validateAndSetData = (e: any) => {
    const { value, name } = e.target;
    if (name === "selectedInfectionType") {
      setData({
        ...data,
        [name]: {
          value: value,
          valid: ValidationStatus.VALID,
          required: true,
        },
        selectedInfectionTypeOther: {
          value: "",
          valid: ValidationStatus.UNTOUCHED,
          required: value === "Other" ? true : false,
        },
      });
    } else {
      const isValid = validator.validate(value, name);
      setData({
        ...data,
        [name]: {
          value: value,
          valid: isValid?.status,
          required: true,
        },
        selectedInfectionType: {
          ...data.selectedInfectionType,
          valid: ValidationStatus.VALID,
        },
      });
    }
  };
  return (
    <div className="woundInfectionType">
      <FormControl>
        <FormLabel
          className="radioTitle"
          error={data.selectedInfectionType.valid === ValidationStatus.INVALID}
          data-testid="radioTitleID"
        >
          Type of infection
          {data.selectedInfectionType.required && (
            <span className="starAsterisk"> *</span>
          )}
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="selectedInfectionType"
          onChange={validateAndSetData}
          defaultValue={data.selectedInfectionType.value}
        >
          <div className="woundInfectionType-data">
            {woundInfectionData.map((x: any, index: any) => (
              <FormControlLabel
                key={index}
                value={x.value}
                componentsProps={{
                  typography: {
                    classes: {
                      root: "radioLabel",
                    },
                  },
                }}
                control={
                  <Radio
                    icon={<RadioButtonIcon />}
                    checkedIcon={<SelectedRadioButtonIcon />}
                  />
                }
                label={x.label}
              />
            ))}
            {data?.selectedInfectionTypeOther.required && (
              <InputWithLabel
                testId="selectedInfectionTypeOtherID"
                error={
                  data?.selectedInfectionTypeOther.valid ===
                  ValidationStatus.INVALID
                }
              >
                <InputBase
                  placeholder="Please describe"
                  autoFocus={data?.selectedInfectionTypeOther.value === ""}
                  className="selectedInfectionTypeOther-other-input"
                  name="selectedInfectionTypeOther"
                  onChange={validateAndSetData}
                  value={data?.selectedInfectionTypeOther.value}
                />
              </InputWithLabel>
            )}
          </div>
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default InfectionTypes;
