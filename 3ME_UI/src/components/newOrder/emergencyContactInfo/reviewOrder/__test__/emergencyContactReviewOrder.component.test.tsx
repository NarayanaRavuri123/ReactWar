import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getDeepClone } from "../../../../../util/ObjectFunctions";
import { newOrderTestData } from "../../../__test__/newOrder.test.data";
import { EmergencyContactReviewOrder } from "../emergencyContactReviewOrder.component";

describe("Emergency contact info component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("Emergency contact info review order component validate title", () => {
    const data = getDeepClone(newOrderTestData);
    const editBtnAction = jest.fn();
    render(
      <EmergencyContactReviewOrder
        data={data}
        editButtonClicked={editBtnAction}
      />
    );
    const title = screen.getByTestId("emergency-contact-review-order-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Emergency Contact Info");
    const editBtn = screen.getByTestId(
      "emergency-contact-review-order-edit-button"
    );
    expect(editBtn).toBeInTheDocument();
    expect(editBtn).toHaveTextContent("Edit");
    userEvent.click(editBtn);
    expect(editBtnAction).toBeCalledTimes(1);
  });

  it("Emergency contact review order name validation", () => {
    const data = getDeepClone(newOrderTestData);
    data.emergencyContactFirstName.value = "Rahul";
    data.emergencyContactLastName.value = "Patil";
    render(
      <EmergencyContactReviewOrder data={data} editButtonClicked={jest.fn()} />
    );
    const title = screen.getByTestId("name");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Name");
    const value = screen.getByTestId("name-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("Rahul Patil");
  });

  it("Emergency contact review order only first name validation", () => {
    const data = getDeepClone(newOrderTestData);
    data.emergencyContactFirstName.value = "Rahul";
    render(
      <EmergencyContactReviewOrder data={data} editButtonClicked={jest.fn()} />
    );
    const title = screen.getByTestId("name");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Name");
    const value = screen.getByTestId("name-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("Rahul");
  });

  it("Emergency contact review order only second name validation", () => {
    const data = getDeepClone(newOrderTestData);
    data.emergencyContactLastName.value = "Patil";
    render(
      <EmergencyContactReviewOrder data={data} editButtonClicked={jest.fn()} />
    );
    const title = screen.getByTestId("name");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Name");
    const value = screen.getByTestId("name-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("Patil");
  });

  it("Emergency contact review order phone number validation", () => {
    const data = getDeepClone(newOrderTestData);
    data.emergencyContactPhoneNumber.value = "832-390-6836";
    render(
      <EmergencyContactReviewOrder data={data} editButtonClicked={jest.fn()} />
    );
    const title = screen.getByTestId("phone-number");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Phone Number");
    const value = screen.getByTestId("phone-number-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("832-390-6836");
  });
});
