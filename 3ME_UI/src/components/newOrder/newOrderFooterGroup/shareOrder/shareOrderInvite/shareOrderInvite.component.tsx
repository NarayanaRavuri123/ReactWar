import React, { useContext } from "react";
import { NewOrderValidator } from "./../../../newOrder.validator";

import "./shareOrderInvite.css";
import { Grid, InputBase } from "@mui/material";
import { InputWithLabel } from "./../../../../../core/inputWithLabel/inputWithLabel.component";
import { ValidationStatus } from "../../../../../core/interfaces/input.interface";
import { defaultShareOrderInivte } from "./shareOrderInvite.interface";
import { ExpressButton } from "../../../../../core/expressButton/expressButton.component";
import { SharedOrderModal } from "../shareOrder.enum";
import { getDeepClone } from "../../../../../util/ObjectFunctions";
import {
  AuthContext,
  AuthContextType,
} from "../../../../../context/AuthContext";
import { shareOrderRegistrationEmail } from "../../../../../util/3meService";
import { TEMP_SHAREORDER_INVITE } from "../../../../../util/staticText";

interface IShareInvite {
  handleShareOrderType: any;
  setShareOrderSuccessInvite: any;
  addshareOrderInvite: any;
  setAddShareOrderInvite: any;
}

export const ShareOrderInvite = ({
  handleShareOrderType,
  setShareOrderSuccessInvite,
  addshareOrderInvite,
  setAddShareOrderInvite,
}: IShareInvite) => {
  const AuthObj = useContext<AuthContextType | null>(AuthContext);

  const validateAndSetData = (e: any) => {
    const validator = new NewOrderValidator();
    let { value, name } = e.target;
    let isvalid = validator.validate(value, name);

    setAddShareOrderInvite((addshareOrderInvite: any) => ({
      ...addshareOrderInvite,
      [e.target.name]: {
        value: value,
        valid: isvalid?.status,
      },
    }));
  };

  const handleCancelClick = () => {
    handleShareOrderType(SharedOrderModal.SHARE_ORDER);
    setAddShareOrderInvite(defaultShareOrderInivte);
  };

  const validateFormAndEnable = () => {
    let temp = getDeepClone(addshareOrderInvite);
    const ifAllValid = Object.keys(temp).every(
      (x: string) => temp[x].valid === ValidationStatus.VALID
    );
    return !ifAllValid;
  };

  const handleSendInviteClick = async () => {
    const reqBody = {
      userName: AuthObj?.userProfile?.userName,
      TemplateCode: TEMP_SHAREORDER_INVITE,
      EmailParameters: {
        RecipientFirstName: addshareOrderInvite?.shareOrderInviteFName.value,
        RecipientEmail: addshareOrderInvite?.shareOrderInviteEmail.value,
        Note: addshareOrderInvite?.shareOrderInviteNote.value,
        RequestorFirstName: AuthObj?.userProfile?.firstName,
        RequestorLastName: AuthObj?.userProfile?.lastName,
        RequestorFacilityName: AuthObj?.registeredFaciltyAddress?.accountName,
      },
    };
    const sendInvite = await shareOrderRegistrationEmail(reqBody);
    if (sendInvite.succeeded) {
      setShareOrderSuccessInvite(true);
      handleShareOrderType(SharedOrderModal.SHARE_ORDER_INVITE_SUCESS);
    } else {
    }
  };

  return (
    <div
      className="shareOrderInviteMain"
      data-testid="shareOrderInviteMainTest"
    >
      <h2
        className="shareOrderInviteHeader"
        data-testid="shareOrderInviteHeaderTest"
      >
        Invite someone to join 3M Express
      </h2>
      <Grid
        container
        spacing={2}
        classes={{ root: "shareOrderInvite-component" }}
      >
        <Grid item xs={6}>
          <InputWithLabel
            label="First Name"
            isRequired={true}
            error={
              addshareOrderInvite?.shareOrderInviteFName.valid ===
              ValidationStatus.INVALID
            }
          >
            <InputBase
              className="shareOrderInvite-input"
              name="shareOrderInviteFName"
              value={addshareOrderInvite?.shareOrderInviteFName.value}
              onChange={validateAndSetData}
              data-testid="shareOrderInviteFirstNameTest"
            />
          </InputWithLabel>
        </Grid>
        <Grid item xs={6}>
          <InputWithLabel
            label="Last Name"
            isRequired={true}
            error={
              addshareOrderInvite?.shareOrderInviteLName.valid ===
              ValidationStatus.INVALID
            }
          >
            <InputBase
              className="shareOrderInvite-input"
              name="shareOrderInviteLName"
              value={addshareOrderInvite?.shareOrderInviteLName.value}
              onChange={validateAndSetData}
              data-testid="shareOrderInviteLastNameTest"
            />
          </InputWithLabel>
        </Grid>
        <Grid item xs={12}>
          <InputWithLabel
            label="Email Address"
            isRequired={true}
            error={
              addshareOrderInvite?.shareOrderInviteEmail.valid ===
              ValidationStatus.INVALID
            }
          >
            <InputBase
              className="shareOrderInvite-input"
              name="shareOrderInviteEmail"
              onChange={validateAndSetData}
              value={addshareOrderInvite?.shareOrderInviteEmail.value}
              inputProps={{
                maxlength: 500,
                "data-testid": "note-textarea",
              }}
              data-testid="shareOrderInviteEmailTest"
            />
          </InputWithLabel>
        </Grid>
        <Grid item xs={12}>
          <InputWithLabel
            label="Note to Recipient"
            isRequired={false}
            error={
              addshareOrderInvite?.shareOrderInviteNote.valid ===
              ValidationStatus.INVALID
            }
          >
            <InputBase
              className="shareOrderInvite-input"
              inputProps={{
                maxlength: 500,
              }}
              name="shareOrderInviteNote"
              value={addshareOrderInvite?.shareOrderInviteNote?.value}
              onChange={validateAndSetData}
              data-testid="shareOrderInviteTextTest"
              multiline={true}
              rows={2}
              error={
                addshareOrderInvite?.shareOrderInviteNote.valid ===
                ValidationStatus.INVALID
              }
            />
          </InputWithLabel>
          <div
            className="shareOrderInviteNote"
            data-testid="remaining-chars-shareorderinvite"
          >
            {`Limit 500 characters. ${
              500 -
              addshareOrderInvite?.shareOrderInviteNote.value.trim()?.length
            } characters left.`}
          </div>
        </Grid>
      </Grid>
      <Grid container spacing={2} className="btnGridMain">
        <Grid item xs={6}>
          <ExpressButton
            parentClass="sharedOrderButton"
            variant="outlined"
            clickHandler={handleCancelClick}
            testId="shareOrderInviteCancelTest"
          >
            Cancel
          </ExpressButton>
        </Grid>
        <Grid item xs={6}>
          <ExpressButton
            parentClass="sharedOrderButton"
            variant="contained"
            clickHandler={handleSendInviteClick}
            disabled={validateFormAndEnable()}
            testId="shareOrderInviteSendTest"
          >
            Send Invite
          </ExpressButton>
        </Grid>
      </Grid>
    </div>
  );
};
