import { Grid, TextField } from "@mui/material";
import { InputWithLabel } from "../../../../core/inputWithLabel/inputWithLabel.component";
import { Item, PatientInput } from "../../../newOrder/newOrder.style";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useContext, useState } from "react";
import { getDeepClone } from "../../../../util/ObjectFunctions";
import { defaultPatientDataForNameSearch } from "../searchPatient.model";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { ValidationStatus } from "../../../../core/interfaces/input.interface";
import { ReactComponent as CalendarIcon } from "../../../../assets/calendar.svg";
import moment from "moment";
import { AddPatientContext } from "../../addPatientContainer/addPatientContainer.context";
import { ISearchByProps } from "../addPatient.interface";
import { convertStringToDate } from "../../../../util/utilityFunctions";

export const SearchByRO = ({
  patientSearchDataForRo,
  setPatientSearchDataForRo,
  setPatientSearchDataForName,
  patientSearchDataForName,
}: ISearchByProps) => {
  const { patientSearchValidator } = useContext(AddPatientContext);
  const [focusClass, setFocusClass] = useState("");
  const validateAndSetDateForRental = (date: string | null | undefined) => {
    const formatteddate = convertStringToDate(date);
    const isValid = patientSearchValidator.validate(formatteddate!, "dob");
    setPatientSearchDataForRo(
      Object.assign({}, patientSearchDataForRo, {
        dob: {
          value: formatteddate,
          valid: isValid?.status,
        },
      })
    );
    setPatientSearchDataForName(getDeepClone(defaultPatientDataForNameSearch));
  };
  const validateAndSetDataForRental = (e: any) => {
    const isValid = patientSearchValidator.validate(
      e.target.value,
      e.target.name
    );
    setPatientSearchDataForRo(
      Object.assign(
        {},
        patientSearchDataForRo,
        {
          [e.target.name]: {
            value: e.target.value.trim(),
            valid: isValid?.status,
          },
        },
        { search: { value: "true", valid: isValid?.status } }
      )
    );
    // extra handling to clear out invalid calendar value
    if (patientSearchDataForName.dob1.valid === ValidationStatus.INVALID) {
      setPatientSearchDataForName(
        Object.assign({}, patientSearchDataForName, {
          dob1: {
            value: new Date().toDateString(),
            valid: ValidationStatus.UNTOUCHED,
          },
        })
      );
      setTimeout(() => {
        setPatientSearchDataForName(
          getDeepClone(defaultPatientDataForNameSearch)
        );
      });
    } else {
      setPatientSearchDataForName(
        getDeepClone(defaultPatientDataForNameSearch)
      );
    }
  };
  return (
    <Grid container spacing={0}>
      <Grid item md={6} xs={12}>
        <Item>
          <InputWithLabel
            labelClassName={focusClass}
            label="Date of Birth"
            isRequired={false}
            error={
              patientSearchDataForRo?.dob.valid === ValidationStatus.INVALID
            }
          >
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                InputAdornmentProps={{
                  classes: {
                    root: "adornedRoot",
                  },
                }}
                InputProps={{
                  classes: {
                    root: `dob ${
                      patientSearchDataForRo?.dob.valid ===
                      ValidationStatus.INVALID
                        ? "showError"
                        : "noError"
                    }`,
                    input: "input",
                    notchedOutline: "outline",
                  },
                  readOnly: true,
                }}
                components={{ OpenPickerIcon: CalendarIcon }}
                value={patientSearchDataForRo?.dob.value}
                onChange={(value) => validateAndSetDateForRental(value)}
                renderInput={(params) => {
                  params.inputProps!.placeholder = "__/__/____";
                  return (
                    <TextField
                      name="dob"
                      onFocus={() => setFocusClass("Mui-focused")}
                      onBlur={() => setFocusClass("")}
                      {...params}
                    />
                  );
                }}
              />
            </LocalizationProvider>
          </InputWithLabel>
        </Item>
      </Grid>
      <Grid item md={6} xs={12}>
        <Item>
          <InputWithLabel
            label="Rental Order Number"
            isRequired={false}
            error={
              patientSearchDataForRo?.ro.valid === ValidationStatus.INVALID
            }
          >
            <PatientInput
              name="ro"
              value={patientSearchDataForRo?.ro.value}
              onChange={validateAndSetDataForRental}
            />
          </InputWithLabel>
        </Item>
      </Grid>
    </Grid>
  );
};
