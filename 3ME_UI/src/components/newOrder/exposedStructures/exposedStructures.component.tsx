import "./exposedStructures.css";
import { Grid } from "@mui/material";
import { NewOrderValidator } from "../newOrder.validator";
import { ExposedStructuresProps } from "./exposedStructures.interface";
import { CustomCheckBox } from "../../../core/checkBox/checkBox.component";
import { ValidationStatus } from "../../../core/interfaces/input.interface";
import { InputWithLabel } from "../../../core/inputWithLabel/inputWithLabel.component";
import { ExposedStructuresReviewOrder } from "./reviewOrder/exposedStructuresReviewOrder.component";
import { useContext } from "react";
import {
  NewOrderContext,
  NewOrderContextType,
} from "../../../context/NewOrderContext";

export const ExposedStructures = ({
  editButtonClicked,
  isReviewOrder = false,
  isOrderSummary = false,
  isSecondaryWoundInfo,
  setWoundInfoData,
  woundInfoData,
  Validator = new NewOrderValidator(),
}: ExposedStructuresProps) => {
  const NewOrderObj = useContext<NewOrderContextType | null>(NewOrderContext);
  const validateAndSetData = (e: any) => {
    const { name, checked } = e.target;
    NewOrderObj?.setIsHandleChangeTriggered(true);
    const updatedData = woundInfoData.exposedStructures.value.map((item: any) =>
      item.value === name ? { ...item, selected: checked } : { ...item }
    );
    setWoundInfoData(
      Object.assign({}, woundInfoData, {
        exposedStructures: {
          value: updatedData,
          valid: ValidationStatus.VALID,
          required: false,
        },
      })
    );
  };

  return (
    <div
      className={
        isSecondaryWoundInfo
          ? "exposed-structures-main-container-sec"
          : "exposed-structures-main-container"
      }
    >
      {!isReviewOrder && (
        <Grid
          container
          className="exposed-container"
          data-testid="exposed-container"
        >
          <Grid item>
            <Grid item>
              <div className="exposed-header" data-testid="exposed-header">
                Exposed Structures
              </div>
              <InputWithLabel isRequired={false} label="" error={false}>
                {woundInfoData.exposedStructures.value.map(
                  (x: any, ix: any) => (
                    <CustomCheckBox
                      name={x.value}
                      selectClassName="exposed-structures"
                      selectpropsClassName="exposed-structures-props"
                      handleChange={validateAndSetData}
                      labelClassName={
                        x.selected
                          ? "exposed-structures-checked"
                          : "exposed-structures-unchecked"
                      }
                      checked={x.selected}
                      value={x.value}
                      key={ix}
                      required={woundInfoData.exposedStructures.required}
                      labelText={x.label}
                      testId={x.value}
                    />
                  )
                )}
              </InputWithLabel>
            </Grid>
          </Grid>
        </Grid>
      )}
      {isReviewOrder && (
        <ExposedStructuresReviewOrder
          editButtonClicked={editButtonClicked}
          isOrderSummary={isOrderSummary}
          woundInfoData={woundInfoData}
        />
      )}
    </div>
  );
};
