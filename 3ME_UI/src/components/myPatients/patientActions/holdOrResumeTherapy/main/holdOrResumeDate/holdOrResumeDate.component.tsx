import moment from "moment";
import "./holdOrResumeDate.css";
import { useState } from "react";
import { Grid, TextField } from "@mui/material";
import {
  convertStringToDate,
  getInvalidObj,
  getUntouchedObj,
  getValidObj,
} from "../../../../../../util/utilityFunctions";
import {
  Validation,
  ValidationStatus,
} from "../../../../../../core/interfaces/input.interface";
import { IHoldOrResumeDate } from "./holdOrResumeDate.interface";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { IHoldOrResumeTherapyData } from "../holdOrResumeTherapy.interface";
import { HoldOrResumeTherapyValidator } from "../holdOrResumeTherapy.validator";
import { ReactComponent as CalendarIcon } from "../../../../../../assets/calendar.svg";
import { InputWithLabel } from "../../../../../../core/inputWithLabel/inputWithLabel.component";

export const HoldOrResumeDate = ({
  data,
  holdAndResumeMinMaxDates,
  index,
  isHoldTherapy,
  setData,
}: IHoldOrResumeDate) => {
  const [focusClasses, setFocusClasses] = useState({
    holdDate: "",
    resumeDate: "",
  });

  const setClasses = (e: any, classname: string) => {
    setFocusClasses(
      Object.assign({}, focusClasses, { [e.target.name]: classname })
    );
  };

  const validateAndSetDate = (
    date: string | null | undefined,
    isForHoldDate: boolean,
    index: number
  ) => {
    let formattedDate = convertStringToDate(date);
    if (date === "" || date === null || date === undefined) {
      formattedDate = "";
    }
    const validator = new HoldOrResumeTherapyValidator();
    let isValid = validator.validate(
      formattedDate!,
      isForHoldDate ? "holdDate" : "resumeDate"
    );
    if (isForHoldDate) {
      isValid = validateHoldDate(formattedDate, index);
      if (isValid) {
        holdAndResumeMinMaxDates[index].resumeMinAndMaxDates.minDate =
          formattedDate;
      }
      let holdDate = {
        value: formattedDate,
        valid: isValid!.status,
        required: true,
      };
      let resumeDate = index === 0 ? data.resumeDate1 : data.resumeDate2;
      let resumeDateString = convertStringToDate(
        index === 0 ? data.resumeDate1.value : data.resumeDate2.value
      );
      if (
        formattedDate &&
        (index === 0 ? data.resumeDate1.value : data.resumeDate2.value) !==
          "" &&
        resumeDateString
      ) {
        const isResumeDateValid = validateResumeDate(
          formattedDate,
          resumeDateString,
          index
        );
        resumeDate = {
          value: index === 0 ? data.resumeDate1.value : data.resumeDate2.value,
          valid: isResumeDateValid!.status,
          required: isHoldTherapy ? false : true,
        };
      }
      if (index === 0) {
        setData((dt: IHoldOrResumeTherapyData) => ({
          ...dt,
          holdDate1: holdDate,
          resumeDate1: resumeDate,
        }));
      } else {
        setData((dt: IHoldOrResumeTherapyData) => ({
          ...dt,
          holdDate2: holdDate,
          resumeDate2: resumeDate,
        }));
      }
    } else {
      let holdDate = isHoldTherapy
        ? convertStringToDate(
            index === 0 ? data.holdDate1.value : data.holdDate2.value
          )
        : holdAndResumeMinMaxDates[index].resumeMinAndMaxDates.minDate;
      if (date === "" || date === null || date === undefined) {
        isValid = getUntouchedObj();
      } else if (
        isValid &&
        isValid.status &&
        ((isHoldTherapy &&
          (index === 0 ? data.holdDate1.value : data.holdDate2.value) !== "") ||
          !isHoldTherapy) &&
        holdDate &&
        formattedDate
      ) {
        isValid = validateResumeDate(holdDate, formattedDate, index);
      }
      let resumeDate = {
        value: formattedDate,
        valid: isValid!.status,
        required: isHoldTherapy ? false : true,
      };
      if (index === 0) {
        setData((dt: IHoldOrResumeTherapyData) => ({
          ...dt,
          resumeDate1: resumeDate,
        }));
      } else {
        setData((dt: IHoldOrResumeTherapyData) => ({
          ...dt,
          resumeDate2: resumeDate,
        }));
      }
    }
  };

  const validateHoldDate = (holdDateStr: string, index: number): Validation => {
    const holdDate = moment(holdDateStr);
    const minHoldDate =
      holdAndResumeMinMaxDates[index].holdMinAndMaxDates.minDate;
    const maxHoldDate =
      holdAndResumeMinMaxDates[index].holdMinAndMaxDates.maxDate;
    if (
      minHoldDate.isValid() &&
      holdDate.isValid() &&
      maxHoldDate.isValid() &&
      holdDate.isSameOrAfter(minHoldDate) &&
      holdDate.isSameOrBefore(maxHoldDate)
    ) {
      return getValidObj();
    }
    return getInvalidObj(null);
  };

  const validateResumeDate = (
    holdDateStr: string,
    resumeDateStr: string,
    index: number
  ): Validation => {
    const holdDate = moment(holdDateStr);
    const resumeDate = moment(resumeDateStr);
    const maxResumeDate = moment(
      holdAndResumeMinMaxDates[index].resumeMinAndMaxDates.maxDate
    );
    if (
      holdDate.isValid() &&
      resumeDate.isValid() &&
      maxResumeDate.isValid() &&
      resumeDate.isSameOrAfter(holdDate) &&
      resumeDate.isSameOrBefore(maxResumeDate)
    ) {
      return getValidObj();
    }
    return getInvalidObj(null);
  };

  return (
    <div className="holdOrResumeTherapy-date-input-fields">
      <Grid className="holdOrResumeTherapy-container" container spacing={2}>
        {isHoldTherapy && (
          <Grid className="holdOrResumeTherapy-item" item xs={6}>
            <InputWithLabel
              error={
                (index === 0 ? data.holdDate1.valid : data.holdDate2.valid) ===
                ValidationStatus.INVALID
              }
              isRequired={true}
              labelClassName={focusClasses.holdDate}
              label="Hold Start Date"
              testId="hold-date-label"
            >
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  components={{
                    OpenPickerIcon: CalendarIcon,
                  }}
                  InputAdornmentProps={{
                    classes: {
                      root: "adornedRoot",
                    },
                  }}
                  InputProps={{
                    classes: {
                      root: `holdDate ${
                        (
                          index === 0
                            ? data.holdDate1.valid === ValidationStatus.INVALID
                            : data.holdDate2.valid === ValidationStatus.INVALID
                        )
                          ? "showError"
                          : "noError"
                      }`,
                      input: "input",
                      notchedOutline: "outline",
                    },
                  }}
                  minDate={
                    holdAndResumeMinMaxDates[index].holdMinAndMaxDates.minDate
                      ? holdAndResumeMinMaxDates[index].holdMinAndMaxDates
                          .minDate
                      : null
                  }
                  maxDate={
                    holdAndResumeMinMaxDates[index].holdMinAndMaxDates.maxDate
                      ? holdAndResumeMinMaxDates[index].holdMinAndMaxDates
                          .maxDate
                      : null
                  }
                  onChange={(value) => validateAndSetDate(value, true, index)}
                  renderInput={(params) => {
                    params.error = false;
                    params.inputProps!.placeholder = "__/__/____";
                    return (
                      <TextField
                        name="holdDate"
                        onFocus={(e) => setClasses(e, "Mui-focused")}
                        onBlur={(e) => setClasses(e, "")}
                        {...params}
                      />
                    );
                  }}
                  value={
                    index === 0 ? data.holdDate1.value : data.holdDate2.value
                  }
                />
              </LocalizationProvider>
            </InputWithLabel>
          </Grid>
        )}
        <Grid className="holdOrResumeTherapy-item" item xs={6}>
          <InputWithLabel
            error={
              (index === 0
                ? data.resumeDate1.valid
                : data.resumeDate2.valid) === ValidationStatus.INVALID
            }
            isRequired={
              index === 0
                ? data.resumeDate1.required
                : data.resumeDate2.required
            }
            labelClassName={focusClasses.resumeDate}
            label={`Resumption Date ${isHoldTherapy ? "(if restarted)" : ""}`}
            testId="resume-date-label"
          >
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                components={{
                  OpenPickerIcon: CalendarIcon,
                }}
                InputAdornmentProps={{
                  classes: {
                    root: "adornedRoot",
                  },
                }}
                InputProps={{
                  classes: {
                    root: `resumeDate ${
                      (index === 0
                        ? data.resumeDate1.valid
                        : data.resumeDate2.valid) === ValidationStatus.INVALID
                        ? "showError"
                        : "noError"
                    }`,
                    input: "input",
                    notchedOutline: "outline",
                  },
                }}
                minDate={
                  holdAndResumeMinMaxDates[index].resumeMinAndMaxDates.minDate
                    ? holdAndResumeMinMaxDates[index].resumeMinAndMaxDates
                        .minDate
                    : null
                }
                maxDate={
                  holdAndResumeMinMaxDates[index].resumeMinAndMaxDates.maxDate
                    ? holdAndResumeMinMaxDates[index].resumeMinAndMaxDates
                        .maxDate
                    : null
                }
                onChange={(value) => validateAndSetDate(value, false, index)}
                renderInput={(params) => {
                  params.error = false;
                  params.inputProps!.placeholder = "__/__/____";
                  return (
                    <TextField
                      name="resumeDate"
                      onFocus={(e) => setClasses(e, "Mui-focused")}
                      onBlur={(e) => setClasses(e, "")}
                      {...params}
                    />
                  );
                }}
                value={
                  index === 0 ? data.resumeDate1.value : data.resumeDate2.value
                }
              />
            </LocalizationProvider>
            {(index === 0 ? data.resumeDate1.value : data.resumeDate2.value) !==
              "" &&
              (index === 0
                ? data.resumeDate1.valid
                : data.resumeDate2.valid) === ValidationStatus.INVALID && (
                <div className="ErrorMsg">
                  <span>
                    The date you've selected is outside the hold period. Please
                    contact 3M at
                    <br></br> 1-800-275-4524 to resume therapy
                  </span>
                </div>
              )}
          </InputWithLabel>
        </Grid>
      </Grid>
    </div>
  );
};
