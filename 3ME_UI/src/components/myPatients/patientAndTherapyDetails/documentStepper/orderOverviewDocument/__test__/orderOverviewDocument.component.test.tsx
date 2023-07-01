import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import OrderOverviewDocument from "../orderOverviewDocument.components";
import { patientMockData } from "../../../../../../mockData/patientFound";
import { any } from "underscore";
import userEvent from "@testing-library/user-event";
import { OrderDetailContext } from "../../../../../../context/OrderDetailsContext";
import { getMockOrderDetailContextData } from "../../../orderDetailsTracking/__test__/mockOrderDetailContext";

describe("Order Overview Document component ->", () => {
  afterAll(() => {
    cleanup();
  });

  it("Order Overview Document header", () => {
    render(
      <OrderDetailContext.Provider
        value={{
          ...getMockOrderDetailContextData(),
        }}
      >
        <MemoryRouter initialEntries={["/home/orderOverviewDocument"]}>
          <OrderOverviewDocument
            selectedPatientData={patientMockData}
            printableDocumentsLink={any}
            commonDocs={undefined}
            commonDocsText={undefined}
            pdfUrl={undefined}
            alertsForRO={patientMockData}
          />
        </MemoryRouter>
      </OrderDetailContext.Provider>
    );
    const header = screen.getByTestId("documentAlert-header");
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent("Missing Documents");
  });
  it("Order Overview Document title", () => {
    render(
      <OrderDetailContext.Provider
        value={{
          ...getMockOrderDetailContextData(),
        }}
      >
        <MemoryRouter initialEntries={["/home/orderOverviewDocument"]}>
          <OrderOverviewDocument
            selectedPatientData={patientMockData}
            printableDocumentsLink={any}
            commonDocs={undefined}
            commonDocsText={undefined}
            pdfUrl={undefined}
          />
        </MemoryRouter>
      </OrderDetailContext.Provider>
    );
    const header = screen.getByTestId("printDoc-title");
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent("Print/Download Common Documents");
  });
  it("Order Overview Document delay reason", () => {
    render(
      <OrderDetailContext.Provider
        value={{
          ...getMockOrderDetailContextData(),
        }}
      >
        <MemoryRouter initialEntries={["/home/orderOverviewDocument"]}>
          <OrderOverviewDocument
            selectedPatientData={patientMockData}
            printableDocumentsLink={any}
            commonDocs={undefined}
            commonDocsText={undefined}
            pdfUrl={undefined}
          />
        </MemoryRouter>
      </OrderDetailContext.Provider>
    );
    const header = screen.getByTestId("orderoverview-doc");
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent(
      "download.svgDownload & Print Fax Cover Sheet"
    );
  });

  it("Order Overview Document delay reason", () => {
    render(
      <OrderDetailContext.Provider
        value={{
          ...getMockOrderDetailContextData(),
        }}
      >
        <MemoryRouter initialEntries={["/home/orderOverviewDocument"]}>
          <OrderOverviewDocument
            selectedPatientData={patientMockData}
            printableDocumentsLink={any}
            commonDocs={undefined}
            commonDocsText={undefined}
            pdfUrl={undefined}
            alertsForRO={patientMockData}
          />
        </MemoryRouter>
      </OrderDetailContext.Provider>
    );
    const header = screen.getByTestId("delay-reason-and-details-text");
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent("missing doc for wound");
  });
  it("Order Overview Download and Print Cover sheet validation ", () => {
    const mockDownloadBtnAction = jest.fn();
    render(
      <OrderDetailContext.Provider
        value={{
          ...getMockOrderDetailContextData(),
        }}
      >
        <MemoryRouter initialEntries={["/home/orderOverviewDocument"]}>
          <OrderOverviewDocument
            selectedPatientData={patientMockData}
            printableDocumentsLink={any}
            commonDocs={undefined}
            commonDocsText={undefined}
            pdfUrl={undefined}
            downloadBtnAction={mockDownloadBtnAction}
          />
        </MemoryRouter>
      </OrderDetailContext.Provider>
    );
    const downloadBtn = screen.getByTestId("downlod-print-fax-cover-sheet");
    expect(downloadBtn).toBeInTheDocument();
    expect(downloadBtn).toHaveTextContent("Download & Print Fax Cover Sheet");
    userEvent.click(downloadBtn);
    expect(mockDownloadBtnAction).toBeCalledTimes(1);
  });
});
