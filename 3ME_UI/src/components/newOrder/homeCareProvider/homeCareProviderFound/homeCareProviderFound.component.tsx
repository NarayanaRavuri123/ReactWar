import "./homeCareProviderFound.css";
import { Grid } from "@mui/material";
import { IHomeCareProviderDetail } from "../homeCareProvider.interface";
import { SearchHomeCareProviderModal } from "../homeCareSearch/searchHomeCare.enum";
import { ExpressButton } from "../../../../core/expressButton/expressButton.component";
import {
  formatNumber,
  makeCapitalEachWordInString,
} from "../../../../util/utilityFunctions";

export interface IHomeCareProviderFound {
  data: IHomeCareProviderDetail;
  handleSelectedHomeCareProvider: any;
  handleHomeCareProviderSearchType: any;
}

export const HomeCareProviderFound = ({
  data,
  handleSelectedHomeCareProvider,
  handleHomeCareProviderSearchType,
}: IHomeCareProviderFound) => {
  const handleSelect = () => {
    handleSelectedHomeCareProvider(data);
  };

  const handleBackClick = () => {
    handleHomeCareProviderSearchType(
      SearchHomeCareProviderModal.SEARCH_HOMECAREPROVIDER
    );
  };

  const renderPayers = () => {
    return (
      <Grid container className={"home-care-provider-details-odd"}>
        <Grid item xs={1.5}>
          <div
            className="home-care-provider-select"
            data-testid="home-care-provider-select"
            onClick={handleSelect}
          >
            Select
          </div>
        </Grid>
        <Grid item xs={5}>
          <div>
            <div
              className="home-care-provider-details-main name"
              data-testid="home-care-provider-name"
            >
              {`${makeCapitalEachWordInString(data.name)}`}
            </div>
            <div
              className="home-care-provider-details-secondary title"
              data-testid="home-care-provider-address"
            >
              {`${makeCapitalEachWordInString(data.address1) ?? ""} ${
                makeCapitalEachWordInString(data.address2) ?? ""
              }`}
            </div>
            <div
              className="home-care-provider-details-secondary title"
              data-testid="home-care-provider-city-state-zip"
            >
              {`${makeCapitalEachWordInString(data.city)}, ${
                data.state ?? ""
              } ${data.zipCode ?? ""}`}
            </div>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className="second-column">
            <div
              className="home-care-provider-details-main value"
              data-testid="home-care-provider-phone"
            >
              <span className="home-care-provider-details-secondary title">
                {`${"Phone"} `}
              </span>
              <span className="home-care-provider-details-secondary value">
                {formatNumber(data.phone)}
              </span>
            </div>
            <div
              className="home-care-provider-details-main value"
              data-testid="home-care-provider-facilityType"
            >
              <span className="home-care-provider-details-secondary title">
                {`${"Type"}    `}
              </span>
              <span className="home-care-provider-details-secondary value">
                {makeCapitalEachWordInString(data.facilityType)}
              </span>
            </div>
          </div>
        </Grid>
      </Grid>
    );
  };

  return (
    <Grid container className="home-care-provider-found-container">
      <div
        className="home-care-provider-found-header"
        data-testid="home-care-provider-found-header"
      >
        Home Care Provider Search
      </div>
      <Grid item className="home-care-provider-result-list-container">
        {renderPayers()}
        <ExpressButton
          variant="outlined"
          clickHandler={handleBackClick}
          parentClass="back-to-search"
          testId="back-to-search"
        >
          Back to Search
        </ExpressButton>
      </Grid>
    </Grid>
  );
};
