import React, { useContext } from "react";
import { InputBase } from "@mui/material";
import { NewOrderValidator } from "../newOrder.validator";
import { CustomCheckBox } from "../../../core/checkBox/checkBox.component";
import { ValidationStatus } from "../../../core/interfaces/input.interface";
import { InputWithLabel } from "../../../core/inputWithLabel/inputWithLabel.component";
import { INewOrderWoundInfo } from "../newOrderWoundInfoStepper/newOrderWoundInfo.interface";
import "./previousTherapies.css";
import { PreviousTherapiesReviewOrder } from "./reviewOrder/previousTherapyReviewOrder.component";
import {
  NewOrderContext,
  NewOrderContextType,
} from "../../../context/NewOrderContext";
interface Props {
  editButtonClicked?: any;
  isOrderSummary?: boolean;
  isReviewOrder?: boolean;
  setWoundInfoData: Function;
  woundInfoData: INewOrderWoundInfo;
  Validator?: NewOrderValidator;
}

const PreviousTherapy = ({
  isReviewOrder = false,
  editButtonClicked,
  isOrderSummary = false,
  setWoundInfoData,
  woundInfoData,
  Validator = new NewOrderValidator(),
}: Props) => {
  const [validator] = React.useState<NewOrderValidator>(Validator!);
  const NewOrderObj = useContext<NewOrderContextType | null>(NewOrderContext);
  const validatePreviousTherapy = (e: any) => {
    NewOrderObj?.setIsHandleChangeTriggered(true);
    woundInfoData.previousTherapies.value.map((item: any) => {
      if (item.value === e.target.name) {
        item.selected = e.target.checked;
      }
      if (e.target.name === "Other" && e.target.checked) {
        woundInfoData.previousTherapyOther.required = true;
        woundInfoData.previousTherapyOther.value = "";
        woundInfoData.previousTherapyOther.valid = ValidationStatus.UNTOUCHED;
      } else if (e.target.name === "Other" && !e.target.checked) {
        woundInfoData.previousTherapyOther.required = false;
      }
      if (e.target.name === "None" && e.target.checked) {
        woundInfoData.previousTherapies.value
          .filter((item: any) => item.value !== "None")
          .map((item: any) => {
            item.selected = false;
          });
        woundInfoData.previousTherapyOther.required = false;
      } else {
        woundInfoData.previousTherapies.value
          .filter((item: any) => item.value === "None")
          .map((item: any) => {
            item.selected = false;
          });
      }
    });
    const isValid = validator.validate(
      woundInfoData.previousTherapies.value,
      "previousTherapies"
    );
    woundInfoData.previousTherapies.valid = isValid!.status!;
    setWoundInfoData(Object.assign({}, woundInfoData));
  };

  const validatePreviousTherapyCause = (e: any) => {
    NewOrderObj?.setIsHandleChangeTriggered(true);
    woundInfoData.previousTherapiesCauses.value.map((item: any) => {
      if (item.value === e.target.name) {
        item.selected = e.target.checked;
      }
      if (e.target.name === "Other" && e.target.checked) {
        woundInfoData.previousTherapiesCausesOther.required = true;
        woundInfoData.previousTherapiesCausesOther.value = "";
        woundInfoData.previousTherapiesCausesOther.valid =
          ValidationStatus.UNTOUCHED;
      } else if (e.target.name === "Other" && !e.target.checked) {
        woundInfoData.previousTherapiesCausesOther.required = false;
      }
    });
    const isValid = validator.validate(
      woundInfoData.previousTherapiesCauses.value,
      "previousTherapies"
    );
    woundInfoData.previousTherapiesCauses.valid = isValid!.status!;
    setWoundInfoData(Object.assign({}, woundInfoData));
  };

  const validateAndSetData = (e: any) => {
    NewOrderObj?.setIsHandleChangeTriggered(true);
    let value = e.target.value;
    let isValid = validator.validate(e.target.value, e.target.name);
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

  return (
    <div className="previous-therapy-main-container">
      {!isReviewOrder && (
        <div className="previous-therapy-component">
          <span className="woundinfo-title">Previous Therapies</span>
          <div
            data-testid="previousTherapyDesc"
            className={`woundinfo-desp${
              woundInfoData.previousTherapies.valid === ValidationStatus.INVALID
                ? "-error"
                : ""
            }`}
          >
            Indicate other therapies that have been previously tried and/or
            failed to maintain a moist wound environment.
            <span className="requiredStar">*</span>
          </div>
          <div className="previousTherapy-data">
            {
            woundInfoData.previousTherapies.value.map((x: any, index: any) => (
              <CustomCheckBox
                key={`pt${index.toString()}`}
                name={x.value}
                selectClassName="previousTherapiesCheckbox"
                selectpropsClassName="previousTherapiesCheckboxRoot"
                handleChange={validatePreviousTherapy}
                labelClassName={
                  x.selected
                    ? "chkBoxDescriptionText-active"
                    : "chkBoxDescriptionText"
                }
                checked={x.selected}
                value={x.value}
                required={
                  woundInfoData.previousTherapyOther.required &&
                  x.value === "Other"
                }
                labelText={x.label}
                testId={x.value}
              />
            ))}
            {woundInfoData.previousTherapyOther.required && (
              <InputWithLabel
                testId="previousTherapyOtherField"
                error={
                  woundInfoData.previousTherapyOther.valid ===
                  ValidationStatus.INVALID
                }
              >
                <InputBase
                  placeholder="Please Describe"
                  autoFocus={woundInfoData.previousTherapyOther.value === ""}
                  className="previousTherapy-other-input"
                  name="previousTherapyOther"
                  onChange={validateAndSetData}
                  value={woundInfoData.previousTherapyOther.value}
                />
              </InputWithLabel>
            )}
          </div>
          <div
            className={`woundinfo-out${
              woundInfoData.previousTherapiesCauses.valid ===
              ValidationStatus.INVALID
                ? "-error"
                : ""
            }`}
          >
            If other therapies were considered and ruled out, what conditions
            prevented you from using other therapies prior to applying V.A.C.®
            Therapy <span className="requiredStar">*</span>
          </div>
          <div className="previousTherapy-cause">
            {woundInfoData.previousTherapiesCauses.value.map(
              (x: any, index: number) => (
                <CustomCheckBox
                  name={x.value}
                  selectClassName="previousTherapiesCheckbox"
                  selectpropsClassName="previousTherapiesCheckboxRoot"
                  handleChange={validatePreviousTherapyCause}
                  labelClassName={
                    x.selected
                      ? "chkBoxDescriptionText-active"
                      : "chkBoxDescriptionText"
                  }
                  checked={x.selected}
                  value={x.value}
                  key={`ptc${index.toString()}`}
                  labelText={x.label}
                  testId={x.value}
                  required={
                    woundInfoData.previousTherapiesCausesOther.required &&
                    x.value === "Other"
                  }
                />
              )
            )}
            {woundInfoData.previousTherapiesCausesOther.required && (
              <InputWithLabel
                error={
                  woundInfoData.previousTherapiesCausesOther.valid ===
                  ValidationStatus.INVALID
                }
              >
                <InputBase
                  data-testid="previousTherapyCauseField"
                  placeholder="Please Describe"
                  autoFocus={
                    woundInfoData.previousTherapiesCausesOther.value === ""
                  }
                  className="previousTherapy-otherCause-input"
                  name="previousTherapiesCausesOther"
                  onChange={validateAndSetData}
                  value={woundInfoData.previousTherapiesCausesOther.value}
                />
              </InputWithLabel>
            )}
          </div>
        </div>
      )}
      {isReviewOrder && (
        <PreviousTherapiesReviewOrder
          editButtonClicked={editButtonClicked}
          isOrderSummary={isOrderSummary}
          woundInfoData={woundInfoData}
        />
      )}
    </div>
  );
};

export default PreviousTherapy;
