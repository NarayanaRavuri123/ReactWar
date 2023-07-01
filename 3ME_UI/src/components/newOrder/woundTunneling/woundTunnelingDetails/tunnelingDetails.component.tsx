import React from "react";
import { Box, Grid, InputBase } from "@mui/material";
import { NewOrderValidator } from "../../newOrder.validator";
import { woundTunnelingProps } from "../woundTunneling.interfaces";
import {
  formatedWoundValue,
  getCodeFromText,
  getTextFromCode,
} from "../../../../util/utilityFunctions";
import { ValidationStatus } from "../../../../core/interfaces/input.interface";
import { CustomDropDown } from "../../../../core/customDropdown/customDropdown.component";
import { InputWithLabel } from "../../../../core/inputWithLabel/inputWithLabel.component";
import { INewOrderWoundInfo } from "../../newOrderWoundInfoStepper/newOrderWoundInfo.interface";
import { ISecondaryWoundInfo } from "../../clinicalInformation/secondaryWoundInfo/secondaryWoundInfo.interface";
import { IAddWoundAssessment } from "../../../myPatients/patientAndTherapyDetails/woundProgress/addWoundAssessment/addWoundAssessment.interface";

const TunnelingDetails = ({
  woundInfoData,
  setWoundInfoData,
  positionDropDownData,
  positionDropDownDataText,
  Validator = new NewOrderValidator(),
}: woundTunnelingProps) => {
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
    let { value, name } = e.target;
    let isValid = validator.validate(value, name);
    let key: keyof typeof woundInfoData = name;
    value = getCodeFromText(positionDropDownData, e.target.value);
    setWoundInfoData(
      Object.assign({}, woundInfoData, {
        [name]: {
          value: value,
          valid: isValid?.status,
          required: woundInfoData[key].required,
        },
      })
    );
    validateClockPositionNotSame(value, key);
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
          name === "location1Position"
            ? "location2Position"
            : "location1Position"
        ].value &&
      value !== ""
    ) {
      setDefaultClockPositionValue(ValidationStatus.INVALID, value, name);
    } else {
      if (woundInfoData[name].value) {
        setDefaultClockPositionValue(ValidationStatus.VALID, value, name);
      }
    }
  };

  const setDefaultClockPositionValue = (
    ValidationStatus: ValidationStatus,
    value: string,
    name: keyof typeof woundInfoData
  ) => {
    woundInfoData.location1Position.valid = ValidationStatus;
    woundInfoData.location2Position.valid = ValidationStatus;
    woundInfoData[name].value = value;
    setWoundInfoData(Object.assign({}, woundInfoData));
  };

  const validateDepthValueNotZero = (
    value: string,
    key: keyof (INewOrderWoundInfo | ISecondaryWoundInfo | IAddWoundAssessment)
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
      <Box className="tunneling-box-container" sx={{ flexGrow: 1 }}>
        <Grid className="tunneling-grid-container" container spacing={2}>
          <Grid item xs={3.2}>
            <InputWithLabel
              label="Location 1 Depth (cm)"
              isRequired={woundInfoData?.location1Depth.required}
              error={
                woundInfoData?.location1Depth.valid === ValidationStatus.INVALID
              }
            >
              <InputBase
                className="depth-input"
                name="location1Depth"
                value={woundInfoData?.location1Depth.value}
                onChange={validateAndSetDepthData}
                onBlur={formatWoundZeros}
                required={woundInfoData?.location1Depth.required}
                data-testid="location1Depth"
              />
            </InputWithLabel>
          </Grid>
          <Grid item xs={2.2}>
            <InputWithLabel
              label="Clock Position"
              isRequired={woundInfoData?.location1Position.required}
              error={
                woundInfoData?.location1Position.valid ===
                ValidationStatus.INVALID
              }
              testId="test-location1Position"
            >
              <CustomDropDown
                handleChange={validateAndSetData}
                menuItem={positionDropDownDataText}
                name="location1Position"
                placeHolder="00:00"
                selectpropsClassName={
                  woundInfoData.location1Position.value
                    ? "clockPosition-select"
                    : "placeHolder"
                }
                selectClassName={
                  woundInfoData.location1Position.value
                    ? "clockPosition-input"
                    : "placeHolder"
                }
                testId="test-location1Position-dropdown"
                value={
                  woundInfoData?.location1Position.value
                    ? getTextFromCode(
                        positionDropDownData,
                        woundInfoData?.location1Position.value
                      )
                    : null
                }
              />
            </InputWithLabel>
          </Grid>
          <div className="clockText" data-testid="oclock">
            o’clock
          </div>
        </Grid>
      </Box>
      <Box className="tunneling-box-container" sx={{ flexGrow: 1 }}>
        <Grid className="tunneling-grid-container" container spacing={2}>
          <Grid item xs={3.2}>
            <InputWithLabel
              label="Location 2 Depth (cm)"
              isRequired={woundInfoData?.location2Depth.required}
              error={
                woundInfoData?.location2Depth.valid === ValidationStatus.INVALID
              }
            >
              <InputBase
                className="depth-input"
                name="location2Depth"
                value={woundInfoData?.location2Depth.value}
                onChange={validateAndSetDepthData}
                onBlur={formatWoundZeros}
                required={woundInfoData?.location2Depth.required}
                data-testid="location2Depth"
              />
            </InputWithLabel>
          </Grid>
          <Grid item xs={2.2}>
            <InputWithLabel
              label="Clock Position"
              isRequired={woundInfoData?.location2Position.required}
              error={
                woundInfoData?.location2Position.valid ===
                ValidationStatus.INVALID
              }
              testId="test-location2Position"
            >
              <CustomDropDown
                handleChange={validateAndSetData}
                menuItem={positionDropDownDataText}
                name="location2Position"
                placeHolder="00:00"
                selectpropsClassName={
                  woundInfoData.location2Position.value
                    ? "clockPosition-select"
                    : "placeHolder"
                }
                selectClassName={
                  woundInfoData.location2Position.value
                    ? "clockPosition-input"
                    : "placeHolder"
                }
                testId="test-location2Position-dropdown"
                value={
                  woundInfoData?.location2Position.value
                    ? getTextFromCode(
                        positionDropDownData,
                        woundInfoData?.location2Position.value
                      )
                    : null
                }
              />
            </InputWithLabel>
          </Grid>
          <div className="clockText" data-testid="oclock1">
            o’clock
          </div>
        </Grid>
      </Box>
    </div>
  );
};

export default TunnelingDetails;
