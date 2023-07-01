import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ExpressButton } from "../../../core/expressButton/expressButton.component";
import { Popup } from "../../../core/popup/popup.component";
import { cancelOrSubmitVacOrder } from "../../../util/vacOrderService";
import "./newOrderFooterBtnGroup.css";

type ICancelOrderProps = {
  title: string;
  buttonTitle: string;
  cancelOrderOpen: any;
  handleClosePopUp: any;
  vacOrderID: string;
  setNewOrderErrorPopUpFlag: Function;
  seterrorMessage: Function;
  backButtonText: string;
  cancelConfirmationDesc: string;
};

export const CancelOrder = ({
  title,
  buttonTitle,
  cancelOrderOpen,
  handleClosePopUp,
  vacOrderID,
  setNewOrderErrorPopUpFlag,
  seterrorMessage,
  backButtonText,
  cancelConfirmationDesc,
}: ICancelOrderProps) => {
  const history = useHistory();

  const handleCancelOrder = () => {
    history.goBack();
  };

  return (
    <Popup
      closeHandler={handleClosePopUp}
      openFlag={cancelOrderOpen}
      dialogParentClass="cancelOrderPopup"
    >
      <span className="cancelConfirmationText">{title}</span>
      <span className="cancelConfirmationDescText">
        {cancelConfirmationDesc}
      </span>

      <ExpressButton
        variant="outlined"
        clickHandler={handleClosePopUp}
        parentClass="backOrderBtn"
      >
        {backButtonText}
      </ExpressButton>
      <ExpressButton
        variant="contained"
        clickHandler={handleCancelOrder}
        parentClass="canceOrderlBtn"
        id="VacCancelOrder"
      >
        {buttonTitle}
      </ExpressButton>
    </Popup>
  );
};
