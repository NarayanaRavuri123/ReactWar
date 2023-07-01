import { Grid } from "@mui/material";
import { ExpressButton } from "../expressButton/expressButton.component";
import { ReactComponent as AddIcon } from "../../assets/addicon.svg";
import { IFacilityNotFound } from "./caregiverFacilitySearchAndAdd.model";

export const CaregiverFacilityNotFound = ({
  handleAddNewProvider,
  handleSearchAgain,
}: IFacilityNotFound) => {
  return (
    <div className="fl-no-results-container">
      <div className="result-header" data-testid="result-heaer">
        Facilities Search Results
      </div>
      <div className="fl-facility-not-found">
        <div className="fl-facility-nf-msg" data-testid="fl-facility-nf-msg">
          No results
        </div>
        <Grid container className="fl-nf-btns-container">
          <Grid item className="search-again-btn-container">
            <ExpressButton
              clickHandler={handleSearchAgain}
              variant="outlined"
              parentClass="fl-facility-nf-btns"
            >
              Search Again
            </ExpressButton>
          </Grid>
          <Grid item className="search-again-btn-container">
            <ExpressButton
              clickHandler={handleAddNewProvider}
              variant="outlined"
              parentClass="fl-facility-nf-btns"
              startIcon={<AddIcon />}
            >
              Add New Home Care Provider
            </ExpressButton>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
