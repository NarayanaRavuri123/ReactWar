import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getDeepClone } from "../../../../../util/ObjectFunctions";
import { supplyOrderTestData } from "../../../__test__/supplyOrder.test.data";
import DeliveryAddressReviewOrder from "../deliveryAddressReviewOrder.component";

describe("Delivery Address review order component", () => {
  afterAll(() => {
    cleanup();
  });

  it("To check Delivery Address header validation", () => {
    const data = getDeepClone(supplyOrderTestData);
    const editBtnAction = jest.fn();
    render(
      <DeliveryAddressReviewOrder
        data={data}
        openSupplyOrderPageEdit={editBtnAction}
      />
    );
    const title = screen.getByTestId("deliveryAddress-review-order-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Delivery Address");
    const editBtn = screen.getByTestId(
      "deliveryAddress-review-order-edit-button"
    );
    expect(editBtn).toBeInTheDocument();
    expect(editBtn).toHaveTextContent("Edit");
    userEvent.click(editBtn);
    expect(editBtnAction).toBeCalledTimes(1);
  });

  it("Delivery Address review order value validation", () => {
    const data = getDeepClone(supplyOrderTestData);
    data.sameAsCurrentAddress.value;
    data.addressLine1.value = "Jamshedpurq";
    data.city.value = "Banner";
    data.state.value = "TX";
    data.zipCode.value = "55123";

    render(
      <DeliveryAddressReviewOrder
        data={data}
        openSupplyOrderPageEdit={jest.fn()}
      />
    );
    const title = screen.getByTestId(
      "deliveryAddress-review-order-content-title-address"
    );
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Address");
    const value = screen.getByTestId(
      "deliveryAddress-review-order-content-value-address-value"
    );
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("Jamshedpur");
    const value2 = screen.getByTestId(
      "deliveryAddress-review-order-content-value-city"
    );
    expect(value2).toBeInTheDocument();
    expect(value2).toHaveTextContent("Banner, TX 55123");
  });
});
