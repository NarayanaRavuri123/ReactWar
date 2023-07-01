import React from "react";
import { IAddWoundAssessment } from "../addWoundAssessment.interface";
import { AddWoundAssessmentValidator } from "../addWoundAssessment.validator";
import "./woundAssessComorbidities.css";
import { ValidationStatus } from "../../../../../../core/interfaces/input.interface";
import { CustomCheckBox } from "../../../../../../core/checkBox/checkBox.component";
import { InputWithLabel } from "../../../../../../core/inputWithLabel/inputWithLabel.component";
import { getDeepClone } from "../../../../../../util/ObjectFunctions";
import { woundAssessComorboditiesData } from "./woundAssessComorbodities.data";
import ReviewWoundComorbidities from "./reviewWoundAssessmentComorbidities/reviewWoundAssessmentComorbidities.component";

type Props = {
  setData: React.Dispatch<React.SetStateAction<IAddWoundAssessment>>;
  data: IAddWoundAssessment;
  Validator?: AddWoundAssessmentValidator;
  isReviewAssessment?: boolean;
  editButtonClicked?: any;
  isWoundAssessmentSummary?: any;
};

const WoundAssessComorbidities = ({
  setData,
  data,
  isReviewAssessment = false,
  editButtonClicked,
  isWoundAssessmentSummary,
}: Props) => {
  const validateAndDisable = () => {
    let result = false;
    data?.woundAssessComorbodities.value.map((x: any) => {
      if (x.label === "Not applicable (N/A)" && x.selected === true) {
        result = true;
      }
    });
    return result;
  };

  const validateAssessComorbidities = (e: any) => {
    if (e.target.name === "Not applicable (N/A)") {
      data.woundAssessComorbodities.value = getDeepClone(
        woundAssessComorboditiesData
      );
    } else {
      data?.woundAssessComorbodities.value.map((x: any) => {
        if (x.label === "Not applicable (N/A)") {
          x.selected = false;
        }
      });
    }
    data?.woundAssessComorbodities.value.map((item: any) => {
      if (item.value === e.target.name) {
        item.selected = e.target.checked;
      }
    });
    const valid = data?.woundAssessComorbodities.value.every(
      (x: any) => x.selected === false
    );
    setData({
      ...data,
      woundAssessComorbodities: {
        valid: valid ? ValidationStatus.INVALID : ValidationStatus.VALID,
        value: data.woundAssessComorbodities.value,
        required: true,
      },
    });
  };

  return (
    <div className="assess-comorbidities-component">
      {!isReviewAssessment ? (
        <div className="assesscomorbidities">
          <div
            className="assesscomorbidities-title"
            data-testid="assesscomorbidities-title"
          >
            Comorbidities
          </div>
          <InputWithLabel
            label="Which of the following comorbidities apply?"
            isRequired={data?.woundAssessComorbodities.required}
            error={
              data?.woundAssessComorbodities.valid === ValidationStatus.INVALID
            }
            labelClassName="assesscomorbidities-header"
            testId="assesscomorbidities-header"
          >
            <div className="assesscomorbidities-check-block">
              {data?.woundAssessComorbodities.value.map(
                (x: any, index: any) => (
                  <div className="assesscomorbidities-checkbox-item">
                    <CustomCheckBox
                      name={x.value}
                      selectClassName="assesscomorbidities-checkbox"
                      selectpropsClassName="assesscomorbidities-checkbox-root"
                      handleChange={validateAssessComorbidities}
                      labelClassName={
                        x.value !== "Not applicable (N/A)" &&
                        validateAndDisable()
                          ? "assesscomorbidities-checkbox-description-text-disable"
                          : x.selected
                          ? "assesscomorbidities-checkbox-description-text-active"
                          : "assesscomorbidities-checkbox-description-text"
                      }
                      checked={x.selected}
                      value={x.value}
                      key={index}
                      required={false}
                      labelText={x.label}
                      testId={x.value}
                      isDisabled={
                        x.value !== "Not applicable (N/A)" &&
                        validateAndDisable()
                      }
                    />
                  </div>
                )
              )}
            </div>
          </InputWithLabel>
        </div>
      ) : (
        <ReviewWoundComorbidities
          data={data}
          editButtonClicked={editButtonClicked}
          isWoundAssessmentSummary={isWoundAssessmentSummary}
        />
      )}
    </div>
  );
};

export default WoundAssessComorbidities;
