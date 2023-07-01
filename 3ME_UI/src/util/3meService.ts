import axios from "axios";
import { format } from "react-string-format";
import {
  SVC_RETRIEVE_PATIENT,
  SVC_RETRIEVE_SALESREP,
  SVC_RETRIEVE_PATIENT_SEARCH,
  SVC_ADD_SEARCH_PATIENT,
  SVC_SEARCH_FACILITY,
  SVC_CONTACTUS_REQUEST,
  SVC_REMOVE_PATIENT,
  SVC_GET_VAC_DRESSING_PRODUCTS,
  SVC_SEARCH_CAREGIVER_FACILITY,
  SVC_SEARCH_PRESCRIBER,
  SVC_SEARCH_HOMECAREFACILITY,
  SVC_SAVE_VAC_ORDER,
  SVC_SHARE_ORDER_EMAIL_REGISTRATION,
  SVC_UPDATE_VAC_ORDER,
  SVC_GET_WOUND_LIST,
  SVC_UPLOAD_DOCUMENT,
  SVC_GET_REPLENISHSUPPLYORDER,
  SVC_GET_SERVERDATETIME,
  SVC_GET_VACORDERLOCKSTATUS,
  SVC_CREATE_SUPPLY_ORDER,
  SVC_CHECK_POST_ACUTE_FACILITY,
  SVC_GET_PRESCRIPTION_TYPE,
  SVC_GET_EPRESCRIPTION_STATUS,
  SVC_GET_PRESCRIPTION_INFO,
  SVC_UPDATE_PRESCRIPTION_INFO,
  SVC_GET_PATIENT_ADDRESSES,
  SVC_SEND_3M_NOTE,
  SVC_GET_FACILITY_PERMISSION,
  SVC_UPDATE_FACILITY_PERMISSIONS,
  SVC_SAVE_WOUND_ASSESSMENT_ORDER,
  SVC_GET_UNLINKED_FACILITES_COUNT,
  SVC_CANCEL_READY_CARE_ORDER,
  SVC_GENERATE_FAX_COVERSHEET,
  SVC_GET_FACILITY_PATIENT,
  SVC_GET_SINGLE_PATIENT,
} from "./staticText";
import { IPatient } from "../components/myPatients/patient.interface";
import { ICheckPostAcuteFacility } from "../components/manageProfile/facilityInformation/facilityFound/facilityFound.interface";

export const getPatients = async (searchString: string) => {
  // API call
  try {
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const data = JSON.parse(AuthDetails ?? "");
    const accessToken = data.accessToken?.accessToken;
    const baseUrl = process.env.REACT_APP_3ME_SVC_BASE_URL ?? "";
    const retrievePatientEndpoint = SVC_RETRIEVE_PATIENT;
    const retrievePatientUrl = format(
      "{0}{1}",
      baseUrl,
      retrievePatientEndpoint
    );
    const authorizationToken = format("Bearer {0}", accessToken);
    const requestObject = {
      Page: -1,
      Size: -1,
      SearchInput: searchString,
    };
    const options = {
      headers: { Authorization: authorizationToken },
    };
    const response = await axios.post(
      retrievePatientUrl,
      requestObject,
      options
    );

    if (response.status === 200) {
      const responseData = response.data;
      if (responseData.data) {
        const patientData: Array<IPatient> = responseData.data;
        return patientData;
      } else {
        const emptyResponse: Array<IPatient> = new Array<IPatient>();
        return emptyResponse;
      }
    } else if (response.status === 204) {
      const emptyResponse: Array<IPatient> = new Array<IPatient>();
      return emptyResponse;
    } else {
      return null;
    }
  } catch (error) {
    console.log("error", error);
    return null;
  }
};

