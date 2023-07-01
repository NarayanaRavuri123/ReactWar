import { Grid } from "@mui/material";
import { useContext } from "react";
import { AuthContext, AuthContextType } from "../../../../context/AuthContext";
import {
  OrderDetailContext,
  OrderDetailContextType,
} from "../../../../context/OrderDetailsContext";
import { ClinicalInformation } from "../../../newOrder/clinicalInformation/clinicalInformation.component";
import { ISecondaryWoundInfo } from "../../../newOrder/clinicalInformation/secondaryWoundInfo/secondaryWoundInfo.interface";
import { ComorboditiesReviewOrder } from "../../../newOrder/comorbodities/reviewOrder/comorboditiesReviewOrder.component";
import { ContributingCauseReviewOrder } from "../../../newOrder/contributingCause/reviewOrder/contributingCauseReviewOrder.component";
import Debridement from "../../../newOrder/debridement/debridement.component";
import { DeliveryContactReviewOrder } from "../../../newOrder/deliveryContact/reviewOrder/deliveryContactReviewOrder.component";
import { DeliveryInfoReviewOrder } from "../../../newOrder/deliveryInformation/reviewOrder/deliveryInfoReviewOrder.component";
import { DressingSuppliesReviewOrder } from "../../../newOrder/dressingSupplies/reviewOrder/dressingSuppliesReviewOrder.component";
import { EmergencyContactReviewOrder } from "../../../newOrder/emergencyContactInfo/reviewOrder/emergencyContactReviewOrder.component";
import { ExposedStructures } from "../../../newOrder/exposedStructures/exposedStructures.component";
import { Exudate } from "../../../newOrder/exudate/exudate.component";
import { HomeCareProviderReviewOrder } from "../../../newOrder/homeCareProvider/reviewOrder/homeCareProviderReviewOrder.component";
import { InpatientTransitionReviewOrder } from "../../../newOrder/inpatientTransition/reviewOrder/inpatientTransitionReviewOrder.component";
import { InsuranceMainComponent } from "../../../newOrder/insuranceInformation/insuranceMainComponent";
import { INewOrderWoundInfo } from "../../../newOrder/newOrderWoundInfoStepper/newOrderWoundInfo.interface";
import { NutritionReviewOrder } from "../../../newOrder/nutrition/reviewOrder/nutritionReviewOrder.component";
import { OsteomyelitisReviewOrder } from "../../../newOrder/osteomyelitis/reviewOrder/osteomyelitisReviewOrder.component";
import { PatientCurrentAddressReviewOrder } from "../../../newOrder/patientCurrentAddress/reviewOrder/partientCurrentAddressReviewOrder.component";
import { PatientInfoReviewOrder } from "../../../newOrder/patientInformation/reviewOrder/patientInfoReviewOrder.component";
import { PrescriberInformationReviewOrder } from "../../../newOrder/prescriberInformation/reviewOrder/prescriberInformationReviewOrder.component";
import { PreviousTherapiesReviewOrder } from "../../../newOrder/previousTherapies/reviewOrder/previousTherapyReviewOrder.component";
import { TherapyInformationReviewOrder } from "../../../newOrder/therapyInformation/reviewOrder/therapyInformationReviewOrder.component";
import { VerifyRequesterInfoReviewOrder } from "../../../newOrder/verifyRequesterInfo/reviewOrder/verifyRequesterInfoReviewOrder.component";
import { IVacTherapyInformation } from "../../../newOrder/woundBed/vacTherapyInformation.interface";
import WoundDimension from "../../../newOrder/woundDimension/woundDimension.component";
import WoundTunneling from "../../../newOrder/woundTunneling/woundTunneling.component";
import WoundUndermining from "../../../newOrder/woundUndermining/woundUndermining.component";
import "./../../../newOrder/newOrderReviewOrderStepper/reviewOrderStepper.css";
import { OrderDetailsProductInformation } from "./orderDetailsProductInformation/orderDetailsProductInformation.component";
import "./orderSummary.css";
interface Props {
  isOrderSummary: boolean;
  newOrderData: any;
  requesterInfo: any;
  dressingKit: any;
  canister: any;
  accessory: any;
  secondaryWoundInfoData: ISecondaryWoundInfo;
  woundInfoData: INewOrderWoundInfo;
  deliveryInformation: any;
  insuranceTypes: never[];
  insuranceTypesText: never[];
  accidentTypes: never[];
  therapyLengths: never[];
  therapyGoals: never[];
  vacTherapyInformationData: IVacTherapyInformation;
  productInfo: any;
  prodInfoTypes: any;
  deliverySites: any;
  states?: never[];
  statesText?: never[];
}

