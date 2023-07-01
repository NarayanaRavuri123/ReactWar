import React from "react";
import { MemoryRouter } from "react-router-dom";
import { INewOrder } from "../../newOrder.interface";
import { NewOrderValidator } from "../../newOrder.validator";
import { getDeepClone } from "../../../../util/ObjectFunctions";
import { cleanup, render, screen } from "@testing-library/react";
import { TherapyInformation } from "../therapyInformation.component";
import { newOrderTestData } from "../../__test__/newOrder.test.data";

describe("Therapy Information component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("Therapy Information validate title", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(newOrderTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: INewOrder) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <TherapyInformation
          data={data}
          setData={mockSetState}
          Validator={Validator}
        />
      </MemoryRouter>
    );
    const title = screen.getByTestId("therapy-information-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Therapy Information");
  });

  it("Therapy Information validate therapy length", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(newOrderTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: INewOrder) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <TherapyInformation
          data={data}
          setData={mockSetState}
          Validator={Validator}
        />
      </MemoryRouter>
    );
    const title = screen.getByTestId("test-lengthOfTherapy");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Length of Therapy");
    const dropDown = screen.getByTestId("therapy-information-lengthOfTherapy");
    expect(dropDown).toBeInTheDocument();
  });

  it("Therapy Information validate therapy goal", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(newOrderTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: INewOrder) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <TherapyInformation
          data={data}
          setData={mockSetState}
          Validator={Validator}
        />
      </MemoryRouter>
    );
    const title = screen.getByTestId("test-goalOfTherapy");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Goal of Therapy");
    const dropDown = screen.getByTestId("therapy-information-goalOfTherapy");
    expect(dropDown).toBeInTheDocument();
  });
});
