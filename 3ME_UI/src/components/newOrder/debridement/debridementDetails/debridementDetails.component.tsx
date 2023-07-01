import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { ReactComponent as CalendarIcon } from "../../../../assets/calendar.svg";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { CustomDropDown } from "../../../../core/customDropdown/customDropdown.component";
import { InputWithLabel } from "../../../../core/inputWithLabel/inputWithLabel.component";
import { ValidationStatus } from "../../../../core/interfaces/input.interface";
import { NewOrderValidator } from "../../newOrder.validator";
import { debridementProps } from "../debridement.interfaces";
import { TextField } from "@mui/material";
import { DD_DEBRIDEMENT_TYPE } from "../../../../util/staticText";
import { getdropDownContent } from "../../../../util/dropDownService";
import { format } from "react-string-format";
import { convertStringToDate } from "../../../../util/utilityFunctions";

const DebridementDetails = ({
  woundInfoData,
  setWoundInfoData,
  Validator = new NewOrderValidator(),
}: debridementProps) => {
  const [validator] = React.useState<NewOrderValidator>(Validator!);
  const [focusClasses, setFocusClasses] = useState({ debridementDate: "" });
  const [debridementTypes, setDebridementTypes] = useState([]);

  const validateAndSetDebridementType = (e: any) => {
    let { value } = e.target;
    let isValid;
    isValid = validator.validate(e.target.value, e.target.name);
    setWoundInfoData(
      Object.assign({}, woundInfoData, {
        [e.target.name]: {
          value: value,
          valid: isValid?.status,
          required: true,
        },
      })
    );
  };

  const validateAndSetDate = (date: string | null | undefined) => {
    const formatteddate = convertStringToDate(date);
    const isValid = Validator.validate(formatteddate!, "debridementDate");
    setWoundInfoData(
      Object.assign({}, woundInfoData, {
        debridementDate: {
          value: formatteddate,
          valid: isValid?.status,
          required: true,
        },
      })
    );
  };

  const setClasses = (e: any, classname: string) => {
    setFocusClasses(
      Object.assign({}, focusClasses, { [e.target.name]: classname })
    );
  };

  useEffect(() => {
    fetchdropDownContent();
  }, []);

  const fetchdropDownContent = async () => {
    try {
      const ddContent = format("{0}", DD_DEBRIDEMENT_TYPE);
      const data = await getdropDownContent(ddContent);
      if (data.items.length > 0) {
        const licenseObject = data.items.filter(
          (item: { name: string }) => item.name === DD_DEBRIDEMENT_TYPE
        );
        const licenseData = licenseObject[0].data
          .sort((a: { order: number }, b: { order: number }) =>
            a.order > b.order ? 1 : -1
          )
          .map((x: { text: string }) => x.text);
        setDebridementTypes(licenseData);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div>
      {woundInfoData.debridementAttempted.value === "Yes" && (
        <>
          <div style={{ marginTop: "8px" }}>
            <InputWithLabel
              label="Type of Debridement"
              isRequired={woundInfoData?.debridementType.required}
              error={
                woundInfoData?.debridementType.valid ===
                ValidationStatus.INVALID
              }
              testId="test-debridementType"
            >
              <CustomDropDown
                handleChange={validateAndSetDebridementType}
                menuItem={debridementTypes}
                name="debridementType"
                placeHolder="Select Debridement Type"
                selectpropsClassName={
                  woundInfoData.debridementType.value
                    ? "debridementType-select"
                    : "placeHolder"
                }
                selectClassName={
                  woundInfoData.debridementType.value
                    ? "debridementType-input"
                    : "placeHolder"
                }
                testId="test-debridementType-dropdown"
                value={woundInfoData?.debridementType.value}
              />
            </InputWithLabel>
          </div>
          <div style={{ width: "242px", marginTop: "8px" }}>
            <InputWithLabel
              labelClassName={focusClasses.debridementDate}
              label="Debridement Date"
              isRequired={woundInfoData?.debridementDate.required}
              error={
                woundInfoData?.debridementDate.valid ===
                ValidationStatus.INVALID
              }
              testId="debridement-date-id"
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
                        woundInfoData?.debridementDate.valid ===
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
                        name="debridementDate"
                        onFocus={(e) => setClasses(e, "Mui-focused")}
                        onBlur={(e) => setClasses(e, "")}
                        {...params}
                      />
                    );
                  }}
                  value={woundInfoData?.debridementDate.value}
                />
              </LocalizationProvider>
            </InputWithLabel>
          </div>
        </>
      )}
    </div>
  );
};

export default DebridementDetails;
