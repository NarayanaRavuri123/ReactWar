import { cleanup, render, screen } from "@testing-library/react";
import {
  defaultPatientData,
  defaultVACProdcutInfo,
} from "../../../../../mockData/patientInfo";
import { getDeepClone } from "../../../../../util/ObjectFunctions";
import PatientDetailReviewOrder from "../patientDetailReviewOrder.component";

describe("Patient Detail review order component", () => {
  afterAll(() => {
    cleanup();
  });

  it("Patient VAC Detail validate patient name", () => {
    const patient = getDeepClone(defaultPatientData);
    const vacProductInfo = getDeepClone(defaultVACProdcutInfo);
    render(
      <PatientDetailReviewOrder
        patient={patient}
        vacProductInfo={vacProductInfo}
      />
    );
    const title = screen.getByTestId("patient-name");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Cobb, Liana");
    const titl2 = screen.getByTestId("patient-dob");
    expect(titl2).toBeInTheDocument();
    expect(titl2).toHaveTextContent("10/30/1982");
    const title3 = screen.getByTestId("device-descriptiopn");
    expect(title3).toBeInTheDocument();
    expect(title3).toHaveTextContent("ActiV.A.C.™ Therapy System");
  });
});
