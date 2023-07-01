import moment from "moment";
import "./transferPatient.css";
import {
  convertStringToDate,
  getUntouchedObj,
} from "../../../util/utilityFunctions";
import InputMask from "react-input-mask";
import { useEffect, useState } from "react";
import { SendNoteValidator } from "../sendNote.validator";
import { Grid, InputBase, TextField } from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { getCurrentServerDateTime } from "../../../util/3meService";
import { ITransferPatientProps } from "./transferPatient.interface";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { ValidationStatus } from "../../../core/interfaces/input.interface";
import { ReactComponent as CalendarIcon } from "../../../assets/calendar.svg";
import { InputWithLabel } from "../../../core/inputWithLabel/inputWithLabel.component";

const TransferPatient = ({
  data,
  setData,
  Validator = new SendNoteValidator(),
}: ITransferPatientProps) => {
  const [validator] = useState<SendNoteValidator>(Validator!);
  const [maxDate, setMaxDate] = useState<any>();

  const [focusClasses, setFocusClasses] = useState({
    phone: "",
    lastVisitDate: "",
  });

  const validateAndSetDate = (date: string | null | undefined) => {
    const formatteddate = convertStringToDate(date);
    let isValid = validator.validate(formatteddate!, "lastVisitDate");
    if (date === null) {
      isValid = getUntouchedObj();
    }
    setData({
      ...data,
      lastVisitDate: {
        value: formatteddate,
        valid: isValid!.status,
        required: false,
      },
    });
  };

  const validateAndSetData = (e: any) => {
    let { value, name, required } = e.target;
    let isValid = validator.validate(value, e.target.name);
    if (name === "phone" && (value === "(___) ___-____" || value === "")) {
      if (data.phone.valid === ValidationStatus.UNTOUCHED) {
        return;
      } else {
        isValid = getUntouchedObj();
      }
    } else if (name !== "comment" && value === "") {
      isValid = getUntouchedObj();
    }
    setData((dt: ITransferPatientProps) => ({
      ...dt,
      [name]: {
        value: value,
        valid: isValid?.status,
        required: required,
      },
    }));
  };

  const setClasses = (e: any, classname: string) => {
    setFocusClasses(
      Object.assign({}, focusClasses, { [e.target.name]: classname })
    );
  };

  const setDatetime = async () => {
    const currentDateRes = await getCurrentServerDateTime();
    if (currentDateRes) {
      const formatMaxDate = moment(currentDateRes.currentCstTime);
      setMaxDate(formatMaxDate);
    }
  };

  useEffect(() => {
    setDatetime();
  }, []);

  return (
    <div className="transfer-patient-component">
      <div className="short-form">
        <Grid
          className="contributing-cause-grid-container"
          container
          spacing={2}
        >
          <Grid className="contributing-cause-grid-item" item xs={6}>
            <InputWithLabel
              error={data.lastVisitDate.valid === ValidationStatus.INVALID}
              isRequired={data.lastVisitDate.required}
              labelClassName={focusClasses.lastVisitDate}
              label="Last visit date for patient"
              testId="last-visit-date-label"
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
                      root: `lastVisitDate ${
                        data.lastVisitDate.valid === ValidationStatus.INVALID
                          ? "showError"
                          : "noError"
                      }`,
                      input: "input",
                      notchedOutline: "outline",
                    },
                  }}
                  maxDate={maxDate}
                  defaultCalendarMonth={maxDate}
                  onChange={validateAndSetDate}
                  renderInput={(params) => {
                    params.error = false;
                    params.inputProps!.placeholder = "__/__/____";
                    return (
                      <TextField
                        name="lastVisitDate"
                        onFocus={(e) => setClasses(e, "Mui-focused")}
                        onBlur={(e) => setClasses(e, "")}
                        {...params}
                      />
                    );
                  }}
                  value={data.lastVisitDate.value}
                />
              </LocalizationProvider>
            </InputWithLabel>
          </Grid>
        </Grid>
        <div
          className="transfer-details-div"
          data-testid="transfer-details-div"
        >
          <h3
            className="transfer-details-title"
            data-testid="transfer-details-title"
          >
            Transfer Details
          </h3>
          <h5
            className="transfer-details-description"
            data-testid="transfer-details-description"
          >
            Please provide all information available. Please use comments to
            provide more detail (like address, phone number, contact name, etc.)
          </h5>
          <Grid
            className="transfer-patient-grid-container"
            container
            spacing={2}
          >
            <Grid className="transfer-patient-grid-item" item xs={12}>
              <InputWithLabel
                error={data.facilityName.valid === ValidationStatus.INVALID}
                isRequired={data.facilityName.required}
                label="Facility Name"
                labelClassName="transfer-patient-input-label"
                testId="facility-name-label"
              >
                <InputBase
                  className="transfer-patient-input"
                  inputProps={{
                    "data-testid": "facility-name-value",
                  }}
                  name="facilityName"
                  onChange={validateAndSetData}
                  required={data.facilityName.required}
                  value={data.facilityName.value}
                />
              </InputWithLabel>
            </Grid>
            <Grid className="transfer-patient-grid-item" item xs={12}>
              <InputWithLabel
                error={data.careGiverName.valid === ValidationStatus.INVALID}
                isRequired={false}
                label="Caregiver or Physician Now Responsible"
                labelClassName="transfer-patient-input-label"
                testId="care-giver-name-label"
              >
                <InputBase
                  className="transfer-patient-input"
                  inputProps={{
                    "data-testid": "care-giver-name-value",
                  }}
                  name="careGiverName"
                  onChange={validateAndSetData}
                  required={data.careGiverName.required}
                  value={data.careGiverName.value}
                />
              </InputWithLabel>
            </Grid>
            <Grid className="transfer-patient-grid-item" item xs={6}>
              <InputWithLabel
                error={data.phone.valid === ValidationStatus.INVALID}
                isRequired={data.phone.required}
                label="Facility Phone Number"
                labelClassName={focusClasses.phone}
                testId="phone-number-label"
              >
                <InputMask
                  className="phone"
                  data-testid="phone-number-value"
                  mask="(999) 999-9999"
                  name="phone"
                  onBlur={(e) => setClasses(e, "")}
                  onChange={validateAndSetData}
                  onFocus={(e) => setClasses(e, "Mui-focused")}
                  placeholder="(___) ___-____"
                  required={data.phone.required}
                  value={data.phone.value}
                />
              </InputWithLabel>
            </Grid>
            <Grid className="transfer-patient-grid-item" item xs={12}>
              <InputWithLabel
                error={data.comment.valid === ValidationStatus.INVALID}
                isRequired={data.comment.required}
                label="Comments"
                labelClassName="transfer-details-input-label"
                testId="comment-label"
              >
                <InputBase
                  className="transfer-patient-input"
                  data-testid="comment-value"
                  error={data.comment.valid === ValidationStatus.INVALID}
                  inputProps={{
                    minLength: 5,
                    className:
                      data.comment.valid === ValidationStatus.INVALID
                        ? "showCommentError"
                        : "noCommentError",
                  }}
                  multiline={true}
                  name="comment"
                  onChange={validateAndSetData}
                  required={data.comment.required}
                  rows={3}
                  value={data.comment.value}
                />
              </InputWithLabel>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default TransferPatient;
