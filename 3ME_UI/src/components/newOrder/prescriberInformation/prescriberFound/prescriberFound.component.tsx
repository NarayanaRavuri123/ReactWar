import { Grid } from "@mui/material";
import { useContext } from "react";
import {
  NewOrderContext,
  NewOrderContextType,
} from "../../../../context/NewOrderContext";
import { ExpressButton } from "../../../../core/expressButton/expressButton.component";
import { makeCapitalEachWordInString } from "../../../../util/utilityFunctions";

import { SearchPrescriberModal } from "../searchPrescriber.enum";
import "./prescriberFound.css";

export interface IPrescriberFound {
  handlePrescriberSearchType: any;
}

export const PrescriberFound = ({
  handlePrescriberSearchType,
}: IPrescriberFound) => {
  const NewOrderObj = useContext<NewOrderContextType | null>(NewOrderContext);
  const handleSelect = (data: any) => {
    NewOrderObj?.setPrescriberAddedData(data);
    NewOrderObj?.setSearchPrescriberPopup(false);
  };
  const handleBackClick = () => {
    handlePrescriberSearchType(SearchPrescriberModal.SEARCH_PRESCRIBER);
  };

  const formatNumber = (inputNumber: any) => {
    let removeChar = inputNumber?.replace(/[^a-zA-Z0-9]/g, "");
    return removeChar?.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
  };
  const renderPayers = () => {
    return (
      <Grid container className={"prescriber-details-odd"}>
        <Grid item xs={1.5}>
          <div
            className="prescriber-select"
            onClick={() => handleSelect(NewOrderObj?.prescriberList)}
          >
            Select
          </div>
        </Grid>
        <Grid item xs={5}>
          <div>
            <div
              className="prescriber-name prescriber-found-name-change"
              data-testid="prescriber-name"
            >
              {makeCapitalEachWordInString(
                NewOrderObj?.prescriberList?.firstName!
              )}{" "}
              {makeCapitalEachWordInString(
                NewOrderObj?.prescriberList?.lastName!
              )}
            </div>
            <div className="prescriber-name" data-testid="prescriber-npi">
              <span className="prescriberfoundSubHeader">NPI # </span>
              {NewOrderObj?.prescriberList?.npi}
            </div>
            <div className="prescriber-name" data-testid="prescriber-phone">
              <span className="prescriberfoundSubHeader">Phone</span>
              {formatNumber(NewOrderObj?.prescriberList?.telephoneNumber)}
            </div>
            <div className="prescriber-name" data-testid="prescriber-fax">
              <span className="prescriberfoundSubHeader"> Fax</span>
              <span className="prescriberFax">
                {" "}
                {NewOrderObj?.prescriberList?.faxNumber === undefined
                  ? "-"
                  : formatNumber(NewOrderObj?.prescriberList?.faxNumber)}
              </span>
            </div>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className="prescriber-found-address-div">
            <div
              className="prescriber-address"
              data-testid="prescriber-address"
            ></div>
            <div
              className="prescriber-address"
              data-testid="prescriber-address"
            >
              {makeCapitalEachWordInString(
                NewOrderObj?.prescriberList?.address1!
              )}
            </div>
            <div
              className="prescriber-address"
              data-testid="prescriber-address"
            >
              {makeCapitalEachWordInString(
                NewOrderObj?.prescriberList?.address2!
              )}
            </div>
            <div
              className="prescriber-address"
              data-testid="prescriber-address"
            >
              {makeCapitalEachWordInString(NewOrderObj?.prescriberList?.city!)},{" "}
              {NewOrderObj?.prescriberList?.state}{" "}
              {NewOrderObj?.prescriberList?.zipCode}
            </div>
          </div>
        </Grid>
      </Grid>
    );
  };
  return (
    <Grid container className="prescriber-found-container">
      <div
        className="prescriber-found-header"
        data-testid="prescriber-found-header"
      >
        My Prescriber Search Result
      </div>
      <Grid item className="prescriber-result-list-container">
        {renderPayers()}
        <ExpressButton
          variant="outlined"
          clickHandler={handleBackClick}
          parentClass="back-to-search"
          testId="back-to-search-prescriber"
        >
          Back to Search
        </ExpressButton>
      </Grid>
    </Grid>
  );
};
