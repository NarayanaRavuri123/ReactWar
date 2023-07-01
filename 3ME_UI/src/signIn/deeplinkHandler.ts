import moment from "moment";
import { OrderOverViewTabsTitle } from "../components/myPatients/patientAndTherapyDetails/orderOverview/orderOverviewContainer.enum";
import { OrderDetailContextType } from "../context/OrderDetailsContext";
import { getPatient } from "../util/3meService";
import { ISupplyOrdersInfo } from "../components/myPatients/patientAndTherapyDetails/orderSupplyDetail/orderSupplyDetails.interface";
import { getOrderStatusDetails } from "../util/vacOrderService";

export const checkDeeplinkPath = async (
  deepLinkPath: string,
  orderDetailObj: OrderDetailContextType
) => {
  if (deepLinkPath.includes("/home/orderOverview/deepLink")) {
    const urlData = deepLinkPath.split("/");
    const onbj: any = JSON.parse(atob(urlData[4]));
    let woundAssessments: any;
    try {
      woundAssessments = await getPatient(onbj.ron, onbj.dob);
      if (woundAssessments.succeeded && woundAssessments.data !== null) {
        if (onbj.tabname === "Orders") {
          orderDetailObj?.resetData();
          orderDetailObj?.resetSeletedSupplyOrderData();
          orderDetailObj?.resetWoundData();
          orderDetailObj?.setSelectedOrderTab("Orders");
          return {
            pathname: "/home/orderOverview",
            state: {
              stateData: woundAssessments.data,
            },
          };
        } else if (onbj.tabname === "Woundprogress") {
          orderDetailObj?.setSelectedOrderTab(
            OrderOverViewTabsTitle.WOUND_PROGRESS_TAB_TITLE
          );
          orderDetailObj?.setWoundId(onbj.woundId);
          return {
            pathname: "/home/orderOverview",
            state: {
              stateData: woundAssessments.data,
            },
          };
        } else if (onbj.tabname === "Supplyorders") {
          orderDetailObj?.setSelectedOrderTab(
            OrderOverViewTabsTitle.SUPPLY_ORDER_TAB_TITLE
          );
          const supplyOrderData: ISupplyOrdersInfo = {
            createdDate: "",
            deliveredDate: "",
            initiatedName: "",
            product: "",
            ropn: onbj?.ropn!,
            status: "Delivered",
            statusColor: "Green",
          };
          orderDetailObj?.setSelectedSupplyOrder(supplyOrderData);
          orderDetailObj?.setSelectedOrderTab(
            OrderOverViewTabsTitle.ORDER_TAB_TITLE
          );
          getTherapyStartDate(onbj?.ron, onbj?.dob, orderDetailObj);
          orderDetailObj?.setIsOrderFlow(true);
          orderDetailObj?.setOrderTabTitle("Supply Orders");
          return {
            pathname: "/home/orderOverview",
            state: {
              stateData: woundAssessments.data,
            },
          };
        } else if (onbj.tabname === "Documents") {
          orderDetailObj?.setSelectedOrderTab(
            OrderOverViewTabsTitle.DOCUMENTS_TAB_TITLE
          );
          return {
            pathname: "/home/orderOverview",
            state: {
              stateData: woundAssessments.data,
            },
          };
        } else {
          return "/home";
        }
      } else {
        return "/home";
      }
    } catch (error) {
      return "/home";
    }
  } else {
    return deepLinkPath;
  }
};
export const getTherapyStartDate = async (
  ron: number,
  dob: string,
  orderDetailObj: OrderDetailContextType
) => {
  const reqParam = {
    RentalOrderNumber: ron.toString(),
    DOB: dob,
  };
  try {
    const result = await getOrderStatusDetails(reqParam);
    if (result) {
      const dateStr = result.therapyDate;
      const date = moment(dateStr, "YYYY-MM-DDTHH:mm:ss").toDate();
      orderDetailObj?.setSelectedSupplyTherapyStartDate(date.toString()!);
    }
    return true;
  } catch {
    return false;
  }
};
