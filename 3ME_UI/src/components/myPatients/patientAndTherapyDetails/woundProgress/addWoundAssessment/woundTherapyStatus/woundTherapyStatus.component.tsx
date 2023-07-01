import React, { useContext, useEffect } from "react";
import "./woundTherapyStatus.css";
import {
  Box,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  MenuItem,
  TextField,
  Select,
} from "@mui/material";
import { InputWithLabel } from "../../../../../../core/inputWithLabel/inputWithLabel.component";
import { IAddWoundAssessment } from "../addWoundAssessment.interface";
import { ValidationStatus } from "../../../../../../core/interfaces/input.interface";
import { ReactComponent as SelectedRadioButtonIcon } from "../../../../../../assets/selectedRadioButton.svg";
import { ReactComponent as RadioButtonIcon } from "../../../../../../assets/radioButton.svg";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { ReactComponent as CalendarIcon } from "../../../../../../assets/calendar.svg";
import { ReactComponent as SelectIcon } from "../../../../../../assets/selectIcon.svg";
import moment from "moment";
import {
  convertStringToDate,
  getCodeFromText,
  setActiveValue,
} from "../../../../../../util/utilityFunctions";
import { getCurrentServerDateTime } from "../../../../../../util/3meService";
import { AddWoundAssessmentValidator } from "../addWoundAssessment.validator";
import { DD_DISCONTINUED_REASON } from "../../../../../../util/staticText";
import { getdropDownContent } from "../../../../../../util/dropDownService";
import {
  woundTherapyStatusNoReset,
  woundTherapyStatusYesReset,
} from "../woundAssessment.utils";
import {
  WoundAssessmentContext,
  WoundAssessmentContextType,
} from "../../../../../../context/WoundAssessmentContext";
import ReviewWoundTherapyStatus from "./reviewWoundTherapyStatus/reviewWoundTherapyStatus.component";

type Props = {
  data: IAddWoundAssessment;
  isTesting?: boolean;
  setData: React.Dispatch<React.SetStateAction<IAddWoundAssessment>>;
  Validator?: AddWoundAssessmentValidator;
  isReviewAssessment?: boolean;
  isWoundAssessmentSummary?: any;
  editButtonClicked?: any;
};

