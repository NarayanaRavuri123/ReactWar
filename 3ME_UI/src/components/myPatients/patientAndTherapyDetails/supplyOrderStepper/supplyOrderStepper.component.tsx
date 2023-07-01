import { Grid } from "@mui/material";
import { IPatient } from "../../patient.interface";
import { SupplyOrderDetails } from "../supplyOrderDetails/supplyOrderDetails.component";
import "./supplyOrderStepper.css";
import SupplyOrderCurrentSuppliesInHand from "./supplyOrderCurrentSuppliesInHand/supplyOrderCurrentSuppliesInHand.component";
import SupplyOrderDetailsTracking from "../supplyOrderDetailsTracking/supplyOrderDetailsTracking.component";
import { ISupplyOrdersInfo } from "../orderSupplyDetail/orderSupplyDetails.interface";
interface Props {
  patientData: IPatient;
  supplyOrderData: any;
  selectedSupplyOrderData: ISupplyOrdersInfo;
  canister: any;
  accessory: any;
  dressing: any;
  therapyStartDate: any;
  alertsForRO?: IPatient;
}
const SupplyOrderStepper = ({
  patientData,
  supplyOrderData,
  selectedSupplyOrderData,
  canister,
  accessory,
  dressing,
  therapyStartDate,
  alertsForRO,
}: Props) => {
  return (
    <>
      <Grid className="supplyorderstepper-container">
        <div className="supplyorderstepperForm">
          <SupplyOrderDetailsTracking
            patientData={patientData}
            supplyOrderTrackingData={supplyOrderData}
            selectedSupplyOrderData={selectedSupplyOrderData}
            therapyStartDate={therapyStartDate}
            alertsForRO={alertsForRO}
          />
          <SupplyOrderDetails
            dressing={dressing}
            canister={canister}
            accessory={accessory}
          />
          <SupplyOrderCurrentSuppliesInHand
            data={supplyOrderData}
            dressing={dressing}
            canister={canister}
          />
          <div className="space-bottom"></div>
        </div>
      </Grid>
    </>
  );
};

export default SupplyOrderStepper;
