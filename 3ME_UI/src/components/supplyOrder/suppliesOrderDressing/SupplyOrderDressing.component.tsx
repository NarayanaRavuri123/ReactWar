import moment from "moment";
import {
  getReplenishSupplyOrder,
  getVacDressingKitProducts,
} from "../../../util/3meService";
import {
  PRODUCT_TYPE_ACCESSORIES,
  PRODUCT_TYPE_CANISTER,
  PRODUCT_TYPE_DRESSING,
} from "../../../util/staticText";
import {
  SupplyOrderContext,
  SupplyOrderContextType,
} from "../../../context/SupplyOrderContext";
import { ISupplyOrder } from "../supplyOrder.interface";
import { useContext, useEffect, useState } from "react";
import { IPatient } from "../../myPatients/patient.interface";
import { SupplyOrderValidator } from "../supplyOrder.validator";
import {
  defaultShowSupplySecondaryVacDressing,
  defaultShowSupplyVacCanister,
  defaultShowSupplyVacDressing,
  showSupplyOrderSecondaryVacDressing,
  showSupplyOrderVacCanister,
  showSupplyOrderVacDressing,
} from "../supplyOrder.model";
import {
  DropdownValueWithOrder,
  IAccessory,
} from "../../newOrder/dressingSupplies/accessories/accessories.interface";
import { IVACProductInfo } from "../patientVACDetail/patientVACDetail.interface";
import { SupplyOrderVacDressingKit } from "./supplyOrderVacDressing/supplyOrderVacDressingKit.component";
import { SupplyOrderVacDressingAccessories } from "./supplyOrderVacAccessories/supplyOrderVacAccessories.component";
import { ValidationStatus } from "../../../core/interfaces/input.interface";
import { ICanister, IDressingKit } from "../../newOrder/newOrder.interface";
import {
  defaultAccessories,
  defaultCanister,
  defaultDressingKit,
} from "../../newOrder/newOrder.model";
import { getSupplyOrderSelectedVacProduct } from "./suppliesOrderDressing.common";
import {
  ProductInformation,
  VacDressingKitModel,
} from "../../newOrder/dressingSupplies/vacDressingKit/vacDressingKit.interface";

