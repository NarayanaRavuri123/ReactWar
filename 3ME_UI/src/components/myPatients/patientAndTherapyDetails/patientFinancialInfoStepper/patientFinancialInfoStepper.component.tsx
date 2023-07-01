import { Grid } from "@mui/material";
import { INewOrder } from "../../../newOrder/newOrder.interface";
import { IPatient } from "../../patient.interface";
import "./patientFinancialInfoStepper.css";
import { PatientFinancialInfo } from "../patientFinancialInfo/patientFinancialInfo.component";
import { PatientFinancialResponsbility } from "../patientFinancialResponsbility/patientFinancialResponsbility.component";
import { useContext, useEffect, useState } from "react";
import {
  OrderDetailContextType,
  OrderDetailContext,
} from "../../../../context/OrderDetailsContext";
import moment from "moment";
import { getFinancialInfo } from "../../../../util/orderOverViewService";
import {
  mapPatientFinancialData,
  mapPatientInsurenceData,
} from "../orderOverview/orderOverviewResponseMapper";
import {
  IFinancialInfoRequest,
  IFinancialInsurenceResponse,
  IInsurenceDetail,
} from "../orderSupplyDetail/orderSupplyDetails.interface";
import { LoadingSpinner } from "../../../../core/loader/LoadingSpinner";
import { Popup } from "../../../../core/popup/popup.component";
interface Props {
  patientData: IPatient;
  newOrderData: INewOrder;
}
const PatientFinancialInfoStepper = ({ patientData, newOrderData }: Props) => {
  const orderOverviewObj = useContext<OrderDetailContextType | null>(
    OrderDetailContext
  );

  const [financialInfoLoader, setFinancialInfoLoader] =
    useState<boolean>(false);

  useEffect(() => {
    if (!orderOverviewObj?.financialInfoResponseData) {
      setFinancialInfoLoader(true);
      fetchFinancialInfodata();
    }
  }, []);

  const fetchFinancialInfodata = async () => {
    if (patientData) {
      let reqParams: IFinancialInfoRequest = {
        RentalOrderNumber: patientData.roNumber,
        dob: moment(patientData.dob).format("DD-MMM-yyyy").toString(),
      };
      const respObj = await getFinancialInfo(reqParams);

      if (respObj && respObj.succeeded) {
        const financialInfoResponseObj: IFinancialInsurenceResponse =
          respObj.item;
        const mappedFinancialInfoResponse = await mapPatientFinancialData(
          financialInfoResponseObj
        );

        orderOverviewObj?.setfinancialInfoResponseData(
          mappedFinancialInfoResponse
        );

        const mappedPrimaryInsResponse: IInsurenceDetail =
          await mapPatientInsurenceData(
            financialInfoResponseObj.insuranceInfo.primary
          );
        orderOverviewObj?.setprimaryInsurenceData(mappedPrimaryInsResponse);

        const mappedSecondaryInsResponse: IInsurenceDetail =
          await mapPatientInsurenceData(
            financialInfoResponseObj.insuranceInfo.secondary
          );
        orderOverviewObj?.setsecondaryInsurenceData(mappedSecondaryInsResponse);
        setFinancialInfoLoader(false);
      } else {
        const mappedFinancialInfoResponse = await mapPatientFinancialData(null);
        orderOverviewObj?.setfinancialInfoResponseData(
          mappedFinancialInfoResponse
        );

        const mappedPrimaryInsurenceResponse: IInsurenceDetail =
          await mapPatientInsurenceData(null);
        orderOverviewObj?.setprimaryInsurenceData(
          mappedPrimaryInsurenceResponse
        );

        const mappedSecondaryInsuranceResponse: IInsurenceDetail =
          await mapPatientInsurenceData(null);
        orderOverviewObj?.setsecondaryInsurenceData(
          mappedSecondaryInsuranceResponse
        );

        setFinancialInfoLoader(false);
      }
    }
  };

  const spinner = () => {
    return (
      <div>
        <div className="saveapi-header"></div>
        <div className="saveapi-spinner">
          <LoadingSpinner />
        </div>
      </div>
    );
  };

  return (
    <>
      <Grid className="patient-fin-stepper-container">
        {financialInfoLoader ? (
          <Popup
            hideCloseButton={true}
            openFlag={financialInfoLoader}
            closeHandler={() => {}}
          >
            {spinner()}
          </Popup>
        ) : (
          <div className="patient-fin-stepperForm">
            <PatientFinancialInfo
              patientData={patientData}
              newOrderData={newOrderData}
            />
            <PatientFinancialResponsbility
              patientData={patientData}
              newOrderData={newOrderData}
            />
          </div>
        )}
      </Grid>
    </>
  );
};

export default PatientFinancialInfoStepper;
