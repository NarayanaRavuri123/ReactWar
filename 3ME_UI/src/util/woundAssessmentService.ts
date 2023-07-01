import { format } from "react-string-format";
import { SVC_GET_PATIENT_WOUND_DETAILS } from "./staticText";

export const retrievePatientWoundDetails = async (reqParams: any) => {
  try {
    const baseUrl = process.env.REACT_APP_3ME_SVC_BASE_URL ?? "";
    const retrievePatientProductInfoUrl = format(
      "{0}{1}",
      baseUrl,
      SVC_GET_PATIENT_WOUND_DETAILS
    );
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const authData = JSON.parse(AuthDetails ?? "");
    const accessToken = authData.accessToken?.accessToken;
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(retrievePatientProductInfoUrl, {
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
