import React, { useContext } from "react";
import { Box, FormControlLabel, Grid, Radio, RadioGroup } from "@mui/material";
import { InputWithLabel } from "../../../core/inputWithLabel/inputWithLabel.component";
import { ValidationStatus } from "../../../core/interfaces/input.interface";
import { NewOrderValidator } from "../newOrder.validator";
import { debridementProps } from "./debridement.interfaces";
import "./debridement.css";
import { ReactComponent as RadioButtonIcon } from "../../../assets/radioButton.svg";
import { ReactComponent as SelectedRadioButtonIcon } from "../../../assets/selectedRadioButton.svg";
import DebridementDetails from "./debridementDetails/debridementDetails.component";
import { DebridementReviewOrder } from "./reviewOrder/debridementReviewOrder.component";
import {
  NewOrderContext,
  NewOrderContextType,
} from "../../../context/NewOrderContext";

const Debridement = ({
  editButtonClicked,
  isReviewOrder = false,
  isOrderSummary = false,
  isSecondaryWoundInfo,
  setWoundInfoData,
  woundInfoData,
  Validator = new NewOrderValidator(),
}: debridementProps) => {
  const [validator] = React.useState<NewOrderValidator>(Validator!);
  const NewOrderObj = useContext<NewOrderContextType | null>(NewOrderContext);
  const validateAndSetData = (e: any) => {
    NewOrderObj?.setIsHandleChangeTriggered(true);
    let { value, name, required } = e.target;
    let isValid;
    isValid = validator.validate(e.target.value, e.target.name);
    if (name === "debridementAttempted" && value === "Yes") {
      setDefaultValue(true);
    } else if (name === "debridementAttempted" && value === "No") {
      setDefaultValue(false);
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

  const setDefaultValue = (requiredStatus: boolean) => {
    woundInfoData.debridementType = {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: requiredStatus,
    };
    woundInfoData.debridementDate = {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: requiredStatus,
    };
    setWoundInfoData(Object.assign({}, woundInfoData));
  };

  return (
    <div
      className={
        isSecondaryWoundInfo
          ? "debridement-main-container-sec"
          : "debridement-main-container"
      }
    >
      {!isReviewOrder && (
        <div className="debridement-cause" data-testid="debridement-cause">
          <h2
            className="debridement-cause-title"
            data-testid="debridement-cause-title"
          >
            Debridement
          </h2>
          <div className="debridement-Form">
            <Box
              className="debridement-cause-box-container"
              sx={{ flexGrow: 1 }}
            >
              <Grid
                className="debridement-cause-grid-container"
                container
                spacing={2}
              >
                <Grid className="debridement-cause-grid-item" item xs={6}>
                  <InputWithLabel
                    label="Has debridement been attempted in the last 10 days"
                    isRequired={woundInfoData?.debridementAttempted.required}
                    error={
                      woundInfoData?.debridementAttempted.valid ===
                      ValidationStatus.INVALID
                    }
                    testId="debridement-desp"
                  >
                    <RadioGroup
                      name="debridementAttempted"
                      classes={{ root: "radioRoot" }}
                      onChange={validateAndSetData}
                      value={woundInfoData?.debridementAttempted.value}
                    >
                      <FormControlLabel
                        classes={{
                          root:
                            woundInfoData.debridementAttempted.value === "Yes"
                              ? "optionRoot-active"
                              : "optionRoot",
                        }}
                        componentsProps={{
                          typography: {
                            classes: {
                              root:
                                woundInfoData.debridementAttempted.value ===
                                "Yes"
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
                        data-testid="debridement-attempt-Yes"
                        label="Yes"
                        value="Yes"
                      />
                      <FormControlLabel
                        classes={{
                          root:
                            woundInfoData.debridementAttempted.value === "No"
                              ? "optionRoot-active"
                              : "optionRoot",
                        }}
                        componentsProps={{
                          typography: {
                            classes: {
                              root:
                                woundInfoData.debridementAttempted.value ===
                                "No"
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
                        data-testid="debridement-attempt-No"
                        label="No"
                        value="No"
                      />
                    </RadioGroup>
                  </InputWithLabel>
                </Grid>
              </Grid>
            </Box>
            <DebridementDetails
              woundInfoData={woundInfoData}
              setWoundInfoData={setWoundInfoData}
              Validator={validator}
            />
          </div>
          <div className="debridement-Form2">
            <Box
              className="debridement-cause-box-container"
              sx={{ flexGrow: 1 }}
            >
              <Grid
                className="debridement-cause-grid-container"
                container
                spacing={2}
              >
                <Grid className="debridement-cause-grid-item" item xs={6}>
                  <InputWithLabel
                    label="Are serial debridements required?"
                    isRequired={true}
                    error={
                      woundInfoData?.serialDebridementRequired.valid ===
                      ValidationStatus.INVALID
                    }
                    testId="debridement-required"
                  >
                    <RadioGroup
                      name="serialDebridementRequired"
                      classes={{ root: "radioRoot" }}
                      onChange={validateAndSetData}
                      value={woundInfoData?.serialDebridementRequired.value}
                    >
                      <FormControlLabel
                        classes={{
                          root:
                            woundInfoData.serialDebridementRequired.value ===
                            "Yes"
                              ? "optionRoot-active"
                              : "optionRoot",
                        }}
                        componentsProps={{
                          typography: {
                            classes: {
                              root:
                                woundInfoData.serialDebridementRequired
                                  .value === "Yes"
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
                        data-testid="debridement-cause-is-wound-from-accident-Yes"
                        label="Yes"
                        value="Yes"
                      />
                      <FormControlLabel
                        classes={{
                          root:
                            woundInfoData.serialDebridementRequired.value ===
                            "No"
                              ? "optionRoot-active"
                              : "optionRoot",
                        }}
                        componentsProps={{
                          typography: {
                            classes: {
                              root:
                                woundInfoData.serialDebridementRequired
                                  .value === "No"
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
                        data-testid="debridement-cause-is-wound-from-accident-No"
                        label="No"
                        value="No"
                      />
                    </RadioGroup>
                  </InputWithLabel>
                </Grid>
              </Grid>
            </Box>
          </div>
        </div>
      )}
      {isReviewOrder && (
        <DebridementReviewOrder
          editButtonClicked={editButtonClicked}
          isOrderSummary={isOrderSummary}
          woundInfoData={woundInfoData}
        />
      )}
    </div>
  );
};

export default Debridement;
