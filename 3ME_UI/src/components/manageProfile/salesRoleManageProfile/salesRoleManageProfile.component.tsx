import { useContext, useEffect } from "react";
import "./salesRoleManageProfile.css";
import moment from "moment";
import AddInternalUserFooterButtonGroup from "./addInternalUserFooterButtonGroup/addInternalUserFooterButtonGroup.component";
import { Box } from "@mui/material";
import { AuthContextType, AuthContext } from "../../../context/AuthContext";
import {
  ProfileFormContextType,
  ProfileFormContext,
} from "../../../context/ProfileFormContext";
import {
  RolesPermissionContextType,
  RolesPermissionContext,
} from "../../../context/RolesPermissionContext";
import { getSalesTerritories } from "../../../util/userService";

export const SalesRoleManageProfile = () => {
  const AuthObj = useContext<AuthContextType | null>(AuthContext);
  const permissionObj = useContext<RolesPermissionContextType | null>(
    RolesPermissionContext
  );
  const profileForm = useContext<ProfileFormContextType | null>(
    ProfileFormContext
  );

  useEffect(() => {
    if (AuthObj?.userProfile && !profileForm?.territoryData) {
      getSalesRoleTerritories();
    }
  }, [AuthObj?.userProfile]);

  const getSalesRoleTerritories = async () => {
    const salesTerritories = await getSalesTerritories(
      AuthObj?.userProfile?.userName
    );

    if (salesTerritories) {
      profileForm?.setTerritoryData(salesTerritories);
    }
  };

  return (
    <>
      <div className="salesManage-profile-main">
        {permissionObj?.mappedRolesPermissionData.IsSalesRole && (
          <Box>
            <div
              className="salesManage-profile"
              data-testid="salesManage-profile"
            >
              <div className="salesManage-profile-territory">
                <h2
                  className="salesManage-profile-territory"
                  data-testid="salesManage-profile-territory"
                >
                  Sales Territories
                </h2>
              </div>

              {profileForm?.territoryData &&
                profileForm?.territoryData.map((item: any, ix: any) => (
                  <div
                    className="salesTerritory-container"
                    data-testid="salesTerritory-container"
                  >
                    <div
                      className="salesRoleNameLable"
                      data-testid="salesRoleNameLable"
                    >
                      Role
                      {profileForm && (
                        <div
                          className="salesRoleName"
                          data-testid="salesRoleName"
                        >
                          {item.roleType}
                        </div>
                      )}
                    </div>

                    <div
                      className="salesRegionCodeLable"
                      data-testid="salesRegionCodeLable"
                    >
                      <div className="salesRegionCodeLable">
                        Region code
                        {profileForm && (
                          <div
                            className="salesRegionCodeName"
                            data-testid="salesRegionCodeName"
                          >
                            {item.regionDistrict}
                          </div>
                        )}
                      </div>

                      <div
                        className="salesAssignmentLable"
                        data-testid="salesAssignmentLable"
                      >
                        Assignment Dates
                        {profileForm && (
                          <div
                            className="salesAssignmentDates"
                            data-testid="salesAssignmentDates"
                          >
                            {item.assignedTo
                              ? moment(item.assignedTo).format("MM/DD/YYYY")
                              : null}
                          </div>
                        )}
                      </div>
                    </div>
                    <div
                      className="salesTerritoryCodeNameLable"
                      data-testid="salesTerritoryCodeNameLable"
                    >
                      Territory code & Name
                      {profileForm && (
                        <div>
                          <div
                            className="salesTerritoryName"
                            data-testid="salesTerritoryName"
                          >
                            {item.code}
                          </div>
                          <div className="salesTerritoryName">{item.name}</div>
                        </div>
                      )}
                    </div>
                    {profileForm && (
                      <div>
                        <div className="salesIsPrimary">
                          {item.isPrimary === true ? "Primary Territory" : ""}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </Box>
        )}

        <div>
          {permissionObj?.mappedRolesPermissionData.IsSalesManagerRole && (
            <Box>
              <div>
                <div className="salesManage-profile-territory">
                  <h2
                    className="salesManage-profile-territory"
                    data-testid="salesManage-profile-territory"
                  >
                    Sales Region
                  </h2>
                </div>
                {profileForm?.territoryData &&
                  profileForm?.territoryData.map((item: any, ix: any) => (
                    <div className="salesMgrRegionCodeLable">
                      Region code
                      {profileForm && (
                        <div
                          className="salesRegionCodeName"
                          data-testid="salesRegionCodeName"
                        >
                          {item.regionDistrict}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </Box>
          )}
        </div>
      </div>
    </>
  );
};
