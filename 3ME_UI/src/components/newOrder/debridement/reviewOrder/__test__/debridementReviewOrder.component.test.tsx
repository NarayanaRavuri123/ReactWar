import userEvent from "@testing-library/user-event";
import { cleanup, render, screen } from "@testing-library/react";
import { getDeepClone } from "../../../../../util/ObjectFunctions";
import { DebridementReviewOrder } from "../debridementReviewOrder.component";
import { newOrderWoundInfoTestData } from "../../../newOrderWoundInfoStepper/__test__/newOrderWoundInfo.test.data";

describe("Debridement Review Order component ->", () => {
  afterAll(() => {
    cleanup();
  });

  it("Debridement Review Order component validate header title", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    const mockEditButtonClicked = jest.fn();
    render(
      <DebridementReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        woundInfoData={data}
      />
    );
    const title = screen.getByTestId("debridement-review-order-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Debridement");
  });

  it("Debridement Review Order component validate header edit button", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    const mockEditButtonClicked = jest.fn();
    render(
      <DebridementReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        woundInfoData={data}
      />
    );
    const editBtn = screen.getByTestId("debridement-review-order-edit-button");
    expect(editBtn).toBeInTheDocument();
    expect(editBtn).toHaveTextContent("Edit");
    userEvent.click(editBtn);
    expect(mockEditButtonClicked).toBeCalledTimes(1);
  });

  it("Debridement Review Order component validate debridement attempted as yes", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.debridementAttempted.value = "Yes";
    const mockEditButtonClicked = jest.fn();
    render(
      <DebridementReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        woundInfoData={data}
      />
    );
    const title = screen.getByTestId("debridement-attempted");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(
      "Has debridement been attempted in the last 10 days?"
    );
    const value = screen.getByTestId("debridement-attempted-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("Yes");
  });

  it("Debridement Review Order component validate debridement attempted as no", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.debridementAttempted.value = "No";
    const mockEditButtonClicked = jest.fn();
    render(
      <DebridementReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        woundInfoData={data}
      />
    );
    const title = screen.getByTestId("debridement-attempted");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(
      "Has debridement been attempted in the last 10 days?"
    );
    const value = screen.getByTestId("debridement-attempted-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("No");
  });

  it("Debridement Review Order component validate debridement attempted as yes for debridement type", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.debridementAttempted.value = "Yes";
    data.debridementType.value = "Test";
    const mockEditButtonClicked = jest.fn();
    render(
      <DebridementReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        woundInfoData={data}
      />
    );
    const title = screen.getByTestId("debridement-type");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Debridement Type");
    const value = screen.getByTestId("debridement-type-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("Test");
  });

  it("Debridement Review Order component validate debridement attempted as yes for debridement type", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.debridementAttempted.value = "Yes";
    data.debridementDate.value = "08-03-2022";
    const mockEditButtonClicked = jest.fn();
    render(
      <DebridementReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        woundInfoData={data}
      />
    );
    const title = screen.getByTestId("debridement-date");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Debridement Date");
    const value = screen.getByTestId("debridement-date-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("08/03/2022");
  });

  it("Debridement Review Order component validate serial debridement required as yes", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.serialDebridementRequired.value = "Yes";
    const mockEditButtonClicked = jest.fn();
    render(
      <DebridementReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        woundInfoData={data}
      />
    );
    const title = screen.getByTestId("serial-debridement-required");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Are serial debridements required?");
    const value = screen.getByTestId("serial-debridement-required-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("Yes");
  });

  it("Debridement Review Order component validate serial debridement required as no", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.serialDebridementRequired.value = "No";
    const mockEditButtonClicked = jest.fn();
    render(
      <DebridementReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        woundInfoData={data}
      />
    );
    const title = screen.getByTestId("serial-debridement-required");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Are serial debridements required?");
    const value = screen.getByTestId("serial-debridement-required-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("No");
  });
});
