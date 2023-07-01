import { cleanup, render, screen } from "@testing-library/react";
import { VacCannister } from "../vacCannister.component";
import { ICanister, INewOrder } from "../../../newOrder.interface";
import { getDeepClone } from "../../../../../util/ObjectFunctions";
import {
  canisterTestData,
  productTestData,
} from "../../../__test__/newOrder.test.data";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../../../../context/AuthContext";
import { getMockAuthContextData } from "../../../../header/__test__/authContextMockData";
import { IFacility } from "../../../../manageProfile/facilityInformation/facility.interface";
import { NewOrderContext } from "../../../../../context/NewOrderContext";
import { getMockNewOrderData } from "../../../clinicalInformation/__test__/newOrderMockContextData";

describe("VAC Cannister Kit", () => {
  afterAll(() => {
    cleanup();
  });
  it("To check header Present", () => {
    const data = getDeepClone(canisterTestData);
    const productData = getDeepClone(productTestData);
    productData.productInformation.value = "no";
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: ICanister) => [dt, mockSetState],
    }));
    const cannisterProduct = [
      {
        productID: 151,
        productName: "ACTIV.A.C™ 300mL Canister w/Gel [M8275058/5]",
        productCode: "M8275058/5",
        productType: 3,
        productSequence: 1,
        sizes: null,
      },
    ];
    render(
      <VacCannister
        cannisterProduct={cannisterProduct}
        data={data}
        productInfo={productData}
        setData={mockSetState}
      />
    );
    const dressingSupplies = screen.getByTestId("cannisterKitHeaderTest");
    expect(dressingSupplies).toBeInTheDocument();
    expect(dressingSupplies).toHaveTextContent("3M™ V.A.C.® Canisters");
  });

  it("To check canister subHeader Present", () => {
    const data = getDeepClone(canisterTestData);
    const productData = getDeepClone(productTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: ICanister) => [dt, mockSetState],
    }));
    const cannisterProduct = [
      {
        productID: 151,
        productName: "ACTIV.A.C™ 300mL Canister w/Gel [M8275058/5]",
        productCode: "M8275058/5",
        productType: 3,
        productSequence: 1,
        sizes: null,
      },
    ];
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
          <VacCannister
            cannisterProduct={cannisterProduct}
            data={data}
            productInfo={productData}
            setData={mockSetState}
          />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    const dressingSupplies = screen.getByTestId("dressingKitBodyTest");
    expect(dressingSupplies).toBeInTheDocument();
  });

  it("To check canister quantity Present", () => {
    const data = getDeepClone(canisterTestData);
    const productData = getDeepClone(productTestData);
    productData.productInformation.value = "no";
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: INewOrder) => [dt, mockSetState],
    }));
    const cannisterProduct = [
      {
        productID: 151,
        productName: "ACTIV.A.C™ 300mL Canister w/Gel [M8275058/5]",
        productCode: "M8275058/5",
        productType: 3,
        productSequence: 1,
        sizes: null,
      },
    ];
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
          <NewOrderContext.Provider
            value={{
              ...getMockNewOrderData(),
            }}
          >
            <VacCannister
              cannisterProduct={cannisterProduct}
              data={data}
              productInfo={productData}
              setData={mockSetState}
            />
          </NewOrderContext.Provider>
        </AuthContext.Provider>
      </MemoryRouter>
    );
    const dressingSupplies = screen.getByTestId("cannisterQuantityLabelTest");
    expect(dressingSupplies).toBeInTheDocument();
    expect(dressingSupplies).toHaveTextContent(
      "Quantity (5 canisters per case)"
    );
  });
});
