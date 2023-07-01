import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { getDeepClone } from "../../../../../util/ObjectFunctions";
import { newOrderTestData } from "../../../../newOrder/__test__/newOrder.test.data";
import { PatientFinancialInfo } from "../patientFinancialInfo.component";
import { patientMockData } from "../../../../../mockData/patientFound";
import React from "react";

describe("Order Suppply Detail component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("Patient Financial Label header", () => {
    const data = getDeepClone(newOrderTestData);
    render(
      <MemoryRouter>
        <PatientFinancialInfo
          newOrderData={data}
          patientData={patientMockData}
        />
      </MemoryRouter>
    );
    const pfinheader = screen.getByTestId("patient-fin-info-title");
    expect(pfinheader).toBeInTheDocument();
    expect(pfinheader).toHaveTextContent("Patient Financial Info");
  });
  it("Patient Financial Patient Name", () => {
    const data = getDeepClone(newOrderTestData);
    render(
      <MemoryRouter>
        <PatientFinancialInfo
          newOrderData={data}
          patientData={patientMockData}
        />
      </MemoryRouter>
    );
    const patientfnamelaname = screen.getByTestId("patient-fsname-lname");
    expect(patientfnamelaname).toBeInTheDocument();
    expect(patientfnamelaname).toHaveTextContent("Haley Waters");
  });
  it("Patient Financial Patient Address", () => {
    const data = getDeepClone(newOrderTestData);
    data.state.value = "Jharkhand";
    data.address1.value = "Test Address 1";
    data.city.value = "Ranchi";
    data.zip.value = "12345";
    data.state.value = "ZN";
    render(
      <MemoryRouter>
        <PatientFinancialInfo
          newOrderData={data}
          patientData={patientMockData}
        />
      </MemoryRouter>
    );
    const patientadd1 = screen.getByTestId("patient-address1");
    expect(patientadd1).toBeInTheDocument();
    expect(patientadd1).toHaveTextContent("Test Address 1");
    const completeAddressline = screen.getByTestId("patient-city");
    expect(completeAddressline).toBeInTheDocument();
    expect(completeAddressline).toHaveTextContent("Ranchi, ZN 12345");
  });
  it("Patient Financial Patient Address if state and zip is null", () => {
    const data = getDeepClone(newOrderTestData);
    data.state.value = "Jharkhand";
    data.address1.value = "Test Address 1";
    data.city.value = "Ranchi";
    data.zip.value = "";
    data.state.value = "";
    render(
      <MemoryRouter>
        <PatientFinancialInfo
          newOrderData={data}
          patientData={patientMockData}
        />
      </MemoryRouter>
    );
    const patientadd1 = screen.getByTestId("patient-address1");
    expect(patientadd1).toBeInTheDocument();
    expect(patientadd1).toHaveTextContent("Test Address 1");
    const completeAddressline = screen.getByTestId("patient-city");
    expect(completeAddressline).toBeInTheDocument();
    expect(completeAddressline).toHaveTextContent("Ranchi");
  });
  it("Patient Financial Static Text", () => {
    const data = getDeepClone(newOrderTestData);

    render(
      <MemoryRouter>
        <PatientFinancialInfo
          newOrderData={data}
          patientData={patientMockData}
        />
      </MemoryRouter>
    );
    const static_text = screen.getByTestId("static-text-test-id");
    expect(static_text).toBeInTheDocument();
    expect(static_text).toHaveTextContent(
      "As your partner in healing, 3M Medical Solutions will bill your primary insurance carrier directly for the time you are using the 3M V.A.C.® Therapy equipment rental and supplies. The amount shown is only an estimate based on information initially verified with your primary insurance for negative pressure wound therapy (V.A.C.® Therapy). If secondary coverage is available, your estimated cost may be reduced once we have received final payment(s) from your insurance carriers. We encourage you to contact your insurance carrier(s) for any questions regarding specific coverage and potential charges."
    );
  });
});
