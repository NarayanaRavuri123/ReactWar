import { useContext, useEffect, useState } from "react";
import { Redirect, Route, useHistory, useLocation } from "react-router-dom";
import { mapUserRolesAndPermissionData } from "../../RolesPermission/RolesPermission.Mapper";
import { IPermissionData } from "../../RolesPermission/RolesPermission.model";
import { AuthContext, AuthContextType } from "../../context/AuthContext";
import { MyPatientContextProvider } from "../../context/MyPatientContext";
import {
  NewOrderContext,
  NewOrderContextType,
} from "../../context/NewOrderContext";
import {
  OrderDetailContext,
  OrderDetailContextType,
} from "../../context/OrderDetailsContext";
import {
  RolesPermissionContext,
  RolesPermissionContextType,
} from "../../context/RolesPermissionContext";
import { WoundAssessmentContextProvider } from "../../context/WoundAssessmentContext";
import PrivateRoute from "../../routeHooks/privateRouterAccess";
import { getSalesRep } from "../../util/3meService";
import { getProperty } from "../../util/ObjectFunctions";
import { getCMSContent } from "../../util/cmsService";
import { CMS_TECHNICALSUPPORT_CONTENT } from "../../util/staticText";
import { getUserProfile } from "../../util/userService";
import { UnlockVacOrder } from "../../util/vacOrderService";
import Administration from "../administration/administration.component";
import { FacilityBanner } from "../facilityBanner/facilityBanner.component";
import { HelpAndSupport } from "../helpAndSupport/helpAndSupport.component";
import Inventory from "../inventory/inventory.component";
import { searchFacility } from "../manageProfile/facilityInformation/addFacility/addFacility.service";
import { FacilityMode } from "../manageProfile/facilityInformation/facility.interface";
import { IUser } from "../manageProfile/user.interface";
import { MyPatients } from "../myPatients/myPatients.component";
import { SubmitProofOfDelivery } from "../myPatients/submitProofOfDelivery/submitProofOfDelivery.component";
import { OrderOverview } from "../myPatients/patientAndTherapyDetails/orderOverview/orderOverview.component";
import { AddWoundAssessmentContainer } from "../myPatients/patientAndTherapyDetails/woundProgress/addWoundAssessment/AddWoundAssessmentContainer/AddWoundAssessmentContainer.component";
import { ISalesRep, ITechnicalSupport } from "../needHelp/needHelp.interface";
import { NewOrder } from "../newOrder/newOrder.component";
import { NewOrderOptions } from "../newOrder/newOrderOptions/newOrderOptions.component";
import { OrderSuccess } from "../newOrder/orderSuccess/orderSuccess.component";

import { Education } from "../education/education.component";
import { VideoLibrary } from "../education/videoLibrary/videoLibrary.component";
import { InventoryRequest } from "../inventory/inventoryRequest/inventoryRequest.component";
import { DischargeRequest } from "../pickUpAndDischargeRequest/dischargeRequest/dischargeRequest.component";
import { ReviewDischargeRequest } from "../pickUpAndDischargeRequest/dischargeRequest/reviewDischargeRequest/reviewDischargeRequest.component";
import { PickUpRequest } from "../pickUpAndDischargeRequest/pickUpRequest/pickUpRequest.component";
import { SendNote } from "../send3MNote/sendNote.component";
import { SideNav } from "../sideNav/sideNav.component";
import { ISideNav } from "../sideNav/sideNavMenuOption.interface";
import SupplyOrder from "../supplyOrder/supplyOrder.component";
import SystemRequirements from "../systemRequirements/systemReq.components";
import { PageContext } from "./page.context";
import { MainPage, PageDiv, RouteSection, SubPageDiv } from "./page.style";
import { ProductsAndSolutions } from "../productsAndSolutions/productsAndSolutions.component";
import { AdminRolesPermissions } from "../administration/adminRolePermissions/adminRolesPermissions.component";
import { ProductDetail } from "../productsAndSolutions/productDetail/productDetail.component";
import {
  SubmitProofOfDeliveryContext,
  SubmitProofOfDeliveryContextType,
} from "../../context/submitProofOfDeliveryContext";
import { ManageUsers } from "../administration/manageUsers/manageUsers.component";
import { UserProfile } from "../administration/manageUsers/userProfile/userProfile.component";

