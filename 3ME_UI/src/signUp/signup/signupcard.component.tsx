import { Grid } from "@mui/material";
import { useHistory } from "react-router-dom";
import { ReactComponent as DMEIcon } from "../../assets/dmeicon.svg";
import { ReactComponent as ProfileIcon } from "../../assets/profile.svg";
import { ReactComponent as FacilityIcon } from "../../assets/facility.svg";
import PrimaryButton from "../../core/primaryButton/primaryButton.component";
import {
  ProfileFormContext,
  ProfileFormContextType,
} from "../../context/ProfileFormContext";
import { useContext } from "react";

const SignupCard = () => {
  const history = useHistory();
  const profileForm = useContext<ProfileFormContextType | null>(
    ProfileFormContext
  );
  const beginRegistration = () => {
    profileForm?.resetProfileForm();
    history.push("/registration");
  };

  return (
    <Grid
      container
      className="registration-detail-card"
      data-testid="registration-detail-card"
    >
      <Grid item>
        <div>
          <div className="signupHeader" data-testid="acountType">
            What kind of account would you like to create?
          </div>
          <div className="sectionIcon">
            <FacilityIcon />
            <div className="iconTitle">Facility</div>
          </div>
          <div className="contact" data-testid="facilityContact">
            This portal is intended for use by clinicians in the United States.
            For further assistance, call the National Contact Center at (800)
            275-4524 ext. 41858
          </div>
          <div style={{ marginBottom: "43px" }}>
            <PrimaryButton
              title="Begin registration"
              onClick={beginRegistration}
            />
          </div>
          <div className="sectionIcon">
            <DMEIcon />
            <div className="iconTitle">DME company</div>
          </div>
          <div
            className="contact"
            style={{ marginBottom: "43px" }}
            data-testid="dmeContact"
          >
            This account type cannot be applied for online. Please contact 3M™
            at 800-275-4524 ext. 41858 for assistance.
          </div>
          <div className="sectionIcon">
            <ProfileIcon />
            <div className="iconTitle">Patient</div>
          </div>
          <div
            className="contact"
            style={{ marginBottom: "56px" }}
            data-testid="patientHelpInfo"
          >
            For patients on V.A.C.™ Therapy, please see our resources available
            on{" "}
            <a
              style={{ fontWeight: "700", textDecorationSkipInk: "none" }}
              href="https://www.mywoundhealing.com/"
              target="_blank"
              rel="noreferrer"
            >
              3M™ MyWoundHealing™ Mobile App
            </a>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default SignupCard;
