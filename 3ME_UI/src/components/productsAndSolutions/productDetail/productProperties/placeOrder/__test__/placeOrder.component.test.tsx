import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../../../../../context/AuthContext";
import { getMockAuthContextData } from "../../../../../header/__test__/authContextMockData";
import { IFacility } from "../../../../../manageProfile/facilityInformation/facility.interface";
import { IProductContent } from "../../../../productsAndSolutions.interface";
import { PlaceOrder } from "../placeOrder.component";

describe("DeletePopup Popup component ->", () => {
  afterAll(() => {
    cleanup();
  });
  let mockProductData: IProductContent = {
    allowOrder: "3ME",
    allowSample: "",
    code: "SIM",
    id: 41,
    imageUrl:
      "https://multimedia.3m.com/mws/media/1932110Y/v-a-c-simplace-dressings-product-image.jpg",
    name: "3M™ V.A.C.® SIMPLACE™",
    productType: "Dressing",
    productUrl: "",
    sku: "M8275040/5",
  };
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
  it("Place Order Title present", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <PlaceOrder product={mockProductData} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("placeAnOrder-header");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Place an Order");
  });
  it("Place Order facility details present", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AuthContext.Provider
          value={{
            ...getMockAuthContextData(),
            registeredFaciltyAddress: facility,
          }}
        >
          <PlaceOrder product={mockProductData} />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    const title = screen.getByTestId("facility-address-city-state-zip");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(
      "University Medical Center, 1800 17th Ave Se, Mn, Minneapolis, 66554"
    );
  });
});
