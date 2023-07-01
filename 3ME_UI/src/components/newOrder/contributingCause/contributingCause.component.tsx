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
import moment from "moment";
import "./contributingCause.css";
import {
  convertStringToDate,
  getCodeFromText,
  getTextFromCode,
} from "../../../util/utilityFunctions";
import { format } from "react-string-format";
import React, { useContext, useEffect, useState } from "react";
import { NewOrderValidator } from "../newOrder.validator";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { IContributingCause } from "./contributingCause.interface";
import { getdropDownContent } from "../../../util/dropDownService";
import { DD_ACCIDENT_TYPE_CONTENT } from "../../../util/staticText";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { ValidationStatus } from "../../../core/interfaces/input.interface";
import { ReactComponent as CalendarIcon } from "../../../assets/calendar.svg";
import { ReactComponent as SelectIcon } from "../../../assets/selectIcon.svg";
import { ReactComponent as RadioButtonIcon } from "../../../assets/radioButton.svg";
import { InputWithLabel } from "../../../core/inputWithLabel/inputWithLabel.component";
import { ReactComponent as SelectedRadioButtonIcon } from "../../../assets/selectedRadioButton.svg";
import { ContributingCauseReviewOrder } from "./reviewOrder/contributingCauseReviewOrder.component";
import {
  NewOrderContext,
  NewOrderContextType,
} from "../../../context/NewOrderContext";

