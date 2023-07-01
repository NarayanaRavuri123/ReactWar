import { PatientDetails } from "../patientDetails.component";
import { cleanup, render, screen } from "@testing-library/react";
import { getDeepClone } from "../../../../../util/ObjectFunctions";
import { patientMockData } from "../../../../../mockData/patientFound";

describe("Patient Details component ->", () => {
  afterAll(() => {
    cleanup();
  });

  it("Check Patient Name", () => {
    const patient = getDeepClone(patientMockData);
    render(<PatientDetails patient={patient} />);
    const title = screen.getByTestId("patient-name");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Haley Waters");
  });

  it("Check Patient Date of Birth", () => {
    const patient = getDeepClone(patientMockData);
    render(<PatientDetails patient={patient} />);
    const component = screen.getByTestId("date-of-birth");
    expect(component).toBeInTheDocument();
    const title = screen.getByTestId("patient-details-title-dob");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Date of Birth");
    const value = screen.getByTestId("patient-details-value-dob");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("06/07/1959");
  });

  it("Check Patient Rental Order", () => {
    const patient = getDeepClone(patientMockData);
    render(<PatientDetails patient={patient} />);
    const component = screen.getByTestId("rental-order");
    expect(component).toBeInTheDocument();
    const title = screen.getByTestId("patient-details-title-ro-number");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Rental Order #");
    const value = screen.getByTestId("patient-details-value-ro-number");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("123");
  });

  it("Check Patient Product Name ", () => {
    const patient = getDeepClone(patientMockData);
    render(<PatientDetails patient={patient} />);
    const component = screen.getByTestId("product-name");
    expect(component).toBeInTheDocument();
    const title = screen.getByTestId("patient-details-title-product-name");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Product");
    const value = screen.getByTestId("patient-details-value-product-name");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("3M VAC Device");
  });

  it("Check Patient Placement Date", () => {
    const patient = getDeepClone(patientMockData);
    render(<PatientDetails patient={patient} />);
    const component = screen.getByTestId("placement-date");
    expect(component).toBeInTheDocument();
    const title = screen.getByTestId("patient-details-title-placement-date");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Placement Date");
    const value = screen.getByTestId("patient-details-value-placement-date");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("06/07/2020");
  });
});
