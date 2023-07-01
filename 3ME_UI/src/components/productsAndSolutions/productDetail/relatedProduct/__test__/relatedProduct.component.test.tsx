import React from "react";
import { MemoryRouter } from "react-router-dom";
import { RelatedProduct } from "../relatedProduct.component";
import { IRelateProduct } from "../relatedProduct.interface";
import { cleanup, render, screen } from "@testing-library/react";
import { mockRelatedProducts } from "./relatedProduct.test.data";

describe("Product Images component ->", () => {
  afterAll(() => {
    cleanup();
  });

  it("Validate title", async () => {
    const relatedExudateLevel = mockRelatedProducts;
    React.useState = jest.fn().mockReturnValue([relatedExudateLevel, {}]);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: []) => [dt, mockSetState],
    }));
    render(
      <MemoryRouter initialEntries={["/"]}>
        <RelatedProduct selectedProductID="" selectedTreatmentcode="" />
      </MemoryRouter>
    );
    const title = screen.getByTestId("related-products-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Related 3M wound therapy products");
  });

  it("validate related product Images render", async () => {
    const relatedExudateLevel = mockRelatedProducts;
    React.useState = jest.fn().mockReturnValue([relatedExudateLevel, {}]);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IRelateProduct) => [dt, mockSetState],
    }));
    render(
      <MemoryRouter initialEntries={["/"]}>
        <RelatedProduct selectedProductID="" selectedTreatmentcode="" />
      </MemoryRouter>
    );
    const firstImage = screen.getByTestId("related-product-image-1");
    expect(firstImage).toBeInTheDocument();
    const firstTitle = screen.getByTestId("related-products-description-1");
    expect(firstTitle).toBeInTheDocument();
    expect(firstTitle).toHaveTextContent("3M™ Tegaderm™ Silicone Foam");
    const secondImage = screen.getByTestId("related-product-image-2");
    expect(secondImage).toBeInTheDocument();
    const secondTitle = screen.getByTestId("related-products-description-2");
    expect(secondTitle).toBeInTheDocument();
    expect(secondTitle).toHaveTextContent("KERRACEL™ Gelling Fiber Dressing");
    const thirdImage = screen.getByTestId("related-product-image-3");
    expect(thirdImage).toBeInTheDocument();
    const thirdTitle = screen.getByTestId("related-products-description-3");
    expect(thirdTitle).toBeInTheDocument();
    expect(thirdTitle).toHaveTextContent(
      "NU-DERM™ Hydrocolloid Wound Dressing"
    );
  });
});
