import { Button, Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ValidationStatus } from "../../../../core/interfaces/input.interface";
import { IDressingKit, IProductInfo } from "../../newOrder.interface";
import { NewOrderValidator } from "../../newOrder.validator";
import {
  ProductInformation,
  VacDressingKitModel,
} from "./vacDressingKit.interface";
import { VacDressing } from "./VacDressingKitMain.component";
import AddIcon from "@mui/icons-material/Add";
import "./vacDressingKit.css";
import {
  NewOrderContext,
  NewOrderContextType,
} from "../../../../context/NewOrderContext";
import { AuthContextType, AuthContext } from "../../../../context/AuthContext";

interface IVacDressingKit {
  data: IDressingKit;
  productInfo: IProductInfo;
  setData: Function;
  vacProducts?: any;
  vacAllProducts?: VacDressingKitModel | null;
  Validator?: NewOrderValidator;
}

export const VacDressingKit = ({
  data,
  productInfo,
  setData,
  vacProducts,
  vacAllProducts,
  Validator = new NewOrderValidator(),
}: IVacDressingKit) => {
  const [vacProductSize, setVacProductSize] = useState<any>([]);
  const [vacSecondaryProductSize, setVacSecondaryProductSize] = useState<any>(
    []
  );
  const newOrderObj = useContext<NewOrderContextType | null>(NewOrderContext);
  const AuthObj = useContext<AuthContextType | null>(AuthContext);

  useEffect(() => {
    if (
      AuthObj &&
      AuthObj.registeredFaciltyAddress &&
      newOrderObj &&
      !newOrderObj.isComingFromPrev &&
      vacAllProducts
    ) {
      newOrderObj?.setShowSize(true);
      newOrderObj?.setshowQunatity(true);
      let dressing: ProductInformation | null = getSelectedVacProduct(
        "DTGF05PKM",
        vacAllProducts
      );
      if (!dressing) {
        return;
      }
      setProductSizeDropDown(dressing, "primary");
      const filteredResults = dressing!.sizes?.filter(
        (x: any) => x.sku === "DTGF05PKM"
      );
      const selectedDressingSize = filteredResults[0];
      const dressingSizeName = selectedDressingSize.name;
      setData({
        ...data,
        productName: {
          value: dressing!.productName,
          valid: ValidationStatus.VALID,
        },
        productSizeCode: {
          value: "DTGF05PKM",
          valid: ValidationStatus.VALID,
        },
        productSizeName: {
          value: dressingSizeName,
          valid: ValidationStatus.VALID,
        },
        productId: { value: "", valid: ValidationStatus.VALID },
        productCode: {
          value: "DTGF05PKM",
          valid: ValidationStatus.VALID,
        },
        productQuantity: { value: "1", valid: ValidationStatus.VALID },
      });
      newOrderObj?.setIsPrimaryVacKitDressingMinusDisabled(true);
      newOrderObj?.setIsPrimaryVacKitDressingPlusDisabled(false);
    }
  }, [
    vacAllProducts,
    productInfo.productInformation.value,
    AuthObj?.registeredFaciltyAddress?.readyCareFlag,
  ]);

  const getSelectedVacProduct = (
    sku: string,
    vacAllProducts: any
  ): ProductInformation | null => {
    let obj = null;
    if (vacAllProducts) {
      vacAllProducts.items.map((element: ProductInformation) => {
        if (element.sku === sku) {
          obj = element;
        } else if (element.sizes) {
          element.sizes.forEach((sa: any) => {
            if (sa.sku === sku) {
              obj = element;
            }
          });
        }
      });
    }
    return obj;
  };

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
    newOrderObj?.setIsHandleChangeTriggered(true);
    const isValid = Validator.validate(e.target.value, e.target.name);
    const selectedCode =
      param.key.split("-")[1] === "null" ? "" : param.key.split("-")[1];
    const selectedVac = vacAllProducts?.items.filter(
      (x) => x.productName === e.target.value
    )[0];
    if (type === "primary") {
      newOrderObj?.setshowQunatity(true);
      if (selectedVac?.sizes !== null && selectedVac?.sizes.length! > 1) {
        setProductSizeDropDown(selectedVac, type);
        newOrderObj?.setShowSize(true);
        setData({
          ...data,
          productName: { value: e.target.value, valid: isValid?.status },
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
        });
      } else {
        setVacProductSize([]);
        newOrderObj?.setShowSize(false);
        setData({
          ...data,
          productName: { value: e.target.value, valid: isValid?.status },
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
        });
      }
      newOrderObj?.setIsPrimaryVacKitDressingPlusDisabled(false);
      newOrderObj?.setIsPrimaryVacKitDressingMinusDisabled(true);
    } else {
      newOrderObj?.setshowSecQunatity(true);
      if (
        selectedVac &&
        selectedVac.sizes !== null &&
        selectedVac.sizes.length > 1
      ) {
        setProductSizeDropDown(selectedVac, type);
        newOrderObj?.setShowSecSize(true);
        setData({
          ...data,
          secProductName: {
            value: e.target.value,
            valid: isValid?.status,
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
        });
      } else {
        setVacSecondaryProductSize([]);
        newOrderObj?.setShowSecSize(false);
        setData({
          ...data,
          secProductName: {
            value: e.target.value,
            valid: isValid?.status,
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
        });
      }
      newOrderObj?.setIsSecondaryVacKitDressingPlusDisabled(false);
      newOrderObj?.setIsSecondaryVacKitDressingMinusDisabled(true);
    }
  };

  const validateAndSetSize = (e: any, param: any, type: string) => {
    const isValid = Validator.validate(e.target.value, e.target.name);
    const selectedCode = param.key.split("-")[1];
    if (type === "primary") {
      setData({
        ...data,
        productSizeName: {
          value: e.target.value,
          valid: isValid?.status,
        },
        productSizeCode: { value: selectedCode, valid: isValid?.status },
        productCode: { value: selectedCode, valid: isValid?.status },
      });
    } else {
      setData({
        ...data,
        secProductSizeName: {
          value: e.target.value,
          valid: isValid?.status,
        },
        secProductSizeCode: {
          value: selectedCode,
          valid: ValidationStatus.VALID,
        },
        secProductCode: { value: selectedCode, valid: isValid?.status },
      });
    }
  };

  const handlePrimaryVacKitDressingPlusClick = () => {
    newOrderObj?.setIsPrimaryVacKitDressingMinusDisabled(false);
    newOrderObj?.setIsPrimaryVacKitDressingPlusDisabled(false);
    const dressingPlus = parseInt(data?.productQuantity.value) + 1;
    if (dressingPlus === 3) {
      newOrderObj?.setIsPrimaryVacKitDressingPlusDisabled(true);
    }
    setData({
      ...data,
      productQuantity: {
        value: dressingPlus.toString(),
        valid: ValidationStatus.VALID,
      },
    });
  };

  const handlePrimaryVacKitDressingMinusClick = () => {
    newOrderObj?.setIsPrimaryVacKitDressingMinusDisabled(false);
    const dressingPlus = parseInt(data?.productQuantity.value) - 1;
    if (dressingPlus === 1) {
      newOrderObj?.setIsPrimaryVacKitDressingMinusDisabled(true);
    }
    if (dressingPlus < 3) {
      newOrderObj?.setIsPrimaryVacKitDressingPlusDisabled(false);
    }
    setData({
      ...data,
      productQuantity: {
        value: dressingPlus.toString(),
        valid: ValidationStatus.VALID,
      },
    });
  };

  const handleSecondaryVacKitDressingPlusClick = () => {
    newOrderObj?.setIsSecondaryVacKitDressingMinusDisabled(false);
    newOrderObj?.setIsSecondaryVacKitDressingPlusDisabled(false);
    const dressingPlus = parseInt(data?.secProductQuantity.value) + 1;
    if (dressingPlus === 3) {
      newOrderObj?.setIsSecondaryVacKitDressingPlusDisabled(true);
    }
    setData({
      ...data,
      secProductQuantity: {
        value: dressingPlus.toString(),
        valid: ValidationStatus.VALID,
      },
    });
  };

  const handleSecondaryVacKitDressingMinusClick = () => {
    newOrderObj?.setIsSecondaryVacKitDressingMinusDisabled(false);
    const dressingPlus = parseInt(data?.secProductQuantity.value) - 1;
    if (dressingPlus === 1) {
      newOrderObj?.setIsSecondaryVacKitDressingMinusDisabled(true);
    }
    if (dressingPlus < 3) {
      newOrderObj?.setIsSecondaryVacKitDressingPlusDisabled(false);
    }
    setData({
      ...data,
      secProductQuantity: {
        value: dressingPlus.toString(),
        valid: ValidationStatus.VALID,
      },
    });
  };

  const addDressingKitClick = () => {
    if (!newOrderObj?.showPrimaryDressingKit) {
      newOrderObj?.setShowPrimaryDressingKit(true);
      setData({
        ...data,
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
      newOrderObj?.setShowSecondaryDressingKit(true);
      setData({
        ...data,
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
    setData({
      ...data,
      productSizeName: {
        value: "",
        valid: ValidationStatus.VALID,
      },
      productSizeCode: { value: "", valid: ValidationStatus.VALID },
      productName: {
        value: "",
        valid: ValidationStatus.VALID,
      },
      productId: { value: "", valid: ValidationStatus.VALID },
      productCode: { value: "", valid: ValidationStatus.VALID },
      productQuantity: {
        value: "1",
        valid: ValidationStatus.VALID,
      },
    });
    newOrderObj?.setShowPrimaryDressingKit(false);
    newOrderObj?.setShowSize(false);
    newOrderObj?.setshowQunatity(false);
  };

  const handleCloseSecIcon = () => {
    newOrderObj?.setShowSecondaryDressingKit(false);
    setData({
      ...data,
      secProductSizeName: {
        value: "",
        valid: ValidationStatus.VALID,
      },
      secProductSizeCode: {
        value: "",
        valid: ValidationStatus.VALID,
      },
      secProductName: {
        value: "",
        valid: ValidationStatus.VALID,
      },
      secProductId: { value: "", valid: ValidationStatus.VALID },
      secProductCode: { value: "", valid: ValidationStatus.VALID },
      secProductQuantity: {
        value: "1",
        valid: ValidationStatus.VALID,
      },
    });
    newOrderObj?.setShowSecSize(false);
    newOrderObj?.setshowSecQunatity(false);
  };

  useEffect(() => {
    if (
      newOrderObj?.showPrimaryDressingKit &&
      newOrderObj?.showSecondaryDressingKit
    ) {
      newOrderObj?.setShowAddDressingBtn(false);
    } else {
      newOrderObj?.setShowAddDressingBtn(true);
    }
  }, [
    newOrderObj?.showPrimaryDressingKit,
    newOrderObj?.showSecondaryDressingKit,
  ]);

  useEffect(() => {
    if (data?.productName?.value !== "") {
      const selectedVac = vacAllProducts?.items.filter(
        (x) => x.productName === data?.productName.value
      )[0]!;
      if (selectedVac?.sizes !== null && selectedVac?.hasMultipleSize) {
        setProductSizeDropDown(selectedVac, "primary");
      }
    }
    if (data?.secProductName.value !== "") {
      const selectedVac = vacAllProducts?.items.filter(
        (x) => x.productName === data?.secProductName.value
      )[0]!;
      if (selectedVac?.sizes !== null && selectedVac?.hasMultipleSize) {
        setProductSizeDropDown(selectedVac, "secondary");
      }
    }
  }, [vacAllProducts, data?.productName.value, data?.secProductName.value]);

  return (
    <div className="dressingKitInfo">
      <h2 className="dressingKitHeader" data-testid="dressingKitHeaderTest">
        3M™ V.A.C.® Dressing Kits
      </h2>
      <p className="dressingKitBody" data-testid="dressingKitBodyTest">
        {productInfo.productInformation.value !== "yes" ? (
          <span>
            These are the default supplies selected based on your length of
            therapy and device.
          </span>
        ) : (
          <span>
            The following supplies will be given to the patient with the rental
            product.
          </span>
        )}
      </p>
      {productInfo?.productInformation?.value === "yes" &&
        data &&
        data.productName &&
        data.productQuantity &&
        data.productName.value !== "" &&
        ((data.productCode && data.productCode.value) ||
          (data.productSizeCode && data.productSizeCode.value)) && (
          <h5
            className="dressing-supplies-review-order-content-value-title"
            data-testid="dressing-kit-value-primary"
          >
            <span className="dot-with-space">&bull; </span>
            {`1 Case of 5 - 3M™ V.A.C.® Granufoam™ Dressing Kit, Medium (M8275052/5)`}
          </h5>
        )}
      {newOrderObj?.showPrimaryDressingKit && (
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
            showSize={newOrderObj?.showSize}
            vacProductSize={vacProductSize}
            showQunatity={newOrderObj?.showQunatity}
            handleVacKitDressingPlusClick={handlePrimaryVacKitDressingPlusClick}
            handleVacKitDressingMinusClick={
              handlePrimaryVacKitDressingMinusClick
            }
            isVacKitDressingPlusDisabled={
              newOrderObj?.isPrimaryVacKitDressingDisabled
            }
            isVacKitDressingMinusDisabled={
              newOrderObj?.isPrimaryVacKitDressingMinusDisabled
            }
            productName={data.productName}
            productSizeName={data.productSizeName}
            ProductQuantityCode={data.productQuantity}
            productLableName="productName"
            productSizeLabelName="productSizeName"
            disableDropdown={false}
          />
        </>
      )}
      {newOrderObj?.showSecondaryDressingKit && (
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
            showSize={newOrderObj?.showSecSize}
            vacProductSize={vacSecondaryProductSize}
            showQunatity={newOrderObj?.showSecQunatity}
            handleVacKitDressingPlusClick={
              handleSecondaryVacKitDressingPlusClick
            }
            handleVacKitDressingMinusClick={
              handleSecondaryVacKitDressingMinusClick
            }
            isVacKitDressingPlusDisabled={
              newOrderObj?.isSecondaryVacKitDressingDisabled
            }
            isVacKitDressingMinusDisabled={
              newOrderObj?.isSecondaryVacKitDressingMinusDisabled
            }
            productName={data?.secProductName}
            productSizeName={data?.secProductSizeName}
            ProductQuantityCode={data?.secProductQuantity}
            productLableName="secProductName"
            productSizeLabelName="secProductSizeName"
          />
        </>
      )}
      {newOrderObj?.showAddDressingBtn && (
        <Grid className="dressingKitBtnGrid">
          <Grid item xs={12}>
            <Button
              classes={{ root: "dressingKit-add-button" }}
              data-testid="dressingKit-add-button"
              onClick={addDressingKitClick}
              startIcon={<AddIcon classes={{ root: "dressingadd-icon" }} />}
            >
              Add Dressing Kit
            </Button>
          </Grid>
        </Grid>
      )}
    </div>
  );
};
