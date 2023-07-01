import React, { Fragment, useState, useEffect, useContext } from "react";
import { Box, Grid, TextField } from "@mui/material";
import { IDischargeRequest } from "../dischargeRequest.interface";
import "./woundInformationDischargeRequest.css";
import WoundTitleValue from "../../../myPatients/patientAndTherapyDetails/woundProgress/addWoundAssessment/woundReviewAssessment/woundTitleValue/woundTitleValue.component";
import { ValidationStatus } from "../../../../core/interfaces/input.interface";
import { InputWithLabel } from "../../../../core/inputWithLabel/inputWithLabel.component";
import {
  convertStringToDate,
  formatDate,
  formatedWoundValue,
  getInvalidObj,
  getValidObj,
  handleEmptyValue,
} from "../../../../util/utilityFunctions";
import InputBase from "@mui/material/InputBase";
import { DischargeRequestValidator } from "../dischargeRequest.validator";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { ReactComponent as CalendarIcon } from "../../../../assets/calendar.svg";
import moment from "moment";
import WoundInformationReview from "../woundInformation/woundInformationReview/woundInformation.review.component";
import { MobileDisplayContext } from "../../../../context/MobileDisplayContext";

type Props = {
  dischargeData: IDischargeRequest;
  setDischargeData: Function;
  woundInfoDetails?: any;
  isReviewDischargePage?: boolean;
  dischargeRequestEditBtnClick?: () => void;
  isSummaryDischargePage?: boolean;
};

