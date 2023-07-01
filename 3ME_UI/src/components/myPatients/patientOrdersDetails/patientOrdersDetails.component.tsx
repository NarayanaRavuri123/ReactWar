/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { ReactNode, useContext, useState } from "react";
import {
  MyPatientContext,
  MyPatientContextType,
} from "../../../context/MyPatientContext";
import { ExpressButton } from "../../../core/expressButton/expressButton.component";
import { LoadingSpinner } from "../../../core/loader/LoadingSpinner";
import { Popup } from "../../../core/popup/popup.component";
import { getVacOrderLockStatus } from "../../../util/3meService";
import "./patientLoadOrdersDetails.css";

export const PatientOrdersDetails = () => {
  const myPatientObj = useContext<MyPatientContextType | null>(
    MyPatientContext
  );
  const onPatientClick = () => {
    let page: ReactNode;
    switch (myPatientObj?.myPatientClickModalSection) {
      case MyPatientModalSection?.LOAD_PATIENT:
        page = loading();
        tempLoading();
        break;
      case MyPatientModalSection?.PATIENT_LOCKED:
        page = patientLocked();
        break;
      case MyPatientModalSection?.PATIENT_SUBMITTED:
        page = patientSubmitted();
        break;
      case MyPatientModalSection?.PATIENT_UNAUTHORIZED:
        page = patientUnauthorized();
        break;
      case MyPatientModalSection?.PATIENT_ORDER_STATUS_CHANGED:
        page = patientOrderStatusChanged();
        break;
      case MyPatientModalSection?.PATIENT_EMPTY:
        page = patientEmpty();
        break;
    }
    return page;
  };
  // Use this method to call the API and check if the Patient Order is locked.
  const tempLoading = () => {
    let orderStatus = myPatientObj?.patientOrderStatus;
    if (orderStatus === MyPatientModalSection?.PATIENT_SUBMITTED)
      myPatientObj?.setMyPatientClickModalSection(
        MyPatientModalSection.PATIENT_SUBMITTED
      );
    else if (
      orderStatus !== MyPatientModalSection?.PATIENT_SUBMITTED &&
      orderStatus !== MyPatientModalSection?.PATIENT_SAVED
    )
      setTimeout(() => {
        myPatientObj?.setMyPatientClickModalSection(
          MyPatientModalSection.PATIENT_EMPTY
        );
      }, 3000);
    else if (orderStatus === MyPatientModalSection?.PATIENT_SAVED)
      getVacOrderSummaryData(myPatientObj?.orderId, true);
  };
  const getVacOrderSummaryData = async (orderId: any, editMode: boolean) => {
    //async and await
    try {
      const obj = {
        OrderId: orderId,
      };
      const response = await getVacOrderLockStatus(obj);
      //  const response = await getVacOrderSummary(orderId, editMode);
      if (response.succeeded) {
        myPatientObj?.setMyPatientClickModalSection(
          MyPatientModalSection.PATIENT_EMPTY
        );
      } else {
        myPatientObj?.setorderLockedByFullName(response.error.message);
        myPatientObj?.setMyPatientClickModalSection(
          MyPatientModalSection.PATIENT_LOCKED
        );
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const patientLocked = () => {
    return (
      <div className="patient-load-spinner" data-testid="patienLocked">
        <div className="patient-locked" data-testid="patient-locked-popup">
          This order is currently being edited by{" "}
          {myPatientObj?.orderLockedByFullName} {}.
        </div>
        <div
          className="patient-locked-desp"
          data-testid="patient-locked-popup-bodytext"
        >
          You can edit the order when they are finished.
        </div>
        <ExpressButton
          variant="contained"
          parentClass="cancelBtn"
          clickHandler={() => myPatientObj?.setOpenPatientOrderAndDetail(false)}
        >
          Close
        </ExpressButton>
      </div>
    );
  };

  const patientUnauthorized = () => {
    return (
      <div className="patient-load-spinner" data-testid="patienLocked">
        <div
          className="patient-locked-desp"
          data-testid="patient-locked-popup-bodytext"
        >
          UnAuthorized Request
        </div>
        <ExpressButton
          variant="contained"
          parentClass="cancelBtn"
          clickHandler={() => myPatientObj?.setOpenPatientOrderAndDetail(false)}
        >
          Close
        </ExpressButton>
      </div>
    );
  };

  const patientOrderStatusChanged = () => {
    return (
      <div className="patient-load-spinner" data-testid="patienLocked">
        <div
          className="patient-locked-desp"
          data-testid="patient-locked-popup-bodytext"
        >
          The Order Has been Submitted Already. Please Reload the Page.
        </div>
        <ExpressButton
          variant="contained"
          parentClass="cancelBtn"
          clickHandler={() => myPatientObj?.setOpenPatientOrderAndDetail(false)}
        >
          Close
        </ExpressButton>
      </div>
    );
  };
  const patientSubmitted = () => {
    return (
      <div
        className="patient-load-spinner patient-submitted"
        data-testid="patientSubmitted"
      >
        <div className="patient-locked patient-submitted-header">
          Order Submitted Successfully{" "}
        </div>
        <div className="patient-locked-desp">
          Your order has been submittted to 3M and is processing. Order status
          is typically available within 5 minutes of order submission.
        </div>
        <ExpressButton
          variant="contained"
          parentClass="cancelBtn"
          clickHandler={() => myPatientObj?.setOpenPatientOrderAndDetail(false)}
        >
          Close
        </ExpressButton>
      </div>
    );
  };
  const patientEmpty = () => {
    return (
      <div
        className="patient-load-spinner patient-submitted"
        data-testid="patientEmpty"
      >
        <div className="patient-locked patient-submitted-header"></div>
        <div className="patient-locked-desp"></div>
      </div>
    );
  };

  const loading = () => {
    return (
      <div className="patient-load-spinner">
        <LoadingSpinner />
      </div>
    );
  };

  return (
    <div>
      <Popup
        openFlag={myPatientObj?.openPatientOrderAndDetail}
        closeHandler={() => {
          myPatientObj?.setOpenPatientOrderAndDetail(false);
        }}
      >
        {onPatientClick()}
      </Popup>
    </div>
  );
};

export enum MyPatientModalSection {
  LOAD_PATIENT = "loadpatient",
  PATIENT_LOCKED = "patientlock",
  PATIENT_SUBMITTED = "Submitted",
  PATIENT_SAVED = "Saved",
  PATIENT_EMPTY = "EMPTY",
  PATIENT_UNAUTHORIZED = "unauthorized",
  PATIENT_ORDER_STATUS_CHANGED = "statusChanged",
}
