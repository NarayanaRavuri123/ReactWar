import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getDeepClone } from "../../../../../util/ObjectFunctions";
import { supplyOrderTestData } from "../../../__test__/supplyOrder.test.data";
import CurrentSuppliesOnHandReviewOrder from "../currentSuppliesOnHandReviewOrder.component";

describe("Current Supply review order component", () => {
  afterAll(() => {
    cleanup();
  });

  it("To check Current Supplies on Hand header validation", () => {
    const data = getDeepClone(supplyOrderTestData);
    const editBtnAction = jest.fn();
    render(
      <CurrentSuppliesOnHandReviewOrder
        data={data}
        openSupplyOrderPageEdit={editBtnAction}
      />
    );
    const title = screen.getByTestId("currentSupplies-review-order-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Current Supplies on Hand");
    const editBtn = screen.getByTestId(
      "currentSuppliesInfo-review-order-edit-button"
    );
    expect(editBtn).toBeInTheDocument();
    expect(editBtn).toHaveTextContent("Edit");
    userEvent.click(editBtn);
    expect(editBtnAction).toBeCalledTimes(1);
  });

  it("Current Supplies review order value validation", () => {
    const data = getDeepClone(supplyOrderTestData);
    data.currentSuppliesVacDressingQuantity.value = "2 dressing kits";
    render(
      <CurrentSuppliesOnHandReviewOrder
        data={data}
        openSupplyOrderPageEdit={jest.fn()}
      />
    );
    const title = screen.getByTestId(
      "currentSupplies-info-review-order-content-title"
    );
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Individual V.A.C.® Dressings");
    const value = screen.getByTestId(
      "currentSupplies-info-review-order-content-value"
    );
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("2 dressing kits");
  });

  it("Current Supplies review order value validation", () => {
    const data = getDeepClone(supplyOrderTestData);
    data.currentSuppliesVacCannisterQuantity.value = "1 canister";
    render(
      <CurrentSuppliesOnHandReviewOrder
        data={data}
        openSupplyOrderPageEdit={jest.fn()}
      />
    );
    const title = screen.getByTestId(
      "currentSupplies-info-review-order-content-title-canister"
    );
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Individual V.A.C.® Canisters");
    const value = screen.getByTestId(
      "currentSupplies-info-review-order-content-value-canister"
    );
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("1 canister");
  });

  it("Current Supplies review order value validation", () => {
    const data = getDeepClone(supplyOrderTestData);
    data.dressingChangeFrequency.value = "3 times per week";
    render(
      <CurrentSuppliesOnHandReviewOrder
        data={data}
        openSupplyOrderPageEdit={jest.fn()}
      />
    );
    const title = screen.getByTestId(
      "currentSupplies-info-review-order-content-title-frequency"
    );
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Dressing Change Frequency");
    const value = screen.getByTestId(
      "currentSupplies-info-review-order-content-value-frequency"
    );
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("3 times per week");
  });
});
