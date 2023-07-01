import { format } from "react-string-format";
import { SVC_VALIDATE_UPS_ADDRESS } from "./staticText";

export const validateUpsAddress = async (reqParams: any) => {
  // API call
  try {
    const baseUrl = process.env.REACT_APP_FUNC_BASE_URL ?? "";
    const generateAndSendCodeUrl = format(
      "{0}{1}",
      baseUrl,
      SVC_VALIDATE_UPS_ADDRESS
    );
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const token = JSON.parse(AuthDetails ?? "");
    const accessToken = token.accessToken?.accessToken;
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(generateAndSendCodeUrl, {
      method: "POST",
      headers: {
        Authorization: authorizationToken,
        "x-functions-key": process.env.REACT_APP_FUNCTION_API_KEY ?? "",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(reqParams),
    });
    const data = response.json();
    if (response.status === 200) {
      return data;
    } else {
      return data;
    }
  } catch (error) {
    console.log("error", error);
  }
};
