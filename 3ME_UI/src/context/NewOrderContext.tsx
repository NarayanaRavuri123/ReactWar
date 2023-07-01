import { createContext, useState } from "react";
import {
  IAddedSecondaryPayerInfo,
  ICanister,
  IDeliveryInformation,
  IDressingKit,
  INewOrder,
  IProductAccessory,
  IProductInfo,
  IRequesterInfo,
} from "../components/newOrder/newOrder.interface";
import { getDeepClone } from "../util/ObjectFunctions";
import {
  defaultAccessories,
  defaultCanister,
  defaultDeliveryInformation,
  defaultDressingKit,
  defaultNewOrderData,
  defaultProductInfo,
  defaultRequesterInfo,
} from "../components/newOrder/newOrder.model";
import { NewOrderPageSection } from "../components/newOrder/NewOrderContainer.enum";
import { WoundQuestionaries } from "../components/newOrder/clinicalInformation/clinicalInfo.interface";
import { defaultNewOrderWoundInfoData } from "../components/newOrder/newOrderWoundInfoStepper/newOrderWoundInfo.model";
import { INewOrderWoundInfo } from "../components/newOrder/newOrderWoundInfoStepper/newOrderWoundInfo.interface";
import { ISecondaryWoundInfo } from "../components/newOrder/clinicalInformation/secondaryWoundInfo/secondaryWoundInfo.interface";
import { defaultNewOrdeSecondaryWoundInfoData } from "../components/newOrder/clinicalInformation/secondaryWoundInfo/secondaryWoundInfo.model";
import { IDropZoneDocumentSelect } from "../core/customDropZone/dropZoneDocumentSelect.interface";
import { SearchPrescriberModal } from "../components/newOrder/prescriberInformation/searchPrescriber.enum";
import { SearchHomeCareProviderModal } from "../components/newOrder/homeCareProvider/homeCareSearch/searchHomeCare.enum";
import { IPrescriberModal } from "../components/newOrder/prescriberInformation/prescriberSearch/prescriberSearch.model";
import { ShowAdditionalFields } from "../components/newOrder/insuranceInformation/insuranceInformation/insuranceInformation.model";
import { SharedOrderModal } from "../components/newOrder/newOrderFooterGroup/shareOrder/shareOrder.enum";

