import { useContext, useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import OktaSignInWidget from "./OktaSignInWidget";
import { useOktaAuth } from "@okta/okta-react";
import { Grid } from "@mui/material";
import "./okta.css";
import "./oktaSmall.css";
import "./login.css";
import { AuthContext } from "../context/AuthContext";
import { MobileDisplayContext } from "../context/MobileDisplayContext";
import { getUser } from "../util/userService";
import { getCMSContent } from "../util/cmsService";
import { LoadingSpinner } from "../core/loader/LoadingSpinner";
import { SVC_GET_USER } from "../util/staticText";
import { USER_ROLE_BASE } from "../util/PermissionName";
import { searchFacility } from "../components/manageProfile/facilityInformation/addFacility/addFacility.service";
import { FacilityMode } from "../components/manageProfile/facilityInformation/facility.interface";
import { mapUserRolesAndPermissionData } from "../RolesPermission/RolesPermission.Mapper";
import Carousel from "react-material-ui-carousel";
import { RolesPermissionContext } from "../context/RolesPermissionContext";
import { getDeepClone } from "../util/ObjectFunctions";
import VideoDialog from "../components/helpAndSupport/faq/VideoDialog";
import { getWoundProducts } from "../util/productsManagerService";
import { Popup } from "../core/popup/popup.component";
import { OrderDetailContext } from "../context/OrderDetailsContext";
import { checkDeeplinkPath } from "./deeplinkHandler";

const Login = ({ config }) => {
  const history = useHistory();
  const [effectiveDate, setEffectiveDate] = useState("");
  const [modules, setModules] = useState();
  const [showWidget, setShowWidget] = useState(false);
  const [banners, setBanners] = useState();
  const { oktaAuth, authState } = useOktaAuth();
  const [open, setOpen] = useState(false);
  const [video, setVideo] = useState();
  const [api, setApi] = useState([]);
  const [getProductDetailLoader, setGetProductDetailLoader] = useState(false);
  const [calledGetDeepLink, setCalledGetDeepLink] = useState(false);

  const {
    setIsLoggedIn,
    setUserName,
    setUserProfile,
    setTermsOfUseAccepted,
    setregisteredFaciltyAddress,
    registeredFaciltyAddress,
    setpreferredUserName,
    setTerms,
    isLoading,
    setIsLoading,
    setuserRolePermissionData,
    sideNavMenuOptionModelData,
    setsideNavMenuOptionModelData,
    setuserRolesAndPermissionLoaded,
    isInternalUser,
    deepLinkPath,
  } = useContext(AuthContext);

  const { isMobileScreen } = useContext(MobileDisplayContext);

  const { setMappedRolesPermissionData } = useContext(RolesPermissionContext);
  const orderDetailObj = useContext(OrderDetailContext);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const widthResizer = () => {
    var width = window.innerWidth;
    setScreenWidth(width);
  };

  useEffect(() => {
    getCMSContent("SignIn").then((content) => {
      if (content.item) {
        setModules(content.item.modules);
        setBanners(content.item.banners);
      }
      setShowWidget(true);
    });
    // Getting the width of the browser whenever the screen resolution changes.
    window.addEventListener("resize", widthResizer);
    // Getting the width of the browser on load
    widthResizer();
    // 👇️ Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", widthResizer);
    };
  }, []);

  const onSuccess = (tokens) => {
    oktaAuth.handleLoginRedirect(tokens);
  };

  const onError = (err) => {
    console.log("Sign in error:", err);
  };

  if (!authState) {
    return <div>Loading ... </div>;
  }

  const searchFacilityAddr = async (data) => {
    let tempSideNavMenuOption = getDeepClone(sideNavMenuOptionModelData);
    let readyCareFlag = "N";
    if (data?.facilities.length > 0 && registeredFaciltyAddress === undefined) {
      const linkedFacilities = data.facilities.filter(
        (x) => x.mode === FacilityMode.LINKED
      );
      if (linkedFacilities.length > 0) {
        const linkedFacility = linkedFacilities[0];
        var facilitySearchRequest = {
          customerNumber: linkedFacility.number,
          customerName: "",
          postalCode: "",
        };
        const searchedFacilities = await searchFacility(facilitySearchRequest);
        if (searchedFacilities) {
          const facilityRes = searchedFacilities.filter((x) => {
            if (
              linkedFacility.siteUseId &&
              x.siteUseId === linkedFacility.siteUseId.toString()
            ) {
              return x;
            }
          })[0];
          let registeredFaciltyAddress = {
            ...facilityRes,
            facilityAddressID: linkedFacilities[0].facilityAddressID,
            careGiverId: linkedFacilities[0].careGiverId,
          };
          readyCareFlag = registeredFaciltyAddress.readyCareFlag;
          setregisteredFaciltyAddress(registeredFaciltyAddress);
          const rolesPermissionRes = await mapUserRolesAndPermissionData(
            data.userPermissions,
            readyCareFlag
          );
          setMappedRolesPermissionData(rolesPermissionRes);

          tempSideNavMenuOption = {
            ...sideNavMenuOptionModelData,
            orders: {
              labelText: "Start New Order",
              isVisible: rolesPermissionRes.IsShowStartNewOrder,
            },
            inventory: {
              labelText: "Inventory",
              isVisible: rolesPermissionRes.IsShowInventoryOption,
            },
            administration: {
              labelText: "Administration",
              isVisible: rolesPermissionRes.IsShowAdminstrationOption,
            },
          };

          setuserRolesAndPermissionLoaded(true);
        }
      } else {
        const rolesPermissionRes = await mapUserRolesAndPermissionData(
          data.userPermissions,
          "N"
        );
        setMappedRolesPermissionData(rolesPermissionRes);

        tempSideNavMenuOption = {
          ...sideNavMenuOptionModelData,
          orders: {
            labelText: "Start New Order",
            isVisible: rolesPermissionRes.IsShowStartNewOrder,
          },
          inventory: {
            labelText: "Inventory",
            isVisible: rolesPermissionRes.IsShowInventoryOption,
          },
          administration: {
            labelText: "Administration",
            isVisible: rolesPermissionRes.IsShowAdminstrationOption,
          },
          orders: {
            ...sideNavMenuOptionModelData.orders,
            isVisible:
              data.userPermissions.userRole === USER_ROLE_BASE ? false : true,
          },
        };
        setuserRolesAndPermissionLoaded(true);
      }
    }

    setsideNavMenuOptionModelData(tempSideNavMenuOption);
  };

  const getLegalCMS = () => {
    getCMSContent("Legal").then((content) => {
      if (content.item !== undefined) {
        setTerms(content.item.data);
        setEffectiveDate(content.item.effectiveDate);
      } else setTerms(content);
    });
  };

  const getDeeplinkPath = async (staticPath) => {
    if (deepLinkPath === null) {
      return await staticPath;
    } else {
      if (!calledGetDeepLink) {
        setCalledGetDeepLink(true)
        return await checkDeeplinkPath(deepLinkPath, orderDetailObj);
      }
    } return null
  };

  const getOktaUser = async () => {
    getLegalCMS();
    if (!isLoading && !isInternalUser) {
      setIsLoading(true);
      setIsLoggedIn(true);
      const user = await oktaAuth.getUser();
      setUserName(user.name);
      setpreferredUserName(user.preferred_username);
      const getEulaDate = await getUser(user.preferred_username, SVC_GET_USER);
      if (getEulaDate !== undefined && getEulaDate.data !== null) {
        localStorage.setItem(
          "eulaAcceptedDate",
          getEulaDate.data.eulaAcceptedDate
        );
        setUserProfile(getEulaDate.data);
        setuserRolePermissionData(getEulaDate.data.userPermissions);

        await searchFacilityAddr(getEulaDate.data);
        if (
          getEulaDate.data.eulaAcceptedDate !== null ||
          getEulaDate.data.eulaAcceptedDate !== ""
        ) {
          const sa = effectiveDate.split("T");
          const formatYmd = sa[0].replace(/(\d{4})(\d{2})(\d{2})/g, "$1-$2-$3");

          if (
            getEulaDate.data.eulaAcceptedDate === null ||
            new Date(formatYmd) >= new Date(getEulaDate.data.eulaAcceptedDate)
          ) {
            setIsLoading(false);
            history.replace("/termsOfUse");
            setTermsOfUseAccepted(false);
          } else {
            setIsLoading(false);
            history.replace(await getDeeplinkPath("/home"));
            setTermsOfUseAccepted(true);
          }
        } else {
          setIsLoading(false);
          history.replace(await getDeeplinkPath("/home"));
          setTermsOfUseAccepted(true);
        }
      } else {
        setIsLoading(false);
        history.replace(await getDeeplinkPath("/home"));
        setTermsOfUseAccepted(true);
      }
    } else {
      history.replace(await getDeeplinkPath("/home"));
      setTermsOfUseAccepted(true);
    }
  };

  const openModulePage = (item) => {
    switch (item.LabelText) {
      case "Education":
        history.push("/education");
        break;
      case "Products & Solutions":
        history.push("/productsAndSolutions");
        break;
      default:
        break;
    }
  };

  const spinner = () => {
    return (
      <div className="login-loader">
        <LoadingSpinner />
      </div>
    );
  };

  const signin = () => {
    const handleClick = async (item) => {
      if (item.CTALaunch === "2") {
        window.open(item.CTALink);
      }
      if (item.CTALaunch === "1") {
        try {
          setGetProductDetailLoader(true);
          const data = await getWoundProducts(item.ProductID);
          if (data.succeeded) {
            const carousel = data.item.products;
            if (carousel[0].productCode === item.ProductID) {
              let selectedProduct = {
                code: carousel[0].productCode,
                id: carousel[0].productID,
                name: "",
                imageUrl: "",
                productUrl: carousel[0].productURL,
                sku: "",
                allowOrder: "",
                allowSample: "",
                productType: "",
              };
              history.push({
                pathname: "/productsAndSolutions/productDetail",
                state: {
                  product: selectedProduct,
                },
              });
            }
            setApi(carousel);
            setGetProductDetailLoader(false);
          } else {
            setGetProductDetailLoader(false);
          }
        } catch (error) {
          setGetProductDetailLoader(false);
          console.log("error", error);
          return [];
        }
      }
      if (item.CTALaunch === "3") {
        setVideo(item);
        setOpen(true);
      }
    };
    return (
      <>
        {showWidget && (
          <Grid
            container
            className="loginPage"
            classes={{ root: "loginPageRoot" }}
          >
            <Grid
              item
              className="left-container"
              classes={{ root: "left-container-root" }}
            >
              <div className="sign-in">
                <div className="welcome">Login</div>
                <div className="login-ui">
                  <OktaSignInWidget
                    config={config}
                    onSuccess={onSuccess}
                    onError={onError}
                  />
                </div>
                <Grid
                  container
                  className="centerRowFlex"
                  classes={{ root: "centerRowFlexRoot" }}
                >
                  <Grid
                    item
                    className="links-grid"
                    classes={{ root: "links-grid-root" }}
                  >
                    <Link to="/forgotUsername" className="links">
                      Forgot username
                    </Link>
                  </Grid>
                  <Grid
                    item
                    className="links-grid"
                    classes={{ root: "links-grid-root" }}
                  >
                    <Link to="/forgotPassword" className="links">
                      Forgot password
                    </Link>
                  </Grid>
                  <Grid
                    item
                    className="links-grid"
                    classes={{ root: "links-grid-root" }}
                  >
                    <a
                      href={`${process.env.REACT_APP_INTERNAL_SSO_URL}`}
                      className="links"
                    >
                      3M Single Sign On
                    </a>
                  </Grid>
                </Grid>
                <Grid
                  container
                  className="centerRowFlex"
                  classes={{ root: "centerRowFlexRoot" }}
                >
                  <Grid item className="helpline">
                    If you have questions or issues, please contact our
                    dedicated team at <b>1-800-275-4524</b> ext. 41858
                  </Grid>
                </Grid>
                <Grid
                  container
                  className="centerRowFlex sign-up"
                  classes={{ root: "centerRowFlexRoot" }}
                >
                  <Grid item className="signup">
                    Haven’t signed up yet?
                  </Grid>
                  <Grid item>
                    <Link
                      to="/signup"
                      className="links"
                      style={{
                        fontWeight: 700,
                        fontSize: "16px",
                        lineHeight: "20px",
                        marginRight: 0,
                      }}
                    >
                      Sign up now
                    </Link>
                  </Grid>
                </Grid>
              </div>
            </Grid>
            <Grid item className="right-container">
              <div className="welcome-header">
                Welcome to 3M™ Express Therapy Portal
              </div>
              {banners && banners.length > 0 && (
                <Carousel
                  className="my-carousel"
                  indicatorIconButtonProps={{
                    style: {
                      color: "#1E64D0",
                      marginRight: "16px",
                      opacity: "0.25",
                    },
                  }}
                  activeIndicatorIconButtonProps={{
                    style: {
                      color: "#1E64D0",
                      opacity: 1,
                    },
                  }}
                  stopAutoPlayOnHover={false}
                  interval={8000}
                  navButtonsAlwaysInvisible={true}
                  changeOnFirstRender={true}
                  height={isMobileScreen ? "254px" : (screenWidth - 400) * 0.25}
                >
                  {banners.map((item, i) => (
                    <div key={i}>
                      <img
                        className="bannerStyle"
                        src={item.ImageLink}
                        alt="img"
                        style={{
                          minHeight: isMobileScreen
                            ? "254px"
                            : (screenWidth - 400) * 0.25,
                          width: "100%",
                        }}
                        onClick={() => handleClick(item)}
                      />
                    </div>
                  ))}
                </Carousel>
              )}
              <div className="features-container">
                {modules &&
                  modules
                    .sort((a, b) => (a.FeatureOrder > b.FeatureOrder ? 1 : -1))
                    .map((item, ix) => (
                      <Grid item className="features">
                        <div
                          onClick={() => openModulePage(item)}
                          style={{
                            backgroundImage: `url(${item.ImageLink})`,
                            width: "100%",
                            backgroundSize: "100% auto",
                            paddingBottom: "39.0625%",
                            backgroundRepeat: "no-repeat",
                            marginBottom: "16px",
                            cursor: "pointer",
                          }}
                        />
                        <div
                          className="feature-label"
                          onClick={() => openModulePage(item)}
                        >
                          {item.LabelText}
                        </div>
                        <div className="feature-desc">{item.BodyCopy}</div>
                      </Grid>
                    ))}
              </div>
            </Grid>
            {open && (
              <VideoDialog
                accountId={video.BCoveAcctID}
                open={open}
                setOpen={setOpen}
                text={""}
                videoId={video.VideoID}
              />
            )}
          </Grid>
        )}
      </>
    );
  };

  return (
    <>
      {isLoading
        ? spinner()
        : authState.isAuthenticated
          ? getOktaUser()
          : signin()}
      <Popup
        hideCloseButton={true}
        dialogParentClass="product-loader-dialog"
        openFlag={getProductDetailLoader}
      >
        {spinner()}
      </Popup>
    </>
  );
};

export default Login;
