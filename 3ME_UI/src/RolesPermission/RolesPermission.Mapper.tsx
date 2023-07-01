import { IUserRolesPermission } from "../components/myPatients/userRolesPermission.interface";
import { getDeepClone } from "../util/ObjectFunctions";
import {
  defaultPermissionDataModel,
  IPermissionData,
} from "./RolesPermission.model";

export const mapUserRolesAndPermissionData = async (
  userRolePermissionData: IUserRolesPermission,
  readyCareFlag: any
) => {
  let permissionData: any;
  permissionData = getDeepClone(defaultPermissionDataModel);

  const permission: any = {
    INVENTORY: "IsShowInventoryOption",
    RENTAL_ORDERS: "IsShowVacOrderButton",
    SALES_ORDERS: "IsShowSupplyOrderButton",
    FACILITY_SETTINGS: "IsAdminFacilitySettingsButton",
    FACILITY_USERS: "IsAdminFacilityUsersButton",
    MY_LIST: "IsAdminMyListsButton",
    ROLE_PERMISSIONS: "IsAdminRolesPermissionButton",
    USER_ACCOUNTS: "IsAdminUserAccounts",
    SITE_STATUS: "IsPrdMgrSiteStatus",
    HISTORY: "IsSalesMgrHistoryBtn",
    SALES_PEOPLE: "IsSalesMgrPeopleBtn",
    TERRITORIES: "IsSalesTerritoriesBtn",
    WOUND_MEASUREMENTS: "IsShowAddWoundAssessmentMenu",
    "3M_REP_ACCESS": "IsSalesRepDetails",
  };
  const role: any = {
    SUPPORT: "IsSupportRole",
    SALES: "IsSalesRole",
    "SALES MANAGER": "IsSalesManagerRole",
    CLINICIAN: "IsClinicianRole",
    "FACILITY ADMIN": "IsFacilityAdminRole",
    "3M ADMIN": "Is3MAdminRole",
    BASEUSER: "IsBaseRole",
    "PRODUCT MANAGER": "IsProdManagerRole",
  };
  const pagePermission: any = {
    ADMINISTRATIVE_SETTINGS: "IsShowAdminstrationOption",
    MANAGE_ACCOUNT: "IsShowManageAccountMenu",
    NEW_ORDER: "IsShowStartNewOrder",
    MANAGE_USERS: "IsManageUsersBtn",
  };
  if (userRolePermissionData) {
    if (role.hasOwnProperty(userRolePermissionData.userRole)) {
      let roleVal = role[userRolePermissionData.userRole];
      permissionData.roleName = userRolePermissionData.userRole;
      permissionData[roleVal] = true;
    }
    if (userRolePermissionData.permissions.length > 0) {
      userRolePermissionData?.permissions.forEach((x: string) => {
        if (permission.hasOwnProperty(x)) {
          let val = permission[x];
          // to add here if we have to check multiple conditions
          if (x === "INVENTORY") {
            if (readyCareFlag === "Y") {
              permissionData[val] = true;
            } else {
              permissionData[val] = false;
            }
          } else {
            permissionData[val] = true;
          }
        }
      });
    }
    // to set permission
  }
  if (
    userRolePermissionData &&
    userRolePermissionData.pagePermissions.length > 0
  ) {
    // to set pagePermission
    userRolePermissionData?.pagePermissions.forEach((x: string) => {
      if (pagePermission.hasOwnProperty(x)) {
        let value = pagePermission[x];
        if (x === "NEW_ORDER") {
          if (
            permissionData.IsShowVacOrderButton ||
            permissionData.IsShowSupplyOrderButton
          ) {
            permissionData[value] = true;
          } else {
            permissionData[value] = false;
          }
        } else {
          permissionData[value] = true;
        }
      }
    });
  }
  return permissionData;
};
