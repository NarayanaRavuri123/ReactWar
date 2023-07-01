import { RegisteredPermission } from "./registeredPermissions.enum";
import { IPermissionDetails } from "../adminRolesPermissions.interface";

export interface IRegisteredPermissions {
  className?: string;
  permissions: IPermissionDetails[];
  type: RegisteredPermission;
  validateAndUpdateCheckBox: Function;
}
