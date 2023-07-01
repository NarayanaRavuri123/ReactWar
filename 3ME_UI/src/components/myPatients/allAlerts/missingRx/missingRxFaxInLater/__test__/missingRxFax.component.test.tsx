import { MemoryRouter } from "react-router-dom";
import MissingRxFax from "../missingRxFax.component";
import { IPatient } from "../../../../patient.interface";
import { patientMockData } from "../../../../../../mockData/patientFound";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";

describe("Missing RX alert click Open Upload Rx Component->", () => {
  afterAll(() => {
    cleanup();
  });
  it("Validate Fax popup", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <MissingRxFax
          changePopUpSection={() => {}}
          patient={patientMockData as IPatient}
          pdfLink={""}
        ></MissingRxFax>
      </MemoryRouter>
    );
    const header = screen.getByTestId("description-missing-rx-Fax");
    expect(header).toHaveTextContent(
      "An ActiV.A.C.™ order has been submitted for Waters Haley, but a signed Rx has not been received. An ActiV.A.C.™ cannot be released without a signed prescription."
    );
  });
  it("verify Fax from your order Text", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <MissingRxFax
          changePopUpSection={() => {}}
          patient={patientMockData as IPatient}
          pdfLink={""}
        ></MissingRxFax>
      </MemoryRouter>
    );
    const header = screen.getByTestId("descp-text").textContent;
    expect(header).toBe(`Prescription type from your order`);
  });

  it("Validate description print rx button", () => {
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IPatient) => [dt, mockSetState],
    }));
    render(
      <MemoryRouter initialEntries={["/"]}>
        <MissingRxFax
          changePopUpSection={() => {}}
          patient={patientMockData as IPatient}
          pdfLink={""}
        />
      </MemoryRouter>
    );
    const printRxButton = screen.getByTestId("button-printrx-rx");
    expect(printRxButton).toBeInTheDocument();
    expect(printRxButton).toHaveTextContent("Print Rx");
    fireEvent.click(printRxButton);
  });
});
