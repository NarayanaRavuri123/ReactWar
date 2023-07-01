import userEvent from "@testing-library/user-event";
import { mockComorbiditiesData } from "../../comorbodities.data";
import { cleanup, render, screen } from "@testing-library/react";
import { getDeepClone } from "../../../../../util/ObjectFunctions";
import { ComorboditiesReviewOrder } from "../comorboditiesReviewOrder.component";
import { newOrderWoundInfoTestData } from "../../../newOrderWoundInfoStepper/__test__/newOrderWoundInfo.test.data";

describe("Comorbidities Review Order component ->", () => {
  afterAll(() => {
    cleanup();
  });

  it("Comorbidities Review Order component validate header title", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    const mockEditButtonClicked = jest.fn();
    render(
      <ComorboditiesReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        woundInfoData={data}
      />
    );
    const title = screen.getByTestId("comorbodities-review-order-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Comorbidities");
  });

  it("Comorbidities Review Order component validate header edit button", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    const mockEditButtonClicked = jest.fn();
    render(
      <ComorboditiesReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        woundInfoData={data}
      />
    );
    const editBtn = screen.getByTestId(
      "comorbodities-review-order-edit-button"
    );
    expect(editBtn).toBeInTheDocument();
    expect(editBtn).toHaveTextContent("Edit");
    userEvent.click(editBtn);
    expect(mockEditButtonClicked).toBeCalledTimes(1);
  });

  it("Comorbidities Review Order component validate applicable comorbidities", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.wndInfoComorbidities.value = mockComorbiditiesData;
    const mockEditButtonClicked = jest.fn();
    render(
      <ComorboditiesReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        woundInfoData={data}
      />
    );
    const title = screen.getByTestId("applicable-comorbidities");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Applicable comorbidities");
    const value = screen.getByTestId("applicable-comorbidities-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent(
      "Immobility, End-Stage Renal Disease (ESRD), Peripheral arterial disease (PAD), Smoking, Other"
    );
  });

  it("Comorbidities Review Order component validate wound tunneling is present as no", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.wndInfoComorbidities.value = mockComorbiditiesData;
    data.wndInfoComorbiditiesOther.value = "Test comorbidities";
    const mockEditButtonClicked = jest.fn();
    render(
      <ComorboditiesReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        woundInfoData={data}
      />
    );
    const title = screen.getByTestId("applicable-comorbidities-other");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("If other");
    const value = screen.getByTestId("applicable-comorbidities-other-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("Test comorbidities");
  });
});
