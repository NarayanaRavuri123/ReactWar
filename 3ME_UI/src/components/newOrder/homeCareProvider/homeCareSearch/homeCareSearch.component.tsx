import { Box, Button, Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { InputWithLabel } from "../../../../core/inputWithLabel/inputWithLabel.component";
import { getDeepClone } from "../../../../util/ObjectFunctions";
import { NewOrderValidator } from "../../newOrder.validator";
import {
  defaultHomeCareProviderSearchBox,
  IHomeCareProviderSearch,
} from "./homeCareProviderSearch.model";
import {
  NewOrderContext,
  NewOrderContextType,
} from "../../../../context/NewOrderContext";
import "./homeCareSearch.css";
import HomeCareProviderSearchDropDown from "./homeCareProviderSearchDropDown.component";
import { SearchHomeCareProviderModal } from "./searchHomeCare.enum";
import quantityplusactive from "../../../../assets/quantityplusactive.svg";
import { IHomeCareProviderDetail } from "../homeCareProvider.interface";
import { AuthContext, AuthContextType } from "../../../../context/AuthContext";
import {
  caregiverFacilitySearch,
  homeCareProviderSearch,
} from "../../../../util/3meService";
import { LoadingSpinner } from "../../../../core/loader/LoadingSpinner";
import { ICaregiverFacility } from "../../../../core/caregiverSearchAndAdd/caregiverFacilitySearchAndAdd.model";
import SearchHomeCareProviderChild from "./homeCareSearchChild.component";

interface Props {
  handleHomeCareProviderSearchType: any;
  setSelectedHomeCareProvider: any;
}

const SearchHomeCareProvider = ({
  handleHomeCareProviderSearchType,
  setSelectedHomeCareProvider,
}: Props) => {
  const validator = new NewOrderValidator();
  const NewOrderObj = useContext<NewOrderContextType | null>(NewOrderContext);

  const [showHomeCareProviderOption, setShowHomeCareProviderOption] =
    useState(false);
  const [showNoResults, setShowNoResults] = useState(false);
  const [homeCareProviderList, setHomeCareProviderList] = useState<any>([]);
  const [showSpinner, setShowSpinner] = useState(false);
  const [serverHCPList, setServerHCPList] = useState<IHomeCareProviderDetail[]>(
    []
  );
  useEffect(() => {
    searchHomeCareProvider();
  }, []);

  const AuthObj = useContext<AuthContextType | null>(AuthContext);

  const searchHomeCareProvider = async () => {
    let reqParams = {
      siteUseId: AuthObj?.registeredFaciltyAddress?.siteUseId!,
    };
    setShowSpinner(true);
    const hcp = await homeCareProviderSearch(reqParams);
    if (hcp?.data?.length > 0) {
      setServerHCPList(hcp.data);
    }
    setShowSpinner(false);
  };

  const spinner = () => {
    return (
      <div className="nr-spinner">
        <LoadingSpinner />
      </div>
    );
  };
  const [homeCareProviderTextBox, setHomeCareProviderTextBox] =
    useState<IHomeCareProviderSearch>(
      getDeepClone(defaultHomeCareProviderSearchBox)
    );

  const [showHomeCareProviderCrossIcon, setShowHomeCareProviderCrossIcon] =
    useState(false);

  const validateAndSetData = (e: any) => {
    const { value, name } = e.target;
    const isvalid = validator.validate(value, name);
    setHomeCareProviderTextBox((homeCareProviderTextBox) => ({
      ...homeCareProviderTextBox,
      [name]: { value: value, valid: isvalid?.status },
    }));
    if (value.length > 2) {
      const filteredList = serverHCPList.filter(
        (x: IHomeCareProviderDetail) => {
          return x.name.toLowerCase().includes(value.toLowerCase());
        }
      );
      setShowHomeCareProviderCrossIcon(true);
      setShowHomeCareProviderOption(true);
      if (filteredList.length === 0) {
        setShowNoResults(true);
      } else {
        setShowNoResults(false);
        setHomeCareProviderList(filteredList);
      }
    } else {
      setShowHomeCareProviderCrossIcon(false);
      setShowHomeCareProviderOption(false);
    }
  };

  const handleSelectOption = async (x: any) => {
    let reqParams = {
      customerAccountNumber: "",
      customerName: "",
      state: "",
      OrigSystemReference: x.caregiverID,
    };
    setShowSpinner(true);
    const data = await caregiverFacilitySearch(reqParams);
    var hcpData = data?.items?.filter(
      (item: ICaregiverFacility) => item.origSystemReference !== null
    );
    if (hcpData?.length > 0) {
      setSelectedHomeCareProvider({
        ...hcpData[0],
        name: hcpData[0].customerName,
        zipCode: hcpData[0].postalCode,
        facilityType: hcpData[0].marketingSegmentDescription,
        siteUseId: hcpData[0].siteUseId,
        accountNumber: hcpData[0].customerAccountNumber,
        caregiverID: hcpData[0].origSystemReference,
        marketingSegmentCode: hcpData[0].marketingSegmentCode,
      });
    } else {
      setSelectedHomeCareProvider(x);
    }
    handleHomeCareProviderSearchType(
      SearchHomeCareProviderModal.HOMECAREPROVIDER_FOUND
    );
  };

  const clearSearchData = (e: any) => {
    setHomeCareProviderTextBox(() => defaultHomeCareProviderSearchBox);
  };

  const displayAddManualHomeCare = () => {
    NewOrderObj?.setHomecareproviderSearchAddPopUpSection(
      SearchHomeCareProviderModal.ADD_MANUAL_HOMECAREPROVIDER
    );
  };

  return (
    <div className="homecareprovider-search">
      <div className="header" data-testid="homecareproviderSearchTitle">
        Home Care Provider Search
      </div>
      {showSpinner ? (
        spinner()
      ) : (
        <>
          <SearchHomeCareProviderChild
            handleHomeCareProviderSearchType={handleHomeCareProviderSearchType}
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
        </>
      )}
    </div>
  );
};

export default SearchHomeCareProvider;
