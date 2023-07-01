export interface IAdminRolesPermissions {
  cancelBtnAction?: Function;
  submitBtnAction?: Function;
}

export interface IPermissionDetails {
  selfRegistered: boolean | null;
  adminRegistered: boolean | null;
  permissionName: string;
}

export interface IAdminRoleGetFacilityPermissionRequest {
  siteUseId: string;
}
