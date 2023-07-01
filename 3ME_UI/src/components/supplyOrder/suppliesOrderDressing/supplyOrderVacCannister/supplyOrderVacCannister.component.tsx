import "./supplyOrderVacCannister.css";
import { useContext, useState } from "react";
import { Button, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {
  SupplyOrderContext,
  SupplyOrderContextType,
} from "../../../../context/SupplyOrderContext";
import closeIcon from "../../../../assets/cross.svg";
import { ISupplyOrder } from "../../supplyOrder.interface";
import { ICanister } from "../../../newOrder/newOrder.interface";
import { SupplyOrderValidator } from "../../supplyOrder.validator";
import { PRODUCT_TYPE_CANISTER } from "../../../../util/staticText";
import { showSupplyOrderVacCanister } from "../../supplyOrder.model";
import { ValidationStatus } from "../../../../core/interfaces/input.interface";
import { getSupplyOrderSelectedVacProduct } from "../suppliesOrderDressing.common";
import { IVACProductInfo } from "../../patientVACDetail/patientVACDetail.interface";
import QuantityButton from "../../../../core/quantityButton/quantityButton.component";
import { ProductInformation } from "../../../newOrder/dressingSupplies/vacDressingKit/vacDressingKit.interface";

interface ISuppluOrderVacCannister {
  cannisterProduct: any;
  canister: ICanister;
  data: ISupplyOrder;
  replenishSupplyOrderData?: any;
  setCanister: Function;
  vacProductInfo: IVACProductInfo;
  Validator?: SupplyOrderValidator;
}

export const SupplyOrderVacCannister = ({
  canister,
  cannisterProduct,
  data,
  replenishSupplyOrderData,
  setCanister,
  vacProductInfo,
  Validator = new SupplyOrderValidator(),
}: ISuppluOrderVacCannister) => {
  const supplyOrderObj = useContext<SupplyOrderContextType | null>(
    SupplyOrderContext
  );
  const vacAllProducts = supplyOrderObj!.vacAllProducts;
  const [validator] = useState<SupplyOrderValidator>(Validator!);

  const updatePlusAndMinusButtonUserIntraction = (quantity: number) => {
    let suppleOrderObjRes: showSupplyOrderVacCanister =
      supplyOrderObj?.showSupplyOrderVacCanisterKit!;
    suppleOrderObjRes = {
      ...suppleOrderObjRes,
      isVacKitCanisterDisabled: quantity === 2,
      isVacKitCanisterMinusDisabled: quantity === 1,
    };
    supplyOrderObj?.setShowSupplyOrderVacCanisterKit(suppleOrderObjRes);
  };

  const handleVacKitDressingPlusClick = () => {
    const quantity = parseInt(canister.canisterProductQuantity.value) + 1;
    setCanister({
      ...canister,
      canisterProductQuantity: {
        value: quantity.toString(),
        valid: ValidationStatus.VALID,
      },
    });
    updatePlusAndMinusButtonUserIntraction(quantity);
  };

  const handleVacKitDressingMinusClick = () => {
    const quantity = parseInt(canister.canisterProductQuantity.value) - 1;
    setCanister({
      ...canister,
      canisterProductQuantity: {
        value: quantity.toString(),
        valid: ValidationStatus.VALID,
      },
    });
    updatePlusAndMinusButtonUserIntraction(quantity);
  };

  const handleAddCanisterClick = () => {
    const vacCanisterReplenishData = replenishSupplyOrderData?.filter(
      (x: any) => x.type === PRODUCT_TYPE_CANISTER
    );
    if (vacCanisterReplenishData && vacCanisterReplenishData.length > 0) {
      const canisterReplenishData = vacCanisterReplenishData[0];
      supplyOrderCanisterKitMapper(
        canisterReplenishData.code,
        canisterReplenishData.quantity.split("-")[0].trim()
      );
    } else {
      let canister = getCannisterProduct();
      supplyOrderCanisterKitMapper(canister.sku, "1");
    }
    validator.validateOrderSupplyProducts(supplyOrderObj!, true);
  };

  const supplyOrderCanisterKitMapper = (
    code: string,
    canisterQuantity: string
  ) => {
    let selectedProduct = getSupplyOrderSelectedVacProduct(
      code,
      vacAllProducts
    )! as ProductInformation;
    if (!selectedProduct) {
      return;
    }
    let quantity = data.typeOfOrder.value === "Yes" ? canisterQuantity : "1";
    let mapperRes;
    let suppleOrderObjRes: showSupplyOrderVacCanister =
      supplyOrderObj?.showSupplyOrderVacCanisterKit!;
    mapperRes = {
      ...canister,
      canisterProductID: {
        valid: ValidationStatus.VALID,
        value: selectedProduct.productID,
      },
      canisterProductCode: {
        valid: ValidationStatus.VALID,
        value: selectedProduct.sku,
      },
      canisterProductName: {
        valid: ValidationStatus.VALID,
        value: selectedProduct.productName,
      },
      canisterProductQuantity: {
        valid: ValidationStatus.VALID,
        value: quantity,
      },
    };
    suppleOrderObjRes = {
      ...suppleOrderObjRes,
      showSize: true,
      showQunatity: true,
      showCanisterKit: true,
      isVacKitCanisterDisabled: quantity === "2",
      isVacKitCanisterMinusDisabled: quantity === "1",
      showAddDressingBtn: false,
    };
    supplyOrderObj?.setShowSupplyOrderVacCanisterKit(suppleOrderObjRes);
    setCanister(mapperRes);
  };

  const handleCloseIcon = () => {
    resetCannister();
    let suppleOrderObjRes: showSupplyOrderVacCanister =
      supplyOrderObj?.showSupplyOrderVacCanisterKit!;
    suppleOrderObjRes = {
      ...suppleOrderObjRes,
      showSize: false,
      showQunatity: false,
      showCanisterKit: false,
      isVacKitCanisterDisabled: true,
      isVacKitCanisterMinusDisabled: true,
      showAddDressingBtn: true,
    };
    supplyOrderObj?.setShowSupplyOrderVacCanisterKit(suppleOrderObjRes);
  };

  const resetCannister = () => {
    setCanister({
      canisterProductName: {
        value: "",
        valid: ValidationStatus.VALID,
      },
      canisterProductCode: { value: "", valid: ValidationStatus.VALID },
      canisterProductID: {
        value: "",
        valid: ValidationStatus.VALID,
      },
      canisterProductQuantity: { value: "", valid: ValidationStatus.VALID },
    });
  };

  const getCannisterProduct = (): any => {
    let canister: { productName: any; productCode: any } | null = null;
    if (cannisterProduct.length > 0) {
      if (vacProductInfo.brandName.toLowerCase().includes("freedom")) {
        canister = cannisterProduct.filter((x: any) =>
          x.productName.toLowerCase().includes("freedom")
        )[0];
      } else {
        canister = cannisterProduct.filter(
          (x: any) => !x.productName.toLowerCase().includes("freedom")
        )[0];
      }
    }
    return canister;
  };

  return (
    <div
      className={`supply-cannisterKitInfo ${
        !supplyOrderObj?.isSuppliesSelected
          ? `supply-cannisterKitInfoError`
          : ``
      }`}
    >
      <h2
        className="supply-cannisterKitHeader"
        data-testid="cannisterKitHeaderTest"
      >
        3M™ V.A.C.® Canisters
      </h2>
      {supplyOrderObj?.showSupplyOrderVacCanisterKit.showCanisterKit && (
        <>
          <Grid
            className="currentCannisterMainGrid"
            container
            display="flex"
            flexDirection="row"
          >
            <Grid className="cannisterLabel" item xs={11}>
              <div className="cannisterTypeHeader">
                <span className="cannisterType">Canister Type</span>
                <p className="cannisterBody" data-testid="cannisterBodyTest">
                  {supplyOrderObj?.canister.canisterProductName.value}
                </p>
              </div>
            </Grid>
            <Grid item xs={1}>
              <img
                onClick={handleCloseIcon}
                src={closeIcon}
                alt={closeIcon}
                className="canisterKitCloseBtn"
              />
            </Grid>
          </Grid>
          <Grid className="currentCannisterMainGrid">
            <Grid item xs={8.75} className="cannisterLabel">
              <div>
                <label
                  className="cannisterQuantityLabel"
                  data-testid="cannisterQuantityLabelTest"
                >
                  Quantity (5 canisters per case)
                </label>
              </div>
              <p className="cannisterSubLabel">Max 2 cases</p>
            </Grid>
            <Grid item xs={3}>
              <QuantityButton
                value={canister.canisterProductQuantity.value}
                onPlusClick={handleVacKitDressingPlusClick}
                onMinusClick={handleVacKitDressingMinusClick}
                isPlusDisabled={
                  supplyOrderObj?.showSupplyOrderVacCanisterKit
                    .isVacKitCanisterDisabled
                }
                isMinusDisabled={
                  supplyOrderObj?.showSupplyOrderVacCanisterKit
                    .isVacKitCanisterMinusDisabled
                }
                showLabel={false}
              />
            </Grid>
          </Grid>
        </>
      )}
      {supplyOrderObj?.showSupplyOrderVacCanisterKit.showAddDressingBtn && (
        <Grid className="supplyOrderCannisterBtnGrid">
          <Grid item xs={12}>
            <Button
              classes={{ root: "supplyOrder-canister-add-button" }}
              data-testid="supply-canister-add-button"
              onClick={handleAddCanisterClick}
              startIcon={<AddIcon classes={{ root: "dressingadd-icon" }} />}
            >
              Add Canisters
            </Button>
          </Grid>
        </Grid>
      )}
    </div>
  );
};
