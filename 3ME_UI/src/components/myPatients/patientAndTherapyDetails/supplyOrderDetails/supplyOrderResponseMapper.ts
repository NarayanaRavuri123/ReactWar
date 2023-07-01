import { getBlankForNullValue } from "../orderOverview/orderOverviewResponseMapper";
import {
  ISupplyOrderInfoMapper,
  ISupplyOrderProduct,
} from "./supplyOrderResponseInterface";

export const mapAccessoryCanistorDressingData = (
  supplyOrderApiResponseData: ISupplyOrderInfoMapper,
  productType: any
) => {
  let objArray = supplyOrderApiResponseData.productList;
  let mappedResponse: any;
  mappedResponse = getAccessoriesObj(objArray, productType);
  return mappedResponse;
};

const getAccessoriesObj = (value: any, productType: any) => {
  if (value) {
    return value
      .filter(
        (productInfo: ISupplyOrderProduct) =>
          productInfo.productType === productType
      )
      .map((element: any) => {
        return {
          productType: getBlankForNullValue(element.productType),
          productNumber: getBlankForNullValue(element.productNumber),
          productSize: getBlankForNullValue(element.productSize),
          productDescription: getBlankForNullValue(element.productDescription),
          quantity: getBlankForNullValue(element.quantity),
          remainingQuantity: getBlankForNullValue(element.remainingQuantity),
        };
      });
  }
};
