import { format } from "react-string-format";
import {
  SVC_GET_ALERTS,
  SVC_GET_ALL_ALERTS,
  SVC_RELEASE_ORDER_LOCK,
  SVC_SAVE_FILE_TO_FILENET,
  SVC_STOP_SHARE_ORDER,
} from "./staticText";
import { HubConnectionBuilder } from "@microsoft/signalr";

export const negotiate = async () => {
  try {
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const authData = JSON.parse(AuthDetails ?? "");
    const accessToken = authData.accessToken?.accessToken;
    const baseUrl = process.env.REACT_APP_FUNC_BASE_URL ?? "";
    const negotiateUrl = format("{0}{1}", baseUrl, "/api/");

    var connection = new HubConnectionBuilder()
      .withUrl(negotiateUrl, { accessTokenFactory: () => accessToken })
      .build();
    return connection;
  } catch (error) {
    console.log("error", error);
  }
  return null;
};

export const getAlerts = async (reqParams: any) => {
  try {
    const baseUrl = process.env.REACT_APP_FUNC_BASE_URL ?? "";
    const getAlertsUrl = format("{0}{1}", baseUrl, SVC_GET_ALERTS);
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const authData = JSON.parse(AuthDetails ?? "");
    const accessToken = authData.accessToken?.accessToken;
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(getAlertsUrl, {
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
      return null;
    }
  } catch (error) {
    console.log("error", error);
  }
  return null;
};

export const cancelSharedOrder = async (reqParams: any) => {
  try {
    const baseUrl = process.env.REACT_APP_3ME_SVC_BASE_URL ?? "";
    const cancelSharedOrder = format("{0}{1}", baseUrl, SVC_STOP_SHARE_ORDER);
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const authData = JSON.parse(AuthDetails ?? "");
    const accessToken = authData.accessToken?.accessToken;
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(cancelSharedOrder, {
      method: "POST",
      headers: {
        Authorization: authorizationToken,
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

export const releaseOrderLock = async (reqParams: any) => {
  try {
    const baseUrl = process.env.REACT_APP_3ME_SVC_BASE_URL ?? "";
    const cancelSharedOrder = format("{0}{1}", baseUrl, SVC_RELEASE_ORDER_LOCK);
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const authData = JSON.parse(AuthDetails ?? "");
    const accessToken = authData.accessToken?.accessToken;
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(cancelSharedOrder, {
      method: "POST",
      headers: {
        Authorization: authorizationToken,
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

export const saveDocumentToFilenet = async (requestBody: any) => {
  try {
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const data = JSON.parse(AuthDetails ?? "");
    const accessToken = data.accessToken?.accessToken;
    const baseUrl = process.env.REACT_APP_3ME_SVC_BASE_URL ?? "";
    const getUrl = format("{0}{1}", baseUrl, SVC_SAVE_FILE_TO_FILENET);
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(getUrl, {
      method: "POST",
      headers: {
        Authorization: authorizationToken,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(requestBody),
    });
    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      return await response.json();
    }
  } catch (error) {
    console.log("error", error);
  }
};
export const getAlertsforRo = async (reqParams: any) => {
  try {
    const baseUrl = process.env.REACT_APP_FUNC_BASE_URL ?? "";
    const getAlertsForRoUrl = format("{0}{1}", baseUrl, SVC_GET_ALL_ALERTS);
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const authData = JSON.parse(AuthDetails ?? "");
    const accessToken = authData.accessToken?.accessToken;
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(getAlertsForRoUrl, {
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
