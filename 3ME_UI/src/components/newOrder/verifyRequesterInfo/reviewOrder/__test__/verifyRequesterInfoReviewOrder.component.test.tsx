import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getDeepClone } from "../../../../../util/ObjectFunctions";
import { IFacility } from "../../../../manageProfile/facilityInformation/facility.interface";
import { requesterTestData } from "../../../__test__/newOrder.test.data";
import { VerifyRequesterInfoReviewOrder } from "../verifyRequesterInfoReviewOrder.component";

describe("Verify requester review order component", () => {
  afterAll(() => {
    cleanup();
  });

  it("Verify requester review order component validate header", () => {
    const data = getDeepClone(requesterTestData);
    const editBtnAction = jest.fn();
    render(
      <VerifyRequesterInfoReviewOrder
        data={data}
        editButtonClicked={editBtnAction}
      />
    );
    const title = screen.getByTestId(
      "verify-requester-info-review-order-title"
    );
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Verify Requester Info");
    const editBtn = screen.getByTestId(
      "verify-requester-info-review-order-edit-button"
    );
    expect(editBtn).toBeInTheDocument();
    expect(editBtn).toHaveTextContent("Edit");
    userEvent.click(editBtn);
    expect(editBtnAction).toBeCalledTimes(1);
  });

  it("Verify requester review order component validate requester name", () => {
    const data = getDeepClone(requesterTestData);
    data.requesterFirstName.value = "Rahul";
    data.requesterLastName.value = "Patil";
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
      <VerifyRequesterInfoReviewOrder
        data={data}
        facility={facility}
        editButtonClicked={jest.fn()}
      />
    );
    const title = screen.getByTestId("requester-name");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Requester Name");
    const value = screen.getByTestId("requester-name-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("Rahul Patil");
  });

  it("Verify requester review order component validate requester email", () => {
    const data = getDeepClone(requesterTestData);
    data.requesterEmail.value = "rahul@gmail.com";
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
      <VerifyRequesterInfoReviewOrder
        data={data}
        facility={facility}
        editButtonClicked={jest.fn()}
      />
    );
    const title = screen.getByTestId("requester-email");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Requester Email");
    const value = screen.getByTestId("requester-email-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("rahul@gmail.com");
  });

  it("Verify requesters review order component validate for facility name", () => {
    const data = getDeepClone(requesterTestData);
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
      <VerifyRequesterInfoReviewOrder
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

  it("Verify requesters review order component validate for facility type", () => {
    const data = getDeepClone(requesterTestData);
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
      <VerifyRequesterInfoReviewOrder
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

  it("Verify requesters review order component validate for facility id", () => {
    const data = getDeepClone(requesterTestData);
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
      <VerifyRequesterInfoReviewOrder
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

  it("Verify requesters review order component validate for facility address", () => {
    const data = getDeepClone(requesterTestData);
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
      <VerifyRequesterInfoReviewOrder
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
