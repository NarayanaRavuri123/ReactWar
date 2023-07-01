import { MemoryRouter } from "react-router-dom";
import { ProductImages } from "../productImages.component";
import { cleanup, render, screen } from "@testing-library/react";
import { mockProductProperties } from "../../productProperties/__test__/productProperties.test.data";

describe("Product Images component ->", () => {
  afterAll(() => {
    cleanup();
  });

  it("Product Image render", async () => {
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: []) => [dt, mockSetState],
    }));
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ProductImages productsData={mockProductProperties} />
      </MemoryRouter>
    );
    const productImage = screen.getByTestId("product-image");
    expect(productImage).toBeInTheDocument();
  });

  it("Product Thumbnail Images render", async () => {
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: []) => [dt, mockSetState],
    }));
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ProductImages productsData={mockProductProperties} />
      </MemoryRouter>
    );
    const thumbnailImages = screen.getByTestId("product-thumbnail-images");
    expect(thumbnailImages).toBeInTheDocument();
    const firstImage = screen.getByTestId("product-thumbnail-image-1");
    expect(firstImage).toBeInTheDocument();
    const secondImage = screen.getByTestId("product-thumbnail-image-2");
    expect(secondImage).toBeInTheDocument();
  });
});
