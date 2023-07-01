import React from "react";
import "./homeCareSearch.css";
import { useRef } from "react";
import { useOutsideClick } from "rooks";
import Highlighter from "react-highlight-words";
import { Button, Grid, OutlinedInput } from "@mui/material";
import { IHomeCareProviderDetail } from "../homeCareProvider.interface";
import { IHomeCareProviderSearch } from "./homeCareProviderSearch.model";
import { ReactComponent as CrossIcon } from "../../../../assets/cross.svg";
import { ReactComponent as SearchIcon } from "../../../../assets/magnifier.svg";
import { ValidationStatus } from "../../../../core/interfaces/input.interface";
import { makeCapitalEachWordInString } from "../../../../util/utilityFunctions";

interface Props {
  homeCareProviderTextBox: IHomeCareProviderSearch;
  showHomeCareProviderCrossIcon: boolean;
  setShowHomeCareProviderCrossIcon: Function;
  showNoResults: any;
  showHomeCareProviderOption: any;
  setShowHomeCareProviderOption: Function;
  homeCareProviderList: IHomeCareProviderDetail[];
  validateAndSetData: any;
  handleSelectOption: any;
  displayAddManualHomeCare: any;
  clearSearchData: React.MouseEventHandler<SVGSVGElement> | undefined;
}
const HomeCareProviderSearchDropDown = ({
  clearSearchData,
  displayAddManualHomeCare,
  homeCareProviderTextBox,
  showHomeCareProviderCrossIcon,
  showNoResults,
  showHomeCareProviderOption,
  setShowHomeCareProviderOption,
  homeCareProviderList,
  validateAndSetData,
  handleSelectOption,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, () => setShowHomeCareProviderOption(false));

  return (
    <div className="search-homecareprovider-inputs" ref={containerRef}>
      <OutlinedInput
        autoFocus={true}
        classes={{
          root: "home-outlined-input-root",
          input: "so-outlined-input",
        }}
        startAdornment={<SearchIcon />}
        endAdornment={
          showHomeCareProviderCrossIcon ? (
            <CrossIcon className="crossClass" onClick={clearSearchData} />
          ) : null
        }
        name="homeCareProviderSearch"
        placeholder="Search Home Care Provider List by Name"
        onChange={validateAndSetData}
        value={homeCareProviderTextBox.homeCareProviderSearch.value}
        data-testid="homeCareProviderSearchInputTest"
      />
      {showHomeCareProviderOption && (
        <Grid
          item
          className="search-results-container"
          ref={ref}
          component="div"
        >
          {showNoResults ? (
            <div className="no-results" data-testid="no-results">
              <div className="no-results-title">No matches found. </div>
              <div className="no-results-would-you-like-to">
                Would you like to
                <Button
                  onClick={displayAddManualHomeCare}
                  classes={{
                    root: "home-care-provider-add-new-button",
                  }}
                  data-testid="home-care-provider-add-new-button"
                >
                  add a new Home Care Provider?
                </Button>
              </div>
            </div>
          ) : (
            homeCareProviderList.map((x: any) => (
              <div
                className="search-results"
                onClick={() => handleSelectOption(x)}
              >
                <Highlighter
                  highlightClassName="home-care-provider-name-list"
                  searchWords={[
                    homeCareProviderTextBox.homeCareProviderSearch.value,
                  ]}
                  autoEscape={true}
                  textToHighlight={`${makeCapitalEachWordInString(x.name)}`}
                  unhighlightClassName="dropDown-home-care-provider-name-list"
                  className="home-care-provider-name-div"
                />
              </div>
            ))
          )}
        </Grid>
      )}
    </div>
  );
};

export default HomeCareProviderSearchDropDown;
