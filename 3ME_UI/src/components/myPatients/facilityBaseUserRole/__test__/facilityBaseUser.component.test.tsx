import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContext";
import { FacilityBaseUserRole } from "../facilityBaseUserRole.component";
import { getMockAuthContextData } from "../../../header/__test__/authContextMockData";
import { USER_ROLE_BASE } from "../../../../util/PermissionName";
import { IUserRolesPermission } from "../../../myPatients/userRolesPermission.interface";

describe("Facility BaseUser Component ->", () => {
  afterAll(() => {
    cleanup();
  });

  const userRoles: IUserRolesPermission = {
    userRole: USER_ROLE_BASE,
    permissions: [],
    pagePermissions: [],
  };

  it("Facility Base User content", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AuthContext.Provider
          value={{
            ...getMockAuthContextData(),
          }}
        >
          <FacilityBaseUserRole />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    const title = screen.getByTestId("baseroletitle");
    expect(title).toBeInTheDocument();
  });
  it("Facility Base User component render", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AuthContext.Provider
          value={{
            ...getMockAuthContextData(),
            userRolePermissionData: userRoles,
          }}
        >
          <FacilityBaseUserRole />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    const title = screen.getByTestId("facilityBaseUserRole");
    expect(title).toBeInTheDocument();
  });

  it("Facility Base User phone number render", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AuthContext.Provider
          value={{
            ...getMockAuthContextData(),
            userRolePermissionData: userRoles,
          }}
        >
          <FacilityBaseUserRole />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    const phone = screen.getByTestId("phone1");
    expect(phone).toBeInTheDocument();
  });

  it("Facility Base User image present or not", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AuthContext.Provider
          value={{
            ...getMockAuthContextData(),
            userRolePermissionData: userRoles,
          }}
        >
          <FacilityBaseUserRole />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    const image = screen.getByTestId("facilityimg");
    expect(image).toBeInTheDocument();
  });
});
