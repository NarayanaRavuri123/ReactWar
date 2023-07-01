import React from "react";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Header } from "../header.component";
import { AuthContext } from "../../../context/AuthContext";
import { getMockAuthContextData } from "./authContextMockData";
import { IPermissionData } from "../../../RolesPermission/RolesPermission.model";
import { RolesPermissionContext } from "../../../context/RolesPermissionContext";
jest.mock("@okta/okta-react", () => ({
  useOktaAuth: () => {
    return {
      authState: { isAuthenticated: true },
      authService: { handleAuthentication: jest.fn() },
    };
  },
  withOktaAuth: (x: any) => x,
}));
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
  IsShowManageAccountMenu: true,
  IsPrdMgrSiteStatus: false,
  IsShowAddWoundAssessmentMenu: false,
};

describe("Header component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("renders Title component", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AuthContext.Provider
          value={{
            ...getMockAuthContextData(),
          }}
        >
          <Header />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    const val = document.querySelector(".appName");
    expect(val?.textContent).toBe("Express Therapy Portal");
  });
  it("renders Logo component", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AuthContext.Provider
          value={{
            ...getMockAuthContextData(),
          }}
        >
          <Header />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    const val = document.querySelector(".appLogo");
    expect(val).toBeDefined();
  });
  it("contains help and support link", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AuthContext.Provider
          value={{
            ...getMockAuthContextData(),
          }}
        >
          <Header />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    const sa = fireEvent.click(document.querySelector(".appHelp")!);
    expect(sa).toBeDefined();
  });
  it("contains login", () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: "/helpAndSupport" }]}>
        <AuthContext.Provider
          value={{
            ...getMockAuthContextData(),
            isLoggedIn: false,
            userName: undefined,
            preferredUserName: undefined,
          }}
        >
          <Header />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    expect(screen.getByTestId("login")).toBeInTheDocument();
  });
  it("contains userName", () => {
    render(
      <MemoryRouter initialEntries={["/home"]}>
        <AuthContext.Provider
          value={{
            ...getMockAuthContextData(),
          }}
        >
          <Header />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    const val = document.querySelector(".userNametyle");
    expect(val).toBeDefined();
  });
  it("contains MenuBar", () => {
    render(
      <MemoryRouter initialEntries={["/home"]}>
        <AuthContext.Provider
          value={{
            ...getMockAuthContextData(),
          }}
        >
          <Header />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    fireEvent.click(document.querySelector(".manageprofile")!);
    const val = document.querySelector(".typostyle");
    expect(val?.textContent).toBe("Manage Profile");
  });
  it("contains  MenuBar Logout", () => {
    render(
      <MemoryRouter initialEntries={["/home"]}>
        <AuthContext.Provider
          value={{
            ...getMockAuthContextData(),
          }}
        >
          <RolesPermissionContext.Provider
            value={{
              mappedRolesPermissionData: defaultTestPermissionDataModel,
              setMappedRolesPermissionData: () => {},
            }}
          >
            <Header />
          </RolesPermissionContext.Provider>
        </AuthContext.Provider>
      </MemoryRouter>
    );
    fireEvent.click(document.querySelector(".manageprofile")!);
    expect(document.querySelectorAll(".typostyle").length).toBe(3);
  });
  it("on click manageprofile", () => {
    render(
      <MemoryRouter initialEntries={["/home"]}>
        <AuthContext.Provider
          value={{
            ...getMockAuthContextData(),
          }}
        >
          <Header />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    const sa = fireEvent.click(document.querySelector(".typostyle")!);
    expect(sa).toBeDefined();
  });
});
