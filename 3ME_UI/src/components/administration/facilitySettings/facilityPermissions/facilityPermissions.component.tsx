import "./facilityPermissions.css";
import { Grid } from "@mui/material";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import {
  FacilitySettingContext,
  FacilitySettingsContextType,
} from "../../../../context/FacilitySettingsContext";
import {
  AdminRolesPermissionsContext,
  AdminRolesPermissionsContextType,
} from "../../../../context/AdminRolesPermissionsContext";
import { Popup } from "../../../../core/popup/popup.component";
import { IFacilityPermissions } from "./facilityPermissions.interface";
import { IFacilitySettingPermission } from "../facilitySettings.interface";
import { getFacilityPermissionName } from "../../../../util/utilityFunctions";
import { CustomCheckBox } from "../../../../core/checkBox/checkBox.component";

export const FacilityPermissions = ({
  originalPermissions,
  permissions,
  setPermissions,
}: IFacilityPermissions) => {
  const history = useHistory();
  const [openEmptyPopUp, setOpenEmptyPopUp] = useState<boolean>(false);
  const facilitySettingsObj = useContext<FacilitySettingsContextType | null>(
    FacilitySettingContext
  );
  const adminRolePermissionsObj =
    useContext<AdminRolesPermissionsContextType | null>(
      AdminRolesPermissionsContext
    );

  const redirectToRolePermissions = () => {
    adminRolePermissionsObj?.resetRoleSettings();
    history.push("/administration/rolesPermissions");
  };

  const validateAndUpdateCheckBox = (e: any) => {
    let isPermissionUpdate = false;
    let tempData: any = permissions.map((item: any, index: number) => {
      if (item.permissionName === e.target.name) {
        item.isSelected = e.target.checked;
      }
      const originalPermission: IFacilitySettingPermission =
        originalPermissions[index];
      if (
        originalPermission.isSelected !== item.isSelected &&
        !isPermissionUpdate
      ) {
        isPermissionUpdate = true;
      }
      return item;
    });
    facilitySettingsObj!.setIsFacilityPermissionChanged(isPermissionUpdate);
    setPermissions(tempData);
  };

  return (
    <>
      <div className="facility-permission" data-testid="facility-permission">
        <h2
          className="facility-permission-header"
          data-testid="facility-permission-header"
        >
          User Access Permissions
        </h2>
        <h5
          className="facility-permission-description"
          data-testid="facility-permission-description"
        >
          Which of the following features should be enabled for this facility?
        </h5>
        <div className="facility-permissions">
          <Grid
            className="facility-permissions-grid-container"
            container
            spacing={2}
          >
            {Array.isArray(permissions) &&
              permissions.map((x: any, index: any) => (
                <Grid className="facility-permissions-grid-item" item xs={6}>
                  <CustomCheckBox
                    name={x.permissionName}
                    selectClassName="facility-permissions-checkbox"
                    selectpropsClassName="facility-permissions-checkbox-root"
                    handleChange={validateAndUpdateCheckBox}
                    labelClassName={
                      x.isSelected
                        ? "facility-permissions-checkbox-description-text-active"
                        : "facility-permissions-checkbox-description-text"
                    }
                    checked={x.isSelected}
                    value={x.permissionName}
                    key={index}
                    required={false}
                    labelText={getFacilityPermissionName(x.permissionName)}
                    testId={x.permissionName}
                    isDisabled={false}
                  />
                </Grid>
              ))}
          </Grid>
        </div>
        <div className="facility-permission-description-detail-div">
          <h6
            className="facility-permission-description-detail"
            data-testid="facility-permission-description-detail"
          >
            These settings do not change which features are enabled by default
            for new facility users. That information can be changed by going to
            the specific facility’s{" "}
            <b className="administration">Administration</b> functionality and
            changing{" "}
            <b className="role-privileges" onClick={redirectToRolePermissions}>
              {" Role Permissions"}
            </b>
            {"."}
          </h6>
        </div>
      </div>
      <Popup
        openFlag={openEmptyPopUp}
        closeHandler={() => setOpenEmptyPopUp(false)}
        dialogParentClass={"facility-permission-empty-pop-up"}
      >
        <div></div>
      </Popup>
    </>
  );
};
