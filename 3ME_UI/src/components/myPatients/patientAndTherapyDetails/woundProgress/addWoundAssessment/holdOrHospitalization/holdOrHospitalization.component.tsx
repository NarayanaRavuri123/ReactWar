import React, { useEffect } from "react";
import {
  Box,
  FormControlLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import "./holdOrHospitalization.css";
import { IAddWoundAssessment } from "../addWoundAssessment.interface";
import { AddWoundAssessmentValidator } from "../addWoundAssessment.validator";
import { InputWithLabel } from "../../../../../../core/inputWithLabel/inputWithLabel.component";
import { ValidationStatus } from "../../../../../../core/interfaces/input.interface";
import { ReactComponent as SelectedRadioButtonIcon } from "../../../../../../assets/selectedRadioButton.svg";
import { ReactComponent as RadioButtonIcon } from "../../../../../../assets/radioButton.svg";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { ReactComponent as CalendarIcon } from "../../../../../../assets/calendar.svg";
import { ReactComponent as SelectIcon } from "../../../../../../assets/selectIcon.svg";
import {
  convertStringToDate,
  getCodeFromText,
  getTextFromCode,
  setActiveValue,
} from "../../../../../../util/utilityFunctions";
import { DD_REASON_FOR_HOLD } from "../../../../../../util/staticText";
import { getdropDownContent } from "../../../../../../util/dropDownService";
import moment from "moment";
import {
  holdOrHospitalizationNoReset,
  holdOrHospitalizationYesReset,
} from "./holdOrHospitalization.utils";
import { VacTherapyResumeStatus } from "./vacTherapyResumeStatus/vacTherapyResumeStatus.component";
import ReviewHoldOrHospitalization from "./reviewHoldOrHospitalization/reviewHoldOrHospitalization.component";

interface Props {
  data: IAddWoundAssessment;
  setData: React.Dispatch<React.SetStateAction<IAddWoundAssessment>>;
  Validator?: AddWoundAssessmentValidator;
  isReviewAssessment?: boolean;
  isWoundAssessmentSummary?: any;
  editButtonClicked?: any;
}

export const HoldOrHospitalization = ({
  data,
  setData,
  Validator = new AddWoundAssessmentValidator(),
  isReviewAssessment = false,
  isWoundAssessmentSummary,
  editButtonClicked,
}: Props) => {
  const [validator] = React.useState<AddWoundAssessmentValidator>(Validator);
  const [active, setActive] = React.useState<boolean | null>(
    setActiveValue(data?.vacTherapyBeenHold.value)
  );
  const [focusClasses, setFocusClasses] = React.useState({
    vacHoldStartDate: "",
  });
  const [vacHoldReasonCode, setVacHoldReasonCode] = React.useState([]);
  const [vacHoldReasonText, setVacHoldReasonText] = React.useState([]);

  const setClasses = (e: any, classname: string) => {
    setFocusClasses(
      Object.assign({}, focusClasses, { [e.target.name]: classname })
    );
  };

  const validateAndSetData = (e: any) => {
    if (e.target.name === "vacTherapyBeenHold") {
      if (e.target.value === "yes") {
        holdOrHospitalizationYesReset(data, setData);
        setActive(true);
      } else if (e.target.value === "no") {
        setActive(false);
        holdOrHospitalizationNoReset(data, setData);
      } else {
        setActive(null);
      }
    } else {
      setData({
        ...data,
        [e.target.name]: {
          value: getTextFromCode(vacHoldReasonCode, e.target.value),
          valid: ValidationStatus.VALID,
          required: true,
        },
      });
    }
  };

  const validateAndSetDate = (date: string | null | undefined | any) => {
    const formatteddate = convertStringToDate(date);
    const isValid = validator.validate(formatteddate!, "vacHoldStartDate");
    setData({
      ...data,
      vacHoldStartDate: {
        value: formatteddate,
        valid: isValid?.status!,
        required: true,
      },
    });
  };

  const fetchDropdownContents = async () => {
    try {
      const data = await getdropDownContent(DD_REASON_FOR_HOLD);
      if (data.items.length > 0) {
        const reasonObject = data.items.filter(
          (item: { name: string }) => item.name === DD_REASON_FOR_HOLD
        );
        const reasonData = reasonObject[0].data.sort(
          (a: { order: number }, b: { order: number }) =>
            a.order > b.order ? 1 : -1
        );
        setVacHoldReasonCode(reasonData);
        setVacHoldReasonText(reasonData.map((x: { text: string }) => x.text));
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchDropdownContents();
  }, []);

  useEffect(() => {
    if (data.vacTherapyBeenHold.value === "") {
      setActive(null);
    }
  }, [data.vacTherapyBeenHold.value]);

  return (
    <div className="holdOrHospitalization-component">
      {!isReviewAssessment ? (
        <div className="holdOrHospitalization">
          <div
            className="holdOrHospitalization-header"
            data-testid="holdOrHospitalization-header"
          >
            Holds and Hospitalizations
          </div>
          <Box
            className="holdOrHospitalization-box-container"
            sx={{ flexGrow: 1 }}
          >
            <Grid
              className="holdOrHospitalization-grid-container"
              container
              spacing={2}
            >
              <Grid className="holdOrHospitalization-grid-item" item xs={6}>
                <InputWithLabel
                  label="Has V.A.C.® Therapy been placed on hold?"
                  isRequired={data?.vacTherapyBeenHold.required}
                  error={
                    data?.vacTherapyBeenHold.valid === ValidationStatus.INVALID
                  }
                  testId="holdOrHospitalizationtitleid"
                >
                  <RadioGroup
                    name="vacTherapyBeenHold"
                    classes={{ root: "radioRoot" }}
                    onChange={validateAndSetData}
                    value={data?.vacTherapyBeenHold.value}
                  >
                    <FormControlLabel
                      classes={{
                        root:
                          active === true ? "optionRoot-active" : "optionRoot",
                      }}
                      componentsProps={{
                        typography: {
                          classes: {
                            root:
                              active === true ? "optiontxtSelect" : "optiontxt",
                          },
                        },
                      }}
                      control={
                        <Radio
                          icon={<RadioButtonIcon />}
                          checkedIcon={<SelectedRadioButtonIcon />}
                        />
                      }
                      data-testid="holdOrHospitalization-yes"
                      label="Yes"
                      value="yes"
                    />
                    <FormControlLabel
                      classes={{
                        root:
                          active === false ? "optionRoot-active" : "optionRoot",
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
                      data-testid="holdOrHospitalization-no"
                      label="No"
                      value="no"
                    />
                  </RadioGroup>
                </InputWithLabel>
              </Grid>
            </Grid>
          </Box>
          {data?.vacTherapyBeenHold.value === "yes" && (
            <Box
              className="holdOrHospitalization-box-container"
              sx={{ flexGrow: 1 }}
            >
              <Grid
                className="holdOrHospitalization-grid-container"
                container
                spacing={2}
              >
                <Grid className="holdOrHospitalization-grid-item" item xs={5}>
                  <InputWithLabel
                    labelClassName={focusClasses.vacHoldStartDate}
                    label="Hold Start Date"
                    isRequired={data?.vacHoldStartDate.required}
                    error={
                      data?.vacHoldStartDate.valid === ValidationStatus.INVALID
                    }
                    testId="vacHoldStartDate"
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
                            root: `vacHoldStartDate ${
                              data?.vacHoldStartDate.valid ===
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
                              name="vacHoldStartDate"
                              onFocus={(e) => setClasses(e, "Mui-focused")}
                              onBlur={(e) => setClasses(e, "")}
                              {...params}
                            />
                          );
                        }}
                        value={data?.vacHoldStartDate.value}
                        maxDate={moment()}
                      />
                    </LocalizationProvider>
                  </InputWithLabel>
                </Grid>
                <Grid item xs={7}>
                  <InputWithLabel
                    label="Reason for hold"
                    isRequired={data?.vacHoldReason.required}
                    error={
                      data?.vacHoldReason.valid === ValidationStatus.INVALID
                    }
                    testId="vacHoldReason"
                  >
                    <Select
                      classes={{
                        select: data.vacHoldReason.value
                          ? "selectHoldReason"
                          : "placeholder",
                        icon: "selectIcon",
                      }}
                      className={
                        data.vacHoldReason.value
                          ? "selectRootHoldReason"
                          : "placeholder"
                      }
                      displayEmpty={true}
                      IconComponent={SelectIcon}
                      inputProps={{ "data-testid": "selectHoldReason" }}
                      name="vacHoldReason"
                      onChange={validateAndSetData}
                      renderValue={(value) =>
                        value?.length ? value : "Select reason"
                      }
                      sx={{ width: "100%" }}
                      value={data.vacHoldReason.value}
                      variant="outlined"
                    >
                      {vacHoldReasonCode &&
                        Array.isArray(vacHoldReasonCode) &&
                        vacHoldReasonText.map((x: string) => (
                          <MenuItem
                            value={getCodeFromText(vacHoldReasonCode, x)}
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
          {data?.vacTherapyBeenHold.value === "yes" && (
            <VacTherapyResumeStatus data={data} setData={setData} />
          )}
        </div>
      ) : (
        <ReviewHoldOrHospitalization
          data={data}
          editButtonClicked={editButtonClicked}
          isWoundAssessmentSummary={isWoundAssessmentSummary}
        />
      )}
    </div>
  );
};
