import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getDeepClone } from "../../../../../util/ObjectFunctions";
import { supplyOrderTestData } from "../../../__test__/supplyOrder.test.data";
import ReSupplyJustificationReviewOrder from "../reSupplyJustificationReviewOrder.component";

describe("Resupply Justification review order component", () => {
  afterAll(() => {
    cleanup();
  });

  it("To check Resupply Justification header validation", () => {
    const data = getDeepClone(supplyOrderTestData);
    const editBtnAction = jest.fn();
    render(
      <ReSupplyJustificationReviewOrder
        data={data}
        openSupplyOrderPageEdit={editBtnAction}
      />
    );
    const title = screen.getByTestId(
      "resupply-Justification-review-order-title"
    );
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Resupply Justification");
    const editBtn = screen.getByTestId(
      "resupply-Justification-review-order-edit-button"
    );
    expect(editBtn).toBeInTheDocument();
    expect(editBtn).toHaveTextContent("Edit");
    userEvent.click(editBtn);
    expect(editBtnAction).toBeCalledTimes(1);
  });

  it("Resupply Justification review order value validation", () => {
    const data = getDeepClone(supplyOrderTestData);
    data.resupplyJustification.value = "Out of Supplies";

    render(
      <ReSupplyJustificationReviewOrder
        data={data}
        openSupplyOrderPageEdit={jest.fn()}
      />
    );
    const title = screen.getByTestId(
      "resupply-Justification-review-order-content-title"
    );
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Resupply Justification");
    const value = screen.getByTestId(
      "resupply-Justification-review-order-content-value"
    );
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("Out of Supplies");
  });
});
