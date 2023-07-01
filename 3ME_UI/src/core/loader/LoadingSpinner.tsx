import React from "react";
import "./spinner.css";

export interface ILoadingSpinner {}

export const LoadingSpinner = ({}: ILoadingSpinner) => {
  return (
    <div className="spinner-container">
      <div className="loading-spinner"></div>
      <div className="loading-text">
        <div className="loading-text-large" data-testid="loading-text-large">
          Loading
        </div>
        <div className="loading-text-small" data-testid="loading-text-small">
          Processing your request...
        </div>
      </div>
    </div>
  );
};
