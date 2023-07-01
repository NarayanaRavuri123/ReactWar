import React, { useEffect, useRef, useState } from "react";
import { ExpressButton } from "../core/expressButton/expressButton.component";
import { Popup } from "../core/popup/popup.component";
import Grid from "@mui/material/Grid";
import "./idleTimeOut.css";
import { useIdleTimerContext } from "react-idle-timer";
import { IDLETIME } from "../util/staticText";

type Props = {
  showModal: boolean;
  handleLogout: Function;
  setShowModal: any;
  confirmLogout?: any;
};

export const IdleTimeoutModal = ({
  showModal,
  handleLogout,
  setShowModal,
  confirmLogout,
}: Props) => {
  const [idlePopTime, setIdlePopTime] = useState("");

  const { getRemainingTime, activate, getLastActiveTime } =
    useIdleTimerContext();

  useEffect(() => {
    const interval = setInterval(() => {
      const remainingTime = Math.ceil(getRemainingTime() / 1000);
      const result2 = new Date(remainingTime * 1000)
        .toISOString()
        .slice(14, 19);
      setIdlePopTime(result2);
      let lastActiveTime = getLastActiveTime()!;
      const currentDate = new Date();
      lastActiveTime = new Date(lastActiveTime.getTime() + IDLETIME);
      if (lastActiveTime < currentDate) {
        confirmLogout();
      }
    }, 500);

    return () => {
      clearInterval(interval);
    };
  });

  const handleYes = () => {
    activate();
    setShowModal(false);
  };

  const setcloseHandlerOpen = () => {};
  return (
    <>
      <Popup
        openFlag={showModal}
        closeHandler={() => setcloseHandlerOpen()}
        hideCloseButton={true}
      >
        <div className="idleTimeOutPopup" data-testid="idleTimeOutPopup">
          <div className="idleTimeOutPopupContent">
            <div
              className="idleTimeOutPopupTitle"
              data-testid="idleTimeOutPopupTitleTest"
            >
              Need more time?
            </div>
            <div
              className="idleTimeOutPopupdesc"
              data-testid="idleTimeOutPopupsubTitleTest"
            >
              Your session is about to end due to inactivity. You will be
              automatically<p>logged out in</p>
            </div>
            <div className="idleTimeOutPopupTime">{idlePopTime}</div>
            <div
              className="idleTimeOutPopupsubdesc"
              data-testid="idleTimeOutPopupsubdesc"
            >
              Do you want to stay logged in?
            </div>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <div
                  className="idleTimeOutDNoBtn"
                  data-testid="idleTimeOutDNoBtn"
                >
                  <ExpressButton
                    parentClass="idleTimeOutDNoBtn"
                    variant="outlined"
                    clickHandler={() => handleLogout()}
                    testId="donNotDeleteTest"
                  >
                    No, log me out
                  </ExpressButton>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div
                  className="idleTimeOutDYesBtn"
                  data-testid="idleTimeOutDYesBtn"
                >
                  <ExpressButton
                    parentClass="idleTimeOutDYesBtn"
                    variant="contained"
                    clickHandler={handleYes}
                    testId="idleTimeOutTest"
                  >
                    Yes, keep me logged in
                  </ExpressButton>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      </Popup>
    </>
  );
};
