import { IManageProfile } from "../components/manageProfile/manageProfile.interface";
import { ManageProfileValidator } from "../components/manageProfile/manageProfile.validator";
import {
  IAlertTypes,
  ISeverityTypes,
} from "../components/myPatients/patient.interface";
import {
  IInputField,
  Validation,
  ValidationStatus,
} from "../core/interfaces/input.interface";
import {
  alertColorsData,
  IAlertColours,
  AlertColourConfigBySeverity,
} from "../mockData/alertColorData";
import { useState } from "react";
import { IFacility } from "../components/manageProfile/facilityInformation/facility.interface";
import moment from "moment";

export const getAlertBgAndLabelColor = (
  alertType: IAlertTypes,
  severity: ISeverityTypes | null
) => {
  let bgColor = "",
    color = "";
  const colorObj = alertColorsData.filter(
    (aData) => aData.alertType === alertType
  )[0];
  if (severity === null) {
    const parsedObj = colorObj.colours as IAlertColours;
    bgColor = parsedObj.backgroundColour;
    color = parsedObj.foreColour;
  } else {
    const parsedObj = colorObj.colours as AlertColourConfigBySeverity;
    bgColor = parsedObj[severity].backgroundColour;
    color = parsedObj[severity].foreColour;
  }
  return [bgColor, color];
};

export const getCodeValidateError = (errorCode: any) => {
  switch (errorCode) {
    case 1004:
      return "Too many code requests have been made. Please try again after 10 minutes";
    case 1005:
      return "Please enter valid code";
    case 1006:
      return "The code is no longer valid. Please resend code";
    case 1007:
      return "Please enter valid phone number";
    case 1014:
      return "Current username does not exist";
    case 1012:
      return "New username already exists, Please go back and change the Username";
    default:
      return "Something went wrong";
  }
};

export const isEmail = (text: string) => {
  let regex = /^[a-zA-Z0-9+-._@]+$/;
  const indexOfAt = text.indexOf("@");
  const email = indexOfAt === -1 ? text : text.substring(0, indexOfAt);
  if (regex.test(email)) {
    regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(text.toLowerCase());
  }
  return false;
};

