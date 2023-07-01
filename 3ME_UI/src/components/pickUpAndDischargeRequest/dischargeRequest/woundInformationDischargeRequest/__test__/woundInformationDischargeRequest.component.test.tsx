import { cleanup, render, screen } from "@testing-library/react";
import { defaultDischargeRequestTestData } from "../../__test__/dischargeRequest.test.data";
import WoundInformationDischargeRequest from "../woundInformationDischargeRequest.component";
import { getDeepClone } from "../../../../../util/ObjectFunctions";

describe("Discharge Request Wound Informations", () => {
  afterAll(() => {
    cleanup();
  });
  const wounds = {
    wounds: [
      {
        id: 8457177,
        type: "Pressure Ulcer - Stage four",
        location: "Buttock",
        orientation: null,
        direction: "001",
        evaluationDate: "2023-04-17T00:00:00",
        length: 4.0,
        width: 3.7,
        depth: 1.4,
        therapyResumptionDate: null,
        therapyHoldDate: null,
      },
      {
        id: 8457177,
        type: "Pressure Ulcer - Stage five",
        location: "Buttock 2",
        orientation: null,
        direction: "001",
        evaluationDate: "2023-04-18T00:00:00",
        length: 4.0,
        width: 3.7,
        depth: 1.4,
        therapyResumptionDate: null,
        therapyHoldDate: null,
      },
    ],
  };
  it("Discharge Request Wound Information header", () => {
    const data = getDeepClone(defaultDischargeRequestTestData);
    const mockSetState = jest.fn();
    render(
      <WoundInformationDischargeRequest
        dischargeData={data}
        setDischargeData={mockSetState}
        woundInfoDetails={wounds}
      />
    );
    const header = screen.getByTestId("woundInfoDRTitle");
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent("Wound Information");
  });
  it("Discharge Request Wound Information sub-header", () => {
    const data = getDeepClone(defaultDischargeRequestTestData);
    const mockSetState = jest.fn();
    render(
      <WoundInformationDischargeRequest
        dischargeData={data}
        setDischargeData={mockSetState}
        woundInfoDetails={wounds}
      />
    );
    const header = screen.getByTestId("woundInfoDRDesp");
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent(
      "If wound depth varies, document the greatest depth."
    );
  });
  it("Discharge Request Wound Information date title", () => {
    const data = getDeepClone(defaultDischargeRequestTestData);
    const mockSetState = jest.fn();
    render(
      <WoundInformationDischargeRequest
        dischargeData={data}
        setDischargeData={mockSetState}
        woundInfoDetails={wounds}
      />
    );
    const header = screen.getByTestId("woundInfoDRDate-title");
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent("Therapy Discontinued Date");
  });
  it("Discharge Request Wound Information date value", () => {
    const data = getDeepClone(defaultDischargeRequestTestData);
    const mockSetState = jest.fn();
    render(
      <WoundInformationDischargeRequest
        dischargeData={data}
        setDischargeData={mockSetState}
        woundInfoDetails={wounds}
      />
    );
    const header = screen.getByTestId("woundInfoDRDate-value");
    expect(header).toBeInTheDocument();
  });
  it("Discharge Request Wound Information location title", () => {
    const data = getDeepClone(defaultDischargeRequestTestData);
    const mockSetState = jest.fn();
    render(
      <WoundInformationDischargeRequest
        dischargeData={data}
        setDischargeData={mockSetState}
        woundInfoDetails={wounds}
      />
    );
    const header = screen.getByTestId("woundInfoLocation-title");
    expect(header).toBeInTheDocument();
  });
  it("Discharge Request Wound Information location value", () => {
    const data = getDeepClone(defaultDischargeRequestTestData);
    const mockSetState = jest.fn();
    render(
      <WoundInformationDischargeRequest
        dischargeData={data}
        setDischargeData={mockSetState}
        woundInfoDetails={wounds}
      />
    );
    const header = screen.getByTestId("woundInfoLocation-value");
    expect(header).toBeInTheDocument();
  });

  it("Discharge Request Wound Information type title", () => {
    const data = getDeepClone(defaultDischargeRequestTestData);
    const mockSetState = jest.fn();
    render(
      <WoundInformationDischargeRequest
        dischargeData={data}
        setDischargeData={mockSetState}
        woundInfoDetails={wounds}
      />
    );
    const header = screen.getByTestId("woundInfoType-title");
    expect(header).toBeInTheDocument();
  });

  it("Discharge Request Wound Information type value", () => {
    const data = getDeepClone(defaultDischargeRequestTestData);
    const mockSetState = jest.fn();
    render(
      <WoundInformationDischargeRequest
        dischargeData={data}
        setDischargeData={mockSetState}
        woundInfoDetails={wounds}
      />
    );
    const header = screen.getByTestId("woundInfoType-value");
    expect(header).toBeInTheDocument();
  });
  it("Discharge Request Wound Information final Text", () => {
    const data = getDeepClone(defaultDischargeRequestTestData);
    const mockSetState = jest.fn();
    render(
      <WoundInformationDischargeRequest
        dischargeData={data}
        setDischargeData={mockSetState}
        woundInfoDetails={wounds}
      />
    );
    const header = screen.getByTestId("woundInfo-finalD");
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent("Final Dimensions");
  });
  it("Discharge Request Wound Information last measurement", () => {
    const data = getDeepClone(defaultDischargeRequestTestData);
    const mockSetState = jest.fn();
    render(
      <WoundInformationDischargeRequest
        dischargeData={data}
        setDischargeData={mockSetState}
        woundInfoDetails={wounds}
      />
    );
    const header = screen.getByTestId("woundInfoLastMeasurementDate-title");
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent("Last Measurement Provided Date");
  });
  it("Discharge Request Wound Information last measurement value", () => {
    const data = getDeepClone(defaultDischargeRequestTestData);
    const mockSetState = jest.fn();
    render(
      <WoundInformationDischargeRequest
        dischargeData={data}
        setDischargeData={mockSetState}
        woundInfoDetails={wounds}
      />
    );
    const header = screen.getByTestId("woundInfoLastMeasurementDate-value");
    expect(header).toBeInTheDocument();
  });
  it("Discharge Request Wound Information last measurement date title", () => {
    const data = getDeepClone(defaultDischargeRequestTestData);
    const mockSetState = jest.fn();
    render(
      <WoundInformationDischargeRequest
        dischargeData={data}
        setDischargeData={mockSetState}
        woundInfoDetails={wounds}
      />
    );
    const header = screen.getByTestId("woundInfoLastMeasurement-title");
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent("Last measurements provided");
  });
  it("Discharge Request Wound Information last measurement date title value", () => {
    const data = getDeepClone(defaultDischargeRequestTestData);
    const mockSetState = jest.fn();
    render(
      <WoundInformationDischargeRequest
        dischargeData={data}
        setDischargeData={mockSetState}
        woundInfoDetails={wounds}
      />
    );
    const header = screen.getByTestId("woundInfoLastMeasurement-value");
    expect(header).toBeInTheDocument();
  });
  it("Discharge Request Wound Information final measure datepicker", () => {
    const data = getDeepClone(defaultDischargeRequestTestData);
    const mockSetState = jest.fn();
    render(
      <WoundInformationDischargeRequest
        dischargeData={data}
        setDischargeData={mockSetState}
        woundInfoDetails={wounds}
      />
    );
    const header = screen.getByTestId("woundMeasure-date1");
    expect(header).toBeInTheDocument();
  });
  it("Discharge Request Wound Information wound lenght", () => {
    const data = getDeepClone(defaultDischargeRequestTestData);
    const mockSetState = jest.fn();
    render(
      <WoundInformationDischargeRequest
        dischargeData={data}
        setDischargeData={mockSetState}
        woundInfoDetails={wounds}
      />
    );
    const header = screen.getByTestId("woundLength1");
    expect(header).toBeInTheDocument();
  });
  it("Discharge Request Wound Information wound width", () => {
    const data = getDeepClone(defaultDischargeRequestTestData);
    const mockSetState = jest.fn();
    render(
      <WoundInformationDischargeRequest
        dischargeData={data}
        setDischargeData={mockSetState}
        woundInfoDetails={wounds}
      />
    );
    const header = screen.getByTestId("woundWidth1");
    expect(header).toBeInTheDocument();
  });
  it("Discharge Request Wound Information wound depth", () => {
    const data = getDeepClone(defaultDischargeRequestTestData);
    const mockSetState = jest.fn();
    render(
      <WoundInformationDischargeRequest
        dischargeData={data}
        setDischargeData={mockSetState}
        woundInfoDetails={wounds}
      />
    );
    const header = screen.getByTestId("woundDepth1");
    expect(header).toBeInTheDocument();
  });
});
