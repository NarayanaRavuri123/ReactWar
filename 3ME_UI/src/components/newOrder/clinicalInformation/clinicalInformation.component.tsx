import moment from "moment";
import {
  FormControlLabel,
  Grid,
  InputBase,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import {
  DD_WOUND_DIRECTION,
  DD_WOUND_LOCATION,
  DD_WOUND_ORIENTATION,
} from "../../../util/staticText";
import { Box } from "@mui/system";
import "./clinicalInformation.css";
import {
  NewOrderContextType,
  NewOrderContext,
} from "../../../context/NewOrderContext";
import { format } from "react-string-format";
import { useEffect, useState, useContext } from "react";
import { NewOrderValidator } from "../newOrder.validator";
import { Question, QuestionTypes } from "./clinicalInfo.interface";
import { getdropDownContent } from "../../../util/dropDownService";
import { IClinicalInformation } from "./clinicalInformation.interface";
import { TextQuestion } from "./questionComponents/textQQuestion.component";
import { DateQuestion } from "./questionComponents/dateQuestion.component";
import { ValidationStatus } from "../../../core/interfaces/input.interface";
import { RadioQuestion } from "./questionComponents/radioQuestion.components";
import { ReactComponent as RadioButtonIcon } from "../../../assets/radioButton.svg";
import { InputWithLabel } from "../../../core/inputWithLabel/inputWithLabel.component";
import { CustomDropDown } from "../../../core/customDropdown/customDropdown.component";
import { ReactComponent as SelectedRadioButtonIcon } from "../../../assets/selectedRadioButton.svg";
import { ClinicalInformationReviewOrder } from "./reviewOrder/clinicalInformationReviewOrder.component";
import {
  convertStringToDate,
  getCodeFromText,
  getTextFromCode,
} from "../../../util/utilityFunctions";

export const ClinicalInformation = ({
  editButtonClicked,
  isOrderSummary = false,
  isReviewOrder = false,
  isSecondaryWoundInfo = false,
  newValidator = new NewOrderValidator(),
  woundInfoData,
  setWoundInfoData,
  newOrderObj,
}: IClinicalInformation) => {
  const [validator] = useState<NewOrderValidator>(newValidator!);
  const NewOrderObj = useContext<NewOrderContextType | null>(NewOrderContext);
  const [woundLocations, setWoundLocations] = useState([]);
  const [woundLocationsText, setWoundLocationsText] = useState([]);
  const [woundDirections, setWoundDirections] = useState([]);
  const [woundDirectionsText, setWoundDirectionsText] = useState([]);
  const [woundOrientations, setWoundOreientations] = useState([]);
  const [woundOrientationsText, setWoundOreientationsText] = useState([]);
  const [active, setActive] = useState<boolean | null>(null);
  const [pwtMenuItems, setPWTMenuItems] = useState<string[]>();

  const [focusClasses, setFocusClasses] = useState({
    shortNarrativeOfPossibleConsequences: "",
  });
  const fetchDropDownContent = async () => {
    try {
      const ddContent = format(
        "{0},{1},{2}",
        DD_WOUND_DIRECTION,
        DD_WOUND_LOCATION,
        DD_WOUND_ORIENTATION
      );
      const data = await getdropDownContent(ddContent);
      if (data.items.length > 0) {
        const woundDirectionObject = data.items.filter(
          (item: { name: string }) => item.name === DD_WOUND_DIRECTION
        );
        const woundDirectionData = woundDirectionObject[0].data.sort(
          (a: { order: number }, b: { order: number }) =>
            a.order > b.order ? 1 : -1
        );
        setWoundDirections(woundDirectionData);
        setWoundDirectionsText(
          woundDirectionData.map((x: { text: string }) => x.text)
        );
        const woundLocationObject = data.items.filter(
          (item: { name: string }) => item.name === DD_WOUND_LOCATION
        );
        const woundLocationeData = woundLocationObject[0].data.sort(
          (a: { order: number }, b: { order: number }) =>
            a.order > b.order ? 1 : -1
        );
        setWoundLocations(woundLocationeData);
        setWoundLocationsText(
          woundLocationeData.map((x: { text: string }) => x.text)
        );
        const woundOrientationObject = data.items.filter(
          (item: { name: string }) => item.name === DD_WOUND_ORIENTATION
        );
        const woundOrientationData = woundOrientationObject[0].data.sort(
          (a: { order: number }, b: { order: number }) =>
            a.order > b.order ? 1 : -1
        );
        setWoundOreientations(woundOrientationData);
        setWoundOreientationsText(
          woundOrientationData.map((x: { text: string }) => x.text)
        );
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const setClasses = (e: any, classname: string) => {
    setFocusClasses(
      Object.assign({}, focusClasses, { [e.target.name]: classname })
    );
  };

  const validateAndSetData = (e: any) => {
    NewOrderObj?.setIsHandleChangeTriggered(true);
    let value = e.target.value;
    let required = e.target.required;
    let isValid = validator.validate(e.target.value, e.target.name);
    if (e.target.name === "woundAge" && value.length > 0) {
      if (
        Array.from(value)[0] === "0" ||
        value.length === 3 ||
        isValid!.status === ValidationStatus.INVALID
      ) {
        return;
      }
    } else if (e.target.name === "woundLocation") {
      value = getCodeFromText(woundLocations, e.target.value);
      required = true;
    } else if (e.target.name === "woundDirection") {
      value = getCodeFromText(woundDirections, e.target.value);
      required = true;
    } else if (e.target.name === "woundOrientation") {
      value = getCodeFromText(woundOrientations, e.target.value);
      required = true;
    }
    if (e.target.name === "isTissuePresent") {
      if (e.target.value === "Yes") {
        setActive(true);
      } else if (e.target.value === "No") {
        setActive(false);
      } else {
        setActive(null);
      }
      required = true;
    }
    if (e.target.name === "woundType") {
      updateAdditionalQuestions(e.target.value);
    }
    if (value !== e.target.value) {
      isValid = validator.validate(value, e.target.name);
    }
    setWoundInfoData(
      Object.assign({}, woundInfoData, {
        [e.target.name]: {
          value: value,
          valid: isValid?.status,
          required: required,
        },
      })
    );
  };

  const validateAndSetDate = (
    date: string | null | undefined,
    text: string
  ) => {
    const formatteddate = convertStringToDate(date);
    NewOrderObj?.setIsHandleChangeTriggered(true);
    const questions: Question[] | undefined =
      getQuestionsAdditionalQuestions().map((x) => {
        if (x.text === text) {
          const valStatus = validator.validateAdditionalQuestions(
            { ...x, value: formatteddate! },
            x.type
          );
          return { ...x, value: formatteddate, valid: valStatus } as Question;
        } else {
          return x as Question;
        }
      });
    if (questions) {
      addAdditionalQuestions(questions);
    }
  };

  const validateAndSetCustomControlData = (e: any, text: string) => {
    NewOrderObj?.setIsHandleChangeTriggered(true);
    const { value } = e.target;
    const questions: Question[] | undefined =
      getQuestionsAdditionalQuestions().map((x) => {
        if (x.text === text) {
          const valStatus = validator.validateAdditionalQuestions(
            { ...x, value: value },
            x.type
          );
          return {
            ...x,
            value: value,
            valid: valStatus,
          } as Question;
        } else {
          return x as Question;
        }
      });
    if (questions) {
      addAdditionalQuestions(questions);
    }
  };

  const renderComponent = (question: Question, index: number) => {
    let jsx;
    switch (question?.type) {
      case QuestionTypes.RADIO:
        jsx = (
          <RadioQuestion
            key={`wtQuestion${index.toString()}`}
            name={`wtQuestion${index.toString()}`}
            error={question.valid === ValidationStatus.INVALID}
            label={question.text}
            onChange={(e: any) =>
              validateAndSetCustomControlData(e, question.text)
            }
            required={Boolean(question.required)}
            value={question.value}
          />
        );
        break;
      case QuestionTypes.TEXT:
        jsx = (
          <TextQuestion
            key={`wtQuestion${index.toString()}`}
            name={`wtQuestion${index.toString()}`}
            error={question.valid === ValidationStatus.INVALID}
            label={question.text}
            onChange={(e: any) =>
              validateAndSetCustomControlData(e, question.text)
            }
            required={Boolean(question.required)}
            value={question.value}
          />
        );
        break;
      case QuestionTypes.DATE:
        jsx = (
          <DateQuestion
            key={`wtQuestion${index.toString()}`}
            name={`wtQuestion${index.toString()}`}
            error={question.valid === ValidationStatus.INVALID}
            label={question.text}
            onChange={(date) => validateAndSetDate(date, question.text)}
            required={Boolean(question.required)}
            value={question.value}
          />
        );
        break;
    }
    return jsx;
  };

  const addAdditionalQuestions = (questions: Question[]) => {
    if (isSecondaryWoundInfo) {
      NewOrderObj?.setSecondaryAdditionalQuestions((data: any) => ({
        ...data,
        additionalQuestion: questions!,
      }));
    } else {
      NewOrderObj?.setPrimaryAdditionalQuestions((data: any) => ({
        ...data,
        additionalQuestion: questions!,
      }));
    }
  };

  const updateAdditionalQuestions = (pwtValue: string) => {
    const additionalQuestions = NewOrderObj?.woundQuestionaries?.get(pwtValue);
    if (isSecondaryWoundInfo) {
      NewOrderObj?.setSecondaryAdditionalQuestions(additionalQuestions);
    } else {
      NewOrderObj?.setPrimaryAdditionalQuestions(additionalQuestions);
    }
  };

  const showAdditionalQuestions = (): boolean => {
    const questions = isSecondaryWoundInfo
      ? NewOrderObj?.secondaryAdditionalQuestions
      : NewOrderObj?.primaryAdditionalQuestions;
    if (questions) {
      return true;
    } else {
      return false;
    }
  };

  const getQuestionsCategoty = (): string => {
    return isSecondaryWoundInfo
      ? NewOrderObj?.secondaryAdditionalQuestions?.category ?? ""
      : NewOrderObj?.primaryAdditionalQuestions?.category ?? "";
  };

  const getQuestionsAdditionalQuestions = (): Question[] => {
    return isSecondaryWoundInfo
      ? NewOrderObj?.secondaryAdditionalQuestions?.additionalQuestion ?? []
      : NewOrderObj?.primaryAdditionalQuestions?.additionalQuestion ?? [];
  };

  useEffect(() => {
    fetchDropDownContent();
  }, []);

  useEffect(() => {
    if (
      woundInfoData !== null &&
      (woundInfoData!.isTissuePresent.value === "Yes" ||
        woundInfoData!.isTissuePresent.value === "No")
    ) {
      setActive(woundInfoData!.isTissuePresent.value === "Yes" ? true : false);
    }
  }, []);

  useEffect(() => {
    const keys = NewOrderObj?.woundQuestionaries?.keys();
    if (keys) {
      const menuItems: any = Array.from(keys).sort((a, b) => (a > b ? 1 : -1));
      setPWTMenuItems(menuItems);
    }
  }, []);

  return (
    <div
      className={
        isSecondaryWoundInfo
          ? "clinical-information-main-container-sec"
          : "clinical-information-main-container"
      }
    >
      {!isReviewOrder && (
        <div
          className="clinical-information"
          data-testid="clinical-information"
        >
          <h2
            className="clinical-information-title"
            data-testid="clinical-information-title"
          >
            {isSecondaryWoundInfo ? "Secondary Wound" : "Clinical Information"}
          </h2>
          <Box
            className="clinical-information-box-container"
            sx={{ flexGrow: 1 }}
          >
            <Grid
              className="clinical-information-grid-container"
              container
              spacing={2}
            >
              {!isSecondaryWoundInfo && (
                <Grid className="clinical-information-grid-item" item xs={12}>
                  <InputWithLabel
                    isRequired={
                      woundInfoData?.shortNarrativeOfPossibleConsequences
                        .required
                    }
                    label="Please provide a short narrative of possible consequences if V.A.C.® Therapy is not used. (Please include/attach any clinical data such as H&P)"
                    error={
                      woundInfoData?.shortNarrativeOfPossibleConsequences
                        .valid === ValidationStatus.INVALID
                    }
                    labelClassName={"shortNarrativeOfPossibleConsequences"}
                    testId="shortNarrativeOfPossibleConsequences-lable"
                  >
                    <div className="textView">
                      <TextField
                        data-testid="shortNarrativeOfPossibleConsequences-textField"
                        error={
                          woundInfoData?.shortNarrativeOfPossibleConsequences
                            .valid === ValidationStatus.INVALID
                        }
                        FormHelperTextProps={{
                          classes: { root: "helperText" },
                        }}
                        fullWidth
                        InputProps={{ classes: { root: "textarea-root" } }}
                        multiline
                        name="shortNarrativeOfPossibleConsequences"
                        rows={4}
                        onChange={validateAndSetData}
                        onFocus={(e) => setClasses(e, "Mui-focused")}
                        onBlur={(e) => setClasses(e, "")}
                        required={
                          woundInfoData?.shortNarrativeOfPossibleConsequences
                            .required
                        }
                        value={
                          woundInfoData?.shortNarrativeOfPossibleConsequences
                            .value
                        }
                        inputProps={{
                          maxLength: 255,
                        }}
                      />
                    </div>
                  </InputWithLabel>
                </Grid>
              )}
              <Grid className="clinical-information-grid-item" item>
                <InputWithLabel
                  label={
                    isSecondaryWoundInfo
                      ? "Secondary Wound Type"
                      : "Primary Wound Type"
                  }
                  isRequired={true}
                  error={
                    woundInfoData.woundType.valid === ValidationStatus.INVALID
                  }
                  testId="wound-type"
                >
                  <CustomDropDown
                    handleChange={validateAndSetData}
                    menuItem={pwtMenuItems!}
                    name="woundType"
                    placeHolder={
                      isSecondaryWoundInfo
                        ? "Patient’s Secondary Wound Type"
                        : "Patient’s Primary Wound Type"
                    }
                    selectpropsClassName={
                      woundInfoData.woundType.value
                        ? "primary-select"
                        : "primary-type-placeholder"
                    }
                    selectClassName={
                      woundInfoData.woundType.value
                        ? "primary-type-input"
                        : "primary-type-placeholder"
                    }
                    testId="wound-type-select"
                    value={woundInfoData?.woundType.value}
                  />
                </InputWithLabel>
              </Grid>
              <Grid className="clinical-information-grid-item" item>
                {showAdditionalQuestions() && (
                  <div className="bordered-div">
                    <div>
                      <div className="wound-category">Wound Category</div>
                      <div className="category">{getQuestionsCategoty()}</div>
                    </div>
                    {getQuestionsAdditionalQuestions().map((x, ix) =>
                      renderComponent(x, ix)
                    )}
                  </div>
                )}
              </Grid>
              <Grid className="clinical-information-grid-item" item xs={2}>
                <InputWithLabel
                  label="Wound Age"
                  isRequired={true}
                  error={
                    woundInfoData?.woundAge.valid === ValidationStatus.INVALID
                  }
                  sx={{
                    marginTop: showAdditionalQuestions() ? "0px" : "-16px",
                  }}
                  testId="clinical-information-woundAge"
                >
                  <div className="clinical-information-woud-age-div">
                    <InputBase
                      className="clinical-information-input-wound-age"
                      inputProps={{
                        "data-testid": "clinical-information-woundAge-value",
                      }}
                      name="woundAge"
                      placeholder="0"
                      onChange={validateAndSetData}
                      value={woundInfoData.woundAge.value}
                    />
                    <h4 className="months" data-testid="months">
                      Months
                    </h4>
                  </div>
                </InputWithLabel>
              </Grid>
              <Grid
                className="clinical-information-grid-item"
                item
                xs={10}
              ></Grid>
              <Grid className="clinical-information-grid-item" item xs={12}>
                <InputWithLabel
                  label="Wound Location"
                  isRequired={woundInfoData.woundLocation.required}
                  error={
                    woundInfoData?.woundLocation.valid ===
                    ValidationStatus.INVALID
                  }
                  sx={{ marginTop: "-8px" }}
                  testId="clinical-information-wound-location"
                >
                  <CustomDropDown
                    handleChange={validateAndSetData}
                    menuItem={woundLocationsText}
                    name="woundLocation"
                    placeHolder="Wound Location"
                    selectpropsClassName={
                      woundInfoData.woundLocation.value
                        ? "clinical-information-select"
                        : "placeHolder"
                    }
                    selectClassName={
                      woundInfoData.woundLocation.value
                        ? "clinical-information-input"
                        : "placeHolder"
                    }
                    testId="clinical-information-wound-location-value"
                    value={
                      woundInfoData.woundLocation.value
                        ? getTextFromCode(
                            woundLocations,
                            woundInfoData.woundLocation.value
                          )
                        : null
                    }
                  />
                </InputWithLabel>
              </Grid>
              <Grid className="clinical-information-grid-item" item xs={6}>
                <InputWithLabel
                  label="Wound Direction"
                  isRequired={woundInfoData?.woundDirection.required}
                  error={
                    woundInfoData?.woundDirection.valid ===
                    ValidationStatus.INVALID
                  }
                  testId="clinical-information-wound-direction"
                >
                  <CustomDropDown
                    handleChange={validateAndSetData}
                    menuItem={woundDirectionsText}
                    name="woundDirection"
                    placeHolder="Wound Direction"
                    selectpropsClassName={
                      woundInfoData.woundDirection.value
                        ? "clinical-information-select"
                        : "placeHolder"
                    }
                    selectClassName={
                      woundInfoData.woundDirection.value
                        ? "clinical-information-input"
                        : "placeHolder"
                    }
                    testId="clinical-information-wound-direction-value"
                    value={
                      woundInfoData.woundDirection.value
                        ? getTextFromCode(
                            woundDirections,
                            woundInfoData.woundDirection.value
                          )
                        : null
                    }
                  />
                </InputWithLabel>
              </Grid>
              <Grid className="clinical-information-grid-item" item xs={6}>
                <InputWithLabel
                  label="Wound Orientation"
                  isRequired={woundInfoData?.woundOrientation.required}
                  error={
                    woundInfoData?.woundOrientation.valid ===
                    ValidationStatus.INVALID
                  }
                  testId="clinical-information-wound-orientation"
                >
                  <CustomDropDown
                    handleChange={validateAndSetData}
                    menuItem={woundOrientationsText}
                    name="woundOrientation"
                    placeHolder="Wound Orientation"
                    selectpropsClassName={
                      woundInfoData.woundOrientation.value
                        ? "clinical-information-select"
                        : "placeHolder"
                    }
                    selectClassName={
                      woundInfoData.woundLocation.value
                        ? "clinical-information-input"
                        : "placeHolder"
                    }
                    testId="clinical-information-wound-orientation-value"
                    value={
                      woundInfoData.woundOrientation.value
                        ? getTextFromCode(
                            woundOrientations,
                            woundInfoData.woundOrientation.value
                          )
                        : null
                    }
                  />
                </InputWithLabel>
              </Grid>
              <Grid className="clinical-information-grid-item" item xs={6}>
                <InputWithLabel
                  label="Is there eschar tissue present in the wound?"
                  isRequired={woundInfoData?.isTissuePresent.required}
                  error={
                    woundInfoData?.isTissuePresent.valid ===
                    ValidationStatus.INVALID
                  }
                  testId="clinical-information-isTissuePresent"
                >
                  <RadioGroup
                    name="isTissuePresent"
                    classes={{ root: "radioRoot" }}
                    onChange={validateAndSetData}
                    value={woundInfoData.isTissuePresent.value}
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
                      data-testid="clinical-information-isTissuePresent-Yes"
                      label="Yes"
                      value="Yes"
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
                      data-testid="clinical-information-isTissuePresent-No"
                      label="No"
                      value="No"
                    />
                  </RadioGroup>
                </InputWithLabel>
              </Grid>
            </Grid>
          </Box>
        </div>
      )}
      {isReviewOrder && (
        <ClinicalInformationReviewOrder
          editButtonClicked={editButtonClicked}
          isOrderSummary={isOrderSummary}
          isSecondaryWoundInfo={isSecondaryWoundInfo}
          woundInfoData={woundInfoData}
          woundLocations={woundLocations}
          woundDirections={woundDirections}
          woundOrientations={woundOrientations}
          newOrderObj={newOrderObj}
        />
      )}
    </div>
  );
};
