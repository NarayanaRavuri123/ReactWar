import { Box, Button, Grid } from "@mui/material";
import "./prescriberSearch.css";
import { SearchPrescriberModal } from "../searchPrescriber.enum";
import PrescriberSearchDropDown from "./prescriberSearchDropDown.component";

interface Props {
  validateAndSetData: any,
  handleselectOption: any,
  showPrescriberOption: any,
  showNoResults: any,
  prescriberList:any,
  prescriberTextBox: any,
  setshowPrescriberOption: any,
  handlePrescriberSearchType: any
}
const SearchPrescriberChild = ({ 
  handlePrescriberSearchType,
  handleselectOption,
  showPrescriberOption,
  showNoResults,
  prescriberList,
  prescriberTextBox,
  setshowPrescriberOption,
  validateAndSetData
 }: Props) => {
  return (
    <div>
      <div className="prescriberSearchLabel">
        <Grid className="prescriber-informantion-item" item xs={6}>
          <b
            className="searchPrescriberLabelSec"
            data-testid="prescriberSearchTitleSec"
          >
            Search My Prescriber List
          </b>
        </Grid>
        <Grid className="prescriber-informantion-item" item xs={6}>
          <Box display="flex" justifyContent="flex-end">
            <Button
              onClick={() =>
                handlePrescriberSearchType(
                  SearchPrescriberModal.NATIONAL_REGISTRY_SEARCH
                )
              }
              classes={{
                root: "prescriber-informantion-addOrRemove-button",
              }}
              data-testid="prescriber-informantion-addOrRemove-button"
            >
              Search in National Registry instead
            </Button>
          </Box>
        </Grid>
      </div>
      <PrescriberSearchDropDown
        validateAndSetData={validateAndSetData}
        handleselectOption={handleselectOption}
        showPrescriberOption={showPrescriberOption}
        showNoResults={showNoResults}
        prescriberList={prescriberList}
        prescriberTextBox={prescriberTextBox}
        setShowPrescriberOption={setshowPrescriberOption}
        handlePrescriberSearchType={handlePrescriberSearchType}
      />
    </div>
  );
};

export default SearchPrescriberChild;
