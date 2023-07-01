import React, { useContext } from "react";
import "./comorbodities.css";
import { InputBase } from "@mui/material";
import { NewOrderValidator } from "../newOrder.validator";
import { CustomCheckBox } from "../../../core/checkBox/checkBox.component";
import { ValidationStatus } from "../../../core/interfaces/input.interface";
import { InputWithLabel } from "../../../core/inputWithLabel/inputWithLabel.component";
import { ComorboditiesReviewOrder } from "./reviewOrder/comorboditiesReviewOrder.component";
import { INewOrderWoundInfo } from "../newOrderWoundInfoStepper/newOrderWoundInfo.interface";
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
const Comorbodities = ({
  isReviewOrder = false,
  editButtonClicked,
  isOrderSummary = false,
  setWoundInfoData,
  woundInfoData,
  Validator = new NewOrderValidator(),
}: Props) => {
  const [validator] = React.useState<NewOrderValidator>(Validator!);
  const NewOrderObj = useContext<NewOrderContextType | null>(NewOrderContext);
  const validatecomorbodities = (e: any) => {
    NewOrderObj?.setIsHandleChangeTriggered(true);
    woundInfoData.wndInfoComorbidities.value.map((item: any) => {
      if (item.value === e.target.name) {
        item.selected = e.target.checked;
      }
      if (e.target.name === "Other" && e.target.checked) {
        woundInfoData.wndInfoComorbiditiesOther.required = true;
        woundInfoData.wndInfoComorbiditiesOther.value = "";
        woundInfoData.wndInfoComorbiditiesOther.valid =
          ValidationStatus.UNTOUCHED;
      } else if (e.target.name === "Other" && !e.target.checked) {
        woundInfoData.wndInfoComorbiditiesOther.required = false;
      }
    });
    const isValid = validator.validate(
      woundInfoData.wndInfoComorbidities.value,
      "wndInfocomorbodities"
    );
    woundInfoData.wndInfoComorbidities.valid = isValid!.status!;
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
    <div className="comorbodities-main-container">
      {!isReviewOrder && (
        <div className="comMaincContainer">
          <span className="woundinfocom-title">Comorbidities</span>
          <div className="comorbodities-data">
            <InputWithLabel
              isRequired={true}
              label="Which of the following comorbidities apply?"
              error={
                woundInfoData.wndInfoComorbidities.valid ===
                ValidationStatus.INVALID
              }
            >
              <div className="comorbodities-data">
                {woundInfoData.wndInfoComorbidities.value.map(
                  (x: any, index: any) => (
                    <CustomCheckBox
                      name={x.value}
                      selectClassName="comorboditiesCheckbox"
                      selectpropsClassName="comorboditiesCheckboxRoot"
                      handleChange={validatecomorbodities}
                      labelClassName={
                        x.selected
                          ? "comorboditieschkBoxDescriptionText-active"
                          : "comorboditieschkBoxDescriptionText"
                      }
                      checked={x.selected}
                      value={x.value}
                      key={index}
                      required={
                        woundInfoData.wndInfoComorbiditiesOther.required &&
                        x.value === "Other"
                      }
                      labelText={x.label}
                      testId={x.value}
                    />
                  )
                )}
                {woundInfoData.wndInfoComorbiditiesOther.required && (
                  <InputWithLabel
                    testId=""
                    error={
                      woundInfoData.wndInfoComorbiditiesOther.valid ===
                      ValidationStatus.INVALID
                    }
                  >
                    <InputBase
                      placeholder="Please Describe"
                      autoFocus={
                        woundInfoData.wndInfoComorbiditiesOther.value === ""
                      }
                      className="comorbodities-other-input"
                      name="wndInfoComorbiditiesOther"
                      onChange={validateAndSetData}
                      value={woundInfoData.wndInfoComorbiditiesOther.value}
                    />
                  </InputWithLabel>
                )}
              </div>
            </InputWithLabel>
          </div>
        </div>
      )}
      {isReviewOrder && (
        <ComorboditiesReviewOrder
          editButtonClicked={editButtonClicked}
          isOrderSummary={isOrderSummary}
          woundInfoData={woundInfoData}
        />
      )}
    </div>
  );
};

export default Comorbodities;
