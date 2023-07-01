import { Button, Grid, OutlinedInput } from "@mui/material";
import { ExpressButton } from "../expressButton/expressButton.component";
import { ISearchInputProps } from "./searchInput.interface";
import { ReactComponent as SelectCloseIcon } from "../../assets/selectclose.svg";
import "./searchInput.css";
import { useCallback, useEffect, useRef } from "react";
import { InputWithLabel } from "../inputWithLabel/inputWithLabel.component";
import { useOutsideClick } from "rooks";
import React from "react";

export const SearchInput = ({
  searchInputProps,
  selectedBoxLabel,
  optionData,
  showNoResults,
  selectedData,
  handleSearchClick,
  handleSelect,
  handleDeselect,
  handleNoResultClick,
}: ISearchInputProps) => {
  const [showOptions, setShowOptions] = React.useState(false);
  const [showSelected, setShowSelected] = React.useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, () => setShowOptions(false));

  const canShowOptions = () => {
    if (searchInputProps.value && searchInputProps.value !== "") {
      if (optionData?.length > 0) {
        setShowOptions(true);
      }
    } else {
      setShowOptions(false);
    }
  };

  const canShowSelected = useCallback(() => {
    if (selectedData.length > 0) {
      setShowSelected(true);
      setShowOptions(false);
    } else {
      setShowSelected(false);
    }
  }, [selectedData]);

  useEffect(() => {
    canShowOptions();
  }, [optionData]);
  useEffect(() => {
    canShowSelected();
  }, [selectedData]);

  return (
    <Grid container className="search-input-container" ref={containerRef}>
      <Grid item className="search-input">
        <OutlinedInput
          {...searchInputProps}
          data-testid="search-input-box"
        ></OutlinedInput>
        <ExpressButton
          parentClass="search-btn"
          variant="contained"
          clickHandler={handleSearchClick}
          testId="search-button"
        >
          Search
        </ExpressButton>
      </Grid>
      {showOptions && (
        <Grid
          item
          className="search-results-container"
          ref={ref}
          component="div"
        >
          {optionData.map((x) =>
            showNoResults ? (
              <div className="so-search-results" data-testid="no-results">
                <div className="share-order-noresult">No matches found. </div>
                <div className="so-search-newmail">
                  Would you like to
                  <Button
                    onClick={handleNoResultClick}
                    classes={{
                      root: "shareOrder-noResult-addOrRemove-button",
                    }}
                    data-testid="prescriber-informantion-addOrRemove-button"
                  >
                    invite someone to join 3M Express?
                  </Button>
                </div>
              </div>
            ) : (
              <div
                className="so-search-results"
                onClick={() => handleSelect(x)}
                key={x.value.toString()}
              >
                <div className="so-search-name-val" data-testid={`${x.key}`}>
                  {x.key}
                </div>
                <div className="so-search-val" data-testid={`${x.value}`}>
                  {x.value}
                </div>
              </div>
            )
          )}
        </Grid>
      )}
      {showSelected && (
        <InputWithLabel
          isRequired={true}
          label={selectedBoxLabel}
          labelClassName="selected-opt-label"
        >
          {selectedData.map((x) => (
            <Grid item className="search-select-container">
              <div className="select-results">
                <div className="select-val-name">{x.key}</div>
                <div className="select-val">{x.value}</div>
                <div className="select-val">
                  <SelectCloseIcon onClick={() => handleDeselect(x)} />
                </div>
              </div>
            </Grid>
          ))}
        </InputWithLabel>
      )}
    </Grid>
  );
};
