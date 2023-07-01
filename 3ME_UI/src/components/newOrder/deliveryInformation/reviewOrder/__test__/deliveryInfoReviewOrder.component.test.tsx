import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getDeepClone } from "../../../../../util/ObjectFunctions";
import { defaultDeliveryInformation } from "../../../newOrder.model";
import { newOrderTestData } from "../../../__test__/newOrder.test.data";
import { DeliveryInfoReviewOrder } from "../deliveryInfoReviewOrder.component";

describe("Delivery information review order component ->", () => {
  afterAll(() => {
    cleanup();
  });

  it("Delivery information review order component validate header ", () => {
    const data = getDeepClone(defaultDeliveryInformation);
    const editBtnAction = jest.fn();
    render(
      <DeliveryInfoReviewOrder
        data={data}
        editButtonClicked={editBtnAction}
        deliverySites={[]}
      />
    );
    const title = screen.getByTestId("delivery-info-review-order-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Delivery Info");
    const editBtn = screen.getByTestId(
      "delivery-info-review-order-edit-button"
    );
    expect(editBtn).toBeInTheDocument();
    expect(editBtn).toHaveTextContent("Edit");
    userEvent.click(editBtn);
    expect(editBtnAction).toBeCalledTimes(1);
  });

  it("Delivery information review order component validate product need by date and time", () => {
    const data = getDeepClone(defaultDeliveryInformation);
    data.deliveryProductNeedByDate.value = "12/19/2022";
    data.deliveryProductNeedByTime.value = "11:01";
    render(
      <DeliveryInfoReviewOrder
        data={data}
        editButtonClicked={jest.fn()}
        deliverySites={[]}
      />
    );
    const title = screen.getByTestId("product-need-by-date-and-time");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Product Need by Date and Time");
    const value = screen.getByTestId("product-need-by-date-and-time-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("12/19/2022 11:01");
  });

  it("Delivery information review order component validate delivery site type", () => {
    const data = getDeepClone(defaultDeliveryInformation);
    data.deliverySiteType.value = "Wound Care Clinic";
    render(
      <DeliveryInfoReviewOrder
        data={data}
        editButtonClicked={jest.fn()}
        deliverySites={[]}
      />
    );
    const title = screen.getByTestId("delivery-site-type");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Delivery Site Type");
    const value = screen.getByTestId("delivery-site-type-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("Wound Care Clinic");
  });

  it("Delivery information review order component validate facility name", () => {
    const data = getDeepClone(defaultDeliveryInformation);
    data.deliveryFacilityName.value = "University Medical Center";
    render(
      <DeliveryInfoReviewOrder
        data={data}
        editButtonClicked={jest.fn()}
        deliverySites={[]}
      />
    );
    const title = screen.getByTestId("facility-name");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Facility Name");
    const value = screen.getByTestId("facility-name-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("University Medical Center");
  });

  it("Delivery information review order component validate facility name", () => {
    const data = getDeepClone(defaultDeliveryInformation);
    data.deliveryAddressLine1.value = "1800 17th Ave SE";
    data.deliveryAddressLine2.value = "Apt 405";
    data.deliveryCity.value = "San Antonio";
    data.deliveryState.value = "TX";
    data.deliveryZipCode.value = "66554";

    render(
      <DeliveryInfoReviewOrder
        data={data}
        editButtonClicked={jest.fn()}
        deliverySites={[]}
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
    expect(value3).toHaveTextContent("San Antonio, TX 66554");
  });
});
