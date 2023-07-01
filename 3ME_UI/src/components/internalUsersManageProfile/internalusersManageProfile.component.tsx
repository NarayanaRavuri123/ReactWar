import "./internalUsersManageProfile.css";
import React, { useState, useEffect, useContext } from "react";
import {
  INTERNAL_SALES_MGR_ROLE_TEXT,
  INTERNAL_SALES_ROLE_TEXT,
} from "../../util/staticText";
import { getUserProfile } from "../../util/userService";
import { AuthContext, AuthContextType } from "../../context/AuthContext";
import { LoadingSpinner } from "../../core/loader/LoadingSpinner";
import { useHistory } from "react-router-dom";
import {
  RolesPermissionContextType,
  RolesPermissionContext,
} from "../../context/RolesPermissionContext";
import InternalUserContact from "../manageProfile/contactInformationManageProfile/internalContactInformationSection/internalContactNonEdit.component";
import { SalesRoleManageProfile } from "../manageProfile/salesRoleManageProfile/salesRoleManageProfile.component";
import AddInternalUserFooterButtonGroup from "../manageProfile/salesRoleManageProfile/addInternalUserFooterButtonGroup/addInternalUserFooterButtonGroup.component";
import { FacilityBanner } from "../facilityBanner/facilityBanner.component";

export const InternalUsersManageProfile = () => {
  const history = useHistory();
  const permissionObj = useContext<RolesPermissionContextType | null>(
    RolesPermissionContext
  );
  const authObj = useContext<AuthContextType | null>(AuthContext);
  const [loaderSpinner, setloaderSpinner] = useState(false);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    setloaderSpinner(true);
    const user = await getUserProfile();
    if (user !== undefined) {
      if (user.departmentName === "Internal" && !authObj?.isInternalUser) {
        authObj?.setIsInternalUser(true);
        const AuthDetails = sessionStorage.getItem("okta-token-storage");
        const data = JSON.parse(AuthDetails ?? "");
        const idToken = data.idToken;

        if (idToken.claims.groups) {
          let group = "";
          group = idToken.claims.groups[0];

          if (
            (group && group.includes("KCI-App-Access-DWC3MExpressSales")) ||
            group.includes("KCI-App-Access-DWC3MExpressSalesMgr")
          ) {
            permissionObj?.setMappedRolesPermissionData({
              ...permissionObj.mappedRolesPermissionData,
              IsSalesManagerRole:
                group.toLowerCase() === INTERNAL_SALES_MGR_ROLE_TEXT
                  ? true
                  : false,
              IsSalesRole:
                group.toLowerCase() === INTERNAL_SALES_ROLE_TEXT ? true : false,
            });
          }
        }

        if (localStorage.getItem("isComingFromSSO") !== "true") {
          history.push("/ssoRedirect");
        }
        authObj?.setUserProfile(user);
      }
      setloaderSpinner(false);
    } else {
      setloaderSpinner(false);
    }
  };

  return (
    <>
      <div className="internalUser-MP-page" data-testid="internalUser-MP-page">
        {loaderSpinner ? (
          <div className="internal-manageProfile-loading">
            <div className="internal-manageProfile-spinner">
              <LoadingSpinner />
            </div>
          </div>
        ) : (
          <div
            className="internalUser-manage-profile"
            data-testid="internalUser-manage-profile"
          >
            {authObj && authObj.isInternalUser && (
              <div>
                <div className="internalUser-mp">
                  <h2
                    className="internalUser-mp-title"
                    data-testid="internalUser-mp-title"
                  >
                    View User Profile
                  </h2>
                  <div className="internalUser-mp-contact">
                    <h2
                      className="internalUser-mp-contact"
                      data-testid="internalUser-mp-contact"
                    >
                      Contact information
                    </h2>
                  </div>

                  <InternalUserContact data={authObj?.userProfile} />

                  {(permissionObj?.mappedRolesPermissionData?.IsSalesRole ||
                    permissionObj?.mappedRolesPermissionData
                      .IsSalesManagerRole) && (
                    <>
                      <div>
                        <SalesRoleManageProfile />
                      </div>
                    </>
                  )}
                </div>

                <AddInternalUserFooterButtonGroup />
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};
