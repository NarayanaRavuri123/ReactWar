import { format } from "react-string-format";
import { removePatient } from "../../../../util/3meService";
import { PickUpRequestPageSection } from "../../../pickUpAndDischargeRequest/pickUpRequest/pickUpRequestPageSection.enum";
import { SupplyOrderPageSection } from "../../../supplyOrder/SupplyOrderPageSection.enum";
import { IPatient } from "../../patient.interface";
import { OrderOverViewTabsTitle } from "./orderOverviewContainer.enum";

export const NavigatePatientAction = async (
  selectedPatient: IPatient | null | undefined,
  selectedVal: any,
  setRemovePatientMsg: Function,
  setEmptyPopup: Function,
  setRemovePatientOpen: Function,
  SupplyOrderObj: any,
  sendNoteObj: any,
  orderOvervewObj: any,
  history: any,
  location: any,
  removePateint: Function,
  pickUpRequestObj: any,
  dischargeRequestObj: any
) => {
  try {
    if (selectedVal === "Order Supplies" && selectedPatient) {
      SupplyOrderObj.setSelectedPatient(selectedPatient);
      SupplyOrderObj.setSupplyOrderPage(
        SupplyOrderPageSection.SUPPLYORDER_INFO
      );
      orderOvervewObj?.resetData();
      SupplyOrderObj?.resetSupplyOrder();
      orderOvervewObj?.resetSeletedSupplyOrderData();
      orderOvervewObj?.resetWoundData();
      history.push({
        pathname: "/orders/supplyOrderList",
        state: {
          isOrderOverviewFlow: true,
        },
      });
    } else if (selectedVal === "Remove Patient" && selectedPatient) {
      setRemovePatientMsg(
        `Patient ${format(
          "{0}, {1}",
          selectedPatient?.lastName!,
          selectedPatient?.firstName!
        )} has been removed`
      );
      const reqParams = {
        FirstName: selectedPatient.firstName,
        LastName: selectedPatient.lastName,
        RentalOrderNumber: selectedPatient.roNumber,
        DOB: selectedPatient.dob,
      };
      const removePatientResponse = await removePatient(reqParams);
      if (removePatientResponse.succeeded) {
        removePateint(selectedPatient.roNumber.toString());
        setRemovePatientOpen(true);
        history.replace(location.pathname, {});
        window.history.replaceState(
          {},
          "Used to clear the history state object"
        );

        orderOvervewObj?.resetData();
        orderOvervewObj?.setOrderTabTitle("Orders...");
        orderOvervewObj?.resetWoundData();
      } else {
        console.log("Error" + removePatientResponse.error.message);
      }
    } else if (selectedVal === "Send 3M A Note" && selectedPatient) {
      orderOvervewObj?.resetData();
      orderOvervewObj?.resetSeletedSupplyOrderData();
      orderOvervewObj?.resetWoundData();
      sendNoteObj.resetSendNoteData();
      history.push({
        pathname: "/home/sendNote",
        state: {
          selectedPatient: selectedPatient,
          isOrderOverviewFlow: true,
        },
      });
    } else if (selectedVal === "Pickup/Discharge Request" && selectedPatient) {
      pickUpRequestObj?.resetData();
      dischargeRequestObj?.resetData();
      pickUpRequestObj?.setPickUpRequestPage(
        PickUpRequestPageSection.PICK_UP_REQUEST_START_FORM
      );
      pickUpRequestObj?.setPatient(selectedPatient);
      history.push("/home/pickUpRequest");
    } else if (selectedVal === "Add Wound Assessment" && selectedPatient) {
      orderOvervewObj?.resetData();
      orderOvervewObj?.resetSeletedSupplyOrderData();
      orderOvervewObj?.resetWoundData();
      orderOvervewObj?.setSelectedOrderTab(
        OrderOverViewTabsTitle.WOUND_PROGRESS_TAB_TITLE
      );
      history.push({
        pathname: "/home/orderOverview",
        state: {
          stateData: selectedPatient,
        },
      });
    } else if (selectedVal === "Upload Documents") {
      orderOvervewObj?.setSelectedOrderTab(
        OrderOverViewTabsTitle.DOCUMENTS_TAB_TITLE
      );
      history.push({
        pathname: "/home/orderOverview",
        state: {
          stateData: selectedPatient,
        },
      });
    } else {
      setEmptyPopup(true);
    }
  } catch (error) {
    console.log("error", error);
  }
};
export const removePatientService = async (mappedPatient: IPatient) => {};
