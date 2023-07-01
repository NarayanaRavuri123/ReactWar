import React, { useContext, useEffect } from "react";
import { IProductInformationInfo } from "./productInformation.interface";
import "./productInformation.css";
import { FormControlLabel, Grid, Radio, RadioGroup, Box } from "@mui/material";
import { InputWithLabel } from "../../../core/inputWithLabel/inputWithLabel.component";
import { ValidationStatus } from "../../../core/interfaces/input.interface";
import { CustomDropDown } from "../../../core/customDropdown/customDropdown.component";
import { format } from "react-string-format";
import { DD_PRODUCT_INFORMATION_CONTENT } from "../../../util/staticText";
import { getdropDownContent } from "../../../util/dropDownService";
import { ReactComponent as RadioButtonIcon } from "../../../assets/radioButton.svg";
import { ReactComponent as SelectedRadioButtonIcon } from "../../../assets/selectedRadioButton.svg";
import {
  NewOrderContext,
  NewOrderContextType,
} from "../../../context/NewOrderContext";
import {
  getCodeFromText,
  getTextFromCode,
} from "../../../util/utilityFunctions";
import { ProductInformationReviewOrder } from "./reviewOrder/productInformationReviewOrder.component";
import { AuthContext, AuthContextType } from "../../../context/AuthContext";

import { IProductInfo } from "../newOrder.interface";
import { getInventoryInfoList } from "../../../util/inventoryMgrService";

