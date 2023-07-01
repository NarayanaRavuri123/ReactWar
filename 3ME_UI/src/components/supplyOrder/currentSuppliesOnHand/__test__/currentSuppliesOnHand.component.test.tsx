import { MemoryRouter } from "react-router-dom";
import { CurrentSuppliesOnHand } from "../currentSuppliesOnHand";
import { cleanup, render, screen } from "@testing-library/react";
import { getDeepClone } from "../../../../util/ObjectFunctions";
import { supplyOrderTestData } from "../../__test__/supplyOrder.test.data";
import { ISupplyOrder } from "../../supplyOrder.interface";

describe("CurrentSupplies On Hand component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("Current Supplies on Hand Title", () => {
    const data = getDeepClone(supplyOrderTestData);

    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: ISupplyOrder) => [dt, mockSetState],
    }));
    render(
      <MemoryRouter initialEntries={["/"]}>
        <CurrentSuppliesOnHand
          data={data}
          setData={mockSetState}
          isReviewOrder={false}
          openSupplyOrderPageEdit={undefined}
        />
      </MemoryRouter>
    );
    const title = screen.getByTestId("currentsuppliesTitleTest");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Current Supplies on Hand");
  });

  it("vacdressing title validation", () => {
    const data = getDeepClone(supplyOrderTestData);

    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: ISupplyOrder) => [dt, mockSetState],
    }));
    render(
      <MemoryRouter initialEntries={["/"]}>
        <CurrentSuppliesOnHand
          data={data}
          setData={mockSetState}
          isReviewOrder={false}
          openSupplyOrderPageEdit={undefined}
        />
      </MemoryRouter>
    );
    const title = screen.getByTestId("vacdressingTest");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Individual 3M™ V.A.C.® Dressings");
  });

  it("cannisterDressing field", () => {
    const data = getDeepClone(supplyOrderTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: ISupplyOrder) => [dt, mockSetState],
    }));
    render(
      <MemoryRouter initialEntries={["/"]}>
        <CurrentSuppliesOnHand
          data={data}
          setData={mockSetState}
          isReviewOrder={false}
          openSupplyOrderPageEdit={undefined}
        />
      </MemoryRouter>
    );
    const title = screen.getByTestId("cannisterDressingTest");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Individual 3M™ V.A.C.® Canisters");
  });

  it("dressinglabel field", () => {
    const data = getDeepClone(supplyOrderTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: ISupplyOrder) => [dt, mockSetState],
    }));
    render(
      <MemoryRouter initialEntries={["/"]}>
        <CurrentSuppliesOnHand
          data={data}
          setData={mockSetState}
          isReviewOrder={false}
          openSupplyOrderPageEdit={undefined}
        />
      </MemoryRouter>
    );
    const title = screen.getByTestId("dressinglabelTest");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Dressing Change Frequency");
  });
});
