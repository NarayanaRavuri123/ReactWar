import React from "react";
import { Box, Grid, InputBase } from "@mui/material";
import { NewOrderValidator } from "../../newOrder.validator";
import { woundUnderminingProps } from "../woundUndermining.interface";
import { formatedWoundValue } from "../../../../util/utilityFunctions";
import { ValidationStatus } from "../../../../core/interfaces/input.interface";
import { CustomDropDown } from "../../../../core/customDropdown/customDropdown.component";
import { InputWithLabel } from "../../../../core/inputWithLabel/inputWithLabel.component";
import { INewOrderWoundInfo } from "../../newOrderWoundInfoStepper/newOrderWoundInfo.interface";
import { ISecondaryWoundInfo } from "../../clinicalInformation/secondaryWoundInfo/secondaryWoundInfo.interface";

const UnderminingDetails = ({
  woundInfoData,
  setWoundInfoData,
  positionDropDownData,
  Validator = new NewOrderValidator(),
}: woundUnderminingProps) => {
  const [validator] = React.useState<NewOrderValidator>(Validator!);

  const formatWoundZeros = async (e: any) => {
    let { value, name, required } = e.target;
    let key: keyof typeof woundInfoData = name;
    let formatedValue = formatedWoundValue(woundInfoData[key].value);
    setWoundInfoData(
      Object.assign({}, woundInfoData, {
        [name]: {
          value: formatedValue,
          valid:
            value.length === 0 && woundInfoData[key].required
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
    let key: keyof typeof woundInfoData = name;
    setWoundInfoData(
      Object.assign({}, woundInfoData, {
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
    let key: keyof typeof woundInfoData = name;
    let isValid = validator.validate(value, name);
    if (isValid?.status === ValidationStatus.VALID) {
      setWoundInfoData(
        Object.assign({}, woundInfoData, {
          [name]: {
            value: value,
            valid:
              value.length === 0 && woundInfoData[key].required
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
    name: keyof typeof woundInfoData
  ) => {
    if (
      value ===
        woundInfoData[
          name === "underminingLocation1PositionFrom"
            ? "underminingLocation2PositionFrom"
            : "underminingLocation1PositionFrom"
        ].value &&
      value !== ""
    ) {
      setDefaultClockPositionValue(ValidationStatus.INVALID, value, name);
    } else if (
      value ===
        woundInfoData[
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
      if (woundInfoData[name].value) {
        setDefaultClockPositionValue(ValidationStatus.VALID, value, name);
      }
      if (
        value !==
          woundInfoData[
            name === "underminingLocation1PositionFrom"
              ? "underminingLocation1PositionTo"
              : "underminingLocation2PositionTo"
          ].value &&
        value !== "" &&
        woundInfoData[
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
    name: keyof typeof woundInfoData
  ) => {
    if (
      value ===
        woundInfoData[
          name === "underminingLocation1PositionTo"
            ? "underminingLocation2PositionTo"
            : "underminingLocation1PositionTo"
        ].value &&
      value !== ""
    ) {
      setDefaultClockEndingPositionValue(ValidationStatus.INVALID, value, name);
    } else if (
      value ===
        woundInfoData[
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
      if (woundInfoData[name].value) {
        setDefaultClockEndingPositionValue(ValidationStatus.VALID, value, name);
      }
      if (
        value !==
          woundInfoData[
            name === "underminingLocation1PositionTo"
              ? "underminingLocation2PositionTo"
              : "underminingLocation1PositionTo"
          ].value &&
        woundInfoData[
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
          woundInfoData[
            name === "underminingLocation1PositionTo"
              ? "underminingLocation2PositionFrom"
              : "underminingLocation1PositionFrom"
          ].value &&
        woundInfoData[
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
    name: keyof typeof woundInfoData
  ) => {
    woundInfoData.underminingLocation1PositionFrom.valid = ValidationStatus;
    woundInfoData.underminingLocation1PositionTo.valid = ValidationStatus;
    woundInfoData[name].value = value;
    setWoundInfoData(Object.assign({}, woundInfoData));
  };

  const setDefaultFromClockPosition2FromToValue = (
    ValidationStatus: ValidationStatus,
    value: string,
    name: keyof typeof woundInfoData
  ) => {
    woundInfoData.underminingLocation2PositionFrom.valid = ValidationStatus;
    woundInfoData.underminingLocation2PositionTo.valid = ValidationStatus;
    woundInfoData[name].value = value;
    setWoundInfoData(Object.assign({}, woundInfoData));
  };

  const setDefaultClockPositionValue = (
    ValidationStatus: ValidationStatus,
    value: string,
    name: keyof typeof woundInfoData
  ) => {
    if (name)
      woundInfoData.underminingLocation1PositionFrom.valid = ValidationStatus;
    woundInfoData.underminingLocation2PositionFrom.valid = ValidationStatus;
    woundInfoData[name].value = value;
    setWoundInfoData(Object.assign({}, woundInfoData));
  };

  const setDefaultClockEndingPositionValue = (
    ValidationStatus: ValidationStatus,
    value: string,
    name: keyof typeof woundInfoData
  ) => {
    woundInfoData.underminingLocation1PositionTo.valid = ValidationStatus;
    woundInfoData.underminingLocation2PositionTo.valid = ValidationStatus;
    woundInfoData[name].value = value;
    setWoundInfoData(Object.assign({}, woundInfoData));
  };

  const validateDepthValueNotZero = (
    value: string,
    key: keyof (INewOrderWoundInfo | ISecondaryWoundInfo)
  ) => {
    let convertValue = parseFloat(value);
    if (convertValue === 0) {
      woundInfoData[key].value = value;
      woundInfoData[key].valid = ValidationStatus.INVALID;
      setWoundInfoData(Object.assign({}, woundInfoData));
    }
  };

  return (
    <div>
      <Box className="undermining-box-container" sx={{ flexGrow: 1 }}>
        <Grid className="undermining-grid-container" container spacing={2}>
          <Grid item xs={3.2}>
            <InputWithLabel
              label="Location 1 Depth (cm)"
              isRequired={woundInfoData?.underminingLocation1Depth.required}
              error={
                woundInfoData?.underminingLocation1Depth.valid ===
                ValidationStatus.INVALID
              }
            >
              <InputBase
                className="depth-input"
                name="underminingLocation1Depth"
                value={woundInfoData?.underminingLocation1Depth.value}
                onChange={validateAndSetDepthData}
                onBlur={formatWoundZeros}
                required={woundInfoData?.underminingLocation1Depth.required}
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
              isRequired={
                woundInfoData?.underminingLocation1PositionFrom.required
              }
              error={
                woundInfoData?.underminingLocation1PositionFrom.valid ===
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
                  woundInfoData.underminingLocation1PositionFrom.value
                    ? "clockPosition-select"
                    : "placeHolder"
                }
                selectClassName={
                  woundInfoData.underminingLocation1PositionFrom.value
                    ? "clockPosition-input"
                    : "placeHolder"
                }
                testId="test-location1Position-dropdown"
                value={woundInfoData?.underminingLocation1PositionFrom.value}
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
              isRequired={
                woundInfoData?.underminingLocation1PositionTo.required
              }
              error={
                woundInfoData?.underminingLocation1PositionTo.valid ===
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
                  woundInfoData.underminingLocation1PositionTo.value
                    ? "clockPosition-select"
                    : "placeHolder"
                }
                selectClassName={
                  woundInfoData.underminingLocation1PositionTo.value
                    ? "clockPosition-input"
                    : "placeHolder"
                }
                testId="test-underminingLocation1PositionTo-dropdown"
                value={woundInfoData?.underminingLocation1PositionTo.value}
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
              isRequired={woundInfoData?.underminingLocation2Depth.required}
              error={
                woundInfoData?.underminingLocation2Depth.valid ===
                ValidationStatus.INVALID
              }
            >
              <InputBase
                className="depth-input"
                name="underminingLocation2Depth"
                value={woundInfoData?.underminingLocation2Depth.value}
                onChange={validateAndSetDepthData}
                onBlur={formatWoundZeros}
                required={woundInfoData?.underminingLocation2Depth.required}
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
              isRequired={
                woundInfoData?.underminingLocation2PositionFrom.required
              }
              error={
                woundInfoData?.underminingLocation2PositionFrom.valid ===
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
                  woundInfoData.underminingLocation2PositionFrom.value
                    ? "clockPosition-select"
                    : "placeHolder"
                }
                selectClassName={
                  woundInfoData.underminingLocation2PositionFrom.value
                    ? "clockPosition-input"
                    : "placeHolder"
                }
                testId="test-location2Position-dropdown"
                value={woundInfoData?.underminingLocation2PositionFrom.value}
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
              isRequired={
                woundInfoData?.underminingLocation2PositionTo.required
              }
              error={
                woundInfoData?.underminingLocation2PositionTo.valid ===
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
                  woundInfoData.underminingLocation2PositionTo.value
                    ? "clockPosition-select"
                    : "placeHolder"
                }
                selectClassName={
                  woundInfoData.underminingLocation2PositionTo.value
                    ? "clockPosition-input"
                    : "placeHolder"
                }
                testId="test-underminingLocation2PositionTo-dropdown"
                value={woundInfoData?.underminingLocation2PositionTo.value}
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

export default UnderminingDetails;
