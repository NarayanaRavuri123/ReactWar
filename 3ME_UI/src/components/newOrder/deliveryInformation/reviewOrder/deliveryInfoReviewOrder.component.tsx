import moment from "moment";
import { Button } from "@mui/material";
import "./deliveryInfoReviewOrder.css";
import {
  getTextFromCode,
  makeCapitalEachWordInString,
} from "../../../../util/utilityFunctions";
import { IDeliveryInfoReviewOrder } from "./deliveryInfoReviewOrder.interface";

export const DeliveryInfoReviewOrder = ({
  data,
  deliverySites,
  editButtonClicked,
  isOrderSummary = false,
}: IDeliveryInfoReviewOrder) => {
  return (
    <div className="delivery-info-review-order">
      <div className="delivery-info-component-title">
        <h2
          className="delivery-info-review-order-title"
          data-testid="delivery-info-review-order-title"
        >
          Delivery Information
        </h2>
        {!isOrderSummary && (
          <Button
            classes={{ root: "delivery-info-review-order-edit-button" }}
            data-testid="delivery-info-review-order-edit-button"
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
              className="delivery-info-review-order-content-title"
              data-testid="product-need-by-date-and-time"
            >
              Product Need by Date and Time
            </h5>
            <h5
              className="delivery-info-review-order-content-value"
              data-testid="product-need-by-date-and-time-value"
            >
              {data.deliveryProductNeedByDate.value !== ""
                ? `${moment(data.deliveryProductNeedByDate.value).format(
                    "MM/DD/YYYY"
                  )} ${data.deliveryProductNeedByTime.value}`
                : "--"}
            </h5>
          </div>
          <div className="sub-content-div">
            <h5
              className="delivery-info-review-order-content-title"
              data-testid="delivery-site-type"
            >
              Delivery Site Type
            </h5>
            <h5
              className="delivery-info-review-order-content-value"
              data-testid="delivery-site-type-value"
            >
              {data.deliverySiteType.value === ""
                ? "--"
                : getTextFromCode(deliverySites, data.deliverySiteType.value)}
            </h5>
          </div>
        </div>
        <div className="content-div-last">
          <div className="sub-content-div">
            <h5
              className="delivery-info-review-order-content-title"
              data-testid="facility-name"
            >
              Facility Name
            </h5>
            <h5
              className="delivery-info-review-order-content-value"
              data-testid="facility-name-value"
            >
              {data.deliveryFacilityName.value !== ""
                ? makeCapitalEachWordInString(data.deliveryFacilityName.value)
                : "--"}
            </h5>
          </div>
          <div className="sub-content-div">
            <h5
              className="delivery-info-review-order-content-title"
              data-testid="address"
            >
              Address
            </h5>
            <h5
              className="delivery-info-review-order-content-value"
              data-testid="address1-value"
            >
              {data.deliveryAddressLine1.value !== ""
                ? makeCapitalEachWordInString(data.deliveryAddressLine1.value)
                : "--"}
            </h5>
            {data.deliveryAddressLine2.value &&
              data.deliveryAddressLine2.value !== "" && (
                <h5
                  className="delivery-info-review-order-content-value"
                  data-testid="address2-value"
                >
                  {makeCapitalEachWordInString(
                    data.deliveryAddressLine2?.value
                  )}
                </h5>
              )}
            <h5
              className="delivery-info-review-order-content-value"
              data-testid="city-state-zip-value"
            >
              {`${makeCapitalEachWordInString(data.deliveryCity.value)}${
                data.deliveryCity.value !== "" ? ", " : ""
              }${data.deliveryState.value} ${data.deliveryZipCode.value}`}
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};
