import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MissingRxUpload from "../missingRxUpload.component";
import { MissingRxUploadSuccess } from "../../missingRxUploadSuccess/missingRxUploadSuccess.component";
import React from "react";
import { patientMockData } from "../../../../../../mockData/patientFound";

describe("Missing RX alert click Open Upload Rx Component->", () => {
  afterAll(() => {
    cleanup();
  });
  it("Validate Rx upload popup", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <MissingRxUpload
          changePopUpSection={() => {}}
          patientData={patientMockData}
          pdfLink={""}
        ></MissingRxUpload>
      </MemoryRouter>
    );
    const header = screen.getByTestId("description-missing-rx").textContent;
    expect(header).toBe(
      `An ActiV.A.C.™ order has been submitted for Waters Haley, but a signed Rx has not been received. An ActiV.A.C.™ cannot be released without a signed prescription.`
    );
  });
  it("verify Rx upload type from your order Text", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <MissingRxUpload
          changePopUpSection={() => {}}
          patientData={patientMockData}
          pdfLink={""}
        ></MissingRxUpload>
      </MemoryRouter>
    );
    const header = screen.getByTestId("desp-text").textContent;
    expect(header).toBe(`Prescription type from your order`);
  });
  it("verify Change Rx upload type Text", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <MissingRxUpload
          changePopUpSection={() => {}}
          patientData={patientMockData}
          pdfLink={""}
        ></MissingRxUpload>
      </MemoryRouter>
    );
    const header = screen.getByTestId("desp-link").textContent;
    expect(header).toBe(`Change prescription type`);
  });
  it("verify upload doc mandate notes", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <MissingRxUpload
          changePopUpSection={() => {}}
          patientData={patientMockData}
          pdfLink={""}
        ></MissingRxUpload>
      </MemoryRouter>
    );
    const header = screen.getByTestId("title-msg").textContent;
    expect(header).toContain(
      `A prescription signed and dated by the prescriber is required for all orders`
    );
  });
  it("verify success modal for Rx Upload", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <MissingRxUploadSuccess
          closePopUpAction={() => {}}
        ></MissingRxUploadSuccess>
      </MemoryRouter>
    );
    const header = screen.getByTestId("successRxUploadDoneBtn").textContent;
    expect(header).toBe(`Done`);
  });
});
