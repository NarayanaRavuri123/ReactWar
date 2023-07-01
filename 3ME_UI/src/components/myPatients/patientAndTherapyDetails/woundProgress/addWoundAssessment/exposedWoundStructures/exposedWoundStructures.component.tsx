import { Grid } from "@mui/material";
import { CustomCheckBox } from "../../../../../../core/checkBox/checkBox.component";
import { ValidationStatus } from "../../../../../../core/interfaces/input.interface";
import { WoundExposedStructuresProps } from "./exposedWoundStructures.interface";
import "./exposedWoundStructures.css";
import { IAddWoundAssessment } from "../addWoundAssessment.interface";
import ReviewWoundExposedStructures from "./reviewWoundExposedStructures/reviewWoundExposedStructures.component";

export const ExposedWoundStructures = ({
  setExposedWoundInfoData,
  exposedWoundInfoData,
  isReviewAssessment = false,
  editButtonClicked,
  isWoundAssessmentSummary,
}: WoundExposedStructuresProps) => {
  const validateAndSetData = (e: any) => {
    const { name, checked } = e.target;
    const updatedData = exposedWoundInfoData.exposedStructures.value.map(
      (item: any) =>
        item.value === name ? { ...item, selected: checked } : { ...item }
    );

    setExposedWoundInfoData({
      ...exposedWoundInfoData,
      exposedStructures: {
        value: updatedData,
        valid: ValidationStatus.VALID,
        required: false,
      },
    });
  };

  return (
    <div className="wound-exposed-component">
      {!isReviewAssessment ? (
        <div className="wound-exposed-main-container">
          <Grid
            container
            className="wound-exposed-container"
            data-testid="wound-exposed-container"
          >
            <Grid item>
              <div
                className="wound-exposed-header"
                data-testid="wound-exposed-header"
              >
                Exposed Structures
              </div>
              <div className="woundExposed">
                {exposedWoundInfoData.exposedStructures.value.map(
                  (x: any, ix: any) => (
                    <CustomCheckBox
                      name={x.value}
                      selectClassName="wound-exposed-structures"
                      selectpropsClassName="wound-exposed-structures-props"
                      handleChange={validateAndSetData}
                      labelClassName={
                        x.selected
                          ? "wound-exposed-structures-checked"
                          : "wound-exposed-structures-unchecked"
                      }
                      checked={x.selected}
                      value={x.value}
                      key={ix}
                      required={exposedWoundInfoData.exposedStructures.required}
                      labelText={x.label}
                      testId={x.value}
                    />
                  )
                )}
              </div>
            </Grid>
          </Grid>
        </div>
      ) : (
        <ReviewWoundExposedStructures
          data={exposedWoundInfoData}
          editButtonClicked={editButtonClicked}
          isWoundAssessmentSummary={isWoundAssessmentSummary}
        />
      )}
    </div>
  );
};
