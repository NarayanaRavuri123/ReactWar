import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { RolesPermissionContext } from "../../../context/RolesPermissionContext";
import { IPermissionData } from "../../../RolesPermission/RolesPermission.model";
import Inventory from "../inventory.component";

describe("Inventory component ->", () => {
  afterAll(() => {
    cleanup();
  });
  let defaultTestPermissionDataModel: IPermissionData = {
    IsShowStartNewOrder: true,
    IsShowSupplyOrderButton: true,
    IsShowVacOrderButton: true,
    IsShowInventoryOption: true,
    IsShowAdminstrationOption: false,
    IsSupportRole: false,
    IsSalesRole: true,
    IsSalesManagerRole: false,
    IsFacilityAdminRole: false,
    IsClinicianRole: false,
    IsBaseRole: false,
    Is3MAdminRole: false,
    IsProdManagerRole: false,
    IsAdminFacilitySettingsButton: true,
    IsAdminFacilityUsersButton: true,
    IsAdminMyListsButton: true,
    IsAdminRolesPermissionButton: true,
    IsAdminUserAccounts: true,
    IsPrdMgrSiteStatus: true,
    IsShowManageAccountMenu: false,
    IsShowAddWoundAssessmentMenu: false,
  };

  it("Inventory title present", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <RolesPermissionContext.Provider
          value={{
            mappedRolesPermissionData: defaultTestPermissionDataModel,
            setMappedRolesPermissionData: () => {},
          }}
        >
          <Inventory />
        </RolesPermissionContext.Provider>
      </MemoryRouter>
    );
    const title = screen.getByTestId("inventoryTitle_test");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Inventory");
  });

  it("Request Inventory Adjustment button title present and button action", () => {
    const mockredirectToInventoryAdjPage = jest.fn();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <RolesPermissionContext.Provider
          value={{
            mappedRolesPermissionData: defaultTestPermissionDataModel,
            setMappedRolesPermissionData: () => {},
          }}
        >
          <Inventory
            redirectToInventoryAdjPage={mockredirectToInventoryAdjPage}
          />
        </RolesPermissionContext.Provider>
      </MemoryRouter>
    );
    const title = screen.getByTestId("requestAdjBtnTest");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Request Inventory Adjustment");
    expect(title).not.toBeDisabled();
    userEvent.click(title);
    expect(mockredirectToInventoryAdjPage).toHaveBeenCalled();
    expect(mockredirectToInventoryAdjPage).toHaveBeenCalledTimes(1);
  });
  it("Start Ready Care Order button title present and button action", async () => {
    const mockRedirectToNewOrderPage = jest.fn();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <RolesPermissionContext.Provider
          value={{
            mappedRolesPermissionData: defaultTestPermissionDataModel,
            setMappedRolesPermissionData: () => {},
          }}
        >
          <Inventory redirectToNewOrderPage={mockRedirectToNewOrderPage} />
        </RolesPermissionContext.Provider>
      </MemoryRouter>
    );
    const title = screen.getByTestId("startNewOrderBtn");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Start V.A.C.® Ready Care Order");
    expect(title).not.toBeDisabled();
    userEvent.click(title);
    expect(mockRedirectToNewOrderPage).toHaveBeenCalled();
    expect(mockRedirectToNewOrderPage).toHaveBeenCalledTimes(1);
  });
  it("Inventory list table present", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <RolesPermissionContext.Provider
          value={{
            mappedRolesPermissionData: defaultTestPermissionDataModel,
            setMappedRolesPermissionData: () => {},
          }}
        >
          <Inventory />
        </RolesPermissionContext.Provider>
      </MemoryRouter>
    );
    const title = screen.getByTestId("inventory-list");
    expect(title).toBeInTheDocument();
  });
});
