import userEvent from "@testing-library/user-event";
import { cleanup, render, screen } from "@testing-library/react";
import { getDeepClone } from "../../../../../util/ObjectFunctions";
import { newOrderTestData } from "../../../__test__/newOrder.test.data";
import { PatientInfoReviewOrder } from "../patientInfoReviewOrder.component";

describe("Patient information review order component", () => {
  afterAll(() => {
    cleanup();
  });

  it("Patient information review order component validate header", () => {
    const data = getDeepClone(newOrderTestData);
    const editBtnAction = jest.fn();
    render(
      <PatientInfoReviewOrder data={data} editButtonClicked={editBtnAction} />
    );
    const title = screen.getByTestId("patient-info-review-order-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Patient Information");
    const editBtn = screen.getByTestId("patient-info-review-order-edit-button");
    expect(editBtn).toBeInTheDocument();
    expect(editBtn).toHaveTextContent("Edit");
    userEvent.click(editBtn);
    expect(editBtnAction).toBeCalledTimes(1);
  });

  it("Patient information review order component validate name", () => {
    const data = getDeepClone(newOrderTestData);
    data.firstName.value = "Rahul";
    data.lastName.value = "Patil";

    render(
      <PatientInfoReviewOrder data={data} editButtonClicked={jest.fn()} />
    );
    const title = screen.getByTestId("name");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Full Name");
    const value1 = screen.getByTestId("name-value");
    expect(value1).toBeInTheDocument();
    expect(value1).toHaveTextContent("Rahul Patil");
  });

  it("Patient information review order component validate date of birth", () => {
    const data = getDeepClone(newOrderTestData);
    data.dob.value = "10/07/2022";

    render(
      <PatientInfoReviewOrder data={data} editButtonClicked={jest.fn()} />
    );
    const title = screen.getByTestId("date-of-birth");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Date of Birth");
    const value1 = screen.getByTestId("date-of-birth-value");
    expect(value1).toBeInTheDocument();
    expect(value1).toHaveTextContent("10/07/2022");
  });

  it("Patient information review order component validate phone number", () => {
    const data = getDeepClone(newOrderTestData);
    data.phone.value = "832-940-5422";
    render(
      <PatientInfoReviewOrder data={data} editButtonClicked={jest.fn()} />
    );
    const title = screen.getByTestId("phone");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Phone Number");
    const value1 = screen.getByTestId("phone-value");
    expect(value1).toBeInTheDocument();
    expect(value1).toHaveTextContent("832-940-5422");
  });

  it("Patient information review order component validate email", () => {
    const data = getDeepClone(newOrderTestData);
    data.email.value = "rahul@gmail.com";
    render(
      <PatientInfoReviewOrder data={data} editButtonClicked={jest.fn()} />
    );
    const title = screen.getByTestId("email");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Patient Email Address");
    const value1 = screen.getByTestId("email-value");
    expect(value1).toBeInTheDocument();
    expect(value1).toHaveTextContent("Rahul@gmail.com");
  });

  it("Patient information review order component validate email with empty string", () => {
    const data = getDeepClone(newOrderTestData);
    render(
      <PatientInfoReviewOrder data={data} editButtonClicked={jest.fn()} />
    );
    const title = screen.getByTestId("email");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Patient Email Address");
    const value1 = screen.getByTestId("email-value");
    expect(value1).toBeInTheDocument();
    expect(value1).toHaveTextContent("--");
  });

  it("Patient information review order component validate permanent address", () => {
    const data = getDeepClone(newOrderTestData);
    data.IsSamePermanentAddress.value = "true";
    data.address1.value = "1800 17th Ave SE";
    data.address2.value = "Apt 405";
    data.city.value = "San Antonio";
    data.state.value = "TX";
    data.zip.value = "66554";
    render(
      <PatientInfoReviewOrder data={data} editButtonClicked={jest.fn()} />
    );
    const title = screen.getByTestId("permanent-address");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Permanent Address");
    const value1 = screen.getByTestId("permanent-address1-value");
    expect(value1).toBeInTheDocument();
    expect(value1).toHaveTextContent("1800 17th Ave Se");
    const value2 = screen.getByTestId("permanent-address2-value");
    expect(value2).toBeInTheDocument();
    expect(value2).toHaveTextContent("Apt 405");
    const value3 = screen.getByTestId("permanent-city-state-zip-value");
    expect(value3).toBeInTheDocument();
    expect(value3).toHaveTextContent("San Antonio, TX 66554");
  });
});
