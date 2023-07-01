import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getDeepClone } from "../../../../../util/ObjectFunctions";
import { supplyOrderTestData } from "../../../__test__/supplyOrder.test.data";
import AdditionalInformationReviewOrder from "../additonalInformationReviewOrder";

describe("Resupply Justification review order component", () => {
  afterAll(() => {
    cleanup();
  });

  it("To check Resupply Justification header validation", () => {
    const data = getDeepClone(supplyOrderTestData);
    const editBtnAction = jest.fn();
    render(
      <AdditionalInformationReviewOrder
        data={data}
        openSupplyOrderPageEdit={editBtnAction}
      />
    );
    const title = screen.getByTestId(
      "additional-information-review-order-title"
    );
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Additional Information");
    const editBtn = screen.getByTestId(
      "additional-information-review-order-edit-button"
    );
    expect(editBtn).toBeInTheDocument();
    expect(editBtn).toHaveTextContent("Edit");
    userEvent.click(editBtn);
    expect(editBtnAction).toBeCalledTimes(1);
  });

  it("Delivery Address review order value validation", () => {
    const data = getDeepClone(supplyOrderTestData);
    data.provideAdditionalInfo.value = "Lorem ipsum dolor sit amet";
    render(
      <AdditionalInformationReviewOrder
        data={data}
        openSupplyOrderPageEdit={jest.fn()}
      />
    );
    const title = screen.getByTestId(
      "additional-information-review-order-content-title"
    );
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Additional Notes");
    const value = screen.getByTestId(
      "additional-information-review-order-content-value"
    );
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("Lorem ipsum dolor sit amet");
  });
});
