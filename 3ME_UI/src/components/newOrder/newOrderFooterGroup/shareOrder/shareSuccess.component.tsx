import { Grid } from "@mui/material";
import { useContext } from "react";
import { ExpressButton } from "../../../../core/expressButton/expressButton.component";
import { AuthContext, AuthContextType } from "../../../../context/AuthContext";
import { IshareOrderInvite } from "./shareOrderInvite/shareOrderInvite.interface";
type ISuccessProps = {
  isShareOrderInvite: boolean;
  addshareOrderInvite: IshareOrderInvite;
  closePopupHandler: any;
};

export const ShareSuccess = ({
  isShareOrderInvite,
  addshareOrderInvite,
  closePopupHandler,
}: ISuccessProps) => {
  const AuthObj = useContext<AuthContextType | null>(AuthContext);
  return (
    <Grid container className="share-success-container">
      <Grid item data-testid="share-success-popup-box">
        <div className="share-success-header">Success!</div>
        <div className="share-success-message">
          {!isShareOrderInvite ? (
            <p>Order has been shared</p>
          ) : (
            <>
              <p
                className="successMessageShareOrder"
                data-testid="shareorderemailTest"
              >
                Your email invitiation to{" "}
                <span className="emailLink">
                  {" "}
                  {addshareOrderInvite?.shareOrderInviteEmail.value}{" "}
                </span>
                has been sent.
              </p>
              <p
                className="successMessageShareOrder"
                data-testid="shareorderFacilityTest"
              >
                {" "}
                You will be able to share orders with they have registered for
                3M Express and been associated with{" "}
                <b> {AuthObj?.registeredFaciltyAddress?.accountName}</b> .
              </p>
            </>
          )}
        </div>
        <ExpressButton
          clickHandler={closePopupHandler}
          variant="contained"
          parentClass="success-done-btn"
          testId="success-done-btn"
        >
          Done
        </ExpressButton>
      </Grid>
    </Grid>
  );
};
