import "./suppliesDelivered.css";
import { AlertDetails } from "../alertDetails/alertDetails.component";
import { ISuppliesDelivered } from "./suppliesDelivered.interface";
import Moment from "moment";
import { useContext, useState } from "react";
import { Popup } from "../../../../core/popup/popup.component";
import { useHistory } from "react-router";
import {
  OrderDetailContextType,
  OrderDetailContext,
} from "../../../../context/OrderDetailsContext";
import { OrderOverViewTabsTitle } from "../../patientAndTherapyDetails/orderOverview/orderOverviewContainer.enum";
import { ISupplyOrdersInfo } from "../../patientAndTherapyDetails/orderSupplyDetail/orderSupplyDetails.interface";
import { getOrderStatusDetails } from "../../../../util/vacOrderService";
import moment from "moment";

export function SuppliesDelivered({
  date = new Date(),
  closePopUpAction,
  data,
  patient,
}: ISuppliesDelivered) {
  const dateString = Moment(date).format("L");
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const orderOverviewObj = useContext<OrderDetailContextType | null>(
    OrderDetailContext
  );
  const handleClose = () => {
    setOpen(false);
    closePopUpAction();
  };

  const handleButtonClick = () => {
    orderOverviewObj?.setSelectedOrderTab(
      OrderOverViewTabsTitle.SUPPLY_ORDER_TAB_TITLE
    );
    const supplyOrderData: ISupplyOrdersInfo = {
      createdDate: "",
      deliveredDate: "",
      initiatedName: "",
      product: "",
      ropn: data?.ropn!,
      status: "Delivered",
      statusColor: "Green",
    };
    orderOverviewObj?.setSelectedSupplyOrder(supplyOrderData);
    orderOverviewObj?.setSelectedOrderTab(
      OrderOverViewTabsTitle.ORDER_TAB_TITLE
    );
    getTherapyStartDate(patient?.roNumber!, patient?.dob!);
    orderOverviewObj?.setIsOrderFlow(true);
    orderOverviewObj?.setOrderTabTitle("Supply Orders");
    history.push({
      pathname: "/home/orderOverview",
      state: {
        stateData: patient,
      },
    });
  };

  const getTherapyStartDate = async (ron: number, dob: string) => {
    const reqParam = {
      RentalOrderNumber: ron.toString(),
      DOB: dob,
    };
    try {
      const result = await getOrderStatusDetails(reqParam);
      if (result) {
        const dateStr = result.therapyDate;
        const date = moment(dateStr, "YYYY-MM-DDTHH:mm:ss").toDate();
        orderOverviewObj?.setSelectedSupplyTherapyStartDate(date.toString()!);
      }
      return true;
    } catch {
      return false;
    }
  };

  return (
    <>
      <AlertDetails
        title="Supplies Delivered"
        titleClassName="supplies-delivered-header-title"
        body={"Supplies were delivered for this order on " + dateString + "."}
        footer="View Supply Order"
        showCallForAssistance={true}
        buttonOnClick={handleButtonClick}
      />
      {open && (
        <Popup
          openFlag={open}
          closeHandler={handleClose}
          dialogParentClass={"empty-pop-up"}
        >
          <div style={{ width: "200px", height: "56px" }}></div>
        </Popup>
      )}
    </>
  );
}
