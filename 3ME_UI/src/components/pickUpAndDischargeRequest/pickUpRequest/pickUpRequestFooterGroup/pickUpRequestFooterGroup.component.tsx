import "./pickUpRequestFooterGroup.css";
import { Box, Grid, Toolbar } from "@mui/material";
import { ExpressButton } from "../../../../core/expressButton/expressButton.component";
import { PersistentFooter } from "../../../../core/persistentFooter/persistentFooter.Component";

type IPickUpRequestFooterProps = {
  firstButtonTitle: string;
  firstButtonAction: any;
  firstButtonDisabled?: boolean;

  secondButtonTitle: string;
  secondButtonAction: any;
  secondButtonDisabled?: boolean;

  thirdButtonTitle: string;
  thirdButtonAction: any;
  thirdButtonDisabled?: boolean;
};

export const PickUpRequestFooterButtonGroup = ({
  firstButtonTitle,
  firstButtonAction,
  firstButtonDisabled = false,
  secondButtonTitle,
  secondButtonAction,
  secondButtonDisabled = false,
  thirdButtonTitle,
  thirdButtonAction,
  thirdButtonDisabled = false,
}: IPickUpRequestFooterProps) => {
  return (
    <PersistentFooter>
      <Toolbar className="pickup-request-tool-bar">
        <Grid container className="pickup-request-main-container">
          <Grid
            item
            xs={12}
            md={6}
            className="pickup-request-left-container"
            flexWrap="wrap"
            sx={{ order: { md: 1, xs: 2 } }}
          >
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
          </Grid>
          <Grid
            md={6}
            sx={{ order: { md: 2, xs: 1 } }}
            item
            className="pickup-request-right-container"
            flexWrap="wrap"
            xs={12}
          >
            {secondButtonTitle !== "" && (
              <Box className="boxOrderStyle" p={1}>
                <ExpressButton
                  clickHandler={secondButtonAction}
                  disabled={secondButtonDisabled}
                  parentClass="secondButton"
                  testId="secondButton-test"
                  variant="outlined"
                >
                  {secondButtonTitle}
                </ExpressButton>
              </Box>
            )}
            {thirdButtonTitle !== "" && (
              <Box className="boxOrderStyle" p={1}>
                <ExpressButton
                  clickHandler={thirdButtonAction}
                  disabled={thirdButtonDisabled}
                  parentClass={
                    thirdButtonDisabled ? "thirdButton-disabled" : "thirdButton"
                  }
                  testId="thirdButton-test"
                  variant="contained"
                >
                  {thirdButtonTitle}
                </ExpressButton>
              </Box>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </PersistentFooter>
  );
};
