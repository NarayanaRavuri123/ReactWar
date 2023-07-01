import moment from "moment";
import { PickUpDetails } from "../pickUpDetails.component";
import { cleanup, render, screen } from "@testing-library/react";
import { getDeepClone } from "../../../../../util/ObjectFunctions";
import { patientMockData } from "../../../../../mockData/patientFound";
import { pickUpRequestTestData } from "../../__test__/pickUpRequest.test.data";

describe("Pick up Details component ->", () => {
  afterAll(() => {
    cleanup();
  });

  it("Check title rendered", () => {
    const data = getDeepClone(pickUpRequestTestData);
    const mockSetData = jest.fn();
    const patient = getDeepClone(patientMockData);
    render(
      <PickUpDetails data={data} setData={mockSetData} patient={patient} />
    );
    const title = screen.getByTestId("pick-up-details-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Pickup Details");
  });

  it("Check description rendered", () => {
    const data = getDeepClone(pickUpRequestTestData);
    const mockSetData = jest.fn();
    const patient = getDeepClone(patientMockData);
    render(
      <PickUpDetails data={data} setData={mockSetData} patient={patient} />
    );
    const description = screen.getByTestId("pick-up-details-description");
    expect(description).toBeInTheDocument();
    const date = moment(Date()).format("MM/DD/YYYY");
    expect(description).toHaveTextContent(
      "Your invoice will reflect billing through " + date
    );
  });

  it("Check Placement date rendered", () => {
    const data = getDeepClone(pickUpRequestTestData);
    const mockSetData = jest.fn();
    const patient = getDeepClone(patientMockData);
    render(
      <PickUpDetails data={data} setData={mockSetData} patient={patient} />
    );
    const placementDate = screen.getByTestId("pick-up-details-placement-date");
    expect(placementDate).toBeInTheDocument();
    expect(placementDate).toHaveTextContent("Placement date");
  });

  it("Check Therapy Discharge date rendered", () => {
    const data = getDeepClone(pickUpRequestTestData);
    const mockSetData = jest.fn();
    const patient = getDeepClone(patientMockData);
    render(
      <PickUpDetails data={data} setData={mockSetData} patient={patient} />
    );
    const therapyDischargeDate = screen.getByTestId(
      "pick-up-details-therapy-discharge-date"
    );
    expect(therapyDischargeDate).toBeInTheDocument();
    expect(therapyDischargeDate).toHaveTextContent("Therapy Discharge Date");
  });

  it("Check Placement date rendered stop bill date", () => {
    const data = getDeepClone(pickUpRequestTestData);
    const mockSetData = jest.fn();
    const patient = getDeepClone(patientMockData);
    render(
      <PickUpDetails data={data} setData={mockSetData} patient={patient} />
    );
    const stopBillDate = screen.getByTestId("pick-up-details-stop-bill-date");
    expect(stopBillDate).toBeInTheDocument();
    expect(stopBillDate).toHaveTextContent("Stop Bill Date");
  });

  it("Check Return Method rendered", () => {
    const data = getDeepClone(pickUpRequestTestData);
    const mockSetData = jest.fn();
    const patient = getDeepClone(patientMockData);
    render(
      <PickUpDetails data={data} setData={mockSetData} patient={patient} />
    );
    const returnMethod = screen.getByTestId("pick-up-details-return-method");
    expect(returnMethod).toBeInTheDocument();
    expect(returnMethod).toHaveTextContent("Return Method");
  });

  it("Check Special Instruction notes rendered", () => {
    const data = getDeepClone(pickUpRequestTestData);
    const mockSetData = jest.fn();
    const patient = getDeepClone(patientMockData);
    render(
      <PickUpDetails data={data} setData={mockSetData} patient={patient} />
    );
    const description = screen.getByTestId("instructions-description-text");
    expect(description).toBeInTheDocument();
    expect(description).toHaveTextContent(
      "Product Pickups are performed by UPS. Click here for important information."
    );
  });

  it("Check Special Instruction notes click here rendered", () => {
    const data = getDeepClone(pickUpRequestTestData);
    const mockSetData = jest.fn();
    const patient = getDeepClone(patientMockData);
    render(
      <PickUpDetails data={data} setData={mockSetData} patient={patient} />
    );
    const clickHere = screen.getByTestId(
      "instructions-description-text-click-here"
    );
    expect(clickHere).toBeInTheDocument();
    expect(clickHere).toHaveTextContent("Click here");
  });

  it("Check Special Instruction rendered", () => {
    const data = getDeepClone(pickUpRequestTestData);
    const mockSetData = jest.fn();
    const patient = getDeepClone(patientMockData);
    render(
      <PickUpDetails data={data} setData={mockSetData} patient={patient} />
    );
    const returnMethod = screen.getByTestId(
      "pick-up-details-special-instruction"
    );
    expect(returnMethod).toBeInTheDocument();
    expect(returnMethod).toHaveTextContent("Special Instructions");
  });
});
