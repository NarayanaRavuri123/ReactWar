import "./reviewOrderStepper.css";
import { Grid } from "@mui/material";
import {
  DD_INSURANCE_TYPE_CONTENT,
  DD_PHONE_TYPE_CONTENT,
  DD_US_STATES_CONTENT,
} from "../../../util/staticText";
import {
  NewOrderContext,
  NewOrderContextType,
} from "../../../context/NewOrderContext";
import { format } from "react-string-format";
import WoundBed from "../woundBed/woundBed.component";
import { Exudate } from "../exudate/exudate.component";
import {
  Question,
  WoundQuestionaries,
} from "../clinicalInformation/clinicalInfo.interface";
import { useContext, useEffect, useState } from "react";
import OrderSummaryHeader from "./orderSummaryComponent";
import { Nutrition } from "../nutrition/nutrition.component";
import Debridement from "../debridement/debridement.component";
import { NewOrderPageSection } from "../NewOrderContainer.enum";
import { getdropDownContent } from "../../../util/dropDownService";
import Comorbodities from "../comorbodities/comorbodities.component";
import WoundTunneling from "../woundTunneling/woundTunneling.component";
import WoundDimension from "../woundDimension/woundDimension.component";
import { Osteomyelitis } from "../osteomyelitis/osteomyelitis.component";
import { ValidationStatus } from "../../../core/interfaces/input.interface";
import PreviousTherapy from "../previousTherapies/previousTherapy.component";
import WoundUndermining from "../woundUndermining/woundUndermining.component";
import { ReactComponent as DownloadIcon } from "../../../assets/download.svg";
import { DeliveryContact } from "../deliveryContact/deliveryContact.component";
import { VerifyRequesterInfo } from "../verifyRequesterInfo/verifyRequesterInfo";
import { HomeCareProvider } from "../homeCareProvider/homeCareProvider.component";
import { DressingSupplies } from "../dressingSupplies/dressingSupplies.component";
import { ExpressButton } from "../../../core/expressButton/expressButton.component";
import { IVacTherapyInformation } from "../woundBed/vacTherapyInformation.interface";
import { ContributingCause } from "../contributingCause/contributingCause.component";
import { ExposedStructures } from "../exposedStructures/exposedStructures.component";
import { getAdditionalWoundQuestionaries } from "../../../util/primaryWoundTypeService";
import { InsuranceMainComponent } from "../insuranceInformation/insuranceMainComponent";
import { PatientInformation } from "../patientInformation/patientInformation.component";
import { ProductInformation } from "../productInformation/productInformation.component";
import { TherapyInformation } from "../therapyInformation/therapyInformation.component";
import { ClinicalInformation } from "../clinicalInformation/clinicalInformation.component";
import { InpatientTransition } from "../inpatientTransition/inpatientTransition.component";
import { DeliveryInformation } from "../deliveryInformation/deliveryInformation.component";
import { INewOrderWoundInfo } from "../newOrderWoundInfoStepper/newOrderWoundInfo.interface";
import { EmergencyContactInfo } from "../emergencyContactInfo/emergencyContactInfo.component";
import { PatientCurrentAddress } from "../patientCurrentAddress/patientCurrentAddress.component";
import { PrescriberInformation } from "../prescriberInformation/prescriberInformation.component";
import { SecondaryWoundInfo } from "../clinicalInformation/secondaryWoundInfo/secondaryWoundInfo.component";
import { ISecondaryWoundInfo } from "../clinicalInformation/secondaryWoundInfo/secondaryWoundInfo.interface";
import OrderUploadDocument from "../orderUploadDocument/orderUploadDocument.component";
import { IDropZoneDocumentSelect } from "../../../core/customDropZone/dropZoneDocumentSelect.interface";
import { IPrintOrderSummaryRequest } from "./PrintOrderSummaryPdf.interface";
import { getPdfContent } from "../../../util/vacOrderService";
import { getPdfUrl } from "../../../util/utilityFunctions";
import SnackBar from "../../../core/snackBar/snackBar.component";
import { Popup } from "../../../core/popup/popup.component";
import { LoadingSpinner } from "../../../core/loader/LoadingSpinner";
interface Props {
  isOrderSummary: boolean;
  isPartialOrder?: boolean;
  isReviewOrder: boolean;
  newOrderData: any;
  requesterInfo: any;
  productInfo: any;
  dressingKit: any;
  canister: any;
  accessory: any;
  nextOrderOpen: boolean;
  secondaryWoundInfoData: ISecondaryWoundInfo;
  setNewOrderData: any;
  setRequesterInfo: any;
  setProductInfo: any;
  setDressingKit: any;
  setCanister: any;
  setAcessory: any;
  setSecondaryWoundInfoData: any;
  setWoundInfoData: any;
  woundInfoData: INewOrderWoundInfo;
  vacTherapyInformationData: IVacTherapyInformation;
  newOrderDocuments: IDropZoneDocumentSelect[];
  deliveryInformation: any;
  setDeliveryInformation: any;
  vacOrderID?: any;
  pdfUrl?: any;
}

