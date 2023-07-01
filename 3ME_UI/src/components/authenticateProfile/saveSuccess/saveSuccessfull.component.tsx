import { useContext } from "react";
import { Redirect, useHistory } from "react-router-dom";
import CircleSuccess from "../../../assets/checkcircle.svg";
import { AuthContextType, AuthContext } from "../../../context/AuthContext";
import { ExpressButton } from "../../../core/expressButton/expressButton.component";
import "./saveSuccessfull.css";

type Props = {
  returnButtonText: string;
  returnToPath: string;
};
export const SaveSuccessfull = ({ returnButtonText, returnToPath }: Props) => {
  const history = useHistory();
  const AuthObj = useContext<AuthContextType | null>(AuthContext);
  const handleReturnHome = () => {
    AuthObj?.setProfileSaveAuthicated(false);
    history.push(returnToPath);
  };
  return (
    <div>
      <div className="successCardContainer">
        {AuthObj?.profileSaveAuthicated ? (
          <>
            <img src={CircleSuccess} alt={CircleSuccess} />
            <div className="successtext">Success!</div>
            {returnToPath === "/" ? (
              <div>
                <div className="accnt-submitted">
                  Your account request has been submitted
                </div>
                <div className="accnt-submitted-msg">
                  You have signed up for 3M Express successfully. Log in for the
                  first time by returning to the log in page. If you have any
                  questions, please contact 3M Express Support at (800) 275-4524
                  ext. 41858
                </div>
              </div>
            ) : (
              <div className="successmsg">
                Your user account information has been updated. Select ‘Return
                home’ to go back to the dashboard.
              </div>
            )}

            <ExpressButton
              clickHandler={handleReturnHome}
              parentClass="returnbutton"
              variant="contained"
            >
              {returnButtonText}
            </ExpressButton>
          </>
        ) : (
          <Redirect to={returnToPath} />
        )}
      </div>
    </div>
  );
};
