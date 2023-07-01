import "./adminRolesPermissions.css";
import {
  IAdminRoleGetFacilityPermissionRequest,
  IAdminRolesPermissions,
  IPermissionDetails,
} from "./adminRolesPermissions.interface";
import { useHistory } from "react-router-dom";
import {
  AdminRolesPermissionsContext,
  AdminRolesPermissionsContextType,
} from "../../../context/AdminRolesPermissionsContext";
import { useContext, useEffect, useState } from "react";
import { Popup } from "../../../core/popup/popup.component";
import { LoadingSpinner } from "../../../core/loader/LoadingSpinner";
import { getFacilityPermissionName } from "../../../util/utilityFunctions";
import { AuthContext, AuthContextType } from "../../../context/AuthContext";
import { Navigator } from "../../helpAndSupport/Navigator/navigator.component";
import { RegisteredPermission } from "./registeredPermission/registeredPermissions.enum";
import { SuccessPopUp } from "../facilitySettings/popUps/successPopUp/successPopUp.component";
import { SendNoteFailure } from "../../send3MNote/popUps/failurePopUp/sendNoteFailure.component";
import { RegisteredPermissions } from "./registeredPermission/registeredPermissions.component";
import { FooterButtonGroup } from "../../send3MNote/footerButtonGroup/footerButtonGroup.component";
import {
  getRolePermissions,
  UpdateRolePermissions,
} from "../../../util/facilityService";
import React from "react";

