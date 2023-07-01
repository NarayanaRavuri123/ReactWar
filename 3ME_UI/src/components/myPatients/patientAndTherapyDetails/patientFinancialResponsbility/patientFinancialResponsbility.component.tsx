import { Grid } from "@mui/material";
import { useContext } from "react";
import {
  OrderDetailContext,
  OrderDetailContextType,
} from "../../../../context/OrderDetailsContext";
import { IPatientFinResponsbility } from "../orderOverview/orderOverview.interface";
import "./patientFinancialResponsbility.css";

export const PatientFinancialResponsbility = ({
  patientData,
  newOrderData,
}: IPatientFinResponsbility) => {
  const orderOverviewObj = useContext<OrderDetailContextType | null>(
    OrderDetailContext
  );

  return (
    <>
      <div className="patient-fin-responsbility">
        <div className="pfin-parent-div">
          <div className="patient-fin-component-title">
            <h2
              className="patient-fin-responsbility-title"
              data-testid="fin-responsbility-header-main"
            >
              Patient Financial Responsibility
            </h2>
          </div>
          <div className="content-sec-firs-pfin-responsbility">
            <Grid className="grid-container" container spacing={2}>
              <Grid className="grid-item" item xs={6}>
                <div className="sub-content-div-pfin-responsbility">
                  <h5
                    className="pfin-inforesponsbility-content-title"
                    data-testid="payer-responsbility"
                  >
                    Payer Responsibility
                  </h5>
                  <p
                    className="pfin-inforesponsbility-content-value"
                    data-testid=""
                  >
                    {orderOverviewObj?.financialInfoResponseData
                      ?.payerResponsibility !== ""
                      ? orderOverviewObj?.financialInfoResponseData
                          ?.payerResponsibility
                      : "--"}
                  </p>
                </div>
              </Grid>
              <Grid className="grid-item" item xs={6}>
                <div className="sub-content-div-pfin-responsbility">
                  <h5
                    className="pfin-inforesponsbility-content-title"
                    data-testid="out-of-pkt-max"
                  >
                    Out of Pocket Max
                  </h5>
                  <p
                    className="pfin-inforesponsbility-content-value"
                    data-testid=""
                  >
                    {orderOverviewObj?.financialInfoResponseData
                      ?.outOfPocket !== ""
                      ? orderOverviewObj?.financialInfoResponseData?.outOfPocket
                      : "--"}
                  </p>
                </div>
              </Grid>
              <Grid className="grid-item" item xs={6}>
                <div className="sub-content-div-pfin-responsbility">
                  <h5
                    className="pfin-inforesponsbility-content-title"
                    data-testid="co-pay-tst-id"
                  >
                    Co-Pay
                  </h5>
                  <p
                    className="pfin-inforesponsbility-content-value"
                    data-testid=""
                  >
                    {orderOverviewObj?.financialInfoResponseData?.coPay !== ""
                      ? orderOverviewObj?.financialInfoResponseData?.coPay
                      : "--"}
                  </p>
                </div>
              </Grid>
              <Grid className="grid-item" item xs={6}>
                <div className="sub-content-div-pfin-responsbility">
                  <h5
                    className="pfin-inforesponsbility-content-title"
                    data-testid=""
                  >
                    Patient Estimated Rental Amount
                  </h5>
                  <p
                    className="pfin-inforesponsbility-content-value"
                    data-testid=""
                  >
                    {orderOverviewObj?.financialInfoResponseData
                      ?.estimatedRentalAmount !== ""
                      ? orderOverviewObj?.financialInfoResponseData
                          ?.estimatedRentalAmount
                      : "--"}
                  </p>
                </div>
              </Grid>
              <Grid className="grid-item" item xs={6}>
                <div className="sub-content-div-pfin-responsbility">
                  <h5
                    className="pfin-inforesponsbility-content-title"
                    data-testid=""
                  >
                    Deductible Amount
                  </h5>
                  <p
                    className="pfin-inforesponsbility-content-value"
                    data-testid=""
                  >
                    {orderOverviewObj?.financialInfoResponseData
                      ?.deductableAmount !== ""
                      ? orderOverviewObj?.financialInfoResponseData
                          ?.deductableAmount
                      : "--"}
                  </p>
                </div>
              </Grid>
              <Grid className="grid-item" item xs={6}>
                <div className="sub-content-div-pfin-responsbility">
                  <h5
                    className="pfin-inforesponsbility-content-title"
                    data-testid=""
                  >
                    Patient Estimated Supplies Amount
                  </h5>
                  <p
                    className="pfin-inforesponsbility-content-value"
                    data-testid=""
                  >
                    {orderOverviewObj?.financialInfoResponseData
                      ?.estimatedSuppliesAmount !== ""
                      ? orderOverviewObj?.financialInfoResponseData
                          ?.estimatedSuppliesAmount
                      : "--"}
                  </p>
                </div>
              </Grid>

              <Grid className="grid-item" item xs={6}>
                <div className="sub-content-div-pfin-responsbility">
                  <h5
                    className="pfin-inforesponsbility-content-title"
                    data-testid=""
                  >
                    Total Patient Responsibility
                  </h5>
                  <p
                    className="pfin-inforesponsbility-content-value"
                    data-testid=""
                  >
                    {orderOverviewObj?.financialInfoResponseData
                      ?.patientResponsibility !== ""
                      ? orderOverviewObj?.financialInfoResponseData
                          ?.patientResponsibility
                      : "--"}
                  </p>
                </div>
              </Grid>
            </Grid>
            <div className="border-space"></div>
          </div>
        </div>
        <div className="border-space"></div>
        <div className="pfin-parent-div">
          <div className="patient-fin-component-title">
            <h2
              className="patient-fin-responsbility-title"
              data-testid="patient-fin-responsbility-title"
            >
              Insurance Information Provided
            </h2>
          </div>

          <div className="content-sec-firs-pfin-responsbility">
            <Grid className="grid-container" container spacing={2}>
              <Grid className="grid-item" item xs={6}>
                <div className="sub-content-div-pfin-responsbility">
                  <h2
                    className="pfin-inforesponsbility-content-header-title"
                    data-testid=""
                  >
                    Primary Insurance Carrier
                  </h2>
                  <h5
                    className="pfin-inforesponsbility-content-title"
                    data-testid=""
                  >
                    Plan Name
                  </h5>
                  <p
                    className="pfin-inforesponsbility-content-value"
                    data-testid=""
                  >
                    {orderOverviewObj?.primaryInsurenceData?.payor !== ""
                      ? orderOverviewObj?.primaryInsurenceData?.payor
                      : "--"}
                  </p>
                </div>
              </Grid>

              <Grid className="grid-item" item xs={6}>
                <div className="sub-content-div-pfin-responsbility">
                  <h2
                    className="pfin-inforesponsbility-content-header-title"
                    data-testid=""
                  >
                    Secondary Insurance Carrier
                  </h2>
                  <h5
                    className="pfin-inforesponsbility-content-title"
                    data-testid=""
                  >
                    Plan Name
                  </h5>
                  <p
                    className="pfin-inforesponsbility-content-value"
                    data-testid=""
                  >
                    {orderOverviewObj?.secondaryInsurenceData?.payor !== ""
                      ? orderOverviewObj?.secondaryInsurenceData?.payor
                      : "--"}
                  </p>
                </div>
              </Grid>
              <Grid className="grid-item" item xs={6}>
                <div className="sub-content-div-pfin-responsbility">
                  <h5
                    className="pfin-inforesponsbility-content-title"
                    data-testid=""
                  >
                    Policy Number
                  </h5>
                  <p
                    className="pfin-inforesponsbility-content-value"
                    data-testid=""
                  >
                    {orderOverviewObj?.primaryInsurenceData?.policyId !== ""
                      ? orderOverviewObj?.primaryInsurenceData?.policyId
                      : "--"}
                  </p>
                </div>
              </Grid>
              <Grid className="grid-item" item xs={6}>
                <div className="sub-content-div-pfin-responsbility">
                  <h5
                    className="pfin-inforesponsbility-content-title"
                    data-testid=""
                  >
                    Policy Number
                  </h5>
                  <p
                    className="pfin-inforesponsbility-content-value"
                    data-testid=""
                  >
                    {orderOverviewObj?.secondaryInsurenceData?.policyId !== ""
                      ? orderOverviewObj?.secondaryInsurenceData?.policyId
                      : "--"}
                  </p>
                </div>
              </Grid>
              <Grid className="grid-item" item xs={6}>
                <div className="sub-content-div-pfin-responsbility">
                  <h5
                    className="pfin-inforesponsbility-content-title"
                    data-testid=""
                  >
                    Group Number
                  </h5>
                  <p
                    className="pfin-inforesponsbility-content-value"
                    data-testid=""
                  >
                    {orderOverviewObj?.primaryInsurenceData?.groupId !== ""
                      ? orderOverviewObj?.primaryInsurenceData?.groupId
                      : "--"}
                  </p>
                </div>
              </Grid>
              <Grid className="grid-item" item xs={6}>
                <div className="sub-content-div-pfin-responsbility">
                  <h5
                    className="pfin-inforesponsbility-content-title"
                    data-testid=""
                  >
                    Group Number
                  </h5>
                  <p
                    className="pfin-inforesponsbility-content-value"
                    data-testid=""
                  >
                    {orderOverviewObj?.secondaryInsurenceData?.groupId !== ""
                      ? orderOverviewObj?.secondaryInsurenceData?.groupId
                      : "--"}
                  </p>
                </div>
              </Grid>
              <Grid className="grid-item" item xs={6}>
                <div className="sub-content-div-pfin-responsbility">
                  <h5
                    className="pfin-inforesponsbility-content-title"
                    data-testid=""
                  >
                    Relationship
                  </h5>
                  <p
                    className="pfin-inforesponsbility-content-value"
                    data-testid=""
                  >
                    {orderOverviewObj?.primaryInsurenceData?.relationship !== ""
                      ? orderOverviewObj?.primaryInsurenceData?.relationship
                      : "--"}
                  </p>
                </div>
              </Grid>
              <Grid className="grid-item" item xs={6}>
                <div className="sub-content-div-pfin-responsbility">
                  <h5
                    className="pfin-inforesponsbility-content-title"
                    data-testid=""
                  >
                    Relationship
                  </h5>
                  <p
                    className="pfin-inforesponsbility-content-value"
                    data-testid=""
                  >
                    {orderOverviewObj?.secondaryInsurenceData?.relationship !==
                    ""
                      ? orderOverviewObj?.secondaryInsurenceData?.relationship
                      : "--"}
                  </p>
                </div>
              </Grid>
            </Grid>
            <div className="border-space"></div>
          </div>
        </div>
        <div className="static-text">
          <p className="paragraph-font-style">
            Should you have any questions, concerns regarding the above
            financial estimate, or need to correct the provided insurance
            information and the order is in a 'Pending' or the order was
            recently released, please contact 3M's Customer Service
            Representative listed on the View Order Detail link under 'Patient
            Actions'.
          </p>
          <p className="paragraph-font-style">
            If the patient has received a bill, please feel free to contact 3M’s
            Patient Resolution team at 888-275-4524 x57090.
          </p>
          <p className="paragraph-font-style">
            NOTE: Specific indications, contraindications, warnings, precautions
            and safety information exist for 3M products and therapies. Please
            consult a physician and product instructions for use prior to
            application. Rx only.
          </p>
        </div>
        <div className="border-space"></div>
      </div>
    </>
  );
};
