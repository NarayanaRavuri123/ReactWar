import {
  AuthContext,
  AuthContextType,
} from "../../../../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { IResumeTherapy, IHoldAndResumeDate } from "./resumeTherapy.interface";
import { getDeepClone } from "../../../../../util/ObjectFunctions";
import { HoldOrResumeTherapy } from "../main/holdOrResumeTherapy.component";
import { callHoldorResumeTherapy } from "../../../../../util/vacOrderService";
import {
  IHoldOrResumeTherapyData,
  WoundDetails,
} from "../main/holdOrResumeTherapy.interface";
import { mapHoldOrResumeRequest } from "../main/mapper/holdOrResumeRequestMapper";
import { defaultHoldOrResumeTherapyData } from "../main/holdOrResumeTherapy.model";
import { IHoldOrResumeTherapyRequest } from "../main/mapper/holdOrResumeRequestMapper.interface";
import { LoadingSpinner } from "../../../../../core/loader/LoadingSpinner";
import { format } from "react-string-format";
import {
  DD_WOUND_LOCATION,
  DD_WOUND_TYPE,
} from "../../../../../util/staticText";
import { getdropDownContent } from "../../../../../util/dropDownService";
import moment from "moment";
import { getCurrentServerDateTime } from "../../../../../util/3meService";

export const ResumeTherapy = ({
  closePopup,
  patient,
  showWarningPopup,
  therapyStartDate,
  wounds,
}: IResumeTherapy) => {
  const authObj = useContext<AuthContextType | null>(AuthContext);
  const [data, setData] = useState<IHoldOrResumeTherapyData>(
    getDeepClone(defaultHoldOrResumeTherapyData)
  );
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [woundLocation, setWoundLocationData] = useState([]);
  const [woundType, setWoundTypeData] = useState([]);
  const [currentDate, setCurrentDate] = useState<string>("");
  const [holdAndResumeMinMaxDates] = useState<Array<IHoldAndResumeDate>>([]);
  const [woundsToDisplay, setWoundsToDisplay] = useState<WoundDetails[]>([]);

  useEffect(() => {
    fetchAllRequiredDetails();
  }, []);

  const fetchAllRequiredDetails = async () => {
    setShowLoader(true);
    await Promise.all([fetchDropDownContent(), setDateTime()]);
    setShowLoader(false);
  };

  const fetchDropDownContent = async () => {
    let selectWoundLocation = "";
    try {
      const ddContent = format(
        "{0},{1}",
        DD_WOUND_LOCATION,
        DD_WOUND_TYPE ?? ""
      );
      const data = await getdropDownContent(ddContent);
      if (data.items.length > 0) {
        const woundLocationData = data.items.filter(
          (item: { name: string }) => item.name === DD_WOUND_LOCATION
        );
        const woundTypeData = data.items.filter(
          (item: { name: string }) => item.name === DD_WOUND_TYPE
        );
        setWoundLocationData(woundLocationData[0].data);
        setWoundTypeData(woundTypeData[0].data);
      }
    } catch (error) {
      console.log("error", error);
    }
    return selectWoundLocation;
  };

  const resumeTherapy = async () => {
    let siteUseId = authObj?.registeredFaciltyAddress?.siteUseId ?? "";
    const reqParam: IHoldOrResumeTherapyRequest = await mapHoldOrResumeRequest(
      currentDate,
      data,
      false,
      patient,
      siteUseId,
      null,
      woundLocation,
      woundType
    );
    setShowLoader(true);
    const response = await callHoldorResumeTherapy(reqParam);
    setShowLoader(false);
    if (response.succeeded) {
      closePopup();
    } else {
      setShowError(true);
    }
  };

  const setDateTime = async () => {
    const currentDateRes = await getCurrentServerDateTime();
    if (currentDateRes) {
      const formatedDate = moment(currentDateRes.currentCstTime);
      setCurrentDate(formatedDate.format("yyyy/MM/DD"));
      await getWoundTherapyDates(formatedDate);
    }
    return true;
  };

  const getWoundTherapyDates = (currentDate: any) => {
    let validWounds = wounds.filter(
      (wound: WoundDetails) =>
        wound.therapyHoldDate && wound.therapyHoldDate !== null
    );
    if (validWounds.length === 0) {
      showWarningPopup();
    } else {
      validWounds.map((wound: WoundDetails, index: number) => {
        let resumeMinDate = wound.therapyHoldDate
          ? moment(wound.therapyHoldDate)
          : null;
        let holdAndResumeMinMaxDate = {
          holdMinAndMaxDates: {
            minDate: null,
            maxDate: null,
          },
          resumeMinAndMaxDates: {
            minDate: resumeMinDate,
            maxDate: currentDate,
          },
        };
        holdAndResumeMinMaxDates.splice(index, 0, holdAndResumeMinMaxDate);
      });
      let allValidWounds = validWounds.map((wound: WoundDetails) => {
        wound.length = null;
        wound.width = null;
        wound.depth = null;
        return wound;
      });
      setWoundsToDisplay(allValidWounds);
    }
  };

  return (
    <>
      {showLoader && !showError && (
        <div className="myPatientListSpinner">
          <LoadingSpinner />
        </div>
      )}
      {!showLoader && showError && (
        <div className="myPatientListSpinner">
          <div>Oops something went wrong</div>
        </div>
      )}
      {!showLoader && !showError && (
        <HoldOrResumeTherapy
          data={data}
          holdAndResumeMinMaxDates={holdAndResumeMinMaxDates}
          isHoldTherapy={false}
          origionalWounds={woundsToDisplay}
          patient={patient}
          setData={setData}
          submitBtnAction={() => {
            resumeTherapy();
          }}
          submitBtnTitle={"Submit Therapy Resumption"}
          title={"Resume Therapy after Hold"}
          woundQuestion="Which wounds should resume treatment?"
        />
      )}
    </>
  );
};
