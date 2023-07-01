import { Checkbox, FormControlLabel, FormGroup, Grid } from "@mui/material";
import { InputWithLabel } from "../inputWithLabel/inputWithLabel.component";
import { ReactComponent as CheckedIcon } from "../../assets/checkedcheckbox.svg";
import { ReactComponent as UncheckIcon } from "../../assets/uncheckedcheckbox.svg";
import { IManageProfile } from "../../components/manageProfile/manageProfile.interface";
import { ReactComponent as DisabledUncheckIcon } from "../../assets/disabled-checkbox.svg";
import { ReactComponent as DisabledCheckedIcon } from "../../assets/disabled-checked-checkbox.svg";

import "./contactOptions.css";
import { Link } from "react-router-dom";
import { MouseEventHandler } from "react";
import { ValidationStatus } from "../interfaces/input.interface";

type ContactOptionsProps = {
  data: IManageProfile;
  onEmailCheckboxClick: MouseEventHandler<HTMLLabelElement>;
  onSmsCheckboxClick: MouseEventHandler<HTMLLabelElement>;
  onAcceptTncClick: MouseEventHandler<HTMLLabelElement>;
  tncAcceptDisabled: boolean | undefined;
  tncAcceptChecked: boolean | undefined;
  smsChecked: boolean | undefined;
  emailChecked: boolean | undefined;
  toTncPath: string;
  headerLabel: string;
  emailCheckboxLabel: string;
  smsCheckboxLabel: string;
  tncDisclaimerLabel: string;
  tncAcceptLabel: string;
  smsDisabled: boolean | undefined;
  setIsTnCOpen: any;
};

const ContactOptions = ({
  data,
  onEmailCheckboxClick,
  onSmsCheckboxClick,
  onAcceptTncClick,
  tncAcceptDisabled,
  tncAcceptChecked,
  smsChecked,
  emailChecked,
  toTncPath,
  headerLabel,
  emailCheckboxLabel,
  smsCheckboxLabel,
  tncDisclaimerLabel,
  tncAcceptLabel,
  smsDisabled,
  setIsTnCOpen,
}: ContactOptionsProps) => {
  return (
    <Grid
      className="contact-options-container"
      classes={{ root: "contact-options-root" }}
    >
      <Grid item xs={12}>
        <InputWithLabel
          label={headerLabel}
          isRequired={true}
          error={data?.preferenceType.valid === ValidationStatus.INVALID}
          labelClassName="contact-options-header-label"
        >
          <FormGroup classes={{ root: "checkboxRoot" }}>
            <FormControlLabel
              classes={{
                root: "checkbox-option-txt",
                label: "label-root",
              }}
              value={emailChecked}
              onClick={onEmailCheckboxClick}
              control={
                <Checkbox
                  icon={<UncheckIcon />}
                  checkedIcon={<CheckedIcon />}
                  className="no-left-padding-checkbox"
                  checked={emailChecked}
                  data-testid="email-checkbox"
                />
              }
              label={emailCheckboxLabel}
            />
            <FormControlLabel
              classes={{ root: "checkbox-option-txt", label: "label-root" }}
              value={smsChecked}
              label={smsCheckboxLabel}
              onClick={onSmsCheckboxClick}
              name="smsbox"
              control={
                <Checkbox
                  className="no-left-padding-checkbox"
                  checked={smsChecked}
                  checkedIcon={
                    smsDisabled ? <DisabledCheckedIcon /> : <CheckedIcon />
                  }
                  disabled={smsDisabled}
                  data-testid="sms-checkbox"
                  icon={smsDisabled ? <DisabledUncheckIcon /> : <UncheckIcon />}
                />
              }
            />
          </FormGroup>
        </InputWithLabel>
      </Grid>
      <Grid item xs={12}>
        <div className="sms-tnc-div">
          <InputWithLabel
            label={tncDisclaimerLabel}
            isRequired={false}
            error={data?.smsTnCAccept.valid === ValidationStatus.INVALID}
            labelClassName="sms-tnc-label"
          >
            <FormGroup
              classes={{ root: "checkbox-root" }}
              className="checkbox-flex"
            >
              <FormControlLabel
                classes={{
                  root: "checkbox-option-txt",
                  label: "checkbox-option-txt-sms",
                }}
                value="sms-accept"
                label={tncAcceptLabel}
                onClick={onAcceptTncClick}
                control={
                  <Checkbox
                    checked={tncAcceptChecked}
                    checkedIcon={
                      tncAcceptDisabled ? (
                        <DisabledCheckedIcon />
                      ) : (
                        <CheckedIcon />
                      )
                    }
                    className="no-left-padding-checkbox"
                    data-testid="tnc-checkbox"
                    disabled={tncAcceptDisabled}
                    icon={
                      tncAcceptDisabled ? (
                        <DisabledUncheckIcon />
                      ) : (
                        <UncheckIcon />
                      )
                    }
                    name="accepttnc"
                  />
                }
              />
              <Link
                className="sms-tnc-link"
                to={toTncPath}
                onClick={() => {
                  setIsTnCOpen(true);
                }}
              >
                Terms & Conditions
              </Link>
              {smsChecked && <span className="req-asterisk">*</span>}
            </FormGroup>
          </InputWithLabel>
        </div>
      </Grid>
    </Grid>
  );
};

export default ContactOptions;
