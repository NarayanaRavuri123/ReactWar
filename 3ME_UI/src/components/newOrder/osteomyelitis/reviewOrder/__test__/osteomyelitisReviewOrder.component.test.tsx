import userEvent from "@testing-library/user-event";
import { cleanup, render, screen } from "@testing-library/react";
import { getDeepClone } from "../../../../../util/ObjectFunctions";
import { OsteomyelitisReviewOrder } from "../osteomyelitisReviewOrder.component";
import { mockOsteomyelitisies } from "../../../previousTherapies/previousTherapiesData";
import { newOrderWoundInfoTestData } from "../../../newOrderWoundInfoStepper/__test__/newOrderWoundInfo.test.data";

describe("Osteomyelitis Review Order component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("Osteomyelitis Review Order component validate header title", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    const mockEditButtonClicked = jest.fn();
    render(
      <OsteomyelitisReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        woundInfoData={data}
      />
    );
    const title = screen.getByTestId("osteomyelitis-review-order-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Osteomyelitis");
  });

  it("Osteomyelitis Review Order component validate header edit button", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    const mockEditButtonClicked = jest.fn();
    render(
      <OsteomyelitisReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        woundInfoData={data}
      />
    );
    const editBtn = screen.getByTestId(
      "osteomyelitis-review-order-edit-button"
    );
    expect(editBtn).toBeInTheDocument();
    expect(editBtn).toHaveTextContent("Edit");
    userEvent.click(editBtn);
    expect(mockEditButtonClicked).toBeCalledTimes(1);
  });

  it("Osteomyelitis Review Order component validate osteomyelitis is present as yes", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.isOsteomyelitisPresent.value = "Yes";
    const mockEditButtonClicked = jest.fn();
    render(
      <OsteomyelitisReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        woundInfoData={data}
      />
    );
    const title = screen.getByTestId("osteomyelitis-is-present");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Is osteomyelitis present in the wound?");
    const value = screen.getByTestId("osteomyelitis-is-present-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("Yes");
  });

  it("Osteomyelitis Review Order component validate osteomyelitis is present as no", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.isOsteomyelitisPresent.value = "No";
    const mockEditButtonClicked = jest.fn();
    render(
      <OsteomyelitisReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        woundInfoData={data}
      />
    );
    const title = screen.getByTestId("osteomyelitis-is-present");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Is osteomyelitis present in the wound?");
    const value = screen.getByTestId("osteomyelitis-is-present-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("No");
  });

  it("Osteomyelitis Review Order component validate osteomyelitis is present as yes and have some indicate treatment regimen selected", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.isOsteomyelitisPresent.value = "Yes";
    data.osteomyelitisies.value = mockOsteomyelitisies;
    const mockEditButtonClicked = jest.fn();
    render(
      <OsteomyelitisReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        woundInfoData={data}
      />
    );
    const title = screen.getByTestId("indicate-treatment-regimen");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Indicate Treatment Regimen");
    const value = screen.getByTestId("indicate-treatment-regimen-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("Antibiotic - Rahul, Hyperbaric Oxygen");
  });

  it("Osteomyelitis Review Order component validate osteomyelitis is present as yes and validate for is treatement for resolve bone infection as yes", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.isOsteomyelitisPresent.value = "Yes";
    data.isTreatemenForResolveBoneInfection.value = "Yes";
    const mockEditButtonClicked = jest.fn();
    render(
      <OsteomyelitisReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        woundInfoData={data}
      />
    );
    const title = screen.getByTestId(
      "is-treatement-for-resolve-bone-infection"
    );
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(
      "Is the above treatment administered to the patient with the intention to completely resolve the underlying bone infection?"
    );
    const value = screen.getByTestId(
      "is-treatement-for-resolve-bone-infection-value"
    );
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("Yes");
  });

  it("Osteomyelitis Review Order component validate osteomyelitis is present as yes and validate for is treatement for resolve bone infection as no", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.isOsteomyelitisPresent.value = "Yes";
    data.isTreatemenForResolveBoneInfection.value = "No";
    const mockEditButtonClicked = jest.fn();
    render(
      <OsteomyelitisReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        woundInfoData={data}
      />
    );
    const title = screen.getByTestId(
      "is-treatement-for-resolve-bone-infection"
    );
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(
      "Is the above treatment administered to the patient with the intention to completely resolve the underlying bone infection?"
    );
    const value = screen.getByTestId(
      "is-treatement-for-resolve-bone-infection-value"
    );
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("No");
  });
});
