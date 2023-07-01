import React, { useState, useEffect, useContext } from "react";
import "./woundTunneling.css";
import { Box, FormControlLabel, Grid, Radio, RadioGroup } from "@mui/material";
import { InputWithLabel } from "../../../core/inputWithLabel/inputWithLabel.component";
import { woundTunnelingProps } from "./woundTunneling.interfaces";
import { ReactComponent as RadioButtonIcon } from "../../../assets/radioButton.svg";
import { ReactComponent as SelectedRadioButtonIcon } from "../../../assets/selectedRadioButton.svg";
import { ValidationStatus } from "../../../core/interfaces/input.interface";
import { NewOrderValidator } from "../newOrder.validator";
import TunnelingDetails from "./woundTunnelingDetails/tunnelingDetails.component";
import { getdropDownContent } from "../../../util/dropDownService";
import { DD_TUNNELING_POSITION } from "../../../util/staticText";
import { format } from "react-string-format";
import { WoundTunnelingReviewOrder } from "./reviewOrder/woundTunnelingReviewOrder.component";
import {
  NewOrderContext,
  NewOrderContextType,
} from "../../../context/NewOrderContext";

const WoundTunneling = ({
  editButtonClicked,
  isReviewOrder = false,
  isSecondaryWoundInfo = false,
  isOrderSummary = false,
  setWoundInfoData,
  woundInfoData,
  Validator = new NewOrderValidator(),
  isWoundAssessmentSummary,
}: woundTunnelingProps) => {
  const [validator] = React.useState<NewOrderValidator>(Validator!);
  const [tunnelingPositionOptions, setTunnelingPositionOptions] = useState([]);
  const [tunnelingPositionOptionsText, setTunnelingPositionOptionsText] =
    useState([]);
  const NewOrderObj = useContext<NewOrderContextType | null>(NewOrderContext);
  const validateAndSetData = (e: any) => {
    NewOrderObj?.setIsHandleChangeTriggered(true);
    let { value, name } = e.target;
    let isValid;
    isValid = validator.validate(e.target.value, e.target.name);
    if (name === "woundTunneling" && value === "Yes") {
      setDefaultValue(true);
    } else if (name === "woundTunneling" && value === "No") {
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
    woundInfoData.location1Depth = {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: requiredStatus,
    };
    woundInfoData.location1Position = {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: requiredStatus,
    };
    woundInfoData.location2Depth = {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: false,
    };
    woundInfoData.location2Position = {
      value: "",
      valid: ValidationStatus.UNTOUCHED,
      required: false,
    };
    setWoundInfoData(Object.assign({}, woundInfoData));
  };

  const fetchdropDownContent = async () => {
    try {
      const ddContent = format("{0}", DD_TUNNELING_POSITION);
      const data = await getdropDownContent(ddContent);
      if (data.items.length > 0) {
        const positionObject = data.items.filter(
          (item: { name: string }) => item.name === DD_TUNNELING_POSITION
        );
        const positionData = positionObject[0].data.sort(
          (a: { order: number }, b: { order: number }) =>
            a.order > b.order ? 1 : -1
        );
        const positionText = positionData.map((x: { text: any }) => x.text);
        setTunnelingPositionOptionsText(positionText);
        setTunnelingPositionOptions(positionData);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchdropDownContent();
  }, []);

  return (
    <div
      className={
        isSecondaryWoundInfo
          ? "wound-tunneling-main-container-sec"
          : "wound-tunneling-main-container"
      }
    >
      {!isReviewOrder && (
        <div className="tunneling" data-testid="tunneling">
          <h2 className="tunneling-title" data-testid="tunneling-title">
            Wound Tunneling
          </h2>
          <Box className="tunneling-box-container" sx={{ flexGrow: 1 }}>
            <Grid className="tunneling-grid-container" container spacing={2}>
              <Grid className="tunneling-grid-item" item xs={6}>
                <InputWithLabel
                  label="Is tunneling present in the wound?"
                  isRequired={woundInfoData?.woundTunneling.required}
                  error={
                    woundInfoData?.woundTunneling.valid ===
                    ValidationStatus.INVALID
                  }
                  testId="woundTunneling-desp"
                >
                  <RadioGroup
                    name="woundTunneling"
                    classes={{ root: "radioRoot" }}
                    onChange={validateAndSetData}
                    value={woundInfoData?.woundTunneling.value}
                  >
                    <FormControlLabel
                      classes={{
                        root:
                          woundInfoData.woundTunneling.value === "Yes"
                            ? "optionRoot-active"
                            : "optionRoot",
                      }}
                      componentsProps={{
                        typography: {
                          classes: {
                            root:
                              woundInfoData.woundTunneling.value === "Yes"
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
                      data-testid="woundTunneling-Yes"
                      label="Yes"
                      value="Yes"
                    />
                    <FormControlLabel
                      classes={{
                        root:
                          woundInfoData.woundTunneling.value === "No"
                            ? "optionRoot-active"
                            : "optionRoot",
                      }}
                      componentsProps={{
                        typography: {
                          classes: {
                            root:
                              woundInfoData.woundTunneling.value === "No"
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
                      data-testid="woundTunneling-No"
                      label="No"
                      value="No"
                    />
                  </RadioGroup>
                </InputWithLabel>
              </Grid>
            </Grid>
          </Box>
          {woundInfoData.woundTunneling.value === "Yes" && (
            <TunnelingDetails
              woundInfoData={woundInfoData}
              setWoundInfoData={setWoundInfoData}
              positionDropDownData={tunnelingPositionOptions}
              positionDropDownDataText={tunnelingPositionOptionsText}
            />
          )}
        </div>
      )}
      {isReviewOrder && (
        <WoundTunnelingReviewOrder
          editButtonClicked={editButtonClicked}
          isOrderSummary={isOrderSummary}
          woundInfoData={woundInfoData}
          isSecondaryWoundInfo={isSecondaryWoundInfo!}
          isWoundAssessmentSummary={isWoundAssessmentSummary}
        />
      )}
    </div>
  );
};

export default WoundTunneling;
