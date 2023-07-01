import { cleanup, render, screen } from "@testing-library/react";
import { defaultSupplyOrderData } from "../../../supplyOrder.model";
import { defaultCanister } from "../../../../newOrder/newOrder.model";
import { SupplyOrderVacCannister } from "../supplyOrderVacCannister.component";
import { SupplyOrderContext } from "../../../../../context/SupplyOrderContext";
import { getMockSupplyOrderData } from "../../../__test__/supplyOrderMockContext.data";

describe("Supply Order VAC Cannister Kit", () => {
  afterAll(() => {
    cleanup();
  });

  it("To check Cannister header Present", () => {
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
        <SupplyOrderVacCannister
          canister={defaultCanister}
          cannisterProduct={[]}
          data={defaultSupplyOrderData}
          replenishSupplyOrderData={[]}
          setCanister={() => {}}
          vacProductInfo={vacProductInfo}
        />
      </SupplyOrderContext.Provider>
    );
    const dressingSupplies = screen.getByTestId("cannisterKitHeaderTest");
    expect(dressingSupplies).toBeInTheDocument();
    expect(dressingSupplies).toHaveTextContent("3M™ V.A.C.® Canisters");
  });

  it("To check Add VAC Cannister Add button Present", () => {
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
        <SupplyOrderVacCannister
          canister={defaultCanister}
          cannisterProduct={[]}
          data={defaultSupplyOrderData}
          replenishSupplyOrderData={[]}
          setCanister={() => {}}
          vacProductInfo={vacProductInfo}
        />
      </SupplyOrderContext.Provider>
    );
    const dressingSupplies = screen.getByTestId("cannisterKitHeaderTest");
    expect(dressingSupplies).toBeInTheDocument();
    expect(dressingSupplies).toHaveTextContent("3M™ V.A.C.® Canisters");
  });
});
