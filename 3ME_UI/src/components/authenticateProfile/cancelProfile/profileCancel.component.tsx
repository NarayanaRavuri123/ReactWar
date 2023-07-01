import { useHistory } from "react-router-dom";
import { ExpressButton } from "../../../core/expressButton/expressButton.component";
import "./profileCancel.css";
import { IProfileCancel } from "./profileCancel.interface";

export const ProfileCancel = ({ stayHandler, redirectTo }: IProfileCancel) => {
  let history = useHistory();
  const redirectToPatients = () => history.push(redirectTo);
  return (
    <div className="profile-cancel">
      <h3 className="confirmation">
        Are you sure you want to leave without saving?
      </h3>
      <p className="sub-text">Any new selections will be lost.</p>
      <ExpressButton
        parentClass="stayBtn"
        variant="outlined"
        clickHandler={stayHandler}
      >
        Stay on Page
      </ExpressButton>
      <ExpressButton
        parentClass="leaveBtn"
        variant="contained"
        clickHandler={redirectToPatients}
      >
        Leave
      </ExpressButton>
    </div>
  );
};
