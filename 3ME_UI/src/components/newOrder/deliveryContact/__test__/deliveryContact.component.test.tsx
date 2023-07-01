import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { DeliveryContact } from "../deliveryContact.component";
import { INewOrder } from "../../newOrder.interface";
import { getDeepClone } from "../../../../util/ObjectFunctions";
import { newOrderTestData } from "../../__test__/newOrder.test.data";
import { NewOrderValidator } from "../../newOrder.validator";
import userEvent from "@testing-library/user-event";

describe("Delivery contact", () => {
  afterAll(() => {
    cleanup();
  });
  it("To check Delivery Contact header Present", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(newOrderTestData);
    const mockSetState = jest.fn();

    jest.mock("react", () => ({
      useState: (dt: INewOrder) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);

    render(<DeliveryContact data={data} setData={mockSetState} />);

    const dressingSupplies = screen.getByTestId("deliveryContactHeaderTest");
    expect(dressingSupplies).toBeInTheDocument();
    expect(dressingSupplies).toHaveTextContent("Delivery Contact");
  });
  it("delivery contact first name should match the value provided", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(newOrderTestData);
    const mockSetState = jest.fn();

    jest.mock("react", () => ({
      useState: (dt: INewOrder) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);

    render(<DeliveryContact data={data} setData={mockSetState} />);
    const firstNameDiv = screen.getByTestId("deliveryContactFirstNameTest");
    userEvent.type(firstNameDiv, "Rece");
    expect(mockSetState).toHaveBeenCalled();
  });
  it("delivery contact Last name should match the value provided", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(newOrderTestData);
    const mockSetState = jest.fn();

    jest.mock("react", () => ({
      useState: (dt: INewOrder) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);

    render(<DeliveryContact data={data} setData={mockSetState} />);
    const firstNameDiv = screen.getByTestId("deliveryContactLastNameTest");
    userEvent.type(firstNameDiv, "Jones");
    expect(mockSetState).toHaveBeenCalled();
  });

  it("delivery instruction match the value provided", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(newOrderTestData);
    const mockSetState = jest.fn();

    jest.mock("react", () => ({
      useState: (dt: INewOrder) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);

    render(<DeliveryContact data={data} setData={mockSetState} />);
    const firstNameDiv = screen.getByTestId("deliveryinstructionTest");
    userEvent.type(firstNameDiv, "testdelievery");
    expect(mockSetState).toHaveBeenCalled();
  });
});
