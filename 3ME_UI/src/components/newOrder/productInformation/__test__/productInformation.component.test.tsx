import { IProductInfo } from "../../newOrder.interface";
import { getDeepClone } from "../../../../util/ObjectFunctions";
import { cleanup, render, screen } from "@testing-library/react";
import { ProductInformation } from "../productInformation.component";
import { productTestData } from "../../__test__/newOrder.test.data";
import { AuthContext } from "../../../../context/AuthContext";
import { MemoryRouter } from "react-router-dom";
import { getMockAuthContextData } from "../../../header/__test__/authContextMockData";
import { IFacility } from "../../../manageProfile/facilityInformation/facility.interface";

jest.mock("../../../../core/customDropdown/customDropdown.component");
describe("Product Info component", () => {
  afterAll(() => {
    cleanup();
  });
  it("Product Info Title Validate", () => {
    const productData = getDeepClone(productTestData);
    const mockProductSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IProductInfo) => [dt, mockProductSetState],
    }));
    render(
      <ProductInformation
        productInfo={productData}
        setProductInfo={mockProductSetState}
      />
    );
    const title = screen.getByTestId("prodTitleTest");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Product Information");
  });
  it("if the facility is ReadyCare validate Yes Button", () => {
    const productData = getDeepClone(productTestData);
    const mockProductSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IProductInfo) => [dt, mockProductSetState],
    }));
    const facility: IFacility = {
      accountId: "10987651239",
      accountName: "University Medical Center",
      typeName: "Skilled nursing facility",
      address1: "1800 17th Ave SE",
      address2: "Apt 405",
      city: "Minneapolis",
      state: "MN",
      zip: 66554,
      accountNumber: 123456,
      addressId: "123",
      typeCode: "123",
      readyCareFlag: "Y",
    };
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AuthContext.Provider
          value={{
            ...getMockAuthContextData(),
            registeredFaciltyAddress: facility,
          }}
        >
          <ProductInformation
            productInfo={productData}
            setProductInfo={mockProductSetState}
          />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    const title = screen.getByTestId("prodInfoTitleTest");
    expect(title).toBeInTheDocument();
  });
  it("if the facility is not ReadyCare validate", () => {
    const productData = getDeepClone(productTestData);
    const mockProductSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IProductInfo) => [dt, mockProductSetState],
    }));
    const facility: IFacility = {
      accountId: "10987651239",
      accountName: "University Medical Center",
      typeName: "Skilled nursing facility",
      address1: "1800 17th Ave SE",
      address2: "Apt 405",
      city: "Minneapolis",
      state: "MN",
      zip: 66554,
      accountNumber: 123456,
      addressId: "123",
      typeCode: "123",
      readyCareFlag: "N",
    };
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AuthContext.Provider
          value={{
            ...getMockAuthContextData(),
            registeredFaciltyAddress: facility,
          }}
        >
          <ProductInformation
            productInfo={productData}
            setProductInfo={mockProductSetState}
          />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    const title = screen.getByTestId("prod-title");
    expect(title).toBeInTheDocument();
  });
});
