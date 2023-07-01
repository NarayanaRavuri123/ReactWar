import userEvent from "@testing-library/user-event";
import { mockNutriActionData } from "../../nutritionAction.data";
import { cleanup, render, screen } from "@testing-library/react";
import { getDeepClone } from "../../../../../util/ObjectFunctions";
import { NutritionReviewOrder } from "../nutritionReviewOrder.component";
import { newOrderWoundInfoTestData } from "../../../newOrderWoundInfoStepper/__test__/newOrderWoundInfo.test.data";

describe("Nutrition Review Order component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("Nutrition Review Order component validate header title", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    const mockEditButtonClicked = jest.fn();
    render(
      <NutritionReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        woundInfoData={data}
      />
    );
    const title = screen.getByTestId("nutrition-review-order-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Nutrition");
  });

  it("Nutrition Review Order component validate header edit button", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    const mockEditButtonClicked = jest.fn();
    render(
      <NutritionReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        woundInfoData={data}
      />
    );
    const editBtn = screen.getByTestId("nutrition-review-order-edit-button");
    expect(editBtn).toBeInTheDocument();
    expect(editBtn).toHaveTextContent("Edit");
    userEvent.click(editBtn);
    expect(mockEditButtonClicked).toBeCalledTimes(1);
  });

  it("Nutrition Review Order component validate nutritional status as yes", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.nutriStatusCompromized.value = "yes";
    const mockEditButtonClicked = jest.fn();
    render(
      <NutritionReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        woundInfoData={data}
      />
    );
    const title = screen.getByTestId("nutritional-status");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(
      "Is the patient’s nutritional status compromised?"
    );
    const value = screen.getByTestId("nutritional-status-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("Yes");
  });

  it("Nutrition Review Order component validate nutritional status as no", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.nutriStatusCompromized.value = "no";
    const mockEditButtonClicked = jest.fn();
    render(
      <NutritionReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        woundInfoData={data}
      />
    );
    const title = screen.getByTestId("nutritional-status");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(
      "Is the patient’s nutritional status compromised?"
    );
    const value = screen.getByTestId("nutritional-status-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("No");
  });

  it("Nutrition Review Order component validate nutritional status as yes and have some nutrition actions selected", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.nutriStatusCompromized.value = "yes";
    data.nutritionActions.value = mockNutriActionData;
    const mockEditButtonClicked = jest.fn();
    render(
      <NutritionReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        woundInfoData={data}
      />
    );
    const title = screen.getByTestId("nutrition-actions");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(
      "Action taken to address nutritional status"
    );
    const value = screen.getByTestId("nutrition-actions-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("Vitamin Therapy, Special Diet");
  });
});
