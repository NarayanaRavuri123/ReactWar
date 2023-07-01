import { ReactNode, useContext, useEffect } from "react";
import "./prescriberInformation.css";
import { Button, Grid } from "@mui/material";
import { NewOrderValidator } from "../newOrder.validator";
import { InputWithLabel } from "../../../core/inputWithLabel/inputWithLabel.component";
import { Popup } from "../../../core/popup/popup.component";
import { SearchPrescriberModal } from "./searchPrescriber.enum";
import {
  NewOrderContext,
  NewOrderContextType,
} from "../../../context/NewOrderContext";
import SearchPrescriber from "./prescriberSearch/prescriberSearch.component";
import { ReactComponent as SearchIcon } from "../../../assets/searchPayer.svg";
import { NationalRegistrySearch } from "./nationalRegistrySearch/nationalRegistrySearch.component";
import NationalRegistryResult from "./nationalRegistrySearch/nationalRegistryResult/nationalRegistryResult.component";
import NationalRegistryNoResult from "./nationalRegistrySearch/nationalRegistryNoResult/nationalRegistryNoResult.component";
import { PrescriberFound } from "./prescriberFound/prescriberFound.component";
import { IPrescriberInformation } from "./prescriberInformation.interface";
import { PrescriberInformationReviewOrder } from "./reviewOrder/prescriberInformationReviewOrder.component";
import { makeCapitalEachWordInString } from "../../../util/utilityFunctions";
import { AuthContext, AuthContextType } from "../../../context/AuthContext";

