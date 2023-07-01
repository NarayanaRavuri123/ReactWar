import { Grid } from "@mui/material";
import {
  NewOrderContext,
  NewOrderContextType,
} from "../../../context/NewOrderContext";
import { useContext, useEffect, useState } from "react";
import { ValidationStatus } from "../../../core/interfaces/input.interface";
import { DeliveryContact } from "../deliveryContact/deliveryContact.component";
import { PrintCommonDocs } from "../printCommonDocs/printCommonDocs.component";
import { VerifyRequesterInfo } from "../verifyRequesterInfo/verifyRequesterInfo";
import { HomeCareProvider } from "../homeCareProvider/homeCareProvider.component";
import { DressingSupplies } from "../dressingSupplies/dressingSupplies.component";
import { ContributingCause } from "../contributingCause/contributingCause.component";
import { InsuranceMainComponent } from "../insuranceInformation/insuranceMainComponent";
import { PatientInformation } from "../patientInformation/patientInformation.component";
import { ProductInformation } from "../productInformation/productInformation.component";
import { SubmitPrescription } from "../submitPrescription/submitPrescription.component";
import { TherapyInformation } from "../therapyInformation/therapyInformation.component";
import { InpatientTransition } from "../inpatientTransition/inpatientTransition.component";
import { DeliveryInformation } from "../deliveryInformation/deliveryInformation.component";
import { EmergencyContactInfo } from "../emergencyContactInfo/emergencyContactInfo.component";
import { PatientCurrentAddress } from "../patientCurrentAddress/patientCurrentAddress.component";
import { getAdditionalWoundQuestionaries } from "../../../util/primaryWoundTypeService";
import { PrescriberInformation } from "../prescriberInformation/prescriberInformation.component";
import {
  Question,
  WoundQuestionaries,
} from "../clinicalInformation/clinicalInfo.interface";
import OrderUploadDocument from "../orderUploadDocument/orderUploadDocument.component";
import { defaultInsuranceData } from "../insuranceInformation/insuranceInformation/insuranceInformation.model";
import { IVacTherapyInformation } from "../woundBed/vacTherapyInformation.interface";
import { getCMSContent } from "../../../util/cmsService";
import { CMS_PRINTABLE_DOCUMENTS } from "../../../util/staticText";
import { IPrintableDocumentsPdf } from "../printCommonDocs/printCommonDocs.interface";

interface Props {
  orderId: string;
  newOrderData: any;
  setNewOrderData: any;
  nextOrderOpen: boolean;
  vacTherapyInformationData: IVacTherapyInformation;
  states: any;
  statesText: any;
  phoneTypes: any;
  insuranceTypes: any;
  insuranceTypesText: any;
  sharedOrderText: any;
  requesterInfo: any;
  setRequesterInfo: any;
  productInfo: any;
  setProductInfo: any;
  dressingKit: any;
  setDressingKit: any;
  canister: any;
  setCanister: any;
  accessory: any;
  setAccessory: any;
  deliveryInformation: any;
  setDeliveryInformation: any;
}

