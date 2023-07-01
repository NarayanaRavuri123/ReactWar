import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SubmitProofOfDeliveryContext } from "../../../../../context/submitProofOfDeliveryContext";
import { getMockSubitProofOfDeliveryContextData } from "../../submitProofOfDeliveryMockContextData";
import { ProofOfDeliveryDocumentUpload } from "../proofOfDeliveryDocumentUpload.component";

describe("ProofOfDelivery Upload document component->", () => {
  afterAll(() => {
    cleanup();
  });
  it("Proof of Delivery upload document component present", () => {
    const setIsLoading = jest.fn();
    const setIsUploadSuccess = jest.fn();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SubmitProofOfDeliveryContext.Provider
          value={{
            ...getMockSubitProofOfDeliveryContextData(),
          }}
        >
          <ProofOfDeliveryDocumentUpload
            setIsUploadSuccess={setIsUploadSuccess}
            setIsLoading={setIsLoading}
          />
        </SubmitProofOfDeliveryContext.Provider>
      </MemoryRouter>
    );
    const component = screen.getByTestId("proofOfDeliveryUpload");
    expect(component).toBeInTheDocument();
  });

  it("Proof of Delivery upload document title message present", () => {
    const setIsLoading = jest.fn();
    const setIsUploadSuccess = jest.fn();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SubmitProofOfDeliveryContext.Provider
          value={{
            ...getMockSubitProofOfDeliveryContextData(),
          }}
        >
          <ProofOfDeliveryDocumentUpload
            setIsUploadSuccess={setIsUploadSuccess}
            setIsLoading={setIsLoading}
          />
        </SubmitProofOfDeliveryContext.Provider>
      </MemoryRouter>
    );
    const message = screen.getByTestId("pod-title-msg");
    expect(message).toBeInTheDocument();
    expect(message).toHaveTextContent(
      "A POD/AOB signed and dated by the patient or authorized agent is required to receive care"
    );
  });
  it("Proof of Delivery upload document check if file name present", () => {
    const setIsLoading = jest.fn();
    const setIsUploadSuccess = jest.fn();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SubmitProofOfDeliveryContext.Provider
          value={{
            ...getMockSubitProofOfDeliveryContextData(),
          }}
        >
          <ProofOfDeliveryDocumentUpload
            setIsUploadSuccess={setIsUploadSuccess}
            setIsLoading={setIsLoading}
          />
        </SubmitProofOfDeliveryContext.Provider>
      </MemoryRouter>
    );
    const fileName = screen.getByTestId("pod-file-name");
    expect(fileName).toBeInTheDocument();
    expect(fileName).toHaveTextContent("Abc");
  });

  it("Proof of Delivery upload document check if icon present", () => {
    const setIsLoading = jest.fn();
    const setIsUploadSuccess = jest.fn();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SubmitProofOfDeliveryContext.Provider
          value={{
            ...getMockSubitProofOfDeliveryContextData(),
          }}
        >
          <ProofOfDeliveryDocumentUpload
            setIsUploadSuccess={setIsUploadSuccess}
            setIsLoading={setIsLoading}
          />
        </SubmitProofOfDeliveryContext.Provider>
      </MemoryRouter>
    );
    const message = screen.getByTestId("pod-success");
    expect(message).toBeInTheDocument();
  });

  it("Proof of Delivery upload document check if status present", () => {
    const setIsLoading = jest.fn();
    const setIsUploadSuccess = jest.fn();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SubmitProofOfDeliveryContext.Provider
          value={{
            ...getMockSubitProofOfDeliveryContextData(),
          }}
        >
          <ProofOfDeliveryDocumentUpload
            setIsUploadSuccess={setIsUploadSuccess}
            setIsLoading={setIsLoading}
          />
        </SubmitProofOfDeliveryContext.Provider>
      </MemoryRouter>
    );
    const status = screen.getByTestId("pod-success");
    expect(status).toBeInTheDocument();
    expect(status).toHaveTextContent("Upload successful!");
  });
  it("Proof of Delivery upload document check if file close icon present", () => {
    const setIsLoading = jest.fn();
    const setIsUploadSuccess = jest.fn();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SubmitProofOfDeliveryContext.Provider
          value={{
            ...getMockSubitProofOfDeliveryContextData(),
          }}
        >
          <ProofOfDeliveryDocumentUpload
            setIsUploadSuccess={setIsUploadSuccess}
            setIsLoading={setIsLoading}
          />
        </SubmitProofOfDeliveryContext.Provider>
      </MemoryRouter>
    );
    const icon = screen.getByTestId("pod-fileClose");
    expect(icon).toBeInTheDocument();
  });

  it("Proof of Delivery upload document buttoncheck if file close icon present", () => {
    const setIsLoading = jest.fn();
    const setIsUploadSuccess = jest.fn();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SubmitProofOfDeliveryContext.Provider
          value={{
            ...getMockSubitProofOfDeliveryContextData(),
          }}
        >
          <ProofOfDeliveryDocumentUpload
            setIsUploadSuccess={setIsUploadSuccess}
            setIsLoading={setIsLoading}
          />
        </SubmitProofOfDeliveryContext.Provider>
      </MemoryRouter>
    );
    const button = screen.getByTestId("pod-uploadDocBtn");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Submit POD");
  });
});
