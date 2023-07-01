import { MemoryRouter } from "react-router-dom";
import { cleanup, render, screen } from "@testing-library/react";
import { ProofOfDeliveryNeeded } from "../proofOfDeliveryNeeded.component";
import { IPatient } from "../../../patient.interface";

describe("ProofOfDeliveryNeeded component ->", () => {
  afterAll(() => {
    cleanup();
  });
  const testData: IPatient = {
    roNumber: 1,
    firstName: "John",
    lastName: "Doe",
    dob: "1990-01-01",
    facilityName: "Example Facility",
    orderCreationDate: "2023-05-30",
    alerts: [],
    status: "Active",
    color: "green",
    statusColor: "success",
    orderID: "12345",
    productName: "Example Product",
    placementDate: "2023-05-31",
    productSerialNumber: "ABCDE12345",
    menuActions: [],
    sharedStatus: "",
    woundOrderID: null,
    workOrderNumber: null,
    siteUseId: "site123",
    careGiverId: "caregiver123",
  };

  it("ProofOfDeliveryNeeded Header is there on UI", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ProofOfDeliveryNeeded patient={testData} closePopUpAction={() => {}} />
      </MemoryRouter>
    );
    const header = screen.getByTestId(
      "proof-delivery-needed-header-title"
    ).textContent;
    expect(header).toBe("Proof of Delivery Needed");
  });

  it("ProofOfDeliveryNeeded Body elmenets are there on UI", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ProofOfDeliveryNeeded patient={testData} closePopUpAction={() => {}} />
      </MemoryRouter>
    );
    const bodyTitle = screen.getByTestId("alert-body-title").textContent;
    expect(bodyTitle).toBe(
      "Proof of Delivery (POD) needs to be signed for therapy to begin."
    );
    const description = screen.getByTestId(
      "alert-body-description"
    ).textContent;
    expect(description).toBe("For assistance, please call 3M at");
    const phoneNumber = screen.getByTestId(
      "alert-body-phone-value"
    ).textContent;
    expect(phoneNumber).toBe("(800) 275-4524");
  });

  it("ProofOfDeliveryNeeded Print Excessive Supply Form Button is there on UI", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ProofOfDeliveryNeeded patient={testData} closePopUpAction={() => {}} />
      </MemoryRouter>
    );
    const printButton = screen.getByTestId("alert-footer-outlined-button");
    expect(printButton).toHaveTextContent("Reprint POD");
  });
});
