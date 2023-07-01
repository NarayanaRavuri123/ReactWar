import { Button } from "@mui/material";
import {
  getTextFromCode,
  makeCapitalEachWordInString,
} from "../../../../util/utilityFunctions";
import "./productInformationReviewOrder.css";
import { IProductInformationReviewOrder } from "./productInformationReviewOrder.interface";

export const ProductInformationReviewOrder = ({
  productInfo,
  editButtonClicked,
  productValues,
  isOrderSummary = false,
  isReadyCare = false,
}: IProductInformationReviewOrder) => {
  return (
    <div className="product-information-review-order">
      <div className="product-information-component-title">
        <h2
          className="product-information-review-order-title"
          data-testid="product-information-review-order-title"
        >
          Product Information
        </h2>
        {!isOrderSummary && (
          <Button
            classes={{ root: "product-information-review-order-edit-button" }}
            data-testid="product-information-review-order-edit-button"
            onClick={editButtonClicked}
          >
            Edit
          </Button>
        )}
      </div>
      <div className="all-content-div">
        {isReadyCare && (
          <div className="content-div">
            <div className="sub-content-div">
              <h5
                className="product-information-review-order-content-title"
                data-testid="product-information"
              >
                Will this order be using one of your 3M™ V.A.C.® Ready Care
                Program Units?
              </h5>
              <h5
                className="product-information-review-order-content-value"
                data-testid="product-information-value"
              >{`${makeCapitalEachWordInString(
                productInfo.productInformation.value === ""
                  ? "--"
                  : productInfo.productInformation.value
              )}`}</h5>
            </div>
          </div>
        )}
        <div className="content-div-last">
          <div className="sub-content-div">
            <h5
              className="product-information-review-order-content-title"
              data-testid="product"
            >
              Product
            </h5>
            <h5
              className="product-information-review-order-content-value"
              data-testid="product-value"
            >
              {productInfo.productValue.value !== ""
                ? getTextFromCode(productValues, productInfo.productValue.value)
                : "--"}
            </h5>
          </div>
          <div className="sub-content-div"></div>
        </div>
      </div>
    </div>
  );
};