export const ProductInformation = ({
  productInfo,
  setProductInfo,
  isReviewOrder = false,
  editButtonClicked,
  isOrderSummary = false,
}: IProductInformationInfo) => {
  const newOrderObj = useContext<NewOrderContextType | null>(NewOrderContext);
  const AuthObj = useContext<AuthContextType | null>(AuthContext);
  const [prodInfoTypes, setProdInfoTypes] = React.useState([]);
  const [prodInfoTypesText, setProdInfoTypesText] = React.useState([]);
  const [active, setActive] = React.useState<boolean>(
    productInfo?.productInformation.value === "yes" ? true : false
  );

  const getInventoryList = async () => {
    newOrderObj?.setInventoryProductCount(0);
    const customerNumber = AuthObj?.registeredFaciltyAddress?.accountNumber;
    let reqParams = {
      customerNumber: customerNumber,
    };
    try {
      const response = await getInventoryInfoList(reqParams);
      if (response && !response.error) {
        newOrderObj?.setInventoryProductCount(response.items.length);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchproductType();
  }, []);

  useEffect(() => {
    if (newOrderObj && !newOrderObj.isComingFromPrev && !isReviewOrder) {
      if (AuthObj && AuthObj.registeredFaciltyAddress) {
        productInfo.productInformation.value =
          AuthObj.registeredFaciltyAddress.readyCareFlag === "Y" ? "yes" : "no";
      } else {
        productInfo.productInformation.value = "no";
      }
    }
    if (
      AuthObj &&
      AuthObj.registeredFaciltyAddress &&
      AuthObj.registeredFaciltyAddress.readyCareFlag &&
      AuthObj.registeredFaciltyAddress.readyCareFlag === "Y"
    ) {
      getInventoryList();
    }
  }, [AuthObj?.registeredFaciltyAddress]);

  useEffect(() => {
    if (productInfo.productInformation.value === "yes") {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [productInfo.productInformation.value]);

  const fetchproductType = async () => {
    //async and await
    try {
      const ddContent = format("{0}", DD_PRODUCT_INFORMATION_CONTENT);
      const dropDowndata = await getdropDownContent(ddContent);
      if (dropDowndata.items.length > 0) {
        const accidentTypeArray = dropDowndata.items[0].data.sort(
          (a: { order: number }, b: { order: number }) =>
            a.order > b.order ? 1 : -1
        );
        setProdInfoTypes(accidentTypeArray);
        setProdInfoTypesText(
          accidentTypeArray.map((x: { text: string }) => x.text)
        );
        if (!newOrderObj?.isComingFromPrev && !isReviewOrder) {
          setProductInfo((productInfo: IProductInfo) => ({
            ...productInfo,
            productValue: {
              value: getTextFromCode(prodInfoTypes, "1"),
              valid: ValidationStatus.VALID,
              isDefaultValid: true,
            },
          }));
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const validateAndSetData = (e: any) => {
    newOrderObj?.setIsHandleChangeTriggered(true);
    let productInformation: string = productInfo.productInformation.value;
    let productValue: string = productInfo.productValue.value;
    if (e.target.name === "productInformation") {
      if (e.target.value === "yes") {
        setActive(true);
      } else {
        setActive(false);
      }
      productInformation = e.target.value;
      productValue = "1";
    } else if (e.target.name === "productValue") {
      productValue = getCodeFromText(prodInfoTypes, e.target.value);
    }
    setProductInfo((dt: any) => ({
      ...dt,
      productInformation: {
        value: productInformation,
        valid: ValidationStatus.VALID,
      },
      productValue: {
        value: productValue ?? "",
        valid: ValidationStatus.VALID,
      },
    }));
  };
  const mapProductInfo = (): any => {
    return (
      <p className="product-info">
        Will this order be using one of your{" "}
        {newOrderObj && newOrderObj.inventoryProductCount > 0 ? (
          <b>{newOrderObj.inventoryProductCount} </b>
        ) : (
          ` `
        )}
        - 3M™ V.A.C.® Ready Care Program Units?{" "}
        <span className="star-red">*</span>
      </p>
    );
  };
  return (
    <div className="productInformation-component">
      {!isReviewOrder && (
        <div className="productInformation">
          <h2 data-testid="prodTitleTest" className="productHeader">
            Product Information
          </h2>
          {AuthObj?.registeredFaciltyAddress?.readyCareFlag === "Y" && (
            <InputWithLabel
              testId="prodInfoTitleTest"
              label={mapProductInfo()}
              error={
                productInfo?.productInformation.valid ===
                ValidationStatus.INVALID
              }
              labelClassName="prodDescLabel"
            >
              <Box className="prodBoxContianer" sx={{ flexGrow: 1 }}>
                <Grid className="prodInfoGridContainer" container spacing={2}>
                  <Grid className="prodInfoGridItem" item xs={6}>
                    <RadioGroup
                      name="productInformation"
                      classes={{ root: "prodInfoRadioRoot" }}
                      onChange={validateAndSetData}
                      value={productInfo.productInformation.value}
                    >
                      <FormControlLabel
                        classes={{
                          root:
                            active === true
                              ? "prodInfoOptionRootActive"
                              : "prodInfoOptionRoot",
                        }}
                        componentsProps={{
                          typography: {
                            classes: { root: "prodInfoOptiontxt" },
                          },
                        }}
                        control={
                          <Radio
                            icon={<RadioButtonIcon />}
                            checkedIcon={<SelectedRadioButtonIcon />}
                          />
                        }
                        data-testid="prod-information-yes"
                        label="Yes"
                        value="yes"
                      />
                      <FormControlLabel
                        classes={{
                          root:
                            active === false
                              ? "prodInfoOptionRootActive"
                              : "prodInfoOptionRoot",
                        }}
                        componentsProps={{
                          typography: {
                            classes: { root: "prodInfoOptiontxt" },
                          },
                        }}
                        control={
                          <Radio
                            icon={<RadioButtonIcon />}
                            checkedIcon={<SelectedRadioButtonIcon />}
                          />
                        }
                        data-testid="prod-information-no"
                        label="No"
                        value="no"
                        className="rootClass"
                      />
                    </RadioGroup>
                  </Grid>
                </Grid>
              </Box>
            </InputWithLabel>
          )}
          <div className="prodSelectContainer">
            {productInfo?.productInformation?.value === "yes" &&
            AuthObj?.registeredFaciltyAddress?.readyCareFlag === "Y" ? (
              <InputWithLabel
                isRequired={false}
                label="Product"
                labelClassName="productName"
              >
                <p data-testid="prod-title" className="productContent">
                  {productInfo.productValue.value
                    ? getTextFromCode(
                        prodInfoTypes,
                        productInfo.productValue.value
                      )
                    : ""}
                </p>
              </InputWithLabel>
            ) : (
              <InputWithLabel
                testId="prod-title"
                isRequired={true}
                label="Select Product"
                error={
                  productInfo.productValue?.valid === ValidationStatus.INVALID
                }
              >
                <CustomDropDown
                  name="productValue"
                  value={
                    productInfo.productValue.value
                      ? getTextFromCode(
                          prodInfoTypes,
                          productInfo.productValue.value
                        )
                      : null
                  }
                  handleChange={validateAndSetData}
                  selectpropsClassName="prod-info-select"
                  selectClassName="prod-info-input prod-info"
                  testId="prod-info-type"
                  menuItem={prodInfoTypesText}
                />
              </InputWithLabel>
            )}
          </div>
        </div>
      )}
      {isReviewOrder && (
        <ProductInformationReviewOrder
          productInfo={productInfo}
          editButtonClicked={editButtonClicked}
          productValues={prodInfoTypes}
          isOrderSummary={isOrderSummary}
          isReadyCare={AuthObj?.registeredFaciltyAddress?.readyCareFlag === "Y"}
        />
      )}
    </div>
  );
};
