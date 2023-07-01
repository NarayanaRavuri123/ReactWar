import {
  cleanup,
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Router } from "react-router-dom";
import { RolesPermissionContext } from "../../../../context/RolesPermissionContext";
import { facilityList } from "../../../../mockData/facilityList";
import { IPermissionData } from "../../../../RolesPermission/RolesPermission.model";
import { FacilityBannerAdmin } from "../facilityBannerAdmin.component";
import { createMemoryHistory } from "history";

export let defaultTestPermissionDataModelBanner: IPermissionData = {
  IsShowStartNewOrder: true,
  IsShowSupplyOrderButton: true,
  IsShowVacOrderButton: true,
  IsShowInventoryOption: false,
  IsShowAdminstrationOption: false,
  IsSupportRole: false,
  IsSalesRole: false,
  IsSalesManagerRole: false,
  IsFacilityAdminRole: true,
  IsManageUsersBtn: true,
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
describe("FacilityBannerAdmin ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("Facility Admin Bananer render", () => {
    render(<FacilityBannerAdmin userLinkedFacilityData={facilityList} />);
    const facilityBannerAdmin = screen.getByTestId("facilityBannerAlign");
    expect(facilityBannerAdmin).toBeInTheDocument();
  });

  it("Facility Admin Facility Label Div", () => {
    render(<FacilityBannerAdmin userLinkedFacilityData={[facilityList[0]]} />);
    const description = screen.getByTestId("label-admin");
    expect(description).toBeInTheDocument();
  });
  it("does not render Manage Users button for Facility Admin without permission", () => {
    const permissionDataWithoutManageUsers = {
      ...defaultTestPermissionDataModelBanner,
      IsManageUsersBtn: false,
    };
    render(
      <RolesPermissionContext.Provider
        value={{
          mappedRolesPermissionData: permissionDataWithoutManageUsers,
          setMappedRolesPermissionData: () => {},
        }}
      >
        <FacilityBannerAdmin userLinkedFacilityData={facilityList} />
      </RolesPermissionContext.Provider>
    );
    const manageUserButton = screen.queryByTestId("manage-user-btn");
    expect(manageUserButton).not.toBeInTheDocument();
  });
  it("3M Admin Change Facility Button is Present", async () => {
    const mockOpenPopUp = jest.fn();
    let updatedData;
    defaultTestPermissionDataModelBanner.Is3MAdminRole = true;
    updatedData = defaultTestPermissionDataModelBanner;
    render(
      <RolesPermissionContext.Provider
        value={{
          mappedRolesPermissionData: updatedData,
          setMappedRolesPermissionData: () => {},
        }}
      >
        <FacilityBannerAdmin
          userLinkedFacilityData={facilityList}
          handlePopUp={mockOpenPopUp}
        />
      </RolesPermissionContext.Provider>
    );
    const btn = screen.getByTestId(
      "facility-manage-user-btn-change-Facility-admin"
    ) as HTMLElement;
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveTextContent("Change Facility");
  });

  it("Support Change Facility Button is Present", async () => {
    const mockOpenPopUp = jest.fn();
    let updatedData;
    defaultTestPermissionDataModelBanner.IsSupportRole = true;
    updatedData = defaultTestPermissionDataModelBanner;
    render(
      <RolesPermissionContext.Provider
        value={{
          mappedRolesPermissionData: updatedData,
          setMappedRolesPermissionData: () => {},
        }}
      >
        <FacilityBannerAdmin
          userLinkedFacilityData={facilityList}
          handlePopUp={mockOpenPopUp}
        />
      </RolesPermissionContext.Provider>
    );
    const btn = screen.getByTestId(
      "facility-manage-user-btn-change-Facility-admin"
    ) as HTMLElement;
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveTextContent("Change Facility");
  });
  it("Product Manager Change Facility Button is Present", async () => {
    const mockOpenPopUp = jest.fn();
    let updatedData;
    defaultTestPermissionDataModelBanner.IsProdManagerRole = true;
    updatedData = defaultTestPermissionDataModelBanner;
    render(
      <RolesPermissionContext.Provider
        value={{
          mappedRolesPermissionData: updatedData,
          setMappedRolesPermissionData: () => {},
        }}
      >
        <FacilityBannerAdmin
          userLinkedFacilityData={facilityList}
          handlePopUp={mockOpenPopUp}
        />
      </RolesPermissionContext.Provider>
    );
    const btn = screen.getByTestId(
      "facility-manage-user-btn-change-Facility-admin"
    ) as HTMLElement;
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveTextContent("Change Facility");
  });
  it("Product Manager Facility Settings Button is Present", async () => {
    const mockOpenPopUp = jest.fn();
    let updatedData;
    defaultTestPermissionDataModelBanner.IsProdManagerRole = true;
    updatedData = defaultTestPermissionDataModelBanner;
    render(
      <RolesPermissionContext.Provider
        value={{
          mappedRolesPermissionData: updatedData,
          setMappedRolesPermissionData: () => {},
        }}
      >
        <FacilityBannerAdmin
          userLinkedFacilityData={facilityList}
          handlePopUp={mockOpenPopUp}
        />
      </RolesPermissionContext.Provider>
    );
    const btn = screen.getByTestId(
      "facility-manage-user-btn-faciltity-admin"
    ) as HTMLElement;
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveTextContent("Facility Settings");
  });

  it("Support Facility Settings Button is Present", async () => {
    const mockOpenPopUp = jest.fn();
    let updatedData;
    defaultTestPermissionDataModelBanner.IsSupportRole = true;
    updatedData = defaultTestPermissionDataModelBanner;
    render(
      <RolesPermissionContext.Provider
        value={{
          mappedRolesPermissionData: updatedData,
          setMappedRolesPermissionData: () => {},
        }}
      >
        <FacilityBannerAdmin
          userLinkedFacilityData={facilityList}
          handlePopUp={mockOpenPopUp}
        />
      </RolesPermissionContext.Provider>
    );
    const btn = screen.getByTestId(
      "facility-manage-user-btn-faciltity-admin"
    ) as HTMLElement;
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveTextContent("Facility Settings");
  });
  it("3M Admin Facility Settings Button is Present", async () => {
    const mockOpenPopUp = jest.fn();
    let updatedData;
    defaultTestPermissionDataModelBanner.IsSupportRole = true;
    updatedData = defaultTestPermissionDataModelBanner;
    render(
      <RolesPermissionContext.Provider
        value={{
          mappedRolesPermissionData: updatedData,
          setMappedRolesPermissionData: () => {},
        }}
      >
        <FacilityBannerAdmin
          userLinkedFacilityData={facilityList}
          handlePopUp={mockOpenPopUp}
        />
      </RolesPermissionContext.Provider>
    );
    const btn = screen.getByTestId(
      "facility-manage-user-btn-faciltity-admin"
    ) as HTMLElement;
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveTextContent("Facility Settings");
  });

  it("Sales Manager change Facility Button is Present", async () => {
    const mockOpenPopUp = jest.fn();
    let updatedData;
    defaultTestPermissionDataModelBanner.IsSalesManagerRole = true;
    updatedData = defaultTestPermissionDataModelBanner;
    render(
      <RolesPermissionContext.Provider
        value={{
          mappedRolesPermissionData: updatedData,
          setMappedRolesPermissionData: () => {},
        }}
      >
        <FacilityBannerAdmin
          userLinkedFacilityData={facilityList}
          handlePopUp={mockOpenPopUp}
        />
      </RolesPermissionContext.Provider>
    );
    const btn = screen.getByTestId(
      "facility-manage-user-btn-facility-sales"
    ) as HTMLElement;
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveTextContent("Change Facility");
  });

  it("Sales Role change Facility Button is Present", async () => {
    const mockOpenPopUp = jest.fn();
    let updatedData;
    defaultTestPermissionDataModelBanner.IsSalesManagerRole = true;
    updatedData = defaultTestPermissionDataModelBanner;
    render(
      <RolesPermissionContext.Provider
        value={{
          mappedRolesPermissionData: updatedData,
          setMappedRolesPermissionData: () => {},
        }}
      >
        <FacilityBannerAdmin
          userLinkedFacilityData={facilityList}
          handlePopUp={mockOpenPopUp}
        />
      </RolesPermissionContext.Provider>
    );
    const btn = screen.getByTestId(
      "facility-manage-user-btn-facility-sales"
    ) as HTMLElement;
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveTextContent("Change Facility");
  });
});
