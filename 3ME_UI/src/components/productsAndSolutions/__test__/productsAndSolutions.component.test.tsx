import { MemoryRouter } from "react-router-dom";
import { cleanup, render, screen } from "@testing-library/react";
import { ProductsAndSolutions } from "../productsAndSolutions.component";
import mockProductSection from "./productsAndSolutions.mock";
import React from "react";
import { getDeepClone } from "../../../util/ObjectFunctions";

describe("Products And Solution component", () => {
  afterAll(() => {
    cleanup();
  });
  it("To check Products header validation", async () => {
    const showLoader = false;
    React.useState = jest.fn().mockReturnValue([showLoader, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ProductsAndSolutions isTesting={true} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("productsAndSolutions-header-text");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Products");
  });

  it("Products Searchbar", () => {
    const showLoader = false;
    React.useState = jest.fn().mockReturnValue([showLoader, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ProductsAndSolutions isTesting={true} />
      </MemoryRouter>
    );
    const searchInput = screen.getByTestId("product-library-search-input");
    expect(searchInput).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Search by product name or SKU")
    ).toBeInTheDocument();
  });

  it("Product Category DropDown", () => {
    const showLoader = false;
    React.useState = jest.fn().mockReturnValue([showLoader, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ProductsAndSolutions isTesting={true} />
      </MemoryRouter>
    );
    const dropDown = screen.getByTestId("product-library-category");
    expect(dropDown).toBeInTheDocument();
    expect(screen.getByText("Show all product categories")).toBeInTheDocument();
  });

  it("Validate Item per page", () => {
    const showLoader = false;
    const showProductLoader = false;
    React.useState = jest.fn().mockReturnValue([showLoader, {}]);
    React.useState = jest.fn().mockReturnValue([showProductLoader, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ProductsAndSolutions isTesting={true} />
      </MemoryRouter>
    );
    const itemsPerPage = screen.getByTestId("product-itemsPerPage");
    expect(itemsPerPage).toBeInTheDocument();
    expect(screen.getByText("Items per page:")).toBeInTheDocument();
  });

  it("Validate Pagination table", () => {
    const showLoader = false;
    const showProductLoader = false;
    React.useState = jest.fn().mockReturnValue([showLoader, {}]);
    React.useState = jest.fn().mockReturnValue([showProductLoader, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ProductsAndSolutions isTesting={true} />
      </MemoryRouter>
    );
    const paginationTable = screen.getByTestId("paginationTablePresent");
    expect(paginationTable).toBeInTheDocument();
  });

  it("Validate Pagination total products count", () => {
    const showLoader = false;
    const showProductLoader = false;
    React.useState = jest.fn().mockReturnValue([showLoader, {}]);
    React.useState = jest.fn().mockReturnValue([showProductLoader, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ProductsAndSolutions isTesting={true} />
      </MemoryRouter>
    );
    const productsTotalCount = screen.getByTestId("product-totalCounts");
    expect(productsTotalCount).toBeInTheDocument();
  });

  it("Validate product section", () => {
    const showLoader = false;
    const showProductLoader = false;
    const products = getDeepClone(mockProductSection);
    React.useState = jest.fn().mockReturnValue([showLoader, {}]);
    React.useState = jest.fn().mockReturnValue([showProductLoader, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ProductsAndSolutions
          isLoading={showLoader}
          isTesting={true}
          productsData={products}
        />
      </MemoryRouter>
    );
    const product = screen.getByTestId("1");
    expect(product).toBeInTheDocument();
    const productImage = screen.getByTestId("product-poster-1");
    expect(productImage).toBeInTheDocument();
    const productImageText = screen.getByTestId("product-product-1");
    expect(productImageText).toBeInTheDocument();
    expect(productImageText).toHaveTextContent(
      "3M™ Tegaderm™ Silicone foam with border"
    );
  });
});
