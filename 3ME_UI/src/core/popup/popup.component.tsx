import { Dialog, DialogTitle, IconButton } from "@mui/material";
import { ReactComponent as CloseIcon } from "../../assets/popupcloseicon.svg";
import { useEffect, useState } from "react";
import { IPopup } from "./popup.interface";

export const Popup = ({
  children,
  openFlag,
  closeHandler,
  dialogParentClass,
  closeIconClass,
  hideCloseButton = false,
  onClickHandler,
}: IPopup) => {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    setOpen(openFlag);
  }, [openFlag]);

  return (
    <Dialog
      classes={{ container: dialogParentClass }}
      className="dialogSize"
      data-testid={dialogParentClass}
      open={open}
      PaperProps={{
        classes: { root: "paperRoot" },
        sx: { maxWidth: "unset", boxSizing: "border-box", margin: 0 },
      }}
      onClick={onClickHandler}
    >
      <DialogTitle
        sx={{
          position: "absolute",
          right: 16,
          top: 16,
          padding: 0,
          lineHeight: 0,
        }}
      >
        {!hideCloseButton && (
          <IconButton
            aria-label="close"
            onClick={closeHandler}
            sx={{ padding: 0 }}
            data-testid="popupCloseIcon"
            className={closeIconClass ? closeIconClass : "popupCloseIcon"}
          >
            <CloseIcon />
          </IconButton>
        )}
      </DialogTitle>
      {children}
    </Dialog>
  );
};
