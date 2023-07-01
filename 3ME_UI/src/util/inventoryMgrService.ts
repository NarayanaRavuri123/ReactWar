import {
  SVC_GET_INVENTORY_LIST,
  SVC_SUBMIT_INVENTORY_ADJUSTMENT,
} from "./staticText";
import { format } from "react-string-format";

export const getInventoryInfoList = async (reqParams: any) => {
  try {
    const baseUrl = process.env.REACT_APP_INVENTORY_MGR_FUNC_BASE_URL ?? "";
    const getInventoryInfoListUrl = format(
      "{0}{1}",
      baseUrl,
      SVC_GET_INVENTORY_LIST
    );
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const data = JSON.parse(AuthDetails ?? "");
    const accessToken = data.accessToken?.accessToken;
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(getInventoryInfoListUrl, {
      method: "POST",
      headers: {
        "x-functions-key":
          process.env.REACT_APP_INVENTORY_MGR_FUNCTION_API_KEY ?? "",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: authorizationToken,
      },
      body: JSON.stringify(reqParams),
    });
    if (response.status === 200) {
      const data = response.json();
      return data;
    } else {
      console.log(response);
      return undefined;
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const submitInventoryAdjustment = async (reqParams: any) => {
  try {
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const data = JSON.parse(AuthDetails ?? "");
    const accessToken = data.accessToken?.accessToken;
    const baseUrl = process.env.REACT_APP_3ME_SVC_BASE_URL ?? "";
    const submitInventoryAdjustmentUrl = format(
      "{0}{1}",
      baseUrl,
      SVC_SUBMIT_INVENTORY_ADJUSTMENT
    );
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(submitInventoryAdjustmentUrl, {
      method: "POST",
      headers: {
        AuthorizationKey: process.env.REACT_APP_3ME_SVC_API_KEY ?? "",
        Authorization: authorizationToken,
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
      return undefined;
    }
  } catch (error) {
    console.log("error", error);
  }
};