const WoundTherapyStatus = ({
  data,
  isTesting = false,
  setData,
  Validator = new AddWoundAssessmentValidator(),
  isReviewAssessment = false,
  isWoundAssessmentSummary,
  editButtonClicked,
}: Props) => {
  const [validator] = React.useState<AddWoundAssessmentValidator>(Validator!);
  const [active, setActive] = React.useState<boolean | null>(
    setActiveValue(data?.woundTherapyStatus.value)
  );
  const [woundDiscontinuedReasonCode, setWoundDiscontinuedReasonCode] =
    React.useState([]);
  const [woundDiscontinuedReasonText, setWoundDiscontinuedReasonText] =
    React.useState([]);
  const [focusClasses, setFocusClasses] = React.useState({
    woundDiscontinuedDate: "",
  });
  const [minDate, setminDate] = React.useState<any>();
  const [maxDate, setmaxDate] = React.useState<any>();
  const WoundAssessmentObj = useContext<WoundAssessmentContextType | null>(
    WoundAssessmentContext
  );

  const setClasses = (e: any, classname: string) => {
    setFocusClasses(
      Object.assign({}, focusClasses, { [e.target.name]: classname })
    );
  };

  const setDatetime = async () => {
    const currentDateRes = await getCurrentServerDateTime();
    const formatMaxDate = moment(currentDateRes.currentCstTime);
    const formatMinDate = moment(currentDateRes.currentCstTime).subtract(
      60,
      "days"
    );
    if (currentDateRes) {
      setmaxDate(formatMaxDate);
      setminDate(formatMinDate);
    }
  };

  const fetchDropdownContents = async () => {
    try {
      const data = await getdropDownContent(DD_DISCONTINUED_REASON);
      if (data.items.length > 0) {
        const reasonObject = data.items.filter(
          (item: { name: string }) => item.name === DD_DISCONTINUED_REASON
        );
        const reasonData = reasonObject[0].data.sort(
          (a: { order: number }, b: { order: number }) =>
            a.order > b.order ? 1 : -1
        );
        setWoundDiscontinuedReasonCode(reasonData);
        setWoundDiscontinuedReasonText(
          reasonData.map((x: { text: string }) => x.text)
        );
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchDropdownContents();
    if (!isTesting) {
      setDatetime();
    }
  }, []);

  const validateAndSetData = (e: any) => {
    if (e.target.name === "woundTherapyStatus") {
      WoundAssessmentObj?.setShowDialogWA(true);
      WoundAssessmentObj?.setWoundAssessmentProgress(50);
      if (e.target.value === "yes") {
        woundTherapyStatusYesReset(data, setData);
        setActive(true);
      } else if (e.target.value === "no") {
        setActive(false);
        woundTherapyStatusNoReset(data, setData);
      } else {
        setActive(null);
      }
    } else {
      setData({
        ...data,
        [e.target.name]: {
          value: getCodeFromText(woundDiscontinuedReasonCode, e.target.value),
          valid: ValidationStatus.VALID,
          required: true,
        },
      });
    }
  };

  const validateAndSetDate = (date: string | null | undefined) => {
    const formatteddate = convertStringToDate(date);
    const isValid = validator.validate(formatteddate!, "woundDiscontinuedDate");
    setData(
      Object.assign({}, data, {
        woundDiscontinuedDate: {
          value: formatteddate,
          valid: isValid?.status,
          required: true,
        },
      })
    );
  };

  return (
    <div className="therapy-status-component">
      {!isReviewAssessment ? (
        <div className="therapystatus">
          <div
            className="therapystatus-header"
            data-testid="therapystatus-header"
          >
            Therapy Status
          </div>
          <Box className="therapystatus-box-container" sx={{ flexGrow: 1 }}>
            <Grid
              className="therapystatus-grid-container"
              container
              spacing={2}
            >
              <Grid className="therapystatus-grid-item" item xs={6}>
                <InputWithLabel
                  label="Is the V.A.C.® Therapy unit currently in use?"
                  isRequired={data?.woundTherapyStatus.required}
                  error={
                    data?.woundTherapyStatus.valid === ValidationStatus.INVALID
                  }
                  testId="therapystatustitleid"
                >
                  <RadioGroup
                    name="woundTherapyStatus"
                    classes={{ root: "radioRoot" }}
                    onChange={validateAndSetData}
                    value={data?.woundTherapyStatus.value}
                  >
                    <FormControlLabel
                      classes={{
                        root:
                          data?.woundTherapyStatus.value === "yes"
                            ? "optionRoot-active"
                            : "optionRoot",
                      }}
                      componentsProps={{
                        typography: {
                          classes: {
                            root:
                              data?.woundTherapyStatus.value === "yes"
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
                      data-testid="therapystatus-yes"
                      label="Yes"
                      value="yes"
                    />
                    <FormControlLabel
                      classes={{
                        root:
                          data?.woundTherapyStatus.value === "no"
                            ? "optionRoot-active"
                            : "optionRoot",
                      }}
                      componentsProps={{
                        typography: {
                          classes: {
                            root:
                              data?.woundTherapyStatus.value === "no"
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
                      data-testid="therapystatus-no"
                      label="No"
                      value="no"
                    />
                  </RadioGroup>
                </InputWithLabel>
              </Grid>
            </Grid>
          </Box>
          {data.woundTherapyStatus.value.toLowerCase() === "no" && (
            <Box className="therapystatus-box-container" sx={{ flexGrow: 1 }}>
              <Grid
                className="therapystatus-grid-container"
                container
                spacing={2}
              >
                <Grid className="therapystatus-grid-item" item xs={6}>
                  <InputWithLabel
                    labelClassName={focusClasses.woundDiscontinuedDate}
                    label="Discontinue Date"
                    isRequired={data?.woundDiscontinuedDate.required}
                    error={
                      data?.woundDiscontinuedDate.valid ===
                      ValidationStatus.INVALID
                    }
                    testId="therapystatus-date-of-discontinue"
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
                            root: `woundDiscontinuedDate ${
                              data?.woundDiscontinuedDate.valid ===
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
                              name="woundDiscontinuedDate"
                              onFocus={(e) => setClasses(e, "Mui-focused")}
                              onBlur={(e) => setClasses(e, "")}
                              {...params}
                            />
                          );
                        }}
                        value={data?.woundDiscontinuedDate.value}
                        maxDate={maxDate}
                        minDate={minDate}
                      />
                    </LocalizationProvider>
                  </InputWithLabel>
                </Grid>
                <Grid item xs={6}>
                  <InputWithLabel
                    label="Reason for discontinuation"
                    isRequired={data?.woundDiscontinuedReason.required}
                    error={
                      data?.woundDiscontinuedReason.valid ===
                      ValidationStatus.INVALID
                    }
                    testId="therapystatus-discontinued-type"
                  >
                    <Select
                      classes={{
                        select: data.woundDiscontinuedReason.value
                          ? "selectDiscontinuedReason"
                          : "placeholder",
                        icon: "selectIcon",
                      }}
                      className={
                        data.woundDiscontinuedReason.value
                          ? "selectRootDiscontinuedReason"
                          : "placeholder"
                      }
                      displayEmpty={true}
                      IconComponent={SelectIcon}
                      inputProps={{ "data-testid": "selectDiscontinuedReason" }}
                      name="woundDiscontinuedReason"
                      onChange={validateAndSetData}
                      renderValue={(value) =>
                        value?.length ? value : "Select reason"
                      }
                      sx={{ width: "100%" }}
                      value={data.woundDiscontinuedReason.value}
                      variant="outlined"
                    >
                      {woundDiscontinuedReasonCode &&
                        Array.isArray(woundDiscontinuedReasonCode) &&
                        woundDiscontinuedReasonText.map((x: string) => (
                          <MenuItem
                            value={getCodeFromText(
                              woundDiscontinuedReasonCode,
                              x
                            )}
                          >
                            {x}
                          </MenuItem>
                        ))}
                    </Select>
                  </InputWithLabel>
                </Grid>
              </Grid>
            </Box>
          )}
        </div>
      ) : (
        <ReviewWoundTherapyStatus
          data={data}
          editButtonClicked={editButtonClicked}
          isWoundAssessmentSummary={isWoundAssessmentSummary}
        />
      )}
    </div>
  );
};

export default WoundTherapyStatus;
