import userEvent from "@testing-library/user-event";
import { cleanup, render, screen } from "@testing-library/react";
import { getDeepClone } from "../../../../../util/ObjectFunctions";
import { WoundDimensionReviewOrder } from "../woundDimensionReviewOrder.component";
import { newOrderWoundInfoTestData } from "../../../newOrderWoundInfoStepper/__test__/newOrderWoundInfo.test.data";

describe("Wound Dimension Review Order component ->", () => {
  afterAll(() => {
    cleanup();
  });

  it("Wound Dimension Review Order component validate header title", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    const mockEditButtonClicked = jest.fn();
    render(
      <WoundDimensionReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        woundInfoData={data}
      />
    );
    const title = screen.getByTestId("wound-dimensions-review-order-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Wound Dimension");
  });

  it("Wound Dimension Review Order component validate header edit button", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    const mockEditButtonClicked = jest.fn();
    render(
      <WoundDimensionReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        woundInfoData={data}
      />
    );
    const editBtn = screen.getByTestId(
      "wound-dimensions-review-order-edit-button"
    );
    expect(editBtn).toBeInTheDocument();
    expect(editBtn).toHaveTextContent("Edit");
    userEvent.click(editBtn);
    expect(mockEditButtonClicked).toBeCalledTimes(1);
  });

  it("Wound Dimension Review Order component validate wound measurement date", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.woundMeasurementDate.value = "01-03-2022";
    const mockEditButtonClicked = jest.fn();
    render(
      <WoundDimensionReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        woundInfoData={data}
      />
    );
    const title = screen.getByTestId("wound-measurement-date");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Wound Measurement Date");
    const value = screen.getByTestId("wound-measurement-date-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("01/03/2022");
  });

  it("Wound Dimension Review Order component validate wound length", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.woundLength.value = "0.75";
    const mockEditButtonClicked = jest.fn();
    render(
      <WoundDimensionReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        woundInfoData={data}
      />
    );
    const title = screen.getByTestId("wound-length");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Length");
    const value = screen.getByTestId("wound-length-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("0.75 cm");
  });

  it("Wound Dimension Review Order component validate wound width", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.woundWidth.value = "0.75";
    const mockEditButtonClicked = jest.fn();
    render(
      <WoundDimensionReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        woundInfoData={data}
      />
    );
    const title = screen.getByTestId("wound-width");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Width");
    const value = screen.getByTestId("wound-width-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("0.75 cm");
  });

  it("Wound Dimension Review Order component validate wound depth", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.woundDepth.value = "0.75";
    const mockEditButtonClicked = jest.fn();
    render(
      <WoundDimensionReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        woundInfoData={data}
      />
    );
    const title = screen.getByTestId("wound-depth");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Depth");
    const value = screen.getByTestId("wound-depth-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("0.75 cm");
  });

  it("Wound Dimension Review Order component validate wound volume", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.woundLength.value = "0.75";
    data.woundWidth.value = "0.75";
    data.woundDepth.value = "0.75";
    const mockEditButtonClicked = jest.fn();
    render(
      <WoundDimensionReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        woundInfoData={data}
      />
    );
    const title = screen.getByTestId("wound-volume");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Volume");
    const value = screen.getByTestId("wound-volume-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("0.4 cm³");
  });

  it("Wound Dimension Review Order component validate is wound thickness as yes", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.woundThickness.value = "yes";
    const mockEditButtonClicked = jest.fn();
    render(
      <WoundDimensionReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        woundInfoData={data}
      />
    );
    const title = screen.getByTestId("wound-thickness");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Is the wound full thickness?");
    const value = screen.getByTestId("wound-thickness-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("Yes");
  });

  it("Wound Dimension Review Order component validate is wound thickness as no", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.woundThickness.value = "no";
    const mockEditButtonClicked = jest.fn();
    render(
      <WoundDimensionReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        woundInfoData={data}
      />
    );
    const title = screen.getByTestId("wound-thickness");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Is the wound full thickness?");
    const value = screen.getByTestId("wound-thickness-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("No");
  });
});