export const AdminRolesPermissions = ({
  cancelBtnAction,
  submitBtnAction,
}: IAdminRolesPermissions) => {
  const [showLoader, setShowLoader] = React.useState<boolean>(true);
  const [openSuccessPopUp, setOpenSuccessPopUp] = useState<boolean>(false);
  const [openFailurePopUp, setOpenFailurePopUp] = useState<boolean>(false);
  const history = useHistory();
  const adminRolePermissionsObj =
    useContext<AdminRolesPermissionsContextType | null>(
      AdminRolesPermissionsContext
    );
  const authObj = useContext<AuthContextType | null>(AuthContext);
  const permissions = adminRolePermissionsObj?.permissions!;
  const setPermissions = adminRolePermissionsObj?.setPermissions!;
  const originalPermissions = adminRolePermissionsObj?.originalPermissions!;
  const setOriginalPermissions =
    adminRolePermissionsObj?.setOriginalPermissions!;
  const userName = authObj?.userProfile?.userName;
  const [isFetchApiType, setIsFetchApiType] = useState<boolean | null>(null);

  const getRolePermissionsInfo = async (siteUseId: string) => {
    const reqBody: IAdminRoleGetFacilityPermissionRequest = {
      siteUseId: siteUseId,
    };
    setIsFetchApiType(true);
    const response = await getRolePermissions(reqBody);
    adminRolePermissionsObj?.resetRoleSettings();
    if (response && response.succeeded) {
      const permissions = response.data.permissions;
      if (permissions.length > 0) {
        const validFacilityPermissionArray: [] = permissions.filter(
          (x: any) => getFacilityPermissionName(x.permissionName) !== ""
        );
        let cloneData: [] = JSON.parse(
          JSON.stringify(validFacilityPermissionArray)
        );
        setOriginalPermissions(cloneData);
        setPermissions(validFacilityPermissionArray);
      } else {
        setOriginalPermissions([]);
        setPermissions([]);
      }
      setIsFetchApiType(null);
    } else {
      setOpenFailurePopUp(true);
    }
    setShowLoader(false);
  };

  const updateRoles = async () => {
    if (userName) {
      const reqBody = {
        username: userName,
        siteUseId: authObj?.registeredFaciltyAddress?.siteUseId!,
        permissions: permissions,
      };
      setShowLoader(true);
      setIsFetchApiType(false);
      const response = await UpdateRolePermissions(reqBody);
      if (response && response.succeeded) {
        setOpenSuccessPopUp(true);
        setIsFetchApiType(null);
      } else {
        setOpenFailurePopUp(true);
      }
      setShowLoader(false);
    }
  };

  const closeButtonAction = (isSuccess: boolean) => {
    if (isSuccess) {
      setOpenSuccessPopUp(true);
    } else {
      setOpenFailurePopUp(true);
    }
    goBackToAdminstration();
  };

  const goBackToAdminstration = () => {
    history.goBack();
  };

  const validateAndUpdateCheckBox = (e: any, type: RegisteredPermission) => {
    let isPermissionUpdate = false;
    let tempData: any = permissions?.map((item: any, index: number) => {
      if (type === RegisteredPermission.SELF_REGISTER) {
        if (item.permissionName === e.target.name) {
          item.selfRegistered = e.target.checked;
        }
      } else {
        if (item.permissionName === e.target.name) {
          item.adminRegistered = e.target.checked;
        }
      }
      if (!isPermissionUpdate) {
        const originalPermission: IPermissionDetails =
          originalPermissions[index];
        if (
          originalPermission.selfRegistered !== item.selfRegistered ||
          originalPermission.adminRegistered !== item.adminRegistered
        ) {
          isPermissionUpdate = true;
        }
        adminRolePermissionsObj!.setIsRolePermissionChanged(isPermissionUpdate);
      }
      return item;
    });
    setPermissions(tempData);
  };

  useEffect(() => {
    if (
      authObj &&
      authObj.registeredFaciltyAddress &&
      authObj.registeredFaciltyAddress.siteUseId &&
      authObj.registeredFaciltyAddress.siteUseId !== ""
    ) {
      const siteUseId = authObj.registeredFaciltyAddress.siteUseId;
      getRolePermissionsInfo(siteUseId);
    }
  }, [authObj?.registeredFaciltyAddress]);

  return (
    <div
      className="roles-permission-component"
      data-testid="roles-permission-component"
    >
      {showLoader ? (
        <div className="roles-permission-component-loader">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <Navigator
            array={[
              {
                route: "/administration",
                pageName: "Administration",
              },
            ]}
            className="roles-permission-component-route-section"
            title="Role Permissions"
          />
          <div className="roles-permission-main-section">
            <span
              className="roles-permission-main-section-header"
              data-testid="roles-permission-main-section-header"
            >
              Role Permissions
            </span>
            {permissions && permissions.length > 0 && (
              <>
                <span
                  className="roles-permission-main-section-header-desc"
                  data-testid="roles-permission-main-section-header-desc"
                >
                  The following roles are available for your account.
                </span>
                <div className="register-permission-section">
                  <span
                    className="register-permission-title"
                    data-testid="roles-permission-sub-div-header"
                  >
                    Self-Registered Clinicians
                  </span>
                  <span
                    className="register-permission-description"
                    data-testid="roles-permission-self-sub-div-desc"
                  >
                    The following features will be enabled by default for users
                    who self-register to your facility
                  </span>
                </div>
                <RegisteredPermissions
                  className="register-permission-component"
                  permissions={permissions?.filter(
                    (x: IPermissionDetails) => x.selfRegistered !== null
                  )}
                  type={RegisteredPermission.SELF_REGISTER}
                  validateAndUpdateCheckBox={validateAndUpdateCheckBox}
                />
                <div className="register-permission-section">
                  <span
                    className="register-permission-title"
                    data-testid="roles-permission-admin-sub-div-header"
                  >
                    Admin-Registered Clinicians
                  </span>
                  <span
                    className="register-permission-description"
                    data-testid="roles-permission-admin-sub-div-desc"
                  >
                    The following features will be enabled by default for users
                    who are added to your facility by administrators
                  </span>
                  <RegisteredPermissions
                    className="register-permission-component"
                    permissions={permissions?.filter(
                      (x: IPermissionDetails) => x.adminRegistered !== null
                    )}
                    type={RegisteredPermission.ADMIN_REGISTER}
                    validateAndUpdateCheckBox={validateAndUpdateCheckBox}
                  />
                </div>
              </>
            )}
            {!openFailurePopUp && permissions && permissions.length === 0 && (
              <p className="error-message">
                There are no permissions available for your account. Please
                contact 3M for assistance 1-800-275-4524.
              </p>
            )}
          </div>
        </>
      )}
      <div className="roles-button-group" data-testid="roles-button-group">
        <FooterButtonGroup
          firstButtonTitle="Cancel"
          firstButtonAction={
            cancelBtnAction ? cancelBtnAction : goBackToAdminstration
          }
          secondButtonTitle="Update Roles"
          secondButtonDisabled={
            !adminRolePermissionsObj?.isRolePermissionChanged!
          }
          secondButtonAction={submitBtnAction ? submitBtnAction : updateRoles}
        />
      </div>
      <Popup
        closeHandler={() => closeButtonAction(true)}
        dialogParentClass={"update-roles-success-pop-up"}
        openFlag={openSuccessPopUp}
      >
        <div className="update-roles-success-pop-up-div">
          <SuccessPopUp
            buttonAction={goBackToAdminstration}
            buttonTitle="Done"
            description="Permission changes will apply to new users added to your facility site. Existing permissions with current users in your site will not be changed."
            title="Role permissions have been updated"
          />
        </div>
      </Popup>
      <Popup
        closeHandler={() => closeButtonAction(false)}
        dialogParentClass={"update-roles-failure-pop-up"}
        hideCloseButton={true}
        openFlag={openFailurePopUp}
      >
        <div className="update-roles-failure-pop-up-div">
          <SendNoteFailure
            backButtonAction={goBackToAdminstration}
            message={`Your request to ${
              isFetchApiType ? "view" : "update"
            } the Role Permissions for the selected facility has failed. Please try again or contact
        3M for assistance with this facility 1-800-275-4524.`}
          />
        </div>
      </Popup>
    </div>
  );
};
