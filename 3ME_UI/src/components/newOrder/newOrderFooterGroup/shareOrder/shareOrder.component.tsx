import { Grid, TextField } from "@mui/material";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { ReactComponent as SearchIcon } from "../../../../assets/magnifier.svg";
import { AuthContext, AuthContextType } from "../../../../context/AuthContext";
import {
  MyPatientContextType,
  MyPatientContext,
} from "../../../../context/MyPatientContext";
import {
  NewOrderContext,
  NewOrderContextType,
} from "../../../../context/NewOrderContext";
import { ExpressButton } from "../../../../core/expressButton/expressButton.component";
import { InputWithLabel } from "../../../../core/inputWithLabel/inputWithLabel.component";
import { LoadingSpinner } from "../../../../core/loader/LoadingSpinner";
import { SearchInput } from "../../../../core/searchInput/searchInput.component";
import { IOptionsProps } from "../../../../core/searchInput/searchInput.interface";
import { isEmail } from "../../../../util/utilityFunctions";
import {
  callgetProvidersForFacility,
  callShareVacOrder,
} from "../../../../util/vacOrderService";
import "./shareOrder.css";
import { SharedOrderModal } from "./shareOrder.enum";

type IShareOrderProps = {
  setShareOrderOpen: Dispatch<SetStateAction<boolean>>;
  handleShareOrderType: Function;
  searchInputVal: string;
  setSearchInputVal: Dispatch<SetStateAction<string>>;
  showNoResults: boolean;
  setShowNoResults: Dispatch<SetStateAction<boolean>>;
  shareOrderOptions: Array<IOptionsProps>;
  setShareOrderOptions: Dispatch<SetStateAction<Array<IOptionsProps>>>;
  selectedUsers: Array<IOptionsProps>;
  setSelectedUsers: Dispatch<SetStateAction<Array<IOptionsProps>>>;
  noteForUsers: string;
  setNoteForUsers: Dispatch<SetStateAction<string>>;
  noteError: boolean;
  setNoteError: Dispatch<SetStateAction<boolean>>;
  handleSaveAndShare?: Function;
  vacOrderID?: string;
  isMyPatientFlow?: boolean;
};

