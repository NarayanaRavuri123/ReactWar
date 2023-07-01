import { format } from "react-string-format";
import {
  SVC_GET_FACILITY_SETTING_PERMISSION,
  SVC_GET_UPDATEFACILITY_SETTING_PERMISSION,
} from "./staticText";

export const getRolePermissions = async (reqParams: any) => {
  try {
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const data = JSON.parse(AuthDetails ?? "");
    const accessToken = data.accessToken?.accessToken;
    const baseUrl = process.env.REACT_APP_3ME_SVC_BASE_URL ?? "";
    const facilityPermissionUrl = format(
      "{0}{1}",
      baseUrl,
      SVC_GET_FACILITY_SETTING_PERMISSION
    );
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(facilityPermissionUrl, {
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
export const UpdateRolePermissions = async (reqParams: any) => {
  try {
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const data = JSON.parse(AuthDetails ?? "");
    const accessToken = data.accessToken?.accessToken;
    const baseUrl = process.env.REACT_APP_3ME_SVC_BASE_URL ?? "";
    const facilityPermissionUrl = format(
      "{0}{1}",
      baseUrl,
      SVC_GET_UPDATEFACILITY_SETTING_PERMISSION
    );

    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(facilityPermissionUrl, {
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
