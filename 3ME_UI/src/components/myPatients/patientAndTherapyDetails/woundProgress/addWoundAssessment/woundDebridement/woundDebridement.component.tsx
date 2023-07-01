import { Box, FormControlLabel, Grid, Radio, TextField } from "@mui/material";
import RadioGroup from "@mui/material/RadioGroup";
import React, { useEffect, useState } from "react";
import { InputWithLabel } from "../../../../../../core/inputWithLabel/inputWithLabel.component";
import { ValidationStatus } from "../../../../../../core/interfaces/input.interface";
import { IAddWoundAssessment } from "../addWoundAssessment.interface";
import { AddWoundAssessmentValidator } from "../addWoundAssessment.validator";
import { ReactComponent as SelectedRadioButtonIcon } from "../../../../../../assets/selectedRadioButton.svg";
import { ReactComponent as RadioButtonIcon } from "../../../../../../assets/radioButton.svg";
import "./woundDebridement.css";
import {
  DD_DEBRIDEMENT_TYPE,
  DD_LICENSE_CONTENT,
} from "../../../../../../util/staticText";
import { getdropDownContent } from "../../../../../../util/dropDownService";
import { format } from "react-string-format";
import { CustomDropDown } from "../../../../../../core/customDropdown/customDropdown.component";
import {
  convertStringToDate,
  getCodeFromText,
  getInvalidObj,
  getTextFromCode,
  getValidObj,
} from "../../../../../../util/utilityFunctions";
import moment from "moment";
import { getCurrentServerDateTime } from "../../../../../../util/3meService";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { ReactComponent as CalendarIcon } from "../../../../../../assets/calendar.svg";
import {
  woundDebridementNoReset,
  woundDebridementYesReset,
} from "../woundAssessment.utils";
import ReviewWoundDebridement from "./reviewWoundDebridement/reviewWoundDebridement.component";

type Props = {
  data: IAddWoundAssessment;
  setData: React.Dispatch<React.SetStateAction<IAddWoundAssessment>>;
  Validator?: AddWoundAssessmentValidator;
  debridementTypeHeading: string;
  isReviewAssessment?: boolean;
  isWoundAssessmentSummary?: any;
  editButtonClicked?: any;
};

