import { OrderDetailContextType } from "../../../../../context/OrderDetailsContext";
import {
  IInputField,
  ValidationStatus,
} from "../../../../../core/interfaces/input.interface";
import {
  mockInsuranceInputFields,
  mockPresDoc,
  mockQuestionaire,
  mockSecondaryWoundInfoData,
  mockShowAddtionalObject,
  mockWoundInfoData,
} from "../../../../newOrder/clinicalInformation/__test__/newOrderMockContextData";
import { SearchHomeCareProviderModal } from "../../../../newOrder/homeCareProvider/homeCareSearch/searchHomeCare.enum";
import { ShowAdditionalFields } from "../../../../newOrder/insuranceInformation/insuranceInformation/insuranceInformation.model";
import { NewOrderPageSection } from "../../../../newOrder/NewOrderContainer.enum";
import { SharedOrderModal } from "../../../../newOrder/newOrderFooterGroup/shareOrder/shareOrder.enum";
import { SearchPrescriberModal } from "../../../../newOrder/prescriberInformation/searchPrescriber.enum";
import {
  IFinancialResponse,
  IInsurenceDetail,
} from "../../orderSupplyDetail/orderSupplyDetails.interface";
import { IOrderDetailResponse } from "../orderDetailsTracking.interface";

const mockInputFields = (): IInputField => ({
  valid: ValidationStatus.UNTOUCHED,
  value: "",
});
export const mockResponse = (): IOrderDetailResponse => ({
  orderNumber: "123",
  patientFirstName: "Pallavi",
  patientLastName: "Nayek",
  salesRepName: "Sanvi",
  orderDate: "12-MAR-2021",
  salesRepPhone: "080222222",
  salesRepEmail: "p@mmm.com",
  csrName: "ver",
  csrPhone: "sion",
  csrEmail: "sion@mmm.com",
  trackingLink: "",
  trackingNumber: "3456777",
  receivedFlag: "",
  releaseToShipFlag: "",
  releaseDate: "12-MAR-2021",
  validatedFlag: "",
  benefitsComplDate: "12-MAR-2021",
  therapyFlag: "",
  therapyDate: "",
  deliveredDate: "12-MAR-2021",
  deliveredFlag: "",
  rentalProduct: "",
  outForDeliveryFlag: "",
  outDeliveryDate: "12-MAR-2021",
  deliverySiteType: "",
});
export const showDetailMockResp = (): ShowAdditionalFields => ({
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
export const getMockOrderDetailContextData = (): OrderDetailContextType => {
  return {
    orderDetailsTrackingData: mockResponse(),
    setOrderDetailsTrackingData: () => {},
    selectedSupplyOrder: null,
    setSelectedSupplyOrder: () => {},
    selectedSupplyTherapyStartDate: null,
    setSelectedSupplyTherapyStartDate: () => {},
    resetData: () => {},
    resetWoundData: () => {},
    resetSeletedSupplyOrderData: () => {},
    error: true,
    setError: () => {},
    isOrderFlow: false,
    setIsOrderFlow: () => {},
    isWoundProgressFlow: false,
    setIsWoundProgressFlow: () => {},
    orderTabTitle: "",
    setOrderTabTitle: () => {},
    selectedOrderTab: "",
    setSelectedOrderTab: () => {},
    setOrderOverviewData: () => {},
    primaryAdditionalQuestions: mockQuestionaire,
    secondaryAdditionalQuestions: undefined,
    isComingFromPrev: undefined,
    isSecondaryOpen: false,
    orderOverviewData: {
      accidentType: mockInputFields(),
      address1: mockInputFields(),
      address2: mockInputFields(),
      city: mockInputFields(),
      commonDocs: mockInputFields(),
      contributingCause: mockInputFields(),
      homeCareProvider: mockInputFields(),
      addedCaregiverName: mockInputFields(),
      addedCaregiverAddress1: mockInputFields(),
      addedCaregiverAddress2: mockInputFields(),
      addedCaregiverCity: mockInputFields(),
      addedCaregiverState: mockInputFields(),
      addedCaregiverPhone: mockInputFields(),
      addedCaregiverPhoneExtension: mockInputFields(),
      addedCaregiverZip: mockInputFields(),
      addedCaregiverFacilityType: mockInputFields(),
      addedCaregiverFacilityTypeCode: mockInputFields(),
      addedCaregiverSiteUseID: mockInputFields(),
      addedCaregiverID: mockInputFields(),
      addedCaregiverAccountNumber: mockInputFields(),
      dateInitiated: mockInputFields(),
      dateOfAccident: mockInputFields(),
      deliveryContactFirstName: mockInputFields(),
      deliveryContactLastName: mockInputFields(),
      deliveryContactPhone: mockInputFields(),
      deliveryInstructions: mockInputFields(),
      dob: mockInputFields(),
      email: mockInputFields(),
      emergencyContactFirstName: mockInputFields(),
      emergencyContactLastName: mockInputFields(),
      emergencyContactPhoneNumber: mockInputFields(),
      firstName: mockInputFields(),
      goalOfTherapy: mockInputFields(),
      IsSamePermanentAddress: mockInputFields(),
      isSecondaryInsurancePresent: {
        valid: ValidationStatus.VALID,
        value: false,
        isDefaultValid: true,
      },
      lastName: mockInputFields(),
      lengthOfTherapy: mockInputFields(),
      patientCurrentAddress1: mockInputFields(),
      patientCurrentAddress2: mockInputFields(),
      patientCurrentAddressCity: mockInputFields(),
      patientCurrentAddressPhone: mockInputFields(),
      patientCurrentAddressState: mockInputFields(),
      patientCurrentAddressZip: mockInputFields(),
      phone: mockInputFields(),
      primaryInsurance: mockInsuranceInputFields(),
      secondaryInsurance: mockInsuranceInputFields(),
      state: mockInputFields(),
      submitPrescription: mockInputFields(),
      prescriptionDoc: [],
      uploadDocument: [],
      wasNPWTInitiated: mockInputFields(),
      zip: mockInputFields(),
      inpatientFacility: {
        accountId: "",
        accountName: "",
        accountNumber: 12345,
        address1: "",
        address2: "",
        addressId: "",
        city: "",
        state: "",
        typeCode: "",
        typeName: "",
        zip: 44542,
        facilityMode: undefined,
      },
      inpatientFacilityAsDefault: false,
      updatedPrescriberEmail: mockInputFields(),
      loggedInUserSiteUseID: mockInputFields(),
    },
    newOrderPage: NewOrderPageSection.NEWORDER_PATIENT_WOUND_INFO,
    newOrderProgress: 50,
    resetSecondaryWoundInfoDataForm: () => {},
    resetPrimaryAdditionalQuestions: () => {},
    resetSecondaryAdditionalQuestions: () => {},
    setPrimaryAdditionalQuestions: () => {},
    setSecondaryAdditionalQuestions: () => {},
    setisComingFromPrev: () => {},
    setisSecondaryOpen: () => {},
    setNewOrderPage: () => {},
    setnewOrderProgress: () => {},
    setWoundInfoData: () => {},
    setWoundQuestionnaries: () => {},
    woundInfoData: mockWoundInfoData,
    secondaryWoundInfoData: mockSecondaryWoundInfoData,
    setSecondaryWoundInfoData: () => {},
    woundQuestionaries: undefined,
    isWoundBedErrorFirstTime: false,
    setIsWoundBedErrorFirstTime: () => {},
    newOrderDocuments: [],
    setNewOrderDocuments: () => {},
    deletedOrderDocuments: [],
    setDeletedOrderDocuments: () => {},
    errorInUploadFiles: false,
    setErrorInUploadFiles: () => {},
    prescriberSearchAddPopUpSection: SearchPrescriberModal.SEARCH_PRESCRIBER,
    setprescribeSearchAddPopUpSection: () => {},
    npiPrescriberList: undefined,
    setNpiPrescriberList: () => {},
    prescriptionDocuments: mockPresDoc(),
    setPrescriptionDocuments: () => {},
    setSearchPrescriberPopup: () => {},
    searchPrescriberPopup: false,
    prescriberList: undefined,
    setPrescriberList: () => {},
    prescriberAddedData: undefined,
    setPrescriberAddedData: () => {},
    showSize: false,
    setShowSize: () => {},
    showCannisterType: false,
    setshowCannisterType: () => {},
    showQunatity: false,
    setshowQunatity: () => {},
    showSecSize: false,
    setShowSecSize: () => {},
    showSecQunatity: false,
    setshowSecQunatity: () => {},
    showPrimaryDressingKit: false,
    setShowPrimaryDressingKit: () => {},
    showSecondaryDressingKit: false,
    setShowSecondaryDressingKit: () => {},
    isPrimaryVacKitDressingDisabled: false,
    setIsPrimaryVacKitDressingPlusDisabled: () => {},
    isPrimaryVacKitDressingMinusDisabled: false,
    setIsPrimaryVacKitDressingMinusDisabled: () => {},
    isSecondaryVacKitDressingDisabled: false,
    setIsSecondaryVacKitDressingPlusDisabled: () => {},
    isSecondaryVacKitDressingMinusDisabled: false,
    setIsSecondaryVacKitDressingMinusDisabled: () => {},
    showAddDressingBtn: false,
    setShowAddDressingBtn: () => {},
    showAddtionalObject: mockShowAddtionalObject,
    setShowAdditionalObject: () => {},
    isCannisterProductPlusDisabled: false,
    setIsCannisterProductPlusDisabled: () => {},
    isCannisterProductMinusDisabled: false,
    setIsCannisterProductMinusDisabled: () => {},
    isPrescriberAddedOpenInfo: true,
    setIsPrescriberAddedOpenInfo: () => {},
    isPrescriberAddedOpenErrorInfo: true,
    setIsPrescriberAddedOpenErrorInfo: () => {},
    homecareproviderSearchAddPopUpSection:
      SearchHomeCareProviderModal.SEARCH_HOMECAREPROVIDER,
    setHomecareproviderSearchAddPopUpSection: () => {},
    searchHomeCareProviderPopup: false,
    setSearchHomeCareProviderPopup: () => {},
    setIsPrescriberUpdateEmail: () => {},
    showPrescriberUpdateEmail: false,
    active: false,
    setActive: () => {},
    caregiverSelected: false,
    setCaregiverSelected: () => {},
    shareOrderAddPopUpSection: SharedOrderModal.SHARE_ORDER,
    setshareOrderAddPopUpSection: () => {},
    shareOrderPopup: false,
    setshareOrderPopup: () => {},
    scrollableComponentClassName: undefined,
    setScrollableComponentClassName: () => {},
    sharedOrderTo: "",
    setSharedOrderTo: () => {},
    sharedOrderNote: "",
    setSharedOrderNote: () => {},
    isPartialOrder: false,
    setIsPartialOrder: () => {},
    IsLoadCustomDeliveryDate: false,
    setIsLoadCustomDeliveryDate: () => {},

    requesterInfo: {
      IsRequesterSameasSubmitter: mockInputFields(),
      requesterEmail: mockInputFields(),
      requesterFirstName: mockInputFields(),
      requesterLastName: mockInputFields(),
      requesterFacility: undefined,
      requesterFacilityAsDefault: false,
    },
    setRequesterInfo: () => {},
    productInfo: {
      isReadyCare: mockInputFields(),
      productValue: mockInputFields(),
    },
    setProductInfo: () => {},
    maxDate: mockInputFields(),
    setMaxDate: () => {},
    dressingKit: {
      productId: mockInputFields(),
      productCode: mockInputFields(),
      productSizeCode: mockInputFields(),
      productQuantity: mockInputFields(),
      productName: mockInputFields(),
      productSizeName: mockInputFields(),
      productSizeID: mockInputFields(),
      secProductName: mockInputFields(),
      secProductSizeName: mockInputFields(),
      secProductId: mockInputFields(),
      secProductCode: mockInputFields(),
      secProductSizeCode: mockInputFields(),
      secProductQuantity: mockInputFields(),
      secProductSizeID: mockInputFields(),
    },
    setDressingKit: () => {},
    canister: {
      canisterProductName: mockInputFields(),
      canisterProductCode: mockInputFields(),
      canisterProductQuantity: mockInputFields(),
      canisterProductID: mockInputFields(),
    },
    setCanister: () => {},
    accessory: {
      accessories: [],
    },
    setAccessory: () => {},
    showDialog: false,
    setShowDialog: () => {},

    deliveryInformation: {
      deliveryAddressLine1: mockInputFields(),
      deliveryAddressLine2: mockInputFields(),
      deliveryCity: mockInputFields(),
      deliveryProductNeedByDate: mockInputFields(),
      deliveryProductNeedByTime: mockInputFields(),
      deliverySiteType: mockInputFields(),
      deliveryState: mockInputFields(),
      deliveryZipCode: mockInputFields(),
      deliveryFacilityName: mockInputFields(),
    },
    setDeliveryInformation: () => {},

    isHandleChangeTriggered: false,
    setIsHandleChangeTriggered: () => {},
    vacOrderID: "",
    setVacOrderID: () => {},
    pdfUrl: "",
    setPdfUrl: () => {},
    financialInfoResponseData: null,
    setfinancialInfoResponseData: () => {},
    primaryInsurenceData: null,
    setprimaryInsurenceData: () => {},
    secondaryInsurenceData: null,
    setsecondaryInsurenceData: () => {},
    orderOverviewDocsUpload: [],
    setorderOverviewDocsUpload: () => {},
    selectedCommonDoc: "",
    setSelectedCommonDoc: () => {},
    documentsDetails: [],
    setDocumentDetails: () => {},
    woundProgressTabTitle: "",
    setWoundProgressTabTitle: () => {},
    woundId: null,
    setWoundId: () => {},
    woundIndex: null,
    setWoundIndex: () => {},
  };
};

export const mockResponseOrderTrackingResponse: IOrderDetailResponse = {
  orderNumber: "123",
  patientFirstName: "Pallavi",
  patientLastName: "Nayek",
  salesRepName: "Sanvi",
  orderDate: "12-MAR-2021",
  salesRepPhone: "080222222",
  salesRepEmail: "p@mmm.com",
  csrName: "ver",
  csrPhone: "sion",
  csrEmail: "sion@mmm.com",
  trackingLink: "",
  trackingNumber: "3456777",
  receivedFlag: "",
  releaseToShipFlag: "",
  releaseDate: "12-MAR-2021",
  validatedFlag: "",
  benefitsComplDate: "12-MAR-2021",
  therapyFlag: "",
  therapyDate: "",
  deliveredDate: "12-MAR-2021",
  deliveredFlag: "",
  rentalProduct: "",
  outForDeliveryFlag: "",
  outDeliveryDate: "12-MAR-2021",
  deliverySiteType: "home",
};
export const mockFinancialData: IFinancialResponse = {
  payerResponsibility: "80.00%",
  outOfPocket: "$7,500",
  estimatedRentalAmount: "$24.17 per day",
  estimatedSuppliesAmount: "$0.00",
  coPay: "20.00%",
  deductableAmount: "$0.00",
  patientResponsibility: "$24.17",
};

export const InsuranceData: IInsurenceDetail = {
  payor: "UNITED HEALTHCARE",
  policyId: "941922694",
  groupId: "742196",
  relationship: "Spouse",
  deductible: "0",
  patientPercent: "20",
  coveragePercent: "80",
  outOfPocket: "7,500",
};
