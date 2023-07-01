import { useLocation } from "react-router-dom";
import { getProperty } from "../../util/ObjectFunctions";
import {
  CrossDiv,
  NavigationBarDiv,
  OptionLink,
  OptionLinkActive,
  OptionLinkWrapper,
  StyledMenuOutlinedIcon,
} from "./sideNav.style";
import { ExpressDrawer } from "../../core/drawer/drawer.component";
import { useContext, useEffect, useState } from "react";
import { ReactComponent as Cross } from "../../assets/cross.svg";
import { MobileDisplayContext } from "../../context/MobileDisplayContext";
import { AuthContext, AuthContextType } from "../../context/AuthContext";
import { IAnalyticsData, sendAnalyticsData } from "../../util/utilityFunctions";
import {
  RolesPermissionContext,
  RolesPermissionContextType,
} from "../../context/RolesPermissionContext";

export const SideNav = () => {
  const { isMobileScreen } = useContext(MobileDisplayContext);
  const location = useLocation();
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false);
  const AuthObj = useContext<AuthContextType | null>(AuthContext);
  const permissionObj = useContext<RolesPermissionContextType | null>(
    RolesPermissionContext
  );
  useEffect(() => {}, [AuthObj?.sideNavMenuOptionModelData]);

  const myPatientAnalytics = (eventName: string) => {
    let analyticsData: IAnalyticsData = {
      page_type: "react",
      view_name: "MyPatientComponent",
      event_type: "click",
      event_name: eventName,
      tealium_event: "My_Patient_Dashboard",
      mmmex_userrecordid: AuthObj?.userProfile?.userID!,
      mmmex_facilityid: AuthObj?.registeredFaciltyAddress?.siteUseId!,
      mmmex_roleid: permissionObj?.mappedRolesPermissionData?.roleName!,
      mmmex_pagename: "My Patients",
    };
    sendAnalyticsData(analyticsData);
  };

  const navOptionList = AuthObj?.userRolesAndPermissionLoaded
    ? Object.keys(AuthObj?.sideNavMenuOptionModelData)?.map((x: any) => {
        if (
          getProperty(AuthObj?.sideNavMenuOptionModelData, x).isVisible === true
        ) {
          return location.pathname.includes(`/${x}`) ? (
            <OptionLinkWrapper className="sideNavBar" key={x}>
              <OptionLinkActive to={`/${x}`}>
                {getProperty(AuthObj?.sideNavMenuOptionModelData, x).labelText}
              </OptionLinkActive>
            </OptionLinkWrapper>
          ) : (
            <OptionLinkWrapper className="sideNavBar" key={x}>
              <OptionLink to={`/${x}`} onClick={() => myPatientAnalytics(x)}>
                {getProperty(AuthObj?.sideNavMenuOptionModelData, x).labelText}
              </OptionLink>
            </OptionLinkWrapper>
          );
        }
      })
    : null;

  const desktopSideNav = <NavigationBarDiv>{navOptionList}</NavigationBarDiv>;

  const mobileSideNav = (
    <div onClick={() => setMobileNavOpen((x) => !x)}>
      <StyledMenuOutlinedIcon />
      <ExpressDrawer direction="left" openFlag={mobileNavOpen}>
        <CrossDiv>
          <Cross />
        </CrossDiv>
        {desktopSideNav}
      </ExpressDrawer>
    </div>
  );

  return isMobileScreen ? mobileSideNav : desktopSideNav;
};
