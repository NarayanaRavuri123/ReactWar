import "./woundMeasurement.css";
import { useEffect, useState } from "react";
import { Grid, InputBase } from "@mui/material";
import {
  IInputField,
  ValidationStatus,
} from "../../../../../../core/interfaces/input.interface";
import { IWoundMeasurement } from "./woundMeasurement.interface";
import { formatedWoundValue } from "../../../../../../util/utilityFunctions";
import { NewOrderValidator } from "../../../../../newOrder/newOrder.validator";
import { InputWithLabel } from "../../../../../../core/inputWithLabel/inputWithLabel.component";

export const WoundMeasurement = ({
  updateWoundMeasurement,
  wound,
}: IWoundMeasurement) => {
  const defaultValue = {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  };
  const [length, setLength] = useState<IInputField>(defaultValue);
  const [width, setWidth] = useState<IInputField>(defaultValue);
  const [depth, setDepth] = useState<IInputField>(defaultValue);

  const formatWoundZeros = async (e: any) => {
    let { value, name } = e.target;
    let formatedValue = formatedWoundValue(value);
    updateValue(
      name,
      formatedValue,
      value.length === 0 ? ValidationStatus.INVALID : ValidationStatus.VALID,
      true
    );
    validateDepthValueNotZero(name, formatedValue);
  };

  const validateDepthValueNotZero = (name: string, value: string) => {
    let convertValue = parseFloat(value);
    if (convertValue === 0) {
      updateValue(name, value, ValidationStatus.INVALID, true);
    }
  };

  const validateAndSetData = (e: any) => {
    let { value, name } = e.target;
    const validator = new NewOrderValidator();
    let isValid = validator.validate(value, name);
    if (isValid?.status === ValidationStatus.VALID) {
      updateValue(
        e.target.name,
        e.target.value,
        isValid.status,
        !isNaN(parseFloat(e.target.value))
      );
    }
  };

  const updateValue = (
    name: string,
    value: string,
    valid: ValidationStatus,
    isUpdateWound: boolean = false
  ) => {
    switch (name) {
      case "length":
        setLength({ value: value, valid: valid });
        if (isUpdateWound) {
          const length = parseFloat(value);
          wound.length = length;
        }
        break;
      case "width":
        setWidth({ value: value, valid: valid });
        if (isUpdateWound) {
          const width = parseFloat(value);
          wound.width = isNaN(width) ? null : width;
        }
        break;
      case "depth":
        setDepth({ value: value, valid: valid });
        if (isUpdateWound) {
          const depth = parseFloat(value);
          wound.depth = isNaN(depth) ? null : depth;
        }
        break;
      default:
        break;
    }
    if (isUpdateWound) {
      updateWoundMeasurement(wound);
    }
  };

  useEffect(() => {
    if (wound && wound.isValid !== undefined) {
      setLength({
        valid:
          wound.length !== null && wound.length !== 0
            ? ValidationStatus.VALID
            : ValidationStatus.INVALID,
        value: wound.length ? wound.length.toString() : "",
      });
      setWidth({
        valid:
          wound.width !== null && wound.width !== 0
            ? ValidationStatus.VALID
            : ValidationStatus.INVALID,
        value: wound.width ? wound.width.toString() : "",
      });
      setDepth({
        valid:
          wound.depth !== null && wound.depth !== 0
            ? ValidationStatus.VALID
            : ValidationStatus.INVALID,
        value: wound.depth ? wound.depth.toString() : "",
      });
    }
  }, [wound?.isValid]);

  return (
    <div className="wound-measurement">
      <h4 className="wound-measurement-title">Wound measurements</h4>
      <Grid className="wound-measurement-container" container spacing={2}>
        <Grid className="wound-measurement-item" item xs={4}>
          <InputWithLabel
            label="Length"
            labelClassName="wound-measurement-value-title"
            isRequired={true}
            error={length.valid === ValidationStatus.INVALID}
            testId="wound-measurement-length"
          >
            <InputBase
              className="wound-measurement-input"
              inputProps={{
                "data-testid": "wound-measurement-length-value",
              }}
              name="length"
              onChange={validateAndSetData}
              onBlur={formatWoundZeros}
              placeholder="0"
              value={length.value !== "NaN" ? length.value : ""}
            />
          </InputWithLabel>
        </Grid>
        <Grid className="wound-measurement-item" item xs={4}>
          <InputWithLabel
            label="Width"
            labelClassName="wound-measurement-value-title"
            isRequired={true}
            error={width.valid === ValidationStatus.INVALID}
            testId="wound-measurement-width"
          >
            <InputBase
              className="wound-measurement-input"
              inputProps={{
                "data-testid": "wound-measurement-width-value",
              }}
              name="width"
              onChange={validateAndSetData}
              onBlur={formatWoundZeros}
              placeholder="0"
              value={width.value !== "NaN" ? width.value : ""}
            />
          </InputWithLabel>
        </Grid>
        <Grid className="wound-measurement-item" item xs={4}>
          <InputWithLabel
            label="Depth"
            labelClassName="wound-measurement-value-title"
            isRequired={true}
            error={depth.valid === ValidationStatus.INVALID}
            testId="wound-measurement-depth"
          >
            <InputBase
              className="wound-measurement-input"
              inputProps={{
                "data-testid": "wound-measurement-depth-value",
              }}
              name="depth"
              onChange={validateAndSetData}
              onBlur={formatWoundZeros}
              placeholder="0"
              value={depth.value !== "NaN" ? depth.value : ""}
            />
          </InputWithLabel>
        </Grid>
      </Grid>
    </div>
  );
};
