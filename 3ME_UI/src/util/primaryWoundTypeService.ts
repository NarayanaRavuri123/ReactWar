import { format } from "react-string-format";
import { SVC_GET_QUESTIONNAIRE_CONTENT } from "./staticText";

export const getAdditionalWoundQuestionaries = async () => {
  // API call
  try {
    const baseUrl = process.env.REACT_APP_FUNC_BASE_URL ?? "";
    const questUrl = format("{0}{1}", baseUrl, SVC_GET_QUESTIONNAIRE_CONTENT);
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const token = JSON.parse(AuthDetails ?? "");
    const accessToken = token.accessToken?.accessToken;
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(questUrl, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        Authorization: authorizationToken,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        "x-functions-key": process.env.REACT_APP_FUNCTION_API_KEY ?? "",
      },
    });
    if (response.status === 200) {
      const data = await response.json();
      return data.items;
    } else {
      const data = await response.json();
      return [data.error];
    }
  } catch (error) {
    console.log("error", error);
  }
  return [];
};
