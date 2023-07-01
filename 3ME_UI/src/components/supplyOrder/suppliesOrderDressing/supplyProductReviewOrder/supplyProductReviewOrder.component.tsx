import React, { useContext } from "react";
import "./supplyProductReviewOrder.css";
import Button from "@mui/material/Button";
import SupplyProductReviewTable from "./supplyProductReviewTable.component";
import { ISupplyOrder } from "../../supplyOrder.interface";
import {
  SupplyOrderContext,
  SupplyOrderContextType,
} from "../../../../context/SupplyOrderContext";
type Props = {
  isReviewOrder: boolean;
  openSupplyOrderPageEdit?: any;
  data: ISupplyOrder;
  isOrderSummary?: boolean;
};

const columns = [
  { label: "Qty", accessor: "qtyid", sortable: false },
  { label: "Product", accessor: "Productid", sortable: false },
];
const SupplyProductReviewOrder = ({
  openSupplyOrderPageEdit,
  isOrderSummary,
}: Props) => {
  const SupplyOrderObj = useContext<SupplyOrderContextType | null>(
    SupplyOrderContext
  );
  const accessories = SupplyOrderObj?.accessory;
  const dressing = SupplyOrderObj?.dressingKit;
  const canister = SupplyOrderObj?.canister;

  return (
    <div className="supply-header-main">
      <div className="supply-header">
        <div className="supply-header-review-order-title">Supply Selection</div>
        {!isOrderSummary && (
          <Button
            classes={{ root: "supply-header-review-order-edit-button" }}
            data-testid="supply-header-review-order-edit-button"
            onClick={openSupplyOrderPageEdit}
          >
            Edit
          </Button>
        )}
      </div>
      <div className="table_container_review">
        <SupplyProductReviewTable
          accessories={accessories!}
          columns={columns}
          canister={canister!}
          dressing={dressing!}
        />
      </div>
    </div>
  );
};

export default SupplyProductReviewOrder;
