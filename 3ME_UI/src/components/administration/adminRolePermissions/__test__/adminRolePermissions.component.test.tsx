import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { AdminRolesPermissions } from "../adminRolesPermissions.component";
import { getDeepClone } from "../../../../util/ObjectFunctions";
import {
  adminRegisteredPermissionData,
  registeredPermissionData,
} from "../adminRolePermissions.data";
import userEvent from "@testing-library/user-event";
import { IPermissionDetails } from "../adminRolesPermissions.interface";
import { RegisteredPermissions } from "../registeredPermission/registeredPermissions.component";
import { FooterButtonGroup } from "../../../send3MNote/footerButtonGroup/footerButtonGroup.component";
import { AdminRolesPermissionsContext } from "../../../../context/AdminRolesPermissionsContext";
import { facilityMockData } from "../../../manageProfile/facilityInformation/facilityFound/facilityFound.interface";

jest.mock("../../../../core/popup/popup.component");

describe("role permissions component", () => {
  afterAll(() => {
    cleanup();
  });

  it("Role Permissions header validation", () => {
    const permissions: any = registeredPermissionData;
    const showLoader = false;

    React.useState = jest.fn().mockReturnValue([showLoader, {}]);

    render(
      <MemoryRouter initialEntries={["/"]}>
        <AdminRolesPermissionsContext.Provider
          value={{
            permissions: permissions,
            setPermissions: () => {},
            originalPermissions: [],
            setOriginalPermissions: () => {},
            isRolePermissionChanged: false,
            setIsRolePermissionChanged: () => {},
            resetRoleSettings: () => {},
          }}
        >
          <AdminRolesPermissions
            cancelBtnAction={undefined}
            submitBtnAction={undefined}
          />
        </AdminRolesPermissionsContext.Provider>
      </MemoryRouter>
    );
    const title = screen.getByTestId("roles-permission-main-section-header");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Role Permissions");
  });
  it("Role Permissions header description validation", () => {
    const permissions: any = registeredPermissionData;
    const showLoader = false;

    React.useState = jest.fn().mockReturnValue([showLoader, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AdminRolesPermissionsContext.Provider
          value={{
            permissions: permissions,
            setPermissions: () => {},
            originalPermissions: [],
            setOriginalPermissions: () => {},
            isRolePermissionChanged: false,
            setIsRolePermissionChanged: () => {},
            resetRoleSettings: () => {},
          }}
        >
          <AdminRolesPermissions
            cancelBtnAction={undefined}
            submitBtnAction={undefined}
          />
        </AdminRolesPermissionsContext.Provider>
      </MemoryRouter>
    );
    const title = screen.getByTestId(
      "roles-permission-main-section-header-desc"
    );
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(
      "The following roles are available for your account."
    );
  });
  it("Self Registered Clinicians header validation", () => {
    const permissions: any = registeredPermissionData;
    const showLoader = false;

    React.useState = jest.fn().mockReturnValue([showLoader, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AdminRolesPermissionsContext.Provider
          value={{
            permissions: permissions,
            setPermissions: () => {},
            originalPermissions: [],
            setOriginalPermissions: () => {},
            isRolePermissionChanged: false,
            setIsRolePermissionChanged: () => {},
            resetRoleSettings: () => {},
          }}
        >
          <AdminRolesPermissions
            cancelBtnAction={undefined}
            submitBtnAction={undefined}
          />
        </AdminRolesPermissionsContext.Provider>
      </MemoryRouter>
    );
    const title = screen.getByTestId("roles-permission-sub-div-header");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Self-Registered Clinicians");
  });

  it("Admin Registered Clinicians header validation", () => {
    const permissions: any = registeredPermissionData;
    const showLoader = false;

    React.useState = jest.fn().mockReturnValue([showLoader, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AdminRolesPermissionsContext.Provider
          value={{
            permissions: permissions,
            setPermissions: () => {},
            originalPermissions: [],
            setOriginalPermissions: () => {},
            isRolePermissionChanged: false,
            setIsRolePermissionChanged: () => {},
            resetRoleSettings: () => {},
          }}
        >
          <AdminRolesPermissions
            cancelBtnAction={undefined}
            submitBtnAction={undefined}
          />
        </AdminRolesPermissionsContext.Provider>
      </MemoryRouter>
    );
    const title = screen.getByTestId("roles-permission-admin-sub-div-header");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Admin-Registered Clinicians");
  });

  it("Admin Registered Clinicians header description validation", () => {
    const permissions: any = registeredPermissionData;
    const showLoader = false;

    React.useState = jest.fn().mockReturnValue([showLoader, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AdminRolesPermissionsContext.Provider
          value={{
            permissions: permissions,
            setPermissions: () => {},
            originalPermissions: [],
            setOriginalPermissions: () => {},
            isRolePermissionChanged: false,
            setIsRolePermissionChanged: () => {},
            resetRoleSettings: () => {},
          }}
        >
          <AdminRolesPermissions
            cancelBtnAction={undefined}
            submitBtnAction={undefined}
          />
        </AdminRolesPermissionsContext.Provider>
      </MemoryRouter>
    );
    const title = screen.getByTestId("roles-permission-admin-sub-div-desc");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(
      "The following features will be enabled by default for users who are added to your facility by administrators"
    );
  });

  it("Check first button", () => {
    const permissions: any = registeredPermissionData;
    const showLoader = false;
    const firstButtonAction = jest.fn();
    React.useState = jest.fn().mockReturnValue([showLoader, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AdminRolesPermissionsContext.Provider
          value={{
            permissions: permissions,
            setPermissions: () => {},
            originalPermissions: [],
            setOriginalPermissions: () => {},
            isRolePermissionChanged: false,
            setIsRolePermissionChanged: () => {},
            resetRoleSettings: () => {},
          }}
        >
          <AdminRolesPermissions
            cancelBtnAction={firstButtonAction}
            submitBtnAction={undefined}
          />
        </AdminRolesPermissionsContext.Provider>
      </MemoryRouter>
    );
    const firstButton = screen.getByTestId("firstButton-test");
    expect(firstButton).toBeInTheDocument();
    expect(firstButton).toHaveTextContent("Cancel");
    expect(firstButton).toBeEnabled();
    userEvent.click(firstButton);
    expect(firstButtonAction).toHaveBeenCalledTimes(1);
  });

  it("Check second button", () => {
    const permissions: any = registeredPermissionData;
    const showLoader = false;
    const mockCancelBtnAction = jest.fn();
    const mockSubmitBtnAction = jest.fn();
    React.useState = jest.fn().mockReturnValue([showLoader, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AdminRolesPermissionsContext.Provider
          value={{
            permissions: permissions,
            setPermissions: () => {},
            originalPermissions: [],
            setOriginalPermissions: () => {},
            isRolePermissionChanged: false,
            setIsRolePermissionChanged: () => {},
            resetRoleSettings: () => {},
          }}
        >
          <AdminRolesPermissions
            cancelBtnAction={mockCancelBtnAction}
            submitBtnAction={mockSubmitBtnAction}
          />
        </AdminRolesPermissionsContext.Provider>
      </MemoryRouter>
    );
    const secondButton = screen.getByTestId("secondButton-test");
    expect(secondButton).toBeInTheDocument();
    expect(secondButton).toHaveTextContent("Update Roles");
    expect(secondButton).toBeDisabled();
    expect(mockSubmitBtnAction).not.toHaveBeenCalled();
  });
  it("Self Registered Clinicians header description validation", () => {
    const permissions: any = registeredPermissionData;
    const mockSetState = jest.fn();
    const mockCancelBtnAction = jest.fn();
    const mockSubmitBtnAction = jest.fn();
    const showLoader = false;
    React.useState = jest.fn().mockReturnValue([showLoader, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AdminRolesPermissionsContext.Provider
          value={{
            permissions: permissions,
            setPermissions: () => {},
            originalPermissions: [],
            setOriginalPermissions: () => {},
            isRolePermissionChanged: false,
            setIsRolePermissionChanged: () => {},
            resetRoleSettings: () => {},
          }}
        >
          <AdminRolesPermissions
            cancelBtnAction={mockCancelBtnAction}
            submitBtnAction={mockSubmitBtnAction}
          />
        </AdminRolesPermissionsContext.Provider>
      </MemoryRouter>
    );
    const title = screen.getByTestId("roles-permission-self-sub-div-desc");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(
      "The following features will be enabled by default for users who self-register to your facility"
    );
  });
});
