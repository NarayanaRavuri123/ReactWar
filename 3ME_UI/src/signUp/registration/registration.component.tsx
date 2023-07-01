// React imports
import { useEffect, useState } from "react";
// MUI imports
import { Grid } from "@mui/material";
// Component imports
import ProgressBar from "../../components/progressBar/progressBar.component";
// css imports
import "../signup/signup.css";
import { useHistory } from "react-router-dom";
import { RegistrationForm } from "./registrationForm/registrationForm.component";

export const Registration = () => {
  const history = useHistory();
  const [progVal, setProgVal] = useState(50);
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <Grid className="registration-flow" container>
      <Grid item>
        <ProgressBar
          pageTitle="Sign up"
          progressValue={progVal}
          backButtonAction={() => {
            history.push("/signup");
          }}
        />
      </Grid>
      <Grid item className="registration-container">
        <RegistrationForm setProgbarVal={setProgVal} />
      </Grid>
    </Grid>
  );
};
