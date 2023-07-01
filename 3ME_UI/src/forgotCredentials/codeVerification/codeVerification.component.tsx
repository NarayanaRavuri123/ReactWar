import "./codeVerification.css";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { defaultCode } from "./codeVerification.model";
import { getDeepClone } from "../../util/ObjectFunctions";
import SnackBar from "../../core/snackBar/snackBar.component";
import { ICode, ICodeVerification } from "./codeVerification.interface";
import { ValidationStatus } from "../../core/interfaces/input.interface";
import { Item, PatientInput } from "../../components/newOrder/newOrder.style";
import { containerPageType } from "../forgotCredentialContainer/pageType.enum";
import { ExpressButton } from "../../core/expressButton/expressButton.component";
import { InputWithLabel } from "../../core/inputWithLabel/inputWithLabel.component";
import ForgotCredentialContainer from "../forgotCredentialContainer/forgotCredentialContainer.component";
import { ForgotPasswordInfo } from "../forgotPassword/forgotPasswordContainer/forgotCredential.interface";
import { ForgotPasswordChannel } from "../forgotPassword/forgotPasswordContainer/forgotCredentialPages.enum";

const CodeVerification = ({
  data,
  setData,
  errorMessage,
  backButtonAction,
  resendCodeAction,
  verifyCodeAction,
}: ICodeVerification) => {
  const [codeDetails, setcodeDetails] = useState<ICode>(
    getDeepClone(defaultCode)
  );
  const [codeSentAlert, setCodeSentAlert] = useState<boolean>(true);
  const [msg, setMsg] = useState<string>("Code has been sent.");

  setTimeout(() => {
    setCodeSentAlert(false);
  }, 1500);

  const handleBackClick = () => {
    setcodeDetails(getDeepClone(defaultCode));
    backButtonAction();
  };

  const handleSubmitClick = () => {
    if (
      codeDetails.code.valid === ValidationStatus.VALID &&
      codeDetails.code.value.length === 6
    ) {
      verifyCodeAction(codeDetails.code.value);
    }
  };

  const validateCode = (param: any) => {
    const regex = /^[0-9]*$/;
    return regex.test(param) && param.length <= 6
      ? ValidationStatus.VALID
      : ValidationStatus.INVALID;
  };

  const handleCodeChange = (e: any) => {
    const isValid = validateCode(e.target.value);
    setcodeDetails(
      Object.assign({}, codeDetails, {
        [e.target.name]: { value: e.target.value, valid: isValid },
      })
    );
  };

  const handleResend = () => {
    setcodeDetails(getDeepClone(defaultCode));
    setMsg("Code has been re-sent.");
    setCodeSentAlert(true);
    setTimeout(() => {
      setCodeSentAlert(false);
    }, 1500);
  };

  const handleResendCode = async () => {
    resendCodeAction();
  };

  const handleCloseAlert = () => {
    setCodeSentAlert(false);
  };

  useEffect(() => {
    if (data.isResendSuccess) {
      setData((dt: ForgotPasswordInfo) => ({
        ...dt,
        isResendSuccess: false,
      }));
      handleResend();
    }
  }, [data.isResendSuccess]);

  return (
    <ForgotCredentialContainer pageType={containerPageType.CONFIRMATION_PAGE}>
      <div className="confirmCodeSent" data-testid="sent">
        {data.channel === ForgotPasswordChannel.SMS ? "SMS" : "Email"} sent
      </div>
      <span className="confirmCodeSentIntro">
        {data.channel === ForgotPasswordChannel.SMS ? "Text" : "Email"} has been
        sent to{" "}
        {data.channel === ForgotPasswordChannel.SMS
          ? data.maksedMobileNumber
          : data.maskedEmailId}{" "}
        with a 6 digit code to reset your password. When received, type in the
        code below and submit to reset your password.
      </span>
      <Grid container style={{ justifyContent: "center", marginTop: "10px" }}>
        <Grid className="codeinput">
          <Item>
            <InputWithLabel
              testId="codeLabel"
              label={
                data.channel === ForgotPasswordChannel.SMS
                  ? "SMS Code"
                  : "Email Code"
              }
              isRequired={true}
              error={codeDetails?.code.valid === ValidationStatus.INVALID}
            >
              <PatientInput
                inputProps={{ "data-testid": "code" }}
                autoFocus
                name="code"
                value={codeDetails?.code.value}
                onChange={handleCodeChange}
              />
            </InputWithLabel>
            {errorMessage && (
              <div className="error-message-label">{errorMessage}</div>
            )}
          </Item>
        </Grid>
      </Grid>
      <div className="submitCodeContainer">
        <ExpressButton
          clickHandler={handleSubmitClick}
          parentClass="submitCode"
          variant="contained"
        >
          Submit
        </ExpressButton>
      </div>
      <div className="submitCodeContainer">
        <ExpressButton
          parentClass="submitCode"
          clickHandler={
            data.isForgotPasswordFlow ? handleResendCode : handleResend
          }
          variant="outlined"
        >
          Re-send code
        </ExpressButton>
      </div>
      <span className="backlink" onClick={handleBackClick}>
        Back
      </span>
      <SnackBar
        toastStyle="codeSentStatusToast"
        openFlag={codeSentAlert}
        msg={msg}
        handleCloseAlert={handleCloseAlert}
      ></SnackBar>
    </ForgotCredentialContainer>
  );
};

export default CodeVerification;
