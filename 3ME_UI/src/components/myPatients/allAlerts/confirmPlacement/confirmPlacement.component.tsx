import { useState } from "react";
import { Popup } from "../../../../core/popup/popup.component";
import { AlertDetails } from "../alertDetails/alertDetails.component";
import "./confirmPlacement.css";
import { IConfirmPlacementInterface } from "./confirmPlacement.interface";

export const ConfirmPlacement = ({
  closePopUpAction,
}: IConfirmPlacementInterface) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    closePopUpAction();
  };

  const handleButtonClick = () => {
    setOpen(true);
  };

  return (
    <>
      <AlertDetails
        title="Confirm Placement"
        titleClassName="confirm-placement-header-title"
        body="Proof of Home Delivery (POHD) needs to be confirmed for this Ready Care™ Unit"
        footer="Confirm Placement"
        buttonOnClick={handleButtonClick}
        showCallForAssistance={true}
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
};
