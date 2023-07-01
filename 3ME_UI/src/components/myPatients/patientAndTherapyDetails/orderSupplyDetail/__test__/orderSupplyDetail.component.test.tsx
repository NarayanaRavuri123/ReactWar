import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import OrderSupplyDetail from "../orderSupplyDetails.component";
import {
  orderSupliesMock,
  orderSuppliesInfoMock,
} from "../../../../../mockData/orderSuppliesDetailsMockData";

describe("Order Suppply Detail component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("Order Supply Dressing Label header", () => {
    render(
      <MemoryRouter>
        <OrderSupplyDetail supplyOrderData={orderSuppliesInfoMock} />
      </MemoryRouter>
    );
    const supplyDressingLabel = screen.getByTestId(
      "order-dressing-supply-order-heading"
    );
    expect(supplyDressingLabel).toBeInTheDocument();
  });
  it("Order Supply Dressing Icon Black", () => {
    render(
      <MemoryRouter>
        <OrderSupplyDetail supplyOrderData={orderSuppliesInfoMock} />
      </MemoryRouter>
    );
    const orderSuppliesIconBlack = screen.getByTestId(
      "supply-order-icon-black"
    );
    expect(orderSuppliesIconBlack).toBeInTheDocument();
  });
  it("Order Supply Initiated by", () => {
    render(
      <MemoryRouter>
        <OrderSupplyDetail supplyOrderData={orderSuppliesInfoMock} />
      </MemoryRouter>
    );
    const orderInitiatedBy = screen.getByTestId("supply-order-initiatedBy");
    expect(orderInitiatedBy).toBeInTheDocument();
  });
  it("Order Supply status", () => {
    render(
      <MemoryRouter>
        <OrderSupplyDetail supplyOrderData={orderSuppliesInfoMock} />
      </MemoryRouter>
    );
    const statusPresent = screen.getByTestId("supply-order-status");
    expect(statusPresent).toBeInTheDocument();
  });
  it("Product", () => {
    render(
      <MemoryRouter>
        <OrderSupplyDetail supplyOrderData={orderSuppliesInfoMock} />
      </MemoryRouter>
    );
    const productlabel = screen.getByTestId("supply-order-product");
    expect(productlabel).toBeInTheDocument();
  });
  it("Created On", () => {
    render(
      <MemoryRouter>
        <OrderSupplyDetail supplyOrderData={orderSuppliesInfoMock} />
      </MemoryRouter>
    );
    const createdOn = screen.getByTestId("supply-order-created-on");
    expect(createdOn).toBeInTheDocument();
  });
  it("Navigate Icon", () => {
    render(
      <MemoryRouter>
        <OrderSupplyDetail supplyOrderData={orderSuppliesInfoMock} />
      </MemoryRouter>
    );
    const navigateIcon = screen.getByTestId("navigate-icon-right");
    expect(navigateIcon).toBeInTheDocument();
  });
});
