import { Box, FormControlLabel, Grid, Radio, RadioGroup } from "@mui/material";
import React from "react";
import { InputWithLabel } from "../../../../../../core/inputWithLabel/inputWithLabel.component";
import { ValidationStatus } from "../../../../../../core/interfaces/input.interface";
import { IAddWoundAssessment } from "../addWoundAssessment.interface";
import { AddWoundAssessmentValidator } from "../addWoundAssessment.validator";
import { ReactComponent as SelectedRadioButtonIcon } from "../../../../../../assets/selectedRadioButton.svg";
import { ReactComponent as RadioButtonIcon } from "../../../../../../assets/radioButton.svg";
import "./woundMeasurementEschar.css";
import { WoundAssessmentType } from "../woundAssessmentPageSection.enum";
import ReviewWoundMeasurementEschar from "./reviewWoundMeasurementEschar/reviewWoundMeasurementEschar.component";
import { setActiveValue } from "../../../../../../util/utilityFunctions";

type Props = {
  data: IAddWoundAssessment;
  setData: React.Dispatch<React.SetStateAction<IAddWoundAssessment>>;
  Validator?: AddWoundAssessmentValidator;
  isReviewAssessment?: boolean;
  isWoundAssessmentSummary?: any;
  editButtonClicked?: any;
};

const WoundMeasurementEschar = ({
  data,
  setData,
  Validator = new AddWoundAssessmentValidator(),
  isReviewAssessment = false,
  isWoundAssessmentSummary,
  editButtonClicked,
}: Props) => {
  const [active, setActive] = React.useState<boolean | null>(
    setActiveValue(data?.woundEscharStatus.value)
  );
  const [validator] = React.useState<AddWoundAssessmentValidator>(Validator);

  const validateAndSetData = (e: any) => {
    let isValid = validator.validate(e.target.value, e.target.name);
    if (e.target.name === "woundEscharStatus") {
      if (e.target.value === "yes") {
        setActive(true);
      } else if (e.target.value === "no") {
        setActive(false);
      } else {
        setActive(null);
      }
    }
    setData({
      ...data,
      [e.target.name]: {
        value: e.target.value,
        valid: isValid?.status,
        required: true,
      },
      escharValue:
        data?.assessmentType.value !== WoundAssessmentType.MWP
          ? {
              value: "",
              valid: ValidationStatus.UNTOUCHED,
              required: false,
            }
          : { ...data?.escharValue },
    });
  };

  return (
    <div className="wound-eschar-component">
      {!isReviewAssessment ? (
        <div className="wound-eschar">
          <div className="woundEschar-header" data-testid="woundEschar-header">
            Eschar
          </div>
          <Box className="woundEschar-box-container" sx={{ flexGrow: 1 }}>
            <Grid className="woundEschar-grid-container" container spacing={2}>
              <Grid className="woundEschar-grid-item" item xs={6}>
                <InputWithLabel
                  label="Is eschar tissue present in the wound?"
                  isRequired={data?.woundEscharStatus.required}
                  error={
                    data?.woundEscharStatus.valid === ValidationStatus.INVALID
                  }
                  testId="woundEschar-status"
                >
                  <RadioGroup
                    name="woundEscharStatus"
                    classes={{ root: "radioRoot" }}
                    onChange={validateAndSetData}
                    value={data?.woundEscharStatus.value}
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
                      data-testid="woundEscharStatus-yes"
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
                      data-testid="woundEscharStatus-no"
                      label="No"
                      value="no"
                    />
                  </RadioGroup>
                </InputWithLabel>
              </Grid>
            </Grid>
          </Box>
        </div>
      ) : (
        <ReviewWoundMeasurementEschar
          data={data}
          editButtonClicked={editButtonClicked}
          isWoundAssessmentSummary={isWoundAssessmentSummary}
        />
      )}
    </div>
  );
};
export default WoundMeasurementEschar;
