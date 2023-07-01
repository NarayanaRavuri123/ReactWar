import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { getDeepClone } from "../../../../../util/ObjectFunctions";
import { newOrderTestData } from "../../../../newOrder/__test__/newOrder.test.data";
import { PatientFinancialResponsbility } from "../patientFinancialResponsbility.component";
import { patientMockData } from "../../../../../mockData/patientFound";

describe("Order Suppply Detail component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("Patient Financial Label header", () => {
    const data = getDeepClone(newOrderTestData);
    render(
      <MemoryRouter>
        <PatientFinancialResponsbility
          newOrderData={data}
          patientData={patientMockData}
        />
      </MemoryRouter>
    );
    const pfinheader = screen.getByTestId("fin-responsbility-header-main");
    expect(pfinheader).toBeInTheDocument();
    expect(pfinheader).toHaveTextContent("Patient Financial Responsibility");
  });
  it("Patient Financial section header", () => {
    const data = getDeepClone(newOrderTestData);
    render(
      <MemoryRouter>
        <PatientFinancialResponsbility
          newOrderData={data}
          patientData={patientMockData}
        />
      </MemoryRouter>
    );
    const patientfnamelaname = screen.getByTestId("payer-responsbility");
    expect(patientfnamelaname).toBeInTheDocument();
    expect(patientfnamelaname).toHaveTextContent("Payer Responsibility");
  });
  it("Patient Financial section header sub content 1", () => {
    const data = getDeepClone(newOrderTestData);
    render(
      <MemoryRouter>
        <PatientFinancialResponsbility
          newOrderData={data}
          patientData={patientMockData}
        />
      </MemoryRouter>
    );
    const patientfnamelaname = screen.getByTestId("out-of-pkt-max");
    expect(patientfnamelaname).toBeInTheDocument();
    expect(patientfnamelaname).toHaveTextContent("Out of Pocket Max");
  });
  it("Patient Financial section header sub content 2", () => {
    const data = getDeepClone(newOrderTestData);
    render(
      <MemoryRouter>
        <PatientFinancialResponsbility
          newOrderData={data}
          patientData={patientMockData}
        />
      </MemoryRouter>
    );
    const patientfnamelaname = screen.getByTestId("co-pay-tst-id");
    expect(patientfnamelaname).toBeInTheDocument();
    expect(patientfnamelaname).toHaveTextContent("Co-Pay");
  });
});
