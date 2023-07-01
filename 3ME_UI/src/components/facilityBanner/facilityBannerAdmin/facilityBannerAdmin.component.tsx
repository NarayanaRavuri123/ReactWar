import { Grid } from "@mui/material";
import { InputWithLabel } from "../../../core/inputWithLabel/inputWithLabel.component";
import { IFacility } from "../../manageProfile/facilityInformation/facility.interface";
import { ExpressButton } from "../../../core/expressButton/expressButton.component";
import { FacilityDropDown } from "../facilityDropDown.component";
import { useContext, useEffect, useState } from "react";
import { getFcilityAddress } from "../../../util/utilityFunctions";
import {
  RolesPermissionContext,
  RolesPermissionContextType,
} from "../../../context/RolesPermissionContext";
import { useHistory, useLocation } from "react-router-dom";
import { AuthContext, AuthContextType } from "../../../context/AuthContext";
import {
  FacilitySettingContext,
  FacilitySettingsContextType,
} from "../../../context/FacilitySettingsContext";
type Props = {
  userLinkedFacilityData: IFacility[];
  openPopUp?: boolean;
  handlePopUp?: any;
};
export const FacilityBannerAdmin = ({
  userLinkedFacilityData,
  handlePopUp,
}: Props) => {
  const history = useHistory();
  const location = useLocation();
  const permissionObj = useContext<RolesPermissionContextType | null>(
    RolesPermissionContext
  );
  const authObj = useContext<AuthContextType | null>(AuthContext);
  const facilitySettingsObj = useContext<FacilitySettingsContextType | null>(
    FacilitySettingContext
  );

  const handleChangeFacility = () => {
    authObj?.setregisteredFaciltyAddress(undefined);
    authObj?.setIsInternalUserFacilitySelected(false);
    history.push("/ssoRedirect");
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
  const redirectToManageUsers = () => {
    history.push("/administration/manageUsers");
  };

  return (
    <Grid
      item
      xs={12}
      className="facilityBannerAlign"
      data-testid="facilityBannerAlign"
    >
      <InputWithLabel>
        {userLinkedFacilityData.length > 1 && (
          <FacilityDropDown userLinkedFacilityData={userLinkedFacilityData} />
        )}
        {userLinkedFacilityData.length === 1 &&
          !permissionObj?.mappedRolesPermissionData.IsClinicianRole && (
            <div className="facilityBanner-label" data-testid="label-admin">
              {getFcilityAddress(userLinkedFacilityData[0])}
            </div>
          )}
      </InputWithLabel>
      {permissionObj?.mappedRolesPermissionData.IsFacilityAdminRole &&
        permissionObj?.mappedRolesPermissionData.IsManageUsersBtn &&
        location.pathname !== "/administration/manageUsers" && (
          <div
            className="facilityBanner-button"
            data-testid="facilityBanner-button"
          >
            <ExpressButton
              clickHandler={handlePopUp ? handlePopUp : redirectToManageUsers}
              parentClass="manageUsers"
              variant="outlined"
              testId="manage-user-btn"
            >
              Manage Users
            </ExpressButton>
          </div>
        )}
      {(permissionObj?.mappedRolesPermissionData.Is3MAdminRole ||
        permissionObj?.mappedRolesPermissionData.IsSupportRole ||
        permissionObj?.mappedRolesPermissionData.IsProdManagerRole) && (
        <div
          className="facilityBanner-button"
          data-testid="facilityBannerAdmin-button"
        >
          <ExpressButton
            clickHandler={handleChangeFacility}
            parentClass="adminChangeFacility"
            variant="outlined"
            testId="facility-manage-user-btn-change-Facility-admin"
          >
            Change Facility
          </ExpressButton>
          <ExpressButton
            clickHandler={redirectToFacilitySetting}
            parentClass="adminFacilitySetting"
            variant="outlined"
            testId="facility-manage-user-btn-faciltity-admin"
          >
            Facility Settings
          </ExpressButton>
        </div>
      )}
      {(permissionObj?.mappedRolesPermissionData.IsSalesRole ||
        permissionObj?.mappedRolesPermissionData.IsSalesManagerRole) && (
        <div
          className="facilityBanner-button"
          data-testid="facilityBanner-button"
        >
          <ExpressButton
            clickHandler={handleChangeFacility}
            parentClass="salesChangeFacility"
            variant="outlined"
            testId="facility-manage-user-btn-facility-sales"
          >
            Change Facility
          </ExpressButton>
        </div>
      )}
    </Grid>
  );
};
