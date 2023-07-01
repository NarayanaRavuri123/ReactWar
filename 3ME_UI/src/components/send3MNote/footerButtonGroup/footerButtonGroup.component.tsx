import "./footerButtonGroup.css";
import { Box, Toolbar } from "@mui/material";
import { IFooterButtonProps } from "./footerButtonGroup.interface";
import { ExpressButton } from "../../../core/expressButton/expressButton.component";
import { PersistentFooter } from "../../../core/persistentFooter/persistentFooter.Component";

export const FooterButtonGroup = ({
  firstButtonTitle,
  firstButtonAction,
  firstButtonDisabled = false,
  secondButtonTitle,
  secondButtonAction,
  secondButtonDisabled = false,
}: IFooterButtonProps) => {
  return (
    <PersistentFooter>
      <Toolbar className="send-note-tool-bar">
        <Box className="send-note-main-container">
          <Box className="send-note-left-container" flexWrap="wrap">
            {firstButtonTitle !== "" && (
              <Box className="boxOrderStyle" p={1}>
                <ExpressButton
                  clickHandler={firstButtonAction}
                  disabled={firstButtonDisabled}
                  parentClass="firstButton"
                  testId="firstButton-test"
                  variant="text"
                >
                  {firstButtonTitle}
                </ExpressButton>
              </Box>
            )}
          </Box>
          <Box className="send-note-right-container" flexWrap="wrap">
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
