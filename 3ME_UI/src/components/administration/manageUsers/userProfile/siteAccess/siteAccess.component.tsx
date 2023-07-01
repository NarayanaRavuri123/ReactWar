import "./siteAccess.css";
import {
  IUserFacilityData,
  IUserPermissionsData,
  IUserSiteAccessProps,
} from "../userProfile.interface";
import {
  AuthContextType,
  AuthContext,
} from "../../../../../context/AuthContext";
import { Button, Grid } from "@mui/material";
import { useContext, useEffect } from "react";
import {
  RolesPermissionContext,
  RolesPermissionContextType,
} from "../../../../../context/RolesPermissionContext";
import pluscircle from "../../../../../assets/pluscircle.svg";
import { ImgAddFacility } from "../../../../manageProfile/manageProfile.style";
import { makeCapitalEachWordInString } from "../../../../../util/utilityFunctions";

export const SiteAccess = ({
  facilities,
  setData,
  isAddingNewUser,
  addFacilityButtonClick,
}: IUserSiteAccessProps) => {
  const authObj = useContext<AuthContextType | null>(AuthContext);
  const permissionObj = useContext<RolesPermissionContextType | null>(
    RolesPermissionContext
  );

  const editBtnClick = () => {};

  return (
    <div className="site-access-component" data-testid="site-access-component">
      <h2 className="site-access-header" data-testid="site-access-header">
        Site access
      </h2>
      <Grid
        className="site-access-description-grid-container"
        container
        spacing={2}
      >
        <Grid className="site-access-description-grid-item" item xs={12}>
          <div className="site-access-description-div">
            <p
              className="site-access-description"
              data-testid="site-access-description"
            >
              Choose what content and functionality is available to the user for
              each facility.
            </p>
            {(isAddingNewUser ||
              (authObj &&
                !authObj.isInternalUser &&
                authObj.allFacilities.length > 1) ||
              (authObj &&
                authObj.isInternalUser &&
                permissionObj &&
                permissionObj.mappedRolesPermissionData.Is3MAdminRole &&
                permissionObj.mappedRolesPermissionData.IsSupportRole &&
                permissionObj.mappedRolesPermissionData.IsProdManagerRole)) && (
              <div className="add-facility-div">
                <Button
                  className="add-facility"
                  onClick={addFacilityButtonClick}
                  startIcon={
                    <ImgAddFacility
                      src={pluscircle}
                      data-testid="addFacility-button"
                    />
                  }
                >
                  Add Facility
                </Button>
              </div>
            )}
          </div>
        </Grid>
      </Grid>
      {Array.isArray(facilities) &&
        facilities.map((facility: IUserFacilityData, index: number) => {
          return (
            <Grid
              className="site-access-card-grid-conatainer"
              container
              spacing={2}
            >
              <Grid className="site-access-card-grid-item" item xs={6}>
                <div className="edit-facility-address">
                  <Button
                    classes={{ root: "site-access-edit" }}
                    data-testid="site-access-edit"
                    onClick={editBtnClick}
                  >
                    Edit
                  </Button>
                  <div className="facility-address-div">
                    <p
                      className="facility-address"
                      data-testid="site-access-facility-name"
                    >
                      <span className="facility-name">
                        {makeCapitalEachWordInString(facility.accountName)}
                      </span>
                      #{facility.accountNumber}
                    </p>
                    <p
                      className="facility-address"
                      data-testid="site-access-facility-address"
                    >
                      {`${makeCapitalEachWordInString(facility.address1)},${
                        facility.address2
                          ? ` ${makeCapitalEachWordInString(
                              facility.address2
                            )},`
                          : " "
                      } ${makeCapitalEachWordInString(facility.city)}, ${
                        facility.state
                      } ${facility.zip}`}
                    </p>
                  </div>
                </div>
              </Grid>
              <Grid className="site-access-card-grid-item" item xs={6}>
                <div className="site-access-role-permission-status">
                  <div className="role-permission-status">
                    <p className="site-access-card-title">Role</p>
                    <p className="site-access-card-value">
                      {makeCapitalEachWordInString(facility.userRole)}
                    </p>
                  </div>
                  <div className="role-permission-status">
                    <p className="site-access-card-title">Permissions</p>
                    <p className="site-access-card-value">
                      {`${
                        facility.permissions && facility.permissions.length > 0
                          ? `${
                              facility.enabledPermissionsCount
                                ? facility.enabledPermissionsCount
                                : 0
                            } of ${facility.permissions.length} enabled`
                          : "--"
                      }`}
                    </p>
                  </div>
                  <div className="role-permission-status">
                    <p className="site-access-card-title">Status</p>
                    <p
                      className={`site-access-card-value${
                        facility.status === "Active" ? " active" : " not-active"
                      }`}
                    >
                      {facility.status}
                    </p>
                  </div>
                </div>
              </Grid>
            </Grid>
          );
        })}
    </div>
  );
};
