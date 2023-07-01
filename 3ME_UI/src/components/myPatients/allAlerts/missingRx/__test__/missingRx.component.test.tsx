import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { patientMockData } from "../../../../../mockData/patientFound";
import MissingRxEPrescription from "../missingRxEPrescription/missingRxEPrescription.component";
import { defaultPrescriberDetail } from "../missingRxEPrescription/prescriberDetail.interface";
import MissingRxPrescriptionSent from "../missingRxPrescriptionSent/missingRxPrescriptionSent.component";

describe("Missing RX alert click ->", () => {
  afterAll(() => {
    cleanup();
  });

  it("resend Prescription popup", () => {
    let prescriberDetails = defaultPrescriberDetail;
    render(
      <MemoryRouter initialEntries={["/"]}>
        <MissingRxEPrescription
          changePopUpSection={() => {}}
          closePopUpAction={() => {}}
          patientData={patientMockData}
          prescriberDetails={prescriberDetails}
          showErrorMessage={false}
          setPrescriberDetails={() => {}}
        ></MissingRxEPrescription>
      </MemoryRouter>
    );
    const header = screen.getByTestId("description-missing-rx").textContent;
    expect(header).toBe(
      `An ActiV.A.C.™ order has been submitted for Waters Haley, but a signed Rx has not been received. An ActiV.A.C.™ cannot be released without a signed prescription.`
    );
  });

  it("verify Prescription type from your order Text", () => {
    let prescriberDetails = defaultPrescriberDetail;
    render(
      <MemoryRouter initialEntries={["/"]}>
        <MissingRxEPrescription
          changePopUpSection={() => {}}
          closePopUpAction={() => {}}
          patientData={patientMockData}
          prescriberDetails={prescriberDetails}
          showErrorMessage={false}
          setPrescriberDetails={() => {}}
        ></MissingRxEPrescription>
      </MemoryRouter>
    );
    const header = screen.getByTestId("desp-text").textContent;
    expect(header).toBe(`Prescription type from your order`);
  });
  it("verify Change prescription type Text", () => {
    let prescriberDetails = defaultPrescriberDetail;
    render(
      <MemoryRouter initialEntries={["/"]}>
        <MissingRxEPrescription
          changePopUpSection={() => {}}
          closePopUpAction={() => {}}
          patientData={patientMockData}
          prescriberDetails={prescriberDetails}
          showErrorMessage={false}
          setPrescriberDetails={() => {}}
        ></MissingRxEPrescription>
      </MemoryRouter>
    );
    const header = screen.getByTestId("desp-link").textContent;
    expect(header).toBe(`Change prescription type`);
  });
  it("verifyA DocuSign email was originally sent to the following prescriber: Text", () => {
    let prescriberDetails = defaultPrescriberDetail;
    render(
      <MemoryRouter initialEntries={["/"]}>
        <MissingRxEPrescription
          changePopUpSection={() => {}}
          closePopUpAction={() => {}}
          patientData={patientMockData}
          prescriberDetails={prescriberDetails}
          showErrorMessage={false}
          setPrescriberDetails={() => {}}
        ></MissingRxEPrescription>
      </MemoryRouter>
    );
    const header = screen.getByTestId("title-msg").textContent;
    expect(header).toBe(
      `A DocuSign email was originally sent to the following prescriber:`
    );
  });
  it("verify success prescription sent popup", () => {
    let prescriberDetails = defaultPrescriberDetail;
    render(
      <MemoryRouter initialEntries={["/"]}>
        <MissingRxPrescriptionSent
          prescriberDetails={prescriberDetails}
          closePopUpAction={() => {}}
          setPrescriberDetails={() => {}}
        ></MissingRxPrescriptionSent>
      </MemoryRouter>
    );
    const header = screen.getByTestId("pres-name").textContent;
    expect(header).toBe(`Prescriber Name`);
  });
  it("verify pres sent email address", () => {
    let prescriberDetails = defaultPrescriberDetail;
    render(
      <MemoryRouter initialEntries={["/"]}>
        <MissingRxPrescriptionSent
          prescriberDetails={prescriberDetails}
          closePopUpAction={() => {}}
          setPrescriberDetails={() => {}}
        ></MissingRxPrescriptionSent>
      </MemoryRouter>
    );
    const header = screen.getByTestId("email-infoid").textContent;
    expect(header).toBe(
      `You will receive an email once the e-prescription has been signed`
    );
  });
});
