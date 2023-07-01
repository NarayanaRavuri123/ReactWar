import { IAlertTypes } from "../../patient.interface";
import { IAlertsInterface } from "./alerts.interface";
import { DischargePending } from "../../allAlerts/dischargePending/dischargePending.component";
import { ConfirmPlacement } from "../../allAlerts/confirmPlacement/confirmPlacement.component";
import { SuppliesDelivered } from "../../allAlerts/suppliesDelivered/suppliesDelivered.component";
import { PendingSupplyOrder } from "../../allAlerts/pendingSupplyOrder/pendingSupplyOrder.component";
import SharedOrder from "../../allAlerts/sharedOrder/sharedOrder.component";
import MissingRx from "../../allAlerts/missingRx/missingRx.component";
import { useHistory } from "react-router-dom";
import { OrderOverViewTabsTitle } from "../../patientAndTherapyDetails/orderOverview/orderOverviewContainer.enum";
import { useContext } from "react";
import {
  OrderDetailContextType,
  OrderDetailContext,
} from "../../../../context/OrderDetailsContext";
import "./alerts.css";
import { ProofOfDeliveryNeeded } from "../../allAlerts/proofOfDeliveryNeeded/proofOfDeliveryNeeded.component";

export const Alerts = ({
  closePopUpAction,
  data,
  patient,
}: IAlertsInterface) => {
  const history = useHistory();
  const orderOverviewObj = useContext<OrderDetailContextType | null>(
    OrderDetailContext
  );
  switch (data.alertType) {
    case IAlertTypes.SUPDE:
      return (
        <SuppliesDelivered
          date={data.alertDate!}
          closePopUpAction={closePopUpAction}
          data={data}
          patient={patient}
        />
      );
    case IAlertTypes.PNDSO:
      return <PendingSupplyOrder closePopUpAction={closePopUpAction} />;
    case IAlertTypes.CONPL:
      return <ConfirmPlacement closePopUpAction={closePopUpAction} />;

    case IAlertTypes.DISPEN:
      return (
        <DischargePending
          closePopUpAction={closePopUpAction}
          patient={patient}
        />
      );
    case IAlertTypes.SHODR:
      return (
        <SharedOrder
          alertData={data}
          patientData={patient}
          closePopUpAction={closePopUpAction}
        />
      );
    case IAlertTypes.MISRX:
      return (
        <MissingRx closePopUpAction={closePopUpAction} patientData={patient} />
      );
    case IAlertTypes.MSDUE:
      window.scrollTo(0, 0);
      orderOverviewObj?.setSelectedOrderTab(
        OrderOverViewTabsTitle.WOUND_PROGRESS_TAB_TITLE
      );
      orderOverviewObj?.setWoundId(data.woundOrderID);
      history.push({
        pathname: "/home/orderOverview",
        state: {
          stateData: patient,
        },
      });
      return null;
    case IAlertTypes.MSDOC:
      window.scrollTo(0, 0);
      orderOverviewObj?.setSelectedOrderTab(
        OrderOverViewTabsTitle.DOCUMENTS_TAB_TITLE
      );
      history.push({
        pathname: "/home/orderOverview",
        state: {
          stateData: patient,
        },
      });
      return null;
    case IAlertTypes.PODEL:
      return (
        <ProofOfDeliveryNeeded
          closePopUpAction={closePopUpAction}
          patient={patient}
        />
      );
    default:
      return <div className="alertsEmptyDiv"></div>;
  }
};
