// React imports
import { useContext, useEffect, useState } from "react";
import { Route, useHistory, useLocation, Redirect } from "react-router-dom";
import { Security, LoginCallback } from "@okta/okta-react";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
// Component imports
import Login from "./signIn/Login";
import config from "./config";
import Blank from "./blank/blank.component";
import { Page } from "./components/page/page.component";
import { CMSContent } from "./components/cmsContent/cmsContent.component";
import { Signup } from "./signUp/signup/signup.component";
import { AuthContext } from "./context/AuthContext";
import { HelpAndSupport } from "./components/helpAndSupport/helpAndSupport.component";
import { Header } from "./components/header/header.component";
import { ManageProfile } from "./components/manageProfile/manageProfile.component";
import { ManageAccount } from "./components/manageAccount/manageAccount.component";
import { Navigator } from "./components/helpAndSupport/Navigator/navigator.component";
import SystemRequirements from "./components/systemRequirements/systemReq.components";
import { Registration } from "./signUp/registration/registration.component";
import { SaveSuccessfull } from "./components/authenticateProfile/saveSuccess/saveSuccessfull.component";
import { ForgotCredentialParent } from "./forgotCredentials/forgotPassword/forgotPasswordContainer/forgotCredential.component";
import { ForgotUsername } from "./forgotCredentials/forgotUsername/forgotUsername.component";
import { EmailSent } from "./forgotCredentials/emailSent/emailSent.component";
import { TermsOfUse } from "./components/termsofUse/termsofUse.component";
import CaptchaFail from "./blank/captchFail.component";
import { SSORedirect } from "./sso/ssoRedirect.component";
import PrivateRoute from "./routeHooks/privateRouterAccess";
import { FacilitySettings } from "./components/administration/facilitySettings/facilitySettings.component";
import { Education } from "./components/education/education.component";
import { VideoLibrary } from "./components/education/videoLibrary/videoLibrary.component";
import { InternalUsersManageProfile } from "./components/internalUsersManageProfile/internalusersManageProfile.component";
import { FacilityMode } from "./components/manageProfile/facilityInformation/facility.interface";
import { RolesPermissionContext } from "./context/RolesPermissionContext";
import { searchFacility } from "./components/manageProfile/facilityInformation/addFacility/addFacility.service";
import { mapUserRolesAndPermissionData } from "../src/RolesPermission/RolesPermission.Mapper";
import { FacilityBanner } from "./components/facilityBanner/facilityBanner.component";
import { getUserProfile } from "./util/userService";
import { ProductsAndSolutions } from "./components/productsAndSolutions/productsAndSolutions.component";
import { ProductDetail } from "./components/productsAndSolutions/productDetail/productDetail.component";

