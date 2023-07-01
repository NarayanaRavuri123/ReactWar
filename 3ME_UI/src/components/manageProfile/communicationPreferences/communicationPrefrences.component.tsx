import "./communicationPreferences.css";
import {
  ProfileFormContext,
  ProfileFormContextType,
} from "../../../context/ProfileFormContext";
import { Checkbox, Grid } from "@mui/material";
import { MouseEventHandler, useContext } from "react";
import { IManageProfile } from "../manageProfile.interface";
import ContactOptions from "../../../core/contactOptions/contactOptions.component";
import { ReactComponent as CheckedIcon } from "../../../assets/checkedcheckbox.svg";
import { ReactComponent as UncheckIcon } from "../../../assets/uncheckedcheckbox.svg";

type CommPrefProps = {
  data: IManageProfile | undefined;
  onEmailCheckboxClick: MouseEventHandler<HTMLLabelElement>;
  onSmsCheckboxClick: MouseEventHandler<HTMLLabelElement>;
  smsCheckboxDisabled: boolean | undefined;
  onAcceptTncClick: MouseEventHandler<HTMLLabelElement>;
  tncAcceptDisabled: boolean | undefined;
  tncAcceptChecked: boolean | undefined;
  smsChecked: boolean | undefined;
  emailChecked: boolean | undefined;
  toTncPath: string;
  formType?: string;
  onKeepMeUpdatedValue?: boolean;
  setIsTnCOpen: any;
};

const CommunicationPreferences = ({
  data,
  onEmailCheckboxClick,
  onSmsCheckboxClick,
  smsCheckboxDisabled,
  onAcceptTncClick,
  tncAcceptDisabled,
  tncAcceptChecked,
  smsChecked,
  emailChecked,
  toTncPath,
  setIsTnCOpen,
}: CommPrefProps) => {
  const registrationForm = useContext<ProfileFormContextType | null>(
    ProfileFormContext
  );
  return (
    <Grid container className="comm-pref-main-container">
      <Grid item className="comm-pref-main-item">
        <div className="comm-pref-header">Communication preferences</div>
        <ContactOptions
          data={data!}
          onEmailCheckboxClick={onEmailCheckboxClick}
          onSmsCheckboxClick={onSmsCheckboxClick}
          onAcceptTncClick={onAcceptTncClick}
          tncAcceptDisabled={tncAcceptDisabled}
          tncAcceptChecked={tncAcceptChecked}
          toTncPath={toTncPath}
          headerLabel={
            "How would you like to hear from 3M regarding your order(s)?"
          }
          emailCheckboxLabel={"Email"}
          smsCheckboxLabel={"SMS"}
          tncDisclaimerLabel={"Carrier and message rates may apply."}
          tncAcceptLabel={"Accept SMS "}
          smsChecked={smsChecked}
          emailChecked={emailChecked}
          smsDisabled={smsCheckboxDisabled}
          setIsTnCOpen={setIsTnCOpen}
        />
        <div>
          <div className="keep-updated-text">
            <a
              className="keep-updated-div"
              href="https://engage.3m.com/msd-global-optin"
              target="_blank"
              rel="noreferrer"
            >
              Subscribe{" "}
            </a>
            to stay updated on 3M Health Care product information.
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default CommunicationPreferences;
