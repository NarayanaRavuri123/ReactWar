import React, { useEffect } from "react";
import { Box, FormControlLabel, Grid, Radio, RadioGroup } from "@mui/material";
import "./woundAssessmentInfection.css";
import { IAddWoundAssessment } from "../addWoundAssessment.interface";
import { AddWoundAssessmentValidator } from "../addWoundAssessment.validator";
import { InputWithLabel } from "../../../../../../core/inputWithLabel/inputWithLabel.component";
import { ValidationStatus } from "../../../../../../core/interfaces/input.interface";
import { ReactComponent as SelectedRadioButtonIcon } from "../../../../../../assets/selectedRadioButton.svg";
import { ReactComponent as RadioButtonIcon } from "../../../../../../assets/radioButton.svg";
import {
  woundAssessInfectionNoReset,
  woundAssessInfectionYesReset,
} from "../woundAssessment.utils";
import InfectionTypes from "./InfectionTypes/InfectionTypes.component";
import TreatmentRegimen from "./treatmentRegimen/treatmentRegimen.component";
import ReviewWoundAssessmentInfection from "./reviewWoundAssessmentInfection/reviewWoundAssessmentInfection.component";
import { setActiveValue } from "../../../../../../util/utilityFunctions";

type Props = {
  data: IAddWoundAssessment;
  setData: React.Dispatch<React.SetStateAction<IAddWoundAssessment>>;
  Validator?: AddWoundAssessmentValidator;
  isReviewAssessment?: boolean;
  isWoundAssessmentSummary?: any;
  editButtonClicked?: any;
};

const WoundAssessmentInfection = ({
  data,
  setData,
  Validator = new AddWoundAssessmentValidator(),
  isReviewAssessment = false,
  isWoundAssessmentSummary,
  editButtonClicked,
}: Props) => {
  const [active, setActive] = React.useState<boolean | null>(
    setActiveValue(data?.woundInfectionInLast30Days.value)
  );

  const validateAndSetData = (e: any) => {
    if (e.target.name === "woundInfectionInLast30Days") {
      if (e.target.value === "yes") {
        woundAssessInfectionYesReset(data, setData);
        setActive(true);
      } else if (e.target.value === "no") {
        setActive(false);
        woundAssessInfectionNoReset(data, setData);
      } else {
        setActive(null);
      }
    }
  };

  useEffect(() => {
    if (data.woundInfectionInLast30Days.value === "") {
      setActive(null);
    }
  }, [data.woundInfectionInLast30Days.value]);

  return (
    <div className="woundAssess-infection-component">
      {!isReviewAssessment ? (
        <div className="woundAssess-infection">
          <div
            className="woundAssess-infection-header"
            data-testid="woundAssess-infection-header"
          >
            Infection
          </div>
          <Box
            className="woundAssess-infection-box-container"
            sx={{ flexGrow: 1 }}
          >
            <Grid
              className="woundAssess-infection-grid-container"
              container
              spacing={2}
            >
              <Grid className="woundAssess-infection-grid-item" item xs={6}>
                <InputWithLabel
                  label="Has there been infection present in the last 30 days?"
                  isRequired={data?.woundInfectionInLast30Days.required}
                  error={
                    data?.woundInfectionInLast30Days.valid ===
                    ValidationStatus.INVALID
                  }
                  testId="woundAssess-infection-desp"
                >
                  <RadioGroup
                    name="woundInfectionInLast30Days"
                    classes={{ root: "radioRoot" }}
                    onChange={validateAndSetData}
                    value={data?.woundInfectionInLast30Days.value}
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
                      data-testid="woundAssess-infection-yes"
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
                      data-testid="woundAssess-infection-no"
                      label="No"
                      value="no"
                    />
                  </RadioGroup>
                </InputWithLabel>
              </Grid>
            </Grid>
          </Box>
          {data?.woundInfectionInLast30Days.value === "yes" && (
            <>
              <InfectionTypes data={data} setData={setData} />
              <TreatmentRegimen data={data} setData={setData} />
            </>
          )}
        </div>
      ) : (
        <ReviewWoundAssessmentInfection
          data={data}
          editButtonClicked={editButtonClicked}
          isWoundAssessmentSummary={isWoundAssessmentSummary}
        />
      )}
    </div>
  );
};

export default WoundAssessmentInfection;
