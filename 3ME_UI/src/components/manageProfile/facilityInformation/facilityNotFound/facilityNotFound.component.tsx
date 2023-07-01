import { ExpressButton } from "../../../../core/expressButton/expressButton.component";
import { SearchSection } from "../addFacilityContainer/addFacilityContainer.enum";
import { IFacilityNotFound } from "./facilityNotFound.interface";
import "./facilityNotFound.css";
import { Grid } from "@mui/material";

export const FacilityNotFound = ({
  redirectHandler,
  isForNewOrder,
  isForAdminFlow,
}: IFacilityNotFound) => {
  return (
    <div className="facility-nf-container">
      <div className="result-title" data-testid="facility-not-found">
        Facility Results
      </div>
      <div className="facility-nf">
        <div
          className={
            isForNewOrder ? "facility-nf-msg-for-new-order" : "facility-nf-msg"
          }
          data-testid="no-results"
        >
          {isForNewOrder ? "No Record Found" : "No results"}
        </div>
        {!isForNewOrder && !isForAdminFlow && (
          <div
            className="facility-manual-entry-msg"
            data-testid="no-results-msg"
          >
            Manual entry will require facility setup which may take 1 to 5
            business days to complete. You will receive an email notification
            that access request has been approved.
          </div>
        )}
        {isForAdminFlow && (
          <div
            className="facility-manual-entry-msg"
            data-testid="no-results-msg"
          >
            Change your search parameters, such as searching by only a portion
            of the name or ID (e.g. “Matt” instead of “St Matthews”)
          </div>
        )}
        <Grid container sx={{ marginBottom: "11px" }}>
          {(isForAdminFlow || isForNewOrder) && (
            <Grid item xs={12} className="btn1-container">
              <div className="new-order-button">
                <ExpressButton
                  clickHandler={() =>
                    redirectHandler(SearchSection.SEARCH_FORM)
                  }
                  variant="contained"
                  parentClass={
                    isForAdminFlow
                      ? "facility-user-profile-btns"
                      : "facility-nf-btns"
                  }
                >
                  Search Again
                </ExpressButton>
              </div>
            </Grid>
          )}
          {!isForNewOrder && !isForAdminFlow && (
            <>
              <Grid
                item
                lg={6}
                md={6}
                sm={6}
                xs={12}
                className="btn1-container"
              >
                <ExpressButton
                  clickHandler={() => redirectHandler(SearchSection.MANUAL_ADD)}
                  variant="outlined"
                  parentClass="facility-nf-btns"
                >
                  Enter Facility Manually
                </ExpressButton>
              </Grid>
              <Grid
                item
                lg={6}
                md={6}
                sm={6}
                xs={12}
                className="btn2-container"
              >
                <ExpressButton
                  clickHandler={() =>
                    redirectHandler(SearchSection.SEARCH_FORM)
                  }
                  variant="contained"
                  parentClass="facility-nf-btns"
                >
                  Search Again
                </ExpressButton>
              </Grid>
            </>
          )}
        </Grid>
      </div>
    </div>
  );
};