const WoundDebridement = ({
  data,
  setData,
  Validator = new AddWoundAssessmentValidator(),
  isReviewAssessment = false,
  isWoundAssessmentSummary,
  debridementTypeHeading,
  editButtonClicked,
}: Props) => {
  const [validator] = React.useState<AddWoundAssessmentValidator>(Validator);
  const [active, setActive] = React.useState<boolean | null>(null);
  const [focusClasses, setFocusClasses] = useState({
    woundDebridementDate: "",
  });
  const [woundDebridementTypeCode, setWoundDebridementTypeCode] =
    React.useState([]);
  const [woundDebridementTypeText, setWoundDebridementTypeText] =
    React.useState([]);
  const [maxDate, setMaxDate] = useState<any>();
  const [minDate, setMinDate] = useState<any>();
  const fetchDropdownContents = async () => {
    try {
      const data = await getdropDownContent(DD_DEBRIDEMENT_TYPE);
      if (data.items.length > 0) {
        const woundDebridementObject = data.items.filter(
          (item: { name: string }) => item.name === DD_DEBRIDEMENT_TYPE
        );
        const woundDebridementData = woundDebridementObject[0].data.sort(
          (a: { order: number }, b: { order: number }) =>
            a.order > b.order ? 1 : -1
        );
        setWoundDebridementTypeCode(woundDebridementData);
        setWoundDebridementTypeText(
          woundDebridementData.map((x: { text: string }) => x.text)
        );
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const validateAndSetData = (e: any) => {
    let isValid = validator.validate(e.target.value, e.target.name);
    if (e.target.name === "woundDebridementStatus") {
      if (e.target.value === "yes") {
        setActive(true);
        woundDebridementYesReset(data, setData);
      } else if (e.target.value === "no") {
        setActive(false);
        woundDebridementNoReset(data, setData);
      } else {
        setActive(null);
      }
    } else {
      setData({
        ...data,
        [e.target.name]: {
          value: getCodeFromText(woundDebridementTypeCode, e.target.value),
          valid: isValid?.status,
          required: true,
        },
      });
    }
  };
  const setClasses = (e: any, classname: string) => {
    setFocusClasses(
      Object.assign({}, focusClasses, { [e.target.name]: classname })
    );
  };

  const setDateTime = async () => {
    const currentDateRes = await getCurrentServerDateTime();
    const formatMinDate = moment(data.placementDate.value);
    if (currentDateRes) {
      const formatMaxDate = moment(currentDateRes.currentCstTime);
      setMaxDate(formatMaxDate);
      setMinDate(formatMinDate);
    }
  };
  const validateAndSetDate = (date: string | null | undefined) => {
    const formatteddate = convertStringToDate(date);
    const isValid = Validator.validate(formatteddate!, "woundDebridementDate");
    setData(
      Object.assign({}, data, {
        woundDebridementDate: {
          value: formatteddate,
          valid: isValid?.status,
          required: true,
        },
      })
    );
  };
  useEffect(() => {
    fetchDropdownContents();
    setDateTime();
  }, []);

  useEffect(() => {
    if (
      data!.woundDebridementStatus.value === "yes" ||
      data!.woundDebridementStatus.value === "no"
    ) {
      setActive(data!.woundDebridementStatus.value === "yes" ? true : false);
    }
  }, [data.woundDebridementStatus.value]);

  return (
    <div className="woundDebridement-component">
      {!isReviewAssessment ? (
        <div className="woundDebridement">
          <div
            className="woundDebridement-header"
            data-testid="woundDebridement-header"
          >
            Debridement
          </div>
          <Box className="woundDebridement-box-container" sx={{ flexGrow: 1 }}>
            <Grid
              className="woundDebridement-grid-container"
              container
              spacing={2}
            >
              <Grid className="woundDebridement-grid-item" item xs={6}>
                <InputWithLabel
                  label={debridementTypeHeading}
                  isRequired={data?.woundDebridementStatus.required}
                  error={
                    data?.woundDebridementStatus.valid ===
                    ValidationStatus.INVALID
                  }
                  testId="woundDebridementStatusId"
                >
                  <RadioGroup
                    name="woundDebridementStatus"
                    classes={{ root: "radioRoot" }}
                    onChange={validateAndSetData}
                    value={data?.woundDebridementStatus.value}
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
                      data-testid="woundDebridementStatus-yes"
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
                      data-testid="woundDebridementStatus-no"
                      label="No"
                      value="no"
                    />
                  </RadioGroup>
                </InputWithLabel>
              </Grid>
            </Grid>
          </Box>
          {data?.woundDebridementStatus.value === "yes" && (
            <Box
              className="woundDebridement-box-container"
              sx={{ flexGrow: 1 }}
            >
              <Grid
                className="woundDebridement-grid-container"
                container
                spacing={2}
              >
                <Grid className="woundDebridement-grid-item" item xs={6}>
                  <InputWithLabel
                    label="Type of Debridement"
                    isRequired={data?.woundDebridementType.required}
                    error={
                      data?.woundDebridementType.valid ===
                      ValidationStatus.INVALID
                    }
                    testId="woundDebridement-name-label"
                    sx={{ height: "40px" }}
                  >
                    <CustomDropDown
                      name="woundDebridementType"
                      value={
                        data?.woundDebridementType.value
                          ? getTextFromCode(
                              woundDebridementTypeCode,
                              data.woundDebridementType.value
                            )
                          : null
                      }
                      handleChange={validateAndSetData}
                      selectpropsClassName={
                        data?.woundDebridementType.value
                          ? "woundDebridementType-info-select"
                          : "placeholder"
                      }
                      selectClassName="woundDebridementType-info-input woundDebridementType-info"
                      testId="woundDebridementType-type"
                      menuItem={woundDebridementTypeText}
                      placeHolder="Select Debridement Type"
                    />
                  </InputWithLabel>
                  <div className="debirdement-date-picker">
                    <InputWithLabel
                      label="Debridement Date"
                      labelClassName={focusClasses.woundDebridementDate}
                      isRequired={data?.woundDebridementDate.required}
                      error={
                        data?.woundDebridementDate.valid ===
                        ValidationStatus.INVALID
                      }
                      testId="woundDebridement-name-label"
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
                              root: `dateOfDebridement ${
                                data?.woundDebridementDate.valid ===
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
                                name="woundDebridementDate"
                                onFocus={(e) => setClasses(e, "Mui-focused")}
                                onBlur={(e) => setClasses(e, "")}
                                {...params}
                              />
                            );
                          }}
                          value={
                            data?.woundDebridementDate.value === ""
                              ? null
                              : data?.woundDebridementDate.value
                          }
                          maxDate={maxDate}
                          minDate={minDate}
                          defaultCalendarMonth={maxDate}
                        />
                      </LocalizationProvider>
                    </InputWithLabel>
                  </div>
                </Grid>
              </Grid>
            </Box>
          )}
        </div>
      ) : (
        <ReviewWoundDebridement
          data={data}
          editButtonClicked={editButtonClicked}
          woundDebridementTypeCode={woundDebridementTypeCode}
          isWoundAssessmentSummary={isWoundAssessmentSummary}
        />
      )}
    </div>
  );
};
export default WoundDebridement;
