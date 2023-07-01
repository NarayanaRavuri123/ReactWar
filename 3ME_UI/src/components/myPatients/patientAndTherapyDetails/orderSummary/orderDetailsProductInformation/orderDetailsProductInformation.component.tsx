import { Grid } from "@mui/material";
import "./orderDetailsProductInformation.css";
import { IOrderOverviewProductInformation } from "./orderDetailsProductInformation.interface";

export const OrderDetailsProductInformation = ({
  productInfo,
}: IOrderOverviewProductInformation) => {
  return (
    <div className="orderoverview-prod-info">
      <div className="product-information-component-title">
        <h2
          className="orderoverview-prod-info-title"
          data-testid="orderoverview-prod-info-title"
        >
          Product Information
        </h2>
      </div>
      <Grid className="grid-container" container>
        <div className="all-content-div">
          <div className="content-div-last">
            <Grid className="grid-item" item xs={6}>
              <div className="sub-content-div">
                <h5
                  className="orderoverview-prod-info-content-title"
                  data-testid="product-is-reday-care"
                >
                  V.A.C.® Ready Care?
                </h5>
                <h5
                  className="orderoverview-prod-info-content-value"
                  data-testid="product-is-reday-care-value"
                >
                  {productInfo.isReadyCare.value !== ""
                    ? productInfo.isReadyCare.value
                    : "--"}
                </h5>
              </div>
            </Grid>
            <Grid className="grid-item" item xs={5}>
              <div className="sub-content-div-product">
                <h5
                  className="orderoverview-prod-info-content-title"
                  data-testid="product-product-data"
                >
                  Product
                </h5>
                <h5
                  className="orderoverview-prod-info-content-value"
                  data-testid="product-product-value"
                >
                  {productInfo.productValue.value !== ""
                    ? productInfo.productValue.value
                    : "--"}
                </h5>
              </div>
            </Grid>
            <Grid className="grid-item" item xs={5}>
              <div className="sub-content-div">
                <h5
                  className="orderoverview-prod-info-content-title"
                  data-testid="serial-number-data"
                >
                  Serial Number
                </h5>
                <h5
                  className="orderoverview-prod-info-content-value"
                  data-testid="serial-number-value"
                >
                  {productInfo?.serialNumber?.value !== ""
                    ? productInfo?.serialNumber?.value
                    : "--"}
                </h5>
              </div>
            </Grid>
          </div>
        </div>
      </Grid>
    </div>
  );
};
