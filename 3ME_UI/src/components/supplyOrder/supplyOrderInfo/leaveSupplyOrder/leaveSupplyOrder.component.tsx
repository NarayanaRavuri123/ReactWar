import { useHistory } from "react-router-dom";
import { SupplyOrderContextType } from "../../../../context/SupplyOrderContext";
import { ExpressButton } from "../../../../core/expressButton/expressButton.component";
import { Popup } from "../../../../core/popup/popup.component";
import { SupplyOrderPageSection } from "../../SupplyOrderPageSection.enum";
import "./leaveSupplyOrder.css";

type ILeaveSupplyOrderProps = {
  title: string;
  buttonTitle: string;
  handleCancelLeavePopUp: any;
  cancelLeaveOpen: any;
  cancelConfirmText: string;
  backBtnText: string;
  SupplyOrderObj: SupplyOrderContextType | null;
  isOrderOverviewFlow?: boolean;
};

export const LeaveSupplyOrder = ({
  title,
  buttonTitle,
  handleCancelLeavePopUp,
  cancelLeaveOpen,
  cancelConfirmText,
  backBtnText,
  SupplyOrderObj,
  isOrderOverviewFlow,
}: ILeaveSupplyOrderProps) => {
  const history = useHistory();
  const LeaveSupplyOrderPage = () => {
    handleCancelLeavePopUp();
    if (isOrderOverviewFlow) history.goBack();
    else history.push("/home");
  };
  return (
    <Popup
      closeHandler={handleCancelLeavePopUp}
      openFlag={cancelLeaveOpen}
      dialogParentClass="leaveOrderPopup"
      data-testid="leave-Order-Popup"
    >
      <span
        data-testid="cancelConfirmationText"
        className="cancelConfirmationText"
      >
        {title}
      </span>
      <span className="cancelConfirmationTextDesc">{cancelConfirmText}</span>

      <ExpressButton
        testId="backBtn"
        variant="outlined"
        clickHandler={handleCancelLeavePopUp}
        parentClass="backOrderButton"
      >
        {backBtnText}
      </ExpressButton>
      <ExpressButton
        variant="contained"
        clickHandler={LeaveSupplyOrderPage}
        parentClass="cancelOrderBtn"
        testId="leaveBtn"
      >
        {buttonTitle}
      </ExpressButton>
    </Popup>
  );
};
