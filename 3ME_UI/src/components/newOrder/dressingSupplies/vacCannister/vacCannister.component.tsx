import "./vacCannister.css";
import {
  NewOrderContext,
  NewOrderContextType,
} from "../../../../context/NewOrderContext";
import { Button, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import closeIcon from "../../../../assets/cross.svg";
import { useContext, useEffect, useState } from "react";
import { ICanister, IProductInfo } from "../../newOrder.interface";
import { AuthContextType, AuthContext } from "../../../../context/AuthContext";
import { ValidationStatus } from "../../../../core/interfaces/input.interface";
import QuantityButton from "../../../../core/quantityButton/quantityButton.component";

interface IVacCannister {
  cannisterProduct: any;
  data: ICanister;
  productInfo: IProductInfo;
  setData: Function;
}

export const VacCannister = ({
  cannisterProduct,
  data,
  productInfo,
  setData,
}: IVacCannister) => {
  const NewOrderObj = useContext<NewOrderContextType | null>(NewOrderContext);
  const [selectedCannister, setSelectedCannister] = useState<any>(null);
  const [cannisterMaxCases, setCannisterMaxCases] = useState<string>();
  const AuthObj = useContext<AuthContextType | null>(AuthContext);
  useEffect(() => {
    updatemaxQuantityAndUpdateButtons();
  }, [
    AuthObj?.registeredFaciltyAddress?.readyCareFlag,
    productInfo?.productInformation.value,
  ]);

  useEffect(() => {
    if (cannisterProduct.length > 0) {
      let canister: { productName: any; sku: any } | null = null;
      if (productInfo?.productInformation.value === "yes") {
        canister = cannisterProduct.filter(
          (x: any) => !x.productName.toLowerCase().includes("freedom")
        )[0];
      } else {
        if (productInfo?.productValue.value.toLowerCase().includes("2")) {
          canister = cannisterProduct.filter((x: any) =>
            x.productName.toLowerCase().includes("freedom")
          )[0];
        } else {
          canister = cannisterProduct.filter(
            (x: any) => !x.productName.toLowerCase().includes("freedom")
          )[0];
        }
      }
      setSelectedCannister(canister);
    }
  }, [
    productInfo?.productValue.value,
    productInfo?.productInformation.value,
    cannisterProduct,
  ]);

  useEffect(() => {
    if (selectedCannister) {
      const tempData = {
        ...data,
        canisterProductName: {
          value: selectedCannister.productName,
          valid: ValidationStatus.VALID,
          isDefaultValid: true,
        },
        canisterProductCode: {
          value: selectedCannister.sku,
          valid: ValidationStatus.VALID,
          isDefaultValid: true,
        },
        canisterProductID: {
          value: selectedCannister.sku,
          valid: ValidationStatus.VALID,
          isDefaultValid: true,
        },
      };
      setData(tempData);
    }
  }, [selectedCannister]);

  useEffect(() => {
    if (NewOrderObj && !NewOrderObj.isComingFromPrev && selectedCannister) {
      const tempData = {
        ...data,
        canisterProductName: {
          value: selectedCannister.productName,
          valid: ValidationStatus.VALID,
          isDefaultValid: true,
        },
        canisterProductCode: {
          value: selectedCannister.sku,
          valid: ValidationStatus.VALID,
          isDefaultValid: true,
        },
        canisterProductQuantity: {
          value: "1",
          valid: ValidationStatus.VALID,
          isDefaultValid: true,
        },
        canisterProductID: {
          value: selectedCannister.sku,
          valid: ValidationStatus.VALID,
          isDefaultValid: true,
        },
      };
      setData(tempData);
      updatemaxQuantityAndUpdateButtons();
    }
  }, [productInfo?.productValue.value, productInfo?.productInformation.value]);

  const updatemaxQuantityAndUpdateButtons = () => {
    if (NewOrderObj && !NewOrderObj.isComingFromPrev) {
      if (
        AuthObj &&
        AuthObj.registeredFaciltyAddress &&
        AuthObj.registeredFaciltyAddress.readyCareFlag === "Y" &&
        productInfo.productInformation.value === "yes"
      ) {
        setCannisterMaxCases("1");
        NewOrderObj?.setIsCannisterProductMinusDisabled(true);
        NewOrderObj?.setIsCannisterProductPlusDisabled(true);
      } else {
        setCannisterMaxCases("2");
        NewOrderObj?.setIsCannisterProductMinusDisabled(true);
        NewOrderObj?.setIsCannisterProductPlusDisabled(false);
      }
    }
  };

  const handleVacKitDressingPlusClick = () => {
    NewOrderObj?.setIsHandleChangeTriggered(true);
    NewOrderObj?.setIsCannisterProductMinusDisabled(false);
    NewOrderObj?.setIsCannisterProductPlusDisabled(false);
    const dressingPlus = parseInt(data?.canisterProductQuantity.value) + 1;
    if (dressingPlus === 2) {
      NewOrderObj?.setIsCannisterProductPlusDisabled(true);
    }
    setData({
      ...data,
      canisterProductQuantity: {
        value: dressingPlus.toString(),
        valid: ValidationStatus.VALID,
      },
    });
  };

  const handleVacKitDressingMinusClick = () => {
    NewOrderObj?.setIsHandleChangeTriggered(true);
    NewOrderObj?.setIsCannisterProductMinusDisabled(false);
    const dressingPlus = parseInt(data?.canisterProductQuantity.value) - 1;
    if (dressingPlus === 1) {
      NewOrderObj?.setIsCannisterProductMinusDisabled(true);
    }
    if (dressingPlus < 3) {
      NewOrderObj?.setIsCannisterProductPlusDisabled(false);
    }
    setData({
      ...data,
      canisterProductQuantity: {
        value: dressingPlus.toString(),
        valid: ValidationStatus.VALID,
      },
    });
  };

  const handleCloseIcon = () => {
    NewOrderObj?.setshowCannisterType(true);
  };

  const addCannisterClick = () => {
    NewOrderObj?.setIsHandleChangeTriggered(true);
    NewOrderObj?.setshowCannisterType(false);
  };

  return (
    <div className="cannisterKitInfo" data-testid="cannisterKitHeaderTest">
      <h2 className="cannisterKitHeader">3M™ V.A.C.® Canisters</h2>
      <p className="dressingKitBody" data-testid="dressingKitBodyTest">
        {productInfo.productInformation.value !== "no" ? (
          <span>
            The following supplies will be given to the patient with the rental
            product.
          </span>
        ) : (
          ""
        )}
      </p>
      {productInfo?.productInformation?.value === "yes" && (
        <h5
          className="dressing-supplies-review-order-content-value-title"
          data-testid="dressing-kit-value-secondary"
        >
          <span className="dot-with-space">&bull; </span>
          {`${data?.canisterProductQuantity?.value} Case of ${
            data?.canisterProductCode?.value?.split("/")[1] ??
            data?.canisterProductCode?.value?.match(/\d/g)?.join("")
          } - ${data?.canisterProductName?.value}, (${
            data?.canisterProductCode?.value
          })`}
        </h5>
      )}
      {NewOrderObj?.showCannisterType === false && (
        <div className="cannisterdiv">
          <Grid className="currentCannisterMainGrid">
            <Grid className="cannisterLabel" item xs={10}>
              <div className="cannisterTypeHeader">
                <span className="cannisterType">Canister Type</span>
                <p className="cannisterBody" data-testid="cannisterBodyTest">
                  {selectedCannister && selectedCannister?.productName}
                </p>
              </div>
            </Grid>
            <Grid className="cannisterLabel" item xs={2}>
              {productInfo?.productInformation?.value === "yes" && (
                <img
                  onClick={handleCloseIcon}
                  src={closeIcon}
                  alt={closeIcon}
                  className="cannisterCloseBtn"
                />
              )}
            </Grid>
          </Grid>
          <Grid className="currentCannisterMainGrid">
            <Grid item xs={8.5} className="cannisterLabel">
              <div data-testid="cannisterQuantityLabelTest">
                <label className="cannisterQuantityLabel">
                  Quantity (5 canisters per case)
                </label>
              </div>
              <p className="cannisterSubLabel">Max {cannisterMaxCases} cases</p>
            </Grid>
            <Grid className="cannisterLabel" item xs={3}>
              <QuantityButton
                value={data?.canisterProductQuantity.value}
                onPlusClick={handleVacKitDressingPlusClick}
                onMinusClick={handleVacKitDressingMinusClick}
                isPlusDisabled={NewOrderObj?.isCannisterProductPlusDisabled}
                isMinusDisabled={NewOrderObj?.isCannisterProductMinusDisabled}
                showLabel={false}
              />
            </Grid>
          </Grid>
        </div>
      )}
      {NewOrderObj?.showCannisterType === true && (
        <Grid className="cannisterBtnGrid">
          <Grid item xs={12}>
            <Button
              classes={{ root: "canister-add-button" }}
              data-testid="dressingKit-add-button"
              onClick={addCannisterClick}
              startIcon={<AddIcon classes={{ root: "cannisteradd-icon" }} />}
            >
              Add Cannister
            </Button>
          </Grid>
        </Grid>
      )}
    </div>
  );
};
