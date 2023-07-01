import { cleanup, render, screen } from "@testing-library/react";
import { ProofOfDeliveryOptions } from "../proofOfDeliveryOptions.component";
import {
  SubmitProofOfDeliveryContext,
  SubmitProofOfDeliveryContextType,
} from "../../../../../context/submitProofOfDeliveryContext";
import React from "react";
describe("ProofOfDelivery Options component->", () => {
  afterAll(() => {
    cleanup();
  });
  it("renders ProofOfDeliveryFax component", () => {
    const options = [
      {
        optionTitle: "Fax",
        optionDescription: "Send proof of delivery via fax",
      },
    ];
    const setIsUploadSuccess = jest.fn();
    const setIsLoading = jest.fn();
    const submitProofOfDeliveryObj: SubmitProofOfDeliveryContextType = {
      isUploadFaxActive: ["Fax"],
      setIsUploadFaxActive: jest.fn(),
      patient: null,
      setPatient: jest.fn(),
      proofOfDeliveryUploadDocs: [],
      setProofOfDeliveryUploadDocs: jest.fn(),
      resetData: jest.fn(),
      fileStatus: "",
      setFileStatus: jest.fn(),
    };
    render(
      <SubmitProofOfDeliveryContext.Provider value={submitProofOfDeliveryObj}>
        <ProofOfDeliveryOptions
          options={options}
          setIsUploadSuccess={setIsUploadSuccess}
          setIsLoading={setIsLoading}
        />
      </SubmitProofOfDeliveryContext.Provider>
    );
    const proofOfDeliveryFax = screen.getByTestId("pod-fax-test");
    expect(proofOfDeliveryFax).toBeInTheDocument();
  });
  it("renders ProofOfDeliveryUpload document component", () => {
    const options = [
      {
        optionTitle: "Document Upload",
        optionDescription: "Send proof of delivery via fax",
      },
    ];
    const setIsUploadSuccess = jest.fn();
    const setIsLoading = jest.fn();
    const submitProofOfDeliveryObj: SubmitProofOfDeliveryContextType = {
      isUploadFaxActive: ["Document Upload"],
      setIsUploadFaxActive: jest.fn(),
      patient: null,
      setPatient: jest.fn(),
      proofOfDeliveryUploadDocs: [],
      setProofOfDeliveryUploadDocs: jest.fn(),
      resetData: jest.fn(),
      fileStatus: "",
      setFileStatus: jest.fn(),
    };

    render(
      <SubmitProofOfDeliveryContext.Provider value={submitProofOfDeliveryObj}>
        <ProofOfDeliveryOptions
          options={options}
          setIsUploadSuccess={setIsUploadSuccess}
          setIsLoading={setIsLoading}
        />
      </SubmitProofOfDeliveryContext.Provider>
    );
    const proofOfDeliveryupload = screen.getByTestId("pod-upload-test");
    expect(proofOfDeliveryupload).toBeInTheDocument();
  });
});
