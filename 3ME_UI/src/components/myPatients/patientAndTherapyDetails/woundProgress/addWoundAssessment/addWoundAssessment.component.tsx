import React, { useContext, useEffect, useState } from "react";
import {
  handleEmptyValue,
  makeCapitalEachWordInString,
} from "../../../../../util/utilityFunctions";
import "./addWoundAssessment.css";
import { IAddWoundAssessment } from "./addWoundAssessment.interface";
import { Popup } from "../../../../../core/popup/popup.component";
import WoundUploadImages from "../addWoundAssessment/WoundUploadImage/woundUploadImage.component";
import WoundAssessmentDateRange from "./woundAssessmentDateRange/woundAssessmentDateRange.component";
import WoundTherapyStatus from "./woundTherapyStatus/woundTherapyStatus.component";
import WoundAssessor from "./woundAssessor/woundAssessor.component";
import WoundMeasurement from "./woundMeasurement/woundMeasurement.component";
import WoundProvideAdditionalInfo from "./woundProvideAdditionalNote/woundProvideAdditionalNote.component";
import WoundMeasurementEschar from "./woundMeasurementEschar/woundMeasurementEschar.component";
import WoundUploadDocument from "./woundUploadDocuments/woundUploadDocument.component";
import WoundDebridement from "./woundDebridement/woundDebridement.component";
import { WoundAssessmentType } from "./woundAssessmentPageSection.enum";
import WoundAssessmentInfection from "./woundAssessmentInfection/woundAssessmentInfection.component";
import { HoldOrHospitalization } from "./holdOrHospitalization/holdOrHospitalization.component";
import { WoundExudate } from "./woundExudate/woundExudate.component";
import { ExposedWoundStructures } from "./exposedWoundStructures/exposedWoundStructures.component";
import { WoundAssessmentBed } from "./woundAssessmentBed/woundAssessmentBed.component";
import WoundAssessmentUndermining from "./woundAssessmentUndermining/woundAssessmentUndermining.component";
import WoundTunneling from "../../../../newOrder/woundTunneling/woundTunneling.component";
import { NewOrderValidator } from "../../../../newOrder/newOrder.validator";
import WoundAssessComorbidities from "./woundAssessComorbidities/woundAssessComorbidities.component";
import {
  WoundAssessmentContext,
  WoundAssessmentContextType,
} from "../../../../../context/WoundAssessmentContext";

type Props = {
  data: IAddWoundAssessment;
  isErrorOccurred: boolean | null;
  isTesting?: boolean;
  setData: React.Dispatch<React.SetStateAction<IAddWoundAssessment>>;
};

