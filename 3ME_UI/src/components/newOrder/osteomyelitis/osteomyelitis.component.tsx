import {
  Box,
  FormControlLabel,
  Grid,
  InputBase,
  Radio,
  RadioGroup,
} from "@mui/material";
import "./osteomyelitis.css";
import { useContext, useState } from "react";
import { NewOrderValidator } from "../newOrder.validator";
import { IOsteomyelitis } from "./osteomyelitis.interface";
import { CustomCheckBox } from "../../../core/checkBox/checkBox.component";
import { ValidationStatus } from "../../../core/interfaces/input.interface";
import { ReactComponent as RadioButtonIcon } from "../../../assets/radioButton.svg";
import { InputWithLabel } from "../../../core/inputWithLabel/inputWithLabel.component";
import { ReactComponent as SelectedRadioButtonIcon } from "../../../assets/selectedRadioButton.svg";
import { OsteomyelitisReviewOrder } from "./reviewOrder/osteomyelitisReviewOrder.component";
import {
  NewOrderContext,
  NewOrderContextType,
} from "../../../context/NewOrderContext";

export const Osteomyelitis = ({
  isReviewOrder = false,
  editButtonClicked,
  isOrderSummary = false,
  setWoundInfoData,
  woundInfoData,
  Validator = new NewOrderValidator(),
}: IOsteomyelitis) => {
  const [validator] = useState<NewOrderValidator>(Validator!);
  const NewOrderObj = useContext<NewOrderContextType | null>(NewOrderContext);

  const validateOsteomyelitisies = (e: any) => {
    NewOrderObj?.setIsHandleChangeTriggered(true);
    let itemRemoved = false;
    let lastUntouchedItem = false;
    woundInfoData.osteomyelitisies.value.map((item: any) => {
      if (item.value === e.target.name) {
        item.selected = e.target.checked;
        if (item.selected === false) {
          updateItemToDefault(item);
          itemRemoved = true;
        }
      }
    });
    if (itemRemoved) {
      const selectedCheckBox = woundInfoData.osteomyelitisies.value.filter(
        (item: any) => item.selected
      );
      if (selectedCheckBox.length > 0) {
        const checkBoxWithTextBoxUntouched = selectedCheckBox.filter(
          (item: any) =>
            item.isRequiredTextBox &&
            item.isTextBoxValueValid === ValidationStatus.UNTOUCHED
        );
        lastUntouchedItem =
          checkBoxWithTextBoxUntouched.length > 0 ? false : true;
      }
    }
    updateWoundData(lastUntouchedItem);
  };

  const validateAndSetData = (e: any) => {
    NewOrderObj?.setIsHandleChangeTriggered(true);
    if (
      e.target.name === "isOsteomyelitisPresent" ||
      e.target.name === "isTreatemenForResolveBoneInfection"
    ) {
      if (e.target.name === "isOsteomyelitisPresent") {
        updateWhenIsOsteomyelitisNotPresent(e.target.value === "Yes");
      }
      const isValid = validator.validate(e.target.value, e.target.name);
      setWoundInfoData(
        Object.assign({}, woundInfoData, {
          [e.target.name]: { value: e.target.value, valid: isValid?.status },
        })
      );
    } else {
      woundInfoData.osteomyelitisies.value.map((item: any) => {
        if (item.textBoxLabel === e.target.name) {
          item.textBoxValue = e.target.value;
          const isValid = validator.validate(
            e.target.value,
            "osteomyelitisItemText"
          );
          item.isTextBoxValueValid = isValid!.status;
        }
      });
      updateWoundData();
    }
  };

  const updateWhenIsOsteomyelitisNotPresent = (
    isOsteomyelitisPresent: boolean
  ) => {
    woundInfoData.isTreatemenForResolveBoneInfection.value = "";
    woundInfoData.isTreatemenForResolveBoneInfection.valid =
      isOsteomyelitisPresent
        ? ValidationStatus.UNTOUCHED
        : ValidationStatus.VALID;
    woundInfoData.isTreatemenForResolveBoneInfection.required =
      isOsteomyelitisPresent;
    resetAllOsteomyelitisies(isOsteomyelitisPresent);
  };

  const resetAllOsteomyelitisies = (isOsteomyelitisPresent: boolean) => {
    woundInfoData.osteomyelitisies.value.map((item: any) => {
      item.selected = false;
      updateItemToDefault(item);
    });
    woundInfoData.osteomyelitisies.valid = ValidationStatus.UNTOUCHED;
    woundInfoData.osteomyelitisies.required = isOsteomyelitisPresent;
    setWoundInfoData(Object.assign({}, woundInfoData));
  };

  const updateItemToDefault = (item: any) => {
    item.textBoxValue = null;
    item.isTextBoxValueValid = ValidationStatus.UNTOUCHED;
  };

  const updateWoundData = (isUserUpdated: boolean = false) => {
    const isValid = validator.validate(
      woundInfoData.osteomyelitisies.value,
      "osteomyelitisies"
    );
    const oldStatus = woundInfoData.osteomyelitisies.valid;
    if (isValid!.message !== null && isValid!.message === "null") {
      if (oldStatus !== ValidationStatus.UNTOUCHED) {
        woundInfoData.osteomyelitisies.valid = ValidationStatus.INVALID;
      } else {
        woundInfoData.osteomyelitisies.valid = isUserUpdated
          ? ValidationStatus.INVALID
          : oldStatus;
      }
    } else {
      woundInfoData.osteomyelitisies.valid = isValid!.status!;
    }
    setWoundInfoData(Object.assign({}, woundInfoData));
  };

  return (
    <div className="osteomyelitis-main-container">
      {!isReviewOrder && (
        <div className="osteomyelitis">
          <h2 className="osteomyelitis-title" data-testid="osteomyelitis-title">
            Osteomyelitis
          </h2>
          <InputWithLabel
            label="Is osteomyelitis present in the wound?"
            isRequired={true}
            error={
              woundInfoData?.isOsteomyelitisPresent.valid ===
              ValidationStatus.INVALID
            }
            labelClassName="isOsteomyelitisPresent"
            testId="osteomyelitis-isOsteomyelitisPresent"
          >
            <Box className="osteomyelitis-box-container" sx={{ flexGrow: 1 }}>
              <Grid
                className="osteomyelitis-grid-container"
                container
                spacing={2}
              >
                <Grid className="osteomyelitis-grid-item" item xs={6}>
                  <RadioGroup
                    name="isOsteomyelitisPresent"
                    classes={{ root: "radioRoot" }}
                    onChange={validateAndSetData}
                    value={woundInfoData?.isOsteomyelitisPresent.value}
                  >
                    <FormControlLabel
                      classes={{
                        root:
                          woundInfoData.isOsteomyelitisPresent.value === "Yes"
                            ? "optionRoot-active"
                            : "optionRoot",
                      }}
                      componentsProps={{
                        typography: {
                          classes: {
                            root:
                              woundInfoData.isOsteomyelitisPresent.value ===
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
                      data-testid="osteomyelitis-isOsteomyelitisPresent-Yes"
                      label="Yes"
                      value="Yes"
                    />
                    <FormControlLabel
                      classes={{
                        root:
                          woundInfoData.isOsteomyelitisPresent.value === "No"
                            ? "optionRoot-active"
                            : "optionRoot",
                      }}
                      componentsProps={{
                        typography: {
                          classes: {
                            root:
                              woundInfoData.isOsteomyelitisPresent.value ===
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
                      data-testid="osteomyelitis-isOsteomyelitisPresent-No"
                      label="No"
                      value="No"
                    />
                  </RadioGroup>
                </Grid>
              </Grid>
            </Box>
          </InputWithLabel>
          {woundInfoData.isOsteomyelitisPresent.value === "Yes" && (
            <InputWithLabel
              label="Indicate Treatment Regimen"
              isRequired={true}
              error={
                woundInfoData.osteomyelitisies.valid ===
                ValidationStatus.INVALID
              }
              labelClassName="osteomyelitis-treatment-regimen-header"
              testId="osteomyelitis-treatment-regimen"
            >
              <Box className="osteomyelitis-box-container" sx={{ flexGrow: 1 }}>
                <Grid
                  className="osteomyelitis-grid-container"
                  container
                  spacing={2}
                >
                  <Grid className="osteomyelitis-grid-item" item xs={12}></Grid>
                  <div className="osteomyelitis-treatment-regimen">
                    {woundInfoData.osteomyelitisies.value.map(
                      (x: any, index: any) => (
                        <div className="osteomyelitis-checkbox-with-textbox">
                          <CustomCheckBox
                            name={x.value}
                            selectClassName="osteomyelitis-checkbox"
                            selectpropsClassName="osteomyelitis-checkbox-root"
                            handleChange={validateOsteomyelitisies}
                            labelClassName={
                              x.selected
                                ? "osteomyelitis-checkbox-description-text-active"
                                : "osteomyelitis-checkbox-description-text"
                            }
                            checked={x.selected}
                            value={x.value}
                            key={index}
                            required={false}
                            labelText={x.label}
                            testId={x.value}
                          />
                          {x.selected && x.isRequiredTextBox && (
                            <InputWithLabel
                              error={
                                x.isTextBoxValueValid ===
                                ValidationStatus.INVALID
                              }
                              testId={x.textBoxLabel}
                            >
                              <InputBase
                                autoFocus={x.textBoxValue === ""}
                                className="osteomyelitis-input"
                                name={x.textBoxLabel}
                                onChange={validateAndSetData}
                                placeholder={x.textBoxPlaceHolder}
                                value={x.textBoxValue}
                              />
                            </InputWithLabel>
                          )}
                        </div>
                      )
                    )}
                  </div>
                </Grid>
              </Box>
            </InputWithLabel>
          )}
          {woundInfoData.isOsteomyelitisPresent.value === "Yes" && (
            <InputWithLabel
              label="Is the above treatment administered to the patient with the intention to completely resolve the underlying bone infection?"
              isRequired={true}
              error={
                woundInfoData.isTreatemenForResolveBoneInfection.valid ===
                ValidationStatus.INVALID
              }
              labelClassName="is-treatement-for-resolve-underlying-bone-infection"
              testId="is-treatement-for-resolve-underlying-bone-infection"
            >
              <Box className="osteomyelitis-box-container" sx={{ flexGrow: 1 }}>
                <Grid
                  className="osteomyelitis-grid-container"
                  container
                  spacing={2}
                >
                  <Grid className="osteomyelitis-grid-item" item xs={6}>
                    <RadioGroup
                      name="isTreatemenForResolveBoneInfection"
                      classes={{ root: "radioRoot" }}
                      onChange={validateAndSetData}
                      value={
                        woundInfoData.isTreatemenForResolveBoneInfection.value
                      }
                    >
                      <FormControlLabel
                        classes={{
                          root:
                            woundInfoData.isTreatemenForResolveBoneInfection
                              .value === "Yes"
                              ? "optionRoot-active"
                              : "optionRoot",
                        }}
                        componentsProps={{
                          typography: {
                            classes: {
                              root:
                                woundInfoData.isTreatemenForResolveBoneInfection
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
                        data-testid="osteomyelitis-isTreatemenForResolveBoneInfection-Yes"
                        label="Yes"
                        value="Yes"
                      />
                      <FormControlLabel
                        classes={{
                          root:
                            woundInfoData.isTreatemenForResolveBoneInfection
                              .value === "No"
                              ? "optionRoot-active"
                              : "optionRoot",
                        }}
                        componentsProps={{
                          typography: {
                            classes: {
                              root:
                                woundInfoData.isTreatemenForResolveBoneInfection
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
                        data-testid="osteomyelitis-isTreatemenForResolveBoneInfection-No"
                        label="No"
                        value="No"
                      />
                    </RadioGroup>
                  </Grid>
                </Grid>
              </Box>
            </InputWithLabel>
          )}
        </div>
      )}
      {isReviewOrder && (
        <OsteomyelitisReviewOrder
          editButtonClicked={editButtonClicked}
          isOrderSummary={isOrderSummary}
          woundInfoData={woundInfoData}
        />
      )}
    </div>
  );
};
