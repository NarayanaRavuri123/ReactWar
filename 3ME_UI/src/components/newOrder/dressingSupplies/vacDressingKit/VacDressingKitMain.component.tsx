import { Grid } from "@mui/material";
import React from "react";
import { CustomDropDown } from "../../../../core/customDropdown/customDropdown.component";
import { InputWithLabel } from "../../../../core/inputWithLabel/inputWithLabel.component";
import {
  IInputField,
  ValidationStatus,
} from "../../../../core/interfaces/input.interface";
import QuantityButton from "../../../../core/quantityButton/quantityButton.component";
import closeIcon from "../../../../assets/cross.svg";
import "./vacDressingKit.css";

interface IVacDressingSub {
  validateAndSetData: any;
  vacProducts: any;
  handleCloseIcon: any;
  validateAndSetSize: any;
  showSize: any;
  vacProductSize: any;
  showQunatity: any;
  handleVacKitDressingPlusClick: any;
  handleVacKitDressingMinusClick: any;
  isVacKitDressingPlusDisabled: any;
  isVacKitDressingMinusDisabled: any;
  productName: IInputField;
  productSizeName: IInputField;
  ProductQuantityCode: IInputField;
  productLableName: any;
  productSizeLabelName: any;
  disableDropdown?: boolean;
}

export const VacDressing = ({
  validateAndSetData,
  vacProducts,
  handleCloseIcon,
  validateAndSetSize,
  showSize,
  vacProductSize,
  showQunatity,
  handleVacKitDressingPlusClick,
  handleVacKitDressingMinusClick,
  isVacKitDressingPlusDisabled,
  isVacKitDressingMinusDisabled,
  productName,
  productSizeName,
  ProductQuantityCode,
  productLableName,
  productSizeLabelName,
  disableDropdown = false,
}: IVacDressingSub) => {
  return (
    <div>
      <Grid
        container
        display="flex"
        flexDirection="row"
        className="mainGridDressing"
      >
        <Grid item xs={11} className="vacDressingDropdown">
          <InputWithLabel
            label="Dressing Kit"
            isRequired={true}
            error={productName.valid === ValidationStatus.INVALID}
            testId="DressingKitComponentTest"
          >
            <CustomDropDown
              disabled={disableDropdown}
              handleChange={(e: any, param: any) =>
                validateAndSetData(e, param)
              }
              menuItem={[]}
              name={productLableName}
              placeHolder="Select a dressing"
              selectClassName={
                productName.value
                  ? "dressing-kitdropdown-input"
                  : "dressingplaceHolder"
              }
              selectpropsClassName={
                productName.value
                  ? "dressingKit-type-select"
                  : "dressingplaceHolder"
              }
              value={productName.value}
              dropDownMenuObj={vacProducts}
              hasBothCodeValue={true}
            />
          </InputWithLabel>
        </Grid>
        {!disableDropdown && (
          <Grid item xs={1}>
            <img
              onClick={handleCloseIcon}
              src={closeIcon}
              alt={closeIcon}
              className="dressingKitCloseBtn"
            />
          </Grid>
        )}
      </Grid>
      {showSize && (
        <Grid container className="dressingSizeKit">
          <Grid item xs={11}>
            <InputWithLabel
              label="Dressing Size"
              isRequired={true}
              error={productSizeName.valid === ValidationStatus.INVALID}
              testId="dressingKitSizeDropdownTest"
            >
              <CustomDropDown
                disabled={disableDropdown}
                handleChange={(e: any, param: any) =>
                  validateAndSetSize(e, param)
                }
                menuItem={[]}
                name={productSizeLabelName}
                placeHolder="Select a size"
                selectClassName={
                  productSizeName.value
                    ? "dressing-kitdropdown-input"
                    : "dressingplaceHolder"
                }
                selectpropsClassName={
                  productSizeName.value
                    ? "dressingKit-type-select"
                    : "dressingplaceHolder"
                }
                value={productSizeName.value}
                dropDownMenuObj={vacProductSize}
                hasBothCodeValue={true}
              />
            </InputWithLabel>
          </Grid>
        </Grid>
      )}
      {showQunatity && (
        <Grid className="currentMainGrid">
          <Grid item xs={8.5} className="dressingLabel">
            <div>
              <label
                className="dressingKitLabel"
                data-testid="dressingKitTestQunatityLabel"
              >
                Quantity (5 units per case)
              </label>
            </div>

            <p className="dressKitSubLabel">Max 3 cases</p>
          </Grid>
          <Grid item xs={3}>
            <QuantityButton
              value={ProductQuantityCode.value}
              onPlusClick={handleVacKitDressingPlusClick}
              onMinusClick={handleVacKitDressingMinusClick}
              isPlusDisabled={isVacKitDressingPlusDisabled}
              isMinusDisabled={isVacKitDressingMinusDisabled}
              showLabel={false}
            />
          </Grid>
        </Grid>
      )}
    </div>
  );
};
