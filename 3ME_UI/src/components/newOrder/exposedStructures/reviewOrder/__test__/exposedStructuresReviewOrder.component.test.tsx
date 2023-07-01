import userEvent from "@testing-library/user-event";
import { cleanup, render, screen } from "@testing-library/react";
import { getDeepClone } from "../../../../../util/ObjectFunctions";
import { mockExposedStructuresData } from "../../exposedStructures.data";
import { ExposedStructuresReviewOrder } from "../exposedStructuresReviewOrder.component";
import { newOrderWoundInfoTestData } from "../../../newOrderWoundInfoStepper/__test__/newOrderWoundInfo.test.data";

describe("Exposed Structures Review Order component ->", () => {
  afterAll(() => {
    cleanup();
  });

  it("Exposed Structures Review Order component validate header title", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    const mockEditButtonClicked = jest.fn();
    render(
      <ExposedStructuresReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        woundInfoData={data}
      />
    );
    const title = screen.getByTestId("exposed-structures-review-order-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Exposed Structures");
  });

  it("Exposed Structures Review Order component validate header edit button", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    const mockEditButtonClicked = jest.fn();
    render(
      <ExposedStructuresReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        woundInfoData={data}
      />
    );
    const editBtn = screen.getByTestId(
      "exposed-structures-review-order-edit-button"
    );
    expect(editBtn).toBeInTheDocument();
    expect(editBtn).toHaveTextContent("Edit");
    userEvent.click(editBtn);
    expect(mockEditButtonClicked).toBeCalledTimes(1);
  });

  it("Exposed Structures Review Order component validate exposed structures", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.exposedStructures.value = mockExposedStructuresData;
    const mockEditButtonClicked = jest.fn();
    render(
      <ExposedStructuresReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        woundInfoData={data}
      />
    );
    const title = screen.getByTestId("exposed-structures");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Exposed Structures");
    const value = screen.getByTestId("exposed-structures-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("Subcutaneous Tissue, Tendon");
  });
});
