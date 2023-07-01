import React from "react";
import { Grid, InputBase } from "@mui/material";
import { InputWithLabel } from "../../../core/inputWithLabel/inputWithLabel.component";
import { ManageProfileValidator } from "../manageProfile.validator";
import "./messageToAdmin.css";
import { IAdminMessage } from "./messageToAdmin.interface";
import { ValidationStatus } from "../../../core/interfaces/input.interface";

export const MessageToAdmin = ({ data, Validator, setData }: IAdminMessage) => {
  const [validator] = React.useState<ManageProfileValidator>(Validator!);
  const validateAndSetData = (e: any) => {
    const isValid = validator.validate(e.target.value, e.target.name);
    setData(
      Object.assign({}, data, {
        [e.target.name]: { value: e.target.value, valid: isValid?.status },
      })
    );
  };
  return (
    <Grid container className="admin-msg-container">
      <Grid item xs={12}>
        <div className="admin-msg-title" data-testid="admin-msg-title">
          Message
        </div>
        <InputWithLabel
          label="Note to Facility Admin"
          isRequired={false}
          labelClassName="msg-input-label"
          testId="msg-box"
          error={data?.adminMessage?.valid === ValidationStatus.INVALID}
        >
          <InputBase
            className="msg-txt-box"
            value={data?.adminMessage?.value}
            onChange={validateAndSetData}
            name="adminMessage"
            inputProps={{
              "data-testid": "msg-txt-box",
              maxLength: 150,
            }}
          ></InputBase>
        </InputWithLabel>
        <div className="msg-limit">Limit 150 characters</div>
      </Grid>
    </Grid>
  );
};
