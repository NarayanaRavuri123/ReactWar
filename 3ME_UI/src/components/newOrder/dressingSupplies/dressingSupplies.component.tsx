import "./dressingSupplies.css";
import { useEffect, useState } from "react";
import { NewOrderValidator } from "../newOrder.validator";
import { IDressingSuppliesInfo } from "./dressingSupplies.interface";
import { VacCannister } from "./vacCannister/vacCannister.component";
import { getVacDressingKitProducts } from "../../../util/3meService";
import { VacDressingKit } from "./vacDressingKit/vacDressingKit.component";
import { VacDressingKitModel } from "./vacDressingKit/vacDressingKit.interface";
import { DressingSuppliesLink } from "./dressingSuppliesLink/dressingSuppliesLink";
import { DressingSuppliesReviewOrder } from "./reviewOrder/dressingSuppliesReviewOrder.component";
import {
  PRODUCT_TYPE_ACCESSORIES,
  PRODUCT_TYPE_CANISTER,
  PRODUCT_TYPE_DRESSING,
} from "../../../util/staticText";
import { Accessories } from "./accessories/accessories.component";
import {
  NewOrderContext,
  NewOrderContextType,
} from "../../../context/NewOrderContext";
import { useContext } from "react";
export const DressingSupplies = ({
  dressingKit,
  canister,
  accessory,
  productInfo,
  editButtonClicked,
  isReviewOrder = false,
  isOrderSummary = false,
  orderId,
  setDressingKit,
  setCanister,
  setAccessory,
  Validator = new NewOrderValidator(),
}: IDressingSuppliesInfo) => {
  const [validator] = useState<NewOrderValidator>(Validator!);
  const [vacProducts, setVacProducts] = useState([]);
  const [accessories, setAccessories] = useState([]);
  const [vacAllProducts, setAllVacProducts] =
    useState<VacDressingKitModel | null>(null);
  const [cannisterProduct, setcannisterProduct] = useState([]);
  const newOrderObj = useContext<NewOrderContextType | null>(NewOrderContext);
  useEffect(() => {
    fetchVacDressingProducts();
  }, []);

  const fetchVacDressingProducts = async () => {
    try {
      const response = await getVacDressingKitProducts();
      if (response.items.length > 0) {
        const vacProducts = response.items
          .filter(
            (product: any) => product.productType === PRODUCT_TYPE_DRESSING
          )
          .map(
            (x: {
              productID: any;
              productName: any;
              productCode: any;
              sku: any;
            }) => ({
              id: x.productID,
              code: x.sku,
              text: x.productName,
            })
          );
        const accessories = response.items
          .filter(
            (product: any) => product.productType === PRODUCT_TYPE_ACCESSORIES
          )
          .map(
            (x: {
              productCode: string;
              productName: string;
              productSequence: number;
              productID: number;
              sku: any;
            }) => ({
              code: x.sku,
              order: x.productSequence,
              text: x.productName,
              id: x.productID,
            })
          );
        const cannisterProduct = response.items.filter(
          (product: any) => product.productType === PRODUCT_TYPE_CANISTER
        );
        setVacProducts(vacProducts);
        setAccessories(accessories);
        setcannisterProduct(cannisterProduct);
        setAllVacProducts(response);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="dressingMain-component">
      {!isReviewOrder && (
        <div className="dressingMain">
          <h2 className="dressingHeader" data-testid="dressingHeaderTest">
            Dressings/Supplies
          </h2>
          <p className="dressingBody">
            A Letter of Medical Necessity must be completed by the clinician if
            the clinical condition of the wound(s) requires more than 15
            dressings per wound or 10 canisters per month or if 3M™ V.A.C.®
            Therapy is required for greater than 4 months.
          </p>
          <p className="dressingBody dressingBodySub">
            The following supplies will be provided to the patient with the
            rental product.
          </p>
          <DressingSuppliesLink />
          <VacDressingKit
            data={dressingKit}
            productInfo={productInfo}
            setData={setDressingKit}
            vacProducts={vacProducts}
            vacAllProducts={vacAllProducts}
            Validator={validator}
          />
          <VacCannister
            cannisterProduct={cannisterProduct}
            data={canister}
            productInfo={productInfo}
            setData={setCanister}
          />
          <Accessories
            accessoriesList={accessories}
            data={accessory}
            orderId={orderId}
            setData={setAccessory}
          />
        </div>
      )}
      {isReviewOrder && (
        <DressingSuppliesReviewOrder
          dressing={dressingKit}
          canister={canister}
          accesssory={accessory}
          editButtonClicked={editButtonClicked}
          isOrderSummary={isOrderSummary}
          newOrderObj={newOrderObj}
        />
      )}
    </div>
  );
};
