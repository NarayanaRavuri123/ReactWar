import userEvent from "@testing-library/user-event";
import { cleanup, render, screen } from "@testing-library/react";
import { getDeepClone } from "../../../../../util/ObjectFunctions";
import { WoundUnderminingReviewOrder } from "../woundUnderminingReviewOrder.component";
import { newOrderWoundInfoTestData } from "../../../newOrderWoundInfoStepper/__test__/newOrderWoundInfo.test.data";

describe("Wound Undermining Review Order component ->", () => {
  afterAll(() => {
    cleanup();
  });

  it("Wound Undermining Review Order component validate header title", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    const mockEditButtonClicked = jest.fn();
    render(
      <WoundUnderminingReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        woundInfoData={data}
      />
    );
    const title = screen.getByTestId("wound-undermining-review-order-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Wound Undermining");
  });

  it("Wound Undermining Review Order component validate header edit button", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    const mockEditButtonClicked = jest.fn();
    render(
      <WoundUnderminingReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        woundInfoData={data}
      />
    );
    const editBtn = screen.getByTestId(
      "wound-undermining-review-order-edit-button"
    );
    expect(editBtn).toBeInTheDocument();
    expect(editBtn).toHaveTextContent("Edit");
    userEvent.click(editBtn);
    expect(mockEditButtonClicked).toBeCalledTimes(1);
  });

  it("Wound Undermining Review Order component validate wound undermining is present as yes", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.woundUndermining.value = "Yes";
    const mockEditButtonClicked = jest.fn();
    render(
      <WoundUnderminingReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        woundInfoData={data}
      />
    );
    const title = screen.getByTestId("wound-undermining-present");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Undermining Present");
    const value = screen.getByTestId("wound-undermining-present-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("Yes");
  });

  it("Wound Undermining Review Order component validate wound undermining is present as no", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.woundUndermining.value = "No";
    const mockEditButtonClicked = jest.fn();
    render(
      <WoundUnderminingReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        woundInfoData={data}
      />
    );
    const title = screen.getByTestId("wound-undermining-present");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Undermining Present");
    const value = screen.getByTestId("wound-undermining-present-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("No");
  });

  it("Wound Undermining Review Order component validate wound undermining is present as yes for location 1 undermining", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.woundUndermining.value = "Yes";
    data.underminingLocation1Depth.value = "1.2";
    data.underminingLocation1PositionFrom.value = "12:00";
    data.underminingLocation1PositionTo.value = "3:00";
    const mockEditButtonClicked = jest.fn();
    render(
      <WoundUnderminingReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        woundInfoData={data}
      />
    );
    const title = screen.getByTestId("location-1-undermining");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Location 1 Undermining");
    const value = screen.getByTestId("location-1-undermining-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("1.2 cm from 12 o’clock to 3 o’clock");
  });

  it("Wound Undermining Review Order component validate wound undermining is present as yes for location 2 undermining", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.woundUndermining.value = "Yes";
    data.underminingLocation2Depth.value = "1.2";
    data.underminingLocation2PositionFrom.value = "12:00";
    data.underminingLocation2PositionTo.value = "3:00";
    const mockEditButtonClicked = jest.fn();
    render(
      <WoundUnderminingReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        woundInfoData={data}
      />
    );
    const title = screen.getByTestId("location-2-undermining");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Location 2 Undermining");
    const value = screen.getByTestId("location-2-undermining-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("1.2 cm from 12 o’clock to 3 o’clock");
  });
});
