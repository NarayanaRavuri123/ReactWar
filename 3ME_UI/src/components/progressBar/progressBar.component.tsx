// React imports
import { ReactComponent as Back } from "../../assets/VectorBig.svg";
// MUI imports
import { Grid } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
// css import
import "./progressBar.css";
import { ProgressBarInterface } from "./progressBar.interface";

const ProgressBar = ({
  progressValue,
  backButtonAction,
  pageTitle,
}: ProgressBarInterface) => {
  return (
    <Grid container className="progressContainer">
      <Grid item xs={1} className="backBtn">
        <Back
          style={{ marginTop: "10px", cursor: "pointer" }}
          onClick={backButtonAction}
          data-testid="signupBckBtn"
        />
      </Grid>
      <Grid item xs={10}>
        <div className="progress">
          <div className="signup" data-testid="signupLabel">
            {pageTitle}
          </div>
          <div className="progressBar">
            <LinearProgress
              className="progress-indicator"
              classes={{ root: "progress-root", bar: "progress-stick" }}
              variant="determinate"
              value={progressValue}
            />
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default ProgressBar;
