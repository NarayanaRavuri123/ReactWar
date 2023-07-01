import {
  Box,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Button,
} from "@mui/material";
import "./homeCareProvider.css";
import {
  IHomeCareProvider,
  IHomeCareProviderDetail,
} from "./homeCareProvider.interface";
import {
  formatNumber,
  getCodeFromText,
  makeCapitalEachWordInString,
} from "../../../util/utilityFunctions";
import {
  NewOrderContext,
  NewOrderContextType,
} from "../../../context/NewOrderContext";
import { INewOrder } from "../newOrder.interface";
import { Popup } from "../../../core/popup/popup.component";
import { getDeepClone } from "../../../util/ObjectFunctions";
import React, { useContext, ReactNode, useState, useEffect } from "react";
import { caregiverFacilitySearch } from "../../../util/3meService";
import { LoadingSpinner } from "../../../core/loader/LoadingSpinner";
import { ValidationStatus } from "../../../core/interfaces/input.interface";
import AddManualHomeCare from "./addManualHomeCareProvider/addManualHomeCare";
import SearchHomeCareProvider from "./homeCareSearch/homeCareSearch.component";
import { ReactComponent as SearchIcon } from "../../../assets/searchPayer.svg";
import {
  ICaregiverFacilitySearchRequest,
  ICaregiverFacility,
} from "../../../core/caregiverSearchAndAdd/caregiverFacilitySearchAndAdd.model";
import { SearchHomeCareProviderModal } from "./homeCareSearch/searchHomeCare.enum";
import { ReactComponent as RadioButtonIcon } from "../../../assets/radioButton.svg";
import { InputWithLabel } from "../../../core/inputWithLabel/inputWithLabel.component";
import { HomeCareProviderFound } from "./homeCareProviderFound/homeCareProviderFound.component";
import { HomeCareProviderReviewOrder } from "./reviewOrder/homeCareProviderReviewOrder.component";
import { ReactComponent as SelectedRadioButtonIcon } from "../../../assets/selectedRadioButton.svg";
import { defaultFacilityData } from "../../../core/caregiverSearchAndAdd/caregiverFacilitySearchDefaultData";
import { CaregiverFacilitySearch } from "../../../core/caregiverSearchAndAdd/caregiverFacilitySearch.component";
import { CaregiverFacilityNotFound } from "../../../core/caregiverSearchAndAdd/caregiverFacilityNotFound.component";
import { CaregiverFacilityFoundList } from "../../../core/caregiverSearchAndAdd/caregiverFacilityFoundList.component";
import { AuthContext, AuthContextType } from "../../../context/AuthContext";
import { ExpressButton } from "../../../core/expressButton/expressButton.component";

