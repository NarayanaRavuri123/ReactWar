import { useContext, useEffect, useMemo, useState } from "react";
import Table from "../../../core/customSortingTable/table.component";
import {
  getCodeFromText,
  makeCapitalEachOfWordInString,
  makeCapitalEachWordInString,
} from "../../../util/utilityFunctions";
import { selectFacility } from "../../../util/userService";

import { IoMdArrowDropright, IoMdArrowDropleft } from "react-icons/io";
import { updateFavouriteFacility } from "../../../util/userService";
import Favorite from "../../../assets/Favorite.png";
import NotFavourite from "../../../assets/NotFavourite.svg";

import { AuthContextType, AuthContext } from "../../../context/AuthContext";
import { searchFacility } from "../../../components/manageProfile/facilityInformation/addFacility/addFacility.service";
import { mapUserRolesAndPermissionData } from "../../../RolesPermission/RolesPermission.Mapper";
import {
  RolesPermissionContext,
  RolesPermissionContextType,
} from "../../../context/RolesPermissionContext";
import { ISideNav } from "../../../components/sideNav/sideNavMenuOption.interface";
import { useHistory, useLocation } from "react-router-dom";
import "./searchFacilityResult.css";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import { SearchFacilityTableFilter } from "../../sales/searchFacilityTableFilter.component";
import { format } from "react-string-format";
import {
  DD_CARE_SETTING_CONTENT,
  DD_CLASSIFICATION_CONTENT,
} from "../../../util/staticText";
import { getdropDownContent } from "../../../util/dropDownService";
import { defaultSalesRoleTestData } from "../../sales/salesRole.test.data";
import { ISalesRole } from "../../sales/salesRole.interface";
import { getTextFromCode } from "../../../util/utilityFunctions";
import { ExpressButton } from "../../../core/expressButton/expressButton.component";

import { CustomDropDown } from "../../../core/customDropdown/customDropdown.component";
import {
  getCareGiverId,
  getUnlinkedFacilitesCount,
} from "../../../util/3meService";
import { LoadingSpinner } from "../../../core/loader/LoadingSpinner";
import { Popup } from "../../../core/popup/popup.component";

interface searchFacilityResultInterface {
  sortedData: any;
  setSortedData: any;
  handleSorting: any;
  columns: any;
  isLoading: any;
  data: any;
  salesRole: any;
  isSearchSelected: any;
  setIsSearchSelected: any;
  setData?: any;
}

