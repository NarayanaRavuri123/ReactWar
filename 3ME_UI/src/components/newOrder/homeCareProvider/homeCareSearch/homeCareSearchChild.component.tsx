import { Box, Button, Grid } from "@mui/material";
import "./homeCareSearch.css";
import { ICaregiverFacility } from "../../../../core/caregiverSearchAndAdd/caregiverFacilitySearchAndAdd.model";
import { AnyARecord } from "dns";
import { SearchHomeCareProviderModal } from "./searchHomeCare.enum";
import HomeCareProviderSearchDropDown from "./homeCareProviderSearchDropDown.component";
import { InputWithLabel } from "../../../../core/inputWithLabel/inputWithLabel.component";
import quantityplusactive from "../../../../assets/quantityplusactive.svg";

interface Props {
  handleHomeCareProviderSearchType: any;
  clearSearchData: any;
  displayAddManualHomeCare:any,
  homeCareProviderTextBox:any,
  showHomeCareProviderCrossIcon: any
  setShowHomeCareProviderCrossIcon: any
  showNoResults: any
  showHomeCareProviderOption: any,
  setShowHomeCareProviderOption: any,
  homeCareProviderList: any
  validateAndSetData: any
  handleSelectOption: any
}

const SearchHomeCareProviderChild = ({
  handleHomeCareProviderSearchType,
  clearSearchData,
  displayAddManualHomeCare,
  homeCareProviderTextBox,
  showHomeCareProviderCrossIcon,
  setShowHomeCareProviderCrossIcon,
  showNoResults,
  showHomeCareProviderOption,
  setShowHomeCareProviderOption,
  homeCareProviderList,
  validateAndSetData,
  handleSelectOption
}: Props) => {

  return (
    <div>
      <Grid className="homecareprovider-informantion-item" item xs={12}>
        <div className="home-care-provider-search">
          <h5
            className="home-care-provider-search-label"
            data-testid="homeCareProviderSearchLabel"
          >
            Search My Provider List
          </h5>
          <Button
            onClick={() =>
              handleHomeCareProviderSearchType(
                SearchHomeCareProviderModal.FACILITY_DATABASE_SEARCH
              )
            }
            classes={{
              root: "facilities-database-button",
            }}
            data-testid="facilities-database-button"
          >
            Search Facilities Database instead
          </Button>
        </div>
      </Grid>
      <HomeCareProviderSearchDropDown
        clearSearchData={clearSearchData}
        displayAddManualHomeCare={displayAddManualHomeCare}
        homeCareProviderTextBox={homeCareProviderTextBox}
        showHomeCareProviderCrossIcon={showHomeCareProviderCrossIcon}
        setShowHomeCareProviderCrossIcon={setShowHomeCareProviderCrossIcon}
        showNoResults={showNoResults}
        showHomeCareProviderOption={showHomeCareProviderOption}
        setShowHomeCareProviderOption={setShowHomeCareProviderOption}
        homeCareProviderList={homeCareProviderList}
        validateAndSetData={validateAndSetData}
        handleSelectOption={handleSelectOption}
      />
      <div className="addnewhomecareprovider">
        <Box
          className="add-new-homecare-provider-box-container"
          sx={{ flexGrow: 1 }}
        >
          <Grid
            className="add-new-homecareprovider-grid-container"
            container
            spacing={2}
          >
            <Grid className="add-new-homecareprovider-item" item xs={12}>
              <InputWithLabel>
                <Button
                  classes={{ root: "add-new-homecareprovider-button" }}
                  data-testid="add-new-homecareprovider-button"
                  onClick={displayAddManualHomeCare}
                >
                  <img src={quantityplusactive} alt={quantityplusactive}></img>
                  <p className="txtAlign">Add New Home Care Provider</p>
                </Button>
              </InputWithLabel>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default SearchHomeCareProviderChild;
