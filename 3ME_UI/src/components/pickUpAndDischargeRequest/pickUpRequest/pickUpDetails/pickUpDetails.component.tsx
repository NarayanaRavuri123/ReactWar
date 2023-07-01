import moment from "moment";
import "./pickUpDetails.css";
import { Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { format } from "react-string-format";
import { IPickUpDetails } from "./pickUpDetails.interface";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { PickUpRequestValidator } from "../pickUpRequest.validator";
import { getdropDownContent } from "../../../../util/dropDownService";
import {
  CMS_UPS_PDF_CONTENT,
  DD_RETURN_METHOD_CONTENT,
} from "../../../../util/staticText";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import {
  IInputField,
  Validation,
  ValidationStatus,
} from "../../../../core/interfaces/input.interface";
import { ReactComponent as CalendarIcon } from "../../../../assets/calendar.svg";
import { InputWithLabel } from "../../../../core/inputWithLabel/inputWithLabel.component";
import { CustomDropDown } from "../../../../core/customDropdown/customDropdown.component";
import {
  convertStringToDate,
  getInvalidObj,
  getValidObj,
} from "../../../../util/utilityFunctions";
import { IPickUpRequest } from "../pickUpRequest.interface";
import { getCMSContent } from "../../../../util/cmsService";
import { WindowService } from "../../../../util/window.service";
import PickUpDetailReview from "./pickUpDetailReview/pickUpDetailReview.component";

export const PickUpDetails = ({
  data,
  setData,
  patient,
  Validator = new PickUpRequestValidator(),
  isConfirmPickUpSummary = false,
}: IPickUpDetails) => {
  const [returnMethods, setReturnMethods] = useState([]);
  const [upsPdfLink, setUpsPdfLink] = useState<string>("");
  const [returnMethodsText, setReturnMethodsText] = useState([]);
  const [validator] = useState<PickUpRequestValidator>(Validator!);

  const fetchDropDownContent = async () => {
    try {
      const ddContent = format("{0}", DD_RETURN_METHOD_CONTENT);
      const data = await getdropDownContent(ddContent);
      if (data.items.length > 0) {
        const returnMethodObject = data.items.filter(
          (item: { name: string }) => item.name === DD_RETURN_METHOD_CONTENT
        );
        const returnMethodData = returnMethodObject[0].data.sort(
          (a: { order: number }, b: { order: number }) =>
            a.order > b.order ? 1 : -1
        );
        setReturnMethods(returnMethodData);
        setReturnMethodsText(
          returnMethodData.map((x: { text: string }) => x.text)
        );
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchUpsPDFContent = async () => {
    //async and await
    try {
      const data = await getCMSContent(CMS_UPS_PDF_CONTENT);
      if (data.item) {
        setUpsPdfLink(data.item.FileLink);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const [focusClasses, setFocusClasses] = useState({
    placementDate: "placementDate",
    therapyDischargeDate: "therapyDischargeDate",
    stopBillDate: "stopBillDate",
    specialInstructions: "specialInstructions",
  });

  const setClasses = (e: any, classname: string) => {
    setFocusClasses(
      Object.assign({}, focusClasses, { [e.target.name]: classname })
    );
  };

  const validateAndSetDate = (
    target: string,
    date: string | null | undefined
  ) => {
    switch (target) {
      case "therapyDischargeDate":
        const therapyDischargeDate = convertStringToDate(date);
        const placementDate = convertStringToDate(patient.placementDate!);
        const isValid = therapyDischargeDateValidation(
          therapyDischargeDate,
          placementDate
        );
        const updatedValue: IInputField = {
          value: therapyDischargeDate,
          valid: isValid!.status,
          required: true,
        };
        let stopBillDateValue = data.stopBillDate;
        if (isValid!.status === ValidationStatus.VALID) {
          stopBillDateValue = {
            value: therapyDischargeDate,
            valid: isValid!.status,
            required: false,
          };
        }
        setData((dt: IPickUpRequest) => ({
          ...dt,
          therapyDischargeDate: updatedValue,
          stopBillDate: stopBillDateValue,
        }));
        break;
      default:
        break;
    }
  };

  const validateAndSetData = (e: any) => {
    let value = e.target.value;
    let required = false;
    if (e.target.name === "returnMethod") {
      value = getCodeFromText(returnMethods, e.target.value);
      required = true;
    }
    const isValid = validator.validate(value, e.target.name);
    setData((dt: IPickUpRequest) => ({
      ...dt,
      [e.target.name]: {
        value: value,
        valid: isValid?.status,
        required: required,
      },
    }));
  };

  const updateAllDates = () => {
    let therapyDate = "";
    let stopDate = "";
    let currentDate = moment(Date()).format("MM/DD/YYYY");
    let isTherapyDateValid = ValidationStatus.VALID;
    let isStopDateValid = ValidationStatus.VALID;
    if (data.therapyDischargeDate.value !== "") {
      therapyDate = moment(data.therapyDischargeDate.value).format(
        "MM/DD/YYYY"
      );
      isTherapyDateValid = data.therapyDischargeDate.valid;
    }
    if (data.stopBillDate.value !== "") {
      stopDate = moment(data.stopBillDate.value).format("MM/DD/YYYY");
      isStopDateValid = data.stopBillDate.valid;
    }
    setData((dt: IPickUpRequest) => ({
      ...dt,
      placementDate: {
        value: moment(patient.placementDate!).format("MM/DD/YYYY"),
        valid: ValidationStatus.VALID,
        required: false,
      },
      therapyDischargeDate: {
        value: therapyDate === "" ? currentDate : therapyDate,
        valid: isTherapyDateValid,
        required: true,
      },
      stopBillDate: {
        value: stopDate === "" ? currentDate : stopDate,
        valid: isStopDateValid,
        required: false,
      },
    }));
  };

  const getCodeFromText = (array: never[], input: string): string => {
    if (Array.isArray(array)) {
      return array
        .filter((item: { text: string; code: string }) => item.text === input)
        .map((x: { code: string }) => x.code)[0];
    }
    return "";
  };

  const getTextFromCode = (array: never[], code: string): string => {
    if (code !== "" && array.length === 0) {
      return code;
    }
    if (Array.isArray(array)) {
      return array
        .filter((item: { text: string; code: string }) => item.code === code)
        .map((x: { text: string }) => x.text)[0];
    }
    return code;
  };

  const therapyDischargeDateValidation = (
    newDate: string,
    placement: string
  ): Validation => {
    const therapyDischargeDate = moment(newDate);
    const placementDate = moment(placement);
    const today = moment();
    if (
      placementDate.isValid() &&
      therapyDischargeDate.isValid() &&
      therapyDischargeDate.isSameOrBefore(today) &&
      therapyDischargeDate.isAfter(placementDate)
    ) {
      return getValidObj();
    }
    return getInvalidObj(null);
  };

  const openUpsPdf = () => {
    if (upsPdfLink !== "") {
      const windowService = new WindowService();
      windowService.openPdf(upsPdfLink);
    }
  };

  useEffect(() => {
    updateAllDates();
    fetchDropDownContent();
    fetchUpsPDFContent();
  }, []);

  return !isConfirmPickUpSummary ? (
    <div className="pick-up-details" data-testid="pick-up-details">
      <h2 className="pick-up-details-title" data-testid="pick-up-details-title">
        Pickup Details
      </h2>
      <h5
        className="pick-up-details-description"
        data-testid="pick-up-details-description"
      >
        Your invoice will reflect billing through{" "}
        {moment(Date()).format("MM/DD/YYYY")}.
      </h5>
      <Grid className="pick-up-details-grid-container" container spacing={2}>
        <Grid className="pick-up-details-grid-item" item xs={6}>
          <InputWithLabel
            labelClassName={focusClasses.placementDate}
            label="Placement date"
            isRequired={data.placementDate.required}
            error={data.placementDate.valid === ValidationStatus.INVALID}
            testId="pick-up-details-placement-date"
          >
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                components={{ OpenPickerIcon: CalendarIcon }}
                disabled={true}
                InputAdornmentProps={{
                  classes: {
                    root: "adornedRoot",
                  },
                }}
                InputProps={{
                  classes: {
                    root: `placementDate ${
                      data.placementDate.valid === ValidationStatus.INVALID
                        ? "showError"
                        : "noError"
                    }`,
                    input: "input",
                    notchedOutline: "outline",
                  },
                }}
                onChange={(value) => validateAndSetDate("placementDate", value)}
                renderInput={(params) => {
                  params.error = false;
                  params.inputProps!.placeholder = "__/__/____";
                  return (
                    <TextField
                      name="placementDate"
                      onFocus={(e) => setClasses(e, "Mui-focused")}
                      onBlur={(e) => setClasses(e, "")}
                      {...params}
                    />
                  );
                }}
                value={data.placementDate.value}
              />
            </LocalizationProvider>
          </InputWithLabel>
        </Grid>
        <Grid className="pick-up-details-grid-item" item xs={6}></Grid>
        <Grid className="pick-up-details-grid-item" item xs={6}>
          <InputWithLabel
            labelClassName={focusClasses.therapyDischargeDate}
            label="Therapy Discharge Date"
            isRequired={data.therapyDischargeDate.required}
            error={data.therapyDischargeDate.valid === ValidationStatus.INVALID}
            testId="pick-up-details-therapy-discharge-date"
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
                    root: `therapyDischargeDate ${
                      data.therapyDischargeDate.valid ===
                      ValidationStatus.INVALID
                        ? "showError"
                        : "noError"
                    }`,
                    input: "input",
                    notchedOutline: "outline",
                  },
                }}
                onChange={(value) =>
                  validateAndSetDate("therapyDischargeDate", value)
                }
                renderInput={(params) => {
                  params.error = false;
                  params.inputProps!.placeholder = "__/__/____";
                  return (
                    <TextField
                      name="therapyDischargeDate"
                      onFocus={(e) => setClasses(e, "Mui-focused")}
                      onBlur={(e) => setClasses(e, "")}
                      {...params}
                    />
                  );
                }}
                value={data.therapyDischargeDate.value}
              />
            </LocalizationProvider>
          </InputWithLabel>
        </Grid>
        <Grid className="pick-up-details-grid-item" item xs={6}></Grid>
        <Grid className="pick-up-details-grid-item" item xs={6}>
          <InputWithLabel
            labelClassName={focusClasses.stopBillDate}
            label="Stop Bill Date"
            isRequired={data.stopBillDate.required}
            error={data.stopBillDate.valid === ValidationStatus.INVALID}
            testId="pick-up-details-stop-bill-date"
          >
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                components={{ OpenPickerIcon: CalendarIcon }}
                disabled={true}
                InputAdornmentProps={{
                  classes: {
                    root: "adornedRoot",
                  },
                }}
                InputProps={{
                  classes: {
                    root: `stopBillDate ${
                      data.stopBillDate.valid === ValidationStatus.INVALID
                        ? "showError"
                        : "noError"
                    }`,
                    input: "input",
                    notchedOutline: "outline",
                  },
                }}
                onChange={(value) => validateAndSetDate("stopBillDate", value)}
                renderInput={(params) => {
                  params.error = false;
                  params.inputProps!.placeholder = "__/__/____";
                  return (
                    <TextField
                      name="stopBillDate"
                      onFocus={(e) => setClasses(e, "Mui-focused")}
                      onBlur={(e) => setClasses(e, "")}
                      {...params}
                    />
                  );
                }}
                value={data.stopBillDate.value}
              />
            </LocalizationProvider>
          </InputWithLabel>
        </Grid>
        <Grid className="pick-up-details-grid-item" item xs={12}>
          <InputWithLabel
            labelClassName="pick-up-details-return-method"
            error={data.returnMethod.valid === ValidationStatus.INVALID}
            isRequired={data.returnMethod.required}
            label="Return Method"
            testId="pick-up-details-return-method"
          >
            <CustomDropDown
              handleChange={validateAndSetData}
              menuItem={returnMethodsText}
              name="returnMethod"
              placeHolder="Select return method"
              selectpropsClassName={
                data.returnMethod.value
                  ? "pick-up-details-select"
                  : "placeHolder"
              }
              selectClassName={
                data.returnMethod.value
                  ? "pick-up-details-input"
                  : "placeHolder"
              }
              testId="pick-up-details-returnMethod"
              value={
                data.returnMethod.value
                  ? getTextFromCode(returnMethods, data.returnMethod.value)
                  : null
              }
            />
          </InputWithLabel>
        </Grid>
        <Grid className="pick-up-details-grid-item" item xs={12}>
          <div className="instructions-description-div">
            <h5
              className="instructions-description-text"
              data-testid="instructions-description-text"
            >
              Product Pickups are performed by UPS.{"  "}
              <span
                onClick={openUpsPdf}
                className="instructions-description-text-click-here"
                data-testid="instructions-description-text-click-here"
              >
                Click here
              </span>
              {"  "}
              for important information.
            </h5>
          </div>
        </Grid>
        <Grid className="pick-up-details-grid-item" item xs={12}>
          <InputWithLabel
            error={data.specialInstructions.valid === ValidationStatus.INVALID}
            isRequired={data.specialInstructions.required}
            label="Special Instructions"
            labelClassName={focusClasses.specialInstructions}
            testId="pick-up-details-special-instruction"
          >
            <TextField
              error={
                data.specialInstructions.valid === ValidationStatus.INVALID
              }
              FormHelperTextProps={{ classes: { root: "helperText" } }}
              fullWidth
              InputProps={{ classes: { root: "textarea-root" } }}
              multiline
              name="specialInstructions"
              onBlur={(e) => setClasses(e, "")}
              onChange={validateAndSetData}
              onFocus={(e) => setClasses(e, "Mui-focused")}
              required={data.specialInstructions.required}
              rows={4}
              value={data.specialInstructions.value}
            />
          </InputWithLabel>
        </Grid>
      </Grid>
    </div>
  ) : (
    <PickUpDetailReview data={data} />
  );
};
