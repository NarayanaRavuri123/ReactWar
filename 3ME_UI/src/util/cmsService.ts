import { format } from "react-string-format";
import { SVC_GET_CONTENT } from "./staticText";

export const getCMSContent = async (contentType: string) => {
  // API call
  try {
    const baseUrl = process.env.REACT_APP_CONTENT_MGR_FUNC_BASE_URL ?? "";
    const cmsUrl = format("{0}{1}/{2}", baseUrl, SVC_GET_CONTENT, contentType);
    const response = await fetch(cmsUrl, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        "x-functions-key":
          process.env.REACT_APP_CONTENT_MGR_FUNCTION_API_KEY ?? "",
      },
    });
    let data = await response.json();
    if (response.status === 200) {
      return data;
    } else if (response.status === 204) {
      const emptyResponse = "No Content";
      return emptyResponse;
    } else {
      return data;
    }
  } catch (error) {
    console.log("error", error);
  }
  const emptyResponse = null;
  return emptyResponse;
};
