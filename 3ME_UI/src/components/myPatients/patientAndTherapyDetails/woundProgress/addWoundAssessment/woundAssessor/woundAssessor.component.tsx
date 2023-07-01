import {
  Box,
  FormControlLabel,
  Grid,
  InputBase,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { InputWithLabel } from "../../../../../../core/inputWithLabel/inputWithLabel.component";
import { ValidationStatus } from "../../../../../../core/interfaces/input.interface";
import { getdropDownContent } from "../../../../../../util/dropDownService";
import { DD_LICENSE_CONTENT } from "../../../../../../util/staticText";
import { IAddWoundAssessment } from "../addWoundAssessment.interface";
import { AddWoundAssessmentValidator } from "../addWoundAssessment.validator";
import { ReactComponent as SelectedRadioButtonIcon } from "../../../../../../assets/selectedRadioButton.svg";
import { ReactComponent as RadioButtonIcon } from "../../../../../../assets/radioButton.svg";
import "./woundAssessor.css";
import {
  getCodeFromText,
  setActiveValue,
} from "../../../../../../util/utilityFunctions";
import InputMask from "react-input-mask";
import { updateWoundAssessorStatus } from "../woundAssessment.utils";
import { CustomDropDown } from "../../../../../../core/customDropdown/customDropdown.component";
import ReviewWoundAssessor from "./reviewWoundAssessor/reviewWoundAssessor.component";

type Props = {
  data: IAddWoundAssessment;
  setData: React.Dispatch<React.SetStateAction<IAddWoundAssessment>>;
  Validator?: AddWoundAssessmentValidator;
  isReviewAssessment?: boolean;
  isWoundAssessmentSummary?: any;
  editButtonClicked?: any;
};

const WoundAssessor = ({
  data,
  setData,
  Validator = new AddWoundAssessmentValidator(),
  isReviewAssessment = false,
  isWoundAssessmentSummary,
  editButtonClicked,
}: Props) => {
  const [validator] = React.useState<AddWoundAssessmentValidator>(Validator);
  const [active, setActive] = React.useState<boolean | null>(
    setActiveValue(data?.woundAssessorStatus.value)
  );
  const [woundAssessorLicenseCode, setWoundAssessorLicenseCode] =
    React.useState([]);
  const [woundAssessorLicenseText, setWoundAssessorLicenseText] =
    React.useState([]);
  const [focusClasses, setFocusClasses] = useState({
    woundAssessorPhoneNumber: "",
  });

  const fetchDropdownContents = async () => {
    try {
      const data = await getdropDownContent(DD_LICENSE_CONTENT);
      if (data.items.length > 0) {
        const licenseObject = data.items.filter(
          (item: { name: string }) => item.name === DD_LICENSE_CONTENT
        );
        const licenseData = licenseObject[0].data.sort(
          (a: { order: number }, b: { order: number }) =>
            a.order > b.order ? 1 : -1
        );
        setWoundAssessorLicenseCode(licenseData);
        setWoundAssessorLicenseText(
          licenseData.map((x: { text: string }) => x.text)
        );
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchDropdownContents();
  }, []);

  useEffect(() => {
    if (data.woundAssessorStatus.value === "") {
      setActive(null);
    }
  }, [data.woundAssessorStatus.value]);

  const validateAndSetData = (e: any) => {
    let isValid = validator.validate(e.target.value, e.target.name);
    if (e.target.name === "woundAssessorStatus") {
      if (e.target.value === "Yes") {
        updateWoundAssessorStatus(data, true, setData, e.target.value);
        setActive(true);
      } else if (e.target.value === "No") {
        updateWoundAssessorStatus(data, false, setData, e.target.value);
        setActive(false);
      } else {
        setActive(null);
      }
    } else if (e.target.name === "woundAssessorLicenseType") {
      setData({
        ...data,
        [e.target.name]: {
          value: getCodeFromText(woundAssessorLicenseCode, e.target.value),
          valid: isValid?.status,
          required: true,
        },
      });
    } else {
      setData({
        ...data,
        [e.target.name]: {
          value: e.target.value,
          valid: isValid?.status,
          required: true,
        },
      });
    }
  };

  const validateAndSetPhoneNumberData = (e: any) => {
    let isValid = validator.validate(e.target.value, e.target.name);
    if (
      e.target.name === "woundAssessorPhoneNumber" &&
      data.woundAssessorPhoneNumber.value === "(___) ___-____" &&
      (e.target.value === "(___) ___-____" || e.target.value === "")
    ) {
      return;
    }
    setData({
      ...data,
      [e.target.name]: { value: e.target.value, valid: isValid?.status },
    });
  };

  const setClasses = (e: any, classname: string) => {
    setFocusClasses(
      Object.assign({}, focusClasses, { [e.target.name]: classname })
    );
  };

  return (
    <div className="wound-assessor-component">
      {!isReviewAssessment ? (
        <div className="woundAssessor">
          <div className="woundAssessor-header" data-testid="Assessor-header">
            Wound Assessor
          </div>
          <Box className="woundAsseor-box-container" sx={{ flexGrow: 1 }}>
            <Grid
              className="woundAssessor-grid-container"
              container
              spacing={2}
            >
              <Grid className="woundAssessor-grid-item" item xs={6}>
                <InputWithLabel
                  label="Did someone other than yourself perform this assessment?"
                  isRequired={data?.woundAssessorStatus.required}
                  error={
                    data.woundAssessorStatus.valid === ValidationStatus.INVALID
                  }
                  testId="woundAssessorStatustitleId"
                >
                  <RadioGroup
                    name="woundAssessorStatus"
                    classes={{ root: "radioRoot" }}
                    onChange={validateAndSetData}
                    value={data?.woundAssessorStatus.value}
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
                      label="Yes"
                      value="Yes"
                      data-testid="woundAssessorStatus-yes"
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
                      data-testid="woundAssessorStatus-no"
                      label="No"
                      value="No"
                    />
                  </RadioGroup>
                </InputWithLabel>
              </Grid>
            </Grid>
          </Box>
          {data.woundAssessorStatus.value === "Yes" && (
            <Box className="woundAsseor-box-container" sx={{ flexGrow: 1 }}>
              <Grid
                className="woundAssessor-grid-container"
                container
                spacing={2}
              >
                <Grid className="woundAssessor-grid-item" item xs={6}>
                  <InputWithLabel
                    label="Name of Wound Assessor"
                    isRequired={true}
                    error={
                      data?.woundAssessorName.valid === ValidationStatus.INVALID
                    }
                    testId="woundAssessor-name-label"
                  >
                    <InputBase
                      className="woundAssessor-name-input"
                      inputProps={{
                        "data-testid": "woundAssessor-name-value",
                      }}
                      name="woundAssessorName"
                      value={data?.woundAssessorName.value}
                      onChange={validateAndSetData}
                    />
                  </InputWithLabel>
                </Grid>
                <Grid item xs={6} className="woundAssessor-grid-item">
                  <InputWithLabel
                    isRequired={data.woundAssessorLicenseType.required}
                    label="License Type / Job Role"
                    sx={{ height: "40px" }}
                    error={
                      data.woundAssessorLicenseType.valid ===
                      ValidationStatus.INVALID
                    }
                  >
                    <CustomDropDown
                      name="woundAssessorLicenseType"
                      value={data.woundAssessorLicenseType.value}
                      handleChange={validateAndSetData}
                      selectClassName="licenseType-info-input licenseType-info"
                      selectpropsClassName={
                        data?.woundAssessorLicenseType.value
                          ? "licenseType-info-select"
                          : "placeholder"
                      }
                      testId="license-department-type"
                      menuItem={[]}
                      dropDownMenuObj={woundAssessorLicenseCode}
                      hasBothCodeValue={true}
                      placeHolder="Select License Type / Job Role"
                    />
                  </InputWithLabel>
                </Grid>
                <Grid className="woundAssessor-grid-item" item xs={6}>
                  <InputWithLabel
                    label="Facility Name"
                    isRequired={true}
                    error={
                      data?.woundAssessorFacilityName.valid ===
                      ValidationStatus.INVALID
                    }
                    testId="woundAssessor-faility-name-label"
                  >
                    <InputBase
                      className="woundAssessor-name-input"
                      inputProps={{
                        "data-testid": "woundAssessor-name-value",
                      }}
                      name="woundAssessorFacilityName"
                      onChange={validateAndSetData}
                      value={data?.woundAssessorFacilityName.value}
                    />
                  </InputWithLabel>
                </Grid>
                <Grid className="woundAssessor-grid-item" item xs={6}>
                  <InputWithLabel
                    label="Phone Number"
                    isRequired={true}
                    error={
                      data?.woundAssessorPhoneNumber.valid ===
                      ValidationStatus.INVALID
                    }
                    labelClassName={focusClasses.woundAssessorPhoneNumber}
                    testId="woundAssessor-phone-number-label"
                  >
                    <InputMask
                      placeholder="(___) ___-____"
                      className="phone"
                      name="woundAssessorPhoneNumber"
                      mask="(999) 999-9999"
                      value={data?.woundAssessorPhoneNumber.value}
                      onChange={validateAndSetPhoneNumberData}
                      onBlur={(e) => setClasses(e, "")}
                      onFocus={(e) => setClasses(e, "Mui-focused")}
                      data-testid="woundAssessorPhoneNumberTest"
                    />
                  </InputWithLabel>
                </Grid>
              </Grid>
            </Box>
          )}
        </div>
      ) : (
        <ReviewWoundAssessor
          data={data}
          editButtonClicked={editButtonClicked}
          isWoundAssessmentSummary={isWoundAssessmentSummary}
        />
      )}
    </div>
  );
};

export default WoundAssessor;
