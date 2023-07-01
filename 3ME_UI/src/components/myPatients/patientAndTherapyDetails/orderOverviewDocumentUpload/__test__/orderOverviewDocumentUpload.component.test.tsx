import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { defaultOrderUploadDocumentData } from "../../orderOverview/orderOverview.model";
import OrderOverviewDocumentUpload from "../orderOverviewDocumentUpload.component";
import OrderOverviewUploadDocument from "../orderOverviewUploadDocument.component";

describe("Order Overview document type upload documents ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("verify upload document header", () => {
    render(
      <OrderOverviewDocumentUpload
        isTestingComponent={true}
        callUploadDocToIFace={() => {}}
        documentTypeText={undefined}
      />
    );
    const doc = screen.getByTestId("order-upload-doc-header");
    expect(doc).toBeInTheDocument();
  });
  it("verify upload doc description text", () => {
    render(
      <OrderOverviewDocumentUpload
        isTestingComponent={true}
        callUploadDocToIFace={() => {}}
        documentTypeText={undefined}
      />
    );
    const header = screen.getByTestId("order-upload-desc").textContent;
    expect(header).toBe(
      `Documents uploaded are associated with the patient above and submitted to 3M for order processing. Files must be in one of the following formats: JPG, GIF, JPEG, PNG, TIFF or PDF. Each file cannot exceed 10 MB (10240 KB) in size.`
    );
  });
  it("verify uploaded document file name", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <OrderOverviewUploadDocument
          data={defaultOrderUploadDocumentData}
          setData={() => {}}
          onDelete={() => {}}
        />
      </MemoryRouter>
    );
    const title = screen.getByTestId("documentNameTest0");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("TestFile.png");
  });
  it("verify document type title", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <OrderOverviewUploadDocument
          data={defaultOrderUploadDocumentData}
          setData={() => {}}
          onDelete={() => {}}
          callUploadDocToIFace={() => {}}
        />
      </MemoryRouter>
    );
    const title = screen.getByTestId("order-document-upload0");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Document Type");
  });
  it("verify dropdown present", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <OrderOverviewUploadDocument
          data={defaultOrderUploadDocumentData}
          setData={() => {}}
          onDelete={() => {}}
          callUploadDocToIFace={() => {}}
        />
      </MemoryRouter>
    );
    const title = screen.getByTestId("documentType-testid0");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("CNAccinfo.svg​");
  });
  it("verify document upload close", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <OrderOverviewUploadDocument
          data={defaultOrderUploadDocumentData}
          setData={() => {}}
          onDelete={() => {}}
          callUploadDocToIFace={() => {}}
        />
      </MemoryRouter>
    );
    const title = screen.getByTestId("document-upload-close-icon0");
    expect(title).toBeInTheDocument();
  });
  it("verify invalid document type upload", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <OrderOverviewUploadDocument
          data={defaultOrderUploadDocumentData}
          setData={() => {}}
          onDelete={() => {}}
          callUploadDocToIFace={() => {}}
        />
      </MemoryRouter>
    );
    const title = screen.getByTestId("docUploadfileStatuserror1");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("");
  });
  it("verify upload document button", () => {
    const mockUploadBtnAction = jest.fn();
    render(
      <MemoryRouter initialEntries={["/home/orderOverview"]}>
        <OrderOverviewUploadDocument
          data={defaultOrderUploadDocumentData}
          setData={() => {}}
          onDelete={() => {}}
          callUploadDocToIFace={mockUploadBtnAction}
        />
      </MemoryRouter>
    );
    const uploadbtn = screen.getByTestId("orderDocUploadBtn");
    expect(uploadbtn).toBeInTheDocument();
    expect(uploadbtn).toHaveTextContent("Upload Documents");
    userEvent.click(uploadbtn);
    expect(mockUploadBtnAction).toBeCalledTimes(1);
  });
});
