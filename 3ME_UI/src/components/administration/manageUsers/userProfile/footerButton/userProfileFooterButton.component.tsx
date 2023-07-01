import "./userProfileFooterButtonGroup.css";
import { Toolbar, Box } from "@mui/material";
import { ExpressButton } from "../../../../../core/expressButton/expressButton.component";
import { PersistentFooter } from "../../../../../core/persistentFooter/persistentFooter.Component";
import { IUserProfileFooterButtonProps } from "./userProfileFooterButton.interface";

export const UserProfileFooterButtonGroup = ({
  firstButtonTitle,
  firstButtonAction,
  secondButtonTitle,
  secondButtonAction,
  secondButtonDisabled = false,
}: IUserProfileFooterButtonProps) => {
  return (
    <PersistentFooter>
      <Toolbar className="user-profile-tool-bar">
        <Box className="user-profile-main-container">
          <Box className="user-profile-left-container" flexWrap="wrap">
            {firstButtonTitle !== "" && (
              <Box className="boxOrderStyle" p={1}>
                <ExpressButton
                  clickHandler={firstButtonAction}
                  parentClass="firstButton"
                  testId="firstButton-test"
                  variant="text"
                >
                  {firstButtonTitle}
                </ExpressButton>
              </Box>
            )}
          </Box>
          <Box className="user-profile-right-container" flexWrap="wrap">
            {secondButtonTitle !== "" && (
              <Box className="boxOrderStyle" p={1}>
                <ExpressButton
                  clickHandler={secondButtonAction}
                  disabled={secondButtonDisabled}
                  parentClass="secondButton"
                  testId="secondButton-test"
                  variant="contained"
                >
                  {secondButtonTitle}
                </ExpressButton>
              </Box>
            )}
          </Box>
        </Box>
      </Toolbar>
    </PersistentFooter>
  );
};