export const ShareOrder = ({
  setShareOrderOpen,
  handleShareOrderType,
  searchInputVal,
  setSearchInputVal,
  showNoResults,
  setShowNoResults,
  shareOrderOptions,
  setShareOrderOptions,
  selectedUsers,
  setSelectedUsers,
  noteForUsers,
  setNoteForUsers,
  noteError,
  setNoteError,
  handleSaveAndShare,
  vacOrderID,
  isMyPatientFlow = false,
}: IShareOrderProps) => {
  const AuthObj = useContext<AuthContextType | null>(AuthContext);
  const NewOrderObj = useContext<NewOrderContextType | null>(NewOrderContext);
  const MyPatientObj = useContext<MyPatientContextType | null>(
    MyPatientContext
  );
  const [sharedOrderProviderList, setsharedOrderProviderList] =
    useState<IOptionsProps[]>();
  const [loaderSpinner, setloaderSpinner] = useState(false);
  const [isDisabledShareBtn, setIsDisabledShareBtn] = useState(true);
  const handleSearchClick = () => {
    if (searchInputVal.trim() === "") {
      setShareOrderOptions([]);
      return;
    }
    // filter data based on user input
    // use debouncing to handle api calls during service integration
    let foundUsers = sharedOrderProviderList!.filter(
      (user) =>
        user.key.toUpperCase().includes(searchInputVal.trim().toUpperCase()) ||
        user.value.toUpperCase().includes(searchInputVal.trim().toUpperCase())
    );
    if (foundUsers.length === 0 && isEmail(searchInputVal.trim())) {
      if (selectedUsers.some((x) => x.key === searchInputVal.trim())) {
        setShowNoResults(false);
      } else {
        foundUsers = [
          {
            key: searchInputVal.trim(),
            value: "",
          },
        ];
        setShowNoResults(true);
      }
    } else {
      setShowNoResults(false);
    }
    // filter already selected data
    if (selectedUsers.length > 0) {
      foundUsers = foundUsers.filter((item) => !selectedUsers.includes(item));
    }
    setShareOrderOptions([...foundUsers]);
  };

  const handleSearchInputChange = (e: any) => {
    setSearchInputVal(e.target.value);
  };
  const handleSelect = (selectedData: IOptionsProps) => {
    const updatedList = [selectedData];
    setSelectedUsers(updatedList);
  };
  const handleDeselect = (data: IOptionsProps) => {
    const updatedList = selectedUsers.filter((x) => x.key !== data.key);
    setSelectedUsers(updatedList);
  };
  const handleUserNoteChange = (e: any) => {
    setNoteForUsers(e.target.value);
    setNoteError(e.target.value.trim().length === 0);
  };
  const handleShareOrder = () => {
    if (noteForUsers.trim() !== "") {
      NewOrderObj?.setSharedOrderTo(selectedUsers[0].value);
      NewOrderObj?.setSharedOrderNote(noteForUsers);
      if (!isMyPatientFlow)
        handleSaveAndShare!(selectedUsers[0].value, noteForUsers);
      else {
        let shareOrderRequestObj = {
          OrderId: vacOrderID,
          SharedTo: selectedUsers[0].value,
          SharedOrderNotes: noteForUsers,
          facilityName: AuthObj?.registeredFaciltyAddress?.accountName,
        };
        setloaderSpinner(true);
        apicallShareVacOrder(shareOrderRequestObj);
      }
    }
  };
  const checkIsDisabledShareButton = () => {
    if (noteForUsers.trim().length !== 0 && selectedUsers.length !== 0)
      setIsDisabledShareBtn(false);
    else setIsDisabledShareBtn(true);
  };
  const apicallShareVacOrder = async (shareOrderRequestObj: any) => {
    const responseObj = await callShareVacOrder(shareOrderRequestObj);
    if (responseObj.succeeded) {
      setloaderSpinner(false);
      handleShareOrderType(SharedOrderModal.SHARE_ORDER_INVITE_SUCESS);
      setTimeout(() => {
        MyPatientObj?.setReloadMyPatient(true);
      }, 5000);
    } else {
      //setShareOrderOpen(false);
      setloaderSpinner(false);
    }
  };
  const closePopupHandler = () => {
    setSearchInputVal("");
    setShareOrderOptions([]);
    setSelectedUsers([]);
    setNoteForUsers("");
    setNoteError(false);
    setShareOrderOpen(false);
    setShowNoResults(false);
  };

  const handleNoResultClick = () => {
    handleShareOrderType(SharedOrderModal.SHARE_ORDER_INIVITE_3M);
  };
  useEffect(() => {
    setSearchInputVal("");
    setShareOrderOptions([]);
    setSelectedUsers([]);
    setNoteForUsers("");
    setNoteError(false);
    getProvidersForFacility();
  }, []);
  useEffect(() => {
    checkIsDisabledShareButton();
  }, [noteForUsers, selectedUsers]);
  const getProvidersForFacility = async () => {
    if (AuthObj && AuthObj.registeredFaciltyAddress) {
      const responseObj = await callgetProvidersForFacility(
        AuthObj?.registeredFaciltyAddress?.accountNumber,
        AuthObj?.registeredFaciltyAddress?.facilityAddressID
      );

      if (responseObj !== undefined) {
        let orderProviderList: Array<IOptionsProps> = [];
        responseObj.map((x: any) => {
          let orderproviderObj: IOptionsProps = {
            key: x.firstName.toString() + " " + x.lastName.toString(),
            value: x.emailAddress,
          };
          orderProviderList.push(orderproviderObj);
        });

        setsharedOrderProviderList(orderProviderList);
      }
    }
  };
  const spinner = () => {
    return (
      <div className="saveshare-maindiv">
        <div className="saveshare-header">Sharing Order</div>
        <div className="saveshare-spinner">
          <LoadingSpinner />
        </div>
      </div>
    );
  };
  const shareOrderCompo = () => {
    return (
      <>
        <div className="shareOrderPopup">
          <Grid container className="so-popup-container">
            <div className="so-item-1" data-testid="shareOrderPopupTest">
              Share Order
            </div>
            <div className="so-item-2" data-testid="notify-3m">
              Send an in process order to another 3ME User. They will be
              notified via email.
            </div>
            <div className="so-item-3">Who are you sharing with?</div>
            <SearchInput
              searchInputProps={{
                classes: {
                  root: "so-outlined-input-root",
                  input: "so-outlined-input",
                },
                startAdornment: <SearchIcon />,
                placeholder: "Search for user by name or email",
                value: searchInputVal,
                onChange: (e) => handleSearchInputChange(e),
                autoFocus: true,
              }}
              selectedBoxLabel="Share order with"
              optionData={shareOrderOptions}
              selectedData={selectedUsers}
              handleSearchClick={handleSearchClick}
              handleSelect={handleSelect}
              handleDeselect={handleDeselect}
              showNoResults={showNoResults}
              handleNoResultClick={handleNoResultClick}
            />
            <Grid
              item
              sx={{ marginTop: selectedUsers.length > 0 ? "27px" : "150px" }}
            >
              <InputWithLabel
                isRequired={true}
                label="Note about order"
                error={noteError}
                labelClassName="so-note"
              >
                <TextField
                  InputProps={{ classes: { root: "so-textarea-root" } }}
                  fullWidth
                  multiline
                  name="so-order-note"
                  rows={4}
                  inputProps={{
                    maxlength: 500,
                    "data-testid": "note-textarea",
                  }}
                  error={noteError}
                  value={noteForUsers}
                  onChange={handleUserNoteChange}
                />
              </InputWithLabel>
              <div className="so-note-limit" data-testid="remaining-chars">
                {`Limit 500 characters. ${
                  500 - noteForUsers.trim()?.length
                } characters left.`}
              </div>
            </Grid>
            <Grid container className="so-item-5">
              <Grid item xs={6}>
                <ExpressButton
                  parentClass="share-cancel-btn"
                  variant="outlined"
                  clickHandler={closePopupHandler}
                  testId="share-cancel-btn"
                >
                  Cancel
                </ExpressButton>
              </Grid>
              <Grid item xs={6}>
                <ExpressButton
                  parentClass="share-order-btn"
                  variant="contained"
                  disabled={isDisabledShareBtn}
                  clickHandler={handleShareOrder}
                  testId="share-order-btn"
                >
                  Share Order
                </ExpressButton>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </>
    );
  };
  return <>{loaderSpinner ? spinner() : shareOrderCompo()}</>;
};
