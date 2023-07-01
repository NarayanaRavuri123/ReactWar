import "./insuranceReviewOrder.css";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import {
  IPayerIDAllDetails,
  IPayerIDDetails,
} from "../insuranceInformation/insuranceInformation.interface";
import { IInsuranceReviewOrder } from "./insuranceReviewOrder.interface";
import {
  formatPhoneNumber,
  getTextFromCode,
  makeCapitalEachWordInString,
} from "../../../../util/utilityFunctions";

export const InsuranceReviewOrder = ({
  data,
  insuranceTypes,
  isPrimaryComponent,
  editButtonClicked,
  newOrderData,
  type,
  isOrderSummary = false,
}: IInsuranceReviewOrder) => {
  const [insuranceType, setInsuranceType] = useState<number | null>(null);
  const [payerDetail, setPayerDetail] = useState<IPayerIDDetails | null>(null);
  const [payerAllDetail, setPayerAllDetail] =
    useState<IPayerIDAllDetails | null>(null);

  useEffect(() => {
    if (type.orderPayerDetails) {
      setPayerAllDetail(data.orderPayerDetails!);
      setInsuranceType(6);
    } else {
      if (type.commercialInsurance) {
        setPayerAllDetail(data.commercialInsurance);
        setInsuranceType(6);
      } else if (type.managedMedicaid) {
        setPayerAllDetail(data.managedMedicaid);
        setInsuranceType(6);
      } else if (type.medicaid) {
        setPayerDetail(data.medicaid);
        setInsuranceType(3);
      } else if (type.medicare) {
        setPayerDetail(data.medicare);
        setInsuranceType(3);
      } else if (type.medicareAdvantage) {
        setPayerAllDetail(data.medicareAdvantage);
        setInsuranceType(6);
      } else if (type.privatePay) {
        setInsuranceType(2);
      } else if (type.otherAdditionalDetails) {
        setInsuranceType(1);
      } else {
        setInsuranceType(0);
      }
    }
  }, []);

  return (
    <div className="insurance-review-order">
      <div className="insurance-component-title">
        <h2
          className="insurance-review-order-title"
          data-testid="insurance-review-order-title"
        >
          {`${
            isPrimaryComponent ? "Primary" : "Secondary"
          } Insurance Information`}
        </h2>
        {!isOrderSummary && (
          <Button
            classes={{ root: "insurance-review-order-edit-button" }}
            data-testid="insurance-review-order-edit-button"
            onClick={editButtonClicked}
          >
            Edit
          </Button>
        )}
      </div>
      <div className="all-content-div">
        {insuranceType === 0 && (
          <div className="content-div-last">
            <div className="sub-content-div">
              <div className="sub-content-div">
                <h5
                  className="insurance-review-order-content-title"
                  data-testid="insurance-type"
                >
                  Insurance Type
                </h5>
                <h5
                  className="insurance-review-order-content-value"
                  data-testid="insurance-type-value"
                >
                  {data.insuranceTypeCode.value !== ""
                    ? getTextFromCode(
                        insuranceTypes,
                        data.insuranceTypeCode.value
                      )
                    : "--"}
                </h5>
              </div>
            </div>
          </div>
        )}
        {insuranceType === 1 && (
          <div className="content-div-last">
            <div className="sub-content-div">
              <div className="sub-content-div">
                <h5
                  className="insurance-review-order-content-title"
                  data-testid="insurance-type"
                >
                  Insurance Type
                </h5>
                <h5
                  className="insurance-review-order-content-value"
                  data-testid="insurance-type-value"
                >
                  {getTextFromCode(
                    insuranceTypes,
                    data.insuranceTypeCode.value
                  )}
                </h5>
              </div>
            </div>
            <div className="sub-content-div">
              <h5
                className="insurance-review-order-content-title"
                data-testid="additional-detail"
              >
                Additional Details
              </h5>
              <h5
                className="insurance-review-order-content-value"
                data-testid="additional-detail-value"
              >{`${data.otherAdditionalDetails.value}`}</h5>
            </div>
          </div>
        )}
        {insuranceType === 2 && (
          <div>
            <div className="content-div">
              <div className="sub-content-div">
                <div className="sub-content-div">
                  <h5
                    className="insurance-review-order-content-title"
                    data-testid="insurance-type"
                  >
                    Insurance Type
                  </h5>
                  <h5
                    className="insurance-review-order-content-value"
                    data-testid="insurance-type-value"
                  >
                    {getTextFromCode(
                      insuranceTypes,
                      data.insuranceTypeCode.value
                    )}
                  </h5>
                </div>
              </div>
              <div className="sub-content-div"></div>
            </div>
            <div className="content-div-last">
              <div className="sub-content-div">
                <div className="sub-content-div">
                  <h5
                    className="insurance-review-order-content-title"
                    data-testid="payer-name"
                  >
                    Payer Name
                  </h5>
                  <h5
                    className="insurance-review-order-content-value"
                    data-testid="payer-name-value"
                  >{`${makeCapitalEachWordInString(
                    newOrderData.firstName.value
                  )} ${makeCapitalEachWordInString(
                    newOrderData.lastName.value
                  )}`}</h5>
                </div>
              </div>
              <div className="sub-content-div">
                <h5
                  className="insurance-review-order-content-title"
                  data-testid="contact-details"
                >
                  Contact Details
                </h5>
                {newOrderData.email.value !== "" && (
                  <h5
                    className="insurance-review-order-content-value"
                    data-testid="contact-details-value-email"
                  >{`${makeCapitalEachWordInString(
                    newOrderData.email.value
                  )}`}</h5>
                )}
                <h5
                  className="insurance-review-order-content-value"
                  data-testid="contact-details-value-phone"
                >{`${formatPhoneNumber(newOrderData.phone.value)}`}</h5>
              </div>
            </div>
          </div>
        )}
        {insuranceType === 3 && payerDetail && (
          <div>
            <div className="content-div">
              <div className="sub-content-div">
                <div className="sub-content-div">
                  <h5
                    className="insurance-review-order-content-title"
                    data-testid="insurance-type"
                  >
                    Insurance Type
                  </h5>
                  <h5
                    className="insurance-review-order-content-value"
                    data-testid="insurance-type-value"
                  >
                    {getTextFromCode(
                      insuranceTypes,
                      data.insuranceTypeCode.value
                    )}
                  </h5>
                </div>
              </div>
              <div className="sub-content-div"></div>
            </div>
            <div className="content-div-last">
              <div className="sub-content-div">
                <div className="sub-content-div">
                  <h5
                    className="insurance-review-order-content-title"
                    data-testid="member-id"
                  >
                    Member ID
                  </h5>
                  <h5
                    className="insurance-review-order-content-value"
                    data-testid="member-id-value"
                  >{`${payerDetail.memberID.value}`}</h5>
                </div>
              </div>
              <div className="sub-content-div">
                <h5
                  className="insurance-review-order-content-title"
                  data-testid="relationship-to-insured"
                >
                  Relationship to Insured
                </h5>
                <h5
                  className="insurance-review-order-content-value"
                  data-testid="relationship-to-insured-value"
                >{`${payerDetail.relationShipInsured.value}`}</h5>
              </div>
            </div>
          </div>
        )}
        {insuranceType === 6 && payerAllDetail && (
          <>
            <div className="content-div">
              <div className="sub-content-div">
                <div className="sub-content-div">
                  <h5
                    className="insurance-review-order-content-title"
                    data-testid="payer-name"
                  >
                    Payer Name
                  </h5>
                  <h5
                    className="insurance-review-order-content-value"
                    data-testid="payer-name-value"
                  >{`${makeCapitalEachWordInString(
                    payerAllDetail.payerName.value
                  )}`}</h5>
                </div>
              </div>
              <div className="sub-content-div">
                <h5
                  className="insurance-review-order-content-title"
                  data-testid="payer-type"
                >
                  Payer Type
                </h5>
                <h5
                  className="insurance-review-order-content-value"
                  data-testid="payer-type-value"
                >
                  {data.insuranceTypeCode.value === ""
                    ? "--"
                    : getTextFromCode(
                        insuranceTypes,
                        data.insuranceTypeCode.value
                      )}
                </h5>
              </div>
            </div>
            <div className="content-div">
              <div className="sub-content-div">
                <div className="sub-content-div">
                  <h5
                    className="insurance-review-order-content-title"
                    data-testid="member-id"
                  >
                    Member ID
                  </h5>
                  <h5
                    className="insurance-review-order-content-value"
                    data-testid="member-id-value"
                  >{`${payerAllDetail.memberID.value}`}</h5>
                </div>
              </div>
              <div className="sub-content-div">
                <h5
                  className="insurance-review-order-content-title"
                  data-testid="group-id"
                >
                  Group ID
                </h5>
                <h5
                  className="insurance-review-order-content-value"
                  data-testid="group-id-value"
                >
                  {payerAllDetail.groupID.value
                    ? payerAllDetail.groupID.value
                    : "--"}
                </h5>
              </div>
            </div>
            <div className="content-div-last">
              <div className="sub-content-div">
                <div className="sub-content-div">
                  <h5
                    className="insurance-review-order-content-title"
                    data-testid="payer-contact-number"
                  >
                    Payer Contact Number
                  </h5>
                  <h5
                    className="insurance-review-order-content-value"
                    data-testid="payer-contact-number-value"
                  >{`${formatPhoneNumber(
                    payerAllDetail.payerContactNumber.value
                  )} ${
                    payerAllDetail.extension.value
                      ? `x${payerAllDetail.extension.value}`
                      : ""
                  }`}</h5>
                </div>
              </div>
              <div className="sub-content-div">
                <h5
                  className="insurance-review-order-content-title"
                  data-testid="relationship-to-insured"
                >
                  Relationship to Insured
                </h5>
                <h5
                  className="insurance-review-order-content-value"
                  data-testid="relationship-to-insured-value"
                >{`${payerAllDetail.relationShipInsured.value}`}</h5>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
