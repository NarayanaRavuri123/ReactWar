import "./woundExudate.css";
import { Grid } from "@mui/material";
import {
  DD_EXUDATE_AMOUNT_TYPE,
  DD_EXUDATE_APPEARANCE_TYPE,
} from "../../../../../../util/staticText";
import { format } from "react-string-format";
import React, { useEffect, useState } from "react";
import { IWoundExudateProps } from "./woundExudate.interface";
import { IAddWoundAssessment } from "../addWoundAssessment.interface";
import { getdropDownContent } from "../../../../../../util/dropDownService";
import { AddWoundAssessmentValidator } from "../addWoundAssessment.validator";
import { ValidationStatus } from "../../../../../../core/interfaces/input.interface";
import { CustomDropDown } from "../../../../../../core/customDropdown/customDropdown.component";
import { InputWithLabel } from "../../../../../../core/inputWithLabel/inputWithLabel.component";
import {
  getCodeFromText,
  getTextFromCode,
} from "../../../../../../util/utilityFunctions";
import ReviewWoundExudate from "./reviewWoundExudate/reviewWoundExudate.component";

export const WoundExudate = ({
  data,
  setData,
  Validator = new AddWoundAssessmentValidator(),
  isReviewAssessment = false,
  isWoundAssessmentSummary,
  editButtonClicked,
}: IWoundExudateProps) => {
  const [exudateAmountData, setExudateAmountData] = useState([]);
  const [exudateAmountText, setExudateAmountText] = useState([]);
  const [exudateAppearanceData, setExudateAppearanceData] = useState([]);
  const [exudateAppearanceText, setExudateAppearanceText] = useState([]);
  const [validator] = React.useState<AddWoundAssessmentValidator>(Validator);

  const validateAndSetData = (e: any) => {
    const { value, name } = e.target;
    const isValid = validator.validate(value, name);
    if (name === "exudateAmount") {
      setData((dt: IAddWoundAssessment) => ({
        ...dt,
        [name]: {
          value: getCodeFromText(exudateAmountData, value),
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
      let exudateAppearanceValue = getCodeFromText(
        exudateAppearanceData,
        value
      );
      setData((dt: IAddWoundAssessment) => ({
        ...dt,
        [name]: {
          value: exudateAppearanceValue,
          valid: isValid?.status,
          required: true,
        },
      }));
    }
  };

  const getExudateContent = async () => {
    try {
      const ddContent = format(
        "{0},{1}",
        DD_EXUDATE_AMOUNT_TYPE,
        DD_EXUDATE_APPEARANCE_TYPE
      );
      const data = await getdropDownContent(ddContent);
      if (data.items.length > 0) {
        const exudateAmountObj = data.items.filter(
          (item: { name: string }) => item.name === DD_EXUDATE_AMOUNT_TYPE
        );
        const exudateAmountData = exudateAmountObj[0].data.sort(
          (a: { order: number }, b: { order: number }) =>
            a.order > b.order ? 1 : -1
        );
        setExudateAmountData(exudateAmountData);
        setExudateAmountText(
          exudateAmountData.map((x: { text: string }) => x.text)
        );
        const exudateAppearanceObj = data.items.filter(
          (item: { name: string }) => item.name === DD_EXUDATE_APPEARANCE_TYPE
        );
        const exudateAppearanceData = exudateAppearanceObj[0].data.sort(
          (a: { order: number }, b: { order: number }) =>
            a.order > b.order ? 1 : -1
        );
        setExudateAppearanceData(exudateAppearanceData);
        setExudateAppearanceText(
          exudateAppearanceData.map((x: { text: string }) => x.text)
        );
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getExudateContent();
  }, []);

  return (
    <div className="wound-exudate-component">
      {!isReviewAssessment ? (
        <div className="wound-exudate">
          <h2
            className="wound-exudate-header"
            data-testid="wound-exudate-header"
          >
            Wound Exudate
          </h2>
          <Grid container className="wound-exudate-grid-container" spacing={2}>
            <Grid className="wound-exudate-grid-item">
              <InputWithLabel
                label="Exudate Amount"
                testId="wound-exudate-amount"
                isRequired={true}
                error={data.exudateAmount.valid === ValidationStatus.INVALID}
              >
                <CustomDropDown
                  handleChange={validateAndSetData}
                  menuItem={exudateAmountText}
                  name="exudateAmount"
                  placeHolder="Select Exudate Amount"
                  selectpropsClassName={
                    data.exudateAmount.value
                      ? "wound-exudate-input"
                      : "placeHolder"
                  }
                  selectClassName={
                    data.exudateAmount.value
                      ? "wound-exudate-input"
                      : "placeHolder"
                  }
                  testId="wound-exudate-amount-select"
                  value={
                    data.exudateAmount.value
                      ? getTextFromCode(
                          exudateAmountData,
                          data.exudateAmount.value
                        )
                      : null
                  }
                />
              </InputWithLabel>
            </Grid>
            {data.exudateAppearance.required && (
              <Grid className="wound-exudate-grid-item">
                <InputWithLabel
                  label="Exudate Appearance"
                  isRequired={true}
                  error={
                    data.exudateAppearance.valid === ValidationStatus.INVALID
                  }
                  sx={{ marginTop: "16px" }}
                >
                  <CustomDropDown
                    handleChange={validateAndSetData}
                    menuItem={exudateAppearanceText}
                    name="exudateAppearance"
                    placeHolder="Select Exudate Appearance"
                    selectpropsClassName={
                      data.exudateAppearance.value
                        ? "wound-exudate-select"
                        : "placeHolder"
                    }
                    selectClassName={
                      data.exudateAppearance.value
                        ? "wound-exudate-input"
                        : "placeHolder"
                    }
                    testId="wound-exudate-appearance-select"
                    value={
                      data.exudateAppearance.value
                        ? getTextFromCode(
                            exudateAppearanceData,
                            data.exudateAppearance.value
                          )
                        : null
                    }
                  />
                </InputWithLabel>
              </Grid>
            )}
          </Grid>
        </div>
      ) : (
        <ReviewWoundExudate
          data={data}
          exudateAppearanceData={exudateAppearanceData}
          exudateAmountData={exudateAmountData}
          editButtonClicked={editButtonClicked}
          isWoundAssessmentSummary={isWoundAssessmentSummary}
        />
      )}
    </div>
  );
};
