import userEvent from "@testing-library/user-event";
import { cleanup, render, screen } from "@testing-library/react";
import { getDeepClone } from "../../../../../util/ObjectFunctions";
import { ExudateReviewOrder } from "../exudateReviewOrder.component";
import { newOrderWoundInfoTestData } from "../../../newOrderWoundInfoStepper/__test__/newOrderWoundInfo.test.data";

describe("Wound Exudate Review Order component ->", () => {
  afterAll(() => {
    cleanup();
  });

  it("Wound Exudate Review Order component validate header title", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    const mockEditButtonClicked = jest.fn();
    render(
      <ExudateReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        woundInfoData={data}
      />
    );
    const title = screen.getByTestId("exudate-review-order-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Wound Exudate");
  });

  it("Wound Exudate Review Order component validate header edit button", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    const mockEditButtonClicked = jest.fn();
    render(
      <ExudateReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        woundInfoData={data}
      />
    );
    const editBtn = screen.getByTestId("exudate-review-order-edit-button");
    expect(editBtn).toBeInTheDocument();
    expect(editBtn).toHaveTextContent("Edit");
    userEvent.click(editBtn);
    expect(mockEditButtonClicked).toBeCalledTimes(1);
  });

  it("Wound Exudate Review Order component validate exposed structures", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.exudateAmount.value = "Test";
    const mockEditButtonClicked = jest.fn();
    render(
      <ExudateReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        woundInfoData={data}
      />
    );
    const title = screen.getByTestId("exudate-amounts");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Exudate Amount");
    const value = screen.getByTestId("exudate-amounts-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("Test");
  });

  it("Wound Exudate Review Order component validate exposed structures", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.exudateAppearance.value = "Test";
    const mockEditButtonClicked = jest.fn();
    render(
      <ExudateReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        woundInfoData={data}
      />
    );
    const title = screen.getByTestId("exudate-appearance");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Exudate Appearance");
    const value = screen.getByTestId("exudate-appearance-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("Test");
  });
});