export const ContributingCause = ({
  data,
  Validator = new NewOrderValidator(),
  setData,
  isReviewOrder = false,
  editButtonClicked,
  isOrderSummary = false,
}: IContributingCause) => {
  const [validator] = React.useState<NewOrderValidator>(Validator!);
  const [focusClasses, setFocusClasses] = useState({ dateOfAccident: "" });
  const [accidentTypes, setAccidentTypes] = React.useState([]);
  const [accidentTypesText, setAccidentTypesText] = React.useState([]);
  const [active, setActive] = React.useState<boolean | null>(null);
  const NewOrderObj = useContext<NewOrderContextType | null>(NewOrderContext);
  useEffect(() => {
    fetchAccidentContent();
  }, []);

  useEffect(() => {
    if (
      data !== null &&
      (data!.contributingCause.value === "yes" ||
        data!.contributingCause.value === "no")
    ) {
      setActive(data!.contributingCause.value === "yes" ? true : false);
    }
  }, [data.contributingCause]);

  const fetchAccidentContent = async () => {
    //async and await
    try {
      const ddContent = format("{0}", DD_ACCIDENT_TYPE_CONTENT);
      const data = await getdropDownContent(ddContent);
      if (data.items.length > 0) {
        const accidentTypeObject = data.items.filter(
          (item: { name: string }) => item.name === DD_ACCIDENT_TYPE_CONTENT
        );
        const accidentTypeArray = accidentTypeObject[0].data.sort(
          (a: { order: number }, b: { order: number }) =>
            a.order > b.order ? 1 : -1
        );
        setAccidentTypes(accidentTypeArray);
        setAccidentTypesText(
          accidentTypeArray.map((x: { text: string }) => x.text)
        );
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const validateAndSetData = (e: any) => {
    NewOrderObj?.setIsHandleChangeTriggered(true);
    if (
      e.target.name === "contributingCause" &&
      e.target.value !== data.contributingCause.value
    ) {
      data.dateOfAccident = { value: "", valid: ValidationStatus.UNTOUCHED };
      data.accidentType = { value: "", valid: ValidationStatus.UNTOUCHED };
    }
    if (e.target.name === "contributingCause") {
      if (e.target.value === "yes") {
        setActive(true);
      } else if (e.target.value === "no") {
        setActive(false);
      } else {
        setActive(null);
      }
    }
    const isValid = validator.validate(e.target.value, e.target.name);
    setData(
      Object.assign({}, data, {
        [e.target.name]: { value: e.target.value, valid: isValid?.status },
      })
    );
  };

  const validateAndSetDate = (date: string | null | undefined) => {
    const formatteddate = convertStringToDate(date);
    NewOrderObj?.setIsHandleChangeTriggered(true);
    const isValid = validator.validate(formatteddate!, "dateOfAccident");
    setData(
      Object.assign({}, data, {
        dateOfAccident: {
          value: formatteddate,
          valid: isValid?.status,
        },
      })
    );
  };

  const setClasses = (e: any, classname: string) => {
    setFocusClasses(
      Object.assign({}, focusClasses, { [e.target.name]: classname })
    );
  };

  return (
    <div className="contributing-cause-component">
      {!isReviewOrder && (
        <div className="contributing-cause">
          <h2
            className="contributing-cause-title"
            data-testid="contributing-cause-title"
          >
            Contributing Cause
          </h2>
          <Box
            className="contributing-cause-box-container"
            sx={{ flexGrow: 1 }}
          >
            <Grid
              className="contributing-cause-grid-container"
              container
              spacing={2}
            >
              <Grid className="contributing-cause-grid-item" item xs={6}>
                <InputWithLabel
                  label="Is wound a direct result of an accident?"
                  isRequired={true}
                  error={
                    data?.contributingCause.valid === ValidationStatus.INVALID
                  }
                  testId="contributing-cause-is-wound-from-accident"
                >
                  <RadioGroup
                    name="contributingCause"
                    classes={{ root: "radioRoot" }}
                    onChange={validateAndSetData}
                    value={data?.contributingCause.value}
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
                      data-testid="contributing-cause-is-wound-from-accident-yes"
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
                      data-testid="contributing-cause-is-wound-from-accident-no"
                      label="No"
                      value="no"
                    />
                  </RadioGroup>
                </InputWithLabel>
              </Grid>
            </Grid>
          </Box>
          {active && active === true && (
            <Box
              className="contributing-cause-box-container"
              sx={{ flexGrow: 1 }}
            >
              <Grid
                className="contributing-cause-grid-container"
                container
                spacing={2}
              >
                <Grid className="contributing-cause-grid-item" item xs={4}>
                  <InputWithLabel
                    labelClassName={focusClasses.dateOfAccident}
                    label="Date of Accident"
                    isRequired={true}
                    error={
                      data?.dateOfAccident.valid === ValidationStatus.INVALID
                    }
                    testId="contributing-cause-date-of-accident"
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
                            root: `dateOfAccident ${
                              data?.dateOfAccident.valid ===
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
                              name="dateOfAccident"
                              onFocus={(e) => setClasses(e, "Mui-focused")}
                              onBlur={(e) => setClasses(e, "")}
                              {...params}
                            />
                          );
                        }}
                        value={data?.dateOfAccident.value}
                      />
                    </LocalizationProvider>
                  </InputWithLabel>
                </Grid>
                <Grid item xs={8}>
                  <InputWithLabel
                    label="Accident Type"
                    isRequired={true}
                    error={
                      data?.accidentType.valid === ValidationStatus.INVALID
                    }
                    testId="contributing-cause-accident-type"
                  >
                    <Select
                      classes={{
                        select: data.accidentType.value
                          ? "selectAccidentType"
                          : "placeholder",
                        icon: "selectIcon",
                      }}
                      className={
                        data.accidentType.value
                          ? "selectRootAccidentType"
                          : "placeholder"
                      }
                      displayEmpty={true}
                      IconComponent={SelectIcon}
                      inputProps={{ "data-testid": "selectAccidentType" }}
                      name="accidentType"
                      onChange={validateAndSetData}
                      renderValue={(value) =>
                        value?.length ? value : "Select Type"
                      }
                      sx={{ width: "100%" }}
                      value={
                        data.accidentType.value
                          ? getTextFromCode(
                              accidentTypes,
                              data?.accidentType?.value
                            )
                          : ""
                      }
                      variant="outlined"
                    >
                      {accidentTypes &&
                        Array.isArray(accidentTypes) &&
                        accidentTypesText.map((x: string) => (
                          <MenuItem value={getCodeFromText(accidentTypes, x)}>
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
      )}
      {isReviewOrder && (
        <ContributingCauseReviewOrder
          accidentTypes={accidentTypes}
          data={data}
          editButtonClicked={editButtonClicked}
          isOrderSummary={isOrderSummary}
        />
      )}
    </div>
  );
};
