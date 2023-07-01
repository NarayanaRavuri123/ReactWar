import React, { useContext } from "react";
import { Grid } from "@mui/material";
import { NewOrderValidator } from "../newOrder.validator";
import { ExudateProps } from "./exudate.interface";
import "./exudate.css";
import { InputWithLabel } from "../../../core/inputWithLabel/inputWithLabel.component";
import { useCallback, useEffect, useState } from "react";
import {
  DD_EXUDATE_AMOUNT_TYPE,
  DD_EXUDATE_APPEARANCE_TYPE,
} from "../../../util/staticText";
import { format } from "react-string-format";
import { getdropDownContent } from "../../../util/dropDownService";
import { CustomDropDown } from "../../../core/customDropdown/customDropdown.component";
import { ValidationStatus } from "../../../core/interfaces/input.interface";
import { ExudateReviewOrder } from "./reviewOrder/exudateReviewOrder.component";
import {
  NewOrderContext,
  NewOrderContextType,
} from "../../../context/NewOrderContext";
import { INewOrderWoundInfo } from "../newOrderWoundInfoStepper/newOrderWoundInfo.interface";
import { ISecondaryWoundInfo } from "../clinicalInformation/secondaryWoundInfo/secondaryWoundInfo.interface";

export const Exudate = ({
  editButtonClicked,
  isReviewOrder = false,
  isOrderSummary = false,
  isSecondaryWoundInfo,
  setWoundInfoData,
  woundInfoData,
  Validator = new NewOrderValidator(),
}: ExudateProps) => {
  const [exudateAmountData, setExudateAmountData] = useState([]);
  const [exudateAppearanceData, setExudateAppearanceData] = useState([]);
  const [validator] = React.useState<NewOrderValidator>(Validator!);
  const NewOrderObj = useContext<NewOrderContextType | null>(NewOrderContext);

  const validateAndSetData = (e: any) => {
    NewOrderObj?.setIsHandleChangeTriggered(true);
    const { value, name } = e.target;
    const isValid = validator.validate(value, name);
    if (name === "exudateAmount") {
      setWoundInfoData((dt: INewOrderWoundInfo | ISecondaryWoundInfo) => ({
        ...dt,
        [name]: {
          value: value,
          valid: isValid?.status,
          required: true,
        },
        exudateAppearance: {
          value:
            value.toLowerCase() === "none" ? "" : dt.exudateAppearance.value,
          valid:
            value.toLowerCase() === "none"
              ? ValidationStatus.UNTOUCHED
              : dt.exudateAppearance.value === ""
              ? ValidationStatus.UNTOUCHED
              : ValidationStatus.VALID,
          required: value.toLowerCase() === "none" ? false : true,
        },
      }));
    } else {
      setWoundInfoData((dt: INewOrderWoundInfo | ISecondaryWoundInfo) => ({
        ...dt,
        [name]: {
          value: value,
          valid: isValid?.status,
          required: true,
        },
      }));
    }
  };

  const getExudateContent = useCallback(async (type: string) => {
    try {
      const ddContent = format("{0}", type);
      const data = await getdropDownContent(ddContent);
      if (data.items.length > 0) {
        const exudateObj = data.items.filter(
          (item: { name: string }) => item.name === type
        );
        const exudateData = exudateObj[0].data
          .sort((a: { order: number }, b: { order: number }) =>
            a.order > b.order ? 1 : -1
          )
          .map((x: { text: any }) => x.text);
        type === DD_EXUDATE_AMOUNT_TYPE
          ? setExudateAmountData(exudateData)
          : setExudateAppearanceData(exudateData);
      }
    } catch (error) {
      console.log("error", error);
    }
  }, []);

  useEffect(() => {
    getExudateContent(DD_EXUDATE_AMOUNT_TYPE);
    getExudateContent(DD_EXUDATE_APPEARANCE_TYPE);
  }, []);

  return (
    <div
      className={
        isSecondaryWoundInfo
          ? "exudate-main-container-sec"
          : "exudate-main-container"
      }
    >
      {!isReviewOrder && (
        <Grid
          container
          className="exudate-container"
          data-testid="exudate-container"
        >
          <Grid item className="exudate-dd-container">
            <div className="exudate-header" data-testid="exudate-header">
              Wound Exudate
            </div>
            <InputWithLabel
              label="Exudate Amount"
              isRequired={true}
              error={
                woundInfoData.exudateAmount.valid === ValidationStatus.INVALID
              }
              sx={{ marginTop: "16px" }}
            >
              <CustomDropDown
                handleChange={validateAndSetData}
                menuItem={exudateAmountData}
                name="exudateAmount"
                placeHolder="Exudate Amount"
                selectpropsClassName={
                  woundInfoData.exudateAmount.value
                    ? "exudate-select"
                    : "placeHolder"
                }
                selectClassName={
                  woundInfoData.exudateAmount.value
                    ? "exudate-select-input"
                    : "placeHolder"
                }
                testId="exudate-amount-select"
                value={woundInfoData?.exudateAmount.value}
              />
            </InputWithLabel>
            {woundInfoData?.exudateAmount.value !== "" &&
              woundInfoData?.exudateAmount.value !== "None" && (
                <InputWithLabel
                  label="Exudate Appearance"
                  isRequired={true}
                  error={
                    woundInfoData.exudateAppearance.valid ===
                    ValidationStatus.INVALID
                  }
                  sx={{ marginTop: "16px" }}
                >
                  <CustomDropDown
                    handleChange={validateAndSetData}
                    menuItem={exudateAppearanceData}
                    name="exudateAppearance"
                    placeHolder="Exudate Appearance"
                    selectpropsClassName={
                      woundInfoData.exudateAppearance.value
                        ? "exudate-select"
                        : "placeHolder"
                    }
                    selectClassName={
                      woundInfoData.exudateAppearance.value
                        ? "exudate-select-input"
                        : "placeHolder"
                    }
                    testId="exudate-appearance-select"
                    value={woundInfoData?.exudateAppearance.value}
                  />
                </InputWithLabel>
              )}
          </Grid>
        </Grid>
      )}
      {isReviewOrder && (
        <ExudateReviewOrder
          editButtonClicked={editButtonClicked}
          isOrderSummary={isOrderSummary}
          woundInfoData={woundInfoData}
        />
      )}
    </div>
  );
};
