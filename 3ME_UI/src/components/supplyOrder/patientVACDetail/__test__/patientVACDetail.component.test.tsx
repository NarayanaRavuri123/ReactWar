import { MemoryRouter } from "react-router-dom";
import { ISupplyOrder } from "../../supplyOrder.interface";
import { cleanup, render, screen } from "@testing-library/react";
import { getDeepClone } from "../../../../util/ObjectFunctions";
import { PatientVACDetail } from "../patientVACDetail.component";
import {
  defaultPatientData,
  defaultVACProdcutInfo,
} from "../../../../mockData/patientInfo";
import { supplyOrderTestData } from "../../__test__/supplyOrder.test.data";

describe("Patient VAC Detail component ->", () => {
  afterAll(() => {
    cleanup();
  });

  it("Patient VAC Detail validate patient name", () => {
    const data = getDeepClone(supplyOrderTestData);
    const patient = getDeepClone(defaultPatientData);
    const vacProductInfo = getDeepClone(defaultVACProdcutInfo);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: ISupplyOrder) => [dt, mockSetState],
    }));
    render(
      <MemoryRouter initialEntries={["/"]}>
        <PatientVACDetail
          data={data}
          patient={patient}
          setData={mockSetState}
          vacProductInfo={vacProductInfo}
          isReviewOrder={false}
        />
      </MemoryRouter>
    );
    const title = screen.getByTestId("patient-name");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Cobb, Liana");
  });

  it("Patient VAC Detail validate patient date of birth", () => {
    const data = getDeepClone(supplyOrderTestData);
    const patient = getDeepClone(defaultPatientData);
    const vacProductInfo = getDeepClone(defaultVACProdcutInfo);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: ISupplyOrder) => [dt, mockSetState],
    }));
    render(
      <MemoryRouter initialEntries={["/"]}>
        <PatientVACDetail
          data={data}
          patient={patient}
          setData={mockSetState}
          vacProductInfo={vacProductInfo}
          isReviewOrder={false}
        />
      </MemoryRouter>
    );
    const title = screen.getByTestId("patient-dob");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("DOB: 10/30/1982");
  });

  it("Patient VAC Detail validate type of order", () => {
    const data = getDeepClone(supplyOrderTestData);
    const patient = getDeepClone(defaultPatientData);
    const vacProductInfo = getDeepClone(defaultVACProdcutInfo);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: ISupplyOrder) => [dt, mockSetState],
    }));
    data.typeOfOrder.value = "Yes";
    render(
      <MemoryRouter initialEntries={["/"]}>
        <PatientVACDetail
          data={data}
          patient={patient}
          setData={mockSetState}
          vacProductInfo={vacProductInfo}
          isReviewOrder={false}
        />
      </MemoryRouter>
    );
    const title = screen.getByTestId("patient-vac-details-type-of-order");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Type of Order");
    const yesBtn = screen.getByTestId("patient-vac-details-type-of-order-yes");
    expect(yesBtn).toBeInTheDocument();
    const noBtn = screen.getByTestId("patient-vac-details-type-of-order-no");
    expect(noBtn).toBeInTheDocument();
  });
});