export const Page = () => {
  const [salesRepInfo, setSalesRepInfo] = useState<ISalesRep>();
  const [techSupportInfo, setTechSupportInfo] = useState<ITechnicalSupport>();
  const AuthObj = useContext<AuthContextType | null>(AuthContext);
  const [currentPath, setCurrentPath] = useState<string | null>(null);
  const [previousPath, setPreviousPath] = useState<string | null>(null);
  const permissionObj = useContext<RolesPermissionContextType | null>(
    RolesPermissionContext
  );
  const NewOrderObj = useContext<NewOrderContextType | null>(NewOrderContext);
  const orderOverViewObj = useContext<OrderDetailContextType | null>(
    OrderDetailContext
  );
  const submitProofOfDeliveryObj =
    useContext<SubmitProofOfDeliveryContextType | null>(
      SubmitProofOfDeliveryContext
    );
  const userRole = AuthObj?.userRolePermissionData?.userRole;
  const location = useLocation();
  const history = useHistory();
  const loadTechSupport = async () => {
    const { item } = (await getCMSContent(CMS_TECHNICALSUPPORT_CONTENT)) || {};

    const techSupportData: ITechnicalSupport = {
      emailAddress: item.emailAddress,
      phoneNo: item.phoneNo,
    };
    setTechSupportInfo(techSupportData);
  };

  const searchFacilityAddr = async (data: IUser) => {
    let linkedFacilities: any;
    let manualFacilities: any;
    if (
      (data?.facilities.length > 0 &&
        AuthObj?.registeredFaciltyAddress === undefined) ||
      AuthObj?.registeredFaciltyAddress?.facilityAddressID === undefined
    ) {
      AuthObj?.setuserRolePermissionData(data.userPermissions!);
      linkedFacilities = data.facilities.filter(
        (x) => x.mode === FacilityMode.LINKED
      );
      if (linkedFacilities.length < 1) {
        manualFacilities = data.facilities.filter(
          (x: any) => x.mode === FacilityMode.MANUAL
        );
      }
      if (linkedFacilities.length > 0) {
        var facilitySearchRequest = {
          customerNumber: linkedFacilities[0].number!,
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
        AuthObj?.setregisteredFaciltyAddress(registeredFaciltyAddress);

        // set Permission
        const rolesPermissionRes: IPermissionData =
          await mapUserRolesAndPermissionData(
            data.userPermissions!,
            registeredFaciltyAddress?.readyCareFlag
          );
        permissionObj?.setMappedRolesPermissionData(rolesPermissionRes);
        AuthObj?.setsideNavMenuOptionModelData((dt: ISideNav) => ({
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
        AuthObj?.setuserRolesAndPermissionLoaded(true);
      } else {
        const rolesPermissionRes: IPermissionData =
          await mapUserRolesAndPermissionData(data.userPermissions!, "N");
        permissionObj?.setMappedRolesPermissionData(rolesPermissionRes);
        AuthObj?.setsideNavMenuOptionModelData((dt: ISideNav) => ({
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
        AuthObj?.setuserRolesAndPermissionLoaded(true);
      }
    }

    return null;
  };

  const getUserDetails = async () => {
    if (!AuthObj?.isInternalUser) {
      const user = await getUserProfile();
      if (user !== undefined) {
        if (
          user.departmentName === "Internal" &&
          AuthObj?.registeredFaciltyAddress === undefined
        ) {
          history.push("/ssoRedirect");
        } else {
          AuthObj?.setUserProfile(user);
          await searchFacilityAddr(user);
        }
      }
    } else {
      AuthObj?.setuserRolesAndPermissionLoaded(true);
    }
  };

  const loadSalesRep = async (
    zipCode: number,
    rolesPermissionRes: IPermissionData
  ) => {
    if (
      rolesPermissionRes.IsSalesRepDetails &&
      !rolesPermissionRes.IsSupportRole &&
      zipCode
    ) {
      if (zipCode) {
        const resdata = (await getSalesRep(zipCode.toString())) || {};
        const saleRepData: ISalesRep = {
          emailAddress: resdata?.data?.emailAddress,
          phoneNo: resdata?.data?.phoneNo,
          name: resdata?.data?.name,
        };
        setSalesRepInfo(saleRepData);
      }
    }
  };

  useEffect(() => {
    getUserDetails();
    loadTechSupport();
  }, []);

  useEffect(() => {
    if (AuthObj?.registeredFaciltyAddress) {
      loadSalesRep(
        AuthObj?.registeredFaciltyAddress.zip,
        permissionObj?.mappedRolesPermissionData!
      );
    }
  }, [AuthObj?.registeredFaciltyAddress]);

  useEffect(() => {
    if (location.pathname !== currentPath) {
      setPreviousPath(currentPath);
      setCurrentPath(location.pathname);
    }
    if (currentPath?.includes("/orders/newOrder") && NewOrderObj?.vacOrderID) {
      UnlockVacOrder(NewOrderObj?.vacOrderID);
      NewOrderObj?.resetNewOrderForm();
    }
    if (location.pathname !== "/home/orderOverview") {
      orderOverViewObj?.resetData();
      orderOverViewObj?.resetSeletedSupplyOrderData();
      orderOverViewObj?.resetWoundData();
    }
    if (location.pathname !== "/home/proofOfDelivery") {
      submitProofOfDeliveryObj?.resetData();
    }
  }, [location.pathname]);

  const helpSupport = (
    <div className="appWithRouter">
      <div className="helpSectionAtSignup">
        <div className="helpComponent">
          <HelpAndSupport />
        </div>
      </div>
    </div>
  );

  const sysreq = (
    <div className="appWithRouter">
      <div className="helpSectionAtSignup">
        <div className="helpComponent">
          <SystemRequirements data={""} />
        </div>
      </div>
    </div>
  );

  const internalHelpSupport = (
    <div className="internalappWithRouter">
      <div className="helpSectionAtSignup">
        <div className="helpComponent">
          <HelpAndSupport />
        </div>
      </div>
    </div>
  );

  const internalSysreq = (
    <div className="internalappWithRouter">
      <div className="helpSectionAtSignup">
        <div className="helpComponent">
          <SystemRequirements data={""} />
        </div>
      </div>
    </div>
  );

  const inventory = AuthObj?.isLoggedIn ? (
    AuthObj?.userRolesAndPermissionLoaded ? (
      getProperty(AuthObj?.sideNavMenuOptionModelData, "inventory")
        .isVisible ? (
        <Inventory />
      ) : (
        <Route>
          <Redirect to="/home" />
        </Route>
      )
    ) : null
  ) : (
    <Route>
      <Redirect to="/" />
    </Route>
  );

  const inventoryAdjustment = AuthObj?.isLoggedIn ? (
    AuthObj?.userRolesAndPermissionLoaded ? (
      getProperty(AuthObj?.sideNavMenuOptionModelData, "inventory")
        .isVisible ? (
        <InventoryRequest />
      ) : (
        <Route>
          <Redirect to="/home" />
        </Route>
      )
    ) : null
  ) : (
    <Route>
      <Redirect to="/" />
    </Route>
  );

  const newOrderOptions = AuthObj?.isLoggedIn ? (
    AuthObj?.userRolesAndPermissionLoaded ? (
      getProperty(AuthObj?.sideNavMenuOptionModelData, "orders").isVisible ? (
        <NewOrderOptions />
      ) : (
        <Route>
          <Redirect to="/home" />
        </Route>
      )
    ) : null
  ) : (
    <Route>
      <Redirect to="/" />
    </Route>
  );

  const administration = AuthObj?.isLoggedIn ? (
    AuthObj?.userRolesAndPermissionLoaded ? (
      getProperty(AuthObj?.sideNavMenuOptionModelData, "administration")
        .isVisible ? (
        <Administration />
      ) : (
        <Route>
          <Redirect to="/home" />
        </Route>
      )
    ) : null
  ) : (
    <Route>
      <Redirect to="/" />
    </Route>
  );

  const manageUsers = AuthObj?.isLoggedIn ? (
    AuthObj?.userRolesAndPermissionLoaded ? (
      getProperty(AuthObj?.sideNavMenuOptionModelData, "administration")
        .isVisible ? (
        <ManageUsers />
      ) : (
        <Route>
          <Redirect to="/home" />
        </Route>
      )
    ) : null
  ) : (
    <Route>
      <Redirect to="/" />
    </Route>
  );

  const userProfile = AuthObj?.isLoggedIn ? (
    AuthObj?.userRolesAndPermissionLoaded ? (
      getProperty(AuthObj?.sideNavMenuOptionModelData, "administration")
        .isVisible ? (
        <UserProfile />
      ) : (
        <Route>
          <Redirect to="/home" />
        </Route>
      )
    ) : null
  ) : (
    <Route>
      <Redirect to="/" />
    </Route>
  );

  const adminRolesAndPermissions = AuthObj?.isLoggedIn ? (
    AuthObj?.userRolesAndPermissionLoaded ? (
      permissionObj?.mappedRolesPermissionData.IsShowAdminstrationOption ? (
        <AdminRolesPermissions />
      ) : (
        <Route>
          <Redirect to="/home" />
        </Route>
      )
    ) : null
  ) : (
    <Route>
      <Redirect to="/" />
    </Route>
  );

  const education = AuthObj?.isLoggedIn ? (
    AuthObj?.userRolesAndPermissionLoaded ? (
      getProperty(AuthObj?.sideNavMenuOptionModelData, "education")
        .isVisible ? (
        <Education />
      ) : (
        <Route>
          <Redirect to="/home" />
        </Route>
      )
    ) : null
  ) : (
    <Route>
      <Redirect to="/education" />
    </Route>
  );

  const educationVideoLibrary = AuthObj?.isLoggedIn ? (
    <VideoLibrary />
  ) : (
    <Route>
      <Redirect to="/home" />
    </Route>
  );

  const productsAndSolutions = AuthObj?.isLoggedIn ? (
    <ProductsAndSolutions />
  ) : (
    <Route>
      <Redirect to="/" />
    </Route>
  );

  const productDetail = AuthObj?.isLoggedIn ? (
    <ProductDetail />
  ) : (
    <Redirect to="/" />
  );

  const orders = AuthObj?.isLoggedIn ? (
    AuthObj?.userRolesAndPermissionLoaded ? (
      getProperty(AuthObj?.sideNavMenuOptionModelData, "orders").isVisible ? (
        <NewOrder />
      ) : (
        <Route>
          <Redirect to="/home" />
        </Route>
      )
    ) : (
      <NewOrder />
    )
  ) : (
    <Route>
      <Redirect to="/" />
    </Route>
  );
  const orderOverviewRoute = AuthObj?.isLoggedIn ? (
    <OrderOverview />
  ) : (
    <Route>
      <Redirect to="/home" />
    </Route>
  );

  const supplyOrders = AuthObj?.isLoggedIn ? (
    AuthObj?.userRolesAndPermissionLoaded ? (
      getProperty(AuthObj?.sideNavMenuOptionModelData, "orders").isVisible ? (
        <SupplyOrder />
      ) : (
        <Route>
          <Redirect to="/home" />
        </Route>
      )
    ) : (
      <SupplyOrder />
    )
  ) : (
    <Route>
      <Redirect to="/" />
    </Route>
  );

  return (location.pathname === "/helpAndSupport" && !AuthObj?.isLoggedIn) ||
    (location.pathname === "/helpAndSupport/sysreq" && !AuthObj?.isLoggedIn) ||
    (location.pathname === "/helpAndSupport/faq" && !AuthObj?.isLoggedIn) ||
    (location.pathname === "/education" && !AuthObj?.isLoggedIn) ||
    (location.pathname === "/helpAndSupport/ContactUs" &&
      !AuthObj?.isLoggedIn) ||
    (location.pathname === "/helpAndSupport/ContactUsSent" &&
      !AuthObj?.isLoggedIn) ||
    (location.pathname === "/education" && !AuthObj?.isLoggedIn) ||
    (location.pathname === "/education/videoLibrary" && !AuthObj?.isLoggedIn) ||
    (location.pathname === "/productsAndSolutions" && !AuthObj?.isLoggedIn) ||
    (location.pathname === "/productsAndSolutions/productDetail" &&
      !AuthObj?.isLoggedIn) ? (
    <> </>
  ) : (
    <PageDiv data-testid="pageComponentTest">
      {localStorage.getItem("isComingFromSSO") !== "true" &&
        permissionObj &&
        !permissionObj.mappedRolesPermissionData.IsBaseRole && (
          <FacilityBanner />
        )}
      <MainPage>
        {AuthObj?.isInternalUserFacilitySelected && <SideNav />}

        <SubPageDiv>
          <RouteSection>
            <PageContext.Provider
              value={{
                salesRepContacts: salesRepInfo!,
                techRepContacts: techSupportInfo!,
              }}
            >
              <WoundAssessmentContextProvider>
                <MyPatientContextProvider>
                  <PrivateRoute path="/home" exact component={MyPatients} />
                  <Route path="/home/orderOverview">{orderOverviewRoute}</Route>
                  <Route path="/orders" exact>
                    {newOrderOptions}
                  </Route>
                  <Route path="/orders/newOrder" exact>
                    {orders}
                  </Route>
                  <Route path="/orders/newOrder/:id" exact>
                    {orders}
                  </Route>
                  <Route path="/inventory" exact>
                    {inventory}
                  </Route>
                  <PrivateRoute
                    path="/inventory/inventoryAdjustment"
                    exact
                    component={InventoryRequest}
                  ></PrivateRoute>
                  <Route path="/administration" exact>
                    {administration}
                  </Route>
                  <Route path="/administration/manageUsers" exact>
                    {manageUsers}
                  </Route>
                  <Route path="/administration/manageUsers/userProfile" exact>
                    {userProfile}
                  </Route>
                  <Route path="/administration/rolesPermissions" exact>
                    {adminRolesAndPermissions}
                  </Route>
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
                  <Route path="/orders/supplyOrderList">{supplyOrders}</Route>
                  <PrivateRoute
                    path="/home/pickUpRequest"
                    component={PickUpRequest}
                  />
                  <PrivateRoute
                    path="/home/dischargeRequest"
                    component={DischargeRequest}
                  />
                  <PrivateRoute
                    path="/reviewDischargeRequest"
                    component={ReviewDischargeRequest}
                  />
                  <PrivateRoute
                    path="/addWoundAssessment"
                    component={AddWoundAssessmentContainer}
                  />
                  <PrivateRoute
                    path="/home/proofOfDelivery"
                    component={SubmitProofOfDelivery}
                  />
                  <PrivateRoute path="/home/sendNote" component={SendNote} />
                </MyPatientContextProvider>
              </WoundAssessmentContextProvider>

              <PrivateRoute
                path="/orders/orderSuccess"
                component={OrderSuccess}
              />
              {AuthObj?.isLoggedIn &&
                !AuthObj?.isInternalUserFacilitySelected && (
                  <>
                    <Route path="/helpAndSupport">{internalHelpSupport} </Route>
                    <Route path="/sysreq"> {internalSysreq} </Route>
                  </>
                )}
              {AuthObj?.isInternalUserFacilitySelected &&
                AuthObj?.isLoggedIn && (
                  <>
                    <Route path="/helpAndSupport" component={HelpAndSupport} />
                    <Route path="/sysreq" component={SystemRequirements} />
                  </>
                )}
            </PageContext.Provider>
          </RouteSection>
        </SubPageDiv>
      </MainPage>
    </PageDiv>
  );
};
