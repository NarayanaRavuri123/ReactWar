import { MemoryRouter } from "react-router-dom";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { getDeepClone } from "../../../../util/ObjectFunctions";
import { supplyOrderTestData } from "../../__test__/supplyOrder.test.data";
import { ISupplyOrder } from "../../supplyOrder.interface";
import { DeliveryAddress } from "../deliveryAddress.component";
import { SupplyOrderValidator } from "../../supplyOrder.validator";
import { SupplyOrderContext } from "../../../../context/SupplyOrderContext";
import { getMockSupplyOrderData } from "../../__test__/supplyOrderMockContext.data";
import { SupplyOrderPageSection } from "../../SupplyOrderPageSection.enum";

describe("CurrentSupplies On Hand component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("DeliveryAddress component delivery address header", () => {
    const data = getDeepClone(supplyOrderTestData);

    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: ISupplyOrder) => [dt, mockSetState],
    }));
    render(
      <MemoryRouter initialEntries={["/"]}>
        <DeliveryAddress
          data={data}
          setData={mockSetState}
          isReviewOrder={false}
          openSupplyOrderPageEdit={undefined}
        />
      </MemoryRouter>
    );
    const ele = screen.getByTestId("deliveryAddress");
    expect(ele).toBeInTheDocument();
  });
  it("DeliveryAddress component Same as current address", () => {
    const data = getDeepClone(supplyOrderTestData);

    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: ISupplyOrder) => [dt, mockSetState],
    }));
    render(
      <MemoryRouter initialEntries={["/"]}>
        <DeliveryAddress
          data={data}
          setData={mockSetState}
          isReviewOrder={false}
          openSupplyOrderPageEdit={undefined}
        />
      </MemoryRouter>
    );
    const ele = screen.getByTestId("sameAsCurrentAddress");
    expect(ele).toBeInTheDocument();
  });
  it("DeliveryAddress component current address", () => {
    const data = getDeepClone(supplyOrderTestData);
    data.sameAsCurrentAddress.value = "Yes";
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: ISupplyOrder) => [dt, mockSetState],
    }));
    render(
      <MemoryRouter initialEntries={["/"]}>
        <DeliveryAddress
          data={data}
          setData={mockSetState}
          Validator={new SupplyOrderValidator()}
          isReviewOrder={false}
          openSupplyOrderPageEdit={undefined}
        />
      </MemoryRouter>
    );
    const ele = screen.getByTestId(
      "sameAsCurrentAddressChkbox"
    ) as HTMLInputElement;
    fireEvent.click(ele);
    expect(mockSetState).toHaveBeenCalled();
  });
  it("DeliveryAddress component addres line 1", () => {
    const data = getDeepClone(supplyOrderTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: ISupplyOrder) => [dt, mockSetState],
    }));
    data.sameAsCurrentAddress.value = "no";
    render(
      <MemoryRouter initialEntries={["/"]}>
        <DeliveryAddress
          data={data}
          setData={mockSetState}
          Validator={new SupplyOrderValidator()}
          isReviewOrder={false}
          openSupplyOrderPageEdit={undefined}
        />
      </MemoryRouter>
    );
    const ele = screen.getByTestId("addressLine1") as HTMLInputElement;
    fireEvent.change(ele, {
      target: { value: "Test" },
    });
    expect(mockSetState).toHaveBeenCalled();
  });

  it("DeliveryAddress component addres line 2", () => {
    const data = getDeepClone(supplyOrderTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: ISupplyOrder) => [dt, mockSetState],
    }));
    data.sameAsCurrentAddress.value = "no";
    render(
      <MemoryRouter initialEntries={["/"]}>
        <DeliveryAddress
          data={data}
          setData={mockSetState}
          Validator={new SupplyOrderValidator()}
          isReviewOrder={false}
          openSupplyOrderPageEdit={undefined}
        />
      </MemoryRouter>
    );
    const ele = screen.getByTestId("addressLine2") as HTMLInputElement;
    fireEvent.change(ele, {
      target: { value: "Test" },
    });
    expect(mockSetState).toHaveBeenCalled();
  });
  it("DeliveryAddress component city", () => {
    const data = getDeepClone(supplyOrderTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: ISupplyOrder) => [dt, mockSetState],
    }));
    data.sameAsCurrentAddress.value = "no";
    render(
      <MemoryRouter initialEntries={["/"]}>
        <DeliveryAddress
          data={data}
          setData={mockSetState}
          Validator={new SupplyOrderValidator()}
          isReviewOrder={false}
          openSupplyOrderPageEdit={undefined}
        />
      </MemoryRouter>
    );
    const ele = screen.getByTestId("city") as HTMLInputElement;
    fireEvent.change(ele, {
      target: { value: "Test" },
    });
    expect(mockSetState).toHaveBeenCalled();
  });
  it("DeliveryAddress component state", () => {
    const data = getDeepClone(supplyOrderTestData);

    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: ISupplyOrder) => [dt, mockSetState],
    }));
    data.sameAsCurrentAddress.value = "no";
    render(
      <MemoryRouter initialEntries={["/"]}>
        <DeliveryAddress
          data={data}
          setData={mockSetState}
          Validator={new SupplyOrderValidator()}
          isReviewOrder={false}
          openSupplyOrderPageEdit={undefined}
        />
      </MemoryRouter>
    );
    const ele = screen.getByTestId("state") as HTMLInputElement;
    expect(ele).toBeInTheDocument();
  });
  it("DeliveryAddress component zipcode", () => {
    const data = getDeepClone(supplyOrderTestData);

    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: ISupplyOrder) => [dt, mockSetState],
    }));
    data.sameAsCurrentAddress.value = "no";
    render(
      <MemoryRouter initialEntries={["/"]}>
        <DeliveryAddress
          data={data}
          setData={mockSetState}
          Validator={new SupplyOrderValidator()}
          isReviewOrder={false}
          openSupplyOrderPageEdit={undefined}
        />
      </MemoryRouter>
    );
    const ele = screen.getByTestId("zipCode") as HTMLInputElement;
    expect(ele).toBeInTheDocument();
    fireEvent.change(ele, {
      target: { value: "12345" },
    });
    expect(mockSetState).toHaveBeenCalled();
  });
});
