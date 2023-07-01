import { Button } from "@mui/material";
import {
  formatPhoneNumber,
  makeCapitalEachWordInString,
} from "../../../../util/utilityFunctions";
import "./emergencyContactReviewOrder.css";
import { IEmergencyContactReviewOrder } from "./emergencyContactReviewOrder.interface";

export const EmergencyContactReviewOrder = ({
  data,
  editButtonClicked,
  isOrderSummary = false,
}: IEmergencyContactReviewOrder) => {
  return (
    <div className="emergency-contact-review-order">
      <div className="emergency-contact-component-title">
        <h2
          className="emergency-contact-review-order-title"
          data-testid="emergency-contact-review-order-title"
        >
          Emergency Contact Info
        </h2>
        {!isOrderSummary && (
          <Button
            classes={{ root: "emergency-contact-review-order-edit-button" }}
            data-testid="emergency-contact-review-order-edit-button"
            onClick={editButtonClicked}
          >
            Edit
          </Button>
        )}
      </div>
      <div className="content-div">
        <div className="sub-content-div">
          <h5
            className="emergency-contact-review-order-content-title"
            data-testid="name"
          >
            Name
          </h5>
          <h5
            className="emergency-contact-review-order-content-value"
            data-testid="name-value"
          >
            {data.emergencyContactFirstName.value !== "" ||
            data.emergencyContactLastName.value !== ""
              ? `${makeCapitalEachWordInString(
                  data.emergencyContactFirstName.value
                )}${
                  data.emergencyContactFirstName.value.length ? " " : ""
                }${makeCapitalEachWordInString(
                  data.emergencyContactLastName.value
                )}`
              : "--"}
          </h5>
        </div>
        <div className="sub-content-div">
          <h5
            className="emergency-contact-review-order-content-title"
            data-testid="phone-number"
          >
            Phone Number
          </h5>
          <h5
            className="emergency-contact-review-order-content-value"
            data-testid="phone-number-value"
          >
            {data.emergencyContactPhoneNumber.value !== "" &&
            data.emergencyContactPhoneNumber.value !== "(___) ___-____"
              ? `${formatPhoneNumber(data.emergencyContactPhoneNumber.value)}`
              : "--"}
          </h5>
        </div>
      </div>
    </div>
  );
};
