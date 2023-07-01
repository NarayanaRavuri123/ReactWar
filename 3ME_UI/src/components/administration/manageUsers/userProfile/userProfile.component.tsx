import "./userProfile.css";
import {
  DD_DEPARTMENT_CONTENT,
  DD_LICENSE_CONTENT,
} from "../../../../util/staticText";
import { Button } from "@mui/material";
import {
  formatPhoneNumber,
  getFacilityPermissionName,
  makeCapitalEachWordInString,
} from "../../../../util/utilityFunctions";
import { format } from "react-string-format";
import {
  getFacilityDetails,
  getUserDetails,
  resetPassword,
  updateUserDetails,
} from "../../../../util/facilityUserService";
import {
  UserProfileContext,
  UserProfileContextType,
} from "../../../../context/UserProfileContext";
import { useHistory, useLocation } from "react-router-dom";
import {
  IUserFacilityData,
  IUserPermissionsData,
  IUserProfile,
} from "./userProfile.interface";
import React, { useContext, useEffect, useState } from "react";
import { Popup } from "../../../../core/popup/popup.component";
import { SiteAccess } from "./siteAccess/siteAccess.component";
import { Validator } from "../../../../util/order.validations";
import { getdropDownContent } from "../../../../util/dropDownService";
import { getRolePermissions } from "../../../../util/facilityService";
import { LoadingSpinner } from "../../../../core/loader/LoadingSpinner";
import { IFacilityToUser } from "./addFacility/addFacilityToUser.interface";
import { AddFacilityToUser } from "./addFacility/addFacilityToUser.component";
import { ValidationStatus } from "../../../../core/interfaces/input.interface";
import { AuthContext, AuthContextType } from "../../../../context/AuthContext";
import { Navigator } from "../../../helpAndSupport/Navigator/navigator.component";
import { IFacility } from "../../../manageProfile/facilityInformation/facility.interface";
import { UserProfileFooterButtonGroup } from "./footerButton/userProfileFooterButton.component";
import { UserAccountInformation } from "./userAccountInformation/userAccountInformation.component";
import { SendNoteFailure } from "../../../send3MNote/popUps/failurePopUp/sendNoteFailure.component";
import { AddFacilityContext } from "../../../manageProfile/facilityInformation/addFacilityContainer/addFacilityContainer.context";
import { AddFacilityContainer } from "../../../manageProfile/facilityInformation/addFacilityContainer/addFacilityContainer.component";
import { UserProfileValidator } from "./userProfile.validator";

