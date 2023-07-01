import { cleanup, render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { RolesPermissionContext } from "../../../context/RolesPermissionContext";
import { IPermissionData } from "../../../RolesPermission/RolesPermission.model";
import Administration from "../administration.component";
import { AuthContext } from "../../../context/AuthContext";
import { getMockAuthContextData } from "../../header/__test__/authContextMockData";

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
  IsAdminFacilitySettingsButton: true,
  IsAdminFacilityUsersButton: true,
  IsAdminMyListsButton: true,
  IsAdminRolesPermissionButton: true,
  IsAdminUserAccounts: true,
  IsShowManageAccountMenu: false,
  IsPrdMgrSiteStatus: true,
  IsSalesMgrHistoryBtn: true,
  IsShowAddWoundAssessmentMenu: false,
};

describe("Administration component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("Administration Title Present", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AuthContext.Provider
          value={{
            ...getMockAuthContextData(),
          }}
        >
          <Administration />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    const component = screen.getByTestId("administationTitle");
    expect(component).toBeInTheDocument();
  });

  it("Facility Administration Title Present", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <RolesPermissionContext.Provider
          value={{
            mappedRolesPermissionData: defaultTestPermissionDataModel,
            setMappedRolesPermissionData: () => {},
          }}
        >
          <AuthContext.Provider
            value={{
              ...getMockAuthContextData(),
            }}
          >
            <Administration />
          </AuthContext.Provider>
        </RolesPermissionContext.Provider>
      </MemoryRouter>
    );
    const component = screen.getByTestId("facilityAdminTitleTest");
    expect(component).toBeInTheDocument();
  });

  it("Facility Administration Desc Present", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <RolesPermissionContext.Provider
          value={{
            mappedRolesPermissionData: defaultTestPermissionDataModel,
            setMappedRolesPermissionData: () => {},
          }}
        >
          <AuthContext.Provider
            value={{
              ...getMockAuthContextData(),
            }}
          >
            <Administration />
          </AuthContext.Provider>
        </RolesPermissionContext.Provider>
      </MemoryRouter>
    );
    const component = screen.getByTestId("facilityAdminDescTest");
    expect(component).toBeInTheDocument();
  });
  it("Facility Administration Button Present", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <RolesPermissionContext.Provider
          value={{
            mappedRolesPermissionData: defaultTestPermissionDataModel,
            setMappedRolesPermissionData: () => {},
          }}
        >
          <AuthContext.Provider
            value={{
              ...getMockAuthContextData(),
            }}
          >
            <Administration />
          </AuthContext.Provider>
        </RolesPermissionContext.Provider>
      </MemoryRouter>
    );
    const component = screen.getByTestId("Facility Settings0");
    expect(component).toBeInTheDocument();
  });
  it("Facility Users Button Present", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <RolesPermissionContext.Provider
          value={{
            mappedRolesPermissionData: defaultTestPermissionDataModel,
            setMappedRolesPermissionData: () => {},
          }}
        >
          <AuthContext.Provider
            value={{
              ...getMockAuthContextData(),
            }}
          >
            <Administration />
          </AuthContext.Provider>
        </RolesPermissionContext.Provider>
      </MemoryRouter>
    );
    const component = screen.getByTestId("Facility Users1");
    expect(component).toBeInTheDocument();
  });
  it("My Lists Button Present", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <RolesPermissionContext.Provider
          value={{
            mappedRolesPermissionData: defaultTestPermissionDataModel,
            setMappedRolesPermissionData: () => {},
          }}
        >
          <AuthContext.Provider
            value={{
              ...getMockAuthContextData(),
            }}
          >
            <Administration />
          </AuthContext.Provider>
        </RolesPermissionContext.Provider>
      </MemoryRouter>
    );
    const component = screen.getByTestId("My Lists2");
    expect(component).toBeInTheDocument();
  });
  it("Roles Permissions Button Present", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <RolesPermissionContext.Provider
          value={{
            mappedRolesPermissionData: defaultTestPermissionDataModel,
            setMappedRolesPermissionData: () => {},
          }}
        >
          <AuthContext.Provider
            value={{
              ...getMockAuthContextData(),
            }}
          >
            <Administration />
          </AuthContext.Provider>
        </RolesPermissionContext.Provider>
      </MemoryRouter>
    );
    const component = screen.getByTestId("Roles Permissions3");
    expect(component).toBeInTheDocument();
  });
  it("3M Admin Title Present", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <RolesPermissionContext.Provider
          value={{
            mappedRolesPermissionData: defaultTestPermissionDataModel,
            setMappedRolesPermissionData: () => {},
          }}
        >
          <AuthContext.Provider
            value={{
              ...getMockAuthContextData(),
            }}
          >
            <Administration />
          </AuthContext.Provider>
        </RolesPermissionContext.Provider>
      </MemoryRouter>
    );
    const component = screen.getByTestId("3madminTestTitle");
    expect(component).toBeInTheDocument();
  });

  it("3M Admin Desc Present", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <RolesPermissionContext.Provider
          value={{
            mappedRolesPermissionData: defaultTestPermissionDataModel,
            setMappedRolesPermissionData: () => {},
          }}
        >
          <AuthContext.Provider
            value={{
              ...getMockAuthContextData(),
            }}
          >
            <Administration />
          </AuthContext.Provider>
        </RolesPermissionContext.Provider>
      </MemoryRouter>
    );
    const component = screen.getByTestId("3madminDescTest");
    expect(component).toBeInTheDocument();
  });
  it("Site Status Button Present", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <RolesPermissionContext.Provider
          value={{
            mappedRolesPermissionData: defaultTestPermissionDataModel,
            setMappedRolesPermissionData: () => {},
          }}
        >
          <AuthContext.Provider
            value={{
              ...getMockAuthContextData(),
            }}
          >
            <Administration />
          </AuthContext.Provider>
        </RolesPermissionContext.Provider>
      </MemoryRouter>
    );
    const component = screen.getByTestId("Site Status1");
    expect(component).toBeInTheDocument();
  });
  it("Sales admin Title  Present", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <RolesPermissionContext.Provider
          value={{
            mappedRolesPermissionData: defaultTestPermissionDataModel,
            setMappedRolesPermissionData: () => {},
          }}
        >
          <AuthContext.Provider
            value={{
              ...getMockAuthContextData(),
            }}
          >
            <Administration />
          </AuthContext.Provider>
        </RolesPermissionContext.Provider>
      </MemoryRouter>
    );
    const component = screen.getByTestId("3mSalesAdmintitleTest");
    expect(component).toBeInTheDocument();
  });
  it("Sales Admin Desc Present", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <RolesPermissionContext.Provider
          value={{
            mappedRolesPermissionData: defaultTestPermissionDataModel,
            setMappedRolesPermissionData: () => {},
          }}
        >
          <AuthContext.Provider
            value={{
              ...getMockAuthContextData(),
            }}
          >
            <Administration />
          </AuthContext.Provider>
        </RolesPermissionContext.Provider>
      </MemoryRouter>
    );
    const component = screen.getByTestId("3mSalesAdminDescTest");
    expect(component).toBeInTheDocument();
  });
  it("Sales admin history btn  Present", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <RolesPermissionContext.Provider
          value={{
            mappedRolesPermissionData: defaultTestPermissionDataModel,
            setMappedRolesPermissionData: () => {},
          }}
        >
          <AuthContext.Provider
            value={{
              ...getMockAuthContextData(),
            }}
          >
            <Administration />
          </AuthContext.Provider>
        </RolesPermissionContext.Provider>
      </MemoryRouter>
    );
    const component = screen.getByTestId("History0");
    expect(component).toBeInTheDocument();
  });
});
