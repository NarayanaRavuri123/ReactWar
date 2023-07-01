import { cleanup, render, screen } from "@testing-library/react";
import OrderSummaryHeader from "../orderSummaryComponent";

describe("Order Summary Component", () => {
  afterAll(() => {
    cleanup();
  });

  it("Order Summary image Present", () => {
    render(<OrderSummaryHeader />);
    const title = screen.getByTestId("successimgTest");
    expect(title).toBeInTheDocument();
  });

  it("Order Summary Text Present", () => {
    render(<OrderSummaryHeader />);
    const title = screen.getByTestId("successTextTest");
    expect(title).toBeInTheDocument();
  });
  it("Order Summary Text2 Present", () => {
    render(<OrderSummaryHeader />);
    const title = screen.getByTestId("successText2Test");
    expect(title).toBeInTheDocument();
  });
  it("Order Summary Text3 Present", () => {
    render(<OrderSummaryHeader />);
    const title = screen.getByTestId("successText3Test");
    expect(title).toBeInTheDocument();
  });
  it("Order Success Btn", () => {
    render(<OrderSummaryHeader />);
    const title = screen.getByTestId("OrderSucessTest");
    expect(title).toBeInTheDocument();
  });
});
