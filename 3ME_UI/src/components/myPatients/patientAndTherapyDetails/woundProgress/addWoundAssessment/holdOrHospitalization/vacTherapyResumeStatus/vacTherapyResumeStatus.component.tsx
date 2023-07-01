import React from "react";
import "./vacTherapyResumeStatus.css";
import {
  Box,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { InputWithLabel } from "../../../../../../../core/inputWithLabel/inputWithLabel.component";
import { AddWoundAssessmentValidator } from "../../addWoundAssessment.validator";
import { IAddWoundAssessment } from "../../addWoundAssessment.interface";
import { ValidationStatus } from "../../../../../../../core/interfaces/input.interface";
import { ReactComponent as SelectedRadioButtonIcon } from "../../../../../../../assets/selectedRadioButton.svg";
import { ReactComponent as RadioButtonIcon } from "../../../../../../../assets/radioButton.svg";
import { ReactComponent as CalendarIcon } from "../../../../../../../assets/calendar.svg";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import {
  vacResumeStatusNoReset,
  vacResumeStatusYesReset,
} from "../holdOrHospitalization.utils";
import {
  convertStringToDate,
  setActiveValue,
} from "../../../../../../../util/utilityFunctions";
import { ResumptionMeasurement } from "../resumptionMeasurement/resumptionMeasurement.component";
import moment from "moment";

interface Props {
  data: IAddWoundAssessment;
  setData: React.Dispatch<React.SetStateAction<IAddWoundAssessment>>;
  Validator?: AddWoundAssessmentValidator;
}

export const VacTherapyResumeStatus = ({
  data,
  setData,
  Validator = new AddWoundAssessmentValidator(),
}: Props) => {
  const [validator] = React.useState<AddWoundAssessmentValidator>(Validator);
  const [active, setActive] = React.useState<boolean | null>(
    setActiveValue(data?.vacResumeStatus.value)
  );
  const [focusClasses, setFocusClasses] = React.useState({
    vacResumeDate: "",
  });

  const setClasses = (e: any, classname: string) => {
    setFocusClasses(
      Object.assign({}, focusClasses, { [e.target.name]: classname })
    );
  };

  const validateAndSetDate = (date: string | null | undefined | any) => {
    const formatteddate = convertStringToDate(date);
    const isValid = validator.validate(formatteddate, "vacResumeDate");
    setData({
      ...data,
      vacResumeDate: {
        value: formatteddate,
        valid: isValid?.status!,
        required: true,
      },
    });
  };

  const validateAndSetData = (e: any) => {
    if (e.target.name === "vacResumeStatus") {
      if (e.target.value === "yes") {
        vacResumeStatusYesReset(data, setData);
        setActive(true);
      } else if (e.target.value === "no") {
        setActive(false);
        vacResumeStatusNoReset(data, setData);
      } else {
        setActive(null);
      }
    }
  };

  return (
    <div className="vacResumeStatus">
      <Box className="vacResumeStatus-box-container" sx={{ flexGrow: 1 }}>
        <Grid className="vacResumeStatus-grid-container" container spacing={2}>
          <Grid className="vacResumeStatus-grid-item" item xs={6}>
            <InputWithLabel
              label="Has V.A.C.® Therapy been resumed?"
              isRequired={data?.vacResumeStatus.required}
              error={data?.vacResumeStatus.valid === ValidationStatus.INVALID}
              testId="vacResumeStatustitleid"
            >
              <RadioGroup
                name="vacResumeStatus"
                classes={{ root: "radioRoot" }}
                onChange={validateAndSetData}
                value={data?.vacResumeStatus.value}
              >
                <FormControlLabel
                  classes={{
                    root: active === true ? "optionRoot-active" : "optionRoot",
                  }}
                  componentsProps={{
                    typography: {
                      classes: {
                        root: active === true ? "optiontxtSelect" : "optiontxt",
                      },
                    },
                  }}
                  control={
                    <Radio
                      icon={<RadioButtonIcon />}
                      checkedIcon={<SelectedRadioButtonIcon />}
                    />
                  }
                  data-testid="vacResumeStatus-yes"
                  label="Yes"
                  value="yes"
                />
                <FormControlLabel
                  classes={{
                    root: active === false ? "optionRoot-active" : "optionRoot",
                  }}
                  componentsProps={{
                    typography: {
                      classes: {
                        root:
                          active === false ? "optiontxtSelect" : "optiontxt",
                      },
                    },
                  }}
                  control={
                    <Radio
                      icon={<RadioButtonIcon />}
                      checkedIcon={<SelectedRadioButtonIcon />}
                    />
                  }
                  data-testid="vacResumeStatus-no"
                  label="No"
                  value="no"
                />
              </RadioGroup>
            </InputWithLabel>
          </Grid>
        </Grid>
      </Box>
      {data?.vacResumeStatus.value === "yes" && (
        <Box className="vacResumeStatus-boxdate-container" sx={{ flexGrow: 1 }}>
          <Grid
            className="vacResumeStatus-grid-container"
            container
            spacing={2}
          >
            <Grid className="vacResumeStatus-grid-item" item xs={5}>
              <InputWithLabel
                labelClassName={focusClasses.vacResumeDate}
                label="Resumption Start Date"
                isRequired={data?.vacResumeDate.required}
                error={data?.vacResumeDate.valid === ValidationStatus.INVALID}
                testId="vacResumeDate"
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
                        root: `vacResumeDate ${
                          data?.vacResumeDate.valid === ValidationStatus.INVALID
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
                          name="vacResumeDate"
                          onFocus={(e) => setClasses(e, "Mui-focused")}
                          onBlur={(e) => setClasses(e, "")}
                          {...params}
                        />
                      );
                    }}
                    value={data?.vacResumeDate.value}
                    maxDate={moment()}
                  />
                </LocalizationProvider>
              </InputWithLabel>
            </Grid>
          </Grid>
        </Box>
      )}
      {data?.vacResumeStatus.value === "yes" && (
        <ResumptionMeasurement data={data} setData={setData} />
      )}
    </div>
  );
};