const WoundInformationDischargeRequest = ({
  dischargeData,
  setDischargeData,
  woundInfoDetails,
  isReviewDischargePage = false,
  dischargeRequestEditBtnClick,
  isSummaryDischargePage = false,
}: Props) => {
  const [maxDate, setMaxDate] = useState<any>();
  const [minDate, setMinDate] = useState<any>();
  const [minDate1, setMinDate1] = useState<any>();
  const [focusClasses, setFocusClasses] = React.useState({
    woundFinalMeasurementDate1: "",
    woundFinalMeasurementDate2: "",
  });
  const { isMobileScreen } = useContext(MobileDisplayContext);
  const setClasses = (e: any, classname: string) => {
    setFocusClasses(
      Object.assign({}, focusClasses, { [e.target.name]: classname })
    );
  };

  const validateAndSetDepthData = (e: any) => {
    const validator = new DischargeRequestValidator();
    let { value, name, required } = e.target;
    let key: keyof typeof dischargeData = name;
    let isValid = validator.validate(value, name);
    if (isValid?.status === ValidationStatus.VALID) {
      setDischargeData({
        ...dischargeData,
        [name]: {
          value: value,
          valid:
            value.length === 0 && dischargeData[key].required
              ? ValidationStatus.INVALID
              : isValid?.status,
          required: required,
        },
      });
    }
  };

  const formatWoundZeros = async (e: any) => {
    let { value, name, required } = e.target;
    let key: keyof typeof dischargeData = name;
    let formatedValue = formatedWoundValue(dischargeData[key].value);
    setDischargeData({
      ...dischargeData,
      [name]: {
        value: formatedValue,
        valid:
          value.length === 0 && dischargeData[key].required
            ? ValidationStatus.INVALID
            : ValidationStatus.VALID,
        required: required,
      },
    });
    validateDepthValueNotZero(formatedValue, key);
  };

  const validateDepthValueNotZero = (
    value: string,
    key: keyof IDischargeRequest
  ) => {
    let convertValue = parseFloat(value);
    if (convertValue === 0) {
      dischargeData[key].value = value;
      dischargeData[key].valid = ValidationStatus.INVALID;
      setDischargeData(Object.assign({}, dischargeData));
    }
  };

  const validateAndSetDateWound1 = (date: string | null | undefined) => {
    const formatteddate = convertStringToDate(date);
    const isValid = validateMeasurementDate(formatteddate!);
    setDischargeData({
      ...dischargeData,
      woundFinalMeasurementDate1: {
        value: formatteddate,
        valid: isValid?.status,
        required: true,
      },
    });
  };

  const validateAndSetDateWound2 = (date: string | null | undefined) => {
    const formatteddate = convertStringToDate(date);
    const isValid = validateMeasurementDateW2(formatteddate!);
    setDischargeData({
      ...dischargeData,
      woundFinalMeasurementDate2: {
        value: formatteddate,
        valid: isValid?.status,
        required: true,
      },
    });
  };

  const validateMeasurementDate = (txt: string) => {
    const formatteddate = moment(txt);
    if (formatteddate.isBetween(minDate - 1, maxDate + 1)) {
      return getValidObj();
    } else {
      return getInvalidObj(null);
    }
  };

  const setDatetime = async () => {
    const formatMinDate = moment(woundInfoDetails.wounds[0].evaluationDate);
    const formatMaxDate = moment();
    setMaxDate(formatMaxDate);
    setMinDate(formatMinDate);
  };
  const validateMeasurementDateW2 = (txt: string) => {
    const formatteddate = moment(txt);
    if (formatteddate.isBetween(minDate1 - 1, maxDate + 1)) {
      return getValidObj();
    } else {
      return getInvalidObj(null);
    }
  };

  useEffect(() => {
    setDatetime();
    if (woundInfoDetails.wounds.length > 1) {
      const formatMinDate = moment(woundInfoDetails.wounds[1].evaluationDate);
      setMinDate1(formatMinDate);
    }
  }, []);

  return !isReviewDischargePage ? (
    <div className="woundInfoDR">
      <div className="woundInfoDRTitle" data-testID="woundInfoDRTitle">
        Wound Information
      </div>
      <div className="woundInfoDRDesp" data-testID="woundInfoDRDesp">
        If wound depth varies, document the greatest depth.
      </div>
      <div className="woundInfoDRDate">
        <WoundTitleValue
          testID="woundInfoDRDate"
          title="Therapy Discontinued Date"
          value={formatDate(moment().toString())}
        />
      </div>
      <Fragment>
        <div className="woundInfo1">Wound #1</div>
        <div className="woundInfo-rowDiv">
          <WoundTitleValue
            testID="woundInfoLocation"
            title="Wound Location"
            value={woundInfoDetails.wounds[0].location}
          />
          <WoundTitleValue
            testID="woundInfoType"
            title="Wound Type"
            value={woundInfoDetails.wounds[0].type}
            formatValue={false}
          />
        </div>
        <div className="woundInfo-finalD" data-testID="woundInfo-finalD">
          Final Dimensions
        </div>
        <div className="woundInfo-rowDiv">
          <WoundTitleValue
            testID="woundInfoLastMeasurementDate"
            title="Last Measurement Provided Date"
            value={handleEmptyValue(
              formatDate(woundInfoDetails.wounds[0].evaluationDate)
            )}
          />
          <WoundTitleValue
            formatValue={false}
            testID="woundInfoLastMeasurement"
            title="Last measurements provided"
            value={`L ${handleEmptyValue(
              woundInfoDetails.wounds[0].length
            )} cm x W ${handleEmptyValue(
              woundInfoDetails.wounds[0].width
            )} cm x D ${handleEmptyValue(woundInfoDetails.wounds[0].depth)} cm`}
          />
        </div>
        <Box className="woundMeasuredata-box-container" sx={{ flexGrow: 1 }}>
          <Grid className="woundMeasure-grid-container" container spacing={2}>
            <Grid
              className="woundMeasure-grid-item"
              item
              xs={isMobileScreen ? 12 : 6}
            >
              <InputWithLabel
                labelClassName={focusClasses.woundFinalMeasurementDate1}
                label="Final Measurement Date"
                isRequired={dischargeData?.woundFinalMeasurementDate1.required}
                error={
                  dischargeData?.woundFinalMeasurementDate1.valid ===
                  ValidationStatus.INVALID
                }
                testId="woundMeasure-date1"
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
                          dischargeData?.woundFinalMeasurementDate1.valid ===
                          ValidationStatus.INVALID
                            ? "showError"
                            : "noError"
                        }`,
                        input: "input",
                        notchedOutline: "outline",
                      },
                    }}
                    onChange={(value) => validateAndSetDateWound1(value)}
                    renderInput={(params) => {
                      params.error = false;
                      params.inputProps!.placeholder = "__/__/____";
                      return (
                        <TextField
                          name="woundFinalMeasurementDate1"
                          onFocus={(e) => setClasses(e, "Mui-focused")}
                          onBlur={(e) => setClasses(e, "")}
                          {...params}
                        />
                      );
                    }}
                    value={
                      dischargeData?.woundFinalMeasurementDate1.value === ""
                        ? null
                        : dischargeData?.woundFinalMeasurementDate1.value
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
          <Grid className="dimension-grid-container" container spacing={2}>
            <Grid item xs={isMobileScreen ? 4 : 3}>
              <InputWithLabel
                label="Length (cm)"
                isRequired={dischargeData?.woundMeasurementLenght1.required}
                error={
                  dischargeData?.woundMeasurementLenght1.valid ===
                  ValidationStatus.INVALID
                }
                testId="woundLength-title"
              >
                <InputBase
                  placeholder="0"
                  className="depth-input"
                  name="woundMeasurementLenght1"
                  value={dischargeData?.woundMeasurementLenght1.value}
                  onChange={validateAndSetDepthData}
                  onBlur={formatWoundZeros}
                  required={dischargeData?.woundMeasurementLenght1.required}
                  data-testid="woundLength1"
                />
              </InputWithLabel>
            </Grid>
            <Grid item xs={isMobileScreen ? 4 : 3}>
              <InputWithLabel
                label="Width (cm)"
                isRequired={dischargeData?.woundMeasurementWidth1.required}
                error={
                  dischargeData?.woundMeasurementWidth1.valid ===
                  ValidationStatus.INVALID
                }
                testId="woundWidth-title"
              >
                <InputBase
                  placeholder="0"
                  className="depth-input"
                  name="woundMeasurementWidth1"
                  value={dischargeData?.woundMeasurementWidth1.value}
                  onChange={validateAndSetDepthData}
                  onBlur={formatWoundZeros}
                  required={dischargeData?.woundMeasurementWidth1.required}
                  data-testid="woundWidth1"
                />
              </InputWithLabel>
            </Grid>
            <Grid item xs={isMobileScreen ? 4 : 3}>
              <InputWithLabel
                label="Depth (cm)"
                isRequired={dischargeData?.woundMeasurementDepth1.required}
                error={
                  dischargeData?.woundMeasurementDepth1.valid ===
                  ValidationStatus.INVALID
                }
                testId="woundDepth-title"
              >
                <InputBase
                  placeholder="0"
                  className="depth-input"
                  name="woundMeasurementDepth1"
                  value={dischargeData?.woundMeasurementDepth1.value}
                  onChange={validateAndSetDepthData}
                  onBlur={formatWoundZeros}
                  required={dischargeData?.woundMeasurementDepth1.required}
                  data-testid="woundDepth1"
                />
              </InputWithLabel>
            </Grid>
          </Grid>
        </Box>
      </Fragment>
      {woundInfoDetails.wounds.length > 1 && (
        <Fragment>
          <div className="woundInfo2">Wound #2</div>
          <div className="woundInfo-rowDiv">
            <WoundTitleValue
              title="Wound Location"
              value={woundInfoDetails.wounds[1].location}
              formatValue={false}
            />
            <WoundTitleValue
              title="Wound Type"
              value={woundInfoDetails.wounds[1].type}
              formatValue={false}
            />
          </div>
          <div className="woundInfo-finalD">Final Dimensions</div>
          <div className="woundInfo-rowDiv">
            <WoundTitleValue
              title="Last Measurement Provided Date"
              value={handleEmptyValue(
                formatDate(woundInfoDetails.wounds[1].evaluationDate)
              )}
            />
            <WoundTitleValue
              title="Last measurements provided"
              formatValue={false}
              value={`L ${handleEmptyValue(
                woundInfoDetails.wounds[1].length
              )} cm x W ${handleEmptyValue(
                woundInfoDetails.wounds[1].width
              )} cm x D ${handleEmptyValue(
                woundInfoDetails.wounds[1].depth
              )} cm`}
            />
          </div>
          <Box className="woundMeasuredata-box-container" sx={{ flexGrow: 1 }}>
            <Grid className="woundMeasure-grid-container" container spacing={2}>
              <Grid
                className="woundMeasure-grid-item"
                item
                xs={isMobileScreen ? 12 : 6}
              >
                <InputWithLabel
                  labelClassName={focusClasses.woundFinalMeasurementDate2}
                  label="Final Measurement Date"
                  isRequired={
                    dischargeData?.woundFinalMeasurementDate2.required
                  }
                  error={
                    dischargeData?.woundFinalMeasurementDate2.valid ===
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
                            dischargeData?.woundFinalMeasurementDate2.valid ===
                            ValidationStatus.INVALID
                              ? "showError"
                              : "noError"
                          }`,
                          input: "input",
                          notchedOutline: "outline",
                        },
                      }}
                      onChange={(value) => validateAndSetDateWound2(value)}
                      renderInput={(params) => {
                        params.error = false;
                        params.inputProps!.placeholder = "__/__/____";
                        return (
                          <TextField
                            name="woundFinalMeasurementDate2"
                            onFocus={(e) => setClasses(e, "Mui-focused")}
                            onBlur={(e) => setClasses(e, "")}
                            {...params}
                          />
                        );
                      }}
                      value={
                        dischargeData?.woundFinalMeasurementDate2.value === ""
                          ? null
                          : dischargeData?.woundFinalMeasurementDate2.value
                      }
                      maxDate={maxDate}
                      minDate={minDate1}
                      defaultCalendarMonth={maxDate}
                    />
                  </LocalizationProvider>
                </InputWithLabel>
              </Grid>
            </Grid>
          </Box>
          <Box className="dimension-box-container" sx={{ flexGrow: 1 }}>
            <Grid className="dimension-grid-container" container spacing={2}>
              <Grid item xs={isMobileScreen ? 4 : 3}>
                <InputWithLabel
                  label="Length (cm)"
                  isRequired={dischargeData?.woundMeasurementLenght2.required}
                  error={
                    dischargeData?.woundMeasurementLenght2.valid ===
                    ValidationStatus.INVALID
                  }
                  testId="woundLength-title"
                >
                  <InputBase
                    placeholder="0"
                    className="depth-input"
                    name="woundMeasurementLenght2"
                    value={dischargeData?.woundMeasurementLenght2.value}
                    onChange={validateAndSetDepthData}
                    onBlur={formatWoundZeros}
                    required={dischargeData?.woundMeasurementLenght2.required}
                    data-testid="woundLength"
                  />
                </InputWithLabel>
              </Grid>
              <Grid item xs={isMobileScreen ? 4 : 3}>
                <InputWithLabel
                  label="Width (cm)"
                  isRequired={dischargeData?.woundMeasurementWidth2.required}
                  error={
                    dischargeData?.woundMeasurementWidth2.valid ===
                    ValidationStatus.INVALID
                  }
                  testId="woundWidth-title"
                >
                  <InputBase
                    placeholder="0"
                    className="depth-input"
                    name="woundMeasurementWidth2"
                    value={dischargeData?.woundMeasurementWidth2.value}
                    onChange={validateAndSetDepthData}
                    onBlur={formatWoundZeros}
                    required={dischargeData?.woundMeasurementWidth2.required}
                    data-testid="woundWidth"
                  />
                </InputWithLabel>
              </Grid>
              <Grid item xs={isMobileScreen ? 4 : 3}>
                <InputWithLabel
                  label="Depth (cm)"
                  isRequired={dischargeData?.woundMeasurementDepth2.required}
                  error={
                    dischargeData?.woundMeasurementDepth2.valid ===
                    ValidationStatus.INVALID
                  }
                  testId="woundDepth-title"
                >
                  <InputBase
                    placeholder="0"
                    className="depth-input"
                    name="woundMeasurementDepth2"
                    value={dischargeData?.woundMeasurementDepth2.value}
                    onChange={validateAndSetDepthData}
                    onBlur={formatWoundZeros}
                    required={dischargeData?.woundMeasurementDepth2.required}
                    data-testid="woundDepth"
                  />
                </InputWithLabel>
              </Grid>
            </Grid>
          </Box>
        </Fragment>
      )}
    </div>
  ) : (
    <WoundInformationReview
      woundInfoDetails={woundInfoDetails}
      dischargeData={dischargeData}
      dischargeRequestEditBtnClick={dischargeRequestEditBtnClick}
      isSummaryDischargePage={isSummaryDischargePage}
    />
  );
};

export default WoundInformationDischargeRequest;
