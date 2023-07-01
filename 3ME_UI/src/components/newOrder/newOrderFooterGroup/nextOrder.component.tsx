import { ExpressButton } from "../../../core/expressButton/expressButton.component";
import "./newOrderFooterBtnGroup.css";
import { Popup } from "../../../core/popup/popup.component";
import {
  NewOrderContext,
  NewOrderContextType,
} from "../../../context/NewOrderContext";
import { useContext } from "react";
import { NewOrderPageSection } from "../NewOrderContainer.enum";

type INextOrderProps = {
  nextOrderOpen: any;
  handlenextPopUp: any;
  setNextOrderOpen: any;
};

export const NextOrder = ({
  nextOrderOpen,
  handlenextPopUp,
  setNextOrderOpen,
}: INextOrderProps) => {
  const NewOrderObj = useContext<NewOrderContextType | null>(NewOrderContext);

  const handleContinueasFullOrder = () => {
    NewOrderObj?.setnewOrderProgress(40);
    NewOrderObj?.setNewOrderPage(
      NewOrderPageSection.NEWORDER_PATIENT_WOUND_INFO
    );
    setNextOrderOpen(false);
    NewOrderObj?.setIsPartialOrder(false);
    window.scrollTo(0, 0);
  };

  const handleSubmit = () => {
    NewOrderObj?.setNewOrderPage(NewOrderPageSection.NEWORDER_REVIEW_ORDER);
    setNextOrderOpen(false);
    NewOrderObj?.setisComingFromPrev(true);
    NewOrderObj?.setIsPartialOrder(true);
    window.scrollTo(0, 0);
  };
  return (
    <Popup
      closeHandler={handlenextPopUp}
      openFlag={nextOrderOpen}
      dialogParentClass="nextOrderPopup"
    >
      <div className="next-order-pop-up">
        <h2 className="nextOrderPopupText">
          Submit now as a partial order or continue to adding wound information?{" "}
        </h2>
        <h4
          className="nextOrderPopupDescText"
          data-testid="nextOrder-PopupDesc-Test"
        >
          If you choose to submit a partial order now, you will be required to
          add wound information later.
          <br></br>
          <br></br>
          Once the order has been created, please go to the Documents tab in the
          Order Detail to upload patient wound information & documentation.
        </h4>
        <div className="nextOrderBtnDiv">
          <ExpressButton
            variant="outlined"
            clickHandler={handleSubmit}
            parentClass="nextOrderSubmitBtn"
            testId="nextOrderSubmitBtnTest"
          >
            Confirm Partial Order
          </ExpressButton>
          <ExpressButton
            variant="contained"
            clickHandler={handleContinueasFullOrder}
            parentClass="nextOrderPartialButton"
          >
            Continue as Full Order
          </ExpressButton>
        </div>
      </div>
    </Popup>
  );
};
