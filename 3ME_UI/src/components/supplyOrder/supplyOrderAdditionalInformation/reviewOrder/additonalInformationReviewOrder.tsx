import { Button } from "@mui/material";
import { ISupplyOrder } from "../../supplyOrder.interface";
import "./additionalInformationReviewOrder.css";
type Props = {
  data: ISupplyOrder;
  openSupplyOrderPageEdit?: any;
  isOrderSummary?: boolean;
};

const AdditionalInformationReviewOrder = ({
  data,
  openSupplyOrderPageEdit,
  isOrderSummary,
}: Props) => {
  return (
    <div className="additional-information-review-order">
      <div className="additional-information-component-title">
        <h2
          className="additional-information-review-order-title"
          data-testid="additional-information-review-order-title"
        >
          Additional Information
        </h2>
        {!isOrderSummary && (
          <Button
            classes={{
              root: "additional-information-review-order-edit-button",
            }}
            data-testid="additional-information-review-order-edit-button"
            onClick={openSupplyOrderPageEdit}
          >
            Edit
          </Button>
        )}
      </div>
      <div className="all-content-div">
        <div className="sub-content-div">
          <h5
            className="additional-information-review-order-content-title"
            data-testid="additional-information-review-order-content-title"
          >
            Additional Notes
          </h5>
          <h5
            className="additional-information-review-order-content-value"
            data-testid="additional-information-review-order-content-value"
          >
            {data.provideAdditionalInfo.value !== ""
              ? data.provideAdditionalInfo.value
              : "--"}
          </h5>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInformationReviewOrder;