export const PrescriberInformation = ({
  states,
  statesText,
  isReviewOrder = false,
  editButtonClicked,
  isOrderSummary = false,
}: IPrescriberInformation) => {
  const newOrderObj = useContext<NewOrderContextType | null>(NewOrderContext);
  const AuthObj = useContext<AuthContextType | null>(AuthContext);

  const searchPayerButtonAction = () => {
    newOrderObj?.setprescribeSearchAddPopUpSection(
      SearchPrescriberModal.SEARCH_PRESCRIBER
    );
    newOrderObj?.setSearchPrescriberPopup(true);
  };

  const formatNumber = (inputNumber: any) => {
    let removeChar = inputNumber?.replace(/[^a-zA-Z0-9]/g, "");
    return removeChar?.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
  };

  const searchAddPayerPopupSection = () => {
    let page: ReactNode;
    switch (newOrderObj?.prescriberSearchAddPopUpSection) {
      case SearchPrescriberModal.SEARCH_PRESCRIBER:
        page = (
          <SearchPrescriber
            handlePrescriberSearchType={handlePrescriberSearchType}
          />
        );
        break;
      case SearchPrescriberModal.NATIONAL_REGISTRY_SEARCH:
        page = (
          <NationalRegistrySearch
            handlePrescriberSearchType={handlePrescriberSearchType}
            states={states}
            statesText={statesText}
            handleNpiPrescriberSearchResult={handleNpiPrescriberSearchResult}
          />
        );
        break;
      case SearchPrescriberModal.NATIONAL_REGISTRY_RESULT:
        page = (
          <NationalRegistryResult
            handlePrescriberSearchType={handlePrescriberSearchType}
            nationalRegistryList={newOrderObj?.npiPrescriberList}
          />
        );
        break;
      case SearchPrescriberModal.NATIONAL_REGISTRY_NO_RESULT:
        page = (
          <NationalRegistryNoResult
            handlePrescriberSearchType={handlePrescriberSearchType}
          />
        );
        break;
      case SearchPrescriberModal.PRESCRIPBER_FOUND:
        page = (
          <PrescriberFound
            handlePrescriberSearchType={handlePrescriberSearchType}
          />
        );
        break;
    }
    return page;
  };

  const handlePrescriberSearchType = (section: SearchPrescriberModal) => {
    newOrderObj?.setprescribeSearchAddPopUpSection(section);
  };

  const handleNpiPrescriberSearchResult = (data: any) => {
    newOrderObj?.setNpiPrescriberList(data);
  };

  useEffect(() => {
    if (
      !newOrderObj?.isComingFromPrev &&
      newOrderObj?.vacOrderID === "" &&
      !isReviewOrder
    ) {
      newOrderObj?.setPrescriberAddedData(undefined);
    }
  }, [AuthObj?.registeredFaciltyAddress]);

  return (
    <div className="prescriber-informantion-component">
      {!isReviewOrder && (
        <div className="prescriber-informantion">
          <h2
            className="prescriber-informantion-title"
            data-testid="prescriber-informantion-title"
          >
            Prescriber Information
          </h2>
          <div className="prescriberDiv">
            <p className="presDesc" data-testid="prescriber-informantion-desc">
              Physicians selected will be added to your Facility List if all
              physician fields are provided below.
            </p>
          </div>
          {newOrderObj?.prescriberAddedData !== undefined ? (
            <>
              <Grid container className={"prescriber-selected-details"}>
                <Grid item xs={9}>
                  <div
                    className="prescriber-selected-name"
                    data-testid="prescriber-name"
                  >
                    {makeCapitalEachWordInString(
                      newOrderObj?.prescriberAddedData?.firstName
                    )}{" "}
                    {makeCapitalEachWordInString(
                      newOrderObj?.prescriberAddedData?.lastName
                    )}
                  </div>
                </Grid>
                <Grid item xs={3} className="prescriberSelectedChangePresBtn">
                  <Button
                    onClick={() => {
                      handlePrescriberSearchType(
                        SearchPrescriberModal.SEARCH_PRESCRIBER
                      );
                      newOrderObj?.setSearchPrescriberPopup(true);
                    }}
                    classes={{
                      root: "prescriber-selected-addOrRemove-button",
                    }}
                    data-testid="prescriber-selected-addOrRemove-button-test"
                  >
                    Change prescriber
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <div
                    className="prescriber-selected-div"
                    data-testid="prescriber-npi"
                  >
                    <span className="prescriberSelectedSubHeader">NPI</span>
                    <div className="prescriber-selected-address-body">
                      {newOrderObj?.prescriberAddedData?.npi}
                    </div>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div
                    className="prescriber-selected-div"
                    data-testid="prescriber-phone"
                  >
                    <span className="prescriberSelectedSubHeader">Phone</span>
                    <div className="prescriber-selected-address-body">
                      {formatNumber(
                        newOrderObj?.prescriberAddedData?.telephoneNumber
                      )}
                    </div>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div
                    className="prescriber-selected-div prescriber-selected-fax"
                    data-testid="prescriber-fax"
                  >
                    <span className="prescriberSelectedSubHeader"> Fax</span>
                    <div className="prescriber-selected-address-body">
                      {" "}
                      {newOrderObj?.prescriberAddedData?.faxNumber === "" ||
                      newOrderObj?.prescriberAddedData?.faxNumber === null
                        ? "--"
                        : formatNumber(
                            newOrderObj?.prescriberAddedData?.faxNumber
                          )}
                    </div>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div>
                    <div
                      className="prescriber-selected-div  prescriber-selected-address"
                      data-testid="prescriber-address"
                    >
                      <span className="prescriberSelectedSubHeader">
                        {" "}
                        Address
                      </span>
                    </div>
                    <div
                      className="prescriber-selected-address-body"
                      data-testid="prescriber-address"
                    >
                      {makeCapitalEachWordInString(
                        newOrderObj?.prescriberAddedData?.address1
                      )}
                    </div>
                    <div
                      className="prescriber-selected-address-body"
                      data-testid="prescriber-address"
                    >
                      {makeCapitalEachWordInString(
                        newOrderObj?.prescriberAddedData?.address2
                      )}
                    </div>
                    <div
                      className="prescriber-selected-address-body"
                      data-testid="prescriber-address"
                    >
                      {makeCapitalEachWordInString(
                        newOrderObj?.prescriberAddedData?.city
                      )}
                      , {newOrderObj?.prescriberAddedData?.state}{" "}
                      {newOrderObj?.prescriberAddedData?.zipCode}
                    </div>
                  </div>
                </Grid>
              </Grid>
            </>
          ) : (
            <Grid
              className="prescriber-informantion-grid-container"
              container
              spacing={2}
            >
              <Grid className="prescriber-informantion-item" item xs={12}>
                <InputWithLabel label="" isRequired={false}>
                  <Button
                    classes={{ root: "prescriber-informantion-button" }}
                    data-testid="prescriber-informantion-button"
                    onClick={searchPayerButtonAction}
                    startIcon={<SearchIcon />}
                    variant="outlined"
                  >
                    Search for Prescriber
                  </Button>
                </InputWithLabel>
              </Grid>
            </Grid>
          )}
          <Popup
            openFlag={newOrderObj?.searchPrescriberPopup}
            closeHandler={() => {
              newOrderObj?.setSearchPrescriberPopup(false);
            }}
            dialogParentClass={newOrderObj?.prescriberSearchAddPopUpSection}
          >
            {searchAddPayerPopupSection()}
          </Popup>
        </div>
      )}
      {isReviewOrder && (
        <PrescriberInformationReviewOrder
          data={newOrderObj?.prescriberAddedData}
          editButtonClicked={editButtonClicked}
          isOrderSummary={isOrderSummary}
        />
      )}
    </div>
  );
};
