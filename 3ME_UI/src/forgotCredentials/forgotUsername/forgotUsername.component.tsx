import "./forgotUsername.css";
import { useState } from "react";
import {
  ForgotUsernameInterface,
  IForgotUserName,
} from "./forgotUsername.interface";
import { useHistory } from "react-router-dom";
import { Grid, InputBase } from "@mui/material";
import { getDeepClone } from "../../util/ObjectFunctions";
import { defaultUsernameData } from "./forgotUsername.model";
import { Item } from "../../components/newOrder/newOrder.style";
import { ValidationStatus } from "../../core/interfaces/input.interface";
import { containerPageType } from "../forgotCredentialContainer/pageType.enum";
import { ExpressButton } from "../../core/expressButton/expressButton.component";
import { InputWithLabel } from "../../core/inputWithLabel/inputWithLabel.component";
import { ForgotCredentialValidator } from "../forgotCredentialContainer/forgotCredential.validator";
import ForgotCredentialContainer from "../forgotCredentialContainer/forgotCredentialContainer.component";

export const ForgotUsername = ({
  data = defaultUsernameData,
  Validator = new ForgotCredentialValidator(),
}: ForgotUsernameInterface) => {
  const history = useHistory();
  const [validator] = useState<ForgotCredentialValidator>(Validator);
  const [forgotUsername, setForgotUsername] = useState<IForgotUserName>(
    getDeepClone(data)
  );

  const onBlurValidateAndSetData = async (e: any) => {
    const isValid = await validator.validate(e.target.value, e.target.name);
    setForgotUsername(
      Object.assign({}, forgotUsername, {
        [e.target.name]: { value: e.target.value, valid: isValid?.status },
      })
    );
  };
  const validateAndSetData = (e: any) => {
    const isValid = validator.validate(e.target.value, e.target.name);
    setForgotUsername(
      Object.assign({}, forgotUsername, {
        [e.target.name]: { value: e.target.value, valid: isValid?.status },
      })
    );
  };

  const submitClick = () => {
    const isValid = validator.validateAll(forgotUsername, setForgotUsername);
    if (isValid === ValidationStatus.VALID) {
      history.push("/emailSent");
    }
  };

  return (
    <ForgotCredentialContainer pageType={containerPageType.USER_NAME}>
      <div
        className="forgot-username-title"
        data-testid="forgot-username-title"
      >
        Forgot Username
      </div>
      <Grid container className="forgot-username-container">
        <Grid item xs={12}>
          <Item>
            <InputWithLabel
              label="Email"
              isRequired={true}
              error={forgotUsername?.email.valid === ValidationStatus.INVALID}
              testId="username-email-input-label"
            >
              <InputBase
                autoFocus
                className="username-email-input"
                name="email"
                value={forgotUsername?.email.value}
                onChange={validateAndSetData}
                data-testid="username-email-input"
                onBlur={onBlurValidateAndSetData}
              />
            </InputWithLabel>
            <div
              className={
                forgotUsername?.email.valid === ValidationStatus.INVALID
                  ? "errorMsgEnable"
                  : "errorMsg"
              }
            >
              Valid email is required
            </div>
          </Item>
        </Grid>
      </Grid>
      <div className="forgot-username-button">
        <ExpressButton
          parentClass="forgot-username-submit"
          clickHandler={submitClick}
          variant="contained"
          testId="forgot-username-submit"
        >
          Submit
        </ExpressButton>
      </div>
    </ForgotCredentialContainer>
  );
};
