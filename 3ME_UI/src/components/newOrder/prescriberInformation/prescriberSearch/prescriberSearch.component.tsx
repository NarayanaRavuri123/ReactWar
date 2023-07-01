import { useContext, useEffect, useState } from "react";
import {
  NewOrderContext,
  NewOrderContextType,
} from "../../../../context/NewOrderContext";

import { getDeepClone } from "../../../../util/ObjectFunctions";
import { NewOrderValidator } from "../../newOrder.validator";

import "./prescriberSearch.css";
import {
  defaultPrescriberSearchBox,
  IPrescriberSearch,
} from "./prescriberSearch.model";
import { SearchPrescriberModal } from "../searchPrescriber.enum";
import { INationalRegistry } from "../nationalRegistrySearch/nationalRegistryResult/nationalRegistry.interface";
import PrescriberSearchDropDown from "./prescriberSearchDropDown.component";
import { LoadingSpinner } from "../../../../core/loader/LoadingSpinner";
import { prescriberSearch } from "../../../../util/3meService";
import { AuthContext, AuthContextType } from "../../../../context/AuthContext";
import { getNPIPrescriber } from "../../../../util/npiService";
import SearchPrescriberChild from "./prescriberSearchChild.component";

interface Props {
  handlePrescriberSearchType: any;
}
const SearchPrescriber = ({ handlePrescriberSearchType }: Props) => {
  const validator = new NewOrderValidator();
  const NewOrderObj = useContext<NewOrderContextType | null>(NewOrderContext);
  const [prescriberTextBox, setPrescriberTextBox] = useState<IPrescriberSearch>(
    getDeepClone(defaultPrescriberSearchBox)
  );
  const [showPrescriberOption, setshowPrescriberOption] = useState(false);
  const [showNoResults, setShowNoResults] = useState(false);
  const [prescriberList, setPrescriberList] = useState<any>([]);
  const [showSpinner, setShowSpinner] = useState(true);
  const [serverPrescriberList, setServerPrescriberList] = useState<
    INationalRegistry[]
  >([]);

  useEffect(() => {
    searchPrescriber();
  }, []);

  const AuthObj = useContext<AuthContextType | null>(AuthContext);

  const searchPrescriber = async () => {
    let reqParams = {
      searchinput: null,
      siteUseId: AuthObj?.registeredFaciltyAddress?.siteUseId!,
    };

    const prescribers = await prescriberSearch(reqParams);
    if (prescribers?.data?.length > 0) {
      setServerPrescriberList(prescribers.data);
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
  const validateAndSetData = (e: any) => {
    NewOrderObj?.setIsHandleChangeTriggered(true);
    const { value } = e.target;
    const isvalid = validator.validate(e.target.value, e.target.name);
    setPrescriberTextBox((prescriberTextBox) => ({
      ...prescriberTextBox,
      [e.target.name]: { value: e.target.value, valid: isvalid?.status },
    }));
    if (e.target.value.length > 2) {
      setshowPrescriberOption(true);

      const filteredList = serverPrescriberList.filter(
        (x: INationalRegistry) => {
          return (
            x.city.toLowerCase().includes(value.toLowerCase()) ||
            x.npi.toLowerCase().includes(value.toLowerCase()) ||
            x.firstName.toLowerCase().includes(value.toLowerCase()) ||
            x.lastName.toLowerCase().includes(value.toLowerCase()) ||
            x.eScript?.toLowerCase().includes(value.toLowerCase())
          );
        }
      );

      if (filteredList.length === 0) {
        setShowNoResults(true);
        setPrescriberList([]);
      } else {
        setShowNoResults(false);
        setPrescriberList(filteredList);
      }
    } else {
      setshowPrescriberOption(false);
    }
  };

  const handleselectOption = async (x: any) => {
    let reqParams = {
      NPI: x.npi,
    };
    setShowSpinner(true);
    const data = await getNPIPrescriber(reqParams);
    if (data != null && data.succeeded && data.items.length > 0) {
      NewOrderObj?.setPrescriberList({
        ...data.items[0],
        email: x.email,
        eScript: x.eScript,
      });
    } else {
      NewOrderObj?.setPrescriberList(x);
    }
    handlePrescriberSearchType(SearchPrescriberModal.PRESCRIPBER_FOUND);
  };

  return (
    <div className="prescriber-search">
      <div className="header" data-testid="prescriberSearchTitle">
        Prescriber Search
      </div>
      {showSpinner ? (
        spinner()
      ) : (
        <>
          <SearchPrescriberChild
            handlePrescriberSearchType={handlePrescriberSearchType}
            handleselectOption={handleselectOption}
            showPrescriberOption={showPrescriberOption}
            showNoResults={showNoResults}
            prescriberList={prescriberList}
            prescriberTextBox={prescriberTextBox}
            setshowPrescriberOption={setshowPrescriberOption}
            validateAndSetData={validateAndSetData}
          />
        </>
      )}
    </div>
  );
};

export default SearchPrescriber;
