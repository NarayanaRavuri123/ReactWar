import { cleanup, render, screen } from "@testing-library/react";
import { PatientAdmissionInfo } from "../patientAdmissionInfo.component";
import { defaultDischargeRequestTestData } from "../../../dischargeRequest/__test__/dischargeRequest.test.data";

describe("PatientAdmissionInfo", () => {
  afterAll(() => {
    cleanup();
  });
  it("Patient Admission Info validate Title", () => {
    render(
      <PatientAdmissionInfo
        dischargeData={defaultDischargeRequestTestData}
        setDischargeData={() => {}}
      />
    );
    const title = screen.getByTestId("patientadmissioninfo-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(
      "Please provide information about the patient's admission"
    );
  });
  it("Patient Admission Info component validate for select yes", () => {
    render(
      <PatientAdmissionInfo
        dischargeData={defaultDischargeRequestTestData}
        setDischargeData={() => {}}
      />
    );
    const title = screen.getByTestId("patientadmissioninfo-type");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(
      "Was this a first admission or a readmission?*"
    );
    const yesButton = screen.getByTestId(
      "patientadmissioninfo-type-yes"
    ) as HTMLBaseElement;
    expect(yesButton).toBeInTheDocument();
  });
  it("Patient Admission Info component validate for select no", () => {
    render(
      <PatientAdmissionInfo
        dischargeData={defaultDischargeRequestTestData}
        setDischargeData={() => {}}
      />
    );
    const title = screen.getByTestId("patientadmissioninfo-type");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(
      "Was this a first admission or a readmission?*"
    );
    const noButton = screen.getByTestId(
      "patientadmissioninfo-type-no"
    ) as HTMLBaseElement;
    expect(noButton).toBeInTheDocument();
  });
  
});
