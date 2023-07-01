import moment from "moment";
import {
  ISaveSupplyOrderRequest,
  Product,
  VacUnit,
} from "./supplyOrderRequestMapper.interface";
import { ISupplyOrder } from "../supplyOrder.interface";
import { saveSupplyOrder } from "../../../util/3meService";
import { ICanister, IDressingKit } from "../../newOrder/newOrder.interface";
import { SupplyOrderContextType } from "../../../context/SupplyOrderContext";
import { IVACProductInfo } from "../patientVACDetail/patientVACDetail.interface";

export const mapSaveSupplyOrderRequest = async (
  newSupplyOrderObj: ISupplyOrder,
  supplyOrderContext: SupplyOrderContextType | null,
  facilityName: string | undefined,
  siteuserID: string | undefined
) => {
  let requestBody: ISaveSupplyOrderRequest;
  requestBody = {
    rentalOrderNumber: supplyOrderContext?.selectedPatient?.roNumber
      ? supplyOrderContext?.selectedPatient?.roNumber!.toString()
      : "",
    customer: {
      firstName: supplyOrderContext?.selectedPatient.firstName
        ? supplyOrderContext?.selectedPatient.firstName.trim()
        : "",
      lastName: supplyOrderContext?.selectedPatient.lastName
        ? supplyOrderContext?.selectedPatient.lastName.trim()
        : "",
      dob: formatDate(supplyOrderContext?.selectedPatient.dob),
      currentAddress: {
        addressLine1: newSupplyOrderObj?.caAddressLine1.value,
        addressLine2: newSupplyOrderObj?.caAddressLine2.value,
        city: newSupplyOrderObj?.caCity.value,
        stateCode: newSupplyOrderObj?.caState.value,
        postalCode: newSupplyOrderObj?.caZipCode.value,
      },
    },
    replenishmentOption: newSupplyOrderObj?.typeOfOrder.value === "Yes" ? 2 : 1,
    isCurrentAddress:
      newSupplyOrderObj?.sameAsCurrentAddress.value.toLowerCase() === "yes"
        ? true
        : false,
    shippingAddress: {
      addressLine1: newSupplyOrderObj?.addressLine1.value,
      addressLine2: newSupplyOrderObj?.addressLine2.value,
      city: newSupplyOrderObj?.city.value,
      stateCode: newSupplyOrderObj?.state.value,
      postalCode: newSupplyOrderObj?.zipCode.value,
    },
    requestor: {
      facilityName: facilityName
        ? facilityName
        : supplyOrderContext?.selectedPatient?.facilityName!,
      siteUseID: siteuserID ? siteuserID : "",
    },
    vacUnit: getVacUnit(supplyOrderContext?.vacProductInfo!),
    mainDressing: getMainDressing(supplyOrderContext?.dressingKit!),
    additionalDressing: getAdditionalDressing(supplyOrderContext?.dressingKit!),
    canister: getCannister(supplyOrderContext?.canister!),
    accessories: getAccessoriesObj(supplyOrderContext?.accessory?.accessories),
    individualVacDressings: parseInt(
      newSupplyOrderObj?.currentSuppliesVacDressingQuantity.value
    ),
    individualVacCanisters: parseInt(
      newSupplyOrderObj?.currentSuppliesVacCannisterQuantity.value
    ),
    dressingChangeFrequency: parseInt(
      newSupplyOrderObj?.dressingChangeFrequency.value
    ),
    resupplyJustification: parseInt(
      newSupplyOrderObj?.resupplyJustification.value
    ),
    orderNotes: newSupplyOrderObj?.provideAdditionalInfo.value,
  };
  return requestBody;
};

const getVacUnit = (vacProductInfo: IVACProductInfo) => {
  let vacUnit: number;
  if (vacProductInfo.brandName.toLowerCase().includes("freedom")) {
    vacUnit = VacUnit.FREEDOM;
  } else {
    vacUnit = VacUnit.ACTIVAC;
  }
  return vacUnit;
};

const getMainDressing = (supplyOrderDetails: IDressingKit) => {
  let dressingData: Product;
  if (
    supplyOrderDetails.productCode.value === "" &&
    supplyOrderDetails.productSizeCode.value === ""
  ) {
    return null;
  } else {
    dressingData = {
      quantity: parseInt(supplyOrderDetails.productQuantity.value),
      sku:
        supplyOrderDetails.productCode.value === null
          ? supplyOrderDetails.productSizeCode.value
          : supplyOrderDetails.productCode.value,
    };
    return dressingData;
  }
};

const getAdditionalDressing = (supplyOrderDetails: IDressingKit) => {
  let dressingData: Product;
  if (
    supplyOrderDetails.secProductCode.value === "" &&
    supplyOrderDetails.secProductSizeCode.value === ""
  ) {
    return null;
  } else {
    dressingData = {
      quantity: parseInt(supplyOrderDetails.secProductQuantity.value),
      sku:
        supplyOrderDetails.secProductCode.value === null
          ? supplyOrderDetails.secProductSizeCode.value
          : supplyOrderDetails.secProductCode.value,
    };
    return dressingData;
  }
};

const getCannister = (supplyOrderDetails: ICanister) => {
  let dressingData: Product;
  if (
    supplyOrderDetails.canisterProductCode.value === "" ||
    supplyOrderDetails.canisterProductCode.value === undefined
  ) {
    return null;
  } else {
    dressingData = {
      quantity: parseInt(supplyOrderDetails.canisterProductQuantity.value),
      sku: supplyOrderDetails.canisterProductCode.value,
    };
    return dressingData;
  }
};

const getAccessoriesObj = (value: any) => {
  return value.map((element: any) => {
    return { sku: element.code.toString(), quantity: 1 };
  });
};

const formatDate = (value: string | undefined) => {
  if (value !== undefined) {
    return moment(value).format("yyyy-MM-DD");
  } else {
    return null;
  }
};

export const callSaveSupplyOrder = async (
  newSupplyOrderObj: ISupplyOrder,
  supplyOrderContext: SupplyOrderContextType | null,
  facilityName: string | undefined,
  siteuserID: string | undefined
) => {
  let result;
  const reqParam: ISaveSupplyOrderRequest = await mapSaveSupplyOrderRequest(
    newSupplyOrderObj,
    supplyOrderContext,
    facilityName,
    siteuserID
  );
  result = await saveSupplyOrder(reqParam);
  return result;
};
