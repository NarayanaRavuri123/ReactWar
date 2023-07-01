import { useContext, useEffect, useState } from "react";
import "./proofOfDeliveryFax.css";
import { Button, Grid } from "@mui/material";
import { ReactComponent as InfoIcon } from "../../../../assets/InfoIcon.svg";
import { Popup } from "../../../../core/popup/popup.component";
import { ReactComponent as PrintIcon } from "../../../../assets/print.svg";

export const ProofOfDeliveryFax = () => {
  const [open, setOpen] = useState(false);

  const openModelWindow = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="pod-fax-main" data-testid="pod-fax-main">
      <Grid container className="pod-fax-container">
        <Grid item xs={4} className="pod-fax-msg" data-testid="pod-fax-msg">
          <p className="fax-msg">
            A POD/AOB signed and dated by the patient or authorized agent is
            required to receive care
          </p>
        </Grid>

        <Grid item xs={5}>
          <Button
            classes={{ root: "borderButton" }}
            data-testid="downLoad-print-pod"
            variant="outlined"
            onClick={openModelWindow}
            startIcon={<PrintIcon />}
          >
            Download & Print POD
          </Button>
        </Grid>
        <Grid item xs={7}>
          <Button
            classes={{ root: "borderButton-static-text" }}
            variant="outlined"
            startIcon={<InfoIcon />}
          >
            <span className="static-text" data-testid="pod-static-txt-btn">
              Please fax the signed POD to 1-888-245-2295.
            </span>
          </Button>
        </Grid>
      </Grid>
      {open && (
        <Popup
          openFlag={open}
          closeHandler={handleClose}
          dialogParentClass={"empty-pop-up"}
        >
          <div className="pop-up"></div>
        </Popup>
      )}
    </div>
  );
};
