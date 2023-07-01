import React from "react";
import { MemoryRouter } from "react-router-dom";
import { INewOrder } from "../../newOrder.interface";
import { NewOrderValidator } from "../../newOrder.validator";
import { getDeepClone } from "../../../../util/ObjectFunctions";
import { cleanup, render, screen } from "@testing-library/react";
import { ContributingCause } from "../contributingCause.component";
import { newOrderTestData } from "../../__test__/newOrder.test.data";

describe("Contributing Cause component ->", () => {
  afterAll(() => {
    cleanup();
  });
  
  it("Contributing Cause validate title", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(newOrderTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: INewOrder) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ContributingCause
          data={data}
          setData={mockSetState}
          Validator={Validator}
        />
      </MemoryRouter>
    );
    const title = screen.getByTestId("contributing-cause-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Contributing Cause");
  });

  it("Contributing Cause component validate for select yes", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(newOrderTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: INewOrder) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ContributingCause
          data={data}
          setData={mockSetState}
          Validator={Validator}
        />
      </MemoryRouter>
    );
    const title = screen.getByTestId(
      "contributing-cause-is-wound-from-accident"
    );
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(
      "Is wound a direct result of an accident?*"
    );
    const yesButton = screen.getByTestId(
      "contributing-cause-is-wound-from-accident-yes"
    ) as HTMLBaseElement;
    expect(yesButton).toBeInTheDocument();
  });

  it("Contributing Cause component validate for select yes and validate date and type", () => {
    const Validator = new NewOrderValidator();
    let data = getDeepClone(newOrderTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: INewOrder) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ContributingCause
          data={data}
          setData={mockSetState}
          Validator={Validator}
        />
      </MemoryRouter>
    );
    const title = screen.getByTestId(
      "contributing-cause-is-wound-from-accident"
    );
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(
      "Is wound a direct result of an accident?*"
    );
    const yesButton = screen.getByTestId(
      "contributing-cause-is-wound-from-accident-yes"
    ) as HTMLBaseElement;
    expect(yesButton).toBeInTheDocument();
  });

  it("Contributing Cause component validate for select no", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(newOrderTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: INewOrder) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ContributingCause
          data={data}
          setData={mockSetState}
          Validator={Validator}
        />
      </MemoryRouter>
    );
    const title = screen.getByTestId(
      "contributing-cause-is-wound-from-accident"
    );
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(
      "Is wound a direct result of an accident?*"
    );
    const noButton = screen.getByTestId(
      "contributing-cause-is-wound-from-accident-yes"
    ) as HTMLBaseElement;
    expect(noButton).toBeInTheDocument();
  });
});
