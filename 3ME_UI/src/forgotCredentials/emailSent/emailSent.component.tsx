import "./emailSent.css";
import { Grid } from "@mui/material";
import { ExpressButton } from "../../core/expressButton/expressButton.component";
import ForgotCredentialContainer from "../forgotCredentialContainer/forgotCredentialContainer.component";
import { useHistory } from "react-router-dom";
import { containerPageType } from "../forgotCredentialContainer/pageType.enum";

export const EmailSent = () => {
  const history = useHistory();

  const openSignIn = () => {
    history.push("/");
  };

  return (
    <ForgotCredentialContainer pageType={containerPageType.EMAIL_SENT}>
      <Grid container className="email-sent-container">
        <Grid item xs={12} className="email-sent-body">
          <div className="text-div">
            <h2 className="email-sent-title" data-testid="email-sent-title">
              Email sent
            </h2>
            <h5
              className="email-sent-description"
              data-testid="email-sent-description"
            >
              Your username will be emailed to you. If you do not receive an
              email within a few minutes, please be sure to check your junk mail
              folder to make sure it hasn't been captured by your network spam
              filter.
            </h5>
            <ExpressButton
              parentClass="sign-in-button"
              clickHandler={openSignIn}
              variant="contained"
              testId="sign-in-button"
            >
              Back to sign in
            </ExpressButton>
          </div>
        </Grid>
      </Grid>
    </ForgotCredentialContainer>
  );
};
