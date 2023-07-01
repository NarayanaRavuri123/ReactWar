import { MemoryRouter } from "react-router-dom";
import { cleanup, render, screen } from "@testing-library/react";
import { SalesRoleManageProfile } from "../salesRoleManageProfile.component";
import React from "react";
import { IPermissionData } from "../../../../RolesPermission/RolesPermission.model";
import { ProfileFormContext } from "../../../../context/ProfileFormContext";
import { RolesPermissionContext } from "../../../../context/RolesPermissionContext";
import { getMockRegistrationFormData } from "../../../../signUp/registration/registrationForm/registrationFormMockContextData";

export let defaultTestPermissionDataModel: IPermissionData = {
  IsShowStartNewOrder: true,
  IsShowSupplyOrderButton: true,
  IsShowVacOrderButton: true,
  IsShowInventoryOption: false,
  IsShowAdminstrationOption: false,
  IsSupportRole: false,
  IsSalesRole: true,
  IsSalesManagerRole: false,
  IsFacilityAdminRole: false,
  IsClinicianRole: false,
  IsBaseRole: false,
  Is3MAdminRole: false,
  IsProdManagerRole: false,
  IsAdminFacilitySettingsButton: false,
  IsAdminFacilityUsersButton: false,
  IsAdminMyListsButton: false,
  IsAdminRolesPermissionButton: false,
  IsAdminUserAccounts: false,
  IsShowManageAccountMenu: false,
  IsPrdMgrSiteStatus: false,
  IsShowAddWoundAssessmentMenu: false,
};

describe("Sales Role Manage Profile component ->", () => {
  afterAll(() => {
    cleanup();
  });

  it("Sales manage profile Component render", () => {
    render(
      <RolesPermissionContext.Provider
        value={{
          mappedRolesPermissionData: defaultTestPermissionDataModel,
          setMappedRolesPermissionData: () => {},
        }}
      >
        <SalesRoleManageProfile />
      </RolesPermissionContext.Provider>
    );
    const component = screen.getByTestId("salesManage-profile");
    expect(component).toBeInTheDocument();
  });
  it("Sales manage profile Header present or not", () => {
    render(
      <RolesPermissionContext.Provider
        value={{
          mappedRolesPermissionData: defaultTestPermissionDataModel,
          setMappedRolesPermissionData: () => {},
        }}
      >
        <SalesRoleManageProfile />
      </RolesPermissionContext.Provider>
    );
    const Header = screen.getByTestId("salesManage-profile-territory");
    expect(Header).toBeInTheDocument();
  });
  it("Sales manage profile Territory subheading  present or not", () => {
    const territoryDetails = [
      {
        name: "",
        roleType: "",
        regionDistrict: "",
        code: "",
        assignedFrom: "",
        assignedTo: "",
        isPrimary: false,
      },
    ];
    render(
      <MemoryRouter initialEntries={["/"]}>
        <RolesPermissionContext.Provider
          value={{
            mappedRolesPermissionData: defaultTestPermissionDataModel,
            setMappedRolesPermissionData: () => {},
          }}
        >
          <ProfileFormContext.Provider
            value={{
              ...getMockRegistrationFormData(),
              territoryData: territoryDetails,
            }}
          >
            <SalesRoleManageProfile />
          </ProfileFormContext.Provider>
        </RolesPermissionContext.Provider>
      </MemoryRouter>
    );
    const subHeading = screen.getByTestId("salesTerritory-container");
    expect(subHeading).toBeInTheDocument();
    expect(subHeading).toHaveTextContent("Role");
    const subHeading1 = screen.getByTestId("salesRegionCodeLable");
    expect(subHeading1).toBeInTheDocument();
    const subHeading2 = screen.getByTestId("salesAssignmentLable");
    expect(subHeading2).toBeInTheDocument();
    const subHeading3 = screen.getByTestId("salesTerritoryCodeNameLable");
    expect(subHeading3).toBeInTheDocument();
  });
});
