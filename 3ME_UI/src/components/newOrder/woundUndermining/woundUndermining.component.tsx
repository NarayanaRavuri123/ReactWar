import React, { useState, useEffect, useContext } from "react";
import "./woundUndermining.css";
import { Box, FormControlLabel, Grid, Radio, RadioGroup } from "@mui/material";
import { InputWithLabel } from "../../../core/inputWithLabel/inputWithLabel.component";
import { woundUnderminingProps } from "./woundUndermining.interface";
import { ReactComponent as RadioButtonIcon } from "../../../assets/radioButton.svg";
import { ReactComponent as SelectedRadioButtonIcon } from "../../../assets/selectedRadioButton.svg";
import { ValidationStatus } from "../../../core/interfaces/input.interface";
import { NewOrderValidator } from "../newOrder.validator";
import UnderminingDetails from "./woundUnderminingDetails/underminingDetails.component";
import { getdropDownContent } from "../../../util/dropDownService";
import { DD_UNDERMINING_POSITION } from "../../../util/staticText";
import { format } from "react-string-format";
import { WoundUnderminingReviewOrder } from "./reviewOrder/woundUnderminingReviewOrder.component";
import {
  NewOrderContext,
  NewOrderContextType,
} from "../../../context/NewOrderContext";

const WoundUndermining = ({
  editButtonClicked,
  isReviewOrder = false,
  isOrderSummary = false,
  isSecondaryWoundInfo,
  setWoundInfoData,
  woundInfoData,
  Validator = new NewOrderValidator(),
}: woundUnderminingProps) => {
  const [validator] = React.useState<NewOrderValidator>(Validator!);
  const NewOrderObj = useContext<NewOrderContextType | null>(NewOrderContext);
  const [underminingPositionOptions, setUnderminingPositionOptions] = useState(
    []
  );

  const validateAndSetData = (e: any) => {
    NewOrderObj?.setIsHandleChangeTriggered(true);
    let { value, name } = e.target;
    let isValid;
    isValid = validator.validate(e.target.value, e.target.name);
    if (name === "woundUndermining" && value === "Yes") {
      setDefaultValue(true);
    } else if (name === "woundUndermining" && value === "No") {
      setDefaultValue(false);
    }
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

  const setDefaultValue = (requiredStatus: boolean) => {
    woundInfoData.underminingLocation1Depth = {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: requiredStatus,
    };
    woundInfoData.underminingLocation1PositionFrom = {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: requiredStatus,
    };
    woundInfoData.underminingLocation1PositionTo = {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: requiredStatus,
    };
    woundInfoData.underminingLocation2Depth = {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: false,
    };
    woundInfoData.underminingLocation2PositionFrom = {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: false,
    };
    woundInfoData.underminingLocation2PositionTo = {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: false,
    };
    setWoundInfoData(Object.assign({}, woundInfoData));
  };

  const fetchdropDownContent = async () => {
    try {
      const ddContent = format("{0}", DD_UNDERMINING_POSITION);
      const data = await getdropDownContent(ddContent);
      if (data.items.length > 0) {
        const positionObject = data.items.filter(
          (item: { name: string }) => item.name === DD_UNDERMINING_POSITION
        );
        const positionData = positionObject[0].data
          .sort((a: { order: number }, b: { order: number }) =>
            a.order > b.order ? 1 : -1
          )
          .map((x: { code: any }) => x.code);
        setUnderminingPositionOptions(positionData);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    return () => {
      fetchdropDownContent();
    };
  }, [woundInfoData]);

  return (
    <div
      className={
        isSecondaryWoundInfo
          ? "wound-undermining-main-container-sec"
          : "wound-undermining-main-container"
      }
    >
      {!isReviewOrder && (
        <div className="undermining" data-testid="undermining">
          <h2 className="undermining-title" data-testid="undermining-title">
            Wound Undermining
          </h2>
          <Box className="undermining-box-container" sx={{ flexGrow: 1 }}>
            <Grid className="undermining-grid-container" container spacing={2}>
              <Grid className="undermining-grid-item" item xs={6}>
                <InputWithLabel
                  label="Is undermining present in the wound?"
                  isRequired={woundInfoData?.woundUndermining.required}
                  error={
                    woundInfoData?.woundUndermining.valid ===
                    ValidationStatus.INVALID
                  }
                  testId="woundUndermining-desp"
                >
                  <RadioGroup
                    name="woundUndermining"
                    classes={{ root: "radioRoot" }}
                    onChange={validateAndSetData}
                    value={woundInfoData?.woundUndermining.value}
                  >
                    <FormControlLabel
                      classes={{
                        root:
                          woundInfoData.woundUndermining.value === "Yes"
                            ? "optionRoot-active"
                            : "optionRoot",
                      }}
                      componentsProps={{
                        typography: {
                          classes: {
                            root:
                              woundInfoData.woundUndermining.value === "Yes"
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
                      data-testid="woundUndermining-Yes"
                      label="Yes"
                      value="Yes"
                    />
                    <FormControlLabel
                      classes={{
                        root:
                          woundInfoData.woundUndermining.value === "No"
                            ? "optionRoot-active"
                            : "optionRoot",
                      }}
                      componentsProps={{
                        typography: {
                          classes: {
                            root:
                              woundInfoData.woundUndermining.value === "No"
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
                      data-testid="woundUndermining-No"
                      label="No"
                      value="No"
                    />
                  </RadioGroup>
                </InputWithLabel>
              </Grid>
            </Grid>
          </Box>
          {woundInfoData.woundUndermining.value === "Yes" && (
            <UnderminingDetails
              woundInfoData={woundInfoData}
              setWoundInfoData={setWoundInfoData}
              positionDropDownData={underminingPositionOptions}
            />
          )}
        </div>
      )}
      {isReviewOrder && (
        <WoundUnderminingReviewOrder
          editButtonClicked={editButtonClicked}
          isOrderSummary={isOrderSummary}
          woundInfoData={woundInfoData}
        />
      )}
    </div>
  );
};

export default WoundUndermining;
