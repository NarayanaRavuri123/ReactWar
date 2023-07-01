import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { profileTestData } from "../../__test__/manageProfile.test.data";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { PasswordAdministration } from "../passwordAdministration.component";
import { IManageProfile } from "../../manageProfile.interface";
import { getDeepClone } from "../../../../util/ObjectFunctions";
import { ManageProfileValidator } from "../../manageProfile.validator";
import React from "react";

describe("Password Administration component ->", () => {
  afterAll(() => {
    cleanup();
  });

  it("Password administration validate password field with change password checkbox as false", () => {
    const Validator = new ManageProfileValidator();
    const data = getDeepClone(profileTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IManageProfile) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <PasswordAdministration
          data={data}
          setData={mockSetState}
          Validator={Validator}
        />
      </MemoryRouter>
    );
    const title = screen.queryByTestId("manage-profile-password-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Password");
    const value = screen.queryByTestId("manage-profile-password-value");
    expect(value).toBeInTheDocument();
    const passwordValue = value?.textContent;
    expect(passwordValue?.length).toBeGreaterThan(0);
  });

  it("Password administration validate change password", () => {
    const Validator = new ManageProfileValidator();
    const data = getDeepClone(profileTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IManageProfile) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <PasswordAdministration
          data={data}
          setData={mockSetState}
          Validator={Validator}
        />
      </MemoryRouter>
    );
    const changePasswordTitle = screen.getByTestId("change-password-header");
    expect(changePasswordTitle).toHaveTextContent("Change password");
    const changePassword = screen.getByTestId("change-password-checkbox");
    expect(changePassword).not.toBeChecked();
  });

  it("Password administration validate password field with change password checkbox as true", () => {
    const Validator = new ManageProfileValidator();
    const data = getDeepClone(profileTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IManageProfile) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <PasswordAdministration
          data={data}
          setData={mockSetState}
          Validator={Validator}
        />
      </MemoryRouter>
    );
    const changePassword = screen.getByTestId("change-password-checkbox");
    fireEvent.click(changePassword);
    const title = screen.queryByTestId("manage-profile-password-title");
    expect(title).not.toBeInTheDocument();
    expect(title).toBe(null);
    const value = screen.queryByTestId("manage-profile-password-value");
    expect(value).not.toBeInTheDocument();
    expect(value).toBe(null);
  });

  it("Password administration validate change password when checkbox selected", () => {
    const Validator = new ManageProfileValidator();
    const data = getDeepClone(profileTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IManageProfile) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <PasswordAdministration
          data={data}
          setData={mockSetState}
          Validator={Validator}
        />
      </MemoryRouter>
    );
    const changePasswordTitle = screen.getByTestId("change-password-header");
    expect(changePasswordTitle).toHaveTextContent("Change password");
    const changePassword = screen.getByTestId("change-password-checkbox");
    expect(changePassword).toBeInTheDocument();
    fireEvent.click(changePassword);
    expect(changePassword).toBeChecked;
    const currentPasswordTitle = screen.getByTestId("current-password");
    expect(currentPasswordTitle).toHaveTextContent("Current password");
    const currentPasswordInput = screen.getByTestId(
      "current-password-value"
    ) as HTMLBaseElement;
    userEvent.type(currentPasswordInput, "Acelity@123");
    expect(mockSetState).toHaveBeenCalled();
    const newPasswordTitle = screen.getByTestId("new-password");
    expect(newPasswordTitle).toHaveTextContent("New password");
    const newPasswordInput = screen.getByTestId(
      "new-password-value"
    ) as HTMLBaseElement;
    userEvent.type(newPasswordInput, "Acelity@123");
    expect(newPasswordInput).toBeInTheDocument();
    expect(mockSetState).toHaveBeenCalled();
    const confirmPasswordTitle = screen.getByTestId("confirm-password");
    expect(confirmPasswordTitle).toHaveTextContent("Password confirmation");
    const confirmPasswordInput = screen.getByTestId(
      "confirm-password-value"
    ) as HTMLBaseElement;
    userEvent.type(confirmPasswordInput, "Acelity@123");
    expect(confirmPasswordInput).toBeInTheDocument();
    expect(mockSetState).toHaveBeenCalled();
  });

  it("Password administration validate current password with valid password", () => {
    const Validator = new ManageProfileValidator();
    const data = getDeepClone(profileTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IManageProfile) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <PasswordAdministration
          data={data}
          setData={mockSetState}
          Validator={Validator}
        />
      </MemoryRouter>
    );
    const changePassword = screen.getByTestId("change-password-checkbox");
    expect(changePassword).toBeInTheDocument();
    fireEvent.click(changePassword);
    expect(changePassword).toBeChecked;
    const currentPasswordTitle = screen.getByTestId("current-password");
    expect(currentPasswordTitle).toHaveTextContent("Current password");
    const currentPasswordInput = screen.getByTestId(
      "current-password-value"
    ) as HTMLBaseElement;
    userEvent.type(currentPasswordInput, "Acelity@123");
    expect(currentPasswordInput).toBeInTheDocument();
    expect(mockSetState).toHaveBeenCalled();
  });

  it("Password administration validate current password with invalid password", () => {
    const Validator = new ManageProfileValidator();
    const data = getDeepClone(profileTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IManageProfile) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <PasswordAdministration
          data={data}
          setData={mockSetState}
          Validator={Validator}
        />
      </MemoryRouter>
    );
    const changePassword = screen.getByTestId("change-password-checkbox");
    expect(changePassword).toBeInTheDocument();
    fireEvent.click(changePassword);
    expect(changePassword).toBeChecked;
    const currentPasswordTitle = screen.getByTestId("current-password");
    expect(currentPasswordTitle).toHaveTextContent("Current password");
    const currentPasswordInput = screen.getByTestId(
      "current-password-value"
    ) as HTMLBaseElement;
    expect(currentPasswordInput).toBeInTheDocument();
    userEvent.type(currentPasswordInput, "Acelity123");
    expect(mockSetState).toHaveBeenCalled();
  });

  it("Password administration validate new password with valid password", () => {
    const Validator = new ManageProfileValidator();
    const data = getDeepClone(profileTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IManageProfile) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <PasswordAdministration
          data={data}
          setData={mockSetState}
          Validator={Validator}
        />
      </MemoryRouter>
    );
    const changePassword = screen.getByTestId("change-password-checkbox");
    expect(changePassword).toBeInTheDocument();
    fireEvent.click(changePassword);
    expect(changePassword).toBeChecked;
    const newPasswordTitle = screen.getByTestId("new-password");
    expect(newPasswordTitle).toHaveTextContent("New password");
    const newPasswordInput = screen.getByTestId(
      "new-password-value"
    ) as HTMLBaseElement;
    userEvent.type(newPasswordInput, "Acelity@123");
    expect(newPasswordInput).toBeInTheDocument();
    expect(mockSetState).toHaveBeenCalled();
  });

  it("Password administration validate new password with invalid password", () => {
    const Validator = new ManageProfileValidator();
    const data = getDeepClone(profileTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IManageProfile) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <PasswordAdministration
          data={data}
          setData={mockSetState}
          Validator={Validator}
        />
      </MemoryRouter>
    );
    const changePassword = screen.getByTestId("change-password-checkbox");
    expect(changePassword).toBeInTheDocument();
    fireEvent.click(changePassword);
    expect(changePassword).toBeChecked;
    const newPasswordTitle = screen.getByTestId("new-password") as HTMLElement;
    expect(newPasswordTitle).toHaveTextContent("New password");
    const newPasswordInput = screen.getByTestId(
      "new-password-value"
    ) as HTMLBaseElement;
    userEvent.type(newPasswordInput, "Acelity123");
    expect(newPasswordInput).toBeInTheDocument();
    expect(mockSetState).toHaveBeenCalled();
  });

  it("Password administration validate password confirmation with invalid password", () => {
    const Validator = new ManageProfileValidator();
    const data = getDeepClone(profileTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IManageProfile) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <PasswordAdministration
          data={data}
          setData={mockSetState}
          Validator={Validator}
        />
      </MemoryRouter>
    );
    const changePassword = screen.getByTestId("change-password-checkbox");
    expect(changePassword).toBeInTheDocument();
    fireEvent.click(changePassword);
    expect(changePassword).toBeChecked;
    const confirmPasswordTitle = screen.getByTestId(
      "confirm-password"
    ) as HTMLElement;
    expect(confirmPasswordTitle).toHaveTextContent("Password confirmation");
    const confirmPasswordInput = screen.getByTestId(
      "confirm-password-value"
    ) as HTMLBaseElement;
    userEvent.type(confirmPasswordInput, "Acelity123");
    expect(confirmPasswordInput).toBeInTheDocument();
    expect(mockSetState).toHaveBeenCalled();
  });
  it("Password administration validate password confirmation with invalid password having space", () => {
    const Validator = new ManageProfileValidator();
    const data = getDeepClone(profileTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IManageProfile) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <PasswordAdministration
          data={data}
          setData={mockSetState}
          Validator={Validator}
        />
      </MemoryRouter>
    );
    const changePassword = screen.getByTestId("change-password-checkbox");
    expect(changePassword).toBeInTheDocument();
    fireEvent.click(changePassword);
    expect(changePassword).toBeChecked;
    const confirmPasswordTitle = screen.getByTestId(
      "confirm-password"
    ) as HTMLElement;
    expect(confirmPasswordTitle).toHaveTextContent("Password confirmation");
    const confirmPasswordInput = screen.getByTestId(
      "confirm-password-value"
    ) as HTMLBaseElement;
    userEvent.type(confirmPasswordInput, "Acelity@ 123");
    expect(confirmPasswordInput).toBeInTheDocument();
    expect(mockSetState).toHaveBeenCalled();
  });

  it("Password administration validate password confirmation with valid password", () => {
    const Validator = new ManageProfileValidator();
    const data = getDeepClone(profileTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IManageProfile) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <PasswordAdministration
          data={data}
          setData={mockSetState}
          Validator={Validator}
        />
      </MemoryRouter>
    );
    const changePassword = screen.getByTestId("change-password-checkbox");
    expect(changePassword).toBeInTheDocument();
    fireEvent.click(changePassword);
    expect(changePassword).toBeChecked;
    const confirmPasswordTitle = screen.getByTestId("confirm-password");
    expect(confirmPasswordTitle).toHaveTextContent("Password confirmation");
    const confirmPasswordInput = screen.getByTestId(
      "confirm-password-value"
    ) as HTMLBaseElement;
    userEvent.type(confirmPasswordInput, "Acelity@123");
    expect(confirmPasswordInput).toBeInTheDocument();
    expect(mockSetState).toHaveBeenCalled();
  });

  it("Password administration validate password confirmation with valid password for newly added charecters(! @ # $ , . ; :)", () => {
    const Validator = new ManageProfileValidator();
    const data = getDeepClone(profileTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IManageProfile) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <PasswordAdministration
          data={data}
          setData={mockSetState}
          Validator={Validator}
        />
      </MemoryRouter>
    );
    const changePassword = screen.getByTestId("change-password-checkbox");
    expect(changePassword).toBeInTheDocument();
    fireEvent.click(changePassword);
    expect(changePassword).toBeChecked;
    const confirmPasswordTitle = screen.getByTestId("confirm-password");
    expect(confirmPasswordTitle).toHaveTextContent("Password confirmation");
    const confirmPasswordInput = screen.getByTestId(
      "confirm-password-value"
    ) as HTMLBaseElement;
    userEvent.type(confirmPasswordInput, "Acelity123!@#$,.;:");
    expect(confirmPasswordInput).toBeInTheDocument();
    expect(mockSetState).toHaveBeenCalled();
  });

  it("Password administration validate password rules description", () => {
    const Validator = new ManageProfileValidator();
    const data = getDeepClone(profileTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IManageProfile) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <PasswordAdministration
          data={data}
          setData={mockSetState}
          Validator={Validator}
        />
      </MemoryRouter>
    );
    const passwordRule = screen.getByTestId("password-rule-description");
    expect(passwordRule).toBeInTheDocument();
    expect(passwordRule).toHaveTextContent(
      "Password must be at least 10 characters and contain numbers, uppercase and lowercase letters, and special characters only allowed as +-_.@!#$,;:"
    );
  });
});
