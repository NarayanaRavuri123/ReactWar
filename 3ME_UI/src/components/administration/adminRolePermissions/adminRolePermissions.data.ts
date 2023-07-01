import { IPermissionDetails } from "./adminRolesPermissions.interface";

export const registeredPermissionData: IPermissionDetails[] = [
  {
    permissionName: "3M_REP_ACCESS",
    selfRegistered: true,
    adminRegistered: true,
  },
  {
    permissionName: "SALES_ORDERS",
    selfRegistered: true,
    adminRegistered: false,
  },
  {
    permissionName: "ALL_FACILITY_PATIENTS",
    selfRegistered: true,
    adminRegistered: false,
  },
  {
    permissionName: "RENTAL_ORDERS",
    selfRegistered: true,
    adminRegistered: true,
  },
  {
    permissionName: "WOUND_MEASUREMENTS",
    selfRegistered: true,
    adminRegistered: true,
  },
  {
    permissionName: "INVENTORY",
    selfRegistered: true,
    adminRegistered: false,
  },
  {
    permissionName: "MFA",
    selfRegistered: false,
    adminRegistered: false,
  },
];

export const adminRegisteredPermissionData: IPermissionDetails[] = [
  {
    permissionName: "3M_REP_ACCESS",
    selfRegistered: true,
    adminRegistered: true,
  },
  {
    permissionName: "SALES_ORDERS",
    selfRegistered: true,
    adminRegistered: true,
  },
  {
    permissionName: "ALL_FACILITY_PATIENTS",
    selfRegistered: false,
    adminRegistered: false,
  },
  {
    permissionName: "WOUND_MEASUREMENTS",
    selfRegistered: true,
    adminRegistered: true,
  },
  {
    permissionName: "RENTAL_ORDERS",
    selfRegistered: true,
    adminRegistered: true,
  },
  {
    permissionName: "INVENTORY",
    selfRegistered: false,
    adminRegistered: false,
  },
  {
    permissionName: "MFA",
    selfRegistered: false,
    adminRegistered: false,
  },
];
