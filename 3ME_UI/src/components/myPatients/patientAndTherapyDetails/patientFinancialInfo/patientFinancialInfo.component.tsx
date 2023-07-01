import { makeCapitalEachWordInString } from "../../../../util/utilityFunctions";
import { IPatientFinInfo } from "../orderOverview/orderOverview.interface";
import "./patientFinancialInfo.css";

export const PatientFinancialInfo = ({
  patientData,
  newOrderData,
}: IPatientFinInfo) => {
  return (
    <div className="patient-fin-info">
      <div className="patient-fin-component-title">
        <h2
          className="patient-fin-info-title"
          data-testid="patient-fin-info-title"
        >
          Patient Financial Info
        </h2>
      </div>
      <div className="fin-info-contents">
        <div className="all-content-div-pfin-info">
          <div className="content-div-pfin-info">
            <div className="sub-content-div-pfin-info">
              <p className="patient-fin-info-content-title">
                {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
        <div className="all-content-div-pfin-info">
          <div className="content-div-pfin-info">
            <div className="content-div-pfin-info-last">
              <p
                className="patient-fin-info-content-title"
                data-testId="patient-fsname-lname"
              >
                {makeCapitalEachWordInString(
                  patientData?.firstName + " " + patientData?.lastName
                )}
              </p>
              <p
                className="patient-fin-info-content-title"
                data-testId="patient-address1"
              >
                {newOrderData?.address1?.value !== ""
                  ? makeCapitalEachWordInString(newOrderData?.address1?.value)
                  : "--"}
              </p>
              {newOrderData && newOrderData?.address2?.value !== "" && (
                <p className="patient-fin-info-content-title">
                  {makeCapitalEachWordInString(newOrderData?.address2?.value)}
                </p>
              )}
              {newOrderData?.city?.value !== "" && (
                <p
                  className="patient-fin-info-content-title"
                  data-testId="patient-city"
                >
                  {`${makeCapitalEachWordInString(
                    newOrderData?.city?.value
                  )}, ${
                    newOrderData?.state?.value !== ""
                      ? newOrderData?.state?.value
                      : ""
                  } ${
                    newOrderData?.zip?.value !== ""
                      ? makeCapitalEachWordInString(newOrderData?.zip?.value)
                      : ""
                  }`}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="all-content-div-pfin-info">
          <div className="content-div-pfin-info">
            <div className="content-div-pfin-info-last">
              <p
                className="patient-fin-info-content-title"
                data-testId="static-text-test-id"
              >
                As your partner in healing, 3M Medical Solutions will bill your
                primary insurance carrier directly for the time you are using
                the 3M V.A.C.® Therapy equipment rental and supplies. The amount
                shown is only an estimate based on information initially
                verified with your primary insurance for negative pressure wound
                therapy (V.A.C.® Therapy). If secondary coverage is available,
                your estimated cost may be reduced once we have received final
                payment(s) from your insurance carriers. We encourage you to
                contact your insurance carrier(s) for any questions regarding
                specific coverage and potential charges.
              </p>
            </div>
          </div>
        </div>
        <div className="border-space"></div>
      </div>
    </div>
  );
};