export const getSalesRep = async (zipcode: string | null) => {
  try {
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const data = JSON.parse(AuthDetails ?? "");
    const accessToken = data.accessToken?.accessToken;
    const email = data.idToken.claims?.email;
    const baseUrl = process.env.REACT_APP_3ME_SVC_BASE_URL ?? "";
    const retrieveSalesRepUrl = format(
      "{0}{1}",
      baseUrl,
      SVC_RETRIEVE_SALESREP
    );
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(retrieveSalesRepUrl, {
      method: "POST",
      headers: {
        Authorization: authorizationToken,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        EmailID: email,
        Zipcode: zipcode,
      }),
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

export const getPatientSearch = async (reqParams: any) => {
  try {
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const data = JSON.parse(AuthDetails ?? "");
    const accessToken = data.accessToken?.accessToken;
    const baseUrl = process.env.REACT_APP_3ME_SVC_BASE_URL ?? "";
    const getPatientSearchUrl = format(
      "{0}{1}",
      baseUrl,
      SVC_RETRIEVE_PATIENT_SEARCH
    );
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(getPatientSearchUrl, {
      method: "POST",
      headers: {
        Authorization: authorizationToken,
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
};

export const removePatient = async (reqParams: any) => {
  try {
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const data = JSON.parse(AuthDetails ?? "");
    const accessToken = data.accessToken?.accessToken;
    const baseUrl = process.env.REACT_APP_3ME_SVC_BASE_URL ?? "";
    const removePatientUrl = format("{0}{1}", baseUrl, SVC_REMOVE_PATIENT);
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(removePatientUrl, {
      method: "POST",
      headers: {
        Authorization: authorizationToken,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(reqParams),
    });
    if (response.status === 200) {
      const data = response.json();
      return data;
    } else {
      return null;
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const addPatientSearch = async (reqParams: any) => {
  try {
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const data = JSON.parse(AuthDetails ?? "");
    const accessToken = data.accessToken?.accessToken;
    const email = data.idToken.claims?.email;
    reqParams["Email"] = email;
    const baseUrl = process.env.REACT_APP_3ME_SVC_BASE_URL ?? "";
    const addPatientSearchUrl = format(
      "{0}{1}",
      baseUrl,
      SVC_ADD_SEARCH_PATIENT
    );
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(addPatientSearchUrl, {
      method: "POST",
      headers: {
        Authorization: authorizationToken,
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
};

export const facilitySearch = async (reqParams: any) => {
  try {
    const baseUrl = process.env.REACT_APP_3ME_SVC_BASE_URL ?? "";
    const getFacilityInfoUrl = format("{0}{1}", baseUrl, SVC_SEARCH_FACILITY);
    const response = await fetch(getFacilityInfoUrl, {
      method: "POST",
      headers: {
        AuthorizationKey: process.env.REACT_APP_3ME_SVC_API_KEY ?? "",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(reqParams),
    });
    if (response.status === 200) {
      const data = response.json();
      return data;
    } else {
      console.log(response);
      return null;
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const contactUsRequest = async (reqParams: any) => {
  try {
    const baseUrl = process.env.REACT_APP_3ME_SVC_BASE_URL ?? "";
    const contactUsRequestUrl = format(
      "{0}{1}",
      baseUrl,
      SVC_CONTACTUS_REQUEST
    );
    const response = await fetch(contactUsRequestUrl, {
      method: "POST",
      headers: {
        AuthorizationKey: process.env.REACT_APP_3ME_SVC_API_KEY ?? "",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(reqParams),
    });
    if (response.status === 200) {
      const data = response.json();
      return data;
    } else {
      console.log("error");
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const getVacDressingKitProducts = async () => {
  // API call
  try {
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const data = JSON.parse(AuthDetails ?? "");
    const accessToken = data.accessToken?.accessToken;
    const baseUrl = process.env.REACT_APP_FUNC_BASE_URL ?? "";
    const vacDressingKitURL = format(
      "{0}{1}",
      baseUrl,
      SVC_GET_VAC_DRESSING_PRODUCTS
    );
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(vacDressingKitURL, {
      method: "POST",
      headers: {
        "x-functions-key": process.env.REACT_APP_FUNCTION_API_KEY ?? "",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: authorizationToken,
      },
    });
    if (response.status === 200) {
      const data = response.json();
      return data;
    } else {
      console.log(response);
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const caregiverFacilitySearch = async (reqParams: any) => {
  try {
    const baseUrl = process.env.REACT_APP_FUNC_BASE_URL ?? "";
    const getFacilityInfoUrl = format(
      "{0}{1}",
      baseUrl,
      SVC_SEARCH_CAREGIVER_FACILITY
    );
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const data = JSON.parse(AuthDetails ?? "");
    const accessToken = data.accessToken?.accessToken;
    const authorizationToken = accessToken
      ? format("Bearer {0}", accessToken)
      : "";
    const response = await fetch(getFacilityInfoUrl, {
      method: "POST",
      headers: {
        "x-functions-key": process.env.REACT_APP_FUNCTION_API_KEY ?? "",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: authorizationToken,
      },
      body: JSON.stringify(reqParams),
    });
    if (response.status === 200) {
      const data = response.json();
      return data;
    } else {
      console.log(response);
      return undefined;
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const prescriberSearch = async (reqParams: any) => {
  try {
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const data = JSON.parse(AuthDetails ?? "");
    const accessToken = data.accessToken?.accessToken;
    const baseUrl = process.env.REACT_APP_3ME_SVC_BASE_URL ?? "";
    const prescriberSearchUrl = format(
      "{0}{1}",
      baseUrl,
      SVC_SEARCH_PRESCRIBER
    );
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(prescriberSearchUrl, {
      method: "POST",
      headers: {
        Authorization: authorizationToken,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(reqParams),
    });
    if (response.status === 200) {
      const data = response.json();
      return data;
    } else {
      console.log("error");
      return undefined;
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const homeCareProviderSearch = async (reqParams: any) => {
  try {
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const data = JSON.parse(AuthDetails ?? "");
    const accessToken = data.accessToken?.accessToken;
    const baseUrl = process.env.REACT_APP_3ME_SVC_BASE_URL ?? "";
    const hcpSearchUrl = format("{0}{1}", baseUrl, SVC_SEARCH_HOMECAREFACILITY);
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(hcpSearchUrl, {
      method: "POST",
      headers: {
        Authorization: authorizationToken,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(reqParams),
    });
    if (response.status === 200) {
      const data = response.json();
      return data;
    } else {
      console.log(response);
      return undefined;
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const shareOrderRegistrationEmail = async (reqParams: any) => {
  try {
    const baseUrl = process.env.REACT_APP_3ME_SVC_BASE_URL ?? "";
    const shareOrderEmailURL = format(
      "{0}{1}",
      baseUrl,
      SVC_SHARE_ORDER_EMAIL_REGISTRATION
    );
    const response = await fetch(shareOrderEmailURL, {
      method: "POST",
      headers: {
        AuthorizationKey: process.env.REACT_APP_3ME_SVC_API_KEY ?? "",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(reqParams),
    });
    if (response.status === 200) {
      const data = response.json();
      return data;
    } else {
      console.log(response);
      return undefined;
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const saveVacOrder = async (reqParams: any) => {
  try {
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const data = JSON.parse(AuthDetails ?? "");
    const accessToken = data.accessToken?.accessToken;
    const baseUrl = process.env.REACT_APP_3ME_SVC_BASE_URL ?? "";
    const saveVacOrderUrl = format("{0}{1}", baseUrl, SVC_SAVE_VAC_ORDER);
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(saveVacOrderUrl, {
      method: "POST",
      headers: {
        Authorization: authorizationToken,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(reqParams),
    });
    if (response.status === 200) {
      const data = response.json();
      return data;
    } else {
      console.log(response);
      return undefined;
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const updateVacOrder = async (reqParams: any) => {
  try {
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const data = JSON.parse(AuthDetails ?? "");
    const accessToken = data.accessToken?.accessToken;
    const baseUrl = process.env.REACT_APP_3ME_SVC_BASE_URL ?? "";
    const saveVacOrderUrl = format("{0}{1}", baseUrl, SVC_UPDATE_VAC_ORDER);
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(saveVacOrderUrl, {
      method: "POST",
      headers: {
        Authorization: authorizationToken,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(reqParams),
    });
    if (response.status === 200) {
      const data = response.json();
      return data;
    } else {
      console.log(response);
      return undefined;
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const fetchWoundList = async (reqParams: any) => {
  try {
    const baseUrl = process.env.REACT_APP_FUNC_BASE_URL ?? "";
    const getWoundListUrl = format("{0}{1}", baseUrl, SVC_GET_WOUND_LIST);
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const data = JSON.parse(AuthDetails ?? "");
    const accessToken = data.accessToken?.accessToken;
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(getWoundListUrl, {
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
    } else if (response.status === 502) {
      const data = response.json();
      return data;
    } else {
      console.log(response);
      return undefined;
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const uploadDocument = async (reqParams: any) => {
  try {
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const data = JSON.parse(AuthDetails ?? "");
    const accessToken = data.accessToken?.accessToken;
    const baseUrl = process.env.REACT_APP_3ME_SVC_BASE_URL ?? "";
    const uploadDocUrl = format("{0}{1}", baseUrl, SVC_UPLOAD_DOCUMENT);
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(uploadDocUrl, {
      method: "POST",
      headers: {
        Authorization: authorizationToken,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(reqParams),
    });
    if (response.status === 200) {
      const data = response.json();
      return data;
    } else {
      console.log(response);
      return undefined;
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const getReplenishSupplyOrder = async (reqParams: any) => {
  // API call
  try {
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const data = JSON.parse(AuthDetails ?? "");
    const accessToken = data.accessToken?.accessToken;
    const baseUrl = process.env.REACT_APP_3ME_SVC_BASE_URL ?? "";
    const getReplenishSupplyOrderURL = format(
      "{0}{1}",
      baseUrl,
      SVC_GET_REPLENISHSUPPLYORDER
    );
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(getReplenishSupplyOrderURL, {
      method: "POST",
      headers: {
        "x-functions-key": process.env.REACT_APP_FUNCTION_API_KEY ?? "",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: authorizationToken,
      },
      body: JSON.stringify(reqParams),
    });
    if (response.status === 200) {
      const data = response.json();
      return data;
    } else {
      console.log(response);
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const getCurrentServerDateTime = async () => {
  // API call
  try {
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const data = JSON.parse(AuthDetails ?? "");
    const accessToken = data.accessToken?.accessToken;
    const baseUrl = process.env.REACT_APP_FUNC_BASE_URL ?? "";
    const getCurrentServerDateTimeURL = format(
      "{0}{1}",
      baseUrl,
      SVC_GET_SERVERDATETIME
    );
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(getCurrentServerDateTimeURL, {
      method: "POST",
      headers: {
        "x-functions-key": process.env.REACT_APP_FUNCTION_API_KEY ?? "",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: authorizationToken,
      },
    });
    if (response.status === 200) {
      const data = response.json();
      return data;
    } else {
      console.log(response);
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const getVacOrderLockStatus = async (reqParams: any) => {
  // API call
  try {
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const data = JSON.parse(AuthDetails ?? "");
    const accessToken = data.accessToken?.accessToken;
    const baseUrl = process.env.REACT_APP_3ME_SVC_BASE_URL ?? "";
    const getVacOrderLockStatusURL = format(
      "{0}{1}",
      baseUrl,
      SVC_GET_VACORDERLOCKSTATUS
    );
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(getVacOrderLockStatusURL, {
      method: "POST",
      headers: {
        "x-functions-key": process.env.REACT_APP_FUNCTION_API_KEY ?? "",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: authorizationToken,
      },
      body: JSON.stringify(reqParams),
    });
    if (response.status === 200) {
      const data = response.json();
      return data;
    } else {
      console.log(response);
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const saveSupplyOrder = async (reqParams: any) => {
  try {
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const data = JSON.parse(AuthDetails ?? "");
    const accessToken = data.accessToken?.accessToken;
    const baseUrl = process.env.REACT_APP_3ME_SVC_BASE_URL ?? "";
    const saveSupplyOrderUrl = format(
      "{0}{1}",
      baseUrl,
      SVC_CREATE_SUPPLY_ORDER
    );
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(saveSupplyOrderUrl, {
      method: "POST",
      headers: {
        Authorization: authorizationToken,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(reqParams),
    });
    if (response.status === 200) {
      const data = response.json();
      return data;
    } else {
      console.log(response);
      return undefined;
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const checkPostAcuteFacility = async (reqParams: any) => {
  try {
    const baseUrl = process.env.REACT_APP_3ME_SVC_BASE_URL ?? "";
    const checkPostAcuteFacilityUrl = format(
      "{0}{1}",
      baseUrl,
      SVC_CHECK_POST_ACUTE_FACILITY
    );
    const response = await fetch(checkPostAcuteFacilityUrl, {
      method: "POST",
      headers: {
        AuthorizationKey: process.env.REACT_APP_3ME_SVC_API_KEY ?? "",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(reqParams),
    });
    if (response.status === 200) {
      const result = await response.json();
      return result.data;
    } else {
      console.log(response);
      return undefined;
    }
  } catch (error) {
    console.log("error", error);
    return undefined;
  }
};

export const getPrescriptionDetails = async (reqParams: any) => {
  try {
    const baseUrl = process.env.REACT_APP_FUNC_BASE_URL ?? "";
    const getPrescriptionTypeUrl = format(
      "{0}{1}",
      baseUrl,
      SVC_GET_PRESCRIPTION_TYPE
    );
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const data = JSON.parse(AuthDetails ?? "");
    const accessToken = data.accessToken?.accessToken;
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(getPrescriptionTypeUrl, {
      method: "POST",
      headers: {
        "x-functions-key": process.env.REACT_APP_FUNCTION_API_KEY ?? "",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: authorizationToken,
      },
      body: JSON.stringify(reqParams),
    });
    if (response.status === 200) {
      const result = await response.json();
      return result;
    } else {
      console.log(response);
      return undefined;
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const getEPrescriptionStatus = async (reqParams: any) => {
  try {
    const baseUrl = process.env.REACT_APP_FUNC_BASE_URL ?? "";
    const getPrescriptionTypeUrl = format(
      "{0}{1}",
      baseUrl,
      SVC_GET_EPRESCRIPTION_STATUS
    );
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const data = JSON.parse(AuthDetails ?? "");
    const accessToken = data.accessToken?.accessToken;
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(getPrescriptionTypeUrl, {
      method: "POST",
      headers: {
        "x-functions-key": process.env.REACT_APP_FUNCTION_API_KEY ?? "",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: authorizationToken,
      },
      body: JSON.stringify(reqParams),
    });
    if (response.status === 200) {
      const result = await response.json();
      return result;
    } else {
      console.log(response);
      return undefined;
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const getPrescriptionInfo = async (reqParams: any) => {
  try {
    const baseUrl = process.env.REACT_APP_3ME_SVC_BASE_URL ?? "";
    const getPrescriptionTypeUrl = format(
      "{0}{1}",
      baseUrl,
      SVC_GET_PRESCRIPTION_INFO
    );
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const data = JSON.parse(AuthDetails ?? "");
    const accessToken = data.accessToken?.accessToken;
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(getPrescriptionTypeUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: authorizationToken,
      },
      body: JSON.stringify(reqParams),
    });
    if (response.status === 200) {
      const result = await response.json();
      return result;
    } else {
      console.log(response);
      return undefined;
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const updatePrescriptionType = async (reqParams: any) => {
  try {
    const baseUrl = process.env.REACT_APP_3ME_SVC_BASE_URL ?? "";
    const getPrescriptionTypeUrl = format(
      "{0}{1}",
      baseUrl,
      SVC_UPDATE_PRESCRIPTION_INFO
    );
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const data = JSON.parse(AuthDetails ?? "");
    const accessToken = data.accessToken?.accessToken;
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(getPrescriptionTypeUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: authorizationToken,
      },
      body: JSON.stringify(reqParams),
    });
    if (response.status === 200) {
      const result = await response.json();
      return result;
    } else {
      console.log(response);
      return undefined;
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const getPatientAddresses = async (reqParams: any) => {
  try {
    const baseUrl = process.env.REACT_APP_FUNC_BASE_URL ?? "";
    const getPatientAddressesUrl = format(
      "{0}{1}",
      baseUrl,
      SVC_GET_PATIENT_ADDRESSES
    );
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const data = JSON.parse(AuthDetails ?? "");
    const accessToken = data.accessToken?.accessToken;
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(getPatientAddressesUrl, {
      method: "POST",
      headers: {
        "x-functions-key": process.env.REACT_APP_FUNCTION_API_KEY ?? "",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: authorizationToken,
      },
      body: JSON.stringify(reqParams),
    });
    if (response.status === 200) {
      const result = await response.json();
      return result;
    } else {
      console.log(response);
      return undefined;
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const send3MNote = async (reqParams: any) => {
  try {
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const data = JSON.parse(AuthDetails ?? "");
    const accessToken = data.accessToken?.accessToken;
    const baseUrl = process.env.REACT_APP_3ME_SVC_BASE_URL ?? "";
    const sendNoteUrl = format("{0}{1}", baseUrl, SVC_SEND_3M_NOTE);
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(sendNoteUrl, {
      method: "POST",
      headers: {
        AuthorizationKey: process.env.REACT_APP_3ME_SVC_API_KEY ?? "",
        Authorization: authorizationToken,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(reqParams),
    });
    if (response.status === 200) {
      const data = response.json();
      return data;
    } else {
      console.log(response);
      return undefined;
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const fetchFacilityPermissions = async (reqParams: any) => {
  try {
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const data = JSON.parse(AuthDetails ?? "");
    const accessToken = data.accessToken?.accessToken;
    const baseUrl = process.env.REACT_APP_3ME_SVC_BASE_URL ?? "";
    const sendNoteUrl = format("{0}{1}", baseUrl, SVC_GET_FACILITY_PERMISSION);
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(sendNoteUrl, {
      method: "POST",
      headers: {
        AuthorizationKey: process.env.REACT_APP_3ME_SVC_API_KEY ?? "",
        Authorization: authorizationToken,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(reqParams),
    });
    if (response.status === 200) {
      const data = response.json();
      return data;
    } else {
      console.log(response);
      return undefined;
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const updateFacilityPermissions = async (reqParams: any) => {
  try {
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const data = JSON.parse(AuthDetails ?? "");
    const accessToken = data.accessToken?.accessToken;
    const baseUrl = process.env.REACT_APP_3ME_SVC_BASE_URL ?? "";
    const sendNoteUrl = format(
      "{0}{1}",
      baseUrl,
      SVC_UPDATE_FACILITY_PERMISSIONS
    );
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(sendNoteUrl, {
      method: "POST",
      headers: {
        AuthorizationKey: process.env.REACT_APP_3ME_SVC_API_KEY ?? "",
        Authorization: authorizationToken,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(reqParams),
    });
    if (response.status === 200) {
      const data = response.json();
      return data;
    } else {
      console.log(response);
      return undefined;
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const getUnlinkedFacilitesCount = async () => {
  try {
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const data = JSON.parse(AuthDetails ?? "");
    const accessToken = data.accessToken?.accessToken;
    const baseUrl = process.env.REACT_APP_3ME_SVC_BASE_URL ?? "";
    const unlinkedFacilitesURL = format(
      "{0}{1}",
      baseUrl,
      SVC_GET_UNLINKED_FACILITES_COUNT
    );
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(unlinkedFacilitesURL, {
      method: "GET",
      headers: {
        AuthorizationKey: process.env.REACT_APP_3ME_SVC_API_KEY ?? "",
        Authorization: authorizationToken,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
    if (response.status === 200) {
      const data = response.json();
      return data;
    } else {
      console.log(response);
      return undefined;
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const saveWoundAssessment = async (reqParams: any) => {
  try {
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const data = JSON.parse(AuthDetails ?? "");
    const accessToken = data.accessToken?.accessToken;
    const baseUrl = process.env.REACT_APP_3ME_SVC_BASE_URL ?? "";
    const saveWoundAssessmentUrl = format(
      "{0}{1}",
      baseUrl,
      SVC_SAVE_WOUND_ASSESSMENT_ORDER
    );
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(saveWoundAssessmentUrl, {
      method: "POST",
      headers: {
        Authorization: authorizationToken,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(reqParams),
    });
    if (response.status === 200) {
      const data = response.json();
      return data;
    } else {
      console.log(response);
      return undefined;
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const cancelReadyCarePatientOrder = async (reqParams: any) => {
  try {
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const data = JSON.parse(AuthDetails ?? "");
    const accessToken = data.accessToken?.accessToken;
    const baseUrl = process.env.REACT_APP_3ME_SVC_BASE_URL ?? "";
    const cancelReadyCarePatientOrderUrl = format(
      "{0}{1}",
      baseUrl,
      SVC_CANCEL_READY_CARE_ORDER
    );
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(cancelReadyCarePatientOrderUrl, {
      method: "POST",
      headers: {
        Authorization: authorizationToken,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(reqParams),
    });
    if (response.status === 200) {
      const data = response.json();
      return data;
    } else {
      console.log(response);
      return undefined;
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const generateFaxCoverSheet = async (reqParams: any) => {
  try {
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const data = JSON.parse(AuthDetails ?? "");
    const accessToken = data.accessToken?.accessToken;
    const baseUrl = process.env.REACT_APP_3ME_SVC_BASE_URL ?? "";
    const generateFaxCoverSheetUrl = format(
      "{0}{1}",
      baseUrl,
      SVC_GENERATE_FAX_COVERSHEET
    );
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(generateFaxCoverSheetUrl, {
      method: "POST",
      headers: {
        Authorization: authorizationToken,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(reqParams),
    });
    if (response.status === 200) {
      const data = response.json();
      return data;
    } else {
      console.log(response);
      return undefined;
    }
  } catch (error) {
    console.log("error", error);
  }
};
export const getFaciityPatients = async (
  siteUseId: string | undefined | null,
  careGiverId: string | undefined | null,
  userName: string | undefined,
  isForSupplyOrder: boolean
) => {
  // API call
  try {
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const data = JSON.parse(AuthDetails ?? "");
    const accessToken = data.accessToken?.accessToken;
    const baseUrl = process.env.REACT_APP_3ME_SVC_BASE_URL ?? "";
    const retrievePatientEndpoint = SVC_GET_FACILITY_PATIENT;
    const retrievePatientUrl = format(
      "{0}{1}",
      baseUrl,
      retrievePatientEndpoint
    );
    const authorizationToken = format("Bearer {0}", accessToken);
    const requestObject = {
      userName: userName,
      siteUseId: siteUseId,
      caregiverId: careGiverId,
      isForSupplyOrder: isForSupplyOrder,
    };

    const response = await fetch(retrievePatientUrl, {
      method: "POST",
      headers: {
        Authorization: authorizationToken,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(requestObject),
    });

    if (response.status === 200) {
      const responseData = response.json();
      return responseData;
    } else if (response.status === 204) {
      const emptyResponse: Array<IPatient> = new Array<IPatient>();
      return emptyResponse;
    } else {
      return null;
    }
  } catch (error) {
    console.log("error", error);
    return null;
  }
};
const checkPostAcuteFacilityFound = async (typeCode: string) => {
  const reqBody = { FacilityTypeCode: typeCode };
  const response: ICheckPostAcuteFacility = await checkPostAcuteFacility(
    reqBody
  );
  return response;
};

export const getCareGiverId = async (
  accountNumber: string | undefined,
  typeCode: string | undefined
) => {
  let careGiverId = "";
  if (accountNumber && typeCode) {
    let response = await checkPostAcuteFacilityFound(typeCode);
    if (response && response.facilityTypeCodeFound && response.postAcuteFound) {
      const reqBody = {
        customerAccountNumber: accountNumber,
      };
      const response = await caregiverFacilitySearch(reqBody);
      if (response && response.items && response.items.length > 0) {
        let homeCareGiverDetails = response.items;
        const homeCareGiverDetail = homeCareGiverDetails[0];
        careGiverId = homeCareGiverDetail.origSystemReference;
      }
    }
  }
  return careGiverId;
};

export const getPatient = async (roNumber: string, dob: string) => {
  try {
    const AuthDetails = sessionStorage.getItem("okta-token-storage");
    const data = JSON.parse(AuthDetails ?? "");
    const accessToken = data.accessToken?.accessToken;
    const baseUrl = process.env.REACT_APP_3ME_SVC_BASE_URL ?? "";
    const getSinglePatient = format("{0}{1}", baseUrl, SVC_GET_SINGLE_PATIENT);
    const authorizationToken = format("Bearer {0}", accessToken);
    const response = await fetch(getSinglePatient, {
      method: "POST",
      headers: {
        Authorization: authorizationToken,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        ron: roNumber,
        dob: dob,
        username: data.accessToken.claims?.sub,
      }),
    });
    if (response.status === 200) {
      const data = response.json();
      return data;
    } else {
      console.log(response);
      return undefined;
    }
  } catch (error) {
    console.log("error", error);
  }
};
