import { Grid, InputBase } from "@mui/material";
import { useOktaAuth } from "@okta/okta-react";
import React from "react";
import { useCallback, useContext, useEffect } from "react";
import { AuthContext, AuthContextType } from "../../../context/AuthContext";
import { ExpressButton } from "../../../core/expressButton/expressButton.component";
import { InputWithLabel } from "../../../core/inputWithLabel/inputWithLabel.component";
import { UpdateUserName } from "../../../util/userService";
import SnackBar from "../../../core/snackBar/snackBar.component";
import { generateAndSendCode, ValidateCode } from "../../../util/codeService";
import { IManageAccount } from "../manageAccount.interface";
import { ManageAccountHeader } from "../manageAccountHeader";
import "./verifyaccount.css";
import { getCodeValidateError } from "../../../util/utilityFunctions";
import { AuthenticationType } from "../../authenticateProfile/saveProfile/authenticationType.model";

type VerifyAccountProps = {
  type: string;
  data: IManageAccount | undefined;
};
export const VerifyAccount = ({ type, data }: VerifyAccountProps) => {
  const [codeHasError, setCodeHasError] = React.useState(false);
  const [openToast, setOpenToast] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [instruction, setInstruction] = React.useState("");
  const [errorMsg, setErrorMsg] = React.useState("");
  const [toastMsg] = React.useState("Code has been re-sent.");
  const AuthObj = useContext<AuthContextType | null>(AuthContext);
  const { oktaAuth } = useOktaAuth();
  const setInstructionText = useCallback(() => {
    if (type && type !== "") {
      if (type === "SMS") {
        setInstruction(
          "Please enter the 6-digit code sent to your mobile phone."
        );
      } else {
        setInstruction("Please enter the 6-digit code sent to your email.");
      }
    }
  }, [type]);

  const handleBackClick = () => {
    AuthObj?.setManageAccountProgbarVal(25);
  };

  const handleResendCode = async () => {
    setCode("");
    try {
      const reqParams = {
        mode: type === "email" ? 0 : 1,
        userName: AuthObj?.userProfile?.userName,
        email: type === "email" ? AuthObj?.userProfile?.emailAddress : "",
        phoneNumber:
          type !== "email"
            ? AuthObj?.userProfile?.mobilePhoneNo
                .replace(/\s/g, "")
                .replace(/[()-]/g, "")
            : "",
        type: AuthenticationType.UPDATE_USERNAME,
      };
      const resp = await generateAndSendCode(reqParams);
      if (resp.succeeded) {
        setOpenToast(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleCodeChange = (e: any) => {
    setCode(e.target.value);
    const regex = /^[0-9]{6}$/;
    let valid = regex.test(e.target.value);
    setCodeHasError(!valid);
    setErrorMsg("");
  };
  const handleSubmit = async () => {
    if (code && code !== "" && !codeHasError) {
      const reqParams = {
        mode: type === "email" ? 0 : 1,
        code: code,
        email: type === "email" ? AuthObj?.userProfile?.emailAddress : "",
        phoneNumber:
          type !== "email"
            ? AuthObj?.userProfile?.mobilePhoneNo
                .replace(/\s/g, "")
                .replace(/[()-]/g, "")
            : "",
      };
      const resp = await ValidateCode(reqParams);
      if (resp.succeeded) {
        var updateResponse = await updateUserName();
        if (updateResponse !== undefined) {
          setCodeHasError(true);
          setErrorMsg(getCodeValidateError(updateResponse));
        } else {
          oktaAuth.signOut();
        }
      } else {
        setCodeHasError(true);
        setErrorMsg(getCodeValidateError(resp.error.errorCode));
      }
    } else {
      setCodeHasError(true);
    }
  };

  const updateUserName = async () => {
    const reqBody = {
      currentUsername: AuthObj?.userProfile?.userName,
      newUsername: AuthObj?.manageAccountData?.manageAccountUserName.value,
    };
    const response = await UpdateUserName(JSON.stringify(reqBody));
    if (response.error) {
      return response.error.errorCode;
    }
    return undefined;
  };
  useEffect(() => {
    setInstructionText();
  }, [AuthObj?.verificationType]);
  return (
    <div className="verify-sms-container" data-testid="verify-container">
      <ManageAccountHeader />
      <div className="code-container">
        <div className="verify-header">Verify your access</div>
        <div className="instruction" data-testid="instruction">
          {instruction}
        </div>
        <div className="code-input-container">
          <InputWithLabel
            error={codeHasError}
            isRequired={true}
            label="Verification Code"
            errorMessage={errorMsg}
          >
            <InputBase
              className="code-input"
              inputProps={{
                "data-testid": "code-input-value",
                maxLength: 6,
              }}
              onChange={handleCodeChange}
              name="smscode"
              type="text"
              value={code}
              error={codeHasError}
              placeholder="000000"
            />
          </InputWithLabel>
        </div>
        <Grid container className="btns-container">
          <Grid item xs={2}>
            <ExpressButton
              clickHandler={handleBackClick}
              variant="text"
              parentClass="bck-btn"
              testId="bck-btn"
            >
              Back
            </ExpressButton>
          </Grid>
          <Grid item xs={4}>
            <ExpressButton
              clickHandler={handleResendCode}
              variant="outlined"
              parentClass="verify-btn"
              testId="resend-btn"
            >
              Re-send code
            </ExpressButton>
          </Grid>
          <Grid item xs={4}>
            <ExpressButton
              clickHandler={handleSubmit}
              variant="contained"
              parentClass="verify-btn"
              testId="submit-btn"
            >
              Submit
            </ExpressButton>
          </Grid>
        </Grid>
      </div>
      <SnackBar
        toastStyle="resend-toast"
        openFlag={openToast}
        msg={toastMsg}
        handleCloseAlert={() => setOpenToast(false)}
        autoClose
      ></SnackBar>
    </div>
  );
};
