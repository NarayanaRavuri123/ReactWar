import "./manageUsers.css";
import { useDebounce } from "use-debounce";
import { format } from "react-string-format";
import {
  UserProfileContext,
  UserProfileContextType,
} from "../../../context/UserProfileContext";
import { useHistory } from "react-router-dom";
import {
  RolesPermissionContext,
  RolesPermissionContextType,
} from "../../../context/RolesPermissionContext";
import { Button, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useContext, useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/AddCircleOutline";
import { Popup } from "../../../core/popup/popup.component";
import { getProperty } from "../../../util/ObjectFunctions";
import { DD_ALLSTATUS_CONTENT } from "../../../util/staticText";
import { useSortableTable } from "../../../util/utilityFunctions";
import { getdropDownContent } from "../../../util/dropDownService";
import { LoadingSpinner } from "../../../core/loader/LoadingSpinner";
import { getUserMangerList } from "../../../util/facilityUserService";
import { columns } from "./manageUserTable/manageUsersListTable.model";
import { AuthContext, AuthContextType } from "../../../context/AuthContext";
import { Navigator } from "../../helpAndSupport/Navigator/navigator.component";
import { CustomDropDown } from "../../../core/customDropdown/customDropdown.component";
import { ManageUsersListTable } from "./manageUserTable/manageUsersListTable.component";
import { SendNoteFailure } from "../../send3MNote/popUps/failurePopUp/sendNoteFailure.component";
import { IManageUserListTableData } from "./manageUserTable/manageUsersListTable.interface";

export const ManageUsers = () => {
  const authObj = useContext<AuthContextType | null>(AuthContext);
  const permissionObj = useContext<RolesPermissionContextType | null>(
    RolesPermissionContext
  );
  const userProfileObj = useContext<UserProfileContextType | null>(
    UserProfileContext
  );
  const history = useHistory();
  const [statusType, setStatusType] = useState([]);
  const [statusTypeText, setStatusTypeText] = useState([]);
  const [siteUseId, setSiteUseId] = useState<string>("");

  const [selectedStatusType, setSelectedStatusType] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchedInput, setSearchedInput] = useState<string>("");
  const [debouncedText] = useDebounce(searchInput, 500);

  const [originalData, setOriginalData] = useState<IManageUserListTableData[]>(
    []
  );
  const [sortData, setSortData, handleSortedData] = useSortableTable(
    [],
    columns
  );
  const [openLoaderPopUp, setOpenLoaderPopUp] = useState<boolean>(false);
  const [failurePopUp, setFailurePopUp] = useState<boolean>(false);

  const getUserMangerListFromServer = async () => {
    setOpenLoaderPopUp(true);
    const result = await Promise.all([
      getUserMangerListAPI(),
      fetchDropDownContent(),
    ]);
    setOpenLoaderPopUp(false);
    if (result.length === 2) {
      if (!result[0]) {
        setFailurePopUp(true);
      } else {
        const items: IManageUserListTableData[] = result[0];
        if (
          authObj &&
          authObj.userProfile &&
          authObj.userProfile.userName &&
          authObj.userProfile.userName !== ""
        ) {
          const index = items.findIndex(
            (item: IManageUserListTableData) =>
              item.userName === authObj!.userProfile!.userName
          );
          if (index > -1) {
            items.splice(index, 1);
          }
        }
        let cloneData: IManageUserListTableData[] = JSON.parse(
          JSON.stringify(items)
        );
        setOriginalData(cloneData);
        setSortData(items);
      }
    }
  };

  const getUserMangerListAPI = async () => {
    if (
      authObj &&
      authObj.registeredFaciltyAddress &&
      authObj.registeredFaciltyAddress.siteUseId &&
      authObj.registeredFaciltyAddress.siteUseId !== ""
    ) {
      const params = {
        SiteUseId: authObj.registeredFaciltyAddress.siteUseId,
      };
      const response = await getUserMangerList(params);
      if (response && response.succeeded) {
        return response.items;
      } else {
        return null;
      }
    }
  };

  const fetchDropDownContent = async () => {
    try {
      const ddContent = format("{0}", DD_ALLSTATUS_CONTENT ?? "");
      const data = await getdropDownContent(ddContent);
      if (data.items.length > 0) {
        const statusTypeObject = data.items.filter(
          (item: { name: string }) => item.name === DD_ALLSTATUS_CONTENT
        );
        const statusTypeData = statusTypeObject[0].data.sort(
          (a: { order: number }, b: { order: number }) =>
            a.order > b.order ? 1 : -1
        );
        setStatusType(statusTypeData);
        setStatusTypeText(statusTypeData.map((x: { text: string }) => x.text));
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const closeFailurePpoUp = () => {
    setFailurePopUp(false);
    history.goBack();
  };

  const openUserProfile = (
    isAddingNewUser: boolean,
    selectedUserName: string
  ) => {
    userProfileObj?.resetUserProfile();
    history.push({
      pathname: "/administration/manageUsers/userProfile",
      state: {
        isAddingNewUser: isAddingNewUser,
        selectedUserName: selectedUserName,
      },
    });
  };

  const handleAddNewUser = () => {
    openUserProfile(true, "");
  };

  const openUserDetails = (data: IManageUserListTableData) => {
    openUserProfile(false, data.userName);
  };

  const validateAndSetData = (e: any) => {
    setSelectedStatusType(e.target.value);
    filterUsers(debouncedText, e.target.value);
  };

  const handleSearch = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const re = /^[a-zA-Z0-9- ]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setSearchInput(e.target.value);
    }
  };

  const filterUsers = (searchParam: string, status: string) => {
    setSearchedInput(searchParam);
    let searchStatus = "";
    if (status !== "All statuses") {
      searchStatus = status;
    }
    if (originalData && originalData.length > 0) {
      let filtedUsers = originalData;
      if (searchStatus.length > 0) {
        filtedUsers = filtedUsers.filter(
          (user: IManageUserListTableData) =>
            user.status.toLocaleLowerCase() === searchStatus.toLowerCase()
        );
      }
      if (searchParam.length > 0) {
        filtedUsers = filtedUsers.filter(
          (user: IManageUserListTableData) =>
            user.userName
              .toLocaleLowerCase()
              .includes(searchParam.toLowerCase()) ||
            user.firstName
              .toLocaleLowerCase()
              .includes(searchParam.toLowerCase()) ||
            user.lastName
              .toLocaleLowerCase()
              .includes(searchParam.toLowerCase())
        );
      }
      setSortData(filtedUsers);
    }
  };

  useEffect(() => {
    if (
      authObj &&
      authObj.registeredFaciltyAddress &&
      authObj.userRolesAndPermissionLoaded &&
      authObj.registeredFaciltyAddress.siteUseId &&
      authObj.registeredFaciltyAddress.siteUseId !== "" &&
      getProperty(authObj.sideNavMenuOptionModelData, "administration")
        .isVisible &&
      (siteUseId === "" ||
        siteUseId !== authObj.registeredFaciltyAddress.siteUseId)
    ) {
      setSiteUseId(authObj.registeredFaciltyAddress.siteUseId);
      getUserMangerListFromServer();
    }
  }, [authObj?.registeredFaciltyAddress?.siteUseId]);

  useEffect(() => {
    if (
      (debouncedText.length === 0 && searchedInput !== debouncedText) ||
      debouncedText.length > 0
    ) {
      filterUsers(debouncedText, selectedStatusType);
    }
  }, [debouncedText]);

  useEffect(() => {
    filterUsers(debouncedText, "All statuses");
  }, [originalData]);

  return (
    <div className="manage-users-component-container">
      <div
        className="manage-users-component"
        data-testid="manage-users-component"
      >
        <Navigator
          array={[
            {
              route: "/administration",
              pageName: "Administration",
            },
          ]}
          className="manage-users-component-route-section"
          title="Manage Users"
        />
        <div className="manage-users-main-section">
          <span
            className="manage-users-main-section-header"
            data-testid="manage-users-main-section-header"
          >
            Manage Users
          </span>
        </div>
        <div className="filter-mng-usr">
          <div className="user-searchbar">
            <div className="search-icon-div">
              <SearchIcon className="search-icon" />
            </div>
            <InputBase
              className="user-search-input"
              data-testid="user-search-input"
              name="search-input"
              onChange={handleSearch}
              placeholder="Filter by First Name, Last Name or Username"
              value={searchInput}
            />
          </div>
          <CustomDropDown
            handleChange={validateAndSetData}
            menuItem={statusTypeText}
            name="user-status"
            placeHolder="All statuses"
            selectpropsClassName={
              selectedStatusType ? "user-status-select" : "placeHolder"
            }
            selectClassName={
              selectedStatusType ? "user-status-input" : "placeHolder"
            }
            testId="user-status"
            value={selectedStatusType ? selectedStatusType : null}
          />
          <Button
            classes={{ root: "add-new-user-btn" }}
            startIcon={<AddIcon />}
            onClick={handleAddNewUser}
            disabled={permissionObj?.mappedRolesPermissionData.IsSupportRole}
            data-testid={"mng-add-usr-btn"}
          >
            Add New User
          </Button>
        </div>
        <div className="users-table">
          <ManageUsersListTable
            columns={columns}
            handleSorting={handleSortedData}
            openUserDetails={openUserDetails}
            sortedData={sortData}
          />
        </div>
      </div>
      <Popup
        openFlag={openLoaderPopUp}
        closeHandler={() => setOpenLoaderPopUp(false)}
        dialogParentClass={"fetch-users-loader-pop-up"}
        data-testid="fetch-users-pop-up"
        hideCloseButton={true}
      >
        <div className="fetch-users-loader">
          <LoadingSpinner />
        </div>
      </Popup>
      <Popup
        openFlag={failurePopUp}
        closeHandler={closeFailurePpoUp}
        dialogParentClass={"fetch-users-failure-pop-up"}
        data-testid="fetch-users-failure-pop-up"
      >
        <div className="fetch-users-failure-pop-up-div">
          <SendNoteFailure
            backButtonAction={closeFailurePpoUp}
            message={
              "Your request to fetch users details has failed. Please try again or contact 3M for assistance with this user 1-800-275-4524."
            }
          />
        </div>
      </Popup>
    </div>
  );
};
