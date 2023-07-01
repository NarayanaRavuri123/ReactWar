import moment from "moment";
import "./holdOrResumeTherapy.css";
import {
  IHoldOrResumeTherapy,
  IHoldOrResumeTherapyData,
  WoundDetails,
} from "./holdOrResumeTherapy.interface";
import { format } from "react-string-format";
import {
  getCodeFromText,
  getTextFromCode,
} from "../../../../../util/utilityFunctions";
import { useHistory } from "react-router-dom";
import {
  SendNoteContextType,
  SendNoteContext,
} from "../../../../../context/SendNoteContext";
import { Grid, TextField } from "@mui/material";
import {
  IHoldAndResumeDate,
  IMinAndMaxDate,
} from "../resumeTherapy/resumeTherapy.interface";
import { useContext, useEffect, useState } from "react";
import { DD_REASON_FOR_HOLD } from "../../../../../util/staticText";
import { getdropDownContent } from "../../../../../util/dropDownService";
import { HoldOrResumeTherapyValidator } from "./holdOrResumeTherapy.validator";
import { CustomCheckBox } from "../../../../../core/checkBox/checkBox.component";
import { HoldOrResumeDate } from "./holdOrResumeDate/holdOrResumeDate.component";
import { ValidationStatus } from "../../../../../core/interfaces/input.interface";
import { ExpressButton } from "../../../../../core/expressButton/expressButton.component";
import { InputWithLabel } from "../../../../../core/inputWithLabel/inputWithLabel.component";
import { CustomDropDown } from "../../../../../core/customDropdown/customDropdown.component";
import { WoundMeasurement } from "../resumeTherapy/woundMeasurement/woundMeasurement.component";

