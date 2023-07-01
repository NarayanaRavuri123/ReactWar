import React, { useContext, useState } from "react";
import { NewOrderValidator } from "../newOrder.validator";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { ReactComponent as CalendarIcon } from "../../../assets/calendar.svg";
import "./woundDimension.css";
import { woundDimensionProps } from "./woundDimension.interfaces";
import { Box, FormControlLabel, Grid, Radio, RadioGroup } from "@mui/material";
import { ReactComponent as RadioButtonIcon } from "../../../assets/radioButton.svg";
import { ReactComponent as SelectedRadioButtonIcon } from "../../../assets/selectedRadioButton.svg";
import { InputWithLabel } from "../../../core/inputWithLabel/inputWithLabel.component";
import { ValidationStatus } from "../../../core/interfaces/input.interface";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import moment from "moment";
import WoundMeasurement from "./woundMeasurementDetails/woundMeasurement.component";
import { WoundDimensionReviewOrder } from "./reviewOrder/woundDimensionReviewOrder.component";
import { convertStringToDate } from "../../../util/utilityFunctions";
import {
  NewOrderContext,
  NewOrderContextType,
} from "../../../context/NewOrderContext";

const WoundDimension = ({
  editButtonClicked,
  isReviewOrder = false,
  isSecondaryWoundInfo,
  isOrderSummary = false,
  setWoundInfoData,
  woundInfoData,
  Validator = new NewOrderValidator(),
}: woundDimensionProps) => {
  const [focusClasses, setFocusClasses] = useState({
    woundMeasurementDate: "",
  });
  const [validator] = React.useState<NewOrderValidator>(Validator!);
  const NewOrderObj = useContext<NewOrderContextType | null>(NewOrderContext);
  const setClasses = (e: any, classname: string) => {
    setFocusClasses(
      Object.assign({}, focusClasses, { [e.target.name]: classname })
    );
  };

  const validateAndSetDate = (date: string | null | undefined) => {
    const formatteddate = convertStringToDate(date);
    NewOrderObj?.setIsHandleChangeTriggered(true);
    const isValid = Validator.validate(formatteddate!, "woundMeasurementDate");
    setWoundInfoData(
      Object.assign({}, woundInfoData, {
        woundMeasurementDate: {
          value: formatteddate,
          valid: isValid?.status,
          required: true,
        },
      })
    );
  };

  const validateAndSetData = (e: any) => {
    NewOrderObj?.setIsHandleChangeTriggered(true);
    let { value, name } = e.target;
    let isValid;
    isValid = validator.validate(value, name);
    setWoundInfoData(
      Object.assign({}, woundInfoData, {
        [name]: {
          value: value,
          valid: isValid?.status,
          required: true,
        },
      })
    );
  };

  return (
    <div
      className={
        isSecondaryWoundInfo
          ? "wound-dimensions-main-container-sec"
          : "wound-dimensions-main-container"
      }
    >
      {!isReviewOrder && (
        <div className="dimension" data-testid="dimension">
          <h2 className="dimension-title" data-testid="dimension-title">
            Wound Dimensions
          </h2>
          <div style={{ width: "266px" }}>
            <InputWithLabel
              labelClassName={focusClasses.woundMeasurementDate}
              label="Wound Measurement Date"
              isRequired={woundInfoData?.woundMeasurementDate.required}
              error={
                woundInfoData?.woundMeasurementDate.valid ===
                ValidationStatus.INVALID
              }
              testId="woundMeasurementDate-date-id"
            >
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  components={{ OpenPickerIcon: CalendarIcon }}
                  InputAdornmentProps={{
                    classes: {
                      root: "adornedRoot",
                    },
                  }}
                  InputProps={{
                    classes: {
                      root: `woundMeasurementDate ${
                        woundInfoData?.woundMeasurementDate.valid ===
                        ValidationStatus.INVALID
                          ? "showError"
                          : "noError"
                      }`,
                      input: "input",
                      notchedOutline: "outline",
                    },
                  }}
                  onChange={(value) => validateAndSetDate(value)}
                  renderInput={(params) => {
                    params.error = false;
                    params.inputProps!.placeholder = "__/__/____";
                    return (
                      <TextField
                        name="woundMeasurementDate"
                        onFocus={(e) => setClasses(e, "Mui-focused")}
                        onBlur={(e) => setClasses(e, "")}
                        {...params}
                      />
                    );
                  }}
                  value={woundInfoData?.woundMeasurementDate.value}
                />
              </LocalizationProvider>
            </InputWithLabel>
          </div>
          <WoundMeasurement
            setWoundInfoData={setWoundInfoData}
            woundInfoData={woundInfoData}
          />
          <Box className="dimension-box-container" sx={{ flexGrow: 1 }}>
            <Grid className="dimension-grid-container" container spacing={2}>
              <Grid className="dimension-grid-item" item xs={6}>
                <InputWithLabel
                  label="Is the wound full thickness?"
                  isRequired={woundInfoData?.woundThickness.required}
                  error={
                    woundInfoData?.woundThickness.valid ===
                    ValidationStatus.INVALID
                  }
                  testId="dimension-desp"
                >
                  <RadioGroup
                    name="woundThickness"
                    classes={{ root: "radioRoot" }}
                    onChange={validateAndSetData}
                    value={woundInfoData?.woundThickness.value}
                  >
                    <FormControlLabel
                      classes={{
                        root:
                          woundInfoData.woundThickness.value === "Yes"
                            ? "optionRoot-active"
                            : "optionRoot",
                      }}
                      componentsProps={{
                        typography: {
                          classes: {
                            root:
                              woundInfoData.woundThickness.value === "Yes"
                                ? "optiontxtSelect"
                                : "optiontxt",
                          },
                        },
                      }}
                      control={
                        <Radio
                          icon={<RadioButtonIcon />}
                          checkedIcon={<SelectedRadioButtonIcon />}
                        />
                      }
                      data-testid="woundThickness-Yes"
                      label="Yes"
                      value="Yes"
                    />
                    <FormControlLabel
                      classes={{
                        root:
                          woundInfoData.woundThickness.value === "No"
                            ? "optionRoot-active"
                            : "optionRoot",
                      }}
                      componentsProps={{
                        typography: {
                          classes: {
                            root:
                              woundInfoData.woundThickness.value === "No"
                                ? "optiontxtSelect"
                                : "optiontxt",
                          },
                        },
                      }}
                      control={
                        <Radio
                          icon={<RadioButtonIcon />}
                          checkedIcon={<SelectedRadioButtonIcon />}
                        />
                      }
                      data-testid="woundThickness-No"
                      label="No"
                      value="No"
                    />
                  </RadioGroup>
                </InputWithLabel>
              </Grid>
            </Grid>
          </Box>
        </div>
      )}
      {isReviewOrder && (
        <WoundDimensionReviewOrder
          editButtonClicked={editButtonClicked}
          isOrderSummary={isOrderSummary}
          woundInfoData={woundInfoData}
        />
      )}
    </div>
  );
};

export default WoundDimension;
