import userEvent from "@testing-library/user-event";
import { cleanup, render, screen } from "@testing-library/react";
import { getDeepClone } from "../../../../../util/ObjectFunctions";
import { WoundTunnelingReviewOrder } from "../woundTunnelingReviewOrder.component";
import { newOrderWoundInfoTestData } from "../../../newOrderWoundInfoStepper/__test__/newOrderWoundInfo.test.data";

describe("Wound Tunneling Review Order component ->", () => {
  afterAll(() => {
    cleanup();
  });

  it("Wound Tunneling Review Order component validate header title", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    const mockEditButtonClicked = jest.fn();
    render(
      <WoundTunnelingReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        woundInfoData={data}
      />
    );
    const title = screen.getByTestId("wound-tunneling-review-order-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Wound Tunneling");
  });

  it("Wound Tunneling Review Order component validate header edit button", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    const mockEditButtonClicked = jest.fn();
    render(
      <WoundTunnelingReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        woundInfoData={data}
      />
    );
    const editBtn = screen.getByTestId(
      "wound-tunneling-review-order-edit-button"
    );
    expect(editBtn).toBeInTheDocument();
    expect(editBtn).toHaveTextContent("Edit");
    userEvent.click(editBtn);
    expect(mockEditButtonClicked).toBeCalledTimes(1);
  });

  it("Wound Tunneling Review Order component validate wound tunneling is present as yes", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.woundTunneling.value = "Yes";
    const mockEditButtonClicked = jest.fn();
    render(
      <WoundTunnelingReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        woundInfoData={data}
      />
    );
    const title = screen.getByTestId("wound-tunneling-present");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Tunneling Present");
    const value = screen.getByTestId("wound-tunneling-present-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("Yes");
  });

  it("Wound Tunneling Review Order component validate wound tunneling is present as no", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.woundTunneling.value = "No";
    const mockEditButtonClicked = jest.fn();
    render(
      <WoundTunnelingReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        woundInfoData={data}
      />
    );
    const title = screen.getByTestId("wound-tunneling-present");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Tunneling Present");
    const value = screen.getByTestId("wound-tunneling-present-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("No");
  });

  it("Wound Tunneling Review Order component validate wound tunneling is present as yes for location 1 tunneling", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.location1Depth.value = "1.2";
    data.location1Position.value = "2:00";
    const mockEditButtonClicked = jest.fn();
    render(
      <WoundTunnelingReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        woundInfoData={data}
      />
    );
    const title = screen.getByTestId("wound-location-1-tunneling");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Location 1 Tunneling");
    const value = screen.getByTestId("wound-location-1-tunneling-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("1.2 cm at 2 o’clock");
  });

  it("Wound Tunneling Review Order component validate wound tunneling is present as yes for location 2 tunneling", () => {
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.location2Depth.value = "1.2";
    data.location2Position.value = "2:00";
    const mockEditButtonClicked = jest.fn();
    render(
      <WoundTunnelingReviewOrder
        editButtonClicked={mockEditButtonClicked}
        isOrderSummary={false}
        woundInfoData={data}
      />
    );
    const title = screen.getByTestId("wound-location-2-tunneling");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Location 2 Tunneling");
    const value = screen.getByTestId("wound-location-2-tunneling-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("1.2 cm at 2 o’clock");
  });
});
