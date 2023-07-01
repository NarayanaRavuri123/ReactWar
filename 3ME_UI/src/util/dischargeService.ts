import { format } from "react-string-format";
import { SVC_PRINT_ORDER_SUMMARY_PDF, SVC_SAVE_DISCHARGE } from "./staticText";
import { ISaveDischargeRequest } from "../components/pickUpAndDischargeRequest/dischargeRequest/reviewDischargeRequest/mapper/request/dischargeRequest.interface";

export const saveDischargeRequest = async (reqBody: ISaveDischargeRequest) => {
  try {
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const data = JSON.parse(AuthDetails ?? "");
    const accessToken = data.accessToken?.accessToken;
    const baseUrl = process.env.REACT_APP_3ME_SVC_BASE_URL ?? "";
    const saveDichargeUrl = format("{0}{1}", baseUrl, SVC_SAVE_DISCHARGE);
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(saveDichargeUrl, {
      method: "POST",
      headers: {
        Authorization: authorizationToken,
        AuthorizationKey: process.env.REACT_APP_3ME_SVC_API_KEY ?? "",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(reqBody),
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

export const getPDFContent = async (reqBody: any) => {
  try {
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const data = JSON.parse(AuthDetails ?? "");
    const accessToken = data.accessToken?.accessToken;
    const baseUrl = process.env.REACT_APP_3ME_SVC_BASE_URL ?? "";
    const pdfContnetUrl = format(
      "{0}{1}",
      baseUrl,
      SVC_PRINT_ORDER_SUMMARY_PDF
    );
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(pdfContnetUrl, {
      method: "POST",
      headers: {
        Authorization: authorizationToken,
        AuthorizationKey: process.env.REACT_APP_3ME_SVC_API_KEY ?? "",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(reqBody),
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