export const getValidObj = () => {
  const obj: Validation = {
    status: ValidationStatus.VALID,
    message: null,
  };
  return obj;
};
export const getInvalidObj = (msg: string | null) => {
  const obj: Validation = {
    status: ValidationStatus.INVALID,
    message: msg,
  };
  return obj;
};
export const getUntouchedObj = () => {
  const obj: Validation = {
    status: ValidationStatus.UNTOUCHED,
    message: null,
  };
  return obj;
};
export function debounce<T extends unknown[]>(
  func: (...args: T) => void | Promise<void>,
  delay: number
): (...args: T) => void | Promise<void> {
  let timer: NodeJS.Timeout | null = null;
  return (...args: T) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

export const makeCapitalEachWordInString = (input: string): string => {
  //split the above string into an array of strings
  //whenever a blank space is encountered
  if (input === undefined || input === null) {
    return "";
  }
  if (input.length === 0) {
    return input;
  }
  const arr = input.toLocaleLowerCase().split(" ");
  //loop through each element of the array and capitalize the first letter.
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  //Join all the elements of the array back into a string
  //using a blankspace as a separator
  return arr.join(" ");
};
export const makeCapitalEachOfWordInString = (input: string): string => {
  //split the above string into an array of strings
  //whenever a blank space is encountered
  if (input === undefined || input === null) {
    return "";
  }
  if (input.length === 0) {
    return input;
  }
  const arr = input.toLocaleUpperCase().split(" ");
  //loop through each element of the array and capitalize the first letter.
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  //Join all the elements of the array back into a string
  //using a blankspace as a separator
  return arr.join(" ");
};

export const formatPhoneNumber = (inputNumber: string) => {
  if (inputNumber && inputNumber !== "") {
    let removeChar = inputNumber.replace(/[^a-zA-Z0-9]/g, "");
    return removeChar.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
  }
  return "";
};

export const bindManageProfileData = (
  manageProfileResp: any,
  manageProfile: IManageProfile,
  profileValidator: ManageProfileValidator
) => {
  manageProfile.firstName = validateAndBind(
    manageProfileResp.firstName,
    "firstName",
    profileValidator,
    true
  );
  manageProfile.lastName = validateAndBind(
    manageProfileResp.lastName,
    "lastName",
    profileValidator,
    true
  );
  manageProfile.userName = validateAndBind(
    manageProfileResp.userName,
    "userName",
    profileValidator,
    false
  );
  manageProfile.licenseType = validateAndBind(
    manageProfileResp.licenceType,
    "licenseType",
    profileValidator,
    true
  );
  manageProfile.department = validateAndBind(
    manageProfileResp.departmentName,
    "department",
    profileValidator,
    true
  );
  manageProfile.title = validateAndBind(
    manageProfileResp.title,
    "title",
    profileValidator,
    true
  );
  manageProfile.email = validateAndBind(
    manageProfileResp.emailAddress,
    "email",
    profileValidator,
    true
  );
  if (
    manageProfileResp?.mobilePhoneNo !== "" &&
    manageProfileResp?.mobilePhoneNo !== null
  ) {
    manageProfile.phoneType.value = "mobile";
    manageProfile.phone.value = manageProfileResp?.mobilePhoneNo;
  } else {
    manageProfile.phoneType.value = "phone";
    manageProfile.phone.value = manageProfileResp?.phoneNo;
  }
  manageProfile.phone = validateAndBind(
    manageProfile.phone.value,
    "phone",
    profileValidator,
    true
  );
  manageProfile.phoneType = validateAndBind(
    manageProfile.phoneType.value,
    "phoneType",
    profileValidator,
    true
  );
  manageProfile.extension = validateAndBind(
    manageProfileResp.extension,
    "extension",
    profileValidator,
    true
  );
  manageProfile.rentalActivity = validateAndBind(
    manageProfileResp.emailNotifications[1].value === false ? "no" : "yes",
    "rentalActivity",
    profileValidator,
    true
  );
  manageProfile.salesActivity = validateAndBind(
    manageProfileResp.emailNotifications[2].value === false ? "no" : "yes",
    "salesActivity",
    profileValidator,
    true
  );
  manageProfile.pickUpRequest = validateAndBind(
    manageProfileResp.emailNotifications[0].value === false ? "no" : "yes",
    "pickUpRequest",
    profileValidator,
    true
  );
  const defaultValue = {
    value: "",
    valid: ValidationStatus.UNTOUCHED,
    required: false,
  };
  manageProfile.confirmPassword = defaultValue;
  manageProfile.newPassword = defaultValue;
  manageProfile.verifyEmail = defaultValue;
  return manageProfile;
};

const validateAndBind = (
  itemData: any,
  validatorName: string,
  validator: ManageProfileValidator,
  required: boolean
) => {
  const isValid = validator.validate(itemData, validatorName);
  let retunValue: IInputField = {
    value: itemData,
    valid:
      isValid?.status === ValidationStatus.VALID
        ? ValidationStatus.VALID
        : ValidationStatus.INVALID,
    required: required,
  };
  return retunValue;
};

export const formatedWoundValue = (woundValue: string) => {
  if (woundValue === ".") {
    return "00.0";
  } else if (woundValue.startsWith(".")) {
    return "00" + woundValue;
  } else if (woundValue.endsWith(".")) {
    return parseFloat(woundValue).toFixed(1);
  } else {
    return woundValue;
  }
};
export const formatYorN = (value: string | any) => {
  return value === null || value.toUpperCase() === "N" ? "No" : "Yes";
};
export const getDigits = (value: string | any) => {
  if (value == null) {
    return "0%";
  } else if (value != null) {
    const output = value.match(/\d/g)?.join("").replace(/^0+/, "") ?? "0";
    return output.length > 0 ? `${output}%` : "0%";
  }
};

export const isStringNullOrEmpty = (str: string) => {
  return str === "" || str === null;
};

function getDefaultSorting(defaultTableData: Array<any>, columns: any) {
  const sorted = [...defaultTableData].sort((a, b) => {
    const filterColumn = columns.filter((column: any) => column.sortbyOrder);

    let { accessor = "id", sortbyOrder = "asc" } = Object.assign(
      {},
      ...filterColumn
    );

    if (a[accessor] === null) return 1;
    if (b[accessor] === null) return -1;
    if (a[accessor] === null && b[accessor] === null) return 0;

    const ascending = a[accessor]
      .toString()
      .localeCompare(b[accessor].toString(), "en", {
        numeric: true,
      });

    return sortbyOrder === "asc" ? ascending : -ascending;
  });
  return sorted;
}

export const useSortableTable = (data: Array<any>, columns: any) => {
  const [tableData, setTableData] = useState<any>(
    getDefaultSorting(data, columns)
  );

  const handleSorting = (sortField: any, sortOrder: any) => {
    if (sortField) {
      const sorted = [...tableData].sort((a, b) => {
        if (a[sortField] === null) return 1;
        if (b[sortField] === null) return -1;
        if (a[sortField] === null && b[sortField] === null) return 0;
        return (
          a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
            numeric: true,
          }) * (sortOrder === "asc" ? 1 : -1)
        );
      });
      setTableData(sorted);
    }
  };

  return [tableData, setTableData, handleSorting];
};

