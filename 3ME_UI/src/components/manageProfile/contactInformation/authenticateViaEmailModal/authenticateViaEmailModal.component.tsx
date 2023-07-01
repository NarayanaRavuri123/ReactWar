import "./authenticateViaEmailModal.css";
import { useEffect, useState } from "react";
import { Grid, InputBase } from "@mui/material";
import { Validator } from "../../../../util/order.validations";
import { generateAndSendCode } from "../../../../util/codeService";
import { LoadingSpinner } from "../../../../core/loader/LoadingSpinner";
import { getCodeValidateError } from "../../../../util/utilityFunctions";
import { ValidationStatus } from "../../../../core/interfaces/input.interface";
import { IAuthenticateViaEmailModal } from "./authenticateViaEmailModal.interface";
import { ExpressButton } from "../../../../core/expressButton/expressButton.component";
import { InputWithLabel } from "../../../../core/inputWithLabel/inputWithLabel.component";
import { IAuthProfile } from "../../../authenticateProfile/saveProfile/authprofile.interface";

export const AuthenticateViaEmailModal = ({
  code,
  data,
  error,
  resendBtnAction,
  setCode,
  showLoader = false,
  submitBtnAction,
}: IAuthenticateViaEmailModal) => {
  const [validator] = useState<Validator>(new Validator());
  const [isLoading, setIsLoading] = useState(showLoader);
  const [codeValidateError, setCodeValidateError] = useState(false);
  const [codeValidateErrorDesp, setcodeValidateErrorDesp] = useState("");

  const generateAndSendCodeService = async (authType: string) => {
    const reqParams = {
      mode: authType === "email" ? 0 : 1,
      userName: data?.userName.value,
      email: authType === "email" ? data?.email.value : "",
      phoneNumber: authType !== "email" ? data?.phone.value : "",
    };
    try {
      setIsLoading(true);
      const result = await generateAndSendCode(reqParams);
      if (result.succeeded) {
        setIsLoading(false);
      } else {
        setCodeValidateError(true);
        setIsLoading(false);
        setcodeValidateErrorDesp(getCodeValidateError(result.error.errorCode));
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const validateAndSetData = (e: any) => {
    const isValid = validator.validate(e.target.value, e.target.name);
    setCodeValidateError(e.target.value === "");
    setcodeValidateErrorDesp(
      e.target.value === ""
        ? "A 6 digit multifactor authentication code is required"
        : ""
    );
    setCode((dt: IAuthProfile) => ({
      ...dt,
      [e.target.name]: {
        value: e.target.value,
        valid: isValid?.status,
      },
    }));
  };

  const resendButtonAction = () => {
    setCodeValidateError(false);
    setcodeValidateErrorDesp("");
    setCode((dt: IAuthProfile) => ({
      ...dt,
      verifycode: {
        value: "",
        valid: ValidationStatus.UNTOUCHED,
      },
    }));
    generateAndSendCodeService("email");
  };

  useEffect(() => {
    if (error && error !== "") {
      setCodeValidateError(true);
      setcodeValidateErrorDesp(error);
      const updateVerifyCode = {
        value: code.verifycode.value,
        valid: ValidationStatus.INVALID,
      };
      setCode(
        Object.assign({}, code, {
          verifycode: updateVerifyCode,
        })
      );
    }
  }, [error]);

  const spinner = () => {
    return (
      <div className="loader" data-testid="loader">
        <LoadingSpinner />
      </div>
    );
  };

  const authPage = () => {
    return (
      <>
        <div className="description" data-testid="description">
          <h4 className="description-one" data-testid="description-one">
            A verification code has been sent to your email. Allow up to 5
            minutes to receive the email.
          </h4>
          <h4 className="description-two" data-testid="description-two">
            Please enter the 6-digit code to confirm you are the account holder.
          </h4>
        </div>
        <Grid
          container
          spacing={1}
          classes={{ root: "authenticate-via-email-modal-grid-container" }}
        >
          <Grid item xs={12}>
            <>
              <InputWithLabel
                label="Email Verification Code"
                isRequired={true}
                error={code.verifycode.valid === ValidationStatus.INVALID}
                errorMessage={codeValidateError ? codeValidateErrorDesp : ""}
                testId="email-verification-code-label"
              >
                <InputBase
                  autoFocus
                  className="authenticate-via-email-modal-input"
                  inputProps={{
                    "data-testid": "email-verification-code-value",
                  }}
                  name="verifycode"
                  onChange={validateAndSetData}
                  placeholder="000000"
                  value={code.verifycode.value}
                />
              </InputWithLabel>
            </>
          </Grid>
          <Grid item xs={12}>
            <ExpressButton
              clickHandler={submitBtnAction}
              disabled={code.verifycode.valid !== ValidationStatus.VALID}
              parentClass="submit-btn"
              testId="submit-btn"
              variant="contained"
            >
              Submit email verification
            </ExpressButton>
            <ExpressButton
              clickHandler={
                resendBtnAction === undefined
                  ? resendButtonAction
                  : resendBtnAction
              }
              parentClass="resend-btn"
              testId="resend-btn"
              variant="outlined"
            >
              Resend code to email
            </ExpressButton>
          </Grid>
        </Grid>
      </>
    );
  };

  return (
    <div className="authenticate-via-email-modal">
      <h2 className="title" data-testid="title">
        Authenticate your email
      </h2>
      {isLoading ? spinner() : authPage()}
    </div>
  );
};
