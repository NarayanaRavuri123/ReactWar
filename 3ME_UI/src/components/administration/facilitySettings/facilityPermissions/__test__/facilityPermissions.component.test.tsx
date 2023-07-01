import React from "react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { cleanup, render, screen } from "@testing-library/react";
import { FacilityPermissions } from "../facilityPermissions.component";
import { IFacilityPermissions } from "../facilityPermissions.interface";
import { FacilitySettingContext } from "../../../../../context/FacilitySettingsContext";
import { getMockFacilitySettingsData } from "../../__test__/facilitySettingsMockContext.data";
jest.mock("../../../../../core/popup/popup.component");

describe("Facility Permission component", () => {
  afterAll(() => {
    cleanup();
  });
  it("To check Facility permission header validation", () => {
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IFacilityPermissions) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([{}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <FacilityPermissions
          originalPermissions={[]}
          permissions={[]}
          setPermissions={() => {}}
        />
      </MemoryRouter>
    );
    const title = screen.getByTestId("facility-permission-header");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("User Access Permissions");
  });

  it("To check Facility permission description validation", () => {
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IFacilityPermissions) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([{}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <FacilityPermissions
          originalPermissions={[]}
          permissions={[]}
          setPermissions={() => {}}
        />
      </MemoryRouter>
    );
    const title = screen.getByTestId("facility-permission-description");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(
      "Which of the following features should be enabled for this facility?"
    );
  });

  it("To check Facility permissions validation", () => {
    const mockSetState = jest.fn();
    const setPermissionsMock = jest.fn();
    const permissions = [
      {
        permissionName: "3M_REP_ACCESS",
        isSelected: false,
      },
      {
        permissionName: "INVENTORY",
        isSelected: false,
      },
      {
        permissionName: "RENTAL_ORDERS",
        isSelected: false,
      },
      {
        permissionName: "SALES_ORDERS",
        isSelected: true,
      },
      {
        permissionName: "WOUND_MEASUREMENTS",
        isSelected: true,
      },
      {
        permissionName: "ALL_FACILITY_PATIENTS",
        isSelected: true,
      },
    ];
    jest.mock("react", () => ({
      useState: (dt: IFacilityPermissions) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([{}]);
    render(
      <FacilitySettingContext.Provider
        value={{
          ...getMockFacilitySettingsData(),
        }}
      >
        <FacilityPermissions
          originalPermissions={permissions}
          permissions={permissions}
          setPermissions={setPermissionsMock}
        />
      </FacilitySettingContext.Provider>
    );
    const permission1 = screen.getByTestId("3M_REP_ACCESS") as HTMLInputElement;
    expect(permission1).toBeInTheDocument();
    userEvent.click(permission1);
    expect(setPermissionsMock).toBeCalledTimes(1);
    const permission2 = screen.getByTestId("INVENTORY") as HTMLInputElement;
    expect(permission2).toBeInTheDocument();
    userEvent.click(permission2);
    expect(setPermissionsMock).toBeCalledTimes(2);
    const permission3 = screen.getByTestId("RENTAL_ORDERS") as HTMLInputElement;
    expect(permission3).toBeInTheDocument();
    userEvent.click(permission3);
    expect(setPermissionsMock).toBeCalledTimes(3);
    const permission4 = screen.getByTestId("SALES_ORDERS") as HTMLInputElement;
    expect(permission4).toBeInTheDocument();
    userEvent.click(permission4);
    expect(setPermissionsMock).toBeCalledTimes(4);
    const permission5 = screen.getByTestId(
      "WOUND_MEASUREMENTS"
    ) as HTMLInputElement;
    expect(permission5).toBeInTheDocument();
    userEvent.click(permission5);
    expect(setPermissionsMock).toBeCalledTimes(5);
    const permission6 = screen.getByTestId(
      "ALL_FACILITY_PATIENTS"
    ) as HTMLInputElement;
    expect(permission6).toBeInTheDocument();
    userEvent.click(permission6);
    expect(setPermissionsMock).toBeCalledTimes(6);
  });

  it("To check Facility permission description detail validation", () => {
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IFacilityPermissions) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([{}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <FacilityPermissions
          originalPermissions={[]}
          permissions={[]}
          setPermissions={() => {}}
        />
      </MemoryRouter>
    );
    const title = screen.getByTestId("facility-permission-description-detail");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(
      "These settings do not change which features are enabled by default for new facility users. That information can be changed by going to the specific facility’s Administration functionality and changing Role Permissions."
    );
  });
});
