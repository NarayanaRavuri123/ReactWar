import { Grid } from "@mui/material";
import { useContext } from "react";
import {
  OrderDetailContext,
  OrderDetailContextType,
} from "../../../../context/OrderDetailsContext";
import { IPatient } from "../../patient.interface";
import { OrderCurrentTherapy } from "../orderCurrentTherapy/orderCurrentTherapy.component";
import "./orderStepper.css";
interface Props {
  patientData: IPatient;
  selectedTab: any;
  isOrderFlow: boolean;
  orderSupplyDetail: any;
  alertsForRO?: IPatient;
}
const OrderStepper = ({
  patientData,
  selectedTab,
  isOrderFlow,
  orderSupplyDetail,
  alertsForRO,
}: Props) => {
  const orderdtlscntx = useContext<OrderDetailContextType | null>(
    OrderDetailContext
  );
  const orderDetailsTrackingData = orderdtlscntx?.orderDetailsTrackingData;

  return (
    <>
      <Grid className="orderstepper-container">
        <div className="orderstepperForm">
          <OrderCurrentTherapy
            patientData={patientData!}
            orderDetailsTrackingData={orderDetailsTrackingData!}
            supplyOrderSuppliesDetail={orderSupplyDetail}
            alertsForRO={alertsForRO}
          />
        </div>
      </Grid>
    </>
  );
};

export default OrderStepper;
