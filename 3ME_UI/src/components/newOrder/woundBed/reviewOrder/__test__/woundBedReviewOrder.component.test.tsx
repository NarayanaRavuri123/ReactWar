import userEvent from "@testing-library/user-event";
import { cleanup, render, screen } from "@testing-library/react";
import { getDeepClone } from "../../../../../util/ObjectFunctions";
import { WoundBedReviewOrder } from "../woundBedReviewOrder.component";
import { newOrderWoundInfoTestData } from "../../../newOrderWoundInfoStepper/__test__/newOrderWoundInfo.test.data";

describe("Wound Bed Description Review Order component ->", () => {
  afterAll(() => {
    cleanup();
  });

  it("Wound Bed Description Review Order component validate header title", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    const mockEditButtonClicked = jest.fn();
    render(
      <WoundBedReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        woundInfoData={data}
      />
    );
    const title = screen.getByTestId("wound-bed-review-order-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Wound Bed Description");
  });

  it("Wound Bed Description Review Order component validate header edit button", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    const mockEditButtonClicked = jest.fn();
    render(
      <WoundBedReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        woundInfoData={data}
      />
    );
    const editBtn = screen.getByTestId("wound-bed-review-order-edit-button");
    expect(editBtn).toBeInTheDocument();
    expect(editBtn).toHaveTextContent("Edit");
    userEvent.click(editBtn);
    expect(mockEditButtonClicked).toBeCalledTimes(1);
  });

  it("Wound Bed Description Review Order component validate granulation value 0%", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.granulationValue.value = "GRA0";
    const mockEditButtonClicked = jest.fn();
    render(
      <WoundBedReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        woundInfoData={data}
      />
    );
    const title = screen.getByTestId("granulation");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Beefy, bright red granulation tissue");
    const value = screen.getByTestId("granulation-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("0%");
  });

  it("Wound Bed Description Review Order component validate granulation value 25%", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.granulationValue.value = "GRA25";
    const mockEditButtonClicked = jest.fn();
    render(
      <WoundBedReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        woundInfoData={data}
      />
    );
    const title = screen.getByTestId("granulation");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Beefy, bright red granulation tissue");
    const value = screen.getByTestId("granulation-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("25%");
  });

  it("Wound Bed Description Review Order component validate granulation value 50%", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.granulationValue.value = "GRA50";
    const mockEditButtonClicked = jest.fn();
    render(
      <WoundBedReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        woundInfoData={data}
      />
    );
    const title = screen.getByTestId("granulation");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Beefy, bright red granulation tissue");
    const value = screen.getByTestId("granulation-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("50%");
  });

  it("Wound Bed Description Review Order component validate granulation value 75%", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.granulationValue.value = "GRA75";
    const mockEditButtonClicked = jest.fn();
    render(
      <WoundBedReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        woundInfoData={data}
      />
    );
    const title = screen.getByTestId("granulation");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Beefy, bright red granulation tissue");
    const value = screen.getByTestId("granulation-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("75%");
  });

  it("Wound Bed Description Review Order component validate granulation value 100%", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.granulationValue.value = "GRA100";
    const mockEditButtonClicked = jest.fn();
    render(
      <WoundBedReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        woundInfoData={data}
      />
    );
    const title = screen.getByTestId("granulation");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Beefy, bright red granulation tissue");
    const value = screen.getByTestId("granulation-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("100%");
  });

  it("Wound Bed Description Review Order component validate epthilization value 0%", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.epthilizationValue.value = "GRA0";
    const mockEditButtonClicked = jest.fn();
    render(
      <WoundBedReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        woundInfoData={data}
      />
    );
    const title = screen.getByTestId("epthilization");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(
      "Dull, pink/red, no or minimal granulation tissue"
    );
    const value = screen.getByTestId("epthilization-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("0%");
  });

  it("Wound Bed Description Review Order component validate epthilization value 25%", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.epthilizationValue.value = "GRA25";
    const mockEditButtonClicked = jest.fn();
    render(
      <WoundBedReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        woundInfoData={data}
      />
    );
    const title = screen.getByTestId("epthilization");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(
      "Dull, pink/red, no or minimal granulation tissue"
    );
    const value = screen.getByTestId("epthilization-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("25%");
  });

  it("Wound Bed Description Review Order component validate epthilization value 50%", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.epthilizationValue.value = "GRA50";
    const mockEditButtonClicked = jest.fn();
    render(
      <WoundBedReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        woundInfoData={data}
      />
    );
    const title = screen.getByTestId("epthilization");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(
      "Dull, pink/red, no or minimal granulation tissue"
    );
    const value = screen.getByTestId("epthilization-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("50%");
  });

  it("Wound Bed Description Review Order component validate epthilization value 75%", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.epthilizationValue.value = "GRA75";
    const mockEditButtonClicked = jest.fn();
    render(
      <WoundBedReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        woundInfoData={data}
      />
    );
    const title = screen.getByTestId("epthilization");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(
      "Dull, pink/red, no or minimal granulation tissue"
    );
    const value = screen.getByTestId("epthilization-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("75%");
  });

  it("Wound Bed Description Review Order component validate epthilization value 100%", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.epthilizationValue.value = "GRA100";
    const mockEditButtonClicked = jest.fn();
    render(
      <WoundBedReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        woundInfoData={data}
      />
    );
    const title = screen.getByTestId("epthilization");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(
      "Dull, pink/red, no or minimal granulation tissue"
    );
    const value = screen.getByTestId("epthilization-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("100%");
  });

  it("Wound Bed Description Review Order component validate slough value 0%", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.sloughValue.value = "GRA0";
    const mockEditButtonClicked = jest.fn();
    render(
      <WoundBedReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        woundInfoData={data}
      />
    );
    const title = screen.getByTestId("slough");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(
      "White, grey, yellow, or brown non-viable tissue"
    );
    const value = screen.getByTestId("slough-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("0%");
  });

  it("Wound Bed Description Review Order component validate slough value 25%", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.sloughValue.value = "GRA25";
    const mockEditButtonClicked = jest.fn();
    render(
      <WoundBedReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        woundInfoData={data}
      />
    );
    const title = screen.getByTestId("slough");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(
      "White, grey, yellow, or brown non-viable tissue"
    );
    const value = screen.getByTestId("slough-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("25%");
  });

  it("Wound Bed Description Review Order component validate slough value 50%", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.sloughValue.value = "GRA50";
    const mockEditButtonClicked = jest.fn();
    render(
      <WoundBedReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        woundInfoData={data}
      />
    );
    const title = screen.getByTestId("slough");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(
      "White, grey, yellow, or brown non-viable tissue"
    );
    const value = screen.getByTestId("slough-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("50%");
  });

  it("Wound Bed Description Review Order component validate slough value 75%", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.sloughValue.value = "GRA75";
    const mockEditButtonClicked = jest.fn();
    render(
      <WoundBedReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        woundInfoData={data}
      />
    );
    const title = screen.getByTestId("slough");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(
      "White, grey, yellow, or brown non-viable tissue"
    );
    const value = screen.getByTestId("slough-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("75%");
  });

  it("Wound Bed Description Review Order component validate slough value 100%", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.sloughValue.value = "GRA100";
    const mockEditButtonClicked = jest.fn();
    render(
      <WoundBedReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        woundInfoData={data}
      />
    );
    const title = screen.getByTestId("slough");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(
      "White, grey, yellow, or brown non-viable tissue"
    );
    const value = screen.getByTestId("slough-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("100%");
  });

  it("Wound Bed Description Review Order component validate eschar value 0%", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.escharValue.value = "GRA0";
    const mockEditButtonClicked = jest.fn();
    render(
      <WoundBedReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        woundInfoData={data}
      />
    );
    const title = screen.getByTestId("eschar");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Black eschar");
    const value = screen.getByTestId("eschar-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("0%");
  });

  it("Wound Bed Description Review Order component validate eschar value 25%", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.escharValue.value = "GRA25";
    const mockEditButtonClicked = jest.fn();
    render(
      <WoundBedReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        woundInfoData={data}
      />
    );
    const title = screen.getByTestId("eschar");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Black eschar");
    const value = screen.getByTestId("eschar-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("25%");
  });

  it("Wound Bed Description Review Order component validate eschar value 50%", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.escharValue.value = "GRA50";
    const mockEditButtonClicked = jest.fn();
    render(
      <WoundBedReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        woundInfoData={data}
      />
    );
    const title = screen.getByTestId("eschar");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Black eschar");
    const value = screen.getByTestId("eschar-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("50%");
  });

  it("Wound Bed Description Review Order component validate eschar value 75%", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.escharValue.value = "GRA75";
    const mockEditButtonClicked = jest.fn();
    render(
      <WoundBedReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        woundInfoData={data}
      />
    );
    const title = screen.getByTestId("eschar");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Black eschar");
    const value = screen.getByTestId("eschar-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("75%");
  });

  it("Wound Bed Description Review Order component validate eschar value 100%", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.escharValue.value = "GRA100";
    const mockEditButtonClicked = jest.fn();
    render(
      <WoundBedReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        woundInfoData={data}
      />
    );
    const title = screen.getByTestId("eschar");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Black eschar");
    const value = screen.getByTestId("eschar-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("100%");
  });

  it("Wound Bed Description Review Order component validate wound bed total value 100%", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.woundBedTotal.value = "100";
    const mockEditButtonClicked = jest.fn();
    render(
      <WoundBedReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        woundInfoData={data}
      />
    );
    const title = screen.getByTestId("wound-bed-total");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Total percentage of wound described");
    const value = screen.getByTestId("wound-bed-total-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("100%");
  });
});
