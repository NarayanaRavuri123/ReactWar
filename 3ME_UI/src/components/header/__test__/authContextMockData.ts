import { AuthContextType } from "../../../context/AuthContext";
import { defaultSalesRoleTestData } from "../../../sso/sales/salesRole.test.data";
import { getDeepClone } from "../../../util/ObjectFunctions";
import { sideNavMenuOptionModel } from "../../sideNav/sideNaveMenuOptions.model";

export const getMockAuthContextData = (): AuthContextType => ({
  isLoggedIn: true,
  userName: "Test",
  profileSaveAuthicated: false,
  setIsLoggedIn: () => {},
  setUserName: () => {},
  setProfileSaveAuthicated: () => {},
  isLoading: false,
  setIsLoading: () => {},
  terms: "",
  setTerms: () => {},
  preferredUserName: "Test",
  setpreferredUserName: () => {},
  userProfile: undefined,
  setUserProfile: () => {},
  setTermsOfUseAccepted: () => {},
  termsOfUseAccepted: true,
  registeredFaciltyAddress: undefined,
  setregisteredFaciltyAddress: () => {},
  manageAccountData: undefined,
  setManageAccountData: () => {},
  manageAccountProgbarVal: 25,
  setManageAccountProgbarVal: () => {},
  verificationType: "",
  setVerificationType: () => {},
  userRolePermissionData: null,
  setuserRolePermissionData: () => {},
  sideNavMenuOptionModelData: getDeepClone(sideNavMenuOptionModel),
  setsideNavMenuOptionModelData: () => {},
  userRolesAndPermissionLoaded: true,
  setuserRolesAndPermissionLoaded: () => {},
  isInternalUser: false,
  setIsInternalUser: () => {},
  isInternalUserFacilitySelected: false,
  setIsInternalUserFacilitySelected: () => {},
  updateInternalUser: false,
  setUpdateInternalUser: () => {},
  unLinkedFacilitesCount: "",
  setUnLinkedFacilityCount: () => {},
  deepLinkPath: null,
  setDeepLinkPath: () => {},
  allFacilities: [],
  setAllFacilties: () => {},
});