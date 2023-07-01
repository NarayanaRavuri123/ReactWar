import userEvent from "@testing-library/user-event";
import { cleanup, render, screen } from "@testing-library/react";
import { getDeepClone } from "../../../../../util/ObjectFunctions";
import { newOrderTestData } from "../../../__test__/newOrder.test.data";
import { NewOrderContext } from "../../../../../context/NewOrderContext";
import { HomeCareProviderReviewOrder } from "../homeCareProviderReviewOrder.component";
import { getMockNewOrderData } from "../../../clinicalInformation/__test__/newOrderMockContextData";

describe("Home care provider review order component", () => {
  afterAll(() => {
    cleanup();
  });

  it("Home care provider review order component validate header", () => {
    const data = getDeepClone(newOrderTestData);
    const editBtnAction = jest.fn();
    render(
      <NewOrderContext.Provider
        value={{
          ...getMockNewOrderData(),
        }}
      >
        <HomeCareProviderReviewOrder
          data={data}
          editButtonClicked={editBtnAction}
        />
      </NewOrderContext.Provider>
    );
    const title = screen.getByTestId("home-care-provider-review-order-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Home Care Provider");
    const editBtn = screen.getByTestId(
      "home-care-provider-review-order-edit-button"
    );
    expect(editBtn).toBeInTheDocument();
    expect(editBtn).toHaveTextContent("Edit");
    userEvent.click(editBtn);
    expect(editBtnAction).toBeCalledTimes(1);
  });

  it("Home care provider review order component validate for user know who is administering the patient’s dressing changes as yes", () => {
    const data = getDeepClone(newOrderTestData);
    data.homeCareProvider.value = "yes";
    render(
      <HomeCareProviderReviewOrder data={data} editButtonClicked={jest.fn()} />
    );
    const title = screen.getByTestId("do-you-know-who-administering");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(
      "Do you know who will be administering the patient’s dressing changes?"
    );
    const value = screen.getByTestId("do-you-know-who-administering-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("Yes");
  });

  it("Home care provider review order component validate for user know who is administering the patient’s dressing changes as no", () => {
    const data = getDeepClone(newOrderTestData);
    data.homeCareProvider.value = "no";
    render(
      <HomeCareProviderReviewOrder data={data} editButtonClicked={jest.fn()} />
    );
    const title = screen.getByTestId("do-you-know-who-administering");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(
      "Do you know who will be administering the patient’s dressing changes?"
    );
    const value = screen.getByTestId("do-you-know-who-administering-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("No");
  });

  it("Home care provider review order component validate facility name", () => {
    const data = getDeepClone(newOrderTestData);
    data.homeCareProvider.value = "yes";
    data.addedCaregiverName.value = "Rahul Patil";
    render(
      <HomeCareProviderReviewOrder data={data} editButtonClicked={jest.fn()} />
    );
    const title = screen.getByTestId("facility-name");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Facility Name");
    const value = screen.getByTestId("facility-name-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("Rahul Patil");
  });

  it("Home care provider review order component validate facility type", () => {
    const data = getDeepClone(newOrderTestData);
    data.homeCareProvider.value = "yes";
    data.addedCaregiverFacilityType.value = "Physician Office";
    render(
      <HomeCareProviderReviewOrder data={data} editButtonClicked={jest.fn()} />
    );
    const title = screen.getByTestId("facility-type");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Facility Type");
    const value = screen.getByTestId("facility-type-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("Physician Office");
  });

  it("Home care provider review order component validate phone number", () => {
    const data = getDeepClone(newOrderTestData);
    data.homeCareProvider.value = "yes";
    data.addedCaregiverPhone.value = "604-345-5900";
    render(
      <HomeCareProviderReviewOrder data={data} editButtonClicked={jest.fn()} />
    );
    const title = screen.getByTestId("phone-number");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Phone");
    const value = screen.getByTestId("phone-number-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("604-345-5900");
  });

  it("Home care provider review order component validate address", () => {
    const data = getDeepClone(newOrderTestData);
    data.homeCareProvider.value = "yes";
    data.addedCaregiverAddress1.value = "370 E 660th Ave";
    data.addedCaregiverCity.value = "San Antonio";
    data.addedCaregiverState.value = "TX";
    data.addedCaregiverZip.value = "30595";
    render(
      <HomeCareProviderReviewOrder data={data} editButtonClicked={jest.fn()} />
    );
    const title = screen.getByTestId("address");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Address");
    const value1 = screen.getByTestId("address1-value");
    expect(value1).toBeInTheDocument();
    expect(value1).toHaveTextContent("370 E 660th Ave");
    const value2 = screen.getByTestId("city-state-zip-value");
    expect(value2).toBeInTheDocument();
    expect(value2).toHaveTextContent("San Antonio, TX 30595");
  });
});
