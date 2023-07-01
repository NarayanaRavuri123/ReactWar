import React from "react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { INewOrder } from "../../newOrder.interface";
import { NewOrderValidator } from "../../newOrder.validator";
import { getDeepClone } from "../../../../util/ObjectFunctions";
import { cleanup, render, screen } from "@testing-library/react";
import { newOrderTestData } from "../../__test__/newOrder.test.data";
import { EmergencyContactInfo } from "../emergencyContactInfo.component";

describe("Emergency Contact Info component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("Emergency Contact Info validate title", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(newOrderTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: INewOrder) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <EmergencyContactInfo
          data={data}
          setData={mockSetState}
          Validator={Validator}
        />
      </MemoryRouter>
    );
    const title = screen.getByTestId("emergencyContactInfo-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Emergency Contact Info (recommended)");
  });

  it("Emergency Contact Info validate first name", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(newOrderTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: INewOrder) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <EmergencyContactInfo
          data={data}
          setData={mockSetState}
          Validator={Validator}
        />
      </MemoryRouter>
    );
    const title = screen.getByTestId("first-name-label");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("First Name");
    const firstNameValue = screen.getByTestId(
      "first-name-value"
    ) as HTMLBaseElement;
    expect(firstNameValue).toBeInTheDocument();
    expect(firstNameValue.textContent).toHaveLength(0);
    userEvent.type(firstNameValue, "Rahul");
    expect(mockSetState).toHaveBeenCalled();
  });

  it("Emergency Contact Info validate last name", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(newOrderTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: INewOrder) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <EmergencyContactInfo
          data={data}
          setData={mockSetState}
          Validator={Validator}
        />
      </MemoryRouter>
    );
    const title = screen.getByTestId("last-name-label");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Last Name");
    const lastNameValue = screen.getByTestId(
      "last-name-value"
    ) as HTMLBaseElement;
    expect(lastNameValue).toBeInTheDocument();
    expect(lastNameValue.textContent).toHaveLength(0);
    userEvent.type(lastNameValue, "Patil");
    expect(mockSetState).toHaveBeenCalled();
  });

  it("Emergency Contact Info validate phone number", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(newOrderTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: INewOrder) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <EmergencyContactInfo
          data={data}
          setData={mockSetState}
          Validator={Validator}
        />
      </MemoryRouter>
    );
    const title = screen.getByTestId("phone-number-label");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Phone Number");
    const lastNameValue = screen.getByTestId(
      "phone-number-value"
    ) as HTMLBaseElement;
    expect(lastNameValue).toBeInTheDocument();
    expect(lastNameValue.textContent).toHaveLength(0);
    userEvent.type(lastNameValue, "8329405422");
    expect(mockSetState).toHaveBeenCalled();
  });
});
