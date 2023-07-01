import "./failureModal.css";
import { Grid } from "@mui/material";
import { useContext, useEffect } from "react";
import {
  ProfileFormContext,
  ProfileFormContextType,
} from "../../../../context/ProfileFormContext";
import { IFailureModal } from "./failureModal.interface";
import { ExpressButton } from "../../../../core/expressButton/expressButton.component";

export const FailureModal = ({ message, returnBtnAction }: IFailureModal) => {
  const profileForm = useContext<ProfileFormContextType | null>(
    ProfileFormContext
  );

  useEffect(() => {
    profileForm?.setOriginalProfileDetails(profileForm.profileDetails);
  }, []);

  return (
    <div className="failure-modal">
      <h2 className="title" data-testid="title">
        Failure!
      </h2>
      <h4 className="description" data-testid="description">
        {message}
      </h4>
      <Grid
        container
        spacing={1}
        classes={{ root: "failure-modal-grid-container" }}
      >
        <Grid item xs={12}>
          <ExpressButton
            clickHandler={returnBtnAction}
            parentClass="return-btn"
            testId="return-btn"
            variant="contained"
          >
            Return to manage your profile
          </ExpressButton>
        </Grid>
      </Grid>
    </div>
  );
};
