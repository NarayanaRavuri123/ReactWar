import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getDeepClone } from "../../../../../util/ObjectFunctions";
import { newOrderTestData } from "../../../__test__/newOrder.test.data";
import { DeliveryContactReviewOrder } from "../deliveryContactReviewOrder.component";

describe("Delivery contact review order component", () => {
  afterAll(() => {
    cleanup();
  });

  it("To check Delivery Contact header validation", () => {
    const data = getDeepClone(newOrderTestData);
    const editBtnAction = jest.fn();
    render(
      <DeliveryContactReviewOrder
        data={data}
        editButtonClicked={editBtnAction}
      />
    );
    const title = screen.getByTestId("delivery-contact-review-order-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Delivery Contact");
    const editBtn = screen.getByTestId(
      "delivery-contact-review-order-edit-button"
    );
    expect(editBtn).toBeInTheDocument();
    expect(editBtn).toHaveTextContent("Edit");
    userEvent.click(editBtn);
    expect(editBtnAction).toBeCalledTimes(1);
  });

  it("Delivery contact review order name validation", () => {
    const data = getDeepClone(newOrderTestData);
    data.deliveryContactFirstName.value = "Rahul";
    data.deliveryContactLastName.value = "Patile";
    render(
      <DeliveryContactReviewOrder data={data} editButtonClicked={jest.fn()} />
    );
    const title = screen.getByTestId("name");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Name");
    const value = screen.getByTestId("name-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("Rahul Patil");
  });

  it("Delivery contact review order phone number validation", () => {
    const data = getDeepClone(newOrderTestData);
    data.deliveryContactPhone.value = "832-390-6836";
    render(
      <DeliveryContactReviewOrder data={data} editButtonClicked={jest.fn()} />
    );
    const title = screen.getByTestId("phone-number");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Phone Number");
    const value = screen.getByTestId("phone-number-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("832-390-6836");
  });

  it("Delivery contact review order delivery instructions validation", () => {
    const data = getDeepClone(newOrderTestData);
    data.deliveryInstructions.value = "Test instructions";
    render(
      <DeliveryContactReviewOrder data={data} editButtonClicked={jest.fn()} />
    );
    const title = screen.getByTestId("instructions");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Delivery Instructions");
    const value = screen.getByTestId("instructions-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("Test instructions");
  });

  it("Delivery contact review order delivery instructions with empty validation", () => {
    const data = getDeepClone(newOrderTestData);
    data.deliveryInstructions.value = "";
    render(
      <DeliveryContactReviewOrder data={data} editButtonClicked={jest.fn()} />
    );
    const title = screen.getByTestId("instructions");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Delivery Instructions");
    const value = screen.getByTestId("instructions-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("--");
  });
});
