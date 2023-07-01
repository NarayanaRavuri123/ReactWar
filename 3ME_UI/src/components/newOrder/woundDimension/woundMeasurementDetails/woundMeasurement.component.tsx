import React from "react";
import { Box, Grid } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import { NewOrderValidator } from "../../newOrder.validator";
import { woundDimensionProps } from "../woundDimension.interfaces";
import { formatedWoundValue } from "../../../../util/utilityFunctions";
import { ValidationStatus } from "../../../../core/interfaces/input.interface";
import { InputWithLabel } from "../../../../core/inputWithLabel/inputWithLabel.component";
import { INewOrderWoundInfo } from "../../newOrderWoundInfoStepper/newOrderWoundInfo.interface";
import { ISecondaryWoundInfo } from "../../clinicalInformation/secondaryWoundInfo/secondaryWoundInfo.interface";

const WoundMeasurement = ({
  woundInfoData,
  setWoundInfoData,
  Validator = new NewOrderValidator(),
}: woundDimensionProps) => {
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
    <Box className="dimension-box-container" sx={{ flexGrow: 1 }}>
      <Grid className="dimension-grid-container" container spacing={2}>
        <Grid item xs={2.53}>
          <InputWithLabel
            label="Length (cm)"
            isRequired={woundInfoData?.woundLength.required}
            error={
              woundInfoData?.woundLength.valid === ValidationStatus.INVALID
            }
            testId="woundLength-title"
          >
            <InputBase
              placeholder="0"
              className="depth-input"
              name="woundLength"
              value={woundInfoData?.woundLength.value}
              onChange={validateAndSetDepthData}
              onBlur={formatWoundZeros}
              required={woundInfoData?.woundLength.required}
              data-testid="woundLength"
            />
          </InputWithLabel>
        </Grid>
        <Grid item xs={2.53}>
          <InputWithLabel
            label="Width (cm)"
            isRequired={woundInfoData?.woundWidth.required}
            error={woundInfoData?.woundWidth.valid === ValidationStatus.INVALID}
            testId="woundWidth-title"
          >
            <InputBase
              placeholder="0"
              className="depth-input"
              name="woundWidth"
              value={woundInfoData?.woundWidth.value}
              onChange={validateAndSetDepthData}
              onBlur={formatWoundZeros}
              required={woundInfoData?.woundWidth.required}
              data-testid="woundWidth"
            />
          </InputWithLabel>
        </Grid>
        <Grid item xs={2.53}>
          <InputWithLabel
            label="Depth (cm)"
            isRequired={woundInfoData?.woundDepth.required}
            error={woundInfoData?.woundDepth.valid === ValidationStatus.INVALID}
            testId="woundDepth-title"
          >
            <InputBase
              placeholder="0"
              className="depth-input"
              name="woundDepth"
              value={woundInfoData?.woundDepth.value}
              onChange={validateAndSetDepthData}
              onBlur={formatWoundZeros}
              required={woundInfoData?.woundDepth.required}
              data-testid="woundDepth"
            />
          </InputWithLabel>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WoundMeasurement;
