import React from "react";
import "./alertDetails.css";
import { Button } from "@mui/material";
import { IAlertDetailInterface } from "./alertDetails.interface";
import { Popup } from "../../../../core/popup/popup.component";

export const AlertDetails = ({
  title,
  titleClassName,
  body,
  footer,
  buttonIcon,
  buttonOnClick,
  showCallForAssistance,
  showEmptyPopUp,
}: IAlertDetailInterface) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="alert-detail">
      <div className="alert-header">
        <h5 className={titleClassName} data-testid={titleClassName}>
          {title}
        </h5>
      </div>
      <div className="alert-body">
        <span className="alert-body-title" data-testid="alert-body-title">
          {body}
        </span>
        {showCallForAssistance && (
          <div className="alert-body-sub-section">
            <span
              className="alert-body-description"
              data-testid="alert-body-description"
            >
              For assistance, please call 3M at
            </span>
            <a
              className="alert-body-phone-value"
              data-testid="alert-body-phone-value"
              href="tel:(800) 275-4524"
            >
              (800) 275-4524
            </a>
          </div>
        )}
      </div>
      <div className="alert-footer">
        <Button
          classes={{ root: "alert-footer-outlined-button" }}
          data-testid="alert-footer-outlined-button"
          variant="outlined"
          onClick={showEmptyPopUp ? handleOpen : buttonOnClick}
          startIcon={buttonIcon}
        >
          {footer}
        </Button>
        {showEmptyPopUp && (
          <Popup
            openFlag={open}
            closeHandler={handleClose}
            dialogParentClass={"empty-pop-up"}
          >
            <div style={{ width: "200px", height: "56px" }}></div>
          </Popup>
        )}
      </div>
    </div>
  );
};
