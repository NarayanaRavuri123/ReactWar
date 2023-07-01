import { cleanup, render, screen } from "@testing-library/react";
import { AdmissionFacilityType } from "../admissionFacilityType.component";
import { defaultDischargeRequestTestData } from "../../../dischargeRequest/__test__/dischargeRequest.test.data";

describe("AdmissionFacilityType", () => {
  afterAll(() => {
    cleanup();
  });
  
  it("Admission facility type validate facility type drop-down", () => {
    render(
      <AdmissionFacilityType
        dischargeData={defaultDischargeRequestTestData}
        setDischargeData={() => {}}
      />
    );
    const title = screen.getByTestId("test-facilitytype");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Facility type admitted to");
    const dropDown = screen.getByTestId("facilitytype-DropDown");
    expect(dropDown).toBeInTheDocument();
  });
  it("Admission facility type validate facility name textbox", () => {
    render(
      <AdmissionFacilityType
        dischargeData={defaultDischargeRequestTestData}
        setDischargeData={() => {}}
      />
    );
    const title = screen.getByTestId("facility-name-label");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Facility name");
    const textbox = screen.getByTestId("facility-name-value");
    expect(textbox).toBeInTheDocument();
  });
  
});