const SearchFacilityResult = ({
  sortedData,
  setSortedData,
  handleSorting,
  columns,
  isLoading,
  data,
  salesRole,
  isSearchSelected,
  setIsSearchSelected,
  setData,
}: searchFacilityResultInterface) => {
  const AuthObj = useContext<AuthContextType | null>(AuthContext);
  const permissionObj = useContext<RolesPermissionContextType | null>(
    RolesPermissionContext
  );

  const [classification, setClassification] = useState([]);
  const [classificationText, setClassificationText] = useState([]);
  const [careSetting, setCareSetting] = useState([]);
  const [careSettingText, setCareSettingText] = useState([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [salesRolesData, setSalesRolesData] = useState(
    defaultSalesRoleTestData
  );
  const history = useHistory();
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState<string | null>(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    fetchDropDownContent();
  }, []);
  useEffect(() => {
    if (location.pathname !== currentPath) {
      setCurrentPath(location.pathname);
    }
  }, []);
  useEffect(() => {
    if (isSearchSelected) {
      setSalesRolesData(defaultSalesRoleTestData);
      setSearchInput("");
    }
  }, [isLoading]);

  const fetchDropDownContent = async () => {
    //async and await
    try {
      const ddContent = format(
        "{0},{1}",

        DD_CLASSIFICATION_CONTENT,
        DD_CARE_SETTING_CONTENT ?? ""
      );
      const data = await getdropDownContent(ddContent);
      if (data.items.length > 0) {
        const classificationObject = data.items.filter(
          (item: { name: string }) => item.name === DD_CLASSIFICATION_CONTENT
        );
        const classificationData = classificationObject[0].data.sort(
          (a: { order: number }, b: { order: number }) =>
            a.order > b.order ? 1 : -1
        );
        setClassification(classificationData);
        setClassificationText(
          classificationData.map((x: { text: string }) => x.text)
        );
        const careSettingObject = data.items.filter(
          (item: { name: string }) => item.name === DD_CARE_SETTING_CONTENT
        );
        const careSettingData = careSettingObject[0].data.sort(
          (a: { order: number }, b: { order: number }) =>
            a.order > b.order ? 1 : -1
        );
        setCareSetting(careSettingData);
        setCareSettingText(
          careSettingData.map((x: { text: string }) => x.text)
        );
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const updateFavFacility = async (selectedData: any, isFavourite: boolean) => {
    const updateFacilities = await updateFavouriteFacility(
      AuthObj?.userProfile?.userName,
      selectedData.siteUseId,
      isFavourite ? FavoriteType.REMOVEFAVORITE : FavoriteType.ADDFAVORITE
    );
    if (updateFacilities) {
      const newArr = sortedData.map((obj: any) => {
        if (obj.siteUseId === selectedData.siteUseId) {
          return { ...obj, isFavourite: !isFavourite };
        }
        return obj;
      });
      const updatedArray = data.map((obj: any) => {
        newArr.map((x: any) => {
          if (x.siteUseId === obj.siteUseId) {
            obj.isFavourite = x.isFavourite;
          }
        });
        return obj;
      });
      setData(updatedArray);
      setSortedData(newArr);
    }
  };

  const handleFavLink = (data: any, isFavourite: boolean) => {
    updateFavFacility(data, isFavourite);
  };

  const handleSelectClick = async (e: any, isFavourite: boolean) => {
    const reqBody = {
      UserName: AuthObj?.userProfile?.userName,
      SiteUseId: e.target.id,
    };
    if (!loader) {
      setLoader(true);
    }
    const userPermissions = await selectFacility(reqBody);
    const data = sortedData.filter((x: any) => x.siteUseId === e.target.id)[0];
    AuthObj?.setuserRolePermissionData(userPermissions);
    await searchFacilityAddr(data, userPermissions, isFavourite);
    setLoader(false);
  };

  const searchFacilityAddr = async (
    data: any,
    userPermissions: any,
    isFavourite: boolean
  ) => {
    let tempSideNavMenuOption: ISideNav;
    let readyCareFlag = "N";

    var facilitySearchRequest = {
      customerNumber: data.accountNumber,
      customerName: "",
      postalCode: "",
    };
    const searchedFacilities = await searchFacility(facilitySearchRequest);
    if (searchedFacilities) {
      const facilityRes = searchedFacilities.filter((x) => {
        if (x.siteUseId === data.siteUseId.toString()) {
          return x;
        }
      })[0];

      readyCareFlag = facilityRes.readyCareFlag!;
      facilityRes.isFavourite = isFavourite;
      // Set CareGiverId
      const caregiverId = await getCareGiverId(
        facilityRes.accountNumber?.toString(),
        facilityRes.typeCode
      );
      facilityRes.careGiverId = caregiverId;
      AuthObj?.setregisteredFaciltyAddress(facilityRes);

      const rolesPermissionRes = await mapUserRolesAndPermissionData(
        userPermissions,
        readyCareFlag
      );

      permissionObj?.setMappedRolesPermissionData(rolesPermissionRes);
      let adminText: any = "Administration";
      if (
        (AuthObj?.unLinkedFacilitesCount && rolesPermissionRes.Is3MAdminRole) ||
        (AuthObj?.unLinkedFacilitesCount &&
          rolesPermissionRes.IsProdManagerRole) ||
        (AuthObj?.unLinkedFacilitesCount && rolesPermissionRes.IsSupportRole)
      ) {
        adminText = (
          <div className="sideNavmadminBtnMain">
            Administration
            <span className="sideNavmadminBtnStyle">
              {AuthObj?.unLinkedFacilitesCount}{" "}
            </span>{" "}
          </div>
        );
      }

      tempSideNavMenuOption = {
        ...AuthObj?.sideNavMenuOptionModelData!,
        orders: {
          labelText: "Start New Order",
          isVisible: rolesPermissionRes.IsShowStartNewOrder,
        },
        inventory: {
          labelText: "Inventory",
          isVisible: rolesPermissionRes.IsShowInventoryOption,
        },
        administration: {
          labelText: adminText,
          isVisible: rolesPermissionRes.IsShowAdminstrationOption,
        },
      };
      if (currentPath === "/ssoRedirect") {
        localStorage.setItem("isComingFromSSO", "false");
      }
      AuthObj?.setuserRolesAndPermissionLoaded(true);
      AuthObj?.setIsInternalUserFacilitySelected(true);
      history.push("/home");
    }

    AuthObj?.setsideNavMenuOptionModelData(tempSideNavMenuOption!);
  };

  const validateAndSetData = (e: any) => {
    let filteredData = data;
    let { value, name } = e.target;
    if (e.target.name === "FacilityClassification") {
      value = getCodeFromText(classification, value);
      if (value !== "0") {
        if (
          salesRolesData.CareSetting.value !== "" &&
          salesRolesData.CareSetting.value !== "0"
        ) {
          filteredData = data.filter(
            (x: any) =>
              x.typeCode === value &&
              x.careSetting.toLowerCase() ===
                getTextFromCode(
                  careSetting,
                  salesRolesData.CareSetting.value
                ).toLowerCase()
          );
        } else {
          filteredData = data.filter((x: any) => x.typeCode === value);
        }
      } else {
        if (
          salesRolesData.CareSetting.value !== "" &&
          salesRolesData.CareSetting.value !== "0"
        ) {
          filteredData = data.filter(
            (x: any) =>
              x.careSetting.toLowerCase() ===
              getTextFromCode(
                careSetting,
                salesRolesData.CareSetting.value
              ).toLowerCase()
          );
        } else {
          filteredData = data;
        }
      }
    } else {
      if (value !== "All care settings") {
        if (
          salesRolesData.FacilityClassification.value !== "" &&
          salesRolesData.FacilityClassification.value !== "0"
        ) {
          filteredData = data.filter(
            (x: any) =>
              x.careSetting.toLowerCase() === value.toLowerCase() &&
              x.typeCode === salesRolesData.FacilityClassification.value
          );
        } else {
          filteredData = data.filter(
            (x: any) => x.careSetting.toLowerCase() === value.toLowerCase()
          );
        }
      } else {
        if (
          salesRolesData.FacilityClassification.value !== "" &&
          salesRolesData.FacilityClassification.value !== "0"
        ) {
          filteredData = data.filter(
            (x: any) =>
              x.typeCode === salesRolesData.FacilityClassification.value
          );
        } else {
          filteredData = data;
        }
      }
      value = getCodeFromText(careSetting, value);
    }
    setSortedData(filteredData);

    setSalesRolesData((salesRolesData: ISalesRole) => ({
      ...salesRolesData,
      [e.target.name]: {
        value: value,
        valid: true,
        required: true,
      },
    }));
  };
  const handleFacilitySearch = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const re = /^[a-zA-Z0-9-]+$/;
    const { value } = e.target;
    if (value === "" || re.test(value)) {
      setSearchInput(e.target.value);

      if (e.target.value.length > 2) {
        const filteredList = data.filter((x: any) => {
          return (
            x.accountName.toLowerCase().includes(value.toLowerCase()) ||
            x.accountNumber.toLowerCase().includes(value.toLowerCase())
          );
        });
        setSortedData(filteredList);
      } else if (e.target.value.length === 0) {
        setSortedData(data);
      }
    }
  };

  const [currentPage2, setCurrentPage2] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState<any>(25);
  const [currentPosts, setCurrentPost] = useState<any>();
  const [numberOfPages, setNumberOfPages] = useState<any[]>([]);
  const [currentButton, setCurrentButton] = useState(1);
  const [arrOfCurrButtons, setArrOfCurrButtons] = useState<any[]>([]);
  const [totalLength, setTotalLenght] = useState<any[]>([]);

  useEffect(() => {
    const indexOfLastPost = currentButton * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    if (sortedData.slice(indexOfFirstPost, indexOfLastPost).length === 0) {
      setCurrentButton(1);
      const indexOfLastPost = currentPage2 * postsPerPage;
      const indexOfFirstPost = indexOfLastPost - postsPerPage;
      const temp = sortedData.slice(indexOfFirstPost, indexOfLastPost);
      setCurrentPost(temp);
      setTotalLenght(temp ? temp : 0);
    } else if (
      sortedData.slice(indexOfFirstPost, indexOfLastPost).length !== 0
    ) {
      const temp = sortedData.slice(indexOfFirstPost, indexOfLastPost);
      setCurrentPost(temp);
      setTotalLenght(temp ? temp : 0);
    }
    const howManyPages = Math.ceil(sortedData.length / postsPerPage);
    const numberOfPages: any[] = [];
    for (let i = 1; i <= howManyPages; i++) {
      numberOfPages.push(i);
    }
    setNumberOfPages(numberOfPages);
    var tempNumberOfPages: any[] = [];
    tempNumberOfPages = [...arrOfCurrButtons];
    let dotsInitial: any = "...";
    let dotsRight: any = " ...";
    if (numberOfPages.length < 5) {
      tempNumberOfPages = numberOfPages;
    } else if (currentButton >= 1 && currentButton < 5) {
      tempNumberOfPages = [1, 2, 3, 4, 5, dotsInitial, numberOfPages.length];
    } else if (
      currentButton >= 5 &&
      currentButton <= Number(numberOfPages.length)
    ) {
      const sliced1 = numberOfPages.slice(currentButton - 1, currentButton);
      const sliced2 = numberOfPages.slice(currentButton, currentButton + 4);
      tempNumberOfPages = [
        ...sliced1,
        ...sliced2,
        dotsRight,
        numberOfPages.length,
      ];
    } else if (
      currentButton >= Number(numberOfPages.length) - 6 &&
      currentButton < Number(numberOfPages.length) - 1
    ) {
      const sliced1 = numberOfPages.slice(currentButton - 1, currentButton);
      const sliced2 = numberOfPages.slice(currentButton, currentButton + 3);
      tempNumberOfPages = [
        ...sliced1,
        ...sliced2,
        dotsRight,
        numberOfPages.length,
      ];
    } else if (currentButton === dotsInitial) {
      setCurrentButton(arrOfCurrButtons[arrOfCurrButtons.length - 3] + 1);
    } else if (currentButton === dotsRight) {
      setCurrentButton(arrOfCurrButtons[arrOfCurrButtons.length - 3] + 1);
    }
    setArrOfCurrButtons(tempNumberOfPages);
    setCurrentPage2(currentButton);
  }, [
    currentButton,
    postsPerPage,
    JSON.stringify(arrOfCurrButtons),
    JSON.stringify(sortedData),
  ]);
  const handleSelectChange = (e: any) => {
    e.preventDefault();
    setPostsPerPage(e.target.value);
  };
  const handlePrevClick = (prev: any) => {
    setCurrentButton((prev) => (prev <= 1 ? prev : prev - 1));
  };
  const handleNextClick = (prev: any) => {
    setCurrentButton((prev) =>
      prev >= numberOfPages.length ? prev : prev + 1
    );
  };
  const Spinner = () => {
    return (
      <div className="facility-spinner">
        <LoadingSpinner />
      </div>
    );
  };
  return (
    <div className="searchFacilityResult-subMain">
      <div
        className="search-facility-result"
        data-testid="search-facility-result"
      >
        {`Search Results (${sortedData.length})`}
      </div>
      <Popup closeHandler={Spinner} openFlag={loader} hideCloseButton={true}>
        <div className="facility-spinner">
          <LoadingSpinner />
        </div>
      </Popup>
      <SearchFacilityTableFilter
        validateAndSetData={validateAndSetData}
        classification={classification}
        careSetting={careSetting}
        classificationText={classificationText}
        careSettingText={careSettingText}
        searchInput={searchInput}
        salesRolesData={salesRolesData}
        handleFacilitySearch={handleFacilitySearch}
        salesRole={salesRole}
      />

      <div
        className="tables_container"
        data-testid="search-facility-result-test"
      >
        <Table
          tableClassName="tables"
          tableColumns={columns}
          handleSorting={handleSorting}
        >
          {isLoading ? (
            [...Array(10)].map((_) => (
              <tr>
                <td className="select-result-facility">
                  <Skeleton />
                </td>
                <td className="search-result-tables-static-data">
                  <Skeleton />
                </td>
                <td className="search-result-tables-static-data">
                  <Skeleton />
                </td>
                <td className="search-result-tables-static-data">
                  <Skeleton />
                </td>
                <td className="search-result-tables-static-data">
                  <Skeleton />
                </td>
                <td className="search-result-tables-static-data">
                  <Skeleton />
                </td>
              </tr>
            ))
          ) : (
            <>
              {columns && currentPosts && currentPosts.length > 0 ? (
                <tbody>
                  {currentPosts.map((data: any) => {
                    return (
                      <tr key={data.id}>
                        <td
                          className="select-result-facility"
                          id={data.siteUseId}
                          onClick={(e) =>
                            handleSelectClick(e, data.isFavourite)
                          }
                          data-testid="selectLinktest"
                        >
                          Select
                        </td>
                        <td
                          className="search-result-tables-static-data"
                          data-testid="selectFacilityAccountNametest"
                        >
                          {makeCapitalEachWordInString(data.accountName)}
                          <br />
                          {data.address1
                            ? makeCapitalEachWordInString(data.address1) + ","
                            : ""}{" "}
                          {data.address2
                            ? makeCapitalEachWordInString(data.address2) + ","
                            : ""}{" "}
                          {makeCapitalEachWordInString(data.city)},{" "}
                          {makeCapitalEachOfWordInString(data.state)},{" "}
                          {makeCapitalEachWordInString(data.zip)}
                        </td>

                        <td className="search-result-tables-static-data">
                          <div
                            className="search-result-imgclick"
                            data-testid="selectFacilityFavouritetest"
                          >
                            {data.isFavourite ? (
                              <img
                                src={Favorite}
                                alt={Favorite}
                                onClick={() => handleFavLink(data, true)}
                              ></img>
                            ) : (
                              <img
                                src={NotFavourite}
                                alt={NotFavourite}
                                onClick={() => handleFavLink(data, false)}
                              ></img>
                            )}
                          </div>
                        </td>
                        <td
                          className="search-result-tables-static-data"
                          data-testid="selectFacilityAccountNumbertest"
                        >
                          {makeCapitalEachWordInString(`${data.accountNumber}`)}
                        </td>
                        <td
                          className="search-result-tables-static-data"
                          data-testid="selectFacilityTypeNametest"
                        >
                          {makeCapitalEachWordInString(`${data.typeName}`)}
                        </td>
                        <td
                          className="search-result-tables-static-data"
                          data-testid="selectFacilityCareSettingtest"
                        >
                          {makeCapitalEachWordInString(`${data.careSetting}`)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              ) : (
                <tbody></tbody>
              )}
            </>
          )}
        </Table>
      </div>
      <br />

      <div className="parentDiv">
        <div className="paginationTable" data-testid="paginationTablePresent">
          <ExpressButton
            clickHandler={(e) => handlePrevClick(e)}
            disabled={currentButton === 1 ? true : false}
            variant="text"
            parentClass={`${currentButton === 1 ? "disabled" : ""}`}
          >
            <IoMdArrowDropleft size={20} />
          </ExpressButton>

          {arrOfCurrButtons.map((item, index) => {
            return (
              <li
                key={index}
                className={`${currentButton === item ? "active" : ""} list`}
                onClick={() => setCurrentButton(item)}
              >
                {item}
              </li>
            );
          })}

          <ExpressButton
            clickHandler={handleNextClick}
            disabled={currentButton === numberOfPages.length ? true : false}
            parentClass={`${
              currentButton === numberOfPages.length ? "disabled" : ""
            } prevbutton`}
            variant="text"
            id="buttonClass"
          >
            <IoMdArrowDropright size={20} />
          </ExpressButton>
        </div>
        <div className="itemsPerPage" data-testid="itemsPerPage">
          <p className="ptag">Items per page:</p>
          <CustomDropDown
            value={`${postsPerPage}`}
            handleChange={handleSelectChange}
            menuItem={["25", "50", "75", "100"]}
            selectClassName="dropdown"
            selectpropsClassName="dropDown"
          />
        </div>
        <div className="totalCounts" data-testid="totalCounts">
          <p className="last-section-right">{`1-${totalLength.length} of ${sortedData.length} items`}</p>
        </div>
      </div>
    </div>
  );
};

export default SearchFacilityResult;

export enum FavoriteType {
  ADDFAVORITE = 1,
  REMOVEFAVORITE = 2,
}
