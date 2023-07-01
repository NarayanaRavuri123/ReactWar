import { format } from "react-string-format";
import {
  SVC_GET_PATIENT_PRODUCT_INFO,
  SVC_GET_WOUND_LIST_INFO,
  SVC_PRINT_SHIPMENT_LABEL_PDF,
} from "./staticText";

export const retrievePatientDetails = async (reqParams: any) => {
  try {
    const baseUrl = process.env.REACT_APP_FUNC_BASE_URL ?? "";
    const retrievePatientProductInfoUrl = format(
      "{0}{1}",
      baseUrl,
      SVC_GET_PATIENT_PRODUCT_INFO
    );
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const authData = JSON.parse(AuthDetails ?? "");
    const accessToken = authData.accessToken?.accessToken;
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(retrievePatientProductInfoUrl, {
      method: "POST",
      headers: {
        Authorization: authorizationToken,
        "x-functions-key": process.env.REACT_APP_FUNCTION_API_KEY ?? "",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(reqParams),
    });
    if (response.status === 200) {
      const data = response.json();
      return data;
    }
  } catch (error) {
    console.log("error", error);
  }
  return null;
};

export const getShipmentLabelPdf = async (reqParams: any) => {
  try {
    const baseUrl = process.env.REACT_APP_DOCUMENT_MGR_FUNC_BASE_URL ?? "";
    const retrievePatientProductInfoUrl = format(
      "{0}{1}",
      baseUrl,
      SVC_PRINT_SHIPMENT_LABEL_PDF
    );
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const authData = JSON.parse(AuthDetails ?? "");
    const accessToken = authData.accessToken?.accessToken;
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(retrievePatientProductInfoUrl, {
      method: "POST",
      headers: {
        Authorization: authorizationToken,
        "x-functions-key":
          process.env.REACT_APP_DOCUMENT_MGR_FUNCTION_API_KEY ?? "",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(reqParams),
    });
    if (response.status === 200) {
      const data = response.json();
      return data;
    }
  } catch (error) {
    console.log("error", error);
  }
  return null;
};

export const retrieveWoundList = async (reqParams: any) => {
  try {
    const baseUrl = process.env.REACT_APP_FUNC_BASE_URL ?? "";
    const retrievePatientProductInfoUrl = format(
      "{0}{1}",
      baseUrl,
      SVC_GET_WOUND_LIST_INFO
    );
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const authData = JSON.parse(AuthDetails ?? "");
    const accessToken = authData.accessToken?.accessToken;
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(retrievePatientProductInfoUrl, {
      method: "POST",
      headers: {
        Authorization: authorizationToken,
        "x-functions-key": process.env.REACT_APP_FUNCTION_API_KEY ?? "",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(reqParams),
    });
    if (response.status === 200) {
      const data = response.json();
      return data;
    }
  } catch (error) {
    console.log("error", error);
  }
  return null;
};
