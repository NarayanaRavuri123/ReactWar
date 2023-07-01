import { getVacOrderLockStatus } from "../../util/3meService";
import { MyPatientModalSection } from "./patientOrdersDetails/patientOrdersDetails.component";

export const GetPatientLockedData = async (
  orderId: any,
  editMode: boolean,
  MyPatientObj: any,
  history: any
) => {
  //async and await

  try {
    const obj = {
      OrderId: orderId,
    };
    const lockOrder = await getVacOrderLockStatus(obj);
    if (lockOrder.succeeded) {
      MyPatientObj?.setIsPatientLocked(false);
      MyPatientObj?.setorderLockedByFullName("");
      history.push({
        pathname: "/orders/newOrder",
        state: {
          orderID: orderId,
        },
      });
    } else {
      if (lockOrder.error) {
        if (lockOrder.error.code === 1035) {
          MyPatientObj?.setorderLockedByFullName(lockOrder.error.message);
          MyPatientObj?.setMyPatientClickModalSection(
            MyPatientModalSection.PATIENT_LOCKED
          );
        }
        if (lockOrder.error.code === 1059) {
          MyPatientObj?.setorderLockedByFullName(lockOrder.error.message);
          MyPatientObj?.setMyPatientClickModalSection(
            MyPatientModalSection.PATIENT_UNAUTHORIZED
          );
        }
        if (lockOrder.error.code === 1060) {
          MyPatientObj?.setorderLockedByFullName(lockOrder.error.message);
          MyPatientObj?.setMyPatientClickModalSection(
            MyPatientModalSection.PATIENT_ORDER_STATUS_CHANGED
          );
        }
      }
      MyPatientObj?.setIsPatientLocked(true);
      MyPatientObj?.setOpenPatientOrderAndDetail(true);
    }
  } catch (error) {
    console.log("error", error);
  }
};
