import { Button } from "@mui/material";
import "./verifyRequesterInfoReviewOrder.css";
import { makeCapitalEachWordInString } from "../../../../util/utilityFunctions";
import { IVerifyRequesterInfoReviewOrder } from "./verifyRequesterInfoReviewOrder.interface";

export const VerifyRequesterInfoReviewOrder = ({
  data,
  facility,
  editButtonClicked,
  isOrderSummary = false,
}: IVerifyRequesterInfoReviewOrder) => {
  return (
    <div className="verify-requester-info-review-order">
      <div className="verify-requester-info-component-title">
        <h2
          className="verify-requester-info-review-order-title"
          data-testid="verify-requester-info-review-order-title"
        >
          Verify Requester Info
        </h2>
        {!isOrderSummary && (
          <Button
            classes={{ root: "verify-requester-info-review-order-edit-button" }}
            data-testid="verify-requester-info-review-order-edit-button"
            onClick={editButtonClicked}
          >
            Edit
          </Button>
        )}
      </div>
      <div className="all-content-div">
        <div className={facility ? "content-div" : "content-div-last"}>
          <div className="sub-content-div">
            <h5
              className="verify-requester-info-review-order-content-title"
              data-testid="requester-name"
            >
              Requester Name
            </h5>
            <h5
              className="verify-requester-info-review-order-content-value"
              data-testid="requester-name-value"
            >
              {data.requesterFirstName.value && data.requesterLastName.value
                ? `${data.requesterFirstName.value} ${data.requesterLastName.value}`
                : "--"}
            </h5>
          </div>
          <div className="sub-content-div">
            <h5
              className="verify-requester-info-review-order-content-title"
              data-testid="requester-email"
            >
              Requester Email
            </h5>
            <h5
              className="verify-requester-info-review-order-content-value"
              data-testid="requester-email-value"
            >
              {`${
                data.requesterEmail.value !== ""
                  ? data.requesterEmail.value
                  : "--"
              }`}
            </h5>
          </div>
        </div>
        {facility && (
          <>
            <div className="content-div">
              <div className="sub-content-div">
                <h5
                  className="verify-requester-info-review-order-content-title"
                  data-testid="facility-name"
                >
                  Facility Name
                </h5>
                <h5
                  className="verify-requester-info-review-order-content-value"
                  data-testid="facility-name-value"
                >
                  {makeCapitalEachWordInString(
                    facility.accountName !== "" ? facility.accountName : "--"
                  )}
                </h5>
              </div>
              <div className="sub-content-div">
                <h5
                  className="verify-requester-info-review-order-content-title"
                  data-testid="facility-type"
                >
                  Facility Type
                </h5>
                <h5
                  className="verify-requester-info-review-order-content-value verify-requestor-info-facility-type"
                  data-testid="facility-type-value"
                >
                  {makeCapitalEachWordInString(
                    facility.typeName !== "" ? facility.typeName : "--"
                  )}
                </h5>
              </div>
            </div>
            <div className="content-div-last">
              <div className="sub-content-div">
                <h5
                  className="verify-requester-info-review-order-content-title"
                  data-testid="facility-id"
                >
                  Facility ID
                </h5>
                <h5
                  className="verify-requester-info-review-order-content-value"
                  data-testid="facility-id-value"
                >{`${
                  facility.accountNumber === 0 ? "--" : facility.accountNumber
                }`}</h5>
              </div>
              <div className="sub-content-div">
                <h5
                  className="delivery-info-review-order-content-title"
                  data-testid="address"
                >
                  Address
                </h5>
                {facility.address1 !== "" ||
                facility.city !== "" ||
                facility.state !== "" ? (
                  <>
                    {facility.address1 && facility.address1 !== "" && (
                      <h5
                        className="delivery-info-review-order-content-value"
                        data-testid="address1-value"
                      >
                        {makeCapitalEachWordInString(facility.address1)}
                      </h5>
                    )}
                    {facility.address2 && facility.address2 !== "" && (
                      <h5
                        className="delivery-info-review-order-content-value"
                        data-testid="address2-value"
                      >
                        {makeCapitalEachWordInString(facility.address2)}
                      </h5>
                    )}
                    {facility.city &&
                      facility.city !== "" &&
                      facility.state &&
                      facility.state !== "" && (
                        <h5
                          className="delivery-info-review-order-content-value"
                          data-testid="city-state-zip-value"
                        >
                          {`${makeCapitalEachWordInString(facility.city)}${
                            facility.city !== "" ? ", " : ""
                          }${facility.state} ${
                            facility.zip === 0 ? "--" : facility.zip
                          }`}
                        </h5>
                      )}
                  </>
                ) : (
                  <h5
                    className="delivery-info-review-order-content-value"
                    data-testid="address2-value"
                  >
                    {"--"}
                  </h5>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
