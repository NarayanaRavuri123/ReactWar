import { cleanup, render, screen } from "@testing-library/react";
import { getDeepClone } from "../../../../../util/ObjectFunctions";
import { pickUpRequestTestData } from "../../__test__/pickUpRequest.test.data";
import { patientMockData } from "../../../../../mockData/patientFound";
import PickUpRequestConfirm from "../pickupRequestConfirm.component";
import { PickUpDetails } from "../../pickUpDetails/pickUpDetails.component";
import { DeviceInformation } from "../../deviceInformation/deviceInformation.component";

describe("Pick up Details component ->", () => {
  afterAll(() => {
    cleanup();
  });

  it("Check title rendered", () => {
    const data = getDeepClone(pickUpRequestTestData);
    const mockSetData = jest.fn();
    const patient = getDeepClone(patientMockData);
    render(
      <PickUpRequestConfirm
        data={data}
        setData={mockSetData}
        patient={patient}
      />
    );
    const title = screen.getByTestId("pickupConfirmDesp-summarypage-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Pickup Order Confirmation");
  });
  it("Check print pdf button rendered", () => {
    const data = getDeepClone(pickUpRequestTestData);
    const mockSetData = jest.fn();
    const patient = getDeepClone(patientMockData);
    render(
      <PickUpRequestConfirm
        data={data}
        setData={mockSetData}
        patient={patient}
      />
    );
    const title = screen.getByTestId("pickupConfirmDesp-saveOrderBtn");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Save & Print Confirmation");
  });
  it("Check desp for summary rendered", () => {
    const data = getDeepClone(pickUpRequestTestData);
    const mockSetData = jest.fn();
    const patient = getDeepClone(patientMockData);
    render(
      <PickUpRequestConfirm
        data={data}
        setData={mockSetData}
        patient={patient}
      />
    );
    const title = screen.getByTestId("pickupConfirmDesp");
    expect(title).toBeInTheDocument();
  });
  it("Check process date rendered", () => {
    const data = getDeepClone(pickUpRequestTestData);
    const mockSetData = jest.fn();
    const patient = getDeepClone(patientMockData);
    render(
      <PickUpRequestConfirm
        data={data}
        setData={mockSetData}
        patient={patient}
      />
    );
    const title = screen.getByTestId("pickupConfirmDesp-processedDate-value");
    expect(title).toBeInTheDocument();
  });
  it("Check process date title rendered", () => {
    const data = getDeepClone(pickUpRequestTestData);
    const mockSetData = jest.fn();
    const patient = getDeepClone(patientMockData);
    render(
      <PickUpRequestConfirm
        data={data}
        setData={mockSetData}
        patient={patient}
      />
    );
    const title = screen.getByTestId("pickupConfirmDesp-processedDate-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Pickup Order Processed Date");
  });
  it("Check pickupConfirmDesp-facilityName title rendered", () => {
    const data = getDeepClone(pickUpRequestTestData);
    const mockSetData = jest.fn();
    const patient = getDeepClone(patientMockData);
    render(
      <PickUpRequestConfirm
        data={data}
        setData={mockSetData}
        patient={patient}
      />
    );
    const title = screen.getByTestId("pickupConfirmDesp-facilityName-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Customer Name");
  });

  it("Check pickupConfirmDesp-facilityName value rendered", () => {
    const data = getDeepClone(pickUpRequestTestData);
    const mockSetData = jest.fn();
    const patient = getDeepClone(patientMockData);
    render(
      <PickUpRequestConfirm
        data={data}
        setData={mockSetData}
        patient={patient}
      />
    );
    const title = screen.getByTestId("pickupConfirmDesp-facilityName-value");
    expect(title).toBeInTheDocument();
  });

  it("Check pickupConfirmDesp-customerNumber title rendered", () => {
    const data = getDeepClone(pickUpRequestTestData);
    const mockSetData = jest.fn();
    const patient = getDeepClone(patientMockData);
    render(
      <PickUpRequestConfirm
        data={data}
        setData={mockSetData}
        patient={patient}
      />
    );
    const title = screen.getByTestId("pickupConfirmDesp-customerNumber-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Customer Number");
  });

  it("Check pickupConfirmDesp-customerNumber value rendered", () => {
    const data = getDeepClone(pickUpRequestTestData);
    const mockSetData = jest.fn();
    const patient = getDeepClone(patientMockData);
    render(
      <PickUpRequestConfirm
        data={data}
        setData={mockSetData}
        patient={patient}
      />
    );
    const title = screen.getByTestId("pickupConfirmDesp-customerNumber-value");
    expect(title).toBeInTheDocument();
  });

  it("Check pickup details rendered", () => {
    const data = getDeepClone(pickUpRequestTestData);
    const mockSetData = jest.fn();
    const patient = getDeepClone(patientMockData);
    render(
      <PickUpDetails
        data={data}
        setData={mockSetData}
        patient={patient}
        isConfirmPickUpSummary={true}
      />
    );
    const title = screen.getByTestId("pickupDesp-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Pickup Details");
  });

  it("Check device info rendered", () => {
    const data = getDeepClone(pickUpRequestTestData);
    const mockSetData = jest.fn();
    render(
      <DeviceInformation
        data={data}
        setData={mockSetData}
        isConfirmPickUpSummary={true}
      />
    );
    const title = screen.getByTestId("deviceInfoDesp-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Device Information");
  });
});
