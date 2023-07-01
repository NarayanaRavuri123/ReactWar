import "./administration.css";
import { useHistory } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import {
  FacilitySettingContext,
  FacilitySettingsContextType,
} from "../../context/FacilitySettingsContext";
import { AuthContext, AuthContextType } from "../../context/AuthContext";
import AdministrationSettings from "./administartionSettings.component";
import {
  RolesPermissionContext,
  RolesPermissionContextType,
} from "../../context/RolesPermissionContext";
import { Grid } from "@mui/material";
import {
  AdminRolesPermissionsContext,
  AdminRolesPermissionsContextType,
} from "../../context/AdminRolesPermissionsContext";
import {
  UserProfileContext,
  UserProfileContextType,
} from "../../context/UserProfileContext";

const Administration = () => {
  const adminRolePermissionsObj =
    useContext<AdminRolesPermissionsContextType | null>(
      AdminRolesPermissionsContext
    );
  const authObj = useContext<AuthContextType | null>(AuthContext);
  const facilitySettingsObj = useContext<FacilitySettingsContextType | null>(
    FacilitySettingContext
  );
  const permissionObj = useContext<RolesPermissionContextType | null>(
    RolesPermissionContext
  );
  const userProfile = useContext<UserProfileContextType | null>(
    UserProfileContext
  );
  const permissionBtnData = permissionObj?.mappedRolesPermissionData;
  const [showFacilityAdmin, setFacilityAdmin] = useState(false);
  const [showSalesAdmin, setsalesAdmin] = useState(false);
  const [show3mAdmin, set3mAdmin] = useState(false);
  const [facilityAdminArray, setFacilityAdminArray] = useState<string[]>([]);
  const [salesAdminArray, setsalesAdminArray] = useState<string[]>([]);
  const [mAdminArray, set3mAdminArray] = useState<any>([]);

  const history = useHistory();

  useEffect(() => {
    updateadminBtn();
  }, [permissionObj?.mappedRolesPermissionData]);

  const updateadminBtn = () => {
    //facilityAdmin
    if (
      permissionBtnData?.IsAdminFacilitySettingsButton ||
      permissionBtnData?.IsAdminFacilityUsersButton ||
      permissionBtnData?.IsAdminMyListsButton ||
      permissionBtnData?.IsAdminRolesPermissionButton
    ) {
      setFacilityAdmin(true);
      let arr = [];
      if (permissionBtnData?.IsAdminFacilitySettingsButton) {
        arr.push("Facility Settings");
      }
      if (permissionBtnData?.IsAdminFacilityUsersButton) {
        arr.push("Facility Users");
      }
      if (permissionBtnData?.IsAdminMyListsButton) {
        arr.push("My Lists");
      }
      if (permissionBtnData?.IsAdminRolesPermissionButton) {
        arr.push("Roles Permissions");
      }
      setFacilityAdminArray(arr);
    }
    if (
      permissionBtnData?.IsAdminUserAccounts ||
      permissionBtnData?.IsPrdMgrSiteStatus
    ) {
      set3mAdmin(true);

      let arr = [];
      if (permissionBtnData?.IsAdminUserAccounts) {
        const sa = (
          <div className="madminBtnMain">
            User Accounts{" "}
            <span className="madminBtnStyle">
              {" "}
              {authObj?.unLinkedFacilitesCount}
            </span>{" "}
          </div>
        );
        arr.push(sa);
      }
      if (permissionBtnData?.IsPrdMgrSiteStatus) {
        arr.push("Site Status");
      }
      set3mAdminArray(arr);
    }

    if (
      permissionBtnData?.IsSalesMgrHistoryBtn ||
      permissionBtnData?.IsSalesMgrPeopleBtn ||
      permissionBtnData?.IsSalesTerritoriesBtn
    ) {
      setsalesAdmin(true);

      let arr = [];
      if (permissionBtnData?.IsSalesMgrPeopleBtn) {
        arr.push("Salespeople");
      }
      if (permissionBtnData?.IsSalesTerritoriesBtn) {
        arr.push("Territories");
      }
      if (permissionBtnData?.IsSalesMgrHistoryBtn) {
        arr.push("History");
      }

      setsalesAdminArray(arr);
    }
  };

  const redirectToFacilitySetting = () => {
    if (authObj && authObj.registeredFaciltyAddress) {
      facilitySettingsObj?.resetFacilitySettings();
      history.push({
        pathname: "/facilitySettings",
        state: {
          selectedFacility: authObj.registeredFaciltyAddress,
        },
      });
    }
  };

  const redirectToRolePermissions = () => {
    adminRolePermissionsObj?.resetRoleSettings();
    history.push("/administration/rolesPermissions");
  };

  const redirectToManageUsers = () => {
    userProfile?.resetUserProfile();
    history.push("/administration/manageUsers");
  };

  const handleFacilityAdminClick = (e: any) => {
    const { id } = e.target;
    switch (id) {
      case "Facility Settings":
        redirectToFacilitySetting();
        break;
      case "Facility Users":
        redirectToManageUsers();
        break;
      case "Roles Permissions":
        redirectToRolePermissions();
        break;
      default:
        break;
    }
  };

  const handleFacility3mAdminClick = () => {};
  const handleFacilitySalesAdminClick = () => {};

  return (
    <div className="administration">
      <div className="administrationTitle" data-testid="administationTitle">
        Administration
      </div>
      <Grid container className="administration-container-main">
        {showFacilityAdmin && (
          <Grid item>
            <>
              <div
                className="administrationMainTitle"
                data-testid="facilityAdminTitleTest"
              >
                Facility Administration
              </div>
              <p
                className={
                  show3mAdmin && showFacilityAdmin && showSalesAdmin
                    ? "admin-subTitle admin-subTitleWidth"
                    : "admin-subTitle"
                }
                data-testid="facilityAdminDescTest"
              >
                Manage settings specific to the currently selected site.
              </p>
              <AdministrationSettings
                buttonArray={facilityAdminArray}
                handleBtnClick={handleFacilityAdminClick}
              />
            </>
          </Grid>
        )}
        {showSalesAdmin && (
          <Grid item>
            <>
              <div
                className="administrationMainTitle"
                data-testid="3mSalesAdmintitleTest"
              >
                Sales Administration
              </div>
              <p
                className={
                  show3mAdmin && showFacilityAdmin && showSalesAdmin
                    ? "admin-subTitle admin-subTitleWidth"
                    : "admin-subTitle"
                }
                data-testid="3mSalesAdminDescTest"
              >
                Manage settings for the salespeople associated with your region
                or area.
              </p>
              <AdministrationSettings
                buttonArray={salesAdminArray}
                handleBtnClick={handleFacilitySalesAdminClick}
              />
            </>
          </Grid>
        )}
        {show3mAdmin && (
          <Grid item>
            <>
              <div
                className="administrationMainTitle"
                data-testid="3madminTestTitle"
              >
                3MExpress.com Admin
              </div>
              <p
                className={
                  show3mAdmin && showFacilityAdmin && showSalesAdmin
                    ? "admin-subTitle admin-subTitleWidth"
                    : "admin-subTitle"
                }
                data-testid="3madminDescTest"
              >
                Manage settings site-wide for all 3M Express
              </p>
              <AdministrationSettings
                buttonArray={mAdminArray}
                handleBtnClick={handleFacility3mAdminClick}
              />
            </>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default Administration;
