import "./forgotPassword.css";
import {
  IForgotPassword,
  IForgotPasswordProps,
} from "./forgotPassword.interface";
import { useState, useEffect } from "react";
import { Grid, InputBase } from "@mui/material";
import { getDeepClone } from "../../util/ObjectFunctions";
import { Item } from "../../components/newOrder/newOrder.style";
import { defaultForgotPasswordData } from "./forgotPassword.model";
import { ValidationStatus } from "../../core/interfaces/input.interface";
import { containerPageType } from "../forgotCredentialContainer/pageType.enum";
import { ExpressButton } from "../../core/expressButton/expressButton.component";
import { InputWithLabel } from "../../core/inputWithLabel/inputWithLabel.component";
import { ForgotPasswordOption } from "./forgotPasswordContainer/forgotCredentialPages.enum";
import ForgotCredentialContainer from "../forgotCredentialContainer/forgotCredentialContainer.component";

const ForgotPassword = ({
  errorMessage,
  preferedOption,
  resetPasswordAction,
  setErrorMessage,
  setPreferedOption,
}: IForgotPasswordProps) => {
  const [data, setData] = useState<IForgotPassword>(
    getDeepClone(defaultForgotPasswordData)
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(errorMessage);

  const validateUserName = (param: any) => {
    const regex = /^[A-Za-z0-9_@.+-]*$/;
    return regex.test(param) && param.length > 0
      ? ValidationStatus.VALID
      : ValidationStatus.INVALID;
  };

  const validateAndSetData = (e: any) => {
    if (e.target.value === "") {
      setErrorMessage(null);
      setPreferedOption(ForgotPasswordOption.NONE);
    }
    const isValid = validateUserName(e.target.value);
    setData({
      ...data,
      userName: { value: e.target.value, valid: isValid },
    });
  };

  const validateAndSendCode = (type: ForgotPasswordOption) => {
    if (
      data.userName.valid === ValidationStatus.VALID ||
      preferedOption !== ForgotPasswordOption.NONE
    ) {
      resetPasswordAction(type, data.userName.value);
    } else {
      setData(
        Object.assign({}, data, {
          userName: { valid: ValidationStatus.INVALID },
        })
      );
    }
  };

  useEffect(() => {
    setErrorMsg(errorMessage);
    if (errorMessage) {
      setData({
        ...data,
        userName: {
          valid: ValidationStatus.INVALID,
          value: data.userName.value,
        },
      });
    }
  }, [errorMessage]);

  return (
    <ForgotCredentialContainer pageType={containerPageType.VERIFICATION_PAGE}>
      <div className="forgotPasswordTitle">Forgot Password</div>
      <Grid container className="username-input-container">
        <Grid item xs={12}>
          <Item>
            <InputWithLabel
              label="Username"
              testId="userNameyLabel"
              isRequired={true}
              error={data.userName.valid === ValidationStatus.INVALID}
            >
              <InputBase
                className="userNameInput"
                inputProps={{ "data-testid": "userNamey" }}
                autoFocus
                name="userName"
                value={data.userName.value}
                onChange={validateAndSetData}
              />
            </InputWithLabel>
            {errorMsg && (
              <div
                className={
                  data.userName.valid === ValidationStatus.INVALID
                    ? "errorMsgEnable"
                    : "errorMsg"
                }
              >
                {errorMsg ? errorMsg : "Valid username is required"}
              </div>
            )}
          </Item>
        </Grid>
      </Grid>
      <div className="forgotPasswordResetStyle">
        <ExpressButton
          parentClass="forgotPasswordReset"
          clickHandler={() => {
            validateAndSendCode(ForgotPasswordOption.SMS);
          }}
          disabled={preferedOption === ForgotPasswordOption.EMAIL}
          variant="contained"
        >
          Reset with SMS
        </ExpressButton>
      </div>
      <div className="forgotPasswordResetStyle">
        <ExpressButton
          parentClass="forgotPasswordReset"
          clickHandler={() => {
            validateAndSendCode(ForgotPasswordOption.EMAIL);
          }}
          disabled={preferedOption === ForgotPasswordOption.SMS}
          variant="outlined"
        >
          Reset with email
        </ExpressButton>
      </div>
    </ForgotCredentialContainer>
  );
};

export default ForgotPassword;
