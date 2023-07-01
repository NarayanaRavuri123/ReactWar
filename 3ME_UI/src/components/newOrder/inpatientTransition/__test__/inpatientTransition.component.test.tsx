import React from "react";
import userEvent from "@testing-library/user-event";
import { INewOrder } from "../../newOrder.interface";
import { NewOrderValidator } from "../../newOrder.validator";
import { getDeepClone } from "../../../../util/ObjectFunctions";
import { cleanup, render, screen } from "@testing-library/react";
import { newOrderTestData } from "../../__test__/newOrder.test.data";
import { InpatientTransition } from "../inpatientTransition.component";
jest.mock("../../../../core/popup/popup.component");

describe("Inpatient Transition component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("Inpatient Transition validate title", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(newOrderTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: INewOrder) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <InpatientTransition
        data={data}
        setData={mockSetState}
        newValidator={Validator}
      />
    );
    const title = screen.getByTestId("inpatientTransition-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Inpatient Transition");
  });

  it("Inpatient Transition validate radio button description title", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(newOrderTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: INewOrder) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <InpatientTransition
        data={data}
        setData={mockSetState}
        newValidator={Validator}
      />
    );
    const title = screen.getByTestId("inpatientTransition-was-NPWT-initiated");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(
      "Was Negative Pressure Wound Therapy (NPWT) initiated in an inpatient facility or has the patient been on NPWT anytime in the last 60 days?"
    );
  });

  it("Inpatient Transition validate radio buttons", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(newOrderTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: INewOrder) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <InpatientTransition
        data={data}
        setData={mockSetState}
        newValidator={Validator}
      />
    );
    const yesRadioButton = screen.getByTestId(
      "inpatientTransition-was-NPWT-initiated-yes"
    ) as HTMLInputElement;
    const noRadioButton = screen.getByTestId(
      "inpatientTransition-was-NPWT-initiated-no"
    ) as HTMLInputElement;
    expect(yesRadioButton).toBeInTheDocument();
    expect(noRadioButton).toBeInTheDocument();
    expect(yesRadioButton).toHaveTextContent("Yes");
    expect(noRadioButton).toHaveTextContent("No");
  });

  it("Inpatient Transition validate change facility button", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(newOrderTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: INewOrder) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <InpatientTransition
        data={data}
        setData={mockSetState}
        newValidator={Validator}
      />
    );
    const title = screen.getByTestId("button-change-facility");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Change Facility");
  });

  it("Inpatient Transition validate for select yes and validate date", () => {
    const Validator = new NewOrderValidator();
    let data = getDeepClone(newOrderTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: INewOrder) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <InpatientTransition
        data={data}
        setData={mockSetState}
        newValidator={Validator}
      />
    );
    const yesRadioButton = screen.getByTestId(
      "inpatientTransition-was-NPWT-initiated-yes"
    ) as HTMLInputElement;
    expect(yesRadioButton).toBeInTheDocument();
    userEvent.click(yesRadioButton);
    const dateInitiated = screen.getByTestId(
      "inpatientTransition-date-initiated"
    );
    expect(dateInitiated).toBeInTheDocument();
    expect(dateInitiated).toHaveTextContent("Date Initiated");
    const dateInitiatedValue = screen.getByTestId(
      "inpatientTransition-date-initiated-value"
    ) as HTMLBaseElement;
    userEvent.type(dateInitiatedValue, "02/03/1999");
    expect(dateInitiatedValue).toBeInTheDocument();
  });
});