export type NewOrderContextType = {
  newOrderData: INewOrder;
  setNewOrderData: React.Dispatch<React.SetStateAction<INewOrder>>;
  resetNewOrderForm: () => void;
  vacOrderID: string;
  setVacOrderID: React.Dispatch<React.SetStateAction<string>>;
  newOrderPage: NewOrderPageSection;
  setNewOrderPage: React.Dispatch<React.SetStateAction<NewOrderPageSection>>;
  newOrderProgress: number;
  showDialog: boolean;
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
  isHandleChangeTriggered: boolean;
  setIsHandleChangeTriggered: React.Dispatch<React.SetStateAction<boolean>>;
  setnewOrderProgress: React.Dispatch<React.SetStateAction<number>>;
  maxDate: any;
  setMaxDate: React.Dispatch<React.SetStateAction<any>>;
  woundInfoData: INewOrderWoundInfo;
  setWoundInfoData: React.Dispatch<React.SetStateAction<INewOrderWoundInfo>>;
  secondaryWoundInfoData: ISecondaryWoundInfo;
  setSecondaryWoundInfoData: React.Dispatch<
    React.SetStateAction<ISecondaryWoundInfo>
  >;
  resetSecondaryWoundInfoDataForm: () => void;
  isComingFromPrev: boolean | undefined;
  setisComingFromPrev: React.Dispatch<React.SetStateAction<boolean>>;
  isPartialOrder: boolean | undefined;
  setIsPartialOrder: React.Dispatch<React.SetStateAction<boolean>>;
  isSecondaryOpen: boolean | undefined;
  setisSecondaryOpen: React.Dispatch<React.SetStateAction<boolean>>;
  woundQuestionaries: Map<string, WoundQuestionaries> | undefined;
  setWoundQuestionnaries: React.Dispatch<
    React.SetStateAction<Map<string, WoundQuestionaries> | undefined>
  >;
  primaryAdditionalQuestions: WoundQuestionaries | undefined;
  setPrimaryAdditionalQuestions: React.Dispatch<
    React.SetStateAction<WoundQuestionaries | undefined>
  >;
  resetPrimaryAdditionalQuestions: () => void;
  secondaryAdditionalQuestions: WoundQuestionaries | undefined;
  setSecondaryAdditionalQuestions: React.Dispatch<
    React.SetStateAction<WoundQuestionaries | undefined>
  >;
  resetSecondaryAdditionalQuestions: () => void;
  isWoundBedErrorFirstTime: boolean;
  setIsWoundBedErrorFirstTime: React.Dispatch<React.SetStateAction<boolean>>;
  newOrderDocuments: IDropZoneDocumentSelect[];
  setNewOrderDocuments: React.Dispatch<
    React.SetStateAction<IDropZoneDocumentSelect[]>
  >;
  deletedOrderDocuments: string[];
  setDeletedOrderDocuments: React.Dispatch<React.SetStateAction<string[]>>;
  errorInUploadFiles: boolean;
  setErrorInUploadFiles: React.Dispatch<React.SetStateAction<boolean>>;
  prescriberSearchAddPopUpSection: SearchPrescriberModal;
  setprescribeSearchAddPopUpSection: React.Dispatch<
    React.SetStateAction<SearchPrescriberModal>
  >;
  npiPrescriberList: IPrescriberModal[] | undefined;
  setNpiPrescriberList: React.Dispatch<
    React.SetStateAction<IPrescriberModal[] | undefined>
  >;
  prescriptionDocuments: IDropZoneDocumentSelect[];
  setPrescriptionDocuments: React.Dispatch<
    React.SetStateAction<IDropZoneDocumentSelect[]>
  >;
  searchPrescriberPopup: boolean;
  setSearchPrescriberPopup: React.Dispatch<React.SetStateAction<boolean>>;

  prescriberList: IPrescriberModal | undefined;
  setPrescriberList: React.Dispatch<
    React.SetStateAction<IPrescriberModal | undefined>
  >;
  prescriberAddedData: IPrescriberModal | undefined;
  setPrescriberAddedData: React.Dispatch<
    React.SetStateAction<IPrescriberModal | undefined>
  >;
  //3mvacDressingKit
  showSize: boolean | undefined;
  setShowSize: React.Dispatch<React.SetStateAction<boolean>>;
  showQunatity: boolean | undefined;
  setshowQunatity: React.Dispatch<React.SetStateAction<boolean>>;
  showSecSize: boolean | undefined;
  setShowSecSize: React.Dispatch<React.SetStateAction<boolean>>;
  showSecQunatity: boolean | undefined;
  setshowSecQunatity: React.Dispatch<React.SetStateAction<boolean>>;
  showPrimaryDressingKit: boolean | undefined;
  setShowPrimaryDressingKit: React.Dispatch<React.SetStateAction<boolean>>;
  showSecondaryDressingKit: boolean | undefined;
  setShowSecondaryDressingKit: React.Dispatch<React.SetStateAction<boolean>>;
  isPrimaryVacKitDressingDisabled: boolean | undefined;
  setIsPrimaryVacKitDressingPlusDisabled: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  isPrimaryVacKitDressingMinusDisabled: boolean | undefined;
  setIsPrimaryVacKitDressingMinusDisabled: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  isSecondaryVacKitDressingDisabled: boolean | undefined;
  setIsSecondaryVacKitDressingPlusDisabled: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  isSecondaryVacKitDressingMinusDisabled: boolean | undefined;
  setIsSecondaryVacKitDressingMinusDisabled: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  showAddDressingBtn: boolean | undefined;
  setShowAddDressingBtn: React.Dispatch<React.SetStateAction<boolean>>;
  showAddtionalObject: ShowAdditionalFields;
  setShowAdditionalObject: React.Dispatch<
    React.SetStateAction<ShowAdditionalFields>
  >;
  showCannisterType: boolean | undefined;
  setshowCannisterType: React.Dispatch<React.SetStateAction<boolean>>;

  isCannisterProductPlusDisabled: boolean | undefined;
  setIsCannisterProductPlusDisabled: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  isCannisterProductMinusDisabled: boolean | undefined;
  setIsCannisterProductMinusDisabled: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  isPrescriberAddedOpenInfo: boolean | undefined;
  setIsPrescriberAddedOpenInfo: React.Dispatch<React.SetStateAction<boolean>>;
  isPrescriberAddedOpenErrorInfo: boolean | undefined;
  setIsPrescriberAddedOpenErrorInfo: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  homecareproviderSearchAddPopUpSection: SearchHomeCareProviderModal;
  setHomecareproviderSearchAddPopUpSection: React.Dispatch<
    React.SetStateAction<SearchHomeCareProviderModal>
  >;
  searchHomeCareProviderPopup: boolean;
  setSearchHomeCareProviderPopup: React.Dispatch<React.SetStateAction<boolean>>;
  showPrescriberUpdateEmail: boolean | undefined;
  setIsPrescriberUpdateEmail: React.Dispatch<React.SetStateAction<boolean>>;
  active: boolean | null;
  setActive: React.Dispatch<React.SetStateAction<boolean | null>>;
  caregiverSelected: boolean;
  setCaregiverSelected: React.Dispatch<React.SetStateAction<boolean>>;

  shareOrderAddPopUpSection: SharedOrderModal;
  setshareOrderAddPopUpSection: React.Dispatch<
    React.SetStateAction<SharedOrderModal>
  >;
  shareOrderPopup: boolean;
  setshareOrderPopup: React.Dispatch<React.SetStateAction<boolean>>;

  scrollableComponentClassName: string | undefined;
  setScrollableComponentClassName: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  //Shared Order Popup Data
  sharedOrderTo: string;
  setSharedOrderTo: React.Dispatch<React.SetStateAction<string>>;

  sharedOrderNote: string;
  setSharedOrderNote: React.Dispatch<React.SetStateAction<string>>;

  IsLoadCustomDeliveryDate: boolean | undefined;
  setIsLoadCustomDeliveryDate: React.Dispatch<React.SetStateAction<boolean>>;

  requesterInfo: IRequesterInfo;
  setRequesterInfo: React.Dispatch<React.SetStateAction<IRequesterInfo>>;

  productInfo: IProductInfo;
  setProductInfo: React.Dispatch<React.SetStateAction<IProductInfo>>;

  dressingKit: IDressingKit;
  setDressingKit: React.Dispatch<React.SetStateAction<IDressingKit>>;

  canister: ICanister;
  setCanister: React.Dispatch<React.SetStateAction<ICanister>>;

  accessory: IProductAccessory;
  setAccessory: React.Dispatch<React.SetStateAction<IProductAccessory>>;

  deliveryInformation: IDeliveryInformation;
  setDeliveryInformation: React.Dispatch<
    React.SetStateAction<IDeliveryInformation>
  >;

  inventoryProductCount: number;
  setInventoryProductCount: React.Dispatch<React.SetStateAction<number>>;
};

