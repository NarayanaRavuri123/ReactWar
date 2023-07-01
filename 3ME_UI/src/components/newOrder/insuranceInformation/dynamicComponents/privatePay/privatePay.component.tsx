import React, { useContext } from "react";
import {
  NewOrderContext,
  NewOrderContextType,
} from "../../../../../context/NewOrderContext";
import { makeCapitalEachWordInString } from "../../../../../util/utilityFunctions";
import "./privatePay.css";
type Props = {};

const PrivatePay = (props: Props) => {
  const NewOrderObj = useContext<NewOrderContextType | null>(NewOrderContext);
  return (
    <div className="private-pay-box">
      <div className="patientName-box">
        <div className="patientDetailTitle">Patient Name</div>
        <div className="patientDetailsValue">
          {NewOrderObj?.newOrderData?.firstName.value
            ? NewOrderObj?.newOrderData?.firstName.value
            : "-"}{" "}
          {NewOrderObj?.newOrderData?.lastName.value
            ? NewOrderObj?.newOrderData?.lastName.value
            : "-"}
        </div>
      </div>
      <div className="patientName-box">
        <div className="patientDetailTitle">Contact Information</div>
        <div className="patientDetailsValue">
          {NewOrderObj?.newOrderData?.email.value
            ? NewOrderObj?.newOrderData?.email.value
            : "-"}
        </div>
        <div className="patientDetailsValue">
          {NewOrderObj?.newOrderData?.phone.value
            ? NewOrderObj?.newOrderData?.phone.value
            : "-"}
        </div>
      </div>
    </div>
  );
};

export default PrivatePay;
