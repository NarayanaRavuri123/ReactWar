import React, { useState } from "react";
import { ExpressButton } from "../expressButton/expressButton.component";
import "./deleteOrder.css";
import { getDeepClone } from "../../util/ObjectFunctions";
import { Button } from "@mui/material";

type Props = {
  doNotDeleteHandler: any;
  deleteHandler: any;
};

export const DeletePopup = ({ doNotDeleteHandler, deleteHandler }: Props) => {
  return (
    <div className="deleteOrderPopup">
      <div className="deleteOrderPopupContent">
        <div
          className="deleteOrderPopupTitle"
          data-testid="deleteOrderPopupTitleTest"
        >
          Are you sure you want to delete this order?
        </div>
        <div className="deleteOrderDNoBtn">
          <ExpressButton
            parentClass="deleteOrderDOptBtnNo"
            variant="outlined"
            clickHandler={() => doNotDeleteHandler()}
            testId="donNotDeleteTest"
          >
            No, Do Not Delete
          </ExpressButton>
        </div>
        <div className="deleteOrderDYesBtn">
          <ExpressButton
            parentClass="deleteOrderDYesBtn"
            variant="contained"
            clickHandler={() => deleteHandler()}
            testId="DeleteOrderTest"
          >
            Yes, Delete Order
          </ExpressButton>
        </div>
      </div>
    </div>
  );
};