const AddWoundAssessment = ({
  data,
  isErrorOccurred,
  isTesting = false,
  setData,
}: Props) => {
  const [roClicked, setRoClicked] = useState(false);
  const newValidator = new NewOrderValidator();
  const [validator] = useState<NewOrderValidator>(newValidator!);

  const woundAssessmentContextObj =
    useContext<WoundAssessmentContextType | null>(WoundAssessmentContext);

  useEffect(() => {
    setTimeout(() => {
      if (
        woundAssessmentContextObj &&
        woundAssessmentContextObj.scrollableComponentClassName
      ) {
        let scrollableComponent = document.getElementsByClassName(
          woundAssessmentContextObj.scrollableComponentClassName
        )[0];
        if (scrollableComponent) {
          scrollableComponent.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "start",
          });
        } else {
          window.scrollTo(0, 0);
        }
        woundAssessmentContextObj.setScrollableComponentClassName(undefined);
      }
    }, 300);
  }, [woundAssessmentContextObj?.scrollableComponentClassName]);

  const assessmentTypeBasedFlow = () => {
    if (data.assessmentType.value === WoundAssessmentType.MWP) {
      return (
        <>
          {data.woundTherapyStatus.value !== "" && (
            <>
              <WoundMeasurement data={data} setData={setData} />
              {data.woundTherapyStatus.value === "yes" && (
                <>
                  <WoundMeasurementEschar data={data} setData={setData} />
                  <HoldOrHospitalization data={data} setData={setData} />
                  {data.resumptionMeasureStatus.value === "yes" && (
                    <WoundDebridement
                      data={data}
                      setData={setData}
                      debridementTypeHeading="Has debridement been attempted in the last 10 days?"
                    />
                  )}
                  <WoundAssessmentInfection data={data} setData={setData} />
                </>
              )}
              <WoundAssessor data={data} setData={setData} />
              <WoundUploadImages />
              <WoundUploadDocument />
              <WoundProvideAdditionalInfo data={data} setData={setData} />
            </>
          )}
        </>
      );
    } else {
      return (
        <>
          {data.woundTherapyStatus.value !== "" && (
            <>
              {data.woundTherapyStatus.value === "yes" && (
                <>
                  <WoundDebridement
                    data={data}
                    setData={setData}
                    debridementTypeHeading="Was the wound recently debrided?"
                  />
                  <WoundAssessmentInfection data={data} setData={setData} />
                </>
              )}
              <WoundMeasurement data={data} setData={setData} />
              {data.woundTherapyStatus.value === "yes" && (
                <>
                  <WoundMeasurementEschar data={data} setData={setData} />
                  <WoundAssessmentBed setData={setData} data={data} />
                  <WoundExudate setData={setData} data={data} />
                  <WoundAssessmentUndermining data={data} setData={setData} />
                  <div className="woundAssessmentTunneling">
                    <WoundTunneling
                      setWoundInfoData={setData}
                      woundInfoData={data}
                      Validator={validator}
                    />
                  </div>
                  <ExposedWoundStructures
                    exposedWoundInfoData={data}
                    setExposedWoundInfoData={setData}
                  />
                  <WoundAssessComorbidities data={data} setData={setData} />
                  <HoldOrHospitalization data={data} setData={setData} />
                </>
              )}
              <WoundAssessor data={data} setData={setData} />
              <WoundUploadImages />
              <WoundUploadDocument />
              <WoundProvideAdditionalInfo data={data} setData={setData} />
            </>
          )}
        </>
      );
    }
  };

  return (
    <>
      <div className="addWound-Container">
        {isErrorOccurred ? (
          <div data-testid="error-text-wound" className="addWound-ErrorText">
            Oops Something Went Wrong !!
          </div>
        ) : (
          <>
            <div className="addWound-Details">
              <div
                className="addWound-PatientName"
                data-testid="addWound-PatientName-id"
              >
                {makeCapitalEachWordInString(
                  handleEmptyValue(data.patientLastName.value)
                )}{" "}
                {makeCapitalEachWordInString(
                  handleEmptyValue(data.patientFirstName.value)
                )}
              </div>
              <div
                className="addWound-WoundDetail"
                data-testid="addWound-WoundDetail-id"
              >
                <div>
                  {handleEmptyValue(data.woundLocation.value)}
                  {", "}
                  {handleEmptyValue(data.woundDirection.value)}{" "}
                  {handleEmptyValue(data.woundOrientation.value)}
                </div>
                <div data-testid="addWound-WoundType-id">
                  {handleEmptyValue(data.woundType.value)}
                </div>
              </div>
              <div className="addWound-row">
                <div className="addWound-col">
                  <div className="addWound-title" data-testid="addWound-dob-id">
                    Date of Birth
                  </div>
                  <div className="addWound-value">
                    {handleEmptyValue(data.dateOfBirth.value)}
                  </div>
                </div>
                <div className="addWound-col">
                  <div className="addWound-title" data-testid="addWound-ro-id">
                    Rental Order #
                  </div>
                  <div
                    className="addWound-roValue"
                    onClick={() => setRoClicked(true)}
                  >
                    {handleEmptyValue(data.rentalOrderNumber.value)}
                  </div>
                </div>
              </div>
              <div className="addWound-row">
                <div className="addWound-col">
                  <div className="addWound-title">Product</div>
                  <div className="addWound-value">
                    {handleEmptyValue(data.productName.value)}{" "}
                    {data.assessmentType.value}
                  </div>
                </div>
                <div className="addWound-col">
                  <div className="addWound-title">Placement Date</div>
                  <div className="addWound-value">
                    {handleEmptyValue(data.placementDate.value)}
                  </div>
                </div>
              </div>
            </div>
            <WoundAssessmentDateRange data={data} />
            <WoundTherapyStatus
              data={data}
              isTesting={isTesting}
              setData={setData}
            />
            {assessmentTypeBasedFlow()}
          </>
        )}
      </div>
      {/* Remove this empty popup after RON click implementation */}
      <Popup openFlag={roClicked} closeHandler={() => setRoClicked(false)}>
        <div className="emptyPopup"></div>
      </Popup>
    </>
  );
};

export default AddWoundAssessment;
