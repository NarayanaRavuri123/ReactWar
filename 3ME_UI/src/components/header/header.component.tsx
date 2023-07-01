import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/headerlogo.svg";
import { ReactComponent as Line } from "../../assets/line.svg";
import { ReactComponent as KeyboardArrowDown } from "../../assets/KeyboardArrowDown.svg";
import { ReactComponent as VectorBlue } from "../../assets/VectorBlue.svg";
import { Grid, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { AuthContext, AuthContextType } from "../../context/AuthContext";
import { MobileDisplayContext } from "../../context/MobileDisplayContext";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import "./header.css";
import { useOktaAuth } from "@okta/okta-react";
import {
  ProfileFormContext,
  ProfileFormContextType,
} from "../../context/ProfileFormContext";
import { IDLETIME, IDLEPOPTIMER } from "../../util/staticText";
import { IdleTimeoutModal } from "../../IdleTimeout/idleTimeOutModal.component";

import { IdleTimerProvider } from "react-idle-timer";
import {
  NewOrderContext,
  NewOrderContextType,
} from "../../context/NewOrderContext";
import { NewOrderPageSection } from "../newOrder/NewOrderContainer.enum";
import { UnlockVacOrder } from "../../util/vacOrderService";

import {
  OrderDetailContext,
  OrderDetailContextType,
} from "../../context/OrderDetailsContext";
import {
  RolesPermissionContextType,
  RolesPermissionContext,
} from "../../context/RolesPermissionContext";

export const Header = () => {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const AuthObj = useContext<AuthContextType | null>(AuthContext);
  const userName = AuthObj?.userName;
  const isLoggedIn = AuthObj?.isLoggedIn;
  const termsOfUseAccepted = AuthObj?.termsOfUseAccepted;
  const history = useHistory();
  const location = useLocation();
  const open = Boolean(anchorEl);
  const loginPath = "/";
  const signUpPath = "/signup";
  const helpPath = "/helpAndSupport";
  const manageProfile = "/manageProfile";
  const internalUsersManageProfile = "/internalUsersManageProfile";
  const manageAccount = "/manageAccount";
  const { oktaAuth, authState } = useOktaAuth();
  const NewOrderObj = useContext<NewOrderContextType | null>(NewOrderContext);
  const [previousPath, setPreviousPath] = useState<string | null>(null);
  const [currentPath, setCurrentPath] = useState<string | null>(null);
  const profileForm = useContext<ProfileFormContextType | null>(
    ProfileFormContext
  );
  const orderOverViewObj = useContext<OrderDetailContextType | null>(
    OrderDetailContext
  );
  const permissionObj = useContext<RolesPermissionContextType | null>(
    RolesPermissionContext
  );
  let [timeout, setTimeout1] = useState(IDLETIME); //dev
  const [timer, setTimer] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  const handleMenu = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setAnchorEl(event.currentTarget as Element);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const redirectToManageProfile = () => {
    if (currentPath === "/ssoRedirect") {
      localStorage.setItem("isComingFromSSO", "true");
    }
    setAnchorEl(null);
    history.push({
      pathname: !AuthObj?.isInternalUser
        ? manageProfile
        : internalUsersManageProfile,
    });
  };

  const redirectToManageAccount = () => {
    setAnchorEl(null);
    history.push(manageAccount);
  };

  useEffect(() => {
    if (location.pathname !== currentPath) {
      setCurrentPath(location.pathname);
    }
    if (currentPath === "/orders/newOrder" && NewOrderObj?.vacOrderID) {
      UnlockVacOrder(NewOrderObj?.vacOrderID);
      NewOrderObj?.resetNewOrderForm();
    }
    if (location.pathname !== "/home/orderOverview") {
      orderOverViewObj?.resetData();
      orderOverViewObj?.resetSeletedSupplyOrderData();
      orderOverViewObj?.resetWoundData();
    }
  }, [location.pathname]);
  const confirmLogout = async () => {
    if (
      NewOrderObj?.vacOrderID &&
      (NewOrderObj?.newOrderPage ===
        NewOrderPageSection.NEWORDER_PATIENT_INFO ||
        NewOrderObj?.newOrderPage ===
          NewOrderPageSection.NEWORDER_PATIENT_WOUND_INFO ||
        NewOrderObj?.newOrderPage === NewOrderPageSection.NEWORDER_REVIEW_ORDER)
    ) {
      UnlockVacOrder(NewOrderObj?.vacOrderID);
    }
    setAnchorEl(null);
    localStorage.clear();
    AuthObj?.setUserProfile(undefined);
    AuthObj?.setDeepLinkPath(null);
    await oktaAuth.signOut();
  };

  const clearData = () => {
    profileForm?.resetProfileForm();
  };
  const onPrompt = () => {
    if (oktaAuth) {
      if (authState?.isAuthenticated!) {
        setShowModal(true);
      }
    }
  };

  const idleTime = () => {
    if (oktaAuth) {
      if (authState?.isAuthenticated!) {
        setShowModal(false);
        confirmLogout();
      }
    }
  };

  useEffect(() => {
    if (oktaAuth && authState?.isAuthenticated) {
      oktaAuth.getUser().then((info) => {
        AuthObj?.setUserName(info.name);
      });
    }
  }, [AuthObj]);

  const handleCloseIdle = async () => {
    setShowModal(false);
    clearTimeout(timer);
  };

  const handleLogout = async () => {
    setShowModal(false);
    clearTimeout(timer);
    confirmLogout();
    AuthObj?.setDeepLinkPath(null);
  };

  return (
    <>
      <MobileDisplayContext.Consumer>
        {({ isMobileScreen }) => (
          <Grid container className="headerContainer">
            <Grid
              item
              className={
                AuthObj?.isLoggedIn ? "appLogo" : "appLogo appLoginLogo"
              }
            >
              <Logo />
              <Line className="line" />
              <div className="appName">Express Therapy Portal</div>
            </Grid>
            <Grid item className="appHelp">
              <Link
                className={
                  !location.pathname.includes(helpPath) ? "help" : "helpactive"
                }
                to={helpPath}
              >
                {isMobileScreen ? "Help" : "Help & Support"}
              </Link>
              {userName &&
                location.pathname !== signUpPath &&
                location.pathname !== loginPath && (
                  <div
                    className={
                      location.pathname !== manageProfile
                        ? "login"
                        : "loginactive"
                    }
                  >
                    <Typography
                      classes={{
                        root:
                          location.pathname !== manageProfile
                            ? "userNameStyle"
                            : " userNameStyle userNameStyleActive",
                      }}
                      className="userstyle"
                    >
                      {isMobileScreen ? "" : userName}
                    </Typography>
                    <IconButton
                      className="dropArrow"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={(event) => handleMenu(event)}
                      color="inherit"
                      sx={{ height: "9px" }}
                    >
                      {isMobileScreen ? (
                        <AccountCircleOutlinedIcon />
                      ) : location.pathname === manageProfile ? (
                        <VectorBlue width="18" height="9" />
                      ) : (
                        <KeyboardArrowDown width="18" height="9" />
                      )}
                    </IconButton>
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={open}
                      onClose={handleClose}
                      sx={{
                        top: "40px",
                      }}
                      classes={{
                        paper: "paperstyle",
                      }}
                    >
                      <MenuItem
                        disabled={!termsOfUseAccepted}
                        className="manageprofile"
                        classes={{
                          root: "typostyle",
                        }}
                        onClick={redirectToManageProfile}
                      >
                        Manage Profile
                      </MenuItem>

                      {permissionObj?.mappedRolesPermissionData
                        ?.IsShowManageAccountMenu && (
                        <MenuItem
                          disabled={!termsOfUseAccepted}
                          className="manageprofile"
                          classes={{
                            root: "typostyle typoStyle3",
                          }}
                          onClick={redirectToManageAccount}
                        >
                          Manage Account
                        </MenuItem>
                      )}

                      <MenuItem
                        className="manageprofile"
                        classes={{
                          root: "typostyle typoStyle2",
                        }}
                        onClick={confirmLogout}
                      >
                        Log Out
                      </MenuItem>
                    </Menu>
                  </div>
                )}
              {!userName &&
                !isLoggedIn &&
                location.pathname !== loginPath &&
                location.pathname !== "/ssoRedirect" && (
                  <Link
                    className={"loginLabelactive"}
                    data-testid="login"
                    onClick={clearData}
                    to={loginPath}
                  >
                    Login
                  </Link>
                )}

              <IdleTimerProvider
                timeout={timeout}
                onIdle={idleTime}
                promptBeforeIdle={IDLEPOPTIMER}
                onPrompt={onPrompt}
              >
                {showModal && (
                  <IdleTimeoutModal
                    showModal={showModal}
                    handleLogout={handleLogout}
                    setShowModal={setShowModal}
                    confirmLogout={confirmLogout}
                  />
                )}
              </IdleTimerProvider>
            </Grid>
          </Grid>
        )}
      </MobileDisplayContext.Consumer>
    </>
  );
};
