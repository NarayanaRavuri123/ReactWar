import { Grid, TextField } from "@mui/material";
import { InputWithLabel } from "../../../../core/inputWithLabel/inputWithLabel.component";
import { Item, PatientInput } from "../../../newOrder/newOrder.style";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useContext, useState } from "react";
import { getDeepClone } from "../../../../util/ObjectFunctions";
import { defaultPatientDataForRental } from "../searchPatient.model";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { ValidationStatus } from "../../../../core/interfaces/input.interface";
import { ReactComponent as CalendarIcon } from "../../../../assets/calendar.svg";
import moment from "moment";
import { AddPatientContext } from "../../addPatientContainer/addPatientContainer.context";
import { ISearchByProps } from "../addPatient.interface";
import { convertStringToDate } from "../../../../util/utilityFunctions";

export const SearchByName = ({
  patientSearchDataForName,
  patientSearchDataForRo,
  setPatientSearchDataForName,
  setPatientSearchDataForRo,
}: ISearchByProps) => {
  const { patientSearchValidator } = useContext(AddPatientContext);
  const [focusClass, setFocusClass] = useState("");
  const validateAndSetDateForNameSearch = (date: string | null | undefined) => {
    const formatteddate = convertStringToDate(date);
    const isValid = patientSearchValidator.validate(formatteddate!, "dob1");
    setPatientSearchDataForName(
      Object.assign({}, patientSearchDataForName, {
        dob1: {
          value: formatteddate,
          valid: isValid?.status,
        },
      })
    );
    setPatientSearchDataForRo(getDeepClone(defaultPatientDataForRental));
  };
  const validateAndSetDataForNameSearch = (e: any) => {
    const isValid = patientSearchValidator.validate(
      e.target.value,
      e.target.name
    );
    setPatientSearchDataForName(
      Object.assign(
        {},
        patientSearchDataForName,
        { [e.target.name]: { value: e.target.value, valid: isValid?.status } },
        { search: { value: "true", valid: isValid?.status } }
      )
    );
    // extra handling to clear out invalid calendar value
    if (patientSearchDataForRo.dob.valid === ValidationStatus.INVALID) {
      setPatientSearchDataForRo(
        Object.assign({}, patientSearchDataForRo, {
          dob: {
            value: new Date().toDateString(),
            valid: ValidationStatus.UNTOUCHED,
          },
        })
      );
      setTimeout(() => {
        setPatientSearchDataForRo(getDeepClone(defaultPatientDataForRental));
      });
    } else {
      setPatientSearchDataForRo(getDeepClone(defaultPatientDataForRental));
    }
  };
  return (
    <>
      <Grid container spacing={0}>
        <Grid item md={6} xs={12}>
          <Item>
            <InputWithLabel
              label="Last Name"
              isRequired={false}
              error={
                patientSearchDataForName?.lastName.valid ===
                ValidationStatus.INVALID
              }
            >
              <PatientInput
                name="lastName"
                value={patientSearchDataForName?.lastName.value}
                onChange={validateAndSetDataForNameSearch}
              />
            </InputWithLabel>
          </Item>
        </Grid>
        <Grid item md={6} xs={12}>
          <Item>
            <InputWithLabel
              labelClassName={focusClass}
              label="Date of Birth"
              isRequired={false}
              error={
                patientSearchDataForName?.dob1.valid ===
                ValidationStatus.INVALID
              }
            >
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  InputAdornmentProps={{
                    classes: {
                      root: "adornedRoot1",
                    },
                  }}
                  InputProps={{
                    classes: {
                      root: `dob1 ${
                        patientSearchDataForName?.dob1.valid ===
                        ValidationStatus.INVALID
                          ? "showError"
                          : "noError"
                      }`,
                      input: "input",
                      notchedOutline: "outline",
                    },
                  }}
                  components={{ OpenPickerIcon: CalendarIcon }}
                  value={patientSearchDataForName?.dob1.value}
                  onChange={(value) => validateAndSetDateForNameSearch(value)}
                  renderInput={(params) => {
                    params.inputProps!.placeholder = "__/__/____";
                    return (
                      <TextField
                        name="dob1"
                        onFocus={() => setFocusClass("Mui-focused")}
                        onBlur={(e) => setFocusClass("")}
                        {...params}
                      />
                    );
                  }}
                />
              </LocalizationProvider>
            </InputWithLabel>
          </Item>
        </Grid>
      </Grid>
      <Grid container spacing={0}>
        <Grid item md={6} xs={12}>
          <Item>
            <InputWithLabel
              label="Patient ZIP Code"
              isRequired={false}
              error={
                patientSearchDataForName?.zip.valid === ValidationStatus.INVALID
              }
            >
              <PatientInput
                name="zip"
                value={patientSearchDataForName?.zip.value}
                onChange={validateAndSetDataForNameSearch}
              />
            </InputWithLabel>
          </Item>
        </Grid>
      </Grid>
    </>
  );
};