const ReviewOrderStepper = ({
  isOrderSummary,
  isPartialOrder,
  isReviewOrder,
  newOrderData,
  requesterInfo,
  productInfo,
  dressingKit,
  canister,
  accessory,
  nextOrderOpen,
  secondaryWoundInfoData,
  setNewOrderData,
  setRequesterInfo,
  setProductInfo,
  setDressingKit,
  setCanister,
  setAcessory,
  setSecondaryWoundInfoData,
  setWoundInfoData,
  woundInfoData,
  vacTherapyInformationData,
  newOrderDocuments,
  deliveryInformation,
  setDeliveryInformation,
  vacOrderID,
  pdfUrl,
}: Props) => {
  const [states, setStates] = useState([]);
  const [statesText, setStatesText] = useState([]);
  const [phoneTypes, setPhoneTypes] = useState([]);
  const [insuranceTypes, setInsuranceTypes] = useState([]);
  const [insuranceTypesText, setInsuranceTypesText] = useState([]);
  const NewOrderObj = useContext<NewOrderContextType | null>(NewOrderContext);
  const [reviewOrderToastFlag, setReviewOrderToastFlag] = useState(false);
  const [openLoader, setOpenLoader] = useState(false);

  const fetchDropdownContents = async () => {
    //async and await
    try {
      const ddContent = format(
        "{0},{1},{2}",
        DD_PHONE_TYPE_CONTENT,
        DD_US_STATES_CONTENT,
        DD_INSURANCE_TYPE_CONTENT
      );
      const data = await getdropDownContent(ddContent);
      if (data.items.length > 0) {
        const phoneTypeObject = data.items.filter(
          (item: { name: string }) => item.name === DD_PHONE_TYPE_CONTENT
        );
        const phoneTypeArray = phoneTypeObject[0].data
          .sort((a: { order: number }, b: { order: number }) =>
            a.order > b.order ? 1 : -1
          )
          .map((x: { text: any }) => x.text);
        setPhoneTypes(phoneTypeArray);
        const statesObject = data.items.filter(
          (item: { name: string }) => item.name === DD_US_STATES_CONTENT
        );
        const statesData = statesObject[0].data.sort(
          (a: { order: number }, b: { order: number }) =>
            a.order > b.order ? 1 : -1
        );
        setStates(statesData);
        setStatesText(statesData.map((x: { text: string }) => x.text));
        const relationshipObject = data.items.filter(
          (item: { name: string }) => item.name === DD_INSURANCE_TYPE_CONTENT
        );
        const relationshipDataArray = relationshipObject[0].data.sort(
          (a: { order: number }, b: { order: number }) =>
            a.order > b.order ? 1 : -1
        );
        setInsuranceTypes(relationshipDataArray);
        setInsuranceTypesText(
          relationshipDataArray.map((x: { text: string }) => x.text)
        );
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleClickPdfDownload = async () => {
    if (pdfUrl) window.open(pdfUrl, "_blank");
    else {
      setReviewOrderToastFlag(true);
      setTimeout(() => {
        setReviewOrderToastFlag(false);
      }, 5000);
    }
  };
  const showSecondaryInsuranceInformation = () => {
    NewOrderObj?.setisSecondaryOpen(!NewOrderObj?.isSecondaryOpen);
  };

  const setQuestionnaireContent = async () => {
    const questionsData = await getAdditionalWoundQuestionaries();
    const mapData = new Map<string, WoundQuestionaries>();
    questionsData.forEach((val: any) => {
      if (!mapData.has(val.woundType)) {
        mapData.set(val.woundType, {
          additionalQuestion: val.additionalQuestion.map((quest: Question) => ({
            ...quest,
            value: "",
            valid: ValidationStatus.UNTOUCHED,
          })),
          category: val.category,
          woundType: val.woundType,
        });
      }
    });
    NewOrderObj?.setWoundQuestionnaries(mapData);
  };

  const openFirstPageEdit = (ref: any) => {
    window.scrollTo(0, 0);
    NewOrderObj?.setnewOrderProgress(20);
    NewOrderObj?.setisComingFromPrev(true);
    NewOrderObj?.setNewOrderPage(NewOrderPageSection.NEWORDER_PATIENT_INFO);
    NewOrderObj?.setScrollableComponentClassName(ref);
  };

  const openSecondPageEdit = (ref: any) => {
    window.scrollTo(0, 0);
    NewOrderObj?.setnewOrderProgress(40);
    NewOrderObj?.setisComingFromPrev(true);
    NewOrderObj?.setNewOrderPage(
      NewOrderPageSection.NEWORDER_PATIENT_WOUND_INFO
    );
    NewOrderObj?.setScrollableComponentClassName(ref);
  };

  useEffect(() => {
    fetchDropdownContents();
    setQuestionnaireContent();
  }, []);

  return (
    <>
      <Grid className="newOrder-container">
        <div className={`patientForm ${isOrderSummary ? " summary" : ""}`}>
          {isOrderSummary && <OrderSummaryHeader />}
          <SnackBar
            toastStyle="reviewOrderToast"
            handleCloseAlert={() => {
              setReviewOrderToastFlag(false);
            }}
            msg="File does not yet exist. Please try again in a few minutes"
            openFlag={reviewOrderToastFlag}
          />
          {isOrderSummary ? (
            <Grid container display="flex" flexDirection="row">
              <Grid item xs={5}>
                <h2 className="orderSummaryHeader">Order Summary</h2>
              </Grid>
              <Grid className="saveOrderDiv">
                <ExpressButton
                  clickHandler={() => {
                    handleClickPdfDownload();
                  }}
                  parentClass="saveOrderBtn"
                  testId="acc-cancel-test"
                  variant="text"
                  startIcon={<DownloadIcon />}
                >
                  Save & Print Order Summary
                </ExpressButton>
              </Grid>
            </Grid>
          ) : (
            <h2
              className="reviewOrderHeader"
              data-testid="patient-info-review-order-page-title"
            >
              Review Order
            </h2>
          )}
          <div className="short-form">
            <PatientInformation
              data={newOrderData!}
              setData={setNewOrderData!}
              phoneTypes={phoneTypes}
              states={states}
              statesText={statesText}
              vacTherapyInformationData={vacTherapyInformationData}
              isReviewOrder={isReviewOrder}
              editButtonClicked={() => openFirstPageEdit("")}
              isOrderSummary={isOrderSummary}
            />
            <PatientCurrentAddress
              data={newOrderData!}
              setData={setNewOrderData!}
              states={states}
              statesText={statesText}
              isReviewOrder={isReviewOrder}
              editButtonClicked={() =>
                openFirstPageEdit("patient-current-address-info-component")
              }
              isOrderSummary={isOrderSummary}
            />
            <EmergencyContactInfo
              data={newOrderData!}
              setData={setNewOrderData!}
              isReviewOrder={isReviewOrder}
              editButtonClicked={() =>
                openFirstPageEdit("emergencyContactInfo")
              }
              isOrderSummary={isOrderSummary}
            />
            <InsuranceMainComponent
              data={newOrderData}
              setData={setNewOrderData}
              hideAddButton={newOrderData.isSecondaryInsurancePresent.value}
              dropDownDataArray={insuranceTypes}
              dropDownTextArray={insuranceTypesText}
              addOrRemoveButtonAction={showSecondaryInsuranceInformation}
              vacTherapyInformationData={vacTherapyInformationData}
              isReviewOrder={isReviewOrder}
              primaryEdiitButtonClicked={() =>
                openFirstPageEdit("insuranceInformationMain-primary")
              }
              secondaryEditButtonClicked={() =>
                openFirstPageEdit("insuranceInformationMain-secondary")
              }
              isOrderSummary={isOrderSummary}
              showAdditionalFields={NewOrderObj?.showAddtionalObject!}
            />
            <ContributingCause
              data={newOrderData!}
              setData={setNewOrderData!}
              isReviewOrder={isReviewOrder}
              editButtonClicked={() =>
                openFirstPageEdit("contributing-cause-component")
              }
              isOrderSummary={isOrderSummary}
            />
            <TherapyInformation
              data={newOrderData!}
              setData={setNewOrderData!}
              isReviewOrder={isReviewOrder}
              editButtonClicked={() =>
                openFirstPageEdit("therapy-information-component")
              }
              isOrderSummary={isOrderSummary}
            />
            <PrescriberInformation
              states={states}
              statesText={statesText}
              isReviewOrder={isReviewOrder}
              editButtonClicked={() =>
                openFirstPageEdit("prescriber-informantion-component")
              }
              isOrderSummary={isOrderSummary}
            />
            <ProductInformation
              productInfo={productInfo!}
              setProductInfo={setProductInfo!}
              isReviewOrder={isReviewOrder}
              editButtonClicked={() =>
                openFirstPageEdit("productInformation-component")
              }
              isOrderSummary={isOrderSummary}
            />
            <DressingSupplies
              dressingKit={dressingKit!}
              canister={canister!}
              accessory={accessory!}
              productInfo={productInfo!}
              setDressingKit={setDressingKit!}
              setCanister={setCanister!}
              setAccessory={setAcessory!}
              isReviewOrder={isReviewOrder}
              editButtonClicked={() =>
                openFirstPageEdit("dressingMain-component")
              }
              isOrderSummary={isOrderSummary}
              orderId=""
            />
            <InpatientTransition
              data={newOrderData!}
              setData={setNewOrderData!}
              isReviewOrder={isReviewOrder}
              editButtonClicked={() =>
                openFirstPageEdit("inpatientTransition-component")
              }
              isOrderSummary={isOrderSummary}
            />
            <VerifyRequesterInfo
              requesterInfo={requesterInfo!}
              setRequesterInfo={setRequesterInfo!}
              isReviewOrder={isReviewOrder}
              editButtonClicked={() =>
                openFirstPageEdit("verify-requester-info-component")
              }
              isOrderSummary={isOrderSummary}
            />
            <HomeCareProvider
              data={newOrderData!}
              setData={setNewOrderData!}
              states={states}
              statesText={statesText}
              isReviewOrder={isReviewOrder}
              editButtonClicked={() =>
                openFirstPageEdit("homecareprovider-component")
              }
              isOrderSummary={isOrderSummary}
            />
            <DeliveryContact
              data={newOrderData!}
              setData={setNewOrderData!}
              isReviewOrder={isReviewOrder}
              editButtonClicked={() =>
                openFirstPageEdit("deliveryContactMain-component")
              }
              isOrderSummary={isOrderSummary}
            />
            <DeliveryInformation
              data={newOrderData!}
              setData={setNewOrderData!}
              states={states}
              statesText={statesText}
              nextOrderOpen={nextOrderOpen}
              isReviewOrder={isReviewOrder}
              editButtonClicked={() =>
                openFirstPageEdit("delivery-information-component")
              }
              isOrderSummary={isOrderSummary}
              deliveryInformation={deliveryInformation}
              setDeliveryInformation={setDeliveryInformation}
              NewOrderObj={NewOrderObj}
            />
            <OrderUploadDocument
              editButtonClicked={() => openFirstPageEdit("newOrderDoc")}
              isOrderSummary={isOrderSummary}
              isReviewOrder={isReviewOrder}
              newOrderDocuments={newOrderDocuments!}
            />
            {!isPartialOrder && (
              <>
                <Nutrition
                  editButtonClicked={() => openSecondPageEdit("")}
                  isOrderSummary={isOrderSummary}
                  isReviewOrder={isReviewOrder}
                  setWoundInfoData={setWoundInfoData}
                  woundInfoData={woundInfoData}
                />
                <PreviousTherapy
                  editButtonClicked={() =>
                    openSecondPageEdit("previous-therapy-main-container")
                  }
                  isOrderSummary={isOrderSummary}
                  isReviewOrder={isReviewOrder}
                  setWoundInfoData={setWoundInfoData!}
                  woundInfoData={woundInfoData}
                />
                <Comorbodities
                  editButtonClicked={() =>
                    openSecondPageEdit("comorbodities-main-container")
                  }
                  isOrderSummary={isOrderSummary}
                  isReviewOrder={isReviewOrder}
                  setWoundInfoData={setWoundInfoData!}
                  woundInfoData={woundInfoData}
                />
                <Osteomyelitis
                  editButtonClicked={() =>
                    openSecondPageEdit("osteomyelitis-main-container")
                  }
                  isOrderSummary={isOrderSummary}
                  isReviewOrder={isReviewOrder}
                  setWoundInfoData={setWoundInfoData!}
                  woundInfoData={woundInfoData}
                />
                <ClinicalInformation
                  editButtonClicked={() =>
                    openSecondPageEdit("clinical-information-main-container")
                  }
                  isOrderSummary={isOrderSummary}
                  isReviewOrder={isReviewOrder}
                  setWoundInfoData={setWoundInfoData!}
                  woundInfoData={woundInfoData}
                  newOrderObj={NewOrderObj}
                />
                <Debridement
                  editButtonClicked={() =>
                    openSecondPageEdit("debridement-main-container")
                  }
                  isOrderSummary={isOrderSummary}
                  isReviewOrder={isReviewOrder}
                  setWoundInfoData={setWoundInfoData!}
                  woundInfoData={woundInfoData}
                />
                <WoundDimension
                  editButtonClicked={() =>
                    openSecondPageEdit("wound-dimensions-main-container")
                  }
                  isOrderSummary={isOrderSummary}
                  isReviewOrder={isReviewOrder}
                  setWoundInfoData={setWoundInfoData!}
                  woundInfoData={woundInfoData}
                />
                <WoundUndermining
                  editButtonClicked={() =>
                    openSecondPageEdit("wound-undermining-main-container")
                  }
                  isOrderSummary={isOrderSummary}
                  isReviewOrder={isReviewOrder}
                  setWoundInfoData={setWoundInfoData!}
                  woundInfoData={woundInfoData}
                />
                <WoundTunneling
                  editButtonClicked={() =>
                    openSecondPageEdit("wound-tunneling-main-container")
                  }
                  isOrderSummary={isOrderSummary}
                  isReviewOrder={isReviewOrder}
                  setWoundInfoData={setWoundInfoData!}
                  woundInfoData={woundInfoData}
                />
                <WoundBed
                  editButtonClicked={() =>
                    openSecondPageEdit("wound-bed-main-container")
                  }
                  isOrderSummary={isOrderSummary}
                  isReviewOrder={isReviewOrder}
                  setWoundInfoData={setWoundInfoData!}
                  woundInfoData={woundInfoData}
                  vacTherapyInformationData={vacTherapyInformationData!}
                />
                <Exudate
                  editButtonClicked={() =>
                    openSecondPageEdit("exudate-main-container")
                  }
                  isOrderSummary={isOrderSummary}
                  isReviewOrder={isReviewOrder}
                  setWoundInfoData={setWoundInfoData!}
                  woundInfoData={woundInfoData}
                />
                <ExposedStructures
                  editButtonClicked={() =>
                    openSecondPageEdit("exposed-structures-main-container")
                  }
                  isOrderSummary={isOrderSummary}
                  isReviewOrder={isReviewOrder}
                  setWoundInfoData={setWoundInfoData!}
                  woundInfoData={woundInfoData}
                />
                {woundInfoData.isShowSecondaryWoundInfo.value === "Yes" && (
                  <SecondaryWoundInfo
                    data={woundInfoData}
                    editButtonClicked={() =>
                      openSecondPageEdit("secondary-wound")
                    }
                    isOrderSummary={isOrderSummary}
                    isReviewOrder={isReviewOrder}
                    setData={setWoundInfoData}
                    setWoundInfoData={setSecondaryWoundInfoData}
                    woundInfoData={secondaryWoundInfoData}
                    vacTherapyInformationData={vacTherapyInformationData}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </Grid>
      <Popup
        closeHandler={() => {}}
        hideCloseButton={true}
        openFlag={openLoader}
      >
        <div className="review-order-loading">
          <div className="review-order-spinner">
            <LoadingSpinner />
          </div>
        </div>
      </Popup>
    </>
  );
};

export default ReviewOrderStepper;
