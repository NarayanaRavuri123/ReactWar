import { MemoryRouter } from "react-router-dom";
import React from "react";
import userEvent from "@testing-library/user-event";
import { AccountInformation } from "../accountInformation.component";
import { profileTestData } from "../../__test__/manageProfile.test.data";
import { cleanup, render, screen, within } from "@testing-library/react";
import { ManageProfileValidator } from "../../manageProfile.validator";
import { IManageProfile } from "../../manageProfile.interface";
import { getDeepClone } from "../../../../util/ObjectFunctions";
import { DepartmentMock } from "./department";
import { LicenseTypeMock } from "./licenseType";
import * as  CustomDropDown from "../../../../core/customDropdown/customDropdown.component";
import { Select } from "@mui/material";

describe("Account Information component ->", () => {
  afterEach(() => {
    cleanup();
  });
  it("initial render shows Account Information Label", () => {
    const Validator = new ManageProfileValidator();
    const licenseContent: string[] = LicenseTypeMock;
    const departmentContent: string[] = DepartmentMock;
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    React.useState = jest.fn().mockReturnValue([licenseContent, {}]);
    React.useState = jest.fn().mockReturnValue([departmentContent, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AccountInformation
          data={profileTestData}
          setData={() => { }}
          Validator={Validator}
        />
      </MemoryRouter>
    );
    const val = document.querySelector("h2");
    expect(val?.textContent).toBe("Account Information");
  });

  it("licensetype to be presented", () => {
    const Validator = new ManageProfileValidator();
    const licenseContent: string[] = LicenseTypeMock;
    const departmentContent: string[] = DepartmentMock;
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    React.useState = jest.fn().mockReturnValue([licenseContent, {}]);
    React.useState = jest.fn().mockReturnValue([departmentContent, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AccountInformation
          data={profileTestData}
          setData={() => { }}
          Validator={Validator}
        />
      </MemoryRouter>
    );
    expect(screen.getByTestId("acc-license-type")).toBeTruthy();
  });

  it("departmentType to be presented", () => {
    const Validator = new ManageProfileValidator();
    const licenseContent: string[] = LicenseTypeMock;
    const departmentContent: string[] = DepartmentMock;
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    React.useState = jest.fn().mockReturnValue([licenseContent, {}]);
    React.useState = jest.fn().mockReturnValue([departmentContent, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AccountInformation
          data={profileTestData}
          setData={() => { }}
          Validator={Validator}
        />
      </MemoryRouter>
    );
    expect(screen.getByTestId("acc-department-type")).toBeTruthy();
  });

  it("first name should match the value provided", () => {
    const Validator = new ManageProfileValidator();
    const data = getDeepClone(profileTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IManageProfile) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AccountInformation
          data={data}
          setData={mockSetState}
          Validator={Validator}
        />
      </MemoryRouter>
    );
    const firstNameDiv = screen.getByTestId("acc-first-name");
    userEvent.clear(within(firstNameDiv).getByRole("textbox"));
    userEvent.type(firstNameDiv, "Rece");
    expect(mockSetState).toHaveBeenCalled();
  });

  it("error out if no value is provided", () => {
    const Validator = new ManageProfileValidator();
    const data = getDeepClone(profileTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IManageProfile) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AccountInformation
          data={data}
          setData={mockSetState}
          Validator={Validator}
        />
      </MemoryRouter>
    );
    const firstNameDiv = screen.getByTestId("acc-first-name");
    userEvent.clear(within(firstNameDiv).getByRole("textbox"));
    expect(firstNameDiv.getElementsByClassName("Mui-error")).toBeTruthy();
  });
});
