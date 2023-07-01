import { Grid } from "@mui/material";
import { ReactComponent as Logo } from "../../assets/logoLarge.svg";
import { ReactComponent as Line } from "../../assets/line.svg";
import "./forgotCredentialContainer.css";
import { Link } from "react-router-dom";
import { ReactNode } from "react";
import { containerPageType } from "./pageType.enum";

type Props = {
  pageType: containerPageType;
  children: ReactNode;
};
const ForgotCredentialContainer = ({ children, pageType }: Props) => {
  const isUserNameFlow = (): boolean => {
    return (
      pageType === containerPageType.USER_NAME ||
      pageType === containerPageType.EMAIL_SENT
    );
  };

  const isShowBackToSignIn = (): boolean => {
    return pageType !== containerPageType.EMAIL_SENT;
  };

  return (
    <div>
      <div className="forgotPasswordContainer">
        <Grid item className="appLogoRecovery">
          <Logo />
          <Line className="lineRecovery" />
          <div className="appNameRecovery">Express</div>
        </Grid>
        {children}
        <Grid container className="centerLinkRowFlex">
          <Grid item>
            {isShowBackToSignIn() && (
              <Link to="/" className="links">
                Return to Sign in
              </Link>
            )}
          </Grid>
          <Grid item>
            {isUserNameFlow() && (
              <Link to="/forgotPassword" className="links">
                Forgot password
              </Link>
            )}
            {!isUserNameFlow() && (
              <Link to="/forgotUsername" className="links">
                Forgot username
              </Link>
            )}
          </Grid>
        </Grid>
        <div
          className={
            pageType === containerPageType.CONFIRMATION_PAGE ||
            pageType === containerPageType.PASSWORD_RESET_PAGE
              ? "infoTextLong"
              : "infoText"
          }
        >
          If you have questions or issues, please contact our dedicated team at{" "}
          <span className="bolder" data-testid="phone-number-bold">
            1-800-275-4524
          </span>{" "}
          ext. 41858
        </div>
        <Grid container className="passwordlink">
          <Grid item className="signupOption">
            Haven’t signed up yet?
          </Grid>
          <Grid item>
            <Link to="/signup" className="signupNowlinks">
              Signup now
            </Link>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default ForgotCredentialContainer;
