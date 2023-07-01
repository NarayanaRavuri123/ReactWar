import "./landlineWarningModal.css";
import { Grid } from "@mui/material";
import { ExpressButton } from "../../../../core/expressButton/expressButton.component";

export interface ILandlineWarning {
  setOpenPopUp: any;
  handleChangeEmail: any;
  handleCancel: any;
}

export const LandlineWarningModal = ({
  setOpenPopUp,
  handleChangeEmail,
  handleCancel,
}: ILandlineWarning) => {
  return (
    <div className="landline-warn-modal">
      <h2 className="title" data-testid="title">
        Confirm change to landline
      </h2>
      <h4 className="description" data-testid="description">
        You currently have selected SMS as your only method for receiving
        communication from 3M. By changing your phone number to a landline, we
        will need to change your communication method to email.
        <br />
        <br />
        Would you like to make that change?
      </h4>
      <Grid
        container
        spacing={1}
        classes={{ root: "landline-warn-grid-container" }}
      >
        <Grid item xs={12}>
          <ExpressButton
            clickHandler={handleChangeEmail}
            parentClass="changeToMobile"
            testId="leave-btn"
            variant="contained"
          >
            Yes, change my communication preference to email
          </ExpressButton>
          <ExpressButton
            clickHandler={handleCancel}
            parentClass="back-manage-btn"
            testId="continue-btn"
            variant="outlined"
          >
            No, keep my phone as a mobile number
          </ExpressButton>
        </Grid>
      </Grid>
    </div>
  );
};
