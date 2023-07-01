import { format } from "react-string-format";
import { SVC_STATIC_CONTENT } from "./staticText";

export const getStaticContent = async (contentType: string) => {
  // API call
  try {
    const baseUrl = process.env.REACT_APP_FUNC_BASE_URL ?? "";
    const ddUrl = format(
      "{0}{1}/{2}",
      baseUrl,
      SVC_STATIC_CONTENT,
      contentType
    );
    const response = await fetch(ddUrl, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        "x-functions-key": process.env.REACT_APP_FUNCTION_API_KEY ?? "",
      },
    });
    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else if (response.status === 204) {
      const emptyResponse = "No Content";
      return emptyResponse;
    } else {
    }
  } catch (error) {
    console.log("error", error);
  }
  const emptyResponse = null;
  return emptyResponse;
};
