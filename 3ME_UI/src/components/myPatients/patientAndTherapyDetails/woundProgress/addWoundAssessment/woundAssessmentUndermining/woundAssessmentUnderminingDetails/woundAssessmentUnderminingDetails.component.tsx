import React from "react";
import "../woundAssessmentUndermining.css";
import { Box, Grid, InputBase } from "@mui/material";
import { IAddWoundAssessment } from "../../addWoundAssessment.interface";
import { formatedWoundValue } from "../../../../../../../util/utilityFunctions";
import { AddWoundAssessmentValidator } from "../../addWoundAssessment.validator";
import { ValidationStatus } from "../../../../../../../core/interfaces/input.interface";
import { woundAssessmentUnderminingProps } from "../woundAssessmentUndermining.interface";
import { CustomDropDown } from "../../../../../../../core/customDropdown/customDropdown.component";
import { InputWithLabel } from "../../../../../../../core/inputWithLabel/inputWithLabel.component";

const AssessmentUnderminingDetails = ({
  data,
  setData,
  positionDropDownData,
  Validator = new AddWoundAssessmentValidator(),
}: woundAssessmentUnderminingProps) => {
  const [validator] = React.useState<AddWoundAssessmentValidator>(Validator!);

  const formatWoundZeros = async (e: any) => {
    let { value, name, required } = e.target;
    let key: keyof typeof data = name;
    let formatedValue = formatedWoundValue(data[key].value);
    setData(
      Object.assign({}, data, {
        [name]: {
          value: formatedValue,
          valid:
            value.length === 0 && data[key].required
              ? ValidationStatus.INVALID
              : ValidationStatus.VALID,
          required: required,
        },
      })
    );
    validateDepthValueNotZero(formatedValue, key);
  };

  const validateAndSetData = (e: any) => {
    let { value, name, required } = e.target;
    let isValid = validator.validate(value, name);
    let key: keyof typeof data = name;
    setData(
      Object.assign({}, data, {
        [name]: {
          value: value,
          valid: isValid?.status,
          required: required,
        },
      })
    );
    if (
      name === "underminingLocation1PositionFrom" ||
      name === "underminingLocation2PositionFrom"
    ) {
      validateClockPositionNotSame(value, key);
    } else {
      validateClockEndingPositionNotSame(value, key);
    }
  };

  const validateAndSetDepthData = (e: any) => {
    let { value, name, required } = e.target;
    let key: keyof typeof data = name;
    let isValid = validator.validate(value, name);
    if (isValid?.status === ValidationStatus.VALID) {
      setData(
        Object.assign({}, data, {
          [name]: {
            value: value,
            valid:
              value.length === 0 && data[key].required
                ? ValidationStatus.INVALID
                : isValid?.status,
            required: required,
          },
        })
      );
    }
  };

  const validateClockPositionNotSame = (
    value: string,
    name: keyof typeof data
  ) => {
    if (
      value ===
        data[
          name === "underminingLocation1PositionFrom"
            ? "underminingLocation2PositionFrom"
            : "underminingLocation1PositionFrom"
        ].value &&
      value !== ""
    ) {
      setDefaultClockPositionValue(ValidationStatus.INVALID, value, name);
    } else if (
      value ===
        data[
          name === "underminingLocation1PositionFrom"
            ? "underminingLocation1PositionTo"
            : "underminingLocation2PositionTo"
        ].value &&
      value !== ""
    ) {
      if (name === "underminingLocation1PositionFrom") {
        setDefaultFromClockPosition1FromToValue(
          ValidationStatus.INVALID,
          value,
          name
        );
      } else {
        setDefaultFromClockPosition2FromToValue(
          ValidationStatus.INVALID,
          value,
          name
        );
      }
    } else {
      if (data[name].value) {
        setDefaultClockPositionValue(ValidationStatus.VALID, value, name);
      }
      if (
        value !==
          data[
            name === "underminingLocation1PositionFrom"
              ? "underminingLocation1PositionTo"
              : "underminingLocation2PositionTo"
          ].value &&
        value !== "" &&
        data[
          name === "underminingLocation1PositionFrom"
            ? "underminingLocation1PositionTo"
            : "underminingLocation2PositionTo"
        ].value !== ""
      ) {
        if (name === "underminingLocation1PositionFrom") {
          setDefaultFromClockPosition1FromToValue(
            ValidationStatus.VALID,
            value,
            name
          );
        } else {
          setDefaultFromClockPosition2FromToValue(
            ValidationStatus.VALID,
            value,
            name
          );
        }
      }
    }
  };

  const validateClockEndingPositionNotSame = (
    value: string,
    name: keyof typeof data
  ) => {
    if (
      value ===
        data[
          name === "underminingLocation1PositionTo"
            ? "underminingLocation2PositionTo"
            : "underminingLocation1PositionTo"
        ].value &&
      value !== ""
    ) {
      setDefaultClockEndingPositionValue(ValidationStatus.INVALID, value, name);
    } else if (
      value ===
        data[
          name === "underminingLocation1PositionTo"
            ? "underminingLocation1PositionFrom"
            : "underminingLocation2PositionFrom"
        ].value &&
      value !== ""
    ) {
      if (name === "underminingLocation1PositionTo") {
        setDefaultFromClockPosition1FromToValue(
          ValidationStatus.INVALID,
          value,
          name
        );
      } else {
        setDefaultFromClockPosition2FromToValue(
          ValidationStatus.INVALID,
          value,
          name
        );
      }
    } else {
      if (data[name].value) {
        setDefaultClockEndingPositionValue(ValidationStatus.VALID, value, name);
      }
      if (
        value !==
          data[
            name === "underminingLocation1PositionTo"
              ? "underminingLocation2PositionTo"
              : "underminingLocation1PositionTo"
          ].value &&
        data[
          name === "underminingLocation1PositionTo"
            ? "underminingLocation2PositionTo"
            : "underminingLocation1PositionTo"
        ].value !== ""
      ) {
        if (name === "underminingLocation1PositionTo") {
          setDefaultFromClockPosition1FromToValue(
            ValidationStatus.VALID,
            value,
            name
          );
        } else {
          setDefaultFromClockPosition2FromToValue(
            ValidationStatus.VALID,
            value,
            name
          );
        }
      }

      if (
        value !==
          data[
            name === "underminingLocation1PositionTo"
              ? "underminingLocation2PositionFrom"
              : "underminingLocation1PositionFrom"
          ].value &&
        data[
          name === "underminingLocation1PositionTo"
            ? "underminingLocation2PositionFrom"
            : "underminingLocation1PositionFrom"
        ].value === ""
      ) {
        if (name === "underminingLocation1PositionTo") {
          setDefaultFromClockPosition1FromToValue(
            ValidationStatus.VALID,
            value,
            name
          );
        }
      }
    }
  };

  const setDefaultFromClockPosition1FromToValue = (
    ValidationStatus: ValidationStatus,
    value: string,
    name: keyof typeof data
  ) => {
    data.underminingLocation1PositionFrom.valid = ValidationStatus;
    data.underminingLocation1PositionTo.valid = ValidationStatus;
    data[name].value = value;
    setData(Object.assign({}, data));
  };

  const setDefaultFromClockPosition2FromToValue = (
    ValidationStatus: ValidationStatus,
    value: string,
    name: keyof typeof data
  ) => {
    data.underminingLocation2PositionFrom.valid = ValidationStatus;
    data.underminingLocation2PositionTo.valid = ValidationStatus;
    data[name].value = value;
    setData(Object.assign({}, data));
  };

  const setDefaultClockPositionValue = (
    ValidationStatus: ValidationStatus,
    value: string,
    name: keyof typeof data
  ) => {
    if (name) data.underminingLocation1PositionFrom.valid = ValidationStatus;
    data.underminingLocation2PositionFrom.valid = ValidationStatus;
    data[name].value = value;
    setData(Object.assign({}, data));
  };

  const setDefaultClockEndingPositionValue = (
    ValidationStatus: ValidationStatus,
    value: string,
    name: keyof typeof data
  ) => {
    data.underminingLocation1PositionTo.valid = ValidationStatus;
    data.underminingLocation2PositionTo.valid = ValidationStatus;
    data[name].value = value;
    setData(Object.assign({}, data));
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
    <div>
      <Box className="undermining-box-container" sx={{ flexGrow: 1 }}>
        <Grid className="undermining-grid-container" container spacing={2}>
          <Grid item xs={3.2}>
            <InputWithLabel
              label="Location 1 Depth (cm)"
              isRequired={data?.underminingLocation1Depth.required}
              error={
                data?.underminingLocation1Depth.valid ===
                ValidationStatus.INVALID
              }
            >
              <InputBase
                className="depth-input"
                name="underminingLocation1Depth"
                value={data?.underminingLocation1Depth.value}
                onChange={validateAndSetDepthData}
                onBlur={formatWoundZeros}
                required={data?.underminingLocation1Depth.required}
                data-testid="underminingLocation1Depth"
              />
            </InputWithLabel>
          </Grid>
          <Grid item xs={0.8}>
            <div className="fromToText" data-testid="undermining-fromtest">
              from
            </div>
          </Grid>
          <Grid item xs={2.2}>
            <InputWithLabel
              label="Starting Position"
              isRequired={data?.underminingLocation1PositionFrom.required}
              error={
                data?.underminingLocation1PositionFrom.valid ===
                ValidationStatus.INVALID
              }
              testId="test-location1Position"
            >
              <CustomDropDown
                handleChange={validateAndSetData}
                menuItem={positionDropDownData}
                name="underminingLocation1PositionFrom"
                placeHolder="00:00"
                selectpropsClassName={
                  data.underminingLocation1PositionFrom.value
                    ? "clockPosition-select"
                    : "placeHolder"
                }
                selectClassName={
                  data.underminingLocation1PositionFrom.value
                    ? "clockPosition-input"
                    : "placeHolder"
                }
                testId="test-location1Position-dropdown"
                value={data?.underminingLocation1PositionFrom.value}
              />
            </InputWithLabel>
          </Grid>
          <Grid item xs={0.5}>
            <div className="fromToText" data-testid="undermining-totest">
              to
            </div>
          </Grid>
          <Grid item xs={2.2}>
            <InputWithLabel
              label="Ending Position"
              isRequired={data?.underminingLocation1PositionTo.required}
              error={
                data?.underminingLocation1PositionTo.valid ===
                ValidationStatus.INVALID
              }
              testId="test-location1Position"
            >
              <CustomDropDown
                handleChange={validateAndSetData}
                menuItem={positionDropDownData}
                name="underminingLocation1PositionTo"
                placeHolder="00:00"
                selectpropsClassName={
                  data.underminingLocation1PositionTo.value
                    ? "clockPosition-select"
                    : "placeHolder"
                }
                selectClassName={
                  data.underminingLocation1PositionTo.value
                    ? "clockPosition-input"
                    : "placeHolder"
                }
                testId="test-underminingLocation1PositionTo-dropdown"
                value={data?.underminingLocation1PositionTo.value}
              />
            </InputWithLabel>
          </Grid>
          <div className="clockText1" data-testid="underminingoclock">
            o’clock
          </div>
        </Grid>
      </Box>
      <Box className="undermining-box-container" sx={{ flexGrow: 1 }}>
        <Grid className="undermining-grid-container" container spacing={2}>
          <Grid item xs={3.2}>
            <InputWithLabel
              label="Location 2 Depth (cm)"
              isRequired={data?.underminingLocation2Depth.required}
              error={
                data?.underminingLocation2Depth.valid ===
                ValidationStatus.INVALID
              }
            >
              <InputBase
                className="depth-input"
                name="underminingLocation2Depth"
                value={data?.underminingLocation2Depth.value}
                onChange={validateAndSetDepthData}
                onBlur={formatWoundZeros}
                required={data?.underminingLocation2Depth.required}
                data-testid="underminingLocation2Depth"
              />
            </InputWithLabel>
          </Grid>
          <Grid item xs={0.8}>
            <div className="fromToText" data-testid="undermining1-fromtest">
              from
            </div>
          </Grid>
          <Grid item xs={2.2}>
            <InputWithLabel
              label="Starting Position"
              isRequired={data?.underminingLocation2PositionFrom.required}
              error={
                data?.underminingLocation2PositionFrom.valid ===
                ValidationStatus.INVALID
              }
              testId="test-underminingLocation2PositionFrom"
            >
              <CustomDropDown
                handleChange={validateAndSetData}
                menuItem={positionDropDownData}
                name="underminingLocation2PositionFrom"
                placeHolder="00:00"
                selectpropsClassName={
                  data.underminingLocation2PositionFrom.value
                    ? "clockPosition-select"
                    : "placeHolder"
                }
                selectClassName={
                  data.underminingLocation2PositionFrom.value
                    ? "clockPosition-input"
                    : "placeHolder"
                }
                testId="test-location2Position-dropdown"
                value={data?.underminingLocation2PositionFrom.value}
              />
            </InputWithLabel>
          </Grid>
          <Grid item xs={0.5}>
            <div className="fromToText" data-testid="undermining1-totest">
              to
            </div>
          </Grid>
          <Grid item xs={2.2}>
            <InputWithLabel
              label="Ending Position"
              isRequired={data?.underminingLocation2PositionTo.required}
              error={
                data?.underminingLocation2PositionTo.valid ===
                ValidationStatus.INVALID
              }
              testId="test-underminingLocation2PositionTo"
            >
              <CustomDropDown
                handleChange={validateAndSetData}
                menuItem={positionDropDownData}
                name="underminingLocation2PositionTo"
                placeHolder="00:00"
                selectpropsClassName={
                  data.underminingLocation2PositionTo.value
                    ? "clockPosition-select"
                    : "placeHolder"
                }
                selectClassName={
                  data.underminingLocation2PositionTo.value
                    ? "clockPosition-input"
                    : "placeHolder"
                }
                testId="test-underminingLocation2PositionTo-dropdown"
                value={data?.underminingLocation2PositionTo.value}
              />
            </InputWithLabel>
          </Grid>
          <div className="clockText1" data-testid="oclock1">
            o’clock
          </div>
        </Grid>
      </Box>
    </div>
  );
};

export default AssessmentUnderminingDetails;