const AppWithRouterAccess = () => {
  const {
    isLoggedIn,
    setIsLoggedIn,
    setUserName,
    termsOfUseAccepted,
    setTermsOfUseAccepted,
    isInternalUser,
    registeredFaciltyAddress,
    setuserRolePermissionData,
    setregisteredFaciltyAddress,
    setsideNavMenuOptionModelData,
    setuserRolesAndPermissionLoaded,
    setIsInternalUser,
    userProfile,
    setUserProfile,
    setDeepLinkPath,
    deepLinkPath,
  } = useContext(AuthContext);

  const { mappedRolesPermissionData, setMappedRolesPermissionData } =
    useContext(RolesPermissionContext);
  const [loaderSpinner, setloaderSpinner] = useState(false);
  const history = useHistory();
  const location = useLocation();
  if (deepLinkPath === null && location.pathname !== "/" && (location.pathname.includes("deepLink") || location.pathname.includes("/orders/newOrder"))) {
    setDeepLinkPath(location.pathname)
  }
  const oktaAuth =
    isInternalUser === true
      ? new OktaAuth(config.oidc2)
      : new OktaAuth(config.oidc);

  const onAuthRequired = () => {
    history.push("/");
  };
  useEffect(() => {
    if (
      isLoggedIn &&
      (location.pathname === "/manageProfile" ||
        location.pathname === "/termsOfUse" ||
        location.pathname.includes("/cmsContent"))
    ) {
      getUser();
    }
  }, [isLoggedIn]);
  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri || "", window.location.origin));
  };
  const searchFacilityAddr = async (data) => {
    let linkedFacilities;
    let manualFacilities;
    if (
      (data?.facilities.length > 0 && registeredFaciltyAddress === undefined) ||
      registeredFaciltyAddress?.facilityAddressID === undefined
    ) {
      setuserRolePermissionData(data && data.userPermissions);
      linkedFacilities =
        data && data.facilities.filter((x) => x.mode === FacilityMode.LINKED);
      if (linkedFacilities && linkedFacilities.length < 1) {
        manualFacilities =
          data && data.facilities.filter((x) => x.mode === FacilityMode.MANUAL);
      }
      if (linkedFacilities && linkedFacilities.length > 0) {
        var facilitySearchRequest = {
          customerNumber: linkedFacilities[0].number,
          customerName: "",
          postalCode: "",
        };
        const searchedFacilities = await searchFacility(facilitySearchRequest);

        const facilityRes =
          searchedFacilities &&
          searchedFacilities.filter(
            (x) => x.siteUseId === linkedFacilities[0].siteUseId?.toString()
          )[0];

        let registeredFaciltyAddress = {
          ...facilityRes,
          facilityAddressID: linkedFacilities[0].facilityAddressID,
          careGiverId: linkedFacilities[0].careGiverId,
        };
        setregisteredFaciltyAddress(registeredFaciltyAddress);
        setsideNavMenuOptionModelData((dt) => ({
          ...dt,
          orders: {
            ...dt.orders,
            isVisible: rolesPermissionRes.IsShowStartNewOrder,
          },
          inventory: {
            ...dt.inventory,
            isVisible: rolesPermissionRes.IsShowInventoryOption,
          },
          administration: {
            ...dt.administration,
            isVisible: rolesPermissionRes.IsShowAdminstrationOption,
          },
        }));
        setuserRolesAndPermissionLoaded(true);

        // set Permission
        const rolesPermissionRes = await mapUserRolesAndPermissionData(
          data && data.userPermissions,
          registeredFaciltyAddress?.readyCareFlag
        );
        setMappedRolesPermissionData(rolesPermissionRes);

        setuserRolesAndPermissionLoaded(true);
      } else {
        const rolesPermissionRes = await mapUserRolesAndPermissionData(
          data && data.userPermissions,
          "N"
        );
        setMappedRolesPermissionData(rolesPermissionRes);
        setsideNavMenuOptionModelData((dt) => ({
          ...dt,
          orders: {
            ...dt.orders,
            isVisible: rolesPermissionRes.IsShowStartNewOrder,
          },
          inventory: {
            ...dt.inventory,
            isVisible: rolesPermissionRes.IsShowInventoryOption,
          },
          administration: {
            ...dt.administration,
            isVisible: rolesPermissionRes.IsShowAdminstrationOption,
          },
        }));
        setuserRolesAndPermissionLoaded(true);
      }
    }

    return null;
  };
  const getUser = async () => {
    setloaderSpinner(true);
    const user = await getUserProfile();
    if (user !== undefined) {
      setUserProfile(user);
      await searchFacilityAddr(user);
    } else {
      setloaderSpinner(false);
    }
  };

  const helpSupport = (
    <div className="appWithRouter">
      <div className="helpSectionAtSignup">
        <div className="helpComponent">
          <HelpAndSupport />
        </div>
      </div>
    </div>
  );

  const education = !isLoggedIn ? (
    <div className="appWithRouter">
      <div className="educationAtSignup">
        <div className="educationComponent">
          <Education />
        </div>
      </div>
    </div>
  ) : null;

  const educationVideoLibrary = !isLoggedIn ? (
    <div className="appWithRouter">
      <div className="educationAtSignup">
        <div className="educationComponent">
          <VideoLibrary />
        </div>
      </div>
    </div>
  ) : null;

  const productsAndSolutions = !isLoggedIn ? (
    <div className="appWithRouter">
      <div className="productAndSolutionAtSignup">
        <div className="productAndSolutionComponent">
          <ProductsAndSolutions />
        </div>
      </div>
    </div>
  ) : null;

  const productDetail = !isLoggedIn ? (
    <div className="appWithRouter">
      <div className="productAndSolutionAtSignup">
        <div className="productAndSolutionComponent">
          <ProductDetail />
        </div>
      </div>
    </div>
  ) : null;

  const TermsOfUsehelpSupport =
    isLoggedIn && !termsOfUseAccepted
      ? helpSupport
      : !isLoggedIn || location.pathname === "/ssoRedirect"
        ? helpSupport
        : null;
  const manageProfile = isLoggedIn ? (
    <div className="managedProfileappRouter">
      {mappedRolesPermissionData && !mappedRolesPermissionData.IsBaseRole && (
        <FacilityBanner />
      )}
      <div className="manageProfileAtfterLogin">
        <div className="profileComponent">
          {!isInternalUser && (
            <Navigator
              array={[
                {
                  route: "/home",
                  pageName: "My Patients",
                },
              ]}
              className="manage-profile-route-section"
              title="Manage Profile"
            />
          )}
          <ManageProfile />
        </div>
      </div>
    </div>
  ) : (
    <Route>
      <Redirect to="/" />
    </Route>
  );
  const internalUsersManageProfile = isLoggedIn ? (
    <div className="internal-managedProfileappRouter">
      <div>
        {localStorage.getItem("isComingFromSSO") !== "true" &&
          mappedRolesPermissionData &&
          !mappedRolesPermissionData.IsBaseRole && <FacilityBanner />}
      </div>
      <div className="internal-manageProfileAtfterLogin">
        <div className="internal-profileComponent">
          {<InternalUsersManageProfile />}
        </div>
      </div>
    </div>
  ) : (
    <Route>
      <Redirect to="/" />
    </Route>
  );

  const manageAccount = isLoggedIn ? (
    <div className="managedProfileappRouter">
      <div className="manageProfileAtfterLogin">
        <div className="profileComponent">
          <ManageAccount />
        </div>
      </div>
    </div>
  ) : (
    <Route>
      <Redirect to="/" />
    </Route>
  );

  const success = (
    <div className="managedProfileappRouter">
      <SaveSuccessfull
        returnButtonText={isLoggedIn ? "Return home" : "Login"}
        returnToPath={isLoggedIn ? "/home" : "/"}
      />
    </div>
  );

  const sysreq = isLoggedIn ? null : (
    <div className="appWithRouter">
      <div className="helpSectionAtSignup">
        <div className="helpComponent">
          <SystemRequirements />
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    setTermsOfUseAccepted(false);
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const data = JSON.parse(AuthDetails);
    const accessToken = data?.accessToken;
    if (accessToken) {
      setIsLoggedIn(true);
      setUserName(data.idToken.claims.preferred_username);
    } else {
      setUserName("");
      setIsLoggedIn(false);
    }
    const TermsOfUse = localStorage.getItem("eulaAcceptedDate");
    if (TermsOfUse === "null") {
      setTermsOfUseAccepted(false);
    } else {
      setTermsOfUseAccepted(true);
    }
  }, [location.pathname]);

  return (
    <>
      <Security
        oktaAuth={oktaAuth}
        restoreOriginalUri={restoreOriginalUri}
        onAuthRequired={onAuthRequired}
      >
        {!location.pathname.includes("/forgot") &&
          !location.pathname.includes("/email") && <Header />}
        <Route
          path="/"
          exact
          render={() => (
            <Login issuer={`${process.env.REACT_APP_BASE_URL}oauth2/default`} />
          )}
        />
        <Route path="/education" exact>
          {education}
        </Route>
        <Route path="/education/videoLibrary" exact>
          {educationVideoLibrary}
        </Route>
        <Route path="/productsAndSolutions" exact>
          {productsAndSolutions}
        </Route>
        <Route path="/productsAndSolutions/productDetail" exact>
          {productDetail}
        </Route>
        <Route path="/ssoRedirect" exact component={SSORedirect} />
        <Route path="/termsOfUse" exact component={TermsOfUse} />
        <Route path="/blank" exact component={Blank} />
        <Route path="/botSuspected" exact component={CaptchaFail} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/registration" exact component={Registration} />
        <Route path="/login/callback" component={LoginCallback} />
        <Route path="/cmsContent/:type" component={CMSContent} />
        <Route path="/helpAndSupport">{TermsOfUsehelpSupport}</Route>
        <Route
          path="/facilitySettings"
          exact
          component={FacilitySettings}
        ></Route>
        {termsOfUseAccepted && (
          <Route path="/manageProfile">{manageProfile}</Route>
        )}
        {termsOfUseAccepted && (
          <Route path="/internalUsersManageProfile">
            {internalUsersManageProfile}
          </Route>
        )}
        {termsOfUseAccepted && (
          <PrivateRoute
            path="/manageAccount"
            component={ManageAccount}
          ></PrivateRoute>
        )}
        <Route path="/success">{success}</Route>
        <Route path="/sysreq">{sysreq}</Route>
        <Route path="/forgotPassword" component={ForgotCredentialParent} />
        <Route path="/forgotUsername" component={ForgotUsername} />
        <Route path="/emailSent" component={EmailSent} />
      </Security>
      {termsOfUseAccepted &&
        location.pathname !== "/" &&
        location.pathname !== "/forgotUsername" &&
        location.pathname !== "/signup" &&
        location.pathname !== "/registration" &&
        location.pathname !== "/manageProfile" &&
        location.pathname !== "/internalUsersManageProfile" &&
        location.pathname !== "/manageAccount" &&
        location.pathname !== "/success" &&
        location.pathname !== "/blank" &&
        location.pathname !== "/forgotPassword" &&
        location.pathname !== "/termsOfUse" &&
        !location.pathname.includes("/cmsContent") &&
        location.pathname !== "/botSuspected" &&
        location.pathname !== "/ssoRedirect" &&
        location.pathname !== "/facilitySettings" &&
        location.pathname !== "/emailSent" && <Page />}
    </>
  );
};

export default AppWithRouterAccess;