export const UserProfile = () => {
  const userProfileObj = useContext<UserProfileContextType | null>(
    UserProfileContext
  );
  const authObj = useContext<AuthContextType | null>(AuthContext);
  const history = useHistory();
  const location: any = useLocation();
  const isAddingNewUser = location.state.isAddingNewUser;
  const selectedUserName = location.state.selectedUserName;
  const [siteUseId, setSiteUseId] = useState<string>(
    authObj?.registeredFaciltyAddress?.siteUseId ?? ""
  );

  const [licenseType, setLicenseType] = React.useState([]);
  const [department, setDepartment] = React.useState([]);

  const [message, setMessage] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const [facilities, setFacilities] = useState<IFacilityToUser[]>([]);
  const [openLoaderPopUp, setOpenLoaderPopUp] = useState<boolean>(false);
  const [openAddFacilityPopUp, setOpenAddFacilityPopUp] =
    useState<boolean>(false);
  const [showSelectAllBtn, setShowSelectAllBtn] = useState<boolean>(false);
  const [isAddBtnEnabled, setIsAddBtnEnabled] = useState<boolean>(false);
  const [isNavigationBackRequired, setIsNavigationBackRequired] =
    useState<boolean>(false);

  const [resetPasswordSuccessPopUp, setResetPasswordSuccessPopUp] =
    useState<boolean>(false);
  const [resetPasswordFailurePopUp, setResetPasswordFailurePopUp] =
    useState<boolean>(false);

  const [updateDetailsSuccessPopUp, setUpdateDetailsSuccessPopUp] =
    useState<boolean>(false);

  const getUserDetailsFromServer = async () => {
    setOpenLoaderPopUp(true);
    const result = await Promise.all([
      getUserDetailsAPI(),
      fetchdropDownContent(),
    ]);
    setOpenLoaderPopUp(false);
    if (result.length === 2) {
      if (!result[0]) {
        setIsNavigationBackRequired(true);
        setMessage(
          "Your request to fetch user details has failed. Please try again or contact 3M for assistance with this user 1-800-275-4524."
        );
        setResetPasswordFailurePopUp(true);
      } else {
        const userDetails = result[0];
        const validator = new UserProfileValidator();
        const data = userProfileObj!.profileDetails;
        let tempData = {
          ...data,
          firstName: {
            value: userDetails.firstName,
            valid:
              validator.validate(userDetails.firstName, "firstName")?.status ??
              ValidationStatus.UNTOUCHED,
            required: true,
          },
          lastName: {
            value: userDetails.lastName,
            valid:
              validator.validate(userDetails.lastName, "lastName")?.status ??
              ValidationStatus.UNTOUCHED,
            required: true,
          },
          userName: {
            value: userDetails.userName,
            valid:
              validator.validate(userDetails.userName, "userName")?.status ??
              ValidationStatus.UNTOUCHED,
            required: true,
          },
          title: {
            value: userDetails.title,
            valid: userDetails.title
              ? validator.validate(userDetails.title, "title")?.status ??
                ValidationStatus.UNTOUCHED
              : ValidationStatus.UNTOUCHED,
            required: true,
          },
          email: {
            value: userDetails.emailAddress,
            valid:
              validator.validate(userDetails.emailAddress, "email")?.status ??
              ValidationStatus.UNTOUCHED,
            required: true,
          },
          phone: {
            value: userDetails.mobilePhoneNo
              ? formatPhoneNumber(userDetails.mobilePhoneNo)
              : `${formatPhoneNumber(userDetails.phoneNo)}${
                  userDetails.extension ? ` ext.${userDetails.extension}` : ""
                }`,
            valid: ValidationStatus.VALID,
            required: true,
          },
          department: {
            value: userDetails.departmentName,
            valid: ValidationStatus.VALID,
            required: true,
          },
          licenseType: {
            value: userDetails.licenceType,
            valid: ValidationStatus.VALID,
            required: true,
          },
          facilities: userDetails.facilities ?? [],
        };
        updatePermissionCount(tempData, userDetails.facilities ?? []);
      }
    }
  };

  const getUserDetailsAPI = async () => {
    if (
      authObj &&
      authObj.userProfile &&
      authObj.userProfile.userName !== "" &&
      authObj.registeredFaciltyAddress &&
      authObj.registeredFaciltyAddress.siteUseId &&
      authObj.registeredFaciltyAddress.siteUseId !== "" &&
      selectedUserName
    ) {
      const params = {
        Username: authObj.userProfile.userName,
        SelectedUsername: selectedUserName,
        SiteUseId: authObj.registeredFaciltyAddress.siteUseId,
      };
      const response = await getUserDetails(params);
      if (response && response.succeeded) {
        return response.data;
      } else {
        return null;
      }
    }
  };

  const fetchdropDownContent = async () => {
    try {
      const ddContent = format(
        "{0},{1}",
        DD_LICENSE_CONTENT,
        DD_DEPARTMENT_CONTENT ?? ""
      );
      const data = await getdropDownContent(ddContent);
      if (data.items.length > 0) {
        const licenseObject = data.items.filter(
          (item: { name: string }) => item.name === DD_LICENSE_CONTENT
        );
        const licenseData = licenseObject[0].data
          .sort((a: { order: number }, b: { order: number }) =>
            a.order > b.order ? 1 : -1
          )
          .map((x: { code: any }) => x.code);
        setLicenseType(licenseData);
        const departmentObject = data.items.filter(
          (item: { name: string }) => item.name === DD_DEPARTMENT_CONTENT
        );
        const departmentData = departmentObject[0].data
          .sort((a: { order: number }, b: { order: number }) =>
            a.order > b.order ? 1 : -1
          )
          .map((x: { code: any }) => x.code);
        setDepartment(departmentData);
        return [licenseData, departmentData];
      }
      return [];
    } catch (error) {
      console.log("error", error);
      return [];
    }
  };

  const fetchFacilities = async () => {
    if (
      authObj &&
      authObj.userProfile &&
      authObj.userProfile.userName !== "" &&
      selectedUserName
    ) {
      setOpenLoaderPopUp(true);
      const params = {
        Username: authObj.userProfile.userName,
        SelectedUsername: selectedUserName,
      };
      const response = await getFacilityDetails(params);
      setOpenLoaderPopUp(false);
      if (response && response.succeeded) {
        let allFacilities = response.data;
        allFacilities.forEach((facility: IFacilityToUser) => {
          const data = userProfileObj!.profileDetails;
          const existingFacilities = data.facilities.filter(
            (existingFacility: IUserFacilityData) =>
              existingFacility.siteUseId === facility.siteUseId
          );
          facility.isOriginalSelected = facility.isSelected;
          if (existingFacilities.length > 0) {
            facility.isSelected = true;
          } else {
            facility.isSelected = false;
          }
          facility.activityStauts = facility.isSelected ? 1 : null;
        });
        setFacilities(allFacilities);
        setShowSelectAllBtn(false);
        setOpenAddFacilityPopUp(true);
      } else {
        setIsNavigationBackRequired(false);
        setOpenLoaderPopUp(false);
        setMessage(
          "Your request to fetch facilities has failed. Please try again or contact 3M for assistance with this user 1-800-275-4524."
        );
        setResetPasswordFailurePopUp(true);
      }
    }
  };

  const resetPasswordAPI = async (userName: string) => {
    const params = {
      Username: userName,
    };
    setOpenLoaderPopUp(true);
    const response = await resetPassword(params);
    setOpenLoaderPopUp(false);
    if (response && !response.succeeded) {
      setResetPasswordSuccessPopUp(true);
    } else {
      setIsNavigationBackRequired(false);
      setMessage(
        "Your request to initiate a password Reset for the user has failed. Please try again or contact 3M for assistance with this user 1-800-275-4524."
      );
      setResetPasswordFailurePopUp(true);
    }
  };

  const getRolePermissionsInfo = async (siteUseId: string) => {
    const reqBody = {
      siteUseId: siteUseId,
    };
    const response = await getRolePermissions(reqBody);
    if (response && response.succeeded) {
      const permissions = response.data.permissions;
      if (permissions.length > 0) {
        const validFacilityPermissionArray: [] = permissions.filter(
          (x: any) => getFacilityPermissionName(x.permissionName) !== ""
        );
        return {
          siteUseId: siteUseId,
          permissions: validFacilityPermissionArray,
        };
      }
    }
    setOpenLoaderPopUp(false);
    return {
      siteUseId: siteUseId,
      permissions: [],
    };
  };

  const updateUserDetailsAPI = async () => {
    setOpenLoaderPopUp(true);
    const data = userProfileObj!.profileDetails;
    const params = {
      firstName: data.firstName.value,
      lastName: data.lastName.value,
      userName: authObj?.userProfile?.userName ?? "",
      title: data.title.value,
      licenceType: data.licenseType.value,
      departmentName: data.department.value,
      facilityInfo:
        data.facilities.length > 0 ? mappFacilityInfo(data.facilities) : null,
      selectedUserName: selectedUserName,
    };
    const reqBody = JSON.stringify(params);
    const response = await updateUserDetails(reqBody);
    setOpenLoaderPopUp(false);
    if (response && response.succeeded) {
      setUpdateDetailsSuccessPopUp(true);
    } else {
      setMessage(
        "Your request to update the user profile details has failed. Please try again or contact 3M for assisstance with this user 1-800-275-4524."
      );
      setResetPasswordFailurePopUp(true);
    }
  };

  const addFacilitiesFromSearch = (results: any) => {
    const facilityList: IFacility[] = results;
    let tempFacilities: IFacilityToUser[] = [];
    facilityList.forEach((facility: IFacility) => {
      const facilityToUser: IFacilityToUser = {
        activityStauts: 2,
        address1: facility.address1,
        address2: facility.address2,
        city: facility.city,
        facilityAddressID: facility.facilityAddressID ?? "",
        facilityName: facility.accountName,
        isSelected: false,
        isOriginalSelected: false,
        number: facility.accountNumber,
        siteUseId: facility.siteUseId?.toString() ?? "",
        state: facility.state,
        zipCode: facility.zip.toString(),
      };
      tempFacilities.push(facilityToUser);
    });
    setFacilities(tempFacilities);
    setOpen(false);
    setOpenAddFacilityPopUp(true);
    setShowSelectAllBtn(false);
  };

  const addFacilityButtonClick = () => {
    if (authObj?.isInternalUser || isAddingNewUser) {
      setOpen(true);
      setOpenLoaderPopUp(false);
      setOpenAddFacilityPopUp(false);
    } else {
      fetchFacilities();
    }
  };

  const resetPasswordBtnAction = () => {
    if (selectedUserName && selectedUserName !== "") {
      resetPasswordAPI(selectedUserName);
    }
  };

  const closeResetPasswordSuccessPopUp = () => {
    setResetPasswordSuccessPopUp(false);
  };

  const selectOrDeselectAllBtnAction = (isSelected: boolean) => {
    let tempData = [...facilities];
    tempData.forEach((facility: IFacilityToUser) => {
      facility.isSelected = isSelected;
    });
    setFacilities(tempData);
    updateAddBtnEnable();
  };

  const addNewFacilities = () => {
    closeAddFacilityPopUp();
    if (userProfileObj) {
      const originalFacilities: IUserFacilityData[] =
        userProfileObj!.profileDetails.facilities;
      const selectedFacilities = facilities.filter(
        (facility: IFacilityToUser) => facility.isSelected
      );
      let updatingFacilities: IUserFacilityData[] = [];
      selectedFacilities.forEach((facility: IFacilityToUser, index: number) => {
        let selectedFacility: IUserFacilityData;
        const filteredFacilities = originalFacilities.filter(
          (originalFacility: IUserFacilityData) =>
            originalFacility.siteUseId === facility.siteUseId
        );
        selectedFacility = filteredFacilities[0];
        if (!selectedFacility) {
          let facilityAddressId = parseInt(facility.facilityAddressID);
          selectedFacility = {
            activityStauts: facility.activityStauts!,
            accountName: facility.facilityName,
            accountNumber: facility.number!,
            address1: facility.address1,
            address2: facility.address2,
            city: facility.city,
            facilityAddressID: isNaN(facilityAddressId) ? 0 : facilityAddressId,
            siteUseId: facility.siteUseId,
            state: facility.state,
            zip: facility.zipCode,
            userRole: "Clinician",
            status: "Active",
            permissions: null,
            enabledPermissionsCount: 0,
          };
        }
        updatingFacilities.push(selectedFacility);
      });
      checkPermissionDetails(updatingFacilities);
    }
  };

  const closeAddFacilityPopUp = () => {
    setOpenAddFacilityPopUp(false);
  };

  const handleChangeToFacilityList = (
    e: any,
    facility: IFacilityToUser,
    index: number
  ) => {
    let oldStatus = facility.activityStauts;
    facility.isSelected = e.target.checked;
    if (facility.isSelected) {
      facility.activityStauts =
        oldStatus && facility.isOriginalSelected ? 1 : 2;
    } else {
      facility.activityStauts = 3;
    }
    let tempData = [...facilities];
    facilities.splice(index, 1, facility);
    setFacilities(tempData);
    if (!showSelectAllBtn) setShowSelectAllBtn(true);
    updateAddBtnEnable();
  };

  const updateAddBtnEnable = () => {
    const isEnabled = facilities.some(
      (facility: IFacilityToUser) => facility.isSelected
    );
    setIsAddBtnEnabled(isEnabled);
  };

  const checkPermissionDetails = async (
    latestFacilities: IUserFacilityData[]
  ) => {
    let apiCollections: any[] = [];
    if (latestFacilities.length > 0) {
      const permissionRequiredFacilities = latestFacilities.filter(
        (facility: IUserFacilityData) => !facility.permissions
      );
      if (permissionRequiredFacilities.length > 0) {
        permissionRequiredFacilities.forEach((facility: IUserFacilityData) => {
          apiCollections.push(getRolePermissionsInfo(facility.siteUseId));
        });
        setOpenLoaderPopUp(true);
        let result = await Promise.all(apiCollections);
        setOpenLoaderPopUp(false);
        if (result.length === permissionRequiredFacilities.length) {
          result.forEach((data: any) => {
            const filteredFacilities = latestFacilities.filter(
              (facility: IUserFacilityData) =>
                facility.siteUseId === data.siteUseId
            );
            if (filteredFacilities.length > 0) {
              let filteredFacility = filteredFacilities[0];
              filteredFacility.permissions = data.permissions.map(
                (permission: any) => {
                  return {
                    name: permission.permissionName,
                    status: permission.adminRegistered,
                  };
                }
              );
              filteredFacility.enabledPermissionsCount =
                filteredFacility.permissions?.filter(
                  (permission: any) => permission.status
                ).length;
            }
          });
        }
        userProfileObj!.setProfileDetails({
          ...userProfileObj!.profileDetails,
          facilities: latestFacilities,
        });
      } else {
        userProfileObj!.setProfileDetails({
          ...userProfileObj!.profileDetails,
          facilities: latestFacilities,
        });
      }
    }
  };

  const closeBtnActionForFailurePopUp = () => {
    setResetPasswordFailurePopUp(false);
    if (isNavigationBackRequired) {
      history.goBack();
    }
    setIsNavigationBackRequired(false);
  };

  const cancelBtnAction = () => {
    history.goBack();
  };

  const updateUserProfileBtnAction = async () => {
    const validator = new UserProfileValidator();
    const data = userProfileObj!.profileDetails;
    const setData = userProfileObj!.setProfileDetails;
    const isAllValid = await validator.validateAll(data, setData);
    if (isAllValid === ValidationStatus.VALID) {
      updateUserDetailsAPI();
    }
  };

  const mappFacilityInfo = (facilities: IUserFacilityData[]) => {
    let mappedFacility: any[] = [];
    facilities.map((facility: IUserFacilityData) => {
      facility.permissions?.forEach((permission: IUserPermissionsData) => {
        permission.status = permission.status === "Enabled";
      });
      const faclityDetails = {
        activityStatus: facility.activityStauts ?? 1,
        facilityAddressID: facility.facilityAddressID
          ? facility.facilityAddressID.toString()
          : null,
        siteUseId: facility.siteUseId,
        userRole: facility.userRole,
        status: facility.status.toLowerCase() === "active" ? true : false,
        permissions: facility.permissions,
      };
      mappedFacility.push(faclityDetails);
    });
    return mappedFacility;
  };

  const updatePermissionCount = (
    data: IUserProfile,
    facilitiesFromAPI: IUserFacilityData[]
  ) => {
    console.log("facilities --- ", facilities, data);
    const latestFacilities: IUserFacilityData[] = [];
    Array.isArray(facilitiesFromAPI) &&
      facilitiesFromAPI.map((facility: IUserFacilityData) => {
        const permissions: IUserPermissionsData[] | null = facility.permissions;
        if (permissions && permissions.length > 0) {
          let enabledPermissions = permissions.filter(
            (permission: IUserPermissionsData) =>
              (typeof permission.status === "string" &&
                permission.status === "Enabled") ||
              (typeof permission.status === "boolean" && permission.status)
          );
          facility.enabledPermissionsCount = enabledPermissions.length;
        }
        latestFacilities.push(facility);
      });
    console.log("latestFacilities --- ", latestFacilities);

    userProfileObj!.setProfileDetails({
      ...data,
      facilities: latestFacilities,
    });
  };

  useEffect(() => {
    if (
      !isAddingNewUser &&
      authObj &&
      authObj.registeredFaciltyAddress &&
      authObj.registeredFaciltyAddress.siteUseId &&
      authObj.registeredFaciltyAddress.siteUseId !== "" &&
      authObj.registeredFaciltyAddress.siteUseId !== siteUseId
    ) {
      history.goBack();
    }
  }, [authObj?.registeredFaciltyAddress?.siteUseId]);

  useEffect(() => {
    if (isAddingNewUser) {
      fetchdropDownContent();
    } else {
      if (userProfileObj!.profileDetails.firstName.value === "") {
        if (!selectedUserName || selectedUserName === "") {
          history.goBack();
        } else {
          setSiteUseId(authObj!.registeredFaciltyAddress!.siteUseId!);
          getUserDetailsFromServer();
        }
      }
    }
  }, []);

  return (
    <div
      className="user-profile-component"
      data-testid="user-profile-component"
    >
      <div className="user-profile-container">
        <Navigator
          array={[
            {
              route: "/administration",
              pageName: "Administration",
            },
            {
              route: "/administration/manageUsers",
              pageName: "Manage Users",
            },
          ]}
          className="user-profile-route-section"
          title="User profile"
        />
        <div
          className="user-profile-hearder"
          data-testid="user-profile-hearder"
        >
          <span>
            User profile for
            {makeCapitalEachWordInString(
              ` ${userProfileObj?.profileDetails.firstName.value} ${userProfileObj?.profileDetails.lastName.value}`
            )}
          </span>
        </div>
        <UserAccountInformation
          data={userProfileObj?.profileDetails!}
          setData={userProfileObj?.setProfileDetails!}
          licenseType={licenseType}
          department={department}
        />
        <Button
          className="reset-password"
          data-testid="reset-password"
          onClick={resetPasswordBtnAction}
          variant="outlined"
        >
          Reset password
        </Button>
        <SiteAccess
          addFacilityButtonClick={addFacilityButtonClick!}
          facilities={userProfileObj?.profileDetails.facilities!}
          isAddingNewUser={isAddingNewUser}
          setData={userProfileObj?.setProfileDetails!}
        />

        <UserProfileFooterButtonGroup
          firstButtonTitle="Cancel"
          firstButtonAction={cancelBtnAction}
          secondButtonTitle="Update User"
          secondButtonAction={updateUserProfileBtnAction}
        />
        <AddFacilityContext.Provider
          value={{
            closePopup: () => setOpen(false),
            facilitySearchValidator: new Validator(),
            addFacilityToList: addFacilitiesFromSearch,
          }}
        >
          <Popup
            dialogParentClass="add-facility-popup"
            openFlag={open}
            closeHandler={() => setOpen(false)}
          >
            <AddFacilityContainer isForAdminFlow={true} isForNewOrder={false} />
          </Popup>
        </AddFacilityContext.Provider>
        <Popup
          openFlag={openLoaderPopUp}
          closeHandler={() => setOpenLoaderPopUp(false)}
          dialogParentClass={"add-facility-loader-pop-up"}
          data-testid="loader-pop-up"
          hideCloseButton={true}
        >
          <div className="add-facility-loader">
            <LoadingSpinner />
          </div>
        </Popup>
        <Popup
          openFlag={openAddFacilityPopUp}
          closeHandler={closeAddFacilityPopUp}
          dialogParentClass={"add-facility-pop-up"}
          data-testid="add-facility-pop-up"
        >
          <div className="add-facility">
            <AddFacilityToUser
              addBtnAction={addNewFacilities}
              cancelBtnAction={closeAddFacilityPopUp}
              deselectAllBtnAction={() => {
                selectOrDeselectAllBtnAction(false);
              }}
              facilities={facilities}
              handleChange={handleChangeToFacilityList}
              isAddBtnEnabled={isAddBtnEnabled}
              showSelectAllBtn={showSelectAllBtn}
              selectAllBtnAction={() => {
                selectOrDeselectAllBtnAction(true);
              }}
            />
          </div>
        </Popup>
        <Popup
          openFlag={resetPasswordSuccessPopUp}
          closeHandler={() => setResetPasswordSuccessPopUp(false)}
          dialogParentClass={"reset-password-success-pop-up"}
          data-testid="reset-password-success-pop-up"
        >
          <div className="reset-password-success">
            <p className="title">Password Reset</p>
            <p className="description">
              Password reset has been sent to
              <span className="email">
                {userProfileObj!.profileDetails.email.value}
              </span>
              .
            </p>
            <Button
              className="close-btn"
              onClick={closeResetPasswordSuccessPopUp}
              variant="contained"
            >
              Close
            </Button>
          </div>
        </Popup>
        <Popup
          openFlag={resetPasswordFailurePopUp}
          closeHandler={closeBtnActionForFailurePopUp}
          dialogParentClass={"reset-password-failure-pop-up"}
          data-testid="reset-password-failure-pop-up"
        >
          <div className="reset-password-failure-pop-up-div">
            <SendNoteFailure
              backButtonAction={closeBtnActionForFailurePopUp}
              message={message}
            />
          </div>
        </Popup>
        <Popup
          openFlag={updateDetailsSuccessPopUp}
          closeHandler={() => setUpdateDetailsSuccessPopUp(false)}
          dialogParentClass={"update-user-success-pop-up"}
          data-testid="update-user-success-pop-up"
        >
          <div className="update-user-success">
            <p className="description">
              You have successfully updated the user profile details.
            </p>
            <Button
              className="ok-btn"
              onClick={cancelBtnAction}
              variant="contained"
            >
              Ok
            </Button>
          </div>
        </Popup>
      </div>
    </div>
  );
};
