import "./registeredPermissions.css";
import { Grid } from "@mui/material";
import { RegisteredPermission } from "./registeredPermissions.enum";
import { IPermissionDetails } from "../adminRolesPermissions.interface";
import { IRegisteredPermissions } from "./registeredPermissions.interface";
import { getFacilityPermissionName } from "../../../../util/utilityFunctions";
import { CustomCheckBox } from "../../../../core/checkBox/checkBox.component";

export const RegisteredPermissions = ({
  className = "",
  permissions,
  type,
  validateAndUpdateCheckBox,
}: IRegisteredPermissions) => {
  const rendercheckBox = (x: IPermissionDetails, index: number) => {
    return (
      <div className={className}>
        <CustomCheckBox
          checked={
            type === RegisteredPermission.SELF_REGISTER
              ? x.selfRegistered!
              : x.adminRegistered!
          }
          handleChange={(e: any) => validateAndUpdateCheckBox(e, type)}
          isDisabled={false}
          key={index}
          labelClassName={
            x.selfRegistered
              ? "registered-permissions-checkbox-description-text-active"
              : "registered-permissions-checkbox-description-text"
          }
          labelText={getFacilityPermissionName(x.permissionName)}
          name={x.permissionName}
          required={false}
          selectClassName="registered-permissions-checkbox"
          selectpropsClassName="registered-permissions-checkbox-root"
          testId={x.permissionName}
          value={x.permissionName}
        />
      </div>
    );
  };

  return (
    <>
      <div className="registered-permissions-component">
        <div className="registered-permissions">
          <Grid
            className="registered-permissions-grid-container"
            container
            spacing={2}
            xs={8}
          >
            {Array.isArray(permissions) &&
              permissions
                .filter((x) => x)
                .map((x: IPermissionDetails, index: any) => (
                  <Grid
                    className="registered-permissions-grid-item"
                    item
                    xs={6}
                  >
                    {rendercheckBox(x, index)}
                  </Grid>
                ))}
          </Grid>
        </div>
      </div>
    </>
  );
};
