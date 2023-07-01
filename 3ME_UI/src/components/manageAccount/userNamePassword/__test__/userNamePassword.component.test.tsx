import React from "react";
import { cleanup, render, screen } from "@testing-library/react";

import { ManageAccountUserNamePassword } from "../userNamePasswordChange.component";

import { defaultAccountData } from "../../manageAccount.model";
import { IManageAccount } from "../../manageAccount.interface";
import { getDeepClone } from "../../../../util/ObjectFunctions";

describe("Manage Account", () => {
  afterAll(() => {
    cleanup();
  });
  it("To check Manage Account  header Present", () => {
    const data = getDeepClone(defaultAccountData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IManageAccount) => [dt, mockSetState],
    }));
    render(
      <ManageAccountUserNamePassword data={data} setData={mockSetState} />
    );
    const aacHeaderText = screen.getByTestId("manage-acc-username-title-test");
    expect(aacHeaderText).toBeInTheDocument();
    expect(aacHeaderText).toHaveTextContent("Change Username");
  });

  it("To check text box present", () => {
    const data = getDeepClone(defaultAccountData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IManageAccount) => [dt, mockSetState],
    }));
    render(
      <ManageAccountUserNamePassword data={data} setData={mockSetState} />
    );
    const aacHeaderText = screen.getByTestId("acc-user-name");
    expect(aacHeaderText).toBeInTheDocument();
  });
  it("To check verify sms button present", () => {
    const data = getDeepClone(defaultAccountData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IManageAccount) => [dt, mockSetState],
    }));
    render(
      <ManageAccountUserNamePassword data={data} setData={mockSetState} />
    );
    const aacHeaderText = screen.getByTestId("acc-verifypassword-test");
    expect(aacHeaderText).toBeInTheDocument();
  });
  it("To check email button  present", () => {
    const data = getDeepClone(defaultAccountData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IManageAccount) => [dt, mockSetState],
    }));
    render(
      <ManageAccountUserNamePassword data={data} setData={mockSetState} />
    );
    const aacHeaderText = screen.getByTestId("acc-verifyemail-test");
    expect(aacHeaderText).toBeInTheDocument();
  });
});
