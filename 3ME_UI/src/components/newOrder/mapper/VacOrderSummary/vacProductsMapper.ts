import { ValidationStatus } from "../../../../core/interfaces/input.interface";
import { ProductInformation } from "../../dressingSupplies/vacDressingKit/vacDressingKit.interface";
import { IDressingKit } from "../../newOrder.interface";
import { VacOrderSummaryData } from "./newOrderResponseMapper.interface";

export const vacPrimaryDressingKitMapper = (
  vacOrderSummary: VacOrderSummaryData,
  dressingMapperRes: IDressingKit,
  vacAllProducts: any,
  NewOrderObj: any
) => {
  let selectedProduct = getSelectedVacProduct(
    vacOrderSummary.mainDressing.sku,
    vacAllProducts
  )! as ProductInformation;
  dressingMapperRes = {
    ...dressingMapperRes,
    productId: {
      valid: ValidationStatus.VALID,
      value: selectedProduct.sku,
    },
    productCode: {
      valid: ValidationStatus.VALID,
      value: selectedProduct.sku,
    },
    productName: {
      valid: ValidationStatus.VALID,
      value: selectedProduct.productName,
    },
    productQuantity: {
      valid: ValidationStatus.VALID,
      value: vacOrderSummary.mainDressing.quantity.toString(),
    },
  };
  NewOrderObj?.setShowSize(false);
  if (selectedProduct.sizes && selectedProduct.hasMultipleSize) {
    const selectedSizeProduct = selectedProduct.sizes.filter(
      (x) => x.sku === vacOrderSummary.mainDressing.sku
    )[0];
    dressingMapperRes = {
      ...dressingMapperRes,
      productSizeID: {
        valid: ValidationStatus.VALID,
        value: selectedSizeProduct.sku,
      },
      productSizeCode: {
        valid: ValidationStatus.VALID,
        value: selectedSizeProduct.sku,
      },
      productSizeName: {
        valid: ValidationStatus.VALID,
        value: selectedSizeProduct.name,
      },
    };
    NewOrderObj?.setShowSize(true);
  } else {
    dressingMapperRes = {
      ...dressingMapperRes,
      productSizeID: {
        valid: ValidationStatus.VALID,
        value: "",
      },
      productSizeCode: {
        valid: ValidationStatus.VALID,
        value: "",
      },
      productSizeName: {
        valid: ValidationStatus.VALID,
        value: "",
      },
    };
  }
  if (vacOrderSummary.mainDressing.quantity === 3) {
    NewOrderObj?.setIsPrimaryVacKitDressingPlusDisabled(true);
    NewOrderObj?.setIsPrimaryVacKitDressingMinusDisabled(false);
  }
  if (vacOrderSummary.mainDressing.quantity === 1) {
    NewOrderObj?.setIsPrimaryVacKitDressingMinusDisabled(true);
    NewOrderObj?.setIsPrimaryVacKitDressingPlusDisabled(false);
  }

  NewOrderObj?.setshowQunatity(true);

  return dressingMapperRes;
};

export const vacSecondaryDressingKitMapper = (
  vacOrderSummary: VacOrderSummaryData,
  dressingMapperRes: IDressingKit,
  vacAllProducts: any,
  NewOrderObj: any
) => {
  let selectedProduct = getSelectedVacProduct(
    vacOrderSummary.additionalDressing.sku,
    vacAllProducts
  )! as ProductInformation;

  dressingMapperRes = {
    ...dressingMapperRes,
    secProductId: {
      valid: ValidationStatus.VALID,
      value: selectedProduct.sku,
    },
    secProductCode: {
      valid: ValidationStatus.VALID,
      value: selectedProduct.sku,
    },
    secProductName: {
      valid: ValidationStatus.VALID,
      value: selectedProduct.productName,
    },
    secProductQuantity: {
      valid: ValidationStatus.VALID,
      value: vacOrderSummary.additionalDressing.quantity.toString(),
    },
  };
  NewOrderObj?.setShowSecSize(false);
  if (selectedProduct.sizes && selectedProduct.hasMultipleSize) {
    const selectedSizeProduct = selectedProduct.sizes.filter(
      (x) => x.sku === vacOrderSummary.additionalDressing.sku
    )[0];
    dressingMapperRes = {
      ...dressingMapperRes,
      secProductSizeID: {
        valid: ValidationStatus.VALID,
        value: selectedSizeProduct.sku,
      },
      secProductSizeCode: {
        valid: ValidationStatus.VALID,
        value: selectedSizeProduct.sku,
      },
      secProductSizeName: {
        valid: ValidationStatus.VALID,
        value: selectedSizeProduct.name,
      },
    };
    NewOrderObj?.setShowSecSize(true);
  }
  if (vacOrderSummary.additionalDressing.quantity === 3) {
    NewOrderObj?.setIsSecondaryVacKitDressingPlusDisabled(true);
    NewOrderObj?.setIsSecondaryVacKitDressingMinusDisabled(false);
  }
  if (vacOrderSummary.additionalDressing.quantity === 1) {
    NewOrderObj?.setIsSecondaryVacKitDressingMinusDisabled(true);
    NewOrderObj?.setIsSecondaryVacKitDressingPlusDisabled(false);
  }
  NewOrderObj?.setShowSecondaryDressingKit(true);

  NewOrderObj?.setshowSecQunatity(true);

  return dressingMapperRes;
};

export const vacCannisterMapper = (
  vacOrderSummary: VacOrderSummaryData,
  NewOrderObj: any
) => {
  if (!vacOrderSummary.isFromReadyCare) {
    if (vacOrderSummary.canister && vacOrderSummary.canister.quantity === 2) {
      NewOrderObj?.setIsCannisterProductPlusDisabled(true);
      NewOrderObj?.setIsCannisterProductMinusDisabled(false);
    }
    if (vacOrderSummary.canister && vacOrderSummary.canister.quantity === 1) {
      NewOrderObj?.setIsCannisterProductPlusDisabled(false);
      NewOrderObj?.setIsCannisterProductMinusDisabled(true);
    }
  }
};

export const getSelectedVacProduct = (
  productCode: string,
  vacAllProducts: any
) => {
  let obj;

  vacAllProducts?.map((element: any) => {
    if (element.sku === productCode) {
      obj = element;
    } else if (element.sizes) {
      element.sizes.forEach((sa: any) => {
        if (sa.sku === productCode) {
          obj = element;
        }
      });
    }
  });

  return obj;
};
