import { format } from "react-string-format";
import {
  SVC_FINANCIAL_INFO,
  SVC_GET_ALL_DOCUMENTS,
  SVC_GET_DOCUMENT_CONTENT,
  SVC_GET_ORDER_SUPPLIES,
  SVC_UPLOAD_ALL_DOCUMENTS,
} from "./staticText";
import {
  IFinancialInfoRequest,
  IGetOrderSuppliesRequest,
} from "../components/myPatients/patientAndTherapyDetails/orderSupplyDetail/orderSupplyDetails.interface";
import {
  IGetAllDocumentsRequest,
  IGetDocumentContentRequest,
} from "../components/myPatients/patientAndTherapyDetails/documentStepper/orderOverviewSubmittedDocument/submittedDocument.interface";

//GetOrderSupplies-api
export const getOrderSupplies = async (reqParams: IGetOrderSuppliesRequest) => {
  try {
    const baseUrl = process.env.REACT_APP_ORDER_MGR_FUNC_BASE_URL ?? "";
    const GetOrderSuppliesUrl = format(
      "{0}{1}",
      baseUrl,
      SVC_GET_ORDER_SUPPLIES
    );
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const authData = JSON.parse(AuthDetails ?? "");
    const accessToken = authData.accessToken?.accessToken;
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(GetOrderSuppliesUrl, {
      method: "POST",
      headers: {
        Authorization: authorizationToken,
        "x-functions-key": process.env.REACT_APP_ORD_MGR_FUNCTION_API_KEY ?? "",
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
export const getFinancialInfo = async (
  financialInfoReqBody: IFinancialInfoRequest
) => {
  try {
    const baseUrl = process.env.REACT_APP_ORDER_MGR_FUNC_BASE_URL ?? "";
    const getFinancialInsurenceInfoUrl = format(
      "{0}{1}",
      baseUrl,
      SVC_FINANCIAL_INFO
    );
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const authData = JSON.parse(AuthDetails ?? "");
    const accessToken = authData.accessToken?.accessToken;
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(getFinancialInsurenceInfoUrl, {
      method: "POST",
      headers: {
        Authorization: authorizationToken,
        "x-functions-key": process.env.REACT_APP_ORD_MGR_FUNCTION_API_KEY ?? "",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(financialInfoReqBody),
    });
    const data = response.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

export const getAllDocuments = async (
  requestParams: IGetAllDocumentsRequest
) => {
  try {
    const baseUrl = process.env.REACT_APP_DOCUMENT_MGR_FUNC_BASE_URL ?? "";
    const GetAllDocumentsUrl = format("{0}{1}", baseUrl, SVC_GET_ALL_DOCUMENTS);
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const authData = JSON.parse(AuthDetails ?? "");
    const accessToken = authData.accessToken?.accessToken;
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(GetAllDocumentsUrl, {
      method: "POST",
      headers: {
        Authorization: authorizationToken,
        "x-functions-key":
          process.env.REACT_APP_DOCUMENT_MGR_FUNCTION_API_KEY ?? "",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(requestParams),
    });
    const data = response.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};
export const uploadDocToIface = async (requestParams: any) => {
  try {
    const baseUrl = process.env.REACT_APP_DOCUMENT_MGR_FUNC_BASE_URL ?? "";
    const UploadAllDocumentsUrl = format(
      "{0}{1}",
      baseUrl,
      SVC_UPLOAD_ALL_DOCUMENTS
    );
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const authData = JSON.parse(AuthDetails ?? "");
    const accessToken = authData.accessToken?.accessToken;
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(UploadAllDocumentsUrl, {
      method: "POST",
      headers: {
        Authorization: authorizationToken,
        "x-functions-key":
          process.env.REACT_APP_DOCUMENT_MGR_FUNCTION_API_KEY ?? "",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(requestParams),
    });
    const data = response.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};
//getDocumentContent
export const getDocumentContent = async (
  requestParams: IGetDocumentContentRequest
) => {
  try {
    const baseUrl = process.env.REACT_APP_DOCUMENT_MGR_FUNC_BASE_URL ?? "";
    const getDocumentContentUrl = format(
      "{0}{1}",
      baseUrl,
      SVC_GET_DOCUMENT_CONTENT
    );
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const authData = JSON.parse(AuthDetails ?? "");
    const accessToken = authData.accessToken?.accessToken;
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(getDocumentContentUrl, {
      method: "POST",
      headers: {
        Authorization: authorizationToken,
        "x-functions-key":
          process.env.REACT_APP_DOCUMENT_MGR_FUNCTION_API_KEY ?? "",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(requestParams),
    });
    const data = response.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};
