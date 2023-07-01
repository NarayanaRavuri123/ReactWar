import {
  SVC_GET_PRODUCTS_DETAIL,
  SVC_GET_PRODUCTS_LINKED_WITH_TREATMENTS,
  SVC_GET_PRODUCTS_LIST,
  SVC_GET_PRODUCT_CATEGORIES,
  SVC_GET_PRODUCT_COROUSEL_IMAGE,
  SVC_GET_RELATED_PRODUCTS_PARAMETERS,
  SVC_GET_WTG_CONTENT,
  WTG_SVC_POST_WOUND_PRODUCTS,
} from "./staticText";
import { format } from "react-string-format";

export const getCorouselImages = async () => {
  try {
    const baseUrl = process.env.REACT_APP_CONTENT_MGR_FUNC_BASE_URL ?? "";
    const cmsUrl = format("{0}{1}", baseUrl, SVC_GET_PRODUCT_COROUSEL_IMAGE);
    const response = await fetch(cmsUrl, {
      method: "GET",
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
export const getWoundProducts = async (productCode: string) => {
  try {
    const body = {
      pageIndex: 1,
      pageCount: 25,
      columnName: "productCode",
      sortOrder: "asc",
      productFilters: [
        {
          searchcolumn: "productCode",
          searchValue: productCode,
          type: "contains",
        },
      ],
    };
    const baseurl = process.env.REACT_APP_GET_WOUND_PRODUCTS ?? "";
    const cmsurl = format("{0}{1}", baseurl, WTG_SVC_POST_WOUND_PRODUCTS);
    const response = await fetch(cmsurl, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        clientID: process.env.REACT_APP_WTG_CLIENTID ?? "",
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
};

export const getProductsCategories = async () => {
  try {
    const baseUrl = process.env.REACT_APP_PRODUCT_MGR_FUNC_BASE_URL ?? "";
    const cmsUrl = format("{0}{1}", baseUrl, SVC_GET_PRODUCT_CATEGORIES);
    const response = await fetch(cmsUrl, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        "x-functions-key":
          process.env.REACT_APP_PRODUCT_MGR_FUNCTION_API_KEY ?? "",
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

export const getProducts = async (reqBody: any) => {
  try {
    const baseUrl = process.env.REACT_APP_PRODUCT_MGR_FUNC_BASE_URL ?? "";
    const requestUrl = format("{0}{1}", baseUrl, SVC_GET_PRODUCTS_LIST);
    const response = await fetch(requestUrl, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        "x-functions-key":
          process.env.REACT_APP_PRODUCT_MGR_FUNCTION_API_KEY ?? "",
      },
      body: JSON.stringify(reqBody),
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

export const getProductDetails = async (reqBody: any) => {
  const baseUrl = process.env.REACT_APP_WTG_API_HOST ?? "";
  const requestUrl = format("{0}{1}", baseUrl, SVC_GET_PRODUCTS_DETAIL);
  try {
    const response = await fetch(requestUrl, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        ClientID: process.env.REACT_APP_WTG_CLIENTID ?? "",
      },
      body: JSON.stringify(reqBody),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    return new Error("Something went wrong!");
  }
};

// export const getActivePageConfig = async () => {
//   const baseUrl = process.env.REACT_APP_WTG_API_HOST ?? "";
//   const requestUrl = format(
//     "{0}{1}",
//     baseUrl,
//     SVC_GET_ACTIVE_PAGE_CONFIGURATION
//   );
//   try {
//     const response = await fetch(requestUrl, {
//       method: "GET",
//       headers: {
//         "Access-Control-Allow-Origin": "*",
//         "Content-Type": "application/json",
//         ClientID: process.env.REACT_APP_WTG_CLIENTID ?? "",
//       },
//     });
//     const data = await response.json();
//     return data;
//   } catch (err) {
//     return new Error("Something went wrong!");
//   }
// };

export const getWTGCmsContent = async (reqBody: any) => {
  const baseUrl = process.env.REACT_APP_WTG_API_HOST ?? "";
  const requestUrl = format("{0}{1}", baseUrl, SVC_GET_WTG_CONTENT);
  try {
    const response = await fetch(requestUrl, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        ClientID: process.env.REACT_APP_WTG_CLIENTID ?? "",
      },
      body: JSON.stringify(reqBody),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    return new Error("Something went wrong!");
  }
};

export const getLinkedProducts = async (reqBody: any) => {
  const baseUrl = process.env.REACT_APP_WTG_API_HOST ?? "";
  const requestUrl = format(
    "{0}{1}",
    baseUrl,
    SVC_GET_PRODUCTS_LINKED_WITH_TREATMENTS
  );
  try {
    const response = await fetch(requestUrl, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        ClientID: process.env.REACT_APP_WTG_CLIENTID ?? "",
      },
      body: reqBody,
    });
    const data = await response.json();
    return data;
  } catch (err) {
    return new Error("Error while fetching products!");
  }
};

export const getRelatedProductParameters = async (body: any) => {
  const baseUrl = process.env.REACT_APP_WTG_API_HOST ?? "";
  const requestUrl = format(
    "{0}{1}",
    baseUrl,
    SVC_GET_RELATED_PRODUCTS_PARAMETERS
  );
  try {
    const response = await fetch(requestUrl, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        ClientID: process.env.REACT_APP_WTG_CLIENTID ?? "",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    return new Error("Something went wrong!");
  }
};