export const OrderSummary = ({
  isOrderSummary,
  newOrderData,
  requesterInfo,
  dressingKit,
  canister,
  accessory,
  secondaryWoundInfoData,
  woundInfoData,
  deliveryInformation,
  insuranceTypes,
  insuranceTypesText,
  accidentTypes,
  therapyLengths,
  therapyGoals,
  vacTherapyInformationData,
  productInfo,
  prodInfoTypes,
  deliverySites,
}: Props) => {
  const orderOverViewObj = useContext<OrderDetailContextType | null>(
    OrderDetailContext
  );
  const AuthObj = useContext<AuthContextType | null>(AuthContext);

  return (
    <>
      <Grid className="order-overview">
        <div className="all-content-div-orderoverview">
          <div className="sub-content-div-orderoverview">
            <div className="sub-content-component-border-div">
              <div className="sub-content-component">
                <Grid className="grid-container" container spacing={2}>
                  <Grid className="grid-item" item xs={9.1}>
                    <PatientInfoReviewOrder
                      data={newOrderData!}
                      editButtonClicked={false}
                      isOrderSummary={isOrderSummary}
                    />
                  </Grid>
                </Grid>
              </div>
            </div>
            <div className="border-div">
              <div className="sub-content-component">
                <Grid className="grid-container" container spacing={2}>
                  <Grid className="grid-item" item xs={9.1}>
                    <PatientCurrentAddressReviewOrder
                      data={newOrderData}
                      editButtonClicked={false}
                      isOrderSummary={isOrderSummary}
                    />
                  </Grid>
                </Grid>
              </div>
            </div>
            <div className="border-div">
              <div className="sub-content-component">
                <Grid className="grid-container" container spacing={2}>
                  <Grid className="grid-item" item xs={9.1}>
                    <EmergencyContactReviewOrder
                      data={newOrderData}
                      editButtonClicked={false}
                      isOrderSummary={isOrderSummary}
                    />
                  </Grid>
                </Grid>
              </div>
            </div>
            <div className="border-div">
              <div className="sub-content-component">
                <Grid className="grid-container" container spacing={2}>
                  <Grid className="grid-item" item xs={9.1}>
                    <InsuranceMainComponent
                      data={newOrderData}
                      setData={orderOverViewObj!.setOrderOverviewData!}
                      hideAddButton={true}
                      dropDownDataArray={insuranceTypes}
                      dropDownTextArray={insuranceTypesText}
                      addOrRemoveButtonAction={() => {}}
                      vacTherapyInformationData={vacTherapyInformationData}
                      isReviewOrder={true}
                      primaryEdiitButtonClicked={() => {}}
                      secondaryEditButtonClicked={() => {}}
                      isOrderSummary={isOrderSummary}
                      showAdditionalFields={
                        orderOverViewObj!.showAddtionalObject
                      }
                    />
                  </Grid>
                </Grid>
              </div>
            </div>
            <div className="border-div">
              <div className="sub-content-component">
                <Grid className="grid-container" container spacing={2}>
                  <Grid className="grid-item" item xs={9.1}>
                    <ContributingCauseReviewOrder
                      accidentTypes={accidentTypes!}
                      data={newOrderData}
                      editButtonClicked={false}
                      isOrderSummary={isOrderSummary}
                    />
                  </Grid>
                </Grid>
              </div>
            </div>
            <div className="border-div">
              <div className="sub-content-component">
                <Grid className="grid-container" container spacing={2}>
                  <Grid className="grid-item" item xs={9.1}>
                    <TherapyInformationReviewOrder
                      data={newOrderData!}
                      editButtonClicked={false}
                      therapyLengths={therapyLengths}
                      therapyGoals={therapyGoals}
                      isOrderSummary={true}
                      isOrderOverviewFlow={true}
                    />
                  </Grid>
                </Grid>
              </div>
            </div>
            <div className="border-div">
              <div className="sub-content-component">
                <Grid className="grid-container" container spacing={2}>
                  <Grid className="grid-item" item xs={9.1}>
                    <PrescriberInformationReviewOrder
                      data={orderOverViewObj?.prescriberAddedData}
                      editButtonClicked={false}
                      isOrderSummary={isOrderSummary}
                    />
                  </Grid>
                </Grid>
              </div>
            </div>
            <div className="border-div">
              <div className="sub-content-component">
                <OrderDetailsProductInformation productInfo={productInfo} />
              </div>
            </div>
            <div className="border-div">
              <div className="sub-content-component">
                <Grid className="grid-container" container spacing={2}>
                  <Grid className="grid-item" item xs={9.1}>
                    <DressingSuppliesReviewOrder
                      dressing={dressingKit}
                      canister={canister}
                      accesssory={accessory}
                      editButtonClicked={false}
                      isOrderSummary={isOrderSummary}
                      newOrderObj={orderOverViewObj}
                    />
                  </Grid>
                </Grid>
              </div>
            </div>
            <div className="border-div">
              <div className="sub-content-component">
                <Grid className="grid-container" container spacing={2}>
                  <Grid className="grid-item" item xs={9.1}>
                    <InpatientTransitionReviewOrder
                      data={newOrderData}
                      facility={newOrderData.inpatientFacility}
                      editButtonClicked={false}
                      isOrderSummary={isOrderSummary}
                    />
                  </Grid>
                </Grid>
              </div>
            </div>
            <div className="border-div">
              <div className="sub-content-component">
                <Grid className="grid-container" container spacing={2}>
                  <Grid className="grid-item" item xs={9.1}>
                    <VerifyRequesterInfoReviewOrder
                      data={requesterInfo}
                      facility={requesterInfo.requesterFacility}
                      editButtonClicked={false}
                      isOrderSummary={isOrderSummary}
                    />
                  </Grid>
                </Grid>
              </div>
            </div>
            <div className="border-div">
              <div className="sub-content-component">
                <Grid className="grid-container" container spacing={2}>
                  <Grid className="grid-item" item xs={9.1}>
                    <HomeCareProviderReviewOrder
                      data={newOrderData}
                      editButtonClicked={false}
                      isOrderSummary={isOrderSummary}
                    />
                  </Grid>
                </Grid>
              </div>
            </div>
            <div className="border-div">
              <div className="sub-content-component">
                <Grid className="grid-container" container spacing={2}>
                  <Grid className="grid-item" item xs={9.1}>
                    <DeliveryContactReviewOrder
                      data={newOrderData}
                      editButtonClicked={false}
                      isOrderSummary={isOrderSummary}
                    />
                  </Grid>
                </Grid>
              </div>
            </div>
            <div className="border-div">
              <div className="sub-content-component">
                <Grid className="grid-container" container spacing={2}>
                  <Grid className="grid-item" item xs={9.1}>
                    <DeliveryInfoReviewOrder
                      data={deliveryInformation}
                      deliverySites={deliverySites}
                      editButtonClicked={false}
                      isOrderSummary={isOrderSummary}
                    />
                  </Grid>
                </Grid>
              </div>
            </div>
            <div className="border-div">
              <div className="sub-content-component">
                <Grid className="grid-container" container spacing={2}>
                  <Grid className="grid-item" item xs={9.1}>
                    <NutritionReviewOrder
                      editButtonClicked={false}
                      isOrderSummary={isOrderSummary}
                      woundInfoData={woundInfoData}
                    />
                  </Grid>
                </Grid>
              </div>
            </div>
            <div className="border-div">
              <div className="sub-content-component">
                <Grid className="grid-container" container spacing={2}>
                  <Grid className="grid-item" item xs={9.1}>
                    <PreviousTherapiesReviewOrder
                      editButtonClicked={false}
                      isOrderSummary={isOrderSummary}
                      woundInfoData={woundInfoData}
                    />
                  </Grid>
                </Grid>
              </div>
            </div>
            <div className="border-div">
              <div className="sub-content-component">
                <Grid className="grid-container" container spacing={2}>
                  <Grid className="grid-item" item xs={9.1}>
                    <ComorboditiesReviewOrder
                      editButtonClicked={false}
                      isOrderSummary={isOrderSummary}
                      woundInfoData={woundInfoData}
                    />
                  </Grid>
                </Grid>
              </div>
            </div>
            <div className="border-div">
              <div className="sub-content-component">
                <Grid className="grid-container" container spacing={2}>
                  <Grid className="grid-item" item xs={9.1}>
                    <OsteomyelitisReviewOrder
                      editButtonClicked={false}
                      isOrderSummary={isOrderSummary}
                      woundInfoData={woundInfoData}
                    />
                  </Grid>
                </Grid>
              </div>
            </div>
            <div className="border-div">
              <div className="sub-content-component">
                <Grid className="grid-container" container spacing={2}>
                  <Grid className="grid-item" item xs={9.1}>
                    <ClinicalInformation
                      editButtonClicked={false}
                      isOrderSummary={isOrderSummary}
                      isReviewOrder={true}
                      setWoundInfoData={orderOverViewObj?.setWoundInfoData!}
                      woundInfoData={woundInfoData}
                      newOrderObj={orderOverViewObj}
                    />
                  </Grid>
                </Grid>
              </div>
            </div>
            <div className="border-div">
              <div className="sub-content-component">
                <Grid className="grid-container" container spacing={2}>
                  <Grid className="grid-item" item xs={9.1}>
                    <Debridement
                      editButtonClicked={false}
                      isOrderSummary={isOrderSummary}
                      isReviewOrder={true}
                      setWoundInfoData={orderOverViewObj?.setWoundInfoData!}
                      woundInfoData={woundInfoData}
                    />
                  </Grid>
                </Grid>
              </div>
            </div>
            <div className="border-div">
              <div className="sub-content-component">
                <Grid className="grid-container" container spacing={2}>
                  <Grid className="grid-item" item xs={9.1}>
                    <WoundDimension
                      editButtonClicked={false}
                      isOrderSummary={isOrderSummary}
                      isReviewOrder={true}
                      setWoundInfoData={orderOverViewObj?.setWoundInfoData!}
                      woundInfoData={woundInfoData}
                    />
                  </Grid>
                </Grid>
              </div>
            </div>
            <div className="border-div">
              <div className="sub-content-component">
                <Grid className="grid-container" container spacing={2}>
                  <Grid className="grid-item" item xs={9.1}>
                    <WoundUndermining
                      editButtonClicked={false}
                      isOrderSummary={isOrderSummary}
                      isReviewOrder={true}
                      setWoundInfoData={orderOverViewObj?.setWoundInfoData!}
                      woundInfoData={woundInfoData}
                    />
                  </Grid>
                </Grid>
              </div>
            </div>
            <div className="border-div">
              <div className="sub-content-component">
                <Grid className="grid-container" container spacing={2}>
                  <Grid className="grid-item" item xs={9.1}>
                    <WoundTunneling
                      editButtonClicked={false}
                      isOrderSummary={isOrderSummary}
                      isReviewOrder={isOrderSummary}
                      setWoundInfoData={orderOverViewObj?.setWoundInfoData!}
                      woundInfoData={woundInfoData}
                    />
                  </Grid>
                </Grid>
              </div>
            </div>
            {/* <div className="border-div">
              <div className="sub-content-component">
                <Grid className="grid-container" container spacing={2}>
                  <Grid className="grid-item" item xs={9.1}>
                    <WoundBed
                      editButtonClicked={false}
                      isOrderSummary={isOrderSummary}
                      isReviewOrder={isOrderSummary}
                      setWoundInfoData={orderOverViewObj?.setWoundInfoData!}
                      woundInfoData={woundInfoData}
                      vacTherapyInformationData={vacTherapyInformationData!}
                    />
                  </Grid>
                </Grid>
              </div>
            </div> */}
            <div className="border-div">
              <div className="sub-content-component">
                <Grid className="grid-container" container spacing={2}>
                  <Grid className="grid-item" item xs={9.1}>
                    <Exudate
                      editButtonClicked={false}
                      isOrderSummary={isOrderSummary}
                      isReviewOrder={isOrderSummary}
                      setWoundInfoData={orderOverViewObj?.setWoundInfoData!}
                      woundInfoData={woundInfoData}
                    />
                  </Grid>
                </Grid>
              </div>
            </div>
            <div className="border-div">
              <div className="sub-content-component">
                <Grid className="grid-container" container spacing={2}>
                  <Grid className="grid-item" item xs={9.1}>
                    <ExposedStructures
                      editButtonClicked={false}
                      isOrderSummary={isOrderSummary}
                      isReviewOrder={isOrderSummary}
                      setWoundInfoData={orderOverViewObj?.setWoundInfoData!}
                      woundInfoData={woundInfoData}
                    />
                  </Grid>
                </Grid>
              </div>
            </div>
            {woundInfoData.isShowSecondaryWoundInfo.value === "Yes" && (
              <div className="">
                <div className="border-div">
                  <div className="sub-content-component">
                    <Grid className="grid-container" container spacing={2}>
                      <Grid className="grid-item" item xs={9.1}>
                        <ClinicalInformation
                          editButtonClicked={false}
                          isOrderSummary={isOrderSummary}
                          isReviewOrder={isOrderSummary}
                          isSecondaryWoundInfo={true}
                          setWoundInfoData={
                            orderOverViewObj?.setSecondaryWoundInfoData!
                          }
                          woundInfoData={secondaryWoundInfoData}
                          newOrderObj={orderOverViewObj}
                        />
                      </Grid>
                    </Grid>
                  </div>
                </div>
                <div className="border-div">
                  <div className="sub-content-component">
                    <Grid className="grid-container" container spacing={2}>
                      <Grid className="grid-item" item xs={9.1}>
                        <Debridement
                          editButtonClicked={false}
                          isSecondaryWoundInfo={true}
                          isOrderSummary={isOrderSummary}
                          isReviewOrder={isOrderSummary}
                          setWoundInfoData={
                            orderOverViewObj?.setSecondaryWoundInfoData!
                          }
                          woundInfoData={secondaryWoundInfoData}
                        />
                      </Grid>
                    </Grid>
                  </div>
                </div>
                <div className="border-div">
                  <div className="sub-content-component">
                    <Grid className="grid-container" container spacing={2}>
                      <Grid className="grid-item" item xs={9.1}>
                        <WoundDimension
                          editButtonClicked={false}
                          isSecondaryWoundInfo={true}
                          isOrderSummary={isOrderSummary}
                          isReviewOrder={isOrderSummary}
                          setWoundInfoData={
                            orderOverViewObj?.setSecondaryWoundInfoData!
                          }
                          woundInfoData={secondaryWoundInfoData}
                        />
                      </Grid>
                    </Grid>
                  </div>
                </div>
                <div className="border-div">
                  <div className="sub-content-component">
                    <Grid className="grid-container" container spacing={2}>
                      <Grid className="grid-item" item xs={9.1}>
                        <WoundUndermining
                          editButtonClicked={true}
                          isSecondaryWoundInfo={true}
                          isOrderSummary={isOrderSummary}
                          isReviewOrder={isOrderSummary}
                          setWoundInfoData={
                            orderOverViewObj?.setSecondaryWoundInfoData!
                          }
                          woundInfoData={secondaryWoundInfoData}
                        />
                      </Grid>
                    </Grid>
                  </div>
                </div>
                <div className="border-div">
                  <div className="sub-content-component">
                    <Grid className="grid-container" container spacing={2}>
                      <Grid className="grid-item" item xs={9.1}>
                        <WoundTunneling
                          editButtonClicked={false}
                          isSecondaryWoundInfo={true}
                          isOrderSummary={isOrderSummary}
                          isReviewOrder={isOrderSummary}
                          setWoundInfoData={
                            orderOverViewObj?.setSecondaryWoundInfoData!
                          }
                          woundInfoData={secondaryWoundInfoData}
                        />
                      </Grid>
                    </Grid>
                  </div>
                </div>
                {/* <div className="border-div">
                  <div className="sub-content-component">
                    <Grid className="grid-container" container spacing={2}>
                      <Grid className="grid-item" item xs={9.1}>
                        <WoundBed
                          editButtonClicked={false}
                          isSecondaryWoundInfo={true}
                          isOrderSummary={isOrderSummary}
                          isReviewOrder={isOrderSummary}
                          setWoundInfoData={
                            orderOverViewObj?.setSecondaryWoundInfoData!
                          }
                          woundInfoData={secondaryWoundInfoData}
                          vacTherapyInformationData={vacTherapyInformationData}
                        />
                      </Grid>
                    </Grid>
                  </div> 
                </div>*/}
                <div className="border-div">
                  <div className="sub-content-component">
                    <Grid className="grid-container" container spacing={2}>
                      <Grid className="grid-item" item xs={9.1}>
                        <Exudate
                          editButtonClicked={false}
                          isSecondaryWoundInfo={true}
                          isOrderSummary={isOrderSummary}
                          isReviewOrder={isOrderSummary}
                          setWoundInfoData={
                            orderOverViewObj?.setSecondaryWoundInfoData!
                          }
                          woundInfoData={secondaryWoundInfoData}
                        />
                      </Grid>
                    </Grid>
                  </div>
                </div>
                <div className="border-div">
                  <div className="sub-content-component">
                    <Grid className="grid-container" container spacing={2}>
                      <Grid className="grid-item" item xs={9.1}>
                        <ExposedStructures
                          editButtonClicked={false}
                          isSecondaryWoundInfo={true}
                          isOrderSummary={isOrderSummary}
                          isReviewOrder={isOrderSummary}
                          setWoundInfoData={
                            orderOverViewObj?.setSecondaryWoundInfoData!
                          }
                          woundInfoData={secondaryWoundInfoData}
                        />
                      </Grid>
                    </Grid>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Grid>
    </>
  );
};
