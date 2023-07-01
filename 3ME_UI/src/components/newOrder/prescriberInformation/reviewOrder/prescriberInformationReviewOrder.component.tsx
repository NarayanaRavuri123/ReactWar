import { Button } from "@mui/material";
import "./prescriberInformationReviewOrder.css";
import {
  formatPhoneNumber,
  makeCapitalEachWordInString,
} from "../../../../util/utilityFunctions";
import { IPrescriberInformationReviewOrder } from "./prescriberInformationReviewOrder.interface";

export const PrescriberInformationReviewOrder = ({
  data,
  editButtonClicked,
  isOrderSummary = false,
}: IPrescriberInformationReviewOrder) => {
  return (
    <div className="prescriber-information-review-order">
      <div className="prescriber-information-component-title">
        <h2
          className="prescriber-information-review-order-title"
          data-testid="prescriber-information-review-order-title"
        >
          Prescriber Information
        </h2>
        {!isOrderSummary && (
          <Button
            classes={{
              root: "prescriber-information-review-order-edit-button",
            }}
            data-testid="prescriber-information-review-order-edit-button"
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
              className="prescriber-information-review-order-content-title"
              data-testid="prescriber-name"
            >
              Prescriber Name
            </h5>
            <h5
              className="prescriber-information-review-order-content-value"
              data-testid="prescriber-name-value"
            >
              {data
                ? `${makeCapitalEachWordInString(
                    data.firstName
                  )} ${makeCapitalEachWordInString(data.lastName)}`
                : "--"}
            </h5>
          </div>
          <div className="sub-content-div">
            <h5
              className="prescriber-information-review-order-content-title"
              data-testid="npi"
            >
              NPI
            </h5>
            <h5
              className="prescriber-information-review-order-content-value"
              data-testid="npi-value"
            >
              {data?.npi ? `${data.npi}` : "--"}
            </h5>
          </div>
        </div>
        <div className="content-div">
          <div className="sub-content-div">
            <h5
              className="prescriber-information-review-order-content-title"
              data-testid="phone"
            >
              Phone Number
            </h5>
            <h5
              className="prescriber-information-review-order-content-value"
              data-testid="phone-value"
            >
              {data?.telephoneNumber
                ? `${formatPhoneNumber(data.telephoneNumber)}`
                : "--"}
            </h5>
          </div>
          <div className="sub-content-div">
            <h5
              className="prescriber-information-review-order-content-title"
              data-testid="Fax"
            >
              Fax Number
            </h5>
            <h5
              className="prescriber-information-review-order-content-value"
              data-testid="fax-value"
            >
              {data && data.faxNumber
                ? formatPhoneNumber(data.faxNumber)
                : "--"}
            </h5>
          </div>
        </div>
        <div className="content-div-last">
          <div className="sub-content-div">
            <h5
              className="prescriber-information-review-order-content-title"
              data-testid="email"
            >
              Email
            </h5>
            <h5
              className="prescriber-information-review-order-content-value"
              data-testid="email-value"
            >
              {data && data.email
                ? makeCapitalEachWordInString(data.email)
                : "--"}
            </h5>
          </div>
          <div className="sub-content-div">
            <h5
              className="prescriber-information-review-order-content-title"
              data-testid="address"
            >
              Address
            </h5>
            <h5
              className="prescriber-information-review-order-content-value"
              data-testid="address1-value"
            >
              {data && data.address1 && data.address1 !== ""
                ? makeCapitalEachWordInString(data.address1)
                : "--"}
            </h5>
            {data && data.address2 && data.address2 !== "" && (
              <h5
                className="prescriber-information-review-order-content-value"
                data-testid="address2-value"
              >
                {makeCapitalEachWordInString(data.address2)}
              </h5>
            )}
            <h5
              className="prescriber-information-review-order-content-value"
              data-testid="city-state-zip-value"
            >
              {makeCapitalEachWordInString(data?.city ?? "")}
              {data?.city ? ", " : ""}
              {data?.state} {data?.zipCode}
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};
