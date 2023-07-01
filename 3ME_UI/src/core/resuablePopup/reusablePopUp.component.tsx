import { Dialog, IconButton } from "@mui/material";
import { ReactComponent as CloseIcon } from "../../assets/popupcloseicon.svg";
import { ExpressButton } from "../expressButton/expressButton.component";
import { useEffect, useState } from "react";
import "./reusablePopUp.css";

export interface IPopup {
  openFlag: any;
  closeIconClass?: string;
  closeHandler: () => {} | void;
  dialogParentClass?: string;
  hideCloseButton?: boolean;
  firstButtonHandler: any;
  secondButtonHandler: any;
  firstButtonText?: string;
  secondButtonText?: string;
  title?: string;
}

export const ReusablePopUp = ({
  openFlag,
  closeHandler,
  dialogParentClass,
  closeIconClass,
  hideCloseButton = false,
  firstButtonHandler,
  secondButtonHandler,
  firstButtonText,
  secondButtonText,
  title,
}: IPopup) => {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    setOpen(openFlag);
  }, [openFlag]);

  return (
    <Dialog open={open}>
      <div className="reusableOrderPopup">
        <div className="reusableOrderPopupContent">
          <div className="popupCloseIcon">
            {!hideCloseButton && (
              <IconButton
                aria-label="close"
                onClick={closeHandler}
                data-testid="popupCloseIcon"
                className="popupCloseIcon"
              >
                <CloseIcon />
              </IconButton>
            )}
          </div>
          <div className="reusableOrderPopupTitle">{title}</div>

          <div className="reusableOrderDNoBtn">
            <ExpressButton
              parentClass="reusableOrderDNoBtn"
              variant="outlined"
              clickHandler={() => firstButtonHandler()}
            >
              {firstButtonText}
            </ExpressButton>
          </div>
          <div className="reusableOrderDYesBtn">
            <ExpressButton
              parentClass="reusableOrderDYesBtn"
              variant="contained"
              clickHandler={() => secondButtonHandler()}
            >
              {secondButtonText}
            </ExpressButton>
          </div>
        </div>
      </div>
    </Dialog>
  );
};
