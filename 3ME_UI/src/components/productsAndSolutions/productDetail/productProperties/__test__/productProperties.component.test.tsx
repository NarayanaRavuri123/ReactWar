import React from "react";
import { MemoryRouter } from "react-router-dom";
import { cleanup, render, screen } from "@testing-library/react";
import { ProductProperties } from "../productProperties.component";
import { mockProductProperties } from "./productProperties.test.data";
import { IProductContent } from "../../../productsAndSolutions.interface";
jest.mock("../../../../../core/popup/popup.component");

describe("Product Properties component ->", () => {
  afterAll(() => {
    cleanup();
  });

  it("Validate display title", async () => {
    const product: IProductContent = {
      id: 1,
      code: "1",
      name: "3M™ Tegaderm™ Alginate",
      sku: "DTGF05PKS",
      allowOrder: "",
      allowSample: "",
      productType: "dressing",
      productUrl: "",
      imageUrl:
        "https://multimedia.3m.com/mws/media/2119326Y/clinician-ordering-supplies-for-patient-image.jpg",
    };
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: []) => [dt, mockSetState],
    }));
    const prodProp = [
      {
        productSectionTitle: "<h3>Indications</h3>",
        productSectionBody:
          "Tegaderm Silicone Foam Dressing is designed for management of low- to highly-exuding partial and full thickness wounds such as pressure ulcers, venous leg ulcers, neuropathic ulcers, arterial ulcers, skin tears, surgical wounds superficial partial thickness burns and donor sites. The dressing is suitable for use on fragile skin and with compression therapy. The product is not designed, sold or intended for use except as indicated.",
        productSectionOrder: "5",
        productTitleDisplay: "True",
        productSectionType: "indications",
      },
    ];
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ProductProperties prodProps={prodProp} selectedProduct={product} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("section-title-div-display-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Indications");
  });

  it("Validate button", async () => {
    const product: IProductContent = {
      id: 1,
      code: "1",
      name: "3M™ Tegaderm™ Alginate",
      sku: "DTGF05PKS",
      allowOrder: "",
      allowSample: "",
      productType: "dressing",
      productUrl: "",
      imageUrl:
        "https://multimedia.3m.com/mws/media/2119326Y/clinician-ordering-supplies-for-patient-image.jpg",
    };
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: []) => [dt, mockSetState],
    }));
    const prodProp = [
      {
        productSectionTitle: "View more button",
        productSectionBody: "View more details on 3M.com",
        productSectionOrder: "4",
        productTitleDisplay: "False",
        productSectionType: "button",
      },
    ];
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ProductProperties prodProps={prodProp} selectedProduct={product} />
      </MemoryRouter>
    );
    const sectionTitle = screen.getByTestId("section-button-div");
    expect(sectionTitle).toBeInTheDocument();
    expect(sectionTitle).toHaveTextContent("View more details on 3M.com");
    const button = screen.getByTestId("section-button");
    expect(button).toBeInTheDocument();
    const description = screen.getByTestId("section-button");
    expect(description).toBeInTheDocument();
    expect(description).toHaveTextContent("View more details on 3M.com");
  });

  it("Validate section title", async () => {
    const product: IProductContent = {
      id: 1,
      code: "1",
      name: "3M™ Tegaderm™ Alginate",
      sku: "DTGF05PKS",
      allowOrder: "",
      allowSample: "",
      productType: "dressing",
      productUrl: "",
      imageUrl:
        "https://multimedia.3m.com/mws/media/2119326Y/clinician-ordering-supplies-for-patient-image.jpg",
    };
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: []) => [dt, mockSetState],
    }));
    const prodProp = [
      {
        productSectionTitle: "Product name",
        productSectionBody: "<h2>3M™ Tegaderm™ Silicone Foam Dressing</h2>",
        productSectionOrder: "1",
        productTitleDisplay: "False",
        productSectionType: "header",
      },
    ];
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ProductProperties prodProps={prodProp} selectedProduct={product} />
      </MemoryRouter>
    );
    const container = screen.getByTestId("section-title-body");
    expect(container).toBeInTheDocument();
    const title = screen.getByTestId("product-section-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("3M™ Tegaderm™ Silicone Foam Dressing");
  });

  it("Validate left column", async () => {
    const product: IProductContent = {
      id: 1,
      code: "1",
      name: "3M™ Tegaderm™ Alginate",
      sku: "DTGF05PKS",
      allowOrder: "",
      allowSample: "",
      productType: "dressing",
      productUrl: "",
      imageUrl:
        "https://multimedia.3m.com/mws/media/2119326Y/clinician-ordering-supplies-for-patient-image.jpg",
    };
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: []) => [dt, mockSetState],
    }));
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ProductProperties
          prodProps={mockProductProperties}
          selectedProduct={product}
        />
      </MemoryRouter>
    );
    const container = screen.getByTestId("left-column");
    expect(container).toBeInTheDocument();
  });

  it("Validate right column", async () => {
    const product: IProductContent = {
      id: 1,
      code: "1",
      name: "3M™ Tegaderm™ Alginate",
      sku: "DTGF05PKS",
      allowOrder: "",
      allowSample: "",
      productType: "dressing",
      productUrl: "",
      imageUrl:
        "https://multimedia.3m.com/mws/media/2119326Y/clinician-ordering-supplies-for-patient-image.jpg",
    };
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: []) => [dt, mockSetState],
    }));
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ProductProperties
          prodProps={mockProductProperties}
          selectedProduct={product}
        />
      </MemoryRouter>
    );
    const container = screen.getByTestId("right-column");
    expect(container).toBeInTheDocument();
    const productImages = screen.getByTestId("product-images-component");
    expect(productImages).toBeInTheDocument();
    const buttonDiv = screen.getByTestId("button-div");
    expect(buttonDiv).toBeInTheDocument();
    const placeAnOrder = screen.getByTestId("Place an Order");
    expect(placeAnOrder).toBeInTheDocument();
    expect(placeAnOrder).toHaveTextContent("Place an Order");
    const requstASample = screen.getByTestId("Request a Sample");
    expect(requstASample).toBeInTheDocument();
    expect(requstASample).toHaveTextContent("Request a Sample");
  });

  it("Validate related parameters", async () => {
    const product: IProductContent = {
      id: 1,
      code: "1",
      name: "3M™ Tegaderm™ Alginate",
      sku: "DTGF05PKS",
      allowOrder: "",
      allowSample: "",
      productType: "dressing",
      productUrl: "",
      imageUrl:
        "https://multimedia.3m.com/mws/media/2119326Y/clinician-ordering-supplies-for-patient-image.jpg",
    };
    const relatedParameters = [
      "Exudate Management",
      "Help Maintain Environment Conducive to Epithe",
      "Help Maintain Environment Conducive to Granulation",
      "Management of Critically Colonized Wounds",
      "Protect Skin",
    ];
    React.useState = jest.fn().mockReturnValue([relatedParameters, {}]);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: []) => [dt, mockSetState],
    }));
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ProductProperties prodProps={[]} selectedProduct={product} />
      </MemoryRouter>
    );
    const container = screen.getByTestId("right-column");
    expect(container).toBeInTheDocument();
    const mainContanier = screen.getByTestId("related-product-main-container");
    expect(mainContanier).toBeInTheDocument();
    const relatedParametersDiv = screen.getByTestId(
      "related-parameters-container"
    );
    expect(relatedParametersDiv).toBeInTheDocument();
    const relatedParametersTitle = screen.getByTestId(
      "related-parameters-title"
    );
    expect(relatedParametersTitle).toBeInTheDocument();
    expect(relatedParametersTitle).toHaveTextContent("Primary wound care goal");
    const title1 = screen.getByTestId("related-parameters-title-item-1");
    expect(title1).toBeInTheDocument();
    expect(title1).toHaveTextContent("Exudate Management");
    const title2 = screen.getByTestId("related-parameters-title-item-2");
    expect(title2).toBeInTheDocument();
    expect(title2).toHaveTextContent(
      "Help Maintain Environment Conducive to Epithe"
    );
    const title3 = screen.getByTestId("related-parameters-title-item-3");
    expect(title3).toBeInTheDocument();
    expect(title3).toHaveTextContent(
      "Help Maintain Environment Conducive to Granulation"
    );
    const title4 = screen.getByTestId("related-parameters-title-item-4");
    expect(title4).toBeInTheDocument();
    expect(title4).toHaveTextContent(
      "Management of Critically Colonized Wounds"
    );
    const title5 = screen.getByTestId("related-parameters-title-item-5");
    expect(title5).toBeInTheDocument();
    expect(title5).toHaveTextContent("Protect Skin");
  });

  it("Validate related exudate", async () => {
    const product: IProductContent = {
      id: 1,
      code: "1",
      name: "3M™ Tegaderm™ Alginate",
      sku: "DTGF05PKS",
      allowOrder: "",
      allowSample: "",
      productType: "dressing",
      productUrl: "",
      imageUrl:
        "https://multimedia.3m.com/mws/media/2119326Y/clinician-ordering-supplies-for-patient-image.jpg",
    };
    const relatedExudateLevel = [
      "None",
      "Minimal",
      "Dry",
      "Moderate",
      "Scant",
      "Copious",
    ];
    React.useState = jest.fn().mockReturnValue([relatedExudateLevel, {}]);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: []) => [dt, mockSetState],
    }));
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ProductProperties prodProps={[]} selectedProduct={product} />
      </MemoryRouter>
    );
    const container = screen.getByTestId("right-column");
    expect(container).toBeInTheDocument();
    const mainContanier = screen.getByTestId("related-exudate-level-container");
    expect(mainContanier).toBeInTheDocument();
    const relatedExudateLevelTitle = screen.getByTestId(
      "related-exudate-level-title"
    );
    expect(relatedExudateLevelTitle).toBeInTheDocument();
    expect(relatedExudateLevelTitle).toHaveTextContent("Wound exudate level");
    const title1 = screen.getByTestId("related-exudate-level-item-title-1");
    expect(title1).toBeInTheDocument();
    expect(title1).toHaveTextContent("None");
    const title2 = screen.getByTestId("related-exudate-level-item-title-2");
    expect(title2).toBeInTheDocument();
    expect(title2).toHaveTextContent("Minimal");
    const title3 = screen.getByTestId("related-exudate-level-item-title-3");
    expect(title3).toBeInTheDocument();
    expect(title3).toHaveTextContent("Dry");
    const title4 = screen.getByTestId("related-exudate-level-item-title-4");
    expect(title4).toBeInTheDocument();
    expect(title4).toHaveTextContent("Moderate");
    const title5 = screen.getByTestId("related-exudate-level-item-title-5");
    expect(title5).toBeInTheDocument();
    expect(title5).toHaveTextContent("Scant");
    const title6 = screen.getByTestId("related-exudate-level-item-title-6");
    expect(title6).toBeInTheDocument();
    expect(title6).toHaveTextContent("Copious");
  });
});
