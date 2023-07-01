import { cleanup, render, screen } from "@testing-library/react";
import { defaultSupplyOrderData } from "../../../supplyOrder.model";
import { SupplyOrderContext } from "../../../../../context/SupplyOrderContext";
import { SupplyOrderVacDressingKit } from "../supplyOrderVacDressingKit.component";
import { getMockSupplyOrderData } from "../../../__test__/supplyOrderMockContext.data";

describe("Supply Order VAC Dressing Kit", () => {
  afterAll(() => {
    cleanup();
  });

  it("To check header Present", () => {
    const vacProductInfo = {
      imageLink: "test.com",
      brandName: "",
    };
    render(
      <SupplyOrderContext.Provider
        value={{
          ...getMockSupplyOrderData(),
        }}
      >
        <SupplyOrderVacDressingKit
          cannisterProduct={null}
          data={defaultSupplyOrderData}
          setVacProductSize={() => {}}
          setVacSecondaryProductSize={() => {}}
          vacProductInfo={vacProductInfo}
          vacProducts={[]}
          vacProductSize={[]}
          vacSecondaryProductSize={[]}
        />
      </SupplyOrderContext.Provider>
    );
    const dressingSupplies = screen.getByTestId("supplyDressingKitHeaderTest");
    expect(dressingSupplies).toBeInTheDocument();
    expect(dressingSupplies).toHaveTextContent("3M™ V.A.C.® Dressing Kits");
  });

  it("To check Add Dressing button Present", () => {
    const vacProductInfo = {
      imageLink: "test.com",
      brandName: "",
    };
    render(
      <SupplyOrderContext.Provider
        value={{
          ...getMockSupplyOrderData(),
        }}
      >
        <SupplyOrderVacDressingKit
          cannisterProduct={null}
          data={defaultSupplyOrderData}
          setVacProductSize={() => {}}
          setVacSecondaryProductSize={() => {}}
          vacProductInfo={vacProductInfo}
          vacProducts={[]}
          vacProductSize={[]}
          vacSecondaryProductSize={[]}
        />
      </SupplyOrderContext.Provider>
    );
    const dressingSupplies = screen.getByTestId(
      "supply-dressingKit-add-button"
    );
    expect(dressingSupplies).toBeInTheDocument();
  });
});
