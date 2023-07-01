import { format } from "react-string-format";
import { SVC_GENERATE_SEND_CODE, SVC_VALIDATE_SENT_CODE } from "./staticText";

export const generateAndSendCode = async (reqParams: any) => {
    try {
        const baseUrl = process.env.REACT_APP_FUNC_BASE_URL ?? "";
        const generateAndSendCodeUrl = format(
            "{0}{1}",
            baseUrl,
            SVC_GENERATE_SEND_CODE
        );
        const response = await fetch(generateAndSendCodeUrl, {
            method: "POST",
            headers: {
                AuthorizationKey: process.env.REACT_APP_CLIENTID ?? "",
                "x-functions-key": process.env.REACT_APP_FUNCTION_API_KEY ?? "",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(reqParams)
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
}

export const ValidateCode = async (reqParams: any) => {
    try {
        const baseUrl = process.env.REACT_APP_FUNC_BASE_URL ?? "";
        const generateAndSendCodeUrl = format(
            "{0}{1}",
            baseUrl,
            SVC_VALIDATE_SENT_CODE
        );
        const response = await fetch(generateAndSendCodeUrl, {
            method: "POST",
            headers: {
                AuthorizationKey: process.env.REACT_APP_CLIENTID ?? "",
                "x-functions-key": process.env.REACT_APP_FUNCTION_API_KEY ?? "",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(reqParams)
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
}