type NewOrderContextProviderProps = {
  children: React.ReactNode;
};

export const NewOrderContext = createContext<NewOrderContextType | null>(null);

export const NewOrderContextProvider = ({
  children,
}: NewOrderContextProviderProps) => {
  const defaultNewOrderPage = NewOrderPageSection.NEWORDER_PATIENT_INFO;
  const [newOrderData, setNewOrderData] = useState<INewOrder>(
    getDeepClone(defaultNewOrderData)
  );
  const [maxDate, setMaxDate] = useState<any>();
  const [vacOrderID, setVacOrderID] = useState<string>("");
  const [requesterInfo, setRequesterInfo] = useState<IRequesterInfo>(
    getDeepClone(defaultRequesterInfo)
  );
  const [productInfo, setProductInfo] = useState<IProductInfo>(
    getDeepClone(defaultProductInfo)
  );

  const [dressingKit, setDressingKit] = useState<IDressingKit>(
    getDeepClone(defaultDressingKit)
  );
  const [canister, setCanister] = useState<ICanister>(
    getDeepClone(defaultCanister)
  );
  const [accessory, setAccessory] = useState<IProductAccessory>(
    getDeepClone(defaultAccessories)
  );
  const [deliveryInformation, setDeliveryInformation] =
    useState<IDeliveryInformation>(getDeepClone(defaultDeliveryInformation));
  const [newOrderPage, setNewOrderPage] =
    useState<NewOrderPageSection>(defaultNewOrderPage);
  const [showDialog, setShowDialog] = useState(false);
  const [isHandleChangeTriggered, setIsHandleChangeTriggered] = useState(false);
  const [newOrderProgress, setnewOrderProgress] = useState(20);
  const [woundInfoData, setWoundInfoData] = useState<INewOrderWoundInfo>(
    getDeepClone(defaultNewOrderWoundInfoData)
  );
  const [secondaryWoundInfoData, setSecondaryWoundInfoData] =
    useState<ISecondaryWoundInfo>(
      getDeepClone(defaultNewOrdeSecondaryWoundInfoData)
    );
  useState<IAddedSecondaryPayerInfo>();
  const [isComingFromPrev, setisComingFromPrev] = useState<boolean>(false);
  const [isPartialOrder, setIsPartialOrder] = useState<boolean>(false);
  const [isSecondaryOpen, setisSecondaryOpen] = useState<boolean>(false);
  const [woundQuestionaries, setWoundQuestionnaries] = useState<
    Map<string, WoundQuestionaries> | undefined
  >();
  const [primaryAdditionalQuestions, setPrimaryAdditionalQuestions] = useState<
    WoundQuestionaries | undefined
  >();
  const [secondaryAdditionalQuestions, setSecondaryAdditionalQuestions] =
    useState<WoundQuestionaries | undefined>();
  const [isWoundBedErrorFirstTime, setIsWoundBedErrorFirstTime] =
    useState<boolean>(true);
  const [newOrderDocuments, setNewOrderDocuments] = useState<
    IDropZoneDocumentSelect[]
  >([]);
  const [deletedOrderDocuments, setDeletedOrderDocuments] = useState<string[]>(
    []
  );
  const [prescriptionDocuments, setPrescriptionDocuments] = useState<
    IDropZoneDocumentSelect[]
  >([]);
  const [errorInUploadFiles, setErrorInUploadFiles] = useState(false);
  const [prescriberSearchAddPopUpSection, setprescribeSearchAddPopUpSection] =
    useState<SearchPrescriberModal>(SearchPrescriberModal.SEARCH_PRESCRIBER);
  const [npiPrescriberList, setNpiPrescriberList] = useState<
    IPrescriberModal[] | undefined
  >([]);
  const [searchPrescriberPopup, setSearchPrescriberPopup] =
    useState<boolean>(false);
  const [prescriberList, setPrescriberList] = useState<IPrescriberModal>();
  const [prescriberAddedData, setPrescriberAddedData] =
    useState<IPrescriberModal>();
  const [showSize, setShowSize] = useState(false);
  const [showQunatity, setshowQunatity] = useState(false);
  const [showSecSize, setShowSecSize] = useState(false);
  const [showSecQunatity, setshowSecQunatity] = useState(false);
  const [showPrimaryDressingKit, setShowPrimaryDressingKit] = useState(true);
  const [showSecondaryDressingKit, setShowSecondaryDressingKit] =
    useState(false);
  const [
    isPrimaryVacKitDressingDisabled,
    setIsPrimaryVacKitDressingPlusDisabled,
  ] = useState(false);
  const [
    isPrimaryVacKitDressingMinusDisabled,
    setIsPrimaryVacKitDressingMinusDisabled,
  ] = useState(true);

  const [
    isSecondaryVacKitDressingDisabled,
    setIsSecondaryVacKitDressingPlusDisabled,
  ] = useState(false);
  const [
    isSecondaryVacKitDressingMinusDisabled,
    setIsSecondaryVacKitDressingMinusDisabled,
  ] = useState(true);
  const [showCannisterType, setshowCannisterType] = useState(false);
  const [showAddDressingBtn, setShowAddDressingBtn] = useState(true);
  const [showAddtionalObject, setShowAdditionalObject] =
    useState<ShowAdditionalFields>({
      typePrimary: {
        medicare: false,
        medicareAdvantage: false,
        managedMedicaid: false,
        commercialInsurance: false,
        medicaid: false,
        charityCare: false,
        privatePay: false,
        otherAdditionalDetails: false,
        workerCompensation: false,
      },
      typeSecondary: {
        medicare: false,
        medicareAdvantage: false,
        managedMedicaid: false,
        commercialInsurance: false,
        medicaid: false,
        charityCare: false,
        privatePay: false,
        otherAdditionalDetails: false,
        workerCompensation: false,
      },
    });
  const [isCannisterProductPlusDisabled, setIsCannisterProductPlusDisabled] =
    useState(false);
  const [isCannisterProductMinusDisabled, setIsCannisterProductMinusDisabled] =
    useState(true);
  const [isPrescriberAddedOpenInfo, setIsPrescriberAddedOpenInfo] =
    useState(false);
  const [isPrescriberAddedOpenErrorInfo, setIsPrescriberAddedOpenErrorInfo] =
    useState(false);
  const [showPrescriberUpdateEmail, setIsPrescriberUpdateEmail] =
    useState(false);
  const [shareOrderAddPopUpSection, setshareOrderAddPopUpSection] =
    useState<SharedOrderModal>(SharedOrderModal.SHARE_ORDER);
  const [shareOrderPopup, setshareOrderPopup] = useState(false);
  const [sharedOrderTo, setSharedOrderTo] = useState<string>("");
  const [sharedOrderNote, setSharedOrderNote] = useState<string>("");
  const [IsLoadCustomDeliveryDate, setIsLoadCustomDeliveryDate] =
    useState<boolean>(false);
  const resetNewOrderForm = () => {
    setNewOrderData(getDeepClone(defaultNewOrderData));
    setNewOrderPage(defaultNewOrderPage);
    setVacOrderID("");
    setnewOrderProgress(20);
    setShowDialog(false);
    setIsHandleChangeTriggered(false);
    setMaxDate(null);
    setRequesterInfo(getDeepClone(defaultRequesterInfo));
    setProductInfo(getDeepClone(defaultProductInfo));
    setDressingKit(getDeepClone(defaultDressingKit));
    setCanister(getDeepClone(defaultCanister));
    setAccessory(getDeepClone(defaultAccessories));
    setDeliveryInformation(getDeepClone(defaultDeliveryInformation));
    setWoundInfoData(getDeepClone(defaultNewOrderWoundInfoData));
    resetPrimaryAdditionalQuestions();
    resetSecondaryWoundInfoDataForm();
    setNewOrderDocuments([]);
    setDeletedOrderDocuments([]);
    setShowAdditionalObject({
      typePrimary: {
        medicare: false,
        medicareAdvantage: false,
        commercialInsurance: false,
        managedMedicaid: false,
        medicaid: false,
        charityCare: false,
        privatePay: false,
        otherAdditionalDetails: false,
        workerCompensation: false,
      },
      typeSecondary: {
        medicare: false,
        medicareAdvantage: false,
        managedMedicaid: false,
        commercialInsurance: false,
        medicaid: false,
        charityCare: false,
        privatePay: false,
        otherAdditionalDetails: false,
        workerCompensation: false,
      },
    });
    reset3mVacDressingKit();
    setActive(null);
    setCaregiverSelected(false);
    setScrollableComponentClassName(undefined);
    setIsLoadCustomDeliveryDate(false);

    setisComingFromPrev(false);
    setInventoryProductCount(-1);
  };

  const resetSecondaryWoundInfoDataForm = () => {
    setSecondaryWoundInfoData(
      getDeepClone(defaultNewOrdeSecondaryWoundInfoData)
    );
    resetSecondaryAdditionalQuestions();
    resetPrescriberInfo();
  };

  const reset3mVacDressingKit = () => {
    setShowSize(false);
    setshowQunatity(false);
    setshowCannisterType(false);
    setShowSecSize(false);
    setshowSecQunatity(false);
    setShowPrimaryDressingKit(true);
    setShowSecondaryDressingKit(false);
    setIsPrimaryVacKitDressingPlusDisabled(false);
    setIsPrimaryVacKitDressingMinusDisabled(true);
    setIsSecondaryVacKitDressingPlusDisabled(false);
    setIsSecondaryVacKitDressingMinusDisabled(true);
    setShowAddDressingBtn(true);
    setIsCannisterProductMinusDisabled(true);
    setIsCannisterProductPlusDisabled(false);
  };

  const resetPrimaryAdditionalQuestions = () => {
    setPrimaryAdditionalQuestions(undefined);
  };

  const resetSecondaryAdditionalQuestions = () => {
    setSecondaryAdditionalQuestions(undefined);
  };

  const resetPrescriberInfo = () => {
    setIsPrescriberAddedOpenErrorInfo(false);
    setIsPrescriberAddedOpenInfo(false);
    setprescribeSearchAddPopUpSection(SearchPrescriberModal.SEARCH_PRESCRIBER);
    setSearchPrescriberPopup(false);
    setPrescriberList(undefined);
    setPrescriberAddedData(undefined);
  };
  const [
    homecareproviderSearchAddPopUpSection,
    setHomecareproviderSearchAddPopUpSection,
  ] = useState<SearchHomeCareProviderModal>(
    SearchHomeCareProviderModal.SEARCH_HOMECAREPROVIDER
  );
  const [searchHomeCareProviderPopup, setSearchHomeCareProviderPopup] =
    useState<boolean>(false);

  const [active, setActive] = useState<boolean | null>(null);
  const [caregiverSelected, setCaregiverSelected] = useState<boolean>(false);
  const [scrollableComponentClassName, setScrollableComponentClassName] =
    useState<string | undefined>();
  const [inventoryProductCount, setInventoryProductCount] =
    useState<number>(-1);

  return (
    <NewOrderContext.Provider
      value={{
        newOrderData,
        setNewOrderData,
        vacOrderID,
        setVacOrderID,
        resetNewOrderForm,
        newOrderPage,
        setNewOrderPage,
        showDialog,
        setShowDialog,
        isHandleChangeTriggered,
        setIsHandleChangeTriggered,
        newOrderProgress,
        setnewOrderProgress,
        maxDate,
        setMaxDate,
        woundInfoData,
        setWoundInfoData,
        secondaryWoundInfoData,
        setSecondaryWoundInfoData,
        resetSecondaryWoundInfoDataForm,
        isComingFromPrev,
        setisComingFromPrev,
        isPartialOrder,
        setIsPartialOrder,
        isSecondaryOpen,
        setisSecondaryOpen,
        woundQuestionaries,
        setWoundQuestionnaries,
        primaryAdditionalQuestions,
        setPrimaryAdditionalQuestions,
        resetPrimaryAdditionalQuestions,
        secondaryAdditionalQuestions,
        setSecondaryAdditionalQuestions,
        resetSecondaryAdditionalQuestions,
        isWoundBedErrorFirstTime,
        setIsWoundBedErrorFirstTime,
        newOrderDocuments,
        setNewOrderDocuments,
        deletedOrderDocuments,
        setDeletedOrderDocuments,
        errorInUploadFiles,
        setErrorInUploadFiles,
        prescriberSearchAddPopUpSection,
        setprescribeSearchAddPopUpSection,
        npiPrescriberList,
        setNpiPrescriberList,
        prescriptionDocuments,
        setPrescriptionDocuments,
        searchPrescriberPopup,
        setSearchPrescriberPopup,
        prescriberList,
        setPrescriberList,
        prescriberAddedData,
        setPrescriberAddedData,
        showSize,
        setShowSize,
        showQunatity,
        setshowQunatity,
        showCannisterType,
        setshowCannisterType,
        showSecSize,
        setShowSecSize,
        showSecQunatity,
        setshowSecQunatity,
        showPrimaryDressingKit,
        setShowPrimaryDressingKit,
        showSecondaryDressingKit,
        setShowSecondaryDressingKit,
        isPrimaryVacKitDressingDisabled,
        setIsPrimaryVacKitDressingPlusDisabled,
        isPrimaryVacKitDressingMinusDisabled,
        setIsPrimaryVacKitDressingMinusDisabled,
        isSecondaryVacKitDressingDisabled,
        setIsSecondaryVacKitDressingPlusDisabled,
        isSecondaryVacKitDressingMinusDisabled,
        setIsSecondaryVacKitDressingMinusDisabled,
        showAddDressingBtn,
        setShowAddDressingBtn,
        showAddtionalObject,
        setShowAdditionalObject,
        isCannisterProductPlusDisabled,
        setIsCannisterProductPlusDisabled,
        isCannisterProductMinusDisabled,
        setIsCannisterProductMinusDisabled,
        isPrescriberAddedOpenInfo,
        setIsPrescriberAddedOpenInfo,
        isPrescriberAddedOpenErrorInfo,
        setIsPrescriberAddedOpenErrorInfo,
        searchHomeCareProviderPopup,
        setSearchHomeCareProviderPopup,
        homecareproviderSearchAddPopUpSection,
        setHomecareproviderSearchAddPopUpSection,
        showPrescriberUpdateEmail,
        setIsPrescriberUpdateEmail,
        active,
        setActive,
        caregiverSelected,
        setCaregiverSelected,
        shareOrderAddPopUpSection,
        setshareOrderAddPopUpSection,
        shareOrderPopup,
        setshareOrderPopup,
        scrollableComponentClassName,
        setScrollableComponentClassName,
        sharedOrderTo,
        setSharedOrderTo,
        sharedOrderNote,
        setSharedOrderNote,
        IsLoadCustomDeliveryDate,
        setIsLoadCustomDeliveryDate,
        requesterInfo,
        setRequesterInfo,
        productInfo,
        setProductInfo,
        dressingKit,
        setDressingKit,
        canister,
        setCanister,
        accessory,
        setAccessory,
        deliveryInformation,
        setDeliveryInformation,
        inventoryProductCount,
        setInventoryProductCount,
      }}
    >
      {children}
    </NewOrderContext.Provider>
  );
};
