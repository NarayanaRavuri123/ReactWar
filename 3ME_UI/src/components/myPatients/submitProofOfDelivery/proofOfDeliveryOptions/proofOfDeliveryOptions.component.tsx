import { Grid } from "@mui/material";
import "./proofOfDeliveryOptions.css";
import quantityplusactive from "../../../../assets/quantityplusactive.svg";
import quantityminusactive from "../../../../assets/quantityminusactive.svg";
import { IProofOfDeliveryOptions } from "./proofOfDeliveryOptions.interface";
import { useContext, useState } from "react";
import { ProofOfDeliveryDocumentUpload } from "../proofOfDeliveryDocumentUpload/proofOfDeliveryDocumentUpload.component";
import { ProofOfDeliveryFax } from "../submitProofOfDeliveryFax/proofOfDeliveryFax.component";
import {
  SubmitProofOfDeliveryContext,
  SubmitProofOfDeliveryContextType,
} from "../../../../context/submitProofOfDeliveryContext";

export const ProofOfDeliveryOptions = ({
  options,
  setIsUploadSuccess,
  setIsLoading,
}: {
  options: IProofOfDeliveryOptions[];
  setIsUploadSuccess: Function;
  setIsLoading: Function;
}) => {
  const submitProofOfDeliveryObj =
    useContext<SubmitProofOfDeliveryContextType | null>(
      SubmitProofOfDeliveryContext
    );
  const onButtonClick = (optionTitle: string) => {
    submitProofOfDeliveryObj?.setIsUploadFaxActive(
      (prevActiveOptions: string[]) => {
        if (prevActiveOptions.includes(optionTitle)) {
          return prevActiveOptions.filter(
            (activeOption) => activeOption !== optionTitle
          );
        } else {
          return [...prevActiveOptions, optionTitle];
        }
      }
    );
  };
  console.log(
    "submitProofOfDeliveryObj?.isUploadFaxActive----",
    submitProofOfDeliveryObj?.isUploadFaxActive
  );
  return (
    <div className="proofOfDeliveryOptions">
      <Grid container className="pod-container">
        {options.map((option) => (
          <>
            <Grid item xs={0.4}>
              <img
                data-testid="minus-button-disabled"
                src={
                  submitProofOfDeliveryObj?.isUploadFaxActive.includes(
                    option.optionTitle
                  )
                    ? quantityminusactive
                    : quantityplusactive
                }
                alt={option.optionTitle}
                className="pod-option-icon"
                onClick={() => onButtonClick(option.optionTitle)}
              />
            </Grid>
            <Grid item xs={6} className="pod-option-title-grid">
              <span className="pod-option-title"> {option.optionTitle}</span>
            </Grid>
            <Grid item xs={12}>
              <div className="pod-option-desc">{option.optionDescription}</div>
            </Grid>
            {submitProofOfDeliveryObj?.isUploadFaxActive.includes(
              option.optionTitle
            ) && (
              <Grid item xs={12}>
                {option.optionTitle === "Document Upload" ? (
                  <div data-testid="pod-upload-test">
                    <ProofOfDeliveryDocumentUpload
                      setIsUploadSuccess={setIsUploadSuccess}
                      setIsLoading={setIsLoading}
                    />
                  </div>
                ) : (
                  <div data-testid="pod-fax-test">
                    <ProofOfDeliveryFax />
                  </div>
                )}
              </Grid>
            )}
          </>
        ))}
      </Grid>
    </div>
  );
};
