import "./facilitySettings.css";
import {
  fetchFacilityPermissions,
  updateFacilityPermissions,
} from "../../../util/3meService";
import {
  RolesPermissionContext,
  RolesPermissionContextType,
} from "../../../context/RolesPermissionContext";
import {
  FacilitySettingContext,
  FacilitySettingsContextType,
} from "../../../context/FacilitySettingsContext";
import { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Popup } from "../../../core/popup/popup.component";
import { LoadingSpinner } from "../../../core/loader/LoadingSpinner";
import { getFacilityPermissionName } from "../../../util/utilityFunctions";
import { SuccessPopUp } from "./popUps/successPopUp/successPopUp.component";
import { AuthContext, AuthContextType } from "../../../context/AuthContext";
import { FacilityPermissions } from "./facilityPermissions/facilityPermissions.component";
import { SendNoteFailure } from "../../send3MNote/popUps/failurePopUp/sendNoteFailure.component";
import { FacilitySettingsHeader } from "./facilitySettingsHeader/facilitySettingsHeader.component";
import { FooterButtonGroup } from "../../send3MNote/footerButtonGroup/footerButtonGroup.component";

export const FacilitySettings = () => {
  const authObj = useContext<AuthContextType | null>(AuthContext);
  const facilitySettingsObj = useContext<FacilitySettingsContextType | null>(
    FacilitySettingContext
  );
  const history = useHistory();
  const location: any = useLocation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openSuccessPopUp, setOpenSuccessPopUp] = useState<boolean>(false);
  const [openFailurePopUp, setOpenFailurePopUp] = useState<boolean>(false);

  const permissions = facilitySettingsObj!.permissions;
  const setPermissions = facilitySettingsObj!.setPermissions;

  const originalPermissions = facilitySettingsObj!.originalPermissions;
  const setOriginalPermissions = facilitySettingsObj!.setOriginalPermissions;

  const selectedFacility = facilitySettingsObj!.selectedFacility;
  const setSelectedFacility = facilitySettingsObj!.setSelectedFacility;

  const userName = authObj?.userProfile?.userName;

  const permissionObj = useContext<RolesPermissionContextType | null>(
    RolesPermissionContext
  );

  const getFacilityPermissions = async (
    userName: string,
    siteUseId: string
  ) => {
    const reqBody = {
      UserName: userName,
      SiteUseId: siteUseId,
    };
    setIsLoading(true);
    const response = await fetchFacilityPermissions(reqBody);
    if (response.error) {
      history.push("/administration");
    } else {
      const validPermissionArray: [] = response.data.filter(
        (x: any) => getFacilityPermissionName(x.permissionName) !== ""
      );
      let cloneData: [] = JSON.parse(JSON.stringify(validPermissionArray));
      setOriginalPermissions(cloneData);
      setPermissions(validPermissionArray);
    }
    setIsLoading(false);
  };

  const updatePermissions = async () => {
    if (userName) {
      const reqBody = {
        UserName: userName,
        SiteUseId: selectedFacility!.siteUseId,
        Permissions: permissions,
      };
      setIsLoading(true);
      const response = await updateFacilityPermissions(reqBody);
      if (response.succeeded) {
        setOpenSuccessPopUp(true);
      } else {
        setOpenFailurePopUp(true);
      }
      setIsLoading(false);
    }
  };

  const openAdministrationPage = (isSuccess: boolean) => {
    if (isSuccess) {
      setOpenSuccessPopUp(false);
    } else {
      setOpenFailurePopUp(false);
    }
    setTimeout(() => {
      history.goBack();
    }, 500);
  };

  useEffect(() => {
    if (!selectedFacility && !userName) {
      history.goBack();
    } else if (!selectedFacility) {
      const selectedFacilityLocal = location.state?.selectedFacility;
      setSelectedFacility(selectedFacilityLocal);
      if (selectedFacilityLocal && userName) {
        const siteUseId = selectedFacilityLocal.siteUseId;
        getFacilityPermissions(userName, siteUseId);
      }
    }
  }, []);

  return (
    <>
      <div className="facility-settings">
        <div className="short-form">
          {selectedFacility && (
            <>
              <FacilitySettingsHeader
                selectedFacility={selectedFacility}
                setSelectedFacility={setSelectedFacility}
                userName={userName}
              />
              <FacilityPermissions
                originalPermissions={originalPermissions}
                permissions={permissions}
                setPermissions={setPermissions}
              />
              <div className="button-group" data-testid="button-group">
                <FooterButtonGroup
                  firstButtonTitle="Cancel"
                  firstButtonAction={() => {
                    history.goBack();
                  }}
                  secondButtonTitle="Update Permissions"
                  secondButtonDisabled={
                    permissionObj?.mappedRolesPermissionData.IsSupportRole ||
                    !facilitySettingsObj!.isFacilityPermissionChanged
                  }
                  secondButtonAction={updatePermissions}
                />
              </div>
            </>
          )}
        </div>
      </div>
      <Popup
        closeHandler={() => setIsLoading(false)}
        dialogParentClass={"facility-settings-loader-pop-up"}
        hideCloseButton={true}
        openFlag={isLoading}
      >
        <div className="facility-settings-loader-pop-up-div">
          <LoadingSpinner />
        </div>
      </Popup>
      <Popup
        closeHandler={() => openAdministrationPage(true)}
        dialogParentClass={"facility-settings-success-pop-up"}
        openFlag={openSuccessPopUp}
      >
        <div className="facility-settings-success-pop-up-div">
          <SuccessPopUp
            buttonAction={() => openAdministrationPage(true)}
            buttonTitle="Done"
            description="Permission changes will apply to new users added to your facility site. Existing permissions with current users in your site will not be changed."
            title="Role permissions have been updated"
          />
        </div>
      </Popup>
      <Popup
        closeHandler={() => setOpenFailurePopUp(false)}
        dialogParentClass={"facility-settings-failure-pop-up"}
        hideCloseButton={true}
        openFlag={openFailurePopUp}
      >
        <div className="facility-settings-failure-pop-up-div">
          <SendNoteFailure
            message="Your request to update permission has failed. Please try again or contact
        3M for assistance with this order 1-800-275-4524."
            backButtonAction={() => openAdministrationPage(false)}
          />
        </div>
      </Popup>
    </>
  );
};
