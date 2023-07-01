import React from "react";
import {
  Box,
  FormControlLabel,
  Grid,
  InputBase,
  Radio,
  RadioGroup,
} from "@mui/material";
import { IAddWoundAssessment } from "../../addWoundAssessment.interface";
import { AddWoundAssessmentValidator } from "../../addWoundAssessment.validator";
import "./resumptionMeasurement.css";
import { InputWithLabel } from "../../../../../../../core/inputWithLabel/inputWithLabel.component";
import { ReactComponent as SelectedRadioButtonIcon } from "../../../../../../../assets/selectedRadioButton.svg";
import { ReactComponent as RadioButtonIcon } from "../../../../../../../assets/radioButton.svg";
import { ValidationStatus } from "../../../../../../../core/interfaces/input.interface";
import {
  resumptionMeasureStatusNoReset,
  resumptionMeasureStatusYesReset,
} from "../holdOrHospitalization.utils";
import {
  formatedWoundValue,
  setActiveValue,
} from "../../../../../../../util/utilityFunctions";

interface Props {
  data: IAddWoundAssessment;
  setData: React.Dispatch<React.SetStateAction<IAddWoundAssessment>>;
  Validator?: AddWoundAssessmentValidator;
}
export const ResumptionMeasurement = ({
  data,
  setData,
  Validator = new AddWoundAssessmentValidator(),
}: Props) => {
  const [validator] = React.useState<AddWoundAssessmentValidator>(Validator);
  const [active, setActive] = React.useState<boolean | null>(
    setActiveValue(data?.resumptionMeasureStatus.value)
  );

  const validateAndSetData = (e: any) => {
    if (e.target.name === "resumptionMeasureStatus") {
      if (e.target.value === "yes") {
        resumptionMeasureStatusYesReset(data, setData);
        setActive(true);
      } else if (e.target.value === "no") {
        setActive(false);
        resumptionMeasureStatusNoReset(data, setData);
      } else {
        setActive(null);
      }
    }
  };

  const validateAndSetDepthData = (e: any) => {
    let { value, name, required } = e.target;
    let key: keyof typeof data = name;
    let isValid = validator.validate(value, name);
    if (isValid?.status === ValidationStatus.VALID) {
      setData({
        ...data,
        [name]: {
          value: value,
          valid:
            value.length === 0 && data[key].required
              ? ValidationStatus.INVALID
              : isValid?.status,
          required: required,
        },
      });
    }
  };

  const formatWoundZeros = async (e: any) => {
    let { value, name, required } = e.target;
    let key: keyof typeof data = name;
    let formatedValue = formatedWoundValue(data[key].value);
    setData({
      ...data,
      [name]: {
        value: formatedValue,
        valid:
          value.length === 0 && data[key].required
            ? ValidationStatus.INVALID
            : ValidationStatus.VALID,
        required: required,
      },
    });
    validateDepthValueNotZero(formatedValue, key);
  };

  const validateDepthValueNotZero = (
    value: string,
    key: keyof IAddWoundAssessment
  ) => {
    let convertValue = parseFloat(value);
    if (convertValue === 0) {
      data[key].value = value;
      data[key].valid = ValidationStatus.INVALID;
      setData(Object.assign({}, data));
    }
  };

  return (
    <div className="resumptionMeasurement">
      <Box className="resumptionMeasurement-box-container" sx={{ flexGrow: 1 }}>
        <Grid
          className="resumptionMeasurement-grid-container"
          container
          spacing={2}
        >
          <Grid className="resumptionMeasurement-grid-item" item xs={6}>
            <InputWithLabel
              label="Were measurements taken at resumption?"
              isRequired={data?.resumptionMeasureStatus.required}
              error={
                data?.resumptionMeasureStatus.valid === ValidationStatus.INVALID
              }
              testId="resumptionMeasureStatustitleid"
            >
              <RadioGroup
                name="resumptionMeasureStatus"
                classes={{ root: "radioRoot" }}
                onChange={validateAndSetData}
                value={data?.resumptionMeasureStatus.value}
              >
                <FormControlLabel
                  classes={{
                    root: active === true ? "optionRoot-active" : "optionRoot",
                  }}
                  componentsProps={{
                    typography: {
                      classes: {
                        root: active === true ? "optiontxtSelect" : "optiontxt",
                      },
                    },
                  }}
                  control={
                    <Radio
                      icon={<RadioButtonIcon />}
                      checkedIcon={<SelectedRadioButtonIcon />}
                    />
                  }
                  data-testid="resumptionMeasureStatus-yes"
                  label="Yes"
                  value="yes"
                />
                <FormControlLabel
                  classes={{
                    root: active === false ? "optionRoot-active" : "optionRoot",
                  }}
                  componentsProps={{
                    typography: {
                      classes: {
                        root:
                          active === false ? "optiontxtSelect" : "optiontxt",
                      },
                    },
                  }}
                  control={
                    <Radio
                      icon={<RadioButtonIcon />}
                      checkedIcon={<SelectedRadioButtonIcon />}
                    />
                  }
                  data-testid="resumptionMeasureStatus-no"
                  label="No"
                  value="no"
                />
              </RadioGroup>
            </InputWithLabel>
          </Grid>
        </Grid>
      </Box>
      {data?.resumptionMeasureStatus.value === "yes" && (
        <Box className="dimension-box-container" sx={{ flexGrow: 1 }}>
          <Grid className="dimension-grid-container" container spacing={2}>
            <Grid item xs={3}>
              <InputWithLabel
                label="Length (cm)"
                isRequired={data?.resumptionMeasureLenght.required}
                error={
                  data?.resumptionMeasureLenght.valid ===
                  ValidationStatus.INVALID
                }
                testId="woundLength-title"
              >
                <InputBase
                  placeholder="0"
                  className="depth-input"
                  name="resumptionMeasureLenght"
                  value={data?.resumptionMeasureLenght.value}
                  onChange={validateAndSetDepthData}
                  onBlur={formatWoundZeros}
                  required={data?.resumptionMeasureLenght.required}
                  data-testid="woundLength"
                />
              </InputWithLabel>
            </Grid>
            <Grid item xs={3}>
              <InputWithLabel
                label="Width (cm)"
                isRequired={data?.resumptionMeasureWidth.required}
                error={
                  data?.resumptionMeasureWidth.valid ===
                  ValidationStatus.INVALID
                }
                testId="woundWidth-title"
              >
                <InputBase
                  placeholder="0"
                  className="depth-input"
                  name="resumptionMeasureWidth"
                  value={data?.resumptionMeasureWidth.value}
                  onChange={validateAndSetDepthData}
                  onBlur={formatWoundZeros}
                  required={data?.resumptionMeasureWidth.required}
                  data-testid="woundWidth"
                />
              </InputWithLabel>
            </Grid>
            <Grid item xs={3}>
              <InputWithLabel
                label="Depth (cm)"
                isRequired={data?.resumptionMeasureDepth.required}
                error={
                  data?.resumptionMeasureDepth.valid ===
                  ValidationStatus.INVALID
                }
                testId="woundDepth-title"
              >
                <InputBase
                  placeholder="0"
                  className="depth-input"
                  name="resumptionMeasureDepth"
                  value={data?.resumptionMeasureDepth.value}
                  onChange={validateAndSetDepthData}
                  onBlur={formatWoundZeros}
                  required={data?.resumptionMeasureDepth.required}
                  data-testid="woundDepth"
                />
              </InputWithLabel>
            </Grid>
          </Grid>
        </Box>
      )}
    </div>
  );
};
