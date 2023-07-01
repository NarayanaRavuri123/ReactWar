import { Button } from "@mui/material";
import { makeCapitalEachWordInString } from "../../../../util/utilityFunctions";
import { ISupplyOrder } from "../../supplyOrder.interface";
import "./deliveryAddressReviewOrder.css";

type Props = {
  data: ISupplyOrder;
  openSupplyOrderPageEdit?: any;
  isOrderSummary?: boolean;
};
const DeliveryAddressReviewOrder = ({
  data,
  openSupplyOrderPageEdit,
  isOrderSummary,
}: Props) => {
  return (
    <div className="deliveryAddress-review-order">
      <div className="deliveryAddress-component-title">
        <h2
          className="deliveryAddress-review-order-title"
          data-testid="deliveryAddress-review-order-title"
        >
          Delivery Address
        </h2>
        {!isOrderSummary && (
          <Button
            classes={{ root: "deliveryAddress-review-order-edit-button" }}
            data-testid="deliveryAddress-review-order-edit-button"
            onClick={openSupplyOrderPageEdit}
          >
            Edit
          </Button>
        )}
      </div>
      <div className="all-content-div">
        <div className="sub-content-div">
          <h5
            className="deliveryAddress-review-order-content-title"
            data-testid="deliveryAddress-review-order-content-title-address"
          >
            Address
          </h5>
          <h5
            className="deliveryAddress-review-order-content-value"
            data-testid="deliveryAddress-review-order-content-value-address-value"
          >
            {`${
              data.sameAsCurrentAddress.value === "Yes"
                ? `${makeCapitalEachWordInString(data.caAddressLine1.value)}`
                : `${makeCapitalEachWordInString(data.addressLine1.value)}`
            }`}
          </h5>
          {data.addressLine2.value !== "" && (
            <h5
              className="deliveryAddress-review-order-content-value"
              data-testid="deliveryAddress-review-order-content-value-address2"
            >
              {`${
                data.sameAsCurrentAddress.value === "Yes"
                  ? `${makeCapitalEachWordInString(data.caAddressLine2.value)}`
                  : `${makeCapitalEachWordInString(data.addressLine2.value)}`
              }`}
            </h5>
          )}
          <h5
            className="deliveryAddress-review-order-content-value"
            data-testid="deliveryAddress-review-order-content-value-city"
          >
            {`${
              data.sameAsCurrentAddress.value === "Yes"
                ? `${makeCapitalEachWordInString(data.caCity.value)}` +
                  "," +
                  " " +
                  `${data.caState.value}` +
                  " " +
                  `${data.caZipCode.value}`
                : `${makeCapitalEachWordInString(data.city.value)}` +
                  "," +
                  " " +
                  `${data.state.value}` +
                  " " +
                  `${data.zipCode.value}`
            }`}
          </h5>
        </div>
      </div>
    </div>
  );
};

export default DeliveryAddressReviewOrder;
