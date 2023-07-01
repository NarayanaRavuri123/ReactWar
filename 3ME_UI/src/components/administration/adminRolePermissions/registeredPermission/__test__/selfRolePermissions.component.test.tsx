import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { getDeepClone } from "../../../../../util/ObjectFunctions";
import { registeredPermissionData } from "../../adminRolePermissions.data";
import { AdminRolesPermissions } from "../../adminRolesPermissions.component";
import { IPermissionDetails } from "../../adminRolesPermissions.interface";
import { RegisteredPermissions } from "../registeredPermissions.component";
import { RegisteredPermission } from "../registeredPermissions.enum";

describe("role permissions component", () => {
  afterAll(() => {
    cleanup();
  });

  it("Self registered permissions validation", () => {
    const mockSetState = jest.fn();
    const mockFunction = jest.fn();
    const userRegData = registeredPermissionData;
    jest.mock("react", () => ({
      useState: (dt: IPermissionDetails) => [dt, mockSetState],
    }));
    render(
      <MemoryRouter initialEntries={["/"]}>
        <RegisteredPermissions
          permissions={userRegData}
          type={RegisteredPermission.SELF_REGISTER}
          validateAndUpdateCheckBox={mockFunction}
        />
      </MemoryRouter>
    );
    const permission1 = screen.getByTestId("3M_REP_ACCESS") as HTMLInputElement;
    expect(permission1).toBeInTheDocument();
    userEvent.click(permission1);
    expect(mockFunction).toBeCalledTimes(1);
    const permission2 = screen.getByTestId("SALES_ORDERS") as HTMLInputElement;
    expect(permission2).toBeInTheDocument();
    userEvent.click(permission2);
    expect(mockFunction).toBeCalledTimes(2);
    const permission3 = screen.getByTestId("RENTAL_ORDERS") as HTMLInputElement;
    expect(permission3).toBeInTheDocument();
    userEvent.click(permission3);
    expect(mockFunction).toBeCalledTimes(3);
    const permission4 = screen.getByTestId(
      "WOUND_MEASUREMENTS"
    ) as HTMLInputElement;
    expect(permission4).toBeInTheDocument();
    userEvent.click(permission4);
    expect(mockFunction).toBeCalledTimes(4);
    const permission5 = screen.getByTestId("MFA") as HTMLInputElement;
    expect(permission5).toBeInTheDocument();
    userEvent.click(permission5);
    expect(mockFunction).toBeCalledTimes(5);
  });
});
