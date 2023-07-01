import moment from "moment";
import {
  DD_WOUND_LOCATION,
  DD_WOUND_TYPE,
} from "../../../../../util/staticText";
import {
  AuthContext,
  AuthContextType,
} from "../../../../../context/AuthContext";
import { format } from "react-string-format";
import {
  IHoldOrResumeTherapyData,
  WoundDetails,
} from "../main/holdOrResumeTherapy.interface";
import { IHoldTherapy } from "./holdTherapy.interface";
import { useContext, useEffect, useState } from "react";
import { getDeepClone } from "../../../../../util/ObjectFunctions";
import { getdropDownContent } from "../../../../../util/dropDownService";
import { getCurrentServerDateTime } from "../../../../../util/3meService";
import { LoadingSpinner } from "../../../../../core/loader/LoadingSpinner";
import { HoldOrResumeTherapy } from "../main/holdOrResumeTherapy.component";
import { IHoldAndResumeDate } from "../resumeTherapy/resumeTherapy.interface";
import { callHoldorResumeTherapy } from "../../../../../util/vacOrderService";
import { mapHoldOrResumeRequest } from "../main/mapper/holdOrResumeRequestMapper";
import { defaultHoldOrResumeTherapyData } from "../main/holdOrResumeTherapy.model";
import { IHoldOrResumeTherapyRequest } from "../main/mapper/holdOrResumeRequestMapper.interface";

export const HoldTherapy = ({
  closePopup,
  patient,
  showWarningPopup,
  therapyStartDate = null,
  wounds,
}: IHoldTherapy) => {
  const authObj = useContext<AuthContextType | null>(AuthContext);
  const [data, setData] = useState<IHoldOrResumeTherapyData>(
    getDeepClone(defaultHoldOrResumeTherapyData)
  );
  const [woundLocation, setWoundLocationData] = useState([]);
  const [woundType, setWoundTypeData] = useState([]);
  const [showLoader, setShowLoader] = useState<boolean>(true);
  const [showError, setShowError] = useState<boolean>(false);
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

  const holdTherapy = async () => {
    let siteUseId = authObj?.registeredFaciltyAddress?.siteUseId ?? "";
    const date = moment(therapyStartDate).format("YYYY-MM-DD") ?? "";
    const reqParam: IHoldOrResumeTherapyRequest = await mapHoldOrResumeRequest(
      currentDate,
      data,
      true,
      patient,
      siteUseId,
      date,
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
  };

  const getWoundTherapyDates = (currentDate: any) => {
    let validWounds = wounds.filter(
      (wound: WoundDetails) => wound.therapyHoldDate === null
    );
    if (validWounds.length === 0) {
      showWarningPopup();
    }
    if (validWounds.length === 0 && therapyStartDate === null) {
      showWarningPopup();
    } else {
      validWounds.map((wound: WoundDetails, index: number) => {
        let holdMinDate = wound.therapyResumptionDate
          ? moment(wound.therapyResumptionDate)
          : moment(therapyStartDate);
        let holdAndResumeMinMaxDate = {
          holdMinAndMaxDates: {
            minDate: holdMinDate,
            maxDate: currentDate,
          },
          resumeMinAndMaxDates: {
            minDate: holdMinDate,
            maxDate: currentDate,
          },
        };
        holdAndResumeMinMaxDates.splice(index, 0, holdAndResumeMinMaxDate);
      });
      setWoundsToDisplay(validWounds);
    }
  };

  return (
    <>
      {showLoader && !showError && (
        <div className="myPatientListSpinner" data-testid="hold-therapy-loader">
          <LoadingSpinner />
        </div>
      )}
      {!showLoader && showError && (
        <div className="myPatientListSpinner" data-testid="hold-therapy-error">
          <div>Oops something went wrong</div>
        </div>
      )}
      {!showLoader && !showError && (
        <HoldOrResumeTherapy
          data={data}
          holdAndResumeMinMaxDates={holdAndResumeMinMaxDates}
          isHoldTherapy={true}
          origionalWounds={woundsToDisplay}
          patient={patient}
          setData={setData}
          submitBtnAction={() => {
            holdTherapy();
          }}
          submitBtnTitle={"Submit Hold Request"}
          title={"Request Hold"}
          woundQuestion="Which wounds should be placed on hold?"
        />
      )}
    </>
  );
};
