import React from "react";
import { MemoryRouter } from "react-router-dom";
import { cleanup, render, screen } from "@testing-library/react";
import { ProductDetail } from "../productDetail.component";

describe("Product Images component ->", () => {
  afterAll(() => {
    cleanup();
  });

  it("Validate navigator", async () => {
    const mockSetState = jest.fn();
    const useStateMock: any = (useState: boolean) => [
      (useState = false),
      mockSetState,
    ];
    jest.spyOn(React, "useState").mockImplementation(useStateMock);
    render(
      <MemoryRouter
        initialEntries={[
          {
            state: {
              product: {
                id: 1,
                name: "3M™ Tegaderm™ Alginate",
                sku: "DTGF05PKS",
                allowOrder: "",
                allowSample: "",
                productType: "",
                imageUrl:
                  "https://multimedia.3m.com/mws/media/2119326Y/clinician-ordering-supplies-for-patient-image.jpg",
              },
            },
          },
        ]}
      >
        <ProductDetail />
      </MemoryRouter>
    );
    const title = screen.getByTestId("product-detail-route-section");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Products & Solutions");
  });

  it("validate no data render", async () => {
    const mockSetState = jest.fn();
    const useStateMock: any = (useState: boolean) => [
      (useState = false),
      mockSetState,
    ];
    jest.spyOn(React, "useState").mockImplementation(useStateMock);
    render(
      <MemoryRouter
        initialEntries={[
          {
            state: {
              product: {
                id: 1,
                name: "3M™ Tegaderm™ Alginate",
                sku: "DTGF05PKS",
                allowOrder: "",
                allowSample: "",
                productType: "",
                imageUrl:
                  "https://multimedia.3m.com/mws/media/2119326Y/clinician-ordering-supplies-for-patient-image.jpg",
              },
            },
          },
        ]}
      >
        <ProductDetail />
      </MemoryRouter>
    );
    const noData = screen.getByTestId("no-data");
    expect(noData).toBeInTheDocument();
    expect(noData).toHaveTextContent("No data present");
  });
});
