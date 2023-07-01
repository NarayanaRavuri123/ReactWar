import { useContext, useState } from "react";
import { Button, Grid, Box } from "@mui/material";
import "./nationalRegistry.css";
import { getDeepClone } from "../../../../util/ObjectFunctions";
import {
  defaultNationalRegistrySearchBox,
  defaultNationalRegistrySearchByDetails,
  INationalRegistrySearch,
  INationalRegistrySearchByDetails,
} from "./nationRegistrySearch.model";
import { NewOrderValidator } from "../../newOrder.validator";
import { ExpressButton } from "../../../../core/expressButton/expressButton.component";
import { InputWithLabel } from "../../../../core/inputWithLabel/inputWithLabel.component";
import { ValidationStatus } from "../../../../core/interfaces/input.interface";
import InputBase from "@mui/material/InputBase";
import { SearchPrescriberModal } from "../searchPrescriber.enum";
import NationalRegistrySearchByDetails from "./nationalRegistrySearchByDetails/nationalRegistrySearchByDetails.component";
import { getNPIPrescriber } from "../../../../util/npiService";
import { LoadingSpinner } from "../../../../core/loader/LoadingSpinner";
import {
  NewOrderContext,
  NewOrderContextType,
} from "../../../../context/NewOrderContext";

interface Props {
  handlePrescriberSearchType: Function;
  states: never[];
  statesText: never[];
  handleNpiPrescriberSearchResult: Function;
}

export const NationalRegistrySearch = ({
  handlePrescriberSearchType,
  states,
  statesText,
  handleNpiPrescriberSearchResult,
}: Props) => {
  const NewOrderObj = useContext<NewOrderContextType | null>(NewOrderContext);
  const [nationalRegistrySearchInputs, setNationalRegistrySearchInputs] =
    useState<INationalRegistrySearch>(
      getDeepClone(defaultNationalRegistrySearchBox)
    );
  const [nationRegistrySearchByDetails, setNationRegistrySearchByDetails] =
    useState<INationalRegistrySearchByDetails>(
      getDeepClone(defaultNationalRegistrySearchByDetails)
    );
  const validateAndSetData = (e: any) => {
    NewOrderObj?.setIsHandleChangeTriggered(true);
    setNationRegistrySearchByDetails(
      getDeepClone(defaultNationalRegistrySearchByDetails)
    );
    const validator = new NewOrderValidator();
    const isvalid = validator.validate(e.target.value, e.target.name);
    setNationalRegistrySearchInputs((nationalRegistrySearchInputs) => ({
      ...nationalRegistrySearchInputs,
      [e.target.name]: { value: e.target.value, valid: isvalid?.status },
    }));
  };

  const checkValidationStatus = () => {
    return nationalRegistrySearchInputs.nationalRegistryNumber.valid !==
      ValidationStatus.VALID
      ? true
      : false;
  };

  const [showSpinner, setShowSpinner] = useState(false);

  const spinner = () => {
    return (
      <div className="nr-spinner">
        <LoadingSpinner />
      </div>
    );
  };

  const npiPrescriberSearch = async (reqParams: any) => {
    setShowSpinner(true);
    const data = await getNPIPrescriber(reqParams);
    setShowSpinner(false);
    if (data != null && data.succeeded) {
      handlePrescriberSearchType(
        SearchPrescriberModal.NATIONAL_REGISTRY_RESULT
      );
      handleNpiPrescriberSearchResult(data.items);
    } else {
      handlePrescriberSearchType(
        SearchPrescriberModal.NATIONAL_REGISTRY_NO_RESULT
      );
    }
  };

  const handleSearchNPI = () => {
    let reqParams = {
      NPI: nationalRegistrySearchInputs.nationalRegistryNumber.value,
      FirstName: nationRegistrySearchByDetails.NPIFirstName.value,
      LastName: nationRegistrySearchByDetails.NPILastName.value,
      State: nationRegistrySearchByDetails.state.value,
    };
    npiPrescriberSearch(reqParams);
  };

  return (
    <div className="nrprescriber-search">
      <div className="nrheader" data-testid="nrprescriberSearchTitle">
        Prescriber Search
      </div>
      <div className="nrprescriberSearchLabel">
        <Grid className="nrprescriber-informantion-item" item xs={6}>
          <b
            className="nrsearchPrescriberLabelSec"
            data-testid="nrprescriberSearchTitleSec"
          >
            Search in National Registry
          </b>
        </Grid>
        <Grid className="nrprescriber-informantion-item" item xs={6}>
          <Box display="flex" justifyContent="flex-end">
            <Button
              onClick={() =>
                handlePrescriberSearchType(
                  SearchPrescriberModal.SEARCH_PRESCRIBER
                )
              }
              classes={{
                root: "nrprescriber-informantion-addOrRemove-button",
              }}
              data-testid="nrprescriber-informantion-addOrRemove-button"
            >
              Search My Prescriber List instead
            </Button>
          </Box>
        </Grid>
      </div>
      {showSpinner ? (
        spinner()
      ) : (
        <>
          <div className="nrprescriberSearchInputs">
            <div className="searchField">
              <InputWithLabel
                testId="newOrder-First-Name"
                label="Physician NPI Number"
                isRequired={true}
                error={
                  nationalRegistrySearchInputs.nationalRegistryNumber.valid ===
                  ValidationStatus.INVALID
                }
              >
                <InputBase
                  style={{ width: "100%" }}
                  autoFocus
                  name="nationalRegistryNumber"
                  onChange={validateAndSetData}
                  value={
                    nationalRegistrySearchInputs.nationalRegistryNumber.value
                  }
                />
              </InputWithLabel>
            </div>
            <div className="searchButton">
              <ExpressButton
                testId="searchnpibutton"
                clickHandler={handleSearchNPI}
                parentClass="searchNR"
                variant="contained"
                disabled={checkValidationStatus()}
              >
                Search
              </ExpressButton>
            </div>
          </div>
          <div className="orDiv">OR</div>
          <NationalRegistrySearchByDetails
            nationRegistrySearchByDetails={nationRegistrySearchByDetails}
            setNationRegistrySearchByDetails={setNationRegistrySearchByDetails}
            states={states}
            statesText={statesText}
            setNationalRegistrySearchInputs={setNationalRegistrySearchInputs}
            handleSearchNPI={handleSearchNPI}
          />
        </>
      )}
    </div>
  );
};
