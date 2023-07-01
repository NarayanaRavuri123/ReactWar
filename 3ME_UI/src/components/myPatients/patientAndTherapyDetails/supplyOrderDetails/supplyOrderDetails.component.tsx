import { IOrderedSupplies } from "../orderOverview/orderOverview.interface";
import "./supplyOrderDetails.css";
import { ISupplyOrderProduct } from "./supplyOrderResponseInterface";
export const SupplyOrderDetails = ({
  dressing,
  canister,
  accessory,
}: IOrderedSupplies) => {
  return (
    <div className="orderoverview-supply-order-info">
      <div className="all-content-div">
        <div className="dressing-supplies-component-title">
          <h2
            className="orderoverview-supply-order-info-title"
            data-testid="orderoverview-supply-order-info-title"
          >
            Supplies Ordered
          </h2>
        </div>
        <div className={"content-div"}>
          <div className="sub-content-div">
            <h5
              className="orderoverview-supply-order-info-content-title"
              data-testid="canister-kit"
            >
              3M™ V.A.C.® Dressing Kit
            </h5>
            {dressing?.dressing && dressing.dressing.length > 0
              ? dressing.dressing.map(
                  (rec: ISupplyOrderProduct, index: any) => {
                    return (
                      <h5
                        className="orderoverview-supply-order-info-content-value"
                        data-testid={`accessories-kit-value-${index + 1}`}
                        key={index}
                      >
                        {`${rec.quantity.replace("-", " ")} - ${
                          rec.productDescription
                        },  ${rec.productSize}`}
                        &nbsp;
                        {`(${rec.productNumber})`}
                      </h5>
                    );
                  }
                )
              : "--"}
          </div>
        </div>
        <div className={"content-div"}>
          <div className="sub-content-div">
            <h5
              className="orderoverview-supply-order-info-content-title"
              data-testid="canister-kit"
            >
              3M™ V.A.C.® Canister(s)
            </h5>
            {canister?.canister && canister.canister.length > 0
              ? canister.canister.map(
                  (rec: ISupplyOrderProduct, index: any) => {
                    return (
                      <h5
                        className="orderoverview-supply-order-info-content-value"
                        data-testid={`accessories-kit-value-${index + 1}`}
                        key={index}
                      >
                        {`${rec.quantity.replace("-", " ")} - ${
                          rec.productDescription
                        }   `}
                        &nbsp;{`(${rec.productNumber})`}
                      </h5>
                    );
                  }
                )
              : "--"}
          </div>
        </div>
        <div className={"content-div"}>
          <div className="sub-content-div">
            <h5
              className="orderoverview-supply-order-info-content-title"
              data-testid="canister-kit"
            >
              3M™ V.A.C.® Therapy Accessories
            </h5>
            {accessory?.accessory && accessory.accessory.length > 0
              ? accessory.accessory.map(
                  (rec: ISupplyOrderProduct, index: any) => {
                    return (
                      <h5
                        className="orderoverview-supply-order-info-content-value"
                        data-testid={`accessories-kit-value-${index + 1}`}
                        key={index}
                      >
                        {`${rec.quantity.replace("-", " ")} - ${
                          rec.productDescription
                        }`}
                        &nbsp;&nbsp;
                        {`(${rec.productNumber})`}
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
