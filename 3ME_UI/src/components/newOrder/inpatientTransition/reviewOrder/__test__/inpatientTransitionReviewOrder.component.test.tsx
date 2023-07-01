import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getDeepClone } from "../../../../../util/ObjectFunctions";
import { IFacility } from "../../../../manageProfile/facilityInformation/facility.interface";
import { newOrderTestData } from "../../../__test__/newOrder.test.data";
import { InpatientTransitionReviewOrder } from "../inpatientTransitionReviewOrder.component";

describe("Inpatient transition review order component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("Inpatient transition review order component validate header", () => {
    const data = getDeepClone(newOrderTestData);
    const editBtnAction = jest.fn();
    const facility: IFacility = {
      accountId: "10987651239",
      accountName: "University Medical Center",
      typeName: "Skilled nursing facility",
      address1: "1800 17th Ave SE",
      address2: "Apt 405",
      city: "Minneapolis",
      state: "MN",
      zip: 66554,
      accountNumber: 123456,
      addressId: "123",
      typeCode: "123",
    };
    render(
      <InpatientTransitionReviewOrder
        data={data}
        facility={facility}
        editButtonClicked={editBtnAction}
      />
    );
    const title = screen.getByTestId("inpatient-transition-review-order-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Inpatient Transition");
    const editBtn = screen.getByTestId(
      "inpatient-transition-review-order-edit-button"
    );
    expect(editBtn).toBeInTheDocument();
    expect(editBtn).toHaveTextContent("Edit");
    userEvent.click(editBtn);
    expect(editBtnAction).toBeCalledTimes(1);
  });

  it("Inpatient transition review order component validate for wasNPWTInitiated as yes", () => {
    const data = getDeepClone(newOrderTestData);
    data.wasNPWTInitiated.value = "yes";
    const facility: IFacility = {
      accountId: "10987651239",
      accountName: "University Medical Center",
      typeName: "Skilled nursing facility",
      address1: "1800 17th Ave SE",
      address2: "Apt 405",
      city: "Minneapolis",
      state: "MN",
      zip: 66554,
      accountNumber: 123456,
      addressId: "123",
      typeCode: "123",
    };
    render(
      <InpatientTransitionReviewOrder
        data={data}
        facility={facility}
        editButtonClicked={jest.fn()}
      />
    );
    const title = screen.getByTestId("wasNPWTInitiated");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(
      "Was Negative Pressure Wound Therapy (NPWT) initiated in an inpatient facility or has the patient been on NPWT in the last 60 days?"
    );
    const value = screen.getByTestId("wasNPWTInitiated-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("Yes");
  });

  it("Inpatient transition review order component validate for wasNPWTInitiated as no", () => {
    const data = getDeepClone(newOrderTestData);
    data.wasNPWTInitiated.value = "no";
    const facility: IFacility = {
      accountId: "10987651239",
      accountName: "University Medical Center",
      typeName: "Skilled nursing facility",
      address1: "1800 17th Ave SE",
      address2: "Apt 405",
      city: "Minneapolis",
      state: "MN",
      zip: 66554,
      accountNumber: 123456,
      addressId: "123",
      typeCode: "123",
    };
    render(
      <InpatientTransitionReviewOrder
        data={data}
        facility={facility}
        editButtonClicked={jest.fn()}
      />
    );
    const title = screen.getByTestId("wasNPWTInitiated");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(
      "Was Negative Pressure Wound Therapy (NPWT) initiated in an inpatient facility or has the patient been on NPWT in the last 60 days?"
    );
    const value = screen.getByTestId("wasNPWTInitiated-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("No");
  });

  it("Inpatient transition review order component validate for dateInitiated", () => {
    const data = getDeepClone(newOrderTestData);
    data.wasNPWTInitiated.value = "yes";
    data.dateInitiated.value = "12/19/2022";
    const facility: IFacility = {
      accountId: "10987651239",
      accountName: "University Medical Center",
      typeName: "Skilled nursing facility",
      address1: "1800 17th Ave SE",
      address2: "Apt 405",
      city: "Minneapolis",
      state: "MN",
      zip: 66554,
      accountNumber: 123456,
      addressId: "123",
      typeCode: "123",
    };
    render(
      <InpatientTransitionReviewOrder
        data={data}
        facility={facility}
        editButtonClicked={jest.fn()}
      />
    );
    const title = screen.getByTestId("dateInitiated");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Date initiated");
    const value = screen.getByTestId("dateInitiated-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("12/19/2022");
  });

  it("Inpatient transition review order component validate for facility name", () => {
    const data = getDeepClone(newOrderTestData);
    data.wasNPWTInitiated.value = "yes";
    const facility: IFacility = {
      accountId: "10987651239",
      accountName: "University Medical Center",
      typeName: "Skilled nursing facility",
      address1: "1800 17th Ave SE",
      address2: "Apt 405",
      city: "Minneapolis",
      state: "MN",
      zip: 66554,
      accountNumber: 123456,
      addressId: "123",
      typeCode: "123",
    };
    render(
      <InpatientTransitionReviewOrder
        data={data}
        facility={facility}
        editButtonClicked={jest.fn()}
      />
    );
    const title = screen.getByTestId("facility-name");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Facility Name");
    const value = screen.getByTestId("facility-name-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("University Medical Center");
  });

  it("Inpatient transition review order component validate for facility type", () => {
    const data = getDeepClone(newOrderTestData);
    data.wasNPWTInitiated.value = "yes";
    const facility: IFacility = {
      accountId: "10987651239",
      accountName: "University Medical Center",
      typeName: "Skilled nursing facility",
      address1: "1800 17th Ave SE",
      address2: "Apt 405",
      city: "Minneapolis",
      state: "MN",
      zip: 66554,
      accountNumber: 123456,
      addressId: "123",
      typeCode: "123",
    };
    render(
      <InpatientTransitionReviewOrder
        data={data}
        facility={facility}
        editButtonClicked={jest.fn()}
      />
    );
    const title = screen.getByTestId("facility-type");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Facility Type");
    const value = screen.getByTestId("facility-type-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("Skilled Nursing Facility");
  });

  it("Inpatient transition review order component validate for facility id", () => {
    const data = getDeepClone(newOrderTestData);
    data.wasNPWTInitiated.value = "yes";
    const facility: IFacility = {
      accountId: "10987651239",
      accountName: "University Medical Center",
      typeName: "Skilled nursing facility",
      address1: "1800 17th Ave SE",
      address2: "Apt 405",
      city: "Minneapolis",
      state: "MN",
      zip: 100001,
      accountNumber: 123456,
      addressId: "123",
      typeCode: "123",
    };
    render(
      <InpatientTransitionReviewOrder
        data={data}
        facility={facility}
        editButtonClicked={jest.fn()}
      />
    );
    const title = screen.getByTestId("facility-id");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Facility ID");
    const value = screen.getByTestId("facility-id-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("123456");
  });

  it("Inpatient transition review order component validate for facility address", () => {
    const data = getDeepClone(newOrderTestData);
    data.wasNPWTInitiated.value = "yes";
    const facility: IFacility = {
      accountId: "10987651239",
      accountName: "University Medical Center",
      typeName: "Skilled nursing facility",
      address1: "1800 17th Ave SE",
      address2: "Apt 405",
      city: "Minneapolis",
      state: "MN",
      zip: 66554,
      accountNumber: 123456,
      addressId: "123",
      typeCode: "123",
    };
    render(
      <InpatientTransitionReviewOrder
        data={data}
        facility={facility}
        editButtonClicked={jest.fn()}
      />
    );
    const title = screen.getByTestId("address");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Address");
    const value1 = screen.getByTestId("address1-value");
    expect(value1).toBeInTheDocument();
    expect(value1).toHaveTextContent("1800 17th Ave Se");
    const value2 = screen.getByTestId("address2-value");
    expect(value2).toBeInTheDocument();
    expect(value2).toHaveTextContent("Apt 405");
    const value3 = screen.getByTestId("city-state-zip-value");
    expect(value3).toBeInTheDocument();
    expect(value3).toHaveTextContent("Minneapolis, MN 66554");
  });
});
