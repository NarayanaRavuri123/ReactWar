import { Grid } from "@mui/material";
import { useContext } from "react";
import {
  OrderDetailContext,
  OrderDetailContextType,
} from "../../../../context/OrderDetailsContext";
import { ISecondaryWoundInfo } from "../../../newOrder/clinicalInformation/secondaryWoundInfo/secondaryWoundInfo.interface";
import { INewOrderWoundInfo } from "../../../newOrder/newOrderWoundInfoStepper/newOrderWoundInfo.interface";
import { IVacTherapyInformation } from "../../../newOrder/woundBed/vacTherapyInformation.interface";
import { IPatient } from "../../patient.interface";
import { OrderDetails3MContacts } from "../orderDetails3MContacts/orderDetails3MContacts.component";
import { OrderDetailsTracking } from "../orderDetailsTracking/orderDetailsTracking.component";
import { OrderSummary } from "../orderSummary/orderSummary.component";
import "./orderDetailStepper.css";
interface Props {
  patientData: IPatient;
  isOrderSummary: boolean;
  newOrderData: any;
  requesterInfo: any;
  insuranceTypes: never[];
  insuranceTypesText: never[];
  accidentTypes: never[];
  therapyLengths: never[];
  therapyGoals: never[];
  vacTherapyInformationData: IVacTherapyInformation;
  dressingKit: any;
  canister: any;
  accessory: any;
  productInfo: any;
  prodInfoTypes: any;
  secondaryWoundInfoData: ISecondaryWoundInfo;
  woundInfoData: INewOrderWoundInfo;
  deliveryInformation: any;
  deliverySites: any;
  states: never[];
  statesText: never[];
  orderDetailLoaderCompleted: boolean;
  selectedTab: any;
  isOrderFlow: boolean;
  alertsForRO?: IPatient;
}
const OrderDetailsStepper = ({
  patientData,
  isOrderSummary,
  newOrderData,
  requesterInfo,
  insuranceTypes,
  insuranceTypesText,
  accidentTypes,
  therapyLengths,
  therapyGoals,
  vacTherapyInformationData,
  dressingKit,
  canister,
  accessory,
  productInfo,
  prodInfoTypes,
  secondaryWoundInfoData,
  woundInfoData,
  deliveryInformation,
  deliverySites,
  states,
  statesText,
  orderDetailLoaderCompleted,
  selectedTab,
  isOrderFlow,
  alertsForRO,
}: Props) => {
  const orderdtlscntx = useContext<OrderDetailContextType | null>(
    OrderDetailContext
  );
  const orderDetailsTrackingData = orderdtlscntx?.orderDetailsTrackingData;
  const pdfUrl = orderdtlscntx?.pdfUrl;

  return (
    <>
      <Grid className="orderdetailstepper-container">
        <div className="orderdetailstepperForm">
          <OrderDetailsTracking
            patientData={patientData!}
            orderDetailsTrackingData={orderDetailsTrackingData!}
            pdfUrl={pdfUrl!}
            isOrderFlow={isOrderFlow}
            alertsForRO={alertsForRO}
          />
          <OrderDetails3MContacts
            orderDetailsTrackingData={orderDetailsTrackingData!}
            error={orderdtlscntx?.error!}
          />
          <OrderSummary
            isOrderSummary={true}
            newOrderData={newOrderData}
            requesterInfo={requesterInfo}
            insuranceTypes={insuranceTypes}
            insuranceTypesText={insuranceTypesText}
            accidentTypes={accidentTypes}
            therapyLengths={therapyLengths}
            therapyGoals={therapyGoals}
            vacTherapyInformationData={vacTherapyInformationData}
            dressingKit={dressingKit}
            canister={canister}
            accessory={accessory}
            secondaryWoundInfoData={secondaryWoundInfoData}
            woundInfoData={woundInfoData}
            deliveryInformation={deliveryInformation}
            productInfo={productInfo}
            prodInfoTypes={prodInfoTypes}
            deliverySites={deliverySites}
            states={states}
            statesText={statesText}
          />
        </div>
      </Grid>
    </>
  );
};

export default OrderDetailsStepper;
