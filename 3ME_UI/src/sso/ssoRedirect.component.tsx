import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { OAuthResponseType, OktaAuth, TokenParams } from "@okta/okta-auth-js";
import config from "../config";
import { LoadingSpinner } from "../core/loader/LoadingSpinner";
import "./ssoRedirect.css";
import { AuthContext, AuthContextType } from "../context/AuthContext";
import { addOrUpdateInternalUser } from "../util/userService";
import { SearchFacilityDataBase } from "./searchFacilities/searchFacilities.component";
import {
  INTERNAL_SALES_MGR_ROLE_TEXT,
  INTERNAL_SALES_ROLE_TEXT,
  SVC_GET_ADDORUPDATEINTERNALUSER,
} from "../util/staticText";
import { TerritorySalesAndNonSales } from "./sales/territoryDropDown.component";
import {
  RolesPermissionContext,
  RolesPermissionContextType,
} from "../context/RolesPermissionContext";
import { getUnlinkedFacilitesCount } from "../util/3meService";

export const SSORedirect = () => {
  const AuthObj = useContext<AuthContextType | null>(AuthContext);
  const oktaAuth = new OktaAuth(config.oidc2);
  const location = useLocation();
  const [loader, setLoader] = useState(true);
  const [salesRole, setSalesRole] = useState(false);
  const permissionObj = useContext<RolesPermissionContextType | null>(
    RolesPermissionContext
  );

  useEffect(() => {
    if (
      location.pathname.includes("/ssoRedirect") &&
      (AuthObj?.updateInternalUser === undefined || !AuthObj.updateInternalUser)
    ) {
      AuthObj?.setIsInternalUser(true);
      AuthObj?.setIsInternalUserFacilitySelected(false);
      oktaAuth.session.get().then(function (session: any) {
        let group = "";
        const responseType: OAuthResponseType[] = ["id_token", "token"];
        const tokenParams: TokenParams = {
          responseType: responseType, // or array of types
          sessionToken: session.id, // optional if the user has an existing Okta session
        };
        oktaAuth?.token
          ?.getWithoutPrompt(tokenParams)
          .then(function (res: any) {
            var tokens = res.tokens;
            AuthObj?.setUserName(tokens.idToken.claims.preferred_username); // Do something with tokens, such as
            oktaAuth.tokenManager.add("idToken", tokens.idToken!);
            oktaAuth.tokenManager.add("accessToken", tokens.accessToken!);
            AuthObj?.setIsLoggedIn(true);
            oktaAuth.getUser().then((user: any) => {
              if (user.groups) {
                group = user.groups[0];
              }
              if (group && group.includes("KCI-App-Access-DWC3MExpressSales")) {
                setSalesRole(true);
                permissionObj?.setMappedRolesPermissionData({
                  ...permissionObj.mappedRolesPermissionData,
                  IsSalesManagerRole:
                    group.toLowerCase() === INTERNAL_SALES_MGR_ROLE_TEXT
                      ? true
                      : false,
                  IsSalesRole:
                    group.toLowerCase() === INTERNAL_SALES_ROLE_TEXT
                      ? true
                      : false,
                });
              }
              if (
                (group && group.includes("KCI-App-Access-DWC3MExpressAdmin")) ||
                (group &&
                  group.includes("KCI-App-Access-DWC3MExpressPrdMgr")) ||
                (group && group.includes("KCI-App-Access-DWC3MExpressSupport"))
              ) {
                getUnlinkedFacilitesCount().then((x) => {
                  if (x.succeeded) {
                    AuthObj?.setUnLinkedFacilityCount(x.data);
                  }
                });
              }
              let reqBody = {
                userName: tokens.idToken.claims.preferred_username,
                firstName: user.given_name,
                lastName: user.family_name,
                EmailAddress: user.email,
                PhoneNo: user.phone_number,
                EmployeeID: user.employeeNumber,
                Group: group,
              };
              addOrUpdateInternlaUserService(reqBody);
            });
            AuthObj?.setUpdateInternalUser(true);
          })
          .catch(function (err) {
            console.log(err);
            window.location.href = `${process.env.REACT_APP_INTERNAL_SSO_URL}`;
            // handle OAuthError or AuthSdkError (AuthSdkError will be thrown if app is in OAuthCallback state)
          });
      });
    } else {
      if (!AuthObj?.isLoggedIn) {
        AuthObj?.setIsInternalUser(false);
      }
      if (
        permissionObj?.mappedRolesPermissionData.IsSalesRole ||
        permissionObj?.mappedRolesPermissionData.IsSalesManagerRole
      ) {
        setSalesRole(true);
      }
      setLoader(false);
    }
  }, [location.pathname]);

  const addOrUpdateInternlaUserService = async (reqBody: any) => {
    const userDetails = await addOrUpdateInternalUser(
      reqBody,
      SVC_GET_ADDORUPDATEINTERNALUSER
    );
    if (userDetails && userDetails.succeeded && userDetails.data !== null) {
      AuthObj?.setUserProfile(userDetails.data);
      setLoader(false);
    } else {
      console.log("Error in fetching user");
      setLoader(false);
    }
  };

  const freshNewOrderSpinner = () => {
    return (
      <div className="ssoNew-spinner">
        <LoadingSpinner />
      </div>
    );
  };

  return (
    <div className="selectfacility-main">
      {loader ? (
        freshNewOrderSpinner()
      ) : (
        <>
          <div className="selectFacility-subMain">
            <h2 className="selectfacility-title">Select a Facility</h2>
            {salesRole ? (
              <TerritorySalesAndNonSales salesRole={salesRole} />
            ) : (
              <SearchFacilityDataBase salesRole={salesRole} />
            )}
          </div>
        </>
      )}
    </div>
  );
};
