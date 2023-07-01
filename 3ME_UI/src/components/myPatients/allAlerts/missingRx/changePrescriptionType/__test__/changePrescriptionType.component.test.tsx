import { MemoryRouter } from "react-router-dom";
import { IPatient } from "../../../../patient.interface";
import {
  IPrescriberDetailInterface,
  defaultPrescriberDetail,
} from "../../missingRxEPrescription/prescriberDetail.interface";
import ChangePrescriptionType from "../changePrescriptionType.component";
import { patientMockData } from "../../../../../../mockData/patientFound";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";

describe("Missing RX alert click Open Change Prescription Component->", () => {
  afterAll(() => {
    cleanup();
  });
  const data: IPrescriberDetailInterface = defaultPrescriberDetail;
  it("Validate Change prescription popup", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ChangePrescriptionType
          changePopUpSection={() => {}}
          closePopUpAction={() => {}}
          patientData={patientMockData as IPatient}
          pdfLink={""}
          prescriberDetails={data}
          showErrorMessage={false}
          selectedPrescription={""}
          setPrescriberDetails={() => {}}
        ></ChangePrescriptionType>
      </MemoryRouter>
    );
    const header = screen.getByTestId("change-prescription").textContent;
    expect(header).toBe(
      "An ActiV.A.C.™ order has been submitted for waters haley, but a signed Rx has not been received. An ActiV.A.C.™ cannot be released without a signed prescription."
    );
  });
  it("verify upload doc mandate notes", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ChangePrescriptionType
          changePopUpSection={() => {}}
          closePopUpAction={() => {}}
          patientData={patientMockData as IPatient}
          pdfLink={""}
          prescriberDetails={data}
          showErrorMessage={false}
          selectedPrescription={""}
          setPrescriberDetails={() => {}}
        ></ChangePrescriptionType>
      </MemoryRouter>
    );
    const header = screen.getByTestId("changePres-title-msg").textContent;
    expect(header).toContain(
      `A prescription signed and dated by the prescriber is required for all orders`
    );
  });
  it("Validate description print rx button", () => {
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IPatient) => [dt, mockSetState],
    }));
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ChangePrescriptionType
          changePopUpSection={() => {}}
          closePopUpAction={() => {}}
          patientData={patientMockData as IPatient}
          pdfLink={""}
          prescriberDetails={data}
          showErrorMessage={false}
          selectedPrescription={""}
          setPrescriberDetails={() => {}}
        />
      </MemoryRouter>
    );
    const printRxButton = screen.getByTestId(
      "button-printrx-change-prescription-rx"
    );
    expect(printRxButton).toBeInTheDocument();
    expect(printRxButton).toHaveTextContent("Print Rx");
    fireEvent.click(printRxButton);
  });
  it("Validate Cancel button in Change Prescription Pop Up", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ChangePrescriptionType
          changePopUpSection={() => {}}
          closePopUpAction={() => {}}
          patientData={patientMockData as IPatient}
          pdfLink={""}
          prescriberDetails={data}
          showErrorMessage={false}
          selectedPrescription={""}
          setPrescriberDetails={() => {}}
        />
      </MemoryRouter>
    );
    const cancelBtn = screen.getByTestId("cancelBtnTest");
    expect(cancelBtn).toBeInTheDocument();
    expect(cancelBtn).toHaveTextContent("Cancel");
    fireEvent.click(cancelBtn);
  });
  it("Validate Submit button in Change Prescription Pop Up", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ChangePrescriptionType
          changePopUpSection={() => {}}
          closePopUpAction={() => {}}
          patientData={patientMockData as IPatient}
          pdfLink={""}
          prescriberDetails={data}
          showErrorMessage={false}
          selectedPrescription={""}
          setPrescriberDetails={() => {}}
        />
      </MemoryRouter>
    );
    const submitBtn = screen.getByTestId("submitBtnTest");
    expect(submitBtn).toBeInTheDocument();
    expect(submitBtn).toHaveTextContent("Submit");
    expect(submitBtn).toBeDisabled();
    fireEvent.click(submitBtn);
  });
});