export const HomeCareProvider = ({
  data,
  setData,
  states,
  statesText,
  isReviewOrder = false,
  editButtonClicked,
  isOrderSummary = false,
}: IHomeCareProvider) => {
  const newOrderObj = useContext<NewOrderContextType | null>(NewOrderContext);
  const AuthObj = useContext<AuthContextType | null>(AuthContext);
  const facilitySearchData = getDeepClone(defaultFacilityData);
  const [fData, setFData] = React.useState(facilitySearchData);
  const [facilities, setFacilities] = React.useState<ICaregiverFacility[]>([]);
  const [selectedHomeCareProvider, setSelectedHomeCareProvider] =
    useState<IHomeCareProviderDetail | null>();

  useEffect(() => {
    if (
      !newOrderObj?.isComingFromPrev &&
      newOrderObj?.vacOrderID === "" &&
      !isReviewOrder
    ) {
      newOrderObj?.setActive(null);
      newOrderObj?.setCaregiverSelected(false);
      setData((dt: INewOrder) => ({
        ...dt,
        homeCareProvider: {
          value: "",
          valid: ValidationStatus.UNTOUCHED,
          required: true,
        },
        addedCaregiverName: {
          value: "",
          valid: ValidationStatus.UNTOUCHED,
          required: true,
        },
        addedCaregiverAddress1: {
          value: "",
          valid: ValidationStatus.UNTOUCHED,
          required: true,
        },
        addedCaregiverAddress2: {
          value: "",
          valid: ValidationStatus.UNTOUCHED,
          required: true,
        },
        addedCaregiverCity: {
          value: "",
          valid: ValidationStatus.UNTOUCHED,
          required: true,
        },
        addedCaregiverState: {
          value: "",
          valid: ValidationStatus.UNTOUCHED,
          required: true,
        },
        addedCaregiverZip: {
          value: "",
          valid: ValidationStatus.UNTOUCHED,
          required: true,
        },
        addedCaregiverPhone: {
          value: "",
          valid: ValidationStatus.UNTOUCHED,
          required: true,
        },
        addedCaregiverFacilityType: {
          value: "",
          valid: ValidationStatus.UNTOUCHED,
          required: true,
        },
        addedCaregiverFacilityTypeCode: {
          value: "",
          valid: ValidationStatus.VALID,
          required: true,
        },
        addedCaregiverSiteUseID: {
          value: "",
          valid: ValidationStatus.VALID,
          required: true,
        },
        addedCaregiverAccountNumber: {
          value: "",
          valid: ValidationStatus.VALID,
          required: true,
        },
        addedCaregiverID: {
          value: "",
          valid: ValidationStatus.VALID,
          required: true,
        },
      }));
    }
  }, [AuthObj?.registeredFaciltyAddress]);

  const clearSearchData = () => {
    setFData((dt: any) => ({
      facilityName: {
        value: "",
        valid: ValidationStatus.UNTOUCHED,
        required: true,
      },
      facilityState: {
        value: "",
        valid: ValidationStatus.UNTOUCHED,
        required: true,
      },
      facilityID: {
        value: "",
        valid: ValidationStatus.UNTOUCHED,
        required: true,
      },
    }));
  };

  const handleCaregiverFacilitySearch = async () => {
    const stateCode = getCodeFromText(states, fData.facilityState.value);
    var facilitySearchRequest: ICaregiverFacilitySearchRequest = {
      customerAccountNumber: fData.facilityID.value,
      customerName: fData.facilityName.value,
      state: stateCode ? stateCode : "",
    };
    newOrderObj?.setHomecareproviderSearchAddPopUpSection(
      SearchHomeCareProviderModal.LOADER
    );
    clearSearchData();
    const data = await caregiverFacilitySearch(facilitySearchRequest);
    if (data.items === null) {
      newOrderObj?.setHomecareproviderSearchAddPopUpSection(
        SearchHomeCareProviderModal.FACILITY_NOTFOUND
      );
    } else if (data.items.length > 0) {
      const hcFacility = data.items as ICaregiverFacility[];
      setFacilities(hcFacility);
      newOrderObj?.setHomecareproviderSearchAddPopUpSection(
        SearchHomeCareProviderModal.FACILITY_LIST
      );
    } else {
      newOrderObj?.setHomecareproviderSearchAddPopUpSection(
        SearchHomeCareProviderModal.FACILITY_NOTFOUND
      );
    }
  };

  const providerSearch = () => {
    clearSearchData();
    newOrderObj?.setHomecareproviderSearchAddPopUpSection(
      SearchHomeCareProviderModal.SEARCH_HOMECAREPROVIDER
    );
  };

  const handleSelectHomeCareProvider = (data: IHomeCareProviderDetail) => {
    handleSelectedHomeCareProvider(
      `${data.name}`,
      data.accountNumber,
      `${data.address1 ?? ""}`,
      `${data.address2 ?? ""}`,
      data.city,
      data.state,
      data.zipCode ?? "",
      data.phone,
      data.facilityType,
      data.extension,
      data.marketingSegmentCode!,
      data.siteUseId!,
      data.caregiverID!
    );
  };

  const handleFacilitySelect = (facility: ICaregiverFacility) => {
    handleSelectedHomeCareProvider(
      facility.customerName,
      facility.customerAccountNumber!,
      facility.address1,
      facility.address2,
      facility.city,
      facility.state,
      facility.postalCode,
      facility.phoneNo,
      facility.marketingSegmentDescription,
      facility.extension,
      facility.marketingSegmentCode!,
      facility.siteUseId!,
      facility.origSystemReference!
    );
  };

  const handleSelectedHomeCareProvider = (
    name: string,
    accountNumber: string,
    address: string,
    address2: string,
    city: string,
    state: string,
    zipCode: string,
    phone: string,
    type: string,
    extension: string,
    marketingSegmentCode: string,
    siteUseId: string,
    caregiverId: string
  ) => {
    setData((dt: INewOrder) => ({
      ...dt,
      homeCareProvider: {
        value: data.homeCareProvider.value,
        valid: ValidationStatus.VALID,
        required: true,
      },
      addedCaregiverName: {
        value: name,
        valid: ValidationStatus.VALID,
        required: true,
      },
      addedCaregiverAddress1: {
        value: address,
        valid: ValidationStatus.VALID,
        required: true,
      },
      addedCaregiverAddress2: {
        value: address2,
        valid: ValidationStatus.VALID,
        required: true,
      },
      addedCaregiverCity: {
        value: city,
        valid: ValidationStatus.VALID,
        required: true,
      },
      addedCaregiverState: {
        value: state,
        valid: ValidationStatus.VALID,
        required: true,
      },
      addedCaregiverZip: {
        value: zipCode,
        valid: ValidationStatus.VALID,
        required: true,
      },
      addedCaregiverPhone: {
        value: phone,
        valid: ValidationStatus.VALID,
        required: true,
      },
      addedCaregiverFacilityType: {
        value: type,
        valid: ValidationStatus.VALID,
        required: true,
      },
      addedCaregiverPhoneExtension: {
        value: extension,
        valid: ValidationStatus.VALID,
        required: true,
      },
      addedCaregiverFacilityTypeCode: {
        value: marketingSegmentCode,
        valid: ValidationStatus.VALID,
        required: true,
      },
      addedCaregiverSiteUseID: {
        value: siteUseId,
        valid: ValidationStatus.VALID,
        required: true,
      },
      addedCaregiverID: {
        value: caregiverId,
        valid: ValidationStatus.VALID,
        required: true,
      },
      addedCaregiverAccountNumber: {
        value: accountNumber,
        valid: ValidationStatus.VALID,
        required: true,
      },
    }));
    newOrderObj?.setCaregiverSelected(true);
    newOrderObj?.setSearchHomeCareProviderPopup(false);
  };

  const handleBackToSearch = () => {
    newOrderObj?.setHomecareproviderSearchAddPopUpSection(
      SearchHomeCareProviderModal.FACILITY_DATABASE_SEARCH
    );
  };

  const handleAddNewProvider = () => {
    newOrderObj?.setHomecareproviderSearchAddPopUpSection(
      SearchHomeCareProviderModal.ADD_MANUAL_HOMECAREPROVIDER
    );
  };

  const searchHomeCareProviderButtonAction = () => {
    newOrderObj?.setHomecareproviderSearchAddPopUpSection(
      SearchHomeCareProviderModal.SEARCH_HOMECAREPROVIDER
    );
    newOrderObj?.setSearchHomeCareProviderPopup(true);
  };

  const handleHCProviderSearchType = (section: SearchHomeCareProviderModal) => {
    newOrderObj?.setHomecareproviderSearchAddPopUpSection(section);
  };

  const searchHomeCareProviderPopupSection = () => {
    let page: ReactNode;
    switch (newOrderObj?.homecareproviderSearchAddPopUpSection) {
      case SearchHomeCareProviderModal.SEARCH_HOMECAREPROVIDER:
        page = (
          <SearchHomeCareProvider
            handleHomeCareProviderSearchType={handleHCProviderSearchType}
            setSelectedHomeCareProvider={setSelectedHomeCareProvider}
          />
        );
        break;
      case SearchHomeCareProviderModal.HOMECAREPROVIDER_FOUND:
        page = (
          <HomeCareProviderFound
            data={selectedHomeCareProvider!}
            handleSelectedHomeCareProvider={handleSelectHomeCareProvider}
            handleHomeCareProviderSearchType={handleHCProviderSearchType}
          />
        );
        break;
      case SearchHomeCareProviderModal.ADD_MANUAL_HOMECAREPROVIDER:
        page = (
          <AddManualHomeCare
            states={states}
            statesText={statesText}
            handleFacilitySelect={handleFacilitySelect}
          />
        );
        break;
      case SearchHomeCareProviderModal.FACILITY_DATABASE_SEARCH:
        page = (
          <CaregiverFacilitySearch
            data={fData}
            setData={setFData}
            handleSearch={handleCaregiverFacilitySearch}
            redirectToProviderSearch={providerSearch}
            statesText={statesText}
          />
        );
        break;
      case SearchHomeCareProviderModal.FACILITY_LIST:
        page = (
          <CaregiverFacilityFoundList
            facilities={facilities}
            handleSelect={handleFacilitySelect}
            handleBackToSearch={handleBackToSearch}
          />
        );
        break;
      case SearchHomeCareProviderModal.FACILITY_NOTFOUND:
        page = (
          <CaregiverFacilityNotFound
            handleAddNewProvider={handleAddNewProvider}
            handleSearchAgain={handleBackToSearch}
          />
        );
        break;
      case SearchHomeCareProviderModal.LOADER:
        page = (
          <div className="homecareprovider-spinner">
            <LoadingSpinner />
          </div>
        );
        break;
    }
    return page;
  };

  const validateAndSetData = (e: any) => {
    newOrderObj?.setIsHandleChangeTriggered(true);
    if (e.target.name === "homeCareProvider") {
      let isValid = ValidationStatus.VALID;
      if (e.target.value === "yes") {
        newOrderObj?.setActive(true);
        isValid = ValidationStatus.INVALID;
      } else if (e.target.value === "no") {
        newOrderObj?.setActive(false);
        newOrderObj?.setCaregiverSelected(false);
      }
      setData((dt: INewOrder) => ({
        ...dt,
        homeCareProvider: {
          value: e.target.value,
          valid: isValid,
          required: true,
        },
        addedCaregiverName: {
          value: "",
          valid: ValidationStatus.UNTOUCHED,
          required: true,
        },
        addedCaregiverAddress1: {
          value: "",
          valid: ValidationStatus.UNTOUCHED,
          required: true,
        },
        addedCaregiverAddress2: {
          value: "",
          valid: ValidationStatus.UNTOUCHED,
          required: true,
        },
        addedCaregiverCity: {
          value: "",
          valid: ValidationStatus.UNTOUCHED,
          required: true,
        },
        addedCaregiverState: {
          value: "",
          valid: ValidationStatus.UNTOUCHED,
          required: true,
        },
        addedCaregiverZip: {
          value: "",
          valid: ValidationStatus.UNTOUCHED,
          required: true,
        },
        addedCaregiverPhone: {
          value: "",
          valid: ValidationStatus.UNTOUCHED,
          required: true,
        },
        addedCaregiverFacilityType: {
          value: "",
          valid: ValidationStatus.UNTOUCHED,
          required: true,
        },
        addedCaregiverFacilityTypeCode: {
          value: "",
          valid: ValidationStatus.VALID,
          required: true,
        },
        addedCaregiverSiteUseID: {
          value: "",
          valid: ValidationStatus.VALID,
          required: true,
        },
        addedCaregiverAccountNumber: {
          value: "",
          valid: ValidationStatus.VALID,
          required: true,
        },
        addedCaregiverID: {
          value: "",
          valid: ValidationStatus.VALID,
          required: true,
        },
      }));
    }
  };

  return (
    <div className="homecareprovider-component">
      {!isReviewOrder && (
        <div className="homecareprovider">
          <h2
            className="homecareprovider-title"
            data-testid="homecareprovider-title"
          >
            Home Care Provider
          </h2>
          <Box className="homecare-provider-box-container" sx={{ flexGrow: 1 }}>
            <Grid
              className="homecare-provider-grid-container"
              container
              spacing={2}
            >
              <Grid className="homecare-provider-grid-item" item xs={6}>
                <InputWithLabel
                  labelClassName="homecare-provider-label-item"
                  label="Do you know who will be administering the patient's dressing changes?"
                  isRequired={true}
                  error={
                    data?.homeCareProvider.valid === ValidationStatus.INVALID
                  }
                  testId="homecareprovider-administering-dress"
                >
                  <RadioGroup
                    name="homeCareProvider"
                    classes={{ root: "radioRoot" }}
                    onChange={validateAndSetData}
                    value={data?.homeCareProvider.value}
                  >
                    <FormControlLabel
                      classes={{
                        root:
                          newOrderObj?.active === true
                            ? "optionRoot-active"
                            : "optionRoot",
                      }}
                      componentsProps={{
                        typography: {
                          classes: {
                            root:
                              newOrderObj?.active === true
                                ? "optiontxtSelect"
                                : "optiontxt",
                          },
                        },
                      }}
                      control={
                        <Radio
                          icon={<RadioButtonIcon />}
                          checkedIcon={<SelectedRadioButtonIcon />}
                        />
                      }
                      data-testid="homecareprovider-administering-dress-yes"
                      label="Yes"
                      value="yes"
                    />
                    <FormControlLabel
                      classes={{
                        root:
                          newOrderObj?.active === false
                            ? "optionRoot-active"
                            : "optionRoot",
                      }}
                      componentsProps={{
                        typography: {
                          classes: {
                            root:
                              newOrderObj?.active === false
                                ? "optiontxtSelect"
                                : "optiontxt",
                          },
                        },
                      }}
                      control={
                        <Radio
                          icon={<RadioButtonIcon />}
                          checkedIcon={<SelectedRadioButtonIcon />}
                        />
                      }
                      data-testid="homecareprovider-administering-dress-no"
                      label="No"
                      value="no"
                    />
                  </RadioGroup>
                </InputWithLabel>
              </Grid>
              {newOrderObj?.active &&
                newOrderObj?.active === true &&
                newOrderObj?.caregiverSelected === false && (
                  <div className="homecareprovider">
                    <Box
                      className="homecare-provider-box-container"
                      sx={{ flexGrow: 1 }}
                    >
                      <Grid
                        className="homecareprovider-grid-container"
                        container
                        spacing={2}
                      >
                        <Grid className="homecareprovider-item" item xs={12}>
                          <InputWithLabel label="">
                            <Button
                              classes={{ root: "homecareprovider-button" }}
                              data-testid="homecareprovider-button"
                              onClick={searchHomeCareProviderButtonAction}
                              startIcon={<SearchIcon />}
                              variant="outlined"
                            >
                              Search For Home Care Provider
                            </Button>
                          </InputWithLabel>
                        </Grid>
                      </Grid>
                    </Box>
                  </div>
                )}
              {newOrderObj?.active && newOrderObj?.caregiverSelected && (
                <Grid container className="caregiver-container">
                  <Grid className="caregiver-name-container" item xs={12}>
                    <div className="caregiver-name">
                      {makeCapitalEachWordInString(
                        data?.addedCaregiverName.value.toLowerCase()
                      )}
                    </div>
                  </Grid>
                  <Grid className="caregiver-address-container" item xs={12}>
                    <div className="address-part address-div">
                      <div className="address">
                        <div className="address-header">Address</div>
                        <div className="caregiver-address">
                          {makeCapitalEachWordInString(
                            data?.addedCaregiverAddress1?.value
                              ? data?.addedCaregiverAddress1?.value.toLowerCase()
                              : ""
                          )}
                        </div>
                        <div className="caregiver-address">
                          {makeCapitalEachWordInString(
                            data?.addedCaregiverAddress2?.value
                              ? data?.addedCaregiverAddress2?.value.toLowerCase()
                              : ""
                          )}
                        </div>
                        <div className="caregiver-address">
                          {`${`${makeCapitalEachWordInString(
                            data?.addedCaregiverCity?.value?.toLowerCase()
                          )}${
                            data.addedCaregiverCity?.value?.toLowerCase()
                              ? " "
                              : " "
                          } ${
                            data?.addedCaregiverState?.value ?? ""
                          }, ${data?.addedCaregiverZip?.value?.toLowerCase()}`}`}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="address-part phone-div">
                        <div className="address-header">Facility Type</div>
                        <div className="caregiver-address">
                          {makeCapitalEachWordInString(
                            data?.addedCaregiverFacilityType.value
                              ? data?.addedCaregiverFacilityType.value.toLowerCase()
                              : "--"
                          )}
                        </div>
                      </div>
                      <br></br>
                      <div className="address-part phone-div">
                        <div className="address-header">Phone Number</div>
                        <div className="caregiver-address">
                          {data?.addedCaregiverPhone?.value &&
                          data?.addedCaregiverPhone?.value !== ""
                            ? `${formatNumber(
                                data?.addedCaregiverPhone?.value
                              )} ${
                                data?.addedCaregiverPhoneExtension.value
                                  ? `x${data?.addedCaregiverPhoneExtension.value}`
                                  : ""
                              }`
                            : "--"}
                        </div>
                      </div>
                    </div>
                  </Grid>
                  <div>
                    <ExpressButton
                      clickHandler={() => {
                        newOrderObj?.setHomecareproviderSearchAddPopUpSection(
                          SearchHomeCareProviderModal.SEARCH_HOMECAREPROVIDER
                        );
                        newOrderObj?.setSearchHomeCareProviderPopup(true);
                      }}
                      parentClass="change-provider-btn"
                      variant="outlined"
                    >
                      Change Home care provider
                    </ExpressButton>
                  </div>
                </Grid>
              )}
            </Grid>
          </Box>
          <Popup
            openFlag={newOrderObj?.searchHomeCareProviderPopup}
            closeHandler={() => {
              clearSearchData();
              newOrderObj?.setSearchHomeCareProviderPopup(false);
            }}
            dialogParentClass={
              newOrderObj?.homecareproviderSearchAddPopUpSection
            }
          >
            {searchHomeCareProviderPopupSection()}
          </Popup>
        </div>
      )}
      {isReviewOrder && (
        <HomeCareProviderReviewOrder
          data={data}
          editButtonClicked={editButtonClicked}
          isOrderSummary={isOrderSummary}
        />
      )}
    </div>
  );
};