interface ISupplyOrderVacDressing {
  canister: ICanister;
  dressing: IDressingKit;
  data: ISupplyOrder;
  setCanister: any;
  setDressing: any;
  setData: any;
  patient?: IPatient;
  vacProductInfo: IVACProductInfo;
  Validator?: SupplyOrderValidator;
  isReviewOrder: boolean;
  setInitialLoader?: any;
}
export const SupplyOrderVacDressing = ({
  canister,
  dressing,
  data,
  setCanister,
  setDressing,
  patient,
  vacProductInfo,
  Validator,
  setInitialLoader,
}: ISupplyOrderVacDressing) => {
  const supplyOrderObj = useContext<SupplyOrderContextType | null>(
    SupplyOrderContext
  );
  const accessoryDetails = supplyOrderObj!.accessory;
  const setAccessoryDetails = supplyOrderObj!.setAccessory;

  const [accessories, setAccessories] = useState<DropdownValueWithOrder[]>([]);
  const [cannisterProduct, setcannisterProduct] = useState([]);
  const [loadAccesory, setLoadAccesory] = useState<boolean>(false);
  const [replenishAccessories, setReplenishAccessories] = useState([]);
  const [vacProducts, setVacProducts] = useState([]);
  const [vacProductSize, setVacProductSize] = useState<any>([]);
  const [vacSecondaryProductSize, setVacSecondaryProductSize] = useState<any>(
    []
  );
  const [validator] = useState<SupplyOrderValidator>(Validator!);

  const fetchVacDressingProducts = async () => {
    try {
      const response = await getVacDressingKitProducts();
      updateVacDetails(response);
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchReplenishSupplyOrderList = async () => {
    let body = {
      ron: patient?.roNumber.toString(),
      dob: moment(patient?.dob).format("DD-MMM-yyyy"),
    };
    const replenishResponse = await getReplenishSupplyOrder(body);
    if (replenishResponse.succeeded) {
      updateReplenishDetails(replenishResponse.data);
      setInitialLoader(false);
    }
  };

  const mapAccessoriesList = () => {
    let updatedAccessories: IAccessory[] = [];
    replenishAccessories.forEach(
      (replenishAccessory: { code: string; value: string }, index: number) => {
        const filteredAccessories = accessories.filter(
          (accessory: DropdownValueWithOrder) =>
            accessory.code === replenishAccessory.code
        );
        if (filteredAccessories.length > 0) {
          let filteredAccessory = filteredAccessories[0];
          let selectedAccessory: IAccessory = {
            code: replenishAccessory.code,
            id: filteredAccessory.id,
            index: index,
            value: replenishAccessory.value,
          };
          updatedAccessories.push(selectedAccessory);
        }
      }
    );
    setLoadAccesory(false);
    setAccessoryDetails({
      accessories: updatedAccessories,
    });
  };

  const updateVacDetails = (response: any) => {
    if (response.items.length > 0) {
      const vacProducts = response.items
        .filter((product: any) => product.productType === PRODUCT_TYPE_DRESSING)
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
      if (supplyOrderObj && supplyOrderObj.vacAllProducts.items.length === 0) {
        supplyOrderObj.setAllVacProducts(response);
      }
    }
  };

  const updateReplenishDetails = (replenishResponseData: any) => {
    const replenishAccessories = replenishResponseData
      .filter((product: any) => product.type === PRODUCT_TYPE_ACCESSORIES)
      .map((x: any) => ({
        code: x.code,
        value: x.name,
      }));
    setReplenishAccessories(replenishAccessories);
    if (
      supplyOrderObj &&
      supplyOrderObj.replenishSupplyOrderData.length === 0
    ) {
      supplyOrderObj.setReplenishSupplyOrderData(replenishResponseData);
    }
  };

  const setProductSizeDropDown = (selectedVac: any, type: string) => {
    const vacProducts = selectedVac?.sizes.map(
      (x: { name: any; sku: any }) => ({
        id: x.sku,
        code: x.sku,
        text: x.name,
      })
    )!;
    if (type === "primary") {
      setVacProductSize(vacProducts);
    } else {
      setVacSecondaryProductSize(vacProducts);
    }
  };

  const supplyOrdervacPrimaryDressingKitMapper = (
    code: string,
    quantity: string,
    vacAllProducts: VacDressingKitModel
  ) => {
    let selectedProduct = getSupplyOrderSelectedVacProduct(
      code,
      vacAllProducts
    )! as ProductInformation;
    if (!selectedProduct) {
      return dressing;
    }
    if (selectedProduct?.hasMultipleSize) {
      setProductSizeDropDown(selectedProduct, "primary");
    }
    let mapperRes;
    let suppleOrderObjRes: showSupplyOrderVacDressing =
      supplyOrderObj?.showSupplyOrderVacDressingKit!;
    mapperRes = {
      ...dressing,
      productId: {
        valid: ValidationStatus.VALID,
        value: selectedProduct.sku,
      },
      productCode: {
        valid: ValidationStatus.VALID,
        value: selectedProduct.sku,
      },
      productName: {
        valid: ValidationStatus.VALID,
        value: selectedProduct.productName,
      },
      productQuantity: {
        valid: ValidationStatus.VALID,
        value: quantity,
      },
    };
    if (selectedProduct.sizes && selectedProduct.hasMultipleSize) {
      const selectedSizeProduct = selectedProduct.sizes.filter(
        (x) => x.sku === code
      )[0];
      mapperRes = {
        ...mapperRes,
        productSizeID: {
          valid: ValidationStatus.VALID,
          value: selectedSizeProduct.sku,
        },
        productSizeCode: {
          valid: ValidationStatus.VALID,
          value: selectedSizeProduct.sku,
        },
        productSizeName: {
          valid: ValidationStatus.VALID,
          value: selectedSizeProduct.name,
        },
      };
      suppleOrderObjRes = {
        ...suppleOrderObjRes,
        showSize: true,
      };
    } else {
      mapperRes = {
        ...mapperRes,
        productSizeID: {
          valid: ValidationStatus.VALID,
          value: "",
        },
        productSizeCode: {
          valid: ValidationStatus.VALID,
          value: "",
        },
        productSizeName: {
          valid: ValidationStatus.VALID,
          value: "",
        },
      };
      suppleOrderObjRes = {
        ...suppleOrderObjRes,
        showSize: false,
      };
    }
    if (quantity === "1") {
      suppleOrderObjRes = {
        ...suppleOrderObjRes,
        isPrimaryVacKitDressingDisabled: false,
        isPrimaryVacKitDressingMinusDisabled: true,
      };
    } else if (quantity === "2") {
      suppleOrderObjRes = {
        ...suppleOrderObjRes,
        isPrimaryVacKitDressingDisabled: false,
        isPrimaryVacKitDressingMinusDisabled: false,
      };
    } else if (quantity === "3") {
      suppleOrderObjRes = {
        ...suppleOrderObjRes,
        isPrimaryVacKitDressingDisabled: true,
        isPrimaryVacKitDressingMinusDisabled: false,
      };
    }
    suppleOrderObjRes = {
      ...suppleOrderObjRes,
      showQunatity: true,
      showPrimaryDressingKit: true,
    };
    supplyOrderObj?.setShowSupplyOrderVacDressingKit(suppleOrderObjRes);
    return mapperRes;
  };

  const supplyOrdervacSecondaryDressingKitMapper = (
    replenishData: any,
    mapperRes: any,
    vacAllProducts: VacDressingKitModel
  ) => {
    let selectedProduct = getSupplyOrderSelectedVacProduct(
      replenishData.code,
      vacAllProducts
    )! as ProductInformation;
    if (!selectedProduct) {
      return mapperRes;
    }
    if (selectedProduct?.hasMultipleSize) {
      setProductSizeDropDown(selectedProduct, "secondary");
    }
    let quantity = replenishData.quantity.split("-")[0].trim();
    let suppleOrderObjRes: showSupplyOrderSecondaryVacDressing =
      supplyOrderObj?.showSupplyOrderSecondaryVacDressingKit!;
    mapperRes = {
      ...mapperRes,
      secProductId: {
        valid: ValidationStatus.VALID,
        value: selectedProduct.sku,
      },
      secProductCode: {
        valid: ValidationStatus.VALID,
        value: selectedProduct.sku,
      },
      secProductName: {
        valid: ValidationStatus.VALID,
        value: selectedProduct.productName,
      },
      secProductQuantity: {
        valid: ValidationStatus.VALID,
        value: quantity,
      },
    };
    if (selectedProduct.sizes && selectedProduct.hasMultipleSize) {
      const selectedSizeProduct = selectedProduct.sizes.filter(
        (x) => x.sku === replenishData.code
      )[0];
      mapperRes = {
        ...mapperRes,
        secProductSizeID: {
          valid: ValidationStatus.VALID,
          value: selectedSizeProduct.sku,
        },
        secProductSizeCode: {
          valid: ValidationStatus.VALID,
          value: selectedSizeProduct.sku,
        },
        secProductSizeName: {
          valid: ValidationStatus.VALID,
          value: selectedSizeProduct.name,
        },
      };
      suppleOrderObjRes = {
        ...suppleOrderObjRes,
        showSecSize: true,
      };
    } else {
      mapperRes = {
        ...mapperRes,
        secProductSizeID: {
          valid: ValidationStatus.VALID,
          value: "",
        },
        secProductSizeCode: {
          valid: ValidationStatus.VALID,
          value: "",
        },
        secProductSizeName: {
          valid: ValidationStatus.VALID,
          value: "",
        },
      };
      suppleOrderObjRes = {
        ...suppleOrderObjRes,
        showSecSize: false,
      };
    }
    if (quantity === "1") {
      suppleOrderObjRes = {
        ...suppleOrderObjRes,
        isSecondaryVacKitDressingDisabled: false,
        isSecondaryVacKitDressingMinusDisabled: true,
      };
    } else if (quantity === "2") {
      suppleOrderObjRes = {
        ...suppleOrderObjRes,
        isSecondaryVacKitDressingDisabled: false,
        isSecondaryVacKitDressingMinusDisabled: false,
      };
    } else if (quantity === "3") {
      suppleOrderObjRes = {
        ...suppleOrderObjRes,
        isSecondaryVacKitDressingDisabled: true,
        isSecondaryVacKitDressingMinusDisabled: false,
      };
    }
    suppleOrderObjRes = {
      ...suppleOrderObjRes,
      showSecQunatity: true,
      showSecondaryDressingKit: true,
    };
    supplyOrderObj?.setShowSupplyOrderSecondaryVacDressingKit(
      suppleOrderObjRes
    );
    return mapperRes;
  };

  const supplyOrderCanisterKitMapper = (
    code: string,
    quantity: string,
    vacAllProducts: VacDressingKitModel
  ) => {
    let selectedProduct = getSupplyOrderSelectedVacProduct(
      code,
      vacAllProducts
    )! as ProductInformation;
    if (!selectedProduct) {
      return;
    }
    let mapperRes;
    let suppleOrderObjRes: showSupplyOrderVacCanister =
      supplyOrderObj?.showSupplyOrderVacCanisterKit!;
    mapperRes = {
      ...canister,
      canisterProductID: {
        valid: ValidationStatus.VALID,
        value: selectedProduct.productID,
      },
      canisterProductCode: {
        valid: ValidationStatus.VALID,
        value: selectedProduct.sku,
      },
      canisterProductName: {
        valid: ValidationStatus.VALID,
        value: selectedProduct.productName,
      },
      canisterProductQuantity: {
        valid: ValidationStatus.VALID,
        value: quantity,
      },
    };
    suppleOrderObjRes = {
      ...suppleOrderObjRes,
      showSize: true,
      showQunatity: true,
      showCanisterKit: true,
      isVacKitCanisterDisabled: quantity === "2",
      isVacKitCanisterMinusDisabled: quantity === "1",
      showAddDressingBtn: false,
    };
    supplyOrderObj?.setShowSupplyOrderVacCanisterKit(suppleOrderObjRes);
    setCanister(mapperRes);
  };

  const restoreDressingDetails = () => {
    const replenishSupplyOrderData = supplyOrderObj!.replenishSupplyOrderData;
    if (
      replenishSupplyOrderData &&
      replenishSupplyOrderData.length > 0 &&
      supplyOrderObj &&
      !supplyOrderObj.isBackFromReviewPage
    ) {
      const vacDressingReplenishData = replenishSupplyOrderData.filter(
        (x: any) => x.type === PRODUCT_TYPE_DRESSING
      );
      let dressinMapper = defaultDressingKit;
      let vacAllProducts = supplyOrderObj.vacAllProducts;
      if (vacDressingReplenishData.length > 0) {
        const firstDressing: any = vacDressingReplenishData[0];
        dressinMapper = supplyOrdervacPrimaryDressingKitMapper(
          firstDressing.code ?? "",
          firstDressing.quantity
            ? firstDressing.quantity.split("-")[0].trim()
            : "",
          vacAllProducts
        );
      } else {
        supplyOrderObj?.setShowSupplyOrderVacDressingKit(
          defaultShowSupplyVacDressing
        );
      }
      if (vacDressingReplenishData.length > 1) {
        dressinMapper = supplyOrdervacSecondaryDressingKitMapper(
          vacDressingReplenishData[1],
          dressinMapper,
          vacAllProducts
        );
      } else {
        supplyOrderObj?.setShowSupplyOrderSecondaryVacDressingKit(
          defaultShowSupplySecondaryVacDressing
        );
      }
      setDressing(dressinMapper);
      const vacCanisterReplenishData = replenishSupplyOrderData.filter(
        (x: any) => x.type === PRODUCT_TYPE_CANISTER
      );
      if (vacCanisterReplenishData.length > 0) {
        const canister: any = vacCanisterReplenishData[0];
        supplyOrderCanisterKitMapper(
          canister.code ?? "",
          data.typeOfOrder.value === "Yes"
            ? canister.quantity
              ? canister.quantity.split("-")[0].trim()
              : ""
            : "1",
          vacAllProducts
        );
      } else {
        supplyOrderObj?.setShowSupplyOrderVacCanisterKit(
          defaultShowSupplyVacCanister
        );
        setCanister(setCanister);
      }
      validator.validateOrderSupplyProducts(supplyOrderObj!, true);
    }
  };

  const updateSizeDropdownForSelectedDressingKit = () => {
    let vacAllProducts = supplyOrderObj?.vacAllProducts;
    if (vacAllProducts) {
      const selectedPrimaryDressingProduct = vacAllProducts.items.filter(
        (x) => x.productName === dressing.productName.value
      )[0];
      if (
        dressing.productName.value !== "" &&
        selectedPrimaryDressingProduct &&
        selectedPrimaryDressingProduct.sizes.length > 1
      ) {
        setProductSizeDropDown(selectedPrimaryDressingProduct, "primary");
      }
      const selectedSecondaryDressingProduct = vacAllProducts.items.filter(
        (x) => x.productName === dressing.secProductName.value
      )[0];
      if (
        dressing.secProductName.value !== "" &&
        selectedSecondaryDressingProduct &&
        selectedSecondaryDressingProduct.sizes.length > 1
      ) {
        setProductSizeDropDown(selectedSecondaryDressingProduct, "secondary");
      }
    }
  };

  const resetAllSelectedProducts = () => {
    setAccessoryDetails(defaultAccessories);
    setCanister(defaultCanister);
    setDressing(defaultDressingKit);
  };

  const restoreProductDetails = () => {
    const selectedProduct = supplyOrderObj!.product;
    if (
      selectedProduct &&
      supplyOrderObj &&
      !supplyOrderObj.isBackFromReviewPage
    ) {
      let dressinMapper = defaultDressingKit;
      let vacAllProducts = supplyOrderObj.vacAllProducts;
      supplyOrderObj?.setShowSupplyOrderSecondaryVacDressingKit(
        defaultShowSupplySecondaryVacDressing
      );
      if (selectedProduct.productType === PRODUCT_TYPE_DRESSING) {
        dressinMapper = supplyOrdervacPrimaryDressingKitMapper(
          selectedProduct.sku,
          "1",
          vacAllProducts
        );
        setDressing(dressinMapper);
      } else {
        supplyOrderObj?.setShowSupplyOrderVacDressingKit(
          defaultShowSupplyVacDressing
        );
      }
      if (selectedProduct.productType === PRODUCT_TYPE_CANISTER) {
        supplyOrderCanisterKitMapper(selectedProduct.sku, "1", vacAllProducts);
      } else {
        supplyOrderObj?.setShowSupplyOrderVacCanisterKit(
          defaultShowSupplyVacCanister
        );
        setCanister(setCanister);
      }
      if (selectedProduct.productType === PRODUCT_TYPE_ACCESSORIES) {
        let selectedAccessory: IAccessory = {
          code: selectedProduct.sku,
          id: selectedProduct.id,
          index: 1,
          value: selectedProduct.name,
        };
        setLoadAccesory(false);
        setAccessoryDetails({
          accessories: [selectedAccessory],
        });
      }
      validator.validateOrderSupplyProducts(supplyOrderObj!, true);
    }
  };

  useEffect(() => {
    if (
      data.typeOfOrder.value === "No" &&
      supplyOrderObj &&
      supplyOrderObj.product &&
      !supplyOrderObj.isBackFromReviewPage
    ) {
      updateSizeDropdownForSelectedDressingKit();
      restoreProductDetails();
    }
  }, [supplyOrderObj?.vacAllProducts]);

  useEffect(() => {
    if (supplyOrderObj && !supplyOrderObj.isBackFromReviewPage) {
      fetchVacDressingProducts();
      if (data.typeOfOrder.value === "Yes") {
        fetchReplenishSupplyOrderList();
      }
    } else {
      setLoadAccesory(true);
      updateVacDetails(supplyOrderObj?.vacAllProducts);
    }
  }, []);

  useEffect(() => {
    if (data.typeOfOrder.value === "Yes") {
      updateVacDetails(supplyOrderObj?.vacAllProducts);
      // For first time data is not there for replenishSupplyOrderData so it wiill not call.
      // For second time this will get called.
      if (supplyOrderObj?.replenishSupplyOrderData) {
        restoreDressingDetails();
      }
      // And restore method will get called from replenishSupplyOrderData useEffect
      updateReplenishDetails(supplyOrderObj?.replenishSupplyOrderData);
    } else {
      if (!supplyOrderObj?.isBackFromReviewPage) {
        setLoadAccesory(false);
        supplyOrderObj?.setShowSupplyOrderVacDressingKit(
          defaultShowSupplyVacDressing
        );
        supplyOrderObj?.setShowSupplyOrderSecondaryVacDressingKit(
          defaultShowSupplySecondaryVacDressing
        );
        supplyOrderObj?.setShowSupplyOrderVacCanisterKit(
          defaultShowSupplyVacCanister
        );
        resetAllSelectedProducts();
      }
    }
  }, [data.typeOfOrder.value]);

  useEffect(() => {
    if (data.typeOfOrder.value === "Yes") {
      restoreDressingDetails();
    }
    updateSizeDropdownForSelectedDressingKit();
  }, [supplyOrderObj?.replenishSupplyOrderData]);

  useEffect(() => {
    if (
      supplyOrderObj &&
      !supplyOrderObj.isBackFromReviewPage &&
      !supplyOrderObj.product
    ) {
      mapAccessoriesList();
    }
  }, [accessories, replenishAccessories]);

  useEffect(() => {
    if (supplyOrderObj) {
      if (
        supplyOrderObj.showSupplyOrderVacDressingKit.showPrimaryDressingKit &&
        supplyOrderObj.showSupplyOrderSecondaryVacDressingKit
          .showSecondaryDressingKit
      ) {
        supplyOrderObj.setShowSupplyOrderVacDressingKit({
          ...supplyOrderObj?.showSupplyOrderVacDressingKit,
          showAddDressingBtn: false,
        });
      } else {
        supplyOrderObj.setShowSupplyOrderVacDressingKit({
          ...supplyOrderObj?.showSupplyOrderVacDressingKit,
          showAddDressingBtn: true,
        });
      }
    }
  }, [
    supplyOrderObj?.showSupplyOrderVacDressingKit.showPrimaryDressingKit,
    supplyOrderObj?.showSupplyOrderSecondaryVacDressingKit
      .showSecondaryDressingKit,
  ]);

  return (
    <>
      <SupplyOrderVacDressingKit
        cannisterProduct={cannisterProduct}
        data={data}
        setVacProductSize={setVacProductSize}
        setVacSecondaryProductSize={setVacSecondaryProductSize}
        vacProductInfo={vacProductInfo}
        vacProducts={vacProducts}
        vacProductSize={vacProductSize}
        vacSecondaryProductSize={vacSecondaryProductSize}
        Validator={Validator}
      />
      <SupplyOrderVacDressingAccessories
        accessoriesList={accessories}
        accessoriesDetails={accessoryDetails!}
        setAccessoriesDetails={setAccessoryDetails!}
        loadAccesory={loadAccesory}
        setLoadAccesory={setLoadAccesory}
      />
    </>
  );
};
