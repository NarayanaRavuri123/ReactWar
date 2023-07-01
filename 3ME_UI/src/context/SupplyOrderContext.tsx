import {
  defaultPatientData,
  defaultVACProdcutInfo,
} from "../mockData/patientInfo";
import { createContext, useState } from "react";
import { getDeepClone } from "../util/ObjectFunctions";
import { IPatient } from "../components/myPatients/patient.interface";
import { ISupplyOrder } from "../components/supplyOrder/supplyOrder.interface";
import {
  defaultShowSupplySecondaryVacDressing,
  defaultShowSupplyVacCanister,
  defaultShowSupplyVacDressing,
  defaultSupplyOrderData,
  defaultVacDressingKitModel,
  showSupplyOrderSecondaryVacDressing,
  showSupplyOrderVacCanister,
  showSupplyOrderVacDressing,
} from "../components/supplyOrder/supplyOrder.model";
import { SupplyOrderPageSection } from "../components/supplyOrder/SupplyOrderPageSection.enum";
import { IVACProductInfo } from "../components/supplyOrder/patientVACDetail/patientVACDetail.interface";
import { VacDressingKitModel } from "../components/newOrder/dressingSupplies/vacDressingKit/vacDressingKit.interface";
import {
  ICanister,
  IDressingKit,
  IProductAccessory,
} from "../components/newOrder/newOrder.interface";
import {
  defaultAccessories,
  defaultCanister,
  defaultDressingKit,
} from "../components/newOrder/newOrder.model";
import { IProductContent } from "../components/productsAndSolutions/productsAndSolutions.interface";

export type SupplyOrderContextType = {
  supplyOrderPage: SupplyOrderPageSection;
  setSupplyOrderPage: React.Dispatch<
    React.SetStateAction<SupplyOrderPageSection>
  >;
  supplyOrderProgress: number;
  setSupplyOrderProgress: React.Dispatch<React.SetStateAction<number>>;
  resetSupplyOrder: () => void;
  directToSupplyOrder: boolean;
  setDirectToSupplyOrder: React.Dispatch<React.SetStateAction<boolean>>;
  supplyOrderData: ISupplyOrder;
  setSupplyOrderData: React.Dispatch<React.SetStateAction<ISupplyOrder>>;
  selectedPatient: IPatient;
  setSelectedPatient: React.Dispatch<React.SetStateAction<IPatient>>;
  vacProductInfo: IVACProductInfo | null;
  setVacProductInfo: React.Dispatch<
    React.SetStateAction<IVACProductInfo | null>
  >;
  showSupplyOrderVacDressingKit: showSupplyOrderVacDressing;
  setShowSupplyOrderVacDressingKit: React.Dispatch<
    React.SetStateAction<showSupplyOrderVacDressing>
  >;
  showSupplyOrderVacCanisterKit: showSupplyOrderVacCanister;
  setShowSupplyOrderVacCanisterKit: React.Dispatch<
    React.SetStateAction<showSupplyOrderVacCanister>
  >;
  showSupplyOrderSecondaryVacDressingKit: showSupplyOrderSecondaryVacDressing;
  setShowSupplyOrderSecondaryVacDressingKit: React.Dispatch<
    React.SetStateAction<showSupplyOrderSecondaryVacDressing>
  >;
  supplyOrderPageTitle: string;
  setSupplyOrderPageTitle: React.Dispatch<React.SetStateAction<string>>;
  isBackFromReviewPage: boolean;
  setIsBackFromReviewPage: React.Dispatch<React.SetStateAction<boolean>>;
  scrollableComponentClassName: string | undefined;
  setScrollableComponentClassName: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  isVacDressingPlusDisabled: boolean;
  setIsVacDressingPlusDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  isVacDressingMinusDisabled: boolean;
  setIsVacDressingMinusDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  isVacCannisterPlusDisabled: boolean;
  setIsVacCannisterPlusDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  isVacCannisterMinusDisabled: boolean;
  setIsVacCannisterMinusDisabled: React.Dispatch<React.SetStateAction<boolean>>;

  vacAllProducts: VacDressingKitModel;
  setAllVacProducts: React.Dispatch<React.SetStateAction<VacDressingKitModel>>;
  replenishSupplyOrderData: never[];
  setReplenishSupplyOrderData: React.Dispatch<React.SetStateAction<never[]>>;

  isSuppliesSelected: boolean;
  setIsSuppliesSelected: React.Dispatch<React.SetStateAction<boolean>>;

  dressingKit: IDressingKit;
  setDressingKit: React.Dispatch<React.SetStateAction<IDressingKit>>;
  canister: ICanister;
  setCanister: React.Dispatch<React.SetStateAction<ICanister>>;
  accessory: IProductAccessory;
  setAccessory: React.Dispatch<React.SetStateAction<IProductAccessory>>;

  product: IProductContent | null;
  setProduct: React.Dispatch<React.SetStateAction<IProductContent | null>>;
};

type SupplyOrderContextProviderProps = {
  children: React.ReactNode;
};

export const SupplyOrderContext = createContext<SupplyOrderContextType | null>(
  null
);

