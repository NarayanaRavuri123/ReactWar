import { MemoryRouter } from "react-router-dom";
import { ReSupplyJustification } from "../reSupplyJustification.component";
import { cleanup, render, screen } from "@testing-library/react";
import { getDeepClone } from "../../../../util/ObjectFunctions";
import { supplyOrderTestData } from "../../__test__/supplyOrder.test.data";
import { ISupplyOrder } from "../../supplyOrder.interface";

describe("ReSupplyJustification component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("ReSupplyJustification Title", () => {
    const data = getDeepClone(supplyOrderTestData);

    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: ISupplyOrder) => [dt, mockSetState],
    }));
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ReSupplyJustification
          data={data}
          setData={mockSetState}
          isReviewOrder={false}
          openSupplyOrderPageEdit={undefined}
        />
      </MemoryRouter>
    );
    const title = screen.getByTestId("resupplyJustificationTest");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Choose a Resupply Justification");
  });

  it("Resupply Justification field", () => {
    const data = getDeepClone(supplyOrderTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: ISupplyOrder) => [dt, mockSetState],
    }));
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ReSupplyJustification
          data={data}
          setData={mockSetState}
          isReviewOrder={false}
          openSupplyOrderPageEdit={undefined}
        />
      </MemoryRouter>
    );
    const title = screen.getByTestId("resupplyJustificationlabelTest");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Resupply Justification");
  });

  it("Resupply Justification dropdown present", () => {
    const data = getDeepClone(supplyOrderTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: ISupplyOrder) => [dt, mockSetState],
    }));
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ReSupplyJustification
          data={data}
          setData={mockSetState}
          isReviewOrder={false}
          openSupplyOrderPageEdit={undefined}
        />
      </MemoryRouter>
    );
    const title = screen.getByTestId("resupplyJustificationDropDownTest");
    expect(title).toBeInTheDocument();
  });
});
