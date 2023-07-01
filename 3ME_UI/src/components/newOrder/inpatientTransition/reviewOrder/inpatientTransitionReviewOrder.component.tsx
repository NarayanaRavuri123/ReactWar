import moment from "moment";
import { Button } from "@mui/material";
import "./inpatientTransitionReviewOrder.css";
import { makeCapitalEachWordInString } from "../../../../util/utilityFunctions";
import { IInpatientTransitionReviewOrder } from "./inpatientTransitionReviewOrder.interface";

export const InpatientTransitionReviewOrder = ({
  data,
  facility,
  editButtonClicked,
  isOrderSummary = false,
}: IInpatientTransitionReviewOrder) => {
  return (
    <div className="inpatient-transition-review-order">
      <div className="inpatient-transition-component-title">
        <h2
          className="inpatient-transition-review-order-title"
          data-testid="inpatient-transition-review-order-title"
        >
          Inpatient Transition
        </h2>
        {!isOrderSummary && (
          <Button
            classes={{ root: "inpatient-transition-review-order-edit-button" }}
            data-testid="inpatient-transition-review-order-edit-button"
            onClick={editButtonClicked}
          >
            Edit
          </Button>
        )}
      </div>
      <div className="all-content-div">
        <div
          className={
            data.wasNPWTInitiated.value === "yes"
              ? "content-div"
              : "content-div-last"
          }
        >
          <div className="sub-content-div">
            <h5
              className="inpatient-transition-review-order-content-title"
              data-testid="wasNPWTInitiated"
            >
              Was Negative Pressure Wound Therapy (NPWT) initiated in an
              inpatient facility or has the patient been on NPWT in the last 60
              days?
            </h5>
            <h5
              className="inpatient-transition-review-order-content-value"
              data-testid="wasNPWTInitiated-value"
            >
              {data.wasNPWTInitiated.value && data.wasNPWTInitiated.value !== ""
                ? makeCapitalEachWordInString(data.wasNPWTInitiated.value)
                : "--"}
            </h5>
          </div>
        </div>
        {data.wasNPWTInitiated.value === "yes" && (
          <>
            <div className={facility ? "content-div" : "content-div-last"}>
              <div className="sub-content-div">
                <h5
                  className="inpatient-transition-review-order-content-title"
                  data-testid="dateInitiated"
                >
                  Date initiated
                </h5>
                <h5
                  className="inpatient-transition-review-order-content-value"
                  data-testid="dateInitiated-value"
                >
                  {data.dateInitiated.value !== "--"
                    ? moment(data.dateInitiated.value).format("MM/DD/YYYY")
                    : "--"}
                </h5>
              </div>
              <div className="sub-content-div"></div>
            </div>
            {facility && (
              <>
                <div className="content-div">
                  <div className="sub-content-div">
                    <h5
                      className="inpatient-transition-review-order-content-title"
                      data-testid="facility-name"
                    >
                      Facility Name
                    </h5>
                    <h5
                      className="inpatient-transition-review-order-content-value"
                      data-testid="facility-name-value"
                    >
                      {makeCapitalEachWordInString(facility.accountName)}
                    </h5>
                  </div>
                  <div className="sub-content-div">
                    <h5
                      className="inpatient-transition-review-order-content-title"
                      data-testid="facility-type"
                    >
                      Facility Type
                    </h5>
                    <h5
                      className="inpatient-transition-review-order-content-value inpatient-transition-facility-type"
                      data-testid="facility-type-value"
                    >
                      {makeCapitalEachWordInString(facility.typeName)}
                    </h5>
                  </div>
                </div>
                <div className="content-div-last">
                  <div className="sub-content-div">
                    <h5
                      className="inpatient-transition-review-order-content-title"
                      data-testid="facility-id"
                    >
                      Facility ID
                    </h5>
                    <h5
                      className="inpatient-transition-review-order-content-value"
                      data-testid="facility-id-value"
                    >{`${
                      facility.accountNumber === 0
                        ? "--"
                        : facility.accountNumber
                    }`}</h5>
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
                      {makeCapitalEachWordInString(facility.address1)}
                    </h5>
                    {facility.address2 &&
                      facility.address2 !== "" &&
                      facility.address2 !== "--" && (
                        <h5
                          className="delivery-info-review-order-content-value"
                          data-testid="address2-value"
                        >
                          {makeCapitalEachWordInString(facility.address2)}
                        </h5>
                      )}
                    <h5
                      className="delivery-info-review-order-content-value"
                      data-testid="city-state-zip-value"
                    >
                      {`${makeCapitalEachWordInString(facility.city)}${
                        facility.city !== "" ? ", " : ""
                      }${facility.state} ${facility.zip}`}
                    </h5>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};