export const convertToMmmDDFormat = (dateValue: Date): string => {
  let day = dateValue.getDate();

  let monthName = dateValue.toLocaleString("en-US", {
    month: "short",
  });

  return `${monthName} ${day}`;
};

export const convertStringToDate = (dateValue: string | null | undefined) => {
  return moment(dateValue).format("MM/DD/YYYY");
};

export const getTextFromCode = (array: never[], code: string): string => {
  if (array.length === 0 || code === "") {
    return code;
  }
  if (Array.isArray(array)) {
    let output = array
      .filter((item: { text: string; code: string }) => item.code === code)
      .map((x: { text: string }) => x.text)[0];
    return output ? output : code;
  }
  return code;
};

export const getCodeFromText = (array: never[], input: string): string => {
  if (array.length === 0) {
    return "";
  }
  if (Array.isArray(array)) {
    return array
      .filter((item: { text: string; code: string }) => item.text === input)
      .map((x: { code: string }) => x.code)[0];
  }
  return input;
};

export const formatNumber = (inputNumber: any) => {
  if (inputNumber) {
    let removeChar = inputNumber.replace(/[^a-zA-Z0-9]/g, "");
    return removeChar.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
  }
  return "";
};

export const getFcilityAddress = (item: IFacility) => {
  return (
    makeCapitalEachWordInString(item.accountName) +
    ", " +
    makeCapitalEachWordInString(item.address1) +
    ", " +
    makeCapitalEachWordInString(item.city) +
    ", " +
    item.state +
    ", " +
    item.zip
  );
};

export const getLinkedfacilityAddressData = (
  userLinkedFacilityData: IFacility[]
): string[] => {
  let data = [];
  data = userLinkedFacilityData
    .sort((a, b) => a.accountName.localeCompare(b.accountName))
    .map((item) => getFcilityAddress(item));
  return data;
};
export const handleEmptyValue = (value: string) => {
  return value === "" || value === null ? "-" : value;
};
export const getPdfUrl = (base64String: any) => {
  const byteCharacters = atob(base64String);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  return url;
};

export const getPdfUrlGif = async (base64String: any) => {
  const byteCharacters = atob(base64String);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: "image/gif" });
  const url = URL.createObjectURL(blob);
  return url;
};
export const getDocumentUrl = async (fileType: string, base64String: any) => {
  const byteCharacters = atob(base64String);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: getBlobType(fileType) });
  const url = URL.createObjectURL(blob);
  return url;
};
export const getBlobType = (fileType: string): string => {
  switch (fileType.toLowerCase()) {
    case "png":
    case "jpeg":
    case "jpg":
    case "tiff":
      return `image/${fileType.toLowerCase()}`;
    case "gif":
      return "image/jpg";
    default:
      return "";
  }
};
export const formatDate = (value: string) => {
  return value !== "" ? moment(value).format("L") : "";
};
export const formatYesOrNo = (value: string) => {
  if (value === "") return "--";
  else return value.toLowerCase() === "yes" ? "Yes" : "No";
};
export const setActiveValue = (value: string) => {
  if (value.toLowerCase() === "yes") {
    return true;
  } else if (value.toLowerCase() === "no") {
    return false;
  } else {
    return null;
  }
};

export const getFacilityPermissionName = (permissionName: string): string => {
  switch (permissionName) {
    case "3M_REP_ACCESS":
      return "View 3M Reps";
    case "RENTAL_ORDERS":
      return "Rental Orders";
    case "SALES_ORDERS":
      return "Sales Orders";
    case "WOUND_MEASUREMENTS":
      return "Wound Measurement";
    case "ALL_FACILITY_PATIENTS":
      return "All Facility Patients";
    case "INVENTORY":
      return "Inventory";
    case "MFA":
      return "Multi Factor Authentication (MFA)";
    default:
      return "";
  }
};

export interface IAnalyticsData {
  page_type: string;
  view_name: string;
  event_type: string;
  event_name: string;
  tealium_event: string;
  mmmex_userrecordid: string;
  mmmex_facilityid: string;
  mmmex_pagename: string;
  mmmex_roleid: string;
}

export const sendAnalyticsData = (data: IAnalyticsData) => {
  window.utag.link({
    page_type: data.page_type,
    view_name: data.view_name,
    event_type: data.event_type,
    event_name: data.event_name,
    tealium_event: data.tealium_event,
    mmmex_userrecordid: data.mmmex_userrecordid,
    mmmex_facilityid: data.mmmex_facilityid,
    mmmex_pagename: data.mmmex_pagename,
    mmmex_roleid: data.mmmex_roleid,
  });
};
export const getFileExtension = (fileName: string): string => {
  if (fileName) {
    const extension = fileName.split(".").pop();
    return extension?.toUpperCase()!;
  }
  return "";
};
