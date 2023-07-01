import moment from "moment";
import "./supplyOrderInfo.css";
import {
  SupplyOrderContext,
  SupplyOrderContextType,
} from "../../../context/SupplyOrderContext";
import { useContext, useEffect, useState } from "react";
import { SupplyOrderValidator } from "../supplyOrder.validator";
import { LoadingSpinner } from "../../../core/loader/LoadingSpinner";
import { retrieveVACProductInfo } from "../../../util/vacOrderService";
import { PatientVACDetail } from "../patientVACDetail/patientVACDetail.component";
import { DressingSuppliesLink } from "../../newOrder/dressingSupplies/dressingSuppliesLink/dressingSuppliesLink";
import { CurrentSuppliesOnHand } from "../currentSuppliesOnHand/currentSuppliesOnHand";
import SupplyOrderAdditionalInfo from "../supplyOrderAdditionalInformation/SupplyOrderAdditionalInfo.component";
import { DeliveryAddress } from "../deliveryAddress/deliveryAddress.component";
import { ReSupplyJustification } from "../reSupplyJustification/reSupplyJustification.component";
import { SupplyOrderVacDressing } from "../suppliesOrderDressing/SupplyOrderDressing.component";
import SupplyOrderFooterButtonGroup from "./supplyOrderFooterButtonGroup/supplyOrderFooterButtonGroup.component";
import { Popup } from "../../../core/popup/popup.component";

type Props = { openSupplyOrderPageEdit: any; isOrderOverviewFlow?: boolean };

const SupplyOrderInfo = ({
  openSupplyOrderPageEdit,
  isOrderOverviewFlow,
}: Props) => {
  const [validator] = useState<SupplyOrderValidator>(
    new SupplyOrderValidator()
  );
  const SupplyOrderObj = useContext<SupplyOrderContextType | null>(
    SupplyOrderContext
  );
  const data = SupplyOrderObj!.supplyOrderData;
  const patient = SupplyOrderObj!.selectedPatient;
  const setData = SupplyOrderObj!.setSupplyOrderData;

  const dressing = SupplyOrderObj!.dressingKit;
  const setDressing = SupplyOrderObj!.setDressingKit;
  const canister = SupplyOrderObj!.canister;
  const setCanister = SupplyOrderObj!.setCanister;

  const vacProductInfo = SupplyOrderObj!.vacProductInfo;

  const [error, setError] = useState(false);

  const [initialLoader, setInitialLoader] = useState(
    SupplyOrderObj?.isBackFromReviewPage ? false : true
  );
  SupplyOrderObj?.setSupplyOrderPageTitle("Supply Order");
  SupplyOrderObj?.setSupplyOrderProgress(10);

  const loadVACProductInfo = async (roNumber: string, dob: string) => {
    let reqParams = {
      RentalOrderNumber: roNumber,
      DOB: moment(dob).format("yyyy-MM-DD"),
    };
    try {
      const data = await retrieveVACProductInfo(reqParams);
      setInitialLoader(false);
      if (data.error) {
      } else {
        SupplyOrderObj?.setVacProductInfo(data);
      }
    } catch (error) {
      SupplyOrderObj?.setVacProductInfo(null);
    }
  };

  const initialLoadSpinner = () => {
    return (
      <div>
        <div className="saveapi-header"></div>
        <div className="saveapi-spinner">
          <LoadingSpinner />
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (SupplyOrderObj?.isBackFromReviewPage !== true) {
      window.scrollTo(0, 0);
      setInitialLoader(true);
      setError(false);
      if (patient && patient.roNumber.toString() !== "" && patient.dob !== "") {
        loadVACProductInfo(patient.roNumber.toString(), patient.dob);
      }
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (SupplyOrderObj && SupplyOrderObj.scrollableComponentClassName) {
        let scrollableComponent = document.getElementsByClassName(
          SupplyOrderObj.scrollableComponentClassName
        )[0];
        if (scrollableComponent) {
          scrollableComponent.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "start",
          });
        }
        SupplyOrderObj.setScrollableComponentClassName(undefined);
      }
    }, 300);
  }, [SupplyOrderObj?.scrollableComponentClassName]);

  return (
    <div className="supplyOrder-container">
      {error && (
        <div className="supplyOrder-container-error-msg">
          Oops something went wrong !
        </div>
      )}
      {!error && patient && (
        <div className="supply-order-page">
          <PatientVACDetail
            data={data}
            patient={patient}
            setData={setData}
            vacProductInfo={vacProductInfo!}
            Validator={validator}
            isReviewOrder={false}
          />
          <div className="choose-supplyMain">
            <div className="choose-supply">Choose Your Supplies</div>
            <DressingSuppliesLink />
            <SupplyOrderVacDressing
              canister={canister}
              data={data}
              dressing={dressing}
              setCanister={setCanister}
              setData={setData}
              setDressing={setDressing}
              patient={patient}
              vacProductInfo={vacProductInfo!}
              Validator={validator}
              isReviewOrder={false}
              setInitialLoader={setInitialLoader}
            />
          </div>
          <div className="currentSupply-main">
            <CurrentSuppliesOnHand
              data={data}
              setData={setData}
              Validator={validator}
              isReviewOrder={false}
              openSupplyOrderPageEdit={openSupplyOrderPageEdit}
            />
          </div>
          <div className="reSupply-main">
            <ReSupplyJustification
              data={data}
              setData={setData}
              Validator={validator}
              isReviewOrder={false}
              openSupplyOrderPageEdit={openSupplyOrderPageEdit}
            />
          </div>
          <div className="deliveryAddress-main">
            <DeliveryAddress
              data={data}
              setData={setData}
              Validator={validator}
              isReviewOrder={false}
              openSupplyOrderPageEdit={openSupplyOrderPageEdit}
            />
          </div>
          <div className="additonalInfo-main">
            <SupplyOrderAdditionalInfo
              data={data}
              setData={setData}
              Validator={validator}
              isReviewOrder={false}
              openSupplyOrderPageEdit={openSupplyOrderPageEdit}
            />
          </div>
        </div>
      )}
      {initialLoader ? (
        <Popup
          hideCloseButton={true}
          openFlag={initialLoader}
          closeHandler={() => {}}
        >
          {initialLoadSpinner()}
        </Popup>
      ) : (
        ""
      )}
      {!error && (
        <SupplyOrderFooterButtonGroup
          handlePlaceOrder={() => {}}
          isOrderOverviewFlow={isOrderOverviewFlow}
        />
      )}
    </div>
  );
};

export default SupplyOrderInfo;
