import React from "react";
import { Box, Toolbar } from "@mui/material";
import "./addInternalUserFooterButtonGroup.css";
import { useHistory } from "react-router-dom";
import { ExpressButton } from "../../../../core/expressButton/expressButton.component";
import { PersistentFooter } from "../../../../core/persistentFooter/persistentFooter.Component";

const AddInternalUserFooterButtonGroup = () => {
  const history = useHistory();
  return (
    <>
      <PersistentFooter>
        <Toolbar className="addToolBar">
          <Box className="addSalesRightContainer" flexWrap="wrap">
            <Box className="boxAddInternalStyle" p={1}>
              <ExpressButton
                clickHandler={() => {
                  history.goBack();
                }}
                parentClass="back-button"
                testId="buttonTitle"
                variant="outlined"
              >
                Return to previous page
              </ExpressButton>
            </Box>
          </Box>
        </Toolbar>
      </PersistentFooter>
    </>
  );
};

export default AddInternalUserFooterButtonGroup;
