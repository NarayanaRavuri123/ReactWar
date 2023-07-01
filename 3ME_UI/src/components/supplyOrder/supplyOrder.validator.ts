import { SupplyOrderContextType } from "../../context/SupplyOrderContext";
import {
  IInputField,
  Validation,
  ValidationStatus,
} from "../../core/interfaces/input.interface";
import { getDeepClone } from "../../util/ObjectFunctions";
import { Validator } from "../../util/order.validations";
import { getValidObj } from "../../util/utilityFunctions";
import { IDressingKit } from "../newOrder/newOrder.interface";

export class SupplyOrderValidator {
  private _validator;
  constructor(defValidator = new Validator()) {
    this._validator = defValidator;
  }

  private noValidation(txt: string): Validation {
    return getValidObj();
  }

  private fieldToMethodMapping(
    field: string
  ): ((txt: string) => Validation) | undefined {
    const mapping = new Map<string, (txt: string) => Validation>([
      ["typeOfOrder", this._validator.emptyCheck],
      ["provideAdditionalInfo", this._validator.supplyAdditionalInfoValidation],
      ["addressLine1", this._validator.addressLine1],
      ["addressLine2", this._validator.addressValidationWithEmpty],
      ["state", this._validator.emptyCheck],
      ["city", this._validator.cityValidation],
      ["zipCode", this._validator.facilityZipcodeValidation],
      ["resupplyJustification", this._validator.emptyCheck],
    ]);
    const validator = mapping.get(field);
    return validator ? validator : this.noValidation;
  }

  public validate(input: string, field: string) {
    try {
      const validator = this.fieldToMethodMapping(field)!;
      return validator(input);
    } catch (error) {
      console.log(`validator method for field ${field} is not configured`);
    }
  }
  public validateAll(supplyOrderObj: SupplyOrderContextType) {
    let temp = getDeepClone(supplyOrderObj.supplyOrderData);
    Object.keys(temp).forEach((x: string) => {
      if (
        temp[x].isOptional === true &&
        temp[x].valid !== ValidationStatus.VALID
      ) {
        temp[x].valid = ValidationStatus.VALID;
      } else if (temp[x].valid === ValidationStatus.UNTOUCHED) {
        temp[x].valid = ValidationStatus.INVALID;
      }
    });
    supplyOrderObj.setSupplyOrderData(temp);
    let supplySelectedResult = this.validateOrderSupplyProducts(
      supplyOrderObj,
      false
    );
    const ifAllValid = Object.keys(temp)
      .filter((x) => temp[x].valid)
      .every((x: string) => temp[x].valid === ValidationStatus.VALID);
    return ifAllValid && supplySelectedResult
      ? ValidationStatus.VALID
      : ValidationStatus.INVALID;
  }

  public validateOrderSupplyProducts(
    supplyOrderObj: SupplyOrderContextType,
    mandateFailValidation: boolean
  ) {
    let result = true;
    if (mandateFailValidation) {
      supplyOrderObj.setIsSuppliesSelected(true);
    } else {
      const showPrimaryDressing = supplyOrderObj.showSupplyOrderVacDressingKit;
      const showSecondaryDressing =
        supplyOrderObj.showSupplyOrderSecondaryVacDressingKit;
      const showCanister = supplyOrderObj.showSupplyOrderVacCanisterKit;
      // check for All products are empty
      if (
        !(
          showPrimaryDressing.showPrimaryDressingKit ||
          showSecondaryDressing.showSecondaryDressingKit
        ) &&
        !showCanister.showCanisterKit &&
        supplyOrderObj.accessory.accessories.length === 0
      ) {
        supplyOrderObj.setIsSuppliesSelected(false);
        return false;
      } else {
        // Check individual products
        let isPrimaryDressingValid = true;
        if (
          showPrimaryDressing.showPrimaryDressingKit &&
          !this.validatePrimaryDressingProduct(supplyOrderObj.dressingKit)
        ) {
          isPrimaryDressingValid = false;
        }
        let isSecondaryDressingValid = true;
        if (
          showSecondaryDressing.showSecondaryDressingKit &&
          !this.validateSecondaryDressingProduct(supplyOrderObj.dressingKit)
        ) {
          isSecondaryDressingValid = false;
        }

        let isCanisterValid = true;
        if (
          showCanister.showCanisterKit &&
          supplyOrderObj.canister.canisterProductName.value === ""
        ) {
          isCanisterValid = false;
        }
        let isAccessoriesValid = true;
        if (
          !(
            showPrimaryDressing.showPrimaryDressingKit ||
            showSecondaryDressing.showSecondaryDressingKit ||
            showCanister.showCanisterKit
          ) &&
          supplyOrderObj.accessory.accessories.length === 0
        ) {
          isAccessoriesValid = false;
        }
        result =
          isPrimaryDressingValid &&
          isSecondaryDressingValid &&
          isCanisterValid &&
          isAccessoriesValid;
      }
    }
    return result;
  }

  public validatePrimaryDressingProduct(primaryDressing: IDressingKit) {
    let result = true;
    if (
      primaryDressing.productName.valid !== ValidationStatus.VALID ||
      primaryDressing.productSizeName.valid !== ValidationStatus.VALID
    ) {
      if (primaryDressing.productName.valid !== ValidationStatus.VALID) {
        primaryDressing.productName.valid = ValidationStatus.INVALID;
      } else if (
        primaryDressing.productSizeName.valid !== ValidationStatus.VALID
      ) {
        primaryDressing.productSizeName.valid = ValidationStatus.INVALID;
      }
      result = false;
    }
    return result;
  }

  public validateSecondaryDressingProduct(secondaryDressing: IDressingKit) {
    let result = true;
    if (
      secondaryDressing.secProductName.valid !== ValidationStatus.VALID ||
      secondaryDressing.secProductSizeName.valid !== ValidationStatus.VALID
    ) {
      if (secondaryDressing.secProductName.valid !== ValidationStatus.VALID) {
        secondaryDressing.secProductName.valid = ValidationStatus.INVALID;
      } else if (
        secondaryDressing.secProductSizeName.valid !== ValidationStatus.VALID
      ) {
        secondaryDressing.secProductSizeName.valid = ValidationStatus.INVALID;
      }
      result = false;
    }
    return result;
  }
}
