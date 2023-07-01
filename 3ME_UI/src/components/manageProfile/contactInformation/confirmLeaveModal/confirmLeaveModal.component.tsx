import "./confirmLeaveModal.css";
import { Grid } from "@mui/material";
import { IConfirmLeaveModal } from "./confirmLeaveModal.interface";
import { ExpressButton } from "../../../../core/expressButton/expressButton.component";

export const ConfirmLeaveModal = ({
  continueBtnAction,
  leaveBtnAction,
  updatePopUp,
}: IConfirmLeaveModal) => {
  const continueButtonAction = () => {
    updatePopUp(false);
  };

  return (
    <div className="confirm-leave-modal">
      <h2 className="title" data-testid="title">
        Are you sure you want to leave without completing verification?
      </h2>
      <h4 className="description" data-testid="description">
        Any changes you’ve made to your phone number will be cancelled.
      </h4>
      <Grid
        container
        spacing={1}
        classes={{ root: "confirm-leave-modal-grid-container" }}
      >
        <Grid item xs={12}>
          <ExpressButton
            clickHandler={leaveBtnAction}
            parentClass="leave-btn"
            testId="leave-btn"
            variant="contained"
          >
            Leave and return to your profile
          </ExpressButton>
          <ExpressButton
            clickHandler={
              continueBtnAction === undefined
                ? continueButtonAction
                : continueBtnAction
            }
            parentClass="continue-btn"
            testId="continue-btn"
            variant="outlined"
          >
            Continue to verify
          </ExpressButton>
        </Grid>
      </Grid>
    </div>
  );
};
