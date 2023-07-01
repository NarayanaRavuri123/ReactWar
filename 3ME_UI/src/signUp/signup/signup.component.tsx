// React imports
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
// MUI imports
import { Grid } from "@mui/material";
// Component imports
import ProgressBar from "../../components/progressBar/progressBar.component";
// css imports
import "./signup.css";
import SignupCard from "./signupcard.component";

export const Signup = () => {
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <Grid className="registration-flow" container>
      <Grid item>
        <ProgressBar
          pageTitle="Sign up"
          progressValue={25}
          backButtonAction={() => {
            history.push("/");
          }}
        />
      </Grid>
      <Grid item className="registration-container">
        <SignupCard />
      </Grid>
    </Grid>
  );
};