export const SupplyOrderContextProvider = ({
  children,
}: SupplyOrderContextProviderProps) => {
  const [supplyOrderPage, setSupplyOrderPage] =
    useState<SupplyOrderPageSection>(
      SupplyOrderPageSection.SUPPLYORDER_PATIENT_LIST
    );
  const [supplyOrderProgress, setSupplyOrderProgress] = useState(10);
  const resetSupplyOrder = () => {
    setSupplyOrderData(getDeepClone(defaultSupplyOrderData));
    setShowSupplyOrderVacDressingKit(defaultShowSupplyVacDressing);
    setShowSupplyOrderSecondaryVacDressingKit(
      defaultShowSupplySecondaryVacDressing
    );
    setShowSupplyOrderVacCanisterKit(defaultShowSupplyVacCanister);
    setIsBackFromReviewPage(false);
    setIsVacDressingPlusDisabled(false);
    setIsVacDressingMinusDisabled(true);
    setIsVacCannisterPlusDisabled(false);
    setIsVacCannisterMinusDisabled(true);

    setAllVacProducts(defaultVacDressingKitModel);
    setReplenishSupplyOrderData([]);

    setIsSuppliesSelected(true);

    setDressingKit(getDeepClone(defaultDressingKit));
    setCanister(getDeepClone(defaultCanister));
    setAccessory(getDeepClone(defaultAccessories));

    setProduct(null);
  };
  const [directToSupplyOrder, setDirectToSupplyOrder] = useState(false);
  const [supplyOrderData, setSupplyOrderData] = useState<ISupplyOrder>(
    getDeepClone(defaultSupplyOrderData)
  );
  const [selectedPatient, setSelectedPatient] = useState<IPatient>(
    getDeepClone(defaultPatientData)
  );
  const [vacProductInfo, setVacProductInfo] = useState<IVACProductInfo | null>(
    getDeepClone(defaultVACProdcutInfo)
  );
  const [
    showSupplyOrderSecondaryVacDressingKit,
    setShowSupplyOrderSecondaryVacDressingKit,
  ] = useState<showSupplyOrderSecondaryVacDressing>({
    showSecSize: false,
    showSecQunatity: false,
    showSecondaryDressingKit: false,
    isSecondaryVacKitDressingDisabled: false,
    isSecondaryVacKitDressingMinusDisabled: true,
  });

  const [showSupplyOrderVacDressingKit, setShowSupplyOrderVacDressingKit] =
    useState<showSupplyOrderVacDressing>({
      showSize: false,
      showQunatity: false,
      showPrimaryDressingKit: false,
      isPrimaryVacKitDressingDisabled: false,
      isPrimaryVacKitDressingMinusDisabled: true,
      showAddDressingBtn: true,
    });

  const [showSupplyOrderVacCanisterKit, setShowSupplyOrderVacCanisterKit] =
    useState<showSupplyOrderVacCanister>({
      showSize: false,
      showQunatity: false,
      showCanisterKit: false,
      isVacKitCanisterDisabled: false,
      isVacKitCanisterMinusDisabled: true,
      showAddDressingBtn: true,
    });
  const [supplyOrderPageTitle, setSupplyOrderPageTitle] =
    useState("Supply Order");
  const [isBackFromReviewPage, setIsBackFromReviewPage] = useState(false);
  const [scrollableComponentClassName, setScrollableComponentClassName] =
    useState<string | undefined>();
  const [isVacDressingPlusDisabled, setIsVacDressingPlusDisabled] =
    useState(false);
  const [isVacDressingMinusDisabled, setIsVacDressingMinusDisabled] =
    useState(true);
  const [isVacCannisterPlusDisabled, setIsVacCannisterPlusDisabled] =
    useState(false);
  const [isVacCannisterMinusDisabled, setIsVacCannisterMinusDisabled] =
    useState(true);

  const [vacAllProducts, setAllVacProducts] = useState<VacDressingKitModel>(
    getDeepClone(defaultVacDressingKitModel)
  );
  const [replenishSupplyOrderData, setReplenishSupplyOrderData] = useState([]);
  const [isSuppliesSelected, setIsSuppliesSelected] = useState(true);

  const [dressingKit, setDressingKit] = useState<IDressingKit>(
    getDeepClone(defaultDressingKit)
  );
  const [canister, setCanister] = useState<ICanister>(
    getDeepClone(defaultCanister)
  );
  const [accessory, setAccessory] = useState<IProductAccessory>(
    getDeepClone(defaultAccessories)
  );

  const [product, setProduct] = useState<IProductContent | null>(null);

  return (
    <SupplyOrderContext.Provider
      value={{
        supplyOrderPage,
        setSupplyOrderPage,
        supplyOrderProgress,
        setSupplyOrderProgress,
        resetSupplyOrder,
        directToSupplyOrder,
        setDirectToSupplyOrder,
        supplyOrderData,
        setSupplyOrderData,
        selectedPatient,
        setSelectedPatient,
        vacProductInfo,
        setVacProductInfo,
        showSupplyOrderVacDressingKit,
        setShowSupplyOrderVacDressingKit,
        showSupplyOrderSecondaryVacDressingKit,
        setShowSupplyOrderSecondaryVacDressingKit,
        showSupplyOrderVacCanisterKit,
        setShowSupplyOrderVacCanisterKit,
        supplyOrderPageTitle,
        setSupplyOrderPageTitle,
        isBackFromReviewPage,
        setIsBackFromReviewPage,
        scrollableComponentClassName,
        setScrollableComponentClassName,
        isVacDressingPlusDisabled,
        setIsVacDressingPlusDisabled,
        isVacDressingMinusDisabled,
        setIsVacDressingMinusDisabled,
        isVacCannisterPlusDisabled,
        setIsVacCannisterPlusDisabled,
        isVacCannisterMinusDisabled,
        setIsVacCannisterMinusDisabled,

        vacAllProducts,
        setAllVacProducts,
        replenishSupplyOrderData,
        setReplenishSupplyOrderData,

        isSuppliesSelected,
        setIsSuppliesSelected,

        dressingKit,
        setDressingKit,
        canister,
        setCanister,
        accessory,
        setAccessory,

        product,
        setProduct,
      }}
    >
      {children}
    </SupplyOrderContext.Provider>
  );
};
