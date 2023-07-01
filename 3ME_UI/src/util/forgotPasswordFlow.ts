import { format } from "react-string-format";
import {
  SVC_GET_AUTHENTICATION_CHANNEL,
  SVC_GET_CHANGE_PASSWORD,
  SVC_GET_GET_USER_CONTACT_INFO,
  SVC_GET_VALIDATE_CODE,
} from "./staticText";

export const changePassword = async (reqBody: string) => {
  try {
    const baseUrl = process.env.REACT_APP_DURABLE_FUNCTION_BASE_URL ?? "";
    const validateUserUrl = format("{0}{1}", baseUrl, SVC_GET_CHANGE_PASSWORD);
    const response = await fetch(validateUserUrl, {
      method: "POST",
      headers: {
        AuthorizationKey: process.env.REACT_APP_CLIENTID ?? "",
        "x-functions-key": process.env.REACT_APP_DURABLE_FUNCTION_API_KEY ?? "",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: reqBody,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

export const checkStatusForForgotPasswordFlow = async (url: any) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

export const authenticationChannel = async (
  instanceId: string,
  reqBody: string
) => {
  try {
    const baseUrl = process.env.REACT_APP_DURABLE_FUNCTION_BASE_URL ?? "";
    const validateUserUrl = format(
      "{0}{1}{2}",
      baseUrl,
      SVC_GET_AUTHENTICATION_CHANNEL,
      instanceId
    );
    const response = await fetch(validateUserUrl, {
      method: "POST",
      headers: {
        AuthorizationKey: process.env.REACT_APP_CLIENTID ?? "",
        "x-functions-key": process.env.REACT_APP_DURABLE_FUNCTION_API_KEY ?? "",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: reqBody,
    });
    return response.status === 202;
  } catch (error) {
    console.log("error", error);
  }
};

export const validateCode = async (instanceId: string, reqBody: string) => {
  try {
    const baseUrl = process.env.REACT_APP_DURABLE_FUNCTION_BASE_URL ?? "";
    const validateUserUrl = format(
      "{0}{1}{2}",
      baseUrl,
      SVC_GET_VALIDATE_CODE,
      instanceId
    );
    const response = await fetch(validateUserUrl, {
      method: "POST",
      headers: {
        AuthorizationKey: process.env.REACT_APP_CLIENTID ?? "",
        "x-functions-key": process.env.REACT_APP_DURABLE_FUNCTION_API_KEY ?? "",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: reqBody,
    });
    return response.status === 202;
  } catch (error) {
    console.log("error", error);
  }
};

export const getUserContactInfo = async (reqBody: string) => {
  try {
    const baseUrl = process.env.REACT_APP_3ME_SVC_BASE_URL ?? "";
    const validateUserUrl = format(
      "{0}{1}",
      baseUrl,
      SVC_GET_GET_USER_CONTACT_INFO
    );
    const response = await fetch(validateUserUrl, {
      method: "POST",
      headers: {
        AuthorizationKey: process.env.REACT_APP_CLIENTID ?? "",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: reqBody,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};
