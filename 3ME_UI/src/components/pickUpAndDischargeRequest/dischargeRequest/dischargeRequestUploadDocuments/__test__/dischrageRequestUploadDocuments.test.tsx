import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { defaultDischargeRequestData } from "../../dischargeRequest.model";
import DischargeReqUploadDoc from "../dischargeReqUploadDoc.component";
import React from "react";
import { getMockDischargeRequestContextData } from "../../__test__/mockDischargeRequestContext";
import { DischargeRequestContext } from "../../../../../context/DischargeRequestContext";
import { IDropZoneDocumentSelect } from "../../../../../core/customDropZone/dropZoneDocumentSelect.interface";
import OrderUploadDocList from "../../../../newOrder/orderUploadDocument/orderUploadDocList.component";
import DischargeReqUploadDocReview from "../dischargeRequestUploadDocumentsReview/dischargeReqUploadDoc.review.component";

describe("discharge request upload documents ->", () => {
  afterAll(() => {
    cleanup();
  });
  const dischargeRequestMockResponse: IDropZoneDocumentSelect[] = [
    {
      documentName: "sampleFile",
      documentBase64: "",
      succeeded: false,
      errorMessage: "File size exceeded 10 MB",
      isFetchingBase64: true,
    },
  ];
  it("verify discharge request upload document header", () => {
    React.useState = jest
      .fn()
      .mockReturnValue([defaultDischargeRequestData, {}]);
    render(
      <DischargeRequestContext.Provider
        value={{
          ...getMockDischargeRequestContextData(),
        }}
      >
        <DischargeReqUploadDoc />
      </DischargeRequestContext.Provider>
    );
    const header = screen.getByTestId("dischargeReq-doc-header").textContent;
    expect(header).toBe(`Upload Documents`);
  });
  it("verify upload document description text", () => {
    React.useState = jest
      .fn()
      .mockReturnValue([defaultDischargeRequestData, {}]);
    render(
      <DischargeRequestContext.Provider
        value={{
          ...getMockDischargeRequestContextData(),
        }}
      >
        <DischargeReqUploadDoc />
      </DischargeRequestContext.Provider>
    );
    const desc = screen.getByTestId("dischargeReq-doc-desc").textContent;
    expect(desc).toBe(
      `Documents uploaded are associated with the patient above and submitted to 3M for order processing. Files must be in one of the following formats: JPG, GIF, JPEG, PNG, TIFF or PDF. Each file cannot exceed 10 MB (10240 KB) in size.`
    );
  });
  it("validate in-valid selected files", () => {
    React.useState = jest
      .fn()
      .mockReturnValue([defaultDischargeRequestData, {}]);
    render(
      <DischargeRequestContext.Provider
        value={{
          ...getMockDischargeRequestContextData(),
          dischargeRequestDocuments: dischargeRequestMockResponse,
        }}
      >
        <OrderUploadDocList
          data={dischargeRequestMockResponse}
          setData={() => {}}
          onDelete={() => {}}
        />
      </DischargeRequestContext.Provider>
    );
    const desc = screen.getByTestId("fileStatus");
    expect(desc).not.toHaveTextContent("Updated Successfully");
  });
  it("validate in-valid selected files", () => {
    React.useState = jest
      .fn()
      .mockReturnValue([defaultDischargeRequestData, {}]);
    render(
      <DischargeRequestContext.Provider
        value={{
          ...getMockDischargeRequestContextData(),
          dischargeRequestDocuments: dischargeRequestMockResponse,
        }}
      >
        <OrderUploadDocList
          data={dischargeRequestMockResponse}
          setData={() => {}}
          onDelete={() => {}}
        />
      </DischargeRequestContext.Provider>
    );
    const desc = screen.getByTestId("fileStatus");
    expect(desc).toHaveTextContent("File size exceeded 10 MB");
  });
  it("validate valid selected files", () => {
    React.useState = jest
      .fn()
      .mockReturnValue([defaultDischargeRequestData, {}]);
    dischargeRequestMockResponse[0].succeeded = true;
    render(
      <DischargeRequestContext.Provider
        value={{
          ...getMockDischargeRequestContextData(),
          dischargeRequestDocuments: dischargeRequestMockResponse,
        }}
      >
        <OrderUploadDocList
          data={dischargeRequestMockResponse}
          setData={() => {}}
          onDelete={() => {}}
        />
      </DischargeRequestContext.Provider>
    );
    const descvalid = screen.getByTestId("fileStatus");
    expect(descvalid).toHaveTextContent("Updated Successfully");
  });

  it("verify review discharge upload", () => {
    React.useState = jest
      .fn()
      .mockReturnValue([defaultDischargeRequestData, {}]);
    render(
      <DischargeRequestContext.Provider
        value={{
          ...getMockDischargeRequestContextData(),
        }}
      >
        <DischargeReqUploadDocReview />
      </DischargeRequestContext.Provider>
    );
    const title = screen.getByTestId("document-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Documents");
  });

  it("discharge upload edit button clicked", () => {
    React.useState = jest
      .fn()
      .mockReturnValue([defaultDischargeRequestData, {}]);
    render(
      <DischargeRequestContext.Provider
        value={{
          ...getMockDischargeRequestContextData(),
        }}
      >
        <DischargeReqUploadDocReview dischargeRequestEditBtnClick={() => {}} />
      </DischargeRequestContext.Provider>
    );
    const title = screen.getByTestId("edit-doc-test");
    expect(title).toBeInTheDocument();
    expect(fireEvent.click(title)).toBe(true);
  });
});
