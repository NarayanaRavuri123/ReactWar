import { format } from "react-string-format";
import { IShareOrderRequest } from "../components/newOrder/newOrderFooterGroup/shareOrder/shareOrderRequest.interface";
import { IPrintOrderSummaryRequest } from "../components/newOrder/newOrderReviewOrderStepper/PrintOrderSummaryPdf.interface";
import {
  SVC_CANCEL_SUBMIT_VAC_ORDER,
  SVC_GET_ORDER_DETAILS_CONTENT,
  SVC_GET_PROVIDERS_FOR_FACILITY,
  SVC_GET_SUPPLY_ORDER_DETAILS,
  SVC_GET_VAC_ORDER_DETAILS,
  SVC_GET_VAC_ORDER_SUMMARY_INFO,
  SVC_GET_VAC_PRODUCT_INFO,
  SVC_HOLD_OR_RESUME_VAC_THERAPY,
  SVC_PRINT_ORDER_SUMMARY_PDF,
  SVC_SHARE_VAC_ORDER,
  SVC_UNLOCK_VAC_ORDER,
} from "./staticText";

export const retrieveVACProductInfo = async (reqParams: any) => {
  try {
    const baseUrl = process.env.REACT_APP_FUNC_BASE_URL ?? "";
    const retrieveVACProductInfoUrl = format(
      "{0}{1}",
      baseUrl,
      SVC_GET_VAC_PRODUCT_INFO
    );
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const authData = JSON.parse(AuthDetails ?? "");
    const accessToken = authData.accessToken?.accessToken;
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(retrieveVACProductInfoUrl, {
      method: "POST",
      headers: {
        Authorization: authorizationToken,
        "x-functions-key": process.env.REACT_APP_FUNCTION_API_KEY ?? "",
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

export const getVacOrderSummary = async (
  orderId: string | undefined,
  editMode: boolean
) => {
  try {
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const data = JSON.parse(AuthDetails ?? "");
    const accessToken = data.accessToken?.accessToken;
    const reqBody = {
      orderId: orderId,
      EditMode: editMode,
    };
    const baseUrl = process.env.REACT_APP_3ME_SVC_BASE_URL ?? "";
    const GetVacOrderSummaryurl = format(
      "{0}{1}",
      baseUrl,
      SVC_GET_VAC_ORDER_SUMMARY_INFO
    );
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(GetVacOrderSummaryurl, {
      method: "POST",
      headers: {
        Authorization: authorizationToken,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(reqBody),
    });
    if (response.status === 200) {
      const data = response.json();
      return data;
    }
    return false;
  } catch (error) {
    console.log("error", error);
    return false;
  }
};

export const cancelOrSubmitVacOrder = async (
  orderId: string | undefined,
  OrderStatus: number
) => {
  try {
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const data = JSON.parse(AuthDetails ?? "");
    const accessToken = data.accessToken?.accessToken;
    const reqBody = {
      orderId: orderId,
      OrderStatus: OrderStatus,
    };
    const baseUrl = process.env.REACT_APP_3ME_SVC_BASE_URL ?? "";
    const cancelSubmitVackOrderurl = format(
      "{0}{1}",
      baseUrl,
      SVC_CANCEL_SUBMIT_VAC_ORDER
    );
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(cancelSubmitVackOrderurl, {
      method: "POST",
      headers: {
        Authorization: authorizationToken,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(reqBody),
    });
    if (response.status === 200) {
      const data = response.json();
      return data;
    }
  } catch (error) {
    console.log("error", error);
  }
};
export const callgetProvidersForFacility = async (
  facilityNumber: number | null,
  facilityAddId: string | undefined
) => {
  try {
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const data = JSON.parse(AuthDetails ?? "");
    const accessToken = data.accessToken?.accessToken;

    const reqBody = {
      FacilityNumber: facilityNumber,
      FacilityAddressID: facilityAddId,
    };
    const baseUrl = process.env.REACT_APP_3ME_SVC_BASE_URL ?? "";
    const getUrl = format("{0}{1}", baseUrl, SVC_GET_PROVIDERS_FOR_FACILITY);
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(getUrl, {
      method: "POST",
      headers: {
        Authorization: authorizationToken,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(reqBody),
    });
    if (response.status === 200) {
      const data = await response.json();
      return data.data;
    }
  } catch (error) {
    console.log("error", error);
  }
};
export const callShareVacOrder = async (
  shareOrderReqObject: IShareOrderRequest
) => {
  try {
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const data = JSON.parse(AuthDetails ?? "");
    const accessToken = data.accessToken?.accessToken;

    const baseUrl = process.env.REACT_APP_3ME_SVC_BASE_URL ?? "";
    const sharevacOrderUrl = format("{0}{1}", baseUrl, SVC_SHARE_VAC_ORDER);
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(sharevacOrderUrl, {
      method: "POST",
      headers: {
        Authorization: authorizationToken,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(shareOrderReqObject),
    });
    if (response.status === 200) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const callHoldorResumeTherapy = async (requestBody: any) => {
  try {
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const data = JSON.parse(AuthDetails ?? "");
    const accessToken = data.accessToken?.accessToken;
    const baseUrl = process.env.REACT_APP_3ME_SVC_BASE_URL ?? "";
    const getUrl = format("{0}{1}", baseUrl, SVC_HOLD_OR_RESUME_VAC_THERAPY);
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(getUrl, {
      method: "POST",
      headers: {
        Authorization: authorizationToken,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(requestBody),
    });
    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      return await response.json();
    }
  } catch (error) {
    console.log("error", error);
  }
};
export const UnlockVacOrder = async (orderId: string) => {
  try {
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const data = JSON.parse(AuthDetails ?? "");
    const accessToken = data.accessToken?.accessToken;
    const reqBody = {
      OrderID: orderId,
    };
    const baseUrl = process.env.REACT_APP_3ME_SVC_BASE_URL ?? "";
    const unlockOrderUrl = format("{0}{1}", baseUrl, SVC_UNLOCK_VAC_ORDER);
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(unlockOrderUrl, {
      method: "POST",
      headers: {
        Authorization: authorizationToken,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(reqBody),
    });
    if (response.status === 200) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log("error", error);
  }
};
export const getPdfContent = async (
  downloadPdfReqObject: IPrintOrderSummaryRequest
) => {
  try {
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const data = JSON.parse(AuthDetails ?? "");
    const accessToken = data.accessToken?.accessToken;

    const baseUrl = process.env.REACT_APP_3ME_SVC_BASE_URL ?? "";
    const getPdfContentUrl = format(
      "{0}{1}",
      baseUrl,
      SVC_PRINT_ORDER_SUMMARY_PDF
    );
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(getPdfContentUrl, {
      method: "POST",
      headers: {
        Authorization: authorizationToken,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(downloadPdfReqObject),
    });
    if (response.status === 200) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log("error", error);
  }
};
export const getOrderStatusDetails = async (reqParams: any) => {
  try {
    const baseUrl = process.env.REACT_APP_FUNC_BASE_URL ?? "";
    const GetOrderStatusDetailsUrl = format(
      "{0}{1}",
      baseUrl,
      SVC_GET_ORDER_DETAILS_CONTENT
    );
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const authData = JSON.parse(AuthDetails ?? "");
    const accessToken = authData.accessToken?.accessToken;
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(GetOrderStatusDetailsUrl, {
      method: "POST",
      headers: {
        Authorization: authorizationToken,
        "x-functions-key": process.env.REACT_APP_FUNCTION_API_KEY ?? "",
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
export const getVACOrderDetails = async (reqParams: any) => {
  try {
    const baseUrl = process.env.REACT_APP_FUNC_BASE_URL ?? "";
    const GetOrderStatusDetailsUrl = format(
      "{0}{1}",
      baseUrl,
      SVC_GET_VAC_ORDER_DETAILS
    );
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const authData = JSON.parse(AuthDetails ?? "");
    const accessToken = authData.accessToken?.accessToken;
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(GetOrderStatusDetailsUrl, {
      method: "POST",
      headers: {
        Authorization: authorizationToken,
        "x-functions-key": process.env.REACT_APP_FUNCTION_API_KEY ?? "",
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
export const getSupplyOrderDetailsapi = async (reqParams: any) => {
  try {
    const baseUrl = process.env.REACT_APP_FUNC_BASE_URL ?? "";
    const GetSupplyOrderStatusDetailsUrl = format(
      "{0}{1}",
      baseUrl,
      SVC_GET_SUPPLY_ORDER_DETAILS
    );
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const authData = JSON.parse(AuthDetails ?? "");
    const accessToken = authData.accessToken?.accessToken;
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(GetSupplyOrderStatusDetailsUrl, {
      method: "POST",
      headers: {
        Authorization: authorizationToken,
        "x-functions-key": process.env.REACT_APP_FUNCTION_API_KEY ?? "",
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
