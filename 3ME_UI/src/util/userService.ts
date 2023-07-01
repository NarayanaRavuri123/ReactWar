import { format } from "react-string-format";
import { IUser } from "../components/manageProfile/user.interface";
import {
  SVC_GET_FACILITY_SEARCH_RESULT_TERRITORY,
  SVC_GET_SALES_TERRITORIES,
} from "./staticText";
import {
  SVC_CREATE_USER,
  SVC_GET_USER,
  SVC_UPDATE_USER,
  SVC_VALIDATE_USER,
  SVC_UPDATE_USERNAME,
  SVC_GET_USER_ROLES_PERMISSION,
  SVC_GET_USER_LINKED_FACILITY,
  SVC_UPDATE_CONTACT_INFO,
  SVC_VALIDATE_CODE,
  SVC_UPDATE_USER_CONFIRMATION,
  SVC_GET_USER_FAVOURITE_FACILITIES,
  SVC_GET_UPDATEFAVOURITE,
  SVC_GET_SELECTFACILITY,
  SVC_GET_USER_TERRITORIES,
  SVC_GET_FACILITY_SEARCH_RESULT,
} from "./staticText";

export const getUser = async (
  userName: string | undefined,
  SvcEndpoint: string
) => {
  try {
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const data = JSON.parse(AuthDetails ?? "");
    const accessToken = data.accessToken?.accessToken;
    const reqBody = {
      userName: userName,
    };
    const baseUrl = process.env.REACT_APP_3ME_SVC_BASE_URL ?? "";
    const addPatientSearchUrl = format("{0}{1}", baseUrl, SvcEndpoint);
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(addPatientSearchUrl, {
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

export const createUser = async (requestBody: string | undefined) => {
  try {
    const baseUrl = process.env.REACT_APP_FUNC_BASE_URL ?? "";
    const createUserUrl = format("{0}{1}", baseUrl, SVC_CREATE_USER);
    const response = await fetch(createUserUrl, {
      method: "POST",
      headers: {
        AuthorizationKey: process.env.REACT_APP_CLIENTID ?? "",
        "x-functions-key": process.env.REACT_APP_FUNCTION_API_KEY ?? "",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: requestBody,
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

export const getUserProfile = async (): Promise<IUser | undefined> => {
  const AuthDetails = sessionStorage.getItem("okta-token-storage");
  if (AuthDetails) {
    const data = JSON.parse(AuthDetails ?? "");
    const userName = data.idToken.claims?.preferred_username;
    if (userName !== undefined) {
      const user = await getUser(userName, SVC_GET_USER);
      if (user.data !== undefined) {
        return user.data;
      }
    }
  }
  return undefined;
};

export const validateUserNameAndEmail = async (reqBody: string) => {
  try {
    const baseUrl = process.env.REACT_APP_FUNC_BASE_URL ?? "";
    const validateUserUrl = format("{0}{1}", baseUrl, SVC_VALIDATE_USER);
    const response = await fetch(validateUserUrl, {
      method: "POST",
      headers: {
        AuthorizationKey: process.env.REACT_APP_CLIENTID ?? "",
        "x-functions-key": process.env.REACT_APP_FUNCTION_API_KEY ?? "",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: reqBody,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

export const updateUser = async (requestBody: string | undefined) => {
  try {
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const data = JSON.parse(AuthDetails ?? "");
    const accessToken = data.accessToken?.accessToken;
    const baseUrl = process.env.REACT_APP_FUNC_BASE_URL ?? "";
    const updateUserUrl = format("{0}{1}", baseUrl, SVC_UPDATE_USER);
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(updateUserUrl, {
      method: "POST",
      headers: {
        Authorization: authorizationToken,
        AuthorizationKey: process.env.REACT_APP_CLIENTID ?? "",
        "x-functions-key": process.env.REACT_APP_FUNCTION_API_KEY ?? "",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: requestBody,
    });
    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      return undefined;
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const UpdateUserName = async (reqBody: string) => {
  try {
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const authData = JSON.parse(AuthDetails ?? "");
    const accessToken = authData.accessToken?.accessToken;
    const baseUrl = process.env.REACT_APP_FUNC_BASE_URL ?? "";
    const validateUserUrl = format("{0}{1}", baseUrl, SVC_UPDATE_USERNAME);
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(validateUserUrl, {
      method: "POST",
      headers: {
        Authorization: authorizationToken,
        AuthorizationKey: process.env.REACT_APP_CLIENTID ?? "",
        "x-functions-key": process.env.REACT_APP_FUNCTION_API_KEY ?? "",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: reqBody,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
  return undefined;
};
export const getUserRolePermission = async (facilityAddressID: string) => {
  try {
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const data = JSON.parse(AuthDetails ?? "");
    const accessToken = data.accessToken?.accessToken;
    const reqBody = {
      FacilityAddressID: facilityAddressID,
    };
    const baseUrl = process.env.REACT_APP_3ME_SVC_BASE_URL ?? "";
    const getuserRolesPermissionUrl = format(
      "{0}{1}",
      baseUrl,
      SVC_GET_USER_ROLES_PERMISSION
    );
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(getuserRolesPermissionUrl, {
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
export const fetchUserLinkedFacilities = async () => {
  try {
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const data = JSON.parse(AuthDetails ?? "");
    const accessToken = data.accessToken?.accessToken;
    const userName = data.idToken.claims?.preferred_username;
    const reqBody = {
      userName: userName,
    };
    const baseUrl = process.env.REACT_APP_3ME_SVC_BASE_URL ?? "";
    const getUserLinkedFacilityUrl = format(
      "{0}{1}",
      baseUrl,
      SVC_GET_USER_LINKED_FACILITY
    );
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(getUserLinkedFacilityUrl, {
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

export const updateUserContactInfo = async (reqBody: string) => {
  try {
    const baseUrl = process.env.REACT_APP_DURABLE_FUNCTION_BASE_URL ?? "";
    const validateUserUrl = format("{0}{1}", baseUrl, SVC_UPDATE_CONTACT_INFO);
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const oktaData = JSON.parse(AuthDetails ?? "");
    const accessToken = oktaData.accessToken?.accessToken;
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(validateUserUrl, {
      method: "POST",
      headers: {
        Authorization: authorizationToken,
        AuthorizationKey: process.env.REACT_APP_CLIENTID ?? "",
        "x-functions-key": process.env.REACT_APP_DURABLE_FUNCTION_API_KEY ?? "",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: reqBody,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

export const validateCode = async (instanceId: string, reqBody: string) => {
  try {
    const baseUrl = process.env.REACT_APP_DURABLE_FUNCTION_BASE_URL ?? "";
    const validateUserUrl = format(
      "{0}{1}{2}",
      baseUrl,
      SVC_VALIDATE_CODE,
      instanceId
    );
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const oktaData = JSON.parse(AuthDetails ?? "");
    const accessToken = oktaData.accessToken?.accessToken;
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(validateUserUrl, {
      method: "POST",
      headers: {
        Authorization: authorizationToken,
        AuthorizationKey: process.env.REACT_APP_CLIENTID ?? "",
        "x-functions-key": process.env.REACT_APP_DURABLE_FUNCTION_API_KEY ?? "",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: reqBody,
    });
    return response.status === 202;
  } catch (error) {
    console.log("error", error);
  }
};

export const updateUserConfirmation = async (
  instanceId: string,
  reqBody: string
) => {
  try {
    const baseUrl = process.env.REACT_APP_DURABLE_FUNCTION_BASE_URL ?? "";
    const validateUserUrl = format(
      "{0}{1}{2}",
      baseUrl,
      SVC_UPDATE_USER_CONFIRMATION,
      instanceId
    );
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const oktaData = JSON.parse(AuthDetails ?? "");
    const accessToken = oktaData.accessToken?.accessToken;
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(validateUserUrl, {
      method: "POST",
      headers: {
        Authorization: authorizationToken,
        AuthorizationKey: process.env.REACT_APP_CLIENTID ?? "",
        "x-functions-key": process.env.REACT_APP_DURABLE_FUNCTION_API_KEY ?? "",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: reqBody,
    });
    return response.status === 202;
  } catch (error) {
    console.log("error", error);
  }
};

export const checkUpdateContactInfoStatus = async (url: any) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};
export const getUserFavouriteFacilities = async (userUPID: any) => {
  try {
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const data = JSON.parse(AuthDetails ?? "");
    const accessToken = data.accessToken?.accessToken;
    const reqBody = {
      userName: userUPID,
    };
    const baseUrl = process.env.REACT_APP_3ME_SVC_BASE_URL ?? "";
    const getUserFavoriteFacilitiesUrl = format(
      "{0}{1}",
      baseUrl,
      SVC_GET_USER_FAVOURITE_FACILITIES
    );
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(getUserFavoriteFacilitiesUrl, {
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
export const updateFavouriteFacility = async (
  userUPID: any,
  siteUseId: string,
  status: number
) => {
  try {
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const data = JSON.parse(AuthDetails ?? "");
    const accessToken = data.accessToken?.accessToken;
    const reqBody = {
      userName: userUPID,
      siteUseId: siteUseId,
      status: status,
    };
    const baseUrl = process.env.REACT_APP_3ME_SVC_BASE_URL ?? "";
    const updateFavouriteFacilityUrl = format(
      "{0}{1}",
      baseUrl,
      SVC_GET_UPDATEFAVOURITE
    );
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(updateFavouriteFacilityUrl, {
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

export const addOrUpdateInternalUser = async (
  reqBody: any,
  SvcEndpoint: string
) => {
  try {
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const data = JSON.parse(AuthDetails ?? "");
    const accessToken = data.accessToken?.accessToken;
    const baseUrl = process.env.REACT_APP_3ME_SVC_BASE_URL ?? "";
    const addOrUpdateInternalUserUrl = format("{0}{1}", baseUrl, SvcEndpoint);
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(addOrUpdateInternalUserUrl, {
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

export const selectFacility = async (reqBody: any) => {
  try {
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const data = JSON.parse(AuthDetails ?? "");
    const accessToken = data.accessToken?.accessToken;
    const baseUrl = process.env.REACT_APP_3ME_SVC_BASE_URL ?? "";
    const updateSelectFacilityUrl = format(
      "{0}{1}",
      baseUrl,
      SVC_GET_SELECTFACILITY
    );
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(updateSelectFacilityUrl, {
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

export const getFacilitySearchResult = async (reqBody: any) => {
  try {
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const data = JSON.parse(AuthDetails ?? "");
    const accessToken = data.accessToken?.accessToken;
    const baseUrl = process.env.REACT_APP_3ME_SVC_BASE_URL ?? "";
    const updateSelectFacilityUrl = format(
      "{0}{1}",
      baseUrl,
      SVC_GET_FACILITY_SEARCH_RESULT
    );
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(updateSelectFacilityUrl, {
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

export const getUserTerritories = async (userUPID: any) => {
  try {
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const data = JSON.parse(AuthDetails ?? "");
    const accessToken = data.accessToken?.accessToken;
    const baseUrl = process.env.REACT_APP_3ME_SVC_BASE_URL ?? "";
    const updateSelectFacilityUrl = format(
      "{0}{1}",
      baseUrl,
      SVC_GET_USER_TERRITORIES
    );
    const reqBody = {
      userName: userUPID,
    };
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(updateSelectFacilityUrl, {
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
export const getSalesTerritories = async (userUPID: any) => {
  try {
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const data = JSON.parse(AuthDetails ?? "");
    const accessToken = data.accessToken?.accessToken;
    const baseUrl = process.env.REACT_APP_3ME_SVC_BASE_URL ?? "";
    const updateSelectFacilityUrl = format(
      "{0}{1}",
      baseUrl,
      SVC_GET_SALES_TERRITORIES
    );
    const reqBody = {
      userName: userUPID,
    };
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(updateSelectFacilityUrl, {
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

export const getFacilitySearchResultByTerritory = async (reqBody: any) => {
  try {
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const data = JSON.parse(AuthDetails ?? "");
    const accessToken = data.accessToken?.accessToken;
    const baseUrl = process.env.REACT_APP_3ME_SVC_BASE_URL ?? "";
    const updatesearchFacilityUrl = format(
      "{0}{1}",
      baseUrl,
      SVC_GET_FACILITY_SEARCH_RESULT_TERRITORY
    );
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(updatesearchFacilityUrl, {
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
