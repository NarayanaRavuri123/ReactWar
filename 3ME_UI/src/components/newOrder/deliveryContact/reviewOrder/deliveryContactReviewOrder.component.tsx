import { Button } from "@mui/material";
import "./deliveryContactReviewOrder.css";
import {
  formatPhoneNumber,
  makeCapitalEachWordInString,
} from "../../../../util/utilityFunctions";
import { IDeliveryContactReviewOrder } from "./deliveryContactReviewOrder.interface";

export const DeliveryContactReviewOrder = ({
  data,
  editButtonClicked,
  isOrderSummary = false,
}: IDeliveryContactReviewOrder) => {
  return (
    <div className="delivery-contact-review-order">
      <div className="delivery-contact-component-title">
        <h2
          className="delivery-contact-review-order-title"
          data-testid="delivery-contact-review-order-title"
        >
          Delivery Contact
        </h2>
        {!isOrderSummary && (
          <Button
            classes={{ root: "delivery-contact-review-order-edit-button" }}
            data-testid="delivery-contact-review-order-edit-button"
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
              className="delivery-contact-review-order-content-title"
              data-testid="name"
            >
              Name
            </h5>
            <h5
              className="delivery-contact-review-order-content-value"
              data-testid="name-value"
            >
              {data.deliveryContactFirstName.value ||
              data.deliveryContactLastName.value
                ? `${makeCapitalEachWordInString(
                    data.deliveryContactFirstName.value
                  )} ${makeCapitalEachWordInString(
                    data.deliveryContactLastName.value
                  )}`
                : "--"}
            </h5>
          </div>
          <div className="sub-content-div">
            <h5
              className="delivery-contact-review-order-content-title"
              data-testid="phone-number"
            >
              Phone Number
            </h5>
            <h5
              className="delivery-contact-review-order-content-value"
              data-testid="phone-number-value"
            >
              {data.deliveryContactPhone.value !== ""
                ? `${formatPhoneNumber(data.deliveryContactPhone.value)}`
                : "--"}
            </h5>
          </div>
        </div>
        <div className="content-div-last">
          <div className="sub-content-div">
            <h5
              className="delivery-contact-review-order-content-title"
              data-testid="instructions"
            >
              Delivery Instructions
            </h5>
            <h5
              className="delivery-contact-review-order-content-value"
              data-testid="instructions-value"
            >
              {data.deliveryInstructions.value !== ""
                ? data.deliveryInstructions.value
                : "--"}
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};
