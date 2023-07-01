import { ReactComponent as PrintIcon } from "../../../../assets/print.svg";
import { IPendingSupplyOrderInterface } from "./pendingSupplyOrder.interface";
import excessiveSupplyForm from "../../../../assets/pdf/excessiveSupplyForm.pdf";
import { WindowService } from "../../../../util/window.service";
import { AlertDetails } from "../alertDetails/alertDetails.component";
import "./pendingSupplyOrder.css";

export const PendingSupplyOrder = ({
  closePopUpAction,
}: IPendingSupplyOrderInterface) => {
  const handleButtonClick = () => {
    closePopUpAction();
    const windowService = new WindowService();
    windowService.openPdf(excessiveSupplyForm);
  };

  return (
    <AlertDetails
      title="Pending Supply Order"
      titleClassName="pending-supply-order-header-title"
      body="Supplies are outside of the anniversary time frame"
      footer="Print Excessive Supply Form"
      buttonIcon={<PrintIcon />}
      buttonOnClick={handleButtonClick}
      showCallForAssistance={true}
    />
  );
};
