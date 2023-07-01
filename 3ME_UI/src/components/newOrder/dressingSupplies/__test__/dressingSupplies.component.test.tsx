import { cleanup, render, screen } from "@testing-library/react";
import { DressingSupplies } from "../dressingSupplies.component";
import {
  ICanister,
  IDressingKit,
  IProductAccessory,
} from "../../newOrder.interface";
import { getDeepClone } from "../../../../util/ObjectFunctions";
import {
  accessoryTestData,
  canisterTestData,
  dressingTestData,
  productTestData,
} from "../../__test__/newOrder.test.data";

jest.mock("../dressingSuppliesLink/dressingSuppliesLink");
describe("Dressing Supplies", () => {
  afterAll(() => {
    cleanup();
  });
  it("To check header Present", () => {
    const dressing = getDeepClone(dressingTestData);
    const canister = getDeepClone(canisterTestData);
    const accessory = getDeepClone(accessoryTestData);
    const productData = getDeepClone(productTestData);
    const mockDressingSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IDressingKit) => [dt, mockDressingSetState],
    }));
    const mockCanisterSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: ICanister) => [dt, mockCanisterSetState],
    }));
    const mockAccessorySetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IProductAccessory) => [dt, mockAccessorySetState],
    }));
    render(
      <DressingSupplies
        dressingKit={dressing}
        canister={canister}
        accessory={accessory}
        productInfo={productData}
        orderId="123"
        setDressingKit={mockDressingSetState}
        setCanister={mockCanisterSetState}
        setAccessory={mockAccessorySetState}
      />
    );
    const dressingSupplies = screen.getByTestId("dressingHeaderTest");
    expect(dressingSupplies).toBeInTheDocument();
    expect(dressingSupplies).toHaveTextContent("Dressings/Supplies");
  });
});
