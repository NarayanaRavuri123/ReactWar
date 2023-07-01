import { FormControlLabel, Grid, Radio, RadioGroup } from "@mui/material";
import React, { useCallback, useContext, useEffect } from "react";
import {
  NewOrderContext,
  NewOrderContextType,
} from "../../../context/NewOrderContext";
import { CustomCheckBox } from "../../../core/checkBox/checkBox.component";
import { InputWithLabel } from "../../../core/inputWithLabel/inputWithLabel.component";
import { ValidationStatus } from "../../../core/interfaces/input.interface";
import { NewOrderValidator } from "../newOrder.validator";
import { MultipleActionsProps } from "../newOrderWoundInfoStepper/newOrderWoundInfo.interface";
import "./nutrition.css";
import { NutrionProps } from "./nutrition.interfaces";
import { nutriActionData } from "./nutritionAction.data";
import { NutritionReviewOrder } from "./reviewOrder/nutritionReviewOrder.component";
import { ReactComponent as RadioButtonIcon } from "../../../assets/radioButton.svg";
import { ReactComponent as SelectedRadioButtonIcon } from "../../../assets/selectedRadioButton.svg";

export const Nutrition = ({
  isReviewOrder = false,
  editButtonClicked,
  isOrderSummary = false,
  setWoundInfoData,
  woundInfoData,
  Validator = new NewOrderValidator(),
}: NutrionProps) => {
  const [showActions, setShowActions] = React.useState(false);
  const [validator] = React.useState<NewOrderValidator>(Validator!);
  const NewOrderObj = useContext<NewOrderContextType | null>(NewOrderContext);
  const validateAndSetData = (e: any) => {
    NewOrderObj?.setIsHandleChangeTriggered(true);
    let { value, name, required } = e.target;
    let isValid;
    if (name === "nutritionActions") {
      const updatedData = woundInfoData.nutritionActions.value.map(
        (nd: MultipleActionsProps) =>
          nd.value === value
            ? { ...nd, selected: e.target.checked }
            : { ...nd, selected: nd.selected }
      );
      value = [...updatedData];
      required = true;
      isValid = validator.validateArray(updatedData, e.target.name);
    } else {
      isValid = validator.validate(e.target.value, e.target.name);
      required = true;
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

  const toggleNutriAction = useCallback(() => {
    setShowActions(woundInfoData.nutriStatusCompromized.value === "Yes");
    if (woundInfoData.nutriStatusCompromized.value === "No") {
      setWoundInfoData(
        Object.assign({}, woundInfoData, {
          nutritionActions: {
            value: nutriActionData,
            valid: ValidationStatus.UNTOUCHED,
            required: false,
          },
        })
      );
    } else {
      setWoundInfoData(
        Object.assign({}, woundInfoData, {
          nutritionActions: {
            value: woundInfoData.nutritionActions.value,
            valid: ValidationStatus.UNTOUCHED,
            required: true,
          },
        })
      );
    }
  }, [woundInfoData.nutriStatusCompromized.value]);

  useEffect(() => {
    toggleNutriAction();
  }, [woundInfoData.nutriStatusCompromized.value]);

  return (
    <div className="nutrition-main-container">
      {!isReviewOrder && (
        <div className="nutrition-container">
          <div className="nutri-label" data-testid="nutri-label">
            Nutrition
          </div>
          <InputWithLabel
            label="Is the patient’s nutritional status compromised"
            isRequired={woundInfoData.nutriStatusCompromized.required}
            error={
              woundInfoData.nutriStatusCompromized.valid ===
              ValidationStatus.INVALID
            }
            labelClassName="nutri-status-label"
            testId="nutri-status"
          >
            <RadioGroup
              name="nutriStatusCompromized"
              classes={{ root: "radioRoot" }}
              onChange={validateAndSetData}
              value={woundInfoData.nutriStatusCompromized.value}
            >
              <FormControlLabel
                classes={{
                  root:
                    woundInfoData.nutriStatusCompromized.value === "Yes"
                      ? "optionRoot-active"
                      : "optionRoot",
                }}
                componentsProps={{
                  typography: {
                    classes: {
                      root:
                        woundInfoData.nutriStatusCompromized.value === "Yes"
                          ? "optiontxtSelect"
                          : "optiontxt",
                    },
                  },
                }}
                value="Yes"
                control={
                  <Radio
                    icon={<RadioButtonIcon />}
                    checkedIcon={<SelectedRadioButtonIcon />}
                  />
                }
                label="Yes"
              />
              <FormControlLabel
                classes={{
                  root:
                    woundInfoData.nutriStatusCompromized.value === "No"
                      ? "optionRoot-active"
                      : "optionRoot",
                }}
                componentsProps={{
                  typography: {
                    classes: {
                      root:
                        woundInfoData.nutriStatusCompromized.value === "No"
                          ? "optiontxtSelect"
                          : "optiontxt",
                    },
                  },
                }}
                value="No"
                control={
                  <Radio
                    icon={<RadioButtonIcon />}
                    checkedIcon={<SelectedRadioButtonIcon />}
                  />
                }
                label="No"
              />
            </RadioGroup>
          </InputWithLabel>
          {showActions && (
            <div className="nutrition-actions-container">
              <InputWithLabel
                label="Action taken to address nutritional status"
                isRequired={woundInfoData.nutritionActions.required}
                labelClassName="nutri-status-label"
                error={
                  woundInfoData.nutritionActions.valid ===
                  ValidationStatus.INVALID
                }
                testId="action-checkboxes"
              >
                <Grid container className="action-options-container">
                  {woundInfoData.nutritionActions.value.map(
                    (act: MultipleActionsProps) => (
                      <Grid item xs={6}>
                        <CustomCheckBox
                          handleChange={validateAndSetData}
                          labelClassName="nutri-action-label"
                          value={act.value}
                          defaultValue={act.value}
                          checked={act.selected}
                          labelText={act.label}
                          key={act.value}
                          name="nutritionActions"
                        />
                      </Grid>
                    )
                  )}
                </Grid>
              </InputWithLabel>
            </div>
          )}
        </div>
      )}
      {isReviewOrder && (
        <NutritionReviewOrder
          editButtonClicked={editButtonClicked}
          isOrderSummary={isOrderSummary}
          woundInfoData={woundInfoData}
        />
      )}
    </div>
  );
};
