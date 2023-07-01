import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SubmittedDocumentGridView from "../submittedDocumentGridView.component";
import { SubmittedDocumentMockData } from "../../../../../../../mockData/submittedDocumentMockData";
import { getDeepClone } from "../../../../../../../util/ObjectFunctions";

describe("OrderSubmitted List View ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("OrderSubmittedGridView FileIcon", () => {
    const data = getDeepClone(SubmittedDocumentMockData);

    render(
      <MemoryRouter>
        <SubmittedDocumentGridView
          documentsData={data}
          clickToOpentheDocument={() => {}}
        />
      </MemoryRouter>
    );
    const fileIconPresent = screen.getByTitle("file-icon");
    expect(fileIconPresent).toBeInTheDocument();
  });
  it("OrderSubmittedGridView FileIcon Text", () => {
    const data = getDeepClone(SubmittedDocumentMockData);
    render(
      <MemoryRouter>
        <SubmittedDocumentGridView
          documentsData={data}
          clickToOpentheDocument={() => {}}
        />
      </MemoryRouter>
    );
    const fileIconTextPresent = screen.getByTestId("file-icon-text");
    expect(fileIconTextPresent).toBeInTheDocument();
  });
  it("OrderSubmittedGridView Header fileName", () => {
    const data = getDeepClone(SubmittedDocumentMockData);
    render(
      <MemoryRouter>
        <SubmittedDocumentGridView
          documentsData={data}
          clickToOpentheDocument={() => {}}
        />
      </MemoryRouter>
    );
    const fileIconNameTitle = screen.getByTestId("document-name-title");
    expect(fileIconNameTitle).toBeInTheDocument();
  });
  it("OrderSubmittedGridView FileName value", () => {
    const data = getDeepClone(SubmittedDocumentMockData);

    render(
      <MemoryRouter>
        <SubmittedDocumentGridView
          documentsData={data}
          clickToOpentheDocument={() => {}}
        />
      </MemoryRouter>
    );
    const fileValue = screen.getByTestId("document-name-title-value");
    expect(fileValue).toBeInTheDocument();
  });
  it("OrderSubmittedGridView DocType Heading", () => {
    const data = getDeepClone(SubmittedDocumentMockData);

    render(
      <MemoryRouter>
        <SubmittedDocumentGridView
          documentsData={data}
          clickToOpentheDocument={() => {}}
        />
      </MemoryRouter>
    );
    const docType = screen.getByTestId("doc-type-title");
    expect(docType).toBeInTheDocument();
  });
  it("OrderSubmittedGridView DocType value", () => {
    const data = getDeepClone(SubmittedDocumentMockData);

    render(
      <MemoryRouter>
        <SubmittedDocumentGridView
          documentsData={data}
          clickToOpentheDocument={() => {}}
        />
      </MemoryRouter>
    );
    const docTypeValue = screen.getByTestId("doc-type-value");
    expect(docTypeValue).toBeInTheDocument();
  });
  it("OrderSubmittedGridView Submitted Date Heading", () => {
    const data = getDeepClone(SubmittedDocumentMockData);

    render(
      <MemoryRouter>
        <SubmittedDocumentGridView
          documentsData={data}
          clickToOpentheDocument={() => {}}
        />
      </MemoryRouter>
    );
    const dateSubmittedHeading = screen.getByTestId("doc-submitted-date-title");
    expect(dateSubmittedHeading).toBeInTheDocument();
  });
  it("OrderSubmittedGridView SubmittedDate value", () => {
    const data = getDeepClone(SubmittedDocumentMockData);

    render(
      <MemoryRouter>
        <SubmittedDocumentGridView
          documentsData={data}
          clickToOpentheDocument={() => {}}
        />
      </MemoryRouter>
    );
    const dateSubmittedValue = screen.getByTestId("doc-submitted-date-value");
    expect(dateSubmittedValue).toBeInTheDocument();
  });
});
