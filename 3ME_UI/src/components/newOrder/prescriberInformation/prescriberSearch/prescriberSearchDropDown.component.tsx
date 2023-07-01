import { Button, Grid, OutlinedInput } from "@mui/material";
import { useRef } from "react";
import "./prescriberSearch.css";
import { ReactComponent as SearchIcon } from "../../../../assets/magnifier.svg";
import { ReactComponent as CrossIcon } from "../../../../assets/cross.svg";
import { SearchPrescriberModal } from "../searchPrescriber.enum";
import { useOutsideClick } from "rooks";
import Highlighter from "react-highlight-words";
import { makeCapitalEachWordInString } from "../../../../util/utilityFunctions";

interface Props {
  validateAndSetData: any;
  handleselectOption: any;
  showPrescriberOption: any;
  showNoResults: any;
  prescriberList: any;
  prescriberTextBox: any;
  setShowPrescriberOption: any;
  handlePrescriberSearchType: any;
}
const PrescriberSearchDropDown = ({
  validateAndSetData,
  handleselectOption,
  showPrescriberOption,
  showNoResults,
  prescriberList,
  prescriberTextBox,
  setShowPrescriberOption,
  handlePrescriberSearchType,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, () => setShowPrescriberOption(false));

  return (
    <div className="search-prescriber-inputs" ref={containerRef}>
      <OutlinedInput
        autoFocus={true}
        classes={{
          root: "pres-outlined-input-root",
          input: "so-outlined-input",
        }}
        startAdornment={<SearchIcon />}
        endAdornment={
          showPrescriberOption ? <CrossIcon className="crossClass" /> : null
        }
        name="prescriberSearch"
        placeholder="Search Prescriber List by Name, City or NPI number"
        onChange={validateAndSetData}
        value={prescriberTextBox.prescriberSearch.value}
        data-testid="prescriberSearchInputTest"
      />
      {showPrescriberOption && (
        <Grid
          item
          className="prescriber-search-results-container"
          ref={ref}
          component="div"
        >
          {showNoResults ? (
            <div className="pres-so-search-results" data-testid="no-results">
              <div className="pres-so-search-nores">No matches found. </div>
              <div className="pres-so-search-newmail">
                Would you like to
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
              </div>
            </div>
          ) : (
            prescriberList.map((x: any) => (
              <div
                className="pres-so-search-results"
                onClick={() => handleselectOption(x)}
              >
                <Highlighter
                  highlightClassName="prescriberNameList"
                  searchWords={[prescriberTextBox.prescriberSearch.value]}
                  autoEscape={true}
                  textToHighlight={`${makeCapitalEachWordInString(
                    x.lastName
                  )}, ${makeCapitalEachWordInString(x.firstName)}`}
                  unhighlightClassName="dropDownPrescriberNameList"
                  className="prescriberNameDiv"
                />

                <Highlighter
                  highlightClassName="prescriberNPIList"
                  searchWords={[prescriberTextBox.prescriberSearch.value]}
                  autoEscape={true}
                  textToHighlight={`NPI# ${x.npi}
                  ${makeCapitalEachWordInString(x.city)} , ${x.state} `}
                  unhighlightClassName="dropDownPrescriberNPIList"
                />
              </div>
            ))
          )}
        </Grid>
      )}
    </div>
  );
};

export default PrescriberSearchDropDown;
