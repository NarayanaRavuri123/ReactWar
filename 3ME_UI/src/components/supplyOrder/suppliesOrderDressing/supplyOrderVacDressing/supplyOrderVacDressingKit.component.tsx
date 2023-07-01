import {
  showSupplyOrderSecondaryVacDressing,
  showSupplyOrderVacDressing,
} from "../../supplyOrder.model";
import { useContext, useState } from "react";
import "./supplyOrderVacDressing.css";
import { Button, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {
  SupplyOrderContext,
  SupplyOrderContextType,
} from "../../../../context/SupplyOrderContext";
import { ISupplyOrder } from "../../supplyOrder.interface";
import { SupplyOrderValidator } from "../../supplyOrder.validator";
import { IDressingKit } from "../../../newOrder/newOrder.interface";
import { ValidationStatus } from "../../../../core/interfaces/input.interface";
import { IVACProductInfo } from "../../patientVACDetail/patientVACDetail.interface";
import { SupplyOrderVacCannister } from "../supplyOrderVacCannister/supplyOrderVacCannister.component";
import { VacDressing } from "../../../newOrder/dressingSupplies/vacDressingKit/VacDressingKitMain.component";

interface ISupplyOrderVacDressingKit {
  cannisterProduct: any;
  data: ISupplyOrder;
  setVacProductSize: any;
  setVacSecondaryProductSize: any;
  vacProductInfo: IVACProductInfo;
  vacProducts?: any;
  vacProductSize: any;
  vacSecondaryProductSize: any;
  Validator?: SupplyOrderValidator;
}

export const SupplyOrderVacDressingKit = ({
  cannisterProduct,
  data,
  setVacProductSize,
  setVacSecondaryProductSize,
  vacProductInfo,
  vacProducts,
  vacProductSize,
  vacSecondaryProductSize,
  Validator = new SupplyOrderValidator(),
}: ISupplyOrderVacDressingKit) => {
  const supplyOrderObj = useContext<SupplyOrderContextType | null>(
    SupplyOrderContext
  );
  const replenishSupplyOrderData = supplyOrderObj!.replenishSupplyOrderData;
  const canister = supplyOrderObj!.canister;
  const dressing = supplyOrderObj!.dressingKit;
  const setCanister = supplyOrderObj!.setCanister;
  const setDressing = supplyOrderObj!.setDressingKit;
  const vacAllProducts = supplyOrderObj!.vacAllProducts;
  const [validator] = useState<SupplyOrderValidator>(Validator!);

  const setProductSizeDropDown = (selectedVac: any, type: string) => {
    const vacProducts = selectedVac?.sizes.map(
      (x: { name: any; sku: any }) => ({
        id: x.sku,
        code: x.sku,
        text: x.name,
      })
    )!;
    if (type === "primary") {
      setVacProductSize(vacProducts);
    } else {
      setVacSecondaryProductSize(vacProducts);
    }
  };

  const validateAndSetData = (e: any, param: any, type: string) => {
    let response: showSupplyOrderVacDressing =
      supplyOrderObj?.showSupplyOrderVacDressingKit!;
    let secResponse: showSupplyOrderSecondaryVacDressing =
      supplyOrderObj?.showSupplyOrderSecondaryVacDressingKit!;
    let tempData: IDressingKit;
    const isValid = Validator.validate(e.target.value, e.target.name);
    const selectedCode =
      param.key.split("-")[1] === "null" ? "" : param.key.split("-")[1];
    const selectedVac = vacAllProducts.items.filter(
      (x) => x.productName === e.target.value
    )[0];
    if (type === "primary") {
      response = {
        ...response,
        showQunatity: true,
      };
      if (selectedVac && selectedVac.sizes.length > 1) {
        setProductSizeDropDown(selectedVac, type);
        response = { ...response, showSize: true };
        tempData = {
          ...dressing,
          productName: {
            value: e.target.value,
            valid: isValid!.status,
          },
          productId: {
            value: selectedCode ? selectedCode : "",
            valid: ValidationStatus.VALID,
          },
          productCode: {
            value: selectedCode ? selectedCode : "",
            valid: ValidationStatus.VALID,
          },
          productSizeName: {
            value: "",
            valid: ValidationStatus.UNTOUCHED,
          },
          productSizeCode: { value: "", valid: ValidationStatus.VALID },
          productQuantity: {
            value: "1",
            valid: ValidationStatus.VALID,
          },
        };
      } else {
        setVacProductSize([]);
        response = { ...response, showSize: false };
        tempData = {
          ...dressing,
          productName: {
            value: e.target.value,
            valid: isValid!.status,
          },
          productId: {
            value: selectedCode ? selectedCode : "",
            valid: ValidationStatus.VALID,
          },
          productCode: {
            value: selectedCode ? selectedCode : "",
            valid: ValidationStatus.VALID,
          },
          productSizeName: {
            value: "",
            valid: ValidationStatus.VALID,
          },
          productSizeCode: { value: "", valid: ValidationStatus.VALID },
          productQuantity: {
            value: "1",
            valid: ValidationStatus.VALID,
          },
        };
      }
      response = {
        ...response,
        isPrimaryVacKitDressingDisabled: false,
        isPrimaryVacKitDressingMinusDisabled: true,
      };
    } else {
      secResponse = {
        ...secResponse,
        showSecQunatity: true,
      };
      if (selectedVac && selectedVac.sizes.length > 1) {
        setProductSizeDropDown(selectedVac, type);
        secResponse = { ...secResponse, showSecSize: true };
        tempData = {
          ...dressing,
          secProductName: {
            value: e.target.value,
            valid: isValid!.status,
          },
          secProductId: {
            value: selectedCode ? selectedCode : "",
            valid: ValidationStatus.VALID,
          },
          secProductCode: {
            value: selectedCode ? selectedCode : "",
            valid: ValidationStatus.VALID,
          },
          secProductSizeName: {
            value: "",
            valid: ValidationStatus.UNTOUCHED,
          },
          secProductSizeCode: {
            value: "",
            valid: ValidationStatus.VALID,
          },
          secProductQuantity: {
            value: "1",
            valid: ValidationStatus.VALID,
          },
        };
      } else {
        setVacSecondaryProductSize([]);
        secResponse = { ...secResponse, showSecSize: false };
        tempData = {
          ...dressing,
          secProductName: {
            value: e.target.value,
            valid: isValid!.status,
          },
          secProductId: {
            value: selectedCode ? selectedCode : "",
            valid: ValidationStatus.VALID,
          },
          secProductCode: {
            value: selectedCode ? selectedCode : "",
            valid: ValidationStatus.VALID,
          },
          secProductSizeName: {
            value: "",
            valid: ValidationStatus.VALID,
          },
          secProductSizeCode: {
            value: "",
            valid: ValidationStatus.VALID,
          },
          secProductQuantity: {
            value: "1",
            valid: ValidationStatus.VALID,
          },
        };
      }
      secResponse = {
        ...secResponse,
        isSecondaryVacKitDressingDisabled: false,
        isSecondaryVacKitDressingMinusDisabled: true,
      };
    }
    setDressing(tempData);
    supplyOrderObj?.setShowSupplyOrderVacDressingKit(response);
    supplyOrderObj?.setShowSupplyOrderSecondaryVacDressingKit(secResponse);
    validator.validateOrderSupplyProducts(supplyOrderObj!, true);
  };

  const validateAndSetSize = (e: any, param: any, type: string) => {
    const isValid = Validator.validate(e.target.value, e.target.name);
    const selectedCode = param.key.split("-")[1];
    let tempData: IDressingKit;
    if (type === "primary") {
      tempData = {
        ...dressing,
        productSizeName: {
          value: e.target.value,
          valid: isValid!.status,
        },
        productSizeCode: { value: selectedCode, valid: isValid!.status },
        productCode: { value: selectedCode, valid: isValid!.status },
      };
    } else {
      tempData = {
        ...dressing,
        secProductSizeName: {
          value: e.target.value,
          valid: isValid!.status,
        },
        secProductSizeCode: {
          value: selectedCode,
          valid: ValidationStatus.VALID,
        },
        secProductCode: { value: selectedCode, valid: isValid!.status },
      };
    }
    setDressing(tempData);
    validator.validateOrderSupplyProducts(supplyOrderObj!, true);
  };

  const handlePrimaryVacKitDressingPlusClick = () => {
    let res: showSupplyOrderVacDressing =
      supplyOrderObj?.showSupplyOrderVacDressingKit!;
    res = {
      ...res,
      isPrimaryVacKitDressingDisabled: false,
      isPrimaryVacKitDressingMinusDisabled: false,
    };
    const dressingPlus = parseInt(dressing.productQuantity.value) + 1;
    if (dressingPlus === 3) {
      res = {
        ...res,
        isPrimaryVacKitDressingDisabled: true,
      };
    }
    setDressing({
      ...dressing,
      productQuantity: {
        value: dressingPlus.toString(),
        valid: ValidationStatus.VALID,
      },
    });
    supplyOrderObj?.setShowSupplyOrderVacDressingKit(res);
  };

  const handlePrimaryVacKitDressingMinusClick = () => {
    let minusResp: showSupplyOrderVacDressing =
      supplyOrderObj?.showSupplyOrderVacDressingKit!;
    minusResp = { ...minusResp, isPrimaryVacKitDressingMinusDisabled: false };

    const dressingPlus = parseInt(dressing.productQuantity.value) - 1;
    if (dressingPlus === 1) {
      minusResp = { ...minusResp, isPrimaryVacKitDressingMinusDisabled: true };
    }
    if (dressingPlus < 3) {
      minusResp = { ...minusResp, isPrimaryVacKitDressingDisabled: false };
    }
    setDressing({
      ...dressing,
      productQuantity: {
        value: dressingPlus.toString(),
        valid: ValidationStatus.VALID,
      },
    });
    supplyOrderObj?.setShowSupplyOrderVacDressingKit(minusResp);
  };

  const handleSecondaryVacKitDressingPlusClick = () => {
    let secPlusRes: showSupplyOrderSecondaryVacDressing =
      supplyOrderObj?.showSupplyOrderSecondaryVacDressingKit!;
    secPlusRes = {
      ...secPlusRes,
      isSecondaryVacKitDressingDisabled: false,
      isSecondaryVacKitDressingMinusDisabled: false,
    };
    const dressingPlus = parseInt(dressing.secProductQuantity.value) + 1;
    if (dressingPlus === 3) {
      secPlusRes = { ...secPlusRes, isSecondaryVacKitDressingDisabled: true };
    }
    setDressing({
      ...dressing,
      secProductQuantity: {
        value: dressingPlus.toString(),
        valid: ValidationStatus.VALID,
      },
    });
    supplyOrderObj?.setShowSupplyOrderSecondaryVacDressingKit(secPlusRes);
  };

  const handleSecondaryVacKitDressingMinusClick = () => {
    let secMinusRes: showSupplyOrderSecondaryVacDressing =
      supplyOrderObj?.showSupplyOrderSecondaryVacDressingKit!;
    secMinusRes = {
      ...secMinusRes,
      isSecondaryVacKitDressingMinusDisabled: false,
    };
    const dressingPlus = parseInt(dressing.secProductQuantity.value) - 1;
    if (dressingPlus === 1) {
      secMinusRes = {
        ...secMinusRes,
        isSecondaryVacKitDressingMinusDisabled: true,
      };
    }
    if (dressingPlus < 3) {
      secMinusRes = {
        ...secMinusRes,
        isSecondaryVacKitDressingDisabled: false,
      };
    }
    setDressing({
      ...dressing,
      secProductQuantity: {
        value: dressingPlus.toString(),
        valid: ValidationStatus.VALID,
      },
    });
    supplyOrderObj?.setShowSupplyOrderSecondaryVacDressingKit(secMinusRes);
  };

  const addDressingKitClick = () => {
    if (!supplyOrderObj?.showSupplyOrderVacDressingKit.showPrimaryDressingKit) {
      supplyOrderObj?.setShowSupplyOrderVacDressingKit({
        ...supplyOrderObj?.showSupplyOrderVacDressingKit,
        showPrimaryDressingKit: true,
      });
      setDressing({
        ...dressing,
        productSizeName: {
          value: "",
          valid: ValidationStatus.UNTOUCHED,
        },
        productSizeCode: { value: "", valid: ValidationStatus.VALID },
        productName: {
          value: "",
          valid: ValidationStatus.UNTOUCHED,
        },
        productId: { value: "", valid: ValidationStatus.VALID },
        productCode: { value: "", valid: ValidationStatus.VALID },
      });
    } else {
      supplyOrderObj?.setShowSupplyOrderSecondaryVacDressingKit({
        ...supplyOrderObj?.showSupplyOrderSecondaryVacDressingKit,
        showSecondaryDressingKit: true,
      });
      setDressing({
        ...dressing,
        secProductSizeName: {
          value: "",
          valid: ValidationStatus.UNTOUCHED,
        },
        secProductSizeCode: {
          value: "",
          valid: ValidationStatus.VALID,
        },
        secProductName: {
          value: "",
          valid: ValidationStatus.UNTOUCHED,
        },
        secProductId: { value: "", valid: ValidationStatus.VALID },
        secProductCode: { value: "", valid: ValidationStatus.VALID },
      });
    }
  };

  const handleCloseIcon = () => {
    setDressing({
      ...dressing,
      productSizeName: {
        value: "",
        valid: ValidationStatus.VALID,
        required: false,
      },
      productSizeCode: { value: "", valid: ValidationStatus.VALID },
      productName: {
        value: "",
        valid: ValidationStatus.VALID,
        required: false,
      },
      productId: { value: "", valid: ValidationStatus.VALID },
      productCode: { value: "", valid: ValidationStatus.VALID },
      productQuantity: {
        value: "1",
        valid: ValidationStatus.VALID,
      },
    });
    supplyOrderObj?.setShowSupplyOrderVacDressingKit({
      ...supplyOrderObj?.showSupplyOrderVacDressingKit,
      showPrimaryDressingKit: false,
      showSize: false,
      showQunatity: false,
    });
  };

  const handleCloseSecIcon = () => {
    setDressing({
      ...dressing,
      secProductSizeName: {
        value: "",
        valid: ValidationStatus.VALID,
        required: false,
      },
      secProductSizeCode: {
        value: "",
        valid: ValidationStatus.VALID,
      },
      secProductName: {
        value: "",
        valid: ValidationStatus.VALID,
        required: false,
      },
      secProductId: { value: "", valid: ValidationStatus.VALID },
      secProductCode: { value: "", valid: ValidationStatus.VALID },
      secProductQuantity: {
        value: "1",
        valid: ValidationStatus.VALID,
      },
    });
    supplyOrderObj?.setShowSupplyOrderSecondaryVacDressingKit({
      ...supplyOrderObj?.showSupplyOrderSecondaryVacDressingKit,
      showSecondaryDressingKit: false,
      showSecSize: false,
      showSecQunatity: false,
    });
  };

  return (
    <>
      <div
        className={`supplyOrderDressingKitInfo ${
          !supplyOrderObj?.isSuppliesSelected
            ? `supplyOrderDressingKitInfoError`
            : ``
        }`}
      >
        <h2
          className="supplydressingKitHeader"
          data-testid="supplyDressingKitHeaderTest"
        >
          3M™ V.A.C.® Dressing Kits
        </h2>
        {supplyOrderObj?.showSupplyOrderVacDressingKit
          .showPrimaryDressingKit && (
          <>
            <VacDressing
              validateAndSetData={(e: any, param: any) =>
                validateAndSetData(e, param, "primary")
              }
              vacProducts={vacProducts}
              handleCloseIcon={handleCloseIcon}
              validateAndSetSize={(e: any, param: any) =>
                validateAndSetSize(e, param, "primary")
              }
              showSize={supplyOrderObj?.showSupplyOrderVacDressingKit.showSize}
              vacProductSize={vacProductSize}
              showQunatity={
                supplyOrderObj?.showSupplyOrderVacDressingKit.showQunatity
              }
              handleVacKitDressingPlusClick={
                handlePrimaryVacKitDressingPlusClick
              }
              handleVacKitDressingMinusClick={
                handlePrimaryVacKitDressingMinusClick
              }
              isVacKitDressingPlusDisabled={
                supplyOrderObj?.showSupplyOrderVacDressingKit
                  .isPrimaryVacKitDressingDisabled
              }
              isVacKitDressingMinusDisabled={
                supplyOrderObj?.showSupplyOrderVacDressingKit
                  .isPrimaryVacKitDressingMinusDisabled
              }
              productName={dressing.productName}
              productSizeName={dressing.productSizeName}
              ProductQuantityCode={dressing.productQuantity}
              productLableName="productName"
              productSizeLabelName="productSizeName"
            />
          </>
        )}
        {supplyOrderObj?.showSupplyOrderSecondaryVacDressingKit
          .showSecondaryDressingKit && (
          <>
            <VacDressing
              validateAndSetData={(e: any, param: any) =>
                validateAndSetData(e, param, "secondary")
              }
              vacProducts={vacProducts}
              handleCloseIcon={handleCloseSecIcon}
              validateAndSetSize={(e: any, param: any) =>
                validateAndSetSize(e, param, "secondary")
              }
              showSize={
                supplyOrderObj?.showSupplyOrderSecondaryVacDressingKit
                  .showSecSize
              }
              vacProductSize={vacSecondaryProductSize}
              showQunatity={
                supplyOrderObj?.showSupplyOrderSecondaryVacDressingKit
                  .showSecQunatity
              }
              handleVacKitDressingPlusClick={
                handleSecondaryVacKitDressingPlusClick
              }
              handleVacKitDressingMinusClick={
                handleSecondaryVacKitDressingMinusClick
              }
              isVacKitDressingPlusDisabled={
                supplyOrderObj?.showSupplyOrderSecondaryVacDressingKit
                  .isSecondaryVacKitDressingDisabled
              }
              isVacKitDressingMinusDisabled={
                supplyOrderObj?.showSupplyOrderSecondaryVacDressingKit
                  .isSecondaryVacKitDressingMinusDisabled
              }
              productName={dressing.secProductName}
              productSizeName={dressing.secProductSizeName}
              ProductQuantityCode={dressing.secProductQuantity}
              productLableName="secProductName"
              productSizeLabelName="secProductSizeName"
            />
          </>
        )}
        {supplyOrderObj?.showSupplyOrderVacDressingKit.showAddDressingBtn && (
          <Grid className="supplyOrderDressingKitBtnGrid">
            <Grid item xs={12}>
              <Button
                classes={{ root: "supplyOrder-dressingKit-add-button" }}
                data-testid="supply-dressingKit-add-button"
                onClick={addDressingKitClick}
                startIcon={<AddIcon classes={{ root: "dressingadd-icon" }} />}
              >
                Add Dressing Kit
              </Button>
            </Grid>
          </Grid>
        )}
      </div>
      <div>
        <SupplyOrderVacCannister
          canister={canister}
          cannisterProduct={cannisterProduct}
          data={data}
          replenishSupplyOrderData={replenishSupplyOrderData}
          setCanister={setCanister}
          vacProductInfo={vacProductInfo}
        />
      </div>
    </>
  );
};
