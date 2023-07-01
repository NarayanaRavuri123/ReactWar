import "./successModal.css";
import { Grid } from "@mui/material";
import { useContext, useEffect } from "react";
import {
  ProfileFormContext,
  ProfileFormContextType,
} from "../../../../context/ProfileFormContext";
import { ISuccessModal } from "./successModal.interface";
import { ExpressButton } from "../../../../core/expressButton/expressButton.component";

export const SuccessModal = ({
  setTempData,
  returnBtnAction,
}: ISuccessModal) => {
  const profileForm = useContext<ProfileFormContextType | null>(
    ProfileFormContext
  );

  useEffect(() => {
    profileForm?.setOriginalProfileDetails(profileForm.profileDetails);
    if (setTempData && profileForm && profileForm.profileDetails) {
      setTempData(profileForm.profileDetails);
    }
  }, []);

  return (
    <div className="success-modal">
      <h2 className="title" data-testid="title">
        Success!
      </h2>
      <h4 className="description" data-testid="description">
        Your phone number has been successfully updated
      </h4>
      <Grid
        container
        spacing={1}
        classes={{ root: "success-modal-grid-container" }}
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
