import userEvent from "@testing-library/user-event";
import { cleanup, render, screen } from "@testing-library/react";
import { getDeepClone } from "../../../../../util/ObjectFunctions";
import { newOrderTestData } from "../../../__test__/newOrder.test.data";
import { PatientCurrentAddressReviewOrder } from "../partientCurrentAddressReviewOrder.component";

describe("Patient current address review order component", () => {
  afterAll(() => {
    cleanup();
  });

  it("Patient current address review order component validate header", () => {
    const data = getDeepClone(newOrderTestData);
    const editBtnAction = jest.fn();
    render(
      <PatientCurrentAddressReviewOrder
        data={data}
        editButtonClicked={editBtnAction}
      />
    );
    const title = screen.getByTestId(
      "patient-current-address-review-order-title"
    );
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Patient’s Current Address");
    const editBtn = screen.getByTestId(
      "patient-current-address-review-order-edit-button"
    );
    expect(editBtn).toBeInTheDocument();
    expect(editBtn).toHaveTextContent("Edit");
    userEvent.click(editBtn);
    expect(editBtnAction).toBeCalledTimes(1);
  });

  it("Patient current address review order component validate current address when current address is same as permanent address", () => {
    const data = getDeepClone(newOrderTestData);
    const editBtnAction = jest.fn();
    data.IsSamePermanentAddress.value = "true";
    data.address1.value = "1800 17th Ave SE";
    data.address2.value = "Apt 405";
    data.city.value = "San Antonio";
    data.state.value = "TX";
    data.zip.value = "66554";
    render(
      <PatientCurrentAddressReviewOrder
        data={data}
        editButtonClicked={editBtnAction}
      />
    );
    const title = screen.getByTestId("current-address");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Current Address");
    const value1 = screen.getByTestId("current-address1-value");
    expect(value1).toBeInTheDocument();
    expect(value1).toHaveTextContent("1800 17th Ave Se");
    const value2 = screen.getByTestId("current-address2-value");
    expect(value2).toBeInTheDocument();
    expect(value2).toHaveTextContent("Apt 405");
    const value3 = screen.getByTestId("current-address-city-state-zip-value");
    expect(value3).toBeInTheDocument();
    expect(value3).toHaveTextContent("San Antonio, TX 66554");
  });

  it("Patient current address review order component validate current address when current address is not same as permanent address", () => {
    const data = getDeepClone(newOrderTestData);
    const editBtnAction = jest.fn();
    data.IsSamePermanentAddress.value = "false";
    data.patientCurrentAddress1.value = "1800 17th Ave SE";
    data.patientCurrentAddress2.value = "Apt 405";
    data.patientCurrentAddressCity.value = "San Antonio";
    data.patientCurrentAddressState.value = "TX";
    data.patientCurrentAddressZip.value = "66554";
    render(
      <PatientCurrentAddressReviewOrder
        data={data}
        editButtonClicked={editBtnAction}
      />
    );
    const title = screen.getByTestId("current-address");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Current Address");
    const value1 = screen.getByTestId("current-address1-value");
    expect(value1).toBeInTheDocument();
    expect(value1).toHaveTextContent("1800 17th Ave Se");
    const value2 = screen.getByTestId("current-address2-value");
    expect(value2).toBeInTheDocument();
    expect(value2).toHaveTextContent("Apt 405");
    const value3 = screen.getByTestId("current-address-city-state-zip-value");
    expect(value3).toBeInTheDocument();
    expect(value3).toHaveTextContent("San Antonio, TX 66554");
  });

  it("Patient current address review order component validate phone number", () => {
    const data = getDeepClone(newOrderTestData);
    const editBtnAction = jest.fn();
    data.IsSamePermanentAddress.value = "true";
    data.patientCurrentAddressPhone.value = "832-940-5422";
    render(
      <PatientCurrentAddressReviewOrder
        data={data}
        editButtonClicked={editBtnAction}
      />
    );
    const title = screen.getByTestId("phone");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Phone Number");
    const value1 = screen.getByTestId("phone-value");
    expect(value1).toBeInTheDocument();
    expect(value1).toHaveTextContent("--");
  });
});