export const HoldOrResumeTherapy = ({
  data,
  holdAndResumeMinMaxDates,
  isHoldTherapy,
  origionalWounds,
  patient,
  setData,
  submitBtnAction,
  submitBtnTitle,
  title,
  woundQuestion,
}: IHoldOrResumeTherapy) => {
  const history = useHistory();
  const [dropdownArray, setDropDownArray] = useState([]);
  const [dropDownTextArray, setDropDownTextArray] = useState([]);
  const sendNoteObj = useContext<SendNoteContextType | null>(SendNoteContext);
  const [
    origionalHoldAndResumeMinMaxDates,
    setOrigionalHoldAndResumeMinMaxDates,
  ] = useState<Array<IHoldAndResumeDate>>([]);

  const [focusClasses, setFocusClasses] = useState({
    comments: "",
  });

  const setClasses = (e: any, classname: string) => {
    setFocusClasses(
      Object.assign({}, focusClasses, { [e.target.name]: classname })
    );
  };

  const fetchDropDownContent = async () => {
    try {
      const ddContent = format("{0}", DD_REASON_FOR_HOLD ?? "");
      const data = await getdropDownContent(ddContent);
      if (data.items.length > 0) {
        const holdReasonObject = data.items.filter(
          (item: { name: string }) => item.name === DD_REASON_FOR_HOLD
        );
        const holdReasonData = holdReasonObject[0].data.sort(
          (a: { order: number }, b: { order: number }) =>
            a.order > b.order ? 1 : -1
        );
        setDropDownArray(holdReasonData);
        setDropDownTextArray(
          holdReasonData.map((x: { text: string }) => x.text)
        );
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handlecheckBoxChange = async (e: any) => {
    let wounds = [...data.wounds];
    let updatedWoundIndex: number | undefined;
    let selectedWoundIndices: number[] = [];
    let newWounds = wounds.map((wound: WoundDetails, index: number) => {
      if (wound.id.toString() === e.target.value) {
        wound.isChecked = e.target.checked;
        updatedWoundIndex = index;
        if (!isHoldTherapy) {
          wound.length = null;
          wound.width = null;
          wound.depth = null;
          wound.isValid = undefined;
        }
      }
      if (wound.isChecked) {
        selectedWoundIndices.push(index);
      }
      return wound;
    });
    let tempData = {
      ...data,
      wounds: [...newWounds],
      isWoundSelected: true,
    };
    let defaultHoldValue = {
      valid: ValidationStatus.UNTOUCHED,
      value: "",
      required: isHoldTherapy ? e.target.checked : false,
    };
    switch (updatedWoundIndex) {
      case 0:
        tempData.holdDate1 = defaultHoldValue;
        tempData.resumeDate1 = {
          valid: ValidationStatus.UNTOUCHED,
          value: "",
          required: isHoldTherapy
            ? false
            : selectedWoundIndices.filter((x) => x === 0).length === 1
            ? true
            : false,
        };

        break;
      case 1:
        tempData.holdDate2 = defaultHoldValue;
        tempData.resumeDate2 = {
          valid: ValidationStatus.UNTOUCHED,
          value: "",
          required: isHoldTherapy
            ? false
            : selectedWoundIndices.filter((x) => x === 1).length === 1
            ? true
            : false,
        };
        break;
      default:
        break;
    }
    if (isHoldTherapy && updatedWoundIndex !== undefined) {
      const resumeMinAndMaxDates: IMinAndMaxDate =
        origionalHoldAndResumeMinMaxDates[updatedWoundIndex]
          .resumeMinAndMaxDates;
      holdAndResumeMinMaxDates[updatedWoundIndex].resumeMinAndMaxDates =
        resumeMinAndMaxDates;
    }
    setData(tempData);
  };

  const validateAndSetReasonForHold = (e: any) => {
    setData((dt: IHoldOrResumeTherapyData) => ({
      ...dt,
      reasonForHold: {
        value: getCodeFromText(dropdownArray, e.target.value),
        valid: ValidationStatus.VALID,
        required: isHoldTherapy ? true : false,
      },
    }));
  };

  const validateAndSetComments = (e: any) => {
    const validator = new HoldOrResumeTherapyValidator();
    const isValid = validator.validate(e.target.value, e.target.name);
    setData((dt: IHoldOrResumeTherapyData) => ({
      ...dt,
      comments: {
        value: e.target.value,
        valid: isValid!.status,
        required: true,
      },
    }));
  };

  const updateWoundMeasurement = async (updatedWound: WoundDetails) => {
    let wounds = [...data.wounds];
    let newWounds = wounds.map((wound: WoundDetails) => {
      if (wound.id === updatedWound.id) {
        wound = updatedWound;
      }
      return wound;
    });
    let selectedWounds = newWounds.filter((x) => x.isChecked);
    const isWoundSelected =
      selectedWounds.length > 0 &&
      selectedWounds.every((x) => x.length && x.width && x.depth);
    setData((dt: IHoldOrResumeTherapyData) => ({
      ...dt,
      wounds: [...newWounds],
      isWoundSelected: isWoundSelected,
    }));
  };

  const submitBtnClickAction = () => {
    const validator = new HoldOrResumeTherapyValidator();
    let isValid = validator.validateAll(data, setData);
    if (isValid) {
      submitBtnAction();
    }
  };

  const redirectToSend3Mnote = () => {
    sendNoteObj?.resetSendNoteData();
    history.push({
      pathname: "/home/sendNote",
      state: {
        selectedPatient: patient,
      },
    });
  };

  useEffect(() => {
    let clonedHoldAndResumeMinMaxDates = JSON.parse(
      JSON.stringify(holdAndResumeMinMaxDates)
    );
    if (clonedHoldAndResumeMinMaxDates.length > 0) {
      setOrigionalHoldAndResumeMinMaxDates(clonedHoldAndResumeMinMaxDates);
    }
    let clonedWounds = JSON.parse(JSON.stringify(origionalWounds));
    if (clonedWounds.length === 1) {
      clonedWounds = clonedWounds.map((wound: WoundDetails) => {
        wound.isChecked = true;
        return wound;
      });
    }
    if (isHoldTherapy) {
      fetchDropDownContent();
      setData((dt: IHoldOrResumeTherapyData) => ({
        ...dt,
        wounds: clonedWounds,
      }));
    } else {
      setData((dt: IHoldOrResumeTherapyData) => ({
        ...dt,
        holdDate1: {
          ...dt.holdDate1,
          required: false,
        },
        resumeDate1: {
          ...dt.resumeDate1,
          required: clonedWounds.length === 1 ? true : false,
        },
        holdDate2: {
          ...dt.holdDate1,
          required: false,
        },
        resumeDate2: {
          ...dt.resumeDate1,
          required: false,
        },
        reasonForHold: {
          ...dt.reasonForHold,
          required: false,
        },
        wounds: clonedWounds,
      }));
    }
  }, []);

  return (
    <>
      <div className="holdOrResumeTherapy" data-testid="holdOrResumeTherapy">
        <div className="holdOrResumeTherapy-header">
          <h2
            className="holdOrResumeTherapy-title"
            data-testid="holdOrResumeTherapy-title"
          >
            {title}
          </h2>
          <div
            className="holdOrResumeTherapy-description"
            data-testid="holdTherapy-test"
          >
            If you have any questions, please{" "}
            <a className="SendNote" onClick={redirectToSend3Mnote}>
              {" "}
              Send 3M a note
            </a>{" "}
            or contact us at{" "}
            <a className="contact-value" href={`tel:${"1-800-275-4524"}`}>
              {"1-800-275-4524"}
            </a>
            .{" "}
          </div>
        </div>
        <div className="holdOrResumeTherapy-wounds-checkbox">
          <Grid className="holdOrResumeTherapy-container" container spacing={2}>
            <Grid className="holdOrResumeTherapy-item" item xs={12}>
              <InputWithLabel
                labelClassName="wound-label-item"
                label={woundQuestion}
                error={!data.isWoundSelected}
                isRequired={true}
                testId="wound-label-item"
              >
                <>
                  {Array.isArray(data.wounds) &&
                    data.wounds.map((wound: WoundDetails, index) => (
                      <>
                        <CustomCheckBox
                          checked={
                            origionalWounds.length === 1
                              ? true
                              : wound.isChecked
                          }
                          handleChange={handlecheckBoxChange}
                          isDisabled={origionalWounds.length === 1}
                          labelClassName={
                            wound.isChecked
                              ? "wound-checkbox-text-active"
                              : "wound-checkbox-text"
                          }
                          labelText={`Wound ${index + 1}: ${wound.location} - ${
                            wound.type
                          }`}
                          name={`${wound.id}-wound-name`}
                          selectClassName="wound-checkbox"
                          selectpropsClassName="wound-checkbox-root"
                          testId={`${wound.id}-wound-name`}
                          value={wound.id}
                        />
                        {wound.isChecked && (
                          <HoldOrResumeDate
                            data={data}
                            holdAndResumeMinMaxDates={holdAndResumeMinMaxDates}
                            index={index}
                            isHoldTherapy={isHoldTherapy}
                            setData={setData}
                          />
                        )}
                        {!isHoldTherapy &&
                          origionalWounds.length > 1 &&
                          wound.isChecked && (
                            <div className="wound-checkbox-measurement">
                              <WoundMeasurement
                                wound={wound}
                                updateWoundMeasurement={(updatedWound) =>
                                  updateWoundMeasurement(updatedWound)
                                }
                              />
                            </div>
                          )}
                      </>
                    ))}
                </>
              </InputWithLabel>
            </Grid>
            {!isHoldTherapy && origionalWounds.length === 1 && (
              <Grid className="holdOrResumeTherapy-item" item xs={12}>
                <WoundMeasurement
                  wound={[...data.wounds][0]}
                  updateWoundMeasurement={(updatedWound) =>
                    updateWoundMeasurement(updatedWound)
                  }
                />
              </Grid>
            )}
          </Grid>
        </div>
        {isHoldTherapy && (
          <div className="holdOrResumeTherapy-resason-for-hold">
            <Grid
              className="holdOrResumeTherapy-container"
              container
              spacing={2}
            >
              <Grid className="holdOrResumeTherapy-item" item xs={12}>
                <InputWithLabel
                  label="Reason for Hold"
                  labelClassName="reason-for-hold"
                  isRequired={true}
                  error={data.reasonForHold?.valid === ValidationStatus.INVALID}
                  testId="reasonforhold-test"
                >
                  <CustomDropDown
                    handleChange={validateAndSetReasonForHold}
                    menuItem={dropDownTextArray}
                    name="reasonForHold"
                    placeHolder="Select Reason"
                    selectpropsClassName={
                      data.reasonForHold?.value !== ""
                        ? "reason-for-hold-select"
                        : "placeHolder"
                    }
                    selectClassName={
                      data.reasonForHold?.value !== ""
                        ? "reason-for-hold-input"
                        : "placeHolder"
                    }
                    testId={"reason-for-hold-value"}
                    value={
                      data.reasonForHold?.value
                        ? getTextFromCode(
                            dropdownArray,
                            data.reasonForHold?.value
                          )
                        : null
                    }
                  />
                </InputWithLabel>
              </Grid>
            </Grid>
          </div>
        )}
        <div className="holdOrResumeTherapy-comments">
          <Grid className="holdOrResumeTherapy-container" container spacing={2}>
            <Grid className="holdOrResumeTherapy-item" item xs={12}>
              <InputWithLabel
                error={data.comments?.valid === ValidationStatus.INVALID}
                isRequired={true}
                label="Comments"
                labelClassName={focusClasses.comments}
                testId="comments-test"
              >
                <TextField
                  error={data.comments?.valid === ValidationStatus.INVALID}
                  FormHelperTextProps={{ classes: { root: "helperText" } }}
                  fullWidth
                  InputProps={{ classes: { root: "textarea-root" } }}
                  multiline
                  name="comments"
                  onBlur={(e) => setClasses(e, "")}
                  onChange={validateAndSetComments}
                  onFocus={(e) => setClasses(e, "Mui-focused")}
                  required={true}
                  rows={4}
                  value={data.comments?.value}
                />
              </InputWithLabel>
            </Grid>
          </Grid>
        </div>
        <ExpressButton
          clickHandler={submitBtnClickAction}
          parentClass="submitButton"
          testId="submitButton"
          variant="contained"
        >
          {submitBtnTitle}
        </ExpressButton>
      </div>
    </>
  );
};
