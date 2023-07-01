import { cleanup, render } from "@testing-library/react";
import { AddPatientContainer } from "../addPatientContainer.component";
import { PageSection } from "../addPatientContainer.enum";

describe("Add Patient Container component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("if patient is not found page, PatientNotFound component should be there", () => {
    render(<AddPatientContainer defaultPageSection={PageSection.NOT_FOUND} />);
    const val = document.querySelector(".patient-not-found");
    expect(val?.textContent).toContain("Patient Not Found");
  });
  it("default should be search form", () => {
    render(<AddPatientContainer />);
    const val = document.querySelector(".addPatient");
    expect(val?.textContent).toBe("Add Patient");
  });
});
