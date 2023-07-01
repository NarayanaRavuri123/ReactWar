import {
  SVC_GET_FACILITY_DETAILS,
  SVC_GET_UPDATE_USER_DETAILS,
  SVC_GET_USER_DETAILS,
  SVC_GET_USER_MANAGER_LIST,
  SVC_SET_TEMP_PASSWORD,
} from "./staticText";
import { format } from "react-string-format";

export const getUserMangerList = async (requestParams: any) => {
  try {
    const baseUrl = process.env.REACT_APP_USER_MGR_FUNC_BASE_URL ?? "";
    const getFacilityInfoUrl = format(
      "{0}{1}",
      baseUrl,
      SVC_GET_USER_MANAGER_LIST
    );
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const authData = JSON.parse(AuthDetails ?? "");
    const accessToken = authData.accessToken?.accessToken;
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(getFacilityInfoUrl, {
      method: "POST",
      headers: {
        Authorization: authorizationToken,
        "x-functions-key":
          process.env.REACT_APP_USER_MGR_FUNCTION_API_KEY ?? "",
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

export const getUserDetails = async (reqParams: any) => {
  try {
    const baseUrl = process.env.REACT_APP_3ME_SVC_BASE_URL ?? "";
    const getFacilityInfoUrl = format("{0}{1}", baseUrl, SVC_GET_USER_DETAILS);
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const data = JSON.parse(AuthDetails ?? "");
    const accessToken = data.accessToken?.accessToken;
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(getFacilityInfoUrl, {
      method: "POST",
      headers: {
        Authorization: authorizationToken,
        AuthorizationKey: process.env.REACT_APP_3ME_SVC_API_KEY ?? "",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(reqParams),
    });
    if (response.status === 200) {
      const data = response.json();
      return data;
    } else {
      console.log(response);
    }
    return null;
  } catch (error) {
    console.log("error", error);
  }
};

export const resetPassword = async (reqParams: any) => {
  try {
    const baseUrl = process.env.REACT_APP_USER_MGR_FUNC_BASE_URL ?? "";
    const getFacilityInfoUrl = format("{0}{1}", baseUrl, SVC_SET_TEMP_PASSWORD);
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const data = JSON.parse(AuthDetails ?? "");
    const accessToken = data.accessToken?.accessToken;
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(getFacilityInfoUrl, {
      method: "POST",
      headers: {
        Authorization: authorizationToken,
        "x-functions-key":
          process.env.REACT_APP_USER_MGR_FUNCTION_API_KEY ?? "",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(reqParams),
    });
    if (response.status === 200) {
      const data = response.json();
      return data;
    } else {
      console.log(response);
    }
    return null;
  } catch (error) {
    console.log("error", error);
  }
};

export const getFacilityDetails = async (reqParams: any) => {
  try {
    const baseUrl = process.env.REACT_APP_3ME_SVC_BASE_URL ?? "";
    const getFacilityInfoUrl = format(
      "{0}{1}",
      baseUrl,
      SVC_GET_FACILITY_DETAILS
    );
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const data = JSON.parse(AuthDetails ?? "");
    const accessToken = data.accessToken?.accessToken;
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(getFacilityInfoUrl, {
      method: "POST",
      headers: {
        Authorization: authorizationToken,
        AuthorizationKey: process.env.REACT_APP_3ME_SVC_API_KEY ?? "",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(reqParams),
    });
    if (response.status === 200) {
      const data = response.json();
      return data;
    } else {
      console.log(response);
    }
    return null;
  } catch (error) {
    console.log("error", error);
  }
};

export const updateUserDetails = async (reqBody: string) => {
  try {
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const data = JSON.parse(AuthDetails ?? "");
    const accessToken = data.accessToken?.accessToken;
    const baseUrl = process.env.REACT_APP_3ME_SVC_BASE_URL ?? "";
    const updateUserDetailsUrl = format(
      "{0}{1}",
      baseUrl,
      SVC_GET_UPDATE_USER_DETAILS
    );
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(updateUserDetailsUrl, {
      method: "POST",
      headers: {
        Authorization: authorizationToken,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: reqBody,
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