const PatientInfoStepper = ({
  orderId,
  newOrderData,
  setNewOrderData,
  nextOrderOpen,
  vacTherapyInformationData,
  states,
  statesText,
  phoneTypes,
  insuranceTypes,
  insuranceTypesText,
  sharedOrderText,
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
}: Props) => {
  const NewOrderObj = useContext<NewOrderContextType | null>(NewOrderContext);
  const [printableDocumentsObj, setPrintableDocumentsObj] = useState<
    IPrintableDocumentsPdf | undefined
  >();

  const showSecondaryInsuranceInformation = () => {
    NewOrderObj?.setisSecondaryOpen(!NewOrderObj?.isSecondaryOpen);
    if (!NewOrderObj?.isComingFromPrev) {
      setDefaultSecondaryInsuranceInformation();
    }
  };

  const setDefaultSecondaryInsuranceInformation = () => {
    setNewOrderData((dt: any) => ({
      ...dt,
      secondaryInsurance: defaultInsuranceData,
      isSecondaryInsurancePresent: {
        ...dt.isSecondaryInsurancePresent,
        value: NewOrderObj?.isSecondaryOpen,
      },
    }));
    NewOrderObj?.setShowAdditionalObject((dt: any) => ({
      ...dt,
      typeSecondary: {
        medicare: false,
        medicareAdvantage: false,
        managedMedicaid: false,
        commercialInsurance: false,
        medicaid: false,
        charityCare: false,
        privatePay: false,
        otherAdditionalDetails: false,
      },
    }));
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

  useEffect(() => {
    setQuestionnaireContent();
  }, []);

  useEffect(() => {
    if (NewOrderObj?.isComingFromPrev) {
      NewOrderObj?.setisComingFromPrev(false);
    } else {
      setDefaultSecondaryInsuranceInformation();
    }
  }, [NewOrderObj?.isSecondaryOpen]);

  useEffect(() => {
    fetchPrintableDocumentsLinks();
  }, []);

  const fetchPrintableDocumentsLinks = async () => {
    try {
      const response = await getCMSContent(CMS_PRINTABLE_DOCUMENTS);
      if (response.succeeded) {
        const printableDocresponseObj: IPrintableDocumentsPdf = {
          VACTherapyOrderPad: response.item.orderPad.FileLink,
          VACTherapyInsuranceAuthorizationForm:
            response.item.authorizationForm.FileLink,
        };
        setPrintableDocumentsObj(printableDocresponseObj);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (NewOrderObj && NewOrderObj.scrollableComponentClassName) {
        let scrollableComponent = document.getElementsByClassName(
          NewOrderObj.scrollableComponentClassName
        )[0];
        if (scrollableComponent) {
          scrollableComponent.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "start",
          });
        }
        NewOrderObj.setScrollableComponentClassName(undefined);
      }
    }, 300);
  }, [NewOrderObj?.scrollableComponentClassName]);

  return (
    <Grid className="newOrder-container">
      <div className="patientForm">
        <div className="sharedOrderalert"> {sharedOrderText} </div>
        <div className="short-form">
          <PatientInformation
            data={newOrderData!}
            setData={setNewOrderData!}
            phoneTypes={phoneTypes}
            states={states}
            statesText={statesText}
            vacTherapyInformationData={vacTherapyInformationData}
          />
          <PatientCurrentAddress
            data={newOrderData!}
            setData={setNewOrderData!}
            states={states}
            statesText={statesText}
          />
          <EmergencyContactInfo
            data={newOrderData!}
            setData={setNewOrderData!}
          />
          <InsuranceMainComponent
            data={newOrderData}
            setData={setNewOrderData}
            hideAddButton={newOrderData.isSecondaryInsurancePresent.value}
            dropDownDataArray={insuranceTypes}
            dropDownTextArray={insuranceTypesText}
            addOrRemoveButtonAction={showSecondaryInsuranceInformation}
            vacTherapyInformationData={vacTherapyInformationData}
            showAdditionalFields={NewOrderObj?.showAddtionalObject!}
          />
          <ContributingCause data={newOrderData!} setData={setNewOrderData!} />
          <TherapyInformation data={newOrderData!} setData={setNewOrderData!} />
          <PrescriberInformation states={states} statesText={statesText} />
          <SubmitPrescription
            data={newOrderData!}
            setData={setNewOrderData!}
            printableDocumentsLink={printableDocumentsObj}
          />
          <ProductInformation
            productInfo={productInfo!}
            setProductInfo={setProductInfo!}
          />
          <DressingSupplies
            dressingKit={dressingKit!}
            canister={canister!}
            accessory={accessory!}
            productInfo={productInfo!}
            orderId={orderId}
            setDressingKit={setDressingKit!}
            setCanister={setCanister!}
            setAccessory={setAccessory!}
          />
          <InpatientTransition
            data={newOrderData!}
            setData={setNewOrderData!}
          />
          <VerifyRequesterInfo
            requesterInfo={requesterInfo!}
            setRequesterInfo={setRequesterInfo!}
          />
          <HomeCareProvider
            data={newOrderData!}
            setData={setNewOrderData!}
            states={states}
            statesText={statesText}
          />
          <DeliveryContact data={newOrderData!} setData={setNewOrderData!} />
          <DeliveryInformation
            data={newOrderData!}
            setData={setNewOrderData!}
            states={states}
            statesText={statesText}
            nextOrderOpen={nextOrderOpen}
            deliveryInformation={deliveryInformation}
            setDeliveryInformation={setDeliveryInformation}
            NewOrderObj={NewOrderObj}
          />
          <PrintCommonDocs
            data={newOrderData!}
            setData={setNewOrderData!}
            printableDocumentsLink={printableDocumentsObj}
          />
          <OrderUploadDocument />
        </div>
      </div>
    </Grid>
  );
};

export default PatientInfoStepper;
