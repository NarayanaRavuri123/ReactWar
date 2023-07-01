import userEvent from "@testing-library/user-event";
import { cleanup, render, screen } from "@testing-library/react";
import { getDeepClone } from "../../../../../util/ObjectFunctions";
import { ClinicalInformationReviewOrder } from "../clinicalInformationReviewOrder.component";
import { newOrderWoundInfoTestData } from "../../../newOrderWoundInfoStepper/__test__/newOrderWoundInfo.test.data";

describe("Clinical Information Review Order component ->", () => {
  afterAll(() => {
    cleanup();
  });

  it("Clinical Information Review Order component validate header title", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    const mockEditButtonClicked = jest.fn();
    render(
      <ClinicalInformationReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        isSecondaryWoundInfo={false}
        woundInfoData={data}
        woundLocations={[]}
        woundDirections={[]}
        woundOrientations={[]}
      />
    );
    const title = screen.getByTestId("clinical-information-review-order-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Clinical Information");
  });

  it("Clinical Information Review Order component validate header title for secondary wound", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    const mockEditButtonClicked = jest.fn();
    render(
      <ClinicalInformationReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        isSecondaryWoundInfo={true}
        woundInfoData={data}
        woundLocations={[]}
        woundDirections={[]}
        woundOrientations={[]}
      />
    );
    const title = screen.getByTestId("clinical-information-review-order-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Secondary Wound");
  });

  it("Clinical Information Review Order component validate header edit button", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    const mockEditButtonClicked = jest.fn();
    render(
      <ClinicalInformationReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        isSecondaryWoundInfo={false}
        woundInfoData={data}
        woundLocations={[]}
        woundDirections={[]}
        woundOrientations={[]}
      />
    );
    const editBtn = screen.getByTestId(
      "clinical-information-review-order-edit-button"
    );
    expect(editBtn).toBeInTheDocument();
    expect(editBtn).toHaveTextContent("Edit");
    userEvent.click(editBtn);
    expect(mockEditButtonClicked).toBeCalledTimes(1);
  });

  it("Clinical Information Review Order component validate for consequences if V.A.C.® Therapy is not used", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.shortNarrativeOfPossibleConsequences.value = "Test";
    const mockEditButtonClicked = jest.fn();
    render(
      <ClinicalInformationReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        isSecondaryWoundInfo={false}
        woundInfoData={data}
        woundLocations={[]}
        woundDirections={[]}
        woundOrientations={[]}
      />
    );
    const title = screen.getByTestId(
      "short-narrative-of-possible-consequences"
    );
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(
      "Consequences if V.A.C.® Therapy is not used"
    );
    const value = screen.getByTestId(
      "short-narrative-of-possible-consequences-value"
    );
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("Test");
  });

  it("Clinical Information Review Order component validate for consequences if V.A.C.® Therapy is not used", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    const mockEditButtonClicked = jest.fn();
    render(
      <ClinicalInformationReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        isSecondaryWoundInfo={true}
        woundInfoData={data}
        woundLocations={[]}
        woundDirections={[]}
        woundOrientations={[]}
      />
    );
    const title = screen.queryByText(
      "Consequences if V.A.C.® Therapy is not used"
    );
    expect(title).toBeNull();
  });

  it("Clinical Information Review Order component validate for primary wound type", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.woundType.value = "Test";
    const mockEditButtonClicked = jest.fn();
    render(
      <ClinicalInformationReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        isSecondaryWoundInfo={false}
        woundInfoData={data}
        woundLocations={[]}
        woundDirections={[]}
        woundOrientations={[]}
      />
    );
    const title = screen.getByTestId("wound-type");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Primary Wound Type");
    const value = screen.getByTestId("wound-type-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("Test");
  });

  it("Clinical Information Review Order component validate for secondary wound type", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.woundType.value = "Test";
    const mockEditButtonClicked = jest.fn();
    render(
      <ClinicalInformationReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        isSecondaryWoundInfo={true}
        woundInfoData={data}
        woundLocations={[]}
        woundDirections={[]}
        woundOrientations={[]}
      />
    );
    const title = screen.getByTestId("wound-type");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Secondary Wound Type");
    const value = screen.getByTestId("wound-type-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("Test");
  });

  it("Clinical Information Review Order component validate for primary wound age for 0 month", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.woundAge.value = "0";
    const mockEditButtonClicked = jest.fn();
    render(
      <ClinicalInformationReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        isSecondaryWoundInfo={false}
        woundInfoData={data}
        woundLocations={[]}
        woundDirections={[]}
        woundOrientations={[]}
      />
    );
    const title = screen.getByTestId("wound-age");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Wound Age");
    const value = screen.getByTestId("wound-age-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("0 Month");
  });

  it("Clinical Information Review Order component validate for primary wound age for 1 month", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.woundAge.value = "1";
    const mockEditButtonClicked = jest.fn();
    render(
      <ClinicalInformationReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        isSecondaryWoundInfo={false}
        woundInfoData={data}
        woundLocations={[]}
        woundDirections={[]}
        woundOrientations={[]}
      />
    );
    const title = screen.getByTestId("wound-age");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Wound Age");
    const value = screen.getByTestId("wound-age-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("1 Month");
  });

  it("Clinical Information Review Order component validate for primary wound age for 2 months", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.woundAge.value = "2";
    const mockEditButtonClicked = jest.fn();
    render(
      <ClinicalInformationReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        isSecondaryWoundInfo={false}
        woundInfoData={data}
        woundLocations={[]}
        woundDirections={[]}
        woundOrientations={[]}
      />
    );
    const title = screen.getByTestId("wound-age");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Wound Age");
    const value = screen.getByTestId("wound-age-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("2 Months");
  });

  it("Clinical Information Review Order component validate for secondary wound age for 0 month", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.woundAge.value = "0";
    const mockEditButtonClicked = jest.fn();
    render(
      <ClinicalInformationReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        isSecondaryWoundInfo={true}
        woundInfoData={data}
        woundLocations={[]}
        woundDirections={[]}
        woundOrientations={[]}
      />
    );
    const title = screen.getByTestId("wound-age");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Wound Age");
    const value = screen.getByTestId("wound-age-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("0 Month");
  });

  it("Clinical Information Review Order component validate for secondary wound age for 1 month", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.woundAge.value = "1";
    const mockEditButtonClicked = jest.fn();
    render(
      <ClinicalInformationReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        isSecondaryWoundInfo={true}
        woundInfoData={data}
        woundLocations={[]}
        woundDirections={[]}
        woundOrientations={[]}
      />
    );
    const title = screen.getByTestId("wound-age");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Wound Age");
    const value = screen.getByTestId("wound-age-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("1 Month");
  });

  it("Clinical Information Review Order component validate for secondary wound age for 2 months", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.woundAge.value = "2";
    const mockEditButtonClicked = jest.fn();
    render(
      <ClinicalInformationReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        isSecondaryWoundInfo={true}
        woundInfoData={data}
        woundLocations={[]}
        woundDirections={[]}
        woundOrientations={[]}
      />
    );
    const title = screen.getByTestId("wound-age");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Wound Age");
    const value = screen.getByTestId("wound-age-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("2 Months");
  });

  it("Clinical Information Review Order component validate for primary wound location", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.woundLocation.value = "Back(Unsp)";
    const mockEditButtonClicked = jest.fn();
    render(
      <ClinicalInformationReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        isSecondaryWoundInfo={false}
        woundInfoData={data}
        woundLocations={[]}
        woundDirections={[]}
        woundOrientations={[]}
      />
    );
    const title = screen.getByTestId("wound-location");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Wound Location");
    const value = screen.getByTestId("wound-location-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("Back(Unsp)");
  });

  it("Clinical Information Review Order component validate for secondary wound location", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.woundLocation.value = "Back(Unsp)";
    const mockEditButtonClicked = jest.fn();
    render(
      <ClinicalInformationReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        isSecondaryWoundInfo={true}
        woundInfoData={data}
        woundLocations={[]}
        woundDirections={[]}
        woundOrientations={[]}
      />
    );
    const title = screen.getByTestId("wound-location");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Wound Location");
    const value = screen.getByTestId("wound-location-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("Back(Unsp)");
  });

  it("Clinical Information Review Order component validate for primary wound direction", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.woundDirection.value = "Left";
    const mockEditButtonClicked = jest.fn();
    render(
      <ClinicalInformationReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        isSecondaryWoundInfo={false}
        woundInfoData={data}
        woundLocations={[]}
        woundDirections={[]}
        woundOrientations={[]}
      />
    );
    const title = screen.getByTestId("wound-direction");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Wound Direction");
    const value = screen.getByTestId("wound-direction-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("Left");
  });

  it("Clinical Information Review Order component validate for secondary wound direction", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.woundDirection.value = "Left";
    const mockEditButtonClicked = jest.fn();
    render(
      <ClinicalInformationReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        isSecondaryWoundInfo={true}
        woundInfoData={data}
        woundLocations={[]}
        woundDirections={[]}
        woundOrientations={[]}
      />
    );
    const title = screen.getByTestId("wound-direction");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Wound Direction");
    const value = screen.getByTestId("wound-direction-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("Left");
  });

  it("Clinical Information Review Order component validate for primary wound direction", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.woundDirection.value = "Left";
    const mockEditButtonClicked = jest.fn();
    render(
      <ClinicalInformationReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        isSecondaryWoundInfo={false}
        woundInfoData={data}
        woundLocations={[]}
        woundDirections={[]}
        woundOrientations={[]}
      />
    );
    const title = screen.getByTestId("wound-direction");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Wound Direction");
    const value = screen.getByTestId("wound-direction-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("Left");
  });

  it("Clinical Information Review Order component validate for secondary wound orientation", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.woundOrientation.value = "Dorsal";
    const mockEditButtonClicked = jest.fn();
    render(
      <ClinicalInformationReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        isSecondaryWoundInfo={true}
        woundInfoData={data}
        woundLocations={[]}
        woundDirections={[]}
        woundOrientations={[]}
      />
    );
    const title = screen.getByTestId("wound-orientation");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Wound Orientation");
    const value = screen.getByTestId("wound-orientation-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("Dorsal");
  });
});
