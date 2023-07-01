import { Button } from "@mui/material";
import "./homeCareProviderReviewOrder.css";
import {
  formatPhoneNumber,
  makeCapitalEachWordInString,
} from "../../../../util/utilityFunctions";
import { IHomeCareProviderReviewOrder } from "./homeCareProviderReviewOrder.interface";

export const HomeCareProviderReviewOrder = ({
  data,
  editButtonClicked,
  isOrderSummary = false,
}: IHomeCareProviderReviewOrder) => {
  return (
    <div className="home-care-provider-review-order">
      <div className="home-care-provider-component-title">
        <h2
          className="home-care-provider-review-order-title"
          data-testid="home-care-provider-review-order-title"
        >
          Home Care Provider
        </h2>
        {!isOrderSummary && (
          <Button
            classes={{ root: "home-care-provider-review-order-edit-button" }}
            data-testid="home-care-provider-review-order-edit-button"
            onClick={editButtonClicked}
          >
            Edit
          </Button>
        )}
      </div>
      <div className="all-content-div">
        <div
          className={
            data.homeCareProvider.value === "yes"
              ? "content-div"
              : "content-div-last"
          }
        >
          <div className="sub-content-div">
            <h5
              className="home-care-provider-review-order-content-title"
              data-testid="do-you-know-who-administering"
            >
              Do you know who will be administering the patient’s dressing
              changes?
            </h5>
            <h5
              className="home-care-provider-review-order-content-value"
              data-testid="do-you-know-who-administering-value"
            >
              {data.homeCareProvider.value !== ""
                ? makeCapitalEachWordInString(data.homeCareProvider.value)
                : "--"}
            </h5>
          </div>
        </div>
        {data.homeCareProvider.value === "yes" && (
          <>
            <div className="content-div">
              <div className="sub-content-div">
                <h5
                  className="home-care-provider-review-order-content-title"
                  data-testid="facility-name"
                >
                  Facility Name
                </h5>
                <h5
                  className="home-care-provider-review-order-content-value"
                  data-testid="facility-name-value"
                >{`${makeCapitalEachWordInString(
                  data.addedCaregiverName.value
                )}`}</h5>
              </div>
              <div className="sub-content-div">
                <h5
                  className="home-care-provider-review-order-content-title"
                  data-testid="facility-type"
                >
                  Facility Type
                </h5>
                <h5
                  className="home-care-provider-review-order-content-value"
                  data-testid="facility-type-value"
                >
                  {data.addedCaregiverFacilityType.value !== ""
                    ? `${data.addedCaregiverFacilityType.value ?? "--"}`
                    : "--"}
                </h5>
              </div>
            </div>
            <div className="content-div-last">
              <div className="sub-content-div">
                <h5
                  className="home-care-provider-review-order-content-title"
                  data-testid="phone-number"
                >
                  Phone
                </h5>
                <h5
                  className="home-care-provider-review-order-content-value"
                  data-testid="phone-number-value"
                >
                  {data.addedCaregiverPhone.value &&
                  data.addedCaregiverPhone.value !== ""
                    ? `${formatPhoneNumber(data.addedCaregiverPhone.value)}`
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
                {data.addedCaregiverAddress1.value &&
                  data.addedCaregiverAddress1.value !== "" && (
                    <h5
                      className="delivery-info-review-order-content-value"
                      data-testid="address1-value"
                    >
                      {`${makeCapitalEachWordInString(
                        data.addedCaregiverAddress1.value
                      )}`}
                    </h5>
                  )}
                {data.addedCaregiverAddress2.value &&
                  data.addedCaregiverAddress2.value !== "" && (
                    <h5
                      className="delivery-info-review-order-content-value"
                      data-testid="address2-value"
                    >
                      {`${makeCapitalEachWordInString(
                        data.addedCaregiverAddress2.value
                      )}`}
                    </h5>
                  )}
                <h5
                  className="delivery-info-review-order-content-value"
                  data-testid="city-state-zip-value"
                >
                  {`${makeCapitalEachWordInString(
                    data.addedCaregiverCity.value
                  )}${data.addedCaregiverCity.value ? ", " : ""}${
                    data.addedCaregiverState.value ?? ""
                  } ${data.addedCaregiverZip.value ?? ""}`}
                </h5>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
