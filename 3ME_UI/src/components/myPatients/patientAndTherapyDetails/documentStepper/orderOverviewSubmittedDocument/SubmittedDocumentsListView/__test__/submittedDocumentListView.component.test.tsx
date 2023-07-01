import { cleanup, getByTitle, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SubmitDocumentListView from "../../SubmittedDocumentsListView/submittedDocumentListView.component";
import { SubmittedDocumentMockData } from "../../../../../../../mockData/submittedDocumentMockData";
import { getDeepClone } from "../../../../../../../util/ObjectFunctions";
import FileIcon from "../../../../../../../assets/empty_File_Icon.svg";

describe("OrderSubmitted List View ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("OrderSubmittedListView FileIcon", () => {
    const data = getDeepClone(SubmittedDocumentMockData);
    render(
      <MemoryRouter>
        <SubmitDocumentListView
          documentsData={data}
          documentTypeCode={undefined}
          clickToOpentheDocument={() => {}}
        />
      </MemoryRouter>
    );
    const fileIconPresent = screen.getByTitle("file-icon");
    expect(fileIconPresent).toBeInTheDocument();
  });
  it("OrderSubmittedListView FileIcon Text", () => {
    const data = getDeepClone(SubmittedDocumentMockData);
    render(
      <MemoryRouter>
        <SubmitDocumentListView
          documentsData={data}
          documentTypeCode={undefined}
          clickToOpentheDocument={() => {}}
        />
      </MemoryRouter>
    );
    const fileIconPresent = screen.getByTestId("file-icon-text-list-view");
    expect(fileIconPresent).toBeInTheDocument();
  });
  it("OrderSubmittedListView Header fileName", () => {
    const data = getDeepClone(SubmittedDocumentMockData);
    render(
      <MemoryRouter>
        <SubmitDocumentListView
          documentsData={data}
          documentTypeCode={undefined}
          clickToOpentheDocument={() => {}}
        />
      </MemoryRouter>
    );
    const fileIconPresent = screen.getByTestId(
      "submitted-document-heading-fileName"
    );
    expect(fileIconPresent).toBeInTheDocument();
  });
  it("OrderSubmittedListView FileName value", () => {
    const data = getDeepClone(SubmittedDocumentMockData);
    render(
      <MemoryRouter>
        <SubmitDocumentListView
          documentsData={data}
          documentTypeCode={undefined}
          clickToOpentheDocument={() => {}}
        />
      </MemoryRouter>
    );
    const fileIconPresent = screen.getByTestId(
      "submitted-document-file-name-value"
    );
    expect(fileIconPresent).toBeInTheDocument();
  });
  it("OrderSubmittedListView DocType Heading", () => {
    const data = getDeepClone(SubmittedDocumentMockData);
    render(
      <MemoryRouter>
        <SubmitDocumentListView
          documentsData={data}
          documentTypeCode={undefined}
          clickToOpentheDocument={() => {}}
        />
      </MemoryRouter>
    );
    const fileIconPresent = screen.getByTestId(
      "submitted-document-heading-doc-type"
    );
    expect(fileIconPresent).toBeInTheDocument();
  });
  it("OrderSubmittedListView DocType value", () => {
    const data = getDeepClone(SubmittedDocumentMockData);
    render(
      <MemoryRouter>
        <SubmitDocumentListView
          documentsData={data}
          documentTypeCode={undefined}
          clickToOpentheDocument={() => {}}
        />
      </MemoryRouter>
    );
    const fileIconPresent = screen.getByTestId(
      "submitted-document-heading-doc-type-value"
    );
    expect(fileIconPresent).toBeInTheDocument();
  });
  it("OrderSubmittedListView Submitted Date", () => {
    const data = getDeepClone(SubmittedDocumentMockData);
    render(
      <MemoryRouter>
        <SubmitDocumentListView
          documentsData={data}
          documentTypeCode={undefined}
          clickToOpentheDocument={() => {}}
        />
      </MemoryRouter>
    );
    const fileIconPresent = screen.getByTestId(
      "submitted-document-heading-submit-date"
    );
    expect(fileIconPresent).toBeInTheDocument();
  });
  it("OrderSubmittedListView SubmittedDate value", () => {
    const data = getDeepClone(SubmittedDocumentMockData);
    render(
      <MemoryRouter>
        <SubmitDocumentListView
          documentsData={data}
          documentTypeCode={undefined}
          clickToOpentheDocument={() => {}}
        />
      </MemoryRouter>
    );
    const fileIconPresent = screen.getByTestId(
      "submitted-document-heading-submit-date-value"
    );
    expect(fileIconPresent).toBeInTheDocument();
  });
});
