import { Button } from "@mui/material";
import { useContext } from "react";
import {
  NewOrderContext,
  NewOrderContextType,
} from "../../../../context/NewOrderContext";
import "./dressingSuppliesReviewOrder.css";
import { IDressingSuppliesReviewOrder } from "./dressingSuppliesReviewOrder.interface";

export const DressingSuppliesReviewOrder = ({
  dressing,
  canister,
  accesssory,
  editButtonClicked,
  isOrderSummary = false,
  newOrderObj,
}: IDressingSuppliesReviewOrder) => {
  //

  return (
    <div className="dressing-supplies-review-order">
      <div className="dressing-supplies-component-title">
        <h2
          className="dressing-supplies-review-order-title"
          data-testid="dressing-supplies-review-order-title"
        >
          Dressings/Supplies
        </h2>
        {!isOrderSummary && (
          <Button
            classes={{ root: "dressing-supplies-review-order-edit-button" }}
            data-testid="dressing-supplies-review-order-edit-button"
            onClick={editButtonClicked}
          >
            Edit
          </Button>
        )}
      </div>
      <div className="all-content-div">
        <div className="content-div">
          <div className="sub-content-div">
            <h5
              className="dressing-supplies-review-order-content-title"
              data-testid="dressing-kit"
            >
              3M™ V.A.C.® Dressing Kit
            </h5>
            {dressing.productName.value !== "" ||
            dressing.secProductName.value !== "" ? (
              <>
                {dressing.productName.value !== "" && (
                  <h5
                    className="dressing-supplies-review-order-content-value"
                    data-testid="dressing-kit-value-primary"
                  >
                    <span className="dot-with-space">&bull; </span>
                    {`${dressing.productQuantity.value} case of ${
                      dressing.productCode.value &&
                      dressing.productCode.value !== ""
                        ? dressing.productCode.value.split("/")[1] ??
                          dressing.productCode.value
                            .match(/\d/g)
                            ?.join("")
                            .replace(/^0+/, "")
                        : dressing.productSizeCode.value.split("/")[1] ??
                          dressing.productSizeCode.value
                            .match(/\d/g)
                            ?.join("")
                            .replace(/^0+/, "")
                    } - ${dressing.productName.value}, ${
                      newOrderObj && newOrderObj.showSize
                        ? dressing.productSizeName.value.split(" (")[0]
                        : ""
                    } (${
                      dressing.productCode.value &&
                      dressing.productCode.value !== ""
                        ? dressing.productCode.value
                        : dressing.productSizeCode.value
                    })`}
                  </h5>
                )}
                {dressing.secProductName.value !== "" && (
                  <h5
                    className="dressing-supplies-review-order-content-value"
                    data-testid="dressing-kit-value-secondary"
                  >
                    <span className="dot-with-space">&bull; </span>
                    {`${dressing.secProductQuantity.value} case of ${
                      dressing.secProductCode.value &&
                      dressing.secProductCode.value !== ""
                        ? dressing.secProductCode.value.split("/")[1] ??
                          dressing.secProductCode.value
                            .match(/\d/g)
                            ?.join("")
                            .replace(/^0+/, "")
                        : dressing.secProductSizeCode.value.split("/")[1] ??
                          dressing.secProductSizeCode.value
                            .match(/\d/g)
                            ?.join("")
                            .replace(/^0+/, "")
                    } - ${dressing.secProductName.value}, ${
                      newOrderObj && newOrderObj.showSecSize
                        ? dressing.secProductSizeName.value.split(" (")[0]
                        : ""
                    } (${
                      dressing.secProductCode.value &&
                      dressing.secProductCode.value !== ""
                        ? dressing.secProductCode.value
                        : dressing.secProductSizeCode.value
                    })`}
                  </h5>
                )}
              </>
            ) : (
              "--"
            )}
          </div>
        </div>
        <div className={"content-div"}>
          <div className="sub-content-div">
            <h5
              className="dressing-supplies-review-order-content-title"
              data-testid="canister-kit"
            >
              3M™ V.A.C.® Canister(s)
            </h5>
            {canister.canisterProductCode.value !== "" &&
            canister.canisterProductCode.value !== "--" ? (
              <h5
                className="dressing-supplies-review-order-content-value"
                data-testid="canister-kit-value"
              >
                <span className="dot-with-space">&bull; </span>
                {`${canister.canisterProductQuantity.value} case of ${
                  canister.canisterProductCode.value.split("/")[1] ??
                  canister.canisterProductCode.value.match(/\d/g)?.join("")
                } - ${canister.canisterProductName.value}, (${
                  canister.canisterProductCode.value
                })`}
              </h5>
            ) : (
              "--"
            )}
          </div>
        </div>
        <div className="content-div-last">
          <div className="sub-content-div">
            <h5
              className="dressing-supplies-review-order-content-title"
              data-testid="accessories-kit"
            >
              3M™ V.A.C.® Therapy Accessories
            </h5>
            {accesssory.accessories && accesssory.accessories.length > 0
              ? accesssory.accessories.map(
                  (
                    accessory: {
                      code: string;
                      value: string;
                    },
                    index
                  ) => {
                    return (
                      <h5
                        className="dressing-supplies-review-order-content-value"
                        data-testid={`accessories-kit-value-${index + 1}`}
                        key={index}
                      >
                        <span className="dot-with-space">&bull; </span>
                        {`1 Pack of ${
                          accessory.code.split("/")[1] ??
                          accessory.code.match(/\d/g)?.join("")
                        } - ${accessory.value}, (${accessory.code})`}
                      </h5>
                    );
                  }
                )
              : "--"}
          </div>
        </div>
      </div>
    </div>
  );
};
