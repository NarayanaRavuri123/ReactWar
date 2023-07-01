import React, { useContext, useState } from "react";
import { SupplyOrderContextType } from "../../../context/SupplyOrderContext";
import ErrorPopup from "../../../core/errorPopup/errorPopup.component";
import { LoadingSpinner } from "../../../core/loader/LoadingSpinner";
import { Popup } from "../../../core/popup/popup.component";
import { callSaveSupplyOrder } from "../mapper/supplyOrderRequestMapper";
import SupplyOrderFooterButtonGroup from "../supplyOrderInfo/supplyOrderFooterButtonGroup/supplyOrderFooterButtonGroup.component";
import "./supplyOrderReview.css";
import { PatientVACDetail } from "../patientVACDetail/patientVACDetail.component";
import { SupplyOrderValidator } from "../supplyOrder.validator";
import SupplyProductReviewOrder from "../suppliesOrderDressing/supplyProductReviewOrder/supplyProductReviewOrder.component";
import { SupplyOrderPageSection } from "../SupplyOrderPageSection.enum";
import CurrentSuppliesOnHandReviewOrder from "../currentSuppliesOnHand/reviewOrder/currentSuppliesOnHandReviewOrder.component";
import ReSupplyJustificationReviewOrder from "../reSupplyJustification/reviewOrder/reSupplyJustificationReviewOrder.component";
import DeliveryAddressReviewOrder from "../deliveryAddress/reviewOrder/deliveryAddressReviewOrder.component";
import AdditionalInformationReviewOrder from "../supplyOrderAdditionalInformation/reviewOrder/additonalInformationReviewOrder";
import { AuthContext, AuthContextType } from "../../../context/AuthContext";

type Props = {
  supplyOrderContextObj: SupplyOrderContextType | null;
  isOrderOverviewFlow?: boolean;
};
const SupplyOrderReview = ({
  supplyOrderContextObj,
  isOrderOverviewFlow,
}: Props) => {
  const [validator] = useState<SupplyOrderValidator>(
    new SupplyOrderValidator()
  );
  supplyOrderContextObj?.setSupplyOrderPageTitle("Review Supply Order");
  supplyOrderContextObj?.setSupplyOrderProgress(60);

  const [saveAPILoader, setsaveAPILoader] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");
  const AuthObj = useContext<AuthContextType | null>(AuthContext);
  const [errorPopPpFlag, setErrorPopUpFlag] = useState(false);
  const data = supplyOrderContextObj!.supplyOrderData;
  const patient = supplyOrderContextObj!.selectedPatient;
  const setData = supplyOrderContextObj!.setSupplyOrderData;
  const vacProductInfo = supplyOrderContextObj!.vacProductInfo;

  const handlePlaceOrder = () => {
    setsaveAPILoader(true);
    try {
      initiateSaveSupplyOrder();
    } catch (error) {
      setErrorPopUpFlag(true);
      seterrorMessage("Something went wrong !!");
      setsaveAPILoader(false);
    }
  };

  const initiateSaveSupplyOrder = async () => {
    setsaveAPILoader(true);
    const result = await callSaveSupplyOrder(
      supplyOrderContextObj?.supplyOrderData!,
      supplyOrderContextObj,
      AuthObj?.registeredFaciltyAddress?.accountName,
      AuthObj?.registeredFaciltyAddress?.siteUseId
    );
    if (!result || !result.succeeded) {
      setsaveAPILoader(false);
      setErrorPopUpFlag(true);
      seterrorMessage("Something went wrong !!");
    } else {
      setsaveAPILoader(false);
      supplyOrderContextObj?.setIsBackFromReviewPage(false);
      supplyOrderContextObj?.setSupplyOrderPage(
        SupplyOrderPageSection.SUPPLYORDER_SUMMARY
      );
    }
  };
  const spinner = () => {
    return (
      <div>
        <div className="saveapi-header">Saving Order</div>
        <div className="saveapi-spinner">
          <LoadingSpinner />
        </div>
      </div>
    );
  };

  const openSupplyOrderPageEdit = (ref: any) => {
    window.scrollTo(0, 0);
    supplyOrderContextObj?.setSupplyOrderProgress(10);
    supplyOrderContextObj?.setIsBackFromReviewPage(true);
    supplyOrderContextObj?.setSupplyOrderPage(
      SupplyOrderPageSection.SUPPLYORDER_INFO
    );
    supplyOrderContextObj?.setScrollableComponentClassName(ref);
  };

  return (
    <>
      <div className="supplyOrderReview-container">
        <div className="supply-order-page-review">
          <div className="supplyOrderReview-title">Review Supply Order</div>
          <div className="supplyOrderReview-subtitle">
            Please verify the data provided below is accurate before placing
            your order.
          </div>
          <PatientVACDetail
            data={data}
            patient={patient}
            setData={setData}
            vacProductInfo={vacProductInfo!}
            Validator={validator}
            isReviewOrder={true}
          />
          <SupplyProductReviewOrder
            isReviewOrder={true}
            openSupplyOrderPageEdit={() =>
              openSupplyOrderPageEdit("choose-supplyMain")
            }
            data={data}
          />
          <CurrentSuppliesOnHandReviewOrder
            data={data}
            openSupplyOrderPageEdit={() =>
              openSupplyOrderPageEdit("currentSupply-main")
            }
          />
          <ReSupplyJustificationReviewOrder
            data={data}
            openSupplyOrderPageEdit={() =>
              openSupplyOrderPageEdit("reSupply-main")
            }
          />
          <DeliveryAddressReviewOrder
            data={data}
            openSupplyOrderPageEdit={() =>
              openSupplyOrderPageEdit("deliveryAddress-main")
            }
          />
          <AdditionalInformationReviewOrder
            data={data}
            openSupplyOrderPageEdit={() =>
              openSupplyOrderPageEdit("additonalInfo-main")
            }
          />
        </div>
      </div>
      {saveAPILoader ? (
        <Popup
          hideCloseButton={true}
          openFlag={saveAPILoader}
          closeHandler={() => {}}
        >
          {spinner()}
        </Popup>
      ) : (
        ""
      )}
      <ErrorPopup
        errorPopupFlag={errorPopPpFlag}
        handleBackButton={() => setErrorPopUpFlag(false)}
        popUpStyles="errorPopup"
        errorMessage={errorMessage}
      />
      <SupplyOrderFooterButtonGroup
        handlePlaceOrder={handlePlaceOrder}
        isOrderOverviewFlow={isOrderOverviewFlow}
      />
    </>
  );
};

export default SupplyOrderReview;
