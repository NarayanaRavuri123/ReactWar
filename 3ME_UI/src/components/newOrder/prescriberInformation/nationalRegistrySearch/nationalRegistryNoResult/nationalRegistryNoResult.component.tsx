import React from "react";
import { ExpressButton } from "../../../../../core/expressButton/expressButton.component";
import { SearchPrescriberModal } from "../../searchPrescriber.enum";
import "./nationalRegistryNoResult.css";

type Props = { handlePrescriberSearchType: any };

const NationalRegistryNoResult = ({ handlePrescriberSearchType }: Props) => {
  return (
    <div className="npi-noresult">
      <div className="header">National Registry Search Results</div>
      <div className="no-result">
        <div data-testid="noresult" className="no-result-text">
          No results
        </div>
      </div>
      <ExpressButton
        testId="noresultBackButton"
        parentClass="no-result-btn"
        variant="outlined"
        clickHandler={() => {
          handlePrescriberSearchType(
            SearchPrescriberModal.NATIONAL_REGISTRY_SEARCH
          );
        }}
      >
        Search Again
      </ExpressButton>
    </div>
  );
};

export default NationalRegistryNoResult;
