import "./patientInfoReviewOrder.css";
import { Button } from "@mui/material";
import { IPatientInfoReviewOrder } from "./patientInfoReviewOrder.interface";
import moment from "moment";
import {
  formatPhoneNumber,
  makeCapitalEachWordInString,
} from "../../../../util/utilityFunctions";

export const PatientInfoReviewOrder = ({
  data,
  editButtonClicked,
  isOrderSummary = false,
}: IPatientInfoReviewOrder) => {
  return (
    <div className="patient-info-review-order">
      <div className="patient-info-component-title">
        <h2
          className="patient-info-review-order-title"
          data-testid="patient-info-review-order-title"
        >
          Patient Information
        </h2>
        {!isOrderSummary && (
          <Button
            classes={{ root: "patient-info-review-order-edit-button" }}
            data-testid="patient-info-review-order-edit-button"
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
              className="patient-info-review-order-content-title"
              data-testid="name"
            >
              Full Name
            </h5>
            <h5
              className="patient-info-review-order-content-value"
              data-testid="name-value"
            >{`${
              data.firstName.value !== ""
                ? makeCapitalEachWordInString(data.firstName.value)
                : "--"
            } 
            ${makeCapitalEachWordInString(data.lastName.value)}`}</h5>
          </div>
          <div className="sub-content-div">
            <h5
              className="patient-info-review-order-content-title"
              data-testid="date-of-birth"
            >
              Date of Birth
            </h5>
            <h5
              className="patient-info-review-order-content-value"
              data-testid="date-of-birth-value"
            >
              {data.dob.value !== ""
                ? `${moment(data.dob.value).format("MM/DD/YYYY")}`
                : "--"}
            </h5>
          </div>
        </div>
        <div className="content-div">
          <div className="sub-content-div">
            <h5
              className="patient-info-review-order-content-title"
              data-testid="phone"
            >
              Phone Number
            </h5>
            <h5
              className="patient-info-review-order-content-value"
              data-testid="phone-value"
            >
              {data.phone.value !== ""
                ? `${formatPhoneNumber(data.phone.value)}`
                : "--"}
            </h5>
          </div>
          <div className="sub-content-div">
            <h5
              className="patient-info-review-order-content-title"
              data-testid="email"
            >
              Patient Email Address
            </h5>
            <h5
              className="patient-info-review-order-content-value"
              data-testid="email-value"
            >
              {data.email.value !== ""
                ? makeCapitalEachWordInString(data.email.value)
                : "--"}
            </h5>
          </div>
        </div>
        <div className="content-div-last">
          <div className="sub-content-div">
            <h5
              className="patient-info-review-order-content-title"
              data-testid="permanent-address"
            >
              Permanent Address
            </h5>
            <h5
              className="patient-info-review-order-content-value"
              data-testid="permanent-address1-value"
            >
              {data.address1.value !== ""
                ? `${makeCapitalEachWordInString(data.address1.value)}`
                : "--"}
            </h5>
            {data.address2.value !== "" &&
              makeCapitalEachWordInString(data.address2.value) !== "--" && (
                <h5
                  className="patient-info-review-order-content-value"
                  data-testid="permanent-address2-value"
                >
                  {`${makeCapitalEachWordInString(data.address2.value)}`}
                </h5>
              )}
            <h5
              className="patient-info-review-order-content-value"
              data-testid="permanent-city-state-zip-value"
            >
              {`${makeCapitalEachWordInString(data.city.value)}${
                data.city.value !== "" ? ", " : ""
              }${data.state.value} ${data.zip.value}`}
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};
