import { format } from "react-string-format";
import { SVC_NPI_PRESCRIBER } from "./staticText";

export const getNPIPrescriber = async (reqParams: any) => {
  // API call
  try {
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const data = JSON.parse(AuthDetails ?? "");
    const accessToken = data.accessToken?.accessToken;
    const authorizationToken = format("Bearer {0}", accessToken);
    const baseUrl = process.env.REACT_APP_FUNC_BASE_URL ?? "";
    const prescriberUrl = format(
      "{0}{1}",
      baseUrl,
      SVC_NPI_PRESCRIBER
    );
    const response = await fetch(prescriberUrl, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        Authorization: authorizationToken,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        "x-functions-key": process.env.REACT_APP_FUNCTION_API_KEY ?? "",
      },
      body: JSON.stringify(reqParams),
    });
    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else if (response.status === 204) {
      const emptyResponse = null;
      return emptyResponse;
    } else {
      const data = response;
      console.log(data);
    }
  } catch (error) {
    console.log("error", error);
  }
  const emptyResponse = null;
  return emptyResponse;
};
