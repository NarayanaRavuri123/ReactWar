import React, { useEffect, useState } from "react";
import "./woundMeasurement.css";
import {
  Box,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import InputBase from "@mui/material/InputBase";
import { InputWithLabel } from "../../../../../../core/inputWithLabel/inputWithLabel.component";
import { ValidationStatus } from "../../../../../../core/interfaces/input.interface";
import { IAddWoundAssessment } from "../addWoundAssessment.interface";
import { AddWoundAssessmentValidator } from "../addWoundAssessment.validator";
import { ReactComponent as SelectedRadioButtonIcon } from "../../../../../../assets/selectedRadioButton.svg";
import { ReactComponent as RadioButtonIcon } from "../../../../../../assets/radioButton.svg";
import {
  woundMeasurementTakenNoReset,
  woundMeasurementTakenYesReset,
} from "../woundAssessment.utils";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { ReactComponent as CalendarIcon } from "../../../../../../assets/calendar.svg";
import moment from "moment";
import {
  convertStringToDate,
  formatedWoundValue,
  getInvalidObj,
  getValidObj,
  handleEmptyValue,
  setActiveValue,
} from "../../../../../../util/utilityFunctions";
import ReviewWoundMeasurement from "./reviewWoundMeasurement/reviewWoundMeasurement.component";

type Props = {
  data: IAddWoundAssessment;
  setData: React.Dispatch<React.SetStateAction<IAddWoundAssessment>>;
  Validator?: AddWoundAssessmentValidator;
  isReviewAssessment?: boolean;
  isWoundAssessmentSummary?: any;
  editButtonClicked?: any;
};

const WoundMeasurement = ({
  data,
  setData,
  Validator = new AddWoundAssessmentValidator(),
  isReviewAssessment = false,
  isWoundAssessmentSummary,
  editButtonClicked,
}: Props) => {
  const [active, setActive] = React.useState<boolean | null>(
    setActiveValue(data?.woundMeasurementTaken.value)
  );
  const [validator] = React.useState<AddWoundAssessmentValidator>(Validator);
  const [maxDate, setMaxDate] = useState<any>();
  const [minDate, setMinDate] = useState<any>();
  const [focusClasses, setFocusClasses] = React.useState({
    woundMeasurementDate: "",
  });
  const setClasses = (e: any, classname: string) => {
    setFocusClasses(
      Object.assign({}, focusClasses, { [e.target.name]: classname })
    );
  };

  const formatDate = (value: string) => {
    return value !== "" ? moment(value).format("L") : "";
  };

  const validateAndSetData = (e: any) => {
    if (e.target.name === "woundMeasurementTaken") {
      if (e.target.value === "yes") {
        woundMeasurementTakenYesReset(data, setData);
        setActive(true);
      } else if (e.target.value === "no") {
        setActive(false);
        woundMeasurementTakenNoReset(data, setData);
      } else {
        setActive(null);
      }
    }
  };
  const validateMeasurementDate = (txt: string) => {
    const formatteddate = moment(txt);
    if (formatteddate.isBetween(minDate - 1, maxDate + 1)) {
      return getValidObj();
    } else {
      return getInvalidObj(null);
    }
  };
  const validateAndSetDate = (date: string | null | undefined) => {
    const formatteddate = convertStringToDate(date);
    const isValid = validateMeasurementDate(formatteddate!);
    setData(
      Object.assign({}, data, {
        woundMeasurementDate: {
          value: formatteddate,
          valid: isValid?.status,
          required: true,
        },
      })
    );
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

  const setDatetime = async () => {
    const formatMinDate = moment(data.woundAssessmentDateFrom.value);
    const formatMaxDate = moment(data.woundAssessmentDateTo.value);
    setMaxDate(formatMaxDate);
    setMinDate(formatMinDate);
  };
  useEffect(() => {
    if (data.woundMeasurementTaken.value === "") {
      setActive(null);
    }
  }, [data.woundMeasurementTaken.value]);
  useEffect(() => {
    setDatetime();
  }, []);
  return (
    <div className="wound-measurement-component">
      {!isReviewAssessment ? (
        <div className="woundMeasure">
          <div
            className="woundMeasure-header"
            data-testid="woundMeasure-header"
          >
            Wound Measurements
          </div>
          {data.woundTherapyStatus.value.toLowerCase() === "no" && (
            <Box className="woundMeasure-box-container" sx={{ flexGrow: 1 }}>
              <Grid
                className="woundMeasure-grid-container"
                container
                spacing={2}
              >
                <Grid className="woundMeasure-grid-item" item xs={6}>
                  <InputWithLabel
                    label="Have measurements been taken?"
                    isRequired={data?.woundMeasurementTaken.required}
                    error={
                      data?.woundMeasurementTaken.valid ===
                      ValidationStatus.INVALID
                    }
                    testId="woundMeasuretitleid"
                  >
                    <RadioGroup
                      name="woundMeasurementTaken"
                      classes={{ root: "radioRoot" }}
                      onChange={validateAndSetData}
                      value={data?.woundMeasurementTaken.value}
                    >
                      <FormControlLabel
                        classes={{
                          root:
                            active === true
                              ? "optionRoot-active"
                              : "optionRoot",
                        }}
                        componentsProps={{
                          typography: {
                            classes: {
                              root:
                                active === true
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
                        data-testid="woundMeasure-yes"
                        label="Yes"
                        value="yes"
                      />
                      <FormControlLabel
                        classes={{
                          root:
                            active === false
                              ? "optionRoot-active"
                              : "optionRoot",
                        }}
                        componentsProps={{
                          typography: {
                            classes: {
                              root:
                                active === false
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
                        data-testid="woundMeasure-no"
                        label="No"
                        value="no"
                      />
                    </RadioGroup>
                  </InputWithLabel>
                </Grid>
              </Grid>
            </Box>
          )}

          {data.woundMeasurementTaken.value.toLowerCase() === "yes" && (
            <>
              {data.woundTherapyStatus.value.toLowerCase() === "yes" && (
                <>
                  <div className="woundMeasuredata-box">
                    <div>
                      <div className="woundMeasuredata-header">
                        Last Measurement Provided Date
                      </div>
                      <div className="woundMeasuredata-value">
                        {handleEmptyValue(
                          formatDate(data.previousEvaluationDate.value)
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="woundMeasuredata-header">
                        Last measurements provided
                      </div>
                      <div className="woundMeasuredata-value">
                        {`L ${handleEmptyValue(
                          data.previousWoundLength.value
                        )} cm x W ${handleEmptyValue(
                          data.previousWoundWidth.value
                        )} cm x D ${handleEmptyValue(
                          data.previousWoundDepth.value
                        )} cm`}
                      </div>
                    </div>
                  </div>
                  <div className="woundMeasuredata-dateRange">
                    <div className="woundMeasuredata-header">
                      Wound Assessment Date Range
                    </div>
                    <div className="woundMeasuredata-value">
                      03/30/2022 – 04/04/2022
                    </div>
                  </div>
                </>
              )}
              <Box
                className="woundMeasuredata-box-container"
                sx={{ flexGrow: 1 }}
              >
                <Grid
                  className="woundMeasure-grid-container"
                  container
                  spacing={2}
                >
                  <Grid className="woundMeasure-grid-item" item xs={6}>
                    <InputWithLabel
                      labelClassName={focusClasses.woundMeasurementDate}
                      label="Wound Measurement Date"
                      isRequired={data?.woundMeasurementDate.required}
                      error={
                        data?.woundMeasurementDate.valid ===
                        ValidationStatus.INVALID
                      }
                      testId="woundMeasure-date"
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
                                data?.woundMeasurementDate.valid ===
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
                          value={
                            data?.woundMeasurementDate.value === ""
                              ? null
                              : data?.woundMeasurementDate.value
                          }
                          maxDate={maxDate}
                          minDate={minDate}
                          defaultCalendarMonth={maxDate}
                        />
                      </LocalizationProvider>
                    </InputWithLabel>
                  </Grid>
                </Grid>
              </Box>
              <Box className="dimension-box-container" sx={{ flexGrow: 1 }}>
                <Grid
                  className="dimension-grid-container"
                  container
                  spacing={2}
                >
                  <Grid item xs={3}>
                    <InputWithLabel
                      label="Length (cm)"
                      isRequired={data?.woundMeasurementLenght.required}
                      error={
                        data?.woundMeasurementLenght.valid ===
                        ValidationStatus.INVALID
                      }
                      testId="woundLength-title"
                    >
                      <InputBase
                        placeholder="0"
                        className="depth-input"
                        name="woundMeasurementLenght"
                        value={data?.woundMeasurementLenght.value}
                        onChange={validateAndSetDepthData}
                        onBlur={formatWoundZeros}
                        required={data?.woundMeasurementLenght.required}
                        data-testid="woundLength"
                      />
                    </InputWithLabel>
                  </Grid>
                  <Grid item xs={3}>
                    <InputWithLabel
                      label="Width (cm)"
                      isRequired={data?.woundMeasurementWidth.required}
                      error={
                        data?.woundMeasurementWidth.valid ===
                        ValidationStatus.INVALID
                      }
                      testId="woundWidth-title"
                    >
                      <InputBase
                        placeholder="0"
                        className="depth-input"
                        name="woundMeasurementWidth"
                        value={data?.woundMeasurementWidth.value}
                        onChange={validateAndSetDepthData}
                        onBlur={formatWoundZeros}
                        required={data?.woundMeasurementWidth.required}
                        data-testid="woundWidth"
                      />
                    </InputWithLabel>
                  </Grid>
                  <Grid item xs={3}>
                    <InputWithLabel
                      label="Depth (cm)"
                      isRequired={data?.woundMeasurementDepth.required}
                      error={
                        data?.woundMeasurementDepth.valid ===
                        ValidationStatus.INVALID
                      }
                      testId="woundDepth-title"
                    >
                      <InputBase
                        placeholder="0"
                        className="depth-input"
                        name="woundMeasurementDepth"
                        value={data?.woundMeasurementDepth.value}
                        onChange={validateAndSetDepthData}
                        onBlur={formatWoundZeros}
                        required={data?.woundMeasurementDepth.required}
                        data-testid="woundDepth"
                      />
                    </InputWithLabel>
                  </Grid>
                </Grid>
              </Box>
            </>
          )}
        </div>
      ) : (
        <ReviewWoundMeasurement
          data={data}
          editButtonClicked={editButtonClicked}
          isWoundAssessmentSummary={isWoundAssessmentSummary}
        />
      )}
    </div>
  );
};

export default WoundMeasurement;
