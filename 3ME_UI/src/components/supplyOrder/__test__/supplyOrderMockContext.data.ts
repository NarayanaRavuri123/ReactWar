import { SupplyOrderContextType } from "../../../context/SupplyOrderContext";
import { patientList } from "../../myPatients/__test__/patientList.mock";
import {
  defaultAccessories,
  defaultCanister,
  defaultDressingKit,
} from "../../newOrder/newOrder.model";
import {
  defaultShowSupplySecondaryVacDressing,
  defaultShowSupplyVacCanister,
  defaultShowSupplyVacDressing,
  defaultSupplyOrderData,
  defaultVacDressingKitModel,
} from "../supplyOrder.model";
import { SupplyOrderPageSection } from "../SupplyOrderPageSection.enum";

export const getMockSupplyOrderData = (): SupplyOrderContextType => ({
  supplyOrderPage: SupplyOrderPageSection.SUPPLYORDER_INFO,
  setSupplyOrderPage: () => {},
  supplyOrderProgress: 0,
  setSupplyOrderProgress: () => {},
  resetSupplyOrder: () => {},
  directToSupplyOrder: false,
  setDirectToSupplyOrder: () => {},
  supplyOrderData: defaultSupplyOrderData,
  setSupplyOrderData: () => {},
  selectedPatient: patientList[0],
  setSelectedPatient: () => {},
  vacProductInfo: null,
  setVacProductInfo: () => {},
  showSupplyOrderVacDressingKit: defaultShowSupplyVacDressing,
  setShowSupplyOrderVacDressingKit: () => {},
  showSupplyOrderVacCanisterKit: defaultShowSupplyVacCanister,
  setShowSupplyOrderVacCanisterKit: () => {},
  showSupplyOrderSecondaryVacDressingKit: defaultShowSupplySecondaryVacDressing,
  setShowSupplyOrderSecondaryVacDressingKit: () => {},
  supplyOrderPageTitle: "Supply Order",
  setSupplyOrderPageTitle: () => {},
  isBackFromReviewPage: false,
  setIsBackFromReviewPage: () => {},
  scrollableComponentClassName: "",
  setScrollableComponentClassName: () => {},
  isVacDressingPlusDisabled: false,
  setIsVacDressingPlusDisabled: () => {},
  isVacDressingMinusDisabled: true,
  setIsVacDressingMinusDisabled: () => {},
  isVacCannisterPlusDisabled: false,
  setIsVacCannisterPlusDisabled: () => {},
  isVacCannisterMinusDisabled: true,
  setIsVacCannisterMinusDisabled: () => {},
  vacAllProducts: defaultVacDressingKitModel,
  setAllVacProducts: () => {},
  replenishSupplyOrderData: [],
  setReplenishSupplyOrderData: () => {},

  isSuppliesSelected: false,
  setIsSuppliesSelected: () => {},

  dressingKit: defaultDressingKit,
  setDressingKit: () => {},
  canister: defaultCanister,
  setCanister: () => {},
  accessory: defaultAccessories,
  setAccessory: () => {},

  product: null,
  setProduct: () => {},
});
