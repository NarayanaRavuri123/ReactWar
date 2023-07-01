import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import OrderOverviewSubmittedDocuments from "../orderOverviewSubmittedDocument.component";

describe("OrderOverview Submitted Documents ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("OrderSubmitted Header", () => {
    render(
      <MemoryRouter>
        <OrderOverviewSubmittedDocuments
          documentsData={[]}
          documentTypeCode={undefined}
        />
      </MemoryRouter>
    );
    const orderSubmittedDocumentsMock = screen.getByTestId(
      "submitted-documents-info-title"
    );
    expect(orderSubmittedDocumentsMock).toBeInTheDocument();
  });
  it("OrderSubmitted ListViewButton", () => {
    render(
      <MemoryRouter>
        <OrderOverviewSubmittedDocuments
          documentsData={[]}
          documentTypeCode={undefined}
        />
      </MemoryRouter>
    );
    const orderSubmittedDocumentsMock = screen.getByTestId("list-view-button");
    expect(orderSubmittedDocumentsMock).toBeInTheDocument();
  });
  it("OrderSubmitted GridViewButton", () => {
    render(
      <MemoryRouter>
        <OrderOverviewSubmittedDocuments
          documentsData={[]}
          documentTypeCode={undefined}
        />
      </MemoryRouter>
    );
    const orderSubmittedDocumentsMock = screen.getByTestId("grid-view-button");
    expect(orderSubmittedDocumentsMock).toBeInTheDocument();
  });
  it("OrderSubmitted Content", () => {
    render(
      <MemoryRouter>
        <OrderOverviewSubmittedDocuments
          documentsData={[]}
          documentTypeCode={undefined}
        />
      </MemoryRouter>
    );
    const orderSubmittedDocumentsMock = screen.getByTestId(
      "submitted-documents-content-text"
    );
    expect(orderSubmittedDocumentsMock).toBeInTheDocument();
  });
});
