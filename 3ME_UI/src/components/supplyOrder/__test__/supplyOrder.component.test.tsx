import { MemoryRouter } from "react-router-dom";
import SupplyOrder from "../supplyOrder.component";
import { cleanup, render, screen } from "@testing-library/react";
import { SupplyOrderList } from "../supplyOrderList/supplyOrderList.component";

describe("SupplyOrderList component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("Supply Order Title", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SupplyOrderList supplyOrderContextObj={null} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("select-patient");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Select Patient");
  });

  it("Supply Order Progress bar validation", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SupplyOrder />
      </MemoryRouter>
    );
    const title = screen.getByTestId("SO-ProgressBar");
    expect(title).toBeInTheDocument();
  });

  it("Supply Order Validate filter field", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SupplyOrderList supplyOrderContextObj={null} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("filter-patients");
    expect(title).toBeInTheDocument();
  });
});
