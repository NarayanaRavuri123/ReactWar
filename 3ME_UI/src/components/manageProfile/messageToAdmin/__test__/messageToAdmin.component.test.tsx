import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { profileTestData } from "../../__test__/manageProfile.test.data";
import { cleanup, render, screen } from "@testing-library/react";
import { IManageProfile } from "../../manageProfile.interface";
import { getDeepClone } from "../../../../util/ObjectFunctions";
import { ManageProfileValidator } from "../../manageProfile.validator";
import React from "react";
import { MessageToAdmin } from "../messageToAdmin.component";

describe("Admin message component ->", () => {
  afterAll(() => {
    cleanup();
  });

  it("message header is displayed", () => {
    const Validator = new ManageProfileValidator();
    const data = getDeepClone(profileTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IManageProfile) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <MessageToAdmin
          data={data}
          setData={mockSetState}
          Validator={Validator}
        />
      </MemoryRouter>
    );
    const title = screen.queryByTestId("admin-msg-title");
    expect(title).toBeInTheDocument();
  });
  it("message textbox is displayed", () => {
    const Validator = new ManageProfileValidator();
    const data = getDeepClone(profileTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IManageProfile) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <MessageToAdmin
          data={data}
          setData={mockSetState}
          Validator={Validator}
        />
      </MemoryRouter>
    );
    const title = screen.queryByTestId("formControl-msg-box");
    expect(title).toBeInTheDocument();
  });
  it("message is entered", () => {
    const Validator = new ManageProfileValidator();
    const data = getDeepClone(profileTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IManageProfile) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <MessageToAdmin
          data={data}
          setData={mockSetState}
          Validator={Validator}
        />
      </MemoryRouter>
    );
    const msgTxtbox = screen.queryByTestId("msg-txt-box") as HTMLBaseElement;
    userEvent.type(msgTxtbox, "Acelity123");
    expect(mockSetState).toHaveBeenCalled();
  });
});
