import React from "react";
import { Grid } from "@mui/material";
import SupplyOrderSummaryHeader from "./supplyOrderSummaryHeader.component";
import "./supplyOrderSummary.css";
import { ExpressButton } from "../../../core/expressButton/expressButton.component";
import { ReactComponent as DownloadIcon } from "../../../assets/download.svg";
import { SupplyOrderContextType } from "../../../context/SupplyOrderContext";
import { PatientVACDetail } from "../patientVACDetail/patientVACDetail.component";
import SupplyProductReviewOrder from "../suppliesOrderDressing/supplyProductReviewOrder/supplyProductReviewOrder.component";
import CurrentSuppliesOnHandReviewOrder from "../currentSuppliesOnHand/reviewOrder/currentSuppliesOnHandReviewOrder.component";
import ReSupplyJustificationReviewOrder from "../reSupplyJustification/reviewOrder/reSupplyJustificationReviewOrder.component";
import DeliveryAddressReviewOrder from "../deliveryAddress/reviewOrder/deliveryAddressReviewOrder.component";
import AdditionalInformationReviewOrder from "../supplyOrderAdditionalInformation/reviewOrder/additonalInformationReviewOrder";

type Props = { supplyOrderContextObj: SupplyOrderContextType | null };

const SupplyOrderSummary = ({ supplyOrderContextObj }: Props) => {
  supplyOrderContextObj?.setSupplyOrderPageTitle("Review Supply Order");
  supplyOrderContextObj?.setSupplyOrderProgress(60);
  const data = supplyOrderContextObj!.supplyOrderData;
  const patient = supplyOrderContextObj!.selectedPatient;
  const setData = supplyOrderContextObj!.setSupplyOrderData;
  const vacProductInfo = supplyOrderContextObj!.vacProductInfo;
  window.scrollTo(0, 0);
  const handlePrint = () => {
    window.print();
  };

  return (
    <Grid className="supply-order-summary-container">
      <SupplyOrderSummaryHeader />
      <div className="supply-order-summary-header">
        <div className="supply-order-review-title">Order Summary</div>
        <div className="supplyOrderBtnDiv">
          <ExpressButton
            clickHandler={() => handlePrint()}
            parentClass="supplyOrderBtn"
            testId="acc-cancel-test"
            variant="text"
            startIcon={<DownloadIcon />}
          >
            Save & Print Order Summary
          </ExpressButton>
        </div>
      </div>
      <PatientVACDetail
        data={data}
        patient={patient}
        setData={setData}
        vacProductInfo={vacProductInfo!}
        isReviewOrder={true}
      />
      <SupplyProductReviewOrder
        isReviewOrder={true}
        data={data}
        isOrderSummary={true}
      />
      <CurrentSuppliesOnHandReviewOrder data={data} isOrderSummary={true} />
      <ReSupplyJustificationReviewOrder data={data} isOrderSummary={true} />
      <DeliveryAddressReviewOrder data={data} isOrderSummary={true} />
      <AdditionalInformationReviewOrder data={data} isOrderSummary={true} />
    </Grid>
  );
};

export default SupplyOrderSummary;
