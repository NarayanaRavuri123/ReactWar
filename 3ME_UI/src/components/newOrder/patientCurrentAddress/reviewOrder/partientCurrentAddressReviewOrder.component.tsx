import { Button } from "@mui/material";
import { formatPhoneNumber } from "../../../../util/utilityFunctions";
import "./partientCurrentAddressReviewOrder.css";
import { IPatientCurrentAddressReviewOrder } from "./partientCurrentAddressReviewOrder.interface";

export const PatientCurrentAddressReviewOrder = ({
  data,
  editButtonClicked,
  isOrderSummary = false,
}: IPatientCurrentAddressReviewOrder) => {
  const capitalizeFirst = (str: any) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word: any) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="patient-current-address-review-order">
      <div className="patient-current-address-component-title">
        <h2
          className="patient-current-address-review-order-title"
          data-testid="patient-current-address-review-order-title"
        >
          Patient’s Current Address
        </h2>
        {!isOrderSummary && (
          <Button
            classes={{
              root: "patient-current-address-review-order-edit-button",
            }}
            data-testid="patient-current-address-review-order-edit-button"
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
              className="patient-current-address-review-order-content-title"
              data-testid="current-address"
            >
              Current Address
            </h5>
            <h5
              className="patient-current-address-review-order-content-value"
              data-testid="current-address1-value"
            >
              {data.IsSamePermanentAddress.value === "true"
                ? `${
                    data.address1.value !== ""
                      ? capitalizeFirst(data.address1.value)
                      : "--"
                  }`
                : `${
                    data.patientCurrentAddress1.value !== ""
                      ? capitalizeFirst(data.patientCurrentAddress1.value)
                      : "--"
                  }`}
            </h5>
            {`${
              data.IsSamePermanentAddress.value === "true"
                ? capitalizeFirst(data.address2.value)
                : capitalizeFirst(data.patientCurrentAddress2.value)
            }` !== "" && (
              <h5
                className="patient-current-address-review-order-content-value"
                data-testid="current-address2-value"
              >
                {data.IsSamePermanentAddress.value === "true"
                  ? `${capitalizeFirst(data.address2.value)}`
                  : `${capitalizeFirst(data.patientCurrentAddress2.value)}`}
              </h5>
            )}
            <h5
              className="patient-current-address-review-order-content-value"
              data-testid="current-address-city-state-zip-value"
            >
              {data.IsSamePermanentAddress.value === "true"
                ? `${capitalizeFirst(data.city.value)}${
                    data.city.value !== "" ? ", " : " "
                  }${data.state.value} ${data.zip.value}`
                : `${capitalizeFirst(data.patientCurrentAddressCity.value)}${
                    data.patientCurrentAddressCity.value !== "" ? ", " : " "
                  }${data.patientCurrentAddressState.value} ${
                    data.patientCurrentAddressZip.value
                  }`}
            </h5>
          </div>
          <div className="sub-content-div">
            <h5
              className="patient-current-address-review-order-content-title"
              data-testid="phone"
            >
              Phone Number
            </h5>
            <h5
              className="patient-current-address-review-order-content-value"
              data-testid="phone-value"
            >
              {" "}
              {data.IsSamePermanentAddress.value === "true"
                ? `${
                    data.phone.value !== ""
                      ? formatPhoneNumber(data.phone.value)
                      : "--"
                  }`
                : `${
                    data.patientCurrentAddressPhone.value !== ""
                      ? formatPhoneNumber(data.patientCurrentAddressPhone.value)
                      : "--"
                  }`}
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};
