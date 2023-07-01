import { SVC_VERIFY_CAPTCHA } from "./staticText";

export const verifyCaptcha = async (token: string) => {
  // API call
  try {
    const verifyCaptchUrl = `${process.env.REACT_APP_FUNC_BASE_URL}${SVC_VERIFY_CAPTCHA}`;
    const response = await fetch(verifyCaptchUrl, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        "x-functions-key": process.env.REACT_APP_FUNCTION_API_KEY ?? "",
      },
      body: JSON.stringify({
        response: token,
      }),
    });
    if (response.status === 200) {
      const data = await response.json();
      return data.item.success && data.item.isValid;
    }
  } catch (error) {
    console.log("error", error);
  }
  return false;
};
