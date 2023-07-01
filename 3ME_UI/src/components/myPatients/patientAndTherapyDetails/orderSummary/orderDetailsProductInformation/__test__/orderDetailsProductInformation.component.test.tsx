import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { getDeepClone } from "../../../../../../util/ObjectFunctions";
import { defaultOrderOverviewProductInfo } from "../../../orderOverview/orderOverview.model";
import { OrderDetailsProductInformation } from "../orderDetailsProductInformation.component";

describe("Product information review order component", () => {
  afterAll(() => {
    cleanup();
  });

  it("Order Details Product information component validate header", () => {
    const data = getDeepClone(defaultOrderOverviewProductInfo);
    render(<OrderDetailsProductInformation productInfo={data} />);
    const title = screen.getByTestId("orderoverview-prod-info-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Product Information");
  });
  it("Order Details validatesub content isreadyCare", () => {
    const data = getDeepClone(defaultOrderOverviewProductInfo);
    render(<OrderDetailsProductInformation productInfo={data} />);
    const productTitle = screen.getByTestId("product-is-reday-care");
    expect(productTitle).toBeInTheDocument();
    expect(productTitle).toHaveTextContent("V.A.C.® Ready Care?");
  });
  it("Order Details validatesub content isRedayCare values", () => {
    const data = getDeepClone(defaultOrderOverviewProductInfo);
    render(<OrderDetailsProductInformation productInfo={data} />);
    const productValue = screen.getByTestId("product-is-reday-care-value");
    expect(productValue).toBeInTheDocument();
    expect(productValue).toHaveTextContent("--");
  });
  it("Order Details validatesub content Product data", () => {
    const data = getDeepClone(defaultOrderOverviewProductInfo);
    render(<OrderDetailsProductInformation productInfo={data} />);
    const productValue = screen.getByTestId("product-product-data");
    expect(productValue).toBeInTheDocument();
  });
});
